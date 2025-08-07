import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
// Import the translations directly
import { de } from "@/translations/de";

import { WorkshopDetailsSection } from "./WorkshopDetailsSection";

// Mock framer-motion
const mockUseReducedMotion = vi.mocked(useReducedMotion);

// Mock hooks
vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("@/hooks/useTranslation", () => ({
  useTranslation: () => ({ t: de }),
}));

const mockUseMediaQuery = vi.mocked(useMediaQuery);

const renderWorkshopDetailsSection = (itemVariants: Variants) => {
  return render(
    <MantineProvider>
      <WorkshopDetailsSection itemVariants={itemVariants} />
    </MantineProvider>
  );
};

const mockItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

describe("WorkshopDetailsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });

    // Mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("should render workshop details title", () => {
    renderWorkshopDetailsSection(mockItemVariants);
    expect(screen.getByText(de.workshop.details.title)).toBeInTheDocument();
  });

  it("should render duration details", () => {
    renderWorkshopDetailsSection(mockItemVariants);

    expect(
      screen.getByText(de.workshop.details.duration.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.duration.value)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.duration.description)
    ).toBeInTheDocument();
  });

  it("should render participants details", () => {
    renderWorkshopDetailsSection(mockItemVariants);

    expect(
      screen.getByText(de.workshop.details.participants.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.participants.value)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.participants.description)
    ).toBeInTheDocument();
  });

  it("should render outcome details", () => {
    renderWorkshopDetailsSection(mockItemVariants);

    expect(
      screen.getByText(de.workshop.details.outcome.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.outcome.value)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.outcome.description)
    ).toBeInTheDocument();
  });

  it("should render workshop environment image", () => {
    renderWorkshopDetailsSection(mockItemVariants);

    const image = screen.getByAltText("AI Workshop Symbolbild");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/assets/workshop-participants.webp");
  });

  it("should handle mobile layout correctly", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    renderWorkshopDetailsSection(mockItemVariants);

    // Should still render all content
    expect(screen.getByText(de.workshop.details.title)).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.duration.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.participants.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.outcome.title)
    ).toBeInTheDocument();

    // Image should have mobile styling
    const image = screen.getByAltText("AI Workshop Symbolbild");
    expect(image).toBeInTheDocument();
  });

  it("should render detail cards with icons", () => {
    renderWorkshopDetailsSection(mockItemVariants);

    // All three detail cards should be rendered
    expect(
      screen.getByText(de.workshop.details.duration.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.participants.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.outcome.title)
    ).toBeInTheDocument();

    // Each card should have its corresponding value and description
    expect(
      screen.getByText(de.workshop.details.duration.value)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.participants.value)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.outcome.value)
    ).toBeInTheDocument();
  });

  it("should handle reduced motion preference", () => {
    mockUseReducedMotion.mockReturnValue(true);

    renderWorkshopDetailsSection(mockItemVariants);

    // Should still render all content with reduced motion
    expect(screen.getByText(de.workshop.details.title)).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.duration.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.participants.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.outcome.title)
    ).toBeInTheDocument();
  });

  it("should handle null reduced motion preference", () => {
    mockUseReducedMotion.mockReturnValue(null);

    renderWorkshopDetailsSection(mockItemVariants);

    // Should still render all content when reduced motion is null
    expect(screen.getByText(de.workshop.details.title)).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.duration.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.participants.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.outcome.title)
    ).toBeInTheDocument();
  });

  it("should render all detail card descriptions", () => {
    renderWorkshopDetailsSection(mockItemVariants);

    expect(
      screen.getByText(de.workshop.details.duration.description)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.participants.description)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.outcome.description)
    ).toBeInTheDocument();
  });

  it("should render in correct grid layout", () => {
    renderWorkshopDetailsSection(mockItemVariants);

    // Title should be centered
    const title = screen.getByText(de.workshop.details.title);
    expect(title).toBeInTheDocument();

    // Left column: detail cards
    expect(
      screen.getByText(de.workshop.details.duration.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.participants.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.outcome.title)
    ).toBeInTheDocument();

    // Right column: workshop image
    const image = screen.getByAltText("AI Workshop Symbolbild");
    expect(image).toBeInTheDocument();
  });

  it("should render detail cards with correct structure", () => {
    renderWorkshopDetailsSection(mockItemVariants);

    // Each detail should have title, value, and description
    const durationTitle = screen.getByText(de.workshop.details.duration.title);
    const participantsTitle = screen.getByText(
      de.workshop.details.participants.title
    );
    const outcomeTitle = screen.getByText(de.workshop.details.outcome.title);

    expect(durationTitle).toBeInTheDocument();
    expect(participantsTitle).toBeInTheDocument();
    expect(outcomeTitle).toBeInTheDocument();

    // Values should be rendered
    expect(
      screen.getByText(de.workshop.details.duration.value)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.participants.value)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.workshop.details.outcome.value)
    ).toBeInTheDocument();
  });

  it("should handle desktop layout with correct image sizing", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });

    renderWorkshopDetailsSection(mockItemVariants);

    const image = screen.getByAltText("AI Workshop Symbolbild");
    expect(image).toBeInTheDocument();
    // Image should be rendered with desktop sizing
    expect(image).toHaveAttribute("src", "/assets/workshop-participants.webp");
  });
});
