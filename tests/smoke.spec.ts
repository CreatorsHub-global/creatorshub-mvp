import { test, expect } from "@playwright/test";
const BASE = process.env.BASE_URL || "http://localhost:3010";

test("@smoke Landing loads", async ({ page }) => {
  const resp = await page.goto(BASE, { waitUntil: "commit", timeout: 45000 });
  await page.waitForSelector("body", { state: "visible", timeout: 20000 });
  await expect(page.locator("body")).toBeVisible();
});
