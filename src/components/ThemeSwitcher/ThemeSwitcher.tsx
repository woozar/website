import { Button } from "@mantine/core";

import { IconMoon, IconSun } from "@tabler/icons-react";

import { useTranslation } from "@/hooks/useTranslation";
import { useThemeStore } from "@/stores/themeStore";

interface ThemeSwitcherProps {
  variant?: "desktop" | "mobile";
}

export const ThemeSwitcher = ({ variant = "desktop" }: ThemeSwitcherProps) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();

  const isDark = theme === "dark";
  const Icon = isDark ? IconSun : IconMoon;

  const buttonStyle = {
    borderColor: "var(--primary-orange)",
    color: "var(--primary-orange)",
    background: "transparent",
    border: "1px solid var(--primary-orange)",
    borderRadius: "0.5rem",
  };

  const hoverStyle = {
    "&:hover": {
      background: "rgba(255, 107, 53, 0.08)",
      transform: "translateY(-1px)",
    },
  };

  const transitionStyle = {
    transition: "all 0.2s ease",
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  };

  if (variant === "mobile") {
    return (
      <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          leftSection={<IconSun size={16} />}
          onClick={() => theme !== "light" && toggleTheme()}
          style={{
            borderColor: "var(--primary-orange)",
            color: theme === "light" ? "white" : "var(--primary-orange)",
            background:
              theme === "light"
                ? "linear-gradient(135deg, var(--primary-orange), var(--primary-red))"
                : "transparent",
          }}
        >
          {t.theme.light}
        </Button>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          leftSection={<IconMoon size={16} />}
          onClick={() => theme !== "dark" && toggleTheme()}
          style={{
            borderColor: "var(--primary-orange)",
            color: theme === "dark" ? "white" : "var(--primary-orange)",
            background:
              theme === "dark"
                ? "linear-gradient(135deg, var(--primary-orange), var(--primary-red))"
                : "transparent",
          }}
        >
          {t.theme.dark}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="xs"
      onClick={toggleTheme}
      style={{
        ...buttonStyle,
        ...transitionStyle,
        minWidth: "40px",
        height: "28px",
        fontSize: "1rem",
        padding: "0 8px",
      }}
      styles={{ root: { ...hoverStyle, ...transitionStyle } }}
      title={isDark ? t.theme.switchToLight : t.theme.switchToDark}
    >
      <Icon size={16} />
    </Button>
  );
};
