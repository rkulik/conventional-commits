/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line import/no-default-export
export default {
  verbose: true,
  preset: 'ts-jest',
  resolver: 'ts-jest-resolver',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts?$': ['ts-jest', { useESM: true }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
