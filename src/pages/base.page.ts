import { type Page } from "@playwright/test";
import { pages, menuAction } from "../utils/routes.config";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(pageKey: keyof typeof pages) {
    const url = pages[pageKey].path;
    await this.page.goto(url);
  }

  async navigateViaMenu(pageKey: keyof typeof pages) {
    const linkName = pages[pageKey].label;
    if (!linkName) {
      throw new Error(`Page ${pageKey} does not have a menu label`);
    }
    await this.page.getByRole("link", { name: linkName }).click();
  }

  async logout() {
    await this.page.getByRole("link", { name: menuAction.LOGOUT }).click();
  }
}
