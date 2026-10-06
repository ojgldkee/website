import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { store } from "@/data/store";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base || store.demoMode) return [];
  return [
    "",
    "/collections",
    "/about",
    "/standards",
    "/documentation",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/shipping",
    "/returns",
    "/disclaimer",
    ...products.map((p) => `/products/${p.slug}`),
  ].map((path) => ({ url: `${base}${path}` }));
}
