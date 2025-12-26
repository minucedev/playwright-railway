import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class TimetablePage extends BasePage {
  readonly timetableTable: Locator;

  constructor(page: Page) {
    super(page);
    this.timetableTable = page.locator("table.MyTable.WideTable");
  }

  private getRouteRow(departStation: string, arriveStation: string): Locator {
    return this.timetableTable
      .locator("tr")
      .filter({
        has: this.page.locator("td").filter({ hasText: departStation }).first(),
      })
      .filter({
        has: this.page.locator("td").filter({ hasText: arriveStation }).first(),
      })
      .first();
  }

  async clickBookTicketLink(departStation: string, arriveStation: string) {
    const row = this.getRouteRow(departStation, arriveStation);
    await row.locator('a:has-text("book ticket")').click();
  }
}
