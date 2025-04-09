"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { FormField } from "@/components/formfield/FormField";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    try {
      login(data);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center pt-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          or{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            create a new one
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Email address" error={errors.email?.message}>
              <input
                type="email"
                autoComplete="email"
                className="w-full px-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("email")}
              />
            </FormField>

            <FormField label="Password" error={errors.password?.message}>
              <input
                type="password"
                autoComplete="current-password"
                className="w-full px-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("password")}
              />
            </FormField>

            <div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
