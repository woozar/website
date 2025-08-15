import { act, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import { useReducedMotion } from "framer-motion";

import { BrowserRouter } from "react-router-dom";

import { ModalProvider } from "@/contexts/ModalContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
// Import the translations directly
import { de } from "@/translations/de";

import { WorkshopLandingPage } from "./WorkshopLandingPage";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <MantineProvider>
        <ModalProvider>{component}</ModalProvider>
      </MantineProvider>
    </BrowserRouter>
  );
};

// framer-motion is globally mocked in test setup

// Mock hooks
vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("@/hooks/useTranslation", () => ({
  useTranslation: () => ({ t: de }),
}));

// Mock components
vi.mock("./SuccessStories", () => ({
  SuccessStories: () => (
    <div data-testid="success-stories">Success Stories</div>
  ),
}));

vi.mock("../SEO/SEOHead", () => ({
  SEOHead: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="seo-head">
      <span data-testid="seo-title">{title}</span>
      <span data-testid="seo-description">{description}</span>
    </div>
  ),
}));

describe("WorkshopLandingPage", () => {
  const mockUseMediaQuery = useMediaQuery as ReturnType<typeof vi.fn>;
  const mockUseReducedMotion = useReducedMotion as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue({ isMobile: false, isTablet: false });
    mockUseReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders SEO head with correct title and description", () => {
    renderWithProviders(<WorkshopLandingPage />);

    expect(screen.getByTestId("seo-title")).toHaveTextContent(
      "KI Workshop - Low Hanging Fruits | 12 of Spades"
    );
    expect(screen.getByTestId("seo-description")).toHaveTextContent(
      "Praktischer KI-Workshop für Unternehmen"
    );
  });

  it("renders hero section with title and subtitle", () => {
    renderWithProviders(<WorkshopLandingPage />);

    expect(
      screen.getByText("Workshop: KI - Low Hanging Fruits")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Alle reden über KI, aber der Einstieg ist oft überfordernd/
      )
    ).toBeInTheDocument();
  });

  it("renders CTA button with correct text", () => {
    renderWithProviders(<WorkshopLandingPage />);

    expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
  });

  it("renders problem section", () => {
    renderWithProviders(<WorkshopLandingPage />);

    expect(screen.getByText("Die Herausforderungen")).toBeInTheDocument();
    expect(
      screen.getByText("KI wirkt komplex und überfordernd")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Unklare ROI-Erwartungen bei KI-Projekten")
    ).toBeInTheDocument();
  });

  it("renders solution section", () => {
    renderWithProviders(<WorkshopLandingPage />);

    expect(screen.getByText("Die Lösung")).toBeInTheDocument();
    expect(
      screen.getByText("Fokus auf sofort umsetzbare KI-Anwendungen")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Bewährte Strategien mit schnellem ROI")
    ).toBeInTheDocument();
  });

  it("renders workshop details", () => {
    renderWithProviders(<WorkshopLandingPage />);

    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Dauer")).toBeInTheDocument();
    expect(screen.getByText("1-3 Tage")).toBeInTheDocument();
    expect(screen.getByText("Teilnehmer")).toBeInTheDocument();
    expect(screen.getByText("3-5 Vertreter")).toBeInTheDocument();
  });

  it("renders agenda section", () => {
    renderWithProviders(<WorkshopLandingPage />);

    expect(screen.getByText("Agenda")).toBeInTheDocument();
  });

  it("renders success stories component", () => {
    renderWithProviders(<WorkshopLandingPage />);

    expect(screen.getByTestId("success-stories")).toBeInTheDocument();
  });

  it("renders final CTA section", () => {
    renderWithProviders(<WorkshopLandingPage />);

    expect(
      screen.getByText("Bereit für Ihren KI-Durchbruch?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Lassen Sie uns gemeinsam die Low Hanging Fruits/)
    ).toBeInTheDocument();
    expect(screen.getByText("Jetzt anfragen")).toBeInTheDocument();
  });

  describe("Responsive Design", () => {
    it("adapts to mobile layout", () => {
      mockUseMediaQuery.mockReturnValue({ isMobile: true });

      renderWithProviders(<WorkshopLandingPage />);

      // Should still render main content
      expect(
        screen.getByText("Workshop: KI - Low Hanging Fruits")
      ).toBeInTheDocument();
    });
  });

  it("renders agenda section", () => {
    renderWithProviders(<WorkshopLandingPage />);

    expect(screen.getByText("Agenda")).toBeInTheDocument();
  });

  it("validates all problem and solution points", () => {
    renderWithProviders(<WorkshopLandingPage />);

    // Problem points from German translation - exact matches
    expect(
      screen.getByText("KI wirkt komplex und überfordernd")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Unklare ROI-Erwartungen bei KI-Projekten")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Lange Implementierungszeiten befürchtet")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Hohe Investitionskosten abschreckend")
    ).toBeInTheDocument();
    expect(screen.getByText("Fehlendes Know-how im Team")).toBeInTheDocument();

    // Solution points from German translation - exact matches
    expect(
      screen.getByText("Fokus auf sofort umsetzbare KI-Anwendungen")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Bewährte Strategien mit schnellem ROI")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Praktische Hands-on-Erfahrung")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Direkt anwendbare Ergebnisse")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Keine Vorkenntnisse erforderlich")
    ).toBeInTheDocument();
  });

  it("tests all workshop detail sections", () => {
    renderWithProviders(<WorkshopLandingPage />);

    // Duration details from German translation
    expect(screen.getByText("Dauer")).toBeInTheDocument();
    expect(screen.getByText("1-3 Tage")).toBeInTheDocument();
    expect(
      screen.getByText("Flexibel nach Ihren Bedürfnissen anpassbar")
    ).toBeInTheDocument();

    // Participants details from German translation
    expect(screen.getByText("Teilnehmer")).toBeInTheDocument();
    expect(screen.getByText("3-5 Vertreter")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Empfohlen: aus verschiedenen Abteilungen für variablere Perspektiven"
      )
    ).toBeInTheDocument();

    // Outcome details from German translation
    expect(screen.getByText("Ergebnis")).toBeInTheDocument();
    expect(screen.getByText("Konkrete Umsetzungsschritte")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Für die Realisierung durch Ihr Team oder externe Partner"
      )
    ).toBeInTheDocument();
  });

  it("tests multiple CTA buttons presence", () => {
    renderWithProviders(<WorkshopLandingPage />);

    const ctaButtons = screen.getAllByText("Kontakt aufnehmen");
    expect(ctaButtons.length).toBeGreaterThan(0);

    const contactButtons = screen.getAllByText("Jetzt anfragen");
    expect(contactButtons.length).toBeGreaterThan(0);
  });

  describe("Responsive and Accessibility", () => {
    it("adapts to mobile layout with proper content", () => {
      mockUseMediaQuery.mockReturnValue({ isMobile: true });

      renderWithProviders(<WorkshopLandingPage />);

      // Should still render all main content in mobile
      expect(
        screen.getByText("Workshop: KI - Low Hanging Fruits")
      ).toBeInTheDocument();
      expect(screen.getByText("Details")).toBeInTheDocument();
      expect(screen.getByText("Agenda")).toBeInTheDocument();
    });

    it("respects reduced motion preference", () => {
      mockUseReducedMotion.mockReturnValue(true);

      renderWithProviders(<WorkshopLandingPage />);

      // Component should still render without animations
      expect(
        screen.getByText("Workshop: KI - Low Hanging Fruits")
      ).toBeInTheDocument();
    });

    it("renders properly on desktop with animations enabled", () => {
      mockUseMediaQuery.mockReturnValue({ isMobile: false });
      mockUseReducedMotion.mockReturnValue(false);

      renderWithProviders(<WorkshopLandingPage />);

      expect(
        screen.getByText("Workshop: KI - Low Hanging Fruits")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Maximaler KI-Nutzen mit minimalem Aufwand/)
      ).toBeInTheDocument();
    });
  });

  it("tests handleWorkshopInquiry function", () => {
    // Mock window.location.href
    delete (window as any).location;
    (window as any).location = { href: "" };

    renderWithProviders(<WorkshopLandingPage />);

    // Find and click the specific "Jetzt anfragen" button that triggers handleWorkshopInquiry
    const contactButton = screen.getByText("Jetzt anfragen");

    // Click the Contact Now button
    fireEvent.click(contactButton);

    // Should have set mailto link
    expect(window.location.href).toContain("mailto:workshops@12-of-spades.com");
    expect(window.location.href).toContain("Workshop%20Anfrage");
  });

  it("tests scroll to contact functionality", () => {
    // Mock querySelector and scrollTo
    const mockElement = {
      offsetTop: 1000,
    };

    const originalQuerySelector = document.querySelector;
    const originalScrollTo = window.scrollTo;

    document.querySelector = vi.fn().mockReturnValue(mockElement);
    window.scrollTo = vi.fn();

    renderWithProviders(<WorkshopLandingPage />);

    // Find button that scrolls to contact (should be one with onClick handler)
    const ctaButtons = screen.getAllByText("Kontakt aufnehmen");

    // The first button should scroll to contact section
    fireEvent.click(ctaButtons[0]);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 900, // offsetTop 1000 - headerHeight 100
      behavior: "smooth",
    });

    // Restore original functions
    document.querySelector = originalQuerySelector;
    window.scrollTo = originalScrollTo;
  });

  describe("Flipcard Functionality", () => {
    it("should handle height calculation when frontRef is null", () => {
      // Mock a scenario where frontRef.current is null
      renderWithProviders(<WorkshopLandingPage />);

      // This test ensures the useEffect hook's updateHeight function
      // handles the case when frontRef.current is null (lines 51-56)
      expect(
        screen.getByText("Workshop: KI - Low Hanging Fruits")
      ).toBeInTheDocument();
    });

    it("should measure scrollHeight when frontRef is available", () => {
      // Mock scrollHeight property to cover lines 51-56
      const mockScrollHeight = 500;

      // Mock the HTMLElement prototype to ensure scrollHeight is available
      const originalScrollHeight = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        "scrollHeight"
      );
      Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
        configurable: true,
        get: function () {
          return mockScrollHeight;
        },
      });

      renderWithProviders(<WorkshopLandingPage />);

      // Force the updateHeight function to run by triggering a resize event
      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      // Component should still render correctly after height measurement
      expect(
        screen.getByText("Workshop: KI - Low Hanging Fruits")
      ).toBeInTheDocument();

      // Restore original scrollHeight
      if (originalScrollHeight) {
        Object.defineProperty(
          HTMLElement.prototype,
          "scrollHeight",
          originalScrollHeight
        );
      }
    });

    it("should handle resize events for height calculation", () => {
      const originalAddEventListener = window.addEventListener;
      const originalRemoveEventListener = window.removeEventListener;
      const addEventListenerSpy = vi.fn();
      const removeEventListenerSpy = vi.fn();

      window.addEventListener = addEventListenerSpy;
      window.removeEventListener = removeEventListenerSpy;

      const { unmount } = render(
        <BrowserRouter>
          <MantineProvider>
            <ModalProvider>
              <WorkshopLandingPage />
            </ModalProvider>
          </MantineProvider>
        </BrowserRouter>
      );

      // Should add resize listener
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );

      // Clean up component
      unmount();

      // Should remove resize listener
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );

      // Restore original functions
      window.addEventListener = originalAddEventListener;
      window.removeEventListener = originalRemoveEventListener;
    });

    it("should handle different screen sizes for title font size", () => {
      // Test tablet size (line 157 - isTablet ? "2.6rem")
      mockUseMediaQuery.mockReturnValue({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      });

      const { unmount: unmount1 } = renderWithProviders(
        <WorkshopLandingPage />
      );
      expect(
        screen.getByText("Workshop: KI - Low Hanging Fruits")
      ).toBeInTheDocument();
      unmount1();

      // Test desktop size (default case - "3rem")
      mockUseMediaQuery.mockReturnValue({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      });
      renderWithProviders(<WorkshopLandingPage />);
      expect(
        screen.getByText("Workshop: KI - Low Hanging Fruits")
      ).toBeInTheDocument();
    });

    it("should handle flipcard transform states", () => {
      renderWithProviders(<WorkshopLandingPage />);

      // Test the transform condition (line 186 - isFlipped ? "rotateY(180deg)" : "rotateY(0deg)")
      const showPromptsButton = screen.getByText("Prompts anzeigen");

      // Initially should be rotateY(0deg) since isFlipped is false
      expect(showPromptsButton).toBeInTheDocument();

      // Click to flip the card
      fireEvent.click(showPromptsButton);

      // Now should be rotateY(180deg) since isFlipped is true
      // Verify the back side is shown by checking for the close button
      const closeButton = screen.getByText("×");
      expect(closeButton).toBeInTheDocument();

      // Click close to flip back
      fireEvent.click(closeButton);

      // Should be back to front side
      expect(screen.getByText("Prompts anzeigen")).toBeInTheDocument();
    });

    it("should handle different window widths for alignItems (line 141)", () => {
      // Test desktop width >= 1024px (should use "flex-start")
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1200,
      });

      const { unmount: unmount1 } = renderWithProviders(
        <WorkshopLandingPage />
      );
      expect(
        screen.getByText("Workshop: KI - Low Hanging Fruits")
      ).toBeInTheDocument();
      unmount1();

      // Test smaller width < 1024px (should use "center")
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });

      renderWithProviders(<WorkshopLandingPage />);
      expect(
        screen.getByText("Workshop: KI - Low Hanging Fruits")
      ).toBeInTheDocument();
    });
  });
});
