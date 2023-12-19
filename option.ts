import { type FnOnce, IDENTIFIER } from "./_common.ts";

export interface Option<T> {
  [IDENTIFIER]: "option";
  unwrap(): T | never;
  unwrapOr<D>(val: D): D | T;
  unwrapOrElse<R>(fnOnce: FnOnce<R>): T | R;
  readonly isSome: boolean;
  readonly isNone: boolean;
}

export function Some<T>(value: T): Option<T> {
  return {
    [IDENTIFIER]: "option",
    unwrap: () => value,
    unwrapOr: (_) => value,
    unwrapOrElse: (_) => value,
    isSome: true,
    isNone: false,
  };
}

export const None: Option<never> = {
  [IDENTIFIER]: "option",
  unwrap() {
    throw new Error("Tried to unwrap value when variant is None");
  },
  unwrapOr: <T>(v: T) => v,
  unwrapOrElse: <T>(fnOnce: FnOnce<T>) => fnOnce(),
  isSome: false,
  isNone: true,
};
