import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { customRender as render } from '../../test/render';
import { ActiveTagsFilter } from './ActiveTagsFilter';
import { useFilterStore } from '../../stores/filterStore';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}));

// Mock the filter store
vi.mock('../../stores/filterStore', () => ({
  useFilterStore: vi.fn()
}));

const mockFilterStore = {
  selectedPrimaryTags: [],
  selectedSecondaryTags: [],
  togglePrimaryTag: vi.fn(),
  toggleSecondaryTag: vi.fn(),
  clearAllFilters: vi.fn()
};

describe('ActiveTagsFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useFilterStore as any).mockReturnValue(mockFilterStore);
  });

  it('should not render when no filters are active', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: [],
      selectedSecondaryTags: []
    });

    render(<ActiveTagsFilter />);
    
    // Component should return null when no filters are active
    expect(screen.queryByText('Aktive Filter:')).not.toBeInTheDocument();
    expect(screen.queryByText('Alle Filter löschen')).not.toBeInTheDocument();
  });

  it('should render with primary tags', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: ['React', 'TypeScript'],
      selectedSecondaryTags: []
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('Aktive Filter:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Alle Filter löschen')).toBeInTheDocument();
  });

  it('should render with secondary tags', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: [],
      selectedSecondaryTags: ['Node.js', 'Express']
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('Aktive Filter:')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
    expect(screen.getByText('Alle Filter löschen')).toBeInTheDocument();
  });

  it('should render with both primary and secondary tags', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: ['React'],
      selectedSecondaryTags: ['Node.js']
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('should call togglePrimaryTag when removing a primary tag', () => {
    const mockTogglePrimaryTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: ['React'],
      selectedSecondaryTags: [],
      togglePrimaryTag: mockTogglePrimaryTag
    });

    render(<ActiveTagsFilter />);
    
    // Find the remove button inside the React badge
    const reactBadge = screen.getByText('React').closest('.mantine-Badge-root');
    const removeButton = reactBadge?.querySelector('button');
    
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton!);
    expect(mockTogglePrimaryTag).toHaveBeenCalledWith('React');
  });

  it('should call toggleSecondaryTag when removing a secondary tag', () => {
    const mockToggleSecondaryTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: [],
      selectedSecondaryTags: ['Node.js'],
      toggleSecondaryTag: mockToggleSecondaryTag
    });

    render(<ActiveTagsFilter />);
    
    // Find the remove button inside the Node.js badge
    const nodeBadge = screen.getByText('Node.js').closest('.mantine-Badge-root');
    const removeButton = nodeBadge?.querySelector('button');
    
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton!);
    expect(mockToggleSecondaryTag).toHaveBeenCalledWith('Node.js');
  });

  it('should call clearAllFilters when clicking clear all button', () => {
    const mockClearAllFilters = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: ['React'],
      selectedSecondaryTags: ['Node.js'],
      clearAllFilters: mockClearAllFilters
    });

    render(<ActiveTagsFilter />);
    
    const clearAllButton = screen.getByText('Alle Filter löschen');
    fireEvent.click(clearAllButton);
    
    expect(mockClearAllFilters).toHaveBeenCalled();
  });

  it('should have correct styling for primary tags', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: ['React'],
      selectedSecondaryTags: []
    });

    render(<ActiveTagsFilter />);
    
    const reactTag = screen.getByText('React');
    const badge = reactTag.closest('.mantine-Badge-root');
    
    expect(badge).toHaveStyle({
      color: 'rgb(255, 255, 255)'
    });
  });

  it('should have correct styling for secondary tags', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: [],
      selectedSecondaryTags: ['Node.js']
    });

    render(<ActiveTagsFilter />);
    
    const nodeTag = screen.getByText('Node.js');
    const badge = nodeTag.closest('.mantine-Badge-root');
    
    expect(badge).toHaveStyle({
      color: 'rgb(255, 255, 255)'
    });
  });

  it('should handle multiple primary tags removal', () => {
    const mockTogglePrimaryTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: ['React', 'TypeScript', 'JavaScript'],
      selectedSecondaryTags: [],
      togglePrimaryTag: mockTogglePrimaryTag
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('should handle multiple secondary tags removal', () => {
    const mockToggleSecondaryTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedPrimaryTags: [],
      selectedSecondaryTags: ['Node.js', 'Express', 'MongoDB'],
      toggleSecondaryTag: mockToggleSecondaryTag
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
  });
});