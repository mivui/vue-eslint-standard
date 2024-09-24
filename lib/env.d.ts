declare module '@eslint/js' {
  import { type Linter } from 'eslint';
  declare const configs: {
    all: Linter.Config;
    recommended: Linter.Config;
  };

  export { configs };
}

declare module 'eslint-config-prettier' {
  import { type Linter } from 'eslint';
  declare const config: Linter.Config;

  export default config;
}

declare module 'eslint-plugin-vue' {
  import { type TSESLint } from '@typescript-eslint/utils';
  declare const configs: {
    'flat/recommended': TSESLint.FlatConfig.ConfigArray;
  };

  export { configs };
}
