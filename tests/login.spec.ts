import { test } from "../src/fixtures/pom.fixtures";
import {
  validUser,
  invalidUserBlankUsername,
  userInvalidPassword,
} from "../src/types/users";

test.describe("Login Functionality", () => {
  test("TC01: Navigate to login page and login successfully", async ({
    loginPage,
    homePage,
  }) => {
    await homePage.navigateToPage("Login");
    await loginPage.verifyLoginFormVisible();
    await loginPage.login(validUser);
    await homePage.verifyUserLoggedIn(validUser.username);
  });
  test("TC02: Navigate to login page with blank username", async ({
    loginPage,
    homePage,
  }) => {
    await homePage.navigateToPage("Login");
    await loginPage.verifyLoginFormVisible();
    await loginPage.login(invalidUserBlankUsername);
  });
  test("TC03: Navigate to login page with invalid password", async ({
    loginPage,
    homePage,
  }) => {
    await homePage.navigateToPage("Login");
    await loginPage.verifyLoginFormVisible();
    await loginPage.login(userInvalidPassword);
    await loginPage.verifyErrorMessage(
      "There was a problem with your login and/or errors exist in your form."
    );
  });

  test("TC04: Navigate to book ticket page without login redirects to login page", async ({
    loginPage,
    homePage,
  }) => {
    await homePage.navigateToPage("Book ticket");
    await loginPage.verifyLoginFormVisible();
  });
});
