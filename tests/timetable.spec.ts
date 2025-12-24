import { test } from "../src/fixtures/pom.fixtures";
import { valid } from "../src/data/users";
import { PageRoute } from "../src/utils/routes.config";
import { DepartStation, ArriveStation } from "../src/utils/ticket.config";

test.describe("Timetable Functionality", () => {
  test("TC15: User can open Book ticket page by clicking on Book ticket link in Train timetable page", async ({
    homePage,
    loginPage,
    timetablePage,
    bookTicketPage,
  }) => {
    await test.step("Login with valid credentials", async () => {
      await homePage.goTo(PageRoute.LOGIN);
      await loginPage.login(valid);
      await homePage.verifyUserLoggedIn(valid.username);
    });

    await test.step("Navigate to Timetable page", async () => {
      await homePage.goTo(PageRoute.TIMETABLE);
    });

    await test.step('Click on "book ticket" link of the route from Huế to Sài Gòn', async () => {
      await timetablePage.clickBookTicketLink(
        DepartStation.HUE,
        ArriveStation.SAI_GON
      );
    });

    await test.step("Verify Book ticket page is loaded with correct Depart from and Arrive at values", async () => {
      await bookTicketPage.verifyCurrentPage(PageRoute.BOOK_TICKET);
      await bookTicketPage.verifySelectedStations(
        DepartStation.HUE,
        ArriveStation.SAI_GON
      );
    });
  });
});
