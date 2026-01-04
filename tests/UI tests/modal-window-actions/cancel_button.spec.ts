import { test, expect } from "@playwright/test";
import { DashboardPage } from "../../../src/pages/dashboard_page.ts";
import { LoginPage } from "../../../src/pages/login_page.ts";

test("Cancel button in Add Employee modal window closes the modal", async ({
  page,
}) => {
  const username = process.env.PAYLOCITY_USER as string;
  const password = process.env.PAYLOCITY_PASSWORD as string;
  let dashBoardPage: DashboardPage;

  await test.step("Login to application", async () => {
    const loginPage = new LoginPage(page);
    dashBoardPage = await loginPage
      .openLoginPage()
      .then((login) => login.loginUser(username, password));
    await expect(dashBoardPage.tableEmployees).toBeVisible({ timeout: 15000 });
    await expect(dashBoardPage.employeeID(1)).toBeVisible({
      timeout: 15000,
    });
  });

  await test.step("Open Add Employee modal and click Cancel", async () => {
    await dashBoardPage.clickOnAddEmployeeButton();
    await expect(dashBoardPage.addEmployeeModalHeader).toBeVisible();
    await dashBoardPage.clickOnCancelButtonInAddEmployeeModal();
    await expect(dashBoardPage.addEmployeeModalHeader).not.toBeVisible();
  });
});
