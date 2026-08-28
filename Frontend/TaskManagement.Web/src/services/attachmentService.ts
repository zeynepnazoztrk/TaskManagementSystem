import api from "./api";
import type { TaskAttachment } from "../types/attachment";

export const attachmentService = {
  getAll: async (taskId: string) => {
    const response = await api.get<TaskAttachment[]>(
      `/tasks/${taskId}/attachments`,
    );
    return response.data;
  },
  upload: async (taskId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post<TaskAttachment>(
      `/tasks/${taskId}/attachments`,
      formData,
      { headers: { "Content-Type": undefined } },
    );
    return response.data;
  },
  delete: async (taskId: string, attachmentId: string) => {
    await api.delete(`/tasks/${taskId}/attachments/${attachmentId}`);
  },
};
