import { IDENTIFIER } from "./_symbol.ts";

export interface Result<Ok, Err> {
  [IDENTIFIER]: "result";
  unwrap(): Ok;
  unwrapErr(): Err;
  isErr(): boolean;
  isOk(): boolean;
}

export function Ok<T>(val: T): Result<T, never> {
  return {
    [IDENTIFIER]: "result",
    unwrap: () => val,
    unwrapErr: () => {
      throw new Error("Tried to unwrap error when value was Ok");
    },
    isErr: () => false,
    isOk: () => true,
  };
}

export function Err<T>(val: T): Result<never, T> {
  return {
    [IDENTIFIER]: "result",
    unwrap: () => {
      throw new Error("Tried to unwrap value when value was Error");
    },
    unwrapErr: () => val,
    isErr: () => true,
    isOk: () => false,
  };
}
