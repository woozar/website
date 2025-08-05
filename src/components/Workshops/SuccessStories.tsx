import { useEffect, useState } from "react";

import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import {
  IconClock,
  IconCurrencyEuro,
  IconHeart,
  IconMail,
  IconPhoto,
  IconRobot,
  IconSettings,
  IconTestPipe,
} from "@tabler/icons-react";

import { Variants, motion, useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";

import { Section } from "../Layout";

export const SuccessStories = () => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [selectedStory, setSelectedStory] = useState(0);

  const itemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : { duration: 0.6, ease: "easeOut" },
    },
  };

  const stories = [
    {
      icon: IconMail,
      category: "Marketing",
      title: t.workshop.successStories.newsletter.title,
      description: t.workshop.successStories.newsletter.description,
      goal: t.workshop.successStories.newsletter.goal,
      inputs: t.workshop.successStories.newsletter.inputs,
      processing: t.workshop.successStories.newsletter.processing,
      output: t.workshop.successStories.newsletter.output,
      implementation: t.workshop.successStories.newsletter.implementation,
      cost: t.workshop.successStories.newsletter.cost,
    },
    {
      icon: IconHeart,
      category: "Support",
      title: t.workshop.successStories.support.title,
      description: t.workshop.successStories.support.description,
      goal: t.workshop.successStories.support.goal,
      inputs: t.workshop.successStories.support.inputs,
      processing: t.workshop.successStories.support.processing,
      output: t.workshop.successStories.support.output,
      implementation: t.workshop.successStories.support.implementation,
      cost: t.workshop.successStories.support.cost,
    },
    {
      icon: IconPhoto,
      category: "Content-Creation",
      title: t.workshop.successStories.blogging.title,
      description: t.workshop.successStories.blogging.description,
      goal: t.workshop.successStories.blogging.goal,
      inputs: t.workshop.successStories.blogging.inputs,
      processing: t.workshop.successStories.blogging.processing,
      output: t.workshop.successStories.blogging.output,
      implementation: t.workshop.successStories.blogging.implementation,
      cost: t.workshop.successStories.blogging.cost,
    },
    {
      icon: IconTestPipe,
      category: "Development",
      title: t.workshop.successStories.testing.title,
      description: t.workshop.successStories.testing.description,
      goal: t.workshop.successStories.testing.goal,
      inputs: t.workshop.successStories.testing.inputs,
      processing: t.workshop.successStories.testing.processing,
      output: t.workshop.successStories.testing.output,
      implementation: t.workshop.successStories.testing.implementation,
      cost: t.workshop.successStories.testing.cost,
    },
  ];

  interface StoryData {
    inputs: Array<{ title: string; description: string }>;
    processing: { title: string; description: string };
    output: {
      title: string;
      description: string;
      benefits?:
        | string[]
        | {
            oneTime: string[];
            ongoing: string[];
          };
    };
    implementation: string;
    cost: string;
  }

  const ProcessVisualization = ({ story }: { story: StoryData }) => {
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
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1],
              type: "spring",
              stiffness: 100,
              damping: 15,
            },
      },
    };

    const connectionVariants: Variants = {
      hidden: {
        opacity: 0,
        pathLength: 0,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        pathLength: 1,
        scale: 1,
        transition: shouldReduceMotion
          ? {}
          : {
              delay: 1.2,
              duration: 1.5,
              ease: [0.25, 0.1, 0.25, 1],
              pathLength: {
                type: "spring",
                duration: 1.8,
                bounce: 0.2,
              },
            },
      },
    };

    const processingPulseVariants = shouldReduceMotion
      ? {}
      : {
          scale: [1, 1.03, 1],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

    const gearRotationVariants = shouldReduceMotion
      ? {}
      : {
          rotate: [0, 360],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "linear" as const,
          },
        };

    const containerVariants: Variants = {
      hidden: {
        opacity: 0,
        y: 30,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: shouldReduceMotion
          ? {}
          : {
              duration: 0.8,
              ease: "easeOut",
            },
      },
    };

    return (
      <motion.div
        key={`story-${story.implementation}-${story.cost}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        animate={{
          scale: shouldReduceMotion ? 1 : [0.98, 1],
          opacity: [0.8, 1],
        }}
        transition={
          shouldReduceMotion
            ? {}
            : {
                duration: 0.4,
                ease: "easeOut",
              }
        }
        style={{
          minHeight: "auto",
        }}
      >
        <Box>
          {!isDesktopLayout ? (
            // Mobile/Tablet: Vertikales Layout (< 1280px)
            <Stack gap="0" align="center">
              {/* Inputs Section */}
              <Box style={{ width: "100%", maxWidth: "600px" }}>
                <Group justify="center" gap="md" style={{ flexWrap: "wrap" }}>
                  {story.inputs.map((input, i: number) => (
                    <motion.div
                      key={`input-${i}`}
                      variants={boxVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: i * 0.2 }}
                      style={{ flex: "1 1 250px", minWidth: "250px" }}
                    >
                      <Card
                        padding="md"
                        radius="lg"
                        withBorder
                        style={{
                          borderColor: "var(--primary-orange)",
                          backgroundColor: "var(--background-primary)",
                          borderWidth: "2px",
                          height: "100%",
                        }}
                      >
                        <Stack gap="xs">
                          <Text size="sm" fw={600} c="var(--text-primary)">
                            {input.title}
                          </Text>
                          <Text
                            size="xs"
                            c="var(--text-secondary)"
                            style={{ lineHeight: 1.4 }}
                          >
                            {input.description}
                          </Text>
                        </Stack>
                      </Card>
                    </motion.div>
                  ))}
                </Group>
              </Box>

              {/* Connection Lines: Inputs → Processing */}
              <Box
                style={{
                  position: "relative",
                  width: "100%",
                  height: "60px",
                  marginTop: "-10px",
                  marginBottom: "-10px",
                }}
              >
                <svg
                  width="100%"
                  height="60"
                  style={{ position: "absolute", top: 0, left: 0 }}
                  viewBox="0 0 100 60"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {story.inputs.map((_, i: number) => {
                    const totalInputs = story.inputs.length;
                    const spacing = 160 / (totalInputs + 1);
                    const startX = (i + 1) * spacing - 30;
                    const endX = 50;

                    return (
                      <g key={`connection-${i}`}>
                        <motion.path
                          d={`M${startX},10 Q${(startX + endX) / 2},30 ${endX},50`}
                          stroke="var(--border-color)"
                          strokeWidth="2"
                          fill="none"
                          variants={connectionVariants}
                          initial="hidden"
                          animate="visible"
                        />
                        <circle r="3" fill="var(--primary-orange)" opacity="0">
                          <animateMotion
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${i * 0.8}s`}
                            path={`M${startX},10 Q${(startX + endX) / 2},30 ${endX},50`}
                          />
                          <animate
                            attributeName="opacity"
                            values="0;0.2;1;1;0.2;0"
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${i * 0.8}s`}
                          />
                        </circle>
                        <circle r="2" fill="var(--primary-orange)" opacity="0">
                          <animateMotion
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${i * 0.8 + 1.2}s`}
                            path={`M${startX},10 Q${(startX + endX) / 2},30 ${endX},50`}
                          />
                          <animate
                            attributeName="opacity"
                            values="0;0.1;0.7;0.7;0.1;0"
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${i * 0.8 + 1.2}s`}
                          />
                        </circle>
                      </g>
                    );
                  })}
                </svg>
              </Box>

              {/* Processing Section */}
              <Box style={{ width: "100%", maxWidth: "400px" }}>
                <motion.div
                  animate={processingPulseVariants}
                  variants={boxVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: story.inputs.length * 0.2 + 0.3 }}
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
                        <Text
                          size="sm"
                          style={{ opacity: 0.9, lineHeight: 1.4 }}
                        >
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
                        <Stack gap="xs">
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
                                Entwicklung:
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
                                Betrieb:
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
              </Box>

              {/* Connection Line: Processing → Output */}
              <Box
                style={{
                  position: "relative",
                  width: "100%",
                  height: "60px",
                  marginTop: "-10px",
                  marginBottom: "-10px",
                }}
              >
                <svg
                  width="100%"
                  height="60"
                  style={{ position: "absolute", top: 0, left: 0 }}
                  viewBox="0 0 100 60"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <motion.path
                    d="M50,10 L50,50"
                    stroke="var(--border-color)"
                    strokeWidth="3"
                    fill="none"
                    variants={connectionVariants}
                    initial="hidden"
                    animate="visible"
                  />
                  <circle
                    cx="50"
                    cy="10"
                    r="4"
                    fill="var(--primary-red)"
                    opacity="0"
                  >
                    <animate
                      attributeName="cy"
                      values="10;50"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="2s"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.3;1;1;0.3;0"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="2s"
                    />
                  </circle>
                  <circle
                    cx="50"
                    cy="10"
                    r="3"
                    fill="var(--primary-red)"
                    opacity="0"
                  >
                    <animate
                      attributeName="cy"
                      values="10;50"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="3s"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.2;0.8;0.8;0.2;0"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="3s"
                    />
                  </circle>
                  <circle
                    cx="50"
                    cy="10"
                    r="3"
                    fill="var(--primary-red)"
                    opacity="0"
                  >
                    <animate
                      attributeName="cy"
                      values="10;50"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="3.5s"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.1;0.6;0.6;0.1;0"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="3.5s"
                    />
                  </circle>
                </svg>
              </Box>

              {/* Output Section */}
              <Box style={{ width: "100%", maxWidth: "500px" }}>
                <motion.div
                  variants={boxVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: story.inputs.length * 0.2 + 0.6 }}
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
                        {story.output.title}
                      </Text>

                      {/* Render benefits if available */}
                      {story.output.benefits && (
                        <Stack gap="xs" style={{ marginTop: "1rem" }}>
                          {Array.isArray(story.output.benefits) ? (
                            // Simple benefits list (for non-legacy cases)
                            story.output.benefits.map((benefit, i: number) => (
                              <Box
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "0.5rem",
                                }}
                              >
                                <Text
                                  size="xs"
                                  c="green"
                                  style={{ marginTop: "0.1rem" }}
                                >
                                  ✓
                                </Text>
                                <Text
                                  size="xs"
                                  c="var(--text-secondary)"
                                  style={{ lineHeight: 1.4 }}
                                >
                                  {benefit}
                                </Text>
                              </Box>
                            ))
                          ) : (
                            // Structured benefits with oneTime/ongoing (for legacy case)
                            <Stack gap="md">
                              <Box>
                                <Text
                                  size="sm"
                                  fw={600}
                                  c="var(--text-primary)"
                                  mb="xs"
                                >
                                  {
                                    t.workshop.successStories.benefitLabels
                                      .oneTime
                                  }
                                </Text>
                                <Stack gap="xs">
                                  {story.output.benefits.oneTime.map(
                                    (benefit, i: number) => (
                                      <Box
                                        key={i}
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-start",
                                          gap: "0.5rem",
                                        }}
                                      >
                                        <Text
                                          size="xs"
                                          c="green"
                                          style={{ marginTop: "0.1rem" }}
                                        >
                                          ✓
                                        </Text>
                                        <Text
                                          size="xs"
                                          c="var(--text-secondary)"
                                          style={{ lineHeight: 1.4 }}
                                        >
                                          {benefit}
                                        </Text>
                                      </Box>
                                    )
                                  )}
                                </Stack>
                              </Box>

                              <Box>
                                <Text
                                  size="sm"
                                  fw={600}
                                  c="var(--text-primary)"
                                  mb="xs"
                                >
                                  {
                                    t.workshop.successStories.benefitLabels
                                      .ongoing
                                  }
                                </Text>
                                <Stack gap="xs">
                                  {story.output.benefits.ongoing.map(
                                    (benefit, i: number) => (
                                      <Box
                                        key={i}
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-start",
                                          gap: "0.5rem",
                                        }}
                                      >
                                        <Text
                                          size="xs"
                                          c="var(--primary-red)"
                                          style={{ marginTop: "0.1rem" }}
                                        >
                                          •
                                        </Text>
                                        <Text
                                          size="xs"
                                          c="var(--text-secondary)"
                                          style={{ lineHeight: 1.4 }}
                                        >
                                          {benefit}
                                        </Text>
                                      </Box>
                                    )
                                  )}
                                </Stack>
                              </Box>
                            </Stack>
                          )}
                        </Stack>
                      )}
                    </Stack>
                  </Card>
                </motion.div>
              </Box>
            </Stack>
          ) : (
            // Desktop: Horizontales Layout (>= 1280px)
            <Box
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: "0",
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
              }}
            >
              {/* Inputs Section */}
              <Box
                style={{
                  flex: "0 0 300px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {story.inputs.map((input, i: number) => (
                  <motion.div
                    key={`input-${i}`}
                    variants={boxVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.2 }}
                    style={{ flex: "1" }}
                  >
                    <Card
                      padding="md"
                      radius="lg"
                      withBorder
                      style={{
                        borderColor: "var(--primary-orange)",
                        backgroundColor: "var(--background-primary)",
                        borderWidth: "2px",
                        height: "100%",
                      }}
                    >
                      <Stack gap="xs">
                        <Text size="sm" fw={600} c="var(--text-primary)">
                          {input.title}
                        </Text>
                        <Text
                          size="xs"
                          c="var(--text-secondary)"
                          style={{ lineHeight: 1.4 }}
                        >
                          {input.description}
                        </Text>
                      </Stack>
                    </Card>
                  </motion.div>
                ))}
              </Box>

              {/* Connection Lines: Inputs → Processing */}
              <Box
                style={{
                  position: "relative",
                  width: "100px",
                  height: "auto",
                  marginTop: "-10px",
                  marginBottom: "-10px",
                  marginLeft: "-10px",
                  alignSelf: "stretch",
                }}
              >
                <svg
                  width="120"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                  viewBox="0 0 120 200"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {story.inputs.map((_, i: number) => {
                    const totalInputs = story.inputs.length;
                    const startY = (i + 1) * (200 / (totalInputs + 1));
                    const endY = 100; // Center vertically
                    const startX = 10;
                    const endX = 110;

                    return (
                      <g key={`connection-${i}`}>
                        <motion.path
                          d={`M${startX},${startY} Q${(startX + endX) / 2},${(startY + endY) / 2} ${endX},${endY}`}
                          stroke="var(--border-color)"
                          strokeWidth="2"
                          fill="none"
                          variants={connectionVariants}
                          initial="hidden"
                          animate="visible"
                        />
                        <circle r="3" fill="var(--primary-orange)" opacity="0">
                          <animateMotion
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${i * 0.8}s`}
                            path={`M${startX},${startY} Q${(startX + endX) / 2},${(startY + endY) / 2} ${endX},${endY}`}
                          />
                          <animate
                            attributeName="opacity"
                            values="0;0.2;1;1;0.2;0"
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${i * 0.8}s`}
                          />
                        </circle>
                        <circle r="2" fill="var(--primary-orange)" opacity="0">
                          <animateMotion
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${i * 0.8 + 1.2}s`}
                            path={`M${startX},${startY} Q${(startX + endX) / 2},${(startY + endY) / 2} ${endX},${endY}`}
                          />
                          <animate
                            attributeName="opacity"
                            values="0;0.1;0.7;0.7;0.1;0"
                            dur="2.5s"
                            repeatCount="indefinite"
                            begin={`${i * 0.8 + 1.2}s`}
                          />
                        </circle>
                      </g>
                    );
                  })}
                </svg>
              </Box>

              {/* Processing Section */}
              <Box
                style={{
                  flex: "0 0 400px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <motion.div
                  animate={processingPulseVariants}
                  variants={boxVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: story.inputs.length * 0.2 + 0.3 }}
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
                        <Text
                          size="sm"
                          style={{ opacity: 0.9, lineHeight: 1.4 }}
                        >
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
                        <Stack gap="xs">
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
                                Entwicklung:
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
                                Betrieb:
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
              </Box>

              {/* Connection Lines: Processing → Output */}
              <Box
                style={{
                  position: "relative",
                  width: "100px",
                  height: "auto",
                  marginTop: "-10px",
                  marginBottom: "-10px",
                  marginLeft: "-10px",
                  alignSelf: "stretch",
                }}
              >
                <svg
                  width="120"
                  height="100%"
                  style={{ position: "absolute", top: 0, left: 0 }}
                  viewBox="0 0 120 200"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <motion.path
                    d="M10,100 L110,100"
                    stroke="var(--border-color)"
                    strokeWidth="3"
                    fill="none"
                    variants={connectionVariants}
                    initial="hidden"
                    animate="visible"
                  />
                  <circle
                    cx="10"
                    cy="100"
                    r="4"
                    fill="var(--primary-red)"
                    opacity="0"
                  >
                    <animate
                      attributeName="cx"
                      values="10;110"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="2s"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.3;1;1;0.3;0"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="2s"
                    />
                  </circle>
                  <circle
                    cx="10"
                    cy="100"
                    r="3"
                    fill="var(--primary-red)"
                    opacity="0"
                  >
                    <animate
                      attributeName="cx"
                      values="10;110"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="3s"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.2;0.8;0.8;0.2;0"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="3s"
                    />
                  </circle>
                  <circle
                    cx="10"
                    cy="100"
                    r="3"
                    fill="var(--primary-red)"
                    opacity="0"
                  >
                    <animate
                      attributeName="cx"
                      values="10;110"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="3.5s"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.1;0.6;0.6;0.1;0"
                      dur="2s"
                      repeatCount="indefinite"
                      begin="3.5s"
                    />
                  </circle>
                </svg>
              </Box>

              {/* Output Section */}
              <Box
                style={{
                  flex: "0 0 300px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <motion.div
                  variants={boxVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: story.inputs.length * 0.2 + 0.6 }}
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
                        {story.output.title}
                      </Text>

                      {/* Render benefits if available */}
                      {story.output.benefits && (
                        <Stack gap="xs" style={{ marginTop: "1rem" }}>
                          {Array.isArray(story.output.benefits) ? (
                            // Simple benefits list (for non-legacy cases)
                            story.output.benefits.map((benefit, i: number) => (
                              <Box
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "0.5rem",
                                }}
                              >
                                <Text
                                  size="xs"
                                  c="green"
                                  style={{ marginTop: "0.1rem" }}
                                >
                                  ✓
                                </Text>
                                <Text
                                  size="xs"
                                  c="var(--text-secondary)"
                                  style={{ lineHeight: 1.4 }}
                                >
                                  {benefit}
                                </Text>
                              </Box>
                            ))
                          ) : (
                            // Structured benefits with oneTime/ongoing (for legacy case)
                            <Stack gap="md">
                              <Box>
                                <Text
                                  size="sm"
                                  fw={600}
                                  c="var(--text-primary)"
                                  mb="xs"
                                >
                                  {
                                    t.workshop.successStories.benefitLabels
                                      .oneTime
                                  }
                                </Text>
                                <Stack gap="xs">
                                  {story.output.benefits.oneTime.map(
                                    (benefit, i: number) => (
                                      <Box
                                        key={i}
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-start",
                                          gap: "0.5rem",
                                        }}
                                      >
                                        <Text
                                          size="xs"
                                          c="green"
                                          style={{ marginTop: "0.1rem" }}
                                        >
                                          ✓
                                        </Text>
                                        <Text
                                          size="xs"
                                          c="var(--text-secondary)"
                                          style={{ lineHeight: 1.4 }}
                                        >
                                          {benefit}
                                        </Text>
                                      </Box>
                                    )
                                  )}
                                </Stack>
                              </Box>

                              <Box>
                                <Text
                                  size="sm"
                                  fw={600}
                                  c="var(--text-primary)"
                                  mb="xs"
                                >
                                  {
                                    t.workshop.successStories.benefitLabels
                                      .ongoing
                                  }
                                </Text>
                                <Stack gap="xs">
                                  {story.output.benefits.ongoing.map(
                                    (benefit, i: number) => (
                                      <Box
                                        key={i}
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-start",
                                          gap: "0.5rem",
                                        }}
                                      >
                                        <Text
                                          size="xs"
                                          c="green"
                                          style={{ marginTop: "0.1rem" }}
                                        >
                                          ✓
                                        </Text>
                                        <Text
                                          size="xs"
                                          c="var(--text-secondary)"
                                          style={{ lineHeight: 1.4 }}
                                        >
                                          {benefit}
                                        </Text>
                                      </Box>
                                    )
                                  )}
                                </Stack>
                              </Box>
                            </Stack>
                          )}
                        </Stack>
                      )}
                    </Stack>
                  </Card>
                </motion.div>
              </Box>
            </Box>
          )}
        </Box>
      </motion.div>
    );
  };

  return (
    <Section>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.01 }}
      >
        <Stack gap="xl">
          <Stack gap="md" align="center" ta="center">
            <Title
              order={2}
              style={{
                fontSize: isMobile ? "2rem" : "2.5rem",
                background:
                  "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.workshop.successStories.title}
            </Title>
            <Text
              size="lg"
              c="var(--text-secondary)"
              style={{ whiteSpace: "nowrap" }}
            >
              {t.workshop.successStories.subtitle}
            </Text>
          </Stack>

          {/* Story Selection Buttons */}
          <Box style={{ width: "100%" }}>
            <Group gap="md" style={{ flexWrap: "wrap" }}>
              {stories.map((story, index) => (
                <Button
                  key={index}
                  variant={selectedStory === index ? "filled" : "outline"}
                  color="orange"
                  leftSection={<story.icon size={18} />}
                  onClick={() => setSelectedStory(index)}
                  style={{
                    background:
                      selectedStory === index
                        ? "linear-gradient(135deg, var(--primary-orange), var(--primary-red))"
                        : "transparent",
                    borderColor: "var(--primary-orange)",
                    flex: "1 1 calc(50% - 0.5rem)",
                    minWidth: "280px",
                    height: "auto",
                    padding: "1rem",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      gap: "0.75rem",
                    }}
                  >
                    <Text
                      size="sm"
                      fw={600}
                      style={{
                        color:
                          selectedStory === index
                            ? "white"
                            : "var(--text-primary)",
                      }}
                    >
                      {story.title}
                    </Text>
                    <Badge
                      variant={selectedStory === index ? "filled" : "light"}
                      color={selectedStory === index ? "gray" : "orange"}
                      size="xs"
                      style={{
                        backgroundColor:
                          selectedStory === index
                            ? "rgba(255,255,255,0.2)"
                            : undefined,
                        color: selectedStory === index ? "white" : undefined,
                        border:
                          selectedStory === index
                            ? "1px solid rgba(255,255,255,0.3)"
                            : undefined,
                      }}
                    >
                      {story.category}
                    </Badge>
                  </Box>
                </Button>
              ))}
            </Group>
          </Box>

          {/* Selected Story Description */}
          <Card
            padding="lg"
            radius="lg"
            withBorder
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--background-primary)",
              textAlign: "center",
            }}
          >
            <Stack gap="md" align="center" ta="center">
              <Text
                size="md"
                c="var(--text-secondary)"
                style={{ lineHeight: 1.5 }}
              >
                {stories[selectedStory].description}
              </Text>
              {stories[selectedStory].goal && (
                <Text
                  size="md"
                  fw={600}
                  c="var(--primary-orange)"
                  style={{ lineHeight: 1.4 }}
                >
                  {stories[selectedStory].goal}
                </Text>
              )}
            </Stack>
          </Card>

          {/* Process Visualization */}
          <Card
            padding="xl"
            radius="lg"
            withBorder
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--background-primary)",
            }}
          >
            <ProcessVisualization
              key={selectedStory} // Force re-render for animations
              story={stories[selectedStory]}
            />
          </Card>
        </Stack>
      </motion.div>
    </Section>
  );
};
