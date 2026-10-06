"use client";
import { useState } from "react";
import { ArrowRight, Check, Package, ExternalLink } from "lucide-react";
import { demoOrder } from "@/data/demo-order";
import { money } from "@/lib/commerce";
import type { Order } from "@/types";
const statuses = [
  "Order received",
  "Payment confirmed",
  "Processing",
  "Shipped",
  "Delivered",
];
export function Tracking() {
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <div className="tracking-layout">
      <form
        className="tracking-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setOrder(null);
          setPending(true);
          try {
            const res = await fetch("/api/orders/lookup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ preview: true }),
            });
            const data = await res.json();
            setStatus(data.message);
          } catch {
            setStatus("Unable to connect. Please try again.");
          } finally {
            setPending(false);
          }
        }}
      >
        <Package size={32} strokeWidth={1.2} />
        <h2>Follow your order.</h2>
        <p className="muted">Enter the details from your order confirmation.</p>
        <label>
          Order number
          <input
            name="order"
            required
            placeholder="Your order number"
            autoComplete="off"
            maxLength={80}
          />
        </label>
        <label>
          Customer email
          <input
            name="email"
            required
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <button className="button full" disabled={pending}>
          {pending ? "Looking up…" : "Track order"}
          <ArrowRight size={17} />
        </button>
        <p role="status">{status}</p>
        <div className="tracking-demo">
          <p>Live tracking is not connected yet.</p>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setOrder(demoOrder);
              setStatus("");
            }}
          >
            View an example order <ArrowRight size={16} />
          </button>
        </div>
      </form>
      {order ? (
        <div className="order-panel">
          <div className="notice">
            Demonstration only — this is not a real order.
          </div>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Order {order.number}</p>
              <h2>{order.status}</h2>
            </div>
            <span>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
                timeZone: "UTC",
              }).format(new Date(`${order.date}T12:00:00Z`))}
            </span>
          </div>
          <ol className="timeline">
            {statuses.map((s, i) => (
              <li
                className={
                  i <= statuses.indexOf(order.status) ? "complete" : ""
                }
                key={s}
              >
                <span>
                  {i <= statuses.indexOf(order.status) ? (
                    <Check size={13} />
                  ) : (
                    i + 1
                  )}
                </span>
                <div>
                  {s}
                  {s === order.status && <small>Current status</small>}
                </div>
              </li>
            ))}
          </ol>
          <h3>Order items</h3>
          {order.items.map((i) => (
            <div className="summary-row" key={i.name}>
              <span>
                {i.name} × {i.quantity}
              </span>
              <strong>{money(i.amount * i.quantity)}</strong>
            </div>
          ))}
          <div className="order-shipping">
            <p>
              Shipping method <strong>{order.shippingMethod}</strong>
            </p>
            <p>
              Tracking number{" "}
              <strong>{order.trackingNumber || "Not available yet"}</strong>
            </p>
            {order.trackingUrl && /^https:\/\//.test(order.trackingUrl) ? (
              <a
                className="text-link"
                href={order.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Track with carrier <ExternalLink size={16} />
              </a>
            ) : (
              <p className="fineprint">
                Carrier link will appear on live shipped orders. This example
                has no live tracking link.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="tracking-placeholder">
          <span className="orbital" aria-hidden="true">
            ↗
          </span>
          <h2>
            From our door
            <br />
            to yours.
          </h2>
          <p className="muted">Order updates, all in one place.</p>
        </div>
      )}
    </div>
  );
}
