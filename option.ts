type FnOnce<R> = () => R;

export interface Option<T> {
  isSome(): boolean;
  isNone(): boolean;
  unwrap(): T | never;
  unwrapOr<D>(val: D): D | T;
  unwrapOrElse<R>(fnOnce: FnOnce<R>): T | R;
}

export function Some<T>(value: T): Option<T> {
  return {
    isNone: () => false,
    isSome: () => true,
    unwrap: () => value,
    unwrapOr: (_) => value,
    unwrapOrElse: (_) => value,
  };
}

export const None: Option<never> = {
  isNone: () => true,
  isSome: () => false,
  unwrap: () => {
    throw new Error("Tried to unwrap value when value was None");
  },
  unwrapOr: (val) => val,
  unwrapOrElse: (fn) => fn(),
};
