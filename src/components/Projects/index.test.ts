import { describe, it, expect } from 'vitest';

describe('Projects index exports', () => {
  it('should export ImprovedProjectCard', async () => {
    const module = await import('./index');
    expect(module.ImprovedProjectCard).toBeDefined();
    expect(typeof module.ImprovedProjectCard).toBe('function');
  });

  it('should export ProjectDetailModal', async () => {
    const module = await import('./index');
    expect(module.ProjectDetailModal).toBeDefined();
    expect(typeof module.ProjectDetailModal).toBe('function');
  });

  it('should export SimpleProjectsSection', async () => {
    const module = await import('./index');
    expect(module.SimpleProjectsSection).toBeDefined();
    expect(typeof module.SimpleProjectsSection).toBe('function');
  });

  it('should export all expected components', async () => {
    const module = await import('./index');
    const exports = Object.keys(module);
    
    expect(exports).toContain('ImprovedProjectCard');
    expect(exports).toContain('ProjectDetailModal');
    expect(exports).toContain('SimpleProjectsSection');
    expect(exports).toHaveLength(3);
  });
});