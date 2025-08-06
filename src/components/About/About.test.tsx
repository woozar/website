import { beforeEach, describe, expect, it, vi } from "vitest";

// Import after mocking
import { useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";
import { render, screen } from "@/test/test-utils";
import { de } from "@/translations/de";

import { About } from "./About";

// Mock dependencies
vi.mock("@/hooks/useMediaQuery");
vi.mock("@/hooks/useTranslation");
// framer-motion is globally mocked in test setup

const mockUseMediaQuery = vi.mocked(useMediaQuery);
const mockUseTranslation = vi.mocked(useTranslation);

describe("About", () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });

    mockUseTranslation.mockReturnValue({
      t: de,
      language: "de",
    });
    // Set default reduced motion to false
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it("should render about section with title and subtitle", () => {
    render(<About />);

    expect(screen.getByText(de.about.title)).toBeInTheDocument();
    expect(screen.getByText(de.about.subtitle)).toBeInTheDocument();
  });

  it("should render all description paragraphs", () => {
    render(<About />);

    expect(screen.getByText(de.about.description1)).toBeInTheDocument();
    expect(screen.getByText(de.about.description2)).toBeInTheDocument();
    expect(screen.getByText(de.about.description3)).toBeInTheDocument();
  });

  it("should render highlights section", () => {
    render(<About />);

    expect(screen.getByText(de.about.highlights)).toBeInTheDocument();

    de.about.highlightsList.forEach((highlight) => {
      expect(screen.getByText(highlight)).toBeInTheDocument();
    });
  });

  it("should render technical expertise section", () => {
    render(<About />);

    expect(screen.getByText(de.about.expertise)).toBeInTheDocument();
  });

  it("should render all skill categories", () => {
    render(<About />);

    expect(
      screen.getByText(de.about.skills.aiLlm.category)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.about.skills.frontend.category)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.about.skills.backend.category)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.about.skills.cloud.category)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.about.skills.quality.category)
    ).toBeInTheDocument();
    expect(
      screen.getByText(de.about.skills.training.category)
    ).toBeInTheDocument();
  });

  it("should render skill items for each category", () => {
    render(<About />);

    // AI & LLM skills (with bullet point prefix)
    expect(
      screen.getByText("• LLMs (GPT, Claude, Gemini)")
    ).toBeInTheDocument();
    expect(screen.getByText("• LangChain")).toBeInTheDocument();
    expect(screen.getByText("• Audio Stream Processing")).toBeInTheDocument();
    expect(screen.getByText("• Prompt Engineering")).toBeInTheDocument();

    // Frontend skills
    expect(screen.getByText("• React")).toBeInTheDocument();
    expect(screen.getByText("• Angular")).toBeInTheDocument();
    expect(screen.getByText("• TypeScript")).toBeInTheDocument();
    expect(screen.getByText("• Next.js")).toBeInTheDocument();

    // Backend skills
    expect(screen.getByText("• Node.js")).toBeInTheDocument();
    expect(screen.getByText("• Python")).toBeInTheDocument();
    expect(screen.getByText("• FastAPI")).toBeInTheDocument();
    expect(screen.getByText("• REST APIs")).toBeInTheDocument();
  });

  it("should adapt layout for mobile devices", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    render(<About />);

    // Should still render all content on mobile
    expect(screen.getByText(de.about.title)).toBeInTheDocument();
    expect(screen.getByText(de.about.expertise)).toBeInTheDocument();
  });

  it("should handle German language translations", () => {
    render(<About />);

    expect(screen.getByText(de.about.title)).toBeInTheDocument();
    expect(
      screen.getByText(de.about.skills.aiLlm.category)
    ).toBeInTheDocument();
    expect(screen.getByText(de.about.highlightsList[0])).toBeInTheDocument();
  });

  it("should render with proper semantic structure", () => {
    render(<About />);

    // Should have proper heading hierarchy
    const mainTitle = screen.getByRole("heading", { level: 2 });
    expect(mainTitle).toHaveTextContent(de.about.title);
  });

  it("should handle empty skill items gracefully", () => {
    const emptySkillsTranslations = {
      ...de,
      about: {
        ...de.about,
        skills: {
          ...de.about.skills,
          aiLlm: {
            category: "AI Development",
            items: [],
          },
          frontend: {
            category: "Frontend Development",
            items: [],
          },
          backend: {
            category: "Backend Development",
            items: [],
          },
          cloud: {
            category: "Cloud & DevOps",
            items: [],
          },
          quality: {
            category: "Quality Assurance",
            items: [],
          },
          training: {
            category: "Training & Workshops",
            items: [],
          },
        },
      },
    };

    mockUseTranslation.mockReturnValue({
      t: emptySkillsTranslations,
      language: "en",
    });

    expect(() => render(<About />)).not.toThrow();
    expect(screen.getByText("AI Development")).toBeInTheDocument();
  });

  it("should handle empty highlights list", () => {
    const emptyHighlightsTranslations = {
      ...de,
      about: {
        ...de.about,
        highlightsList: [],
      },
    };

    mockUseTranslation.mockReturnValue({
      t: emptyHighlightsTranslations,
      language: "en",
    });

    expect(() => render(<About />)).not.toThrow();
    expect(screen.getByText("Highlights")).toBeInTheDocument();
  });

  it("should render proper list structure for highlights", () => {
    render(<About />);

    const highlightsList = screen.getByRole("list");
    expect(highlightsList).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(de.about.highlightsList.length);
  });

  it("should have consistent spacing and layout", () => {
    render(<About />);

    // Should render main container
    const aboutSection = screen.getByText(de.about.title).closest("section");
    expect(aboutSection).toBeInTheDocument();
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      render(<About />);

      // Component should render successfully with animations enabled
      expect(screen.getByText(de.about.title)).toBeInTheDocument();
      expect(screen.getByText(de.about.subtitle)).toBeInTheDocument();
      expect(screen.getByText(de.about.expertise)).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<About />);

      // Component should render successfully with reduced animations
      expect(screen.getByText(de.about.title)).toBeInTheDocument();
      expect(screen.getByText(de.about.subtitle)).toBeInTheDocument();
      expect(screen.getByText(de.about.expertise)).toBeInTheDocument();
    });

    it("should render all skills categories with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<About />);

      // All skill categories should still render with reduced motion
      expect(
        screen.getByText(de.about.skills.aiLlm.category)
      ).toBeInTheDocument();
      expect(
        screen.getByText(de.about.skills.frontend.category)
      ).toBeInTheDocument();
      expect(
        screen.getByText(de.about.skills.backend.category)
      ).toBeInTheDocument();
      expect(
        screen.getByText(de.about.skills.cloud.category)
      ).toBeInTheDocument();
    });
  });
});
