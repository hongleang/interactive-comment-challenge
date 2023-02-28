import { Dispatch, SetStateAction, useContext } from "react";
import AppContext from "../../context/AppContext";

type Props = {
    onDeleteComment?: () => void;
    editMode: boolean;
    setEditMode: Dispatch<SetStateAction<boolean>>
}

export default function EditBtn({ onDeleteComment, editMode, setEditMode }: Props) {
    const { closeModal, openModal } = useContext(AppContext);

    const handleDelete = () => {
        openModal();
        onDeleteComment && onDeleteComment();
    }

    return (
        <div className="d-flex justify-content-end align-items-center">
            <button disabled={editMode} onClick={handleDelete} className="edit-btn btn d-flex align-items-center me-1 text-danger">
                <svg className="me-2" width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" /></svg>
                Delete
            </button>
            <button
                onClick={() => setEditMode(true)}
                disabled={editMode}
                className="edit-btn btn d-flex align-items-center text-blue">
                <svg className="me-2" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" /></svg>
                Edit
            </button>
        </div>
    )
}
