"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <nav className="sticky top-0 z-50 bg-qalb-black/95 backdrop-blur-md border-b border-qalb-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-2 h-2 bg-qalb-gold rounded-full" />
            <span className="font-heading text-xl sm:text-2xl tracking-wider text-qalb-cream">
              QALB
            </span>
            <span className="hidden sm:inline text-xs text-qalb-gold/60 tracking-[0.2em] uppercase font-body">
              Fragrances
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm tracking-wider text-qalb-cream/70 hover:text-qalb-gold transition-colors uppercase"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm tracking-wider text-qalb-cream/70 hover:text-qalb-gold transition-colors uppercase"
            >
              Shop
            </Link>
            <Link
              href="/cart"
              className="relative text-qalb-cream/70 hover:text-qalb-gold transition-colors"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span key={itemCount} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-qalb-gold text-qalb-black text-xs flex items-center justify-center font-bold animate-[bounceIn_0.4s_ease]">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <Link href="/cart" className="relative text-qalb-cream/70">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span key={itemCount} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-qalb-gold text-qalb-black text-xs flex items-center justify-center font-bold animate-[bounceIn_0.4s_ease]">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-qalb-cream/70 hover:text-qalb-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-qalb-black border-t border-qalb-gold/10">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-sm tracking-wider text-qalb-cream/70 hover:text-qalb-gold transition-colors uppercase py-2"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="block text-sm tracking-wider text-qalb-cream/70 hover:text-qalb-gold transition-colors uppercase py-2"
            >
              Shop
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
