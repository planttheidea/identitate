import { Path, ReadonlyPath, PathItem, ParsePath } from 'pathington';

type EmptyPath = null | [];
type IsEmptyPath<T> = null extends T ? true : [] extends T ? true : false;
type AnyPath = EmptyPath | Path | ReadonlyPath | PathItem;
type TupleLength<A extends unknown[]> = A extends unknown ? (number extends A['length'] ? never : A['length']) : never;
type PickArray<U extends unknown[], I extends number> = U[I];
type PickObject<U extends object, K extends keyof U> = U[K];
interface NoMatch {
  $$noMatch: true;
}
interface UnknownMatch {
  $$unknown: true;
}
type PickDeepInternal<U, P extends unknown[]> = unknown extends U
  ? UnknownMatch
  : P extends [infer Next, ...infer Rest]
    ? U extends object
      ? Next extends keyof U
        ? PickDeepInternal<PickObject<U, Next>, Rest>
        : NoMatch
      : U extends unknown[]
        ? Next extends number
          ? PickDeepInternal<PickArray<U, Next>, Rest>
          : NoMatch
        : NoMatch
    : U;
type PickDeepInternalNormalized<U, P> =
  true extends IsEmptyPath<P>
    ? U
    : P extends unknown[]
      ? PickDeepInternal<U, P>
      : P extends readonly unknown[]
        ? PickDeepInternal<U, [...P]>
        : any;
type PickDeep<U, P extends AnyPath, Result = PickDeepInternalNormalized<U, ParsePath<P>>> = NoMatch extends Result
  ? undefined
  : UnknownMatch extends Result
    ? any
    : Result;
type MatchingArg<A extends unknown[], I extends number> = A extends [infer _Next, ...infer Rest]
  ? `${I}` extends `-${number}`
    ? `-${TupleLength<Rest>}` extends `${I}`
      ? Rest[0]
      : MatchingArg<Rest, I>
    : A[I]
  : undefined;

/**
 * Create an identity method for a specific argument index.
 */
declare function createIdentity<I extends number, const P extends AnyPath>(
  argIndex: I,
  path?: P | null,
): <const A extends unknown[]>(
  ...args: A
) => true extends IsEmptyPath<P> ? MatchingArg<A, I> : PickDeep<MatchingArg<A, I>, P>;
declare const identity: <const A extends unknown[]>(...args: A) => MatchingArg<A, 0>;
declare const identitySecond: <const A extends unknown[]>(...args: A) => MatchingArg<A, 1>;
declare const identityLast: <const A extends unknown[]>(...args: A) => MatchingArg<A, -1>;
declare const identitySecondLast: <const A extends unknown[]>(...args: A) => MatchingArg<A, -2>;

export { createIdentity, identity, identityLast, identitySecond, identitySecondLast };
