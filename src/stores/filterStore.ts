import { create } from "zustand";

import { FilterState } from "../types";

interface FilterStore extends FilterState {
  toggleTag: (tag: string) => void;
  setSearchQuery: (query: string) => void;
  setCustomerFilter: (customer: string) => void;
  clearAllFilters: () => void;
  clearTags: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedTags: [],
  searchQuery: "",
  selectedCustomer: "",

  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setCustomerFilter: (customer) => set({ selectedCustomer: customer }),

  clearAllFilters: () =>
    set({
      selectedTags: [],
      searchQuery: "",
      selectedCustomer: "",
    }),

  clearTags: () => set({ selectedTags: [] }),
}));
