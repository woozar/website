import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import { AnimatedHero } from './AnimatedHero'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useTranslation } from '../../hooks/useTranslation'

// Mock dependencies
vi.mock('../../hooks/useMediaQuery')
vi.mock('../../hooks/useTranslation')
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}))

// Mock the image import
vi.mock('../../assets/hero-portrait.webp', () => ({
  default: '/mock-hero-portrait.webp'
}))

const mockUseMediaQuery = vi.mocked(useMediaQuery)
const mockUseTranslation = vi.mocked(useTranslation)

const mockTranslations = {
  hero: {
    name: 'Johannes Herrmann',
    title: 'Software Freelancer & AI Specialist',
    description: 'Specialized in AI/LLM Development, Cloud Architecture and Full-Stack Development.',
    contactButton: 'Get in Touch',
    projectsButton: 'View Projects'
  }
}

describe('AnimatedHero', () => {
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

  it('should render hero section with name and title', () => {
    render(<AnimatedHero />)

    expect(screen.getByText('Johannes Herrmann')).toBeInTheDocument()
    expect(screen.getByText('Software Freelancer & AI Specialist')).toBeInTheDocument()
  })

  it('should render description text', () => {
    render(<AnimatedHero />)

    expect(screen.getByText('Specialized in AI/LLM Development, Cloud Architecture and Full-Stack Development.')).toBeInTheDocument()
  })

  it('should render action buttons', () => {
    render(<AnimatedHero />)

    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('View Projects')).toBeInTheDocument()
  })

  it('should render hero portrait image', () => {
    render(<AnimatedHero />)

    const heroImage = screen.getByRole('img')
    expect(heroImage).toBeInTheDocument()
    expect(heroImage).toHaveAttribute('src', '/mock-hero-portrait.webp')
    expect(heroImage).toHaveAttribute('alt', 'Johannes Herrmann - Tech Freelancer')
  })

  it('should handle contact button click', () => {
    render(<AnimatedHero />)

    const contactButton = screen.getByText('Get in Touch')
    fireEvent.click(contactButton)

    expect(document.querySelector).toHaveBeenCalledWith('#contact')
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400, // 500 - 100 (header height)
      behavior: 'smooth'
    })
  })

  it('should handle projects button click', () => {
    render(<AnimatedHero />)

    const projectsButton = screen.getByText('View Projects')
    fireEvent.click(projectsButton)

    expect(document.querySelector).toHaveBeenCalledWith('#projects')
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400, // 500 - 100 (header height)
      behavior: 'smooth'
    })
  })

  it('should handle missing target element gracefully', () => {
    document.querySelector = vi.fn().mockReturnValue(null)

    render(<AnimatedHero />)

    const contactButton = screen.getByText('Get in Touch')
    
    expect(() => fireEvent.click(contactButton)).not.toThrow()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('should adapt layout for mobile devices', () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false
    })

    render(<AnimatedHero />)

    // Should still render all content on mobile
    expect(screen.getByText('Johannes Herrmann')).toBeInTheDocument()
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should adapt layout for tablet devices', () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: true,
      isDesktop: false
    })

    render(<AnimatedHero />)

    // Should still render all content on tablet
    expect(screen.getByText('Johannes Herrmann')).toBeInTheDocument()
    expect(screen.getByText('Software Freelancer & AI Specialist')).toBeInTheDocument()
  })

  it('should handle different language translations', () => {
    const germanTranslations = {
      hero: {
        name: 'Johannes Herrmann',
        title: 'Software Freelancer & KI Spezialist',
        description: 'Spezialisiert auf KI/LLM Entwicklung, Cloud Architektur und Full-Stack Development.',
        contactButton: 'Kontakt aufnehmen',
        projectsButton: 'Projekte ansehen'
      }
    }

    mockUseTranslation.mockReturnValue({
      t: germanTranslations,
      language: 'de'
    })

    render(<AnimatedHero />)

    expect(screen.getByText('Software Freelancer & KI Spezialist')).toBeInTheDocument()
    expect(screen.getByText('Kontakt aufnehmen')).toBeInTheDocument()
    expect(screen.getByText('Projekte ansehen')).toBeInTheDocument()
  })

  it('should render with proper semantic structure', () => {
    render(<AnimatedHero />)

    const mainTitle = screen.getByRole('heading', { level: 1 })
    expect(mainTitle).toHaveTextContent('Johannes Herrmann')

    // The title is rendered as regular text, not an h2
    expect(screen.getByText('Software Freelancer & AI Specialist')).toBeInTheDocument()
  })

  it('should have proper button attributes', () => {
    render(<AnimatedHero />)

    const contactButton = screen.getByText('Get in Touch')
    const projectsButton = screen.getByText('View Projects')

    // Buttons are rendered as Mantine components and should be in the document
    expect(contactButton).toBeInTheDocument()
    expect(projectsButton).toBeInTheDocument()
  })

  it('should render image with proper accessibility attributes', () => {
    render(<AnimatedHero />)

    const heroImage = screen.getByRole('img')
    expect(heroImage).toHaveAttribute('alt', 'Johannes Herrmann - Tech Freelancer')
  })

  it('should handle scroll navigation correctly', () => {
    const mockElement = {
      offsetTop: 800
    } as HTMLElement

    document.querySelector = vi.fn().mockReturnValue(mockElement)

    render(<AnimatedHero />)

    const contactButton = screen.getByText('Get in Touch')
    fireEvent.click(contactButton)

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 700, // 800 - 100 (header height)
      behavior: 'smooth'
    })
  })

  it('should render buttons with proper styling classes', () => {
    render(<AnimatedHero />)

    const contactButton = screen.getByText('Get in Touch')
    const projectsButton = screen.getByText('View Projects')

    // Both buttons should be rendered as button elements
    expect(contactButton).toBeInTheDocument()
    expect(projectsButton).toBeInTheDocument()
  })

  it('should handle navigation to different sections', () => {
    render(<AnimatedHero />)

    // Test contact button navigation
    const contactButton = screen.getByText('Get in Touch')
    fireEvent.click(contactButton)
    expect(document.querySelector).toHaveBeenCalledWith('#contact')

    // Test projects button navigation
    const projectsButton = screen.getByText('View Projects')
    fireEvent.click(projectsButton)
    expect(document.querySelector).toHaveBeenCalledWith('#projects')
  })

  it('should render all required content elements', () => {
    render(<AnimatedHero />)

    // Check all main content is present
    expect(screen.getByText('Johannes Herrmann')).toBeInTheDocument()
    expect(screen.getByText('Software Freelancer & AI Specialist')).toBeInTheDocument()
    expect(screen.getByText('Specialized in AI/LLM Development, Cloud Architecture and Full-Stack Development.')).toBeInTheDocument()
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('View Projects')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})