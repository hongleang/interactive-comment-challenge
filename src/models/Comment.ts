export type SelectedEditComment = {
    type: "comment" | "reply";
    parentCommentId?: number;
    id: number;
    content?: string;
}