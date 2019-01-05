// test
import test from 'ava';

// src
import * as utils from 'src/utils';

test('if getNestedProperty will return the value if the path only has one key left and the object exists', (t) => {
  const path = ['path'];
  const object = {
    [path[0]]: 'value',
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
      [path[1]]: 'value',
    },
  };

  const result = utils.getNestedProperty([...path], object);

  t.is(result, object[path[0]][path[1]]);
});

test('if getNestedProperty will return the value if the path has more than one key left but the object does not exist', (t) => {
  const path = ['path', 'deeper'];
  const object = null;

  const result = utils.getNestedProperty([...path], object);

  t.is(result, undefined);
});

test('if getNestedProperty will return the value if the path has more than one key left but the nested object does not exist', (t) => {
  const path = ['path', 'deeper'];
  const object = {
    [path[0]]: null,
  };

  const result = utils.getNestedProperty([...path], object);

  t.is(result, undefined);
});

test('if getNestedProperty will return the value if the path has more than one key left and the object exists but does not have the key', (t) => {
  const path = ['path', 'deeper'];
  const object = {
    [path[0]]: {
      foo: 'bar',
    },
  };

  const result = utils.getNestedProperty([...path], object);

  t.is(result, undefined);
});
