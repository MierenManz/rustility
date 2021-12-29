import { None, Some } from "./option.ts";
import {
  assertEquals,
  assertThrows,
  assert
} from "https://deno.land/std@0.115.1/testing/asserts.ts";

Deno.test({
  name: "Some Test",
  fn: function () {
    const res = Some("Some string");

    assertEquals(res.unwrap(), "Some string");
    assertEquals(res.unwrapOr("not some"), "Some string");
    assertEquals(res.unwrapOrElse(() => "not some"), "Some string");
    assertEquals(res.isSome(), true);
    assertEquals(res.isNone(), false);
  },
});

Deno.test({
  name: "None Test",
  fn: function () {
    const res = None;

    assertThrows(res.unwrap);
    assertEquals(res.unwrapOr("not none"), "not none");
    assertEquals(res.unwrapOrElse(() => "not none"), "not none");
    assertEquals(res.isSome(), false);
    assertEquals(res.isNone(), true);
  },
});
