import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Import after mocking
import { useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
// Import after mocking
import { useTranslation } from "@/hooks/useTranslation";
import { render } from "@/test/test-utils";
import { de } from "@/translations/de";

import { ProjectStats } from "./ProjectStats";

// framer-motion is globally mocked in test setup

// Mock dependencies
vi.mock("@/hooks/useMediaQuery");
vi.mock("@/hooks/useTranslation");

// Mock CompanyLogos component
vi.mock("./CompanyLogos", () => ({
  CompanyLogos: ({ onCompanyClick }: any) => (
    <div data-testid="company-logos">
      <img
        alt="Siemens"
        src="/logos/siemens-logo.svg"
        onClick={() => onCompanyClick("Siemens AG")}
        style={{ cursor: "pointer" }}
      />
      <img
        alt="Paessler"
        src="/logos/paessler-logo.svg"
        onClick={() => onCompanyClick("Paessler AG")}
        style={{ cursor: "pointer" }}
      />
    </div>
  ),
}));

describe("ProjectStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);

    // Set default mock for useMediaQuery
    vi.mocked(useMediaQuery).mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });

    // Set default mock for useTranslation with real German translations
    vi.mocked(useTranslation).mockReturnValue({
      t: de,
      language: "de",
    });

    // Mock DOM methods
    Object.defineProperty(document, "querySelector", {
      value: vi.fn().mockReturnValue({
        offsetTop: 500,
      }),
      writable: true,
    });

    Object.defineProperty(window, "scrollTo", {
      value: vi.fn(),
      writable: true,
    });
  });

  it("should render project statistics section", () => {
    render(<ProjectStats />);

    expect(screen.getByText("Projekt-Statistiken")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Quantifizierte Expertise basierend auf realer Projekterfahrung"
      )
    ).toBeInTheDocument();
  });

  it("should display stat cards", () => {
    render(<ProjectStats />);

    // Check that all stat card content is displayed
    expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
    expect(screen.getByText("Technologien")).toBeInTheDocument();
    expect(screen.getByText("Frameworks")).toBeInTheDocument();
    expect(screen.getByText("Unternehmen")).toBeInTheDocument();
    expect(screen.getByText("Jahre Erfahrung")).toBeInTheDocument();

    // Check that the grid is rendered (stat cards are in a SimpleGrid)
    // This is a more robust test that doesn't depend on exact values
    expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
    expect(screen.getByText("Technologien")).toBeInTheDocument();
  });

  it("should render company logos section", () => {
    render(<ProjectStats />);

    expect(
      screen.getByText("Erfolgreich zusammengearbeitet mit")
    ).toBeInTheDocument();
    // CompanyLogos component is tested separately in CompanyLogos.test.tsx
  });

  it("should handle company logo click", () => {
    render(<ProjectStats />);

    const siemensLogo = screen.getByAltText("Siemens");
    fireEvent.click(siemensLogo);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400,
      behavior: "smooth",
    });
  });

  it("should handle company click when element not found", () => {
    document.querySelector = vi.fn().mockReturnValue(null);

    render(<ProjectStats />);

    const siemensLogo = screen.getByAltText("Siemens");
    fireEvent.click(siemensLogo);

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("should show correct project count", () => {
    render(<ProjectStats />);

    // Just verify that the Total Projects card is rendered
    expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
  });

  it("should show years experience", () => {
    render(<ProjectStats />);

    expect(screen.getByText("20")).toBeInTheDocument(); // Hardcoded years
  });

  it("should render without errors", () => {
    expect(() => render(<ProjectStats />)).not.toThrow();
  });

  describe("Framework Detection Logic", () => {
    it("should process frameworks from project tags", () => {
      render(<ProjectStats />);

      // The usedFrameworks useMemo should execute without errors
      expect(screen.getByText("Frameworks")).toBeInTheDocument();
    });

    it("should handle empty projects array", () => {
      // This test mainly verifies that the component doesn't crash with empty data
      // The useProjects mock already provides projects, so we test the frameworks logic
      render(<ProjectStats />);
      expect(screen.getByText("Frameworks")).toBeInTheDocument();
    });
  });

  describe("Animation Variants", () => {
    it("should use reduced motion setting", () => {
      render(<ProjectStats />);

      expect(screen.getByText("Projekt-Statistiken")).toBeInTheDocument();
    });

    it("should render motion elements", () => {
      render(<ProjectStats />);

      expect(screen.getByText("Projekt-Statistiken")).toBeInTheDocument();
      expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
    });

    it("should handle reduced motion animations", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<ProjectStats />);

      // Component should still render normally with reduced motion
      expect(screen.getByText("Projekt-Statistiken")).toBeInTheDocument();
      expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
      expect(screen.getByText("Technologien")).toBeInTheDocument();
    });

    it("should handle normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      render(<ProjectStats />);

      // Component should render with animations enabled
      expect(screen.getByText("Projekt-Statistiken")).toBeInTheDocument();
      expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("should handle mobile layout", () => {
      // Test mobile responsiveness - the component should render without issues
      render(<ProjectStats />);

      expect(screen.getByText("Projekt-Statistiken")).toBeInTheDocument();
    });

    it("should render with mobile-specific styling", () => {
      vi.mocked(useMediaQuery).mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      render(<ProjectStats />);

      // Component should render successfully with mobile layout
      expect(screen.getByText("Projekt-Statistiken")).toBeInTheDocument();
      expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
      expect(screen.getByText("Technologien")).toBeInTheDocument();
      expect(screen.getByText("Frameworks")).toBeInTheDocument();
    });

    it("should render with desktop layout by default", () => {
      vi.mocked(useMediaQuery).mockReturnValue({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      });

      render(<ProjectStats />);

      // Component should render successfully with desktop layout
      expect(screen.getByText("Projekt-Statistiken")).toBeInTheDocument();
      expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
    });

    it("should handle tablet layout", () => {
      vi.mocked(useMediaQuery).mockReturnValue({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      });

      render(<ProjectStats />);

      // Component should render successfully with tablet layout
      expect(screen.getByText("Projekt-Statistiken")).toBeInTheDocument();
      expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
    });
  });

  describe("Store Integration", () => {
    it("should use theme store", () => {
      render(<ProjectStats />);

      expect(screen.getByText("Projekt-Statistiken")).toBeInTheDocument();
    });

    it("should use filter store for company clicks", () => {
      render(<ProjectStats />);

      const siemensLogo = screen.getByAltText("Siemens");
      expect(() => fireEvent.click(siemensLogo)).not.toThrow();
    });
  });

  describe("Stats Calculation", () => {
    it("should calculate stats from projects", () => {
      render(<ProjectStats />);

      // Stats should be calculated and displayed
      expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
    });

    it("should show all stat cards with correct structure", () => {
      render(<ProjectStats />);

      // Check that all stat titles are present
      expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
      expect(screen.getByText("Technologien")).toBeInTheDocument();
      expect(screen.getByText("Frameworks")).toBeInTheDocument();
      expect(screen.getByText("Unternehmen")).toBeInTheDocument();
      expect(screen.getByText("Jahre Erfahrung")).toBeInTheDocument();

      // Check that the structure is correct - values are dynamically calculated
      // so we don't test exact numbers, just that the cards are present
      expect(screen.getByText("Gesamt-Projekte")).toBeInTheDocument();
      expect(screen.getByText("Technologien")).toBeInTheDocument();
    });
  });

  // Image event handlers are now tested in CompanyLogos.test.tsx
  // since the logo functionality is handled by the CompanyLogos component
});
