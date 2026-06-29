module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/services/slices/ingredientsSlice.ts',
    'src/services/slices/constructorSlice.ts'
  ],
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@utils-types$': '<rootDir>/src/utils/types.ts'
  },
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  }
};
