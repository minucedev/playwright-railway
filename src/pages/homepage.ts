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

  async goto() {
    await this.page.goto("/");
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async navigateToLogin() {
    await this.goto();
    await this.clickLogin();
  }

  async verifyWelcomeText() {
    try {
      await expect(this.welcomeText).toBeVisible();
    } catch (error) {
      throw new Error(
        `Welcome text is not visible: ${(error as Error).message}`
      );
    }
  }

  async verifyUserLoggedIn(username: string) {
    try {
      await expect(this.userAccountText).toContainText(`Welcome ${username}`);
    } catch (error) {
      throw new Error(
        `User ${username} is not logged in: ${(error as Error).message}`
      );
    }
  }
}
