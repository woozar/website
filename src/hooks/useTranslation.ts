import { useLanguageStore } from "../stores/languageStore";
import { getTranslation } from "../translations";

export const useTranslation = () => {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslation(language);

  return { t, language };
};
