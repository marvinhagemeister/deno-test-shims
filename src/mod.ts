import process from "node:process";
import { Buffer } from "node:buffer";
import { afterAll, beforeAll, it } from "@std/testing/bdd";
import { fn } from "@std/expect";
export * from "@std/testing/bdd";
export * from "@std/expect";

// @ts-ignore node shim
globalThis.process = process;
// @ts-ignore node shim
globalThis.Buffer = Buffer;

export const after = afterAll;
export const before = beforeAll;
export const test = it;
export const vi = {
  fn,
};

// @ts-ignore shim for vitest
globalThis.vi = vi;
