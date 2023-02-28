import { useState } from "react";
import { SelectedEditComment } from "../models/Comment";
import { Comment, Reply, RootJson } from "../models/RootJson";

export function useCommentsHandler(rootJson: RootJson) {
    const [selectedComment, setSelectedComment] = useState<SelectedEditComment>();

    const comments = localStorage.getItem("newComments");

    const [commentsData, setCommentsData] = useState<RootJson>(comments ? JSON.parse(comments) : rootJson);
    const { currentUser } = commentsData;

    function addComment(comment: Comment) {
        const comments: Comment[] = [...commentsData.comments];
        comment.id = comments.length + 1;
        comments.push(comment);
        setCommentsData({ ...commentsData, comments });
    }

    function addReply(reply: Reply, parentComment: Comment) {
        const newData = Object.assign({}, commentsData);
        const comment = [...newData.comments].find(com => com.id === parentComment.id);
        if (comment) {
            comment.replies?.push(reply);
            setCommentsData(newData)
        }
    }

    function onEdit(selectedComment: SelectedEditComment) {
        if (!selectedComment) return;
        let comments: Comment[] = [];
        const { type, id, content } = selectedComment;
        if (type === "comment" && content) {
            comments = [...commentsData.comments];
            let idx = comments?.findIndex(com => com.id === id);
            if (idx < 0) return;
            comments[idx].content = content;
        }
        if (type === "reply" && content) {
            comments = [...commentsData.comments];
            const idx = comments.findIndex(comment => comment.id === selectedComment.parentCommentId);
            const replyIdx = comments[idx]?.replies?.findIndex(r => r.id === id) ?? -1;
            if (idx >= 0 && replyIdx >= 0) {
                const newReply = comments[idx]?.replies?.[replyIdx];
                if (!newReply) return;
                newReply.content = content;
                comments[idx]?.replies?.splice(replyIdx, 1, newReply);
            }
        }
        setCommentsData({ ...commentsData, comments })
    }

    function onDeleting() {
        if (!selectedComment) return;
        let comments: Comment[] = [];
        const { type, id } = selectedComment;
        if (type === "comment") {
            comments = [...commentsData.comments].filter(comment => comment.id !== id);
        }
        if (type === "reply") {
            comments = [...commentsData.comments];
            const commentIndex = comments.findIndex(comment => comment.id === selectedComment.parentCommentId);
            if (commentIndex < 0) return;
            const newReplies = comments[commentIndex]?.replies?.filter(r => r.id !== id);
            comments[commentIndex] = {
                ...comments[commentIndex],
                replies: newReplies
            }
        }

        setCommentsData({ ...commentsData, comments })
    }

    function handleSelectedEditComment(comment: SelectedEditComment) {
        setSelectedComment(comment)
    }

    return { comments, currentUser, commentsData, addComment, addReply, onEdit, onDeleting, handleSelectedEditComment }
}