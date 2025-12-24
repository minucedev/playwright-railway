import { test } from "../src/fixtures/pom.fixtures";
import { valid } from "../src/data/users";
import { validTicket } from "../src/data/tickets";
import { PageRoute } from "../src/utils/routes.config";

test.describe("My Ticket Functionality", () => {
  test("TC16: User can cancel a ticket", async ({
    homePage,
    loginPage,
    bookTicketPage,
    myTicketPage,
  }) => {
    await test.step("Login with valid credentials", async () => {
      await homePage.goTo(PageRoute.LOGIN);
      await loginPage.login(valid);
      await homePage.verifyUserLoggedIn(valid.username);
    });

    await test.step("Book a ticket", async () => {
      await homePage.goTo(PageRoute.BOOK_TICKET);
      await bookTicketPage.bookTicket(validTicket);
      await bookTicketPage.verifySuccessMessage();
    });

    await test.step("Navigate to My ticket page", async () => {
      await homePage.goTo(PageRoute.MY_TICKET);
    });

    await test.step("Click on Cancel button of ticket which user want to cancel", async () => {
      const initialCount = await myTicketPage.cancelTicketByInfo(validTicket);

      await test.step("Verify the canceled ticket is disappeared", async () => {
        await myTicketPage.verifyTicketCanceled(initialCount, validTicket);
      });
    });
  });
});
