"use client";

import { useProducts } from "@/hooks/useProducts";
import { useParams } from "next/navigation";
import { ProductSkeleton } from "./(components)/ProductSkeleton";
import { ProductNotFound } from "./(components)/ProductNotFound";
import { ProductDetails } from "./(components)/ProductDetails";

export default function ProductPage() {
  const { id } = useParams();
  const { getProductById } = useProducts();

  const { data: product, isLoading } = getProductById(id as string);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return <ProductDetails product={product} />;
}
