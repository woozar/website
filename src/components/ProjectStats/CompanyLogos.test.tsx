import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MantineProvider } from "@mantine/core";

// Import after mocking
import { useThemeStore } from "@/stores/themeStore";

import { CompanyLogos } from "./CompanyLogos";

// Mock theme store
vi.mock("@/stores/themeStore", () => ({
  useThemeStore: vi.fn(),
}));

const renderComponent = (props = {}) => {
  const defaultProps = {
    onCompanyClick: vi.fn(),
    ...props,
  };

  return render(
    <MantineProvider>
      <CompanyLogos {...defaultProps} />
    </MantineProvider>
  );
};

describe("CompanyLogos", () => {
  const mockOnCompanyClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useThemeStore).mockReturnValue("light");
  });

  it("should render all company logos", () => {
    vi.mocked(useThemeStore).mockReturnValue("light");
    renderComponent({ onCompanyClick: mockOnCompanyClick });

    // Check that images are rendered
    expect(screen.getByAltText("Siemens AG")).toBeInTheDocument();
    expect(screen.getByAltText("DMG MORI")).toBeInTheDocument();
    expect(screen.getByAltText("KUKA AG")).toBeInTheDocument();
    expect(screen.getByAltText("Saurer AG")).toBeInTheDocument();
    expect(screen.getByAltText("Sikant GmbH")).toBeInTheDocument();
    expect(screen.getByAltText("ChatYourData GmbH")).toBeInTheDocument();
    expect(screen.getByAltText("Paessler AG")).toBeInTheDocument();
    expect(screen.getByAltText("T3 Software")).toBeInTheDocument();
  });

  it("should call onCompanyClick when a logo is clicked", () => {
    vi.mocked(useThemeStore).mockReturnValue("light");
    renderComponent({ onCompanyClick: mockOnCompanyClick });

    const siemensLogo = screen.getByAltText("Siemens AG");
    fireEvent.click(siemensLogo.closest("div")!);

    expect(mockOnCompanyClick).toHaveBeenCalledWith("Siemens AG");
  });

  it("should handle mouse hover events on logos", () => {
    renderComponent({ onCompanyClick: mockOnCompanyClick });

    const siemensLogo = screen.getByAltText("Siemens AG");

    // Test mouse enter
    fireEvent.mouseEnter(siemensLogo);
    expect(siemensLogo.style.transform).toBe("scale(1.05)");

    // Test mouse leave
    fireEvent.mouseLeave(siemensLogo);
    expect(siemensLogo.style.transform).toBe("scale(1)");
  });

  it("should handle image load errors with fallback text", () => {
    renderComponent({ onCompanyClick: mockOnCompanyClick });

    const siemensLogo = screen.getByAltText("Siemens AG");

    // Create a mock parent node
    const mockParentNode = document.createElement("div");
    const originalParentNode = siemensLogo.parentNode;

    // Replace with mock parent for testing
    Object.defineProperty(siemensLogo, "parentNode", {
      value: mockParentNode,
      writable: true,
    });

    // Add appendChild method to mock
    mockParentNode.appendChild = vi.fn();

    // Trigger error event
    fireEvent.error(siemensLogo);

    // Check that image is hidden
    expect(siemensLogo.style.display).toBe("none");

    // Check that appendChild was called
    expect(mockParentNode.appendChild).toHaveBeenCalled();

    // Restore original parent
    Object.defineProperty(siemensLogo, "parentNode", {
      value: originalParentNode,
      writable: true,
    });
  });

  it("should use correct image sources", () => {
    renderComponent({ onCompanyClick: mockOnCompanyClick });

    const siemensLogo = screen.getByAltText("Siemens AG");
    expect(siemensLogo.getAttribute("src")).toBe(
      "/assets/logos/siemens-logo.svg"
    );

    const dmgLogo = screen.getByAltText("DMG MORI");
    expect(dmgLogo.getAttribute("src")).toBe(
      "/assets/logos/dmg-mori-logo.webp"
    );
  });

  it("should use light mode logo for Sikant GmbH by default", () => {
    renderComponent({ onCompanyClick: mockOnCompanyClick });

    const sikantLogo = screen.getByAltText("Sikant GmbH");
    expect(sikantLogo.getAttribute("src")).toBe(
      "/assets/logos/sikant-med-logo.png"
    );
  });

  it("should apply correct styling to logo containers", () => {
    renderComponent({ onCompanyClick: mockOnCompanyClick });

    const siemensContainer = screen.getByAltText("Siemens AG").closest("div");

    expect(siemensContainer).toHaveStyle({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80px",
      cursor: "pointer",
    });
  });

  it("should apply correct styling to logo images", () => {
    renderComponent({ onCompanyClick: mockOnCompanyClick });

    const siemensLogo = screen.getByAltText("Siemens AG");

    expect(siemensLogo).toHaveStyle({
      height: "40px",
      width: "auto",
      maxWidth: "120px",
      objectFit: "contain",
      opacity: "1",
      transition: "all 0.3s ease",
    });
  });

  it("should handle all company clicks with correct filter names", () => {
    renderComponent({ onCompanyClick: mockOnCompanyClick });

    const companies = [
      "Siemens AG",
      "DMG MORI",
      "KUKA AG",
      "Saurer AG",
      "Sikant GmbH",
      "ChatYourData GmbH",
      "Paessler AG",
      "T3 Software",
    ];

    companies.forEach((name) => {
      const logo = screen.getByAltText(name);
      fireEvent.click(logo.closest("div")!);
      expect(mockOnCompanyClick).toHaveBeenCalledWith(name);
    });

    expect(mockOnCompanyClick).toHaveBeenCalledTimes(8);
  });

  it("should use dark mode logos when theme is dark", () => {
    vi.mocked(useThemeStore).mockReturnValue("dark");

    renderComponent();

    const sikantLogo = screen.getByAltText("Sikant GmbH");
    const chatYourDataLogo = screen.getByAltText("ChatYourData GmbH");
    const paesslerLogo = screen.getByAltText("Paessler AG");

    expect(sikantLogo).toHaveAttribute(
      "src",
      "/assets/logos/sikant-med-logo-dark-mode.png"
    );
    expect(chatYourDataLogo).toHaveAttribute(
      "src",
      "/assets/logos/chatyourdata-logo-dark-mode.png"
    );
    expect(paesslerLogo).toHaveAttribute(
      "src",
      "/assets/logos/paessler-logo-dark-mode.png"
    );
  });
});
