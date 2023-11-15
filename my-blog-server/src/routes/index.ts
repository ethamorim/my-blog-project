import IComment from "../interfaces/comment";
import Article from "../models/article";
import Comment from "../models/comment";

import { Router, Request } from "express";
import { getConnection } from "../database/connection";
import { TCollections } from "../types/tcollections";
import { Document, ObjectId, WithId } from "mongodb";
import { getDocumentById, updateOneById } from "../database/utils/query";

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
            res.json(document);
        } else {
            res.json(await articlesCollection.find({}).toArray());
        }
    });
});

router.put('/api/articles/:articleId/upvote', async (req: Request<{ articleId: string }>, res, next) => {
    getConnection([ ARTICLES_COLLECTION ], async (collections: TCollections) => {
        const { articleId } = req.params; 
        const articlesCollection = collections[ARTICLES_COLLECTION];
        let document: WithId<Document>;
        try {
            document = await getDocumentById(articlesCollection, new ObjectId(articleId));
        } catch (error) {
            return res.status(404).send('Article not found');
        }
        const article = new Article(document._id, document.name, document.upvotes, document.comments, document.author);
        article.upvote();
        if (await updateOneById(articlesCollection, article.getId(), { $set: { upvotes: article.getUpvotes() } })) {
            res.sendStatus(200);
        } else {
            res.status(500).send('Something went wrong updating this article...');
        }
    });
});

router.post('/api/articles/:articleId/comment', (req: Request<{ articleId: string }, {}, IComment>, res, next) => {
    getConnection([ ARTICLES_COLLECTION ], async (collections: TCollections) => {
        const { articleId } = req.params;
        const { postedBy, text } = req.body;
        const articlesCollection = collections[ARTICLES_COLLECTION];
    
        let document: WithId<Document>;
        try {
            document = await getDocumentById(articlesCollection, new ObjectId(articleId));
        } catch (error) {
            return res.status(404).send('Article not found');
        }
        const article = new Article(document._id, document.name, document.upvotes, document.comments, document.author);
        const comment = new Comment(postedBy, text);
        article.addComment(comment);
        if (await updateOneById(articlesCollection, article.getId(), { $set: { comments: article.getComments() } })) {
            res.status(200).json(article.getComments());
        } else {
            res.status(500).send('Something went wrong updating this article...');
        }
    });
});

export default router;