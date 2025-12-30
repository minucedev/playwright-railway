import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { Messages } from "../utils/messages.config";
import type { RegisterUser } from "../types/playwright.types";

export class RegisterPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly pidInput: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly passwordValidationError: Locator;
  readonly pidValidationError: Locator;

  constructor(page: Page) {
    super(page);
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
    this.errorMessage = page.locator("p.message.error");
    this.passwordValidationError = page.locator(
      'label[for="password"].validation-error'
    );
    this.pidValidationError = page.locator('label[for="pid"].validation-error');
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string) {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async fillPid(pid: string) {
    await this.pidInput.fill(pid);
  }

  async submitRegistration() {
    await this.registerButton.click();
  }

  async register(user: RegisterUser) {
    await this.fillEmail(user.email);
    await this.fillPassword(user.password);
    await this.fillConfirmPassword(user.confirmPassword);
    await this.fillPid(user.pid);
    await this.submitRegistration();
  }

  async verifyRegistrationFormVisible() {
    await this.verifyFormVisible([
      { locator: this.emailInput, name: "Email input" },
      { locator: this.passwordInput, name: "Password input" },
      { locator: this.confirmPasswordInput, name: "Confirm Password input" },
      { locator: this.pidInput, name: "PID input" },
      { locator: this.registerButton, name: "Register button" },
    ]);
  }

  async verifySuccessMessage(expectedMessage: string) {
    await this.verifyMessage(this.successMessage, expectedMessage);
  }

  async verifyErrorMessage(expectedMessage: string) {
    await this.verifyMessage(this.errorMessage, expectedMessage);
  }

  async verifyFieldValidationErrors() {
    await expect
      .soft(
        this.passwordValidationError,
        "Password validation error should be visible"
      )
      .toContainText(Messages.VALIDATION.INVALID_PASSWORD_LENGTH);
    await expect
      .soft(this.pidValidationError, "PID validation error should be visible")
      .toContainText(Messages.VALIDATION.INVALID_PID);
  }
}
