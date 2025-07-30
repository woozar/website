import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProjects } from './useProjects'
import { useTranslation } from './useTranslation'
import { projectsData } from '../data/projects'

// Mock the dependencies
vi.mock('./useTranslation')
vi.mock('../data/projects', () => ({
  projectsData: {
    projects: [
      {
        customer: 'Test Customer',
        title: 'AI Playground',
        description: ['English description 1', 'English description 2'],
        primary_tags: ['AI', 'LLM'],
        tags: ['React', 'TypeScript'],
        comment: 'Test comment'
      },
      {
        customer: 'Another Customer',
        title: 'Workshop for \'Using AI in software for tax advisors\'',
        description: ['Another English description'],
        primary_tags: ['AI', 'Workshop'],
        tags: ['Python', 'OpenAI']
      },
      {
        customer: 'Regular Customer',
        title: 'Regular Project',
        description: ['Regular project description'],
        primary_tags: ['Web'],
        tags: ['HTML', 'CSS']
      }
    ]
  }
}))

const mockUseTranslation = vi.mocked(useTranslation)

describe('useProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return original English projects when language is English', () => {
    mockUseTranslation.mockReturnValue({
      language: 'en',
      t: {}
    })

    const { result } = renderHook(() => useProjects())

    expect(result.current.projects).toEqual(projectsData.projects)
    expect(result.current.projects[0].title).toBe('AI Playground')
    expect(result.current.projects[0].description).toEqual(['English description 1', 'English description 2'])
  })

  it('should return translated German projects when language is German', () => {
    mockUseTranslation.mockReturnValue({
      language: 'de',
      t: {}
    })

    const { result } = renderHook(() => useProjects())

    // Test AI Playground translation
    const aiPlaygroundProject = result.current.projects.find(p => p.title === 'AI Playground')
    expect(aiPlaygroundProject).toBeDefined()
    expect(aiPlaygroundProject?.description).toEqual([
      'ChatYourData, ein innovatives Technologieunternehmen, arbeitet mit Kreuz & Partner, einer AI-Beratungsfirma, zusammen, um modernste KI-Lösungen zu entwickeln. Gemeinsam entwickeln wir eine Demonstrationsplattform namens \"Playground\", die das Potenzial von KI zeigt und die von uns angebotenen Services hervorhebt.',
      'Als Hauptentwickler des Playground-Projekts war ich für den gesamten Entwicklungsprozess verantwortlich, vom ersten Konzept bis zur finalen Bereitstellung. Die Plattform ermöglicht es Nutzern, mit verschiedenen KI-Anwendungen zu experimentieren, wie z.B. KI-Experten aus hochgeladenen Dokumenten zu erstellen, Bilder zu generieren und benutzerdefinierte KI-Szenarien zu definieren.',
      'Um Flexibilität und Skalierbarkeit zu gewährleisten, ist die Playground-Plattform für Multi-Tenancy ausgelegt, sodass jeder Kunde seinen eigenen dedizierten Arbeitsbereich haben kann. Darüber hinaus kann jeder Tenant in mehrere Bereiche unterteilt werden, was es verschiedenen Abteilungen innerhalb einer Organisation ermöglicht, ihre eigenen privaten Räume zu haben und gleichzeitig relevante Informationen zu teilen.'
    ])

    // Test workshop project translation
    const workshopProject = result.current.projects.find(p => p.title.includes('Workshop'))
    expect(workshopProject).toBeDefined()
    expect(workshopProject?.title).toBe('Workshop \'KI-Einsatz in Software für Steuerberater\'')

    // Test project without translation stays original
    const regularProject = result.current.projects.find(p => p.title === 'Regular Project')
    expect(regularProject).toBeDefined()
    expect(regularProject?.description).toEqual(['Regular project description'])
  })

  it('should preserve all project properties when translating', () => {
    mockUseTranslation.mockReturnValue({
      language: 'de',
      t: {}
    })

    const { result } = renderHook(() => useProjects())

    const aiPlaygroundProject = result.current.projects.find(p => p.title === 'AI Playground')
    expect(aiPlaygroundProject).toBeDefined()
    expect(aiPlaygroundProject?.customer).toBe('Test Customer')
    expect(aiPlaygroundProject?.primary_tags).toEqual(['AI', 'LLM'])
    expect(aiPlaygroundProject?.tags).toEqual(['React', 'TypeScript'])
    expect(aiPlaygroundProject?.comment).toBe('Test comment')
  })

  it('should handle projects without German translations correctly', () => {
    mockUseTranslation.mockReturnValue({
      language: 'de',
      t: {}
    })

    const { result } = renderHook(() => useProjects())

    const regularProject = result.current.projects.find(p => p.title === 'Regular Project')
    expect(regularProject).toBeDefined()
    expect(regularProject?.title).toBe('Regular Project')
    expect(regularProject?.description).toEqual(['Regular project description'])
    expect(regularProject?.customer).toBe('Regular Customer')
  })

  it('should return same number of projects regardless of language', () => {
    // Test English
    mockUseTranslation.mockReturnValue({
      language: 'en',
      t: {}
    })

    const { result: englishResult } = renderHook(() => useProjects())

    // Test German
    mockUseTranslation.mockReturnValue({
      language: 'de',
      t: {}
    })

    const { result: germanResult } = renderHook(() => useProjects())

    expect(englishResult.current.projects.length).toBe(germanResult.current.projects.length)
    expect(englishResult.current.projects.length).toBe(3)
  })

  it('should update projects when language changes', () => {
    // Start with English
    mockUseTranslation.mockReturnValueOnce({
      language: 'en',
      t: {}
    })

    const { result, rerender } = renderHook(() => useProjects())

    expect(result.current.projects[0].description).toEqual(['English description 1', 'English description 2'])

    // Change to German
    mockUseTranslation.mockReturnValueOnce({
      language: 'de',
      t: {}
    })

    rerender()

    const aiPlaygroundProject = result.current.projects.find(p => p.title === 'AI Playground')
    expect(aiPlaygroundProject?.description[0]).toContain('ChatYourData, ein innovatives Technologieunternehmen')
  })

  it('should handle partial translations correctly', () => {
    mockUseTranslation.mockReturnValue({
      language: 'de',
      t: {}
    })

    const { result } = renderHook(() => useProjects())

    // Workshop project has both title and description translated
    const workshopProject = result.current.projects.find(p => p.title.includes('KI-Einsatz'))
    expect(workshopProject).toBeDefined()
    expect(workshopProject?.title).toBe('Workshop \'KI-Einsatz in Software für Steuerberater\'')
    expect(workshopProject?.description[0]).toContain('WIADOK, ein Unternehmen, das sich auf innovative Lösungen für Unternehmen, insbesondere Steuerberater, spezialisiert hat')

    // AI Playground has only description translated, title stays the same
    const aiProject = result.current.projects.find(p => p.title === 'AI Playground')
    expect(aiProject?.title).toBe('AI Playground') // Original title
    expect(aiProject?.description[0]).toContain('ChatYourData, ein innovatives Technologieunternehmen') // German description
  })
})