// external dependencies
import {parse} from 'pathington';

// utils
import {getNestedProperty} from './utils';

/**
 * @function createIdentity
 *
 * @description
 * create an identity method for a specific argument index
 *
 * @param {number} argIndex the index of the argument to get
 * @param {Array<number|string>|number|string} path the nested path to retrieve the value from
 * @returns {function(...Array<*>): *} the identity method for the given argument
 */
export const createIdentity = (argIndex, path) => {
  const shouldGetNestedValue = path !== void 0;

  return function() {
    // eslint-disable-next-line prefer-rest-params
    const value = arguments[argIndex < 0 ? arguments.length + argIndex : argIndex];

    return shouldGetNestedValue ? getNestedProperty(parse(path), value) : value;
  };
};

export const identity = createIdentity(0);
export const identitySecond = createIdentity(1);
export const identityLast = createIdentity(-1);
export const identitySecondLast = createIdentity(-2);
