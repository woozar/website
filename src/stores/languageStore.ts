import { create } from "zustand";
import { persist } from "zustand/middleware";

import { isSSR } from "@/utils/environment";

export type Language = "de" | "en";

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Function to detect browser language
const detectBrowserLanguage = (): Language => {
  /* v8 ignore next */
  if (isSSR()) return "en"; // Default to English for SSR

  const browserLanguage =
    navigator.language || navigator.languages?.[0] || "en";

  // Check if browser language is English
  if (browserLanguage.toLowerCase().startsWith("en")) return "en";

  // Default to German for all other languages
  return "de";
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: detectBrowserLanguage(),
      setLanguage: (language) => set({ language }),
    }),
    { name: "language-storage" }
  )
);
