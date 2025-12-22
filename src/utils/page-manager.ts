import { type Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ROUTES, MENU_LINKS } from "./routes.config";

export class PageManager {
  readonly page: Page;
  readonly home: HomePage;
  readonly login: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.home = new HomePage(page);
    this.login = new LoginPage(page);
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
