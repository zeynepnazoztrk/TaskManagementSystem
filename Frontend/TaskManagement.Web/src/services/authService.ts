import api from "./api";
import type { LoginRequest, CreateUser } from "../types/user";

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  register: async (data: CreateUser) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem("token");
  },
};
