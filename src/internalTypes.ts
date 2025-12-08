import type { Path, ParsePath, PathItem, ReadonlyPath } from 'pathington';

export type EmptyPath = null | [];
export type IsEmptyPath<T> = null extends T ? true : [] extends T ? true : false;
export type AnyPath = EmptyPath | Path | ReadonlyPath | PathItem;

type TupleLength<A extends unknown[]> = A extends unknown ? (number extends A['length'] ? never : A['length']) : never;

type PickArray<U extends unknown[], I extends number> = U[I];
type PickObject<U extends object, K extends keyof U> = U[K];

export interface NoMatch {
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

export type PickDeepInternalNormalized<U, P> =
  true extends IsEmptyPath<P>
    ? U
    : P extends unknown[]
      ? PickDeepInternal<U, P>
      : P extends readonly unknown[]
        ? PickDeepInternal<U, [...P]>
        : // When it cannot be narrowly determined, widen to ensure false positives / negatives are avoided.
          any;

export type PickDeep<
  U,
  P extends AnyPath,
  Result = PickDeepInternalNormalized<U, ParsePath<P>>,
> = NoMatch extends Result ? undefined : UnknownMatch extends Result ? any : Result;

export type MatchingArg<A extends unknown[], I extends number> = A extends [infer _Next, ...infer Rest]
  ? `${I}` extends `-${number}`
    ? `-${TupleLength<Rest>}` extends `${I}`
      ? Rest[0]
      : MatchingArg<Rest, I>
    : A[I]
  : undefined;
