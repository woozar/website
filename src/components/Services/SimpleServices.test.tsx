import { beforeEach, describe, expect, it, vi } from "vitest";

// Import after mocking
import { useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";
import { render, screen } from "@/test/test-utils";
import { de } from "@/translations/de";

import { SimpleServices } from "./SimpleServices";

// Mock dependencies
vi.mock("@/hooks/useMediaQuery");
vi.mock("@/hooks/useTranslation");
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
  useReducedMotion: vi.fn(),
}));

// Mock the image imports
vi.mock("../../assets/ai-development.webp", () => ({
  default: "/mock-ai-development.webp",
}));
vi.mock("../../assets/cloud-architecture.webp", () => ({
  default: "/mock-cloud-architecture.webp",
}));
vi.mock("../../assets/fullstack-development.webp", () => ({
  default: "/mock-fullstack-development.webp",
}));

const mockUseMediaQuery = vi.mocked(useMediaQuery);
const mockUseTranslation = vi.mocked(useTranslation);

describe("SimpleServices", () => {
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
    // Set default reduced motion to false
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it("should render services section with title and subtitle", () => {
    render(<SimpleServices />);

    expect(screen.getByText("Meine Services")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Spezialisierte Expertise in den wichtigsten Zukunftstechnologien. Von AI-Integration bis hin zu skalierbaren Cloud-Architekturen."
      )
    ).toBeInTheDocument();
  });

  it("should render all three service cards", () => {
    render(<SimpleServices />);

    expect(screen.getByText("AI Development")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
  });

  it("should render service descriptions", () => {
    render(<SimpleServices />);

    // Check for key parts of descriptions using partial text matching
    expect(
      screen.getByText(
        (content) =>
          content.includes("Entwicklung von AI-basierten Anwendungen") &&
          content.includes("Large Language Models")
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (content) =>
          content.includes(
            "Design und Implementierung skalierbarer Cloud-Infrastrukturen"
          ) && content.includes("AWS, Azure")
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (content) =>
          content.includes(
            "Entwicklung moderner Web- und Mobile-Anwendungen"
          ) && content.includes("React, Angular")
      )
    ).toBeInTheDocument();
  });

  it("should render service images", () => {
    render(<SimpleServices />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);

    expect(images[0]).toHaveAttribute("src", "/assets/ai-development.webp");
    expect(images[1]).toHaveAttribute("src", "/assets/cloud-architecture.webp");
    expect(images[2]).toHaveAttribute(
      "src",
      "/assets/fullstack-development.webp"
    );
  });

  it("should render technologies lists", () => {
    render(<SimpleServices />);

    expect(screen.getAllByText("Technologien:")).toHaveLength(3); // One for each service

    // AI technologies
    expect(screen.getByText("OpenAI GPT-4")).toBeInTheDocument();
    expect(screen.getByText("Anthropic Claude")).toBeInTheDocument();
    expect(screen.getByText("Google Gemini")).toBeInTheDocument();
    expect(screen.getByText("LangChain")).toBeInTheDocument();
    expect(screen.getByText("Vercel AI")).toBeInTheDocument();

    // Cloud technologies
    expect(screen.getByText("AWS")).toBeInTheDocument();
    expect(screen.getByText("Azure")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("Terraform")).toBeInTheDocument();

    // Full-stack technologies
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("should adapt layout for mobile devices", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    render(<SimpleServices />);

    // Should still render all content on mobile
    expect(screen.getByText("Meine Services")).toBeInTheDocument();
    expect(screen.getByText("AI Development")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
  });

  it("should handle German language translations", () => {
    render(<SimpleServices />);

    expect(screen.getByText("Meine Services")).toBeInTheDocument();
    expect(screen.getByText("AI Development")).toBeInTheDocument();
    expect(screen.getAllByText("Technologien:")).toHaveLength(3); // One for each service
  });

  it("should render with proper semantic structure", () => {
    render(<SimpleServices />);

    const mainTitle = screen.getByRole("heading", { level: 2 });
    expect(mainTitle).toHaveTextContent("Meine Services");

    const serviceHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(serviceHeadings).toHaveLength(3);
    expect(serviceHeadings[0]).toHaveTextContent("AI Development");
    expect(serviceHeadings[1]).toHaveTextContent("Cloud Architecture");
    expect(serviceHeadings[2]).toHaveTextContent("Full-Stack Development");
  });

  it("should render service cards with proper structure", () => {
    render(<SimpleServices />);

    // Check that service titles are present
    const aiTitle = screen.getByText("AI Development");
    expect(aiTitle).toBeInTheDocument();

    // Check that service descriptions are present using flexible matching
    const aiDescription = screen.getByText(
      (content) =>
        content.includes("Entwicklung von AI-basierten Anwendungen") &&
        content.includes("Large Language Models")
    );
    expect(aiDescription).toBeInTheDocument();
  });

  it("should render images with proper alt attributes", () => {
    render(<SimpleServices />);

    const images = screen.getAllByRole("img");

    // Check that all images have alt attributes (exact text may vary)
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
    });
  });

  it("should render technology chips/badges correctly", () => {
    render(<SimpleServices />);

    // Check that technology names are rendered as individual elements
    const technologies = [
      "OpenAI GPT-4",
      "Anthropic Claude",
      "Google Gemini",
      "LangChain",
      "Vercel AI",
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Terraform",
      "React",
      "Angular",
      "Node.js",
      "TypeScript",
      "Next.js",
    ];

    technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it("should render services in correct order", () => {
    render(<SimpleServices />);

    const serviceHeadings = screen.getAllByRole("heading", { level: 3 });

    expect(serviceHeadings[0]).toHaveTextContent("AI Development");
    expect(serviceHeadings[1]).toHaveTextContent("Cloud Architecture");
    expect(serviceHeadings[2]).toHaveTextContent("Full-Stack Development");
  });

  it("should have proper card layout structure", () => {
    render(<SimpleServices />);

    // Check that the main services section is rendered
    const servicesSection = screen
      .getByText("Meine Services")
      .closest("section");
    expect(servicesSection).toBeInTheDocument();

    // All service cards should be present
    expect(screen.getByText("AI Development")).toBeInTheDocument();
    expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      render(<SimpleServices />);

      // Component should render successfully with animations enabled
      expect(screen.getByText("Meine Services")).toBeInTheDocument();
      expect(screen.getByText("AI Development")).toBeInTheDocument();
      expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<SimpleServices />);

      // Component should render successfully with reduced animations
      expect(screen.getByText("Meine Services")).toBeInTheDocument();
      expect(screen.getByText("AI Development")).toBeInTheDocument();
      expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
    });

    it("should render all service cards with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<SimpleServices />);

      // All service cards should still render with reduced motion
      expect(screen.getByText("AI Development")).toBeInTheDocument();
      expect(screen.getByText("Cloud Architecture")).toBeInTheDocument();
      expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
    });
  });
});
