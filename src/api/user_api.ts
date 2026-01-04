import { APIRequestContext, APIResponse } from "@playwright/test";

export class UserApi {
  readonly request: APIRequestContext;
  readonly apiUrl =
    "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createEmployee(
    username: string,
    firstName: string,
    lastName: string,
    dependants: number,
    salary: number
  ) {
    const response = this.request.post(`${this.apiUrl}/api/Employees`, {
      headers: {
        Authorization: `Basic VGVzdFVzZXI4NTE6N1pEZn1ebltEMWhN`,
      },
      data: {
        username,
        firstName,
        lastName,
        dependants,
        salary,
      },
    });
    return response;
  }

  async updateEmployee(
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    dependants: number,
    salary: number
  ) {
    const response = this.request.put(`${this.apiUrl}/api/Employees`, {
      headers: {
        Authorization: `Basic VGVzdFVzZXI4NTE6N1pEZn1ebltEMWhN`,
      },
      data: {
        id,
        username,
        firstName,
        lastName,
        dependants,
        salary,
      },
    });
    return response;
  }

  async getAllEmployees() {
    const response = this.request.get(`${this.apiUrl}/api/Employees`, {
      headers: {
        Authorization: `Basic VGVzdFVzZXI4NTE6N1pEZn1ebltEMWhN`,
      },
    });
    return response;
  }
  async getEmployeesByID(employeeID: string) {
    const response = this.request.get(
      `${this.apiUrl}/api/Employees/${employeeID}`,
      {
        headers: {
          Authorization: `Basic VGVzdFVzZXI4NTE6N1pEZn1ebltEMWhN`,
        },
      }
    );
    return response;
  }
  async deleteEmployee(employeeID: string) {
    const response = this.request.delete(
      `${this.apiUrl}/api/Employees/${employeeID}`,
      {
        headers: {
          Authorization: `Basic VGVzdFVzZXI4NTE6N1pEZn1ebltEMWhN`,
        },
      }
    );
    return response;
  }

  async getEmployeeIdFromResponse(response: APIResponse): Promise<string> {
    const responseBody = await response.json();
    return responseBody.id;
  }

  async getEmployeeDataFromResponse(response: APIResponse) {
    const responseBody = await response.json();
    return {
      id: responseBody.id,
      username: responseBody.username,
      firstName: responseBody.firstName,
      lastName: responseBody.lastName,
      dependants: responseBody.dependants,
      salary: responseBody.salary,
      gross: responseBody.gross,
      benefitsCost: responseBody.benefitsCost,
      net: responseBody.net,
    };
  }
}
