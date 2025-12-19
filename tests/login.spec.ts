import { test } from "../src/fixtures/pom.fixtures";
import { validUser } from "../src/types/users";

test.describe("Login Functionality", () => {
  test("TC01: Login successfully with valid credentials", async ({
    loginPage,
    homePage,
  }) => {
    await test.step("Navigate to login page", async () => {
      await homePage.clickLogin();
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
});
