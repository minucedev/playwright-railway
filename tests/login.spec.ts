import { test } from "../src/fixtures/pom.fixtures";
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

  test("TC05: Account lockout message for multiple failed logins", async ({
    pm,
  }) => {
    await test.step("Navigate to login page", async () => {
      await pm.goTo("LOGIN");
    });

    await test.step("Verify login form is visible", async () => {
      await pm.login.verifyLoginFormVisible();
    });

    await test.step("Attempt login 4 times with invalid password", async () => {
      for (let i = 0; i < 4; i++) {
        await pm.login.login(userInvalidPassword);
      }
    });

    await test.step("Verify account lockout warning message", async () => {
      await pm.login.verifyLockoutMessage(
        "You have used 4 out of 5 login attempts. After all 5 have been used, you will be unable to login for 15 minutes."
      );
    });
  });
});
