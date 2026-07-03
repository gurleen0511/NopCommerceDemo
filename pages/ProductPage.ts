import { expect, type Page } from "@playwright/test";

export class ProductPage {
  constructor(private readonly page: Page) {}

  async addBookByName(productName: string) {
    const productCard = this.page
      .locator(".product-item")
      .filter({ hasText: productName })
      .first();
    await expect(productCard).toBeVisible();
    await productCard.getByRole("button", { name: /add to cart/i }).click();
    await this.expectAddedToCartNotification();
  }

  async expectAddedToCartNotification() {
    const notification = this.page.locator("#bar-notification");
    await expect(notification).toContainText(
      "The product has been added to your shopping cart",
    );
    await notification
      .locator(".close")
      .click()
      .catch(() => undefined);
  }

  async openBuildYourOwnComputer() {
    await this.page.goto("/build-your-own-computer");
    await expect(
      this.page.getByRole("heading", { name: "Build your own computer" }),
    ).toBeVisible();
  }

  async configureBuildYourOwnComputer() {
    await this.page.locator("#product_attribute_1").selectOption({ index: 1 });
    await this.page.locator("#product_attribute_2").selectOption({ index: 1 });
    await this.page.locator("#product_attribute_3_6").check();
    await this.page.locator("#product_attribute_4_8").check();
    await this.page.locator("#product_attribute_5_10").check();
  }

  async addCurrentProductToCart() {
    await this.page.getByRole("button", { name: /add to cart/i }).click();
    await this.expectAddedToCartNotification();
  }
}
