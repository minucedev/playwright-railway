import { type Page, type Locator, expect, test } from "@playwright/test";

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
    await test.step("Navigate to Railway website", async () => {
      await this.page.goto("/");
    });
  }

  async clickLogin() {
    await test.step("Click login link", async () => {
      await this.loginLink.click();
    });
  }

  async navigateToLogin() {
    await test.step("Navigate to login page", async () => {
      await this.goto();
      await this.clickLogin();
    });
  }

  async verifyWelcomeText() {
    await test.step("Verify welcome text is visible", async () => {
      try {
        await expect(this.welcomeText).toBeVisible();
      } catch (error) {
        throw new Error(
          `Welcome text is not visible: ${(error as Error).message}`
        );
      }
    });
  }

  async verifyUserLoggedIn(username: string) {
    await test.step(`Verify user ${username} is logged in`, async () => {
      try {
        await expect(this.userAccountText).toContainText(`Welcome ${username}`);
      } catch (error) {
        throw new Error(
          `User ${username} is not logged in: ${(error as Error).message}`
        );
      }
    });
  }
}
