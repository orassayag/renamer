import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import parserTypescript from '@typescript-eslint/parser';

export default [
  eslintConfigPrettier,
  {
    files: ['**/*.ts', '**/*.cts', '**/*.mts'],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypescript,
    },
    rules: {
      semi: 'error',
      'require-await': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
];
