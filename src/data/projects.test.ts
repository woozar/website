import { describe, it, expect } from 'vitest'
import { projectsData, Project } from './projects'

describe('projects data', () => {
  describe('data structure validation', () => {
    it('should have a projects array', () => {
      expect(projectsData).toHaveProperty('projects')
      expect(Array.isArray(projectsData.projects)).toBe(true)
    })

    it('should have at least one project', () => {
      expect(projectsData.projects.length).toBeGreaterThan(0)
    })

    it('should have all required properties for each project', () => {
      projectsData.projects.forEach((project) => {
        expect(project).toHaveProperty('customer')
        expect(project).toHaveProperty('title')
        expect(project).toHaveProperty('description')
        expect(project).toHaveProperty('primary_tags')
        expect(project).toHaveProperty('tags')

        expect(typeof project.customer).toBe('string')
        expect(typeof project.title).toBe('string')
        expect(Array.isArray(project.description)).toBe(true)
        expect(Array.isArray(project.primary_tags)).toBe(true)
        expect(Array.isArray(project.tags)).toBe(true)
      })
    })

    it('should have non-empty strings for customer and title', () => {
      projectsData.projects.forEach((project) => {
        expect(project.customer.trim()).not.toBe('')
        expect(project.title.trim()).not.toBe('')
      })
    })

    it('should have non-empty description arrays', () => {
      projectsData.projects.forEach((project) => {
        expect(project.description.length).toBeGreaterThan(0)
        
        project.description.forEach((desc) => {
          expect(typeof desc).toBe('string')
          expect(desc.trim()).not.toBe('')
        })
      })
    })

    it('should have at least one primary tag for each project', () => {
      projectsData.projects.forEach((project) => {
        expect(project.primary_tags.length).toBeGreaterThan(0)
        
        project.primary_tags.forEach((tag) => {
          expect(typeof tag).toBe('string')
          expect(tag.trim()).not.toBe('')
        })
      })
    })

    it('should have valid tags arrays', () => {
      projectsData.projects.forEach((project) => {
        project.tags.forEach((tag) => {
          expect(typeof tag).toBe('string')
          expect(tag.trim()).not.toBe('')
        })
      })
    })

    it('should have optional comment field as string when present', () => {
      projectsData.projects.forEach((project) => {
        if (project.comment !== undefined) {
          expect(typeof project.comment).toBe('string')
        }
      })
    })
  })

  describe('data quality checks', () => {
    it('should have unique project titles', () => {
      const titles = projectsData.projects.map(p => p.title)
      const uniqueTitles = new Set(titles)
      expect(uniqueTitles.size).toBe(titles.length)
    })

    it('should have reasonable description lengths', () => {
      projectsData.projects.forEach((project) => {
        project.description.forEach((desc) => {
          expect(desc.length).toBeGreaterThan(10)
          expect(desc.length).toBeLessThan(2000)
        })
      })
    })

    it('should have reasonable number of tags', () => {
      projectsData.projects.forEach((project) => {
        expect(project.primary_tags.length).toBeLessThanOrEqual(10)
        expect(project.tags.length).toBeLessThanOrEqual(100)
      })
    })

    it('should have valid customer names', () => {
      projectsData.projects.forEach((project) => {
        expect(project.customer.length).toBeGreaterThan(2)
        expect(project.customer.length).toBeLessThan(200)
      })
    })

    it('should have valid project titles', () => {
      projectsData.projects.forEach((project) => {
        expect(project.title.length).toBeGreaterThan(5)
        expect(project.title.length).toBeLessThan(300)
      })
    })
  })

  describe('content validation', () => {
    it('should have common technology tags', () => {
      const allTags = projectsData.projects.flatMap(p => [...p.primary_tags, ...p.tags])
      const tagSet = new Set(allTags)

      // Should have some common modern technologies
      const expectedTags = ['React', 'TypeScript', 'Node.js', 'AWS', 'Azure']
      const foundTags = expectedTags.filter(tag => tagSet.has(tag))
      
      expect(foundTags.length).toBeGreaterThan(0)
    })

    it('should have AI-related projects', () => {
      const aiProjects = projectsData.projects.filter(p => 
        p.primary_tags.some(tag => tag.toLowerCase().includes('ai')) ||
        p.primary_tags.some(tag => tag.toLowerCase().includes('llm')) ||
        p.title.toLowerCase().includes('ai')
      )
      
      expect(aiProjects.length).toBeGreaterThan(0)
    })

    it('should have cloud-related projects', () => {
      const cloudProjects = projectsData.projects.filter(p => 
        p.primary_tags.some(tag => ['AWS', 'Azure', 'Cloud'].includes(tag)) ||
        p.tags.some(tag => ['AWS', 'Azure'].includes(tag))
      )
      
      expect(cloudProjects.length).toBeGreaterThan(0)
    })

    it('should have web development projects', () => {
      const webProjects = projectsData.projects.filter(p => 
        p.tags.some(tag => ['React', 'Angular', 'TypeScript', 'JavaScript'].includes(tag))
      )
      
      expect(webProjects.length).toBeGreaterThan(0)
    })
  })

  describe('type compliance', () => {
    it('should match the Project interface', () => {
      projectsData.projects.forEach((project) => {
        // Type check - this will fail at compile time if types don't match
        const typedProject: Project = project
        expect(typedProject).toBeDefined()
      })
    })

    it('should have correct array types', () => {
      projectsData.projects.forEach((project) => {
        expect(Array.isArray(project.description)).toBe(true)
        expect(Array.isArray(project.primary_tags)).toBe(true)
        expect(Array.isArray(project.tags)).toBe(true)
      })
    })
  })

  describe('specific project validation', () => {
    it('should contain expected high-profile projects', () => {
      const projectTitles = projectsData.projects.map(p => p.title)
      
      // Check for some expected project patterns
      const hasAIProjects = projectTitles.some(title => title.toLowerCase().includes('ai'))
      const hasDMGProjects = projectsData.projects.some(p => p.customer.includes('DMG'))
      
      expect(hasAIProjects).toBe(true)
      expect(hasDMGProjects).toBe(true)
    })

    it('should have consistent data structure across all projects', () => {
      projectsData.projects.forEach((project) => {
        const projectKeys = Object.keys(project)
        
        // Check that all projects have at least the required keys
        const requiredKeys = ['customer', 'title', 'description', 'primary_tags', 'tags']
        requiredKeys.forEach(key => {
          expect(projectKeys.includes(key)).toBe(true)
        })
      })
    })
  })

  describe('data integrity', () => {
    it('should not have duplicate projects', () => {
      const signatures = projectsData.projects.map(p => `${p.customer}-${p.title}`)
      const uniqueSignatures = new Set(signatures)
      
      expect(uniqueSignatures.size).toBe(signatures.length)
    })

    it('should have proper text encoding', () => {
      projectsData.projects.forEach((project) => {
        // Check that text doesn't contain common encoding issues
        const textFields = [project.customer, project.title, ...project.description]
        
        textFields.forEach(text => {
          expect(text).not.toMatch(/â€™/g)
          expect(text).not.toMatch(/â€œ|â€/g)
        })
      })
    })

    it('should have consistent tag formatting', () => {
      const allTags = projectsData.projects.flatMap(p => [...p.primary_tags, ...p.tags])
      
      allTags.forEach(tag => {
        // Tags should not start or end with whitespace
        expect(tag).toBe(tag.trim())
        
        // Tags should not be empty
        expect(tag.length).toBeGreaterThan(0)
        
        // Tags should have reasonable length
        expect(tag.length).toBeLessThan(50)
      })
    })
  })
})