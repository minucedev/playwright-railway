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

  async bookTicket(data: BookTicketData): Promise<string> {
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

  async verifySelectedStations(expectedDepart: string, expectedArrive: string) {
    const selectedDepartText = await this.departStationSelect
      .locator("option:checked")
      .textContent();
    const selectedArriveText = await this.arriveStationSelect
      .locator("option:checked")
      .textContent();

    await expect
      .soft(
        selectedDepartText?.trim(),
        `Depart Station should be "${expectedDepart}"`
      )
      .toBe(expectedDepart);
    await expect
      .soft(
        selectedArriveText?.trim(),
        `Arrive Station should be "${expectedArrive}"`
      )
      .toBe(expectedArrive);
  }
}
