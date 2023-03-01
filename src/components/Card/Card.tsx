import VoteButton from "../VoteButton/VoteButton"
import CardHeader from "./CardHeader"

import "./Card.css"
import { CardComment, Comment, User } from "../../models/RootJson"
import { useContext, useState } from "react"
import AppContext from "../../context/AppContext"
import EditTextArea from "../EditTextArea/EditTextArea"

type Props = {
  detail: CardComment;
  currentUser: User;
  toggleCommentBox?: (id: number, username: string) => void;
  parentComment?: Comment;
}

export default function Card({ detail: { content, user, score, createdAt, id, replyingTo }, currentUser, toggleCommentBox, parentComment }: Props) {
  const { commentHandler } = useContext(AppContext);
  if (!commentHandler) return null;
  const { handleSelectedEditComment, onEdit } = commentHandler;
  const replyBtnHandler = () => toggleCommentBox && toggleCommentBox(parentComment ? parentComment.id : id, user.username);

  const onDeleteComment = () => {
    if (parentComment) {
      handleSelectedEditComment({ id, type: "reply", parentCommentId: parentComment.id })
    } else {
      handleSelectedEditComment({ id, type: "comment" })
    }
  }

  const [editMode, setEditMode] = useState(false);

  const onSubmitEdit = (newContent: string) => {
    if (parentComment) {
      onEdit({ id, type: "reply", parentCommentId: parentComment.id, content: newContent })
    } else {
      onEdit({ id, type: "comment", content: newContent })
    }
    setEditMode(false);
  }

  return (
    <>
      <div className="row border-0 shadow rounded-2 p-4 justify-content-between mb-3">
        <div className="col" style={{ flex: "0 0 11%" }}>
          <VoteButton {...{ score }} />
        </div>
        <div className="col-10">
          <CardHeader {...{ user, createdAt, currentUser, replyBtnHandler, onDeleteComment, editMode, setEditMode }} />
          {editMode ? <EditTextArea {...{ onSubmitEdit, content }} /> : <p className="text-light-blue mt-3">
            {replyingTo && <span className="text-blue fw-md">@{replyingTo} </span>}
            {content}
          </p>}

        </div>
      </div>
    </>
  )
}
