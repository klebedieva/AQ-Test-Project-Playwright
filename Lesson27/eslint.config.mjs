import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import pluginCypress from 'eslint-plugin-cypress/flat';
import pluginPlaywright from 'eslint-plugin-playwright';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [

  { files: ['**/*.js', '**/*.mjs'], ignores: ['html*'] },

  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    }
  },

  pluginJs.configs.recommended,

  pluginCypress.configs.recommended,

  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        expect: 'readonly',
        test: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    plugins: {
      playwright: pluginPlaywright,
    },
    rules: {
      'playwright/no-skipped-test': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-eval': 'error',
    },
  },

  {
    plugins: {
      '@stylistic/js': stylisticJs,
      'cypress': pluginCypress,
    },
    rules: {
      'no-unused-vars': 'off',
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 2 }],
      '@stylistic/js/no-extra-semi': ['error'],
      '@stylistic/js/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/max-len': ['error', { code: 150 }],
      'cypress/unsafe-to-chain-command': 'warn',
      'cypress/no-unnecessary-waiting': 'warn',
    }
  }
];
