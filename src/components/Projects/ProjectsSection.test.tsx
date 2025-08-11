import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MantineProvider } from "@mantine/core";

// Import after mocking
import { useReducedMotion } from "framer-motion";

import { ModalProvider } from "@/contexts/ModalContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Import after mocking
import { useFilterStore } from "../../stores/filterStore";
import { ProjectsSection } from "./ProjectsSection";

// framer-motion is globally mocked in test setup

// Mock hooks
const mockProjects = [
  {
    id: "1",
    title: "Test Project 1",
    customer: "Test Customer 1",
    primary_tags: ["React", "TypeScript"],
    tags: ["JavaScript"],
    description: "Test description 1",
    technologies: ["React", "TypeScript"],
    completion_year: 2023,
    customer_sector: "Technology",
    project_type: "Web Development",
    team_size: 3,
    duration_months: 6,
    features: ["Feature 1"],
    challenges: ["Challenge 1"],
    outcomes: ["Outcome 1"],
    images: [],
  },
  {
    id: "2",
    title: "Test Project 2",
    customer: "Test Customer 2",
    primary_tags: ["Vue"],
    tags: ["CSS"],
    description: "Test description 2",
    technologies: ["Vue"],
    completion_year: 2023,
    customer_sector: "Finance",
    project_type: "Web Development",
    team_size: 2,
    duration_months: 4,
    features: ["Feature 2"],
    challenges: ["Challenge 2"],
    outcomes: ["Outcome 2"],
    images: [],
  },
  {
    id: "3",
    title: "Test Project 3",
    customer: "Another Company",
    primary_tags: ["Angular"],
    tags: ["SCSS"],
    description: "Test description 3",
    technologies: ["Angular"],
    completion_year: 2024,
    customer_sector: "Healthcare",
    project_type: "Web Development",
    team_size: 5,
    duration_months: 8,
    features: ["Feature 3"],
    challenges: ["Challenge 3"],
    outcomes: ["Outcome 3"],
    images: [],
  },
  {
    id: "4",
    title: "Test Project 4",
    customer: "Multi Tag Company",
    primary_tags: ["React", "TypeScript"],
    tags: ["JavaScript", "CSS"],
    description: "Test description 4",
    technologies: ["React", "TypeScript"],
    completion_year: 2024,
    customer_sector: "Technology",
    project_type: "Web Development",
    team_size: 4,
    duration_months: 3,
    features: ["Feature 4"],
    challenges: ["Challenge 4"],
    outcomes: ["Outcome 4"],
    images: [],
  },
];

vi.mock("../../hooks/useMediaQuery", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("../../hooks/useProjects", () => ({
  useProjects: () => ({
    projects: mockProjects,
  }),
}));

vi.mock("../../hooks/useTranslation", () => ({
  useTranslation: () => ({
    t: {
      projects: {
        title: "Our Projects",
        subtitle: "Take a look at our recent work",
        showingCount: (filtered: number, total: number) =>
          `Showing ${filtered} of ${total} projects`,
      },
    },
  }),
}));

vi.mock("../../stores/filterStore", () => ({
  useFilterStore: vi.fn(),
}));

// Mock child components
vi.mock("./ProjectCard", () => ({
  ProjectCard: ({ project, index }: any) => (
    <div data-testid={`project-card-${index}`}>
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
  });

  describe("Basic rendering", () => {
    it("should render projects section with title and subtitle", () => {
      renderComponent();

      expect(screen.getByText("Our Projects")).toBeInTheDocument();
      expect(
        screen.getByText("Take a look at our recent work")
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

      expect(screen.getByText("Showing 4 of 4 projects")).toBeInTheDocument();
    });
  });

  describe("Project rendering without filters", () => {
    it("should render all projects when no filters are applied", () => {
      renderComponent();

      expect(screen.getByTestId("project-card-0")).toBeInTheDocument();
      expect(screen.getByTestId("project-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("project-card-2")).toBeInTheDocument();
      expect(screen.getByTestId("project-card-3")).toBeInTheDocument();

      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.getByText("Test Project 2")).toBeInTheDocument();
      expect(screen.getByText("Test Project 3")).toBeInTheDocument();
      expect(screen.getByText("Test Project 4")).toBeInTheDocument();
    });

    it("should render project details correctly", () => {
      renderComponent();

      expect(screen.getByText("Test Customer 1")).toBeInTheDocument();
      expect(screen.getByText("Test Customer 2")).toBeInTheDocument();
      expect(screen.getByText("Another Company")).toBeInTheDocument();
    });

    it("should render project tags correctly", () => {
      renderComponent();

      const primaryTagsElements = screen.getAllByTestId("primary-tags");
      const secondaryTagsElements = screen.getAllByTestId("secondary-tags");

      expect(primaryTagsElements[0]).toHaveTextContent("React, TypeScript");
      expect(primaryTagsElements[1]).toHaveTextContent("Vue");
      expect(primaryTagsElements[2]).toHaveTextContent("Angular");

      expect(secondaryTagsElements[0]).toHaveTextContent("JavaScript");
      expect(secondaryTagsElements[1]).toHaveTextContent("CSS");
      expect(secondaryTagsElements[2]).toHaveTextContent("SCSS");
    });
  });

  describe("Tag filtering functionality", () => {
    it("should render filter functionality with all projects by default", () => {
      renderComponent();

      // When no filters are applied, all projects should show
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.getByText("Test Project 2")).toBeInTheDocument();
      expect(screen.getByText("Test Project 3")).toBeInTheDocument();
      expect(screen.getByText("Test Project 4")).toBeInTheDocument();
      expect(screen.getByText("Showing 4 of 4 projects")).toBeInTheDocument();
    });
  });

  describe("Filtering integration", () => {
    it("should work with filter store integration", () => {
      renderComponent();

      // The component integrates with useFilterStore hook
      // Since no filters are selected in our mock, all projects show
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.getByText("Test Project 2")).toBeInTheDocument();
      expect(screen.getByText("Test Project 3")).toBeInTheDocument();
      expect(screen.getByText("Test Project 4")).toBeInTheDocument();
      expect(screen.getByText("Showing 4 of 4 projects")).toBeInTheDocument();
    });
  });

  describe("Component structure", () => {
    it("should render section with proper structure", () => {
      renderComponent();

      // Should have section, title, filter, grid, and count
      expect(screen.getByText("Our Projects")).toBeInTheDocument();
      expect(
        screen.getByText("Take a look at our recent work")
      ).toBeInTheDocument();
      expect(screen.getByTestId("active-tags-filter")).toBeInTheDocument();
      expect(screen.getByTestId("grid")).toBeInTheDocument();
      expect(screen.getByText("Showing 4 of 4 projects")).toBeInTheDocument();
    });

    it("should render all project cards with correct structure", () => {
      renderComponent();

      // Should render all project cards
      expect(screen.getByTestId("project-card-0")).toBeInTheDocument();
      expect(screen.getByTestId("project-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("project-card-2")).toBeInTheDocument();
      expect(screen.getByTestId("project-card-3")).toBeInTheDocument();
    });
  });

  describe("Filtering functionality", () => {
    it("should filter projects by selected tags", () => {
      // Mock filter store with selected tags
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["React"],
        selectedCustomer: "",
      });

      renderComponent();

      // Should only show projects with React tag (Projects 1 and 4 have React)
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.queryByText("Test Project 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Project 3")).not.toBeInTheDocument();
      expect(screen.getByText("Test Project 4")).toBeInTheDocument();
      expect(screen.getByText("Showing 2 of 4 projects")).toBeInTheDocument();
    });

    it("should filter projects by customer name", () => {
      // Mock filter store with selected customer
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: [],
        selectedCustomer: "Another",
      });

      renderComponent();

      // Should only show projects from "Another Company"
      expect(screen.queryByText("Test Project 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Project 2")).not.toBeInTheDocument();
      expect(screen.getByText("Test Project 3")).toBeInTheDocument();
      expect(screen.getByText("Showing 1 of 4 projects")).toBeInTheDocument();
    });

    it("should filter projects by both tags and customer", () => {
      // Mock filter store with both selected tags and customer
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["TypeScript"],
        selectedCustomer: "Test",
      });

      renderComponent();

      // Should only show projects that match both criteria (Projects 1 has TypeScript and "Test Customer 1")
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.queryByText("Test Project 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Project 3")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Project 4")).not.toBeInTheDocument(); // "Multi Tag Company" doesn't contain "Test"
      expect(screen.getByText("Showing 1 of 4 projects")).toBeInTheDocument();
    });

    it("should handle case insensitive customer filtering", () => {
      // Mock filter store with uppercase customer name
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: [],
        selectedCustomer: "ANOTHER",
      });

      renderComponent();

      // Should still find "Another Company" with case insensitive search
      expect(screen.getByText("Test Project 3")).toBeInTheDocument();
      expect(screen.getByText("Showing 1 of 4 projects")).toBeInTheDocument();
    });

    it("should filter projects using AND logic for multiple tags", () => {
      // Mock filter store with multiple tags that only Project 1 and 4 have both
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["React", "TypeScript"],
        selectedCustomer: "",
      });

      renderComponent();

      // Should only show projects that have BOTH React AND TypeScript
      expect(screen.getByText("Test Project 1")).toBeInTheDocument(); // has both React and TypeScript
      expect(screen.queryByText("Test Project 2")).not.toBeInTheDocument(); // has neither
      expect(screen.queryByText("Test Project 3")).not.toBeInTheDocument(); // has neither
      expect(screen.getByText("Test Project 4")).toBeInTheDocument(); // has both React and TypeScript
      expect(screen.getByText("Showing 2 of 4 projects")).toBeInTheDocument();
    });

    it("should filter with AND logic - no results when no project has all selected tags", () => {
      // Mock filter store with tags that no single project has all of
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["React", "Angular"], // No project has both
        selectedCustomer: "",
      });

      renderComponent();

      // Should show no projects since no project has both React AND Angular
      expect(screen.queryByText("Test Project 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Project 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Project 3")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Project 4")).not.toBeInTheDocument();
      expect(screen.getByText("Showing 0 of 4 projects")).toBeInTheDocument();
    });

    it("should consider both primary and secondary tags for AND filtering", () => {
      // Mock filter store with one primary tag and one secondary tag
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["React", "JavaScript"], // React is primary, JavaScript is secondary
        selectedCustomer: "",
      });

      renderComponent();

      // Should show projects that have React (primary) AND JavaScript (secondary)
      expect(screen.getByText("Test Project 1")).toBeInTheDocument(); // React primary, JavaScript secondary
      expect(screen.queryByText("Test Project 2")).not.toBeInTheDocument(); // no React
      expect(screen.queryByText("Test Project 3")).not.toBeInTheDocument(); // no React or JavaScript
      expect(screen.getByText("Test Project 4")).toBeInTheDocument(); // React primary, JavaScript secondary
      expect(screen.getByText("Showing 2 of 4 projects")).toBeInTheDocument();
    });
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      renderComponent();

      // Component should render successfully with animations enabled
      expect(screen.getByText("Our Projects")).toBeInTheDocument();
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.getByText("Test Project 2")).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      renderComponent();

      // Component should render successfully with reduced animations
      expect(screen.getByText("Our Projects")).toBeInTheDocument();
      expect(
        screen.getByText("Take a look at our recent work")
      ).toBeInTheDocument();
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
    });

    it("should handle filtering functionality with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);
      vi.mocked(useFilterStore).mockReturnValue({
        selectedTags: ["React"],
        selectedCustomer: "",
      });

      renderComponent();

      // Filtering should still work with reduced motion (Projects 1 and 4 have React)
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.queryByText("Test Project 2")).not.toBeInTheDocument();
      expect(screen.getByText("Test Project 4")).toBeInTheDocument();
      expect(screen.getByText("Showing 2 of 4 projects")).toBeInTheDocument();
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
      expect(screen.getByText("Our Projects")).toBeInTheDocument();
      expect(
        screen.getByText("Take a look at our recent work")
      ).toBeInTheDocument();
      expect(screen.getByText("Test Project 1")).toBeInTheDocument();
      expect(screen.getByText("Test Project 2")).toBeInTheDocument();
      expect(screen.getByText("Test Project 3")).toBeInTheDocument();
      expect(screen.getByText("Test Project 4")).toBeInTheDocument();
      expect(screen.getByText("Showing 4 of 4 projects")).toBeInTheDocument();
    });
  });
});
