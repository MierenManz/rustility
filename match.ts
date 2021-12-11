import type { Result } from "./result.ts";

interface MatchResult<Ok, Err, Res> {
  Ok: (value: Ok) => Res;
  Err: (value: Err) => Res;
}

interface MatchPattern<Value, Res> {
  [key: string]: (value: Value) => Res;
  [key: number]: (value: Value) => Res;
  _: (value: Value) => Res;
}

export function match<Value extends string | number, Res>(
  value: Value,
  matchPattern: Partial<MatchPattern<Value, Res>>,
): Res;

export function match<Ok, Err, Res>(
  res: Result<Ok, Err>,
  match: MatchResult<Ok, Err, Res>,
): Res;

export function match<Ok, Err, Res, Value extends string | number>(
  value: Result<Ok, Err> | Value,
  matchPattern: MatchResult<Ok, Err, Res> | Partial<MatchPattern<Value, Res>>,
): Res {
  if (typeof value === "object") {
    if (value.isOk()) {
      return (matchPattern as MatchResult<Ok, Err, Res>).Ok(value.unwrap());
    }
    return (matchPattern as MatchResult<Ok, Err, Res>).Err(value.unwrapErr());
  }

  // deno-fmt-ignore
  const func =
      (matchPattern as MatchPattern<Value, Res>)[value] ??
      (matchPattern as MatchPattern<Value, Res>)["_"];

  if (func) return func(value);

  throw Error('No matching pattern found. Use "_" as a rest pattern');
}
