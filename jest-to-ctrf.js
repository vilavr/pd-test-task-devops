const fs = require('fs');
const jestResults = require('./test-results/test-results.json');

const ctrfResults = {
  results: {
    tool: {
      name: 'jest'
    },
    summary: {
      tests: jestResults.numTotalTests,
      passed: jestResults.numPassedTests,
      failed: jestResults.numFailedTests,
      pending: jestResults.numPendingTests,
      skipped: jestResults.numSkippedTests,
      other: jestResults.numTodoTests,
      start: Math.floor(new Date(jestResults.startTime).getTime() / 1000),
      stop: Math.floor(Date.now() / 1000)
    },
    tests: jestResults.testResults.flatMap(suite =>
      suite.assertionResults.map(test => ({
        name: test.fullName,
        status: test.status,
        duration: test.duration || 0,
        message: test.failureMessages ? test.failureMessages.join('\n') : null,
        trace: test.failureMessages ? test.failureMessages.join('\n').split('\n').slice(-1)[0] : null,
        flaky: false,
        retries: 0
      }))
    )
  }
};

fs.writeFileSync('./test-results/ctrf-results.json', JSON.stringify(ctrfResults, null, 2));
console.log('CTRF Results:', JSON.stringify(ctrfResults, null, 2));
