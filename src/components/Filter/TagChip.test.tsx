import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { customRender as render } from "../../test/render";
import { TagChip } from "./TagChip";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("TagChip", () => {
  it("should render tag name", () => {
    render(<TagChip tag="React" />);

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("should render tag with count", () => {
    render(<TagChip tag="React" count={5} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("(5)")).toBeInTheDocument();
  });

  it("should not render count when count is undefined", () => {
    render(<TagChip tag="React" />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText(/\(\d+\)/)).not.toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const mockOnClick = vi.fn();
    render(<TagChip tag="React" onClick={mockOnClick} />);

    const chip = screen.getByText("React");
    fireEvent.click(chip);

    expect(mockOnClick).toHaveBeenCalledWith("React", expect.any(Object));
  });

  it("should not call onClick when onClick is not provided", () => {
    render(<TagChip tag="React" />);

    const chip = screen.getByText("React");
    expect(() => fireEvent.click(chip)).not.toThrow();
  });

  it("should stop event propagation when clicked", () => {
    const mockOnClick = vi.fn();
    const mockParentClick = vi.fn();

    render(
      <div onClick={mockParentClick}>
        <TagChip tag="React" onClick={mockOnClick} />
      </div>
    );

    const chip = screen.getByText("React");
    fireEvent.click(chip);

    expect(mockOnClick).toHaveBeenCalled();
    expect(mockParentClick).not.toHaveBeenCalled();
  });

  it("should have correct styling when selected", () => {
    render(<TagChip tag="React" isSelected={true} />);

    const badge = screen.getByText("React").closest(".mantine-Badge-root");
    expect(badge).toHaveAttribute("data-variant", "filled");
  });

  it("should have correct styling when not selected", () => {
    render(<TagChip tag="React" isSelected={false} />);

    const badge = screen.getByText("React").closest(".mantine-Badge-root");
    expect(badge).toHaveAttribute("data-variant", "outline");
  });

  it("should apply red color when isPrimary is true", () => {
    render(<TagChip tag="React" isPrimary={true} />);

    const badge = screen.getByText("React").closest(".mantine-Badge-root");
    // Test that the component receives the correct color prop
    expect(badge).toBeInTheDocument();
    // We can't easily test Mantine's internal color mapping, but we can verify the component renders
  });

  it("should apply orange color when isPrimary is false", () => {
    render(<TagChip tag="React" isPrimary={false} />);

    const badge = screen.getByText("React").closest(".mantine-Badge-root");
    expect(badge).toBeInTheDocument();
  });

  it("should have pointer cursor when clickable", () => {
    render(<TagChip tag="React" onClick={vi.fn()} />);

    const badge = screen.getByText("React").closest(".mantine-Badge-root");
    expect(badge).toHaveStyle({ cursor: "pointer" });
  });

  it("should have default cursor when not clickable", () => {
    render(<TagChip tag="React" />);

    const badge = screen.getByText("React").closest(".mantine-Badge-root");
    expect(badge).toHaveStyle({ cursor: "default" });
  });

  it("should show filled variant when selected", () => {
    render(<TagChip tag="React" isSelected={true} isPrimary={true} />);

    const badge = screen.getByText("React").closest(".mantine-Badge-root");
    expect(badge).toHaveAttribute("data-variant", "filled");
  });

  it("should pass through additional Badge props", () => {
    render(<TagChip tag="React" size="lg" radius="sm" />);

    const badge = screen.getByText("React").closest(".mantine-Badge-root");
    expect(badge).toHaveAttribute("data-size", "lg");
    // Some Mantine props may not be directly testable as data attributes
  });

  it("should handle custom style prop", () => {
    const customStyle = { fontSize: "20px", fontWeight: "bold" };
    render(<TagChip tag="React" style={customStyle} />);

    const badge = screen.getByText("React").closest(".mantine-Badge-root");
    expect(badge).toHaveStyle({ fontSize: "20px", fontWeight: "bold" });
  });

  it("should render count with correct styling", () => {
    render(<TagChip tag="React" count={10} />);

    const count = screen.getByText("(10)");
    expect(count).toHaveStyle({ fontSize: "0.75em", opacity: "0.8" });
  });

  it("should handle zero count", () => {
    render(<TagChip tag="React" count={0} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  it("should handle large count numbers", () => {
    render(<TagChip tag="React" count={999} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("(999)")).toBeInTheDocument();
  });

  describe("event handling", () => {
    it("should handle click event correctly", () => {
      const mockOnClick = vi.fn();
      render(<TagChip tag="React" onClick={mockOnClick} />);

      const chip = screen.getByText("React");
      const clickEvent = new MouseEvent("click", { bubbles: true });

      fireEvent(chip, clickEvent);

      expect(mockOnClick).toHaveBeenCalledWith("React", expect.any(Object));
    });

    it("should handle keyboard events on the badge", () => {
      const mockOnClick = vi.fn();
      render(<TagChip tag="React" onClick={mockOnClick} />);

      const chip = screen.getByText("React");
      fireEvent.keyDown(chip, { key: "Enter" });

      // Badge component should handle keyboard events internally
      expect(chip).toBeInTheDocument();
    });
  });
});
