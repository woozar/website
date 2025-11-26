import { Stack, Text, Title } from "@mantine/core";

import { motion } from "framer-motion";

import ReactMarkdown from "react-markdown";

import { useContainerVariants, useModalVariants } from "@/hooks/useAnimations";
import { useTranslation } from "@/hooks/useTranslation";
import { Project } from "@/types";

import { AnimatedModal } from "../Modal/AnimatedModal";
import { TagList } from "./TagList";

interface ProjectDetailModalProps {
  project: Project | null;
  opened: boolean;
  onClose: () => void;
}

export const ProjectDetailModal = ({
  project,
  opened,
  onClose,
}: ProjectDetailModalProps) => {
  const { t } = useTranslation();
  const modalVariants = useModalVariants();
  const contentVariants = useContainerVariants();

  if (!project) return null;

  return (
    <AnimatedModal
      opened={opened}
      onClose={onClose}
      modalVariants={modalVariants}
      contentVariants={contentVariants}
      backdrop
    >
      {({ itemVariants }) => (
        <>
          {/* Header - Fixed height */}
          <motion.div variants={itemVariants} style={{ flexShrink: 0 }}>
            <Stack gap="md" style={{ marginBottom: "1.5rem" }}>
              <Title
                order={2}
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                  paddingRight: "3rem",
                }}
              >
                {project.title}
              </Title>
              <Text
                size="lg"
                fw={600}
                style={{
                  color: "var(--primary-orange)",
                  fontSize: "1.1rem",
                }}
              >
                {project.customer}
              </Text>
            </Stack>
          </motion.div>

          {/* Scrollable Content - Takes remaining height */}
          <motion.div
            variants={itemVariants}
            style={{
              flex: 1,
              minHeight: 0, // WICHTIG: Ermöglicht Flex-Shrinking
              overflow: "auto", // Natives CSS Scrolling
              padding: "0 2px", // Platz für Scrollbar
            }}
          >
            <Stack id="content" gap="xl">
              {/* Description */}
              <Stack gap="md">
                <div
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    fontSize: "1rem",
                  }}
                >
                  <ReactMarkdown
                    components={{
                      // Style links
                      a: ({ children, ...props }) => (
                        <a
                          {...props}
                          style={{ textDecoration: "none" }}
                          className="markdown-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      // Style paragraphs
                      p: ({ ...props }) => (
                        <p {...props} style={{ marginBottom: "1rem" }} />
                      ),
                      // Style strong/bold text
                      strong: ({ ...props }) => (
                        <strong
                          {...props}
                          style={{ color: "var(--text-primary)" }}
                        />
                      ),
                      // Style emphasis/italic text
                      em: ({ ...props }) => (
                        <em {...props} style={{ fontStyle: "italic" }} />
                      ),
                    }}
                  >
                    {project.description.join("\n\n")}
                  </ReactMarkdown>
                </div>
              </Stack>

              {/* All Tags */}
              <div>
                <Stack gap="sm">
                  <Text fw={600} size="sm" c="var(--text-primary)">
                    {t.project.technologies}
                  </Text>
                  <TagList
                    primaryTags={project.primary_tags}
                    secondaryTags={project.tags}
                    fontSize="0.85rem"
                    showMoreBadge={false}
                    selectable={false}
                  />
                </Stack>
              </div>
            </Stack>
          </motion.div>
        </>
      )}
    </AnimatedModal>
  );
};
