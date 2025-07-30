import { describe, it, expect } from 'vitest'
import { About } from './index'

describe('About index exports', () => {
  it('should export About component', () => {
    expect(About).toBeDefined()
    expect(typeof About).toBe('function')
  })

  it('should be a React component', () => {
    expect(About.name).toBe('About')
  })
})