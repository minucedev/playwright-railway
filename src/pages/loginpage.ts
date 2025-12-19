import { type Page, type Locator, expect } from "@playwright/test";
import { User } from "../types/users";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email", { exact: false });
    this.passwordInput = page.getByLabel("Password", { exact: false });
    this.loginButton = page.getByRole("button", { name: "Login", exact: true });
    this.errorMessage = page.locator("p.message.error.LoginForm");
  }

  async fillLoginForm(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async login(user: User) {
    await this.fillLoginForm(user.username, user.password);
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

  async verifyErrorMessage(expectedMessage: string) {
    await expect(
      this.errorMessage,
      `Error message should contain "${expectedMessage}"`
    ).toContainText(expectedMessage);
  }

  async verifyErrorMessage(expectedMessage: string) {
    await test.step(`Verify error message "${expectedMessage}" is displayed`, async () => {
      await expect(this.errorMessage).toContainText(expectedMessage);
    });
  }
}
