import { test } from "../src/fixtures/pom.fixtures";
import {
  validRegister,
  mismatchPasswordRegister,
  emptyPasswordPidRegister,
} from "../src/data/users";
import { PageRoute } from "../src/utils/routes.config";

test.describe("Registration Functionality", () => {
  test("TC07: User can create new account", async ({
    homePage,
    registerPage,
  }) => {
    await test.step("Navigate to Register page", async () => {
      await homePage.goTo(PageRoute.REGISTER);
    });

    await test.step("Verify registration form is visible", async () => {
      await registerPage.verifyRegistrationFormVisible();
    });

    await test.step("Enter valid information into all fields", async () => {
      const registerUser = validRegister();
      await registerPage.register(registerUser);
    });

    await test.step("Verify account created successfully", async () => {
      await registerPage.verifySuccessMessage(
        "Thank you for registering your account"
      );
    });
  });

  test("TC10: User can't create account with confirm password mismatch", async ({
    homePage,
    registerPage,
  }) => {
    await test.step("Navigate to Register page", async () => {
      await homePage.goTo(PageRoute.REGISTER);
    });

    await test.step("Verify registration form is visible", async () => {
      await registerPage.verifyRegistrationFormVisible();
    });

    await test.step("Enter valid information except confirm password mismatch", async () => {
      const registerUser = mismatchPasswordRegister();
      await registerPage.register(registerUser);
    });

    await test.step("Verify error message is displayed", async () => {
      await registerPage.verifyErrorMessage(
        "There're errors in the form. Please correct the errors and try again."
      );
    });
  });

  test("TC11: User can't create account with empty password and PID fields", async ({
    homePage,
    registerPage,
  }) => {
    await test.step("Navigate to Register page", async () => {
      await homePage.goTo(PageRoute.REGISTER);
    });

    await test.step("Verify registration form is visible", async () => {
      await registerPage.verifyRegistrationFormVisible();
    });

    await test.step("Enter valid email and leave password and PID empty", async () => {
      const registerUser = emptyPasswordPidRegister();
      await registerPage.register(registerUser);
    });

    await test.step("Verify error message is displayed", async () => {
      await registerPage.verifyErrorMessage(
        "There're errors in the form. Please correct the errors and try again."
      );
    });

    await test.step("Verify field validation errors are displayed", async () => {
      await registerPage.verifyFieldValidationErrors();
    });
  });
});
