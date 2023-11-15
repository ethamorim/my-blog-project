import IUser from "./user";

export default interface IComment {

    postedBy: IUser,
    text: string,

}