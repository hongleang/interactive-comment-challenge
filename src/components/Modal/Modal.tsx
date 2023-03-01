import { useContext } from "react";
import "./Modal.css"
import AppContext from "../../context/AppContext";

type Props = {
    modalIsOpen: boolean;
    onFunction?: () => void;
}

export default function Modal({ modalIsOpen, onFunction }: Props) {
    const { modalHandler } = useContext(AppContext);
    if (!modalHandler) return null;
    const { closeModal } = modalHandler

    const handleDelete = () => {
        closeModal()
        onFunction && onFunction();
    }

    return (
        <div className={`backdrop-custom-modal ${modalIsOpen ? "d-flex" : "d-none"}`}>
            <div className="custom-modal bg-white p-4 rounded-2">
                <h3 className="custom-modal-header">Delete comment</h3>
                <p>
                    Are you sure you want to delete this comment?
                    This will remove the comment and can't be undone.
                </p>
                <button onClick={closeModal} className="custom-modal-btn cancel">No, cancel</button>
                <button onClick={handleDelete} className="custom-modal-btn proceed">Yes, delete</button>
            </div>
        </div>
    )
}
