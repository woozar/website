import { Box, ThemeIcon } from "@mantine/core";

import {
  IconAlertTriangle,
  IconBrain,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

import { Variants, motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";

import { Grid } from "../../Layout";
import { ProblemSolutionCard } from "./ProblemSolutionCard";

interface ProblemSolutionSectionProps {
  itemVariants: Variants;
  cardVariants: Variants;
}

export const ProblemSolutionSection = ({
  itemVariants,
  cardVariants,
}: ProblemSolutionSectionProps) => {
  const { t } = useTranslation();

  return (
    <Box style={{ marginTop: "2rem" }}>
      <motion.div
        key="problem-solution"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }} spacing="xl">
          <ProblemSolutionCard
            title={t.workshop.problem.title}
            points={t.workshop.problem.points}
            icon={IconAlertTriangle}
            iconGradient="linear-gradient(135deg, #ff6b35, #d32f2f)"
            listIcon={
              <ThemeIcon color="red" size={20} radius="xl">
                <IconX size={12} />
              </ThemeIcon>
            }
            cardVariants={cardVariants}
          />

          <ProblemSolutionCard
            title={t.workshop.solution.title}
            points={t.workshop.solution.points}
            icon={IconBrain}
            iconGradient="linear-gradient(135deg, var(--primary-orange), var(--primary-red))"
            listIcon={
              <ThemeIcon color="green" size={20} radius="xl">
                <IconCheck size={12} />
              </ThemeIcon>
            }
            cardVariants={cardVariants}
          />
        </Grid>
      </motion.div>
    </Box>
  );
};
