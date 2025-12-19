import { type Page, type Locator, expect } from "@playwright/test";
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

  async fillLoginForm(user: User) {
    await this.emailInput.fill(user.username);
    await this.passwordInput.fill(user.password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async login(user: User) {
    await this.fillLoginForm(user);
    await this.submitLogin();
  }

  async verifyLoginFormVisible() {
    await expect
      .soft(this.emailInput, "Email input should be visible")
      .toBeVisible();
    await expect
      .soft(this.passwordInput, "Password input should be visible")
      .toBeVisible();
    await expect
      .soft(this.loginButton, "Login button should be visible")
      .toBeVisible();
  }
}
