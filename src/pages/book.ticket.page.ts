import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import type { BookTicketData } from "../types/playwright.types";
import { BasePage } from "./base.page";
import { getRandomDateFromDropdown } from "../utils/random.data";
import { Messages } from "../utils/messages.config";
import { SELECT_NAMES, type SelectName } from "../utils/select.names";

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
      await this.getSelectByName(SELECT_NAMES.Date).selectOption(data.date);
      selectedDate = data.date;
    } else {
      const dateSelect = this.getSelectByName(SELECT_NAMES.Date);
      selectedDate = await getRandomDateFromDropdown(dateSelect);
      await dateSelect.selectOption(selectedDate);
    }

    await this.getSelectByName(SELECT_NAMES.DepartStation).selectOption(
      data.departStation
    );
    await this.getSelectByName(SELECT_NAMES.ArriveStation).selectOption(
      data.arriveStation
    );
    await this.getSelectByName(SELECT_NAMES.SeatType).selectOption(
      data.seatType
    );
    await this.getSelectByName(SELECT_NAMES.TicketAmount).selectOption(
      data.ticketAmount
    );
    await this.bookTicketButton.click();
    return selectedDate;
  }

  async verifySuccessMessage() {
    await expect(
      this.successMessage,
      "Success message should be visible"
    ).toBeVisible();
  }

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

  async verifyData(header: string, value: string) {
    const cell = await this.getCellByHeader(header);
    await expect(cell, `${header} should be "${value}"`).toHaveText(value);
  }

  async verifyTicketInfo(expectedData: BookTicketData) {
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
