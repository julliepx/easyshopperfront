import { z } from "zod";
import { Category } from "@/services/products/types";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(1, "Description cannot be empty."),
  price: z.number().min(0.01, "Price must be greater than 0."),
  imageUrl: z.string().url("Invalid URL."),
  category: z.nativeEnum(Category),
  stock: z
    .number()
    .min(0, "Stock quantity must be greater than or equal to 0."),
});

export type ProductFormData = z.infer<typeof productSchema>;
