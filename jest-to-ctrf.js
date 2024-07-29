const fs = require('fs');
const path = require('path');

// Read the Jest results
const jestResultsPath = path.resolve('test-results/test-results.json');
const jestResults = JSON.parse(fs.readFileSync(jestResultsPath, 'utf8'));

// Transform Jest results to CTRF format
const ctrfResults = {
  tests: jestResults.testResults.flatMap(testFile => 
    testFile.assertionResults.map(assertion => ({
      name: assertion.fullName,
      status: assertion.status === 'passed' ? 'pass' : 'fail',
      duration: assertion.duration,
      error: assertion.failureMessages && assertion.failureMessages.length > 0 ? assertion.failureMessages.join('\n') : null
    }))
  )
};

// Ensure the CTRF directory exists
const ctrfDir = path.resolve('test-results');
if (!fs.existsSync(ctrfDir)) {
  fs.mkdirSync(ctrfDir, { recursive: true });
}

// Write the CTRF results
const ctrfResultsPath = path.resolve(ctrfDir, 'ctrf-results.json');
fs.writeFileSync(ctrfResultsPath, JSON.stringify(ctrfResults, null, 2), 'utf8');

// Log the CTRF results for debugging
console.log('CTRF Results:', JSON.stringify(ctrfResults, null, 2));
