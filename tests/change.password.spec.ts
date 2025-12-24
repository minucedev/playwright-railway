import { test } from "../src/fixtures/pom.fixtures";
import { valid } from "../src/data/users";
import { PageRoute } from "../src/utils/routes.config";

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

  test.afterAll(async ({ homePage, loginPage, changePasswordPage }) => {
    await test.step("Reset password back to original", async () => {
      // Login with the new password
      await homePage.goTo(PageRoute.LOGIN);
      await loginPage.login({
        username: valid.username,
        password: "newpassword123",
      });
      await homePage.verifyUserLoggedIn(valid.username);

      // Change password back to old
      await homePage.goTo(PageRoute.CHANGE_PASSWORD);
      const changeBackData = {
        currentPassword: "newpassword123",
        newPassword: valid.password,
      };
      await changePasswordPage.changePassword(changeBackData);
      await changePasswordPage.verifySuccessMessage(
        "Your password has been updated!"
      );
    });
  });
});
