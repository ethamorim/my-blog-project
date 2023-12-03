import { ObjectId } from "mongodb";
import IComment from "./comment";

export default interface IArticle {

    id: ObjectId,
    name: string,
    upvoteIds: string[],
    authorId: string,
    comments: IComment[],
    
    getId(): ObjectId;
    getUpvotes(): number;
    getUpvoteIds(): string[];
    getComments(): IComment[];
    upvote(userId: string): void;
    addComment(comment: IComment): void;

}