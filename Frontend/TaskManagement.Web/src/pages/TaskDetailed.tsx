import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { taskService } from "../services/taskService";
import { TaskDetail } from "../components/TaskDetail";
import { TaskForm } from "../components/TaskForm";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { TaskItem } from "../types/task";

export function TaskDetailed() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const toast = useRef<Toast>(null);

  const loadTask = async () => {
    if (!taskId) return;
    const result = await taskService.get(taskId);
    setTask(result);
    setLoading(false);
  };

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const handleDelete = (task: TaskItem) => {
    confirmDialog({
      message: `Delete "${task.title}"?`,
      style: { width: "25rem" },
      accept: async () => {
        await taskService.delete(task.id);
        toast.current?.show({ severity: "success", summary: "Task deleted." });
        setTimeout(() => navigate("/tasks"), 800);
      },
    });
  };

  const handleSaved = () => {
    setFormVisible(false);
    loadTask();
    toast.current?.show({ severity: "success", summary: "Task updated." });
  };

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      {loading ? (
        <LoadingSpinner />
      ) : (
        task && (
          <TaskDetail
            task={task}
            onEdit={() => setFormVisible(true)}
            onDelete={handleDelete}
          />
        )
      )}
      <TaskForm
        visible={formVisible}
        task={task}
        onHide={() => setFormVisible(false)}
        onSaved={handleSaved}
      />
    </div>
  );
}
