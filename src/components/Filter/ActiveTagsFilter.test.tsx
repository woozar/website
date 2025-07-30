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
  selectedTags: [],
  selectedCustomer: '',
  toggleTag: vi.fn(),
  setCustomerFilter: vi.fn(),
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
      selectedTags: [],
      selectedCustomer: ''
    });

    render(<ActiveTagsFilter />);
    
    // Component should return null when no filters are active
    expect(screen.queryByText('Aktive Filter:')).not.toBeInTheDocument();
    expect(screen.queryByText('Alle Filter löschen')).not.toBeInTheDocument();
  });

  it('should render with tags', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ['React', 'TypeScript']
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('Aktive Filter:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Alle Filter löschen')).toBeInTheDocument();
  });

  it('should render with multiple tags', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ['Node.js', 'Express']
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('Aktive Filter:')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
    expect(screen.getByText('Alle Filter löschen')).toBeInTheDocument();
  });

  it('should render with mixed tags', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ['React', 'Node.js']
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('should call toggleTag when removing a tag', () => {
    const mockToggleTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ['React'],
      toggleTag: mockToggleTag
    });

    render(<ActiveTagsFilter />);
    
    // Find the remove button inside the React badge
    const reactBadge = screen.getByText('React').closest('.mantine-Badge-root');
    const removeButton = reactBadge?.querySelector('button');
    
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton!);
    expect(mockToggleTag).toHaveBeenCalledWith('React');
  });

  it('should call toggleTag when removing another tag', () => {
    const mockToggleTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ['Node.js'],
      toggleTag: mockToggleTag
    });

    render(<ActiveTagsFilter />);
    
    // Find the remove button inside the Node.js badge
    const nodeBadge = screen.getByText('Node.js').closest('.mantine-Badge-root');
    const removeButton = nodeBadge?.querySelector('button');
    
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton!);
    expect(mockToggleTag).toHaveBeenCalledWith('Node.js');
  });

  it('should call clearAllFilters when clicking clear all button', () => {
    const mockClearAllFilters = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ['React', 'Node.js'],
      clearAllFilters: mockClearAllFilters
    });

    render(<ActiveTagsFilter />);
    
    const clearAllButton = screen.getByText('Alle Filter löschen');
    fireEvent.click(clearAllButton);
    
    expect(mockClearAllFilters).toHaveBeenCalled();
  });

  it('should have correct styling for tags', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ['React']
    });

    render(<ActiveTagsFilter />);
    
    const reactTag = screen.getByText('React');
    const badge = reactTag.closest('.mantine-Badge-root');
    
    expect(badge).toHaveStyle({
      color: 'rgb(255, 255, 255)'
    });
  });

  it('should have consistent styling for all tags', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ['Node.js']
    });

    render(<ActiveTagsFilter />);
    
    const nodeTag = screen.getByText('Node.js');
    const badge = nodeTag.closest('.mantine-Badge-root');
    
    expect(badge).toHaveStyle({
      color: 'rgb(255, 255, 255)'
    });
  });

  it('should handle multiple tags display', () => {
    const mockToggleTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ['React', 'TypeScript', 'JavaScript'],
      toggleTag: mockToggleTag
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('should handle large number of tags', () => {
    const mockToggleTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ['Node.js', 'Express', 'MongoDB'],
      toggleTag: mockToggleTag
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
  });

  it('should render with customer filter only', () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: [],
      selectedCustomer: 'DMG Mori Software Solution'
    });

    render(<ActiveTagsFilter />);
    
    expect(screen.getByText('Aktive Filter:')).toBeInTheDocument();
    expect(screen.getByText('DMG')).toBeInTheDocument(); // Shows first word
    expect(screen.getByText('Alle Filter löschen')).toBeInTheDocument();
  });

  it('should call setCustomerFilter when removing customer filter', () => {
    const mockSetCustomerFilter = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: [],
      selectedCustomer: 'TestCompany GmbH',
      setCustomerFilter: mockSetCustomerFilter
    });

    render(<ActiveTagsFilter />);
    
    // Find the remove button inside the customer badge
    const customerBadge = screen.getByText('TestCompany').closest('.mantine-Badge-root');
    const removeButton = customerBadge?.querySelector('button');
    
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton!);
    expect(mockSetCustomerFilter).toHaveBeenCalledWith('');
  });
});