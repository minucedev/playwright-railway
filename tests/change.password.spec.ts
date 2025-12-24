import { test } from "../src/fixtures/pom.fixtures";
import { valid } from "../src/data/users";
import { PageRoute } from "../src/utils/routes.config";
import { HomePage } from "../src/pages/home.page";
import { LoginPage } from "../src/pages/login.page";
import { ChangePasswordPage } from "../src/pages/change.password.page";

test.describe("Change Password Functionality", () => {
  test("TC09: User can change password successfully", async ({
    homePage,
    loginPage,
    changePasswordPage,
  }) => {
    await test.step("Login with valid credentials", async () => {
      await homePage.goTo(PageRoute.LOGIN);
      await loginPage.login(valid);
      await homePage.verifyUserLoggedIn(valid.username);
    });

    await test.step("Navigate to Change Password page", async () => {
      await homePage.goTo(PageRoute.CHANGE_PASSWORD);
    });

    await test.step("Verify change password form is visible", async () => {
      await changePasswordPage.verifyHeader();
    });

    await test.step("Enter current and new password", async () => {
      const changePasswordData = {
        currentPassword: valid.password,
        newPassword: "newpassword123",
      };
      await changePasswordPage.changePassword(changePasswordData);
    });

    await test.step("Verify password changed successfully", async () => {
      await changePasswordPage.verifySuccessMessage(
        "Your password has been updated!"
      );
    });
  });

  test.afterAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const changePasswordPage = new ChangePasswordPage(page);

    // Cleanup: Reset password back to original
    await page.goto("/");
    await homePage.goTo(PageRoute.LOGIN);
    await loginPage.login({
      username: valid.username,
      password: "newpassword123",
    });

    await homePage.goTo(PageRoute.CHANGE_PASSWORD);
    await changePasswordPage.changePassword({
      currentPassword: "newpassword123",
      newPassword: valid.password,
    });

    await context.close();
  });
});
