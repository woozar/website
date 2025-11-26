import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Target, Variant } from "framer-motion";

import {
  useButtonVariants,
  useCardVariants,
  useChipVariants,
  useContainerVariants,
  useFadeVariants,
  useHoverVariants,
  useItemVariants,
  useModalVariants,
  useScaleRotateVariants,
  useWhileHover,
  useWhileTap,
} from "./useAnimations";
import { useReducedMotion } from "./useReducedMotion";

// Mock useReducedMotion hook
vi.mock("./useReducedMotion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

/**
 * Helper function to cast Variant to Target for test assertions.
 */
const asTarget = (variant: Variant): Target => variant as Target;

describe("animation hooks", () => {
  beforeEach(() => {
    mockedUseReducedMotion.mockReturnValue(false);
  });

  describe("useItemVariants", () => {
    it("should create variants with animations when shouldReduceMotion is false", () => {
      const { result } = renderHook(() => useItemVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 0,
        y: 20,
      });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    });

    it("should create variants without animations when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useItemVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 1,
        y: 0,
      });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        y: 0,
        transition: {},
      });
    });

    it("should apply custom options", () => {
      const { result } = renderHook(() =>
        useItemVariants({
          y: 30,
          duration: 0.8,
          ease: "easeIn",
        })
      );
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 0,
        y: 30,
      });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeIn" },
      });
    });
  });

  describe("useCardVariants", () => {
    it("should create variants with animations when shouldReduceMotion is false", () => {
      const { result } = renderHook(() => useCardVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 0,
        y: 40,
        scale: 0.95,
      });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    });

    it("should create variants without animations when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useCardVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
      });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {},
      });
    });

    it("should apply custom options", () => {
      const { result } = renderHook(() =>
        useCardVariants({
          y: 50,
          scale: 0.9,
          duration: 0.8,
          ease: "easeInOut",
        })
      );
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 0,
        y: 50,
        scale: 0.9,
      });
      const visible = asTarget(variants.visible) as Record<string, unknown>;
      expect((visible.transition as Record<string, unknown>).duration).toBe(
        0.8
      );
      expect((visible.transition as Record<string, unknown>).ease).toBe(
        "easeInOut"
      );
    });
  });

  describe("useContainerVariants", () => {
    it("should create variants with stagger when shouldReduceMotion is false", () => {
      const { result } = renderHook(() => useContainerVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({ opacity: 0 });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      });
    });

    it("should create variants without animations when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useContainerVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({ opacity: 1 });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        transition: {},
      });
    });

    it("should apply custom stagger options", () => {
      const { result } = renderHook(() =>
        useContainerVariants({
          staggerChildren: 0.3,
          delayChildren: 0.5,
        })
      );
      const variants = result.current;

      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
          delayChildren: 0.5,
        },
      });
    });
  });

  describe("useModalVariants", () => {
    it("should create variants with spring animation when shouldReduceMotion is false", () => {
      const { result } = renderHook(() => useModalVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 0,
        scale: 0.8,
        y: 50,
      });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 300,
          duration: 0.4,
        },
      });
      expect(asTarget(variants.exit)).toEqual({
        opacity: 0,
        scale: 0.8,
        y: 50,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      });
    });

    it("should create variants without animations when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useModalVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 1,
        scale: 1,
        y: 0,
      });
      const visible = asTarget(variants.visible) as Record<string, unknown>;
      const exit = asTarget(variants.exit) as Record<string, unknown>;
      expect(visible.transition).toEqual({});
      expect(exit.transition).toEqual({});
    });

    it("should apply custom options", () => {
      const { result } = renderHook(() =>
        useModalVariants({
          y: 100,
          scale: 0.5,
          damping: 30,
          stiffness: 400,
          duration: 0.6,
        })
      );
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 0,
        scale: 0.5,
        y: 100,
      });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 30,
          stiffness: 400,
          duration: 0.6,
        },
      });
      expect(asTarget(variants.exit)).toEqual({
        opacity: 0,
        scale: 0.5,
        y: 100,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      });
    });
  });

  describe("useFadeVariants", () => {
    it("should create fade variants when shouldReduceMotion is false", () => {
      const { result } = renderHook(() => useFadeVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({ opacity: 0 });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        transition: { duration: 0.6 },
      });
    });

    it("should create variants without animations when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useFadeVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({ opacity: 1 });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        transition: {},
      });
    });

    it("should apply custom duration", () => {
      const { result } = renderHook(() => useFadeVariants({ duration: 1.0 }));
      const variants = result.current;

      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        transition: { duration: 1.0 },
      });
    });
  });

  describe("useHoverVariants", () => {
    it("should create hover variants with animations when shouldReduceMotion is false", () => {
      const { result } = renderHook(() => useHoverVariants());
      const variants = result.current;

      expect(asTarget(variants.rest)).toEqual({ scale: 1, y: 0 });
      expect(asTarget(variants.hover)).toEqual({
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3 },
      });
    });

    it("should create hover variants without animations when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useHoverVariants());
      const variants = result.current;

      expect(asTarget(variants.rest)).toEqual({ scale: 1, y: 0 });
      expect(asTarget(variants.hover)).toEqual({
        scale: 1,
        y: 0,
        transition: {},
      });
    });

    it("should apply custom options", () => {
      const { result } = renderHook(() =>
        useHoverVariants({ scale: 1.1, y: -10, duration: 0.5 })
      );
      const variants = result.current;

      expect(asTarget(variants.hover)).toEqual({
        scale: 1.1,
        y: -10,
        transition: { duration: 0.5 },
      });
    });
  });

  describe("useScaleRotateVariants", () => {
    it("should create scale/rotate variants when shouldReduceMotion is false", () => {
      const { result } = renderHook(() => useScaleRotateVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 0,
        scale: 0.8,
        rotate: -5,
      });
      expect(asTarget(variants.visible)).toEqual({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 1, ease: "easeOut" },
      });
    });

    it("should create variants without animations when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useScaleRotateVariants());
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 1,
        scale: 1,
        rotate: 0,
      });
    });

    it("should apply custom options", () => {
      const { result } = renderHook(() =>
        useScaleRotateVariants({ scale: 0.5, rotate: 10, duration: 2 })
      );
      const variants = result.current;

      expect(asTarget(variants.hidden)).toEqual({
        opacity: 0,
        scale: 0.5,
        rotate: 10,
      });
    });
  });

  describe("useButtonVariants", () => {
    it("should create button variants when shouldReduceMotion is false", () => {
      const { result } = renderHook(() => useButtonVariants());
      const variants = result.current;

      expect(asTarget(variants.rest)).toEqual({ scale: 1 });
      expect(asTarget(variants.hover)).toEqual({
        scale: 1.05,
        transition: { duration: 0.2 },
      });
      expect(asTarget(variants.tap)).toEqual({ scale: 0.95 });
    });

    it("should create variants without animations when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useButtonVariants());
      const variants = result.current;

      expect(asTarget(variants.hover)).toEqual({
        scale: 1,
        transition: {},
      });
      expect(asTarget(variants.tap)).toEqual({ scale: 1 });
    });

    it("should apply custom options", () => {
      const { result } = renderHook(() =>
        useButtonVariants({ hoverScale: 1.1, tapScale: 0.9, duration: 0.3 })
      );
      const variants = result.current;

      expect(asTarget(variants.hover)).toEqual({
        scale: 1.1,
        transition: { duration: 0.3 },
      });
      expect(asTarget(variants.tap)).toEqual({ scale: 0.9 });
    });
  });

  describe("useChipVariants", () => {
    it("should create chip variants with spring transition when shouldReduceMotion is false", () => {
      const { result } = renderHook(() => useChipVariants());
      const { variants, transition } = result.current;

      expect(asTarget(variants.idle)).toEqual({ scale: 1 });
      expect(asTarget(variants.hover)).toEqual({ scale: 1.05 });
      expect(asTarget(variants.tap)).toEqual({ scale: 0.95 });
      expect(transition).toEqual({
        type: "spring",
        stiffness: 400,
        damping: 17,
      });
    });

    it("should create variants without animations when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useChipVariants());
      const { variants, transition } = result.current;

      expect(asTarget(variants.hover)).toEqual({ scale: 1 });
      expect(asTarget(variants.tap)).toEqual({ scale: 1 });
      expect(transition).toEqual({});
    });

    it("should apply custom options", () => {
      const { result } = renderHook(() =>
        useChipVariants({
          hoverScale: 1.1,
          tapScale: 0.8,
          stiffness: 500,
          damping: 20,
        })
      );
      const { variants, transition } = result.current;

      expect(asTarget(variants.hover)).toEqual({ scale: 1.1 });
      expect(asTarget(variants.tap)).toEqual({ scale: 0.8 });
      expect(transition).toEqual({
        type: "spring",
        stiffness: 500,
        damping: 20,
      });
    });
  });

  describe("useWhileHover", () => {
    it("should return card hover props", () => {
      const { result } = renderHook(() => useWhileHover({ type: "card" }));

      expect(result.current).toEqual({
        y: -8,
        transition: { duration: 0.3 },
      });
    });

    it("should return button hover props", () => {
      const { result } = renderHook(() => useWhileHover({ type: "button" }));

      expect(result.current).toEqual({
        scale: 1.05,
        transition: { duration: 0.2 },
      });
    });

    it("should return icon hover props", () => {
      const { result } = renderHook(() => useWhileHover({ type: "icon" }));

      expect(result.current).toEqual({
        scale: 1.1,
        transition: { duration: 0.2 },
      });
    });

    it("should return social hover props with rotate", () => {
      const { result } = renderHook(() => useWhileHover({ type: "social" }));

      expect(result.current).toEqual({
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 },
      });
    });

    it("should return empty object when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useWhileHover({ type: "card" }));

      expect(result.current).toEqual({});
    });
  });

  describe("useWhileTap", () => {
    it("should return tap props when shouldReduceMotion is false", () => {
      const { result } = renderHook(() => useWhileTap());

      expect(result.current).toEqual({ scale: 0.95 });
    });

    it("should return empty object when shouldReduceMotion is true", () => {
      mockedUseReducedMotion.mockReturnValue(true);
      const { result } = renderHook(() => useWhileTap());

      expect(result.current).toEqual({});
    });
  });

  describe("integration", () => {
    it("should create consistent opacity behavior across all hooks", () => {
      const { result: itemResult } = renderHook(() => useItemVariants());
      const { result: cardResult } = renderHook(() => useCardVariants());
      const { result: containerResult } = renderHook(() =>
        useContainerVariants()
      );
      const { result: modalResult } = renderHook(() => useModalVariants());
      const { result: fadeResult } = renderHook(() => useFadeVariants());

      // All should start with opacity 0 when not reducing motion
      expect(asTarget(itemResult.current.hidden).opacity).toBe(0);
      expect(asTarget(cardResult.current.hidden).opacity).toBe(0);
      expect(asTarget(containerResult.current.hidden).opacity).toBe(0);
      expect(asTarget(modalResult.current.hidden).opacity).toBe(0);
      expect(asTarget(fadeResult.current.hidden).opacity).toBe(0);

      // All should end with opacity 1
      expect(asTarget(itemResult.current.visible).opacity).toBe(1);
      expect(asTarget(cardResult.current.visible).opacity).toBe(1);
      expect(asTarget(containerResult.current.visible).opacity).toBe(1);
      expect(asTarget(modalResult.current.visible).opacity).toBe(1);
      expect(asTarget(fadeResult.current.visible).opacity).toBe(1);
    });

    it("should create consistent reduced motion behavior", () => {
      mockedUseReducedMotion.mockReturnValue(true);

      const { result: itemResult } = renderHook(() => useItemVariants());
      const { result: cardResult } = renderHook(() => useCardVariants());
      const { result: containerResult } = renderHook(() =>
        useContainerVariants()
      );
      const { result: modalResult } = renderHook(() => useModalVariants());
      const { result: fadeResult } = renderHook(() => useFadeVariants());

      // All should have opacity 1 when reducing motion
      expect(asTarget(itemResult.current.hidden).opacity).toBe(1);
      expect(asTarget(cardResult.current.hidden).opacity).toBe(1);
      expect(asTarget(containerResult.current.hidden).opacity).toBe(1);
      expect(asTarget(modalResult.current.hidden).opacity).toBe(1);
      expect(asTarget(fadeResult.current.hidden).opacity).toBe(1);

      // All should have empty transitions
      expect(
        (asTarget(itemResult.current.visible) as Record<string, unknown>)
          .transition
      ).toEqual({});
      expect(
        (asTarget(cardResult.current.visible) as Record<string, unknown>)
          .transition
      ).toEqual({});
      expect(
        (asTarget(containerResult.current.visible) as Record<string, unknown>)
          .transition
      ).toEqual({});
      expect(
        (asTarget(modalResult.current.visible) as Record<string, unknown>)
          .transition
      ).toEqual({});
      expect(
        (asTarget(fadeResult.current.visible) as Record<string, unknown>)
          .transition
      ).toEqual({});
    });
  });
});
