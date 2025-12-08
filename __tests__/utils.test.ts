import { expect, test } from 'vitest';
import { getNestedProperty } from '../src/utils.js';

// src

test('if getNestedProperty will return the value if the path only has one key left and the object exists', () => {
  const path = ['path'];
  const object = { path: 'value' };
  const result = getNestedProperty(path, object);

  expect(result).toBe('value');
});

test('if getNestedProperty will return undefined if the path only has one key left but the object does not exist', () => {
  const path = ['path'];
  const object = null;
  const result = getNestedProperty(path, object);

  expect(result).toBe(undefined);
});

test('if getNestedProperty will return the value if the path has more than one key left and the object exists', () => {
  const path = ['path', 'deeper'];
  const object = {
    path: { deeper: 'value' },
  };
  const result = getNestedProperty(path, object);

  expect(result).toBe('value');
});

test('if getNestedProperty will return the value if the path has more than one key left but the object does not exist', () => {
  const path = ['path', 'deeper'];
  const object = null;
  const result = getNestedProperty(path, object);

  expect(result).toBe(undefined);
});

test('if getNestedProperty will return the value if the path has more than one key left but the nested object does not exist', () => {
  const path = ['path', 'deeper'];
  const object = { path: null };

  const result = getNestedProperty(path, object);

  expect(result).toBe(undefined);
});

test('if getNestedProperty will return the value if the path has more than one key left and the object exists but does not have the key', () => {
  const path = ['path', 'deeper'];
  const object = {
    path: { foo: 'bar' },
  };

  const result = getNestedProperty(path, object);

  expect(result).toBe(undefined);
});
