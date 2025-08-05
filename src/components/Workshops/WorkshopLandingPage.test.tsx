import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from '@/contexts/ModalContext';
import { WorkshopLandingPage } from './WorkshopLandingPage';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <MantineProvider>
        <ModalProvider>
          {component}
        </ModalProvider>
      </MantineProvider>
    </BrowserRouter>
  );
};

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
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

// Mock components
vi.mock('./SuccessStories', () => ({
  SuccessStories: () => <div data-testid="success-stories">Success Stories</div>
}));

vi.mock('../SEO/SEOHead', () => ({
  SEOHead: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="seo-head">
      <span data-testid="seo-title">{title}</span>
      <span data-testid="seo-description">{description}</span>
    </div>
  )
}));

import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslation } from '@/hooks/useTranslation';

const mockTranslations = {
  workshop: {
    seo: {
      title: 'AI Workshop - Low Hanging Fruits | 12 of Spades',
      description: 'Practical AI workshop for businesses with immediate results',
      keywords: 'AI Workshop, Low Hanging Fruits, Business'
    },
    hero: {
      title: 'AI - Low Hanging Fruits',
      subtitle: 'Maximum AI value with minimal effort. Let us identify and pick the low hanging fruits in your company together.',
      ctaButton: 'Get in Touch',
      ctaSubtext: 'Non-binding inquiry - workshops@12ofspades.com'
    },
    problem: {
      title: 'The Challenge',
      points: [
        'AI seems complex',
        'Unclear ROI expectations',
        'Long implementation times',
        'High investment costs',
        'Missing know-how'
      ]
    },
    solution: {
      title: 'The Solution',
      points: [
        'Focus on immediate AI applications',
        'Proven strategies with quick ROI',
        'Practical hands-on experience',
        'No prior knowledge required',
        'Directly applicable results'
      ]
    },
    details: {
      title: 'Workshop Details',
      duration: {
        title: 'Duration',
        value: '1-3 Days',
        description: 'Flexible to your needs'
      },
      participants: {
        title: 'Participants',
        value: '3-5 representatives',
        description: 'From different departments'
      },
      outcome: {
        title: 'Outcome',
        value: 'Concrete implementation steps',
        description: 'For your team or partners'
      }
    },
    agenda: {
      title: 'Workshop Agenda',
      items: [
        {
          title: 'AI Fundamentals',
          description: 'Understanding AI basics',
          points: ['What AI really is', 'Setting expectations', 'Debunking myths']
        },
        {
          title: 'Identifying Opportunities',
          description: 'Finding the best use cases',
          points: ['Process analysis', 'Potential evaluation', 'Prioritization']
        }
      ]
    },
    cta: {
      title: 'Ready for Your AI Breakthrough?',
      subtitle: 'Let us identify and pick the low hanging fruits together.',
      button: 'Contact Now'
    }
  },
  contact: {
    title: 'Contact',
    subtitle: 'Get in touch with me',
    followMe: 'Follow me',
    contactItems: {
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      locationValue: 'Germany'
    },
    legal: {
      impressum: 'Imprint',
      datenschutz: 'Privacy'
    }
  },
  navigation: {
    services: 'Services',
    statistics: 'Statistics',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
    contactAction: 'Get in Touch'
  }
};

describe('WorkshopLandingPage', () => {
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

  it('renders SEO head with correct title and description', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    expect(screen.getByTestId('seo-title')).toHaveTextContent('AI Workshop - Low Hanging Fruits | 12 of Spades');
    expect(screen.getByTestId('seo-description')).toHaveTextContent('Practical AI workshop for businesses with immediate results');
  });

  it('renders hero section with title and subtitle', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    expect(screen.getByText('AI - Low Hanging Fruits')).toBeInTheDocument();
    expect(screen.getByText('Maximum AI value with minimal effort. Let us identify and pick the low hanging fruits in your company together.')).toBeInTheDocument();
  });

  it('renders CTA button with correct text', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders problem section', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    expect(screen.getByText('The Challenge')).toBeInTheDocument();
    expect(screen.getByText('AI seems complex')).toBeInTheDocument();
    expect(screen.getByText('Unclear ROI expectations')).toBeInTheDocument();
  });

  it('renders solution section', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    expect(screen.getByText('The Solution')).toBeInTheDocument();
    expect(screen.getByText('Focus on immediate AI applications')).toBeInTheDocument();
    expect(screen.getByText('Proven strategies with quick ROI')).toBeInTheDocument();
  });

  it('renders workshop details', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    expect(screen.getByText('Workshop Details')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('1-3 Days')).toBeInTheDocument();
    expect(screen.getByText('Participants')).toBeInTheDocument();
    expect(screen.getByText('3-5 representatives')).toBeInTheDocument();
  });

  it('renders agenda section', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    expect(screen.getByText('Workshop Agenda')).toBeInTheDocument();
    expect(screen.getByText('AI Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Identifying Opportunities')).toBeInTheDocument();
  });

  it('renders success stories component', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    expect(screen.getByTestId('success-stories')).toBeInTheDocument();
  });

  it('renders final CTA section', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    expect(screen.getByText('Ready for Your AI Breakthrough?')).toBeInTheDocument();
    expect(screen.getByText('Let us identify and pick the low hanging fruits together.')).toBeInTheDocument();
    expect(screen.getByText('Contact Now')).toBeInTheDocument();
  });

  describe('Responsive Design', () => {
    it('adapts to mobile layout', () => {
      mockUseMediaQuery.mockReturnValue({ isMobile: true });
      
      renderWithProviders(<WorkshopLandingPage />);
      
      // Should still render main content
      expect(screen.getByText('AI - Low Hanging Fruits')).toBeInTheDocument();
    });
  });

  it('renders all agenda items with their details', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    expect(screen.getByText('AI Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Understanding AI basics')).toBeInTheDocument();
    expect(screen.getByText('What AI really is')).toBeInTheDocument();
    expect(screen.getByText('Setting expectations')).toBeInTheDocument();
    expect(screen.getByText('Debunking myths')).toBeInTheDocument();
    
    expect(screen.getByText('Identifying Opportunities')).toBeInTheDocument();
    expect(screen.getByText('Finding the best use cases')).toBeInTheDocument();
    expect(screen.getByText('Process analysis')).toBeInTheDocument();
    expect(screen.getByText('Potential evaluation')).toBeInTheDocument();
    expect(screen.getByText('Prioritization')).toBeInTheDocument();
  });

  it('validates all problem and solution points', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    // Problem points
    const problemPoints = [
      'AI seems complex',
      'Unclear ROI expectations', 
      'Long implementation times',
      'High investment costs',
      'Missing know-how'
    ];
    
    problemPoints.forEach(point => {
      expect(screen.getByText(point)).toBeInTheDocument();
    });
    
    // Solution points
    const solutionPoints = [
      'Focus on immediate AI applications',
      'Proven strategies with quick ROI',
      'Practical hands-on experience',
      'No prior knowledge required', 
      'Directly applicable results'
    ];
    
    solutionPoints.forEach(point => {
      expect(screen.getByText(point)).toBeInTheDocument();
    });
  });

  it('tests all workshop detail sections', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    // Duration details
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('1-3 Days')).toBeInTheDocument();
    expect(screen.getByText('Flexible to your needs')).toBeInTheDocument();
    
    // Participants details  
    expect(screen.getByText('Participants')).toBeInTheDocument();
    expect(screen.getByText('3-5 representatives')).toBeInTheDocument();
    expect(screen.getByText('From different departments')).toBeInTheDocument();
    
    // Outcome details
    expect(screen.getByText('Outcome')).toBeInTheDocument();
    expect(screen.getByText('Concrete implementation steps')).toBeInTheDocument();
    expect(screen.getByText('For your team or partners')).toBeInTheDocument();
  });

  it('tests multiple CTA buttons presence', () => {
    renderWithProviders(<WorkshopLandingPage />);
    
    const ctaButtons = screen.getAllByText('Get in Touch');
    expect(ctaButtons.length).toBeGreaterThan(0);
    
    const contactButtons = screen.getAllByText('Contact Now');
    expect(contactButtons.length).toBeGreaterThan(0);
  });

  describe('Responsive and Accessibility', () => {
    it('adapts to mobile layout with proper content', () => {
      mockUseMediaQuery.mockReturnValue({ isMobile: true });
      
      renderWithProviders(<WorkshopLandingPage />);
      
      // Should still render all main content in mobile
      expect(screen.getByText('AI - Low Hanging Fruits')).toBeInTheDocument();
      expect(screen.getByText('Workshop Details')).toBeInTheDocument();
      expect(screen.getByText('Workshop Agenda')).toBeInTheDocument();
    });

    it('respects reduced motion preference', () => {
      mockUseReducedMotion.mockReturnValue(true);
      
      renderWithProviders(<WorkshopLandingPage />);
      
      // Component should still render without animations
      expect(screen.getByText('AI - Low Hanging Fruits')).toBeInTheDocument();
    });

    it('renders properly on desktop with animations enabled', () => {
      mockUseMediaQuery.mockReturnValue({ isMobile: false });
      mockUseReducedMotion.mockReturnValue(false);
      
      renderWithProviders(<WorkshopLandingPage />);
      
      expect(screen.getByText('AI - Low Hanging Fruits')).toBeInTheDocument();
      expect(screen.getByText('Maximum AI value with minimal effort. Let us identify and pick the low hanging fruits in your company together.')).toBeInTheDocument();
    });
  });

  it('tests handleWorkshopInquiry function', () => {
    // Mock window.location.href
    delete (window as any).location;
    (window as any).location = { href: '' };
    
    renderWithProviders(<WorkshopLandingPage />);
    
    // Find and click the specific "Contact Now" button that triggers handleWorkshopInquiry
    const contactButton = screen.getByText('Contact Now');
    
    // Click the Contact Now button
    fireEvent.click(contactButton);
    
    // Should have set mailto link
    expect(window.location.href).toContain('mailto:workshops@12ofspades.com');
    expect(window.location.href).toContain('Workshop%20Anfrage');
  });

  it('tests scroll to contact functionality', () => {
    // Mock querySelector and scrollTo
    const mockElement = {
      offsetTop: 1000
    };
    
    const originalQuerySelector = document.querySelector;
    const originalScrollTo = window.scrollTo;
    
    document.querySelector = vi.fn().mockReturnValue(mockElement);
    window.scrollTo = vi.fn();
    
    renderWithProviders(<WorkshopLandingPage />);
    
    // Find button that scrolls to contact (should be one with onClick handler)
    const ctaButtons = screen.getAllByText('Get in Touch');
    
    // The first button should scroll to contact section
    fireEvent.click(ctaButtons[0]);
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 900, // offsetTop 1000 - headerHeight 100
      behavior: 'smooth'
    });
    
    // Restore original functions
    document.querySelector = originalQuerySelector;
    window.scrollTo = originalScrollTo;
  });
});