import type { Result } from "./result.ts";
import type { Option } from "./option.ts";
import { IDENTIFIER } from "./_common.ts";

interface MatchResultPattern<Ok, Err, Res> {
  Ok(value: Ok): Res;
  Err(value: Err): Res;
}

interface MatchOptionPattern<T, Res> {
  Some(value: T): Res;
  None(): Res;
}

interface MatchPattern<Value, Res> {
  [key: string]: (value: Value) => Res;
  [key: number]: (value: Value) => Res;
  _: (value: Value) => Res;
}

export function match<Value extends string | number, Res>(
  value: Value,
  pattern: Partial<MatchPattern<Value, Res>>,
): Res;

export function match<Ok, Err, Res>(
  result: Result<Ok, Err>,
  pattern: MatchResultPattern<Ok, Err, Res>,
): Res;

export function match<T, Res>(
  option: Option<T>,
  pattern: MatchOptionPattern<T, Res>,
): Res;

export function match<T, Ok, Err, Res, Value extends string | number>(
  value: Result<Ok, Err> | Option<T> | Value,
  pattern:
    | MatchResultPattern<Ok, Err, Res>
    | MatchOptionPattern<T, Res>
    | Partial<MatchPattern<Value, Res>>,
): Res {
  if (typeof value === "object") {
    // Either `Result<Ok, Err>` or `Option<T>`
    return value[IDENTIFIER] === "option"
      ? matchOption(
        value,
        pattern as MatchOptionPattern<T, Res>,
      )
      : matchResult(
        value,
        pattern as MatchResultPattern<Ok, Err, Res>,
      );
  }

  // Either string or number
  const func = (pattern as MatchPattern<Value, Res>)[value] ??
    (pattern as MatchPattern<Value, Res>)["_"];

  if (func) return func(value);

  throw new Error('No matching pattern found. Use "_" as a rest pattern');
}

function matchResult<Ok, Err, Res>(
  res: Result<Ok, Err>,
  pattern: MatchResultPattern<Ok, Err, Res>,
): Res {
  return res.isOk ? pattern.Ok(res.unwrap()) : pattern.Err(res.unwrapErr());
}

function matchOption<T, Res>(
  option: Option<T>,
  pattern: MatchOptionPattern<T, Res>,
): Res {
  return option.isSome ? pattern.Some(option.unwrap()) : pattern.None();
}
