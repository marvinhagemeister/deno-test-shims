// deno-lint-ignore no-explicit-any
export type AnyFn = (...args: any[]) => any;

export interface Mock {
  mock: {
    // deno-lint-ignore no-explicit-any
    calls: any[][];
  };
  mockReturnValueOnce(value: unknown): this;
  mockReturnValue(value: unknown): this;
  mockClear(): this;
  mockImplementation<U>(fn: U): U & Mock;
  mockImplementationOnce<U>(fn: U): U & Mock;
  mockRejectedValue(value: unknown): this;
  mockRejectedValueOnce(value: unknown): this;
  mockReset(): (() => undefined) & Mock;
  mockRestore(): this;
  mockReturnThis(): this;
}

interface MockState<T> {
  // deno-lint-ignore no-explicit-any
  calls: any[][];
  // deno-lint-ignore no-explicit-any
  values: { once: boolean; async: boolean; value: any }[];
  fns: { once: boolean; fn: T }[];
}

export function createMockFn<T extends AnyFn>(
  fn?: T,
): T & Mock {
  const state: MockState<T> = {
    calls: [],
    values: [],
    fns: [],
  };

  // deno-lint-ignore no-explicit-any
  function mockInner(this: any, ...args: any[]) {
    state.calls.push(args);

    if (state.values.length > 0) {
      const first = state.values[0];

      if (first.once) {
        state.values.shift();
      }

      if (first.async) {
        return Promise.reject(first.value);
      }

      return first.value;
    }

    if (state.fns.length > 0) {
      const impl = state.fns[0];
      if (impl.once) {
        state.fns.shift();
      }

      return impl.fn.apply(this, args);
    }

    if (fn !== undefined) {
      return fn.apply(this, args);
    }
  }

  const out = mockInner as unknown as Mock & T;
  out.mock = {
    get calls() {
      return state.calls;
    },
  };
  out.mockReturnValueOnce = (value: unknown) => {
    state.values.push({ once: true, value, async: false });
    return out;
  };
  out.mockReturnValue = (value: unknown) => {
    state.values.push({ once: false, value, async: false });
    return out;
  };
  out.mockClear = () => {
    state.calls = [];
    return out;
  };
  out.mockImplementation = (fn) => {
    // deno-lint-ignore no-explicit-any
    state.fns.push({ once: false, fn: fn as any });
    // deno-lint-ignore no-explicit-any
    return out as any;
  };
  out.mockImplementationOnce = (fn) => {
    // deno-lint-ignore no-explicit-any
    state.fns.push({ once: true, fn: fn as any });
    // deno-lint-ignore no-explicit-any
    return out as any;
  };
  out.mockRejectedValue = (value) => {
    state.values.push({ once: false, value, async: true });
    return out;
  };
  out.mockRejectedValueOnce = (value) => {
    state.values.push({ once: true, value, async: true });
    return out;
  };
  out.mockReset = () => {
    state.calls = [];
    state.values = [];
    // deno-lint-ignore no-explicit-any
    state.fns = [{ once: false, fn: (() => {}) as any }];
    return out;
  };
  out.mockRestore = () => {
    // deno-lint-ignore no-explicit-any
    state.fns = [{ once: false, fn: fn ?? (() => {}) as any }];
    return out;
  };
  out.mockReturnThis = () => {
    // deno-lint-ignore no-explicit-any
    out.mockImplementation(function (this: any) {
      return this;
    });
    return out;
  };

  return out;
}
