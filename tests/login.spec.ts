import { test } from "../src/fixtures/pom.fixtures";
import {
  valid,
  invalidBlankUsername,
  invalidPassword,
} from "../src/types/users";
import { PageRoute } from "../src/utils/routes.config";

test.describe("Login Functionality", () => {
  test("TC01: Login successfully with valid credentials", async ({
    homePage,
    loginPage,
  }) => {
    await test.step("Navigate to login page", async () => {
      await homePage.goTo(PageRoute.LOGIN);
    });

    await test.step("Verify login form is visible", async () => {
      await loginPage.verifyLoginFormVisible();
    });

    await test.step("Perform login with valid credentials", async () => {
      await loginPage.login(valid);
    });

    await test.step("Verify user is logged in", async () => {
      await homePage.verifyUserLoggedIn(valid.username);
    });

    await test.step("Verify no error message is displayed", async () => {
      await loginPage.verifyNoErrorMessage();
    });
  });

  test("TC02: Login with blank username", async ({ homePage, loginPage }) => {
    await test.step("Navigate to login page", async () => {
      await homePage.goTo(PageRoute.LOGIN);
    });

    await test.step("Verify login form is visible", async () => {
      await loginPage.verifyLoginFormVisible();
    });

    await test.step("Perform login with blank username", async () => {
      await loginPage.login(invalidBlankUsername);
    });

    await test.step("Verify error message is displayed", async () => {
      const expectedMessage =
        "There was a problem with your login and/or errors exist in your form.";
      await loginPage.verifyErrorMessageExactly(expectedMessage);
    });
  });
  test("TC03: Login with invalid password", async ({ homePage, loginPage }) => {
    await test.step("Navigate to login page", async () => {
      await homePage.goTo(PageRoute.LOGIN);
    });
    await test.step("Verify login form is visible", async () => {
      await loginPage.verifyLoginFormVisible();
    });
    await test.step("Perform login with invalid password", async () => {
      await loginPage.login(invalidPassword);
    });
    await test.step("Verify error message is displayed", async () => {
      const expectedMessage = "Invalid username or password. Please try again.";
      await loginPage.verifyErrorMessageExactly(expectedMessage);
    });
  });

  test("TC04: Navigate to book ticket page without login redirects to login page", async ({
    homePage,
    loginPage,
  }) => {
    await test.step("Navigate to book ticket page without login", async () => {
      await homePage.goTo(PageRoute.BOOK_TICKET);
    });
    await test.step("Verify redirected to login page", async () => {
      await loginPage.verifyLoginFormVisible();
    });
  });

  test("TC05: Account lockout after 5 failed login attempts", async ({
    homePage,
    loginPage,
  }) => {
    await test.step("Navigate to login page", async () => {
      await homePage.goTo(PageRoute.LOGIN);
    });

    await test.step("Verify login form is visible", async () => {
      await loginPage.verifyLoginFormVisible();
    });

    await test.step("Attempt login 5 times with invalid password", async () => {
      await loginPage.loginMultipleTimes(invalidPassword, 5);
    });

    await test.step("Verify account lockout warning message", async () => {
      await loginPage.verifyLockoutMessage(5);
    });
  });

  test("TC06: Additional pages display once user logged in", async ({
    homePage,
    loginPage,
    myTicketPage,
    changePasswordPage,
  }) => {
    await test.step("Navigate to login page", async () => {
      await homePage.goTo(PageRoute.LOGIN);
    });

    await test.step("Login with valid account", async () => {
      await loginPage.login(valid);
    });

    await test.step("Verify tab bar components ", async () => {
      await homePage.verifyTabBarAfterLogin();
    });

    await test.step("Verify navigation to protected pages", async () => {
      //Navigate to My ticket page
      await myTicketPage.goTo(PageRoute.MY_TICKET);
      await myTicketPage.verifyCurrentPage(PageRoute.MY_TICKET);
      await myTicketPage.verifyHeader();

      //Navigate to Change password page
      await changePasswordPage.goTo(PageRoute.CHANGE_PASSWORD);
      await changePasswordPage.verifyCurrentPage(PageRoute.CHANGE_PASSWORD);
      await changePasswordPage.verifyHeader();
    });
  });
});
