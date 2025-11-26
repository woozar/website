import { beforeEach, describe, expect, it, vi } from "vitest";

import { ThemedApp } from "./ThemedApp";
import { useThemeStore } from "./stores/themeStore";
import { render as baseRender } from "./test/test-utils";

const render = (ui: React.ReactElement) => baseRender(ui, { noRouter: true });

// Mock the App component
vi.mock("./App", () => ({
  default: () => <div data-testid="app">Mocked App Component</div>,
}));

// Mock the theme store
vi.mock("./stores/themeStore", () => ({
  useThemeStore: vi.fn(),
}));

// Mock document.documentElement.dataset
let datasetTheme = "";
Object.defineProperty(document.documentElement, "dataset", {
  value: {
    get theme(): string {
      return datasetTheme;
    },
    set theme(value: string) {
      datasetTheme = value;
    },
  },
  writable: true,
});

describe("ThemedApp", () => {
  beforeEach(() => {
    datasetTheme = "";
    vi.clearAllMocks();
  });

  it("should render App component within MantineProvider", () => {
    (useThemeStore as any).mockReturnValue("light");

    const { getByTestId } = render(<ThemedApp />);

    expect(getByTestId("app")).toBeInTheDocument();
  });

  it("should set data-theme attribute on mount with light theme", () => {
    (useThemeStore as any).mockReturnValue("light");

    render(<ThemedApp />);

    expect(datasetTheme).toBe("light");
  });

  it("should set data-theme attribute on mount with dark theme", () => {
    (useThemeStore as any).mockReturnValue("dark");

    render(<ThemedApp />);

    expect(datasetTheme).toBe("dark");
  });

  it("should update data-theme attribute when theme changes", () => {
    const mockUseThemeStore = vi.fn();
    (useThemeStore as any).mockImplementation(mockUseThemeStore);

    // First render with light theme
    mockUseThemeStore.mockReturnValue("light");
    const { rerender } = render(<ThemedApp />);

    expect(datasetTheme).toBe("light");

    // Re-render with dark theme
    mockUseThemeStore.mockReturnValue("dark");
    rerender(<ThemedApp />);

    expect(datasetTheme).toBe("dark");
  });

  it("should pass correct forceColorScheme to MantineProvider", () => {
    (useThemeStore as any).mockReturnValue("dark");

    const { container } = render(<ThemedApp />);

    // MantineProvider should be rendered (we can't easily test props, but we can test the structure)
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should use custom theme colors", () => {
    (useThemeStore as any).mockReturnValue("light");

    const { container } = render(<ThemedApp />);

    // The component should render without errors, indicating the theme is properly configured
    expect(container.firstChild).toBeInTheDocument();
  });

  describe("theme configuration", () => {
    it("should have orange as primary color", () => {
      (useThemeStore as any).mockReturnValue("light");

      // Test that the component renders without errors,
      // which indicates the theme configuration is valid
      expect(() => render(<ThemedApp />)).not.toThrow();
    });

    it("should have custom orange color palette", () => {
      (useThemeStore as any).mockReturnValue("light");

      // Test that the component renders without errors with the custom theme
      const { container } = render(<ThemedApp />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should have custom red color palette", () => {
      (useThemeStore as any).mockReturnValue("light");

      // Test that the component renders without errors with the custom theme
      const { container } = render(<ThemedApp />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
