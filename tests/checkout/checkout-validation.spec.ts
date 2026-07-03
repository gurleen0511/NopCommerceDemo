import { expect, type Page } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";

import { test } from "../../fixtures";

async function addBookAndOpenCart(page: Page) {
  const home = new HomePage(page);
  const products = new ProductPage(page);

  await home.goto();
  await home.openBooks();
  await products.addBookByName("Fahrenheit 451 by Ray Bradbury");
  await home.openShoppingCart();
}

test.describe("Checkout validation", () => {
  test("CHK-03: checkout without accepting terms of service", async ({
    page,
  }) => {
    await addBookAndOpenCart(page);
    const cart = new CartPage(page);

    await cart.checkoutWithoutTerms();

    await expect(page.locator("#terms-of-service-warning-box")).toContainText(
      /Please accept the terms of service/i,
    );
  });

  test("CHK-04: checkout with required billing address fields blank", async ({
    page,
  }) => {
    await addBookAndOpenCart(page);
    const cart = new CartPage(page);

    await cart.acceptTermsAndCheckout();
    await page.getByRole("button", { name: /Checkout as Guest/i }).click();
    await page.locator("#billing-buttons-container button").click();

    await expect(page.getByText("First name is required.")).toBeVisible();
    await expect(page.getByText("Last name is required.")).toBeVisible();
    await expect(page.getByText("Email is required.")).toBeVisible();
    await expect(page.getByText("City is required")).toBeVisible();
    await expect(page.getByText("Street address is required")).toBeVisible();
    await expect(page.getByText("Zip / postal code is required")).toBeVisible();
    await expect(page.getByText("Phone is required")).toBeVisible();
  });
});
