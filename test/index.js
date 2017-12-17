// test
import test from 'ava';

// src
import * as index from 'src/index';

test('if createIdentity will get the argument passed when the index is posistive', (t) => {
  const argIndex = 1;
  const path = undefined;

  const identityFn = index.createIdentity(argIndex, path);

  const args = ['first', 'second', 'third', 'fourth', 'fifth'];

  const result = identityFn(...args);

  t.is(result, args[argIndex]);
});

test('if createIdentity will get the argument passed when the index is negative', (t) => {
  const argIndex = -1;
  const path = undefined;

  const identityFn = index.createIdentity(argIndex, path);

  const args = ['first', 'second', 'third', 'fourth', 'fifth'];

  const result = identityFn(...args);

  t.is(result, args[args.length - 1]);
});

test('if createIdentity will return undefined when the index is outside the available range', (t) => {
  const argIndex = 7;
  const path = undefined;

  const identityFn = index.createIdentity(argIndex, path);

  const args = ['first', 'second', 'third', 'fourth', 'fifth'];

  const result = identityFn(...args);

  t.is(result, undefined);
});

test('if createIdentity will get the nested value requested when there is a path', (t) => {
  const argIndex = 0;
  const path = 'deeply[1].nested';

  const identityFn = index.createIdentity(argIndex, path);

  const args = [{deeply: ['ignored', {nested: 'value'}]}, {other: 'parameter'}];

  const result = identityFn(...args);

  t.is(result, args[argIndex].deeply[1].nested);
});
