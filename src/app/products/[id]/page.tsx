"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ChevronLeft, Check } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const product = products.find((p) => p.slug === params.id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-heading text-2xl text-qalb-black/60">Product not found</h2>
        <Link
          href="/products"
          className="mt-4 text-sm text-qalb-gold hover:underline"
        >
          Back to collection
        </Link>
      </div>
    );
  }

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleAdd = () => {
    addItem(product);
    showToast(`${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-qalb-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-qalb-black/50 hover:text-qalb-gold transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Collection
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="aspect-[4/5] rounded-lg overflow-hidden bg-qalb-cream relative group">
            <div className={`absolute inset-0 bg-qalb-cream ${imgLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-500`} />
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={() => setImgLoaded(true)}
              className={`object-cover group-hover:scale-105 transition-transform duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            />
            {discount > 0 && (
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                <span className="bg-qalb-gold text-qalb-black text-xs font-bold px-2.5 py-1 rounded-sm tracking-wider uppercase">
                  -{discount}%
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            {product.category && (
              <span className="text-qalb-gold text-xs tracking-[0.2em] uppercase font-body mb-2">
                {product.category}
              </span>
            )}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-qalb-black leading-tight">
              {product.name}
            </h1>
            {product.volume && (
              <p className="text-sm text-qalb-black/40 mt-1">{product.volume}</p>
            )}

            <div className="flex items-baseline gap-3 mt-4 sm:mt-5">
              {product.salePrice ? (
                <>
                  <span className="text-2xl sm:text-3xl font-bold text-qalb-gold">
                    ₹{product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-base sm:text-lg text-qalb-black/40 line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-qalb-black/80">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-qalb-black/10">
              <h3 className="text-xs tracking-[0.15em] uppercase text-qalb-black/50 font-semibold mb-3">
                Description
              </h3>
              <p className="text-sm sm:text-base text-qalb-black/70 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.notes && (
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-qalb-black/10">
                <h3 className="text-xs tracking-[0.15em] uppercase text-qalb-black/50 font-semibold mb-3">
                  Fragrance Notes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {product.notes.top && (
                    <div className="bg-white/60 rounded-md p-3">
                      <span className="text-[10px] tracking-wider uppercase text-qalb-gold font-semibold">Top</span>
                      <p className="text-xs text-qalb-black/60 mt-1">{product.notes.top.join(", ")}</p>
                    </div>
                  )}
                  {product.notes.middle && (
                    <div className="bg-white/60 rounded-md p-3">
                      <span className="text-[10px] tracking-wider uppercase text-qalb-gold font-semibold">Heart</span>
                      <p className="text-xs text-qalb-black/60 mt-1">{product.notes.middle.join(", ")}</p>
                    </div>
                  )}
                  {product.notes.base && (
                    <div className="bg-white/60 rounded-md p-3">
                      <span className="text-[10px] tracking-wider uppercase text-qalb-gold font-semibold">Base</span>
                      <p className="text-xs text-qalb-black/60 mt-1">{product.notes.base.join(", ")}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-auto pt-6 sm:pt-8">
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-md text-sm tracking-wider uppercase font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-qalb-black text-qalb-cream hover:bg-qalb-gold hover:text-qalb-black"
                }`}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    Added to Cart
                  </>
                ) : product.inStock ? (
                  <>
                    <ShoppingBag size={18} />
                    Add to Cart
                  </>
                ) : (
                  "Out of Stock"
                )}
              </button>
              <p className="text-xs text-qalb-black/30 text-center mt-2">
                Free shipping on orders above ₹499
              </p>
            </div>
          </div>
        </div>

        {(() => {
          const related = products.filter(
            (p) => p.category === product.category && p.id !== product.id
          );
          if (related.length === 0) return null;
          return (
            <section className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-qalb-black/10">
              <div className="text-center mb-6 sm:mb-8">
                <span className="text-qalb-gold text-xs tracking-[0.2em] uppercase font-body">
                  Complete Your Collection
                </span>
                <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl text-qalb-black mt-2">
                  Related Products
                </h2>
                <div className="w-10 h-0.5 bg-qalb-gold/40 mx-auto mt-3" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/products/${rp.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-qalb-cream">
                      <Image
                        src={rp.images[0]}
                        alt={rp.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-heading text-sm sm:text-base text-qalb-black/80 group-hover:text-qalb-gold transition-colors line-clamp-1">
                        {rp.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        {rp.salePrice ? (
                          <>
                            <span className="text-sm font-semibold text-qalb-gold">
                              ₹{rp.salePrice.toLocaleString()}
                            </span>
                            <span className="text-xs text-qalb-black/40 line-through">
                              ₹{rp.price.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-semibold text-qalb-black/60">
                            ₹{rp.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}
      </div>
    </div>
  );
}
