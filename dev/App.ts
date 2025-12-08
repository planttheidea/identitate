import { createIdentity, identity, identitySecond, identityLast, identitySecondLast } from '../src/index.js';

const first = identity('first', 'second', 'third', 'fourth', 'fifth');
const second = identitySecond('first', 'second', 'third', 'fourth', 'fifth');
const last = identityLast('first', 'second', 'third', 'fourth', 'fifth');
const secondLast = identitySecondLast('first', 'second', 'third', 'fourth', 'fifth');

console.log('FIRST', first);
console.log('SECOND', second);
console.log('LAST', last);
console.log('SECOND-TO-LAST', secondLast);

const identityThirdLast = createIdentity(-3);
const thirdLast = identityThirdLast('first', 'second', 'third', 'fourth', 'fifth');

console.log('CUSTOM: THIRD-FROM-LAST', thirdLast);

const identityNested = createIdentity(0, 'some[1].nested');
const nested = identityNested({ some: ['deeply', { nested: 'value' }] }, { some: { other: 'object value' } });

console.log('FIRST NESTED', nested);

const identityOddKey = createIdentity(0, '"[some.fake.key]"');
const oddKey = identityOddKey({ '[some.fake.key]': 'value' });

console.log('ODD KEY', oddKey);
