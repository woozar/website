import { screen, fireEvent } from '@testing-library/react';
import { customRender as render } from '../../test/render';
import { describe, it, expect, vi } from 'vitest';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Project } from '../../types';

// Mock dependencies
vi.mock('../../hooks/useModal', () => ({
  useModal: () => ({
    openModal: vi.fn(),
    closeModal: vi.fn()
  })
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  useReducedMotion: () => false
}));

const mockProject: Project = {
  customer: 'Test Customer',
  title: 'Test Project with Markdown',
  description: [
    'This is a **bold** text with *italic* formatting.',
    'Visit our [website](https://example.com) for more info.',
    'Regular paragraph without formatting.'
  ],
  primary_tags: ['React', 'TypeScript'],
  tags: ['Testing', 'Vitest'],
  comment: 'Test comment'
};

describe('ProjectDetailModal', () => {
  const defaultProps = {
    project: mockProject,
    opened: true,
    onClose: vi.fn()
  };

  it('should not render when project is null', () => {
    render(<ProjectDetailModal {...defaultProps} project={null} />);
    
    expect(screen.queryByText('Test Project with Markdown')).not.toBeInTheDocument();
  });

  it('should not render when opened is false', () => {
    render(<ProjectDetailModal {...defaultProps} opened={false} />);
    
    expect(screen.queryByText('Test Project with Markdown')).not.toBeInTheDocument();
  });

  it('should render project details when opened', () => {
    render(<ProjectDetailModal {...defaultProps} />);
    
    expect(screen.getByText('Test Project with Markdown')).toBeInTheDocument();
    expect(screen.getByText('Test Customer')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
  });

  it('should render markdown content correctly', () => {
    render(<ProjectDetailModal {...defaultProps} />);
    
    // Check that markdown content is rendered
    const content = screen.getByText(/This is a/i);
    expect(content).toBeInTheDocument();
    
    // Check for links
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(<ProjectDetailModal {...defaultProps} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render primary and secondary tags', () => {
    render(<ProjectDetailModal {...defaultProps} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('Vitest')).toBeInTheDocument();
  });

  it('should handle project without description gracefully', () => {
    const projectWithoutDescription = {
      ...mockProject,
      description: [] as string[]
    };
    
    render(<ProjectDetailModal {...defaultProps} project={projectWithoutDescription} />);
    
    expect(screen.getByText('Test Project with Markdown')).toBeInTheDocument();
    expect(screen.getByText('Test Customer')).toBeInTheDocument();
  });

  it('should handle project with empty description array', () => {
    const projectWithEmptyDescription = {
      ...mockProject,
      description: []
    };
    
    render(<ProjectDetailModal {...defaultProps} project={projectWithEmptyDescription} />);
    
    expect(screen.getByText('Test Project with Markdown')).toBeInTheDocument();
    expect(screen.getByText('Test Customer')).toBeInTheDocument();
  });

  it('should apply correct styles to markdown elements', () => {
    render(<ProjectDetailModal {...defaultProps} />);
    
    // Check if link has the correct color style
    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ color: 'var(--primary-orange)' });
  });

  it('should handle markdown formatting in multiple paragraphs', () => {
    const projectWithMultipleParagraphs = {
      ...mockProject,
      description: [
        'First paragraph with **bold**.',
        'Second paragraph with *italic*.',
        'Third paragraph with [link](https://test.com).'
      ]
    };
    
    render(<ProjectDetailModal {...defaultProps} project={projectWithMultipleParagraphs} />);
    
    expect(screen.getByText(/First paragraph/i)).toBeInTheDocument();
    expect(screen.getByText(/Second paragraph/i)).toBeInTheDocument();
    expect(screen.getByText(/Third paragraph/i)).toBeInTheDocument();
    
    // Should have one link
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', 'https://test.com');
  });
});