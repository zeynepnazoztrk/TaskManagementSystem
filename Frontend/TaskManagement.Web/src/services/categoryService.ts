import api from "./api";
import type {
  Category,
  CreateCategory,
  UpdateCategory,
} from "../types/category";

export const categoryService = {
  getAll: async () => {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  },

  get: async (categoryId: string) => {
    const response = await api.get<Category>(`/categories/${categoryId}`);
    return response.data;
  },

  create: async (data: CreateCategory) => {
    const response = await api.post<Category>("/categories", data);
    return response.data;
  },

  update: async (categoryId: string, data: UpdateCategory) => {
    const response = await api.put<Category>(`/categories/${categoryId}`, data);
    return response.data;
  },

  delete: async (categoryId: string) => {
    await api.delete(`/categories/${categoryId}`);
  },
};
