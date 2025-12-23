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

      const errorText = await loginPage.getErrorMessageText();
      console.log("Error message received:", errorText);
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

      const errorText = await loginPage.getErrorMessageText();
      console.log("Error message received:", errorText);
    });
  });
});
