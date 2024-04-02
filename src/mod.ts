import process from "node:process";
import { Buffer } from "node:buffer";
import { afterAll, beforeAll } from "@std/testing/bdd";
export * from "@std/testing/bdd";

// @ts-ignore node shim
globalThis.process = process;
// @ts-ignore node shim
globalThis.Buffer = Buffer;

export const after = afterAll;
export const before = beforeAll;
