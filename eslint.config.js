import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: ['.next/**', 'dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^[A-Z_]|motion',
          argsIgnorePattern: '^_|^i$|^index$',
        },
      ],
    },
  },
]
