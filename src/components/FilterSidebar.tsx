"use client";

import { X } from "lucide-react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  inStockOnly: boolean;
  onStockToggle: () => void;
  sort: string;
  onSortChange: (sort: string) => void;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  categories,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  inStockOnly,
  onStockToggle,
  sort,
  onSortChange,
}: FilterSidebarProps) {
  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs tracking-[0.2em] uppercase text-qalb-black/60 font-semibold">
          Filters
        </h3>
        <button onClick={onClose} className="lg:hidden text-qalb-black/40 hover:text-qalb-black">
          <X size={18} />
        </button>
      </div>

      <div>
        <h4 className="text-xs tracking-[0.15em] uppercase text-qalb-black/50 mb-3 font-semibold">
          Category
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
                className="accent-qalb-gold"
              />
              <span className="text-sm text-qalb-black/70 group-hover:text-qalb-black transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs tracking-[0.15em] uppercase text-qalb-black/50 mb-3 font-semibold">
          Availability
        </h4>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={onStockToggle}
            className="accent-qalb-gold rounded"
          />
          <span className="text-sm text-qalb-black/70 group-hover:text-qalb-black transition-colors">
            In Stock Only
          </span>
        </label>
      </div>

      <div>
        <h4 className="text-xs tracking-[0.15em] uppercase text-qalb-black/50 mb-3 font-semibold">
          Price Range
        </h4>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-qalb-gold"
          />
          <div className="flex items-center justify-between text-xs text-qalb-black/50">
            <span>₹0</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs tracking-[0.15em] uppercase text-qalb-black/50 mb-3 font-semibold">
          Sort By
        </h4>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2.5 bg-white border border-qalb-black/10 rounded-md text-sm text-qalb-black/70 focus:outline-none focus:border-qalb-gold/50 transition-colors"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 flex-shrink-0">{content}</div>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-qalb-cream p-6 overflow-y-auto shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
