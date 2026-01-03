import { expect, test } from "@playwright/test";
import { DashboardPage } from "../../src/pages/dashboard_page.ts";
import { LoginPage } from "../../src/pages/login_page.ts";

//These tests verifies that all elements on the page are found as expected - using soft expect.
test.describe("Atomic tests for user dashboard page", () => {
  const username = process.env.PAYLOCITY_USER as string;
  const password = process.env.PAYLOCITY_PASSWORD as string;
  let dashBoardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const login = await loginPage.openLoginPage();
    dashBoardPage = await login.loginUser(username, password);
    await expect(dashBoardPage.employeeID(1)).toBeVisible({
      timeout: 15000,
    });
    await dashBoardPage.clickOnAddEmployeeButton();
  });

  test("Checking elements in modal window - Add Employee", async () => {
    await test.step("Window header test", async () => {
      await expect.soft(dashBoardPage.addEmployeeModalHeader).toBeVisible();
      await expect
        .soft(dashBoardPage.addEmployeeModalHeader)
        .toHaveText("Add Employee");
    });

    await test.step("Window Labels test", async () => {
      await expect.soft(dashBoardPage.addModalFirstNameLabel).toBeVisible();
      await expect
        .soft(dashBoardPage.addModalFirstNameLabel)
        .toHaveText("First Name:");
      await expect.soft(dashBoardPage.addModalLastNameLabel).toBeVisible();
      await expect
        .soft(dashBoardPage.addModalLastNameLabel)
        .toHaveText("Last Name:");
      await expect.soft(dashBoardPage.addModalDependentsLabel).toBeVisible();
      await expect
        .soft(dashBoardPage.addModalDependentsLabel)
        .toHaveText("Dependents:");
    });

    await test.step("Window buttons test", async () => {
      await expect.soft(dashBoardPage.modalAddButton).toBeVisible();
      await expect.soft(dashBoardPage.modalAddButton).toHaveText("Add");
      await expect.soft(dashBoardPage.modalCancelButton).toBeVisible();
      await expect.soft(dashBoardPage.modalCancelButton).toHaveText("Cancel");
    });
  });
});
