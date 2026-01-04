import { Locator, Page, expect } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly logoutButton: Locator;
  readonly tableHeader: Locator;
  readonly tableEmployees: Locator;
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
    this.tableEmployees = page.locator("//table[@id='employeesTable']");
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
    this.modalCancelButton = page.locator(
      "#employeeModal > div > div > div:nth-of-type(3) > button:nth-of-type(3)"
    );
    this.modalUpdateButton = page.locator("//button[@id='updateEmployee']");

    this.deleteEmployeeModalHeader = page.locator(
      "//h5[text()='Delete Employee']"
    );
    this.modalDeleteButton = page.locator("//button[@id='deleteEmployee']");
  }

  async clickOnAddEmployeeButton(): Promise<DashboardPage> {
    await this.addEmployeeButton.click();
    return this;
  }

  async fillFirstNameInAddEmployeeModal(name: string): Promise<DashboardPage> {
    await this.addModalFirstNameInput.fill(name);
    return this;
  }

  async fillLastNameInAddEmployeeModal(
    surname: string
  ): Promise<DashboardPage> {
    await this.addModalLastNameInput.fill(surname);
    return this;
  }

  async fillDependentInAddEmployeeModal(
    dependants: number
  ): Promise<DashboardPage> {
    await this.addModalDependentsInput.fill(String(dependants));
    return this;
  }
  async clickOnAddButtonInAddEmployeeModal(): Promise<DashboardPage> {
    await this.modalAddButton.click();
    return this;
  }

  async clickOnCancelButtonInAddEmployeeModal(): Promise<DashboardPage> {
    await this.modalCancelButton.click();
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
  async waitForLoadingOfModalWindow(): Promise<DashboardPage> {
    await expect(this.addEmployeeModalHeader).toBeVisible();
    return this;
  }

  async waitForCloseModalWindow(): Promise<DashboardPage> {
    await expect(this.addEmployeeModalHeader).not.toBeVisible();
    return this;
  }

  async addEmployee(
    name: string,
    surname: string,
    dependents: number
  ): Promise<DashboardPage> {
    await this.clickOnAddEmployeeButton();
    await this.fillFirstNameInAddEmployeeModal(name);
    await this.fillLastNameInAddEmployeeModal(surname);
    await this.fillDependentInAddEmployeeModal(dependents);
    await this.clickOnAddButtonInAddEmployeeModal();
    const newEmployeeRow = this.page.locator(
      `//table[@id='employeesTable']//tr[td[contains(text(),'${name}')] and td[contains(text(),'${surname}')]]`
    );
    await expect(newEmployeeRow).toBeVisible();
    return this;
  }

  async assertNewAddedEmployeeSalary(
    name: string,
    surname: string,
    expectedSalary: string
  ): Promise<DashboardPage> {
    const row = this.page.locator(
      `//table[@id='employeesTable']/tbody/tr[td[2][normalize-space()="${name}"] and td[3][normalize-space()="${surname}"]]`
    );
    await expect(row).toBeVisible();
    const salaryCell = row.locator("xpath=./td[5]");
    await expect(salaryCell).toHaveText(expectedSalary);
    return this;
  }

  async assertNewAddedEmployeeGrossPay(
    name: string,
    surname: string,
    expectedGrossPay: string
  ): Promise<DashboardPage> {
    const row = this.page.locator(
      `//table[@id='employeesTable']/tbody/tr[td[2][normalize-space()="${name}"] and td[3][normalize-space()="${surname}"]]`
    );
    await expect(row).toBeVisible();
    const grossPayCell = row.locator("xpath=./td[6]");
    await expect(grossPayCell).toHaveText(expectedGrossPay);
    return this;
  }

  async assertNewAddedEmployeeBenefitsCost(
    name: string,
    surname: string,
    expectedBenefitsCost: string
  ): Promise<DashboardPage> {
    const row = this.page.locator(
      `//table[@id='employeesTable']/tbody/tr[td[2][normalize-space()="${name}"] and td[3][normalize-space()="${surname}"]]`
    );
    await expect(row).toBeVisible();
    const benefitsCostCell = row.locator("xpath=./td[7]");
    await expect(benefitsCostCell).toHaveText(expectedBenefitsCost);
    return this;
  }

  async assertNewAddedEmployeeNetPay(
    name: string,
    surname: string,
    expectedNetPay: string
  ): Promise<DashboardPage> {
    const row = this.page.locator(
      `//table[@id='employeesTable']/tbody/tr[td[2][normalize-space()="${name}"] and td[3][normalize-space()="${surname}"]]`
    );
    await expect(row).toBeVisible();
    const netPayCell = row.locator("xpath=./td[8]");
    await expect(netPayCell).toHaveText(expectedNetPay);
    return this;
  }

  async editNewAddedEmployee(
    name: string,
    surname: string,
    newName: string,
    newSurname: string,
    newDependents: number
  ): Promise<DashboardPage> {
    const employeeRow = this.page.locator(
      `//table[@id='employeesTable']//tr[td[contains(text(),'${name}')] and td[contains(text(),'${surname}')]]`
    );
    await expect(employeeRow).toBeVisible();
    const editIcon = employeeRow.locator("xpath=.//i[@class='fas fa-edit']");
    await editIcon.click();
    await this.addModalFirstNameInput.clear();
    await this.addModalFirstNameInput.fill(newName);
    await this.addModalLastNameInput.clear();
    await this.addModalLastNameInput.fill(newSurname);
    await this.addModalDependentsInput.clear();
    await this.addModalDependentsInput.fill(String(newDependents));
    await this.modalUpdateButton.click();
    await this.addEmployeeModalHeader.waitFor({
      state: "hidden",
      timeout: 5000,
    });
    const updatedEmployeeRow = this.page.locator(
      `//table[@id='employeesTable']//tr[td[contains(text(),'${newName}')] and td[contains(text(),'${newSurname}')]]`
    );
    await expect(updatedEmployeeRow).toBeVisible();
    return this;
  }

  async deleteNewAddedEmployee(
    name: string,
    surname: string
  ): Promise<DashboardPage> {
    const newEmployeeRow = this.page.locator(
      `//table[@id='employeesTable']//tr[td[contains(text(),'${name}')] and td[contains(text(),'${surname}')]]`
    );
    await expect(newEmployeeRow).toBeVisible();
    const deleteEmployeeIcon = newEmployeeRow.locator(
      "xpath=.//i[@class='fas fa-times']"
    );
    await deleteEmployeeIcon.click();
    await this.deleteEmployeeModalHeader.waitFor({
      state: "attached",
      timeout: 5000,
    });
    await this.modalDeleteButton.click();
    await expect(newEmployeeRow).not.toBeVisible();
    return this;
  }
}
