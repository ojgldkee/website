export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  price: number;
  compareAt?: number;
  badge?: "Featured" | "New" | "Sale" | "Best seller";
  images: { src: string; alt: string }[];
  variants: { id: string; label: string; price: number }[];
  specifications: { label: string; value: string }[];
  resources: { label: string; href: string }[];
};
export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};
export type OrderStatus =
  | "Order received"
  | "Payment confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered";
export type Order = {
  number: string;
  date: string;
  status: OrderStatus;
  items: { name: string; quantity: number; amount: number }[];
  shippingMethod: string;
  trackingNumber?: string;
  trackingUrl?: string;
};
