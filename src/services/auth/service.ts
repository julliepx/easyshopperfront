import api from "@/lib/axios";
import { LoginRequest, RegisterRequest, AuthResponse } from "./types";

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
