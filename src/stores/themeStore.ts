import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Function to detect browser dark mode preference
const detectBrowserTheme = (): Theme => {
  if (typeof window !== "undefined" && window.matchMedia) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  }
  return "light";
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: detectBrowserTheme(),
      setTheme: (theme) => {
        set({ theme });
        // Update document data attribute for CSS
        document.documentElement.setAttribute("data-theme", theme);
      },
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        get().setTheme(newTheme);
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        // Ensure data attribute is set after rehydration
        if (state?.theme) {
          document.documentElement.setAttribute("data-theme", state.theme);
        }
      },
    }
  )
);
