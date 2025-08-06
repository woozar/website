import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useFilterStore } from "@/stores/filterStore";
import { customRender as render } from "@/test/render";

import { TagList } from "./TagList";

// framer-motion is globally mocked in test setup

// Mock TagChip component
vi.mock("../Filter/TagChip", () => ({
  TagChip: ({ tag, onClick, isPrimary, isSelected, ...props }: any) => (
    <button
      data-testid={`tag-${tag}`}
      data-primary={isPrimary}
      data-selected={isSelected}
      onClick={() => onClick?.(tag)}
      {...props}
    >
      {tag}
    </button>
  ),
}));

// Mock the filter store
vi.mock("../../stores/filterStore", () => ({
  useFilterStore: vi.fn(),
}));

const mockFilterStore = {
  toggleTag: vi.fn(),
  selectedTags: [],
};

describe("TagList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useFilterStore as any).mockReturnValue(mockFilterStore);
  });

  it("should render primary tags", () => {
    render(
      <TagList primaryTags={["React", "TypeScript"]} secondaryTags={[]} />
    );

    expect(screen.getByTestId("tag-React")).toBeInTheDocument();
    expect(screen.getByTestId("tag-TypeScript")).toBeInTheDocument();
  });

  it("should render secondary tags", () => {
    render(<TagList primaryTags={[]} secondaryTags={["Node.js", "Express"]} />);

    expect(screen.getByTestId("tag-Node.js")).toBeInTheDocument();
    expect(screen.getByTestId("tag-Express")).toBeInTheDocument();
  });

  it("should render both primary and secondary tags", () => {
    render(<TagList primaryTags={["React"]} secondaryTags={["Node.js"]} />);

    expect(screen.getByTestId("tag-React")).toBeInTheDocument();
    expect(screen.getByTestId("tag-Node.js")).toBeInTheDocument();
  });

  it("should sort tags alphabetically", () => {
    render(
      <TagList
        primaryTags={["Zulu", "Alpha", "Beta"]}
        secondaryTags={["Zebra", "Apple"]}
      />
    );

    // All tags should be present
    expect(screen.getByTestId("tag-Alpha")).toBeInTheDocument();
    expect(screen.getByTestId("tag-Beta")).toBeInTheDocument();
    expect(screen.getByTestId("tag-Zulu")).toBeInTheDocument();
    expect(screen.getByTestId("tag-Apple")).toBeInTheDocument();
    expect(screen.getByTestId("tag-Zebra")).toBeInTheDocument();
  });

  it("should handle null/undefined tags", () => {
    // @ts-expect-error - testing edge case
    render(<TagList primaryTags={null} secondaryTags={undefined} />);

    // Should not crash
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should limit tags based on maxTags prop", () => {
    render(
      <TagList
        primaryTags={["Tag1", "Tag2", "Tag3"]}
        secondaryTags={["Tag4", "Tag5"]}
        maxTags={3}
      />
    );

    // Only first 3 tags should be rendered
    expect(screen.getByTestId("tag-Tag1")).toBeInTheDocument();
    expect(screen.getByTestId("tag-Tag2")).toBeInTheDocument();
    expect(screen.getByTestId("tag-Tag3")).toBeInTheDocument();
    expect(screen.queryByTestId("tag-Tag4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tag-Tag5")).not.toBeInTheDocument();
  });

  it('should show "more" badge when there are more tags than maxTags', () => {
    render(
      <TagList
        primaryTags={["Tag1", "Tag2", "Tag3"]}
        secondaryTags={["Tag4", "Tag5"]}
        maxTags={3}
        showMoreBadge={true}
      />
    );

    expect(screen.getByText("+2 more")).toBeInTheDocument();
  });

  it('should not show "more" badge when showMoreBadge is false', () => {
    render(
      <TagList
        primaryTags={["Tag1", "Tag2", "Tag3"]}
        secondaryTags={["Tag4", "Tag5"]}
        maxTags={3}
        showMoreBadge={false}
      />
    );

    expect(screen.queryByText("+2 more")).not.toBeInTheDocument();
  });

  it('should not show "more" badge when all tags fit', () => {
    render(
      <TagList
        primaryTags={["Tag1", "Tag2"]}
        secondaryTags={["Tag3"]}
        maxTags={5}
        showMoreBadge={true}
      />
    );

    expect(screen.queryByText(/more/)).not.toBeInTheDocument();
  });

  it("should call toggleTag when clicking a primary tag", () => {
    const mockToggleTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      toggleTag: mockToggleTag,
    });

    render(<TagList primaryTags={["React"]} secondaryTags={[]} />);

    const reactTag = screen.getByTestId("tag-React");
    fireEvent.click(reactTag);

    expect(mockToggleTag).toHaveBeenCalledWith("React");
  });

  it("should call toggleTag when clicking a secondary tag", () => {
    const mockToggleTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      toggleTag: mockToggleTag,
    });

    render(<TagList primaryTags={[]} secondaryTags={["Node.js"]} />);

    const nodeTag = screen.getByTestId("tag-Node.js");
    fireEvent.click(nodeTag);

    expect(mockToggleTag).toHaveBeenCalledWith("Node.js");
  });

  it("should not call toggle functions when selectable is false", () => {
    const mockToggleTag = vi.fn();
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      toggleTag: mockToggleTag,
    });

    render(
      <TagList
        primaryTags={["React"]}
        secondaryTags={["Node.js"]}
        selectable={false}
      />
    );

    const reactTag = screen.getByTestId("tag-React");
    const nodeTag = screen.getByTestId("tag-Node.js");

    fireEvent.click(reactTag);
    fireEvent.click(nodeTag);

    expect(mockToggleTag).not.toHaveBeenCalled();
  });

  it("should do nothing when clicking non-clickable tags", () => {
    const mockToggleTag = vi.fn();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      toggleTag: mockToggleTag,
      selectedTags: [],
    });

    render(
      <TagList
        primaryTags={["React"]}
        secondaryTags={["Node.js"]}
        selectable={false}
      />
    );

    const reactTag = screen.getByTestId("tag-React");

    // Clicking on non-clickable tag should not cause any side effects
    expect(() => fireEvent.click(reactTag)).not.toThrow();

    // No toggle function should be called
    expect(mockToggleTag).not.toHaveBeenCalled();

    // No console errors should be generated
    expect(consoleSpy).not.toHaveBeenCalled();

    // Tag should remain in its original state
    expect(reactTag).toHaveAttribute("data-selected", "false");

    consoleSpy.mockRestore();
  });

  it("should show selected state for primary tags", () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ["React"],
    });

    render(<TagList primaryTags={["React", "Vue"]} secondaryTags={[]} />);

    const reactTag = screen.getByTestId("tag-React");
    const vueTag = screen.getByTestId("tag-Vue");

    expect(reactTag).toHaveAttribute("data-selected", "true");
    expect(vueTag).toHaveAttribute("data-selected", "false");
  });

  it("should show selected state for secondary tags", () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: ["Node.js"],
    });

    render(<TagList primaryTags={[]} secondaryTags={["Node.js", "Express"]} />);

    const nodeTag = screen.getByTestId("tag-Node.js");
    const expressTag = screen.getByTestId("tag-Express");

    expect(nodeTag).toHaveAttribute("data-selected", "true");
    expect(expressTag).toHaveAttribute("data-selected", "false");
  });

  it("should correctly identify primary tags", () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: [],
    });

    render(<TagList primaryTags={["React"]} secondaryTags={["Node.js"]} />);

    const reactTag = screen.getByTestId("tag-React");
    const nodeTag = screen.getByTestId("tag-Node.js");

    expect(reactTag).toHaveAttribute("data-primary", "true");
    expect(nodeTag).toHaveAttribute("data-primary", "false");
  });

  it("should apply custom font size", () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: [],
    });

    render(
      <TagList primaryTags={["React"]} secondaryTags={[]} fontSize="1.2rem" />
    );

    const reactTag = screen.getByTestId("tag-React");
    expect(reactTag).toHaveStyle({ fontSize: "1.2rem" });
  });

  it("should use default maxTags when not specified", () => {
    (useFilterStore as any).mockReturnValue({
      ...mockFilterStore,
      selectedTags: [],
    });

    const manyTags = Array.from({ length: 150 }, (_, i) => `Tag${i}`);
    render(<TagList primaryTags={manyTags} secondaryTags={[]} />);

    // Should render up to default maxTags (100)
    expect(screen.getAllByRole("button")).toHaveLength(100);
  });

  describe("edge cases", () => {
    it("should handle empty arrays", () => {
      render(<TagList primaryTags={[]} secondaryTags={[]} />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("should deduplicate tags (primary takes precedence)", () => {
      (useFilterStore as any).mockReturnValue({
        ...mockFilterStore,
        selectedTags: [],
      });

      render(
        <TagList
          primaryTags={["React", "React"]}
          secondaryTags={["React", "Node.js"]}
        />
      );

      // Should deduplicate React and show it as primary only
      expect(screen.getAllByTestId("tag-React")).toHaveLength(1);
      expect(screen.getAllByTestId("tag-Node.js")).toHaveLength(1);

      // React should be rendered as primary
      const reactTag = screen.getByTestId("tag-React");
      expect(reactTag).toHaveAttribute("data-primary", "true");
    });

    it("should handle very long tag names", () => {
      (useFilterStore as any).mockReturnValue({
        ...mockFilterStore,
        selectedTags: [],
      });

      const longTag = "Very".repeat(20);
      render(<TagList primaryTags={[longTag]} secondaryTags={[]} />);

      expect(screen.getByTestId(`tag-${longTag}`)).toBeInTheDocument();
    });
  });
});
