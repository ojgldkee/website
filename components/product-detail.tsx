"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileText, Package, ShieldCheck } from "lucide-react";
import type { Product } from "@/types";
import { money } from "@/lib/commerce";
import { store } from "@/data/store";
import { useCart } from "./cart-provider";
import { Quantity } from "./cart";
export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  return (
    <div className="gallery">
      <div className="gallery-main">
        <Image
          priority
          src={product.images[active].src}
          alt={product.images[active].alt}
          fill
          sizes="(max-width: 800px) 100vw, 50vw"
        />
        <span className="image-caption">Illustrative sample packaging</span>
      </div>
      <div className="gallery-thumbnails">
        {product.images.map((img, i) => (
          <button
            className={active === i ? "active" : ""}
            key={img.src}
            aria-label={`Show image ${i + 1}`}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <Image src={img.src} alt={img.alt} width={80} height={90} />
          </button>
        ))}
      </div>
    </div>
  );
}
export function ProductDetail({ product: p }: { product: Product }) {
  const cart = useCart();
  const [variantId, setVariant] = useState(p.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [sticky, setSticky] = useState(false);
  const cta = useRef<HTMLDivElement>(null);
  const variant = p.variants.find((v) => v.id === variantId)!;
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (cta.current)
        setSticky(cta.current.getBoundingClientRect().bottom <= 0);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const add = () => cart.add(p.id, variantId, quantity);
  return (
    <>
      <div className="product-detail">
        <ProductGallery product={p} />
        <div className="product-info">
          <p className="eyebrow">{p.category}</p>
          <h1>{p.name}</h1>
          <p className="detail-subtitle">{p.subtitle}</p>
          <div className="detail-price">
            {money(variant.price)}
            {p.compareAt && variantId === "single" && (
              <del>{money(p.compareAt)}</del>
            )}
            <span className="badge">Sample listing</span>
          </div>
          <p>{p.description}</p>
          <fieldset className="variant-picker">
            <legend>Select an option</legend>
            {p.variants.map((v) => (
              <button
                type="button"
                key={v.id}
                className={v.id === variantId ? "selected" : ""}
                aria-pressed={v.id === variantId}
                onClick={() => setVariant(v.id)}
              >
                {v.label}
                <span>{money(v.price)}</span>
              </button>
            ))}
          </fieldset>
          <div className="product-cta" ref={cta}>
            <Quantity value={quantity} onChange={setQuantity} />
            <button className="button" onClick={add}>
              Add to cart <ArrowRight size={18} />
            </button>
          </div>
          <p className="fineprint">
            Preview only. No payment will be collected.
          </p>
          <div className="product-trust">
            <span>
              <Package size={17} /> Free standard shipping over{" "}
              {money(store.freeShippingThreshold)}
            </span>
            <span>
              <ShieldCheck size={17} /> Clear product information
            </span>
            <Link href="/documentation">
              <FileText size={17} /> Product documentation
            </Link>
          </div>
          <div className="accordions">
            <details open>
              <summary>Product specifications</summary>
              <dl className="specs">
                {p.specifications.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </details>
            <details>
              <summary>Shipping & returns</summary>
              <p>
                Shipping options are illustrative until launch. Review our{" "}
                <Link href="/shipping">shipping policy</Link> and{" "}
                <Link href="/returns">returns policy</Link> for current details.
              </p>
            </details>
            <details>
              <summary>Documentation & resources</summary>
              <p>Final product resources have not been uploaded.</p>
              {p.resources.map((r) => (
                <Link
                  className="text-link resource-link"
                  href={r.href}
                  key={r.href}
                >
                  {r.label}
                  <ArrowRight size={16} />
                </Link>
              ))}
            </details>
          </div>
        </div>
      </div>
      {sticky && (
        <div className="sticky-atc">
          <div>
            <strong>{p.name}</strong>
            <span>
              {variant.label} · {money(variant.price * quantity)}
            </span>
          </div>
          <button className="button" onClick={add}>
            Add {quantity > 1 ? `${quantity} ` : ""}to cart{" "}
            <ArrowRight size={17} />
          </button>
        </div>
      )}
    </>
  );
}
