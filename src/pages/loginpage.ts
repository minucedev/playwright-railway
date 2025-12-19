import { type Page, type Locator, expect, test } from "@playwright/test";
import { User } from "../types/users";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email", { exact: false });
    this.passwordInput = page.getByLabel("Password", { exact: false });
    this.loginButton = page.getByRole("button", { name: "Login", exact: true });
  }

  async fillLoginForm(email: string, pass: string) {
    await test.step("Fill email and password", async () => {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(pass);
    });
  }

  async submitLogin() {
    await test.step("Click login button", async () => {
      await this.loginButton.click();
    });
  }

  async login(user: User) {
    await this.fillLoginForm(user.username, user.password);
    await this.submitLogin();
  }

  async verifyLoginFormVisible() {
    await test.step("Verify login form elements are visible", async () => {
      await expect
        .soft(this.emailInput, "Email input should be visible")
        .toBeVisible();
      await expect
        .soft(this.passwordInput, "Password input should be visible")
        .toBeVisible();
      await expect
        .soft(this.loginButton, "Login button should be visible")
        .toBeVisible();
    });
  }
}
