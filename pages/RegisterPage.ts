import { expect, type Page } from "@playwright/test";

export type RegisterUser = {
  gender?: "male" | "female";
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  password: string;
  confirmPassword?: string;
};

export class RegisterPage {
  constructor(private readonly page: Page) {}

  async fillForm(user: RegisterUser) {
    if (user.gender === "male") {
      await this.page.locator("#gender-male").check();
    }
    if (user.gender === "female") {
      await this.page.locator("#gender-female").check();
    }

    await this.page.locator("#FirstName").fill(user.firstName);
    await this.page.locator("#LastName").fill(user.lastName);
    await this.page.locator("#Email").fill(user.email);

    if (user.company !== undefined) {
      await this.page.locator("#Company").fill(user.company);
    }

    await this.page.locator("#Password").fill(user.password);
    await this.page
      .locator("#ConfirmPassword")
      .fill(user.confirmPassword ?? user.password);
  }

  async submit() {
    await this.page.locator("#register-button").click();
  }

  async expectRegistrationSuccess() {
    await expect(this.page.getByText("Your registration completed")).toBeVisible();
  }

  async expectRequiredFieldErrors() {
    await expect(this.page.getByText("First name is required.")).toBeVisible();
    await expect(this.page.getByText("Last name is required.")).toBeVisible();
    await expect(this.page.getByText("Email is required.")).toBeVisible();
    await expect(this.page.getByText("Password is required.")).toBeVisible();
    await expect(this.page.getByText("Password is required.")).toHaveCount(2);
  }
}
