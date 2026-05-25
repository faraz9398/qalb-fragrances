import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
        <p className="text-qalb-black/40 text-lg font-heading">No products found</p>
        <p className="text-qalb-black/30 text-sm mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="opacity-0 animate-[fadeIn_0.5s_ease_forwards]"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
