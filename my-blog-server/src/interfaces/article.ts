import { ObjectId } from "mongodb";
import IAdmin from "./admin";
import IComment from "./comment";

export default interface IArticle {

    id: ObjectId,
    name: string,
    upvotes: number,
    author: IAdmin,
    comments: IComment[],
    
    getId(): ObjectId;
    getUpvotes(): number;
    upvote(): void;
    addComment(comment: IComment): void;

}