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

## Releasing & publishing

This repo is set up to auto-publish to npm on merge to the default branch (currently `master`) via GitHub Actions. You only need to bump the version and merge a PR.

1. Create a branch and bump the version in `package.json` without creating a git tag:

   ```bash
   # pick one: patch | minor | major | or an explicit version
   npm version patch --no-git-tag-version
   # or: npm version 0.0.13 --no-git-tag-version
   ```

2. Commit the change and open a PR. Keep the PR limited to the version bump and any release notes you want in the description.

3. When the PR is merged to the default branch, the workflow at `.github/workflows/release.yml` will:

   - run typecheck and ESLint
   - publish to npm if the version is new (requires `NPM_TOKEN`)
   - create a GitHub Release with generated notes

Notes:

- Don’t push git tags manually; the workflow creates the tag during the GitHub Release step.
- If no new version is present (i.e., `package.json` didn’t change), the publish step is skipped and no release is created.
- The publish step skips npm lifecycle scripts; typecheck and lint run explicitly in the workflow.

### npm auth for the GitHub workflow

To publish to npm from GitHub Actions, add an npm access token as a secret named `NPM_TOKEN`:

1. Create an npm access token with at least “Publish” permission in your npm account settings.
2. In this repository’s Settings → Secrets and variables → Actions, add a new Repository secret named `NPM_TOKEN` with that token’s value. An Organization secret works too.
3. Nothing else is required—our release workflow already:
   - requests `id-token: write` for npm provenance support, and
   - uses `actions/setup-node@v4` to provide a recent npm version during publish.

If your org enforces “Require provenance” on npm, the existing `provenance: true` input on the publish step satisfies it.
