import { Result } from "./result.ts";

interface MatchResult<Ok, Err, R> {
  ok: (value: Ok) => R;
  err: (value: Err) => R;
}

interface MatchPattern<V, R> {
  [key: string]: (val: V) => R;
  [key: number]: (val: V) => R;
  _: (val: V) => R;
}

export function match<V extends string | number, R>(
  value: V,
  matchPattern: Partial<MatchPattern<V, R>>,
): R;

export function match<Ok, Err, R>(
  res: Result<Ok, Err>,
  match: MatchResult<Ok, Err, R>,
): R;

export function match<Ok, Err, R, V extends string | number>(
  value: Result<Ok, Err> | V,
  matchPattern: MatchResult<Ok, Err, R> | Partial<MatchPattern<V, R>>,
): R {
  if (value instanceof Result) {
    if (value.isOk()) {
      return (matchPattern as MatchResult<Ok, Err, R>).ok(value.unwrap());
    }
    return (matchPattern as MatchResult<Ok, Err, R>).err(value.unwrapErr());
  }

  // deno-fmt-ignore
  const func =
      (matchPattern as MatchPattern<V, R>)[value] ??
      (matchPattern as MatchPattern<V, R>)["_"];

  if (func) return func(value);

  throw Error('No matching pattern found. Use "_" as a rest pattern');
}
