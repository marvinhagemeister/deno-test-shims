import process from "node:process";
import { Buffer } from "node:buffer";
import { afterAll, beforeAll, it } from "@std/testing/bdd";
export * from "@std/testing/bdd";
export * from "@std/expect";
export { createMockFn, type Mock } from "./mock.ts";
import { createMockFn } from "./mock.ts";

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
