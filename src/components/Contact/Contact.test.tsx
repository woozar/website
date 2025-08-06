import { beforeEach, describe, expect, it, vi } from "vitest";

// Import after mocking
import { useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";
import { fireEvent, render, screen } from "@/test/test-utils";
import { de } from "@/translations/de";

import { Contact } from "./Contact";

// Mock dependencies
vi.mock("@/hooks/useMediaQuery");
vi.mock("@/hooks/useTranslation");
vi.mock("../Modal/LegalModal", () => ({
  LegalModal: ({ opened, onClose, type }: any) =>
    opened ? (
      <div data-testid={`legal-modal-${type}`} onClick={onClose}>
        Legal Modal {type}
      </div>
    ) : null,
}));
// framer-motion is globally mocked in test setup

const mockUseMediaQuery = vi.mocked(useMediaQuery);
const mockUseTranslation = vi.mocked(useTranslation);

describe("Contact", () => {
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

  it("should render contact section with title and subtitle", () => {
    render(<Contact />);

    expect(screen.getByText("Kontakt")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Bereit für Ihr nächstes Projekt? Lassen Sie uns über Ihre Anforderungen sprechen und gemeinsam innovative Lösungen entwickeln."
      )
    ).toBeInTheDocument();
  });

  it("should render contact information", () => {
    render(<Contact />);

    expect(screen.getByText("E-Mail")).toBeInTheDocument();
    expect(screen.getByText("info@12ofspades.com")).toBeInTheDocument();

    expect(screen.getByText("Telefon")).toBeInTheDocument();
    expect(screen.getByText("+49 176 8100 1371")).toBeInTheDocument();

    expect(screen.getByText("Standort")).toBeInTheDocument();
    expect(screen.getByText("Weisendorf, Deutschland")).toBeInTheDocument();
  });

  it("should render contact links with correct hrefs", () => {
    render(<Contact />);

    const emailLink = screen.getByText("info@12ofspades.com").closest("a");
    expect(emailLink).toHaveAttribute("href", "mailto:info@12ofspades.com");

    const phoneLink = screen.getByText("+49 176 8100 1371").closest("a");
    expect(phoneLink).toHaveAttribute("href", "tel:+4917681001371");
  });

  it("should render social media links", () => {
    render(<Contact />);

    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();

    const linkedinLink = screen.getByText("LinkedIn").closest("a");
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/johannes-herrmann-795550128/"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");

    const githubLink = screen.getByText("GitHub").closest("a");
    expect(githubLink).toHaveAttribute("href", "https://github.com/woozar");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("should render legal links", () => {
    render(<Contact />);

    expect(screen.getByText("Impressum")).toBeInTheDocument();
    expect(screen.getByText("Datenschutz")).toBeInTheDocument();
  });

  it("should open impressum modal when clicked", () => {
    render(<Contact />);

    const impressumButton = screen.getByText("Impressum");
    fireEvent.click(impressumButton);

    expect(screen.getByTestId("legal-modal-impressum")).toBeInTheDocument();
  });

  it("should open privacy policy modal when clicked", () => {
    render(<Contact />);

    const datenschutzButton = screen.getByText("Datenschutz");
    fireEvent.click(datenschutzButton);

    expect(screen.getByTestId("legal-modal-datenschutz")).toBeInTheDocument();
  });

  it("should close impressum modal when clicked", () => {
    render(<Contact />);

    const impressumButton = screen.getByText("Impressum");
    fireEvent.click(impressumButton);

    const modal = screen.getByTestId("legal-modal-impressum");
    fireEvent.click(modal);

    expect(
      screen.queryByTestId("legal-modal-impressum")
    ).not.toBeInTheDocument();
  });

  it("should close privacy policy modal when clicked", () => {
    render(<Contact />);

    const datenschutzButton = screen.getByText("Datenschutz");
    fireEvent.click(datenschutzButton);

    const modal = screen.getByTestId("legal-modal-datenschutz");
    fireEvent.click(modal);

    expect(
      screen.queryByTestId("legal-modal-datenschutz")
    ).not.toBeInTheDocument();
  });

  it("should handle both modals independently", () => {
    render(<Contact />);

    // Open impressum
    fireEvent.click(screen.getByText("Impressum"));
    expect(screen.getByTestId("legal-modal-impressum")).toBeInTheDocument();

    // Close impressum and open datenschutz
    fireEvent.click(screen.getByTestId("legal-modal-impressum"));
    expect(
      screen.queryByTestId("legal-modal-impressum")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Datenschutz"));
    expect(screen.getByTestId("legal-modal-datenschutz")).toBeInTheDocument();
  });

  it("should adapt layout for mobile devices", () => {
    mockUseMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    render(<Contact />);

    // Should still render all content on mobile
    expect(screen.getByText("Kontakt")).toBeInTheDocument();
    expect(screen.getByText("info@12ofspades.com")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("should handle German language translations", () => {
    render(<Contact />);

    expect(screen.getByText("Kontakt")).toBeInTheDocument();
    expect(screen.getByText("E-Mail")).toBeInTheDocument();
    expect(screen.getByText("Telefon")).toBeInTheDocument();
    expect(screen.getByText("Datenschutz")).toBeInTheDocument();
  });

  it("should render with proper semantic structure", () => {
    render(<Contact />);

    const mainTitle = screen.getByRole("heading", { level: 2 });
    expect(mainTitle).toHaveTextContent("Kontakt");
  });

  it("should have external link security attributes", () => {
    render(<Contact />);

    const linkedinLink = screen.getByText("LinkedIn").closest("a");
    const githubLink = screen.getByText("GitHub").closest("a");

    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should handle modal state changes correctly", () => {
    render(<Contact />);

    // Initially no modals should be open
    expect(
      screen.queryByTestId("legal-modal-impressum")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("legal-modal-datenschutz")
    ).not.toBeInTheDocument();

    // Open impressum modal
    fireEvent.click(screen.getByText("Impressum"));
    expect(screen.getByTestId("legal-modal-impressum")).toBeInTheDocument();
    expect(
      screen.queryByTestId("legal-modal-datenschutz")
    ).not.toBeInTheDocument();

    // Close impressum modal
    fireEvent.click(screen.getByTestId("legal-modal-impressum"));
    expect(
      screen.queryByTestId("legal-modal-impressum")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("legal-modal-datenschutz")
    ).not.toBeInTheDocument();
  });

  it("should render contact icons", () => {
    render(<Contact />);

    // Check that the contact section renders properly
    // Icons are from @tabler/icons-react, so we check for the presence of contact items
    expect(screen.getByText("E-Mail")).toBeInTheDocument();
    expect(screen.getByText("Telefon")).toBeInTheDocument();
    expect(screen.getByText("Standort")).toBeInTheDocument();
  });

  describe("Animation and Reduced Motion", () => {
    it("should render with normal animations when reduced motion is false", () => {
      vi.mocked(useReducedMotion).mockReturnValue(false);

      render(<Contact />);

      // Component should render successfully with animations enabled
      expect(screen.getByText("Kontakt")).toBeInTheDocument();
      expect(screen.getByText("info@12ofspades.com")).toBeInTheDocument();
    });

    it("should render with reduced motion animations when reduced motion is true", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<Contact />);

      // Component should render successfully with reduced animations
      expect(screen.getByText("Kontakt")).toBeInTheDocument();
      expect(screen.getByText("info@12ofspades.com")).toBeInTheDocument();
      expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    });

    it("should handle modal interactions with reduced motion enabled", () => {
      vi.mocked(useReducedMotion).mockReturnValue(true);

      render(<Contact />);

      // Modal functionality should still work with reduced motion
      fireEvent.click(screen.getByText("Impressum"));
      expect(screen.getByTestId("legal-modal-impressum")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("legal-modal-impressum"));
      expect(
        screen.queryByTestId("legal-modal-impressum")
      ).not.toBeInTheDocument();
    });
  });
});
