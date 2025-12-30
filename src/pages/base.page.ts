import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { pages, PageRoute } from "../utils/routes.config";

export class BasePage {
  readonly page: Page;
  header?: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(pageKey: PageRoute) {
    const navItem = pages[pageKey];
    if (navItem.label) {
      await this.page.getByRole("link", { name: navItem.label }).click();
    }
  }

  async verifyCurrentPage(pageRoute: PageRoute) {
    const navItem = pages[pageRoute];
    if (navItem.path) {
      await expect(this.page).toHaveURL(new RegExp(navItem.path));
    }
  }

  async verifyLinkVisible(pageRoute: PageRoute) {
    const navItem = pages[pageRoute];
    if (navItem.label) {
      await expect(
        this.page.getByRole("link", { name: navItem.label }),
        `${navItem.label} link should be visible`
      ).toBeVisible();
    }
  }

  async verifyTabBarAfterLogin() {
    // Verify displayed tabs: My ticket, Change password, Logout
    await this.verifyLinkVisible(PageRoute.MY_TICKET);
    await this.verifyLinkVisible(PageRoute.CHANGE_PASSWORD);
    await this.verifyLinkVisible(PageRoute.LOGOUT);
  }

  async verifyHeader() {
    if (this.header) {
      await expect(this.header, "Page header should be visible").toBeVisible();
    }
  }

  async verifyMessage(
    locator: Locator,
    expectedMessage: string,
    options?: { exact?: boolean }
  ) {
    await expect(locator).toBeVisible();
    if (options?.exact) {
      await expect(
        locator,
        `Message should be exactly "${expectedMessage}"`
      ).toHaveText(expectedMessage);
    } else {
      await expect(
        locator,
        `Message should contain "${expectedMessage}"`
      ).toContainText(expectedMessage);
    }
  }

  async verifyNotVisible(locator: Locator, customMessage?: string) {
    const message = customMessage || "Element should not be visible";
    await expect(locator, message).not.toBeVisible();
  }

  async verifyFormVisible(fields: Array<{ locator: Locator; name: string }>) {
    for (const field of fields) {
      await expect
        .soft(field.locator, `${field.name} should be visible`)
        .toBeVisible();
    }
  }
}
