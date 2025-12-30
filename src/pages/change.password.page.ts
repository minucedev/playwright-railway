import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import type { ChangePasswordData } from "../types/playwright.types";

export class ChangePasswordPage extends BasePage {
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly changePasswordButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { name: "Change password" });
    this.currentPasswordInput = page.getByLabel("Current Password", {
      exact: false,
    });
    this.newPasswordInput = page.getByLabel("New Password", { exact: false });
    this.confirmPasswordInput = page.getByLabel("Confirm Password", {
      exact: false,
    });
    this.changePasswordButton = page.getByRole("button", {
      name: "Change Password",
      exact: true,
    });
    this.successMessage = page.locator("#content p.message.success");
    this.errorMessage = page.locator("#content p.message.error");
  }

  async fillChangePasswordForm(data: ChangePasswordData) {
    await this.currentPasswordInput.fill(data.currentPassword);
    await this.newPasswordInput.fill(data.newPassword);
    await this.confirmPasswordInput.fill(data.newPassword);
  }

  async submitChangePassword() {
    await this.changePasswordButton.click();
  }

  async changePassword(data: ChangePasswordData) {
    await this.fillChangePasswordForm(data);
    await this.submitChangePassword();
  }

  async verifySuccessMessage(expectedMessage: string) {
    await this.verifyMessage(this.successMessage, expectedMessage);
  }

  async verifyErrorMessage(expectedMessage: string) {
    await this.verifyMessage(this.errorMessage, expectedMessage);
  }
}
