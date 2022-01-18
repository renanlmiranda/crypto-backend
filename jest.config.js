/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['mocks', '.fake.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
