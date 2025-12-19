import { test, expect } from "../src/fixtures/pom.fixtures";
import { validUser } from "../src/types/users";

test.describe("Login Functionality", () => {
  test("TC01: Login successfully with valid credentials", async ({
    loginPage,
    homePage,
  }) => {
    await homePage.navigateToLogin();
    await loginPage.verifyLoginFormVisible();
    await loginPage.login(validUser.username, validUser.password);
    await homePage.verifyUserLoggedIn(validUser.username);
  });

  test("TC02: Login with blank username", async ({ loginPage, homePage }) => {
    await homePage.navigateToLogin();
    await loginPage.verifyLoginFormVisible();
    await loginPage.login("", validUser.password);
    await loginPage.verifyErrorMessage(
      "There was a problem with your login and/or errors exist in your form."
    );
  });

  test("TC03: Login with invalid password", async ({ loginPage, homePage }) => {
    await homePage.navigateToLogin();
    await loginPage.verifyLoginFormVisible();
    await loginPage.login(validUser.username, "wr");
    await loginPage.verifyErrorMessage(
      "There was a problem with your login and/or errors exist in your form."
    );
  });
});
