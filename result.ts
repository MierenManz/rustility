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

const UNWRAP_ERROR_ERROR = new Error("Tried to unwrap error when value was Ok");
const UNWRAP_ERROR = new Error("Tried to unwrap value when value was Error");

export function Ok<Ok, Err>(val: Ok): Result<Ok, Err> {
  return {
    unwrap: () => val,
    unwrapErr: () => {
      throw UNWRAP_ERROR_ERROR;
    },
    isErr: () => false,
    isOk: () => true,
  };
}

export function Err<Ok, Err>(val: Err): Result<Ok, Err> {
  return {
    unwrap: () => {
      throw UNWRAP_ERROR;
    },
    unwrapErr: () => val,
    isErr: () => true,
    isOk: () => false,
  };
}
