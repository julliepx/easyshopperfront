import api from "@/lib/axios";
import { Product } from "./types";

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const response = await api.post("/products", product);
  return response.data;
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
