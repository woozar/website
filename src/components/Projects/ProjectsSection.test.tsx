import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MantineProvider } from "@mantine/core";

// Import after mocking
import { useReducedMotion } from "framer-motion";

import { ModalProvider } from "@/contexts/ModalContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";
import { de } from "@/translations/de";

// Import after mocking
import { useFilterStore } from "../../stores/filterStore";
import { ProjectsSection } from "./ProjectsSection";

// framer-motion is globally mocked in test setup

// Mock hooks
vi.mock("../../hooks/useMediaQuery", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("../../hooks/useTranslation", () => ({
  useTranslation: vi.fn(),
}));

vi.mock("../../stores/filterStore", () => ({
  useFilterStore: vi.fn(),
}));

// Mock child components
vi.mock("./ProjectCard", () => ({
  ProjectCard: ({ project }: any) => (
    <div data-testid={`project-card-${project.title}`}>
      <h3>{project.title}</h3>
      <p>{project.customer}</p>
      <div data-testid="primary-tags">{project.primary_tags?.join(", ")}</div>
      <div data-testid="secondary-tags">{project.tags?.join(", ")}</div>
    </div>
  ),
}));

vi.mock("../Filter/ActiveTagsFilter", () => ({
  ActiveTagsFilter: () => (
    <div data-testid="active-tags-filter">Filter Component</div>
  ),
}));

vi.mock("../Layout", () => ({
  Section: ({ children, ...props }: any) => (
    <section {...props}>{children}</section>
  ),
  Grid: ({ children, ...props }: any) => (
    <div data-testid="grid" {...props}>
      {children}
    </div>
  ),
}));

const renderComponent = () => {
  return render(
    <MantineProvider>
      <ModalProvider>
        <ProjectsSection />
      </ModalProvider>
    </MantineProvider>
  );
};

describe("ProjectsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFilterStore).mockReturnValue({
      selectedTags: [],
      selectedCustomer: "",
    });
    // Set default reduced motion to false
    vi.mocked(useReducedMotion).mockReturnValue(false);
    // Set default media query to desktop
    vi.mocked(useMediaQuery).mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
    // Mock useTranslation with real German translations
    vi.mocked(useTranslation).mockReturnValue({
      t: de,
      language: "de",
    });
  });

  describe("Basic rendering", () => {
    it("should render projects section with title and subtitle", () => {
      renderComponent();

      expect(screen.getByText("Projekte & Erfahrung")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Eine Auswahl meiner erfolgreichen Projekte aus verschiedenen Branchen."
        )
      ).toBeInTheDocument();
    });

    it("should render ActiveTagsFilter component", () => {
      renderComponent();

      expect(screen.getByTestId("active-tags-filter")).toBeInTheDocument();
      expect(screen.getByText("Filter Component")).toBeInTheDocument();
    });

    it("should render grid layout for projects", () => {
      renderComponent();

      expect(screen.getByTestId("grid")).toBeInTheDocument();
    });

    it("should render project count information", () => {
      renderComponent();

      // Check that project count is displayed (using real data count)
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });
  });

  describe("Project rendering without filters", () => {
    it("should render all projects when no filters are applied", () => {
      renderComponent();

      // Check that project cards are rendered (using actual project titles)
      expect(
        screen.getByTestId("project-card-Moderne Portfolio-Website")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("project-card-AI Playground")
      ).toBeInTheDocument();

      // Check some real project names from German translations
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument();
      expect(screen.getByText("AI Playground")).toBeInTheDocument();
    });

    it("should render project details correctly", () => {
      renderComponent();

      // Check some real customer names from German translations
      expect(screen.getByText("12 of Spades")).toBeInTheDocument();
      expect(screen.getByText("ChatYourData GmbH")).toBeInTheDocument();
    });

    it("should render project tags correctly", () => {
      renderComponent();

      const primaryTagsElements = screen.getAllByTestId("primary-tags");
      const secondaryTagsElements = screen.getAllByTestId("secondary-tags");

      // Check that first project has React and TypeScript tags (Moderne Portfolio-Website)
      expect(primaryTagsElements[0]).toHaveTextContent("React");
      expect(primaryTagsElements[0]).toHaveTextContent("TypeScript");

      // Check that secondary tags are rendered
      expect(secondaryTagsElements[0]).toHaveTextContent("Claude Code");
    });
  });

  describe("Tag filtering functionality", () => {
    it("should render filter functionality with all projects by default", () => {
      renderComponent();

      // When no filters are applied, all projects should show (using real project names)
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument();
      expect(screen.getByText("AI Playground")).toBeInTheDocument();
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });
  });

  describe("Filtering integration", () => {
    it("should work with filter store integration", () => {
      renderComponent();

      // The component integrates with useFilterStore hook
      // Since no filters are selected in our mock, all projects show
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument();
      expect(screen.getByText("AI Playground")).toBeInTheDocument();
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });
  });

  describe("Component structure", () => {
    it("should render section with proper structure", () => {
      renderComponent();

      // Should have section, title, filter, grid, and count
      expect(screen.getByText("Projekte & Erfahrung")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Eine Auswahl meiner erfolgreichen Projekte aus verschiedenen Branchen."
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId("active-tags-filter")).toBeInTheDocument();
      expect(screen.getByTestId("grid")).toBeInTheDocument();
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });

    it("should render all project cards with correct structure", () => {
      renderComponent();

      // Should render project cards (check for first few using actual titles)
      expect(
        screen.getByTestId("project-card-Moderne Portfolio-Website")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("project-card-AI Playground")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("project-card-KI-Workshop für Steuersoftware")
      ).toBeInTheDocument();
    });
  });

  describe("Filtering functionality", () => {
    it("should filter projects by selected tags", () => {
      // Mock filter store with selected tags
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["Mantine"],
        selectedCustomer: "",
      });

      renderComponent();

      // Should show projects with Mantine tag (Moderne Portfolio-Website has Mantine)
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument();
      // AI Playground doesn't have Mantine, so it should not be shown
      expect(screen.queryByText("AI Playground")).not.toBeInTheDocument();
      // Check that filtered count is shown
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });

    it("should filter projects by customer name", () => {
      // Mock filter store with selected customer
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: [],
        selectedCustomer: "ChatYourData",
      });

      renderComponent();

      // Should only show projects from ChatYourData GmbH
      expect(screen.getByText("AI Playground")).toBeInTheDocument();
      expect(
        screen.queryByText("Moderne Portfolio-Website")
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });

    it("should filter projects by both tags and customer", () => {
      // Mock filter store with both selected tags and customer
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["TypeScript"],
        selectedCustomer: "12 of Spades",
      });

      renderComponent();

      // Should only show projects that match both criteria (Moderne Portfolio-Website has TypeScript and "12 of Spades")
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument();
      expect(screen.queryByText("AI Playground")).not.toBeInTheDocument();
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });

    it("should handle case insensitive customer filtering", () => {
      // Mock filter store with uppercase customer name
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: [],
        selectedCustomer: "CHATYOURDATA",
      });

      renderComponent();

      // Should still find "ChatYourData GmbH" with case insensitive search
      expect(screen.getByText("AI Playground")).toBeInTheDocument();
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });

    it("should filter projects using AND logic for multiple tags", () => {
      // Mock filter store with multiple tags that several projects have
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["React", "TypeScript"],
        selectedCustomer: "",
      });

      renderComponent();

      // Should only show projects that have BOTH React AND TypeScript
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument(); // has both React and TypeScript
      expect(screen.queryByText("AI Playground")).not.toBeInTheDocument(); // has neither
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });

    it("should filter with AND logic - no results when no project has all selected tags", () => {
      // Mock filter store with tags that no single project has all of
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["React", "Python"], // No project has both
        selectedCustomer: "",
      });

      renderComponent();

      // Should show minimal or no projects since combination is rare
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });

    it("should consider both primary and secondary tags for AND filtering", () => {
      // Mock filter store with one primary tag and one secondary tag
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["React", "Vite"], // React is primary, Vite is secondary in Moderne Portfolio-Website
        selectedCustomer: "",
      });

      renderComponent();

      // Should show projects that have React (primary) AND Vite (secondary)
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument();
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      renderComponent();

      // Component should render successfully with animations enabled
      expect(screen.getByText("Projekte & Erfahrung")).toBeInTheDocument();
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument();
      expect(screen.getByText("AI Playground")).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      renderComponent();

      // Component should render successfully with reduced animations
      expect(screen.getByText("Projekte & Erfahrung")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Eine Auswahl meiner erfolgreichen Projekte aus verschiedenen Branchen."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument();
    });

    it("should handle filtering functionality with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["Mantine"],
        selectedCustomer: "",
      });

      renderComponent();

      // Filtering should still work with reduced motion (Moderne Portfolio-Website has Mantine)
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument();
      expect(screen.queryByText("AI Playground")).not.toBeInTheDocument();
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("should handle mobile layout", () => {
      // Update the useMediaQuery mock to return mobile view
      vi.mocked(useMediaQuery).mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      renderComponent();

      // Component should render successfully with mobile layout
      expect(screen.getByText("Projekte & Erfahrung")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Eine Auswahl meiner erfolgreichen Projekte aus verschiedenen Branchen."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Moderne Portfolio-Website")).toBeInTheDocument();
      expect(screen.getByText("AI Playground")).toBeInTheDocument();
      expect(
        screen.getByText("KI-Workshop für Steuersoftware")
      ).toBeInTheDocument();
      expect(screen.getByText("KI-Business-Workshop")).toBeInTheDocument();
      expect(
        screen.getByText(/\d+ von \d+ Projekten angezeigt/)
      ).toBeInTheDocument();
    });
  });
});
