import { expect, type Locator, type Page } from "@playwright/test";
import { parsePrice } from "../utils/testData";

export class CartPage {
  constructor(private readonly page: Page) {}

  private cartRows(): Locator {
    return this.page.locator(".cart tbody tr");
  }

  async expectProductInCart(productName: string) {
    await expect(this.cartRows().filter({ hasText: productName })).toBeVisible();
  }

  async updateFirstItemQuantity(quantity: string) {
    const row = this.cartRows().first();
    await row.locator(".qty-input").fill(quantity);
    await this.page
      .getByRole("button", { name: /update shopping cart/i })
      .click();
  }

  async expectFirstItemQuantity(quantity: string) {
    await expect(this.cartRows().first().locator(".qty-input")).toHaveValue(
      quantity,
    );
  }

  async expectFirstItemSubtotalEqualsUnitPriceTimesQuantity(quantity: number) {
    const row = this.cartRows().first();
    const unitPrice = parsePrice(await row.locator(".unit-price").innerText());
    const subtotal = parsePrice(await row.locator(".subtotal").innerText());
    expect(subtotal).toBeCloseTo(unitPrice * quantity, 2);
  }

  async removeFirstItem() {
    await this.cartRows().first().locator(".remove-btn").click();
    await this.page
      .getByRole("button", { name: /update shopping cart/i })
      .click()
      .catch(() => undefined);
  }

  async expectCartEmpty() {
    await expect(
      this.page.getByText("Your Shopping Cart is empty!"),
    ).toBeVisible();
  }

  async checkoutWithoutTerms() {
    await this.page.locator("#checkout").click();
  }

  async acceptTermsAndCheckout() {
    await this.page.locator("#termsofservice").check();
    await this.page.locator("#checkout").click();
  }
}
