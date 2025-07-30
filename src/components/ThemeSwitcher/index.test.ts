import { describe, it, expect } from 'vitest';

describe('ThemeSwitcher index exports', () => {
  it('should export ThemeSwitcher', async () => {
    const module = await import('./index');
    expect(module.ThemeSwitcher).toBeDefined();
    expect(typeof module.ThemeSwitcher).toBe('function');
  });

  it('should export all expected components', async () => {
    const module = await import('./index');
    const exports = Object.keys(module);
    
    expect(exports).toContain('ThemeSwitcher');
    expect(exports).toHaveLength(1);
  });
});