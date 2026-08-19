export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  userId: string;
  createdAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  color?: string;
}
