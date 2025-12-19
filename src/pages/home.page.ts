import { type Page, type Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly bookTicketLink: Locator;
  readonly welcomeText: Locator;
  readonly userAccountText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole("link", { name: "Login" });
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.bookTicketLink = page.getByRole("link", { name: "Book ticket" });
    this.userAccountText = page.locator(".account strong");
    this.welcomeText = page.getByRole("heading", {
      name: "Welcome to Safe Railway",
    });
  }

  async navigateToPage(linkName: string) {
    await this.page.getByRole("link", { name: linkName }).click();
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
