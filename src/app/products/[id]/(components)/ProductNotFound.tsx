import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProductNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Product not found
          </h1>
          <p className="mt-4 text-gray-500">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}
