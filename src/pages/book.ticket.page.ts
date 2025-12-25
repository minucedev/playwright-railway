import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import type { BookTicketData } from "../types/playwright.types";
import { BasePage } from "./base.page";
import { getRandomDateFromDropdown } from "../utils/random.data";
import { Messages } from "../utils/messages.config";

type SelectName =
  | "Date"
  | "DepartStation"
  | "ArriveStation"
  | "SeatType"
  | "TicketAmount";
type TableHeader = "Depart Station" | "Arrive Station" | "Seat Type" | "Amount";

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

  private getSelectByName(name: SelectName): Locator {
    return this.page.locator(`select[name="${name}"]`);
  }

  async bookTicket(data: BookTicketData): Promise<string> {
    let selectedDate: string;

    if (data.date) {
      await this.getSelectByName("Date").selectOption(data.date);
      selectedDate = data.date;
    } else {
      const dateSelect = this.getSelectByName("Date");
      selectedDate = await getRandomDateFromDropdown(dateSelect);
      await dateSelect.selectOption(selectedDate);
    }

    await this.getSelectByName("DepartStation").selectOption(
      data.departStation
    );
    await this.getSelectByName("ArriveStation").selectOption(
      data.arriveStation
    );
    await this.getSelectByName("SeatType").selectOption(data.seatType);
    await this.getSelectByName("TicketAmount").selectOption(data.ticketAmount);
    await this.bookTicketButton.click();
    return selectedDate;
  }

  async verifySuccessMessage() {
    await expect(
      this.successMessage,
      "Success message should be visible"
    ).toBeVisible();
  }

  private async getColumnIndex(headerText: TableHeader): Promise<number> {
    const headers = this.confirmBookedTicketTable.getByRole("columnheader");
    const count = await headers.count();

    for (let i = 0; i < count; i++) {
      const text = await headers.nth(i).textContent();
      if (text?.trim() === headerText) {
        return i;
      }
    }

    throw new Error(`Column with header "${headerText}" not found`);
  }

  private async getTicketCellValue(
    headerText: TableHeader
  ): Promise<string | null> {
    const columnIndex = await this.getColumnIndex(headerText);

    // Use getByRole to get all rows
    const dataRows = this.confirmBookedTicketTable.getByRole("row");
    const lastDataRow = dataRows.last();

    // Use getByRole to get cells in the row
    const cells = lastDataRow.getByRole("cell");
    return await cells.nth(columnIndex).textContent();
  }

  async verifyTicketInfo(expectedData: Partial<BookTicketData>) {
    if (expectedData.departStation) {
      const actualValue = await this.getTicketCellValue("Depart Station");
      expect(
        actualValue?.trim(),
        `Depart Station should be "${expectedData.departStation}"`
      ).toBe(expectedData.departStation);
    }

    if (expectedData.arriveStation) {
      const actualValue = await this.getTicketCellValue("Arrive Station");
      expect(
        actualValue?.trim(),
        `Arrive Station should be "${expectedData.arriveStation}"`
      ).toBe(expectedData.arriveStation);
    }

    if (expectedData.seatType) {
      const actualValue = await this.getTicketCellValue("Seat Type");
      expect(
        actualValue?.trim(),
        `Seat Type should be "${expectedData.seatType}"`
      ).toBe(expectedData.seatType);
    }

    if (expectedData.ticketAmount) {
      const actualValue = await this.getTicketCellValue("Amount");
      expect(
        actualValue?.trim(),
        `Ticket Amount should be "${expectedData.ticketAmount}"`
      ).toBe(expectedData.ticketAmount);
    }
  }
}
