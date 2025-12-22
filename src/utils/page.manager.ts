import { type Page, type Locator, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";
import { ChangePasswordPage } from "../pages/change.password.page";
import { ROUTES, MENU_LINKS } from "./routes.config";

export class PageManager {
  readonly page: Page;
  readonly home: HomePage;
  readonly login: LoginPage;
  readonly register: RegisterPage;
  readonly changePassword: ChangePasswordPage;
  readonly myTicketLink: Locator;
  readonly changePasswordLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.home = new HomePage(page);
    this.login = new LoginPage(page);
    this.register = new RegisterPage(page);
    this.changePassword = new ChangePasswordPage(page);
    this.myTicketLink = page.getByRole("link", {
      name: "My ticket",
      exact: true,
    });
    this.changePasswordLink = page.getByRole("link", {
      name: "Change password",
      exact: true,
    });
    this.logoutLink = page.getByRole("link", { name: "Log out", exact: true });
  }

  async goTo(routeKey: keyof typeof ROUTES) {
    const url = ROUTES[routeKey];
    await this.page.goto(url);
  }

  async navigateViaMenu(menuKey: keyof typeof MENU_LINKS) {
    const linkName = MENU_LINKS[menuKey];
    await this.page.getByRole("link", { name: linkName }).click();
  }

  async verifyAuthenticatedMenuVisible() {
    await expect(
      this.myTicketLink,
      "My ticket link should be visible"
    ).toBeVisible();
    await expect(
      this.changePasswordLink,
      "Change password link should be visible"
    ).toBeVisible();
    await expect(
      this.logoutLink,
      "Logout link should be visible"
    ).toBeVisible();
  }

  async verifyCurrentUrl(expectedPath: string) {
    await expect(
      this.page,
      `Current URL should contain ${expectedPath}`
    ).toHaveURL(new RegExp(expectedPath));
  }
}
