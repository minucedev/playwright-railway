import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { DepartStation, ArriveStation } from "../utils/ticket.config";

export class TimeTablePage extends BasePage {
  readonly timetableTable: Locator;

  constructor(page: Page) {
    super(page);
    this.timetableTable = page.getByRole("table");
  }

  private getRouteRow(
    departStation: DepartStation,
    arriveStation: ArriveStation
  ): Locator {
    return this.timetableTable
      .getByRole("row")
      .filter({
        has: this.page.getByRole("cell").filter({ hasText: departStation }),
      })
      .filter({
        has: this.page.getByRole("cell").filter({ hasText: arriveStation }),
      })
      .first();
  }

  async clickBookTicketLink(
    departStation: DepartStation,
    arriveStation: ArriveStation
  ) {
    const row = this.getRouteRow(departStation, arriveStation);
    await row.getByRole("link", { name: "book ticket" }).click();
  }
}
