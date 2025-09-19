import { expect, test } from 'bun:test';
import prettier from 'prettier';

import config from '../config/prettier.js';

test('prettier config formats consistently', async () => {
  const out = await prettier.format('const x=[1,2]\n', {
    ...config,
    parser: 'babel',
  });
  expect(out).toBe('const x = [1, 2];\n');
});
