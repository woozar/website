import { Card, Stack, Text } from "@mantine/core";

import { motion } from "framer-motion";

import { createBoxVariants } from "../animations";

interface InputCardProps {
  input: {
    title: string;
    description: string;
  };
  index: number;
  shouldReduceMotion: boolean;
  layoutType: "mobile" | "desktop";
}

export const InputCard = ({
  input,
  index,
  shouldReduceMotion,
  layoutType,
}: InputCardProps) => {
  const boxVariants = createBoxVariants(shouldReduceMotion);

  const cardStyle = {
    borderColor: "var(--primary-orange)",
    backgroundColor: "var(--background-primary)",
    borderWidth: "2px",
    height: "100%",
  };

  const containerStyle =
    layoutType === "desktop"
      ? { flex: "1" } // Desktop: Gleiche Höhe durch flex
      : { flex: "1 1 250px", minWidth: "250px" }; // Mobile: Responsive width

  return (
    <motion.div
      key={`input-${index}`}
      variants={boxVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.2 }}
      style={containerStyle}
    >
      <Card padding="md" radius="lg" withBorder style={cardStyle}>
        <Stack gap="xs">
          <Text size="sm" fw={600} c="var(--text-primary)">
            {input.title}
          </Text>
          <Text size="xs" c="var(--text-secondary)" style={{ lineHeight: 1.4 }}>
            {input.description}
          </Text>
        </Stack>
      </Card>
    </motion.div>
  );
};
