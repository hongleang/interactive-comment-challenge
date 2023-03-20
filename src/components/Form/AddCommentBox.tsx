import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormHandler } from "./hook/useFormHandler";
import { FormHandlerProps, TextAreaInput } from "../../models/FormHandler";
import AppContext from "../../context/AppContext";

import avatarImg from "../../assets/ImageMapper/AvatarImageMapper";

import "./AddCommentBox.css"

export default function ({ addComment, addReply, parentComment, type, replyToUser, closeReplyBox }: FormHandlerProps) {
    const { register, reset, formState: { isSubmitSuccessful }, handleSubmit } = useForm<TextAreaInput>();

    const { commentHandler } = useContext(AppContext);
    if (!commentHandler) return null;

    const { currentUser } = commentHandler;
    const imageUrl = avatarImg[currentUser.username as keyof typeof avatarImg];

    const { onSubmit, setTextValue, textareaDefaultVal } = useFormHandler({
        parentComment,
        currentUser,
        replyToUser,
        addComment,
        addReply,
        closeReplyBox,
        type
    });

    useEffect(() => {
        setTextValue();
    }, [setTextValue, replyToUser])

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful])

    return (
        <div className="my-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row border-0 shadow rounded-2 p-4 bg-white">
                    <div className="d-none d-sm-block col-1">
                        <img className="avatar lg" src={imageUrl} alt="curUser-avatar" />
                    </div>

                    <div className="col-sm-9 px-sm-auto px-0">
                        <label className="d-none" htmlFor="commentBox"></label>
                        <textarea className="form-control w-100" id="comment-box" {...register("commentBox")} defaultValue={textareaDefaultVal}>
                        </textarea>
                    </div>
                    <div className="d-none d-sm-block col-2">
                        <button
                            type="submit"
                            className="btn btn-submit text-uppercase w-100"
                        >
                            {type === "comment" ? "send" : "reply"}
                        </button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-0 mt-4">
                        <div className="d-block d-sm-none">
                            <img className="avatar lg" src={imageUrl} alt="curUser-avatar" />
                        </div>
                        <div className="d-block d-sm-none w-25">
                            <button
                                type="submit"
                                className="btn btn-submit text-uppercase w-100"
                            >
                                {type === "comment" ? "send" : "reply"}
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}
