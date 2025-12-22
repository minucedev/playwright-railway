import { type Page, type Locator, expect } from "@playwright/test";

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export class ChangePasswordPage {
  readonly page: Page;
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly changePasswordButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
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
  }

  async fillChangePasswordForm(data: ChangePasswordData) {
    await this.currentPasswordInput.fill(data.currentPassword);
    await this.newPasswordInput.fill(data.newPassword);
    await this.confirmPasswordInput.fill(data.confirmPassword);
  }

  async submitChangePassword() {
    await this.changePasswordButton.click();
  }

  async changePassword(data: ChangePasswordData) {
    await this.fillChangePasswordForm(data);
    await this.submitChangePassword();
  }

  async verifyChangePasswordFormVisible() {
    await expect
      .soft(
        this.currentPasswordInput,
        "Current Password input should be visible"
      )
      .toBeVisible();
    await expect
      .soft(this.newPasswordInput, "New Password input should be visible")
      .toBeVisible();
    await expect
      .soft(
        this.confirmPasswordInput,
        "Confirm Password input should be visible"
      )
      .toBeVisible();
    await expect
      .soft(
        this.changePasswordButton,
        "Change Password button should be visible"
      )
      .toBeVisible();
  }

  async verifySuccessMessage(expectedMessage: string) {
    await expect(
      this.successMessage,
      `Success message should contain "${expectedMessage}"`
    ).toContainText(expectedMessage);
  }
}
