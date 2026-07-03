import { expect } from "@playwright/test";
import { test } from "../../fixtures";

test.describe("Search", () => {
  test("SEA-01: search for an existing product", async ({ page, home }) => {
    await home.goto();
    await home.search("Apple");

    await expect(page).toHaveURL(/\/search\?q=Apple/i);
    await expect(
      page.locator(".product-item").filter({ hasText: /Apple/i }).first(),
    ).toBeVisible();
  });

  test("SEA-02: search with no matching product", async ({ page, home }) => {
    await home.goto();
    await home.search("Oven");

    await expect(page).toHaveURL(/\/search\?q=Oven/i);
    await expect(
      page.getByText("No products were found that matched your criteria."),
    ).toBeVisible();
  });

  test("SEA-03: search with empty input", async ({ page, home }) => {
    await home.goto();

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Please enter some search keyword");
      await dialog.accept();
    });

    await page.getByRole("button", { name: "Search" }).click();
  });
});
