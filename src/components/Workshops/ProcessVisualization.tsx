import { useEffect, useState } from "react";

import { Badge, Box, Card, Group, Stack, Text, ThemeIcon } from "@mantine/core";

import {
  IconArrowRight,
  IconClock,
  IconCurrencyEuro,
  IconRobot,
  IconSettings,
} from "@tabler/icons-react";

import { Variants, motion, useReducedMotion } from "framer-motion";

import type { StoryData } from "@/types";

interface ProcessVisualizationProps {
  story: StoryData;
}

export const ProcessVisualization = ({ story }: ProcessVisualizationProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktopLayout, setIsDesktopLayout] = useState(
    () => window.innerWidth >= 1280
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopLayout(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const boxVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: shouldReduceMotion
        ? {}
        : {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1,
          },
    },
  };

  const arrowVariants: Variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: shouldReduceMotion
        ? {}
        : {
            duration: 0.4,
            delay: 0.3,
            ease: "easeOut",
          },
    },
  };

  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: "flex",
        flexDirection: isDesktopLayout ? "row" : "column",
        gap: "1rem",
        alignItems: isDesktopLayout ? "center" : "stretch",
        marginTop: "1.5rem",
      }}
    >
      {/* Input(s) */}
      <motion.div variants={boxVariants} style={{ flex: 1 }}>
        <Stack gap="sm">
          {story.inputs.map((input, index) => (
            <Card
              key={index}
              padding="md"
              radius="lg"
              withBorder
              style={{
                borderColor: "var(--primary-orange)",
                backgroundColor: "rgba(255, 107, 53, 0.05)",
              }}
            >
              <Group gap="sm" style={{ marginBottom: "0.5rem" }}>
                <ThemeIcon
                  size="sm"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                  }}
                >
                  <IconSettings size={14} />
                </ThemeIcon>
                <Text size="sm" fw={600} c="var(--text-primary)">
                  {input.title}
                </Text>
              </Group>
              <Text size="xs" c="var(--text-secondary)">
                {input.description}
              </Text>
            </Card>
          ))}
        </Stack>
      </motion.div>

      {/* Arrow */}
      <motion.div
        variants={arrowVariants}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          transform: isDesktopLayout ? "none" : "rotate(90deg)",
        }}
      >
        <ThemeIcon
          size="lg"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
          }}
        >
          <IconArrowRight size={20} />
        </ThemeIcon>
      </motion.div>

      {/* Processing */}
      <motion.div variants={boxVariants} style={{ flex: 1 }}>
        <Card
          padding="md"
          radius="lg"
          withBorder
          style={{
            borderColor: "var(--text-secondary)",
            backgroundColor: "var(--background-secondary)",
            textAlign: "center",
          }}
        >
          <Group
            gap="sm"
            style={{ marginBottom: "0.5rem", justifyContent: "center" }}
          >
            <ThemeIcon
              size="sm"
              color="gray"
              style={{ backgroundColor: "var(--text-secondary)" }}
            >
              <IconRobot size={14} />
            </ThemeIcon>
            <Text size="sm" fw={600} c="var(--text-primary)">
              {story.processing.title}
            </Text>
          </Group>
          <Text size="xs" c="var(--text-secondary)">
            {story.processing.description}
          </Text>
        </Card>
      </motion.div>

      {/* Arrow */}
      <motion.div
        variants={arrowVariants}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          transform: isDesktopLayout ? "none" : "rotate(90deg)",
        }}
      >
        <ThemeIcon
          size="lg"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
          }}
        >
          <IconArrowRight size={20} />
        </ThemeIcon>
      </motion.div>

      {/* Output */}
      <motion.div variants={boxVariants} style={{ flex: 1 }}>
        <Card
          padding="md"
          radius="lg"
          withBorder
          style={{
            borderColor: "var(--primary-red)",
            backgroundColor: "rgba(211, 47, 47, 0.05)",
          }}
        >
          <Group gap="sm" style={{ marginBottom: "0.5rem" }}>
            <ThemeIcon
              size="sm"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
              }}
            >
              <IconSettings size={14} />
            </ThemeIcon>
            <Text size="sm" fw={600} c="var(--text-primary)">
              {story.output.title}
            </Text>
          </Group>
          <Text
            size="xs"
            c="var(--text-secondary)"
            style={{ marginBottom: "0.5rem" }}
          >
            {story.output.description}
          </Text>
          {story.output.benefits && (
            <>
              {Array.isArray(story.output.benefits) ? (
                <Stack gap={4}>
                  {story.output.benefits.map((benefit, index) => (
                    <Badge
                      key={index}
                      size="xs"
                      variant="light"
                      color="green"
                      style={{ textAlign: "left" }}
                    >
                      {benefit}
                    </Badge>
                  ))}
                </Stack>
              ) : (
                <Stack gap="xs">
                  <Box>
                    <Text
                      size="xs"
                      fw={600}
                      c="var(--primary-orange)"
                      style={{ marginBottom: "0.25rem" }}
                    >
                      Einmalig:
                    </Text>
                    <Stack gap={4}>
                      {story.output.benefits.oneTime.map((benefit, index) => (
                        <Badge
                          key={index}
                          size="xs"
                          variant="light"
                          color="orange"
                          style={{ textAlign: "left" }}
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <Text
                      size="xs"
                      fw={600}
                      c="var(--primary-red)"
                      style={{ marginBottom: "0.25rem" }}
                    >
                      Dauerhaft:
                    </Text>
                    <Stack gap={4}>
                      {story.output.benefits.ongoing.map((benefit, index) => (
                        <Badge
                          key={index}
                          size="xs"
                          variant="light"
                          color="red"
                          style={{ textAlign: "left" }}
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              )}
            </>
          )}
        </Card>
      </motion.div>

      {/* Implementation & Cost */}
      <motion.div
        variants={boxVariants}
        style={{
          display: "flex",
          flexDirection: isDesktopLayout ? "column" : "row",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <Card
          padding="sm"
          radius="lg"
          withBorder
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--background-primary)",
            textAlign: "center",
            minWidth: "120px",
          }}
        >
          <Group gap="xs" style={{ justifyContent: "center" }}>
            <ThemeIcon size="xs" color="blue">
              <IconClock size={12} />
            </ThemeIcon>
            <Text size="xs" fw={600} c="var(--text-primary)">
              Aufwand
            </Text>
          </Group>
          <Text size="xs" c="var(--text-secondary)">
            {story.implementation}
          </Text>
        </Card>
        <Card
          padding="sm"
          radius="lg"
          withBorder
          style={{
            borderColor: "var(--border-color)",
            backgroundColor: "var(--background-primary)",
            textAlign: "center",
            minWidth: "120px",
          }}
        >
          <Group gap="xs" style={{ justifyContent: "center" }}>
            <ThemeIcon size="xs" color="green">
              <IconCurrencyEuro size={12} />
            </ThemeIcon>
            <Text size="xs" fw={600} c="var(--text-primary)">
              Kosten
            </Text>
          </Group>
          <Text size="xs" c="var(--text-secondary)">
            {story.cost}
          </Text>
        </Card>
      </motion.div>
    </motion.div>
  );
};
