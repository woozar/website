import { ReactNode } from "react";

import { Box } from "@mantine/core";

interface ContainerProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export const Container = ({
  children,
  size = "xl",
  className,
}: ContainerProps) => {
  const maxWidths = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    full: "100%",
  };

  return (
    <Box
      className={className}
      style={{
        maxWidth: maxWidths[size],
        margin: "0 auto",
        padding: "0 1rem",
        width: "100%",
      }}
      __vars={{
        "--container-padding-mobile": "1rem",
        "--container-padding-tablet": "1.5rem",
        "--container-padding-desktop": "2rem",
      }}
    >
      {children}
    </Box>
  );
};
