import { Locator, Page, expect } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly logoutButton: Locator;
  readonly tableHeader: Locator;
  readonly tableEmployeesRow: Locator;
  readonly tableHeaderID: Locator;
  readonly tableHeaderLastName: Locator;
  readonly tableHeaderFirstName: Locator;
  readonly tableHeaderDependents: Locator;
  readonly tableHeaderSalary: Locator;
  readonly tableHeaderGrossPay: Locator;
  readonly tableHeaderBenefitsCost: Locator;
  readonly tableHeaderNetPay: Locator;
  readonly tableHeaderActions: Locator;
  readonly employeeID: (row: number) => Locator;
  readonly employeeFirstName: (row: number) => Locator;
  readonly employeeLastName: (row: number) => Locator;
  readonly employeeDependents: (row: number) => Locator;
  readonly employeeSalary: (row: number) => Locator;
  readonly employeeGrossPay: (row: number) => Locator;
  readonly employeeBenefitsCost: (row: number) => Locator;
  readonly employeeNetPay: (row: number) => Locator;
  readonly editEmployeeIcon: (row: number) => Locator;
  readonly deleteEmployeeIcon: (row: number) => Locator;
  readonly addEmployeeButton: Locator;
  readonly addEmployeeModalHeader: Locator;
  readonly addModalFirstNameLabel: Locator;
  readonly addModalLastNameLabel: Locator;
  readonly addModalDependentsLabel: Locator;
  readonly addModalFirstNameInput: Locator;
  readonly addModalLastNameInput: Locator;
  readonly addModalDependentsInput: Locator;
  readonly modalAddButton: Locator;
  readonly modalCancelButton: Locator;
  readonly modalUpdateButton: Locator;
  readonly deleteEmployeeModalHeader: Locator;
  readonly modalDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTitle = page.locator(
      "//a[text()='Paylocity Benefits Dashboard']"
    );
    this.logoutButton = page.locator("//li[@class='nav-item']");
    this.tableEmployeesRow = page.locator(
      "xpath=//table[@id='employeesTable']//tr"
    );
    this.tableHeader = page.locator("//thead[@class='thead-dark']");
    this.tableHeaderID = page.locator("//thead[@class='thead-dark']/tr/th[1]");
    this.tableHeaderLastName = page.locator(
      "//thead[@class='thead-dark']/tr/th[2]"
    );
    this.tableHeaderFirstName = page.locator(
      "//thead[@class='thead-dark']/tr/th[3]"
    );
    this.tableHeaderDependents = page.locator(
      "//thead[@class='thead-dark']/tr/th[4]"
    );
    this.tableHeaderSalary = page.locator(
      "//thead[@class='thead-dark']/tr/th[5]"
    );
    this.tableHeaderGrossPay = page.locator(
      "//thead[@class='thead-dark']/tr/th[6]"
    );
    this.tableHeaderBenefitsCost = page.locator(
      "//thead[@class='thead-dark']/tr/th[7]"
    );
    this.tableHeaderNetPay = page.locator(
      "//thead[@class='thead-dark']/tr/th[8]"
    );
    this.tableHeaderActions = page.locator(
      "//thead[@class='thead-dark']/tr/th[9]"
    );
    this.employeeID = (row: number) =>
      page.locator(`//table[@id='employeesTable']/tbody/tr[${row}]/td[1]`);
    this.employeeFirstName = (row: number) =>
      page.locator(`//table[@id='employeesTable']/tbody/tr[${row}]/td[2]`);
    this.employeeLastName = (row: number) =>
      page.locator(`//table[@id='employeesTable']/tbody/tr[${row}]/td[3]`);
    this.employeeDependents = (row: number) =>
      page.locator(`//table[@id='employeesTable']/tbody/tr[${row}]/td[4]`);
    this.employeeSalary = (row: number) =>
      page.locator(`//table[@id='employeesTable']/tbody/tr[${row}]/td[5]`);
    this.employeeGrossPay = (row: number) =>
      page.locator(`//table[@id='employeesTable']/tbody/tr[${row}]/td[6]`);
    this.employeeBenefitsCost = (row: number) =>
      page.locator(`//table[@id='employeesTable']/tbody/tr[${row}]/td[7]`);
    this.employeeNetPay = (row: number) =>
      page.locator(`//table[@id='employeesTable']/tbody/tr[${row}]/td[8]`);
    this.editEmployeeIcon = (row: number) =>
      page.locator(`(//i[@class="fas fa-edit"])[${row}]`);
    this.deleteEmployeeIcon = (row: number) =>
      page.locator(`(//i[@class="fas fa-times"])[${row}]`);
    this.addEmployeeButton = page.locator("//button[@id='add']");
    this.addEmployeeModalHeader = page.locator("//h5[text()='Add Employee']");
    this.addModalFirstNameLabel = page.locator("//label[@for='firstName']");
    this.addModalLastNameLabel = page.locator("//label[@for='lastName']");
    this.addModalDependentsLabel = page.locator("//label[@for='dependants']");

    this.addModalFirstNameInput = page.locator("//input[@id='firstName']");
    this.addModalLastNameInput = page.locator("//input[@id='lastName']");
    this.addModalDependentsInput = page.locator("//input[@id='dependants']");
    this.modalAddButton = page.locator("//button[@id='addEmployee']");
    this.modalCancelButton = page.locator("//button[text()='Cancel']");
    this.modalUpdateButton = page.locator("//button[@id='updateEmployee']");

    this.deleteEmployeeModalHeader = page.locator(
      "//h5[text()='Delete Employee']"
    );
    this.modalDeleteButton = page.locator("//button[@id='deleteEmployee']");
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
  /*
  async clickAllMenuButtons(): Promise<DashboardPage> {
    for (let i = 1; i <= 4; i++) {
      await this.page
        .locator(`(//aside[@class='dashboard-sidebar']//li)[${i}]`)
        .click();
    }
    return this;
  }*/

  async clickAddEmployee(
    name: string,
    surname: string,
    number: string
  ): Promise<DashboardPage> {
    await this.addEmployeeButton.click();
    await this.addModalFirstNameInput.fill(name);
    await this.addModalLastNameInput.fill(surname);
    await this.addModalDependentsInput.fill(number);
    await this.modalAddButton.click();
    await expect(this.tableEmployees).toHaveText(name);
    await expect(this.tableEmployees).toHaveText(surname);
    return this;
  }
}
