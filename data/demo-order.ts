import type { Order } from "@/types";
// Isolated public demonstration; never use this as a live order lookup fallback.
export const demoOrder: Order = {
  number: "DEMO-1001",
  date: "2026-01-15",
  status: "Shipped",
  items: [
    { name: "Reference No. 01", quantity: 1, amount: 4900 },
    { name: "Specimen Set", quantity: 1, amount: 2900 },
  ],
  shippingMethod: "Standard (example)",
  trackingNumber: "DEMO-TRACKING-001",
};
