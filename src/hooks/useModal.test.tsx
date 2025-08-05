import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ReactNode } from "react";

import { ModalProvider } from "../contexts/ModalContext";
import { useModal } from "./useModal";

describe("useModal", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ModalProvider>{children}</ModalProvider>
  );

  it("should return modal context when used within ModalProvider", () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    expect(result.current).toHaveProperty("isModalOpen");
    expect(result.current).toHaveProperty("openModal");
    expect(result.current).toHaveProperty("closeModal");
    expect(typeof result.current.isModalOpen).toBe("boolean");
    expect(typeof result.current.openModal).toBe("function");
    expect(typeof result.current.closeModal).toBe("function");
    expect(result.current.isModalOpen).toBe(false); // Initial state
  });

  it("should provide working openModal and closeModal functions", () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    // Initial state should be closed
    expect(result.current.isModalOpen).toBe(false);

    // Open modal
    act(() => {
      result.current.openModal();
    });
    expect(result.current.isModalOpen).toBe(true);

    // Close modal
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen).toBe(false);
  });

  it("should throw error when used outside ModalProvider", () => {
    // Suppress console.error for this test since we expect an error
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      renderHook(() => useModal());
    }).toThrow("useModal must be used within a ModalProvider");

    console.error = originalError;
  });

  it("should throw error with specific message when context is undefined", () => {
    // Suppress console.error for this test since we expect an error
    const originalError = console.error;
    console.error = vi.fn();

    try {
      renderHook(() => useModal());
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(
        "useModal must be used within a ModalProvider"
      );
    }

    console.error = originalError;
  });

  it("should maintain state across hook calls", () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    // Initial state
    expect(result.current.isModalOpen).toBe(false);

    // Open modal and verify state persists
    act(() => {
      result.current.openModal();
    });
    expect(result.current.isModalOpen).toBe(true);

    // Context functions should be available
    expect(typeof result.current.openModal).toBe("function");
    expect(typeof result.current.closeModal).toBe("function");
  });

  it("should handle rapid state changes correctly", () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    // Rapid open/close operations
    expect(result.current.isModalOpen).toBe(false);

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen).toBe(false);

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.openModal(); // Should remain open
    });
    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen).toBe(false);

    act(() => {
      result.current.closeModal(); // Should remain closed
    });
    expect(result.current.isModalOpen).toBe(false);
  });
});
