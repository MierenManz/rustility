import { Err, Ok } from "./result.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.128.0/testing/asserts.ts";

Deno.test({
  name: "Ok Test",
  fn: function () {
    const res = Ok("unwrap string");

    assertEquals(res.unwrap(), "unwrap string");
    assertThrows(res.unwrapErr);
    assertEquals(res.isOk(), true);
    assertEquals(res.isErr(), false);
  },
});

Deno.test({
  name: "Err test",
  fn: function () {
    const res = Err("unwrap string");

    assertEquals(res.unwrapErr(), "unwrap string");
    assertThrows(res.unwrap);
    assertEquals(res.isErr(), true);
    assertEquals(res.isOk(), false);
  },
});

Deno.test({
  name: "inner",
  fn: function () {
    const err = Err("error");
    const err2 = Err(err);
    assertEquals(err.unwrapErr(), err2.unwrapErr());
    assertThrows(err2.unwrap);
    assertEquals(err2.unwrapErr(), "error");

    const ok = Ok("okay");
    const ok2 = Ok(ok);
    assertEquals(ok.unwrap(), ok2.unwrap());
    assertThrows(ok2.unwrapErr);
    assertEquals(ok2.unwrap(), "okay");
  },
});
