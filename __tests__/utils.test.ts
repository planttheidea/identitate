import { expect, test } from 'vitest';
import { getNestedProperty } from '../src/utils.js';

// src

test('if getNestedProperty will return the value if the path only has one key left and the object exists', () => {
  const result = getNestedProperty(['path'], { path: 'value' });

  expect(result).toBe('value');
});

test('if getNestedProperty will return undefined if the path only has one key left but the object does not exist', () => {
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const result = getNestedProperty(['path'], null);

  expect(result).toBe(undefined);
});

test('if getNestedProperty will return the value if the path has more than one key left and the object exists', () => {
  const result = getNestedProperty(['path', 'deeper'], {
    path: { deeper: 'value' },
  });

  expect(result).toBe('value');
});

test('if getNestedProperty will return the value if the path has more than one key left but the object does not exist', () => {
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const result = getNestedProperty(['path', 'deeper'], null);

  expect(result).toBe(undefined);
});

test('if getNestedProperty will return the value if the path has more than one key left but the nested object does not exist', () => {
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const result = getNestedProperty(['path', 'deeper'], { path: null });

  expect(result).toBe(undefined);
});

test('if getNestedProperty will return the value if the path has more than one key left and the object exists but does not have the key', () => {
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const result = getNestedProperty(['path', 'deeper'], {
    path: { foo: 'bar' },
  });

  expect(result).toBe(undefined);
});
