import * as src from '../src/index.js';

console.log('FIRST', src.identity('first', 'second', 'third', 'fourth', 'fifth'));
console.log('SECOND', src.identitySecond('first', 'second', 'third', 'fourth', 'fifth'));
console.log('LAST', src.identityLast('first', 'second', 'third', 'fourth', 'fifth'));
console.log('SECOND-TO-LAST', src.identitySecondLast('first', 'second', 'third', 'fourth', 'fifth'));

const identityThirdLast = src.createIdentity(-3);

console.log('CUSTOM: THIRD-FROM-LAST', identityThirdLast('first', 'second', 'third', 'fourth', 'fifth'));

const identityNested = src.createIdentity(0, 'some[1].nested');

console.log(
  'FIRST NESTED',
  identityNested({ some: ['deeply', { nested: 'value' }] }, { some: { other: 'object value' } }),
);

console.log(src.createIdentity(0, '"[some.fake.key]"')({ '[some.fake.key]': 'value' }));
