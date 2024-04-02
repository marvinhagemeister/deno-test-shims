import { createMockFn } from "./mock.ts";
import { expect } from "@std/expect";

Deno.test("mock - calls", () => {
  const add = (a: number, b: number) => a + b;
  const spy = createMockFn(add);
  expect(spy(1, 2)).toEqual(3);
  expect(spy.mock.calls).toEqual([[1, 2]]);
});

Deno.test("mock - mockClear", () => {
  const add = (a: number, b: number) => a + b;
  const spy = createMockFn(add);

  expect(spy(1, 2)).toEqual(3);
  spy.mockClear();
  expect(spy.mock.calls).toEqual([]);
});

Deno.test("mock - without fn", () => {
  const spy = createMockFn();
  expect(spy(1, 2)).toEqual(undefined);
  expect(spy.mock.calls).toEqual([[1, 2]]);
});

Deno.test("mock - mockReturnValueOnce", () => {
  const spy = createMockFn()
    .mockReturnValueOnce(true);
  expect(spy(1, 2)).toEqual(true);
  expect(spy(1)).toEqual(undefined);
});

Deno.test("mock - mockReturnValue", () => {
  const spy = createMockFn()
    .mockReturnValue(true);
  expect(spy(1, 2)).toEqual(true);
  expect(spy(1)).toEqual(true);
});

Deno.test("mock - chain return mocks", () => {
  const spy = createMockFn()
    .mockReturnValueOnce(true)
    .mockReturnValue(false);
  expect(spy(1, 2)).toEqual(true);
  expect(spy(1)).toEqual(false);
});

Deno.test("mock - mockImplementation", () => {
  const spy = createMockFn().mockImplementation((a: number, b: number) =>
    a + b
  );
  expect(spy(1, 2)).toEqual(3);
  expect(spy(1, 3)).toEqual(4);
});

Deno.test("mock - mockImplementation", () => {
  const spy = createMockFn()
    .mockImplementationOnce(() => 1)
    .mockImplementationOnce(() => 2);

  expect(spy()).toEqual(1);
  expect(spy()).toEqual(2);
  expect(spy()).toEqual(undefined);
});

Deno.test("mock - mockRejectedValue", async () => {
  const spy = createMockFn()
    .mockRejectedValue(2);

  try {
    await spy();
    throw new Error("fail");
  } catch (err) {
    expect(err).toEqual(2);
  }
});

Deno.test("mock - mockRejectedValueOnce", async () => {
  const spy = createMockFn()
    .mockRejectedValueOnce(2);

  try {
    await spy();
    throw new Error("fail");
  } catch (err) {
    expect(err).toEqual(2);
  }

  expect(spy()).toEqual(undefined);
});

Deno.test("mock - mockReset", () => {
  const spy = createMockFn(() => 1)
    .mockReturnValue(2);

  expect(spy()).toEqual(2);

  spy.mockReset();
  expect(spy()).toEqual(undefined);
});

Deno.test("mock - mockRestore", () => {
  const spy = createMockFn(() => 1).mockImplementation(() => 2);

  expect(spy()).toEqual(2);

  spy.mockRestore();
  expect(spy()).toEqual(1);
});

Deno.test("mock - mockReturnThis", () => {
  const spy = createMockFn().mockReturnThis();
  expect(spy.call(1)).toEqual(1);
});
