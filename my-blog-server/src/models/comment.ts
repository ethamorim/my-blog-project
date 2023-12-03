import { UserNotAuthenticated } from "../errors/errors";
import IComment from "../interfaces/comment";

export default class Comment implements IComment {

    postedById: string;
    text: string;

    constructor(postedById: string | undefined, text: string) {
        if (!postedById) {
            throw new UserNotAuthenticated();
        }
        this.postedById = postedById;
        this.text = text;
    }
}