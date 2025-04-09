import { Product } from "@/services/products/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { ProductFormModal } from "@/app/products/(components)/ProductFormModal";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { deleteProduct } = useProducts();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    try {
      deleteProduct(product.id);
      router.push("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <button
              onClick={() => router.push("/products")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </button>
            {isAuthenticated && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => setIsConfirmOpen(true)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">Price</h2>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">
                      Category
                    </h2>
                    <p className="text-lg text-gray-900">{product.category}</p>
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">Stock</h2>
                    <p className="text-lg text-gray-900">{product.stock}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}
