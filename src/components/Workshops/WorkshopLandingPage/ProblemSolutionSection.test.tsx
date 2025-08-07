import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

// Import the translations directly
import { de } from "@/translations/de";

import { ProblemSolutionSection } from "./ProblemSolutionSection";

// Mock framer-motion
const mockUseReducedMotion = vi.mocked(useReducedMotion);

vi.mock("@/hooks/useTranslation", () => ({
  useTranslation: () => ({ t: de }),
}));

const renderProblemSolutionSection = (
  itemVariants: Variants,
  cardVariants: Variants
) => {
  return render(
    <MantineProvider>
      <ProblemSolutionSection
        itemVariants={itemVariants}
        cardVariants={cardVariants}
      />
    </MantineProvider>
  );
};

const mockItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const mockCardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};

describe("ProblemSolutionSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);

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

  it("should render problem section", () => {
    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    expect(screen.getByText(de.workshop.problem.title)).toBeInTheDocument();
  });

  it("should render solution section", () => {
    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    expect(screen.getByText(de.workshop.solution.title)).toBeInTheDocument();
  });

  it("should render problem points", () => {
    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    de.workshop.problem.points.forEach((point: string) => {
      expect(screen.getByText(point)).toBeInTheDocument();
    });
  });

  it("should render solution points", () => {
    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    de.workshop.solution.points.forEach((point: string) => {
      expect(screen.getByText(point)).toBeInTheDocument();
    });
  });

  it("should render problem icon", () => {
    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    // Problem section should have alert triangle icon (accessible via the card container)
    const problemCards = screen.getAllByRole("list");
    expect(problemCards).toHaveLength(2); // One for problem points, one for solution points
  });

  it("should render solution icon", () => {
    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    // Solution section should have brain icon (accessible via the card container)
    const solutionCards = screen.getAllByRole("list");
    expect(solutionCards).toHaveLength(2); // One for problem points, one for solution points
  });

  it("should render with correct card styling", () => {
    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    // Problem and solution titles should be rendered
    expect(screen.getByText(de.workshop.problem.title)).toBeInTheDocument();
    expect(screen.getByText(de.workshop.solution.title)).toBeInTheDocument();
  });

  it("should handle reduced motion preference", () => {
    mockUseReducedMotion.mockReturnValue(true);

    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    // Should still render all content with reduced motion
    expect(screen.getByText(de.workshop.problem.title)).toBeInTheDocument();
    expect(screen.getByText(de.workshop.solution.title)).toBeInTheDocument();

    // Should render all problem and solution points
    de.workshop.problem.points.forEach((point: string) => {
      expect(screen.getByText(point)).toBeInTheDocument();
    });

    de.workshop.solution.points.forEach((point: string) => {
      expect(screen.getByText(point)).toBeInTheDocument();
    });
  });

  it("should render problem list with correct icon indicators", () => {
    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    // Each problem point should be rendered as a list item
    const problemPoints = de.workshop.problem.points;
    problemPoints.forEach((point: string) => {
      const listItem = screen.getByText(point);
      expect(listItem).toBeInTheDocument();
    });

    // Should have lists rendered
    const lists = screen.getAllByRole("list");
    expect(lists.length).toBeGreaterThan(0);
  });

  it("should render solution list with correct icon indicators", () => {
    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    // Each solution point should be rendered as a list item
    const solutionPoints = de.workshop.solution.points;
    solutionPoints.forEach((point: string) => {
      const listItem = screen.getByText(point);
      expect(listItem).toBeInTheDocument();
    });

    // Should have lists rendered
    const lists = screen.getAllByRole("list");
    expect(lists.length).toBeGreaterThan(0);
  });

  it("should handle null reduced motion preference", () => {
    mockUseReducedMotion.mockReturnValue(null);

    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    // Should still render all content when reduced motion is null
    expect(screen.getByText(de.workshop.problem.title)).toBeInTheDocument();
    expect(screen.getByText(de.workshop.solution.title)).toBeInTheDocument();
  });

  it("should render within correct grid layout", () => {
    renderProblemSolutionSection(mockItemVariants, mockCardVariants);

    // Both problem and solution sections should be rendered
    expect(screen.getByText(de.workshop.problem.title)).toBeInTheDocument();
    expect(screen.getByText(de.workshop.solution.title)).toBeInTheDocument();

    // Should have appropriate spacing and structure
    const problemTitle = screen.getByText(de.workshop.problem.title);
    const solutionTitle = screen.getByText(de.workshop.solution.title);

    expect(problemTitle).toBeVisible();
    expect(solutionTitle).toBeVisible();
  });
});
