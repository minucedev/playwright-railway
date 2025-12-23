import { type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ChangePasswordPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { name: "Change password" });
  }
}
