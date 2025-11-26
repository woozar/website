import { Easing } from "motion-utils";

import { TargetAndTransition, Variants } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Creates item animation variants with opacity and y-axis movement
 */
export const useItemVariants = (options?: {
  y?: number;
  duration?: number;
  ease?: Easing;
}): Variants => {
  const shouldReduceMotion = useReducedMotion();
  const y = options?.y ?? 20;
  const duration = options?.duration ?? 0.6;
  const ease = options?.ease ?? "easeOut";

  return {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : { duration, ease },
    },
  };
};

/**
 * Creates card animation variants with opacity, y-axis movement, and scale
 */
export const useCardVariants = (options?: {
  y?: number;
  scale?: number;
  duration?: number;
  ease?: Easing;
}): Variants => {
  const shouldReduceMotion = useReducedMotion();
  const y = options?.y ?? 40;
  const scale = options?.scale ?? 0.95;
  const duration = options?.duration ?? 0.6;
  const ease = options?.ease ?? "easeOut";

  return {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : y,
      scale: shouldReduceMotion ? 1 : scale,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: shouldReduceMotion ? {} : { duration, ease },
    },
  };
};

/**
 * Creates container animation variants with stagger children
 */
export const useContainerVariants = (options?: {
  staggerChildren?: number;
  delayChildren?: number;
}): Variants => {
  const shouldReduceMotion = useReducedMotion();
  const staggerChildren = options?.staggerChildren ?? 0.1;
  const delayChildren = options?.delayChildren ?? 0.2;

  return {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? {}
        : {
            staggerChildren,
            delayChildren,
          },
    },
  };
};

/**
 * Creates modal animation variants with spring physics
 */
export const useModalVariants = (options?: {
  y?: number;
  scale?: number;
  damping?: number;
  stiffness?: number;
  duration?: number;
}): Variants => {
  const shouldReduceMotion = useReducedMotion();
  const y = options?.y ?? 50;
  const scale = options?.scale ?? 0.8;
  const damping = options?.damping ?? 25;
  const stiffness = options?.stiffness ?? 300;
  const duration = options?.duration ?? 0.4;

  return {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : scale,
      y: shouldReduceMotion ? 0 : y,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: shouldReduceMotion
        ? {}
        : {
            type: "spring",
            damping,
            stiffness,
            duration,
          },
    },
    exit: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : scale,
      y: shouldReduceMotion ? 0 : y,
      transition: shouldReduceMotion
        ? {}
        : {
            duration: 0.3,
            ease: "easeInOut",
          },
    },
  };
};

/**
 * Creates fade-only animation variants
 */
export const useFadeVariants = (options?: { duration?: number }): Variants => {
  const shouldReduceMotion = useReducedMotion();
  const duration = options?.duration ?? 0.6;

  return {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : { duration },
    },
  };
};

/**
 * Creates hover variants for interactive elements (rest/hover states)
 */
export const useHoverVariants = (options?: {
  scale?: number;
  y?: number;
  duration?: number;
}): Variants => {
  const shouldReduceMotion = useReducedMotion();
  const scale = options?.scale ?? 1.02;
  const y = options?.y ?? -8;
  const duration = options?.duration ?? 0.3;

  return {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: shouldReduceMotion ? 1 : scale,
      y: shouldReduceMotion ? 0 : y,
      transition: shouldReduceMotion ? {} : { duration },
    },
  };
};

/**
 * Creates scale and rotate variants for logo/image animations
 */
export const useScaleRotateVariants = (options?: {
  scale?: number;
  rotate?: number;
  duration?: number;
  ease?: Easing;
}): Variants => {
  const shouldReduceMotion = useReducedMotion();
  const scale = options?.scale ?? 0.8;
  const rotate = options?.rotate ?? -5;
  const duration = options?.duration ?? 1;
  const ease = options?.ease ?? "easeOut";

  return {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : scale,
      rotate: shouldReduceMotion ? 0 : rotate,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: shouldReduceMotion ? {} : { duration, ease },
    },
  };
};

/**
 * Creates button interaction variants (rest/hover/tap states)
 */
export const useButtonVariants = (options?: {
  hoverScale?: number;
  tapScale?: number;
  duration?: number;
}): Variants => {
  const shouldReduceMotion = useReducedMotion();
  const hoverScale = options?.hoverScale ?? 1.05;
  const tapScale = options?.tapScale ?? 0.95;
  const duration = options?.duration ?? 0.2;

  return {
    rest: { scale: 1 },
    hover: {
      scale: shouldReduceMotion ? 1 : hoverScale,
      transition: shouldReduceMotion ? {} : { duration },
    },
    tap: { scale: shouldReduceMotion ? 1 : tapScale },
  };
};

/**
 * Creates chip/badge interaction variants with spring physics (idle/hover/tap states)
 */
export const useChipVariants = (options?: {
  hoverScale?: number;
  tapScale?: number;
  stiffness?: number;
  damping?: number;
}): { variants: Variants; transition: object } => {
  const shouldReduceMotion = useReducedMotion();
  const hoverScale = options?.hoverScale ?? 1.05;
  const tapScale = options?.tapScale ?? 0.95;
  const stiffness = options?.stiffness ?? 400;
  const damping = options?.damping ?? 17;

  return {
    variants: {
      idle: { scale: 1 },
      hover: { scale: shouldReduceMotion ? 1 : hoverScale },
      tap: { scale: shouldReduceMotion ? 1 : tapScale },
    },
    transition: shouldReduceMotion
      ? {}
      : { type: "spring", stiffness, damping },
  };
};

/**
 * Hover type presets with consistent values
 */
type HoverType = "card" | "button" | "icon" | "social";

const HOVER_PRESETS: Record<
  HoverType,
  { y?: number; scale?: number; rotate?: number; duration: number }
> = {
  card: { y: -8, duration: 0.3 },
  button: { scale: 1.05, duration: 0.2 },
  icon: { scale: 1.1, duration: 0.2 },
  social: { scale: 1.1, rotate: 5, duration: 0.2 },
};

/**
 * Creates whileHover props for motion elements
 * Returns an object to spread directly on motion elements: whileHover={useWhileHover({ type: 'card' })}
 */
export const useWhileHover = (options: {
  type: HoverType;
}): TargetAndTransition => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return {};

  const preset = HOVER_PRESETS[options.type];
  const result: TargetAndTransition = {};

  if (preset.y !== undefined) result.y = preset.y;
  if (preset.scale !== undefined) result.scale = preset.scale;
  if (preset.rotate !== undefined) result.rotate = preset.rotate;
  result.transition = { duration: preset.duration };

  return result;
};

/**
 * Creates whileTap props for motion elements
 * Returns an object to spread directly on motion elements: whileTap={useWhileTap()}
 */
export const useWhileTap = (): TargetAndTransition => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return {};

  return { scale: 0.95 };
};
