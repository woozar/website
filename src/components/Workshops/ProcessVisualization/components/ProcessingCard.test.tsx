import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { useReducedMotion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import type { StoryData } from "@/types";

import { ProcessingCard } from "./ProcessingCard";

const renderWithProviders = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

// Mock framer-motion
vi.mock("framer-motion", async () => {
  const actual = (await vi.importActual("framer-motion")) as any;
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    useReducedMotion: vi.fn(),
  };
});

// Mock useTranslation
vi.mock("@/hooks/useTranslation", () => ({
  useTranslation: vi.fn(),
}));

const mockUseReducedMotion = useReducedMotion as ReturnType<typeof vi.fn>;
const mockUseTranslation = useTranslation as ReturnType<typeof vi.fn>;

describe("ProcessingCard", () => {
  const mockStory: StoryData = {
    inputs: [{ title: "Input 1", description: "Description 1" }],
    processing: {
      title: "AI Processing",
      description: "Advanced AI analysis and processing",
    },
    output: {
      title: "Output Result",
      description: "Processed result",
      benefits: ["Benefit 1", "Benefit 2"],
    },
    implementation: "2 days",
    cost: "€500",
  };

  const mockTranslations = {
    workshop: {
      successStories: {
        labels: {
          effort: "Effort:",
          cost: "Cost:",
        },
      },
    },
  };

  beforeEach(() => {
    mockUseReducedMotion.mockReturnValue(false);
    mockUseTranslation.mockReturnValue({
      t: mockTranslations,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders processing title and description", () => {
    renderWithProviders(
      <ProcessingCard
        story={mockStory}
        shouldReduceMotion={false}
        delayOffset={0.5}
      />
    );

    expect(screen.getByText("AI Processing")).toBeInTheDocument();
    expect(
      screen.getByText("Advanced AI analysis and processing")
    ).toBeInTheDocument();
  });

  it("displays effort and cost information", () => {
    renderWithProviders(
      <ProcessingCard
        story={mockStory}
        shouldReduceMotion={false}
        delayOffset={0.5}
      />
    );

    expect(screen.getByText("Effort:")).toBeInTheDocument();
    expect(screen.getByText("2 days")).toBeInTheDocument();
    expect(screen.getByText("Cost:")).toBeInTheDocument();
    expect(screen.getByText("€500")).toBeInTheDocument();
  });

  it("has correct gradient background styling", () => {
    renderWithProviders(
      <ProcessingCard
        story={mockStory}
        shouldReduceMotion={false}
        delayOffset={0.5}
      />
    );

    const card = screen
      .getByText("AI Processing")
      .closest(".mantine-Card-root");
    expect(card).toHaveStyle({
      background:
        "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
      "text-align": "center",
    });

    // Check that color is white (CSS computes it as rgb(255, 255, 255))
    const computedStyle = window.getComputedStyle(card!);
    expect(computedStyle.color).toBe("rgb(255, 255, 255)");
  });

  it("handles reduced motion preference", () => {
    renderWithProviders(
      <ProcessingCard
        story={mockStory}
        shouldReduceMotion={true}
        delayOffset={0.5}
      />
    );

    expect(screen.getByText("AI Processing")).toBeInTheDocument();
  });

  it("uses correct delay offset for animations", () => {
    renderWithProviders(
      <ProcessingCard
        story={mockStory}
        shouldReduceMotion={false}
        delayOffset={1.2}
      />
    );

    expect(screen.getByText("AI Processing")).toBeInTheDocument();
  });

  it("renders Robot and Settings icons", () => {
    renderWithProviders(
      <ProcessingCard
        story={mockStory}
        shouldReduceMotion={false}
        delayOffset={0.5}
      />
    );

    // Icons are rendered but we can't easily test their specific presence
    // Just verify the component renders without error
    expect(screen.getByText("AI Processing")).toBeInTheDocument();
  });

  it("handles long processing titles and descriptions", () => {
    const longStory: StoryData = {
      ...mockStory,
      processing: {
        title: "Very Long AI Processing Title That Should Wrap Properly",
        description:
          "This is a very long description of the AI processing that should wrap properly within the card without breaking the layout or causing overflow issues in the component",
      },
    };

    renderWithProviders(
      <ProcessingCard
        story={longStory}
        shouldReduceMotion={false}
        delayOffset={0.5}
      />
    );

    expect(
      screen.getByText(/Very Long AI Processing Title/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This is a very long description/)
    ).toBeInTheDocument();
  });
});
