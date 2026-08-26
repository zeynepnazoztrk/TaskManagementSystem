import api from "./api";
import type {
  TaskItem,
  CreateTask,
  UpdateTask,
  TaskFilter,
  PagedResult,
} from "../types/task";
import type { TaskStatistics } from "../types/statistics";

export const taskService = {
  getAll: async (filter: TaskFilter) => {
    const response = await api.get<PagedResult<TaskItem>>("/tasks", {
      params: filter,
    });
    return response.data;
  },

  get: async (taskId: string) => {
    const response = await api.get<TaskItem>(`/tasks/${taskId}`);
    return response.data;
  },

  create: async (data: CreateTask) => {
    const response = await api.post<TaskItem>("/tasks", data);
    return response.data;
  },

  update: async (taskId: string, data: UpdateTask) => {
    const response = await api.put<TaskItem>(`/tasks/${taskId}`, data);
    return response.data;
  },

  delete: async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);
  },

  getStats: async () => {
    const response = await api.get<TaskStatistics>("/tasks/stats");
    return response.data;
  },

  getOverdue: async () => {
    const response = await api.get<TaskItem[]>("/tasks/overdue");
    return response.data;
  },
};
