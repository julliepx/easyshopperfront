"use client";

import { Product, Category } from "@/services/products/types";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { ProductFormModal } from "./ProductFormModal";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { deleteProduct } = useProducts();
  const { isAuthenticated } = useAuth();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    try {
      deleteProduct(product.id);
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            {isAuthenticated && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditOpen(true);
                  }}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <Pencil size={16} className="text-blue-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsConfirmOpen(true);
                  }}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <span className="text-sm font-medium text-blue-600">
                {formatCurrency(product.price)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500">
                {Category[product.category]}
              </span>
              <span className="text-xs font-medium text-gray-500">
                Stock: {product.stock}
              </span>
            </div>
          </div>
        </Link>
      </div>

      {isAuthenticated && (
        <>
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleDelete}
            title="Delete Product"
            message="Are you sure you want to delete this product?"
          />

          <ProductFormModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            mode="edit"
            product={product}
          />
        </>
      )}
    </>
  );
}
