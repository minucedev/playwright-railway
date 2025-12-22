import { test, expect } from "../src/fixtures/pom.fixtures";
import {
  validUser,
  invalidUserBlankUsername,
  userInvalidPassword,
} from "../src/types/users";

test.describe("Login Functionality", () => {
  test("TC01: Login successfully with valid credentials", async ({ pm }) => {
    await test.step("Navigate to login page", async () => {
      await pm.goTo("LOGIN");
    });

    await test.step("Verify login form is visible", async () => {
      await pm.login.verifyLoginFormVisible();
    });

    await test.step("Perform login with valid credentials", async () => {
      await pm.login.login(validUser);
    });

    await test.step("Verify user is logged in", async () => {
      await pm.home.verifyUserLoggedIn(validUser.username);
    });
  });

  test("TC02: Login with blank username", async ({ pm }) => {
    await test.step("Navigate to login page", async () => {
      await pm.goTo("LOGIN");
    });

    await test.step("Verify login form is visible", async () => {
      await pm.login.verifyLoginFormVisible();
    });

    await test.step("Perform login with blank username", async () => {
      await pm.login.login(invalidUserBlankUsername);
    });

    await test.step("Verify error message is displayed", async () => {
      await pm.login.verifyErrorMessage(
        "There was a problem with your login and/or errors exist in your form."
      );
    });
  });
  test("TC03: Login with invalid password", async ({ pm }) => {
    await test.step("Navigate to login page", async () => {
      await pm.goTo("LOGIN");
    });
    await test.step("Verify login form is visible", async () => {
      await pm.login.verifyLoginFormVisible();
    });
    await test.step("Perform login with invalid password", async () => {
      await pm.login.login(userInvalidPassword);
    });
    await test.step("Verify error message is displayed", async () => {
      await pm.login.verifyErrorMessage(
        "There was a problem with your login and/or errors exist in your form."
      );
    });
  });

  test("TC04: Navigate to book ticket page without login redirects to login page", async ({
    pm,
  }) => {
    await test.step("Navigate to book ticket page without login", async () => {
      await pm.goTo("BOOK_TICKET");
    });
    await test.step("Verify redirected to login page", async () => {
      await pm.login.verifyLoginFormVisible();
    });
  });
});
