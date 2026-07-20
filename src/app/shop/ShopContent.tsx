"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopContentProps {
  initialProducts: Product[];
}

type SortOption = "newest" | "price-asc" | "price-desc";

export function ShopContent({ initialProducts }: ShopContentProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    let products = [...initialProducts];

    // Filter by category
    if (selectedCategory !== "all") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        break;
    }

    return products;
  }, [initialProducts, selectedCategory, sortBy]);

  return (
    <main className="pb-20 lg:pb-0">
      {/* Page Header */}
      <div className="bg-cream-alt py-12 lg:py-16 border-b border-cream-base/80">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-3xl lg:text-5xl font-bold text-charcoal-text mb-3">
            Our Collection
          </h1>
          <p className="text-muted-text max-w-lg mx-auto">
            Discover handpicked sarees that celebrate tradition, elegance, and timeless beauty.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Filter/Sort Bar */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium text-charcoal-text border border-cream-alt px-4 py-2.5 rounded-md hover:border-rose-accent transition-colors lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {/* Category pills - desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200",
                  selectedCategory === cat
                    ? "bg-rose-accent text-cream-base border-rose-accent"
                    : "bg-cream-base text-charcoal-text border-cream-alt hover:border-rose-accent"
                )}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-text hidden sm:block">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm bg-cream-base border border-cream-alt rounded-md px-3 py-2.5 text-charcoal-text focus:outline-none focus:border-rose-accent"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity",
            showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setShowFilters(false)}
        >
          <div
            className={cn(
              "fixed bottom-0 left-0 right-0 bg-cream-base rounded-t-2xl p-6 z-50 transition-transform duration-300",
              showFilters ? "translate-y-0" : "translate-y-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-sm font-semibold text-charcoal-text mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowFilters(false);
                  }}
                  className={cn(
                    "px-4 py-2 text-sm rounded-full border transition-colors",
                    selectedCategory === cat
                      ? "bg-rose-accent text-cream-base border-rose-accent"
                      : "bg-cream-base text-charcoal-text border-cream-alt"
                  )}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-text mb-6">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-charcoal-text mb-2">No products found</p>
            <p className="text-muted-text text-sm">Try changing your filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
