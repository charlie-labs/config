import '@total-typescript/ts-reset/dom';

import 'react';

declare module 'react' {
  // Support css variables in React
  type CSSProperties = Record<`--${string}`, string | number>;
}
