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

  async fillUsername(username: string) {
    await this.emailInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async login(user: User) {
    await this.fillUsername(user.username);
    await this.fillPassword(user.password);
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
    await this.verifyFormVisible([
      { locator: this.emailInput, name: "Email input" },
      { locator: this.passwordInput, name: "Password input" },
      { locator: this.loginButton, name: "Login button" },
    ]);
  }

  async verifyErrorMessageExactly(expectedMessage: string) {
    await this.verifyMessage(this.errorMessage, expectedMessage, {
      exact: true,
    });
  }

  async verifyLockoutMessage(attempts: number) {
    const expectedMessage = Messages.getLockoutMessage(attempts);
    await this.verifyMessage(this.errorMessage, expectedMessage);
  }
  async verifyNoErrorMessage() {
    await this.verifyNotVisible(
      this.errorMessage,
      "Error message should not be visible"
    );
  }
}
