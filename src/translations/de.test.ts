import { describe, expect, it } from "vitest";

import { de } from "./de";

describe("German translations (de)", () => {
  it("should have working showingCount function", () => {
    expect(typeof de.projects.showingCount).toBe("function");
    expect(de.projects.showingCount(5, 10)).toBe(
      "5 von 10 Projekten angezeigt"
    );
    expect(de.projects.showingCount(1, 3)).toBe("1 von 3 Projekten angezeigt");
    expect(de.projects.showingCount(0, 5)).toBe("0 von 5 Projekten angezeigt");
  });
});
