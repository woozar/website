import { describe, it, expect } from 'vitest';

describe('Filter index exports', () => {
  it('should export ActiveTagsFilter', async () => {
    const module = await import('./index');
    expect(module.ActiveTagsFilter).toBeDefined();
    expect(typeof module.ActiveTagsFilter).toBe('function');
  });

  it('should export TagChip', async () => {
    const module = await import('./index');
    expect(module.TagChip).toBeDefined();
    expect(typeof module.TagChip).toBe('function');
  });

  it('should export all expected components', async () => {
    const module = await import('./index');
    const exports = Object.keys(module);
    
    expect(exports).toContain('ActiveTagsFilter');
    expect(exports).toContain('TagChip');
    expect(exports).toHaveLength(2);
  });
});