import { expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const TSC = require.resolve('typescript/bin/tsc');

test('tsconfig-node can typecheck a trivial project', () => {
  const { status, stderr } = spawnSync(process.execPath, [
    TSC,
    '-p',
    'sample/tsconfig.node.json',
    '--noEmit',
  ], { stdio: 'pipe' });
  expect(status).toBe(0);
  expect(String(stderr)).toBe('');
});

test('tsconfig-react can typecheck a trivial TSX project', () => {
  const { status, stderr } = spawnSync(process.execPath, [
    TSC,
    '-p',
    'sample/tsconfig.react.json',
    '--noEmit',
  ], { stdio: 'pipe' });
  expect(status).toBe(0);
  expect(String(stderr)).toBe('');
});
