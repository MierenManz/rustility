import { type FnOnce, IDENTIFIER } from "./_common.ts";

export interface Result<Ok, Err> {
  [IDENTIFIER]: "result";
  unwrap(): Ok;
  unwrapErr(): Err;
  unwrapOr<T>(val: T): Ok | T;
  unwrapOrElse<T>(fnOnce: FnOnce<T>): Ok | T;
  readonly isErr: boolean;
  readonly isOk: boolean;
}

export function Ok<Ok>(val: Ok): Result<Ok, unknown> {
  return {
    [IDENTIFIER]: "result",
    unwrap: () => val,
    unwrapErr() {
      throw new Error("Tried to unwrap error when variant is Ok");
    },
    unwrapOr(_) {
      return this.unwrap();
    },
    unwrapOrElse(_) {
      return this.unwrap();
    },
    isErr: false,
    isOk: true,
  };
}

export function Err<Err>(val: Err): Result<unknown, Err> {
  return {
    [IDENTIFIER]: "result",
    unwrap() {
      throw new Error("Tried to unwrap value when variant is Err");
    },
    unwrapErr: () => val,
    unwrapOr: <T>(v: T) => v,
    unwrapOrElse: <T>(fnOnce: FnOnce<T>) => fnOnce(),
    isErr: true,
    isOk: false,
  };
}
