import { describe, it, expect } from 'vitest'
import { translations, getTranslation } from './index'
import { de } from './de'
import { en } from './en'

describe('translations/index', () => {
  describe('translations object', () => {
    it('should contain all required language translations', () => {
      expect(translations).toHaveProperty('de')
      expect(translations).toHaveProperty('en')
    })

    it('should reference correct translation modules', () => {
      expect(translations.de).toBe(de)
      expect(translations.en).toBe(en)
    })

    it('should have consistent structure between languages', () => {
      const deKeys = Object.keys(translations.de)
      const enKeys = Object.keys(translations.en)

      expect(deKeys).toEqual(enKeys)
    })
  })

  describe('getTranslation function', () => {
    it('should return German translations for "de" language', () => {
      const result = getTranslation('de')
      
      expect(result).toBe(translations.de)
      expect(result).toBe(de)
    })

    it('should return English translations for "en" language', () => {
      const result = getTranslation('en')
      
      expect(result).toBe(translations.en)
      expect(result).toBe(en)
    })

    it('should return the same reference on multiple calls', () => {
      const result1 = getTranslation('de')
      const result2 = getTranslation('de')
      
      expect(result1).toBe(result2)
    })

    it('should handle language parameter correctly', () => {
      // Test with different languages
      expect(getTranslation('de')).not.toBe(getTranslation('en'))
    })
  })

  describe('translation completeness', () => {
    it('should have all required navigation keys in both languages', () => {
      const requiredNavKeys = ['about', 'projects', 'services', 'contact']
      
      requiredNavKeys.forEach(key => {
        expect(translations.de.navigation).toHaveProperty(key)
        expect(translations.en.navigation).toHaveProperty(key)
      })
    })

    it('should have all required hero keys in both languages', () => {
      const requiredHeroKeys = ['title', 'description']
      
      requiredHeroKeys.forEach(key => {
        expect(translations.de.hero).toHaveProperty(key)
        expect(translations.en.hero).toHaveProperty(key)
      })
    })

    it('should have non-empty string values for all translation keys', () => {
      const checkTranslationValues = (obj: any, path = '') => {
        Object.entries(obj).forEach(([key, value]) => {
          const currentPath = path ? `${path}.${key}` : key
          
          if (typeof value === 'string') {
            expect(value.trim()).not.toBe('', `Empty translation at ${currentPath}`)
          } else if (typeof value === 'object' && value !== null) {
            checkTranslationValues(value, currentPath)
          }
        })
      }

      checkTranslationValues(translations.de)
      checkTranslationValues(translations.en)
    })

    it('should have matching nested structure between languages', () => {
      const getNestedKeys = (obj: any, prefix = ''): string[] => {
        const keys: string[] = []
        
        Object.entries(obj).forEach(([key, value]) => {
          const currentKey = prefix ? `${prefix}.${key}` : key
          
          if (typeof value === 'object' && value !== null) {
            keys.push(...getNestedKeys(value, currentKey))
          } else {
            keys.push(currentKey)
          }
        })
        
        return keys.sort()
      }

      const deKeys = getNestedKeys(translations.de)
      const enKeys = getNestedKeys(translations.en)

      expect(deKeys).toEqual(enKeys)
    })
  })

  describe('type safety', () => {
    it('should maintain type consistency', () => {
      const deTranslation = getTranslation('de')
      const enTranslation = getTranslation('en')

      // Both should have the same structure
      expect(typeof deTranslation).toBe('object')
      expect(typeof enTranslation).toBe('object')
      
      // Check that both have the same top-level keys
      expect(Object.keys(deTranslation).sort()).toEqual(Object.keys(enTranslation).sort())
    })

    it('should have proper typing for TranslationKey type', () => {
      // This is more of a compile-time check, but we can verify the runtime behavior
      const deTranslation = getTranslation('de')
      
      // Should have expected top-level keys that would be valid TranslationKey values
      expect(deTranslation).toHaveProperty('navigation')
      expect(deTranslation).toHaveProperty('hero')
    })
  })

  describe('edge cases', () => {
    it('should handle the same language parameter consistently', () => {
      const result1 = getTranslation('de')
      const result2 = getTranslation('de')
      const result3 = getTranslation('de')

      expect(result1).toBe(result2)
      expect(result2).toBe(result3)
    })

    it('should work with both language values', () => {
      expect(() => getTranslation('de')).not.toThrow()
      expect(() => getTranslation('en')).not.toThrow()
    })

    it('should return different objects for different languages', () => {
      const deResult = getTranslation('de')
      const enResult = getTranslation('en')

      expect(deResult).not.toBe(enResult)
      expect(deResult).not.toEqual(enResult)
    })
  })

  describe('translation quality', () => {
    it('should have meaningful translation differences between languages', () => {
      const deTranslation = getTranslation('de')
      const enTranslation = getTranslation('en')

      // Check that translations are actually different (not just copied)
      expect(deTranslation.navigation.about).not.toBe(enTranslation.navigation.about)
      expect(deTranslation.navigation.contact).not.toBe(enTranslation.navigation.contact)
    })

    it('should have appropriate length translations', () => {
      const checkTranslationLength = (obj: any) => {
        Object.values(obj).forEach(value => {
          if (typeof value === 'string') {
            expect(value.length).toBeGreaterThan(0)
            expect(value.length).toBeLessThan(1000) // Reasonable upper bound
          } else if (typeof value === 'object' && value !== null) {
            checkTranslationLength(value)
          }
        })
      }

      checkTranslationLength(translations.de)
      checkTranslationLength(translations.en)
    })
  })
})