import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/my.ticket.page";
import { ChangePasswordPage } from "../pages/change.password.page";
import { RegisterPage } from "../pages/register.page";
import { BookTicketPage } from "../pages/book.ticket.page";
import { TimeTablePage } from "../pages/timetable.page";

type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  myTicketPage: MyTicketPage;
  changePasswordPage: ChangePasswordPage;
  registerPage: RegisterPage;
  bookTicketPage: BookTicketPage;
  timeTablePage: TimeTablePage;
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
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
  bookTicketPage: async ({ page }, use) => {
    const bookTicketPage = new BookTicketPage(page);
    await use(bookTicketPage);
  },
  timeTablePage: async ({ page }, use) => {
    const timeTablePage = new TimeTablePage(page);
    await use(timeTablePage);
  },
});
