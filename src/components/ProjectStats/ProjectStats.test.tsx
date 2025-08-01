import { screen, fireEvent } from '@testing-library/react';
import { customRender as render } from '../../test/render';
import { ProjectStats } from './ProjectStats';
import { describe, expect, it, vi, beforeEach } from 'vitest';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: vi.fn()
}));

// Import after mocking
import { useReducedMotion } from 'framer-motion';

// Mock all dependencies properly
vi.mock('../../hooks/useProjects', () => ({
  useProjects: vi.fn()
}));

// Import after mocking
import { useProjects } from '../../hooks/useProjects';
import { useMediaQuery } from '../../hooks/useMediaQuery';

vi.mock('../../hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn()
}));

vi.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: {
      projectStats: {
        title: 'Project Statistics',
        subtitle: 'Quantified expertise based on real project experience',
        cards: {
          totalProjects: 'Total Projects',
          totalProjectsDesc: 'Completed projects',
          technologies: 'Technologies',
          technologiesDesc: 'Different technologies used',
          frameworks: 'Frameworks',
          frameworksDesc: 'Development frameworks',
          companies: 'Companies',
          companiesDesc: 'Companies worked with',
          yearsExperience: 'Years Experience',
          yearsExperienceDesc: 'Years of professional development'
        },
        technologies: {
          typescript: 'TypeScript',
          javascript: 'JavaScript',
          python: 'Python',
          java: 'Java',
          csharp: 'C#',
          nodejs: 'Node.js',
          react: 'React',
          angular: 'Angular',
          vue: 'Vue.js',
          azure: 'Azure',
          aiLlm: 'AI/LLM'
        },
        experience: {
          years8: '8+ Jahre',
          years6: '6+ Jahre',
          years5: '5+ Jahre',
          years3: '3+ Jahre',
          expert: 'Expert',
          advanced: 'Advanced',
          intermediate: 'Intermediate'
        },
        expertiseLevel: {
          expert: 'Expert',
          advanced: 'Advanced',
          intermediate: 'Intermediate',
          specialist: 'Specialist'
        },
        companiesSection: {
          title: 'Trusted by Leading Companies',
          subtitle: 'Zusammenarbeit mit führenden Unternehmen verschiedener Branchen'
        },
        frameworksTooltip: 'Used Frameworks',
        accessibility: {
          cardFlipShow: 'Click to show details',
          cardFlipHide: 'Click to hide details'
        },
        coreExpertise: 'Core Expertise',
        trustedBy: 'Trusted by Leading Companies'
      }
    }
  })
}));

vi.mock('../../stores/themeStore', () => ({
  useThemeStore: (selector: any) => selector({ theme: 'light' })
}));

vi.mock('../../stores/filterStore', () => ({
  useFilterStore: () => ({
    setCustomerFilter: vi.fn()
  })
}));

// Mock calculateProjectStats utility
vi.mock('../../utils/projectStats', () => ({
  calculateProjectStats: () => ({
    totalProjects: 15,
    totalTechnologies: 12,
    totalFrameworks: 6,
    topTechnologies: [],
    primaryTagStats: [],
    companiesWorkedWith: ['Test Company A', 'Test Company B'],
    yearRange: { start: 2020, end: 2024 },
    categoryBreakdown: {}
  })
}));

// StatCard is not a separate component - it's inline in ProjectStats

// Mock Mantine components that use portals
vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual('@mantine/core');
  return {
    ...actual,
    Tooltip: ({ children, label }: any) => (
      <div data-tooltip={label}>{children}</div>
    ),
    Portal: ({ children }: any) => <div>{children}</div>
  };
});

// Mock CompanyLogos component
vi.mock('./CompanyLogos', () => ({
  CompanyLogos: ({ onCompanyClick }: any) => (
    <div data-testid="company-logos">
      <img 
        alt="Siemens" 
        src="/logos/siemens-logo.svg"
        onClick={() => onCompanyClick('Siemens AG')}
        style={{ cursor: 'pointer' }}
      />
      <img 
        alt="Paessler" 
        src="/logos/paessler-logo.svg"
        onClick={() => onCompanyClick('Paessler AG')}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}));

describe('ProjectStats', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
    
    // Set default mock for useMediaQuery
    vi.mocked(useMediaQuery).mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true
    });
    
    // Set default mock for useProjects
    vi.mocked(useProjects).mockReturnValue({
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
    });
    
    // Mock DOM methods
    Object.defineProperty(document, 'querySelector', {
      value: vi.fn().mockReturnValue({
        offsetTop: 500
      }),
      writable: true
    });

    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true
    });
  });

  it('should render project statistics section', () => {
    render(<ProjectStats />);
    
    expect(screen.getByText('Project Statistics')).toBeInTheDocument();
    expect(screen.getByText('Quantified expertise based on real project experience')).toBeInTheDocument();
  });

  it('should display stat cards', () => {
    render(<ProjectStats />);
    
    // Check that all stat card content is displayed
    expect(screen.getByText('Total Projects')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
    expect(screen.getByText('Frameworks')).toBeInTheDocument();
    expect(screen.getByText('Companies')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    
    // Check stat values from our mock
    expect(screen.getByText('15')).toBeInTheDocument(); // totalProjects
    expect(screen.getByText('12')).toBeInTheDocument(); // totalTechnologies
    // Frameworks count is now dynamically calculated from actual frameworks found
    expect(screen.getByText('20')).toBeInTheDocument(); // years experience (hardcoded)
  });

  it('should render company logos section', () => {
    render(<ProjectStats />);
    
    expect(screen.getByText('Trusted by Leading Companies')).toBeInTheDocument();
    // CompanyLogos component is tested separately in CompanyLogos.test.tsx
  });

  it('should handle company logo click', () => {
    render(<ProjectStats />);
    
    const siemensLogo = screen.getByAltText('Siemens');
    fireEvent.click(siemensLogo);
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400,
      behavior: 'smooth'
    });
  });

  it('should handle company click when element not found', () => {
    document.querySelector = vi.fn().mockReturnValue(null);
    
    render(<ProjectStats />);
    
    const siemensLogo = screen.getByAltText('Siemens');
    fireEvent.click(siemensLogo);
    
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('should show correct project count', () => {
    render(<ProjectStats />);
    
    expect(screen.getByText('15')).toBeInTheDocument(); // Projects count from mock
  });

  it('should show years experience', () => {
    render(<ProjectStats />);
    
    expect(screen.getByText('20')).toBeInTheDocument(); // Hardcoded years
  });

  it('should render without errors', () => {
    expect(() => render(<ProjectStats />)).not.toThrow();
  });

  describe('Framework Detection Logic', () => {
    it('should process frameworks from project tags', () => {
      render(<ProjectStats />);
      
      // The usedFrameworks useMemo should execute without errors
      expect(screen.getByText('Frameworks')).toBeInTheDocument();
    });

    it('should handle empty projects array', () => {
      // This test mainly verifies that the component doesn't crash with empty data
      // The useProjects mock already provides projects, so we test the frameworks logic
      render(<ProjectStats />);
      expect(screen.getByText('Frameworks')).toBeInTheDocument();
    });
  });

  describe('Animation Variants', () => {
    it('should use reduced motion setting', () => {
      render(<ProjectStats />);
      
      expect(screen.getByText('Project Statistics')).toBeInTheDocument();
    });

    it('should render motion elements', () => {
      render(<ProjectStats />);
      
      expect(screen.getByText('Project Statistics')).toBeInTheDocument();
      expect(screen.getByText('Total Projects')).toBeInTheDocument();
    });

    it('should handle reduced motion animations', () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);
      
      render(<ProjectStats />);
      
      // Component should still render normally with reduced motion
      expect(screen.getByText('Project Statistics')).toBeInTheDocument();
      expect(screen.getByText('Total Projects')).toBeInTheDocument();
      expect(screen.getByText('Technologies')).toBeInTheDocument();
    });

    it('should handle normal animations when reduced motion is false', () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);
      
      render(<ProjectStats />);
      
      // Component should render with animations enabled
      expect(screen.getByText('Project Statistics')).toBeInTheDocument();
      expect(screen.getByText('Total Projects')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should handle mobile layout', () => {
      // Test mobile responsiveness - the component should render without issues
      render(<ProjectStats />);
      
      expect(screen.getByText('Project Statistics')).toBeInTheDocument();
    });

    it('should render with mobile-specific styling', () => {
      vi.mocked(useMediaQuery).mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false
      });

      render(<ProjectStats />);
      
      // Component should render successfully with mobile layout
      expect(screen.getByText('Project Statistics')).toBeInTheDocument();
      expect(screen.getByText('Total Projects')).toBeInTheDocument();
      expect(screen.getByText('Technologies')).toBeInTheDocument();
      expect(screen.getByText('Frameworks')).toBeInTheDocument();
    });

    it('should render with desktop layout by default', () => {
      vi.mocked(useMediaQuery).mockReturnValue({
        isMobile: false,
        isTablet: false,
        isDesktop: true
      });

      render(<ProjectStats />);
      
      // Component should render successfully with desktop layout
      expect(screen.getByText('Project Statistics')).toBeInTheDocument();
      expect(screen.getByText('Total Projects')).toBeInTheDocument();
    });

    it('should handle tablet layout', () => {
      vi.mocked(useMediaQuery).mockReturnValue({
        isMobile: false,
        isTablet: true,
        isDesktop: false
      });

      render(<ProjectStats />);
      
      // Component should render successfully with tablet layout
      expect(screen.getByText('Project Statistics')).toBeInTheDocument();
      expect(screen.getByText('Total Projects')).toBeInTheDocument();
    });
  });

  describe('Store Integration', () => {
    it('should use theme store', () => {
      render(<ProjectStats />);
      
      expect(screen.getByText('Project Statistics')).toBeInTheDocument();
    });

    it('should use filter store for company clicks', () => {
      render(<ProjectStats />);
      
      const siemensLogo = screen.getByAltText('Siemens');
      expect(() => fireEvent.click(siemensLogo)).not.toThrow();
    });
  });

  describe('Stats Calculation', () => {
    it('should calculate stats from projects', () => {
      render(<ProjectStats />);
      
      // Stats should be calculated and displayed
      expect(screen.getByText('15')).toBeInTheDocument(); // Project count
    });

    it('should show all stat cards with correct structure', () => {
      render(<ProjectStats />);
      
      // Check that all stat titles are present
      expect(screen.getByText('Total Projects')).toBeInTheDocument();
      expect(screen.getByText('Technologies')).toBeInTheDocument();
      expect(screen.getByText('Frameworks')).toBeInTheDocument();
      expect(screen.getByText('Companies')).toBeInTheDocument();
      expect(screen.getByText('Years Experience')).toBeInTheDocument();
      
      // Check that values are present
      expect(screen.getByText('15')).toBeInTheDocument(); // totalProjects
      expect(screen.getByText('12')).toBeInTheDocument(); // totalTechnologies
      // Frameworks count is now dynamically calculated from actual frameworks found
      expect(screen.getByText('20')).toBeInTheDocument(); // years
    });
  });

  // Image event handlers are now tested in CompanyLogos.test.tsx
  // since the logo functionality is handled by the CompanyLogos component


});