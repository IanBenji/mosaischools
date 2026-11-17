import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      /* Uppercase names are exempt because nothing here teaches ESLint to read
       * JSX. There is no eslint-plugin-react, so `<Icon />` does not register as
       * a use of `Icon`, and core no-unused-vars calls a perfectly used
       * component dead. Imports already escaped through varsIgnorePattern; a
       * component pulled out of a row, as in `map(({ icon: Icon }) => ...)`, is
       * an argument rather than a variable and needs the same exemption. Without
       * it the only way to satisfy the rule is to delete a component that the
       * page is actually rendering. */
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^[A-Z_]',
      }],

      /* A provider and the hook that reads it belong in one file; that is how
       * both contexts here are written and how React's own documentation frames
       * it. The rule objects because a file exporting something other than a
       * component cannot hot reload while keeping state, which costs a full page
       * refresh after editing one of two files, in development only. Splitting
       * each hook out to satisfy it would rewrite the imports of forty odd files
       * and leave the pairs harder to follow. Naming the two hooks is the whole
       * of the concession. */
      'react-refresh/only-export-components': ['error', {
        allowExportNames: ['useAuth', 'useCampus', 'useTheme'],
      }],
    },
  },
])
