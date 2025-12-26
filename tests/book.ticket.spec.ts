import { test } from "../src/fixtures/pom.fixtures";
import { valid } from "../src/data/users";
import { PageRoute } from "../src/utils/routes.config";
import { validTicket } from "../src/data/tickets";

test.describe("Book Ticket Functionality", () => {
  test("TC14: User can book 1 ticket at a time", async ({
    homePage,
    loginPage,
    bookTicketPage,
  }) => {
    await test.step("Login with valid credentials", async () => {
      await homePage.goTo(PageRoute.LOGIN);
      await loginPage.login(valid);
      await homePage.verifyUserLoggedIn(valid.username);
    });

    await test.step("Navigate to Book Ticket page", async () => {
      await homePage.goTo(PageRoute.BOOK_TICKET);
    });

    await test.step("Select ticket information", async () => {
      await bookTicketPage.bookTicket(validTicket);
    });

    await test.step("Verify ticket booked successfully", async () => {
      await bookTicketPage.verifySuccessMessage();
    });

    await test.step("Verify ticket information displays correctly", async () => {
      await bookTicketPage.verifyBookingTicketInfo(validTicket);
    });
  });
});
