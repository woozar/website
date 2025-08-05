import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      value: originalInnerWidth,
      writable: true,
    });
  });

  it("should return correct initial state for desktop width", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 1200,
      writable: true,
    });

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current).toEqual({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  it("should return correct initial state for tablet width", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 800,
      writable: true,
    });

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current).toEqual({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });
  });

  it("should return correct initial state for mobile width", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 500,
      writable: true,
    });

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current).toEqual({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
  });

  it("should update state when window is resized to mobile", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 1200,
      writable: true,
    });

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current.isDesktop).toBe(true);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 500,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
  });

  it("should update state when window is resized to tablet", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 500,
      writable: true,
    });

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current.isMobile).toBe(true);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 800,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });
  });

  it("should update state when window is resized to desktop", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 500,
      writable: true,
    });

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current.isMobile).toBe(true);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 1200,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  it("should handle boundary conditions correctly", () => {
    // Test exact boundary at 768px (mobile/tablet boundary)
    Object.defineProperty(window, "innerWidth", {
      value: 767,
      writable: true,
    });

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current.isMobile).toBe(true);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 768,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isTablet).toBe(true);

    // Test exact boundary at 1024px (tablet/desktop boundary)
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 1023,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isTablet).toBe(true);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 1024,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isDesktop).toBe(true);
  });

  it("should remove event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useMediaQuery());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });

  it("should handle multiple resize events correctly", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 1200,
      writable: true,
    });

    const { result } = renderHook(() => useMediaQuery());

    expect(result.current.isDesktop).toBe(true);

    // Multiple rapid resize events
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 500,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isMobile).toBe(true);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 800,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isTablet).toBe(true);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 1200,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isDesktop).toBe(true);
  });
});
