import { type Page } from "@playwright/test";
import { pages } from "../utils/routes.config";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(pageKey: keyof typeof pages) {
    const url = pages[pageKey].path;
    await this.page.goto(url);
  }
}
