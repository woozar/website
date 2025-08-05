import { Language } from "../stores/languageStore";
import { de } from "./de";
import { en } from "./en";

export const translations = { de, en };

export type TranslationKey = keyof typeof de;
export type Translations = typeof de;

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};
