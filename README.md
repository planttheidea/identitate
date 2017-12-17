# identitate

A tiny custom identity function creator for composable softwares.

## Table of contents

* [Usage](#usage)
* [Pre-build methods](#pre-build-methods)
  * [identity](#identity)
  * [identitySecond](#identitysecond)
  * [identityLast](#identitylast)
  * [identitySecondLast](#identitysecondlast)
* [Custom methods](#custom-methods)
  * [createIdentity](#createidentity)
* [Browser support](#browser-support)
* [Development](#development)

## Usage

```javascript
import {createIdentity, identity, identitySecond, identityLast, identitySecondLast} from 'identitate';

// use built-in methods
console.log(identity('first', 'second', 'third', 'fourth', 'fifth')); // 'first'
console.log(identitySecond('first', 'second', 'third', 'fourth', 'fifth')); // 'second'
console.log(identityLast('first', 'second', 'third', 'fourth', 'fifth')); // 'fifth'
console.log(identitySecondLast('first', 'second', 'third', 'fourth', 'fifth')); // 'fourth'

// or create your own
const identityThird = createIdentity(2);
const identityThirdLast = createIdentity(-3);
const identityFirstNested = createIdentity(0, 'deeply[0].nested');

console.log(identityThird('first', 'second', 'third', 'fourth', 'fifth')); // 'third'
console.log(identityThirdLast('first', 'second', 'third', 'fourth', 'fifth')); // 'third'
console.log(identityFirstNested({deeply: [{nested: 'value'}]}, 'second', 'third', 'fourth', 'fifth')); // 'value'
```

## Pre-built methods

#### identity

_returns first argument passed to it_

The classic identity function:

```javascript
console.log(identity('first', 'second', 'third', 'fourth', 'fifth')); // 'first'
```

#### identitySecond

_returns second argument passed to it_

```javascript
console.log(identitySecond('first', 'second', 'third', 'fourth', 'fifth')); // 'second'
```

Example usage when creating `meta` properties with the popular `redux-actions` package:

```javascript
import {identity, identitySecond} from 'identitate';
import {createAction} from 'redux-actions';

export const doThing = createAction('DO_THING', identity, identitySecond);

console.log(doThing('payload', 'meta')); // {meta: 'meta', payload: 'payload', type: 'DO_THING'}
```

#### identityLast

_returns last argument passed to it, regardless of total number of arguments_

```javascript
console.log(identityLast('first', 'second', 'third', 'fourth', 'fifth')); // 'fifth'
console.log(identityLast('first', 'second', 'third')); // 'third'
```

#### identitySecondLast

_returns second-to-last argument passed to it, regardless of total number of arguments_

```javascript
console.log(identityLast('first', 'second', 'third', 'fourth', 'fifth')); // 'fourth'
console.log(identityLast('first', 'second', 'third')); // 'second'
```

## Custom methods

#### createIdentity

_creates a new identity method based on the parameters passed_

`createIdentity(position: number[, path: (Array<number|string>|number|string)]): any`

```javascript
// use a positive number to get the index of the arguments (zero-indexed)
const identityFourth = createIdentity(3);

console.log(identityLast('first', 'second', 'third', 'fourth', 'fifth')); // 'fourth'

// use a negative number to get the index of the arguments relative to the last
const identityThirdLast = createidentity(-3);

console.log(identityLast('first', 'second', 'third', 'fourth', 'fifth')); // 'third'

// include a path to get the deeply-nested value of that argument
const identityNested = createIdentity(0, 'deeply.nested');

console.log(identityNested({deeply: {nested: 'value'}})); // 'value'
```

The `path` parameter uses [pathington](https://github.com/planttheidea/pathington) under the hood for path parsing, so check there for valid values.

## Browser support

* Chrome (all versions)
* Firefox (all versions)
* Edge (all versions)
* Opera 15+
* IE 9+
* Safari 6+
* iOS 8+
* Android 4+

## Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:

* `build` => run webpack to build development `dist` file with NODE_ENV=development
* `build:minified` => run webpack to build production `dist` file with NODE_ENV=production
* `dev` => run webpack dev server to run example app / playground
* `dist` => runs `build` and `build-minified`
* `lint` => run ESLint against all files in the `src` folder
* `prepublish` => runs `compile-for-publish`
* `prepublish:compile` => run `lint`, `test:coverage`, `transpile:es`, `transpile:lib`, `dist`
* `test` => run AVA test functions with `NODE_ENV=test`
* `test:coverage` => run `test` but with `nyc` for coverage checker
* `test:watch` => run `test`, but with persistent watcher
* `transpile:lib` => run babel against all files in `src` to create files in `lib`
* `transpile:es` => run babel against all files in `src` to create files in `es`, preserving ES2015 modules (for
  [`pkg.module`](https://github.com/rollup/rollup/wiki/pkg.module))
