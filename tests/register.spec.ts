import { test } from "../src/fixtures/pom.fixtures";
import { getValidRegisterUser } from "../src/types/users";

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
});
