import type { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class MyTicketPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { name: "Manage Tickets" });
  }
}
