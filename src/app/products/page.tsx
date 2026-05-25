"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, Search, X } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar from "@/components/FilterSidebar";
import { products, categories } from "@/data/products";
import { Product } from "@/types";

export default function ProductsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");

  const maxPrice = Math.max(...products.map((p) => p.price));

  const filtered = useMemo(() => {
    let result: Product[] = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    result = result.filter(
      (p) => (p.salePrice || p.price) <= priceRange[1]
    );

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, inStockOnly, priceRange, sort, search]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setInStockOnly(false);
    setPriceRange([0, maxPrice]);
    setSort("featured");
    setSearch("");
  };

  const hasActiveFilters =
    selectedCategory !== "All" || inStockOnly || priceRange[1] < maxPrice || sort !== "featured" || search;

  return (
    <div className="min-h-screen bg-qalb-cream">
      <div className="bg-qalb-black py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-qalb-cream">
            Our Collection
          </h1>
          <p className="text-qalb-cream/50 text-sm sm:text-base mt-1">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-qalb-black/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-qalb-black/10 rounded-md text-sm text-qalb-black/80 placeholder-qalb-black/30 focus:outline-none focus:border-qalb-gold/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-qalb-black/30 hover:text-qalb-black">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-qalb-black/10 rounded-md text-sm text-qalb-black/70 hover:border-qalb-gold/50 transition-colors self-start"
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-qalb-gold" />
            )}
          </button>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            maxPrice={maxPrice}
            inStockOnly={inStockOnly}
            onStockToggle={() => setInStockOnly(!inStockOnly)}
            sort={sort}
            onSortChange={setSort}
          />

          <div className="flex-1 min-w-0">
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-xs text-qalb-black/50">Active filters:</span>
                <button
                  onClick={clearFilters}
                  className="text-xs text-qalb-gold hover:text-qalb-black transition-colors underline"
                >
                  Clear all
                </button>
              </div>
            )}
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}
