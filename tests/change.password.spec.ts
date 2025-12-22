import { test } from "../src/fixtures/pom.fixtures";
import { validUser, validChangePasswordData } from "../src/types/users";

test.describe("Change Password Functionality", () => {
  test("TC09: User can change password", async ({ pm }) => {
    await test.step("Login with valid account", async () => {
      await pm.goTo("LOGIN");
      await pm.login.login(validUser);
      await pm.home.verifyUserLoggedIn(validUser.username);
    });

    await test.step("Navigate to Change Password page", async () => {
      await pm.goTo("CHANGE_PASSWORD");
    });

    await test.step("Verify change password form is visible", async () => {
      await pm.changePassword.verifyChangePasswordFormVisible();
    });

    await test.step("Enter valid value into all fields", async () => {
      await pm.changePassword.changePassword(validChangePasswordData);
    });

    await test.step("Verify password updated successfully", async () => {
      await pm.changePassword.verifySuccessMessage(
        "Your password has been updated"
      );
    });
  });
});
