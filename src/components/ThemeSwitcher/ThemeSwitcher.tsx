import { Button } from "@mantine/core";

import { IconMoon, IconSun } from "@tabler/icons-react";

import { motion } from "framer-motion";

import { useWhileHover, useWhileTap } from "@/hooks/useAnimations";
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

  const buttonHover = useWhileHover({ type: "button" });
  const buttonTap = useWhileTap();

  const buttonStyle = {
    borderColor: "var(--primary-orange)",
    color: "var(--primary-orange)",
    background: "transparent",
    border: "1px solid var(--primary-orange)",
    borderRadius: "0.5rem",
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
    <motion.div whileHover={buttonHover} whileTap={buttonTap}>
      <Button
        variant="outline"
        size="xs"
        onClick={toggleTheme}
        style={{
          ...buttonStyle,
          minWidth: "40px",
          height: "28px",
          fontSize: "1rem",
          padding: "0 8px",
        }}
        title={isDark ? t.theme.switchToLight : t.theme.switchToDark}
      >
        <Icon size={16} />
      </Button>
    </motion.div>
  );
};
