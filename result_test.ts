import { Err, Ok } from "./result.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.115.1/testing/asserts.ts";

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
