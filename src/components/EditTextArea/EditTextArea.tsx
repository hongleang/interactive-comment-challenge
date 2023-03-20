import { MouseEventHandler } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
    content: string;
    onSubmitEdit?: (newContent: string) => void;
    cancelAction: () => void;
}

type EditTextAreaInput = {
    editCommentBox: string;
}

export default function EditTextArea({ content, onSubmitEdit, cancelAction }: Props) {
    const { register, handleSubmit } = useForm<EditTextAreaInput>({
        defaultValues: {
            editCommentBox: content
        }
    });

    const onSubmit: SubmitHandler<EditTextAreaInput> = data => {
        onSubmitEdit && onSubmitEdit(data.editCommentBox);
    };

    return (
        <div className="mt-3">
            <form onSubmit={handleSubmit(onSubmit)} className="row w-100 justify-content-between">
                <div className="col-sm-10">
                    <textarea className="form-control" {...register("editCommentBox")} style={{ minHeight: 150 }}></textarea>
                </div>
                <div className="col-sm-2 d-flex align-items-center py-3 py-sm-0 flex-sm-column">
                    <button type="submit" className="btn btn-submit text-uppercase me-3 me-sm-0">Update</button>
                    <button onClick={cancelAction} className="btn btn-danger text-uppercase mt-sm-2">Cancel</button>
                </div>
            </form>
        </div>
    )
}
