import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import type { BookTicketData } from "../types/playwright.types";
import { BasePage } from "./base.page";
import { getRandomDateFromDropdown } from "../utils/random.data";
import { Messages } from "../utils/messages.config";
import { TicketProperty } from "../utils/ticket.info";

export class BookTicketPage extends BasePage {
  readonly bookTicketButton: Locator;
  readonly successMessage: Locator;
  readonly confirmBookedTicketTable: Locator;

  constructor(page: Page) {
    super(page);
    this.bookTicketButton = this.page.getByRole("button", {
      name: "Book ticket",
    });
    this.successMessage = page.locator(
      `h1:has-text("${Messages.SUCCESS.TICKET_BOOKED}")`
    );
    this.confirmBookedTicketTable = page.locator(
      ".DivTable .MyTable.WideTable"
    );
  }

  private getTicketBookingValue(name: TicketProperty): Locator {
    return this.page.locator(`select[name="${name}"]`);
  }

  async bookTicket(data: BookTicketData): Promise<void> {
    let selectedDate: string;

    if (data.date) {
      await this.getTicketBookingValue(TicketProperty.Date).selectOption(
        data.date
      );
      selectedDate = data.date;
    } else {
      const dateSelect = this.getTicketBookingValue(TicketProperty.Date);
      selectedDate = await getRandomDateFromDropdown(dateSelect);
      await dateSelect.selectOption(selectedDate);
    }

    await this.getTicketBookingValue(TicketProperty.DepartStation).selectOption(
      data.departStation
    );
    await this.getTicketBookingValue(TicketProperty.ArriveStation).selectOption(
      data.arriveStation
    );
    await this.getTicketBookingValue(TicketProperty.SeatType).selectOption(
      data.seatType
    );
    await this.getTicketBookingValue(TicketProperty.TicketAmount).selectOption(
      data.ticketAmount
    );
    await this.bookTicketButton.click();
    await this.page.waitForLoadState("networkidle");

    // Extract ticket ID from URL after booking
    data.id = this.getTicketIdFromUrl();
  }

  async verifySuccessMessage() {
    await expect(
      this.successMessage,
      "Success message should be visible"
    ).toBeVisible();
  }

  private getTicketIdFromUrl(): string {
    const url = this.page.url();
    const urlParams = new URLSearchParams(url.split("?")[1]);
    const ticketId = urlParams.get("id");
    if (!ticketId) {
      throw new Error("Ticket ID not found in URL");
    }
    return ticketId;
  }

  /**
   * Gets the cell value by header name from the confirmation table.
   * @param headerText - The header text to find.
   * @returns Locator for the cell.
   */
  private async getCellByHeader(headerText: string): Promise<Locator> {
    const headers = this.confirmBookedTicketTable.getByRole("columnheader");
    const dataRow = this.confirmBookedTicketTable.getByRole("row").last();
    const headerCount = await headers.count();

    for (let i = 0; i < headerCount; i++) {
      const text = await headers.nth(i).textContent();
      if (text?.trim() === headerText) {
        return dataRow.getByRole("cell").nth(i);
      }
    }

    throw new Error(`Column with header "${headerText}" not found`);
  }

  /**
   * Verifies a single data cell matches the expected value.
   * @param header - The header name.
   * @param value - The expected value.
   */
  async verifyData(header: string, value: string) {
    const cell = await this.getCellByHeader(header);
    await expect(cell, `${header} should be "${value}"`).toHaveText(value);
  }

  /**
   * Verifies all booking ticket information matches the expected data.
   * @param expectedData - The expected booking data.
   */
  async verifyBookingTicketInfo(expectedData: BookTicketData) {
    const fields = [
      { header: "Depart Station", key: "departStation" as const },
      { header: "Arrive Station", key: "arriveStation" as const },
      { header: "Seat Type", key: "seatType" as const },
      { header: "Amount", key: "ticketAmount" as const },
    ];

    for (const { header, key } of fields) {
      await this.verifyData(header, expectedData[key]);
    }
  }
}
