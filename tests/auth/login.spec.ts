import { expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { buildUser } from "../../utils/testData";

import { test } from "../../fixtures";

test.describe("Login and logout", () => {
  test("LOG-01 and LOG-04: log in and log out for a registered user", async ({
    page,
  }) => {
    const user = buildUser();
    const home = new HomePage(page);
    const register = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await home.goto();
    await home.openRegister();
    await register.fillForm(user);
    await register.submit();
    await register.expectRegistrationSuccess();

    await page.getByRole("link", { name: "Log out" }).click();
    await home.openLogin();
    await loginPage.login(user.email, user.password);
    await loginPage.expectLoggedIn();

    await page.getByRole("link", { name: "Log out" }).click();
    await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
  });

  test("LOG-02: login user with incorrect credentials", async ({ page }) => {
    const home = new HomePage(page);
    const loginPage = new LoginPage(page);

    await home.goto();
    await home.openLogin();
    await loginPage.login("example@example.com", "incorrectPassword");

    await loginPage.expectLoginError();
  });

  test("LOG-03: login with blank email/password", async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.openLogin();
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByText("Please enter your email")).toBeVisible();
  });
});
