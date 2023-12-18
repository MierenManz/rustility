import { IDENTIFIER } from "./_symbol.ts";

export interface Option<T> {
  [IDENTIFIER]: "option";
  isSome(): boolean;
  isNone(): boolean;
  unwrap(): T | never;
  unwrapOr<D>(val: D): D | T;
  unwrapOrElse<R>(fnOnce: () => R): T | R;
}

export function Some<T>(value: T): Option<T> {
  return {
    [IDENTIFIER]: "option",
    isNone: () => false,
    isSome: () => true,
    unwrap: () => value,
    unwrapOr: (_) => value,
    unwrapOrElse: (_) => value,
  };
}

export const None: Option<never> = {
  [IDENTIFIER]: "option",
  isNone: () => true,
  isSome: () => false,
  unwrap: () => {
    throw new Error("Tried to unwrap value when value was None");
  },
  unwrapOr: (val) => val,
  unwrapOrElse: (fn) => fn(),
};
