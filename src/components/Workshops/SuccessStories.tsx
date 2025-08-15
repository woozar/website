import { useState } from "react";

import { Button, Card, Group, Stack, Text, Title } from "@mantine/core";

import {
  IconHeart,
  IconMail,
  IconPhoto,
  IconTestPipe,
} from "@tabler/icons-react";

import { Variants, motion, useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";

import { Section } from "../Layout";
import { ProcessVisualization } from "./ProcessVisualization";

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
      result: t.workshop.successStories.newsletter.result,
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
      result: t.workshop.successStories.support.result,
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
      result: t.workshop.successStories.blogging.result,
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
      result: t.workshop.successStories.testing.result,
      inputs: t.workshop.successStories.testing.inputs,
      processing: t.workshop.successStories.testing.processing,
      output: t.workshop.successStories.testing.output,
      implementation: t.workshop.successStories.testing.implementation,
      cost: t.workshop.successStories.testing.cost,
    },
  ];

  return (
    <Section id="success-stories">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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
            <Text size="lg" c="var(--text-secondary)" ta="center">
              {t.workshop.successStories.subtitle}
            </Text>
          </Stack>

          {/* Story Selection Buttons */}
          <Group justify="center" gap="sm" style={{ flexWrap: "wrap" }}>
            {stories.map((story, index) => {
              const IconComponent = story.icon;
              return (
                <Button
                  key={index}
                  variant={selectedStory === index ? "filled" : "outline"}
                  onClick={() => setSelectedStory(index)}
                  leftSection={<IconComponent size={16} />}
                  style={{
                    background:
                      selectedStory === index
                        ? "linear-gradient(135deg, var(--primary-orange), var(--primary-red))"
                        : "transparent",
                    borderColor:
                      selectedStory === index
                        ? "transparent"
                        : "var(--primary-orange)",
                    color:
                      selectedStory === index
                        ? "white"
                        : "var(--primary-orange)",
                  }}
                >
                  {story.title}
                </Button>
              );
            })}
          </Group>

          {/* Selected Story Details */}
          <motion.div
            key={selectedStory}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Card
              shadow="sm"
              padding="xl"
              radius="lg"
              withBorder
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--background-primary)",
              }}
            >
              <Stack gap="lg">
                {/* Goal */}
                {stories[selectedStory].description && (
                  <Text
                    size="md"
                    c="var(--text-secondary)"
                    style={{ lineHeight: 1.5, textAlign: "left" }}
                  >
                    <Text component="span" fw={600} c="var(--text-primary)">
                      {t.workshop.successStories.labels.description}
                    </Text>{" "}
                    {stories[selectedStory].description}
                  </Text>
                )}

                {/* Goal */}
                {stories[selectedStory].goal && (
                  <Text
                    size="md"
                    c="var(--text-secondary)"
                    style={{ lineHeight: 1.5, textAlign: "left" }}
                  >
                    <Text component="span" fw={600} c="var(--text-primary)">
                      {t.workshop.successStories.labels.goal}
                    </Text>{" "}
                    {stories[selectedStory].goal}
                  </Text>
                )}

                {/* Result */}
                {stories[selectedStory].result && (
                  <Text
                    size="md"
                    c="var(--text-secondary)"
                    style={{ lineHeight: 1.5, textAlign: "left" }}
                  >
                    <Text component="span" fw={600} c="var(--text-primary)">
                      {t.workshop.successStories.labels.result}
                    </Text>{" "}
                    <Text component="span" fw={600} c="var(--primary-orange)">
                      {stories[selectedStory].result}
                    </Text>
                  </Text>
                )}

                {/* Process Visualization */}
                <ProcessVisualization story={stories[selectedStory]} />
              </Stack>
            </Card>
          </motion.div>
        </Stack>
      </motion.div>
    </Section>
  );
};
