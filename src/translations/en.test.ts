import { describe, expect, it } from "vitest";

import { en } from "./en";

describe("English translations (en)", () => {
  it("should have working showingCount function", () => {
    expect(typeof en.projects.showingCount).toBe("function");
    expect(en.projects.showingCount(5, 10)).toBe("Showing 5 of 10 projects");
    expect(en.projects.showingCount(1, 3)).toBe("Showing 1 of 3 projects");
    expect(en.projects.showingCount(0, 5)).toBe("Showing 0 of 5 projects");
  });
});
