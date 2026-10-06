import "server-only";
import type { CartLine, Order } from "@/types";
// Integration contracts. Implement with a production database/provider, never local memory.
export interface OrderRepository {
  lookup(orderNumber: string, email: string): Promise<Order | null>;
}
export interface PaymentGateway {
  createSession(input: {
    orderId: string;
    amount: number;
    currency: string;
    idempotencyKey: string;
  }): Promise<{ checkoutUrl: string; sessionId: string }>;
  verifyWebhook(
    rawBody: string,
    signature: string,
  ): Promise<{
    eventId: string;
    orderId: string;
    paidAmount: number;
    currency: string;
  }>;
}
export interface CheckoutService {
  create(input: {
    items: CartLine[];
    shippingMethod: string;
    customerEmail: string;
  }): Promise<{ checkoutUrl: string }>;
}
export const unavailable = (message: string) =>
  Response.json(
    { code: "SERVICE_NOT_CONFIGURED", message },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
// Deliberately fail closed until adapters, inventory checks, validated addresses,
// server-side price/tax calculation, idempotency, and persistence are implemented.
