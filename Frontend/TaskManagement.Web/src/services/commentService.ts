import api from "./api";
import type { TaskComment, CreateComment } from "../types/category";

export const commentService = {
  getAll: async (taskId: string) => {
    const response = await api.get<TaskComment[]>(`/tasks/${taskId}/comments`);
    return response.data;
  },
  create: async (taskId: string, data: CreateComment) => {
    const response = await api.post<TaskComment>(
      `/tasks/${taskId}/comments`,
      data,
    );
    return response.data;
  },
  delete: async (taskId: string, commentId: string) => {
    await api.delete(`/tasks/${taskId}/comments/${commentId}`);
  },
};
