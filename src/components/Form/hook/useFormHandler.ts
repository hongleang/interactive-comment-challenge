import { useState } from "react";
import { Comment, Reply, User } from "../../../models/RootJson";
import { SubmitHandler } from "react-hook-form";

type Props = {
    addComment?: (newComment: Comment) => void;
    addReply?: (newReply: Reply, parentComment: Comment) => void;
    parentComment?: Comment;
    replyToUser?: string;
    currentUser: User;
    type: "comment" | "reply";
    closeReplyBox?: () => void;
}

type TextAreaInput = {
    commentBox: string;
}

export function useFormHandler({ parentComment, currentUser, replyToUser, addComment, addReply, type, closeReplyBox }: Props) {
    const [textareaDefaultVal, setTextareaDefaultVal] = useState<string>("");

    const replyHandler = (data: TextAreaInput) => {
        const textareaVal = data.commentBox.replace(textareaDefaultVal, "");
        if (!parentComment || textareaVal.trim() === "") return;

        const newReply: Reply = {
            id: (parentComment.replies?.length ?? 0) + 1,
            content: textareaVal,
            createdAt: "now",
            score: 0,
            user: currentUser,
            replyingTo: replyToUser ?? ""
        };

        if (addReply)
            addReply(newReply, parentComment);
    }

    const commentHandler = (data: TextAreaInput) => {
        const textareaVal = data.commentBox.trim();
        if (textareaVal === "") return;
        const newComment: Comment = {
            id: 0,
            content: textareaVal,
            createdAt: "now",
            score: 0,
            user: currentUser,
            replies: []
        };
        if (addComment)
            addComment(newComment);
    }

    const setTextValue = () => replyToUser ? setTextareaDefaultVal("@" + replyToUser + " ") : setTextareaDefaultVal("");

    const onSubmit: SubmitHandler<TextAreaInput> = data => {
        if (type === "comment") {
            commentHandler(data);
        } else {
            replyHandler(data);
        }
        closeReplyBox && closeReplyBox();
    };

    return { replyHandler, commentHandler, setTextValue, textareaDefaultVal, onSubmit }
}