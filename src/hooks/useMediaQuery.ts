import { useEffect, useState } from "react";

import { MediaQueries } from "../types";

export const useMediaQuery = (): MediaQueries => {
  const [mediaQueries, setMediaQueries] = useState<MediaQueries>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const updateMediaQueries = () => {
      const width = window.innerWidth;
      setMediaQueries({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    updateMediaQueries();
    window.addEventListener("resize", updateMediaQueries);

    return () => window.removeEventListener("resize", updateMediaQueries);
  }, []);

  return mediaQueries;
};
