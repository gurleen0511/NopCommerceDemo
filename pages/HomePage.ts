import { expect, type Page } from "@playwright/test";
import { waitForStorefrontReady } from "../utils/botProtection";
import { fillLikeHuman, humanPause, moveMouseNaturally } from "../utils/humanize";

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
    await moveMouseNaturally(this.page);
    await humanPause();
    await this.expectStorefrontReady();
  }

  async openRegister() {
    await this.page.getByRole("link", { name: "Register" }).click();
    await expect(this.page).toHaveURL(/\/register/i);
  }

  async openLogin() {
    await this.page.getByRole("link", { name: "Log in" }).click();
    await expect(this.page).toHaveURL(/\/login/i);
  }

  async search(keyword: string) {
    await fillLikeHuman(this.page.locator("#small-searchterms"), keyword);
    await this.page.getByRole("button", { name: "Search" }).click();
  }

  async openBooks() {
    await this.page.getByRole("link", { name: "Books" }).first().click();
    await expect(this.page).toHaveURL(/\/books/i);
  }

  async openShoppingCart() {
    await this.page.locator(".cart-label").click();
    await expect(this.page).toHaveURL(/\/cart/i);
  }

  private async expectStorefrontReady() {
    const searchBox = this.page.locator("#small-searchterms");

    await waitForStorefrontReady(this.page);
    await expect(searchBox).toBeVisible();
    await expect(this.page).toHaveTitle(/nopCommerce demo store/i);
  }
}
