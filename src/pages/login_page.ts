import { Locator, Page, test } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";

export class LoginPage {
  readonly page: Page;
  readonly url =
    "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login";
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("//input[@id='Username']");
    this.passwordInput = page.locator("//input[@id='Password']");
    this.loginButton = page.locator("//button[@type='submit']");
    this.pageTitle = page.locator("//img[@alt='Paylocity']");
  }

  async openLoginPage(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  async fillUsername(username: string): Promise<this> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<this> {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin(): Promise<DashboardPage> {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async loginUser(username: string, password: string): Promise<DashboardPage> {
    await test.step("Login to Paylocity Benefits Dashboard page", async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.clickLogin();
    });

    return new DashboardPage(this.page);
  }
}
