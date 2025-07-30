import { Modal, Stack, Title, Text, Button } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { motion, AnimatePresence, Variants, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { Project } from '../../types';
import { TagList } from './TagList';
import { useModal } from '../../hooks/useModal';

interface ProjectDetailModalProps {
  project: Project | null;
  opened: boolean;
  onClose: () => void;
}

export const ProjectDetailModal = ({ project, opened, onClose }: ProjectDetailModalProps) => {
  const { openModal, closeModal } = useModal();
  const shouldReduceMotion = useReducedMotion();

  // Hide scrollbars during modal animation and update global modal state
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
      openModal();
    } else {
      document.body.style.overflow = '';
      closeModal();
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened, openModal, closeModal]);

  if (!project) return null;

  const modalVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.8,
      y: shouldReduceMotion ? 0 : 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
    exit: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.8,
      y: shouldReduceMotion ? 0 : 50,
      transition: shouldReduceMotion ? {} : {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : { duration: 0.3 },
    },
    exit: {
      opacity: shouldReduceMotion ? 1 : 0,
      transition: shouldReduceMotion ? {} : { duration: 0.2 },
    },
  };

  const contentVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : { duration: 0.4 },
    },
  };

  return (
    <AnimatePresence>
      {opened && (
        <Modal
          opened={opened}
          onClose={onClose}
          size="xl"
          centered
          padding={0}
          radius="lg"
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.6,
            blur: 8,
          }}
          zIndex={1100}
          styles={{
            body: {
              background: 'transparent',
              boxShadow: 'none',
              padding: 0,
              overflow: 'hidden',
            },
            content: {
              background: 'transparent',
              boxShadow: 'none',
              overflow: 'hidden',
            },
          }}
        >
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
              zIndex: -1,
            }}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              background: 'var(--background-primary)',
              borderRadius: '1rem',
              padding: '2rem',
              maxHeight: '80vh',
              position: 'relative',
              boxShadow: '0 20px 60px var(--shadow-color)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Close Button */}
            <motion.div
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10,
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
            >
              <Button
                variant="subtle"
                size="sm"
                onClick={onClose}
                style={{
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  padding: 0,
                  color: 'var(--text-secondary)',
                }}
              >
                <IconX size={20} />
              </Button>
            </motion.div>

            <motion.div 
              variants={contentVariants} 
              initial="hidden" 
              animate="visible" 
              style={{ 
                flex: 1, 
                minHeight: 0, // WICHTIG: Ermöglicht Flex-Shrinking
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Header - Fixed height */}
              <motion.div variants={itemVariants} style={{ flexShrink: 0 }}>
                <Stack gap="md" style={{ marginBottom: '1.5rem' }}>
                  <Title
                    order={2}
                    style={{
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                      paddingRight: '3rem',
                    }}
                  >
                    {project.title}
                  </Title>
                  <Text
                    size="lg"
                    fw={600}
                    style={{
                      color: 'var(--primary-orange)',
                      fontSize: '1.1rem',
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
                  overflow: 'auto', // Natives CSS Scrolling
                  padding: '0 2px' // Platz für Scrollbar
                }}
              >
                <Stack
                  id="content"
                  gap="xl"
                >
                      {/* Description */}
                      <Stack gap="md">
                        <Text fw={600} size="sm" c="var(--text-primary)">
                          Projektbeschreibung
                        </Text>
                        <Stack gap="md">
                          {(project.description || []).map((paragraph, idx) => (
                            <Text
                              key={idx}
                              size="md"
                              c="var(--text-secondary)"
                              style={{
                                lineHeight: 1.7,
                                fontSize: '1rem',
                              }}
                            >
                              {paragraph}
                            </Text>
                          ))}
                        </Stack>
                      </Stack>

                      {/* All Tags */}
                      <div>
                        <Stack gap="sm">
                          <Text fw={600} size="sm" c="var(--text-primary)">
                            Technologien
                          </Text>
                          <TagList
                            primaryTags={project.primary_tags || []}
                            secondaryTags={project.tags || []}
                            fontSize="0.85rem"
                            showMoreBadge={false}
                            selectable={false}
                          />
                        </Stack>
                      </div>
                </Stack>
              </motion.div>
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};
