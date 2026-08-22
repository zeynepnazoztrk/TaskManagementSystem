export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  userId: string;
  createdAt: string;
}

export interface CreateCategory {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateCategory {
  name?: string;
  description?: string;
  color?: string;
}
