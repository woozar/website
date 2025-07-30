import { Card, Text, Stack, Box } from '@mantine/core';
import { useState } from 'react';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import { Project } from '../../types';
import { TagList } from './TagList';
import { ProjectDetailModal } from './ProjectDetailModal';
import { useTranslation } from '../../hooks/useTranslation';

interface ImprovedProjectCardProps {
  project: Project;
  index: number;
}

export const ImprovedProjectCard = ({ project }: ImprovedProjectCardProps) => {
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: shouldReduceMotion ? {} : {
        duration: 0.5
      }
    }
  };

  const hoverVariants: Variants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: shouldReduceMotion ? 1 : 1.02, 
      y: shouldReduceMotion ? 0 : -8,
      transition: shouldReduceMotion ? {} : {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={shouldReduceMotion ? "rest" : "hover"}
      viewport={{ once: true, amount: 0.3 }}
      style={{ height: '100%' }}
    >
      <motion.div variants={hoverVariants} style={{ height: '100%' }}>
        <Card
          shadow="md"
          padding="xl"
          radius="lg"
          withBorder
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderColor: 'var(--border-color)',
            cursor: 'pointer',
            minHeight: '280px',
            backgroundColor: 'var(--background-primary)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
          }}
          styles={{
            root: {
              '&:hover': {
                boxShadow: '0 12px 35px rgba(255, 107, 53, 0.15)',
                borderColor: 'var(--primary-orange)'
              }
            }
          }}
          onClick={() => setModalOpened(true)}
        >
          <Stack gap="lg" style={{ flex: 1 }}>
            {/* Header */}
            <Stack gap="sm">
              <Text size="xl" fw={700} c="var(--text-primary)" lineClamp={2} style={{ fontSize: '1.4rem' }}>
                {project.title}
              </Text>
              <Text size="md" c="var(--primary-orange)" fw={600} style={{ fontSize: '1rem' }}>
                {project.customer}
              </Text>
            </Stack>

            {/* Description */}
            <Box>
              <Text
                size="md"
                c="var(--text-secondary)"
                style={{ 
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textAlign: 'justify'
                }}
              >
                {(project.description && project.description[0]) || t.project.noDescription}
              </Text>
            </Box>

            {/* All Tags */}
            <TagList
              primaryTags={project.primary_tags || []}
              secondaryTags={project.tags || []}
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