import { expect } from "@playwright/test";
import type { Page, Locator } from "../types/playwright.types";
import { BasePage } from "./base.page";

export class TimetablePage extends BasePage {
  readonly timetableTable: Locator;

  constructor(page: Page) {
    super(page);
    this.timetableTable = page.locator("table.MyTable.WideTable");
  }

  async clickBookTicketLink(departStation: string, arriveStation: string) {
    const row = this.timetableTable
      .locator("tr")
      .filter({ has: this.page.locator(`td:has-text("${departStation}")`) })
      .filter({ has: this.page.locator(`td:has-text("${arriveStation}")`) });

    await row.locator('a:has-text("book ticket")').click();
  }
}
