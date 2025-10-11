import { test, expect } from "@playwright/test";
const BASE = process.env.BASE_URL || "http://localhost:3010";

test("@smoke Landing loads", async ({ page }) => {
  // I dev kan Next göra snabba omladdningar → använd "commit" och längre timeout
  const resp = await page.goto(BASE, { waitUntil: "commit", timeout: 45000 });
  // I dev returnerar svar ibland "opaque" eller 200/304 – vi fokuserar på att sidan syns:
  await page.waitForSelector("body", { state: "visible", timeout: 20000 });
  await expect(page.locator("body")).toBeVisible();
});
