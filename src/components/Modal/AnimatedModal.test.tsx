import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { Variants, useReducedMotion } from "framer-motion";

import { ModalProvider } from "@/contexts/ModalContext";

import { AnimatedModal } from "./AnimatedModal";

// framer-motion is globally mocked in test setup

// Mock hooks
const mockOpenModal = vi.fn();
const mockCloseModal = vi.fn();

vi.mock("@/hooks/useModal", () => ({
  useModal: () => ({
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
  }),
}));

const renderComponent = (props: {
  opened: boolean;
  onClose: () => void;
  children: (props: { itemVariants: Variants }) => React.ReactNode;
  backdrop?: boolean;
  modalVariants?: Variants;
  contentVariants?: Variants;
  itemVariants?: Variants;
}) => {
  return render(
    <MantineProvider>
      <ModalProvider>
        <AnimatedModal {...props} />
      </ModalProvider>
    </MantineProvider>
  );
};

describe("AnimatedModal", () => {
  const mockOnClose = vi.fn();
  const mockChildren = vi.fn(({ itemVariants }) => (
    <div>Test Content with variants: {itemVariants ? "yes" : "no"}</div>
  ));

  beforeEach(() => {
    vi.clearAllMocks();
    mockChildren.mockClear();
    // Reset document.body.style before each test
    document.body.style.overflow = "";
    // Set default reduced motion to false
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  afterEach(() => {
    // Cleanup after each test
    document.body.style.overflow = "";
  });

  describe("Modal visibility and basic functionality", () => {
    it("should not render when opened is false", () => {
      renderComponent({
        opened: false,
        onClose: mockOnClose,
        children: mockChildren,
      });

      expect(screen.queryByText(/Test Content/)).not.toBeInTheDocument();
    });

    it("should render when opened is true", () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      expect(screen.getByText(/Test Content/)).toBeInTheDocument();
    });

    it("should pass itemVariants to children function", () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      expect(mockChildren).toHaveBeenCalledWith(
        expect.objectContaining({
          itemVariants: expect.any(Object),
        })
      );
      expect(
        screen.getByText(/Test Content with variants: yes/)
      ).toBeInTheDocument();
    });

    it("should call onClose when close button is clicked", () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      const closeButton = screen.getByRole("button");
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Scroll behavior management", () => {
    it("should hide body scroll when modal opens", () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      expect(document.body.style.overflow).toBe("hidden");
      expect(mockOpenModal).toHaveBeenCalledTimes(1);
    });

    it("should restore body scroll when modal closes", async () => {
      const { rerender } = renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <MantineProvider>
          <ModalProvider>
            <AnimatedModal opened={false} onClose={mockOnClose}>
              {mockChildren}
            </AnimatedModal>
          </ModalProvider>
        </MantineProvider>
      );

      await waitFor(() => {
        expect(document.body.style.overflow).toBe("");
        expect(mockCloseModal).toHaveBeenCalledTimes(1);
      });
    });

    it("should restore body scroll on component unmount", () => {
      const { unmount } = renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      expect(document.body.style.overflow).toBe("hidden");

      unmount();

      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Modal state management integration", () => {
    it("should not call modal state functions when modal is closed", () => {
      renderComponent({
        opened: false,
        onClose: mockOnClose,
        children: mockChildren,
      });

      // Modal should restore scroll state but not call openModal
      expect(document.body.style.overflow).toBe("");
      expect(mockCloseModal).toHaveBeenCalledTimes(1);
      expect(mockOpenModal).not.toHaveBeenCalled();
    });

    it("should properly handle modal state transitions", async () => {
      const { rerender } = renderComponent({
        opened: false,
        onClose: mockOnClose,
        children: mockChildren,
      });

      expect(mockCloseModal).toHaveBeenCalledTimes(1);
      expect(mockOpenModal).not.toHaveBeenCalled();

      rerender(
        <MantineProvider>
          <ModalProvider>
            <AnimatedModal opened={true} onClose={mockOnClose}>
              {mockChildren}
            </AnimatedModal>
          </ModalProvider>
        </MantineProvider>
      );

      await waitFor(() => {
        expect(mockOpenModal).toHaveBeenCalledTimes(1);
        expect(document.body.style.overflow).toBe("hidden");
      });
    });
  });

  describe("Backdrop functionality", () => {
    it("should not render backdrop when backdrop prop is false", () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
        backdrop: false,
      });

      expect(screen.queryByTestId("modal-backdrop")).not.toBeInTheDocument();
      expect(screen.getByText(/Test Content/)).toBeInTheDocument();
    });

    it("should render backdrop when backdrop prop is true", () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
        backdrop: true,
      });

      expect(screen.getByTestId("modal-backdrop")).toBeInTheDocument();
      expect(screen.getByText(/Test Content/)).toBeInTheDocument();
    });

    it("should not render backdrop by default", () => {
      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      expect(screen.queryByTestId("modal-backdrop")).not.toBeInTheDocument();
    });
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      // Component should render successfully with animations enabled
      expect(screen.getByText(/Test Content/)).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      // Component should render successfully with reduced animations
      expect(screen.getByText(/Test Content/)).toBeInTheDocument();
    });

    it("should handle modal state with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      // Modal should still function properly with reduced motion
      expect(screen.getByText(/Test Content/)).toBeInTheDocument();
      expect(document.body.style.overflow).toBe("hidden");
      expect(mockOpenModal).toHaveBeenCalledTimes(1);
    });

    it("should handle closing with reduced motion enabled", async () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      const { rerender } = renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
      });

      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <MantineProvider>
          <ModalProvider>
            <AnimatedModal opened={false} onClose={mockOnClose}>
              {mockChildren}
            </AnimatedModal>
          </ModalProvider>
        </MantineProvider>
      );

      await waitFor(() => {
        expect(document.body.style.overflow).toBe("");
        expect(mockCloseModal).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Custom variants", () => {
    it("should use custom modalVariants when provided", () => {
      const customModalVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      };

      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
        modalVariants: customModalVariants,
      });

      expect(screen.getByText(/Test Content/)).toBeInTheDocument();
    });

    it("should use custom contentVariants when provided", () => {
      const customContentVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };

      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: mockChildren,
        contentVariants: customContentVariants,
      });

      expect(screen.getByText(/Test Content/)).toBeInTheDocument();
    });

    it("should use custom itemVariants when provided", () => {
      const customItemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      };

      const customChildren = vi.fn(({ itemVariants }) => (
        <div data-testid="custom-variants">{JSON.stringify(itemVariants)}</div>
      ));

      renderComponent({
        opened: true,
        onClose: mockOnClose,
        children: customChildren,
        itemVariants: customItemVariants,
      });

      expect(customChildren).toHaveBeenCalledWith(
        expect.objectContaining({
          itemVariants: customItemVariants,
        })
      );
    });
  });
});
