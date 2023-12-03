import { ObjectId } from "mongodb";
import IAdmin from "./admin";
import IComment from "./comment";

export default interface IArticle {

    id: ObjectId,
    name: string,
    upvotes: number,
    upvoteIds: string[],
    author: IAdmin,
    comments: IComment[],
    
    getId(): ObjectId;
    getUpvotes(): number;
    getComments(): IComment[];
    upvote(): void;
    addComment(comment: IComment): void;

}