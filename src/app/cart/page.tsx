"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const { items, getItemCount, getSubtotal, clearCart } = useCart();
  const itemCount = getItemCount();
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-full bg-qalb-black/5 flex items-center justify-center mb-4">
          <ShoppingBag size={28} className="text-qalb-black/30" />
        </div>
        <h2 className="font-heading text-xl sm:text-2xl text-qalb-black/60">Your cart is empty</h2>
        <p className="text-qalb-black/40 text-sm sm:text-base mt-1">Discover our collection and find your signature scent.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all duration-300"
        >
          <ShoppingBag size={16} />
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-qalb-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl text-qalb-black">Shopping Cart</h1>
            <p className="text-sm text-qalb-black/40 mt-1">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 text-xs sm:text-sm text-qalb-black/40 hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} />
            Clear
          </button>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-qalb-black/60">Subtotal</span>
            <span className="font-semibold text-lg sm:text-xl text-qalb-black/80">
              ₹{subtotal.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-qalb-black/40 mb-4 sm:mb-5">
            Shipping calculated at checkout
          </p>
          <Link
            href="/checkout"
            className="w-full flex items-center justify-center py-3.5 bg-qalb-black text-qalb-cream text-sm tracking-wider uppercase font-semibold rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all duration-300"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/products"
            className="w-full flex items-center justify-center gap-2 py-3 mt-2 text-xs sm:text-sm text-qalb-black/50 hover:text-qalb-gold transition-colors"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
