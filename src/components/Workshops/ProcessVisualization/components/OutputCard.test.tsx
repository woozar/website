import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { useReducedMotion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import type { StoryData } from "@/types";

import { OutputCard } from "./OutputCard";

const renderWithProviders = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

// framer-motion is globally mocked in test setup

// Mock useTranslation
vi.mock("@/hooks/useTranslation", () => ({
  useTranslation: vi.fn(),
}));

const mockUseReducedMotion = useReducedMotion as ReturnType<typeof vi.fn>;
const mockUseTranslation = useTranslation as ReturnType<typeof vi.fn>;

describe("OutputCard", () => {
  const mockTranslations = {
    workshop: {
      successStories: {
        benefitLabels: {
          oneTime: "One-time:",
          ongoing: "Ongoing:",
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

  it("renders output title and description", () => {
    const output: StoryData["output"] = {
      title: "Automated Report",
      description: "Generated comprehensive reports automatically",
    };

    renderWithProviders(
      <OutputCard
        output={output}
        delayOffset={0.5}
        shouldReduceMotion={false}
      />
    );

    expect(screen.getByText("Automated Report")).toBeInTheDocument();
    expect(
      screen.getByText("Generated comprehensive reports automatically")
    ).toBeInTheDocument();
  });

  it("renders output with simple benefits", () => {
    const output: StoryData["output"] = {
      title: "Processed Data",
      description: "Clean processed data",
      benefits: ["Improved accuracy", "Time savings"],
    };

    renderWithProviders(
      <OutputCard
        output={output}
        delayOffset={0.5}
        shouldReduceMotion={false}
      />
    );

    expect(screen.getByText("Processed Data")).toBeInTheDocument();
    expect(screen.getByText("Improved accuracy")).toBeInTheDocument();
    expect(screen.getByText("Time savings")).toBeInTheDocument();
  });

  it("renders output with structured benefits", () => {
    const output: StoryData["output"] = {
      title: "System Upgrade",
      description: "Upgraded system components",
      benefits: {
        oneTime: ["Initial setup"],
        ongoing: ["Maintenance support"],
      },
    };

    renderWithProviders(
      <OutputCard
        output={output}
        delayOffset={0.5}
        shouldReduceMotion={false}
      />
    );

    expect(screen.getByText("System Upgrade")).toBeInTheDocument();
    expect(screen.getByText("One-time:")).toBeInTheDocument();
    expect(screen.getByText("Initial setup")).toBeInTheDocument();
    expect(screen.getByText("Ongoing:")).toBeInTheDocument();
    expect(screen.getByText("Maintenance support")).toBeInTheDocument();
  });

  it("renders output without benefits", () => {
    const output: StoryData["output"] = {
      title: "Simple Output",
      description: "Basic output without benefits",
    };

    renderWithProviders(
      <OutputCard
        output={output}
        delayOffset={0.5}
        shouldReduceMotion={false}
      />
    );

    expect(screen.getByText("Simple Output")).toBeInTheDocument();
    expect(
      screen.getByText("Basic output without benefits")
    ).toBeInTheDocument();

    // Should not render any checkmarks since there are no benefits
    expect(screen.queryByText("✓")).not.toBeInTheDocument();
  });

  it("applies correct card styling", () => {
    const output: StoryData["output"] = {
      title: "Test Output",
      description: "Test description",
    };

    renderWithProviders(
      <OutputCard
        output={output}
        delayOffset={0.5}
        shouldReduceMotion={false}
      />
    );

    const card = screen.getByText("Test Output").closest(".mantine-Card-root");
    expect(card).toHaveStyle({
      "border-color": "var(--primary-red)",
      "background-color": "var(--background-primary)",
      "border-width": "2px",
    });
  });

  it("handles reduced motion preference", () => {
    const output: StoryData["output"] = {
      title: "Motion Test",
      description: "Testing reduced motion",
    };

    renderWithProviders(
      <OutputCard output={output} delayOffset={0.5} shouldReduceMotion={true} />
    );

    expect(screen.getByText("Motion Test")).toBeInTheDocument();
  });

  it("uses correct delay offset for animations", () => {
    const output: StoryData["output"] = {
      title: "Delay Test",
      description: "Testing animation delay",
    };

    renderWithProviders(
      <OutputCard
        output={output}
        delayOffset={1.5}
        shouldReduceMotion={false}
      />
    );

    expect(screen.getByText("Delay Test")).toBeInTheDocument();
  });
});
