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
});
