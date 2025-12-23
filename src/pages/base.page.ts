import { type Page, expect } from "@playwright/test";
import { pages, PageRoute } from "../utils/routes.config";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(pageKey: PageRoute) {
    const config = pages[pageKey];
    if (config.label) {
      await this.page.getByRole("link", { name: config.label }).click();
    }
  }

  async verifyCurrentPage(pageRoute: PageRoute) {
    const config = pages[pageRoute];
    if (config.path) {
      await expect(this.page).toHaveURL(config.path);
    }
  }

  async verifyLinkVisible(pageRoute: PageRoute) {
    const config = pages[pageRoute];
    if (config.label) {
      await expect(
        this.page.getByRole("link", { name: config.label }),
        `${config.label} link should be visible`
      ).toBeVisible();
    }
  }

  async verifyTabBarComponentsAfterLogin() {
    // Verify displayed tabs: My ticket, Change password, Logout
    await this.verifyLinkVisible(PageRoute.MY_TICKET);
    await this.verifyLinkVisible(PageRoute.CHANGE_PASSWORD);
    await this.verifyLinkVisible(PageRoute.LOGOUT);

    // Verify navigation to My ticket page
    await this.goTo(PageRoute.MY_TICKET);
    await this.verifyCurrentPage(PageRoute.MY_TICKET);

    // Verify navigation to Change password page
    await this.goTo(PageRoute.CHANGE_PASSWORD);
    await this.verifyCurrentPage(PageRoute.CHANGE_PASSWORD);
  }
}
