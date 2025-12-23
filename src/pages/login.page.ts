import { type Page, type Locator, expect } from "@playwright/test";
import { User } from "../types/users";
import { BasePage } from "./base.page";

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
    await expect(this.errorMessage).toBeVisible();
    await expect(
      this.errorMessage,
      `Error message should contain "${expectedMessage}"`
    ).toContainText(expectedMessage);
  }

  async getErrorMessageText(): Promise<string> {
    return (await this.errorMessage.textContent()) || "";
  }

  async verifyErrorMessageExactly(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(
      this.errorMessage,
      `Error message should be exactly "${expectedMessage}"`
    ).toHaveText(expectedMessage);
  }

  async verifyNoErrorMessage() {
    await expect(
      this.errorMessage,
      "Error message should not be visible"
    ).not.toBeVisible();
  }
}
