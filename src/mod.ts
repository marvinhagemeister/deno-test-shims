import process from "node:process";
import { Buffer } from "node:buffer";
import { afterAll, beforeAll, it } from "@std/testing/bdd";
export * from "@std/testing/bdd";
export * from "@std/expect";

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
  fn: mockFn,
};

// @ts-ignore shim for vitest
globalThis.vi = vi;

export interface Mock {
  mock: {
    calls: unknown[][];
  };
  mockClear(): void;
}

// deno-lint-ignore no-explicit-any
function mockFn<T extends (...args: any[]) => any>(fn?: T): T & Mock {
  const state = {
    // deno-lint-ignore no-explicit-any
    calls: [] as any[],
  };

  // deno-lint-ignore no-explicit-any
  function mockInner(...args: any[]) {
    state.calls.push(args);
    return fn?.apply(null, args);
  }
  mockInner.mockClear = () => {
    state.calls = [];
  };
  mockInner.mock = state;

  return mockInner as unknown as T & Mock;
}
