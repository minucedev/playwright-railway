import { test as base } from "@playwright/test";
import { PageManager } from "../utils/page.manager";

type MyFixtures = {
  pm: PageManager; // Page Manager for centralized page access and navigation
};

export const test = base.extend<MyFixtures>({
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await page.goto("/"); // Navigate to home once per test
    await use(pm);
  },
});

