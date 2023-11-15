import IComment from "../interfaces/comment";
import Article from "../models/article";
import Comment from "../models/comment";

import { Router, Request } from "express";
import { getConnection } from "../database/connection";
import { TCollections } from "../types/tcollections";
import { Document, ObjectId, WithId } from "mongodb";
import { getDocumentById, updateOneById } from "../database/utils/query";

const router = Router();

router.put('/api/articles/:articleId/upvote', async (req: Request<{ articleId: string }>, res, next) => {
    getConnection([ 'articles' ], async (collections: TCollections) => {
        const { articleId } = req.params; 
        const articlesCollection = collections['articles'];
        let document: WithId<Document>;
        try {
            document = await getDocumentById(articlesCollection, new ObjectId(articleId));
        } catch (error) {
            return res.status(404).send('Article not found');
        }
        const article = new Article(document._id, document.name, document.upvotes, document.comments, document.author);
        article.upvote();
        if (await updateOneById(articlesCollection, article.getId(), { $set: { upvotes: article.getUpvotes() } })) {
            res.status(200).end();
        } else {
            res.status(500).send('Something went wrong updating this article...');
        }
    });
});

router.post('/api/articles/:articleId/comment', (req: Request<{ articleId: string }, {}, IComment>, res, next) => {
    getConnection([ 'articles' ], async (collections: TCollections) => {
        const { articleId } = req.params;
        const { postedBy, text } = req.body;
    
        let document: WithId<Document>;
        try {
            document = await getDocumentById(collections['articles'], new ObjectId(articleId));
        } catch (error) {
            return res.status(404).send('Article not found');
        }
        const article = new Article(document._id, document.name, document.upvotes, document.comments, document.author);
        const comment = new Comment(postedBy, text);
        article.addComment(comment);
        

        res.status(200).end();
    });

    // const article = articlesInfo.find(a => a.name === name);
    // if (article) {
    //     article.comments.push({
    //         postedBy,
    //         text,
    //     });
    //     res.status(201).json(article.comments);
    // } else {
    //     res.status(404).send('Article not found');
    // }
});

export default router;