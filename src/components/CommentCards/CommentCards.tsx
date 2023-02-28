import { useContext } from "react";
import Card from "../Card/Card"

import "./CommentCards.css"
import AddCommentBox from "../Form/AddCommentBox";
import AppContext from "../../context/AppContext";
import { useHandleCommentCard } from "./hook/useHandleCommentCard";

export default function CommentCards() {
  const { commentHandler } = useContext(AppContext);
  const { toggleCommentBox, displayReplyBox, replyToUser, closeReplyBox } = useHandleCommentCard();

  if (!commentHandler) return <>Data Not found!</>

  const { commentsData, currentUser, addReply } = commentHandler;

  return (
    <div className="row mw-100 mx-auto">
      {commentsData.map((comment) => {
        const hasReplies = comment.replies && comment?.replies?.length > 0;

        return <div className="card-container px-0" key={comment.id}>
          <Card {...{ detail: comment, currentUser, toggleCommentBox }} />
          {hasReplies && <div className="row justify-content-between px-0">
            <div className="divider col-1"></div>
            <div className="col-11">
              {comment?.replies?.map((subcomment) => {
                return <Card key={"replyCard" + subcomment.id} {...{ detail: subcomment, currentUser, parentComment: comment, toggleCommentBox }} />
              })}
              {displayReplyBox(comment.id) && <AddCommentBox {...{ parentComment: comment, addReply, type: "reply", replyToUser, closeReplyBox }} />}
            </div>
          </div>}
          {displayReplyBox(comment.id) && !hasReplies && <AddCommentBox {...{ parentComment: comment, addReply, type: "reply", replyToUser, closeReplyBox }} />}
        </div>
      })}
    </div>
  )
}
