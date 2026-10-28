import React from "react";
import { Product } from "../../data/mockData";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "../common/Skeleton";

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  emptyState,
  columns = 3,
}) => {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <>{emptyState}</>;
  }

  const colClasses = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={`grid grid-cols-1 ${colClasses[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
