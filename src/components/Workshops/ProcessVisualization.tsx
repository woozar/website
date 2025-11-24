import { useEffect, useState } from "react";

import { Box, Group, Stack } from "@mantine/core";

import { Variants, motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { StoryData } from "@/types";

import {
  InputCard,
  InputProcessingConnections,
  OutputCard,
  ProcessingCard,
  ProcessingOutputConnection,
} from "./ProcessVisualization/components";

interface ProcessVisualizationProps {
  story: StoryData;
}

export const ProcessVisualization = ({ story }: ProcessVisualizationProps) => {
  const shouldReduceMotionRaw = useReducedMotion();
  const shouldReduceMotion = shouldReduceMotionRaw ?? false;
  const [isDesktopLayout, setIsDesktopLayout] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth >= 1280 : true) // Default to desktop for SSR
  );

  useEffect(() => {
    // SSR safety check
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setIsDesktopLayout(window.innerWidth >= 1280);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                  <InputCard
                    key={`input-${i}`}
                    input={input}
                    index={i}
                    shouldReduceMotion={shouldReduceMotion}
                    layoutType="mobile"
                  />
                ))}
              </Group>
            </Box>

            {/* Connection Lines: Inputs → Processing */}
            <InputProcessingConnections
              inputCount={story.inputs.length}
              shouldReduceMotion={shouldReduceMotion}
              isDesktop={false}
            />

            {/* Processing Section */}
            <Box style={{ width: "100%", maxWidth: "400px" }}>
              <ProcessingCard
                story={story}
                shouldReduceMotion={shouldReduceMotion}
                delayOffset={story.inputs.length * 0.2 + 0.3}
              />
            </Box>

            {/* Connection Line: Processing → Output */}
            <ProcessingOutputConnection
              shouldReduceMotion={shouldReduceMotion}
              isDesktop={false}
            />

            {/* Output Section */}
            <Box style={{ width: "100%", maxWidth: "500px" }}>
              <OutputCard
                output={story.output}
                delayOffset={story.inputs.length * 0.2 + 0.6}
                shouldReduceMotion={shouldReduceMotion}
              />
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
                <InputCard
                  key={`desktop-input-${i}`}
                  input={input}
                  index={i}
                  shouldReduceMotion={shouldReduceMotion}
                  layoutType="desktop"
                />
              ))}
            </Box>

            {/* Connection Lines: Inputs → Processing */}
            <InputProcessingConnections
              inputCount={story.inputs.length}
              shouldReduceMotion={shouldReduceMotion}
              isDesktop={true}
            />

            {/* Processing Section */}
            <Box
              style={{
                flex: "0 0 400px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ProcessingCard
                story={story}
                shouldReduceMotion={shouldReduceMotion}
                delayOffset={story.inputs.length * 0.2 + 0.3}
              />
            </Box>

            {/* Connection Lines: Processing → Output */}
            <ProcessingOutputConnection
              shouldReduceMotion={shouldReduceMotion}
              isDesktop={true}
            />

            {/* Output Section */}
            <Box style={{ width: "300px", flexShrink: 0 }}>
              <OutputCard
                output={story.output}
                delayOffset={story.inputs.length * 0.2 + 0.6}
                shouldReduceMotion={shouldReduceMotion}
              />
            </Box>
          </Box>
        )}
      </Box>
    </motion.div>
  );
};
