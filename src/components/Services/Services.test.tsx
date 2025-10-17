import { beforeEach, describe, expect, it, vi } from "vitest";

// Import after mocking
import { useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";
import { render, screen } from "@/test/test-utils";
import { de } from "@/translations/de";

import { Services } from "./Services";

// Mock dependencies
vi.mock("@/hooks/useMediaQuery");
vi.mock("@/hooks/useTranslation");
// framer-motion is globally mocked in test setup

const mockUseMediaQuery = vi.mocked(useMediaQuery);
const mockUseTranslation = vi.mocked(useTranslation);

describe("Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
    mockUseTranslation.mockReturnValue({
      t: de,
      language: "de",
    });
    // Set default reduced motion to false
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it("should render services section with title and subtitle", () => {
    render(<Services />);

    expect(screen.getByText("Meine Services")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Spezialisierte Expertise in den wichtigsten Zukunftstechnologien. Von KI-Integration bis hin zu skalierbaren Cloud-Architekturen."
      )
    ).toBeInTheDocument();
  });

  it("should render all three service cards", () => {
    render(<Services />);

    expect(screen.getByText("KI Development")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
  });

  it("should render service descriptions", () => {
    render(<Services />);

    // Check for key parts of descriptions using partial text matching
    expect(
      screen.getByText(
        (content) =>
          content.includes("Entwicklung von KI-basierten Anwendungen") &&
          content.includes("modernsten Large Language Models")
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (content) =>
          content.includes(
            "Design und Implementierung skalierbarer Cloud-Infrastrukturen"
          ) && content.includes("AWS, Azure")
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (content) =>
          content.includes(
            "Entwicklung moderner Web- und Mobile-Anwendungen"
          ) && content.includes("React, Angular")
      )
    ).toBeInTheDocument();
  });

  it("should adapt layout for mobile devices", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    render(<Services />);

    // Should still render all content on mobile
    expect(screen.getByText("Meine Services")).toBeInTheDocument();
    expect(screen.getByText("KI Development")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
  });

  it("should handle German language translations", () => {
    render(<Services />);

    expect(screen.getByText("Meine Services")).toBeInTheDocument();
    expect(screen.getByText("KI Development")).toBeInTheDocument();
  });

  it("should render with proper semantic structure", () => {
    render(<Services />);

    const mainTitle = screen.getByRole("heading", { level: 2 });
    expect(mainTitle).toHaveTextContent("Meine Services");

    const serviceHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(serviceHeadings).toHaveLength(3);
    expect(serviceHeadings[0]).toHaveTextContent("KI Development");
    expect(serviceHeadings[1]).toHaveTextContent("Cloud Architecture");
    expect(serviceHeadings[2]).toHaveTextContent("Full-Stack Development");
  });

  it("should render service cards with proper structure", () => {
    render(<Services />);

    // Check that service titles are present
    const aiTitle = screen.getByText("KI Development");
    expect(aiTitle).toBeInTheDocument();

    // Check that service descriptions are present using flexible matching
    const aiDescription = screen.getByText(
      (content) =>
        content.includes("Entwicklung von KI-basierten Anwendungen") &&
        content.includes("modernsten Large Language Models")
    );
    expect(aiDescription).toBeInTheDocument();
  });

  it("should render services in correct order", () => {
    render(<Services />);

    const serviceHeadings = screen.getAllByRole("heading", { level: 3 });

    expect(serviceHeadings[0]).toHaveTextContent("KI Development");
    expect(serviceHeadings[1]).toHaveTextContent("Cloud Architecture");
    expect(serviceHeadings[2]).toHaveTextContent("Full-Stack Development");
  });

  it("should have proper card layout structure", () => {
    render(<Services />);

    // Check that the main services section is rendered
    const servicesSection = screen
      .getByText("Meine Services")
      .closest("section");
    expect(servicesSection).toBeInTheDocument();

    // All service cards should be present
    expect(screen.getByText("KI Development")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      render(<Services />);

      // Component should render successfully with animations enabled
      expect(screen.getByText("Meine Services")).toBeInTheDocument();
      expect(screen.getByText("KI Development")).toBeInTheDocument();
      expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<Services />);

      // Component should render successfully with reduced animations
      expect(screen.getByText("Meine Services")).toBeInTheDocument();
      expect(screen.getByText("KI Development")).toBeInTheDocument();
      expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
    });

    it("should render all service cards with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<Services />);

      // All service cards should still render with reduced motion
      expect(screen.getByText("KI Development")).toBeInTheDocument();
      expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
      expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
    });
  });
});
