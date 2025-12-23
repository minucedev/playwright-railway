import { type Page, type Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly welcomeText: Locator;
  readonly userAccountText: Locator;

  constructor(page: Page) {
    super(page);
    this.userAccountText = page.locator(".account strong");
    this.welcomeText = page.getByRole("heading", {
      name: "Welcome to Safe Railway",
    });
  }

  async verifyWelcomeText() {
    await expect(
      this.welcomeText,
      "Welcome text should be visible"
    ).toBeVisible();
  }

  async verifyUserLoggedIn(username: string) {
    await expect(
      this.userAccountText,
      `User ${username} should be logged in`
    ).toContainText(`Welcome ${username}`);
  }
}
