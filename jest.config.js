module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'lcov', 'text', 'clover'],
  reporters: [
    'default',
    [
      'json',
      {
        outputFile: 'test-results/test-results.json',
      },
    ],
  ],
};
