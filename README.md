
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
   \`\`\`bash
   git clone https://github.com/your-username/pd-test-task-devops.git
   cd pd-test-task-devops
   \`\`\`

2. Create a `.env` file in the root directory and add your Pipedrive API token:
   \`\`\`env
   API_TOKEN=your-pipedrive-api-token
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

4. Run the application:
   \`\`\`bash
   npm start
   \`\`\`

### Running with Docker

1. Build the Docker image:
   \`\`\`bash
   docker build -t pd-test-task-devops .
   \`\`\`

2. Run the Docker container:
   \`\`\`bash
   docker run -p 3000:3000 --env-file .env pd-test-task-devops
   \`\`\`

## Usage
After starting the application, you can use the following endpoints:

- **Get all deals**: 
  \`\`\`bash
  curl -X GET http://localhost:3000/deals
  \`\`\`

- **Add a new deal**: 
  \`\`\`bash
  curl -X POST http://localhost:3000/deals -H "Content-Type: application/json" -d '{"title": "New Deal"}'
  \`\`\`

- **Update an existing deal**: 
  \`\`\`bash
  curl -X PUT http://localhost:3000/deals/1 -H "Content-Type: application/json" -d '{"title": "Updated Deal"}'
  \`\`\`

- **Get metrics**: 
  \`\`\`bash
  curl -X GET http://localhost:3000/metrics
  \`\`\`

## Testing
Run tests with:
\`\`\`bash
npm test
\`\`\`

## CI/CD
This project uses GitHub Actions for CI/CD checks. The workflows are defined as follows:

### Continuous Integration (CI)
The CI workflow runs on every push to the \`main\` or \`master\` branches and on every pull request. It performs the following steps:
1. Checks out the repository.
2. Sets up Node.js environment.
3. Installs dependencies.
4. Lints the code.
5. Runs tests.
6. Builds the Docker image and runs tests inside the Docker container.

### Continuous Deployment (CD)
The CD workflow runs when a pull request is merged into the \`main\` or \`master\` branches. It performs the following steps:
1. Checks out the repository.
2. Sets up Docker Buildx.
3. Caches Docker layers.
4. Builds the Docker image.
5. Logs "Deployed!".

The workflows are defined in the \`.github/workflows\` directory.
