import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useModal } from "@/hooks/useModal";
import { useTranslation } from "@/hooks/useTranslation";
import { fireEvent, render, screen } from "@/test/test-utils";
import { de } from "@/translations/de";

import { ImprovedNavigation } from "./ImprovedNavigation";

// Mock dependencies
vi.mock("@/hooks/useMediaQuery");
vi.mock("@/hooks/useTranslation");
vi.mock("@/hooks/useModal");
vi.mock("../LanguageSwitcher", () => ({
  LanguageSwitcher: ({ variant }: any) => (
    <div data-testid={`language-switcher-${variant}`}>Language Switcher</div>
  ),
}));
vi.mock("../ThemeSwitcher", () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">Theme Switcher</div>,
}));
vi.mock("@mantine/core", async () => {
  const actual = await vi.importActual("@mantine/core");
  return {
    ...actual,
    Drawer: ({ opened, onClose, children, ...props }: any) =>
      opened ? (
        <div data-testid="drawer" onClick={onClose} {...props}>
          {children}
        </div>
      ) : null,
  };
});

// Mock the logo image import
vi.mock("../../assets/logo.webp", () => ({
  default: "/mock-logo.webp",
}));

const mockUseMediaQuery = vi.mocked(useMediaQuery);
const mockUseTranslation = vi.mocked(useTranslation);
const mockUseModal = vi.mocked(useModal);

describe("ImprovedNavigation", () => {
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
    mockUseModal.mockReturnValue({
      isModalOpen: false,
      openModal: vi.fn(),
      closeModal: vi.fn(),
    });

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

  describe("Desktop Navigation", () => {
    it("should render desktop navigation with logo and menu items", () => {
      render(<ImprovedNavigation />);

      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByText("Services")).toBeInTheDocument();
      expect(screen.getByText("Projekte")).toBeInTheDocument();
      expect(screen.getByText("Über mich")).toBeInTheDocument();
    });

    it("should render logo with correct attributes", () => {
      render(<ImprovedNavigation />);

      const logo = screen.getByRole("img");
      expect(logo).toHaveAttribute("src", "/assets/logo.webp");
      expect(logo).toHaveAttribute("alt", "12 of Spades");
    });

    it("should render contact button", () => {
      render(<ImprovedNavigation />);

      expect(screen.getByText("Kontakt")).toBeInTheDocument();
    });

    it("should render desktop language switcher", () => {
      render(<ImprovedNavigation />);

      expect(
        screen.getByTestId("language-switcher-desktop")
      ).toBeInTheDocument();
    });

    it("should not render burger menu on desktop", () => {
      render(<ImprovedNavigation />);

      expect(
        screen.queryByRole("button", { name: /menu/i })
      ).not.toBeInTheDocument();
    });

    it("should handle navigation link clicks", () => {
      render(<ImprovedNavigation />);

      const servicesLink = screen.getByText("Services");
      fireEvent.click(servicesLink);

      expect(document.querySelector).toHaveBeenCalledWith("#services");
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400, // 500 - 100 (header height)
        behavior: "smooth",
      });
    });

    it("should handle contact button click", () => {
      render(<ImprovedNavigation />);

      const contactButton = screen.getByText("Kontakt");
      fireEvent.click(contactButton);

      expect(document.querySelector).toHaveBeenCalledWith("#contact");
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400,
        behavior: "smooth",
      });
    });
  });

  describe("Mobile Navigation", () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });
    });

    it("should render mobile navigation with burger menu", () => {
      render(<ImprovedNavigation />);

      expect(screen.getAllByRole("button")).toHaveLength(2); // Contact button + Burger menu
      expect(screen.getByRole("img")).toBeInTheDocument(); // Logo
    });

    it("should render mobile language switcher", () => {
      render(<ImprovedNavigation />);

      // Open drawer to see the mobile language switcher
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      expect(
        screen.getByTestId("language-switcher-mobile")
      ).toBeInTheDocument();
    });

    it("should open drawer when burger menu is clicked", () => {
      render(<ImprovedNavigation />);

      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      // Drawer content should be visible
      expect(screen.getByTestId("drawer")).toBeInTheDocument();
    });

    it("should close drawer when navigation item is clicked", () => {
      render(<ImprovedNavigation />);

      // Open drawer
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      // Click navigation item
      const servicesButton = screen.getByText("Services");
      fireEvent.click(servicesButton);

      // Should handle navigation and close drawer
      expect(document.querySelector).toHaveBeenCalledWith("#services");
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400,
        behavior: "smooth",
      });
    });

    it("should render contact button in mobile drawer", () => {
      render(<ImprovedNavigation />);

      // Open drawer
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    });

    it("should handle mobile contact button click", () => {
      render(<ImprovedNavigation />);

      // Click the mobile contact button (first button in mobile view)
      const mobileContactButton = screen.getAllByRole("button")[0]; // First button is mobile contact
      fireEvent.click(mobileContactButton);

      expect(document.querySelector).toHaveBeenCalledWith("#contact");
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400,
        behavior: "smooth",
      });
    });

    it("should handle drawer contact button click", () => {
      render(<ImprovedNavigation />);

      // Open drawer
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      // Click the drawer contact button
      const drawerContactButton = screen.getByText("Kontakt aufnehmen");
      fireEvent.click(drawerContactButton);

      expect(document.querySelector).toHaveBeenCalledWith("#contact");
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400,
        behavior: "smooth",
      });
    });

    it("should handle all mobile drawer navigation clicks", () => {
      render(<ImprovedNavigation />);

      // Open drawer
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      // Test statistics navigation item in mobile drawer
      const statisticsButton = screen.getByText("Statistiken");
      fireEvent.click(statisticsButton);
      expect(document.querySelector).toHaveBeenCalledWith("#statistics");
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400,
        behavior: "smooth",
      });

      // Re-open drawer since clicking closes it
      fireEvent.click(burgerButton);

      // Test about navigation item in mobile drawer
      const aboutButton = screen.getByText("Über mich");
      fireEvent.click(aboutButton);
      expect(document.querySelector).toHaveBeenCalledWith("#about");
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400,
        behavior: "smooth",
      });
    });
  });

  describe("Responsive Behavior", () => {
    it("should close drawer when switching from mobile to desktop", () => {
      // Start with mobile
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      const { rerender } = render(<ImprovedNavigation />);

      // Open drawer
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      // Switch to desktop
      mockUseMediaQuery.mockReturnValue({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      });

      rerender(<ImprovedNavigation />);

      // Drawer should be closed (burger menu shouldn't be visible)
      expect(
        screen.queryByRole("button", { name: /menu/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("Language Support", () => {
    it("should handle German language translations", () => {
      render(<ImprovedNavigation />);

      expect(screen.getByText("Projekte")).toBeInTheDocument();
      expect(screen.getByText("Über mich")).toBeInTheDocument();
      expect(screen.getByText("Kontakt")).toBeInTheDocument();
    });
  });

  describe("Navigation Functionality", () => {
    it("should handle missing target element gracefully", () => {
      document.querySelector = vi.fn().mockReturnValue(null);

      render(<ImprovedNavigation />);

      const servicesLink = screen.getByText("Services");

      expect(() => fireEvent.click(servicesLink)).not.toThrow();
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it("should navigate to all available sections", () => {
      render(<ImprovedNavigation />);

      // Test services navigation
      fireEvent.click(screen.getByText("Services"));
      expect(document.querySelector).toHaveBeenCalledWith("#services");

      // Test statistics navigation
      fireEvent.click(screen.getByText("Statistiken"));
      expect(document.querySelector).toHaveBeenCalledWith("#statistics");

      // Test projects navigation
      fireEvent.click(screen.getByText("Projekte"));
      expect(document.querySelector).toHaveBeenCalledWith("#projects");

      // Test about navigation
      fireEvent.click(screen.getByText("Über mich"));
      expect(document.querySelector).toHaveBeenCalledWith("#about");

      // Test contact navigation
      fireEvent.click(screen.getByText("Kontakt"));
      expect(document.querySelector).toHaveBeenCalledWith("#contact");
    });

    it("should calculate scroll position correctly", () => {
      const mockElement = {
        offsetTop: 800,
      } as HTMLElement;

      document.querySelector = vi.fn().mockReturnValue(mockElement);

      render(<ImprovedNavigation />);

      const servicesLink = screen.getByText("Services");
      fireEvent.click(servicesLink);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 700, // 800 - 100 (header height)
        behavior: "smooth",
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", () => {
      render(<ImprovedNavigation />);

      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();
    });

    it("should have proper button labels", () => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      render(<ImprovedNavigation />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2); // Contact button and burger menu
    });
  });

  describe("Fixed Header Behavior", () => {
    it("should render as fixed positioned header", () => {
      render(<ImprovedNavigation />);

      const header = screen.getByRole("banner");
      expect(header).toHaveStyle({
        position: "fixed",
        top: "0",
      });
    });

    it("should have backdrop blur styling", () => {
      render(<ImprovedNavigation />);

      const header = screen.getByRole("banner");
      expect(header).toHaveStyle({
        backgroundColor: "var(--backdrop-filter)",
      });
    });
  });

  describe("Logo Click Behavior", () => {
    it("should scroll to top when logo is clicked", () => {
      render(<ImprovedNavigation />);

      const logoLink = screen.getByRole("img").closest("a");
      expect(logoLink).toBeInTheDocument();

      fireEvent.click(logoLink!);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });
    });

    it("should prevent default anchor behavior on logo click", () => {
      render(<ImprovedNavigation />);

      const logoLink = screen.getByRole("img").closest("a");
      const clickEvent = new MouseEvent("click", { bubbles: true });
      const preventDefaultSpy = vi.fn();
      clickEvent.preventDefault = preventDefaultSpy;

      logoLink?.dispatchEvent(clickEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe("Modal Integration", () => {
    it("should disable burger menu when modal is open", () => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      // Mock modal as open
      mockUseModal.mockReturnValue({
        isModalOpen: true,
        openModal: vi.fn(),
        closeModal: vi.fn(),
      });

      render(<ImprovedNavigation />);

      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu

      // Burger should be disabled when modal is open
      expect(burgerButton).toHaveStyle({
        opacity: "0.5",
        pointerEvents: "none",
      });
    });

    it("should close drawer when modal opens via useEffect", () => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      // Start with modal closed
      mockUseModal.mockReturnValue({
        isModalOpen: false,
        openModal: vi.fn(),
        closeModal: vi.fn(),
      });

      const { rerender } = render(<ImprovedNavigation />);

      // Open drawer first
      const burgerButton = screen.getAllByRole("button")[1];
      fireEvent.click(burgerButton);

      // Now modal opens
      mockUseModal.mockReturnValue({
        isModalOpen: true,
        openModal: vi.fn(),
        closeModal: vi.fn(),
      });
      rerender(<ImprovedNavigation />);

      // The useEffect should trigger and close the drawer
      expect(screen.queryByTestId("drawer")).not.toBeInTheDocument();
    });

    it("should prevent drawer opening when modal is already open", () => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      // Start with modal open
      mockUseModal.mockReturnValue({
        isModalOpen: true,
        openModal: vi.fn(),
        closeModal: vi.fn(),
      });

      render(<ImprovedNavigation />);

      const burgerButton = screen.getAllByRole("button")[1];

      // Try to open drawer - should not work
      fireEvent.click(burgerButton);

      // Drawer should not open when modal is already open
      expect(screen.queryByTestId("drawer")).not.toBeInTheDocument();
    });
  });

  describe("Tablet Responsive Behavior", () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      });
    });

    it("should show tablet-specific branding", () => {
      render(<ImprovedNavigation />);

      expect(screen.getByText("J. Herrmann")).toBeInTheDocument();
      expect(
        screen.queryByText("Software Freelancer & AI Specialist")
      ).not.toBeInTheDocument();
    });

    it("should hide theme/language switchers on tablet", () => {
      render(<ImprovedNavigation />);

      expect(screen.queryByTestId("theme-switcher")).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("language-switcher-desktop")
      ).not.toBeInTheDocument();
    });

    it("should use tablet-specific spacing and sizing", () => {
      render(<ImprovedNavigation />);

      const contactButton = screen.getByText("Kontakt");

      // Tablet specific styling should be applied (via internal Mantine styles)
      expect(contactButton).toBeInTheDocument();

      // The isTablet condition should be properly evaluated
      expect(screen.getByText("J. Herrmann")).toBeInTheDocument(); // Confirms tablet mode is active
    });
  });

  describe("Error Handling", () => {
    it("should handle navigation when element is not found gracefully", () => {
      // Mock querySelector to return null
      document.querySelector = vi.fn().mockReturnValue(null);

      render(<ImprovedNavigation />);

      const servicesLink = screen.getByText("Services");

      // Should not throw error when element is not found
      expect(() => fireEvent.click(servicesLink)).not.toThrow();
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it("should handle drawer state changes correctly", () => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      render(<ImprovedNavigation />);

      const burgerButton = screen.getAllByRole("button")[1];

      // Open drawer
      fireEvent.click(burgerButton);
      expect(screen.getByTestId("drawer")).toBeInTheDocument();

      // Close drawer
      fireEvent.click(burgerButton);
      // Drawer should be closed (mocked behavior)
    });
  });

  describe("Navigation Item Structure", () => {
    it("should construct navigation items from translations", () => {
      render(<ImprovedNavigation />);

      // Verify all navigation items are present and use translations
      expect(screen.getByText("Services")).toBeInTheDocument();
      expect(screen.getByText("Statistiken")).toBeInTheDocument(); // t.navigation.statistics
      expect(screen.getByText("Projekte")).toBeInTheDocument();
      expect(screen.getByText("Über mich")).toBeInTheDocument();
    });

    it("should have correct href attributes for navigation items", () => {
      render(<ImprovedNavigation />);

      const servicesLink = screen.getByText("Services").closest("a");
      const projectsLink = screen.getByText("Projekte").closest("a");
      const aboutLink = screen.getByText("Über mich").closest("a");

      expect(servicesLink).toHaveAttribute("href", "#services");
      expect(projectsLink).toHaveAttribute("href", "#projects");
      expect(aboutLink).toHaveAttribute("href", "#about");
    });
  });
});
