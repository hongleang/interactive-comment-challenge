import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
    content: string;
    onSubmitEdit?: (newContent: string) => void;
}

type EditTextAreaInput = {
    editCommentBox: string;
}

export default function EditTextArea({ content, onSubmitEdit }: Props) {
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
                <div className="col-10">
                    <textarea className="form-control" {...register("editCommentBox")}></textarea>
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-submit text-uppercase ">Update</button>
                </div>
            </form>
        </div>
    )
}
