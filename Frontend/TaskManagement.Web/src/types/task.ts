import { Priority, TaskStatus } from "./enums";

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  dueDate?: string;
  completedAt?: string;
  userId: string;
  categoryId?: string;
  categoryName: string;
  categoryColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
  categoryId?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: Priority;
  status?: TaskStatus;
  dueDate?: string;
  categoryId?: string;
}

export interface TaskFilter {
  status?: TaskStatus;
  priority?: Priority;
  categoryId?: string;
  searchTerm?: string;
  dueDate?: string;
  page?: number;
  pageSize?: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
