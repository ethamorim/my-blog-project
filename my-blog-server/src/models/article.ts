import IAdmin from "../interfaces/admin";
import IArticle from "../interfaces/article";
import IComment from "../interfaces/comment";

import { ObjectId } from "mongodb";

export default class Article implements IArticle {

    id: ObjectId;
    name: string;
    upvotes: number;
    comments: IComment[];
    author: IAdmin;

    constructor(id: ObjectId, name: string, upvotes: number, comments: IComment[], author: IAdmin) {
        this.id = id;
        this.name = name;
        this.upvotes = upvotes;
        this.comments = comments;
        this.author = author;
    }

    getId(): ObjectId {
        return this.id;
    }

    getUpvotes(): number {
        return this.upvotes;
    }

    upvote(): void {
        this.upvotes += 1;
    }

    addComment(comment: IComment): void {
        this.comments.push(comment);
    }

}