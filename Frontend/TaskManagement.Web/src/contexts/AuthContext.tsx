import { createContext, useState, useEffect, ReactNode } from "react";
import type { User, LoginRequest, CreateUser } from "../types/user";
import { authService } from "../services/authService";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: CreateUser) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

function getTokenExpiration(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<User | null>(null);

  const login = async (data: LoginRequest) => {
    const result = await authService.login(data);
    localStorage.setItem("token", result.token);
    setToken(result.token);
    setUser(result.user);
  };

  const register = async (data: CreateUser) => {
    const result = await authService.register(data);
    localStorage.setItem("token", result.token);
    setToken(result.token);
    setUser(result.user);
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) return;

    const expiresAt = getTokenExpiration(token);
    if (!expiresAt || expiresAt <= Date.now()) {
      logout();
      return;
    }

    const timeoutId = setTimeout(() => {
      logout();
    }, expiresAt - Date.now());

    return () => clearTimeout(timeoutId);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
