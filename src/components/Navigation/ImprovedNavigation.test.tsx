import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import { ImprovedNavigation } from './ImprovedNavigation'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useTranslation } from '../../hooks/useTranslation'

// Mock dependencies
vi.mock('../../hooks/useMediaQuery')
vi.mock('../../hooks/useTranslation')
vi.mock('../LanguageSwitcher', () => ({
  LanguageSwitcher: ({ variant }: any) => <div data-testid={`language-switcher-${variant}`}>Language Switcher</div>
}))
vi.mock('../ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">Theme Switcher</div>
}))
vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual('@mantine/core')
  return {
    ...actual,
    Drawer: ({ opened, onClose, children, ...props }: any) => 
      opened ? <div data-testid="drawer" onClick={onClose} {...props}>{children}</div> : null,
  }
})

// Mock the logo image import
vi.mock('../../assets/logo.webp', () => ({
  default: '/mock-logo.webp'
}))

const mockUseMediaQuery = vi.mocked(useMediaQuery)
const mockUseTranslation = vi.mocked(useTranslation)

const mockTranslations = {
  navigation: {
    services: 'Services',
    projects: 'Projekte',
    about: 'Über mich',
    contact: 'Kontakt',
    contactAction: 'Kontakt aufnehmen'
  }
}

describe('ImprovedNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true
    })
    mockUseTranslation.mockReturnValue({
      t: mockTranslations,
      language: 'en'
    })

    // Mock scrollTo
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true
    })

    // Mock querySelector
    Object.defineProperty(document, 'querySelector', {
      value: vi.fn().mockReturnValue({
        offsetTop: 500
      } as HTMLElement),
      writable: true
    })
  })

  describe('Desktop Navigation', () => {
    it('should render desktop navigation with logo and menu items', () => {
      render(<ImprovedNavigation />)

      expect(screen.getByRole('img')).toBeInTheDocument()
      expect(screen.getByText('Services')).toBeInTheDocument()
      expect(screen.getByText('Projekte')).toBeInTheDocument()
      expect(screen.getByText('Über mich')).toBeInTheDocument()
    })

    it('should render logo with correct attributes', () => {
      render(<ImprovedNavigation />)

      const logo = screen.getByRole('img')
      expect(logo).toHaveAttribute('src', '/mock-logo.webp')
      expect(logo).toHaveAttribute('alt', '12 of Spades')
    })

    it('should render contact button', () => {
      render(<ImprovedNavigation />)

      expect(screen.getByText('Kontakt')).toBeInTheDocument()
    })

    it('should render desktop language switcher', () => {
      render(<ImprovedNavigation />)

      expect(screen.getByTestId('language-switcher-desktop')).toBeInTheDocument()
    })

    it('should not render burger menu on desktop', () => {
      render(<ImprovedNavigation />)

      expect(screen.queryByRole('button', { name: /menu/i })).not.toBeInTheDocument()
    })

    it('should handle navigation link clicks', () => {
      render(<ImprovedNavigation />)

      const servicesLink = screen.getByText('Services')
      fireEvent.click(servicesLink)

      expect(document.querySelector).toHaveBeenCalledWith('#services')
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400, // 500 - 100 (header height)
        behavior: 'smooth'
      })
    })

    it('should handle contact button click', () => {
      render(<ImprovedNavigation />)

      const contactButton = screen.getByText('Kontakt')
      fireEvent.click(contactButton)

      expect(document.querySelector).toHaveBeenCalledWith('#contact')
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400,
        behavior: 'smooth'
      })
    })
  })

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false
      })
    })

    it('should render mobile navigation with burger menu', () => {
      render(<ImprovedNavigation />)

      expect(screen.getAllByRole('button')).toHaveLength(2) // Contact button + Burger menu
      expect(screen.getByRole('img')).toBeInTheDocument() // Logo
    })

    it('should render mobile language switcher', () => {
      render(<ImprovedNavigation />)

      // Open drawer to see the mobile language switcher
      const burgerButton = screen.getAllByRole('button')[1] // Second button is burger menu
      fireEvent.click(burgerButton)

      expect(screen.getByTestId('language-switcher-mobile')).toBeInTheDocument()
    })

    it('should open drawer when burger menu is clicked', () => {
      render(<ImprovedNavigation />)

      const burgerButton = screen.getAllByRole('button')[1] // Second button is burger menu
      fireEvent.click(burgerButton)

      // Drawer content should be visible
      expect(screen.getByTestId('drawer')).toBeInTheDocument()
    })

    it('should close drawer when navigation item is clicked', () => {
      render(<ImprovedNavigation />)

      // Open drawer
      const burgerButton = screen.getAllByRole('button')[1] // Second button is burger menu
      fireEvent.click(burgerButton)

      // Click navigation item
      const servicesButton = screen.getByText('Services')
      fireEvent.click(servicesButton)

      // Should handle navigation and close drawer
      expect(document.querySelector).toHaveBeenCalledWith('#services')
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400,
        behavior: 'smooth'
      })
    })

    it('should render contact button in mobile drawer', () => {
      render(<ImprovedNavigation />)

      // Open drawer
      const burgerButton = screen.getAllByRole('button')[1] // Second button is burger menu
      fireEvent.click(burgerButton)

      expect(screen.getByText('Kontakt aufnehmen')).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('should close drawer when switching from mobile to desktop', () => {
      // Start with mobile
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false
      })

      const { rerender } = render(<ImprovedNavigation />)

      // Open drawer
      const burgerButton = screen.getAllByRole('button')[1] // Second button is burger menu
      fireEvent.click(burgerButton)

      // Switch to desktop
      mockUseMediaQuery.mockReturnValue({
        isMobile: false,
        isTablet: false,
        isDesktop: true
      })

      rerender(<ImprovedNavigation />)

      // Drawer should be closed (burger menu shouldn't be visible)
      expect(screen.queryByRole('button', { name: /menu/i })).not.toBeInTheDocument()
    })
  })

  describe('Language Support', () => {
    it('should handle different language translations', () => {
      const germanTranslations = {
        navigation: {
          services: 'Services',
          projects: 'Projekte',
          about: 'Über mich',
          contact: 'Kontakt',
          contactAction: 'Kontakt aufnehmen'
        }
      }

      mockUseTranslation.mockReturnValue({
        t: germanTranslations,
        language: 'de'
      })

      render(<ImprovedNavigation />)

      expect(screen.getByText('Projekte')).toBeInTheDocument()
      expect(screen.getByText('Über mich')).toBeInTheDocument()
      expect(screen.getByText('Kontakt')).toBeInTheDocument()
    })
  })

  describe('Navigation Functionality', () => {
    it('should handle missing target element gracefully', () => {
      document.querySelector = vi.fn().mockReturnValue(null)

      render(<ImprovedNavigation />)

      const servicesLink = screen.getByText('Services')
      
      expect(() => fireEvent.click(servicesLink)).not.toThrow()
      expect(window.scrollTo).not.toHaveBeenCalled()
    })

    it('should navigate to all available sections', () => {
      render(<ImprovedNavigation />)

      // Test services navigation
      fireEvent.click(screen.getByText('Services'))
      expect(document.querySelector).toHaveBeenCalledWith('#services')

      // Test projects navigation
      fireEvent.click(screen.getByText('Projekte'))
      expect(document.querySelector).toHaveBeenCalledWith('#projects')

      // Test about navigation
      fireEvent.click(screen.getByText('Über mich'))
      expect(document.querySelector).toHaveBeenCalledWith('#about')

      // Test contact navigation
      fireEvent.click(screen.getByText('Kontakt'))
      expect(document.querySelector).toHaveBeenCalledWith('#contact')
    })

    it('should calculate scroll position correctly', () => {
      const mockElement = {
        offsetTop: 800
      } as HTMLElement

      document.querySelector = vi.fn().mockReturnValue(mockElement)

      render(<ImprovedNavigation />)

      const servicesLink = screen.getByText('Services')
      fireEvent.click(servicesLink)

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 700, // 800 - 100 (header height)
        behavior: 'smooth'
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<ImprovedNavigation />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('should have proper button labels', () => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false
      })

      render(<ImprovedNavigation />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2) // Contact button and burger menu
    })
  })

  describe('Fixed Header Behavior', () => {
    it('should render as fixed positioned header', () => {
      render(<ImprovedNavigation />)

      const header = screen.getByRole('banner')
      expect(header).toHaveStyle({
        position: 'fixed',
        top: '0'
      })
    })

    it('should have backdrop blur styling', () => {
      render(<ImprovedNavigation />)

      const header = screen.getByRole('banner')
      expect(header).toHaveStyle({
        backgroundColor: 'var(--backdrop-filter)'
      })
    })
  })
})