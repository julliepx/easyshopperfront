"use client";

import {
  AuthResponse,
  login,
  LoginRequest,
  register,
  RegisterRequest,
} from "@/services/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: isAuthenticated } = useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      const token = localStorage.getItem("token");
      return !!token;
    },
    initialData: false,
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["auth"], true);
      router.push("/products");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["auth"], true);
      router.push("/products");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["auth"], false);
    queryClient.removeQueries({ queryKey: ["products"] });
    queryClient.removeQueries({ queryKey: ["product"] });
    router.push("/login");
  };

  return {
    logout,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
