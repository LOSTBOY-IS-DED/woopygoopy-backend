import pkg from '@typescript-eslint/eslint-plugin';
const eslintPlugin = pkg;  // Directly assign the plugin package
import parser from '@typescript-eslint/parser';

export default {
  files: ['**/*.ts'],
  languageOptions: {
    parser,
  },
  plugins: {
    '@typescript-eslint': eslintPlugin,  // Correctly assign the plugin here
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
  },
};
