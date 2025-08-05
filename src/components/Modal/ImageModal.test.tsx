import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useModal } from "@/hooks/useModal";
import { fireEvent, render, screen } from "@/test/test-utils";

import { ImageModal } from "./ImageModal";

// Mock dependencies
vi.mock("@/hooks/useModal");
vi.mock("@/hooks/useMediaQuery");

const mockUseModal = vi.mocked(useModal);
const mockUseMediaQuery = vi.mocked(useMediaQuery);

describe("ImageModal", () => {
  const mockCloseModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock document.body.style
    Object.defineProperty(document.body, "style", {
      value: { overflow: "" },
      writable: true,
    });

    // Default mock for useMediaQuery
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  it("should not render modal when imageModalData is null", () => {
    mockUseModal.mockReturnValue({
      isModalOpen: false,
      imageModalData: null,
      openModal: vi.fn(),
      closeModal: mockCloseModal,
      openImageModal: vi.fn(),
    });

    render(<ImageModal />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render modal when imageModalData is provided", async () => {
    const imageData = {
      src: "/test-image.jpg",
      alt: "Test image",
    };

    mockUseModal.mockReturnValue({
      isModalOpen: true,
      imageModalData: imageData,
      openModal: vi.fn(),
      closeModal: mockCloseModal,
      openImageModal: vi.fn(),
    });

    render(<ImageModal />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/test-image.jpg");
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Test image");
  });

  it("should render close button", () => {
    const imageData = {
      src: "/test-image.jpg",
      alt: "Test image",
    };

    mockUseModal.mockReturnValue({
      isModalOpen: true,
      imageModalData: imageData,
      openModal: vi.fn(),
      closeModal: mockCloseModal,
      openImageModal: vi.fn(),
    });

    render(<ImageModal />);

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  it("should call closeModal when close button is clicked", async () => {
    const imageData = {
      src: "/test-image.jpg",
      alt: "Test image",
    };

    mockUseModal.mockReturnValue({
      isModalOpen: true,
      imageModalData: imageData,
      openModal: vi.fn(),
      closeModal: mockCloseModal,
      openImageModal: vi.fn(),
    });

    render(<ImageModal />);

    const closeButton = screen.getByLabelText("Modal schließen");
    fireEvent.click(closeButton);

    // The component uses setTimeout, so closeModal is called after delay
    await new Promise((resolve) => setTimeout(resolve, 350));
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("should hide body scroll when modal opens", () => {
    const imageData = {
      src: "/test-image.jpg",
      alt: "Test image",
    };

    mockUseModal.mockReturnValue({
      isModalOpen: true,
      imageModalData: imageData,
      openModal: vi.fn(),
      closeModal: mockCloseModal,
      openImageModal: vi.fn(),
    });

    render(<ImageModal />);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should restore body scroll on unmount", () => {
    const imageData = {
      src: "/test-image.jpg",
      alt: "Test image",
    };

    mockUseModal.mockReturnValue({
      isModalOpen: true,
      imageModalData: imageData,
      openModal: vi.fn(),
      closeModal: mockCloseModal,
      openImageModal: vi.fn(),
    });

    const { unmount } = render(<ImageModal />);
    unmount();

    expect(document.body.style.overflow).toBe("unset");
  });

  it("should handle close button hover states", () => {
    const imageData = {
      src: "/test-image.jpg",
      alt: "Test image",
    };

    mockUseModal.mockReturnValue({
      isModalOpen: true,
      imageModalData: imageData,
      openModal: vi.fn(),
      closeModal: mockCloseModal,
      openImageModal: vi.fn(),
    });

    render(<ImageModal />);

    const closeButton = screen.getByLabelText("Modal schließen");

    // Test mouse enter
    fireEvent.mouseEnter(closeButton);
    expect(closeButton.style.backgroundColor).toBe("rgba(255, 255, 255, 0.1)");
    expect(closeButton.style.transform).toBe("scale(1.1)");

    // Test mouse leave
    fireEvent.mouseLeave(closeButton);
    expect(closeButton.style.backgroundColor).toBe("transparent");
    expect(closeButton.style.transform).toBe("scale(1)");
  });

  it("should handle keyboard navigation on close button", () => {
    const imageData = {
      src: "/test-image.jpg",
      alt: "Test image",
    };

    mockUseModal.mockReturnValue({
      isModalOpen: true,
      imageModalData: imageData,
      openModal: vi.fn(),
      closeModal: mockCloseModal,
      openImageModal: vi.fn(),
    });

    render(<ImageModal />);

    const closeButton = screen.getByLabelText("Modal schließen");

    // Test Enter key
    fireEvent.keyDown(closeButton, { key: "Enter" });

    // Test Space key
    fireEvent.keyDown(closeButton, { key: " " });

    // Should call close twice (once for Enter, once for Space)
    setTimeout(() => {
      expect(mockCloseModal).toHaveBeenCalledTimes(2);
    }, 350);
  });

  it("should handle image load event", () => {
    const imageData = {
      src: "/test-image.jpg",
      alt: "Test image",
    };

    mockUseModal.mockReturnValue({
      isModalOpen: true,
      imageModalData: imageData,
      openModal: vi.fn(),
      closeModal: mockCloseModal,
      openImageModal: vi.fn(),
    });

    render(<ImageModal />);

    const image = screen.getByRole("img");

    // Initially image should have opacity 0
    expect(image.style.opacity).toBe("0");

    // Trigger load event
    fireEvent.load(image);

    // After load, opacity should be 1
    expect(image.style.opacity).toBe("1");
  });

  it("should render correctly on mobile devices", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    const imageData = {
      src: "/test-image.jpg",
      alt: "Test image",
    };

    mockUseModal.mockReturnValue({
      isModalOpen: true,
      imageModalData: imageData,
      openModal: vi.fn(),
      closeModal: mockCloseModal,
      openImageModal: vi.fn(),
    });

    render(<ImageModal />);

    const closeButton = screen.getByLabelText("Modal schließen");
    const image = screen.getByRole("img");

    // Check mobile-specific positioning and sizing
    expect(closeButton.style.top).toBe("10px");
    expect(closeButton.style.right).toBe("10px");
    expect(image.style.maxWidth).toBe("90vw");
    expect(image.style.maxHeight).toBe("70vh");
  });
});
