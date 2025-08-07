import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MantineProvider } from "@mantine/core";

import type { Variants } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
// Import the translations directly
import { de } from "@/translations/de";

import { HeroSection } from "./HeroSection";

// Mock hooks
vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("@/hooks/useTranslation", () => ({
  useTranslation: () => ({ t: de }),
}));

const mockUseMediaQuery = vi.mocked(useMediaQuery);

const renderHeroSection = (itemVariants: Variants) => {
  return render(
    <MantineProvider>
      <HeroSection itemVariants={itemVariants} />
    </MantineProvider>
  );
};

const mockItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

describe("HeroSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });

    // Mock window properties
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1280,
    });

    // Mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mock scrollTo
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    // Mock addEventListener and removeEventListener
    vi.spyOn(window, "addEventListener");
    vi.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render hero title", () => {
    renderHeroSection(mockItemVariants);
    expect(screen.getByText(de.workshop.hero.title)).toBeInTheDocument();
  });

  it("should render hero subtitle on desktop", () => {
    renderHeroSection(mockItemVariants);
    expect(screen.getByText(de.workshop.hero.subtitle)).toBeInTheDocument();
  });

  it("should render CTA button", () => {
    renderHeroSection(mockItemVariants);
    expect(screen.getByText(de.workshop.hero.ctaButton)).toBeInTheDocument();
  });

  it("should render AI generated text and show prompt button", () => {
    renderHeroSection(mockItemVariants);
    expect(screen.getByText(de.workshop.hero.aiGenerated)).toBeInTheDocument();
    expect(screen.getByText(de.workshop.hero.showPrompt)).toBeInTheDocument();
  });

  it("should render AI illustration image", () => {
    renderHeroSection(mockItemVariants);
    const image = screen.getByAltText("KI Low Hanging Fruits");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "/assets/ai-low-hanging-fruits-illustration.webp"
    );
  });

  it("should handle mobile layout correctly", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    renderHeroSection(mockItemVariants);

    // Should still render all content
    expect(screen.getByText(de.workshop.hero.title)).toBeInTheDocument();
    expect(screen.getByText(de.workshop.hero.subtitle)).toBeInTheDocument();
    expect(screen.getByText(de.workshop.hero.ctaButton)).toBeInTheDocument();
  });

  it("should handle tablet layout correctly", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });

    renderHeroSection(mockItemVariants);

    // Should still render all content
    expect(screen.getByText(de.workshop.hero.title)).toBeInTheDocument();
    expect(screen.getByText(de.workshop.hero.subtitle)).toBeInTheDocument();
  });

  it("should handle CTA button click and scroll to contact", () => {
    // Mock querySelector to return a mock element
    const mockContactSection = {
      offsetTop: 1000,
    };
    vi.spyOn(document, "querySelector").mockReturnValue(
      mockContactSection as any
    );

    renderHeroSection(mockItemVariants);

    const ctaButton = screen.getByText(de.workshop.hero.ctaButton);
    fireEvent.click(ctaButton);

    expect(document.querySelector).toHaveBeenCalledWith("#contact");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 900, // offsetTop (1000) - headerHeight (100)
      behavior: "smooth",
    });
  });

  it("should handle CTA button click when contact section not found", () => {
    vi.spyOn(document, "querySelector").mockReturnValue(null);

    renderHeroSection(mockItemVariants);

    const ctaButton = screen.getByText(de.workshop.hero.ctaButton);
    fireEvent.click(ctaButton);

    expect(document.querySelector).toHaveBeenCalledWith("#contact");
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("should handle show prompt button click", () => {
    renderHeroSection(mockItemVariants);

    const showPromptButton = screen.getByText(de.workshop.hero.showPrompt);
    fireEvent.click(showPromptButton);

    // After clicking, should show the prompts
    expect(screen.getByText("💬 Verwendete KI-Prompts")).toBeInTheDocument();
    expect(screen.getByText("Text-Prompt")).toBeInTheDocument();
    expect(screen.getByText("Bild-Prompt")).toBeInTheDocument();
  });

  it("should render prompts content when flipped", () => {
    renderHeroSection(mockItemVariants);

    // Click to flip
    const showPromptButton = screen.getByText(de.workshop.hero.showPrompt);
    fireEvent.click(showPromptButton);

    // Should show prompts
    expect(screen.getByText(de.workshop.hero.textPrompt)).toBeInTheDocument();
    expect(screen.getByText(de.workshop.hero.imagePrompt)).toBeInTheDocument();
  });

  it("should handle close button click when flipped", () => {
    renderHeroSection(mockItemVariants);

    // Click to flip
    const showPromptButton = screen.getByText(de.workshop.hero.showPrompt);
    fireEvent.click(showPromptButton);

    // Should show close button
    const closeButton = screen.getByText("×");
    expect(closeButton).toBeInTheDocument();

    // Click close button
    fireEvent.click(closeButton);

    // Should go back to front side
    expect(screen.getByText(de.workshop.hero.showPrompt)).toBeInTheDocument();
  });

  it("should update front height on resize", () => {
    renderHeroSection(mockItemVariants);

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
      value: 800,
    });

    // Call the resize handler
    if (typeof resizeHandler === "function") {
      act(() => {
        fireEvent(window, new Event("resize"));
      });
    }

    // Should still render correctly
    expect(screen.getByText(de.workshop.hero.title)).toBeInTheDocument();
  });

  it("should cleanup event listeners on unmount", () => {
    const { unmount } = renderHeroSection(mockItemVariants);

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

  it("should handle front height measurement correctly", async () => {
    // Mock scrollHeight
    const mockScrollHeight = 350;
    Object.defineProperty(HTMLDivElement.prototype, "scrollHeight", {
      configurable: true,
      value: mockScrollHeight,
    });

    renderHeroSection(mockItemVariants);

    // Wait for the height update timeout
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    // Should still render correctly
    expect(screen.getByText(de.workshop.hero.title)).toBeInTheDocument();
  });
});
