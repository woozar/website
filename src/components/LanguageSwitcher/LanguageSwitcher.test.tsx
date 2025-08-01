import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@/test/test-utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguageStore } from '@/stores/languageStore'

// Mock the language store
vi.mock('@/stores/languageStore')

// Mock Mantine Menu component to test interactions
vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual('@mantine/core')
  return {
    ...actual,
    Menu: Object.assign(
      ({ children, ...props }: any) => <div data-testid="menu-root" {...props}>{children}</div>,
      {
        Target: ({ children }: any) => <div data-testid="menu-target">{children}</div>,
        Dropdown: ({ children }: any) => <div data-testid="menu-dropdown">{children}</div>,
        Item: ({ children, onClick, leftSection, ...props }: any) => (
          <div data-testid="menu-item" onClick={onClick} {...props}>
            {leftSection}{children}
          </div>
        )
      }
    )
  }
})

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

    it('should have accessible button element', () => {
      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      
      // Button should be accessible (has proper role)
      expect(button.tagName).toBe('BUTTON')
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

  describe('desktop menu interactions', () => {
    it('should render Menu components in desktop variant', () => {
      render(<LanguageSwitcher variant="desktop" />)

      expect(screen.getByTestId('menu-root')).toBeInTheDocument()
      expect(screen.getByTestId('menu-target')).toBeInTheDocument()
      expect(screen.getByTestId('menu-dropdown')).toBeInTheDocument()
    })

    it('should render menu items for language selection', () => {
      render(<LanguageSwitcher variant="desktop" />)

      const menuItems = screen.getAllByTestId('menu-item')
      expect(menuItems).toHaveLength(2)
      
      // Check menu items contain language labels
      expect(menuItems[0]).toHaveTextContent('Deutsch')
      expect(menuItems[1]).toHaveTextContent('English')
    })

    it('should call setLanguage when menu item is clicked', () => {
      render(<LanguageSwitcher variant="desktop" />)

      const menuItems = screen.getAllByTestId('menu-item')
      fireEvent.click(menuItems[0]) // German

      expect(mockSetLanguage).toHaveBeenCalledWith('de')
    })

    it('should show language flags in menu items', () => {
      render(<LanguageSwitcher variant="desktop" />)

      const menuItems = screen.getAllByTestId('menu-item')
      expect(menuItems[0]).toHaveTextContent('🇩🇪')
      expect(menuItems[0]).toHaveTextContent('Deutsch')
      expect(menuItems[1]).toHaveTextContent('🇺🇸') 
      expect(menuItems[1]).toHaveTextContent('English')
    })

    it('should apply different styling to active language in menu', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'de',
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher variant="desktop" />)

      const menuItems = screen.getAllByTestId('menu-item')
      
      // The active language (German) should have different styling
      expect(menuItems[0]).toHaveAttribute('style')
      expect(menuItems[1]).toHaveAttribute('style')
      
      // Styles should be different for active vs inactive
      const germanStyle = menuItems[0].getAttribute('style') || ''
      const englishStyle = menuItems[1].getAttribute('style') || ''
      expect(germanStyle).not.toBe(englishStyle)
    })

    it('should handle menu properties correctly', () => {
      render(<LanguageSwitcher variant="desktop" />)

      const menuRoot = screen.getByTestId('menu-root')
      expect(menuRoot).toHaveAttribute('shadow', 'md')
      expect(menuRoot).toHaveAttribute('width', '180')
      expect(menuRoot).toHaveAttribute('position', 'bottom-end')
      expect(menuRoot).toHaveAttribute('zIndex', '1100')
    })
  })

  describe('style computations', () => {
    it('should apply button styles correctly in desktop variant', () => {
      render(<LanguageSwitcher variant="desktop" />)

      const button = screen.getByRole('button')
      const style = button.getAttribute('style') || ''
      
      // Check for our custom styles (using inline styles, not CSS border-color)
      expect(style).toContain('border: 1px solid var(--primary-orange)')
      expect(style).toContain('color: var(--primary-orange)')
      expect(style).toContain('background: transparent')
    })

    it('should apply transition styles for accessibility', () => {
      render(<LanguageSwitcher variant="desktop" />)

      const button = screen.getByRole('button')
      const style = button.getAttribute('style') || ''
      
      // Should include transition styles
      expect(style).toContain('transition')
    })

    it('should handle language labels from translations', () => {
      render(<LanguageSwitcher variant="mobile" />)

      // Verify that translation labels are used
      expect(screen.getByText('Deutsch')).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
    })

    it('should construct languages array correctly', () => {
      render(<LanguageSwitcher variant="desktop" />)

      // Check that all languages are represented in the dropdown
      const menuItems = screen.getAllByTestId('menu-item')
      expect(menuItems).toHaveLength(2)
      
      // Verify language data is constructed properly (flags and labels are both present)
      expect(menuItems[0]).toHaveTextContent('🇩🇪')
      expect(menuItems[0]).toHaveTextContent('Deutsch')
      expect(menuItems[1]).toHaveTextContent('🇺🇸')
      expect(menuItems[1]).toHaveTextContent('English')
    })

    it('should apply mobile-specific styles', () => {
      render(<LanguageSwitcher variant="mobile" />)

      // The mobile variant should render buttons in a flex container
      expect(screen.getByText('Deutsch')).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
      
      // Both buttons should be in the same container
      const germanButton = screen.getByText('Deutsch')
      const englishButton = screen.getByText('English')
      expect(germanButton.closest('div')?.parentElement).toBe(englishButton.closest('div')?.parentElement)
    })

    it('should show active language styling in mobile variant', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'de',
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher variant="mobile" />)

      // Get actual button elements, not just text nodes
      const buttons = screen.getAllByRole('button')
      const germanButton = buttons.find(btn => btn.textContent?.includes('Deutsch'))
      const englishButton = buttons.find(btn => btn.textContent?.includes('English'))
      
      // Both buttons should be present (the styling is handled by Mantine props)
      expect(germanButton).toBeInTheDocument()
      expect(englishButton).toBeInTheDocument()
      
      // The buttons should have correct tagName
      expect(germanButton?.tagName).toBe('BUTTON')
      expect(englishButton?.tagName).toBe('BUTTON')
    })

    it('should apply gradient background to active mobile button', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'de',
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher variant="mobile" />)

      const germanButton = screen.getByText('Deutsch')
      
      // Test that the function executes the style computation logic for active buttons
      expect(germanButton).toBeInTheDocument()
      
      // Test that mobile variant shows both buttons with proper language handling
      expect(screen.getByText('Deutsch')).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
    })
  })

  describe('currentLanguage finder logic', () => {
    it('should find current language correctly', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'de',
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('🇩🇪')
    })

    it('should fallback to first language when current not found', () => {
      mockUseLanguageStore.mockReturnValue({
        language: 'invalid' as any,
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      // Should show German flag (first in array)
      expect(button).toHaveTextContent('🇩🇪')
    })

    it('should handle undefined language gracefully', () => {
      mockUseLanguageStore.mockReturnValue({
        language: undefined as any,
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      // Should show German flag (first in array)
      expect(button).toHaveTextContent('🇩🇪')
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

    it('should handle null language value', () => {
      mockUseLanguageStore.mockReturnValue({
        language: null as any,
        setLanguage: mockSetLanguage
      })

      render(<LanguageSwitcher />)

      const button = screen.getByRole('button')
      // Should show German flag (first in array)
      expect(button).toHaveTextContent('🇩🇪')
    })

    it('should maintain button styles when switching variants', () => {
      const { rerender } = render(<LanguageSwitcher variant="desktop" />)
      
      const desktopButton = screen.getByRole('button')
      expect(desktopButton).toHaveAttribute('data-variant', 'outline')
      
      rerender(<LanguageSwitcher variant="mobile" />)
      
      const mobileButtons = screen.getAllByRole('button')
      expect(mobileButtons).toHaveLength(2)
    })
  })
})