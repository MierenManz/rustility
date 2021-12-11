export interface Result<Ok, Err> {
  unwrap(): Ok;
  unwrapErr(): Err;
  isErr(): boolean;
  isOk(): boolean;
}

export function Ok<Ok, Err>(val: Ok): Result<Ok, Err> {
  return {
    unwrap: () => val,
    unwrapErr: () => { throw new Error("Tried to unwrap error when value was ok") },
    isErr: () => false,
    isOk: () => true,
  }
}

export function Err<Ok, Err>(val: Err): Result<Ok, Err> {
  return {
    unwrap: () => { throw new Error("Tried to unwrap value when value was err") },
    unwrapErr: () => val,
    isErr: () => true,
    isOk: () => false,
  }
}
