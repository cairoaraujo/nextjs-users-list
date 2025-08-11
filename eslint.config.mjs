// eslint.config.mjs
import js from '@eslint/js';

export default [
  // Global ignores for files that should not be linted at all
  {
    ignores: ['node_modules/', 'dist/', '*.min.js'],
  },
  // Configuration for all JavaScript files
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    ...js.configs.recommended, // This is the corrected line
    rules: {
      'no-unused-vars': 'warn', // Warn for unused variables
      'no-console': 'error', // Disallow console.log
    },
  },
  // Configuration specific to test files
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    rules: {
      'no-console': 'off', // Allow console.log in test files
    },
  },
];
