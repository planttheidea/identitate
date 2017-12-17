// test
import test from 'ava';

// src
import * as utils from 'src/utils';

test('if getKey will return the key as-is when it is not a number', (t) => {
  const key = 'foo';

  const result = utils.getKey(key);

  t.is(result, key);
});

test('if getKey will return the key as a number when it is a number string', (t) => {
  const key = '1';

  const result = utils.getKey(key);

  t.is(result, parseInt(key, 10));
});

test('if getDotSeparatedPath wil return the path split by dots', (t) => {
  const path = 'foo.0..bar';

  const result = utils.getDotSeparatedPath(path);

  t.deepEqual(result, ['foo', 0, 'bar']);
});

test('if isQuotedKey will return true when quoted', (t) => {
  const key = '"some.quoted.key"';

  t.true(utils.isQuotedKey(key));
});

test('if isQuotedKey will return false when not quoted', (t) => {
  const key = 'some.quoted.key';

  t.false(utils.isQuotedKey(key));
});

test('if getNestedProperty will return the value if the path only has one key left and the object exists', (t) => {
  const path = ['path'];
  const object = {
    [path[0]]: 'value'
  };

  const result = utils.getNestedProperty([...path], object);

  t.is(result, object[path[0]]);
});

test('if getNestedProperty will return undefined if the path only has one key left but the object does not exist', (t) => {
  const path = ['path'];
  const object = null;

  const result = utils.getNestedProperty([...path], object);

  t.is(result, undefined);
});

test('if getNestedProperty will return the value if the path has more than one key left and the object exists', (t) => {
  const path = ['path', 'deeper'];
  const object = {
    [path[0]]: {
      [path[1]]: 'value'
    }
  };

  const result = utils.getNestedProperty([...path], object);

  t.is(result, object[path[0]][path[1]]);
});

test('if getNestedProperty will return undefined if the path has more than one key left but the object does not exist', (t) => {
  const path = ['path', 'deeper'];
  const object = null;

  const result = utils.getNestedProperty([...path], object);

  t.is(result, undefined);
});

test('if getPath will return the cloned path itself when it is an array', (t) => {
  const path = [0, 'foo'];

  const result = utils.getPath(path);

  t.not(result, path);
  t.deepEqual(result, path);
});

test('if getPath will handle when the path is a number, it will be coalesced to an array of that number', (t) => {
  const path = 0;

  const result = utils.getPath(path);

  t.deepEqual(result, [path]);
});

test('if getPath will handle when the path is a string, it will parse out the path based on dot and bracket notation', (t) => {
  const keys = ['foo', 0, 'bar', 'baz'];
  const path = keys
    .reduce((keyString, key) => {
      return `${keyString}${typeof key === 'number' ? `[${key}]` : `.${key}`}`;
    }, '')
    .substr(1);

  const result = utils.getPath(path);

  t.deepEqual(result, keys);
});

test('if getPath will handle the path will handle the bracket notation being first', (t) => {
  const path = '[0].foo';

  const result = utils.getPath(path);

  t.deepEqual(result, [0, 'foo']);
});

test('if getPath will handle the path will handle the bracket notation being last', (t) => {
  const path = 'foo[0]';

  const result = utils.getPath(path);

  t.deepEqual(result, ['foo', 0]);
});

test('if getPath will handle when the path is not an array or string, it will return the item in an array', (t) => {
  const path = 123;

  const result = utils.getPath(path);

  t.deepEqual(result, [123]);
});

test('if getPath will handle when the path has nested quoted strings, it will respect those strings as singular keys', (t) => {
  const simple = '["foo.bar"]';
  const simplePath = utils.getPath(simple);

  t.deepEqual(simplePath, ['foo.bar']);

  const complex = 'foo[`bar.baz`]';
  const complexPath = utils.getPath(complex);

  t.deepEqual(complexPath, ['foo', 'bar.baz']);

  const crazy = 'foo[\'bar.baz\'].blah[0]["super.blah"]';
  const crazyPath = utils.getPath(crazy);

  t.deepEqual(crazyPath, ['foo', 'bar.baz', 'blah', 0, 'super.blah']);
});
