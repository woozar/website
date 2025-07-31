import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { LegalModal } from './LegalModal';
import { ModalProvider } from '../../contexts/ModalContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
  useReducedMotion: vi.fn(),
}));

// Import after mocking
import { useReducedMotion } from 'framer-motion';

// Mock hooks
const mockOpenModal = vi.fn();
const mockCloseModal = vi.fn();

vi.mock('../../hooks/useModal', () => ({
  useModal: () => ({
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
  }),
}));

const renderComponent = (props: any) => {
  return render(
    <MantineProvider>
      <ModalProvider>
        <LegalModal {...props} />
      </ModalProvider>
    </MantineProvider>
  );
};

describe('LegalModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset document.body.style before each test
    document.body.style.overflow = '';
    // Set default reduced motion to false
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  afterEach(() => {
    // Cleanup after each test
    document.body.style.overflow = '';
  });

  describe('Modal visibility and basic functionality', () => {
    it('should not render when opened is false', () => {
      renderComponent({
        opened: false,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(screen.queryByText('Impressum')).not.toBeInTheDocument();
    });

    it('should render when opened is true', () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(screen.getByText('Impressum')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Scroll behavior management', () => {
    it('should hide body scroll when modal opens', () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(document.body.style.overflow).toBe('hidden');
      expect(mockOpenModal).toHaveBeenCalledTimes(1);
    });

    it('should restore body scroll when modal closes', async () => {
      const { rerender } = renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <MantineProvider>
          <ModalProvider>
            <LegalModal opened={false} onClose={mockOnClose} type="impressum" />
          </ModalProvider>
        </MantineProvider>
      );

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('');
        expect(mockCloseModal).toHaveBeenCalledTimes(1);
      });
    });

    it('should restore body scroll on component unmount', () => {
      const { unmount } = renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Content rendering - Impressum', () => {
    it('should render impressum content with correct title', () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(screen.getByText('Impressum')).toBeInTheDocument();
      expect(screen.getByText('Johannes Herrmann')).toBeInTheDocument();
      expect(screen.getByText('12 of Spades')).toBeInTheDocument();
    });

    it('should render impressum contact information', () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(screen.getByText('Feldweiher 9')).toBeInTheDocument();
      expect(screen.getByText('91085 Weisendorf(Buch)')).toBeInTheDocument();
      expect(screen.getByText('+49 176 8100 1371')).toBeInTheDocument();
      expect(screen.getByText('info@12ofspades.com')).toBeInTheDocument();
    });

    it('should render impressum tax information', () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(screen.getByText('DE323916092')).toBeInTheDocument();
    });
  });

  describe('Content rendering - Datenschutz', () => {
    it('should render datenschutz content with correct title', () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'datenschutz',
      });

      expect(screen.getByText('Disclaimer - rechtliche Hinweise')).toBeInTheDocument();
    });

    it('should render datenschutz main sections', () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'datenschutz',
      });

      expect(screen.getByText('§ 1 Warnhinweis zu Inhalten')).toBeInTheDocument();
      expect(screen.getByText('§ 2 Externe Links')).toBeInTheDocument();
      expect(screen.getByText('§ 3 Urheber- und Leistungsschutzrechte')).toBeInTheDocument();
      expect(screen.getByText('§ 4 Besondere Nutzungsbedingungen')).toBeInTheDocument();
    });

    it('should render datenschutz privacy sections', () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'datenschutz',
      });

      expect(screen.getByText('Datenschutzerklärung')).toBeInTheDocument();
      expect(screen.getByText('Datenschutz')).toBeInTheDocument();
      expect(screen.getByText('Personenbezogene Daten')).toBeInTheDocument();
      expect(screen.getByText('Datenschutzerklärung für den Webanalysedienst Google Analytics')).toBeInTheDocument();
      expect(screen.getByText('Auskunftsrecht')).toBeInTheDocument();
    });

    it('should render Google Analytics opt-out link', () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'datenschutz',
      });

      expect(screen.getByText((content) => {
        return content.includes('tools.google.com/dlpage/gaoptout');
      })).toBeInTheDocument();
    });
  });

  describe('Modal behavior with different types', () => {
    it('should switch content when type changes', () => {
      const { rerender } = renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(screen.getByText('Impressum')).toBeInTheDocument();
      expect(screen.queryByText('Disclaimer - rechtliche Hinweise')).not.toBeInTheDocument();

      rerender(
        <MantineProvider>
          <ModalProvider>
            <LegalModal opened={true} onClose={mockOnClose} type="datenschutz" />
          </ModalProvider>
        </MantineProvider>
      );

      expect(screen.getByText('Disclaimer - rechtliche Hinweise')).toBeInTheDocument();
      expect(screen.queryByText('Impressum')).not.toBeInTheDocument();
    });
  });

  describe('Modal state management integration', () => {
    it('should not call modal state functions when modal is closed', () => {
      renderComponent({
        opened: false,
        onClose: mockOnClose,
        type: 'impressum',
      });

      // Modal should restore scroll state but not call openModal
      expect(document.body.style.overflow).toBe('');
      expect(mockCloseModal).toHaveBeenCalledTimes(1);
      expect(mockOpenModal).not.toHaveBeenCalled();
    });

    it('should properly handle modal state transitions', async () => {
      const { rerender } = renderComponent({
        opened: false,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(mockCloseModal).toHaveBeenCalledTimes(1);
      expect(mockOpenModal).not.toHaveBeenCalled();

      rerender(
        <MantineProvider>
          <ModalProvider>
            <LegalModal opened={true} onClose={mockOnClose} type="impressum" />
          </ModalProvider>
        </MantineProvider>
      );

      await waitFor(() => {
        expect(mockOpenModal).toHaveBeenCalledTimes(1);
        expect(document.body.style.overflow).toBe('hidden');
      });
    });
  });

  describe('Animation and Reduced Motion', () => {
    it('should render with normal animations when reduced motion is false', () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      // Component should render successfully with animations enabled
      expect(screen.getByText('Impressum')).toBeInTheDocument();
      expect(screen.getByText('Johannes Herrmann')).toBeInTheDocument();
    });

    it('should render with reduced motion animations when reduced motion is true', () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      // Component should render successfully with reduced animations
      expect(screen.getByText('Impressum')).toBeInTheDocument();
      expect(screen.getByText('Johannes Herrmann')).toBeInTheDocument();
    });

    it('should handle modal state with reduced motion enabled', () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'datenschutz',
      });

      // Modal should still function properly with reduced motion
      expect(screen.getByText('Disclaimer - rechtliche Hinweise')).toBeInTheDocument();
      expect(document.body.style.overflow).toBe('hidden');
      expect(mockOpenModal).toHaveBeenCalledTimes(1);
    });

    it('should handle closing with reduced motion enabled', async () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      const { rerender } = renderComponent({
        opened: true,
        onClose: mockOnClose,
        type: 'impressum',
      });

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <MantineProvider>
          <ModalProvider>
            <LegalModal opened={false} onClose={mockOnClose} type="impressum" />
          </ModalProvider>
        </MantineProvider>
      );

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('');
        expect(mockCloseModal).toHaveBeenCalledTimes(1);
      });
    });
  });
});