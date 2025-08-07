import { describe, expect, it } from "vitest";

import {
  createBoxVariants,
  createConnectionVariants,
  createContainerVariants,
  createGearRotationVariants,
  createProcessingPulseVariants,
} from "./animations";

describe("animations", () => {
  describe("createBoxVariants", () => {
    it("should create box variants with normal motion", () => {
      const variants = createBoxVariants(false);

      expect(variants.hidden).toEqual({
        opacity: 0,
        y: 40,
        scale: 0.8,
      });

      expect(variants.visible).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      });
    });

    it("should create box variants with reduced motion", () => {
      const variants = createBoxVariants(true);

      expect(variants.hidden).toEqual({
        opacity: 0,
        y: 40,
        scale: 0.8,
      });

      expect(variants.visible).toEqual({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {},
      });
    });
  });

  describe("createConnectionVariants", () => {
    it("should create connection variants with normal motion", () => {
      const variants = createConnectionVariants(false);

      expect(variants.hidden).toEqual({
        opacity: 0,
        pathLength: 0,
        scale: 0.8,
      });

      expect(variants.visible).toEqual({
        opacity: 1,
        pathLength: 1,
        scale: 1,
        transition: {
          delay: 1.2,
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1],
          pathLength: {
            type: "spring",
            duration: 1.8,
            bounce: 0.2,
          },
        },
      });
    });

    it("should create connection variants with reduced motion", () => {
      const variants = createConnectionVariants(true);

      expect(variants.hidden).toEqual({
        opacity: 0,
        pathLength: 0,
        scale: 0.8,
      });

      expect(variants.visible).toEqual({
        opacity: 1,
        pathLength: 1,
        scale: 1,
        transition: {},
      });
    });
  });

  describe("createProcessingPulseVariants", () => {
    it("should create pulse animation with normal motion", () => {
      const variants = createProcessingPulseVariants(false);

      expect(variants).toEqual({
        scale: [1, 1.03, 1],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    });

    it("should create empty object with reduced motion", () => {
      const variants = createProcessingPulseVariants(true);
      expect(variants).toEqual({});
    });
  });

  describe("createGearRotationVariants", () => {
    it("should create rotation animation with normal motion", () => {
      const variants = createGearRotationVariants(false);

      expect(variants).toEqual({
        rotate: [0, 360],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        },
      });
    });

    it("should create empty object with reduced motion", () => {
      const variants = createGearRotationVariants(true);
      expect(variants).toEqual({});
    });
  });

  describe("createContainerVariants", () => {
    it("should create container variants with normal motion", () => {
      const variants = createContainerVariants(false);

      expect(variants.hidden).toEqual({ opacity: 0 });
      expect(variants.visible).toEqual({
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          staggerChildren: 0.15,
        },
      });
    });

    it("should create container variants with reduced motion", () => {
      const variants = createContainerVariants(true);

      expect(variants.hidden).toEqual({ opacity: 0 });
      expect(variants.visible).toEqual({
        opacity: 1,
        transition: {},
      });
    });
  });
});
