import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { User } from "../data/users";
import { BasePage } from "./base.page";
import { Messages } from "../utils/messages.config";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel("Email", { exact: false });
    this.passwordInput = page.getByLabel("Password", { exact: false });
    this.loginButton = page.getByRole("button", { name: "Login", exact: true });
    this.errorMessage = page.locator("p.message.error.LoginForm");
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
    await this.page.waitForLoadState("networkidle");
  }

  async loginMultipleTimes(user: User, times: number, delay: number = 500) {
    for (let i = 0; i < times; i++) {
      await this.login(user);
      // Wait between attempts to simulate real user behavior
      if (i < times - 1) {
        await this.page.waitForTimeout(delay);
      }
    }
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

  async verifyErrorMessageExactly(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(
      this.errorMessage,
      `Error message should be exactly "${expectedMessage}"`
    ).toHaveText(expectedMessage);
  }

  async verifyLockoutMessage(attempts: number) {
    const expectedMessage = Messages.getLockoutMessage(attempts);
    await expect(
      this.errorMessage,
      `Lockout message should contain "${expectedMessage}"`
    ).toContainText(expectedMessage);
  }
  async verifyNoErrorMessage() {
    await expect(
      this.errorMessage,
      "Error message should not be visible"
    ).not.toBeVisible();
  }
}
