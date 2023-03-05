import { useEffect } from "react"
import CommentCards from "./components/CommentCards/CommentCards"

import rootJson from "./data/data.json"
import AddCommentBox from "./components/Form/AddCommentBox";
import Modal from "./components/Modal/Modal";
import AppContext from "./context/AppContext";
import { useCommentsHandler } from "./hooks/useCommentsHandler";
import { useModalHandler } from "./hooks/useModalHandler";


function App() {
  const {
    commentsData,
    comments,
    onDeleting,
    ...commentHandler
  } = useCommentsHandler(rootJson);

  const { modalIsOpen, ...modalHandler } = useModalHandler();

  useEffect(() => {
    if (!comments) {
      localStorage.setItem('newComments', JSON.stringify({}));
    }
    localStorage.setItem('newComments', JSON.stringify(commentsData));

  }, [commentsData, comments])

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden "
    } else {
      document.body.style.overflow = "auto"
    }
  }, [modalIsOpen])

  return (
    <AppContext.Provider value={{ modalHandler, commentHandler: { ...commentHandler, commentsData: commentsData.comments } }}>
      <Modal {...{ modalIsOpen, onFunction: onDeleting }} />
      <div className="container">
        <CommentCards />
        <AddCommentBox {...{ type: "comment" }} />
      </div>
    </AppContext.Provider >
  )
}

export default App
