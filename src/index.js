// utils
import {getNestedProperty, getPath} from './utils';

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

  return (...args) => {
    const value = args[argIndex < 0 ? args.length + argIndex : argIndex];

    return shouldGetNestedValue ? getNestedProperty(getPath(path), value) : value;
  };
};

export const identity = createIdentity(0);
export const identitySecond = createIdentity(1);
export const identityLast = createIdentity(-1);
export const identitySecondLast = createIdentity(-2);
