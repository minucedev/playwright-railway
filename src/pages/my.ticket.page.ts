import { expect } from "@playwright/test";
import type { Page, Locator } from "../types/playwright.types";
import { BasePage } from "./base.page";
import type { BookTicketData } from "./book.ticket.page";

export class MyTicketPage extends BasePage {
  readonly ticketTable: Locator;
  readonly cancelButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { name: "Manage Tickets" });
    this.ticketTable = page.locator("table.MyTable");
    this.cancelButtons = page.locator('input[type="button"][value="Cancel"]');
  }

  async getTicketCount(): Promise<number> {
    const rows = this.ticketTable.locator("tbody tr").filter({
      has: this.page.locator('input[value="Cancel"]'),
    });
    return await rows.count();
  }

  async cancelTicketByInfo(
    ticketInfo: Partial<BookTicketData>
  ): Promise<number> {
    const initialCount = await this.getTicketCount();

    // Find the row matching ticket information
    let row = this.ticketTable.locator("tbody tr");

    if (ticketInfo.departStation) {
      row = row.filter({
        has: this.page.locator(`td:has-text("${ticketInfo.departStation}")`),
      });
    }
    if (ticketInfo.arriveStation) {
      row = row.filter({
        has: this.page.locator(`td:has-text("${ticketInfo.arriveStation}")`),
      });
    }
    if (ticketInfo.seatType) {
      row = row.filter({
        has: this.page.locator(`td:has-text("${ticketInfo.seatType}")`),
      });
    }

    // Setup dialog handler before clicking
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    // Click cancel button in the matched row
    await row.locator('input[value="Cancel"]').first().click();

    // Wait for ticket to be removed
    await this.page.waitForTimeout(1000);

    return initialCount;
  }

  async verifyTicketCanceled(
    initialCount: number,
    ticketInfo: Partial<BookTicketData>
  ) {
    // Verify count decreased
    const currentCount = await this.getTicketCount();
    await expect
      .soft(
        currentCount,
        `Ticket count should decrease from ${initialCount} to ${
          initialCount - 1
        }`
      )
      .toBe(initialCount - 1);

    // Verify specific ticket disappeared
    let row = this.ticketTable.locator("tbody tr");

    if (ticketInfo.departStation) {
      row = row.filter({
        has: this.page.locator(`td:has-text("${ticketInfo.departStation}")`),
      });
    }
    if (ticketInfo.arriveStation) {
      row = row.filter({
        has: this.page.locator(`td:has-text("${ticketInfo.arriveStation}")`),
      });
    }
    if (ticketInfo.seatType) {
      row = row.filter({
        has: this.page.locator(`td:has-text("${ticketInfo.seatType}")`),
      });
    }

    const matchingRowCount = await row.count();
    await expect
      .soft(matchingRowCount, `Ticket with info should not exist anymore`)
      .toBeLessThan(initialCount > 1 ? 1 : currentCount + 1);
  }
}
