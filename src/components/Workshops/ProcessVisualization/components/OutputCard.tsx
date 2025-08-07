import { Card, Stack, Text } from "@mantine/core";

import { motion } from "framer-motion";

import type { StoryData } from "@/types";

import { createBoxVariants } from "../animations";
import { BenefitsList } from "./BenefitsList";

interface OutputCardProps {
  output: StoryData["output"];
  delayOffset: number;
  shouldReduceMotion: boolean;
}

export const OutputCard = ({
  output,
  delayOffset,
  shouldReduceMotion,
}: OutputCardProps) => {
  const boxVariants = createBoxVariants(shouldReduceMotion);

  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: delayOffset }}
      style={{ width: "100%" }}
    >
      <Card
        padding="lg"
        radius="lg"
        withBorder
        style={{
          borderColor: "var(--primary-red)",
          backgroundColor: "var(--background-primary)",
          borderWidth: "2px",
        }}
      >
        <Stack gap="md">
          <Text size="md" fw={600} c="var(--text-primary)">
            {output.title}
          </Text>
          <Text
            size="xs"
            c="var(--text-secondary)"
            style={{ lineHeight: 1.4, textAlign: "left" }}
          >
            {output.description}
          </Text>

          {/* Render benefits if available */}
          {output.benefits && <BenefitsList benefits={output.benefits} />}
        </Stack>
      </Card>
    </motion.div>
  );
};
