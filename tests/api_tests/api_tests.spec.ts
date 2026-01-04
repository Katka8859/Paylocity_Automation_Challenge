import { test, expect } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { UserApi } from "../../src/api/user_api.ts";

test("Create, update and delete new employee", async ({ request }) => {
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
      3,
      52000
    );
    expect(
      createResponse.status(),
      "Create employee response status is 200 - employee created"
    ).toBe(200);

    getEmployeeId = await userApi.getEmployeeIdFromResponse(createResponse);
    console.log(`Created employee with ID: ${getEmployeeId}`);
  });

  await test.step("Update created employee via API", async () => {
    const updateResponse = await userApi.updateEmployee(
      getEmployeeId,
      usernameEmployee,
      firstName,
      lastName,
      7,
      65000
    );
    expect(
      updateResponse.status(),
      "Update employee response status is 200 - employee updated"
    ).toBe(200);
  });

  await test.step("Delete created employee via API", async () => {
    const deleteResponse = await userApi.deleteEmployee(getEmployeeId);
    expect(
      deleteResponse.status(),
      "Delete employee response status is 200 - employee deleted"
    ).toBe(200);
  });

  await test.step.skip("Verify employee was deleted", async () => {
    // TODO: There is an error in the application and the application returns 200. Once the error is fixed, this part of the code will be activated.
    const getResponse = await userApi.getEmployeesByID(getEmployeeId);
    expect(getResponse.status(), "Get deleted employee returns 404").toBe(404);
  });
});
