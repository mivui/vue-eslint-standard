# ⚡vue-eslint-standard

#### quickly start eslint in vue.

[![npm version](https://img.shields.io/npm/v/vue-eslint-standard.svg?style=flat-square)](https://www.npmjs.com/package/vue-eslint-standard)
[![Alt](https://img.shields.io/npm/dt/vue-eslint-standard?style=flat-square)](https://npmcharts.com/compare/vue-eslint-standard?minimal=true)
![Vite Version](https://img.shields.io/badge/eslint->=9.0.0-brightgreen.svg?style=flat-square)
![Alt](https://img.shields.io/github/license/mivui/vue-eslint-standard?style=flat-square)

### install

```shell
npm i vue-eslint-standard -D
```

### eslint.config.js

```js
import { defineConfig } from 'vue-eslint-standard';

export default defineConfig();
```

### .prettierrc.js

```js
/**
 * @type {import("prettier").Config}
 */
export default {
  singleQuote: true,
  trailingComma: 'all',
  bracketSameLine: true,
  endOfLine: 'auto',
};
```

### custom configuration

```js
import { defineConfig } from 'vue-eslint-standard';
import tseslint from 'typescript-eslint';

export default defineConfig({
  extends: [...tseslint.configs.recommended, ...tseslint.configs.strict],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
  },
});
```
