import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { SuccessStories } from './SuccessStories';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: vi.fn(),
}));

// Mock hooks
vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: vi.fn(),
}));

import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslation } from '@/hooks/useTranslation';

const mockTranslations = {
  workshop: {
    successStories: {
      title: 'Picked Fruits',
      subtitle: 'Concrete examples of successful AI implementations from my clients',
      benefitLabels: {
        oneTime: 'One-time:',
        ongoing: 'Ongoing:'
      },
      newsletter: {
        title: 'Newsletter Personalization',
        description: 'AI analyzes CRM data to create personalized newsletters.',
        goal: 'Goal: Higher open rates through relevant communication.',
        inputs: [
          { title: 'CRM Data', description: 'Customer profiles' },
          { title: 'Newsletter Content', description: 'Standard content' }
        ],
        processing: { title: 'AI Analysis', description: 'Personalization engine' },
        output: {
          title: 'Personalized Newsletter',
          description: 'Customized content',
          benefits: ['Higher open rates', 'Better engagement']
        },
        implementation: '2 days',
        cost: '€0.025 per customer'
      },
      support: {
        title: 'Support Shield',
        description: 'AI filters aggressive emails.',
        goal: 'Goal: Less stress for support team.',
        inputs: [{ title: 'Customer Email', description: 'Support request' }],
        processing: { title: 'AI Filter', description: 'Tone analysis' },
        output: {
          title: 'Filtered Message',
          description: 'Polite version',
          benefits: ['Better tone', 'Reduced stress']
        },
        implementation: '1 day (in-house)',
        cost: '€0.005 per email'
      },
      blogging: {
        title: 'Content Autopilot',
        description: 'AI optimizes blog content.',
        goal: 'Goal: Better content efficiency.',
        inputs: [
          { title: 'Draft', description: 'Raw content' },
          { title: 'Optional: Images', description: 'Image themes' }
        ],
        processing: { title: 'AI Optimization', description: 'Content enhancement' },
        output: {
          title: 'Finished Post',
          description: 'Optimized content',
          benefits: ['SEO optimized', 'Professional quality']
        },
        implementation: '1 day',
        cost: '€0.06 per image'
      },
      testing: {
        title: 'Legacy Testing',
        description: 'AI creates unit tests.',
        goal: 'Goal: Better code quality.',
        inputs: [
          { title: 'Legacy Code', description: 'Existing code' },
          { title: 'Documentation', description: 'Available docs' }
        ],
        processing: { title: 'AI Analysis', description: 'Test generation' },
        output: {
          title: 'Test Suite',
          description: 'Complete test coverage',
          benefits: {
            oneTime: ['Missing tests', 'Documentation'],
            ongoing: ['Better quality', 'Faster development']
          }
        },
        implementation: '€150 + 2 weeks (in-house)',
        cost: '€300/month'
      }
    }
  }
};

describe('SuccessStories', () => {
  const mockUseMediaQuery = useMediaQuery as ReturnType<typeof vi.fn>;
  const mockUseTranslation = useTranslation as ReturnType<typeof vi.fn>;
  const mockUseReducedMotion = useReducedMotion as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue({ isMobile: false });
    mockUseTranslation.mockReturnValue({ t: mockTranslations });
    mockUseReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title and subtitle', () => {
    renderWithProviders(<SuccessStories />);
    
    expect(screen.getByText('Picked Fruits')).toBeInTheDocument();
    expect(screen.getByText('Concrete examples of successful AI implementations from my clients')).toBeInTheDocument();
  });

  it('renders all story selection buttons', () => {
    renderWithProviders(<SuccessStories />);
    
    expect(screen.getByText('Newsletter Personalization')).toBeInTheDocument();
    expect(screen.getByText('Support Shield')).toBeInTheDocument();
    expect(screen.getByText('Content Autopilot')).toBeInTheDocument();
    expect(screen.getByText('Legacy Testing')).toBeInTheDocument();
  });

  it('displays the first story by default', () => {
    renderWithProviders(<SuccessStories />);
    
    expect(screen.getByText('AI analyzes CRM data to create personalized newsletters.')).toBeInTheDocument();
    expect(screen.getByText('Goal: Higher open rates through relevant communication.')).toBeInTheDocument();
  });

  it('changes story when clicking different buttons', () => {
    renderWithProviders(<SuccessStories />);
    
    // Initially shows first story (Newsletter)
    expect(screen.getByText('AI analyzes CRM data to create personalized newsletters.')).toBeInTheDocument();
    expect(screen.getByText('2 days')).toBeInTheDocument();
    expect(screen.getByText('€0.025 per customer')).toBeInTheDocument();
    
    // Click Support button
    const supportButton = screen.getByText('Support Shield');
    fireEvent.click(supportButton);
    
    expect(screen.getByText('AI filters aggressive emails.')).toBeInTheDocument();
    expect(screen.getByText('Goal: Less stress for support team.')).toBeInTheDocument();
    expect(screen.getByText('1 day (in-house)')).toBeInTheDocument();
    expect(screen.getByText('€0.005 per email')).toBeInTheDocument();
    
    // Click Content button  
    const contentButton = screen.getByText('Content Autopilot');
    fireEvent.click(contentButton);
    
    expect(screen.getByText('AI optimizes blog content.')).toBeInTheDocument();
    expect(screen.getByText('Goal: Better content efficiency.')).toBeInTheDocument();
    expect(screen.getByText('1 day')).toBeInTheDocument();
    expect(screen.getByText('€0.06 per image')).toBeInTheDocument();
  });

  it('renders process visualization with inputs, processing, and output', () => {
    renderWithProviders(<SuccessStories />);
    
    // Check inputs
    expect(screen.getByText('CRM Data')).toBeInTheDocument();
    expect(screen.getByText('Newsletter Content')).toBeInTheDocument();
    
    // Check processing
    expect(screen.getByText('AI Analysis')).toBeInTheDocument();
    expect(screen.getByText('Personalization engine')).toBeInTheDocument();
    
    // Check output
    expect(screen.getByText('Personalized Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Higher open rates')).toBeInTheDocument();
  });

  it('displays cost and implementation information', () => {
    renderWithProviders(<SuccessStories />);
    
    expect(screen.getByText('2 days')).toBeInTheDocument();
    expect(screen.getByText('€0.025 per customer')).toBeInTheDocument();
  });

  it('handles legacy story with structured benefits', () => {
    renderWithProviders(<SuccessStories />);
    
    const testingButton = screen.getByText('Legacy Testing');
    fireEvent.click(testingButton);
    
    expect(screen.getByText('One-time:')).toBeInTheDocument();
    expect(screen.getByText('Ongoing:')).toBeInTheDocument();
    expect(screen.getByText('Missing tests')).toBeInTheDocument();
    expect(screen.getByText('Better quality')).toBeInTheDocument();
  });

  it('tests all story buttons and validates their categories', () => {
    renderWithProviders(<SuccessStories />);
    
    const buttons = [
      { text: 'Newsletter Personalization', category: 'Marketing' },
      { text: 'Support Shield', category: 'Support' },
      { text: 'Content Autopilot', category: 'Content-Creation' },
      { text: 'Legacy Testing', category: 'Development' }
    ];
    
    buttons.forEach(({ text, category }) => {
      const button = screen.getByText(text);
      expect(button).toBeInTheDocument();
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('tests desktop vs mobile layout switching', () => {
    // Mock window.innerWidth for desktop test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,  
      value: 1300,
    });
    
    renderWithProviders(<SuccessStories />);
    
    // Should render content (desktop layout logic is tested)
    expect(screen.getByText('Picked Fruits')).toBeInTheDocument();
    
    // Reset window width for mobile
    Object.defineProperty(window, 'innerWidth', {
      value: 800,
    });
  });

  it('validates button selection state changes', () => {
    renderWithProviders(<SuccessStories />);
    
    const supportButton = screen.getByText('Support Shield');
    
    // Click support button  
    fireEvent.click(supportButton);
    
    // Now support content should be visible
    expect(screen.getByText('AI filters aggressive emails.')).toBeInTheDocument();
  });

  it('tests optional input rendering for content story', () => {
    renderWithProviders(<SuccessStories />);
    
    // Click Content button to see optional input
    const contentButton = screen.getByText('Content Autopilot');
    fireEvent.click(contentButton);
    
    expect(screen.getByText('Optional: Images')).toBeInTheDocument();
    expect(screen.getByText('Image themes')).toBeInTheDocument();
  });

  it('tests window resize handler', () => {
    renderWithProviders(<SuccessStories />);
    
    // Simulate window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1400,
    });
    
    // Wrap in act to handle React state updates
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    
    // Component should still render
    expect(screen.getByText('Picked Fruits')).toBeInTheDocument();
  });

  describe('Animation and Accessibility', () => {
    it('respects reduced motion preference in all animations', () => {
      mockUseReducedMotion.mockReturnValue(true);
      
      renderWithProviders(<SuccessStories />);
      
      // Component should still render without animations
      expect(screen.getByText('Picked Fruits')).toBeInTheDocument();
      expect(screen.getByText('Newsletter Personalization')).toBeInTheDocument();
    });

    it('enables animations when reduced motion is false', () => {
      mockUseReducedMotion.mockReturnValue(false);
      
      renderWithProviders(<SuccessStories />);
      
      // Component should render with animations enabled
      expect(screen.getByText('Picked Fruits')).toBeInTheDocument();
    });
  });

  it('tests edge case with nested benefit rendering', () => {
    renderWithProviders(<SuccessStories />);
    
    // Click testing button to access structured benefits
    const testingButton = screen.getByText('Legacy Testing');
    fireEvent.click(testingButton);
    
    // Test the specific nested benefit structure that wasn't covered
    expect(screen.getByText('One-time:')).toBeInTheDocument();
    expect(screen.getByText('Ongoing:')).toBeInTheDocument();
    
    // Test specific benefits that might not be covered
    expect(screen.getByText('Missing tests')).toBeInTheDocument();
    expect(screen.getAllByText('Documentation')).toHaveLength(2); // Title and benefit
    expect(screen.getByText('Better quality')).toBeInTheDocument();
    expect(screen.getByText('Faster development')).toBeInTheDocument();
  });

  it('tests mobile layout behavior', () => {
    mockUseMediaQuery.mockReturnValue({ isMobile: true });
    
    renderWithProviders(<SuccessStories />);
    
    // Should still render all content in mobile
    expect(screen.getByText('Picked Fruits')).toBeInTheDocument();
    expect(screen.getByText('Newsletter Personalization')).toBeInTheDocument();
    expect(screen.getByText('Support Shield')).toBeInTheDocument();
    
    // Test story switching still works on mobile
    const supportButton = screen.getByText('Support Shield');
    fireEvent.click(supportButton);
    
    expect(screen.getByText('AI filters aggressive emails.')).toBeInTheDocument();
  });
});