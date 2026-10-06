import { test, expect } from "@playwright/test";

test("all requested routes and footer destinations load without overflow", async ({
  page,
}) => {
  await page.goto("/");
  const footerLinks = await page
    .locator('footer a[href^="/"]')
    .evaluateAll((links) => [
      ...new Set(links.map((a) => a.getAttribute("href")!)),
    ]);
  for (const route of [
    ...new Set([
      "/",
      "/collections",
      "/products/reference-01",
      "/cart",
      "/checkout",
      "/contact",
      "/track-order",
      "/faq",
      "/about",
      "/standards",
      "/documentation",
      ...footerLinks,
    ]),
  ]) {
    const res = await page.goto(route);
    expect(res?.status(), route).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `overflow on ${route}`,
    ).toBeTruthy();
  }
  await page.goto("/products/missing-item");
  await expect(
    page.getByText("This page is still undiscovered."),
  ).toBeVisible();
});

test("catalog search, category, sort, and empty state", async ({ page }) => {
  await page.goto("/collections");
  await expect(page.locator(".product-card")).toHaveCount(6);
  await page
    .getByRole("button", { name: "Lab accessories", exact: true })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByLabel("Sort products").selectOption("high");
  await expect(page.locator(".product-card h3").first()).toHaveText(
    "Storage Set",
  );
  await page.getByRole("button", { name: "All products", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Search products" })
    .fill("no matching item");
  await expect(page.getByText("No matches, yet.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".product-card")).toHaveCount(6);
  await page.goto("/collections?filter=new");
  await expect(page.locator(".product-card")).toHaveCount(2);
});

test("gallery, variant cart totals, persistence, shipping, removal and dialog keyboard", async ({
  page,
}) => {
  await page.goto("/products/reference-01");
  await page.getByRole("button", { name: "Show image 2" }).click();
  await expect(page.locator(".gallery-main img")).toHaveAttribute(
    "src",
    "/images/products/detail.svg",
  );
  await page.getByRole("button", { name: "Set of two" }).click();
  await page
    .getByRole("button", { name: "Increase Quantity", exact: true })
    .click();
  await page
    .locator(".product-cta")
    .getByRole("button", { name: "Add to cart" })
    .click();
  const drawer = page.locator(".cart-drawer");
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText("$196.00").first()).toBeVisible();
  await expect(
    drawer.getByText("You’ve unlocked free standard shipping"),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(drawer).not.toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Open cart, 2 items" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Open cart, 2 items" }).click();
  await drawer
    .getByRole("button", { name: "Decrease Reference No. 01" })
    .click();
  await expect(drawer.getByText("$98.00").first()).toBeVisible();
  await expect(drawer.getByText("$7.95")).toBeVisible();
  await drawer.getByRole("button", { name: "Remove Reference No. 01" }).click();
  await expect(drawer.getByText("Your cart is currently empty.")).toBeVisible();
});

test("checkout shipping, billing and unavailable provider are honest", async ({
  page,
}) => {
  await page.goto("/collections");
  await page
    .getByRole("button", { name: "Add Reference No. 01 to cart" })
    .click();
  await page
    .locator(".cart-drawer")
    .getByRole("link", { name: "Continue to checkout" })
    .click();
  await page
    .getByLabel("Email address", { exact: true })
    .fill("demo@example.com");
  await page.getByLabel("First name", { exact: true }).fill("Demo");
  await page.getByLabel("Last name", { exact: true }).fill("Customer");
  await page.getByLabel("Address", { exact: true }).fill("123 Example St");
  await page.getByLabel("City", { exact: true }).fill("Example");
  await page.getByLabel("State / region", { exact: true }).fill("CA");
  await page.getByLabel("Postal code", { exact: true }).fill("90001");
  await page
    .getByRole("combobox", { name: "Country", exact: true })
    .selectOption("US");
  await page.getByRole("radio").nth(1).check();
  await expect(page.locator(".total")).toContainText("$63.95");
  await page.getByLabel("Use a different billing address").check();
  await expect(page.getByLabel("First name", { exact: true })).toHaveCount(2);
  await page.getByLabel("Use a different billing address").uncheck();
  await page.getByLabel("Promo code", { exact: true }).fill("DEMO");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await expect(
    page.getByText("Promo codes are not active during preview."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Check payment availability" })
    .click();
  await expect(
    page.getByText(
      "Payments are not connected yet. No order was created and no payment was taken.",
    ),
  ).toBeVisible();
});

test("tracking shows an explicitly marked example and services fail closed", async ({
  page,
  request,
}) => {
  await page.goto("/track-order");
  await page.getByRole("button", { name: "View an example order" }).click();
  await expect(
    page.getByText("Demonstration only — this is not a real order."),
  ).toBeVisible();
  await expect(page.getByText("DEMO-TRACKING-001")).toBeVisible();
  await page
    .getByRole("textbox", { name: "Order number", exact: true })
    .fill("X");
  await page
    .getByRole("textbox", { name: "Customer email", exact: true })
    .fill("demo@example.com");
  await page.getByRole("button", { name: "Track order", exact: true }).click();
  await expect(
    page.getByText(
      "Live order lookup is not connected yet. Use the example order to preview tracking.",
    ),
  ).toBeVisible();
  await expect(page.getByText("DEMO-TRACKING-001")).not.toBeVisible();
  for (const endpoint of [
    "checkout",
    "contact",
    "newsletter",
    "orders/lookup",
    "payments/webhook",
  ]) {
    const response = await request.post(`/api/${endpoint}`, { data: {} });
    expect(response.status()).toBe(503);
    expect((await response.json()).code).toBe("SERVICE_NOT_CONFIGURED");
  }
});

test("navigation and sticky add to cart work", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Shop", exact: true })
      .click();
    await expect(page).toHaveURL(/collections/);
    await expect(page.locator(".mobile-menu")).not.toBeVisible();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Shop", exact: true })
      .click();
    await expect(page).toHaveURL(/collections/);
  }
  await page.goto("/products/reference-01");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".sticky-atc")).toBeVisible();
  await page
    .locator(".sticky-atc")
    .getByRole("button", { name: "Add to cart" })
    .click();
  await expect(page.locator(".cart-drawer")).toBeVisible();
});
