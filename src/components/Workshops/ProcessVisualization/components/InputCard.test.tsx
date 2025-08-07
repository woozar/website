import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { useReducedMotion } from "framer-motion";

import { InputCard } from "./InputCard";

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

const mockUseReducedMotion = useReducedMotion as ReturnType<typeof vi.fn>;

describe("InputCard", () => {
  const mockInput = {
    title: "Test Input Title",
    description: "Test input description with details",
  };

  beforeEach(() => {
    mockUseReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders input title and description", () => {
    renderWithProviders(
      <InputCard
        input={mockInput}
        index={0}
        shouldReduceMotion={false}
        layoutType="mobile"
      />
    );

    expect(screen.getByText("Test Input Title")).toBeInTheDocument();
    expect(
      screen.getByText("Test input description with details")
    ).toBeInTheDocument();
  });

  it("applies correct styling for mobile layout", () => {
    renderWithProviders(
      <InputCard
        input={mockInput}
        index={0}
        shouldReduceMotion={false}
        layoutType="mobile"
      />
    );

    const card = screen
      .getByText("Test Input Title")
      .closest(".mantine-Card-root");
    expect(card).toHaveStyle({
      "border-color": "var(--primary-orange)",
      "background-color": "var(--background-primary)",
      "border-width": "2px",
    });
  });

  it("applies correct styling for desktop layout", () => {
    renderWithProviders(
      <InputCard
        input={mockInput}
        index={0}
        shouldReduceMotion={false}
        layoutType="desktop"
      />
    );

    const card = screen
      .getByText("Test Input Title")
      .closest(".mantine-Card-root");
    expect(card).toHaveStyle({
      "border-color": "var(--primary-orange)",
      "background-color": "var(--background-primary)",
      "border-width": "2px",
    });
  });

  it("handles reduced motion preference", () => {
    renderWithProviders(
      <InputCard
        input={mockInput}
        index={0}
        shouldReduceMotion={true}
        layoutType="mobile"
      />
    );

    expect(screen.getByText("Test Input Title")).toBeInTheDocument();
  });

  it("renders with different index values", () => {
    renderWithProviders(
      <InputCard
        input={mockInput}
        index={2}
        shouldReduceMotion={false}
        layoutType="mobile"
      />
    );

    expect(screen.getByText("Test Input Title")).toBeInTheDocument();
  });

  it("handles empty or long descriptions", () => {
    const inputWithLongDescription = {
      title: "Long Title",
      description:
        "This is a very long description that should wrap properly and be displayed in the card component without breaking the layout or causing overflow issues",
    };

    renderWithProviders(
      <InputCard
        input={inputWithLongDescription}
        index={0}
        shouldReduceMotion={false}
        layoutType="mobile"
      />
    );

    expect(screen.getByText("Long Title")).toBeInTheDocument();
    expect(
      screen.getByText(/This is a very long description/)
    ).toBeInTheDocument();
  });
});
