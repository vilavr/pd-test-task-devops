const fs = require('fs');
const path = require('path');

const jestResultsPath = path.resolve('test-results/test-results.json');
const jestResults = JSON.parse(fs.readFileSync(jestResultsPath, 'utf8'));

const ctrfResults = {
  tests: jestResults.testResults.map(test => ({
    name: test.fullName,
    duration: test.duration,
    status: test.status === 'passed' ? 'pass' : 'fail',
    error: test.failureMessages && test.failureMessages.length > 0 ? test.failureMessages.join('\n') : null
  }))
};

const ctrfDir = path.resolve('test-results');
if (!fs.existsSync(ctrfDir)) {
  fs.mkdirSync(ctrfDir, { recursive: true });
}

const ctrfResultsPath = path.resolve(ctrfDir, 'ctrf-results.json');
fs.writeFileSync(ctrfResultsPath, JSON.stringify(ctrfResults, null, 2), 'utf8');

console.log('CTRF Results:', JSON.stringify(ctrfResults, null, 2));
