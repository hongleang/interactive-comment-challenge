import VoteButton from "../VoteButton/VoteButton"
import CardHeader from "./CardHeader"

import "./Card.css"
import { CardComment, Comment, User } from "../../models/RootJson"
import { useContext, useState } from "react"
import AppContext from "../../context/AppContext"
import EditTextArea from "../EditTextArea/EditTextArea"
import EditBtn from "./EditBtn"
import ReplyBtn from "./ReplyBtn"

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
      <div className="d-flex border-0 shadow rounded-2 p-4 mb-3">
        <div className="d-none d-sm-block me-3" style={{ minWidth: 55 }}>
          <VoteButton {...{ score }} />
        </div>
        <div>
          <CardHeader {...{ user, createdAt, currentUser, replyBtnHandler, onDeleteComment, editMode, setEditMode }} />
          {editMode ? <EditTextArea {...{ onSubmitEdit, content }} /> : <p className="text-light-blue mt-3">
            {replyingTo && <span className="text-blue fw-md">@{replyingTo} </span>}
            {content}
          </p>}
          <div className="d-flex d-sm-none justify-content-between align-items-center">
            <VoteButton {...{ score, horizontal: true }} />
            <div className="d-block d-sm-none text-end px-0">
              {user.username === currentUser.username
                ? <EditBtn {...{ onDeleteComment, editMode, setEditMode }} />
                : <ReplyBtn {...{ replyBtnHandler }} />}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
