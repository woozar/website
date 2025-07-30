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
      projectsData.projects.forEach((project, index) => {
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
      projectsData.projects.forEach((project, index) => {
        expect(project.customer.trim()).not.toBe('', `Project ${index} has empty customer`)
        expect(project.title.trim()).not.toBe('', `Project ${index} has empty title`)
      })
    })

    it('should have non-empty description arrays', () => {
      projectsData.projects.forEach((project, index) => {
        expect(project.description.length).toBeGreaterThan(0, `Project ${index} has empty description`)
        
        project.description.forEach((desc, descIndex) => {
          expect(typeof desc).toBe('string', `Project ${index} description ${descIndex} is not a string`)
          expect(desc.trim()).not.toBe('', `Project ${index} description ${descIndex} is empty`)
        })
      })
    })

    it('should have at least one primary tag for each project', () => {
      projectsData.projects.forEach((project, index) => {
        expect(project.primary_tags.length).toBeGreaterThan(0, `Project ${index} has no primary tags`)
        
        project.primary_tags.forEach((tag, tagIndex) => {
          expect(typeof tag).toBe('string', `Project ${index} primary tag ${tagIndex} is not a string`)
          expect(tag.trim()).not.toBe('', `Project ${index} primary tag ${tagIndex} is empty`)
        })
      })
    })

    it('should have valid tags arrays', () => {
      projectsData.projects.forEach((project, index) => {
        project.tags.forEach((tag, tagIndex) => {
          expect(typeof tag).toBe('string', `Project ${index} tag ${tagIndex} is not a string`)
          expect(tag.trim()).not.toBe('', `Project ${index} tag ${tagIndex} is empty`)
        })
      })
    })

    it('should have optional comment field as string when present', () => {
      projectsData.projects.forEach((project, index) => {
        if (project.comment !== undefined) {
          expect(typeof project.comment).toBe('string', `Project ${index} comment is not a string`)
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
      projectsData.projects.forEach((project, index) => {
        project.description.forEach((desc, descIndex) => {
          expect(desc.length).toBeGreaterThan(10, `Project ${index} description ${descIndex} is too short`)
          expect(desc.length).toBeLessThan(2000, `Project ${index} description ${descIndex} is too long`)
        })
      })
    })

    it('should have reasonable number of tags', () => {
      projectsData.projects.forEach((project, index) => {
        expect(project.primary_tags.length).toBeLessThanOrEqual(10, `Project ${index} has too many primary tags`)
        expect(project.tags.length).toBeLessThanOrEqual(100, `Project ${index} has too many tags`)
      })
    })

    it('should have valid customer names', () => {
      projectsData.projects.forEach((project, index) => {
        expect(project.customer.length).toBeGreaterThan(2, `Project ${index} customer name too short`)
        expect(project.customer.length).toBeLessThan(200, `Project ${index} customer name too long`)
      })
    })

    it('should have valid project titles', () => {
      projectsData.projects.forEach((project, index) => {
        expect(project.title.length).toBeGreaterThan(5, `Project ${index} title too short`)
        expect(project.title.length).toBeLessThan(300, `Project ${index} title too long`)
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
      
      expect(foundTags.length).toBeGreaterThan(0, 'Should contain some common technologies')
    })

    it('should have AI-related projects', () => {
      const aiProjects = projectsData.projects.filter(p => 
        p.primary_tags.some(tag => tag.toLowerCase().includes('ai')) ||
        p.primary_tags.some(tag => tag.toLowerCase().includes('llm')) ||
        p.title.toLowerCase().includes('ai')
      )
      
      expect(aiProjects.length).toBeGreaterThan(0, 'Should have AI-related projects')
    })

    it('should have cloud-related projects', () => {
      const cloudProjects = projectsData.projects.filter(p => 
        p.primary_tags.some(tag => ['AWS', 'Azure', 'Cloud'].includes(tag)) ||
        p.tags.some(tag => ['AWS', 'Azure'].includes(tag))
      )
      
      expect(cloudProjects.length).toBeGreaterThan(0, 'Should have cloud-related projects')
    })

    it('should have web development projects', () => {
      const webProjects = projectsData.projects.filter(p => 
        p.tags.some(tag => ['React', 'Angular', 'TypeScript', 'JavaScript'].includes(tag))
      )
      
      expect(webProjects.length).toBeGreaterThan(0, 'Should have web development projects')
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
      
      expect(hasAIProjects).toBe(true, 'Should have AI projects')
      expect(hasDMGProjects).toBe(true, 'Should have DMG Mori projects')
    })

    it('should have consistent data structure across all projects', () => {
      const firstProject = projectsData.projects[0]
      const keys = Object.keys(firstProject)
      
      projectsData.projects.forEach((project, index) => {
        const projectKeys = Object.keys(project)
        
        // Check that all projects have at least the required keys
        const requiredKeys = ['customer', 'title', 'description', 'primary_tags', 'tags']
        requiredKeys.forEach(key => {
          expect(projectKeys.includes(key)).toBe(true, `Project ${index} missing required key: ${key}`)
        })
      })
    })
  })

  describe('data integrity', () => {
    it('should not have duplicate projects', () => {
      const signatures = projectsData.projects.map(p => `${p.customer}-${p.title}`)
      const uniqueSignatures = new Set(signatures)
      
      expect(uniqueSignatures.size).toBe(signatures.length, 'Projects should be unique by customer-title combination')
    })

    it('should have proper text encoding', () => {
      projectsData.projects.forEach((project, index) => {
        // Check that text doesn't contain common encoding issues
        const textFields = [project.customer, project.title, ...project.description]
        
        textFields.forEach(text => {
          expect(text).not.toMatch(/â€™/g, `Project ${index} has encoding issues with apostrophes`)
          expect(text).not.toMatch(/â€œ|â€/g, `Project ${index} has encoding issues with quotes`)
        })
      })
    })

    it('should have consistent tag formatting', () => {
      const allTags = projectsData.projects.flatMap(p => [...p.primary_tags, ...p.tags])
      
      allTags.forEach(tag => {
        // Tags should not start or end with whitespace
        expect(tag).toBe(tag.trim(), `Tag "${tag}" has leading/trailing whitespace`)
        
        // Tags should not be empty
        expect(tag.length).toBeGreaterThan(0, 'Tag should not be empty')
        
        // Tags should have reasonable length
        expect(tag.length).toBeLessThan(50, `Tag "${tag}" is too long`)
      })
    })
  })
})