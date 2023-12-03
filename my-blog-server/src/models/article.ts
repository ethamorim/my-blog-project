import { DuplicateRequest } from "../errors/errors";
import IArticle from "../interfaces/article";
import IComment from "../interfaces/comment";

import { ObjectId } from "mongodb";

export default class Article implements IArticle {

    id: ObjectId;
    name: string;
    upvoteIds: string[];
    authorId: string;
    comments: IComment[];

    constructor(id: ObjectId, name: string, upvoteIds: string[], authorId: string, comments: IComment[]) {
        this.id = id;
        this.name = name;
        this.upvoteIds = upvoteIds;
        this.authorId = authorId;
        this.comments = comments;
    }

    getId(): ObjectId {
        return this.id;
    }
    getUpvotes(): number {
        return this.upvoteIds.length;
    }
    getUpvoteIds(): string[] {
        return this.upvoteIds;
    }
    getComments(): IComment[] {
        return this.comments;
    }
    upvote(userId: string | undefined): void {
        if (!userId) return;
        if (this.upvoteIds.includes(userId)) {
            throw new DuplicateRequest();
        }
        this.upvoteIds.push(userId);
    }
    addComment(comment: IComment): void {
        this.comments.push(comment);
    }
}