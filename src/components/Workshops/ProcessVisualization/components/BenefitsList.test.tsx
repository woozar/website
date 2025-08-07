import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { useTranslation } from "@/hooks/useTranslation";

import { BenefitsList } from "./BenefitsList";

const renderWithProviders = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

// Mock useTranslation
vi.mock("@/hooks/useTranslation", () => ({
  useTranslation: vi.fn(),
}));

const mockUseTranslation = useTranslation as ReturnType<typeof vi.fn>;

describe("BenefitsList", () => {
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
    mockUseTranslation.mockReturnValue({
      t: mockTranslations,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders simple benefits array", () => {
    const benefits = [
      "Improved efficiency",
      "Cost reduction",
      "Better user experience",
    ];

    renderWithProviders(<BenefitsList benefits={benefits} />);

    expect(screen.getByText("Improved efficiency")).toBeInTheDocument();
    expect(screen.getByText("Cost reduction")).toBeInTheDocument();
    expect(screen.getByText("Better user experience")).toBeInTheDocument();

    // Should have 3 checkmarks
    const checkmarks = screen.getAllByText("✓");
    expect(checkmarks).toHaveLength(3);
  });

  it("renders structured benefits with oneTime and ongoing", () => {
    const benefits = {
      oneTime: ["Initial setup", "Training sessions"],
      ongoing: ["Monthly maintenance", "Continuous support"],
    };

    renderWithProviders(<BenefitsList benefits={benefits} />);

    // Check section labels
    expect(screen.getByText("One-time:")).toBeInTheDocument();
    expect(screen.getByText("Ongoing:")).toBeInTheDocument();

    // Check one-time benefits
    expect(screen.getByText("Initial setup")).toBeInTheDocument();
    expect(screen.getByText("Training sessions")).toBeInTheDocument();

    // Check ongoing benefits
    expect(screen.getByText("Monthly maintenance")).toBeInTheDocument();
    expect(screen.getByText("Continuous support")).toBeInTheDocument();

    // Should have 4 checkmarks total
    const checkmarks = screen.getAllByText("✓");
    expect(checkmarks).toHaveLength(4);
  });

  it("handles empty benefits arrays", () => {
    const benefits: string[] = [];

    renderWithProviders(<BenefitsList benefits={benefits} />);

    // Should not have any checkmarks
    expect(screen.queryByText("✓")).not.toBeInTheDocument();
  });

  it("handles structured benefits with empty arrays", () => {
    const benefits = {
      oneTime: [],
      ongoing: ["Continuous support"],
    };

    renderWithProviders(<BenefitsList benefits={benefits} />);

    expect(screen.getByText("One-time:")).toBeInTheDocument();
    expect(screen.getByText("Ongoing:")).toBeInTheDocument();
    expect(screen.getByText("Continuous support")).toBeInTheDocument();

    // Should have 1 checkmark
    const checkmarks = screen.getAllByText("✓");
    expect(checkmarks).toHaveLength(1);
  });

  it("applies correct styling to benefit items", () => {
    const benefits = ["Test benefit"];

    renderWithProviders(<BenefitsList benefits={benefits} />);

    const checkmark = screen.getByText("✓");
    // Mantine transforms "green" to CSS variable, so we check for the presence of green in the color
    const computedStyle = window.getComputedStyle(checkmark);
    expect(computedStyle.color).toMatch(/green|var\(--mantine-color-green/);
  });

  it("handles long benefit text", () => {
    const benefits = [
      "This is a very long benefit description that should wrap properly and be displayed correctly without breaking the layout or causing overflow issues",
    ];

    renderWithProviders(<BenefitsList benefits={benefits} />);

    expect(
      screen.getByText(/This is a very long benefit description/)
    ).toBeInTheDocument();
  });
});
