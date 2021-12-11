import { None, Some } from "./option.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.115.1/testing/asserts.ts";

Deno.test({
  name: "Some Test",
  fn: function () {
    const res = Some("Some string");

    assertEquals(res.unwrap(), "Some string");
    assertEquals(res.isSome(), true);
    assertEquals(res.isNone(), false);
  },
});

Deno.test({
  name: "None Test",
  fn: function () {
    const res = None;

    assertEquals(res.isSome(), false);
    assertEquals(res.isNone(), true);
  },
});

Deno.test({
  name: "unwraps",
  fn: function () {
    const noneValue = None;

    assertThrows(noneValue.unwrap);
  },
});
