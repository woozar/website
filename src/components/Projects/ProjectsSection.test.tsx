import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { ProjectsSection } from './ProjectsSection';
import { ModalProvider } from '@/contexts/ModalContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: vi.fn(),
}));

// Import after mocking
import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Mock hooks
const mockProjects = [
  {
    id: '1',
    title: 'Test Project 1',
    customer: 'Test Customer 1',
    primary_tags: ['React', 'TypeScript'],
    tags: ['JavaScript'],
    description: 'Test description 1',
    technologies: ['React', 'TypeScript'],
    completion_year: 2023,
    customer_sector: 'Technology',
    project_type: 'Web Development',
    team_size: 3,
    duration_months: 6,
    features: ['Feature 1'],
    challenges: ['Challenge 1'],
    outcomes: ['Outcome 1'],
    images: []
  },
  {
    id: '2',
    title: 'Test Project 2',
    customer: 'Test Customer 2',
    primary_tags: ['Vue'],
    tags: ['CSS'],
    description: 'Test description 2',
    technologies: ['Vue'],
    completion_year: 2023,
    customer_sector: 'Finance',
    project_type: 'Web Development',
    team_size: 2,
    duration_months: 4,
    features: ['Feature 2'],
    challenges: ['Challenge 2'],
    outcomes: ['Outcome 2'],
    images: []
  },
  {
    id: '3',
    title: 'Test Project 3',
    customer: 'Another Company',
    primary_tags: ['Angular'],
    tags: ['SCSS'],
    description: 'Test description 3',
    technologies: ['Angular'],
    completion_year: 2024,
    customer_sector: 'Healthcare',
    project_type: 'Web Development',
    team_size: 5,
    duration_months: 8,
    features: ['Feature 3'],
    challenges: ['Challenge 3'],
    outcomes: ['Outcome 3'],
    images: []
  }
];

vi.mock('../../hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock('../../hooks/useProjects', () => ({
  useProjects: () => ({
    projects: mockProjects,
  }),
}));

vi.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: {
      projects: {
        title: 'Our Projects',
        subtitle: 'Take a look at our recent work',
        showingCount: (filtered: number, total: number) => 
          `Showing ${filtered} of ${total} projects`,
      },
    },
  }),
}));

vi.mock('../../stores/filterStore', () => ({
  useFilterStore: vi.fn(),
}));

// Import after mocking
import { useFilterStore } from '../../stores/filterStore';

// Mock child components
vi.mock('./ImprovedProjectCard', () => ({
  ImprovedProjectCard: ({ project, index }: any) => (
    <div data-testid={`project-card-${index}`}>
      <h3>{project.title}</h3>
      <p>{project.customer}</p>
      <div data-testid="primary-tags">
        {project.primary_tags?.join(', ')}
      </div>
      <div data-testid="secondary-tags">
        {project.tags?.join(', ')}
      </div>
    </div>
  ),
}));

vi.mock('../Filter/ActiveTagsFilter', () => ({
  ActiveTagsFilter: () => <div data-testid="active-tags-filter">Filter Component</div>,
}));

vi.mock('../Layout', () => ({
  Section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  Grid: ({ children, ...props }: any) => <div data-testid="grid" {...props}>{children}</div>,
}));

const renderComponent = () => {
  return render(
    <MantineProvider>
      <ModalProvider>
        <ProjectsSection />
      </ModalProvider>
    </MantineProvider>
  );
};

describe('ProjectsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFilterStore).mockReturnValue({
      selectedTags: [],
      selectedCustomer: '',
    });
    // Set default reduced motion to false
    vi.mocked(useReducedMotion).mockReturnValue(false);
    // Set default media query to desktop
    vi.mocked(useMediaQuery).mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  describe('Basic rendering', () => {
    it('should render projects section with title and subtitle', () => {
      renderComponent();

      expect(screen.getByText('Our Projects')).toBeInTheDocument();
      expect(screen.getByText('Take a look at our recent work')).toBeInTheDocument();
    });

    it('should render ActiveTagsFilter component', () => {
      renderComponent();

      expect(screen.getByTestId('active-tags-filter')).toBeInTheDocument();
      expect(screen.getByText('Filter Component')).toBeInTheDocument();
    });

    it('should render grid layout for projects', () => {
      renderComponent();

      expect(screen.getByTestId('grid')).toBeInTheDocument();
    });

    it('should render project count information', () => {
      renderComponent();

      expect(screen.getByText('Showing 3 of 3 projects')).toBeInTheDocument();
    });
  });

  describe('Project rendering without filters', () => {
    it('should render all projects when no filters are applied', () => {
      renderComponent();

      expect(screen.getByTestId('project-card-0')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-2')).toBeInTheDocument();

      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.getByText('Test Project 2')).toBeInTheDocument();
      expect(screen.getByText('Test Project 3')).toBeInTheDocument();
    });

    it('should render project details correctly', () => {
      renderComponent();

      expect(screen.getByText('Test Customer 1')).toBeInTheDocument();
      expect(screen.getByText('Test Customer 2')).toBeInTheDocument();
      expect(screen.getByText('Another Company')).toBeInTheDocument();
    });

    it('should render project tags correctly', () => {
      renderComponent();

      const primaryTagsElements = screen.getAllByTestId('primary-tags');
      const secondaryTagsElements = screen.getAllByTestId('secondary-tags');

      expect(primaryTagsElements[0]).toHaveTextContent('React, TypeScript');
      expect(primaryTagsElements[1]).toHaveTextContent('Vue');
      expect(primaryTagsElements[2]).toHaveTextContent('Angular');

      expect(secondaryTagsElements[0]).toHaveTextContent('JavaScript');
      expect(secondaryTagsElements[1]).toHaveTextContent('CSS');
      expect(secondaryTagsElements[2]).toHaveTextContent('SCSS');
    });
  });

  describe('Tag filtering functionality', () => {
    it('should render filter functionality with all projects by default', () => {
      renderComponent();

      // When no filters are applied, all projects should show
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.getByText('Test Project 2')).toBeInTheDocument();
      expect(screen.getByText('Test Project 3')).toBeInTheDocument();
      expect(screen.getByText('Showing 3 of 3 projects')).toBeInTheDocument();
    });
  });

  describe('Filtering integration', () => {
    it('should work with filter store integration', () => {
      renderComponent();

      // The component integrates with useFilterStore hook
      // Since no filters are selected in our mock, all projects show
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.getByText('Test Project 2')).toBeInTheDocument();
      expect(screen.getByText('Test Project 3')).toBeInTheDocument();
      expect(screen.getByText('Showing 3 of 3 projects')).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render section with proper structure', () => {
      renderComponent();

      // Should have section, title, filter, grid, and count
      expect(screen.getByText('Our Projects')).toBeInTheDocument();
      expect(screen.getByText('Take a look at our recent work')).toBeInTheDocument();
      expect(screen.getByTestId('active-tags-filter')).toBeInTheDocument();
      expect(screen.getByTestId('grid')).toBeInTheDocument();
      expect(screen.getByText('Showing 3 of 3 projects')).toBeInTheDocument();
    });

    it('should render all project cards with correct structure', () => {
      renderComponent();

      // Should render all project cards
      expect(screen.getByTestId('project-card-0')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-2')).toBeInTheDocument();
    });
  });

  describe('Filtering functionality', () => {
    it('should filter projects by selected tags', () => {
      // Mock filter store with selected tags
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ['React'],
        selectedCustomer: '',
      });

      renderComponent();

      // Should only show projects with React tag
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Project 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Project 3')).not.toBeInTheDocument();
      expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();
    });

    it('should filter projects by customer name', () => {
      // Mock filter store with selected customer
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: [],
        selectedCustomer: 'Another',
      });

      renderComponent();

      // Should only show projects from "Another Company"
      expect(screen.queryByText('Test Project 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Project 2')).not.toBeInTheDocument();
      expect(screen.getByText('Test Project 3')).toBeInTheDocument();
      expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();
    });

    it('should filter projects by both tags and customer', () => {
      // Mock filter store with both selected tags and customer
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ['TypeScript'],
        selectedCustomer: 'Test',
      });

      renderComponent();

      // Should only show projects that match both criteria
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Project 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Project 3')).not.toBeInTheDocument();
      expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();
    });

    it('should handle case insensitive customer filtering', () => {
      // Mock filter store with uppercase customer name
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: [],
        selectedCustomer: 'ANOTHER',
      });

      renderComponent();

      // Should still find "Another Company" with case insensitive search
      expect(screen.getByText('Test Project 3')).toBeInTheDocument();
      expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();
    });
  });

  describe('Animation and Reduced Motion', () => {
    it('should render with normal animations when reduced motion is false', () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      renderComponent();

      // Component should render successfully with animations enabled
      expect(screen.getByText('Our Projects')).toBeInTheDocument();
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.getByText('Test Project 2')).toBeInTheDocument();
    });

    it('should render with reduced motion animations when reduced motion is true', () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      renderComponent();

      // Component should render successfully with reduced animations
      expect(screen.getByText('Our Projects')).toBeInTheDocument();
      expect(screen.getByText('Take a look at our recent work')).toBeInTheDocument();
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    });

    it('should handle filtering functionality with reduced motion enabled', () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ['React'],
        selectedCustomer: '',
      });

      renderComponent();

      // Filtering should still work with reduced motion
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Project 2')).not.toBeInTheDocument();
      expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should handle mobile layout', () => {
      // Update the useMediaQuery mock to return mobile view
      vi.mocked(useMediaQuery).mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      renderComponent();

      // Component should render successfully with mobile layout
      expect(screen.getByText('Our Projects')).toBeInTheDocument();
      expect(screen.getByText('Take a look at our recent work')).toBeInTheDocument();
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.getByText('Test Project 2')).toBeInTheDocument();
      expect(screen.getByText('Test Project 3')).toBeInTheDocument();
      expect(screen.getByText('Showing 3 of 3 projects')).toBeInTheDocument();
    });
  });
});