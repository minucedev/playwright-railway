import { expect } from "@playwright/test";
import type { Page, Locator } from "../types/playwright.types";
import { BasePage } from "./base.page";
import { getRandomDateFromDropdown } from "../utils/random.data";
import { Messages } from "../utils/messages.config";

export type BookTicketData = {
  date?: string;
  departStation: string;
  arriveStation: string;
  seatType: string;
  ticketAmount: string;
};

export class BookTicketPage extends BasePage {
  readonly dateSelect: Locator;
  readonly departStationSelect: Locator;
  readonly arriveStationSelect: Locator;
  readonly seatTypeSelect: Locator;
  readonly ticketAmountSelect: Locator;
  readonly bookTicketButton: Locator;
  readonly successMessage: Locator;
  readonly ticketTable: Locator;

  constructor(page: Page) {
    super(page);
    this.dateSelect = page.locator('select[name="Date"]');
    this.departStationSelect = page.locator('select[name="DepartStation"]');
    this.arriveStationSelect = page.locator('select[name="ArriveStation"]');
    this.seatTypeSelect = page.locator('select[name="SeatType"]');
    this.ticketAmountSelect = page.locator('select[name="TicketAmount"]');
    this.bookTicketButton = page.locator(
      'input[type="submit"][value="Book ticket"]'
    );
    this.successMessage = page.locator(
      `h1:has-text("${Messages.SUCCESS.TICKET_BOOKED}")`
    );
    this.ticketTable = page.locator(".DivTable .MyTable.WideTable");
  }

  async selectDate(date: string) {
    await this.dateSelect.selectOption(date);
  }

  async selectRandomDate(): Promise<string> {
    const selectedDate = await getRandomDateFromDropdown(this.dateSelect);
    await this.dateSelect.selectOption(selectedDate);
    return selectedDate;
  }

  async selectDepartStation(station: string) {
    await this.departStationSelect.selectOption(station);
  }

  async selectArriveStation(station: string) {
    await this.arriveStationSelect.selectOption(station);
  }

  async selectSeatType(seatType: string) {
    await this.seatTypeSelect.selectOption(seatType);
  }

  async selectTicketAmount(amount: string) {
    await this.ticketAmountSelect.selectOption(amount);
  }

  async submitBookTicket() {
    await this.bookTicketButton.click();
  }

  async bookTicket(data: BookTicketData): Promise<string> {
    let selectedDate: string;
    if (data.date) {
      await this.selectDate(data.date);
      selectedDate = data.date;
    } else {
      selectedDate = await this.selectRandomDate();
    }
    await this.selectDepartStation(data.departStation);
    await this.selectArriveStation(data.arriveStation);
    await this.selectSeatType(data.seatType);
    await this.selectTicketAmount(data.ticketAmount);
    await this.submitBookTicket();
    return selectedDate;
  }

  async verifySuccessMessage() {
    await expect(
      this.successMessage,
      "Success message should be visible"
    ).toBeVisible();
  }

  private async getColumnIndex(headerText: string): Promise<number> {
    const headers = this.ticketTable.locator("tr.Header th");
    const count = await headers.count();

    for (let i = 0; i < count; i++) {
      const text = await headers.nth(i).textContent();
      if (text?.trim() === headerText) {
        return i;
      }
    }

    throw new Error(`Column with header "${headerText}" not found`);
  }

  private async getTicketCellValue(headerText: string): Promise<string | null> {
    const columnIndex = await this.getColumnIndex(headerText);
    const ticketRow = this.ticketTable.locator("tr.OddRow");
    return await ticketRow.locator("td").nth(columnIndex).textContent();
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
