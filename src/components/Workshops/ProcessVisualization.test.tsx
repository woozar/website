import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { useReducedMotion } from "framer-motion";

import type { StoryData } from "@/types";

import { ProcessVisualization } from "./ProcessVisualization";

// framer-motion is globally mocked in test setup

const mockUseReducedMotion = vi.mocked(useReducedMotion);

const renderProcessVisualization = (story: StoryData) => {
  return render(
    <MantineProvider>
      <ProcessVisualization story={story} />
    </MantineProvider>
  );
};

const mockStoryData: StoryData = {
  inputs: [
    {
      title: "Test Input 1",
      description: "Test input description 1",
    },
    {
      title: "Test Input 2",
      description: "Test input description 2",
    },
  ],
  processing: {
    title: "Test Processing",
    description: "Test processing description",
  },
  output: {
    title: "Test Output",
    description: "Test output description",
    benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
  },
  implementation: "2 days",
  cost: "€100",
};

const mockStoryDataWithComplexBenefits: StoryData = {
  inputs: [
    {
      title: "Complex Input",
      description: "Complex input description",
    },
  ],
  processing: {
    title: "Complex Processing",
    description: "Complex processing description",
  },
  output: {
    title: "Complex Output",
    description: "Complex output description",
    benefits: {
      oneTime: ["One-time benefit 1", "One-time benefit 2"],
      ongoing: ["Ongoing benefit 1", "Ongoing benefit 2"],
    },
  },
  implementation: "1 week",
  cost: "€500",
};

describe("ProcessVisualization", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);

    // Mock window.innerWidth for desktop layout
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1280,
    });

    // Mock addEventListener and removeEventListener
    vi.spyOn(window, "addEventListener");
    vi.spyOn(window, "removeEventListener");
  });

  it("should render input cards correctly", () => {
    renderProcessVisualization(mockStoryData);

    expect(screen.getByText("Test Input 1")).toBeInTheDocument();
    expect(screen.getByText("Test input description 1")).toBeInTheDocument();
    expect(screen.getByText("Test Input 2")).toBeInTheDocument();
    expect(screen.getByText("Test input description 2")).toBeInTheDocument();
  });

  it("should render processing section correctly", () => {
    renderProcessVisualization(mockStoryData);

    expect(screen.getByText("Test Processing")).toBeInTheDocument();
    expect(screen.getByText("Test processing description")).toBeInTheDocument();
  });

  it("should render output section correctly", () => {
    renderProcessVisualization(mockStoryData);

    expect(screen.getByText("Test Output")).toBeInTheDocument();
    expect(screen.getByText("Test output description")).toBeInTheDocument();
  });

  it("should render simple benefits array", () => {
    renderProcessVisualization(mockStoryData);

    expect(screen.getByText("Benefit 1")).toBeInTheDocument();
    expect(screen.getByText("Benefit 2")).toBeInTheDocument();
    expect(screen.getByText("Benefit 3")).toBeInTheDocument();
  });

  it("should render complex benefits object", () => {
    renderProcessVisualization(mockStoryDataWithComplexBenefits);

    // Check for category labels (from real translations - English by default)
    expect(screen.getByText("One-time:")).toBeInTheDocument();
    expect(screen.getByText("Ongoing:")).toBeInTheDocument();

    // Check for benefits
    expect(screen.getByText("One-time benefit 1")).toBeInTheDocument();
    expect(screen.getByText("One-time benefit 2")).toBeInTheDocument();
    expect(screen.getByText("Ongoing benefit 1")).toBeInTheDocument();
    expect(screen.getByText("Ongoing benefit 2")).toBeInTheDocument();
  });

  it("should render implementation and cost info", () => {
    renderProcessVisualization(mockStoryData);

    expect(screen.getByText("Effort:")).toBeInTheDocument();
    expect(screen.getByText("2 days")).toBeInTheDocument();
    expect(screen.getByText("Operation:")).toBeInTheDocument();
    expect(screen.getByText("€100")).toBeInTheDocument();
  });

  it("should handle window resize events", () => {
    const { unmount } = renderProcessVisualization(mockStoryData);

    expect(window.addEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });

  it("should adapt to mobile layout", () => {
    // Mock mobile width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800,
    });

    renderProcessVisualization(mockStoryData);

    // Should still render all content
    expect(screen.getByText("Test Input 1")).toBeInTheDocument();
    expect(screen.getByText("Test Processing")).toBeInTheDocument();
    expect(screen.getByText("Test Output")).toBeInTheDocument();
  });

  it("should handle resize function correctly", () => {
    renderProcessVisualization(mockStoryData);

    // Get the resize handler that was added
    const addEventListenerCalls = vi.mocked(window.addEventListener).mock.calls;
    const resizeHandler = addEventListenerCalls.find(
      (call) => call[0] === "resize"
    )?.[1];

    expect(resizeHandler).toBeDefined();

    // Simulate window resize
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 600,
    });

    // Call the resize handler
    if (typeof resizeHandler === "function") {
      fireEvent(window, new Event("resize"));
    }

    // Component should still render correctly
    expect(screen.getByText("Test Input 1")).toBeInTheDocument();
  });

  it("should work with reduced motion preference", () => {
    mockUseReducedMotion.mockReturnValue(true);

    renderProcessVisualization(mockStoryData);

    // Should still render all content with reduced motion
    expect(screen.getByText("Test Input 1")).toBeInTheDocument();
    expect(screen.getByText("Test Processing")).toBeInTheDocument();
    expect(screen.getByText("Test Output")).toBeInTheDocument();
  });

  it("should handle null reduced motion preference", () => {
    mockUseReducedMotion.mockReturnValue(null);

    renderProcessVisualization(mockStoryData);

    // Should still render all content when reduced motion is null
    expect(screen.getByText("Test Input 1")).toBeInTheDocument();
    expect(screen.getByText("Test Processing")).toBeInTheDocument();
    expect(screen.getByText("Test Output")).toBeInTheDocument();
  });

  it("should handle story without benefits", () => {
    const storyWithoutBenefits: StoryData = {
      ...mockStoryData,
      output: {
        title: "Output without benefits",
        description: "Description without benefits",
      },
    };

    renderProcessVisualization(storyWithoutBenefits);

    expect(screen.getByText("Output without benefits")).toBeInTheDocument();
    expect(
      screen.getByText("Description without benefits")
    ).toBeInTheDocument();
  });

  it("should initialize with correct desktop layout state", () => {
    // Mock desktop width
    Object.defineProperty(window, "innerWidth", {
      value: 1300,
      writable: true,
    });

    renderProcessVisualization(mockStoryData);

    // Should render for desktop layout
    expect(screen.getByText("Test Input 1")).toBeInTheDocument();
  });

  it("should initialize with correct mobile layout state", () => {
    // Mock mobile width
    Object.defineProperty(window, "innerWidth", {
      value: 1000,
      writable: true,
    });

    renderProcessVisualization(mockStoryData);

    // Should render for mobile layout
    expect(screen.getByText("Test Input 1")).toBeInTheDocument();
  });
});
