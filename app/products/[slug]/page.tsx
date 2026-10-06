import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct } from "@/data/products";
import { ProductDetail } from "@/components/product-detail";
import { ProductGrid } from "@/components/products";
import { SectionHeading } from "@/components/ui";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return { title: p?.name || "Product not found", description: p?.description };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  return (
    <div className="container page-space">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/collections">Collection</Link>
        <span>/</span>
        <span>{p.name}</span>
      </nav>
      <ProductDetail product={p} />
      <section className="section">
        <SectionHeading
          eyebrow="KEEP EXPLORING"
          title="A few more possibilities."
          href="/collections"
        />
        <ProductGrid
          products={products.filter((x) => x.id !== p.id).slice(0, 4)}
        />
      </section>
    </div>
  );
}
