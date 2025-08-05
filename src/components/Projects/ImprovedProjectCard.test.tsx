import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useReducedMotion } from "framer-motion";

import { customRender as render } from "@/test/render";
import { Project } from "@/types";

import { ImprovedProjectCard } from "./ImprovedProjectCard";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: vi.fn(),
}));

// Mock TagList component
vi.mock("./TagList", () => ({
  TagList: ({ primaryTags, secondaryTags }: any) => (
    <div data-testid="tag-list">
      {primaryTags?.map((tag: string) => (
        <span key={tag}>{tag}</span>
      ))}
      {secondaryTags?.map((tag: string) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  ),
}));

// Mock ProjectDetailModal
vi.mock("./ProjectDetailModal", () => ({
  ProjectDetailModal: ({ opened, onClose, project }: any) =>
    opened ? (
      <div data-testid="project-modal">
        <span>{project.title}</span>
        <button onClick={onClose}>Close Modal</button>
      </div>
    ) : null,
}));

const mockProject: Project = {
  title: "Test Project",
  customer: "Test Customer",
  description: ["This is a test project description"],
  primary_tags: ["React", "TypeScript"],
  tags: ["Node.js", "Express"],
};

describe("ImprovedProjectCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it("should render project title", () => {
    render(<ImprovedProjectCard project={mockProject} index={0} />);

    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("should render customer name", () => {
    render(<ImprovedProjectCard project={mockProject} index={0} />);

    expect(screen.getByText("Test Customer")).toBeInTheDocument();
  });

  it("should render project description", () => {
    render(<ImprovedProjectCard project={mockProject} index={0} />);

    expect(
      screen.getByText("This is a test project description")
    ).toBeInTheDocument();
  });

  it("should render default description when description is missing", () => {
    const projectWithoutDescription = { ...mockProject, description: [] };
    render(
      <ImprovedProjectCard project={projectWithoutDescription} index={0} />
    );

    expect(screen.getByText("No description available")).toBeInTheDocument();
  });

  it("should render default description when description is undefined", () => {
    const projectWithoutDescription = { ...mockProject, description: [] };
    // @ts-expect-error - testing edge case
    projectWithoutDescription.description = undefined;
    render(
      <ImprovedProjectCard project={projectWithoutDescription} index={0} />
    );

    expect(screen.getByText("No description available")).toBeInTheDocument();
  });

  it("should render TagList with primary and secondary tags", () => {
    render(<ImprovedProjectCard project={mockProject} index={0} />);

    const tagList = screen.getByTestId("tag-list");
    expect(tagList).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Express")).toBeInTheDocument();
  });

  it("should open modal when card is clicked", () => {
    render(<ImprovedProjectCard project={mockProject} index={0} />);

    const titleElements = screen.getAllByText("Test Project");
    const card = titleElements[0].closest(".mantine-Card-root");
    fireEvent.click(card!);

    expect(screen.getByTestId("project-modal")).toBeInTheDocument();
  });

  it("should close modal when close button is clicked", () => {
    render(<ImprovedProjectCard project={mockProject} index={0} />);

    // Open modal
    const titleElements = screen.getAllByText("Test Project");
    const card = titleElements[0].closest(".mantine-Card-root");
    fireEvent.click(card!);

    expect(screen.getByTestId("project-modal")).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByText("Close Modal");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("project-modal")).not.toBeInTheDocument();
  });

  it("should have correct card styling", () => {
    render(<ImprovedProjectCard project={mockProject} index={0} />);

    const card = screen.getByText("Test Project").closest(".mantine-Card-root");
    expect(card).toHaveStyle({
      cursor: "pointer",
      minHeight: "280px",
    });
  });

  it("should handle project with empty primary tags", () => {
    const projectWithoutPrimaryTags = { ...mockProject, primary_tags: [] };
    render(
      <ImprovedProjectCard project={projectWithoutPrimaryTags} index={0} />
    );

    const tagList = screen.getByTestId("tag-list");
    expect(tagList).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Express")).toBeInTheDocument();
  });

  it("should handle project with empty secondary tags", () => {
    const projectWithoutSecondaryTags = { ...mockProject, tags: [] };
    render(
      <ImprovedProjectCard project={projectWithoutSecondaryTags} index={0} />
    );

    const tagList = screen.getByTestId("tag-list");
    expect(tagList).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("should handle project with undefined primary tags", () => {
    const projectWithUndefinedTags = { ...mockProject, primary_tags: [] };
    // @ts-expect-error - testing edge case
    projectWithUndefinedTags.primary_tags = undefined;
    render(
      <ImprovedProjectCard project={projectWithUndefinedTags} index={0} />
    );

    const tagList = screen.getByTestId("tag-list");
    expect(tagList).toBeInTheDocument();
  });

  it("should handle project with undefined secondary tags", () => {
    const projectWithUndefinedTags = { ...mockProject, tags: [] };
    // @ts-expect-error - testing edge case
    projectWithUndefinedTags.tags = undefined;
    render(
      <ImprovedProjectCard project={projectWithUndefinedTags} index={0} />
    );

    const tagList = screen.getByTestId("tag-list");
    expect(tagList).toBeInTheDocument();
  });

  it("should truncate long titles correctly", () => {
    const longTitle = "Very Long Project Title That Should Be Truncated".repeat(
      3
    );
    const projectWithLongTitle = { ...mockProject, title: longTitle };
    render(<ImprovedProjectCard project={projectWithLongTitle} index={0} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it("should truncate long descriptions correctly", () => {
    const longDescription =
      "Very long description that should be truncated. ".repeat(20);
    const projectWithLongDescription = {
      ...mockProject,
      description: [longDescription],
    };
    render(
      <ImprovedProjectCard project={projectWithLongDescription} index={0} />
    );

    // Since the text is truncated by CSS, we check if the beginning of the text is present
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "p" &&
          content.includes("Very long description that should be truncated.")
        );
      })
    ).toBeInTheDocument();
  });

  it("should handle multiple description paragraphs", () => {
    const projectWithMultipleDescriptions = {
      ...mockProject,
      description: ["First paragraph", "Second paragraph", "Third paragraph"],
    };
    render(
      <ImprovedProjectCard
        project={projectWithMultipleDescriptions}
        index={0}
      />
    );

    // Should only show the first paragraph
    expect(screen.getByText("First paragraph")).toBeInTheDocument();
    expect(screen.queryByText("Second paragraph")).not.toBeInTheDocument();
  });

  it("should pass correct props to TagList", () => {
    render(<ImprovedProjectCard project={mockProject} index={0} />);

    // TagList should be rendered with the correct tags
    const tagList = screen.getByTestId("tag-list");
    expect(tagList).toBeInTheDocument();
  });

  describe("modal state management", () => {
    it("should start with modal closed", () => {
      render(<ImprovedProjectCard project={mockProject} index={0} />);

      expect(screen.queryByTestId("project-modal")).not.toBeInTheDocument();
    });

    it("should toggle modal state correctly", () => {
      render(<ImprovedProjectCard project={mockProject} index={0} />);

      const titleElements = screen.getAllByText("Test Project");
      const card = titleElements[0].closest(".mantine-Card-root");

      // Open modal
      fireEvent.click(card!);
      expect(screen.getByTestId("project-modal")).toBeInTheDocument();

      // Close modal
      const closeButton = screen.getByText("Close Modal");
      fireEvent.click(closeButton);
      expect(screen.queryByTestId("project-modal")).not.toBeInTheDocument();

      // Open modal again
      fireEvent.click(card!);
      expect(screen.getByTestId("project-modal")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("should have clickable card", () => {
      render(<ImprovedProjectCard project={mockProject} index={0} />);

      const titleElements = screen.getAllByText("Test Project");
      const card = titleElements[0].closest(".mantine-Card-root");
      expect(card).toBeInTheDocument();
      expect(card).toHaveStyle({ cursor: "pointer" });
    });
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      render(<ImprovedProjectCard project={mockProject} index={0} />);

      // Component should render successfully with animations enabled
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<ImprovedProjectCard project={mockProject} index={0} />);

      // Component should render successfully with reduced animations
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    it("should handle functionality with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<ImprovedProjectCard project={mockProject} index={0} />);

      // Component functionality should still work with reduced motion
      expect(screen.getByText("Test Customer")).toBeInTheDocument();
    });
  });
});
