import { parse } from 'pathington';
import type { AnyPath, IsEmptyPath, MatchingArg, PickDeep } from './internalTypes.js';
import { getNestedProperty } from './utils.js';

/**
 * Create an identity method for a specific argument index.
 */
export function createIdentity<I extends number, const P extends AnyPath>(argIndex: I, path?: P | null) {
  return function <const A extends unknown[]>(
    ...args: A
  ): true extends IsEmptyPath<P> ? MatchingArg<A, I> : PickDeep<MatchingArg<A, I>, P> {
    const value = args[argIndex < 0 ? args.length + argIndex : argIndex];

    // @ts-expect-error - Ternary types are a nightmare internally, but valuable for consumers.
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    return path != null ? getNestedProperty(parse(path), value) : value;
  };
}

export const identity = createIdentity(0);
export const identitySecond = createIdentity(1);
export const identityLast = createIdentity(-1);
export const identitySecondLast = createIdentity(-2);
