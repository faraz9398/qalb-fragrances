"use client";

import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const price = item.product.salePrice || item.product.price;

  return (
    <div className="flex gap-4 py-5 border-b border-qalb-black/5 last:border-0">
      <Link
        href={`/products/${item.product.slug}`}
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-qalb-cream flex-shrink-0"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.product.slug}`}>
          <h3 className="font-heading text-sm sm:text-base text-qalb-black/90 hover:text-qalb-gold transition-colors line-clamp-1">
            {item.product.name}
          </h3>
        </Link>
        <p className="text-xs text-qalb-black/40 mt-0.5">
          ₹{price.toLocaleString()} each
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-qalb-black/10 rounded-md">
            <button
              onClick={() => {
                if (item.quantity <= 1) removeItem(item.product.id);
                else updateQuantity(item.product.id, item.quantity - 1);
              }}
              className="p-1.5 sm:p-2 hover:bg-qalb-black/5 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="p-1.5 sm:p-2 hover:bg-qalb-black/5 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm sm:text-base text-qalb-black/80">
              ₹{(price * item.quantity).toLocaleString()}
            </span>
            <button
              onClick={() => removeItem(item.product.id)}
              className="text-qalb-black/30 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
