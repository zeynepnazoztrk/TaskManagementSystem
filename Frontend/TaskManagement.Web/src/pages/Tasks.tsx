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
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export function Tasks() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [previewTask, setPreviewTask] = useState<TaskItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<TaskFilterType>({});
  const toast = useRef<Toast>(null);
  const handleSaved = () => {
    setFormVisible(false);
    loadTasks();
    toast.current?.show({
      severity: "success",
      summary: editingTask ? "Task updated." : "Task created.",
    });
  };

  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setFilter((prev) => ({ ...prev, searchTerm: urlSearch }));
    }
  }, [searchParams]);

  const loadTasks = async () => {
    setLoading(true);
    const result = await taskService.getAll(filter);
    setTasks(result.items);
    setLoading(false);
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
        toast.current?.show({ severity: "success", summary: "Task deleted." });
      },
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="flex justify-content-between align-items-center mb-4">
        <h1> </h1>
        <Button label="Add Task" icon="pi pi-plus" onClick={openCreate} />
      </div>
      <TaskFilter filter={filter} onChange={setFilter} />
      {loading ? (
        <LoadingSpinner />
      ) : tasks.length === 0 ? (
        <p className="text-color-secondary text-center p-5">
          No tasks yet — create your first one.
        </p>
      ) : (
        <TaskList
          tasks={tasks}
          onView={setPreviewTask}
          onEdit={openEdit}
          onDelete={confirmDelete}
        />
      )}
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
