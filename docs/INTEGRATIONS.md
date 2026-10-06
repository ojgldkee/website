# Integration handoff

The repository contains the storefront and service boundaries, not a production order backend. All API routes fail closed until implemented. Provider and database selection are deliberately uncommitted.

## Payment flow

1. Select a crypto processor and check its current official documentation. Validate supported countries, product categories, networks, currencies, session expiry, signature verification and refund model. No assumed provider URLs appear in this code.
2. Validate contact/address data, line IDs, variants, quantity limits and shipping eligibility on the server. Ignore submitted prices. Reprice against the authoritative catalog, compute applicable tax and reserve inventory transactionally.
3. Persist a pending order and immutable line snapshots before opening payment. Associate an idempotency key with checkout attempts; never generate duplicate orders on retries.
4. Create the session on the server using `PAYMENT_PROVIDER_API_KEY` / `PAYMENT_PROVIDER_SECRET`. Only return the legitimate provider checkout URL, with an explicit HTTPS/provider-domain allowlist. Never ask customers for wallet private keys or seed phrases.
5. Verify webhook signatures from the raw body using `PAYMENT_WEBHOOK_SECRET`. Record unique provider event IDs. Match currency, amount, order and session, and process status transitions atomically. Payment redirects alone are not proof of payment. Handle expiry, underpayment, refunds, duplicate/out-of-order events and reconciliation.
6. Confirm only verified payments, fulfill once, and publish genuine tracking details. Release inventory for expired or canceled reservations.

## Persistence and inventory

Use production Postgres/Supabase or another transactional datastore. Suggested entities:

- `products`, `variants`: server-authoritative identity, prices, currency, inventory, active flag.
- `orders`: internal ID, opaque public number, customer ID, immutable totals, currency, shipping selection, status, provider session, timestamps.
- `order_items`: order ID, SKU/variant ID, quantity, price/name snapshots.
- `order_addresses`: minimum required billing/shipping data, access restricted.
- `payment_events`: unique provider event ID, processing status and minimal audit metadata.
- `inventory_reservations`: variant ID, order ID, quantity, expiry.
- `shipments`: order ID, actual carrier tracking number, validated HTTPS tracking URL.

Keep database credentials server-side. Enforce authorization/RLS, migrations, backups and transactional stock updates. Never use an in-memory map or a public JSON file as order storage.

## Order lookup

Implement `OrderRepository.lookup` behind `/api/orders/lookup`. Require both order number and email. Normalize email carefully, use opaque unpredictable public order identifiers, rate-limit by trusted infrastructure identity and lookup key, return generic failures and no unnecessary PII, and disable caching. Prefer an emailed magic link for more sensitive details. Never fall back to `demoOrder` for a failed real lookup.

## Contact and newsletter

Add server validation, length limits, spam protection and rate limiting before sending to the selected email provider. Use an authenticated business sender and a validated Reply-To. Do not place customer input in raw email headers. Store only necessary data with defined retention. Return success only when the provider confirms acceptance; expose retryable errors otherwise. Newsletter integration should follow the chosen provider's consent and double-opt-in flow and provide unsubscribe functionality.

## Before enabling sales

- Replace sample catalog and documentation with verified product information and actual availability.
- Confirm legal business identity, customer eligibility and product-specific requirements; obtain review of the clearly marked policy drafts.
- Configure real support email/hours, shipping zones/rates, tax calculation and refund procedures.
- Implement and test provider sandbox sessions, signatures, retries, duplicate events, incorrect amounts and expired payments.
- Verify inventory race handling, unavailable products, order persistence, fulfillment and lookup access control.
- Wire validated contact/address fields into the server checkout handler and supply a server-generated idempotency key. Current preview deliberately transmits no personal fields.
- Add monitored error reporting with PII redaction and alerting, HTTPS origin, and appropriate service-specific CSP/cookie controls.
- Review the generated OpenGraph PNG (`app/opengraph-image.tsx`) and favicon; both read the central brand configuration.
- Set canonical `NEXT_PUBLIC_SITE_URL`, review SEO metadata, then disable demo mode and update preview copy only when all services are live.

## Server contracts

`lib/services.ts` declares `PaymentGateway`, `OrderRepository`, and `CheckoutService`. Implement these with explicit provider adapters and dependency injection into the corresponding route handlers. Secret access belongs only in server-only files. `.env.example` documents variable names without values. `store.demoMode` is a public presentation flag, not a security boundary.
