import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { IconCode } from "@tabler/icons-react";

import { useReducedMotion } from "framer-motion";

import { StatCard } from "./StatCard";

// framer-motion is globally mocked in test setup

const renderComponent = (props = {}) => {
  const defaultProps = {
    icon: IconCode,
    title: "Test Title",
    value: "42",
    description: "Test description",
    ...props,
  };

  return render(
    <MantineProvider>
      <StatCard {...defaultProps} />
    </MantineProvider>
  );
};

describe("StatCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });
  it("should render card with all basic elements", () => {
    renderComponent();

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should render with icon", () => {
    renderComponent({ icon: IconCode });

    // The icon should be rendered within the card
    // We can check for the svg element that TablerIcons render
    const iconContainer = screen
      .getByText("42")
      .parentElement?.querySelector("div");
    expect(iconContainer).toBeInTheDocument();
  });

  it("should render tooltip when provided", () => {
    const tooltipContent = <div>Tooltip content</div>;
    renderComponent({ tooltip: tooltipContent });

    // The card should still be rendered
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("should render without tooltip when not provided", () => {
    renderComponent();

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should apply correct styling to card elements", () => {
    renderComponent();

    const card = screen
      .getByText("Test Title")
      .closest('[class*="mantine-Card"]');
    expect(card).toBeInTheDocument();
  });

  it("should render with different props", () => {
    renderComponent({
      title: "Custom Title",
      value: "100",
      description: "Custom description",
    });

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("should handle long text content", () => {
    renderComponent({
      title: "Very Long Title That Should Still Display Correctly",
      value: "999999",
      description:
        "This is a very long description that should wrap correctly and display all the content properly",
    });

    expect(
      screen.getByText("Very Long Title That Should Still Display Correctly")
    ).toBeInTheDocument();
    expect(screen.getByText("999999")).toBeInTheDocument();
    expect(
      screen.getByText(/This is a very long description/)
    ).toBeInTheDocument();
  });

  it("should render with different icon types", () => {
    const CustomIcon = (props: any) => (
      <div data-testid="custom-icon" {...props}>
        Custom
      </div>
    );

    renderComponent({ icon: CustomIcon });

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      renderComponent();

      // Component should render successfully with animations enabled
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      renderComponent();

      // Component should render successfully with reduced animations
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    it("should handle functionality with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      renderComponent();

      // Component functionality should still work with reduced motion
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });
});
