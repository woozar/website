import { describe, it, expect } from 'vitest'
import { Container, Section, Grid } from './index'

describe('Layout index exports', () => {
  it('should export Container component', () => {
    expect(Container).toBeDefined()
    expect(typeof Container).toBe('function')
  })

  it('should export Section component', () => {
    expect(Section).toBeDefined()
    expect(typeof Section).toBe('function')
  })

  it('should export Grid component', () => {
    expect(Grid).toBeDefined()
    expect(typeof Grid).toBe('function')
  })

  it('should export all layout components', () => {
    const exports = { Container, Section, Grid }
    expect(Object.keys(exports)).toHaveLength(3)
  })

  it('should have proper component names', () => {
    expect(Container.name).toBe('Container')
    expect(Section.name).toBe('Section')
    expect(Grid.name).toBe('Grid')
  })
})