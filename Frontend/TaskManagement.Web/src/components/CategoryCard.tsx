import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { taskService } from "../services/taskService";
import type { Category } from "../types/category";
import type { TaskItem } from "../types/task";
import { priorityTags, statusTags } from "../utils/taskTags";
import { useEffect, useState } from "react";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    taskService.getAll({ categoryId: category.id }).then((result) => {
      setTasks(result.items);
    });
  }, [category.id]);

  return (
    <Card
      className="h-full"
      style={{
        borderRadius: "10px",
      }}
    >
      <div className="flex align-items-center gap-2 mb-3">
        <span
          style={{
            width: "1rem",
            height: "1rem",
            borderRadius: "3px",
            backgroundColor: category.color,
          }}
        />
        <span className="text-xl font-bold">{category.name}</span>
      </div>
      {category.description && (
        <div className="mb-2 text-left">
          <div className="font-bold mb-1">Description </div>
          <p className="text-color-secondary text-sm m-0">
            {category.description}
          </p>
        </div>
      )}
      <div className="font-bold mb-3 mt-5 text-left">Tasks</div>
      {tasks.length === 0 ? (
        <p className="text-color-secondary text-left text-sm">
          No tasks in this category.
        </p>
      ) : (
        <div className="flex flex-column gap-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-content-between align-items-center p-2"
              style={{
                borderRadius: "6px",
                backgroundColor: "var(--surface-c)",
              }}
            >
              <span
                className="text-overflow-ellipsis overflow-hidden white-space-nowrap"
                style={{ minWidth: 0 }}
              >
                {task.title}
              </span>
              <div className="flex gap-2 ">
                <Tag
                  value={priorityTags[task.priority].label}
                  style={{
                    backgroundColor: priorityTags[task.priority].background,
                    color: priorityTags[task.priority].text,
                    whiteSpace: "nowrap",
                  }}
                />
                <Tag
                  value={statusTags[task.status].label}
                  style={{
                    backgroundColor: statusTags[task.status].background,
                    color: statusTags[task.status].text,
                    whiteSpace: "nowrap",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-content-center gap-2 mt-5">
        <Button label="Edit" text onClick={() => onEdit(category)} />
        <Button label="Delete" text onClick={() => onDelete(category)} />
      </div>
    </Card>
  );
}
