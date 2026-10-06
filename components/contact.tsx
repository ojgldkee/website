"use client";
import { useState } from "react";
import { ArrowRight, Mail, Clock3, FileText } from "lucide-react";
import Link from "next/link";
import { store } from "@/data/store";
export function ContactForm() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <div className="contact-grid">
      <aside>
        <h2>Let’s start a conversation.</h2>
        <p className="muted">
          Questions about the collection, documentation, or an order? You’re in
          the right place.
        </p>
        <div className="contact-info">
          <Mail size={21} />
          <div>
            <strong>Customer support</strong>
            {store.supportEmail ? (
              <a href={`mailto:${store.supportEmail}`}>{store.supportEmail}</a>
            ) : (
              <p>Support email will be published at launch.</p>
            )}
          </div>
        </div>
        <div className="contact-info">
          <Clock3 size={21} />
          <div>
            <strong>A thoughtful response</strong>
            <p>{store.supportGuidance}</p>
          </div>
        </div>
        <div className="contact-info">
          <FileText size={21} />
          <div>
            <strong>A good place to begin</strong>
            <Link className="text-link" href="/faq">
              Explore frequently asked questions <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </aside>
      <form
        className="contact-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          try {
            const res = await fetch("/api/contact", {
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
        <div className="notice">
          Contact submissions are not connected yet. This form is a preview;
          your message will not be sent.
        </div>
        <div className="form-grid">
          <label>
            Your name
            <input name="name" required autoComplete="name" maxLength={120} />
          </label>
          <label>
            Email address
            <input
              name="email"
              required
              type="email"
              autoComplete="email"
              maxLength={254}
            />
          </label>
          <label>
            Order number <span>(optional)</span>
            <input name="orderNumber" maxLength={80} />
          </label>
          <label>
            How can we help?
            <select name="subject" required defaultValue="">
              <option value="" disabled>
                Select a topic
              </option>
              <option>Product information</option>
              <option>Order support</option>
              <option>Shipping & returns</option>
              <option>Documentation</option>
              <option>Other</option>
            </select>
          </label>
          <label className="span-2">
            Your message
            <textarea
              name="message"
              required
              rows={6}
              maxLength={5000}
              placeholder="Tell us a little more…"
            />
          </label>
        </div>
        <button className="button" disabled={pending}>
          {pending ? "Checking…" : "Check support availability"}
          <ArrowRight size={17} />
        </button>
        <p role="status">{status}</p>
        <p className="fineprint">
          Read our <Link href="/privacy">privacy policy</Link>. Please don’t
          include payment credentials or sensitive personal information.
        </p>
      </form>
    </div>
  );
}
