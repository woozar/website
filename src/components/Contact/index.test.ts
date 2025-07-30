import { describe, it, expect } from 'vitest'
import { Contact } from './index'

describe('Contact index exports', () => {
  it('should export Contact component', () => {
    expect(Contact).toBeDefined()
    expect(typeof Contact).toBe('function')
  })

  it('should be a React component', () => {
    expect(Contact.name).toBe('Contact')
  })
})