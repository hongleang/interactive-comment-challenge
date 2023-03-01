import { User } from "../../models/RootJson";
import ReplyBtn from "./ReplyBtn";
import EditBtn from "./EditBtn";
import { Dispatch, SetStateAction } from "react";
import avatarImg from "../../assets/ImageMapper/AvatarImageMapper";

type Props = {
    user: User;
    createdAt: string;
    currentUser: User;
    onDeleteComment?: () => void;
    replyBtnHandler?: () => void;
    editMode: boolean;
    setEditMode: Dispatch<SetStateAction<boolean>>;
}

export default function CardHeader({ user, createdAt, currentUser, replyBtnHandler, onDeleteComment, editMode, setEditMode }: Props) {
    const { username } = user;
    const imageUrl = avatarImg[username as keyof typeof avatarImg];

    const { username: curUsername } = currentUser;

    return (
        <div className="d-flex align-items-center justify-content-between">
            <div role="card-header" className="card-heading col-sm-7">
                <img className="avatar" src={imageUrl} alt="user-avatar" />
                <span className="text-grey mx-2 fw-md">{username}</span>
                {curUsername === username && <span className="px-1 fw-md bg-primary me-2 text-white">you</span>}
                <span className="text-light-blue">{createdAt}</span>
            </div>
            <div className="d-none d-sm-block col-5 text-end px-0">
                {username === curUsername
                    ? <EditBtn {...{ onDeleteComment, editMode, setEditMode }} />
                    : <ReplyBtn {...{ replyBtnHandler }} />}
            </div>
        </div>
    )
}
