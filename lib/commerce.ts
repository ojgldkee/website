import { store } from "@/data/store";
import { products } from "@/data/products";
import type { CartLine } from "@/types";
export const money = (cents: number) =>
  new Intl.NumberFormat(store.locale, {
    style: "currency",
    currency: store.currency,
  }).format(cents / 100);
export function sanitizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  const lines = new Map<string, CartLine>();
  for (const item of value.slice(0, 100)) {
    if (!item || typeof item !== "object") continue;
    const p = products.find((p) => p.id === item.productId);
    if (
      !p?.variants.some((v) => v.id === item.variantId) ||
      !Number.isFinite(item.quantity)
    )
      continue;
    const key = `${p.id}:${item.variantId}`;
    lines.set(key, {
      productId: p.id,
      variantId: item.variantId,
      quantity: Math.min(99, Math.max(1, Math.floor(item.quantity))),
    });
  }
  return [...lines.values()];
}
export function resolveLines(lines: CartLine[]) {
  return sanitizeCart(lines).flatMap((line) => {
    const product = products.find((p) => p.id === line.productId)!;
    const variant = product.variants.find((v) => v.id === line.variantId)!;
    return [
      { ...line, product, variant, total: variant.price * line.quantity },
    ];
  });
}
export function shippingCost(subtotal: number, method = "standard") {
  const option =
    store.shipping.find((s) => s.id === method) ?? store.shipping[0];
  return method === "standard" && subtotal >= store.freeShippingThreshold
    ? 0
    : option.amount;
}
