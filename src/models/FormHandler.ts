import { Comment, Reply } from "./RootJson";

export type FormHandlerProps = {
    addComment?: (newComment: Comment) => void;
    addReply?: (newReply: Reply, parentComment: Comment) => void;
    type: "comment" | "reply";
    parentComment?: Comment;
    replyToUser?: string;
    closeReplyBox?: () => void;
}

export type TextAreaInput = {
    commentBox: string;
}