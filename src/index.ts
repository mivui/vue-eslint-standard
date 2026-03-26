import { type ConfigObject, type RulesConfig } from '@eslint/core';
import eslint from '@eslint/js';
import { type TSESLint } from '@typescript-eslint/utils';
import vitest from '@vitest/eslint-plugin';
import { defineConfig as eslintConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';
import Globals from 'globals';
import tseslint from 'typescript-eslint';
import { tslintRules } from 'typescript-eslint-standard';
import parserVue from 'vue-eslint-parser';

const vueRules: RulesConfig = {
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
  'vue/require-prop-types': 'off',
  'vue/singleline-html-element-content-newline': 'off',
};

export interface Config extends Omit<ConfigObject, 'linterOptions' | 'name' | 'processor'> {
  extends?: ConfigObject[];
  globals?: TSESLint.SharedConfig.GlobalsConfig;
}

export function defineConfig(config?: Config) {
  const {
    extends: extendConfigs,
    files,
    ignores,
    languageOptions,
    plugins,
    rules,
    globals,
    settings,
  } = config ?? {};
  const configs = extendConfigs ?? [];
  return eslintConfig(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    prettierConfig,
    prettierRecommended,
    ...pluginVue.configs['flat/recommended'],
    ...configs,
    {
      name: 'vue-eslint-standard',
      files: files ?? ['**/*.{j,t}s', '**/*.m{j,t}s', '**/*.{j,t}sx', '**/*.vue'],
      languageOptions: languageOptions ?? {
        globals: { ...Globals.browser, ...globals },
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
        ...plugins,
      },
      rules: {
        ...tslintRules,
        ...vueRules,
        ...rules,
      },
      ignores: ignores ?? [
        'node_modules',
        'dist',
        'build',
        'package.json',
        '**/*.md',
        ' **/*.svg',
        '**/*.ejs',
        '**/*.html',
      ],
      settings: settings ?? {},
    },
    {
      name: 'vitest-eslint-standard',
      files: ['**/*.{test,spec}.{j,t}s', '**/*.{test,spec}.{j,t}sx'],
      plugins: {
        vitest,
      },
      rules: {
        ...vitest.configs.recommended.rules,
        ...rules,
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
      files: ['**/*.js', '**/*.mjs', '**/*.jsx'],
      ...tseslint.configs.disableTypeChecked,
    },
  );
}
