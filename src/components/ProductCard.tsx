"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import SaleBadge from "./SaleBadge";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-qalb-cream"
      >
        {discount > 0 && <SaleBadge percentage={discount} />}
        <div className={`absolute inset-0 bg-qalb-cream ${imgLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-500`} />
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onLoad={() => setImgLoaded(true)}
          className={`object-cover group-hover:scale-105 transition-transform duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-base sm:text-lg text-qalb-black/90 group-hover:text-qalb-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        {product.volume && (
          <p className="text-xs text-qalb-black/40 mt-0.5">{product.volume}</p>
        )}

        <div className="flex items-center gap-2 mt-2">
          {product.salePrice ? (
            <>
              <span className="font-semibold text-qalb-gold">
                ₹{product.salePrice.toLocaleString()}
              </span>
              <span className="text-xs text-qalb-black/40 line-through">
                ₹{product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="font-semibold text-qalb-black/80">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={() => {
            addItem(product);
            showToast(`${product.name} added to cart`);
            setAdded(true);
            setTimeout(() => setAdded(false), 1200);
          }}
          disabled={!product.inStock}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
            added
              ? "bg-green-600 text-white"
              : "bg-qalb-black text-qalb-cream hover:bg-qalb-gold hover:text-qalb-black"
          }`}
        >
          {added ? <Check size={15} /> : <ShoppingBag size={15} />}
          {!product.inStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
