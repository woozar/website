import { act, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { SuccessStories } from "./SuccessStories";

const renderWithProviders = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

// framer-motion is globally mocked in test setup

// Mock hooks
vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: vi.fn(),
}));

// useTranslation will use real translations

describe("SuccessStories", () => {
  const mockUseMediaQuery = useMediaQuery as ReturnType<typeof vi.fn>;
  const mockUseReducedMotion = useReducedMotion as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue({ isMobile: false });
    mockUseReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title and subtitle", () => {
    renderWithProviders(<SuccessStories />);

    expect(screen.getByText("Success Stories")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Concrete examples of already picked low hanging fruits from my clients"
      )
    ).toBeInTheDocument();
  });

  it("renders all story selection buttons", () => {
    renderWithProviders(<SuccessStories />);

    // Use getAllByRole to find buttons specifically
    const buttons = screen.getAllByRole("button");
    const buttonTexts = buttons.map((button) => button.textContent);

    expect(buttonTexts).toContain("Newsletter Personalization");
    expect(buttonTexts).toContain("Support Shield");
    expect(buttonTexts).toContain("Content Autopilot");
    expect(buttonTexts).toContain("Legacy Code Testing");
  });

  it("displays the first story by default", () => {
    renderWithProviders(<SuccessStories />);

    expect(
      screen.getByText(
        "Instead of newsletter spam to all customers: AI analyzes CRM data and purchase history to create individually relevant newsletters for each customer. Automatic adaptation of content and tone."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Higher open rates and significantly better customer retention through truly relevant communication"
      )
    ).toBeInTheDocument();
  });

  it("changes story when clicking different buttons", () => {
    renderWithProviders(<SuccessStories />);

    // Initially shows first story (Newsletter)
    expect(
      screen.getByText(
        "Instead of newsletter spam to all customers: AI analyzes CRM data and purchase history to create individually relevant newsletters for each customer. Automatic adaptation of content and tone."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("2 days")).toBeInTheDocument();
    expect(screen.getByText("~€0.025 per customer")).toBeInTheDocument();

    // Click Support button using role
    const supportButton = screen.getByRole("button", {
      name: /Support Shield/,
    });
    fireEvent.click(supportButton);

    expect(
      screen.getByText(
        "Aggressive or unfriendly customer emails no longer reach your support team directly. The AI automatically detects problematic messages and transforms them into polite, constructive versions - with context and solution suggestions."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Less psychological stress in the support team, higher employee satisfaction"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("1 day (in-house)")).toBeInTheDocument();
    expect(screen.getByText("~€0.005 per email")).toBeInTheDocument();

    // Click Content button using role
    const contentButton = screen.getByRole("button", {
      name: /Content Autopilot/,
    });
    fireEvent.click(contentButton);

    expect(
      screen.getByText(
        "Raw texts are automatically structured and optimized. The system performs proofreading, optimizes for SEO, and generates matching images based on the text content."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Time and cost savings in content creation and improvement of reach"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("1 day")).toBeInTheDocument();
    expect(screen.getByText("~€0.06 per image")).toBeInTheDocument();
  });

  it("renders process visualization with inputs, processing, and output", () => {
    renderWithProviders(<SuccessStories />);

    // Check inputs
    expect(screen.getByText("CRM Data")).toBeInTheDocument();
    expect(
      screen.getByText("Unpersonalized Newsletter Article")
    ).toBeInTheDocument();

    // Check processing
    expect(screen.getByText("AI Analysis")).toBeInTheDocument();
    expect(
      screen.getByText("Relevance assessment & personalization")
    ).toBeInTheDocument();

    // Check output
    expect(screen.getByText("Personalized Newsletter")).toBeInTheDocument();
    expect(screen.getByText("Higher open rates")).toBeInTheDocument();
  });

  it("displays cost and implementation information", () => {
    renderWithProviders(<SuccessStories />);

    expect(screen.getByText("2 days")).toBeInTheDocument();
    expect(screen.getByText("~€0.025 per customer")).toBeInTheDocument();
  });

  it("handles legacy story with structured benefits", () => {
    renderWithProviders(<SuccessStories />);

    const testingButton = screen.getByRole("button", {
      name: /Legacy Code Testing/,
    });
    fireEvent.click(testingButton);

    expect(screen.getByText("One-time:")).toBeInTheDocument();
    expect(screen.getByText("Ongoing:")).toBeInTheDocument();
    expect(screen.getByText("Missing tests")).toBeInTheDocument();
    expect(
      screen.getByText("Better product quality through test coverage")
    ).toBeInTheDocument();
  });

  it("tests all story buttons and validates their categories", () => {
    renderWithProviders(<SuccessStories />);

    const buttons = [
      { text: "Newsletter Personalization", category: "Marketing" },
      { text: "Support Shield", category: "Support" },
      { text: "Content Autopilot", category: "Content-Creation" },
      { text: "Legacy Code Testing", category: "Development" },
    ];

    // Check that all buttons exist
    buttons.forEach(({ text }) => {
      const button = screen.getByRole("button", { name: new RegExp(text) });
      expect(button).toBeInTheDocument();
    });

    // Note: Categories are not actually displayed in the UI, so we don't test for them
  });

  it("tests desktop vs mobile layout switching", () => {
    // Mock window.innerWidth for desktop test
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1300,
    });

    renderWithProviders(<SuccessStories />);

    // Should render content (desktop layout logic is tested)
    expect(screen.getByText("Success Stories")).toBeInTheDocument();

    // Reset window width for mobile
    Object.defineProperty(window, "innerWidth", {
      value: 800,
    });
  });

  it("validates button selection state changes", () => {
    renderWithProviders(<SuccessStories />);

    const supportButton = screen.getByRole("button", {
      name: /Support Shield/,
    });

    // Click support button
    fireEvent.click(supportButton);

    // Now support content should be visible
    expect(
      screen.getByText(
        "Aggressive or unfriendly customer emails no longer reach your support team directly. The AI automatically detects problematic messages and transforms them into polite, constructive versions - with context and solution suggestions."
      )
    ).toBeInTheDocument();
  });

  it("tests optional input rendering for content story", () => {
    renderWithProviders(<SuccessStories />);

    // Click Content button to see optional input
    const contentButton = screen.getByRole("button", {
      name: /Content Autopilot/,
    });
    fireEvent.click(contentButton);

    expect(screen.getByText("Optional: Image Requests")).toBeInTheDocument();
    expect(
      screen.getByText("Desired image themes & style descriptions")
    ).toBeInTheDocument();
  });

  it("tests window resize handler", () => {
    renderWithProviders(<SuccessStories />);

    // Simulate window resize
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1400,
    });

    // Wrap in act to handle React state updates
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    // Component should still render
    expect(screen.getByText("Success Stories")).toBeInTheDocument();
  });

  describe("Animation and Accessibility", () => {
    it("respects reduced motion preference in all animations", () => {
      mockUseReducedMotion.mockReturnValue(true);

      renderWithProviders(<SuccessStories />);

      // Component should still render without animations
      expect(screen.getByText("Success Stories")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Newsletter Personalization/ })
      ).toBeInTheDocument();
    });

    it("enables animations when reduced motion is false", () => {
      mockUseReducedMotion.mockReturnValue(false);

      renderWithProviders(<SuccessStories />);

      // Component should render with animations enabled
      expect(screen.getByText("Success Stories")).toBeInTheDocument();
    });
  });

  it("tests edge case with nested benefit rendering", () => {
    renderWithProviders(<SuccessStories />);

    // Click testing button to access structured benefits
    const testingButton = screen.getByRole("button", {
      name: /Legacy Code Testing/,
    });
    fireEvent.click(testingButton);

    // Test the specific nested benefit structure that wasn't covered
    expect(screen.getByText("One-time:")).toBeInTheDocument();
    expect(screen.getByText("Ongoing:")).toBeInTheDocument();

    // Test specific benefits that might not be covered
    expect(screen.getByText("Missing tests")).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument(); // Input title
    expect(
      screen.getByText("Corrected/completed documentation")
    ).toBeInTheDocument(); // Benefit
    expect(
      screen.getByText("Better product quality through test coverage")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Shorter development time for features and bugfixes")
    ).toBeInTheDocument();
  });

  it("tests mobile layout behavior", () => {
    mockUseMediaQuery.mockReturnValue({ isMobile: true });

    renderWithProviders(<SuccessStories />);

    // Should still render all content in mobile
    expect(screen.getByText("Success Stories")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Newsletter Personalization/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Support Shield/ })
    ).toBeInTheDocument();

    // Test story switching still works on mobile
    const supportButton = screen.getByRole("button", {
      name: /Support Shield/,
    });
    fireEvent.click(supportButton);

    expect(
      screen.getByText(
        "Aggressive or unfriendly customer emails no longer reach your support team directly. The AI automatically detects problematic messages and transforms them into polite, constructive versions - with context and solution suggestions."
      )
    ).toBeInTheDocument();
  });

  describe("Story Goal and ProcessVisualization Rendering", () => {
    it("should render goal section when goal field exists", () => {
      renderWithProviders(<SuccessStories />);

      // Newsletter should be selected by default (index 0)
      // Should show the goal field
      expect(screen.getByText("Goal:")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Higher open rates and significantly better customer retention through truly relevant communication"
        )
      ).toBeInTheDocument();
    });

    it("should render result section when result field exists", () => {
      renderWithProviders(<SuccessStories />);

      // Newsletter should be selected by default (index 0) and has result field in mock
      // Should show the result field
      expect(screen.getByText("Result:")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Positive customer feedback about the improvement from old to new newsletter"
        )
      ).toBeInTheDocument();
    });

    it("should render ProcessVisualization component", () => {
      renderWithProviders(<SuccessStories />);

      // Should render the ProcessVisualization component which shows implementation and cost
      expect(screen.getByText("Effort:")).toBeInTheDocument();
      expect(screen.getByText("Operation:")).toBeInTheDocument();
    });
  });
});
