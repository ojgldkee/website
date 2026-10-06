"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/types";
import { resolveLines, sanitizeCart } from "@/lib/commerce";
const CartContext = createContext<ReturnType<typeof useCartState> | null>(null);
function useCartState() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      setLines(
        sanitizeCart(JSON.parse(localStorage.getItem("store-cart-v1") || "[]")),
      );
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("store-cart-v1", JSON.stringify(lines));
      } catch {
        setStorageError(true);
      }
  }, [lines, ready]);
  const add = (productId: string, variantId: string, quantity = 1) => {
    setLines((old) => {
      const found = old.find(
        (l) => l.productId === productId && l.variantId === variantId,
      );
      return sanitizeCart(
        found
          ? old.map((l) =>
              l === found ? { ...l, quantity: l.quantity + quantity } : l,
            )
          : [...old, { productId, variantId, quantity }],
      );
    });
    setOpen(true);
  };
  const update = (productId: string, variantId: string, quantity: number) =>
    setLines((old) =>
      quantity <= 0
        ? old.filter(
            (l) => !(l.productId === productId && l.variantId === variantId),
          )
        : sanitizeCart(
            old.map((l) =>
              l.productId === productId && l.variantId === variantId
                ? { ...l, quantity }
                : l,
            ),
          ),
    );
  const items = resolveLines(lines);
  const subtotal = items.reduce((n, l) => n + l.total, 0);
  const count = items.reduce((n, l) => n + l.quantity, 0);
  return {
    lines,
    items,
    subtotal,
    count,
    ready,
    open,
    setOpen,
    add,
    update,
    storageError,
  };
}
export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCartState();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider missing");
  return context;
}
