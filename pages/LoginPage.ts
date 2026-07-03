import { expect, type Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(email: string, password: string) {
    await this.page.locator("#Email").fill(email);
    await this.page.locator("#Password").fill(password);
    await this.page.getByRole("button", { name: "Log in" }).click();
  }

  async expectLoggedIn() {
    await expect(this.page.getByRole("link", { name: "Log out" })).toBeVisible();
    await expect(this.page.getByRole("link", { name: "My account" })).toBeVisible();
  }

  async expectLoginError() {
    await expect(this.page.getByText("Login was unsuccessful")).toBeVisible();
  }
}
