import { Box, Card, List, Stack, ThemeIcon, Title } from "@mantine/core";

import {
  IconAlertTriangle,
  IconBrain,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

import { Variants, motion, useReducedMotion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";

import { Grid } from "../../Layout";

interface ProblemSolutionSectionProps {
  itemVariants: Variants;
  cardVariants: Variants;
}

export const ProblemSolutionSection = ({
  itemVariants,
  cardVariants,
}: ProblemSolutionSectionProps) => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box style={{ marginTop: "2rem" }}>
      <motion.div
        key="problem-solution"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }} spacing="xl">
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
                      background: "linear-gradient(135deg, #ff6b35, #d32f2f)",
                      color: "white",
                    }}
                  >
                    <IconAlertTriangle size={28} />
                  </ThemeIcon>
                  <Title order={3} c="var(--text-primary)">
                    {t.workshop.problem.title}
                  </Title>
                </Box>
                <List
                  spacing="sm"
                  icon={
                    <ThemeIcon color="red" size={20} radius="xl">
                      <IconX size={12} />
                    </ThemeIcon>
                  }
                >
                  {t.workshop.problem.points.map(
                    (point: string, index: number) => (
                      <List.Item key={index}>{point}</List.Item>
                    )
                  )}
                </List>
              </Stack>
            </Card>
          </motion.div>

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
                      background:
                        "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                      color: "white",
                    }}
                  >
                    <IconBrain size={28} />
                  </ThemeIcon>
                  <Title order={3} c="var(--text-primary)">
                    {t.workshop.solution.title}
                  </Title>
                </Box>
                <List
                  spacing="sm"
                  icon={
                    <ThemeIcon color="green" size={20} radius="xl">
                      <IconCheck size={12} />
                    </ThemeIcon>
                  }
                >
                  {t.workshop.solution.points.map(
                    (point: string, index: number) => (
                      <List.Item key={index}>{point}</List.Item>
                    )
                  )}
                </List>
              </Stack>
            </Card>
          </motion.div>
        </Grid>
      </motion.div>
    </Box>
  );
};
