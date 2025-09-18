# @charlie-labs/config

Standardized TypeScript, ESLint, and Prettier configuration for Charlie Lab's TypeScript projects.

Why does this exist?

1. Consistent and familiar configuration across Charlie Labs projects
2. Reduces configuration boilerplate in each project
3. Reduces time spent keeping configuration updated and in sync

## Usage

### 1. Add Dependency

Install `@charlie-labs/config` as a dev dependency.

### 2. Configure Prettier

Add the following line to your `package.json`:

```json
  "prettier": "@charlie-labs/config/prettier",
```

### 3. Configure ESLint

Create a `eslint.config.js` file in the root of the project:

```js
import { config } from '@charlie-labs/config/eslint';

/** @type {import("eslint").Linter.Config[]} */
export default [...config];
```

### 4. Configure TypeScript

Create a `tsconfig.json` file in the root that extends `@charlie-labs/config/tsconfig-node` or `@charlie-labs/config/tsconfig-react`. You will still need to specify `includes` and any `compilerOptions` you want to add or override.

```jsonc
{
  "extends": "@charlie-labs/config/tsconfig-node",
  "include": ["src"],
  "exclude": ["**/node_modules", "**/.*/"],
  "compilerOptions": {
    // Add or override compiler options here
  },
}
```

### 5. Add TypeScript Reset

This is just a convenient export of [`@total-typescript/ts-reset`](https://www.totaltypescript.com/ts-reset).
