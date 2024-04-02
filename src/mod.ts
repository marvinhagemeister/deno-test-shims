import process from "node:process";
import { afterAll, beforeAll } from "@std/testing/bdd";
export * from "@std/testing/bdd";

// @ts-ignore node shim
globalThis.process = process;

export const after = afterAll;
export const before = beforeAll;
