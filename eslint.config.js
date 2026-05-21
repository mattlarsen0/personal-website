import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jestPlugin from 'eslint-plugin-jest';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
    js.configs.recommended,
    ...compat.extends('eslint-config-expo'),

    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },

        plugins: {
            react: reactPlugin,
            'react-native': reactNativePlugin,
            'react-hooks': reactHooksPlugin,
        },

        rules: {
            'no-fallthrough': 'error',
            'func-style': ['error', 'expression'],
            'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],

            quotes: ['error', 'single', { avoidEscape: true }],
            indent: ['error', 4, {
                SwitchCase: 1,
                ignoredNodes: ['JSXElement', 'JSXFragment'],
            }],
            'no-multiple-empty-lines': ['error', {
                max: 1,
                maxEOF: 0,
                maxBOF: 0,
            }],
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',

            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },

    // ---------------------------
    // Jest config (test files only)
    // ---------------------------
    {
        files: ['**/*.test.js', '**/*.test.ts', '**/*.spec.js', '**/*.spec.ts', '**/__tests__/**/*'],
        plugins: {
            jest: jestPlugin,
        },
        languageOptions: {
            globals: {
                ...jestPlugin.environments.globals.globals,
            },
        },
        rules: {
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/valid-expect': 'error',
            'jest/expect-expect': 'warn',
            'jest/no-conditional-expect': 'error',
        },
    },
];
