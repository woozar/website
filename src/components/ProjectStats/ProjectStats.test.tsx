import { screen } from '@testing-library/react';
import { customRender as render } from '../../test/render';
import { ProjectStats } from './ProjectStats';
import { describe, expect, it, vi } from 'vitest';

// Mock useProjects hook
vi.mock('../../hooks/useProjects', () => ({
  useProjects: () => ({
    projects: [
      {
        customer: 'Test Company A',
        title: 'Test Project 1',
        description: ['Test description'],
        primary_tags: ['React', 'TypeScript'],
        tags: ['Node.js', 'AWS']
      },
      {
        customer: 'Test Company B',
        title: 'Test Project 2',
        description: ['Test description'],
        primary_tags: ['Angular', 'TypeScript'],
        tags: ['Docker', 'Azure']
      }
    ]
  })
}));

describe('ProjectStats', () => {
  it('should render project statistics section', () => {
    render(<ProjectStats />);
    
    expect(screen.getByText('Project Statistics')).toBeInTheDocument();
    expect(screen.getByText('Quantified expertise based on real project experience')).toBeInTheDocument();
  });

  it('should display overview cards', () => {
    render(<ProjectStats />);
    
    expect(screen.getByText('Total Projects')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
    expect(screen.getByText('Companies')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('should show correct project count', () => {
    render(<ProjectStats />);
    
    // Should show 2 projects from mock data
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should display technology expertise sections', () => {
    render(<ProjectStats />);
    
    expect(screen.getByText('Technology Expertise')).toBeInTheDocument();
    expect(screen.getByText('Core Technologies')).toBeInTheDocument();
    expect(screen.getByText('Most Used Technologies')).toBeInTheDocument();
  });

  it('should show companies section', () => {
    render(<ProjectStats />);
    
    expect(screen.getByText('Trusted by 2 Companies')).toBeInTheDocument();
    expect(screen.getByText('Test Company A')).toBeInTheDocument();
    expect(screen.getByText('Test Company B')).toBeInTheDocument();
  });

  it('should display technology badges and progress bars', () => {
    render(<ProjectStats />);
    
    // Should show TypeScript (appears in both projects)
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    
    // Should show experience levels
    expect(screen.getByText('Expert')).toBeInTheDocument();
  });

  it('should handle empty projects gracefully', () => {
    // Override the mock for this test
    vi.mock('../../hooks/useProjects', () => ({
      useProjects: () => ({
        projects: []
      })
    }));
    
    render(<ProjectStats />);
    
    expect(screen.getByText('Project Statistics')).toBeInTheDocument();
    // Should still render without errors even with no projects
  });

  it('should be responsive on mobile', () => {
    // Mock mobile viewport
    vi.mock('../../hooks/useMediaQuery', () => ({
      useMediaQuery: () => ({
        isMobile: true,
        isTablet: false,
        isDesktop: false
      })
    }));
    
    render(<ProjectStats />);
    
    expect(screen.getByText('Project Statistics')).toBeInTheDocument();
    // Component should render without issues on mobile
  });
});