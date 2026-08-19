export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUser {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
