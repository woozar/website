import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useContext } from "react";

import { ModalProvider } from "./ModalContext";
import { ModalContext } from "./modal-context";

// Test component to access context
const TestComponent = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("TestComponent must be used within a ModalProvider");
  }
  const { isModalOpen, openModal, closeModal } = context;

  return (
    <div>
      <div data-testid="modal-state">{isModalOpen ? "open" : "closed"}</div>
      <button onClick={openModal} data-testid="open-button">
        Open Modal
      </button>
      <button onClick={closeModal} data-testid="close-button">
        Close Modal
      </button>
    </div>
  );
};

// Test component to verify context outside provider throws error
const TestComponentWithoutProvider = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "TestComponentWithoutProvider must be used within a ModalProvider"
    );
  }
  const { isModalOpen } = context;
  return <div>{isModalOpen ? "open" : "closed"}</div>;
};

describe("ModalContext", () => {
  describe("ModalProvider", () => {
    it("should provide initial modal state as closed", () => {
      render(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");
    });

    it("should open modal when openModal is called", () => {
      render(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");

      fireEvent.click(screen.getByTestId("open-button"));

      expect(screen.getByTestId("modal-state")).toHaveTextContent("open");
    });

    it("should close modal when closeModal is called", () => {
      render(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      // First open the modal
      fireEvent.click(screen.getByTestId("open-button"));
      expect(screen.getByTestId("modal-state")).toHaveTextContent("open");

      // Then close it
      fireEvent.click(screen.getByTestId("close-button"));
      expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");
    });

    it("should handle multiple open/close operations", () => {
      render(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      const modalState = screen.getByTestId("modal-state");
      const openButton = screen.getByTestId("open-button");
      const closeButton = screen.getByTestId("close-button");

      // Initial state
      expect(modalState).toHaveTextContent("closed");

      // Open -> Close -> Open -> Close
      fireEvent.click(openButton);
      expect(modalState).toHaveTextContent("open");

      fireEvent.click(closeButton);
      expect(modalState).toHaveTextContent("closed");

      fireEvent.click(openButton);
      expect(modalState).toHaveTextContent("open");

      fireEvent.click(closeButton);
      expect(modalState).toHaveTextContent("closed");
    });

    it("should maintain modal state when already open", () => {
      render(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      const openButton = screen.getByTestId("open-button");

      // Open modal
      fireEvent.click(openButton);
      expect(screen.getByTestId("modal-state")).toHaveTextContent("open");

      // Try to open again - should remain open
      fireEvent.click(openButton);
      expect(screen.getByTestId("modal-state")).toHaveTextContent("open");
    });

    it("should maintain modal state when already closed", () => {
      render(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      const closeButton = screen.getByTestId("close-button");

      // Modal is initially closed
      expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");

      // Try to close when already closed - should remain closed
      fireEvent.click(closeButton);
      expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");
    });

    it("should render children correctly", () => {
      render(
        <ModalProvider>
          <div data-testid="child-component">Child Content</div>
        </ModalProvider>
      );

      expect(screen.getByTestId("child-component")).toHaveTextContent(
        "Child Content"
      );
    });

    it("should maintain state across re-renders of same provider", () => {
      const { rerender } = render(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      const openButton = screen.getByTestId("open-button");

      // Open modal
      fireEvent.click(openButton);
      expect(screen.getByTestId("modal-state")).toHaveTextContent("open");

      // Re-render with same provider - state should be maintained
      rerender(
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      );

      // State should be maintained as it's the same provider instance
      expect(screen.getByTestId("modal-state")).toHaveTextContent("open");
    });
  });

  describe("Context usage without provider", () => {
    it("should throw error when context is used outside provider", () => {
      // Suppress console.error for this test since we expect an error
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow();

      console.error = originalError;
    });
  });

  describe("Context value object", () => {
    it("should provide all required context properties", () => {
      let contextValue: any;

      const TestContextValue = () => {
        contextValue = useContext(ModalContext);
        return null;
      };

      render(
        <ModalProvider>
          <TestContextValue />
        </ModalProvider>
      );

      expect(contextValue).toHaveProperty("isModalOpen");
      expect(contextValue).toHaveProperty("openModal");
      expect(contextValue).toHaveProperty("closeModal");
      expect(typeof contextValue.isModalOpen).toBe("boolean");
      expect(typeof contextValue.openModal).toBe("function");
      expect(typeof contextValue.closeModal).toBe("function");
    });
  });
});
