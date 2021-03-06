import { match } from "./match.ts";
import { Err, Ok } from "./result.ts";
import { None, Some } from "./option.ts";
import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";

Deno.test({
  name: "match option",
  fn: function () {
    const someValue = match(Some("str"), {
      Some: (v) => v,
      None: () => undefined,
    });
    assertEquals(someValue, "str");

    const noneValue = match(None, {
      Some: (_) => true,
      None: () => false,
    });
    assertEquals(noneValue, false);
  },
});

Deno.test({
  name: "match result",
  fn: function () {
    const okayValue = match(Ok("ok"), {
      Ok: (val) => val,
      Err: () => "WRONG",
    });
    assertEquals(okayValue, "ok");

    const errValue = match(Err("err"), {
      Ok: () => "WRONG",
      Err: (val) => val,
    });

    assertEquals(errValue, "err");
  },
});

Deno.test({
  name: "match string",
  fn: function () {
    const value1 = match("str", {
      str: (val) => val,
      _: () => "REST",
    });
    assertEquals(value1, "str");

    const value2 = match("not", {
      str: (val) => val,
      _: () => "REST",
    });

    assertEquals(value2, "REST");

    try {
      match("no rest", {
        str: (val) => val,
      });
    } catch (e) {
      assertEquals(
        e.message,
        'No matching pattern found. Use "_" as a rest pattern',
      );
    }
  },
});
