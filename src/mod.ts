import process from "node:process";
import { Buffer } from "node:buffer";
import { createRequire } from "node:module";
import { afterAll, beforeAll, it } from "@std/testing/bdd";
import { fn } from "@std/expect";
export * from "@std/testing/bdd";
export * from "@std/expect";

// @ts-ignore node shim
globalThis.process = process;
// @ts-ignore node shim
globalThis.Buffer = Buffer;
// @ts-ignore node shim, not entirely accurate but works well enough for
// bare specifiers
globalThis.require = createRequire(import.meta.url);
// @ts-ignore shim for vitest
globalThis.vi = {
  fn,
};

export const after = afterAll;
export const before = beforeAll;
export const test = it;
