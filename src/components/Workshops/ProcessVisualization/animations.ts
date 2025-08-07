import { Variants } from "framer-motion";

export const createBoxVariants = (shouldReduceMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: shouldReduceMotion
      ? {}
      : {
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
  },
});

export const createConnectionVariants = (
  shouldReduceMotion: boolean
): Variants => ({
  hidden: {
    opacity: 0,
    pathLength: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: shouldReduceMotion
      ? {}
      : {
          delay: 1.2,
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1],
          pathLength: {
            type: "spring",
            duration: 1.8,
            bounce: 0.2,
          },
        },
  },
});

export const createProcessingPulseVariants = (shouldReduceMotion: boolean) =>
  shouldReduceMotion
    ? {}
    : {
        scale: [1, 1.03, 1],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

export const createGearRotationVariants = (shouldReduceMotion: boolean) =>
  shouldReduceMotion
    ? {}
    : {
        rotate: [0, 360],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "linear" as const,
        },
      };

export const createContainerVariants = (
  shouldReduceMotion: boolean
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: shouldReduceMotion
      ? {}
      : {
          duration: 0.8,
          ease: "easeOut",
          staggerChildren: 0.15,
        },
  },
});
