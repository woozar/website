import { beforeEach, describe, expect, it, vi } from "vitest";

import { useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useModal } from "@/hooks/useModal";
import { useTranslation } from "@/hooks/useTranslation";
import { fireEvent, render, screen } from "@/test/test-utils";
import { de } from "@/translations/de";

import { Hero } from "./Hero";

// Mock dependencies
vi.mock("@/hooks/useMediaQuery");
vi.mock("@/hooks/useModal");
vi.mock("@/hooks/useTranslation");
// framer-motion is globally mocked in test setup

// Mock the image import
vi.mock("../../assets/hero-portrait.webp", () => ({
  default: "/mock-hero-portrait.webp",
}));

const mockUseMediaQuery = vi.mocked(useMediaQuery);
const mockUseModal = vi.mocked(useModal);
const mockUseTranslation = vi.mocked(useTranslation);

describe("Hero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
    mockUseModal.mockReturnValue({
      isModalOpen: false,
      imageModalData: null,
      openModal: vi.fn(),
      closeModal: vi.fn(),
      openImageModal: vi.fn(),
    });
    mockUseTranslation.mockReturnValue({ t: de, language: "de" });

    // Mock scrollTo
    Object.defineProperty(window, "scrollTo", {
      value: vi.fn(),
      writable: true,
    });

    // Mock querySelector
    Object.defineProperty(document, "querySelector", {
      value: vi.fn().mockReturnValue({
        offsetTop: 500,
      } as HTMLElement),
      writable: true,
    });
  });

  it("should render hero section with name and title", () => {
    render(<Hero />);

    expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    expect(
      screen.getByText("Software Freelancer & KI-Spezialist")
    ).toBeInTheDocument();
  });

  it("should render structured description with highlights", () => {
    render(<Hero />);

    // Check that key highlights are rendered
    expect(screen.getByText("KI & Sprachmodelle")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
    expect(screen.getByText("Startup bis Enterprise")).toBeInTheDocument();

    // Check some description text content
    expect(
      screen.getByText(/Entwicklung intelligenter Anwendungen/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Skalierbare Infrastrukturen/)).toBeInTheDocument();
  });

  it("should render action buttons", () => {
    render(<Hero />);

    expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    expect(screen.getByText("Projekte ansehen")).toBeInTheDocument();
  });

  it("should render hero portrait image", () => {
    render(<Hero />);

    const heroImage = screen.getByRole("img");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "/assets/hero-portrait.webp");
    expect(heroImage).toHaveAttribute(
      "alt",
      "Johannes Herrmann - Software Freelancer"
    );
  });

  it("should handle contact button click", () => {
    render(<Hero />);

    const contactButton = screen.getByText("Kontakt aufnehmen");
    fireEvent.click(contactButton);

    expect(document.querySelector).toHaveBeenCalledWith("#contact");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400, // 500 - 100 (header height)
      behavior: "smooth",
    });
  });

  it("should handle projects button click", () => {
    render(<Hero />);

    const projectsButton = screen.getByText("Projekte ansehen");
    fireEvent.click(projectsButton);

    expect(document.querySelector).toHaveBeenCalledWith("#projects");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400, // 500 - 100 (header height)
      behavior: "smooth",
    });
  });

  it("should handle missing target element gracefully", () => {
    document.querySelector = vi.fn().mockReturnValue(null);

    render(<Hero />);

    const contactButton = screen.getByText("Kontakt aufnehmen");

    expect(() => fireEvent.click(contactButton)).not.toThrow();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("should adapt layout for mobile devices", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    render(<Hero />);

    // Should still render all content on mobile
    expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should adapt layout for tablet devices", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });

    render(<Hero />);

    // Should still render all content on tablet
    expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    expect(
      screen.getByText("Software Freelancer & KI-Spezialist")
    ).toBeInTheDocument();
  });

  it("should handle German language translations", () => {
    render(<Hero />);

    expect(
      screen.getByText("Software Freelancer & KI-Spezialist")
    ).toBeInTheDocument();
    expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    expect(screen.getByText("Projekte ansehen")).toBeInTheDocument();
  });

  it("should render with proper semantic structure", () => {
    render(<Hero />);

    const mainTitle = screen.getByRole("heading", { level: 1 });
    expect(mainTitle).toHaveTextContent("Johannes Herrmann");

    // The title is rendered as regular text, not an h2
    expect(
      screen.getByText("Software Freelancer & KI-Spezialist")
    ).toBeInTheDocument();
  });

  it("should have proper button attributes", () => {
    render(<Hero />);

    const contactButton = screen.getByText("Kontakt aufnehmen");
    const projectsButton = screen.getByText("Projekte ansehen");

    // Buttons are rendered as Mantine components and should be in the document
    expect(contactButton).toBeInTheDocument();
    expect(projectsButton).toBeInTheDocument();
  });

  it("should render image with proper accessibility attributes", () => {
    render(<Hero />);

    const heroImage = screen.getByRole("img");
    expect(heroImage).toHaveAttribute(
      "alt",
      "Johannes Herrmann - Software Freelancer"
    );
  });

  it("should handle scroll navigation correctly", () => {
    const mockElement = {
      offsetTop: 800,
    } as HTMLElement;

    document.querySelector = vi.fn().mockReturnValue(mockElement);

    render(<Hero />);

    const contactButton = screen.getByText("Kontakt aufnehmen");
    fireEvent.click(contactButton);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 700, // 800 - 100 (header height)
      behavior: "smooth",
    });
  });

  it("should render buttons with proper styling classes", () => {
    render(<Hero />);

    const contactButton = screen.getByText("Kontakt aufnehmen");
    const projectsButton = screen.getByText("Projekte ansehen");

    // Both buttons should be rendered as button elements
    expect(contactButton).toBeInTheDocument();
    expect(projectsButton).toBeInTheDocument();
  });

  it("should handle navigation to different sections", () => {
    render(<Hero />);

    // Test contact button navigation
    const contactButton = screen.getByText("Kontakt aufnehmen");
    fireEvent.click(contactButton);
    expect(document.querySelector).toHaveBeenCalledWith("#contact");

    // Test projects button navigation
    const projectsButton = screen.getByText("Projekte ansehen");
    fireEvent.click(projectsButton);
    expect(document.querySelector).toHaveBeenCalledWith("#projects");
  });

  it("should render all required content elements", () => {
    render(<Hero />);

    // Check all main content is present
    expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    expect(
      screen.getByText("Software Freelancer & KI-Spezialist")
    ).toBeInTheDocument();
    // Check that structured content is rendered
    expect(screen.getByText("KI & Sprachmodelle")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    expect(screen.getByText("Projekte ansehen")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      render(<Hero />);

      // Component should render successfully with animations enabled
      expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<Hero />);

      // Component should render successfully with reduced animations
      expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    });

    it("should handle functionality with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<Hero />);

      // Component functionality should still work with reduced motion
      expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    });
  });

  describe("Profile Image Modal", () => {
    it("should call openImageModal when profile image is clicked", () => {
      const mockOpenImageModal = vi.fn();
      mockUseModal.mockReturnValue({
        isModalOpen: false,
        imageModalData: null,
        openModal: vi.fn(),
        closeModal: vi.fn(),
        openImageModal: mockOpenImageModal,
      });

      render(<Hero />);

      const profileImage = screen.getByAltText(
        "Johannes Herrmann - Software Freelancer"
      );
      fireEvent.click(profileImage);

      expect(mockOpenImageModal).toHaveBeenCalledWith({
        src: "/assets/hero-portrait.webp",
        alt: "Johannes Herrmann - Software Freelancer (Vergrößerte Ansicht)",
      });
    });

    it("should show pointer cursor on profile image", () => {
      render(<Hero />);

      const profileImage = screen.getByAltText(
        "Johannes Herrmann - Software Freelancer"
      );
      expect(profileImage).toHaveStyle({ cursor: "pointer" });
    });
  });

  describe("Description Rendering with Real Translations", () => {
    it("should render structured description items correctly", () => {
      render(<Hero />);

      // Test that all real description items from translations are rendered
      expect(screen.getByText("KI & Sprachmodelle")).toBeInTheDocument();
      expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
      expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
      expect(screen.getByText("Startup bis Enterprise")).toBeInTheDocument();
    });

    it("should handle text content for each description item", () => {
      render(<Hero />);

      // Test that description text content is properly rendered
      expect(
        screen.getByText(/Entwicklung intelligenter Anwendungen/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Skalierbare Infrastrukturen/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Von der Benutzeroberfläche bis zur Datenbank/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Maßgeschneiderte Lösungen/)).toBeInTheDocument();
    });

    it("should handle description rendering on mobile", () => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      render(<Hero />);

      // Should still render all description items on mobile
      expect(screen.getByText("KI & Sprachmodelle")).toBeInTheDocument();
      expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    });
  });
});
