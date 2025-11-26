import { Box, Card, List, Stack, ThemeIcon, Title } from "@mantine/core";

import type { IconProps } from "@tabler/icons-react";

import { Variants, motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProblemSolutionCardProps {
  title: string;
  points: string[];
  icon: React.ComponentType<IconProps>;
  iconGradient: string;
  listIcon: React.ReactNode;
  cardVariants: Variants;
}

export const ProblemSolutionCard = ({
  title,
  points,
  icon: Icon,
  iconGradient,
  listIcon,
  cardVariants,
}: ProblemSolutionCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -5,
              transition: { duration: 0.2 },
            }
      }
    >
      <Card
        shadow="sm"
        padding="xl"
        radius="lg"
        withBorder
        style={{
          height: "100%",
          borderColor: "var(--border-color)",
          backgroundColor: "var(--background-primary)",
          cursor: "default",
        }}
      >
        <Stack gap="md">
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <ThemeIcon
              size="xl"
              style={{
                background: iconGradient,
                color: "white",
              }}
            >
              <Icon size={28} />
            </ThemeIcon>
            <Title order={3} c="var(--text-primary)">
              {title}
            </Title>
          </Box>
          <List spacing="sm" icon={listIcon}>
            {points.map((point: string) => (
              <List.Item key={point}>{point}</List.Item>
            ))}
          </List>
        </Stack>
      </Card>
    </motion.div>
  );
};
