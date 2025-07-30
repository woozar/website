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
      
      expect(state.selectedTags).toEqual([])
      expect(state.searchQuery).toBe('')
    })

    it('should have all required methods', () => {
      const state = useFilterStore.getState()
      
      expect(typeof state.toggleTag).toBe('function')
      expect(typeof state.setSearchQuery).toBe('function')
      expect(typeof state.clearAllFilters).toBe('function')
      expect(typeof state.clearTags).toBe('function')
    })
  })

  describe('toggleTag', () => {
    it('should add a tag when not present', () => {
      const { toggleTag } = useFilterStore.getState()
      
      toggleTag('React')
      
      expect(useFilterStore.getState().selectedTags).toEqual(['React'])
    })

    it('should remove a tag when already present', () => {
      const { toggleTag } = useFilterStore.getState()
      
      toggleTag('React')
      expect(useFilterStore.getState().selectedTags).toEqual(['React'])
      
      toggleTag('React')
      expect(useFilterStore.getState().selectedTags).toEqual([])
    })

    it('should handle multiple tags', () => {
      const { toggleTag } = useFilterStore.getState()
      
      toggleTag('React')
      toggleTag('Vue')
      toggleTag('Angular')
      
      expect(useFilterStore.getState().selectedTags).toEqual(['React', 'Vue', 'Angular'])
    })

    it('should toggle specific tag without affecting others', () => {
      const { toggleTag } = useFilterStore.getState()
      
      toggleTag('React')
      toggleTag('Vue')
      toggleTag('Angular')
      
      toggleTag('Vue')
      
      expect(useFilterStore.getState().selectedTags).toEqual(['React', 'Angular'])
    })

    it('should handle empty string tags', () => {
      const { toggleTag } = useFilterStore.getState()
      
      toggleTag('')
      
      expect(useFilterStore.getState().selectedTags).toEqual([''])
    })

    it('should handle duplicate toggles correctly', () => {
      const { toggleTag } = useFilterStore.getState()
      
      toggleTag('React')
      toggleTag('React')
      toggleTag('React')
      
      expect(useFilterStore.getState().selectedTags).toEqual(['React'])
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
      const { toggleTag, setSearchQuery, clearAllFilters } = useFilterStore.getState()
      
      // Set some filters
      toggleTag('React')
      toggleTag('Vue')
      toggleTag('TypeScript')
      toggleTag('JavaScript')
      setSearchQuery('test query')
      
      // Verify filters are set
      expect(useFilterStore.getState().selectedTags).toEqual(['React', 'Vue', 'TypeScript', 'JavaScript'])
      expect(useFilterStore.getState().searchQuery).toBe('test query')
      
      // Clear all filters
      clearAllFilters()
      
      // Verify all filters are cleared
      expect(useFilterStore.getState().selectedTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('')
    })

    it('should work when filters are already empty', () => {
      const { clearAllFilters } = useFilterStore.getState()
      
      clearAllFilters()
      
      expect(useFilterStore.getState().selectedTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('')
    })
  })

  describe('clearTags', () => {
    it('should clear only tags', () => {
      const { toggleTag, setSearchQuery, clearTags } = useFilterStore.getState()
      
      toggleTag('React')
      toggleTag('Vue')
      toggleTag('TypeScript')
      setSearchQuery('test query')
      
      clearTags()
      
      expect(useFilterStore.getState().selectedTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('test query')
    })

    it('should work when tags are already empty', () => {
      const { setSearchQuery, clearTags } = useFilterStore.getState()
      
      setSearchQuery('test query')
      
      clearTags()
      
      expect(useFilterStore.getState().selectedTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('test query')
    })
  })

  describe('store integration', () => {
    it('should handle unified tag system correctly', () => {
      const { toggleTag } = useFilterStore.getState()
      
      toggleTag('React')
      toggleTag('TypeScript')
      
      expect(useFilterStore.getState().selectedTags).toEqual(['React', 'TypeScript'])
      
      // Toggle same tag should remove it
      toggleTag('React')
      expect(useFilterStore.getState().selectedTags).toEqual(['TypeScript'])
    })

    it('should notify subscribers on state changes', () => {
      const subscriber = vi.fn()
      
      const unsubscribe = useFilterStore.subscribe(subscriber)
      
      useFilterStore.getState().toggleTag('React')
      
      expect(subscriber).toHaveBeenCalledWith(
        expect.objectContaining({ selectedTags: ['React'] }),
        expect.objectContaining({ selectedTags: [] })
      )
      
      unsubscribe()
    })

    it('should handle complex filtering scenarios', () => {
      const { 
        toggleTag, 
        setSearchQuery,
        clearTags,
        clearAllFilters
      } = useFilterStore.getState()
      
      // Complex scenario
      toggleTag('AI')
      toggleTag('Web Development')
      toggleTag('React')
      toggleTag('TypeScript')
      toggleTag('Node.js')
      setSearchQuery('modern web app')
      
      const fullState = useFilterStore.getState()
      expect(fullState.selectedTags).toEqual(['AI', 'Web Development', 'React', 'TypeScript', 'Node.js'])
      expect(fullState.searchQuery).toBe('modern web app')
      
      // Partial clear
      clearTags()
      expect(useFilterStore.getState().selectedTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('modern web app')
      
      // Complete clear
      clearAllFilters()
      expect(useFilterStore.getState().selectedTags).toEqual([])
      expect(useFilterStore.getState().searchQuery).toBe('')
    })
  })
})