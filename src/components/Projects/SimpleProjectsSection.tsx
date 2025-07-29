import { Stack, Title, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { Section, Grid } from '../Layout';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useProjects } from '../../hooks/useProjects';
import { useTranslation } from '../../hooks/useTranslation';
import { ImprovedProjectCard } from './ImprovedProjectCard';
import { useFilterStore } from '../../stores/filterStore';
import { ActiveTagsFilter } from '../Filter/ActiveTagsFilter';
import { useMemo } from 'react';

export const SimpleProjectsSection = () => {
  const { isMobile } = useMediaQuery();
  const { projects } = useProjects();
  const { t } = useTranslation();
  const { selectedPrimaryTags, selectedSecondaryTags } = useFilterStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };


  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by primary tags
    if (selectedPrimaryTags.length > 0) {
      filtered = filtered.filter(project => 
        selectedPrimaryTags.some(tag => 
          (project.primary_tags || []).includes(tag)
        )
      );
    }

    // Filter by secondary tags
    if (selectedSecondaryTags.length > 0) {
      filtered = filtered.filter(project => 
        selectedSecondaryTags.some(tag => 
          (project.tags || []).includes(tag)
        )
      );
    }

    return filtered;
  }, [projects, selectedPrimaryTags, selectedSecondaryTags]);

  return (
    <Section id="projects" background="white">
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
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
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
            spacing={isMobile ? 'md' : 'lg'}
          >
            {filteredProjects.map((project, index) => (
              <ImprovedProjectCard
                key={`${project.customer}-${project.title}`}
                project={project}
                index={index}
              />
            ))}
          </Grid>

          <motion.div variants={itemVariants}>
            <Text ta="center" size="sm" c="var(--text-secondary)">
              {t.projects.showingCount(filteredProjects.length, projects.length)}
            </Text>
          </motion.div>
        </Stack>
      </motion.div>
    </Section>
  );
};