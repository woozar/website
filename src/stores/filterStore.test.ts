import { beforeEach, describe, expect, it } from "vitest";

import { useFilterStore } from "./filterStore";

describe("filterStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useFilterStore.getState().clearAllFilters();
  });

  describe("initial state", () => {
    it("should have correct initial state", () => {
      const state = useFilterStore.getState();

      expect(state.selectedTags).toEqual([]);
      expect(state.searchQuery).toBe("");
      expect(state.selectedCustomer).toBe("");
    });

    it("should have all required methods", () => {
      const state = useFilterStore.getState();

      expect(typeof state.toggleTag).toBe("function");
      expect(typeof state.setSearchQuery).toBe("function");
      expect(typeof state.setCustomerFilter).toBe("function");
      expect(typeof state.clearAllFilters).toBe("function");
      expect(typeof state.clearTags).toBe("function");
    });
  });

  describe("toggleTag", () => {
    it("should add a tag when not present", () => {
      const { toggleTag } = useFilterStore.getState();

      toggleTag("React");

      expect(useFilterStore.getState().selectedTags).toEqual(["React"]);
    });

    it("should remove a tag when already present", () => {
      const { toggleTag } = useFilterStore.getState();

      toggleTag("React");
      expect(useFilterStore.getState().selectedTags).toEqual(["React"]);

      toggleTag("React");
      expect(useFilterStore.getState().selectedTags).toEqual([]);
    });

    it("should handle multiple tags", () => {
      const { toggleTag } = useFilterStore.getState();

      toggleTag("React");
      toggleTag("Vue");
      toggleTag("Angular");

      expect(useFilterStore.getState().selectedTags).toEqual([
        "React",
        "Vue",
        "Angular",
      ]);
    });

    it("should toggle specific tag without affecting others", () => {
      const { toggleTag } = useFilterStore.getState();

      toggleTag("React");
      toggleTag("Vue");
      toggleTag("Angular");

      toggleTag("Vue");

      expect(useFilterStore.getState().selectedTags).toEqual([
        "React",
        "Angular",
      ]);
    });

    it("should handle empty string tags", () => {
      const { toggleTag } = useFilterStore.getState();

      toggleTag("");

      expect(useFilterStore.getState().selectedTags).toEqual([""]);
    });

    it("should handle duplicate toggles correctly", () => {
      const { toggleTag } = useFilterStore.getState();

      toggleTag("React");
      toggleTag("React");
      toggleTag("React");

      expect(useFilterStore.getState().selectedTags).toEqual(["React"]);
    });
  });

  describe("setSearchQuery", () => {
    it("should set search query", () => {
      const { setSearchQuery } = useFilterStore.getState();

      setSearchQuery("react projects");

      expect(useFilterStore.getState().searchQuery).toBe("react projects");
    });

    it("should update search query", () => {
      const { setSearchQuery } = useFilterStore.getState();

      setSearchQuery("first query");
      expect(useFilterStore.getState().searchQuery).toBe("first query");

      setSearchQuery("second query");
      expect(useFilterStore.getState().searchQuery).toBe("second query");
    });

    it("should handle empty search query", () => {
      const { setSearchQuery } = useFilterStore.getState();

      setSearchQuery("some query");
      setSearchQuery("");

      expect(useFilterStore.getState().searchQuery).toBe("");
    });

    it("should handle special characters in search query", () => {
      const { setSearchQuery } = useFilterStore.getState();

      const specialQuery = 'react & vue.js (2024) - "modern frameworks"';
      setSearchQuery(specialQuery);

      expect(useFilterStore.getState().searchQuery).toBe(specialQuery);
    });
  });

  describe("setCustomerFilter", () => {
    it("should set customer filter", () => {
      const { setCustomerFilter } = useFilterStore.getState();

      setCustomerFilter("Siemens AG");

      expect(useFilterStore.getState().selectedCustomer).toBe("Siemens AG");
    });

    it("should update customer filter", () => {
      const { setCustomerFilter } = useFilterStore.getState();

      setCustomerFilter("Siemens AG");
      expect(useFilterStore.getState().selectedCustomer).toBe("Siemens AG");

      setCustomerFilter("KUKA");
      expect(useFilterStore.getState().selectedCustomer).toBe("KUKA");
    });

    it("should handle empty customer filter", () => {
      const { setCustomerFilter } = useFilterStore.getState();

      setCustomerFilter("Siemens AG");
      setCustomerFilter("");

      expect(useFilterStore.getState().selectedCustomer).toBe("");
    });

    it("should handle special characters in customer name", () => {
      const { setCustomerFilter } = useFilterStore.getState();

      const customerName = "DMG Mori Software Solution GmbH & Co. KG";
      setCustomerFilter(customerName);

      expect(useFilterStore.getState().selectedCustomer).toBe(customerName);
    });

    it("should not affect other filters when setting customer", () => {
      const { toggleTag, setSearchQuery, setCustomerFilter } =
        useFilterStore.getState();

      toggleTag("React");
      setSearchQuery("test query");
      setCustomerFilter("Siemens AG");

      const state = useFilterStore.getState();
      expect(state.selectedTags).toEqual(["React"]);
      expect(state.searchQuery).toBe("test query");
      expect(state.selectedCustomer).toBe("Siemens AG");
    });
  });

  describe("clearAllFilters", () => {
    it("should clear all filters when called", () => {
      const { toggleTag, setSearchQuery, setCustomerFilter, clearAllFilters } =
        useFilterStore.getState();

      // Set some filters
      toggleTag("React");
      toggleTag("Vue");
      toggleTag("TypeScript");
      toggleTag("JavaScript");
      setSearchQuery("test query");
      setCustomerFilter("Siemens AG");

      // Verify filters are set
      expect(useFilterStore.getState().selectedTags).toEqual([
        "React",
        "Vue",
        "TypeScript",
        "JavaScript",
      ]);
      expect(useFilterStore.getState().searchQuery).toBe("test query");
      expect(useFilterStore.getState().selectedCustomer).toBe("Siemens AG");

      // Clear all filters
      clearAllFilters();

      // Verify all filters are cleared
      expect(useFilterStore.getState().selectedTags).toEqual([]);
      expect(useFilterStore.getState().searchQuery).toBe("");
      expect(useFilterStore.getState().selectedCustomer).toBe("");
    });

    it("should work when filters are already empty", () => {
      const { clearAllFilters } = useFilterStore.getState();

      clearAllFilters();

      expect(useFilterStore.getState().selectedTags).toEqual([]);
      expect(useFilterStore.getState().searchQuery).toBe("");
      expect(useFilterStore.getState().selectedCustomer).toBe("");
    });

    it("should clear customer filter along with other filters", () => {
      const { setCustomerFilter, clearAllFilters } = useFilterStore.getState();

      setCustomerFilter("KUKA");
      expect(useFilterStore.getState().selectedCustomer).toBe("KUKA");

      clearAllFilters();
      expect(useFilterStore.getState().selectedCustomer).toBe("");
    });
  });

  describe("clearTags", () => {
    it("should clear only tags", () => {
      const { toggleTag, setSearchQuery, setCustomerFilter, clearTags } =
        useFilterStore.getState();

      toggleTag("React");
      toggleTag("Vue");
      toggleTag("TypeScript");
      setSearchQuery("test query");
      setCustomerFilter("Siemens AG");

      clearTags();

      expect(useFilterStore.getState().selectedTags).toEqual([]);
      expect(useFilterStore.getState().searchQuery).toBe("test query");
      expect(useFilterStore.getState().selectedCustomer).toBe("Siemens AG");
    });

    it("should work when tags are already empty", () => {
      const { setSearchQuery, setCustomerFilter, clearTags } =
        useFilterStore.getState();

      setSearchQuery("test query");
      setCustomerFilter("KUKA");

      clearTags();

      expect(useFilterStore.getState().selectedTags).toEqual([]);
      expect(useFilterStore.getState().searchQuery).toBe("test query");
      expect(useFilterStore.getState().selectedCustomer).toBe("KUKA");
    });

    it("should not affect customer filter when clearing only tags", () => {
      const { toggleTag, setCustomerFilter, clearTags } =
        useFilterStore.getState();

      toggleTag("React");
      setCustomerFilter("DMG MORI");

      expect(useFilterStore.getState().selectedTags).toEqual(["React"]);
      expect(useFilterStore.getState().selectedCustomer).toBe("DMG MORI");

      clearTags();

      expect(useFilterStore.getState().selectedTags).toEqual([]);
      expect(useFilterStore.getState().selectedCustomer).toBe("DMG MORI");
    });
  });

  describe("store integration", () => {
    it("should handle unified tag system correctly", () => {
      const { toggleTag } = useFilterStore.getState();

      toggleTag("React");
      toggleTag("TypeScript");

      expect(useFilterStore.getState().selectedTags).toEqual([
        "React",
        "TypeScript",
      ]);

      // Toggle same tag should remove it
      toggleTag("React");
      expect(useFilterStore.getState().selectedTags).toEqual(["TypeScript"]);
    });

    it("should notify subscribers on state changes", () => {
      const subscriber = vi.fn();

      const unsubscribe = useFilterStore.subscribe(subscriber);

      useFilterStore.getState().toggleTag("React");

      expect(subscriber).toHaveBeenCalledWith(
        expect.objectContaining({ selectedTags: ["React"] }),
        expect.objectContaining({ selectedTags: [] })
      );

      unsubscribe();
    });

    it("should handle complex filtering scenarios", () => {
      const {
        toggleTag,
        setSearchQuery,
        setCustomerFilter,
        clearTags,
        clearAllFilters,
      } = useFilterStore.getState();

      // Complex scenario
      toggleTag("AI");
      toggleTag("Web Development");
      toggleTag("React");
      toggleTag("TypeScript");
      toggleTag("Node.js");
      setSearchQuery("modern web app");
      setCustomerFilter("Siemens AG");

      const fullState = useFilterStore.getState();
      expect(fullState.selectedTags).toEqual([
        "AI",
        "Web Development",
        "React",
        "TypeScript",
        "Node.js",
      ]);
      expect(fullState.searchQuery).toBe("modern web app");
      expect(fullState.selectedCustomer).toBe("Siemens AG");

      // Partial clear
      clearTags();
      expect(useFilterStore.getState().selectedTags).toEqual([]);
      expect(useFilterStore.getState().searchQuery).toBe("modern web app");
      expect(useFilterStore.getState().selectedCustomer).toBe("Siemens AG");

      // Complete clear
      clearAllFilters();
      expect(useFilterStore.getState().selectedTags).toEqual([]);
      expect(useFilterStore.getState().searchQuery).toBe("");
      expect(useFilterStore.getState().selectedCustomer).toBe("");
    });
  });
});
