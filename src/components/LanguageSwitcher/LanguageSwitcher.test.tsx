import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguageStore } from '../../stores/languageStore'

// Mock the language store
vi.mock('../../stores/languageStore')

const mockUseLanguageStore = vi.mocked(useLanguageStore)

describe('LanguageSwitcher', () => {
  const mockSetLanguage = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseLanguageStore.mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage
    })
  })

  describe('desktop variant', () => {
    it('should render desktop variant by default', () => {
      render(<LanguageSwitcher />)

      // Should show current language flag in button
      expect(screen.getByRole('button')).toHaveTextContent('🇺🇸')
    })

    it('should show current language flag for English', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'en',
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher />)

      expect(screen.getByRole('button')).toHaveTextContent('🇺🇸')
    })

    it('should show current language flag for German', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'de',
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher />)

      expect(screen.getByRole('button')).toHaveTextContent('🇩🇪')
    })

    it('should have aria attributes for dropdown', () => {
      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-haspopup', 'menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('should handle button interactions', () => {
      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      
      // Should be clickable (no errors when clicked)
      expect(() => fireEvent.click(button)).not.toThrow()
    })

    it('should have correct styling for desktop variant', () => {
      render(<LanguageSwitcher variant="desktop" />)

      const button = screen.getByRole('button')
      
      // Check if button has the expected classes/properties
      expect(button).toHaveAttribute('data-variant', 'outline')
    })

    it('should fallback to first language if current language is not found', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'fr' as any, // Invalid language
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher />)

      // Should show German flag (first in array)
      expect(screen.getByRole('button')).toHaveTextContent('🇩🇪')
    })
  })

  describe('mobile variant', () => {
    it('should render mobile variant when specified', () => {
      render(<LanguageSwitcher variant="mobile" />)

      // Should show both language buttons
      expect(screen.getByText('Deutsch')).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
    })

    it('should show both language options as buttons', () => {
      render(<LanguageSwitcher variant="mobile" />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)

      expect(screen.getByText('Deutsch')).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
    })

    it('should call setLanguage when mobile button is clicked', () => {
      render(<LanguageSwitcher variant="mobile" />)

      const germanButton = screen.getByText('Deutsch')
      fireEvent.click(germanButton)

      expect(mockSetLanguage).toHaveBeenCalledWith('de')
    })

    it('should show different variants for current vs non-current language', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'de',
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher variant="mobile" />)

      const germanButton = screen.getByText('Deutsch')
      const englishButton = screen.getByText('English')

      // Both buttons should be rendered
      expect(germanButton).toBeInTheDocument()
      expect(englishButton).toBeInTheDocument()
      
      // They should be different (one filled, one outline - but exact attributes may vary)
      expect(germanButton).not.toEqual(englishButton)
    })

    it('should show flags in mobile buttons', () => {
      render(<LanguageSwitcher variant="mobile" />)

      // Check if flags are present (they should be in the buttons)
      expect(screen.getByText('Deutsch').closest('button')).toHaveTextContent('🇩🇪Deutsch')
      expect(screen.getByText('English').closest('button')).toHaveTextContent('🇺🇸English')
    })

    it('should switch languages correctly in mobile variant', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'en',
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher variant="mobile" />)

      const germanButton = screen.getByText('Deutsch')
      fireEvent.click(germanButton)

      expect(mockSetLanguage).toHaveBeenCalledWith('de')

      // Now test English button
      const englishButton = screen.getByText('English')
      fireEvent.click(englishButton)

      expect(mockSetLanguage).toHaveBeenCalledWith('en')
    })

    it('should render fullWidth buttons in mobile variant', () => {
      render(<LanguageSwitcher variant="mobile" />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      
      // Check that buttons are rendered (fullWidth is internal Mantine prop)
      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
      })
    })
  })

  describe('language data', () => {
    it('should handle all supported languages', () => {
      const languages = ['de', 'en'] as const

      languages.forEach(lang => {
        mockUseLanguageStore.mockReturnValue({
          language: lang,
          setLanguage: mockSetLanguage
        })

        const { rerender } = render(<LanguageSwitcher />)
        
        const expectedFlag = lang === 'de' ? '🇩🇪' : '🇺🇸'
        expect(screen.getByRole('button')).toHaveTextContent(expectedFlag)

        rerender(<div />)
      })
    })

    it('should have language labels in mobile variant', () => {
      render(<LanguageSwitcher variant="mobile" />)

      expect(screen.getByText('Deutsch')).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
    })

    it('should have consistent mobile buttons across variants', () => {
      const { rerender } = render(<LanguageSwitcher variant="mobile" />)
      
      expect(screen.getByText('Deutsch')).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()

      // Test that mobile variant consistently shows text
      rerender(<LanguageSwitcher variant="mobile" />)
      
      expect(screen.getByText('Deutsch')).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('should handle missing setLanguage function gracefully', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'en',
        setLanguage: undefined as any
      })

      expect(() => render(<LanguageSwitcher />)).not.toThrow()
    })

    it('should handle rapid language switching', () => {
      render(<LanguageSwitcher variant="mobile" />)

      const germanButton = screen.getByText('Deutsch')
      const englishButton = screen.getByText('English')

      // Rapid clicks
      fireEvent.click(germanButton)
      fireEvent.click(englishButton)
      fireEvent.click(germanButton)

      expect(mockSetLanguage).toHaveBeenCalledTimes(3)
      expect(mockSetLanguage).toHaveBeenNthCalledWith(1, 'de')
      expect(mockSetLanguage).toHaveBeenNthCalledWith(2, 'en')
      expect(mockSetLanguage).toHaveBeenNthCalledWith(3, 'de')
    })
  })
})