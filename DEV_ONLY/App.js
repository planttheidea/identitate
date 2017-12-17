import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {render} from 'react-dom';

import * as src from '../src';

console.log('FIRST', src.identity('first', 'second', 'third', 'fourth', 'fifth'));
console.log('SECOND', src.identitySecond('first', 'second', 'third', 'fourth', 'fifth'));
console.log('LAST', src.identityLast('first', 'second', 'third', 'fourth', 'fifth'));
console.log('SECOND-TO-LAST', src.identitySecondLast('first', 'second', 'third', 'fourth', 'fifth'));

const identityThirdLast = src.createIdentity(-3);

console.log('CUSTOM: THIRD-FROM-LAST', identityThirdLast('first', 'second', 'third', 'fourth', 'fifth'));

const identityNested = src.createIdentity(0, 'some[1].nested');

console.log('FIRST NESTED', identityNested({some: ['deeply', {nested: 'value'}]}, {some: {other: 'object value'}}));

console.log(src.createIdentity(0, '"[some.fake.key]"')({'[some.fake.key]': 'value'}));

class App extends PureComponent {
  element = null;

  render() {
    return (
      <div>
        <h1>App</h1>
      </div>
    );
  }
}

const renderApp = (container) => {
  render(<App />, container);
};

document.body.style.backgroundColor = '#1d1d1d';
document.body.style.color = '#d5d5d5';
document.body.style.margin = 0;
document.body.style.padding = 0;

const div = document.createElement('div');

renderApp(div);

document.body.appendChild(div);
