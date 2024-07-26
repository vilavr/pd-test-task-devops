
# Pipedrive API Integration

## Description
This project provides a simple API to interact with the Pipedrive Deals API. It includes endpoints to get all deals, add a new deal, and update an existing deal.

## Installation

### Prerequisites
- Node.js
- Docker 

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pd-test-task-devops.git
   cd pd-test-task-devops
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

4. Run with Docker:
   ```bash
   docker build -t pipedrive-api .
   docker run -p 3000:3000 pipedrive-api
   ```

## Usage
- GET /deals - gets all deals
- POST /deals - adds a new deal
- PUT /deals/:id - updates an existing deal
- GET /metrics - gets request metrics

## Testing
Run tests with:
```bash
npm test
```

## CI/CD
This project uses GitHub Actions for CI/CD checks.

