import { expect } from "@playwright/test";
import type { Page, Locator } from "../types/playwright.types";

export type RegisterUser = {
  email: string;
  password: string;
  confirmPassword: string;
  pid: string;
};

export class RegisterPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly pidInput: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email", { exact: false });
    this.passwordInput = page.getByLabel("Password", { exact: false }).first();
    this.confirmPasswordInput = page.getByLabel("Confirm Password", {
      exact: false,
    });
    this.pidInput = page.getByLabel("PID", { exact: false });
    this.registerButton = page.getByRole("button", {
      name: "Register",
      exact: true,
    });
    this.successMessage = page.locator("#content > p");
  }

  async fillRegistrationForm(user: RegisterUser) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.confirmPassword);
    await this.pidInput.fill(user.pid);
  }

  async submitRegistration() {
    await this.registerButton.click();
  }

  async register(user: RegisterUser) {
    await this.fillRegistrationForm(user);
    await this.submitRegistration();
  }

  async verifyRegistrationFormVisible() {
    await expect
      .soft(this.emailInput, "Email input should be visible")
      .toBeVisible();
    await expect
      .soft(this.passwordInput, "Password input should be visible")
      .toBeVisible();
    await expect
      .soft(
        this.confirmPasswordInput,
        "Confirm Password input should be visible"
      )
      .toBeVisible();
    await expect
      .soft(this.pidInput, "PID input should be visible")
      .toBeVisible();
    await expect
      .soft(this.registerButton, "Register button should be visible")
      .toBeVisible();
  }

  async verifySuccessMessage(expectedMessage: string) {
    await expect(
      this.successMessage,
      `Success message should contain "${expectedMessage}"`
    ).toContainText(expectedMessage);
  }
}
