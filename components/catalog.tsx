"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductGrid } from "./products";
export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [sort, setSort] = useState("featured");
  const [badge, setBadge] = useState(params.get("filter") || "all");
  const search = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setCategory(params.get("category") || "All");
    setBadge(params.get("filter") || "all");
    setQuery(params.get("q") || "");
    if (params.has("search")) search.current?.focus();
  }, [params]);
  const filtered = products
    .filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (badge === "all" || p.badge?.toLowerCase() === badge) &&
        `${p.name} ${p.category} ${p.subtitle}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : 0,
    );
  return (
    <>
      <div
        className="category-tabs"
        id="categories"
        aria-label="Product categories"
      >
        {["All", ...categories.map((c) => c.name)].map((c) => (
          <button
            aria-pressed={category === c}
            className={category === c ? "active" : ""}
            onClick={() => setCategory(c)}
            key={c}
          >
            {c === "All" ? "All products" : c}
          </button>
        ))}
      </div>
      <div className="catalog-toolbar">
        <div className="catalog-search">
          <Search size={18} />
          <input
            ref={search}
            aria-label="Search products"
            placeholder="Search the collection"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              aria-label="Clear search"
              className="icon-button"
              onClick={() => setQuery("")}
            >
              <X size={15} />
            </button>
          )}
        </div>
        <div className="catalog-controls">
          <SlidersHorizontal size={16} />
          <label className="sr-only" htmlFor="badge-filter">
            Filter by badge
          </label>
          <select
            id="badge-filter"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
          >
            <option value="all">All selections</option>
            <option value="featured">Featured</option>
            <option value="new">New arrivals</option>
            <option value="sale">On sale</option>
          </select>
          <label className="sr-only" htmlFor="sort">
            Sort products
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Recommended</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>
      </div>
      <p className="result-count" role="status">
        {filtered.length} products{" "}
        <span>Thoughtfully selected. Ready to explore.</span>
      </p>
      {filtered.length ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="empty-state">
          <h2>No matches, yet.</h2>
          <p>Try another search or explore the full collection.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setBadge("all");
              router.replace("/collections");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
