import type { Page } from "../types/types";
import { BasePage } from "./base.page";

export class MyTicketPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { name: "Manage Tickets" });
  }
}
