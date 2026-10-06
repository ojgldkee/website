"use client";
import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
export function Newsletter() {
  const id = useId();
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <form
      className="newsletter"
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        try {
          const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: new FormData(e.currentTarget).get("email"),
            }),
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
      <label htmlFor={id}>A fresh perspective, in your inbox.</label>
      <p>Collection notes, new arrivals, and updates.</p>
      <div className="email-input">
        <input
          id={id}
          name="email"
          type="email"
          placeholder="Your email address"
          required
          autoComplete="email"
        />
        <button aria-label="Subscribe to newsletter" disabled={pending}>
          {pending ? "…" : <ArrowRight size={21} />}
        </button>
      </div>
      <small>No spam. Unsubscribe anytime. Signup opens at launch.</small>
      <p role="status">{status}</p>
    </form>
  );
}
