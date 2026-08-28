import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { commentService } from "../services/commentService";
import { CommentCard } from "./CommentCard";
import { CommentForm } from "./CommentForm";
import type { TaskComment } from "../types/comment";

interface CommentsSectionProps {
  taskId: string;
}

export function CommentsSection({ taskId }: CommentsSectionProps) {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const toast = useRef<Toast>(null);

  const loadComments = () => {
    commentService.getAll(taskId).then(setComments);
  };

  useEffect(() => {
    loadComments();
  }, [taskId]);

  const openCreate = () => {
    setFormVisible(true);
  };

  const handleSaved = () => {
    setFormVisible(false);
    loadComments();
    toast.current?.show({ severity: "success", summary: "Comment added." });
  };

  const confirmDelete = (comment: TaskComment) => {
    confirmDialog({
      message: "Delete this comment?",
      style: { width: "25rem" },
      accept: async () => {
        await commentService.delete(taskId, comment.id);
        loadComments();
        toast.current?.show({
          severity: "success",
          summary: "Comment deleted.",
        });
      },
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Comments</h3>
        <Button label="Add Comment" icon="pi pi-plus" onClick={openCreate} />
      </div>

      {comments.length === 0 ? (
        <p className="text-color-secondary text-sm text-left">No comments.</p>
      ) : (
        <div className="flex flex-column gap-3">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDelete={confirmDelete}
            />
          ))}
        </div>
      )}

      <CommentForm
        visible={formVisible}
        taskId={taskId}
        onHide={() => setFormVisible(false)}
        onSaved={handleSaved}
      />
    </div>
  );
}
