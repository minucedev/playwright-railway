import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly userAccountText: Locator;

  constructor(page: Page) {
    super(page);
    this.userAccountText = page.locator(".account strong");
  }

  async verifyUserLoggedIn(username: string) {
    await expect(
      this.userAccountText,
      `User ${username} should be logged in`
    ).toContainText(`Welcome ${username}`);
  }
}
