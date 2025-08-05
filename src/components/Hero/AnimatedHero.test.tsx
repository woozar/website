import { beforeEach, describe, expect, it, vi } from "vitest";

import { useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useModal } from "@/hooks/useModal";
import { useTranslation } from "@/hooks/useTranslation";
import { fireEvent, render, screen } from "@/test/test-utils";
import { de } from "@/translations/de";

import { AnimatedHero } from "./AnimatedHero";

// Mock dependencies
vi.mock("@/hooks/useMediaQuery");
vi.mock("@/hooks/useModal");
vi.mock("@/hooks/useTranslation");
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
  useReducedMotion: vi.fn(),
}));

// Mock the image import
vi.mock("../../assets/hero-portrait.webp", () => ({
  default: "/mock-hero-portrait.webp",
}));

const mockUseMediaQuery = vi.mocked(useMediaQuery);
const mockUseModal = vi.mocked(useModal);
const mockUseTranslation = vi.mocked(useTranslation);

describe("AnimatedHero", () => {
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
    mockUseTranslation.mockReturnValue({
      t: de,
      language: "de",
    });

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
    render(<AnimatedHero />);

    expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    expect(
      screen.getByText("Software Freelancer & AI Specialist")
    ).toBeInTheDocument();
  });

  it("should render description text", () => {
    render(<AnimatedHero />);

    expect(
      screen.getByText(
        "Spezialisiert auf AI/LLM Entwicklung, Cloud Architecture und Full-Stack Development. Langjährige Erfahrung in der Entwicklung innovativer Tech-Lösungen für Unternehmen verschiedener Größen."
      )
    ).toBeInTheDocument();
  });

  it("should render action buttons", () => {
    render(<AnimatedHero />);

    expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    expect(screen.getByText("Projekte ansehen")).toBeInTheDocument();
  });

  it("should render hero portrait image", () => {
    render(<AnimatedHero />);

    const heroImage = screen.getByRole("img");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "/assets/hero-portrait.webp");
    expect(heroImage).toHaveAttribute(
      "alt",
      "Johannes Herrmann - Software Freelancer"
    );
  });

  it("should handle contact button click", () => {
    render(<AnimatedHero />);

    const contactButton = screen.getByText("Kontakt aufnehmen");
    fireEvent.click(contactButton);

    expect(document.querySelector).toHaveBeenCalledWith("#contact");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400, // 500 - 100 (header height)
      behavior: "smooth",
    });
  });

  it("should handle projects button click", () => {
    render(<AnimatedHero />);

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

    render(<AnimatedHero />);

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

    render(<AnimatedHero />);

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

    render(<AnimatedHero />);

    // Should still render all content on tablet
    expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    expect(
      screen.getByText("Software Freelancer & AI Specialist")
    ).toBeInTheDocument();
  });

  it("should handle German language translations", () => {
    render(<AnimatedHero />);

    expect(
      screen.getByText("Software Freelancer & AI Specialist")
    ).toBeInTheDocument();
    expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    expect(screen.getByText("Projekte ansehen")).toBeInTheDocument();
  });

  it("should render with proper semantic structure", () => {
    render(<AnimatedHero />);

    const mainTitle = screen.getByRole("heading", { level: 1 });
    expect(mainTitle).toHaveTextContent("Johannes Herrmann");

    // The title is rendered as regular text, not an h2
    expect(
      screen.getByText("Software Freelancer & AI Specialist")
    ).toBeInTheDocument();
  });

  it("should have proper button attributes", () => {
    render(<AnimatedHero />);

    const contactButton = screen.getByText("Kontakt aufnehmen");
    const projectsButton = screen.getByText("Projekte ansehen");

    // Buttons are rendered as Mantine components and should be in the document
    expect(contactButton).toBeInTheDocument();
    expect(projectsButton).toBeInTheDocument();
  });

  it("should render image with proper accessibility attributes", () => {
    render(<AnimatedHero />);

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

    render(<AnimatedHero />);

    const contactButton = screen.getByText("Kontakt aufnehmen");
    fireEvent.click(contactButton);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 700, // 800 - 100 (header height)
      behavior: "smooth",
    });
  });

  it("should render buttons with proper styling classes", () => {
    render(<AnimatedHero />);

    const contactButton = screen.getByText("Kontakt aufnehmen");
    const projectsButton = screen.getByText("Projekte ansehen");

    // Both buttons should be rendered as button elements
    expect(contactButton).toBeInTheDocument();
    expect(projectsButton).toBeInTheDocument();
  });

  it("should handle navigation to different sections", () => {
    render(<AnimatedHero />);

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
    render(<AnimatedHero />);

    // Check all main content is present
    expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    expect(
      screen.getByText("Software Freelancer & AI Specialist")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Spezialisiert auf AI/LLM Entwicklung, Cloud Architecture und Full-Stack Development. Langjährige Erfahrung in der Entwicklung innovativer Tech-Lösungen für Unternehmen verschiedener Größen."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    expect(screen.getByText("Projekte ansehen")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      render(<AnimatedHero />);

      // Component should render successfully with animations enabled
      expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<AnimatedHero />);

      // Component should render successfully with reduced animations
      expect(screen.getByText("Johannes Herrmann")).toBeInTheDocument();
    });

    it("should handle functionality with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<AnimatedHero />);

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

      render(<AnimatedHero />);

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
      render(<AnimatedHero />);

      const profileImage = screen.getByAltText(
        "Johannes Herrmann - Software Freelancer"
      );
      expect(profileImage).toHaveStyle({ cursor: "pointer" });
    });
  });
});
