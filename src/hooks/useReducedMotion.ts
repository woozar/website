import { useMemo } from "react";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

import { isSSR } from "../utils/environment";

/**
 * Enhanced useReducedMotion hook that combines system preference with URL query parameter control
 * Supports ?no-motion to disable animations regardless of system settings
 * Examples:
 * - ?no-motion (enables motion reduction)
 * - ?no-motion=1 (enables motion reduction)
 * - ?no-motion=true (enables motion reduction)
 * - ?no-motion=false (disables motion reduction)
 * - ?no-motion=0 (disables motion reduction)
 * This is especially helpful for users with weak devices or slow connections
 *
 * @returns boolean - true if motion should be reduced, false otherwise (defaults to false if unable to determine)
 */
export const useReducedMotion = (): boolean => {
  const systemReducedMotion = useFramerReducedMotion();

  const shouldReduceMotion = useMemo(() => {
    /* v8 ignore next */
    if (isSSR()) return systemReducedMotion ?? false;

    // Check for query parameter
    const urlParams = new URLSearchParams(globalThis.location.search);

    if (urlParams.has("no-motion")) {
      const noMotionParam = urlParams.get("no-motion");
      // If no-motion parameter is present, it overrides system preference
      // Only "false" and "0" explicitly disable motion reduction
      return noMotionParam !== "false" && noMotionParam !== "0";
    }

    // If no query parameter, use system preference (default to false if null)
    return systemReducedMotion ?? false;
  }, [systemReducedMotion]);

  return shouldReduceMotion;
};
