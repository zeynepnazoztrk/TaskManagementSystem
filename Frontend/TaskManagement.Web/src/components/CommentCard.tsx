import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { TaskComment } from "../types/comment";

interface CommentCardProps {
  comment: TaskComment;
  onDelete: (comment: TaskComment) => void;
}

export function CommentCard({ comment, onDelete }: CommentCardProps) {
  return (
    <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}>
      <div className="flex justify-content-between align-items-start gap-2 text-left">
        <p>{comment.comment}</p>
        <Button label="Delete" text onClick={() => onDelete(comment)} />
      </div>
    </Card>
  );
}
