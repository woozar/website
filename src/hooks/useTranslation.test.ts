import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useTranslation } from './useTranslation'
import { useLanguageStore } from '../stores/languageStore'
import { getTranslation } from '../translations'

// Mock the dependencies
vi.mock('../stores/languageStore')
vi.mock('../translations')

const mockUseLanguageStore = vi.mocked(useLanguageStore)
const mockGetTranslation = vi.mocked(getTranslation)

describe('useTranslation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return translation and language for German', () => {
    const mockTranslations = {
      nav: {
        home: 'Startseite',
        about: 'Über mich',
        projects: 'Projekte',
        contact: 'Kontakt'
      },
      hero: {
        title: 'Hallo, ich bin',
        subtitle: 'Software Entwickler',
        description: 'Ich erstelle moderne Webanwendungen'
      }
    }

    mockUseLanguageStore.mockReturnValue('de')
    mockGetTranslation.mockReturnValue(mockTranslations)

    const { result } = renderHook(() => useTranslation())

    expect(result.current.language).toBe('de')
    expect(result.current.t).toBe(mockTranslations)
    expect(mockGetTranslation).toHaveBeenCalledWith('de')
  })

  it('should return translation and language for English', () => {
    const mockTranslations = {
      nav: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact'
      },
      hero: {
        title: 'Hello, I am',
        subtitle: 'Software Developer',
        description: 'I create modern web applications'
      }
    }

    mockUseLanguageStore.mockReturnValue('en')
    mockGetTranslation.mockReturnValue(mockTranslations)

    const { result } = renderHook(() => useTranslation())

    expect(result.current.language).toBe('en')
    expect(result.current.t).toBe(mockTranslations)
    expect(mockGetTranslation).toHaveBeenCalledWith('en')
  })

  it('should update when language changes', () => {
    const germanTranslations = {
      nav: {
        home: 'Startseite',
        about: 'Über mich',
        projects: 'Projekte',
        contact: 'Kontakt'
      }
    }

    const englishTranslations = {
      nav: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact'
      }
    }

    // Initially return German
    mockUseLanguageStore.mockReturnValueOnce('de')
    mockGetTranslation.mockReturnValueOnce(germanTranslations)

    const { result, rerender } = renderHook(() => useTranslation())

    expect(result.current.language).toBe('de')
    expect(result.current.t).toBe(germanTranslations)

    // Change to English
    mockUseLanguageStore.mockReturnValueOnce('en')
    mockGetTranslation.mockReturnValueOnce(englishTranslations)

    rerender()

    expect(result.current.language).toBe('en')
    expect(result.current.t).toBe(englishTranslations)
  })

  it('should call useLanguageStore selector correctly', () => {
    const mockSelector = vi.fn((state) => state.language)
    mockUseLanguageStore.mockImplementation(mockSelector)
    mockGetTranslation.mockReturnValue({})

    renderHook(() => useTranslation())

    expect(mockUseLanguageStore).toHaveBeenCalledWith(expect.any(Function))
    
    // Test the selector function
    const selectorFn = mockUseLanguageStore.mock.calls[0][0]
    const mockState = { language: 'de', setLanguage: vi.fn() }
    expect(selectorFn(mockState)).toBe('de')
  })

  it('should handle empty translations gracefully', () => {
    const emptyTranslations = {}

    mockUseLanguageStore.mockReturnValue('en')
    mockGetTranslation.mockReturnValue(emptyTranslations)

    const { result } = renderHook(() => useTranslation())

    expect(result.current.language).toBe('en')
    expect(result.current.t).toBe(emptyTranslations)
  })
})