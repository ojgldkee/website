# Research storefront

An original forest-green and cream storefront built with Next.js App Router, TypeScript, and React. The working brand is configured centrally, not a final brand decision.

## Run locally

Requires Node.js 20.9+ (Node 24 recommended).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Production: `npm run build` then `npm start`. Verification: `npm run typecheck`; `npx playwright install chromium`; `npm test`.

## Edit your store

| Change                                                                                         | File               |
| ---------------------------------------------------------------------------------------------- | ------------------ |
| Brand name, palette, announcement, shipping threshold, currency, support, social links, footer | `data/store.ts`    |
| Products, categories, prices, badges, variants, specifications, galleries                      | `data/products.ts` |
| Homepage copy                                                                                  | `data/home.ts`     |
| Frequently asked questions                                                                     | `data/faq.ts`      |
| Draft policies                                                                                 | `data/policies.ts` |
| UI styling and responsive behavior                                                             | `app/globals.css`  |

All monetary values are **integer cents**. `$150` is `15000`. `store.colors` becomes root CSS variables; changing that single palette updates the interface. Illustrative artwork has its own intrinsic colors, as photographs would.

## Replace images

Put your assets in `public/images/site/`, `public/images/products/`, and `public/images/collections/`.

Suggested site files: `hero.jpg`, `standards.jpg`, `about.jpg`. Point `store.images` to the new files. Each product has an `images` array; add as many `{ src, alt }` records as needed. Category images are in `data/products.ts`. Original SVG placeholders are supplied and clearly identified as illustrative packaging. They make no product, purity, or certification claims.

## Visual previews

Desktop/mobile homepage and product screenshots are included in the downloadable project package. Run the visual Playwright checks to generate fresh screenshots locally.

## Included

- Responsive editorial homepage, sticky header, native dialog mobile menu and cart.
- Search/filter/sort catalog and dynamic product routes with gallery, variants, quantity and sticky purchase bar.
- Local-storage cart, adjustable quantities, removal, subtotal, configurable free standard shipping progress.
- Full cart and checkout UI with shipping choices, billing fields, crypto payment placeholder and promo area.
- Categorized FAQ, contact, documentation center, about, standards, tracking demo, and five draft policy pages.
- Semantic markup, focus indicators, reduced-motion support, metadata, robots and sitemap.
- Server-only integration contracts and fail-closed API endpoints; no credentials or fabricated provider API URLs.
- Desktop and mobile Playwright checks for routes, footer links, cart persistence, totals, filtering, navigation, sticky CTA and service states.

## Preview, not a live commerce backend

Keep `store.demoMode` enabled until launch review is complete. Preview is noindex; its sitemap is empty. Cart data is stored locally. No order, payment, contact or newsletter submission is persisted. API endpoints return a clear HTTP 503 `SERVICE_NOT_CONFIGURED` response; they never fabricate a successful transaction. The tracking example is explicitly labeled and separate from lookup.

Forms intentionally do not transmit customer/address/message fields to disconnected services. Wire those fields into validated server contracts when enabling the actual integrations, following `docs/INTEGRATIONS.md`.

See `docs/INTEGRATIONS.md` for payment, database, inventory, support and launch requirements. Switching `demoMode` off alone does **not** enable payments or any other backend.

## Deployment

Deploy to a Node-compatible Next.js host; this app requires server routes and is not a static GitHub Pages export. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin and configure server secrets through the host's encrypted environment settings. `.env.example` contains names only; `.env*` is ignored except that example. No hosting provider has been selected or deployed by this initial implementation.
