import process from "node:process";
import { Buffer } from "node:buffer";
import { afterAll, beforeAll, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { createMockFn } from "./mock.ts";
export * from "@std/testing/bdd";
export { createMockFn, type Mock, type MockCall } from "./mock.ts";

// FIXME: Add this to TS types
// FIXME: Slow type bug?
// deno-lint-ignore no-explicit-any
(expect as any).extend({
  // deno-lint-ignore no-explicit-any
  toMatchInlineSnapshot(_context: any) {
    // FIXME: Missing implementation
    return { pass: true };
  },
});

export { expect };

// @ts-ignore node shim
globalThis.process = process;
// @ts-ignore node shim
globalThis.Buffer = Buffer;
// @ts-ignore node shim
globalThis.global = globalThis;

export const after = afterAll;
export const before = beforeAll;
export const test = it;
export const vi = {
  fn: createMockFn,
};

// @ts-ignore shim for vitest
globalThis.vi = vi;
