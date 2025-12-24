import { type Page, type Locator, expect } from "@playwright/test";
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
      await expect(this.page).toHaveURL(navItem.path);
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
}
