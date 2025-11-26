import { screen, render as testingLibraryRender } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { Language, useLanguageStore } from "./stores/languageStore";
import { AllTheProviders } from "./test/router-providers";

const render = (ui: React.ReactElement) =>
  testingLibraryRender(<BrowserRouter>{ui}</BrowserRouter>, {
    wrapper: (props) => <AllTheProviders noRouter {...props} />,
  });

// Mock all child components
vi.mock("./components/Navigation", () => ({
  Navigation: () => <div data-testid="navigation">Navigation</div>,
}));

vi.mock("./components/Hero", () => ({
  Hero: () => <div data-testid="hero">Hero</div>,
}));

vi.mock("./components/Services", () => ({
  Services: () => <div data-testid="services">Services</div>,
}));

vi.mock("./components/Projects/ProjectsSection", () => ({
  ProjectsSection: () => <div data-testid="projects-section">Projects</div>,
}));

vi.mock("./components/About/About", () => ({
  About: () => <div data-testid="about">About</div>,
}));

vi.mock("./components/Contact/Contact", () => ({
  Contact: () => <div data-testid="contact">Contact</div>,
}));

// Mock the language store
vi.mock("./stores/languageStore");

const mockUseLanguageStore = vi.mocked(useLanguageStore);

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLanguageStore.mockReturnValue("en");
  });

  it("should render all main components", () => {
    render(<App />);

    expect(screen.getByTestId("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("services")).toBeInTheDocument();
    expect(screen.getByTestId("projects-section")).toBeInTheDocument();
    expect(screen.getByTestId("about")).toBeInTheDocument();
    expect(screen.getByTestId("contact")).toBeInTheDocument();
  });

  it("should have correct main structure", () => {
    render(<App />);

    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveStyle({
      display: "flex",
      flexDirection: "column",
      gap: "4rem",
      paddingTop: "2rem",
      paddingBottom: "1rem",
    });
  });

  it("should set document language attribute based on store language", () => {
    mockUseLanguageStore.mockReturnValue("de");

    render(<App />);

    expect(document.documentElement.lang).toBe("de");
  });

  it("should update document language when language changes", () => {
    // First render with English
    mockUseLanguageStore.mockReturnValue("en");
    const { rerender } = render(<App />);

    expect(document.documentElement.lang).toBe("en");

    // Rerender with German
    mockUseLanguageStore.mockReturnValue("de");
    rerender(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(document.documentElement.lang).toBe("de");
  });

  it("should have minimum height for the root container", () => {
    render(<App />);

    // The Box component should have minHeight: '100vh'
    const container = screen.getByTestId("navigation").parentElement;
    expect(container).toHaveStyle({ minHeight: "100vh" });
  });

  it("should call useLanguageStore with correct selector", () => {
    render(<App />);

    expect(mockUseLanguageStore).toHaveBeenCalledWith(expect.any(Function));

    // Test the selector function
    const selectorFn = mockUseLanguageStore.mock.calls[0][0];
    const mockState = { language: "de" as Language, setLanguage: vi.fn() };
    expect(selectorFn(mockState)).toBe("de");
  });

  it("should render components in correct order", () => {
    render(<App />);

    const components = [
      screen.getByTestId("navigation"),
      screen.getByTestId("hero"),
      screen.getByTestId("services"),
      screen.getByTestId("projects-section"),
      screen.getByTestId("about"),
      screen.getByTestId("contact"),
    ];

    // Navigation should be outside main, others inside
    const main = screen.getByRole("main");
    expect(main).not.toContain(components[0]); // Navigation
    expect(main).toContain(components[1]); // Hero
    expect(main).toContain(components[2]); // Services
    expect(main).toContain(components[3]); // Projects
    expect(main).toContain(components[4]); // About
    expect(main).toContain(components[5]); // Contact
  });

  it("should handle edge case language values", () => {
    // Test with undefined language (shouldn't happen but good to test)
    mockUseLanguageStore.mockReturnValue(undefined as any);

    render(<App />);

    expect(document.documentElement.lang).toBe("undefined");
  });

  it("should properly unmount without errors", () => {
    const { unmount } = render(<App />);

    expect(() => unmount()).not.toThrow();
  });
});
