"use client";

import { useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Product, Category } from "@/services/products/types";
import { X, Plus, Trash2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schemas/product";
import type { ProductFormData } from "@/schemas/product";
import { FormField } from "@/components/formfield/FormField";
import toast from "react-hot-toast";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  product?: Product;
}

export function ProductFormModal({
  isOpen,
  onClose,
  mode = "create",
  product,
}: ProductModalProps) {
  const { createProduct, updateProduct, isCreating, isUpdating } =
    useProducts();
  const isSubmitting = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      category: Category.SMARTPHONES,
      stock: 0,
    },
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (mode === "edit" && product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        stock: product.stock,
      });
    }
  }, [mode, product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (mode === "create") {
        createProduct(data);
        reset();
        toast.success("Product created successfully!");
      } else if (product) {
        updateProduct({ id: product.id, product: data });
        toast.success("Product updated successfully!");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to save product. Please try again.");
    }
  };

  const getButtonText = () => {
    if (isSubmitting) {
      return mode === "create" ? "Creating..." : "Updating...";
    }
    return mode === "create" ? "Create Product" : "Update Product";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000010] backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === "create" ? "Create New Product" : "Edit Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 overflow-y-auto pr-2"
        >
          <FormField label="Product Name" error={errors.name?.message}>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Description" error={errors.description?.message}>
            <textarea
              rows={3}
              {...register("description")}
              className="w-full px-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Price" error={errors.price?.message}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              )}
            />
          </FormField>

          <FormField label="Image URL" error={errors.imageUrl?.message}>
            <input
              type="url"
              {...register("imageUrl")}
              className="w-full px-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Category" error={errors.category?.message}>
            <select
              {...register("category")}
              className="w-full px-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236B7280%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5em_1.5em] pr-10"
            >
              {Object.entries(Category)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key]) => (
                  <option
                    key={key}
                    value={Category[key as keyof typeof Category]}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                  </option>
                ))}
            </select>
          </FormField>

          <FormField label="Stock" error={errors.stock?.message}>
            <input
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className="w-full px-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </FormField>
        </form>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <div>
            {mode === "create" && (
              <button
                type="button"
                onClick={() => reset()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <Trash2 size={16} />
                Clear Fields
              </button>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} />
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
