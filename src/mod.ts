import process from "node:process";
import { Buffer } from "node:buffer";
import { createRequire } from "node:module";
import { afterAll, beforeAll } from "@std/testing/bdd";
export * from "@std/testing/bdd";

// @ts-ignore node shim
globalThis.process = process;
// @ts-ignore node shim
globalThis.Buffer = Buffer;
// @ts-ignore node shim, not entirely accurate but works well enough for
// bare specifiers
globalThis.require = createRequire(import.meta.url);

export const after = afterAll;
export const before = beforeAll;
