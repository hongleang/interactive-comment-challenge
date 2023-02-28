import { useState } from "react";

export function useHandleCommentCard() {
    const [commentBoxOpen, setCommentBoxOpen] = useState<boolean>(false);
    const [commentId, setCommentId] = useState<number>(0);

    const [replyToUser, setReplyToUser] = useState<string>("");

    const toggleCommentBox = (id: number, username: string) => {
        setReplyToUser(username);
        setCommentId(id);
        setCommentBoxOpen(true);
    };

    const displayReplyBox = (id: number) => commentBoxOpen && (commentId === id);

    const closeReplyBox = () => setCommentBoxOpen(false);

    return { toggleCommentBox, replyToUser, displayReplyBox, closeReplyBox }
}