import { expect, test } from 'bun:test';
import { ESLint } from 'eslint';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve as resolvePath } from 'node:path';

async function withTempFile(relPath: string, code: string, fn: (absPath: string) => Promise<void>) {
  const absPath = resolvePath(relPath);
  await mkdir(dirname(absPath), { recursive: true });
  await writeFile(absPath, code, 'utf8');
  try {
    await fn(absPath);
  } finally {
    await rm(absPath, { force: true });
  }
}

const lintFromDisk = async (filePath: string) => {
  const eslint = new ESLint();
  const [res] = await eslint.lintFiles([filePath]);
  return (res?.messages ?? []).map((m) => m.ruleId).filter(Boolean) as string[];
};

test('no-console is enforced in TS files', async () => {
  const rel = 'sample/src/bad/console.ts';
  await withTempFile(rel, "console.log('hi')\n", async (abs) => {
    const rules = await lintFromDisk(abs);
    expect(rules).toContain('no-console');
  });
});

test('double TypeScript cast is banned via no-restricted-syntax', async () => {
  const rel = 'sample/src/bad/double-cast.ts';
  const code = `
    type T = { x: number }
    const v = 123 as unknown as T
    void v
  `;
  await withTempFile(rel, code, async (abs) => {
    const rules = await lintFromDisk(abs);
    expect(rules).toContain('no-restricted-syntax');
  });
});

test('react/jsx-key is enforced in TSX', async () => {
  const rel = 'sample/react-src/bad/jsx-missing-key.tsx';
  const code = `
    import React from 'react'
    export function List(){ return [<div />, <div />] }
  `;
  await withTempFile(rel, code, async (abs) => {
    const rules = await lintFromDisk(abs);
    expect(rules).toContain('react/jsx-key');
  });
});

test('perfectionist/sort-imports flags unsorted imports', async () => {
  const rel = 'sample/src/bad/unsorted-imports.ts';
  const code = `
    import z from 'z';
    import a from 'a';
    void z; void a
  `;
  await withTempFile(rel, code, async (abs) => {
    const rules = await lintFromDisk(abs);
    expect(rules).toContain('perfectionist/sort-imports');
  });
});

test('eslint flat config entrypoint loads and exports an array', async () => {
  const mod: any = await import('../eslint.config.js');
  const exported = mod.default ?? mod.config;
  expect(Array.isArray(exported)).toBe(true);
});
