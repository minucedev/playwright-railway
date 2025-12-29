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
    return this.page.locator(
      `input[type="button"][value="Cancel"][onclick*="DeleteTicket(${ticketId})"]`
    );
  }

  async cancelTicket(ticketInfo: BookTicketData) {
    if (!ticketInfo.id) {
      throw new Error("Ticket ID is required to cancel ticket");
    }

    await this.getCancelButtonLocator(ticketInfo.id).click();

    const dialogHandler = async (dialog: any) => {
      await dialog.accept();
      this.page.off("dialog", dialogHandler);
    };
    this.page.on("dialog", dialogHandler);

    await this.page.waitForLoadState("networkidle");
  }

  async verifyTicketRemoved(ticketInfo: BookTicketData) {
    if (!ticketInfo.id) {
      throw new Error("Ticket ID is required to verify ticket removal");
    }

    // Check that the Cancel button with the ID no longer exists
    const cancelButton = this.getCancelButtonLocator(ticketInfo.id);
    await expect(
      cancelButton,
      "Canceled ticket should not exist in active tickets"
    ).toHaveCount(0);
  }
}
