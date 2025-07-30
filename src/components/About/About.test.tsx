import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test/test-utils'
import { About } from './About'
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

const mockUseMediaQuery = vi.mocked(useMediaQuery)
const mockUseTranslation = vi.mocked(useTranslation)

const mockTranslations = {
  about: {
    title: 'About Me',
    subtitle: 'Software Freelancer with passion for innovative AI solutions',
    description1: 'First description paragraph',
    description2: 'Second description paragraph', 
    description3: 'Third description paragraph',
    highlights: 'Highlights',
    expertise: 'Technical Expertise',
    highlightsList: [
      '20 years of software development experience',
      'AI/LLM specialist',
      'DMG Mori experience',
      'Modern web technologies expert',
      'User-friendly solutions focus'
    ],
    skills: {
      aiLlm: {
        category: 'AI & LLM Development',
        items: ['GPT-4', 'Claude', 'Gemini', 'LangChain']
      },
      frontend: {
        category: 'Frontend Development',
        items: ['React', 'Angular', 'TypeScript', 'Next.js']
      },
      backend: {
        category: 'Backend Development', 
        items: ['Node.js', 'Python', 'Go', 'REST APIs']
      },
      cloud: {
        category: 'Cloud & DevOps',
        items: ['AWS', 'Azure', 'Docker', 'Kubernetes']
      },
      quality: {
        category: 'Quality Assurance',
        items: ['Unit Tests', 'E2E Tests', 'Integration Tests', 'Quality Gates']
      },
      training: {
        category: 'Training & Workshops',
        items: ['Workshop-Durchführung', 'Technische Schulungen', 'Team-Mentoring', 'Präsentationen']
      }
    }
  }
}

describe('About', () => {
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
  })

  it('should render about section with title and subtitle', () => {
    render(<About />)

    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Software Freelancer with passion for innovative AI solutions')).toBeInTheDocument()
  })

  it('should render all description paragraphs', () => {
    render(<About />)

    expect(screen.getByText('First description paragraph')).toBeInTheDocument()
    expect(screen.getByText('Second description paragraph')).toBeInTheDocument()
    expect(screen.getByText('Third description paragraph')).toBeInTheDocument()
  })

  it('should render highlights section', () => {
    render(<About />)

    expect(screen.getByText('Highlights')).toBeInTheDocument()
    
    mockTranslations.about.highlightsList.forEach(highlight => {
      expect(screen.getByText(highlight)).toBeInTheDocument()
    })
  })

  it('should render technical expertise section', () => {
    render(<About />)

    expect(screen.getByText('Technical Expertise')).toBeInTheDocument()
  })

  it('should render all skill categories', () => {
    render(<About />)

    expect(screen.getByText('AI & LLM Development')).toBeInTheDocument()
    expect(screen.getByText('Frontend Development')).toBeInTheDocument()
    expect(screen.getByText('Backend Development')).toBeInTheDocument()
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument()
    expect(screen.getByText('Quality Assurance')).toBeInTheDocument()
    expect(screen.getByText('Training & Workshops')).toBeInTheDocument()
  })

  it('should render skill items for each category', () => {
    render(<About />)

    // AI & LLM skills (with bullet point prefix)
    expect(screen.getByText('• GPT-4')).toBeInTheDocument()
    expect(screen.getByText('• Claude')).toBeInTheDocument()
    expect(screen.getByText('• Gemini')).toBeInTheDocument()
    expect(screen.getByText('• LangChain')).toBeInTheDocument()

    // Frontend skills
    expect(screen.getByText('• React')).toBeInTheDocument()
    expect(screen.getByText('• Angular')).toBeInTheDocument()
    expect(screen.getByText('• TypeScript')).toBeInTheDocument()
    expect(screen.getByText('• Next.js')).toBeInTheDocument()

    // Backend skills
    expect(screen.getByText('• Node.js')).toBeInTheDocument()
    expect(screen.getByText('• Python')).toBeInTheDocument()
    expect(screen.getByText('• Go')).toBeInTheDocument()
    expect(screen.getByText('• REST APIs')).toBeInTheDocument()
  })

  it('should adapt layout for mobile devices', () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false
    })

    render(<About />)

    // Should still render all content on mobile
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Technical Expertise')).toBeInTheDocument()
  })

  it('should handle different language translations', () => {
    const germanTranslations = {
      about: {
        title: 'Über mich',
        subtitle: 'Software Freelancer mit Leidenschaft für innovative KI-Lösungen',
        description1: 'Erste Beschreibung',
        description2: 'Zweite Beschreibung',
        description3: 'Dritte Beschreibung',
        highlights: 'Highlights',
        expertise: 'Technische Expertise',
        highlightsList: [
          '~20 Jahre Softwareentwicklung',
          'KI/LLM Spezialist'
        ],
        skills: {
          aiLlm: {
            category: 'KI & LLM Entwicklung',
            items: ['GPT-4', 'Claude']
          },
          frontend: {
            category: 'Frontend Entwicklung',
            items: ['React', 'Angular']
          },
          backend: {
            category: 'Backend Entwicklung',
            items: ['Node.js', 'Python']
          },
          cloud: {
            category: 'Cloud & DevOps',
            items: ['AWS', 'Azure']
          },
          quality: {
            category: 'Qualitätssicherung',
            items: ['Unit Tests', 'E2E Tests']
          },
          training: {
            category: 'Schulungen & Workshops',
            items: ['Workshop-Durchführung', 'Technische Schulungen']
          }
        }
      }
    }

    mockUseTranslation.mockReturnValue({
      t: germanTranslations,
      language: 'de'
    })

    render(<About />)

    expect(screen.getByText('Über mich')).toBeInTheDocument()
    expect(screen.getByText('KI & LLM Entwicklung')).toBeInTheDocument()
    expect(screen.getByText('~20 Jahre Softwareentwicklung')).toBeInTheDocument()
  })

  it('should render with proper semantic structure', () => {
    render(<About />)

    // Should have proper heading hierarchy
    const mainTitle = screen.getByRole('heading', { level: 2 })
    expect(mainTitle).toHaveTextContent('About Me')
  })

  it('should handle empty skill items gracefully', () => {
    const emptySkillsTranslations = {
      about: {
        ...mockTranslations.about,
        skills: {
          aiLlm: {
            category: 'AI & LLM Development',
            items: []
          },
          frontend: {
            category: 'Frontend Development',
            items: []
          },
          backend: {
            category: 'Backend Development',
            items: []
          },
          cloud: {
            category: 'Cloud & DevOps',
            items: []
          },
          quality: {
            category: 'Quality Assurance',
            items: []
          },
          training: {
            category: 'Training & Workshops',
            items: []
          }
        }
      }
    }

    mockUseTranslation.mockReturnValue({
      t: emptySkillsTranslations,
      language: 'en'
    })

    expect(() => render(<About />)).not.toThrow()
    expect(screen.getByText('AI & LLM Development')).toBeInTheDocument()
  })

  it('should handle empty highlights list', () => {
    const emptyHighlightsTranslations = {
      about: {
        ...mockTranslations.about,
        highlightsList: []
      }
    }

    mockUseTranslation.mockReturnValue({
      t: emptyHighlightsTranslations,
      language: 'en'
    })

    expect(() => render(<About />)).not.toThrow()
    expect(screen.getByText('Highlights')).toBeInTheDocument()
  })

  it('should render proper list structure for highlights', () => {
    render(<About />)

    const highlightsList = screen.getByRole('list')
    expect(highlightsList).toBeInTheDocument()

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(mockTranslations.about.highlightsList.length)
  })

  it('should have consistent spacing and layout', () => {
    render(<About />)

    // Should render main container
    const aboutSection = screen.getByText('About Me').closest('section')
    expect(aboutSection).toBeInTheDocument()
  })
})