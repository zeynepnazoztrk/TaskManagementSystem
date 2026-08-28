import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import type { TaskItem } from "../types/task";
import { priorityTags, statusTags } from "../utils/taskTags";
import { CommentsSection } from "../components/CommentsSection";
import { AttachmentsSection } from "../components/AttachmentsSection";

interface TaskDetailProps {
  task: TaskItem;
  onEdit: (task: TaskItem) => void;
  onDelete: (task: TaskItem) => void;
}

export function TaskDetail({ task, onEdit, onDelete }: TaskDetailProps) {
  return (
    <Card
      title={task.title}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}
    >
      <div className="flex gap-2 mb-3 justify-content-center">
        <Tag
          value={priorityTags[task.priority].label}
          style={{
            backgroundColor: priorityTags[task.priority].background,
            color: priorityTags[task.priority].text,
          }}
        />
        <Tag
          value={statusTags[task.status].label}
          style={{
            backgroundColor: statusTags[task.status].background,
            color: statusTags[task.status].text,
          }}
        />
        {task.categoryName && (
          <Tag
            value={task.categoryName}
            style={{ backgroundColor: task.categoryColor, color: "#ffffff" }}
          />
        )}
      </div>

      {task.dueDate && (
        <p className="text-lg text-center mt-4 mb-4">
          Due Date: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <h3 className="mt-5">Description</h3>
      <p className="text-color-secondary">
        {task.description || "No description provided."}
      </p>

      <div className="flex justify-content-center gap-2 mt-5">
        <Button label="Edit" text onClick={() => onEdit(task)} />
        <Button label="Delete" text onClick={() => onDelete(task)} />
      </div>

      <h3 className="mt-8"></h3>
      <AttachmentsSection taskId={task.id} />

      <h3 className="mt-8"></h3>
      <CommentsSection taskId={task.id} />
    </Card>
  );
}
