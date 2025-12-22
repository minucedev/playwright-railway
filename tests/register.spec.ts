import { test } from "../src/fixtures/pom.fixtures";
import {
  getValidRegisterUser,
  getRegisterUserMismatchPassword,
  getRegisterUserEmptyPasswordPID,
} from "../src/types/users";

test.describe("Registration Functionality", () => {
  test("TC07: User can create new account", async ({ pm }) => {
    await test.step("Navigate to Register page", async () => {
      await pm.goTo("REGISTER");
    });

    await test.step("Verify registration form is visible", async () => {
      await pm.register.verifyRegistrationFormVisible();
    });

    await test.step("Enter valid information into all fields", async () => {
      const registerUser = getValidRegisterUser();
      await pm.register.register(registerUser);
    });

    await test.step("Verify account created successfully", async () => {
      await pm.register.verifySuccessMessage(
        "Thank you for registering your account"
      );
      await pm.verifyCurrentUrl("/Account/Confirm");
    });
  });

  test("TC10: User can't create account with confirm password mismatch", async ({
    pm,
  }) => {
    await test.step("Navigate to Register page", async () => {
      await pm.goTo("REGISTER");
    });

    await test.step("Verify registration form is visible", async () => {
      await pm.register.verifyRegistrationFormVisible();
    });

    await test.step("Enter valid information except confirm password mismatch", async () => {
      const registerUser = getRegisterUserMismatchPassword();
      await pm.register.register(registerUser);
    });

    await test.step("Verify error message is displayed", async () => {
      await pm.register.verifyErrorMessage(
        "There're errors in the form. Please correct the errors and try again."
      );
    });
  });

  test("TC11: User can't create account with empty password and PID fields", async ({
    pm,
  }) => {
    await test.step("Navigate to Register page", async () => {
      await pm.goTo("REGISTER");
    });

    await test.step("Verify registration form is visible", async () => {
      await pm.register.verifyRegistrationFormVisible();
    });

    await test.step("Enter valid email and leave password and PID empty", async () => {
      const registerUser = getRegisterUserEmptyPasswordPID();
      await pm.register.register(registerUser);
    });

    await test.step("Verify error message is displayed", async () => {
      await pm.register.verifyErrorMessage(
        "There're errors in the form. Please correct the errors and try again."
      );
    });

    await test.step("Verify field validation errors are displayed", async () => {
      await pm.register.verifyFieldValidationErrors();
    });
  });
});
