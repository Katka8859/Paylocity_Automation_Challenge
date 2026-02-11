# Paylocity Automation Challenge

Test automation suite for the Paylocity Benefits Dashboard application, built with Playwright and TypeScript. This project demonstrates API testing, UI testing with atomic tests, E2E flows, and modal interactions.

## 📋 Table of Contents

- [Overview](#-overview)
- [Project Structure](#-project-structure)
- [Prerequisites & Installation](#-prerequisites--installation)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Project Implementation](#-project-implementation)
- [Reporting](#-reporting)

## 🎯 Overview

This automation framework tests the Paylocity Benefits Dashboard application, covering both UI and API layers.

**Test Coverage:**

- ✅ Employee operations (Create, Read, Update, Delete)
- ✅ Benefits cost calculations
- ✅ Modal window interactions
- ✅ Form validations
- ✅ User authentication flows
- ✅ API endpoint testing (GET, POST, PUT, DELETE)

**Key Features:**

- Page Object Model architecture
- TypeScript for type safety
- Cross-browser testing (Chrome, Firefox, WebKit)
- CI/CD with GitHub Actions
- HTML reports with screenshots and traces

## 📁 Project Structure

```
Paylocity_Automation_Challenge/
├── src/
│   ├── pages/                  # Page Object Model classes
│   │   ├── login_page.ts       # Login page object
│   │   └── dashboard_page.ts   # Dashboard page object
│   ├── api/                    # API layer
│   │   └── user_api.ts         # Employee API endpoints
│   └── assets/
│       └── ddt/                # Data-driven testing files
│           └── employee_data.json
├── tests/
│   ├── ui/
│   │   ├── atomic/             # Component-level tests
│   │   ├── e2e/                # End-to-end test flows
│   │   └── modal/              # Modal interaction tests
│   └── api/                    # API test suites
├── .github/workflows/          # CI/CD configuration
├── playwright.config.ts        # Playwright settings
├── package.json
└── README.md
```

## 🔧 Prerequisites & Installation

**Required:**

- Node.js (version 18.x or 20.x)
- npm (version 9.x or later)

**Installation Steps:**

1. Clone the repository:

```bash
git clone https://github.com/Katka8859/Paylocity_Automation_Challenge.git
cd Paylocity_Automation_Challenge
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
BASE_URL=https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod
USERNAME=your_username
PASSWORD=your_password
```

**Note:** Credentials are stored in GitHub Secrets for CI/CD. Contact Sue Stanley for access.

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/api/employee-api.spec.ts

# Run with browser visible
npx playwright test --headed

# Interactive UI mode
npx playwright test --ui

# Specific browser
npx playwright test --project=chromium
```

## 💻 Project Implementation

### Architecture Overview

The project follows the Page Object Model (POM) pattern with clear separation between test logic, page interactions, and API calls. The implementation is clean, type-safe with TypeScript, and focuses on maintainability and reusability.

### 1. Page Objects (`src/pages/`)

Page Objects encapsulate all interactions with web pages, providing a clean interface for tests.

#### **login_page.ts**

The LoginPage class handles all login functionality with a fluent API design pattern.

**Key Features:**

- Fluent interface - methods return `this` for method chaining
- Locators using XPath for stability
- Combined login method with test step reporting
- Returns DashboardPage instance after successful login

**Main Methods:**

```typescript
async openLoginPage(): Promise<this>
async fillUsername(username: string): Promise<this>
async fillPassword(password: string): Promise<this>
async clickLogin(): Promise<DashboardPage>
async loginUser(username: string, password: string): Promise<DashboardPage>
```

#### **dashboard_page.ts**

The DashboardPage class is the main page object handling the employee table, modals, and all dashboard interactions.

**Key Features:**

- Comprehensive employee table locators with dynamic row selection
- Modal window handling (Add, Edit, Delete)
- Assertion methods for verifying employee data
- Complex interactions like adding, editing, and deleting employees

**Main Methods:**

**Adding Employee:**

```typescript
async addEmployee(name: string, surname: string, dependents: number): Promise<DashboardPage>
async clickOnAddEmployeeButton(): Promise<DashboardPage>
async fillFirstNameInAddEmployeeModal(name: string): Promise<DashboardPage>
async fillLastNameInAddEmployeeModal(name: string): Promise<DashboardPage>
async fillDependentInAddEmployeeModal(name: string): Promise<DashboardPage>
async clickOnAddButtonInAddEmployeeModal(): Promise<DashboardPage>
async clickOnCancelButtonInAddEmployeeModal(): Promise<DashboardPage>
```

**Assertion Methods:**

```typescript
async assertNewAddedEmployeeSalary(name: string, surname: string, expectedSalary: string)
async assertNewAddedEmployeeGrossPay(name: string, surname: string, expectedGrossPay: string)
async assertNewAddedEmployeeBenefitsCost(name: string, surname: string, expectedBenefitsCost: string)
async assertNewAddedEmployeeNetPay(name: string, surname: string, expectedNetPay: string)
```

**Editing Employee:**

```typescript
async editNewAddedEmployee(
  name: string,
  surname: string,
  newName: string,
  newSurname: string,
  newDependents: number
): Promise<DashboardPage>
```

**Deleting Employee:**

```typescript
async deleteNewAddedEmployee(name: string, surname: string): Promise<DashboardPage>
```

**Modal Handling:**

```typescript
async waitForLoadingOfModalWindow(): Promise<DashboardPage>
async waitForCloseModalWindow(): Promise<DashboardPage>
```

### 2. API Layer (`src/api/`)

#### **user_api.ts**

The UserApi class handles all HTTP requests to the Paylocity API using Playwright's APIRequestContext.

**Key Features:**

- All employee operations (Create, Read, Update, Delete)
- Built-in authentication with Base64 encoded credentials
- Response parsing and data extraction methods
- Type-safe data structures

**Configuration:**

- API URL: `https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod`
- Authentication: Basic Auth with encoded token
- Base64 token: `VGVzdFVzZXI4NTE6N1pEZn1ebltEMWhN`

**Main Methods:**

**Create Employee:**

```typescript
async createEmployee(
  username: string,
  firstName: string,
  lastName: string,
  dependants: number,
  salary: number
): Promise<APIResponse>
```

**Update Employee:**

```typescript
async updateEmployee(
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  dependants: number,
  salary: number
): Promise<APIResponse>
```

**Get Employees:**

```typescript
async getAllEmployees(): Promise<APIResponse>
async getEmployeesByID(employeeID: string): Promise<APIResponse>
```

**Delete Employee:**

```typescript
async deleteEmployee(employeeID: string): Promise<APIResponse>
```

**Response Helpers:**

```typescript
async getEmployeeIdFromResponse(response: APIResponse): Promise<string>
async getAllEmployeesDataFromResponse(response: APIResponse)
async getEmployeeDataFromResponse(response: APIResponse): Promise<EmployeeData>
```

**EmployeeData Interface:**

```typescript
{
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  dependants: number,
  salary: number,
  gross: number,
  benefitsCost: number,
  net: number
}
```

### 3. Test Data (`src/assets/ddt/`)

#### **employee_data.json**

Data-driven testing file containing various employee scenarios for comprehensive testing.

**Test Scenarios:**

1. **Maximum Dependents** (32 dependents)
   - Tests upper boundary of dependent count
   - Username: user1, Martin Green
   - Expected Benefits Cost: $653.85

2. **Basic Dependents** (4 dependents)
   - Tests typical family size
   - Username: user2, Martina Orange
   - Expected Benefits Cost: $115.38

3. **Zero Dependents**
   - Tests minimum boundary (no dependents)
   - Username: user3, Chris Happy
   - Expected Benefits Cost: $38.46

4. **Low Salary** ($20,000)
   - Tests salary below expected value
   - Username: user4, John Sad
   - 10 dependents

5. **High Salary** ($66,000)
   - Tests salary above expected value
   - Username: user5, Leta Employee
   - 2 dependents

**Data Structure:**

```typescript
{
  description: string,
  username: string,
  firstName: string,
  lastName: string,
  dependants: number,
  salary: number,
  expectedGross: number,
  expectedBenefitsCost: number,
  expectedNet: number
}
```

### 4. Test Implementation Patterns

#### **Fluent Interface Pattern**

Both page objects use fluent interface for better readability:

```typescript
await loginPage
  .openLoginPage()
  .fillUsername("user")
  .fillPassword("pass")
  .clickLogin();
```

#### **Page Navigation**

Methods return appropriate page objects:

```typescript
const loginPage = new LoginPage(page);
const dashboardPage = await loginPage.clickLogin(); // Returns DashboardPage
const backToLogin = await dashboardPage.clickLogout(); // Returns LoginPage
```

### 5. CI/CD Pipeline

**GitHub Actions Workflow** (`.github/workflows/playwright.yml`)

The CI/CD pipeline automates testing on every code change:

**Environment Variables in CI:**

- `PAYLOCITY_USERNAME` - Stored in GitHub Secrets
- `PAYLOCITY_PASSWORD` - Stored in GitHub Secrets

## 📊 Reporting

After test execution:

```bash
# View HTML report
npx playwright show-report

# View trace for failed tests
npx playwright show-trace trace.zip
```

## 👤 Author


- GitHub: [@Katka8859](https://github.com/Katka8859)
- Project: [Paylocity Automation Challenge](https://github.com/Katka8859/Paylocity_Automation_Challenge)

---

**Note:** This is an automation challenge project. Credentials are stored securely in GitHub Secrets.
```
