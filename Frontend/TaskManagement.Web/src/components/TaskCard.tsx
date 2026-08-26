import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import type { TaskItem } from "../types/task";
import { priorityTags, statusTags } from "../utils/taskTags";

interface TaskCardProps {
  task: TaskItem;
  onEdit: (task: TaskItem) => void;
  onDelete: (task: TaskItem) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const navigate = useNavigate();

  return (
    <Card title={task.title} className="mb-3">
      <div className="flex gap-2 mb-3">
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
      {task.description && (
        <p className="text-color-secondary"> Description: {task.description}</p>
      )}
      {task.dueDate && (
        <p className="text-color-secondary">
          Due Date: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <div className="flex gap-2 mt-3">
        <Button label="Edit" text onClick={() => onEdit(task)} />
        <Button label="Delete" text onClick={() => onDelete(task)} />
      </div>
      <Button
        label="Go to Task Page"
        text
        className="w-full mt-5"
        onClick={() => navigate(`/tasks/${task.id}`)}
      />
    </Card>
  );
}
