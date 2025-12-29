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

  private getCancelButtonLocator(ticketId: string): Locator {
    return this.page
      .getByRole("button", { name: "Cancel" })
      .filter({ has: this.page.locator(`[onclick*="${ticketId}"]`) });
  }

  async cancelTicket(ticketId: string) {
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await this.getCancelButtonLocator(ticketId).click();
    await this.page.waitForLoadState("networkidle");
  }

  async verifyTicketRemoved(ticketId: string) {
    // Check that the Cancel button with the ID no longer exists
    const cancelButton = this.getCancelButtonLocator(ticketId);
    await expect(
      cancelButton,
      "Canceled ticket should not exist in active tickets"
    ).toHaveCount(0);
  }
}
