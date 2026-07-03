import { expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";

import { test } from "../../fixtures";

test.describe("Shopping cart", () => {
  test.beforeEach(async ({ page }) => {
    await new HomePage(page).goto();
  });

  test("CAR-03: add product requiring options without selecting required options", async ({
    page,
  }) => {
    await page.goto("/adidas-consortium-campus-80s-running-shoes");
    await expect(
      page.getByRole("heading", { name: /adidas Consortium Campus/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: /add to cart/i }).click();

    await expect(
      page.locator(
        ".bar-notification, .message-error, .field-validation-error",
      ),
    ).toContainText(/please select/i);
  });

  test("CAR-04: add a product to cart", async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductPage(page);
    const cart = new CartPage(page);

    await home.openBooks();
    await products.addBookByName("Fahrenheit 451 by Ray Bradbury");
    await home.openShoppingCart();

    await cart.expectProductInCart("Fahrenheit 451 by Ray Bradbury");
  });

  test("CAR-05: add configured build your own computer to cart", async ({
    page,
  }) => {
    const products = new ProductPage(page);
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await products.openBuildYourOwnComputer();
    await products.configureBuildYourOwnComputer();
    await products.addCurrentProductToCart();
    await home.openShoppingCart();

    await cart.expectProductInCart("Build your own computer");
  });

  test("CAR-06: cart quantity update", async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductPage(page);
    const cart = new CartPage(page);

    await home.openBooks();
    await products.addBookByName("Fahrenheit 451 by Ray Bradbury");
    await home.openShoppingCart();

    await cart.expectFirstItemQuantity("1");
    await cart.updateFirstItemQuantity("2");

    await cart.expectFirstItemQuantity("2");
    await cart.expectFirstItemSubtotalEqualsUnitPriceTimesQuantity(2);
  });

  test("CAR-07: set invalid value for cart quantity", async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductPage(page);
    const cart = new CartPage(page);

    await home.openBooks();
    await products.addBookByName("Fahrenheit 451 by Ray Bradbury");
    await home.openShoppingCart();

    await cart.updateFirstItemQuantity("0");
    await cart.expectCartEmpty();
  });

  test("CAR-08: remove item from cart", async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductPage(page);
    const cart = new CartPage(page);

    await home.openBooks();
    await products.addBookByName("Fahrenheit 451 by Ray Bradbury");
    await home.openShoppingCart();

    await cart.removeFirstItem();
    await cart.expectCartEmpty();
  });
});
