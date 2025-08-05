import { ReactNode } from "react";

import { SimpleGrid, SimpleGridProps } from "@mantine/core";

interface GridProps extends Omit<SimpleGridProps, "cols"> {
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Grid = ({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  spacing = "md",
  ...props
}: GridProps) => {
  return (
    <SimpleGrid
      cols={{ base: cols.mobile, sm: cols.tablet, lg: cols.desktop }}
      spacing={spacing}
      {...props}
    >
      {children}
    </SimpleGrid>
  );
};
