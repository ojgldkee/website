import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { store } from "@/data/store";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: `${store.name} — Research, considered.`,
    template: `%s | ${store.name}`,
  },
  description: store.description,
  openGraph: {
    title: store.name,
    description: store.description,
    type: "website",
  },
  robots: store.demoMode
    ? { index: false, follow: false }
    : { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = Object.fromEntries(
    Object.entries(store.colors).map(([key, value]) => [`--${key}`, value]),
  ) as CSSProperties;
  return (
    <html lang="en" style={theme}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
