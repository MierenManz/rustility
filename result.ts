type ResultTypes = "ok" | "err";

export class Result<Ok, Err> {
  #ok: Ok | null = null;
  #err: Err | null = null;
  #isOkay: boolean;

  constructor(res: "ok", value: Ok);
  constructor(res: "err", value: Err);
  constructor(res: ResultTypes, value: Ok | Err) {
    this.#isOkay = res === "ok";
    this.#isOkay ? this.#ok = value as Ok : this.#err = value as Err;
  }

  public unwrap(): Ok {
    if (this.#isOkay) return this.#ok!;
    throw new Error("Tried to unwrap value when value was err");
  }

  public unwrapErr(): Err {
    if (!this.#isOkay) return this.#err!;
    throw new Error("Tried to unwrap error when value was ok");
  }

  public isErr(): boolean {
    return !this.#isOkay;
  }

  public isOk(): boolean {
    return this.#isOkay;
  }
}

export function Ok<Ok, Err>(val: Ok): Result<Ok, Err> {
  return new Result("ok", val);
}

export function Err<Ok, Err>(val: Err): Result<Ok, Err> {
  return new Result("err", val);
}
