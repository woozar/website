import { ReactNode, useEffect } from "react";

import { MantineProvider, createTheme } from "@mantine/core";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { useThemeStore } from "./stores/themeStore";

const theme = createTheme({
  colors: {
    orange: [
      "#fff4e6",
      "#ffe8cc",
      "#ffd09b",
      "#ffb366",
      "#ff9c39",
      "#ff8a1a",
      "#ff6b35",
      "#e55a2b",
      "#cc4e24",
      "#b8421a",
    ],
    red: [
      "#ffebee",
      "#ffcdd2",
      "#ef9a9a",
      "#e57373",
      "#ef5350",
      "#f44336",
      "#d32f2f",
      "#c62828",
      "#b71c1c",
      "#a51b1b",
    ],
  },
  primaryColor: "orange",
});

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: Readonly<AppProviderProps>) {
  const currentTheme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Set initial data attribute on mount
    if (document) document.documentElement.dataset.theme = currentTheme;
  }, [currentTheme]);

  return (
    <MantineProvider theme={theme} forceColorScheme={currentTheme}>
      {children}
    </MantineProvider>
  );
}

export function ThemedApp() {
  return (
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  );
}
