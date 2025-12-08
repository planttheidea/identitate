import { expect, test } from 'vitest';
import { createIdentity } from '../src/index.js';

test('if createIdentity will get the argument passed when the index is posistive', (t) => {
  const identityFn = createIdentity(1);
  const result = identityFn('first', 'second', 'third', 'fourth', 'fifth');

  expect(result).toBe('second');
});

test('if createIdentity will get the argument passed when the index is negative', (t) => {
  const identityFn = createIdentity(-1);
  const result = identityFn('first', 'second', 'third', 'fourth', 'fifth');

  expect(result).toBe('fifth');
});

test('if createIdentity will return undefined when the index is outside the available range', (t) => {
  const identityFn = createIdentity(7);
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const result = identityFn('first', 'second', 'third', 'fourth', 'fifth');

  expect(result).toBe(undefined);
});

test('if createIdentity will get the nested value requested when there is a path', (t) => {
  const identityFn = createIdentity(0, 'deeply[1].nested');
  const result = identityFn({ deeply: ['ignored', { nested: 'value' }] }, { other: 'parameter' });

  expect(result).toBe('value');
});
