"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  X,
  Trash2,
} from "lucide-react";
import { useCart } from "./cart-provider";
import { money, shippingCost } from "@/lib/commerce";
import { store } from "@/data/store";
export function Quantity({
  value,
  onChange,
  label = "Quantity",
}: {
  value: number;
  onChange: (n: number) => void;
  label?: string;
}) {
  return (
    <div className="quantity">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <span aria-label={label}>{value}</span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
export function CartProgress() {
  const { subtotal } = useCart();
  const remaining = Math.max(0, store.freeShippingThreshold - subtotal);
  return (
    <div className="cart-progress">
      <p>
        {remaining ? (
          <>
            You’re <strong>{money(remaining)}</strong> away from free standard
            shipping
          </>
        ) : (
          <>
            <Check size={15} /> You’ve unlocked free standard shipping
          </>
        )}
      </p>
      <progress
        aria-label="Free shipping progress"
        value={Math.min(subtotal, store.freeShippingThreshold)}
        max={store.freeShippingThreshold}
      />
    </div>
  );
}
export function CartItems() {
  const cart = useCart();
  return (
    <div className="cart-items">
      {cart.items.map((l) => (
        <div className="cart-item" key={l.productId + l.variantId}>
          <Link
            href={`/products/${l.product.slug}`}
            onClick={() => cart.setOpen(false)}
          >
            <Image
              src={l.product.images[0].src}
              alt={l.product.images[0].alt}
              width={90}
              height={110}
            />
          </Link>
          <div>
            <Link
              href={`/products/${l.product.slug}`}
              onClick={() => cart.setOpen(false)}
            >
              {l.product.name}
            </Link>
            <small>{l.variant.label}</small>
            <Quantity
              value={l.quantity}
              label={l.product.name}
              onChange={(n) => cart.update(l.productId, l.variantId, n)}
            />
          </div>
          <div className="cart-item-end">
            <strong>{money(l.total)}</strong>
            <button
              aria-label={`Remove ${l.product.name}`}
              className="icon-button"
              onClick={() => cart.update(l.productId, l.variantId, 0)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export function CartSummary() {
  const cart = useCart();
  return (
    <>
      <div className="summary-row">
        <span>Subtotal</span>
        <strong>{money(cart.subtotal)}</strong>
      </div>
      <div className="summary-row muted">
        <span>Estimated standard shipping</span>
        <span>
          {shippingCost(cart.subtotal) === 0
            ? "Free"
            : money(shippingCost(cart.subtotal))}
        </span>
      </div>
      <p className="fineprint">
        Preview pricing. Taxes and final shipping confirmed before payment when
        checkout launches.
      </p>
      {cart.storageError && (
        <p role="status" className="notice">
          Your browser cannot save this cart. Items may not persist after
          refresh.
        </p>
      )}
    </>
  );
}
export function EmptyCart() {
  const cart = useCart();
  return (
    <div className="empty-state">
      <ShoppingBag size={40} strokeWidth={1} />
      <h2>A little room for discovery.</h2>
      <p>Your cart is currently empty.</p>
      <Link
        className="button"
        href="/collections"
        onClick={() => cart.setOpen(false)}
      >
        Explore the collection <ArrowRight size={17} />
      </Link>
    </div>
  );
}
export function CartDrawer() {
  const cart = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (cart.open) {
      ref.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      ref.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cart.open]);
  return (
    <dialog
      ref={ref}
      className="cart-drawer"
      aria-label="Shopping cart"
      onClose={() => cart.setOpen(false)}
      onClick={(e) => {
        if (e.target === ref.current) cart.setOpen(false);
      }}
    >
      <div className="drawer-body">
        <div className="drawer-heading">
          <h2>
            Your cart <span>({cart.count})</span>
          </h2>
          <button
            className="icon-button"
            aria-label="Close cart"
            onClick={() => cart.setOpen(false)}
          >
            <X />
          </button>
        </div>
        {cart.count ? (
          <>
            <CartProgress />
            <CartItems />
            <div className="drawer-summary">
              <CartSummary />
              <Link
                className="button full"
                href="/checkout"
                onClick={() => cart.setOpen(false)}
              >
                Continue to checkout <ArrowRight size={17} />
              </Link>
              <Link
                className="view-cart"
                href="/cart"
                onClick={() => cart.setOpen(false)}
              >
                View full cart
              </Link>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </dialog>
  );
}
export function CartPage() {
  const cart = useCart();
  if (!cart.ready) return <p role="status">Loading your cart…</p>;
  return cart.count ? (
    <div className="cart-page-grid">
      <CartItems />
      <aside className="summary-panel">
        <h2>Order summary</h2>
        <CartProgress />
        <CartSummary />
        <Link className="button full" href="/checkout">
          Continue to checkout <ArrowRight size={17} />
        </Link>
        <Link className="view-cart" href="/collections">
          Continue exploring
        </Link>
      </aside>
    </div>
  ) : (
    <EmptyCart />
  );
}
