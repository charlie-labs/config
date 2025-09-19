import { expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const TSC = resolve('node_modules/.bin/tsc');

test('tsconfig-node can typecheck a trivial project', () => {
  const { status, stderr } = spawnSync(TSC, [
    '-p',
    'sample/tsconfig.node.json',
    '--noEmit',
  ], { stdio: 'pipe' });
  expect(status).toBe(0);
  expect(String(stderr)).toBe('');
});

test('tsconfig-react can typecheck a trivial TSX project', () => {
  const { status, stderr } = spawnSync(TSC, [
    '-p',
    'sample/tsconfig.react.json',
    '--noEmit',
  ], { stdio: 'pipe' });
  expect(status).toBe(0);
  expect(String(stderr)).toBe('');
});
