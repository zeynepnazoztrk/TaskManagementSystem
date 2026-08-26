import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { taskService } from "../services/taskService";
import { TaskDetail } from "../components/TaskDetail";
import type { TaskItem } from "../types/task";

export function TaskDetailed() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskItem | null>(null);

  useEffect(() => {
    if (!taskId) return;
    taskService.get(taskId).then(setTask);
  }, [taskId]);

  return <div>{task && <TaskDetail task={task} />}</div>;
}
