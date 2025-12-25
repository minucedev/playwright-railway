export type { Page, Locator } from "@playwright/test";

export type BookTicketData = {
  date?: string;
  departStation: string;
  arriveStation: string;
  seatType: string;
  ticketAmount: string;
};
