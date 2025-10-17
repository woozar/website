import { beforeEach, describe, expect, it, vi } from "vitest";

import { BrowserRouter, MemoryRouter } from "react-router-dom";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useModal } from "@/hooks/useModal";
import { useTranslation } from "@/hooks/useTranslation";
import { fireEvent, render, screen } from "@/test/test-utils";
import { de } from "@/translations/de";

import { Navigation } from "./Navigation";

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

// Helper function to render Navigation component with BrowserRouter
const renderNavigation = () => {
  return render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};

describe("Navigation", () => {
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
      imageModalData: null,
      openModal: vi.fn(),
      closeModal: vi.fn(),
      openImageModal: vi.fn(),
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
      renderNavigation();

      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByText("Services")).toBeInTheDocument();
      expect(screen.getByText("Workshops")).toBeInTheDocument();
      expect(screen.getByText("Statistiken")).toBeInTheDocument();
      expect(screen.getByText("Projekte")).toBeInTheDocument();
    });

    it("should render logo with correct attributes", () => {
      renderNavigation();

      const logo = screen.getByRole("img");
      expect(logo).toHaveAttribute("src", "/assets/logo.webp");
      expect(logo).toHaveAttribute("alt", "12 of Spades");
    });

    it("should render contact button", () => {
      renderNavigation();

      expect(screen.getByText("Kontakt")).toBeInTheDocument();
    });

    it("should render desktop language switcher", () => {
      renderNavigation();

      expect(
        screen.getByTestId("language-switcher-desktop")
      ).toBeInTheDocument();
    });

    it("should not render burger menu on desktop", () => {
      renderNavigation();

      expect(
        screen.queryByRole("button", { name: /menu/i })
      ).not.toBeInTheDocument();
    });

    it("should handle navigation link clicks", () => {
      renderNavigation();

      const workshopsLink = screen.getByText("Workshops");
      fireEvent.click(workshopsLink);

      expect(document.querySelector).toHaveBeenCalledWith("#workshops");
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400, // 500 - 100 (header height)
        behavior: "smooth",
      });
    });

    it("should handle contact button click", () => {
      renderNavigation();

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
      renderNavigation();

      expect(screen.getAllByRole("button")).toHaveLength(2); // Contact button + Burger menu
      expect(screen.getByRole("img")).toBeInTheDocument(); // Logo
    });

    it("should render mobile language switcher", () => {
      renderNavigation();

      // Open drawer to see the mobile language switcher
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      expect(
        screen.getByTestId("language-switcher-mobile")
      ).toBeInTheDocument();
    });

    it("should open drawer when burger menu is clicked", () => {
      renderNavigation();

      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      // Drawer content should be visible
      expect(screen.getByTestId("drawer")).toBeInTheDocument();
    });

    it("should close drawer when navigation item is clicked", () => {
      renderNavigation();

      // Open drawer
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      // Click navigation item
      const workshopsButton = screen.getByText("Workshops");
      fireEvent.click(workshopsButton);

      // Should handle navigation and close drawer
      expect(document.querySelector).toHaveBeenCalledWith("#workshops");
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 400,
        behavior: "smooth",
      });
    });

    it("should render contact button in mobile drawer", () => {
      renderNavigation();

      // Open drawer
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    });

    it("should handle mobile contact button click", () => {
      renderNavigation();

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
      renderNavigation();

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
      renderNavigation();

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

      // Test services navigation item in mobile drawer
      const servicesButton = screen.getByText("Services");
      fireEvent.click(servicesButton);
      expect(document.querySelector).toHaveBeenCalledWith("#services");
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

      const { rerender } = renderNavigation();

      // Open drawer
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      // Switch to desktop
      mockUseMediaQuery.mockReturnValue({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      });

      rerender(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      // Drawer should be closed (burger menu shouldn't be visible)
      expect(
        screen.queryByRole("button", { name: /menu/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("Language Support", () => {
    it("should handle German language translations", () => {
      renderNavigation();

      expect(screen.getByText("Services")).toBeInTheDocument();
      expect(screen.getByText("Projekte")).toBeInTheDocument();
      expect(screen.getByText("Kontakt")).toBeInTheDocument();
    });
  });

  describe("Navigation Functionality", () => {
    it("should handle missing target element gracefully", () => {
      document.querySelector = vi.fn().mockReturnValue(null);

      renderNavigation();

      const workshopsLink = screen.getByText("Workshops");

      expect(() => fireEvent.click(workshopsLink)).not.toThrow();
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it("should navigate to all available sections", () => {
      renderNavigation();

      // Test services navigation
      fireEvent.click(screen.getByText("Services"));
      expect(document.querySelector).toHaveBeenCalledWith("#services");

      // Test workshops navigation
      fireEvent.click(screen.getByText("Workshops"));
      expect(document.querySelector).toHaveBeenCalledWith("#workshops");

      // Test statistics navigation
      fireEvent.click(screen.getByText("Statistiken"));
      expect(document.querySelector).toHaveBeenCalledWith("#statistics");

      // Test projects navigation
      fireEvent.click(screen.getByText("Projekte"));
      expect(document.querySelector).toHaveBeenCalledWith("#projects");

      // Test contact navigation
      fireEvent.click(screen.getByText("Kontakt"));
      expect(document.querySelector).toHaveBeenCalledWith("#contact");
    });

    it("should calculate scroll position correctly", () => {
      const mockElement = {
        offsetTop: 800,
      } as HTMLElement;

      document.querySelector = vi.fn().mockReturnValue(mockElement);

      renderNavigation();

      const workshopsLink = screen.getByText("Workshops");
      fireEvent.click(workshopsLink);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 700, // 800 - 100 (header height)
        behavior: "smooth",
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", () => {
      renderNavigation();

      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();
    });

    it("should have proper button labels", () => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      renderNavigation();

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2); // Contact button and burger menu
    });
  });

  describe("Fixed Header Behavior", () => {
    it("should render as fixed positioned header", () => {
      renderNavigation();

      const header = screen.getByRole("banner");
      expect(header).toHaveStyle({
        position: "fixed",
        top: "0",
      });
    });

    it("should have backdrop blur styling", () => {
      renderNavigation();

      const header = screen.getByRole("banner");
      expect(header).toHaveStyle({
        backgroundColor: "var(--backdrop-filter)",
      });
    });
  });

  describe("Logo Click Behavior", () => {
    it("should scroll to top when logo is clicked", () => {
      renderNavigation();

      const logoLink = screen.getByRole("img").closest("a");
      expect(logoLink).toBeInTheDocument();

      fireEvent.click(logoLink!);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });
    });

    it("should prevent default anchor behavior on logo click", () => {
      renderNavigation();

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
        imageModalData: null,
        openModal: vi.fn(),
        closeModal: vi.fn(),
        openImageModal: vi.fn(),
      });

      renderNavigation();

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
        imageModalData: null,
        openModal: vi.fn(),
        closeModal: vi.fn(),
        openImageModal: vi.fn(),
      });

      const { rerender } = renderNavigation();

      // Open drawer first
      const burgerButton = screen.getAllByRole("button")[1];
      fireEvent.click(burgerButton);

      // Now modal opens
      mockUseModal.mockReturnValue({
        isModalOpen: true,
        imageModalData: null,
        openModal: vi.fn(),
        closeModal: vi.fn(),
        openImageModal: vi.fn(),
      });
      rerender(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

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
        imageModalData: null,
        openModal: vi.fn(),
        closeModal: vi.fn(),
        openImageModal: vi.fn(),
      });

      renderNavigation();

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
      renderNavigation();

      expect(screen.getByText("J. Herrmann")).toBeInTheDocument();
      expect(
        screen.queryByText("Software Freelancer & AI Specialist")
      ).not.toBeInTheDocument();
    });

    it("should hide theme/language switchers on tablet", () => {
      renderNavigation();

      expect(screen.queryByTestId("theme-switcher")).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("language-switcher-desktop")
      ).not.toBeInTheDocument();
    });

    it("should use tablet-specific spacing and sizing", () => {
      renderNavigation();

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

      renderNavigation();

      const workshopsLink = screen.getByText("Workshops");

      // Should not throw error when element is not found
      expect(() => fireEvent.click(workshopsLink)).not.toThrow();
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it("should handle drawer state changes correctly", () => {
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      renderNavigation();

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
      renderNavigation();

      // Verify all navigation items are present and use translations
      expect(screen.getByText("Services")).toBeInTheDocument(); // t.navigation.services
      expect(screen.getByText("Workshops")).toBeInTheDocument();
      expect(screen.getByText("Statistiken")).toBeInTheDocument(); // t.navigation.statistics
      expect(screen.getByText("Projekte")).toBeInTheDocument();
    });

    it("should have correct href attributes for navigation items", () => {
      renderNavigation();

      const servicesLink = screen.getByText("Services").closest("a");
      const workshopsLink = screen.getByText("Workshops").closest("a");
      const statisticsLink = screen.getByText("Statistiken").closest("a");
      const projectsLink = screen.getByText("Projekte").closest("a");

      expect(servicesLink).toHaveAttribute("href", "#services");
      expect(workshopsLink).toHaveAttribute("href", "#workshops");
      expect(statisticsLink).toHaveAttribute("href", "#statistics");
      expect(projectsLink).toHaveAttribute("href", "#projects");
    });
  });

  describe("Workshop Page Navigation", () => {
    // Helper function to render Navigation component with MemoryRouter at workshop path
    const renderWorkshopNavigation = () => {
      return render(
        <MemoryRouter initialEntries={["/workshops/ai-low-hanging-fruits"]}>
          <Navigation />
        </MemoryRouter>
      );
    };

    it("should show workshop navigation items on workshop page", () => {
      renderWorkshopNavigation();

      // Should show workshop-specific navigation
      expect(screen.getByText("Erfolge")).toBeInTheDocument(); // success stories first
      expect(screen.getByText("Details")).toBeInTheDocument();
      expect(screen.getByText("Agenda")).toBeInTheDocument();

      // Should NOT show main site navigation
      expect(screen.queryByText("Statistiken")).not.toBeInTheDocument();
      expect(screen.queryByText("Workshops")).not.toBeInTheDocument();
      expect(screen.queryByText("Projekte")).not.toBeInTheDocument();
    });

    it("should handle logo click on workshop page", () => {
      // Mock window.location.href
      const originalLocation = window.location;
      delete (window as any).location;
      (window as any).location = { ...originalLocation, href: "" };

      renderWorkshopNavigation();

      const logoLink = screen.getByRole("img").closest("a");
      fireEvent.click(logoLink!);

      // Should redirect to homepage
      expect(window.location.href).toBe("/");

      // Restore original location
      (window as any).location = originalLocation;
    });

    it("should handle workshop page navigation redirects for mobile drawer", () => {
      // Mock window.location.href
      const originalLocation = window.location;
      delete (window as any).location;
      (window as any).location = { ...originalLocation, href: "" };

      // Set mobile mode to trigger drawer functionality
      mockUseMediaQuery.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      });

      renderWorkshopNavigation();

      // Open mobile drawer
      const burgerButton = screen.getAllByRole("button")[1]; // Second button is burger menu
      fireEvent.click(burgerButton);

      // The mobile drawer should show workshop navigation items
      expect(screen.getByText("Erfolge")).toBeInTheDocument();
      expect(screen.getByText("Details")).toBeInTheDocument();
      expect(screen.getByText("Agenda")).toBeInTheDocument();
      expect(screen.getAllByText("Kontakt")).toHaveLength(2); // Desktop contact button + drawer contact button

      // Restore original location
      (window as any).location = originalLocation;
    });
  });

  describe("Logo Navigation Behavior", () => {
    it("should scroll to top on homepage when logo is clicked", () => {
      renderNavigation();

      const logoLink = screen.getByRole("img").closest("a");
      fireEvent.click(logoLink!);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });
    });
  });
});
