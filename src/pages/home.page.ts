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

  async verifyAuthenticatedMenuVisible() {
    // Verify authenticated menu links are visible
    await expect(
      this.page.getByRole("link", { name: "My ticket" }),
      "My ticket link should be visible"
    ).toBeVisible();

    await expect(
      this.page.getByRole("link", { name: "Change password" }),
      "Change password link should be visible"
    ).toBeVisible();

    await expect(
      this.page.getByRole("link", { name: "Book ticket" }),
      "Book ticket link should be visible"
    ).toBeVisible();
  }
}
