import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/myTicket.page";
import { ChangePasswordPage } from "../pages/changePassword.page";

type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  myTicketPage: MyTicketPage;
  changePasswordPage: ChangePasswordPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await page.goto("/"); // Navigate to home once per test
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  myTicketPage: async ({ page }, use) => {
    const myTicketPage = new MyTicketPage(page);
    await use(myTicketPage);
  },
  changePasswordPage: async ({ page }, use) => {
    const changePasswordPage = new ChangePasswordPage(page);
    await use(changePasswordPage);
  },
});
