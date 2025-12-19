import { test } from "../src/fixtures/pom.fixtures";
import { validUser, invalidUserBlankUsername } from "../src/types/users";

test.describe("Login Functionality", () => {
  test("TC01: Login successfully with valid credentials", async ({
    loginPage,
    homePage,
  }) => {
    await homePage.navigateToLogin();
    await loginPage.verifyLoginFormVisible();
    await loginPage.login(validUser);
    await homePage.verifyUserLoggedIn(validUser.username);
  });
  test("TC02: Login with blank username", async ({ loginPage, homePage }) => {
    await homePage.navigateToLogin();
    await loginPage.verifyLoginFormVisible();
    await loginPage.login(invalidUserBlankUsername);
  });
});
