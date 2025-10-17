import { beforeEach, describe, expect, it, vi } from "vitest";

import { useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";
import { fireEvent, render, screen } from "@/test/test-utils";
import { de } from "@/translations/de";

import { WorkshopsOverview } from "./WorkshopsOverview";

// Mock dependencies
vi.mock("@/hooks/useMediaQuery");
vi.mock("@/hooks/useTranslation");

const mockUseMediaQuery = vi.mocked(useMediaQuery);
const mockUseTranslation = vi.mocked(useTranslation);

describe("WorkshopsOverview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
    mockUseTranslation.mockReturnValue({
      t: de,
      language: "de",
    });
    vi.mocked(useReducedMotion).mockReturnValue(false);

    // Mock scrollTo
    Object.defineProperty(window, "scrollTo", {
      value: vi.fn(),
      writable: true,
    });

    // Mock querySelector
    Object.defineProperty(document, "querySelector", {
      value: vi.fn().mockReturnValue({
        offsetTop: 500,
      } as HTMLElement),
      writable: true,
    });
  });

  it("should render workshops section with title and subtitle", () => {
    render(<WorkshopsOverview />);

    expect(screen.getByText("Workshops & Training")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Vom Quick Win zur Strategie – praktisches KI-Know-how für Ihr Team"
      )
    ).toBeInTheDocument();
  });

  it("should render both workshop cards", () => {
    render(<WorkshopsOverview />);

    expect(screen.getByText("AI Low Hanging Fruits")).toBeInTheDocument();
    expect(
      screen.getByText("KI als Werkzeug – Strategie-Training")
    ).toBeInTheDocument();
  });

  it("should render workshop types and durations", () => {
    render(<WorkshopsOverview />);

    expect(screen.getByText("Praktischer Workshop")).toBeInTheDocument();
    expect(screen.getByText("Strategie-Workshop")).toBeInTheDocument();
    expect(screen.getByText("1-3 Tage")).toBeInTheDocument();
    expect(screen.getByText("0,5-1 Tag")).toBeInTheDocument();
  });

  it("should render workshop descriptions", () => {
    render(<WorkshopsOverview />);

    expect(
      screen.getByText(
        (content) =>
          content.includes("sofort umsetzbare KI-Anwendungen") &&
          content.includes("Maximaler Nutzen")
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (content) =>
          content.includes("wann KI Sinn macht") &&
          content.includes("teure Fehlinvestitionen")
      )
    ).toBeInTheDocument();
  });

  it("should render workshop highlights", () => {
    render(<WorkshopsOverview />);

    expect(
      screen.getByText("Konkrete Use Cases aus Ihrem Alltag")
    ).toBeInTheDocument();
    expect(screen.getByText("Hands-on mit echten Tools")).toBeInTheDocument();
    expect(
      screen.getByText("Sofort umsetzbare Ergebnisse")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Entscheidungs-Framework für KI-Projekte")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Reale Fallbeispiele und Lessons Learned")
    ).toBeInTheDocument();
    expect(
      screen.getByText("ROI-Bewertung von KI-Vorhaben")
    ).toBeInTheDocument();
  });

  it("should render correct CTAs for available and coming soon workshops", () => {
    render(<WorkshopsOverview />);

    const workshopButtons = screen.getAllByRole("link");
    expect(workshopButtons[0]).toHaveTextContent("Zum Workshop");

    const contactButtons = screen.getAllByRole("button");
    const interestButton = contactButtons.find((btn) =>
      btn.textContent?.includes("Interesse? Kontakt")
    );
    expect(interestButton).toBeInTheDocument();
  });

  it("should render Coming Soon badge for strategy workshop", () => {
    render(<WorkshopsOverview />);

    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });

  it("should render with proper semantic structure", () => {
    render(<WorkshopsOverview />);

    const mainTitle = screen.getByRole("heading", { level: 2 });
    expect(mainTitle).toHaveTextContent("Workshops & Training");

    const workshopHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(workshopHeadings).toHaveLength(2);
    expect(workshopHeadings[0]).toHaveTextContent("AI Low Hanging Fruits");
    expect(workshopHeadings[1]).toHaveTextContent(
      "KI als Werkzeug – Strategie-Training"
    );
  });

  it("should adapt layout for mobile devices", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    render(<WorkshopsOverview />);

    expect(screen.getByText("Workshops & Training")).toBeInTheDocument();
    expect(screen.getByText("AI Low Hanging Fruits")).toBeInTheDocument();
  });

  it("should have proper link for available workshop", () => {
    render(<WorkshopsOverview />);

    const workshopLink = screen.getByRole("link", { name: /Zum Workshop/i });
    expect(workshopLink).toHaveAttribute(
      "href",
      "/workshops/ai-low-hanging-fruits"
    );
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      render(<WorkshopsOverview />);

      expect(screen.getByText("Workshops & Training")).toBeInTheDocument();
      expect(screen.getByText("AI Low Hanging Fruits")).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<WorkshopsOverview />);

      expect(screen.getByText("Workshops & Training")).toBeInTheDocument();
      expect(
        screen.getByText("KI als Werkzeug – Strategie-Training")
      ).toBeInTheDocument();
    });
  });

  it("should render workshops in correct order", () => {
    render(<WorkshopsOverview />);

    const workshopHeadings = screen.getAllByRole("heading", { level: 3 });

    expect(workshopHeadings[0]).toHaveTextContent("AI Low Hanging Fruits");
    expect(workshopHeadings[1]).toHaveTextContent(
      "KI als Werkzeug – Strategie-Training"
    );
  });

  it("should have proper section structure", () => {
    render(<WorkshopsOverview />);

    const workshopsSection = screen
      .getByText("Workshops & Training")
      .closest("section");
    expect(workshopsSection).toBeInTheDocument();
  });

  it("should handle contact button click for unavailable workshop", () => {
    render(<WorkshopsOverview />);

    const contactButtons = screen.getAllByRole("button");
    const interestButton = contactButtons.find((btn) =>
      btn.textContent?.includes("Interesse? Kontakt")
    );

    expect(interestButton).toBeInTheDocument();
    fireEvent.click(interestButton!);

    expect(document.querySelector).toHaveBeenCalledWith("#contact");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400, // 500 - 100 (header height)
      behavior: "smooth",
    });
  });

  it("should handle missing contact section gracefully", () => {
    document.querySelector = vi.fn().mockReturnValue(null);

    render(<WorkshopsOverview />);

    const contactButtons = screen.getAllByRole("button");
    const interestButton = contactButtons.find((btn) =>
      btn.textContent?.includes("Interesse? Kontakt")
    );

    expect(() => fireEvent.click(interestButton!)).not.toThrow();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
