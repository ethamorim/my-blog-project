import IComment from "../interfaces/comment";
import Article from "../models/article";
import Comment from "../models/comment";

import { Router, Request } from "express";
import { getConnection } from "../database/connection";
import { TCollections } from "../types/tcollections";
import { Document, ObjectId, WithId } from "mongodb";
import { getDocumentById, updateOneById } from "../database/utils/query";
import { DuplicateRequest, UserNotAuthenticated } from "../errors/errors";

import { getAuth } from 'firebase-admin/auth';

const router = Router();

const ARTICLES_COLLECTION = 'articles';

router.get(['/api/articles', '/api/articles/:articleId'], async (req: Request<{articleId: string}>, res, next) => {
    getConnection([ ARTICLES_COLLECTION ], async (collections: TCollections) => {
        const articlesCollection = collections[ARTICLES_COLLECTION];
        const { articleId } = req.params;

        if (articleId) {
            let document: WithId<Document>;
            try {
                document = await getDocumentById(articlesCollection, new ObjectId(articleId));
            } catch (error) {
                return res.status(404).send('Article not found');
            }

            const { uid } = req.user ? req.user : { uid: null };
            const upvoteIds = document.upvoteIds || [];
            document.hasUpvoted = uid && upvoteIds.includes(uid);
            document.comments = await addUserEmailToComments(document.comments);

            res.json(document);
        } else {
            res.json(await articlesCollection.find({}).toArray());
        }
    });
});

router.put('/api/articles/:articleId/upvote', async (req: Request<{ articleId: string }>, res, next) => {
    getConnection([ ARTICLES_COLLECTION ], async (collections: TCollections) => {
        if (!userIsAuthenticated(req)) {
            return res.sendStatus(401);
        }
        const user = req.user;

        const { articleId } = req.params; 
        const articlesCollection = collections[ARTICLES_COLLECTION];
        let document: WithId<Document>;
        try {
            document = await getDocumentById(articlesCollection, new ObjectId(articleId));
        } catch (error) {
            return res.status(404).send('Article not found');
        }
        const article = new Article(document._id, document.name, document.upvoteIds, document.authorId, document.comments);

        try {
            article.upvote(user?.uid);
        } catch (error) {
            if (error instanceof DuplicateRequest) {
                return res.status(400).send('User already upvoted');
            }
        }
        if (await updateOneById(articlesCollection, article.getId(), { $set: { upvoteIds: article.getUpvoteIds() } })) {
            res.json(article);
        } else {
            res.status(500).send('Something went wrong updating this article...');
        }
    });
});

router.post('/api/articles/:articleId/comment', (req: Request<{ articleId: string }, {}, { commentText: string }>, res, next) => {
    getConnection([ ARTICLES_COLLECTION ], async (collections: TCollections) => {
        if (!userIsAuthenticated(req)) {
            return res.sendStatus(401);
        }
        const user = req.user;

        const { articleId } = req.params;
        const { commentText } = req.body;
        if (!commentText) {
            return res.send(400).send('Empty comment body');
        }
        const articlesCollection = collections[ARTICLES_COLLECTION];
    
        let document: WithId<Document>;
        try {
            document = await getDocumentById(articlesCollection, new ObjectId(articleId));
        } catch (error) {
            return res.status(404).send('Article not found');
        }

        try {
            const article = new Article(document._id, document.name, document.upvoteIds, document.authorId, document.comments);
            const comment = new Comment(user?.uid, commentText);

            article.addComment(comment);
            if (await updateOneById(articlesCollection, article.getId(), { $set: { comments: article.getComments() } })) {
                const commentsWithAuthor = await addUserEmailToComments(article.getComments());
                res.status(200).json(commentsWithAuthor);
            } else {
                res.status(500).send('Something went wrong updating this article...');
            }
        } catch (error) {
            if (error instanceof UserNotAuthenticated) {
                res.status(401).send('User is not allowed to perform that action...');
            } else {
                res.status(500).send('Something went wrong updating this article...');
            }        
        }
    });
});

const userIsAuthenticated = (req: Request) => {
    if (req.user) {
        return true;
    } else {
        return false;
    }
};

const addUserEmailToComments =  async (comments: IComment[]) => {
    const promiseCommentsWithAuthor = comments.map(async (comment: IComment) => {
        const fetchedUser = await getAuth().getUser(comment.postedById);
        const postedBy = fetchedUser.email;
        
        return {
            text: comment.text,
            postedBy
        }
    });
    const commentsWithAuthor = await Promise.all(promiseCommentsWithAuthor);
    return commentsWithAuthor;
};

export default router;