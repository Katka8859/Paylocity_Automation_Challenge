import { test, expect } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { LoginPage } from "../../src/pages/login_page.ts";
import { DashboardPage } from "../../src/pages/dashboard_page.ts";

//testing the overall flow of the application and user actions
test.describe("E2E test - Add employee, edit employee, delete employee - tests", () => {
  const username = process.env.PAYLOCITY_USER as string;
  const password = process.env.PAYLOCITY_PASSWORD as string;
  let dashBoardPage: DashboardPage;
  let name: string;
  let surname: string;
  let newName: string;
  let newSurname: string;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashBoardPage = await loginPage
      .openLoginPage()
      .then((login) => login.loginUser(username, password));
    await expect(dashBoardPage.employeeID(1)).toBeVisible({
      timeout: 15000,
    });
  });

  test.afterEach(async ({ page }) => {
    const dashBoardPage = new DashboardPage(page);
    if (name && surname) {
      await dashBoardPage.deleteNewAddedEmployee(newName, newSurname);
    }
    await dashBoardPage.clickLogout();
  });

  test("Add employee, edit employee and verification of the correct calculation of benefits", async ({
    page,
  }) => {
    name = faker.person.firstName("female");
    surname = faker.person.lastName("female");
    newName = faker.person.firstName("male");
    newSurname = faker.person.lastName("male");
    const dashBoardPage = new DashboardPage(page);

    await test.step("Add employee and data verification", async () => {
      await dashBoardPage
        .addEmployee(name, surname, 6)
        .then((addEmployee) =>
          addEmployee.assertNewAddedEmployeeSalary(name, surname, "52000.00")
        )
        .then((addEmployee) =>
          addEmployee.assertNewAddedEmployeeGrossPay(name, surname, "2000.00")
        )
        .then((addEmployee) =>
          addEmployee.assertNewAddedEmployeeBenefitsCost(
            name,
            surname,
            "153.85"
          )
        )
        .then((addEmployee) =>
          addEmployee.assertNewAddedEmployeeNetPay(name, surname, "1846.15")
        );
    });
    await test.step("Edit employee and verification of data recalculation", async () => {
      await dashBoardPage
        .editNewAddedEmployee(name, surname, newName, newSurname, 0)
        .then((editEmployee) =>
          editEmployee.assertNewAddedEmployeeSalary(
            newName,
            newSurname,
            "52000.00"
          )
        )
        .then((editEmployee) =>
          editEmployee.assertNewAddedEmployeeGrossPay(
            newName,
            newSurname,
            "2000.00"
          )
        )
        .then((editEmployee) =>
          editEmployee.assertNewAddedEmployeeBenefitsCost(
            newName,
            newSurname,
            "38.46"
          )
        )
        .then((editEmployee) =>
          editEmployee.assertNewAddedEmployeeNetPay(
            newName,
            newSurname,
            "1961.54"
          )
        );
    });
  });
});
