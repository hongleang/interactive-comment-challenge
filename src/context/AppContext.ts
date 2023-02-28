import { createContext } from "react";
import { SelectedEditComment } from "../models/Comment";
import { Comment, Reply, User } from "../models/RootJson";

type ModalHandler = {
    openModal: () => void;
    closeModal: () => void;
}

type CommentHandler = {
    commentsData: Comment[],
    currentUser: User,
    addReply: (reply: Reply, parentComment: Comment) => void,
    addComment: (comment: Comment) => void,
    handleSelectedEditComment: (comment: SelectedEditComment) => void;
    onEdit: (comment: SelectedEditComment) => void;
}

type Context = {
    modalHandler?: ModalHandler;
    commentHandler?: CommentHandler;
}

const AppContext = createContext<Context>({});

export default AppContext;