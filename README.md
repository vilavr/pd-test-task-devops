
# Pipedrive API Integration

## Description
This project provides a simple API to interact with the Pipedrive Deals API. It includes endpoints to get all deals, add a new deal, and update an existing deal.

## Project Architecture
The project follows a typical Node.js and Express structure:

- **src/controllers**: Contains the controller logic for handling incoming HTTP requests.
- **src/routes**: Defines the API routes and maps them to the appropriate controller methods.
- **src/services**: Handles the business logic and communication with external APIs (Pipedrive API in this case).
- **src/middlewares**: Custom middleware functions (e.g., logging).
- **src/utils**: Utility functions (e.g., metrics calculation).
- **tests**: Contains test cases for the service and controller layers.

## Modules Used
### eslint
ESLint is a static code analysis tool used for identifying and fixing problematic patterns found in code. It helps maintain code quality and consistency across the codebase.

### jest
Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an API that provides features such as snapshot testing and parallel test execution.

### express
Express is a fast, unopinionated, minimalist web framework for Node.js. It is used to create the API endpoints and handle HTTP requests in the application.

### axios
Axios is a promise-based HTTP client for Node.js and the browser. It is used to make HTTP requests to the Pipedrive API.

### dotenv
Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. It is used to manage API tokens and other sensitive configuration values.

### supertest
Supertest is a library for testing Node.js HTTP servers. It provides a high-level abstraction for testing HTTP, making it easy to write tests for API endpoints.

### @types
TypeScript type definitions for various JavaScript libraries, ensuring type safety and IntelliSense support in the code.


### Endpoints
- `GET /deals`: Gets all deals
- `POST /deals`: Adds a new deal
- `PUT /deals/:id`: Updates an existing deal
- `GET /metrics`: Gets request metrics

## Installation

### Prerequisites
- Node.js (version 22)
- Docker

### Steps
1. Clone the repository:
   ```bash
   git clone git@github.com:vilavr/pd-test-task-devops.git
   cd pd-test-task-devops
   ```

2. Create a `.env` file in the root directory and add your Pipedrive API token:
   ```env
   API_TOKEN=your-pipedrive-api-token
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm start
   ```

### Running with Docker

1. Build the Docker image:
   ```bash
   sudo docker build -t pd-test-task-devops .
   ```

2. Run the Docker container:
   ```bash
   sudo docker run -p 3000:3000 --env-file .env pd-test-task-devops
   ```

## Usage
After starting the application, you can use the following endpoints:

- **Get all deals**: 
  ```bash
  curl -X GET http://localhost:3000/deals
  ```

- **Add a new deal**: 
  ```bash
  curl -X POST http://localhost:3000/deals -H "Content-Type: application/json" -d '{"title": "New Deal"}'
  ```

- **Update an existing deal**: 
  ```bash
  curl -X PUT http://localhost:3000/deals/1 -H "Content-Type: application/json" -d '{"title": "Updated Deal"}'
  ```

- **Get metrics**: 
  ```bash
  curl -X GET http://localhost:3000/metrics
  ```

## Testing
Run tests with:
```bash
npm test
```

## CI/CD
This project uses GitHub Actions for CI/CD checks. The workflows are defined as follows:

### Continuous Integration (CI)
The CI workflow is divided into two parts:

#### CI - Push
The CI push workflow runs on every push to any branch. It performs the following steps:
1. Checks out the repository.
2. Sets up Node.js environment.
3. Installs dependencies.
4. Lints the code.
5. Runs npm audit for security checks.
6. Builds the Docker image.
7. Runs tests inside the Docker container.
8. Uploads test results and coverage reports as artifacts.

Reasons:
- Ensures code quality and security with linting and npm audit.
- Uploading artifacts allows reuse in subsequent workflows, saving time and resources.

#### CI - Pull Requests
The CI pull request workflow runs on pull request events and is triggered by the CI push workflow using the `workflow_dispatch` event. It performs the following steps:
1. Checks out the repository.
2. Downloads previously uploaded artifacts (test results and coverage reports).
3. Generates coverage and test summary reports.
4. Performs dependency checks using Dependency-Check.
5. Publishes test summary and detailed results using the CTRF (Custom Test Reporting Framework) for clear and concise test results presentation.

Reasons:
- Avoids redundant testing by reusing artifacts, reducing billable time and resources.
- Dependency checks ensure no vulnerable packages are introduced.
- CTRF and Jest summaries provide developers with clear, actionable feedback, they don't need to waste time digging through logs.
- If the tests fail, we still generate summary, but the workflow fails later to protect from deploying failing code, but still provide pretty summary: [Example of failed test summary](https://github.com/vilavr/pd-test-task-devops/actions/runs/10199663936)
- Examples of coverage information:
  - Comment showing how the coverage improved (or worsened) compared to the base branch of PR: [Coverage Comment Example](https://github.com/vilavr/pd-test-task-devops/pull/5#issuecomment-2260082141)
  - Annotations generated where the code is not covered: [Coverage Annotations Example](https://github.com/vilavr/pd-test-task-devops/actions/runs/10198630129)

### Continuous Deployment (CD)
The CD workflow runs when a pull request is merged into the `main` or `master` branches. It performs the following steps:
1. Checks out the repository.
2. Sets up Docker Buildx.
3. Caches Docker layers.
4. Builds the Docker image.
5. Logs "Deployed!".


### Workflow Logic
- **CI - Push**: Triggers on every push to any branch. Runs linting, security checks (npm audit), and builds/tests inside a Docker container. Uploads results as artifacts.
- **CI - Pull Requests**: Triggered by the CI push workflow on pull request events. Downloads the previously uploaded artifacts to avoid redundant testing, performs dependency checks, and generates and publishes test summary reports using CTRF and Jest.
- **CD**: Triggered when a pull request is merged into the `main` or `master` branches. Handles the deployment process by building the Docker image and logging deployment.


## Further Improvements
I tried integrating an action that would not only check dependencies with npm audit but also create a PR to automatically fix them. 

Source file: [CI Workflow for Dependency Fix](https://github.com/vilavr/pd-test-task-devops/actions/runs/10196175469/workflow)

PR it created: [Dependency Fix PR](https://github.com/vilavr/pd-test-task-devops/pull/9)

However, it created a lot of discrepancies between lock files in the main and current branches, and I was unable to create tasks that would work for all branches. Example of my attempts: [Failed Attempt PR](https://github.com/vilavr/pd-test-task-devops/pull/8)

I'd love to discuss (if we have time in the interview) whether it makes sense to integrate this and how to do it properly.
