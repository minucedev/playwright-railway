import { test } from "../src/fixtures/pom.fixtures";
import { validUser } from "../src/types/users";

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
});
