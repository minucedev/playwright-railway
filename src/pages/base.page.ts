import { type Page, expect } from "@playwright/test";
import { pages, PageRoute } from "../utils/routes.config";

function isPageRoute(value: string): value is PageRoute {
  return Object.values(PageRoute).includes(value as PageRoute);
}

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(pageKey: PageRoute) {
    const label = pages[pageKey].label!;
    await this.page.getByRole("link", { name: label }).click();
  }

  async verifyCurrentPage(pageRoute: PageRoute) {
    const expectedPath = pages[pageRoute].path!;
    await expect(this.page).toHaveURL(expectedPath);
  }

  async verifyLinkVisible(link: string | PageRoute) {
    let linkText: string;
    if (isPageRoute(link)) {
      linkText = pages[link].label!;
    } else {
      linkText = link;
    }
    await expect(
      this.page.getByRole("link", { name: linkText }),
      `${linkText} link should be visible`
    ).toBeVisible();
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
