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
    await test.step("Navigate to login page", async () => {
      await homePage.navigateToPage("Login");
    });
    await test.step("Verify login form is visible", async () => {
      await loginPage.verifyLoginFormVisible();
    });
    await test.step("Perform login with valid credentials", async () => {
      await loginPage.login(validUser);
    });
    await test.step("Verify user is logged in", async () => {
      await homePage.verifyUserLoggedIn(validUser.username);
    });
  });
  test("TC02: Login with blank username", async ({ loginPage, homePage }) => {
    await test.step("Navigate to login page", async () => {
      await homePage.navigateToPage("Login");
    });
    await test.step("Verify login form is visible", async () => {
      await loginPage.verifyLoginFormVisible();
    });
    await test.step("Perform login with blank username", async () => {
      await loginPage.login(invalidUserBlankUsername);
    });
    await test.step("Verify error message is displayed", async () => {
      await loginPage.verifyErrorMessage(
        "There was a problem with your login and/or errors exist in your form."
      );
    });
  });
  test("TC03: Login with invalid password", async ({ loginPage, homePage }) => {
    await test.step("Navigate to login page", async () => {
      await homePage.navigateToPage("Login");
    });
    await test.step("Verify login form is visible", async () => {
      await loginPage.verifyLoginFormVisible();
    });
    await test.step("Perform login with invalid password", async () => {
      await loginPage.login(userInvalidPassword);
    });
    await test.step("Verify error message is displayed", async () => {
      await loginPage.verifyErrorMessage(
        "There was a problem with your login and/or errors exist in your form."
      );
    });
  });

  test("TC04: Navigate to book ticket page without login redirects to login page", async ({
    loginPage,
    homePage,
  }) => {
    await test.step("Navigate to book ticket page without login", async () => {
      await homePage.navigateToPage("Book ticket");
    });
    await test.step("Verify redirected to login page", async () => {
      await loginPage.verifyLoginFormVisible();
    });
  });
});
