import IComment from "../interfaces/comment";
import IUser from "../interfaces/user";

export default class Comment implements IComment {

    postedBy: IUser;
    text: string;

    constructor(postedBy: IUser, text: string) {
        this.postedBy = postedBy;
        this.text = text;
    }
}