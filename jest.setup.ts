import type { Config } from 'jest';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

const config: Config = {
  preset: 'next/jest', // Utilizando o preset do Next.js
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Se você tiver esse arquivo
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
