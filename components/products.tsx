"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { money } from "@/lib/commerce";
import { useCart } from "./cart-provider";
export function ProductCard({ product: p }: { product: Product }) {
  const cart = useCart();
  return (
    <article className="product-card">
      <div className="product-picture">
        <Link href={`/products/${p.slug}`} aria-label={`View ${p.name}`}>
          <Image
            src={p.images[0].src}
            alt={p.images[0].alt}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
          />
        </Link>
        {p.badge && (
          <span className={`badge badge-${p.badge.toLowerCase()}`}>
            {p.badge}
          </span>
        )}
        <button
          className="quick-add"
          aria-label={`Add ${p.name} to cart`}
          onClick={() => cart.add(p.id, p.variants[0].id)}
        >
          <Plus size={18} />
        </button>
      </div>
      <p className="product-category">{p.category}</p>
      <div className="product-title-row">
        <h3>
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
        </h3>
        <ArrowUpRight size={17} />
      </div>
      <p className="product-subtitle">{p.subtitle}</p>
      <div className="product-price">
        {money(p.price)}
        {p.compareAt && <del>{money(p.compareAt)}</del>}
        <span>Sample</span>
      </div>
    </article>
  );
}
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
