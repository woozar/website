import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { IconCode } from "@tabler/icons-react";

// Import after mocking
import { useReducedMotion } from "framer-motion";

import { customRender as render } from "@/test/render";

import { FlippableStatCard } from "./FlippableStatCard";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useReducedMotion: vi.fn(),
}));

const mockUseReducedMotion = useReducedMotion as ReturnType<typeof vi.fn>;

const defaultProps = {
  icon: IconCode,
  title: "Test Frameworks",
  value: "5",
  description: "Test frameworks used",
  backContent: {
    title: "Used Frameworks",
    items: ["React", "Angular", "Vue", "Next.js", "Express"],
  },
  accessibility: {
    cardFlipShow: "Click to show details",
    cardFlipHide: "Click to hide details",
  },
};

describe("FlippableStatCard", () => {
  beforeEach(() => {
    mockUseReducedMotion.mockReturnValue(false);
  });

  it("should render front side initially", () => {
    render(<FlippableStatCard {...defaultProps} />);

    expect(screen.getByText("Test Frameworks")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Test frameworks used")).toBeInTheDocument();
  });

  it("should show refresh icon", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const refreshIcons = screen.getAllByTestId("refresh-icon");
    expect(refreshIcons).toHaveLength(2); // One for each side
  });

  it("should flip card on click", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");
    fireEvent.click(flipButton);

    expect(screen.getByText("Used Frameworks")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
  });

  it("should flip card on Enter key", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");
    fireEvent.keyDown(flipButton, { key: "Enter" });

    expect(screen.getByText("Used Frameworks")).toBeInTheDocument();
  });

  it("should flip card on Space key", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");
    fireEvent.keyDown(flipButton, { key: " " });

    expect(screen.getByText("Used Frameworks")).toBeInTheDocument();
  });

  it("should not flip on other keys", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");

    // Verify it's not flipped initially
    expect(flipButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(flipButton, { key: "Tab" });

    // Should still not be flipped
    expect(flipButton).toHaveAttribute("aria-expanded", "false");
  });

  it("should render all framework items on back side", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");
    fireEvent.click(flipButton);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Express")).toBeInTheDocument();
  });

  it("should handle mobile layout", () => {
    render(<FlippableStatCard {...defaultProps} isMobile={true} />);

    expect(screen.getByText("Test Frameworks")).toBeInTheDocument();
  });

  it("should handle desktop layout", () => {
    render(<FlippableStatCard {...defaultProps} isMobile={false} />);

    expect(screen.getByText("Test Frameworks")).toBeInTheDocument();
  });

  it("should update accessibility label when flipped", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");
    expect(flipButton).toHaveAttribute(
      "aria-label",
      "Test Frameworks card. Click to show details."
    );

    fireEvent.click(flipButton);
    expect(flipButton).toHaveAttribute(
      "aria-label",
      "Test Frameworks card. Click to hide details."
    );
  });

  it("should set aria-expanded correctly", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");
    expect(flipButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(flipButton);
    expect(flipButton).toHaveAttribute("aria-expanded", "true");
  });

  it("should respect reduced motion preference", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");
    fireEvent.click(flipButton);

    expect(screen.getByText("Used Frameworks")).toBeInTheDocument();
  });

  it("should render with correct tabIndex", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");
    expect(flipButton).toHaveAttribute("tabIndex", "0");
  });

  it("should handle empty framework list", () => {
    const propsWithEmptyList = {
      ...defaultProps,
      backContent: {
        title: "Used Frameworks",
        items: [],
      },
    };

    render(<FlippableStatCard {...propsWithEmptyList} />);

    const flipButton = screen.getByRole("button");
    fireEvent.click(flipButton);

    expect(screen.getByText("Used Frameworks")).toBeInTheDocument();
  });

  it("should handle keyboard events properly", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");

    // Verify initial state
    expect(flipButton).toHaveAttribute("aria-expanded", "false");

    // Test Enter key flips the card
    fireEvent.keyDown(flipButton, { key: "Enter" });
    expect(flipButton).toHaveAttribute("aria-expanded", "true");

    // Reset state
    fireEvent.keyDown(flipButton, { key: "Enter" });
    expect(flipButton).toHaveAttribute("aria-expanded", "false");

    // Test Space key flips the card
    fireEvent.keyDown(flipButton, { key: " " });
    expect(flipButton).toHaveAttribute("aria-expanded", "true");
  });

  it("should render correct number of framework items", () => {
    render(<FlippableStatCard {...defaultProps} />);

    const flipButton = screen.getByRole("button");
    fireEvent.click(flipButton);

    const frameworkItems = screen.getAllByText(
      /React|Angular|Vue|Next\.js|Express/
    );
    expect(frameworkItems).toHaveLength(5);
  });

  it("should handle long framework names without wrapping", () => {
    const propsWithLongNames = {
      ...defaultProps,
      backContent: {
        title: "Used Frameworks",
        items: ["Very Long Framework Name That Should Not Wrap"],
      },
    };

    render(<FlippableStatCard {...propsWithLongNames} />);

    const flipButton = screen.getByRole("button");
    fireEvent.click(flipButton);

    expect(
      screen.getByText("Very Long Framework Name That Should Not Wrap")
    ).toBeInTheDocument();
  });
});
