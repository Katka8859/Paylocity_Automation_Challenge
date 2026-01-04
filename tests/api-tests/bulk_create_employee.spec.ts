import employeeData from "../../../Paylocity_Automation_Challenge/src/assets/ddt/employee_data.json";
import { expect, test } from "@playwright/test";
import { UserApi } from "../../src/api/user_api.ts";

test.describe("Create employees with data from employee_data.json", () => {
  const runnableData = employeeData;

  runnableData.forEach((employeeData, index) => {
    test(`${index + 1} DDT: Create employee: ${
      employeeData.decription
    }`, async ({ request }) => {
      const userApi = new UserApi(request);
      let getEmployeeId: string;

      await test.step("Create new employee via API", async () => {
        const createResponse = await userApi.createEmployee(
          employeeData.username,
          employeeData.firstName,
          employeeData.lastName,
          employeeData.dependants,
          employeeData.salary
        );
        expect(
          createResponse.status(),
          "Create employee response status is 200 - employee created"
        ).toBe(200);

        const createdEmployeeData = await userApi.getEmployeeDataFromResponse(
          createResponse
        );
        getEmployeeId = createdEmployeeData.id;
        console.log(`Created employee with ID: ${getEmployeeId}`);
      });

      await test.step("Verify gross pay, benefits cost and net pay calculations", async () => {
        const getEmployeeResponse = await userApi.getEmployeesByID(
          getEmployeeId
        );
        expect(
          getEmployeeResponse.status(),
          "Get employee by ID has status 200"
        ).toBe(200);

        const retrievedEmployeeData = await userApi.getEmployeeDataFromResponse(
          getEmployeeResponse
        );

        expect(
          retrievedEmployeeData.gross,
          "Gross pay matches expected value"
        ).toBeCloseTo(employeeData.expectedGross, 2);
        expect(
          retrievedEmployeeData.benefitsCost,
          "Benefits cost matches expected value"
        ).toBeCloseTo(employeeData.expectedBenefitsCost, 2);
        expect(
          retrievedEmployeeData.net,
          "Net pay matches expected value"
        ).toBeCloseTo(employeeData.expectedNet, 2);

        console.log(`Employee calculations verified:
  Gross: ${retrievedEmployeeData.gross} (expected: ${employeeData.expectedGross})
  Benefits Cost: ${retrievedEmployeeData.benefitsCost} (expected: ${employeeData.expectedBenefitsCost})
  Net: ${retrievedEmployeeData.net} (expected: ${employeeData.expectedNet})
        `);
      });

      await test.step("Delete created employee", async () => {
        const deleteResponse = await userApi.deleteEmployee(getEmployeeId);
        expect(
          deleteResponse.status(),
          "Delete employee response status is 200 - employee deleted"
        ).toBe(200);
        console.log(`Employee with ID ${getEmployeeId} deleted successfully`);
      });
    });
  });
});
