import { useState } from "react";

import { Badge, Box, Card, Group, Stack, Text } from "@mantine/core";

import { motion } from "framer-motion";

import ReactMarkdown, { Components } from "react-markdown";

import { useCardVariants, useHoverVariants } from "@/hooks/useAnimations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/hooks/useTranslation";
import { Project } from "@/types";

import { ProjectDetailModal } from "./ProjectDetailModal";
import { TagList } from "./TagList";

interface ProjectCardProps {
  project: Project;
}

const previewMarkdownComponents: Components = {
  // Keep the preview inline so the line clamp still works
  p: ({ children }) => <span>{children}</span>,
  // Links would compete with the card click, so render them as text
  a: ({ children }) => <span>{children}</span>,
  strong: ({ ...props }) => (
    <strong {...props} style={{ color: "var(--text-primary)" }} />
  ),
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = useCardVariants({
    y: 30,
    scale: 0.95,
    duration: 0.5,
  });

  const showcaseBadges = (project.references ?? []).filter(
    (reference) => reference.badge
  );

  const hoverVariants = useHoverVariants({
    scale: 1.02,
    y: -8,
    duration: 0.3,
  });

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={shouldReduceMotion ? "rest" : "hover"}
      viewport={{ once: true, amount: 0.3 }}
      style={{ height: "100%" }}
    >
      <motion.div variants={hoverVariants} style={{ height: "100%" }}>
        <Card
          shadow="md"
          padding="xl"
          radius="lg"
          withBorder
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderColor: "var(--border-color)",
            cursor: "pointer",
            minHeight: "280px",
            backgroundColor: "var(--background-primary)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          styles={{
            root: {
              "&:hover": {
                boxShadow: "0 12px 35px rgba(255, 107, 53, 0.15)",
                borderColor: "var(--primary-orange)",
              },
            },
          }}
          onClick={() => setModalOpened(true)}
        >
          <Stack gap="lg" style={{ flex: 1 }}>
            {/* Header */}
            <Stack gap="sm">
              <Text
                size="xl"
                fw={700}
                c="var(--text-primary)"
                lineClamp={2}
                style={{ fontSize: "1.4rem" }}
              >
                {project.title}
              </Text>
              <Text
                size="md"
                c="var(--primary-orange)"
                fw={600}
                style={{ fontSize: "1rem" }}
              >
                {project.customer}
              </Text>
              {showcaseBadges.length > 0 && (
                <Group gap="xs">
                  {showcaseBadges.map((reference) => (
                    <Badge
                      key={reference.url}
                      variant="light"
                      color="gray"
                      radius="sm"
                      leftSection={
                        reference.favicon && (
                          <img
                            src={reference.favicon}
                            alt=""
                            aria-hidden="true"
                            width={12}
                            height={12}
                            style={{ display: "block" }}
                          />
                        )
                      }
                      style={{ textTransform: "none" }}
                    >
                      {reference.badge}
                    </Badge>
                  ))}
                </Group>
              )}
            </Stack>

            {/* Description */}
            <Box>
              <Text
                component="div"
                size="md"
                c="var(--text-secondary)"
                style={{
                  lineHeight: 1.7,
                  fontSize: "0.95rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textAlign: "justify",
                }}
              >
                {project.description?.[0] ? (
                  <ReactMarkdown components={previewMarkdownComponents}>
                    {project.description[0]}
                  </ReactMarkdown>
                ) : (
                  t.project.noDescription
                )}
              </Text>
            </Box>

            {/* All Tags */}
            <TagList
              primaryTags={project.primary_tags}
              secondaryTags={project.tags}
              maxTags={10}
              fontSize="0.8rem"
              showMoreBadge={true}
            />
          </Stack>
        </Card>
      </motion.div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={project}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </motion.div>
  );
};
