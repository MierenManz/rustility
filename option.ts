/**
 * DO NOT USE THIS SYMBOL OUTSIDE OF THIS MODULE!
 */
export const OPTION_IDENTIFIER = Symbol("[[OPTION IDENTIFIER]]");

export interface Option<T> {
  [identifier: typeof OPTION_IDENTIFIER | symbol]: "option";
  isSome(): boolean;
  isNone(): boolean;
  unwrap(): T | never;
  unwrapOr<D>(val: D): D | T;
  unwrapOrElse<R>(fnOnce: () => R): T | R;
}

export function Some<T>(value: T): Option<T> {
  return {
    [OPTION_IDENTIFIER]: "option" as const,
    isNone: () => false,
    isSome: () => true,
    unwrap: () => value,
    unwrapOr: (_) => value,
    unwrapOrElse: (_) => value,
  };
}

export const None: Option<never> = {
  [OPTION_IDENTIFIER]: "option" as const,
  isNone: () => true,
  isSome: () => false,
  unwrap: () => {
    throw new Error("Tried to unwrap value when value was None");
  },
  unwrapOr: (val) => val,
  unwrapOrElse: (fn) => fn(),
};
