/**
 * DO NOT USE THIS SYMBOL OUTSIDE OF THIS MODULE!
 */
export const RESULT_IDENTIFIER = Symbol("[[RESULT IDENTIFIER]]");

export interface Result<Ok, Err> {
  [identifier: typeof RESULT_IDENTIFIER | symbol]: "result";
  unwrap(): Ok;
  unwrapErr(): Err;
  isErr(): boolean;
  isOk(): boolean;
}

export function Ok<T>(val: T): Result<T, never> {
  return {
    [RESULT_IDENTIFIER]: "result" as const,
    unwrap: () => val,
    unwrapErr: () => {
      throw new Error("Tried to unwrap error when value was Ok");;
    },
    isErr: () => false,
    isOk: () => true,
  };
}

export function Err<T>(val: T): Result<never, T> {
  return {
    [RESULT_IDENTIFIER]: "result" as const,
    unwrap: () => {
      throw new Error("Tried to unwrap value when value was Error");;
    },
    unwrapErr: () => val,
    isErr: () => true,
    isOk: () => false,
  };
}
