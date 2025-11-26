/**
 * Checks if code is running in Server-Side Rendering (SSR) environment.
 *
 * This function is essential for preventing runtime errors when code that expects
 * browser APIs (window, document, localStorage, etc.) runs on the server during SSR.
 *
 * We use SSR and prerendering to generate static HTML pages that search engines
 * and other automated tools (like social media crawlers) can properly index and display.
 * This improves SEO and ensures content is immediately available without requiring
 * JavaScript execution.
 *
 * @returns true if running in SSR/prerendering (Node.js), false if running in browser
 *
 * @example
 * ```ts
 * // Prevent accessing browser APIs during SSR
 * useEffect(() => {
 *   if (isSSR()) return;
 *
 *   // Safe to use window/document here
 *   window.addEventListener('resize', handleResize);
 * }, []);
 * ```
 *
 * @example
 * ```ts
 * // Conditional logic based on environment
 * const defaultValue = isSSR() ? 'desktop' : getDeviceType();
 * ```
 */
export const isSSR = (): boolean => !globalThis.window;
