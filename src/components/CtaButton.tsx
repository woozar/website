import { ReactNode } from "react";

import { Button, ButtonProps } from "@mantine/core";

import { IconMail, IconProps } from "@tabler/icons-react";

import { useTranslation } from "@/hooks/useTranslation";

interface CtaButtonProps {
  onClick?: () => void;
  variant?: "desktop" | "mobile" | "hero" | "card";
  isTablet?: boolean;
  children?: ReactNode;
  leftSection?: ReactNode;
  size?: ButtonProps["size"];
  fullWidth?: boolean;
  component?: "button" | "a";
  href?: string;
}

function getSizeForVariant(
  variant: CtaButtonProps["variant"]
): IconProps["size"] {
  switch (variant) {
    case "mobile":
      return 16;
    case "hero":
      return 20;
    default:
      return 18;
  }
}

export const CtaButton = ({
  onClick,
  variant = "desktop",
  isTablet = false,
  children,
  leftSection,
  size,
  fullWidth = false,
  component = "button",
  href,
}: CtaButtonProps) => {
  const { t } = useTranslation();

  const defaultIcon = leftSection ?? (
    <IconMail size={getSizeForVariant(variant)} />
  );
  const buttonText = children ?? t.navigation.contact;

  // Mobile variant (small button for mobile nav)
  if (variant === "mobile") {
    return (
      <Button
        component={component}
        href={href}
        variant="filled"
        size="sm"
        leftSection={defaultIcon}
        style={{
          background:
            "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
          border: "none",
          borderRadius: "1.5rem",
        }}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    );
  }

  // Hero variant (large button for hero section)
  if (variant === "hero") {
    return (
      <Button
        component={component}
        href={href}
        size={size ?? "lg"}
        variant="filled"
        leftSection={defaultIcon}
        style={{
          background:
            "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
          border: "none",
          fontSize: "1rem",
        }}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    );
  }

  // Card variant (for workshop cards and similar)
  if (variant === "card") {
    return (
      <Button
        component={component}
        href={href}
        size={size ?? "md"}
        fullWidth={fullWidth}
        style={{
          background:
            "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
          border: "none",
        }}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    );
  }

  // Desktop variant (default for desktop nav)
  return (
    <Button
      component={component}
      href={href}
      variant="filled"
      leftSection={defaultIcon}
      style={{
        background:
          "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
        border: "none",
        fontSize: isTablet ? "0.85rem" : "0.9rem",
        fontWeight: 600,
        padding: isTablet ? "0.5rem 1rem" : "0.6rem 1.2rem",
        borderRadius: "2rem",
        boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
        transition: "all 0.2s ease",
      }}
      styles={{
        root: {
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
          },
        },
      }}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};
