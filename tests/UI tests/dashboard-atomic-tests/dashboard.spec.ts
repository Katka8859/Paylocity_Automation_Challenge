import { expect, test } from "@playwright/test";
import { DashboardPage } from "../../../src/pages/dashboard_page.ts";
import { LoginPage } from "../../../src/pages/login_page.ts";

//These tests verifies that all elements on the page are found as expected - using soft expect.
test.describe("Atomic tests for user dashboard page", () => {
  const username = process.env.PAYLOCITY_USER as string;
  const password = process.env.PAYLOCITY_PASSWORD as string;
  let dashBoardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashBoardPage = await loginPage
      .openLoginPage()
      .then((login) => login.loginUser(username, password));
  });

  test("Checking elements on a dashboard page", async () => {
    await test.step("Dashboard header (Title, Logout button) tests", async () => {
      await expect.soft(dashBoardPage.dashboardTitle).toBeVisible();
      await expect
        .soft(dashBoardPage.dashboardTitle)
        .toHaveText("Paylocity Benefits Dashboard");
      await expect.soft(dashBoardPage.logoutButton).toBeVisible();
      await expect.soft(dashBoardPage.logoutButton).toHaveText("Log Out");
    });

    await test.step("Table header test", async () => {
      await expect.soft(dashBoardPage.tableHeader).toBeVisible();
      await expect.soft(dashBoardPage.tableHeaderID).toBeVisible();
      await expect.soft(dashBoardPage.tableHeaderID).toHaveText("Id");
      await expect.soft(dashBoardPage.tableHeaderFirstName).toBeVisible();
      await expect
        .soft(dashBoardPage.tableHeaderFirstName)
        .toHaveText("First Name");
      await expect.soft(dashBoardPage.tableHeaderLastName).toBeVisible();
      await expect
        .soft(dashBoardPage.tableHeaderLastName)
        .toHaveText("Last Name");
      await expect.soft(dashBoardPage.tableHeaderDependents).toBeVisible();
      await expect
        .soft(dashBoardPage.tableHeaderDependents)
        .toHaveText("Dependents");
      await expect.soft(dashBoardPage.tableHeaderSalary).toBeVisible();
      await expect.soft(dashBoardPage.tableHeaderSalary).toHaveText("Salary");
      await expect.soft(dashBoardPage.tableHeaderGrossPay).toBeVisible();
      await expect
        .soft(dashBoardPage.tableHeaderGrossPay)
        .toHaveText("Gross Pay");
      await expect.soft(dashBoardPage.tableHeaderBenefitsCost).toBeVisible();
      await expect
        .soft(dashBoardPage.tableHeaderBenefitsCost)
        .toHaveText("Benefits Cost");
      await expect.soft(dashBoardPage.tableHeaderNetPay).toBeVisible();
      await expect.soft(dashBoardPage.tableHeaderNetPay).toHaveText("Net Pay");
      await expect.soft(dashBoardPage.tableHeaderActions).toBeVisible();
      await expect.soft(dashBoardPage.tableHeaderActions).toHaveText("Actions");
    });

    await test.step("Employee details test", async () => {
      await expect.soft(dashBoardPage.employeeID(1)).toBeVisible();
      await expect
        .soft(dashBoardPage.employeeID(1))
        .toHaveText("54b87703-d313-4376-8bef-f61d5044d5fc");
      await expect.soft(dashBoardPage.employeeFirstName(1)).toBeVisible();
      await expect.soft(dashBoardPage.employeeFirstName(1)).toHaveText("Jan");
      await expect.soft(dashBoardPage.employeeLastName(1)).toBeVisible();
      await expect.soft(dashBoardPage.employeeLastName(1)).toHaveText("Brown");
      await expect.soft(dashBoardPage.employeeDependents(1)).toBeVisible();
      await expect.soft(dashBoardPage.employeeDependents(1)).toHaveText("2");
      await expect.soft(dashBoardPage.employeeSalary(1)).toBeVisible();
      await expect.soft(dashBoardPage.employeeSalary(1)).toHaveText("52000.00");
      await expect.soft(dashBoardPage.employeeGrossPay(1)).toBeVisible();
      await expect
        .soft(dashBoardPage.employeeGrossPay(1))
        .toHaveText("2000.00");
      await expect.soft(dashBoardPage.employeeBenefitsCost(1)).toBeVisible();
      await expect
        .soft(dashBoardPage.employeeBenefitsCost(1))
        .toHaveText("76.92");
      await expect.soft(dashBoardPage.employeeNetPay(1)).toBeVisible();
      await expect.soft(dashBoardPage.employeeNetPay(1)).toHaveText("1923.08");

      await expect.soft(dashBoardPage.tableEmployeesRow).toHaveCount(3);
    });

    await test.step("Table Actions test - Edit and delete employee icons", async () => {
      await expect.soft(dashBoardPage.editEmployeeIcon(1)).toBeVisible();
      await expect.soft(dashBoardPage.editEmployeeIcon(1)).toBeEnabled();
      await expect.soft(dashBoardPage.deleteEmployeeIcon(1)).toBeVisible();
      await expect.soft(dashBoardPage.deleteEmployeeIcon(1)).toBeEnabled();
    });

    await test.step("Dashboard actions - Add Employee button", async () => {
      await expect.soft(dashBoardPage.addEmployeeButton).toBeVisible();
      await expect
        .soft(dashBoardPage.addEmployeeButton)
        .toHaveText("Add Employee");
      await expect.soft(dashBoardPage.addEmployeeButton).toBeEnabled();
    });
  });
});
