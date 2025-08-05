import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Language, useLanguageStore } from "./languageStore";

// Mock zustand persist
vi.mock("zustand/middleware", () => ({
  persist: (fn: any) => fn,
}));

describe("languageStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear the store state between tests
    useLanguageStore.setState({
      language: "en",
      setLanguage: useLanguageStore.getState().setLanguage,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("detectBrowserLanguage", () => {
    const originalNavigator = window.navigator;

    afterEach(() => {
      Object.defineProperty(window, "navigator", {
        value: originalNavigator,
        writable: true,
      });
    });

    it("should detect English language from navigator.language", async () => {
      Object.defineProperty(window, "navigator", {
        value: {
          ...originalNavigator,
          language: "en-US",
          languages: ["en-US", "en"],
        },
        writable: true,
      });

      // Re-import to get fresh module with new navigator
      vi.resetModules();
      const { useLanguageStore: freshStore } = await import("./languageStore");

      expect(freshStore.getState().language).toBe("en");
    });

    it("should detect English language from navigator.language (en-GB)", async () => {
      Object.defineProperty(window, "navigator", {
        value: {
          ...originalNavigator,
          language: "en-GB",
          languages: ["en-GB"],
        },
        writable: true,
      });

      vi.resetModules();
      const { useLanguageStore: freshStore } = await import("./languageStore");

      expect(freshStore.getState().language).toBe("en");
    });

    it("should default to German for non-English languages", async () => {
      Object.defineProperty(window, "navigator", {
        value: {
          ...originalNavigator,
          language: "fr-FR",
          languages: ["fr-FR"],
        },
        writable: true,
      });

      vi.resetModules();
      const { useLanguageStore: freshStore } = await import("./languageStore");

      expect(freshStore.getState().language).toBe("de");
    });

    it("should default to German for German language", async () => {
      Object.defineProperty(window, "navigator", {
        value: {
          ...originalNavigator,
          language: "de-DE",
          languages: ["de-DE"],
        },
        writable: true,
      });

      vi.resetModules();
      const { useLanguageStore: freshStore } = await import("./languageStore");

      expect(freshStore.getState().language).toBe("de");
    });

    it("should handle navigator.languages fallback", async () => {
      Object.defineProperty(window, "navigator", {
        value: {
          ...originalNavigator,
          language: undefined,
          languages: ["en-US", "en"],
        },
        writable: true,
      });

      vi.resetModules();
      const { useLanguageStore: freshStore } = await import("./languageStore");

      expect(freshStore.getState().language).toBe("en");
    });

    it("should default to German when no language is available", async () => {
      Object.defineProperty(window, "navigator", {
        value: {
          ...originalNavigator,
          language: undefined,
          languages: undefined,
        },
        writable: true,
      });

      vi.resetModules();
      const { useLanguageStore: freshStore } = await import("./languageStore");

      expect(freshStore.getState().language).toBe("de");
    });

    it("should handle case insensitive language detection", async () => {
      Object.defineProperty(window, "navigator", {
        value: {
          ...originalNavigator,
          language: "EN-us",
          languages: ["EN-us"],
        },
        writable: true,
      });

      vi.resetModules();
      const { useLanguageStore: freshStore } = await import("./languageStore");

      expect(freshStore.getState().language).toBe("en");
    });
  });

  describe("store functionality", () => {
    it("should have initial state with correct language", () => {
      const state = useLanguageStore.getState();

      expect(state.language).toBeDefined();
      expect(["de", "en"]).toContain(state.language);
      expect(typeof state.setLanguage).toBe("function");
    });

    it("should set language to German", () => {
      const { setLanguage } = useLanguageStore.getState();

      setLanguage("de");

      expect(useLanguageStore.getState().language).toBe("de");
    });

    it("should set language to English", () => {
      const { setLanguage } = useLanguageStore.getState();

      setLanguage("en");

      expect(useLanguageStore.getState().language).toBe("en");
    });

    it("should handle multiple language changes", () => {
      const { setLanguage } = useLanguageStore.getState();

      setLanguage("de");
      expect(useLanguageStore.getState().language).toBe("de");

      setLanguage("en");
      expect(useLanguageStore.getState().language).toBe("en");

      setLanguage("de");
      expect(useLanguageStore.getState().language).toBe("de");
    });

    it("should notify subscribers when language changes", () => {
      const subscriber = vi.fn();

      const unsubscribe = useLanguageStore.subscribe(subscriber);

      useLanguageStore.getState().setLanguage("de");

      expect(subscriber).toHaveBeenCalledWith(
        expect.objectContaining({ language: "de" }),
        expect.objectContaining({ language: expect.any(String) })
      );

      unsubscribe();
    });

    it("should maintain the same setLanguage function reference", () => {
      const initialSetLanguage = useLanguageStore.getState().setLanguage;

      useLanguageStore.getState().setLanguage("de");

      const afterSetLanguage = useLanguageStore.getState().setLanguage;

      expect(initialSetLanguage).toBe(afterSetLanguage);
    });
  });

  describe("Language type constraints", () => {
    it("should accept valid Language types", () => {
      const { setLanguage } = useLanguageStore.getState();

      // These should not cause TypeScript errors
      setLanguage("de" as Language);
      expect(useLanguageStore.getState().language).toBe("de");

      setLanguage("en" as Language);
      expect(useLanguageStore.getState().language).toBe("en");
    });
  });

  describe("Edge cases", () => {
    it("should handle rapid language switches", () => {
      const { setLanguage } = useLanguageStore.getState();

      // Rapid switches
      setLanguage("de");
      setLanguage("en");
      setLanguage("de");
      setLanguage("en");

      expect(useLanguageStore.getState().language).toBe("en");
    });

    it("should handle setting the same language multiple times", () => {
      const { setLanguage } = useLanguageStore.getState();

      setLanguage("de");
      const firstState = useLanguageStore.getState();

      setLanguage("de");
      const secondState = useLanguageStore.getState();

      expect(firstState.language).toBe(secondState.language);
      expect(firstState.language).toBe("de");
    });
  });
});
