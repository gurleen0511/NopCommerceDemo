import { expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { RegisterPage } from "../../pages/RegisterPage";
import { buildUser } from "../../utils/testData";

import { test } from "../../fixtures";

test.describe("Registration", () => {
  test("REG-01: register user with valid details", async ({ page }) => {
    const home = new HomePage(page);
    const register = new RegisterPage(page);

    await home.goto();
    await home.openRegister();
    await register.fillForm(buildUser());
    await register.submit();

    await register.expectRegistrationSuccess();
  });

  test("REG-02: register with blank required fields", async ({ page }) => {
    const home = new HomePage(page);
    const register = new RegisterPage(page);

    await home.goto();
    await home.openRegister();
    await register.submit();

    await register.expectRequiredFieldErrors();
  });

  test("REG-05: add invalid email while registering", async ({ page }) => {
    const home = new HomePage(page);
    const register = new RegisterPage(page);

    await home.goto();
    await home.openRegister();
    await register.fillForm(buildUser({ email: "rexbb" }));
    await register.submit();

    await expect(page.getByText("Wrong email")).toBeVisible();
  });

  test("REG-07: add passwords that do not match", async ({ page }) => {
    const home = new HomePage(page);
    const register = new RegisterPage(page);

    await home.goto();
    await home.openRegister();
    await register.fillForm({
      ...buildUser(),
      confirmPassword: "Different123",
    });
    await register.submit();

    await expect(
      page.getByText("The password and confirmation password do not match."),
    ).toBeVisible();
  });
});
