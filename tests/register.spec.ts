import { test } from "../src/fixtures/pom.fixtures";
import { getValidRegister } from "../src/data/users";
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
      const registerUser = getValidRegister();
      await registerPage.register(registerUser);
    });

    await test.step("Verify account created successfully", async () => {
      await registerPage.verifySuccessMessage(
        "Thank you for registering your account"
      );
    });
  });
});
