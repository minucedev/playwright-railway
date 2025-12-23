import { type Page, expect } from "@playwright/test";
import { pages, PageRoute } from "../utils/routes.config";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(pageKey: PageRoute) {
    const url = pages[pageKey].path;
    await this.page.goto(url);
  }

  async verifyCurrentUrl(expectedUrl: string) {
    await expect(this.page).toHaveURL(new RegExp(expectedUrl));
  }
}
