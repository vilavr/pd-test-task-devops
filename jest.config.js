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
      'jest-json-reporter',
      {
        outputFile: 'test-results/test-results.json',
      },
    ],
  ],
};
