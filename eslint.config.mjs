import tseslint from 'typescript-eslint'

/**
 * Next 16 removed `next lint`, and eslint-config-next currently pulls a
 * vulnerable `braces` chain that fails the security gate. TypeScript ESLint
 * gives us a real lint pass with a clean dependency tree.
 */
const config = tseslint.config(
  {
    ignores: ['.next/**', 'node_modules/**', 'dentcare-1.0.0/**', '.hosea-data/**', 'next-env.d.ts'],
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
)

export default config
