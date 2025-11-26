import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

// Mock globalThis.matchMedia
Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: "",
  thresholds: [],
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
});

// Mock sessionStorage
Object.defineProperty(globalThis, "sessionStorage", {
  value: localStorageMock,
});

// Mock navigator
Object.defineProperty(globalThis, "navigator", {
  value: {
    ...globalThis.navigator,
    language: "en-US",
    languages: ["en-US", "en"],
  },
});

// Global framer-motion mock
vi.mock("framer-motion", async () => {
  const React = (await vi.importActual("react")) as any;

  const motionProps = new Set([
    "animate",
    "initial",
    "exit",
    "variants",
    "transition",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView",
    "drag",
    "dragConstraints",
    "dragElastic",
    "dragMomentum",
    "dragTransition",
    "layout",
    "layoutId",
    "layoutDependency",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDrag",
    "onDragStart",
    "onDragEnd",
    "onDirectionLock",
    "onViewportEnter",
    "onViewportLeave",
    "viewport",
  ]);

  const filterProps = (props: any) => {
    return Object.fromEntries(
      Object.entries(props).filter(([key]) => !motionProps.has(key))
    );
  };

  const createMotionComponent = (element: string) => {
    return React.forwardRef((props: any, ref: any) => {
      return React.createElement(element, { ...filterProps(props), ref });
    });
  };

  return {
    motion: {
      div: createMotionComponent("div"),
      section: createMotionComponent("section"),
      span: createMotionComponent("span"),
      h1: createMotionComponent("h1"),
      h2: createMotionComponent("h2"),
      h3: createMotionComponent("h3"),
      p: createMotionComponent("p"),
      button: createMotionComponent("button"),
      article: createMotionComponent("article"),
      aside: createMotionComponent("aside"),
      nav: createMotionComponent("nav"),
      header: createMotionComponent("header"),
      footer: createMotionComponent("footer"),
      main: createMotionComponent("main"),
      path: createMotionComponent("path"),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: vi.fn(() => false),
    useAnimation: () => ({
      start: vi.fn(),
      stop: vi.fn(),
      set: vi.fn(),
    }),
  };
});

// Setup and cleanup
beforeAll(() => {
  // Setup any global test configuration
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorageMock.clear();
});
