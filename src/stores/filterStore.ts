import { create } from 'zustand';
import { FilterState } from '../types';

interface FilterStore extends FilterState {
  togglePrimaryTag: (tag: string) => void;
  toggleSecondaryTag: (tag: string) => void;
  setSearchQuery: (query: string) => void;
  clearAllFilters: () => void;
  clearPrimaryTags: () => void;
  clearSecondaryTags: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedPrimaryTags: [],
  selectedSecondaryTags: [],
  searchQuery: '',
  
  togglePrimaryTag: (tag) =>
    set((state) => ({
      selectedPrimaryTags: state.selectedPrimaryTags.includes(tag)
        ? state.selectedPrimaryTags.filter((t) => t !== tag)
        : [...state.selectedPrimaryTags, tag],
    })),
  
  toggleSecondaryTag: (tag) =>
    set((state) => ({
      selectedSecondaryTags: state.selectedSecondaryTags.includes(tag)
        ? state.selectedSecondaryTags.filter((t) => t !== tag)
        : [...state.selectedSecondaryTags, tag],
    })),
  
  setSearchQuery: (query) =>
    set({ searchQuery: query }),
  
  clearAllFilters: () =>
    set({
      selectedPrimaryTags: [],
      selectedSecondaryTags: [],
      searchQuery: '',
    }),
  
  clearPrimaryTags: () =>
    set({ selectedPrimaryTags: [] }),
  
  clearSecondaryTags: () =>
    set({ selectedSecondaryTags: [] }),
}));