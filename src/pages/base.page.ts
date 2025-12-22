import { type Page } from "@playwright/test";
import { ROUTES, MENU_LINKS } from "../utils/routes.config";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(routeKey: keyof typeof ROUTES) {
    const url = ROUTES[routeKey];
    await this.page.goto(url);
  }

  async navigateViaMenu(menuKey: keyof typeof MENU_LINKS) {
    const linkName = MENU_LINKS[menuKey];
    await this.page.getByRole("link", { name: linkName }).click();
  }

  async logout() {
    await this.navigateViaMenu("LOGOUT");
  }
}
