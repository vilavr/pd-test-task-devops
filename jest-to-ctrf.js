const fs = require('fs');

const jestResults = JSON.parse(fs.readFileSync('test-results/test-results.json', 'utf8'));
const ctrfResults = {
  tests: jestResults.testResults.map(testResult => ({
    file: testResult.name,
    name: testResult.name,
    duration: testResult.endTime - testResult.startTime,
    status: testResult.status === 'passed' ? 'pass' : 'fail',
    message: testResult.message,
  })),
};

fs.writeFileSync('test-results/ctrf-results.json', JSON.stringify(ctrfResults, null, 2));
