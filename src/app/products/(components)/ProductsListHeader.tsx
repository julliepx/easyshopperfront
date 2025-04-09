"use client";

import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { ProductFormModal } from "./ProductFormModal";

export function ProductsListHeader() {
  const { isAuthenticated } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
          <p className="text-gray-600 mt-2">
            Discover our amazing selection of products
          </p>
        </div>
        {isAuthenticated && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 cursor-pointer flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Product
          </button>
        )}
      </div>

      <ProductFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        mode="create"
      />
    </>
  );
}
