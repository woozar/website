import { useMemo } from "react";

import { Stack, Text, Title } from "@mantine/core";

import { motion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/hooks/useTranslation";
import { useFilterStore } from "@/stores/filterStore";

import { ActiveTagsFilter } from "../Filter/ActiveTagsFilter";
import { Grid, Section } from "../Layout";
import { ProjectCard } from "./ProjectCard";

export const ProjectsSection = () => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();
  const projects = t.projectsData;
  const { selectedTags, selectedCustomer } = useFilterStore();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? {}
        : {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : { duration: 0.6 },
    },
  };

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by all tags (project must have ALL selected tags)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTags.every(
          (tag) =>
            project.primary_tags.includes(tag) || project.tags.includes(tag)
        )
      );
    }

    // Filter by customer
    if (selectedCustomer) {
      filtered = filtered.filter((project) =>
        project.customer.toLowerCase().includes(selectedCustomer.toLowerCase())
      );
    }

    return filtered;
  }, [projects, selectedTags, selectedCustomer]);

  return (
    <Section id="projects">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.01 }}
      >
        <Stack gap="xl">
          <motion.div variants={itemVariants}>
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
                {t.projects.title}
              </Title>
              <Text size="lg" c="var(--text-secondary)" maw="700px">
                {t.projects.subtitle}
              </Text>
            </Stack>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ActiveTagsFilter />
          </motion.div>

          <Grid
            cols={{ mobile: 1, tablet: 2, desktop: 2 }}
            spacing={isMobile ? "md" : "lg"}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${project.customer}-${project.title}`}
                project={project}
                index={index}
              />
            ))}
          </Grid>

          <motion.div variants={itemVariants}>
            <Text ta="center" size="sm" c="var(--text-secondary)">
              {t.projects.showingCount(
                filteredProjects.length,
                projects.length
              )}
            </Text>
          </motion.div>
        </Stack>
      </motion.div>
    </Section>
  );
};
