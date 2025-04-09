"use client";

import { ProductCard } from "./ProductCard";
import { ProductsNotFound } from "./ProductsNotFound";
import { ProductsSkeleton } from "./ProductsSkeleton";
import { useProducts } from "@/hooks/useProducts";

export function ProductsList() {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (!products || products.length === 0) {
    return <ProductsNotFound />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
