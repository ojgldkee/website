"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, LockKeyhole, Wallet } from "lucide-react";
import { useCart } from "./cart-provider";
import { EmptyCart } from "./cart";
import { money, shippingCost } from "@/lib/commerce";
import { store } from "@/data/store";
function AddressFields({ prefix = "shipping" }: { prefix?: string }) {
  return (
    <div className="form-grid">
      <label>
        First name
        <input
          required
          name={`${prefix}FirstName`}
          autoComplete={`${prefix} given-name`}
          maxLength={80}
        />
      </label>
      <label>
        Last name
        <input
          required
          name={`${prefix}LastName`}
          autoComplete={`${prefix} family-name`}
          maxLength={80}
        />
      </label>
      <label className="span-2">
        Address
        <input
          required
          name={`${prefix}Address`}
          autoComplete={`${prefix} address-line1`}
          maxLength={200}
        />
      </label>
      <label className="span-2">
        Apartment, suite, etc. <span>(optional)</span>
        <input
          name={`${prefix}Address2`}
          autoComplete={`${prefix} address-line2`}
          maxLength={100}
        />
      </label>
      <label>
        City
        <input
          required
          name={`${prefix}City`}
          autoComplete={`${prefix} address-level2`}
          maxLength={100}
        />
      </label>
      <label>
        State / region
        <input
          required
          name={`${prefix}Region`}
          autoComplete={`${prefix} address-level1`}
          maxLength={100}
        />
      </label>
      <label>
        Postal code
        <input
          required
          name={`${prefix}PostalCode`}
          autoComplete={`${prefix} postal-code`}
          maxLength={20}
        />
      </label>
      <label>
        Country
        <select
          required
          name={`${prefix}Country`}
          autoComplete={`${prefix} country`}
          defaultValue=""
        >
          <option value="" disabled>
            Select country
          </option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="AU">Australia</option>
        </select>
      </label>
    </div>
  );
}
export function Checkout() {
  const cart = useCart();
  const [method, setMethod] = useState("standard");
  const [differentBilling, setDifferentBilling] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoStatus, setPromoStatus] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const shipping = shippingCost(cart.subtotal, method);
  if (!cart.ready) return <p role="status">Loading checkout…</p>;
  if (!cart.count) return <EmptyCart />;
  return (
    <>
      <div className="notice">
        Store preview — orders and payments are unavailable. Please use sample
        information to explore checkout.
      </div>
      <form
        className="checkout-grid"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          setStatus("");
          try {
            const response = await fetch("/api/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                items: cart.lines,
                shippingMethod: method,
              }),
            });
            const data = await response.json();
            setStatus(data.message);
          } catch {
            setStatus("We could not connect. Please try again.");
          } finally {
            setPending(false);
          }
        }}
      >
        <div>
          <section className="checkout-section">
            <h2>
              <span>01</span> Contact
            </h2>
            <label>
              Email address
              <input
                name="email"
                required
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
          </section>
          <section className="checkout-section">
            <h2>
              <span>02</span> Shipping address
            </h2>
            <AddressFields />
            <p className="fineprint">
              Countries shown are examples; shipping availability is not
              confirmed.
            </p>
          </section>
          <section className="checkout-section">
            <h2>
              <span>03</span> Delivery method
            </h2>
            {store.shipping.map((s) => (
              <label
                className={`shipping-option ${method === s.id ? "selected" : ""}`}
                key={s.id}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  checked={method === s.id}
                  onChange={() => setMethod(s.id)}
                />
                <span>
                  <strong>{s.name}</strong>
                  <small>{s.description}</small>
                </span>
                <strong>
                  {shippingCost(cart.subtotal, s.id) === 0
                    ? "Free"
                    : money(shippingCost(cart.subtotal, s.id))}
                </strong>
              </label>
            ))}
          </section>
          <section className="checkout-section">
            <h2>
              <span>04</span> Billing & payment
            </h2>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={differentBilling}
                onChange={(e) => setDifferentBilling(e.target.checked)}
              />{" "}
              Use a different billing address
            </label>
            {differentBilling && <AddressFields prefix="billing" />}
            <div className="payment-option">
              <Wallet size={24} />
              <div>
                <strong>Pay with crypto</strong>
                <p>
                  Provider checkout will open securely once payments are
                  connected.
                </p>
              </div>
              <span className="badge">Coming soon</span>
            </div>
            <p className="fineprint">
              Supported currencies and networks will be confirmed by the payment
              provider. Do not send cryptocurrency to this demo.
            </p>
          </section>
        </div>
        <aside className="summary-panel checkout-summary">
          <h2>
            Your selection <span>({cart.count})</span>
          </h2>
          {cart.items.map((l) => (
            <div className="checkout-item" key={l.productId + l.variantId}>
              <Image
                src={l.product.images[0].src}
                alt={l.product.images[0].alt}
                width={60}
                height={75}
              />
              <div>
                <strong>{l.product.name}</strong>
                <small>
                  {l.variant.label} · Qty {l.quantity}
                </small>
              </div>
              <span>{money(l.total)}</span>
            </div>
          ))}
          <div className="promo-row">
            <label className="sr-only" htmlFor="promo">
              Promo code
            </label>
            <input
              id="promo"
              placeholder="Promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button
              className="button outline"
              type="button"
              onClick={() =>
                setPromoStatus(
                  promo.trim()
                    ? "Promo codes are not active during preview."
                    : "Enter a promo code first.",
                )
              }
            >
              Apply
            </button>
          </div>
          <p role="status" className="fineprint">
            {promoStatus}
          </p>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{money(cart.subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping estimate</span>
            <span>{shipping === 0 ? "Free" : money(shipping)}</span>
          </div>
          <div className="summary-row">
            <span>Taxes</span>
            <span>Not configured</span>
          </div>
          <div className="summary-row total">
            <strong>Estimated total</strong>
            <strong>{money(cart.subtotal + shipping)}</strong>
          </div>
          <p className="fineprint">
            {store.currency} · excludes any applicable taxes.
          </p>
          <button className="button full" disabled={pending}>
            {pending ? "Checking availability…" : "Check payment availability"}
            <ArrowRight size={17} />
          </button>
          <p role="status" className="form-status">
            {status}
          </p>
          <p className="secure-note">
            <LockKeyhole size={14} /> No payment collected in preview
          </p>
          <p className="fineprint">
            Please review our <Link href="/terms">terms</Link> and{" "}
            <Link href="/privacy">privacy policy</Link> before placing an order
            when the store launches.
          </p>
        </aside>
      </form>
    </>
  );
}
