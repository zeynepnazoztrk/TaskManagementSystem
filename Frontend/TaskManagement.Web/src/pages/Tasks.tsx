import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { taskService } from "../services/taskService";
import { TaskList } from "../components/TaskList";
import { TaskFilter } from "../components/TaskFilter";
import { TaskForm } from "../components/TaskForm";
import { TaskCard } from "../components/TaskCard";
import type { TaskItem, TaskFilter as TaskFilterType } from "../types/task";

export function Tasks() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filter, setFilter] = useState<TaskFilterType>({});
  const [formVisible, setFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [previewTask, setPreviewTask] = useState<TaskItem | null>(null);

  const loadTasks = async () => {
    const result = await taskService.getAll(filter);
    setTasks(result.items);
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const openCreate = () => {
    setEditingTask(null);
    setFormVisible(true);
  };
  const openEdit = (task: TaskItem) => {
    setPreviewTask(null);
    setEditingTask(task);
    setFormVisible(true);
  };

  const confirmDelete = (task: TaskItem) => {
    confirmDialog({
      message: `Delete "${task.title}"? `,
      style: { width: "25rem" },
      accept: async () => {
        await taskService.delete(task.id);
        setPreviewTask(null);
        loadTasks();
      },
    });
  };

  const handleSaved = () => {
    setFormVisible(false);
    loadTasks();
  };

  return (
    <div>
      <ConfirmDialog />
      <div className="flex justify-content-between align-items-center mb-4">
        <h1> </h1>
        <Button label="Add Task" icon="pi pi-plus" onClick={openCreate} />
      </div>
      <TaskFilter filter={filter} onChange={setFilter} />
      <TaskList
        tasks={tasks}
        onView={setPreviewTask}
        onEdit={openEdit}
        onDelete={confirmDelete}
      />
      <TaskForm
        visible={formVisible}
        task={editingTask}
        onHide={() => setFormVisible(false)}
        onSaved={handleSaved}
      />
      <Dialog
        header="Task Information"
        visible={previewTask !== null}
        onHide={() => setPreviewTask(null)}
        style={{ width: "30rem" }}
      >
        {previewTask && (
          <TaskCard
            task={previewTask}
            onEdit={openEdit}
            onDelete={confirmDelete}
          />
        )}
      </Dialog>
    </div>
  );
}
