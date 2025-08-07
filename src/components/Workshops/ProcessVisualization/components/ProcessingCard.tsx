import { Box, Card, Stack, Text, ThemeIcon } from "@mantine/core";

import {
  IconClock,
  IconCurrencyEuro,
  IconRobot,
  IconSettings,
} from "@tabler/icons-react";

import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import type { StoryData } from "@/types";

import {
  createBoxVariants,
  createGearRotationVariants,
  createProcessingPulseVariants,
} from "../animations";

interface ProcessingCardProps {
  story: StoryData;
  shouldReduceMotion: boolean;
  delayOffset: number;
}

export const ProcessingCard = ({
  story,
  shouldReduceMotion,
  delayOffset,
}: ProcessingCardProps) => {
  const { t } = useTranslation();
  const boxVariants = createBoxVariants(shouldReduceMotion);
  const processingPulseVariants =
    createProcessingPulseVariants(shouldReduceMotion);
  const gearRotationVariants = createGearRotationVariants(shouldReduceMotion);

  return (
    <motion.div
      animate={processingPulseVariants}
      variants={boxVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: delayOffset }}
      style={{ width: "100%" }}
    >
      <Card
        padding="xl"
        radius="lg"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
          color: "white",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Rotating gear in top right corner */}
        <Box
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            opacity: 0.7,
          }}
        >
          <motion.div animate={gearRotationVariants}>
            <IconSettings size={20} color="white" />
          </motion.div>
        </Box>

        <Stack gap="lg" align="center">
          <ThemeIcon
            size="xl"
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            <IconRobot size={32} />
          </ThemeIcon>
          <Box>
            <Text fw={700} size="md" mb="xs">
              {story.processing.title}
            </Text>
            <Text size="sm" style={{ opacity: 0.9, lineHeight: 1.4 }}>
              {story.processing.description}
            </Text>
          </Box>
          <Box
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "12px",
              width: "100%",
            }}
          >
            <Stack gap="sm">
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <IconClock size={16} />
                  <Text size="xs" fw={500}>
                    {t.workshop.successStories.labels.effort}
                  </Text>
                </Box>
                <Text size="xs" fw={600}>
                  {story.implementation}
                </Text>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <IconCurrencyEuro size={16} />
                  <Text size="xs" fw={500}>
                    {t.workshop.successStories.labels.cost}
                  </Text>
                </Box>
                <Text size="xs" fw={600}>
                  {story.cost}
                </Text>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </motion.div>
  );
};
