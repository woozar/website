import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

import { useReducedMotion } from "./useReducedMotion";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  useReducedMotion: vi.fn(),
}));

describe("useReducedMotion", () => {
  const mockUseReducedMotion = useFramerReducedMotion as ReturnType<
    typeof vi.fn
  >;

  // Store original location
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock globalThis.location.search
    Object.defineProperty(globalThis, "location", {
      value: {
        ...originalLocation,
        search: "",
      },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    // Restore original location
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
    });
    vi.clearAllMocks();
  });

  it("should return false when no motion reduction is requested", () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  it("should return true when system prefers reduced motion", () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(true);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should return true when no-motion=1 query parameter is present", () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?no-motion=1" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should return true when no-motion=true query parameter is present", () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?no-motion=true" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should return true when no-motion query parameter is present without value", () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?no-motion" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should return false when no-motion=false query parameter is present", () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?no-motion=false" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  it("should return false when no-motion=0 query parameter is present", () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?no-motion=0" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  it("should return true when both system preference and query parameter are set", () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?no-motion=1" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(true);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should work with other query parameters present", () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?lang=de&no-motion=1&theme=dark" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should return true when no-motion parameter has any value", () => {
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?no-motion=invalid" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should prioritize query parameter over system preference when both are present", () => {
    // Even if system preference is false, query parameter should enable motion reduction
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?no-motion=1" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(false);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should override system preference when no-motion=false is present", () => {
    // Even if system preference is true, no-motion=false should disable motion reduction
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, search: "?no-motion=false" },
      writable: true,
    });
    mockUseReducedMotion.mockReturnValue(true);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false); // Query parameter overrides system preference
  });
});
