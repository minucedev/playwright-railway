import { type Page, type Locator, expect, test } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly welcomeText: Locator;
  readonly userAccountText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userAccountText = page.locator(".account strong");
    this.welcomeText = page.getByRole("heading", {
      name: "Welcome to Safe Railway",
    });
  }

  async navigateToPage(linkName: string) {
    await test.step(`Navigate to ${linkName} page`, async () => {
      await this.page.getByRole("link", { name: linkName }).click();
    });
  }

  async verifyWelcomeText() {
    await test.step("Verify welcome text is visible", async () => {
      await expect(
        this.welcomeText,
        "Welcome text should be visible"
      ).toBeVisible();
    });
  }

  async verifyUserLoggedIn(username: string) {
    await test.step(`Verify user ${username} is logged in`, async () => {
      await expect(
        this.userAccountText,
        `User ${username} should be logged in`
      ).toContainText(`Welcome ${username}`);
    });
  }
}
