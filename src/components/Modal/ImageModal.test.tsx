import { beforeEach, describe, expect, it, vi } from "vitest";

import { useModal } from "@/hooks/useModal";
import { fireEvent, render, screen } from "@/test/test-utils";

import { ImageModal } from "./ImageModal";

// Mock dependencies
vi.mock("@/hooks/useModal");
vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: () => ({ isMobile: false }),
}));

const mockUseModal = vi.mocked(useModal);

describe("ImageModal", () => {
  const mockCloseModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock document.body.style
    Object.defineProperty(document.body, "style", {
      value: { overflow: "" },
      writable: true,
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
});
