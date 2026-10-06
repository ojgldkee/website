import { test } from "@playwright/test";
test("capture storefront for visual review", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.screenshot({
    path: testInfo.outputPath(`home-${testInfo.project.name}.png`),
    fullPage: true,
  });
  await page.goto("/products/reference-01");
  await page.screenshot({
    path: testInfo.outputPath(`product-${testInfo.project.name}.png`),
    fullPage: true,
  });
});
