import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

// Vitest 5 resolves custom matchers via `Matchers<R, T>`; jest-dom still augments the old `Assertion<T>` signature.
// Declaration merging needs the identical type parameters and an empty body, hence the disabled rules.
declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T = unknown,
  > extends TestingLibraryMatchers<unknown, R> {}
}
