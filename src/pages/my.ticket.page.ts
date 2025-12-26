import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import type { BookTicketData } from "../types/playwright.types";

export class MyTicketPage extends BasePage {
  readonly ticketTable: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { name: "Manage Tickets" });
    this.ticketTable = page.getByRole("table");
  }

  private getActiveTicketRows(): Locator {
    return this.ticketTable.getByRole("row").filter({
      has: this.page.getByRole("button", { name: "Cancel" }),
    });
  }

  async getTicketCount(): Promise<number> {
    return await this.getActiveTicketRows().count();
  }

  private getTicketRow(ticketInfo: Partial<BookTicketData>): Locator {
    let row = this.getActiveTicketRows();

    if (ticketInfo.departStation) {
      row = row.filter({
        has: this.page.getByRole("cell", {
          name: ticketInfo.departStation,
          exact: true,
        }),
      });
    }
    if (ticketInfo.arriveStation) {
      row = row.filter({
        has: this.page.getByRole("cell", {
          name: ticketInfo.arriveStation,
          exact: true,
        }),
      });
    }
    if (ticketInfo.seatType) {
      row = row.filter({
        has: this.page.getByRole("cell", {
          name: ticketInfo.seatType,
          exact: true,
        }),
      });
    }

    return row.first();
  }

  async cancelTicket(ticketInfo: BookTicketData) {
    const row = this.getTicketRow(ticketInfo);

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await row.getByRole("button", { name: "Cancel" }).click();
    await this.page.waitForLoadState("networkidle");
  }

  async verifyTicketRemoved(ticketInfo: BookTicketData) {
    const row = this.getTicketRow(ticketInfo);
    await expect(
      row,
      "Canceled ticket should not exist in active tickets"
    ).toHaveCount(0);
  }
}
