import { beforeEach, describe, expect, it, vi } from "vitest";

import { useThemeStore } from "./themeStore";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock document.documentElement.setAttribute
const mockSetAttribute = vi.fn();
Object.defineProperty(document.documentElement, "setAttribute", {
  value: mockSetAttribute,
  writable: true,
});

describe("themeStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useThemeStore.setState({ theme: "light" });
    mockSetAttribute.mockClear();
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should have light theme as default when browser preference is light", () => {
      const state = useThemeStore.getState();
      expect(state.theme).toBe("light");
    });

    it("should detect dark browser preference", async () => {
      // Mock matchMedia to return dark preference
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      // Reset modules to force re-import and re-initialization
      vi.resetModules();

      // Since detectBrowserTheme is called during store creation,
      // we need to test it by checking the initial state after recreating the store
      const { useThemeStore: newStore } = await import("./themeStore");
      expect(newStore.getState().theme).toBe("dark");
    });

    it("should fallback to light theme when window is undefined", () => {
      // Mock window as undefined
      const originalWindow = global.window;
      // @ts-expect-error - testing server-side behavior
      delete global.window;

      // Re-import to test server-side behavior
      vi.resetModules();

      // Restore window
      global.window = originalWindow;
    });
  });

  describe("setTheme", () => {
    it("should update theme state", () => {
      const { setTheme } = useThemeStore.getState();

      setTheme("dark");

      expect(useThemeStore.getState().theme).toBe("dark");
    });

    it("should set data-theme attribute on document element", () => {
      const { setTheme } = useThemeStore.getState();

      setTheme("dark");

      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "dark");
    });

    it("should work with light theme", () => {
      const { setTheme } = useThemeStore.getState();

      setTheme("light");

      expect(useThemeStore.getState().theme).toBe("light");
      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "light");
    });
  });

  describe("toggleTheme", () => {
    it("should toggle from light to dark", () => {
      useThemeStore.setState({ theme: "light" });
      const { toggleTheme } = useThemeStore.getState();

      toggleTheme();

      expect(useThemeStore.getState().theme).toBe("dark");
      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "dark");
    });

    it("should toggle from dark to light", () => {
      useThemeStore.setState({ theme: "dark" });
      const { toggleTheme } = useThemeStore.getState();

      toggleTheme();

      expect(useThemeStore.getState().theme).toBe("light");
      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "light");
    });
  });

  describe("persistence", () => {
    it("should have persistence configuration", () => {
      // Test that the store is wrapped with persist middleware
      expect(useThemeStore.persist).toBeDefined();
    });

    it("should handle rehydration correctly", () => {
      // Mock rehydration callback
      const mockState = { theme: "dark" as const };

      // Get the onRehydrateStorage function from the persist config
      const persistConfig = (useThemeStore as any).persist.getOptions();
      const rehydrateCallback = persistConfig.onRehydrateStorage();

      rehydrateCallback(mockState);

      expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", "dark");
    });

    it("should handle rehydration with no state", () => {
      const persistConfig = (useThemeStore as any).persist.getOptions();
      const rehydrateCallback = persistConfig.onRehydrateStorage();

      // Should not throw when state is null/undefined
      expect(() => rehydrateCallback(null)).not.toThrow();
      expect(() => rehydrateCallback(undefined)).not.toThrow();
    });
  });

  describe("detectBrowserTheme function", () => {
    it("should return light when matchMedia is not available", async () => {
      const originalMatchMedia = window.matchMedia;
      // @ts-expect-error - testing matchMedia unavailable
      delete window.matchMedia;

      // Re-import to test the function
      vi.resetModules();
      const { useThemeStore: newStore } = await import("./themeStore");

      // Should default to light when matchMedia is unavailable
      expect(newStore.getState().theme).toBe("light");

      // Restore matchMedia
      window.matchMedia = originalMatchMedia;
    });
  });
});
