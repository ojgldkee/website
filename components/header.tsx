"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X, ArrowRight } from "lucide-react";
import { store } from "@/data/store";
import { useCart } from "./cart-provider";
const links = [
  ["Shop", "/collections"],
  ["Our standards", "/standards"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];
export function Brand() {
  return (
    <Link className="brand" href="/" aria-label={`${store.name} home`}>
      <span className="brand-symbol" aria-hidden="true">
        ✳
      </span>
      <span>
        {store.name}
        <small>RESEARCH, CONSIDERED.</small>
      </span>
    </Link>
  );
}
export function Header() {
  const cart = useCart();
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);
  return (
    <>
      <div className="announcement">
        {store.announcement.enabled && (
          <>
            <span>{store.announcement.text}</span>
            <Link href={store.announcement.href}>
              {store.announcement.linkText}
              <ArrowRight size={13} />
            </Link>
          </>
        )}
      </div>
      <header className="header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <Link
                aria-current={pathname === href ? "page" : undefined}
                key={href}
                href={href}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="track-link" href="/track-order">
              Track order
            </Link>
            <Link
              className="icon-button"
              href="/collections?search=1"
              aria-label="Search products"
            >
              <Search size={20} />
            </Link>
            <button
              className="icon-button bag"
              aria-label={`Open cart, ${cart.count} items`}
              onClick={() => cart.setOpen(true)}
            >
              <ShoppingBag size={20} />
              <span>{cart.count}</span>
            </button>
            <button
              className="icon-button mobile-toggle"
              aria-label="Open navigation menu"
              onClick={() => dialog.current?.showModal()}
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        className="mobile-menu"
        aria-label="Navigation menu"
        ref={dialog}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="drawer-heading">
          <span className="eyebrow">Explore</span>
          <button
            className="icon-button"
            aria-label="Close menu"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {[
            ...links,
            ["Track order", "/track-order"],
            ["About us", "/about"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => dialog.current?.close()}
            >
              {label}
              <ArrowRight size={20} />
            </Link>
          ))}
        </nav>
        <p className="muted">{store.description}</p>
      </dialog>
      {store.ticker.enabled && (
        <div className="ticker">
          <div className="ticker-track">
            <span>{store.ticker.items.join(" · ")} · </span>
            <span aria-hidden="true">{store.ticker.items.join(" · ")} · </span>
          </div>
        </div>
      )}
    </>
  );
}
