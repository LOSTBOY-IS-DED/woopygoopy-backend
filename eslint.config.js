import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.ts'],
  languageOptions: {
    parser: tseslint.parser,
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
  },
});
