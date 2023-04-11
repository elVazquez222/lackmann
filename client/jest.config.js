module.exports = {
  moduleFileExtensions: ['js', 'json', 'tsx', 'ts'],
  testEnvironment: 'jest-environment-node',
  transform: {
    '^.+\\.tsx$': 'react-jest',
    "^.+\\.jsx?$": "babel-jest",
    '\\.js$': ['babel-jest', { configFile: './babel-jest.config.js' }],
  },
  "testMatch": [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "tests/**/*.[jt]s?(x)",
    "tests/unit/**/*.[jt]s?(x)"
  ],
}