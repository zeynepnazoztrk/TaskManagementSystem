import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import type { TaskItem } from "../types/task";
import { priorityTags, statusTags } from "../utils/taskTags";

interface TaskListProps {
  tasks: TaskItem[];
  onView: (task: TaskItem) => void;
  onEdit: (task: TaskItem) => void;
  onDelete: (task: TaskItem) => void;
}

export function TaskList({ tasks, onView, onEdit, onDelete }: TaskListProps) {
  const categoryBody = (task: TaskItem) =>
    task.categoryName ? (
      <Tag
        value={task.categoryName}
        style={{ backgroundColor: task.categoryColor, color: "#ffffff" }}
      />
    ) : (
      <span className="text-color-secondary">—</span>
    );

  const priorityBody = (task: TaskItem) => (
    <Tag
      value={priorityTags[task.priority].label}
      style={{
        backgroundColor: priorityTags[task.priority].background,
        color: priorityTags[task.priority].text,
      }}
    />
  );

  const statusBody = (task: TaskItem) => (
    <Tag
      value={statusTags[task.status].label}
      style={{
        backgroundColor: statusTags[task.status].background,
        color: statusTags[task.status].text,
      }}
    />
  );

  const dueDateBody = (task: TaskItem) =>
    task.dueDate ? (
      new Date(task.dueDate).toLocaleDateString()
    ) : (
      <span className="text-color-secondary"></span>
    );

  const actionsBody = (task: TaskItem) => (
    <div className="flex gap-2 justify-content-center">
      <Button icon="pi pi-eye" text onClick={() => onView(task)} />
      <Button icon="pi pi-pencil" text onClick={() => onEdit(task)} />
      <Button icon="pi pi-trash" text onClick={() => onDelete(task)} />
    </div>
  );

  return (
    <DataTable value={tasks} stripedRows>
      <Column field="title" header="Title" />
      <Column
        header="Category"
        body={categoryBody}
        align="center"
        alignHeader="center"
      />
      <Column
        header="Priority"
        body={priorityBody}
        align="center"
        alignHeader="center"
      />
      <Column
        header="Status"
        body={statusBody}
        align="center"
        alignHeader="center"
      />
      <Column
        header="Due Date"
        body={dueDateBody}
        align="center"
        alignHeader="center"
      />
      <Column
        header="Actions"
        body={actionsBody}
        align="center"
        alignHeader="center"
      />
    </DataTable>
  );
}
