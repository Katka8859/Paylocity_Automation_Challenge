import { test, expect } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserApi } from "../../src/api/user_api.ts";

test("Get all Employees in aplication via API", async ({ request }) => {
  const userApi = new UserApi(request);

  const getAllEmployeesResponse = await userApi.getAllEmployees();
  expect(
    getAllEmployeesResponse.status(),
    "Get all employees has status 200"
  ).toBe(200);

  const getAllEmployees = await userApi.getAllEmployeesDataFromResponse(
    getAllEmployeesResponse
  );

  console.log(`Total employees: ${getAllEmployees.length}`);
  console.log("All employees data:", JSON.stringify(getAllEmployees, null, 2));

  // TODO: Under normal circumstances, I would add this expect. However, given that I do not have unique login credentials for the application for multiple users, but only for one. Everything is tested under one account, so there may be data inconsistencies and the test could fail on this expect—if the data in the application suddenly changed:
  /*
  expect(
    getAllEmployees.length,
    "Application contains exactly 2 employees"
  ).toBe(2);*/
});

//Testing the functionality of "Get all employees" - the test creates a user, returns the total number of employees, and deletes the new user.

test("Create new employee, returns total number of employees, delete created employee via API", async ({
  request,
}) => {
  const usernameEmployee = faker.internet.username();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const userApi = new UserApi(request);
  let getEmployeeId: string;

  await test.step("Create new employee via API", async () => {
    const createResponse = await userApi.createEmployee(
      usernameEmployee,
      firstName,
      lastName,
      1,
      52000
    );
    expect(
      createResponse.status(),
      "Create employee response status is 200 - employee created"
    ).toBe(200);

    getEmployeeId = await userApi.getEmployeeIdFromResponse(createResponse);
    console.log(`Created employee with ID: ${getEmployeeId}`);
  });

  await test.step("Get all employees", async () => {
    const getAllEmployeesResponse = await userApi.getAllEmployees();
    expect(
      getAllEmployeesResponse.status(),
      "Get all employees has status 200"
    ).toBe(200);

    const getAllEmployees = await userApi.getAllEmployeesDataFromResponse(
      getAllEmployeesResponse
    );
    console.log(`Total employees: ${getAllEmployees.length}`);

    // ! Reason for commenting - see above
    /*
    expect(
      getAllEmployees.length,
      "Application contains exactly 3 employees"
    ).toBe(3);*/
  });

  await test.step("Delete created employee", async () => {
    const deleteResponse = await userApi.deleteEmployee(getEmployeeId);
    expect(
      deleteResponse.status(),
      "Delete employee response status is 200 - employee deleted"
    ).toBe(200);

    const getAllEmployeesResponseAfterDelete = await userApi.getAllEmployees();
    expect(
      getAllEmployeesResponseAfterDelete.status(),
      "Get all employees has status 200"
    ).toBe(200);

    const getAllEmployeesAfterDelete =
      await userApi.getAllEmployeesDataFromResponse(
        getAllEmployeesResponseAfterDelete
      );
    console.log(
      `Total employees after deletion: ${getAllEmployeesAfterDelete.length}`
    );
    /*
    expect(
      getAllEmployeesAfterDelete.length,
      "Application contains exactly 2 employees"
    ).toBe(2);*/
  });
});
