import { describe, it, expect, beforeEach } from 'vitest'
import { useFilterStore } from './filterStore'

describe('filterStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useFilterStore.getState().clearAllFilters()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useFilterStore.getState()
      
      expect(state.selectedPrimaryTags).toEqual([])
      expect(state.selectedSecondaryTags).toEqual([])
      expect(state.searchQuery).toBe('')
    })

    it('should have all required methods', () => {
      const state = useFilterStore.getState()
      
      expect(typeof state.togglePrimaryTag).toBe('function')
      expect(typeof state.toggleSecondaryTag).toBe('function')
      expect(typeof state.setSearchQuery).toBe('function')
      expect(typeof state.clearAllFilters).toBe('function')
      expect(typeof state.clearPrimaryTags).toBe('function')
      expect(typeof state.clearSecondaryTags).toBe('function')
    })
  })

  describe('togglePrimaryTag', () => {
    it('should add a primary tag when not present', () => {
      const { togglePrimaryTag } = useFilterStore.getState()
      
      togglePrimaryTag('React')
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual(['React'])
    })

    it('should remove a primary tag when already present', () => {
      const { togglePrimaryTag } = useFilterStore.getState()
      
      togglePrimaryTag('React')
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual(['React'])
      
      togglePrimaryTag('React')
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual([])
    })

    it('should handle multiple primary tags', () => {
      const { togglePrimaryTag } = useFilterStore.getState()
      
      togglePrimaryTag('React')
      togglePrimaryTag('Vue')
      togglePrimaryTag('Angular')
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual(['React', 'Vue', 'Angular'])
    })

    it('should toggle specific tag without affecting others', () => {
      const { togglePrimaryTag } = useFilterStore.getState()
      
      togglePrimaryTag('React')
      togglePrimaryTag('Vue')
      togglePrimaryTag('Angular')
      
      togglePrimaryTag('Vue')
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual(['React', 'Angular'])
    })

    it('should handle empty string tags', () => {
      const { togglePrimaryTag } = useFilterStore.getState()
      
      togglePrimaryTag('')
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual([''])
    })

    it('should handle duplicate toggles correctly', () => {
      const { togglePrimaryTag } = useFilterStore.getState()
      
      togglePrimaryTag('React')
      togglePrimaryTag('React')
      togglePrimaryTag('React')
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual(['React'])
    })
  })

  describe('toggleSecondaryTag', () => {
    it('should add a secondary tag when not present', () => {
      const { toggleSecondaryTag } = useFilterStore.getState()
      
      toggleSecondaryTag('TypeScript')
      
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual(['TypeScript'])
    })

    it('should remove a secondary tag when already present', () => {
      const { toggleSecondaryTag } = useFilterStore.getState()
      
      toggleSecondaryTag('TypeScript')
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual(['TypeScript'])
      
      toggleSecondaryTag('TypeScript')
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual([])
    })

    it('should handle multiple secondary tags', () => {
      const { toggleSecondaryTag } = useFilterStore.getState()
      
      toggleSecondaryTag('JavaScript')
      toggleSecondaryTag('TypeScript')
      toggleSecondaryTag('Python')
      
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual(['JavaScript', 'TypeScript', 'Python'])
    })

    it('should toggle specific tag without affecting others', () => {
      const { toggleSecondaryTag } = useFilterStore.getState()
      
      toggleSecondaryTag('JavaScript')
      toggleSecondaryTag('TypeScript')
      toggleSecondaryTag('Python')
      
      toggleSecondaryTag('TypeScript')
      
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual(['JavaScript', 'Python'])
    })
  })

  describe('setSearchQuery', () => {
    it('should set search query', () => {
      const { setSearchQuery } = useFilterStore.getState()
      
      setSearchQuery('react projects')
      
      expect(useFilterStore.getState().searchQuery).toBe('react projects')
    })

    it('should update search query', () => {
      const { setSearchQuery } = useFilterStore.getState()
      
      setSearchQuery('first query')
      expect(useFilterStore.getState().searchQuery).toBe('first query')
      
      setSearchQuery('second query')
      expect(useFilterStore.getState().searchQuery).toBe('second query')
    })

    it('should handle empty search query', () => {
      const { setSearchQuery } = useFilterStore.getState()
      
      setSearchQuery('some query')
      setSearchQuery('')
      
      expect(useFilterStore.getState().searchQuery).toBe('')
    })

    it('should handle special characters in search query', () => {
      const { setSearchQuery } = useFilterStore.getState()
      
      const specialQuery = 'react & vue.js (2024) - "modern frameworks"'
      setSearchQuery(specialQuery)
      
      expect(useFilterStore.getState().searchQuery).toBe(specialQuery)
    })
  })

  describe('clearAllFilters', () => {
    it('should clear all filters when called', () => {
      const { togglePrimaryTag, toggleSecondaryTag, setSearchQuery, clearAllFilters } = useFilterStore.getState()
      
      // Set some filters
      togglePrimaryTag('React')
      togglePrimaryTag('Vue')
      toggleSecondaryTag('TypeScript')
      toggleSecondaryTag('JavaScript')
      setSearchQuery('test query')
      
      // Verify filters are set
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual(['React', 'Vue'])
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual(['TypeScript', 'JavaScript'])
      expect(useFilterStore.getState().searchQuery).toBe('test query')
      
      // Clear all filters
      clearAllFilters()
      
      // Verify all filters are cleared
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual([])
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('')
    })

    it('should work when filters are already empty', () => {
      const { clearAllFilters } = useFilterStore.getState()
      
      clearAllFilters()
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual([])
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('')
    })
  })

  describe('clearPrimaryTags', () => {
    it('should clear only primary tags', () => {
      const { togglePrimaryTag, toggleSecondaryTag, setSearchQuery, clearPrimaryTags } = useFilterStore.getState()
      
      togglePrimaryTag('React')
      togglePrimaryTag('Vue')
      toggleSecondaryTag('TypeScript')
      setSearchQuery('test query')
      
      clearPrimaryTags()
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual([])
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual(['TypeScript'])
      expect(useFilterStore.getState().searchQuery).toBe('test query')
    })

    it('should work when primary tags are already empty', () => {
      const { toggleSecondaryTag, setSearchQuery, clearPrimaryTags } = useFilterStore.getState()
      
      toggleSecondaryTag('TypeScript')
      setSearchQuery('test query')
      
      clearPrimaryTags()
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual([])
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual(['TypeScript'])
      expect(useFilterStore.getState().searchQuery).toBe('test query')
    })
  })

  describe('clearSecondaryTags', () => {
    it('should clear only secondary tags', () => {
      const { togglePrimaryTag, toggleSecondaryTag, setSearchQuery, clearSecondaryTags } = useFilterStore.getState()
      
      togglePrimaryTag('React')
      toggleSecondaryTag('TypeScript')
      toggleSecondaryTag('JavaScript')
      setSearchQuery('test query')
      
      clearSecondaryTags()
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual(['React'])
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('test query')
    })

    it('should work when secondary tags are already empty', () => {
      const { togglePrimaryTag, setSearchQuery, clearSecondaryTags } = useFilterStore.getState()
      
      togglePrimaryTag('React')
      setSearchQuery('test query')
      
      clearSecondaryTags()
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual(['React'])
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('test query')
    })
  })

  describe('store integration', () => {
    it('should maintain independent primary and secondary tag arrays', () => {
      const { togglePrimaryTag, toggleSecondaryTag } = useFilterStore.getState()
      
      togglePrimaryTag('React')
      toggleSecondaryTag('React')
      
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual(['React'])
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual(['React'])
      
      // They should be independent arrays
      expect(useFilterStore.getState().selectedPrimaryTags).not.toBe(useFilterStore.getState().selectedSecondaryTags)
    })

    it('should notify subscribers on state changes', () => {
      const subscriber = vi.fn()
      
      const unsubscribe = useFilterStore.subscribe(subscriber)
      
      useFilterStore.getState().togglePrimaryTag('React')
      
      expect(subscriber).toHaveBeenCalledWith(
        expect.objectContaining({ selectedPrimaryTags: ['React'] }),
        expect.objectContaining({ selectedPrimaryTags: [] })
      )
      
      unsubscribe()
    })

    it('should handle complex filtering scenarios', () => {
      const { 
        togglePrimaryTag, 
        toggleSecondaryTag, 
        setSearchQuery,
        clearPrimaryTags,
        clearSecondaryTags,
        clearAllFilters
      } = useFilterStore.getState()
      
      // Complex scenario
      togglePrimaryTag('AI')
      togglePrimaryTag('Web Development')
      toggleSecondaryTag('React')
      toggleSecondaryTag('TypeScript')
      toggleSecondaryTag('Node.js')
      setSearchQuery('modern web app')
      
      const fullState = useFilterStore.getState()
      expect(fullState.selectedPrimaryTags).toEqual(['AI', 'Web Development'])
      expect(fullState.selectedSecondaryTags).toEqual(['React', 'TypeScript', 'Node.js'])
      expect(fullState.searchQuery).toBe('modern web app')
      
      // Partial clear
      clearSecondaryTags()
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual([])
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual(['AI', 'Web Development'])
      expect(useFilterStore.getState().searchQuery).toBe('modern web app')
      
      // Complete clear
      clearAllFilters()
      expect(useFilterStore.getState().selectedPrimaryTags).toEqual([])
      expect(useFilterStore.getState().selectedSecondaryTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('')
    })
  })
})