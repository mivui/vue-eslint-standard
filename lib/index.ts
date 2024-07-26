import eslint from '@eslint/js';
import { type TSESLint } from '@typescript-eslint/utils';
import prettierConfig from 'eslint-config-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vitest from 'eslint-plugin-vitest';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import { eslintRules, typescriptRules } from 'typescript-eslint-standard';
import parserVue from 'vue-eslint-parser';

const vueRules: TSESLint.FlatConfig.Rules = {
  'vue/html-closing-bracket-newline': 'off',
  'vue/html-self-closing': [
    'error',
    {
      html: {
        component: 'always',
        normal: 'always',
        void: 'any',
      },
      math: 'always',
      svg: 'always',
    },
  ],
  'vue/max-attributes-per-line': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/object-curly-newline': 'error',
  'vue/require-default-prop': 'off',
  'vue/singleline-html-element-content-newline': 'off',
};

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  prettierConfig,
  prettierRecommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        NodeJS: false,
        ElLoading: false,
        ElMessage: false,
        ElMessageBox: false,
        ElNotification: false,
      },
      parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
        project: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...eslintRules,
      ...typescriptRules,
      ...vueRules,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    ignores: [
      'node_modules',
      'dist',
      'build',
      'package.json',
      '**/*.md',
      ' **/*.svg',
      '**/*.ejs',
      '**/*.html',
    ],
  },
  {
    files: ['**/tests/*.{j,t}s'],
    plugins: {
      vitest,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...eslintRules,
      ...typescriptRules,
      ...vitest.configs.recommended.rules,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
);
