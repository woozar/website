import { Stack, Title, Text, Group, Box, List, ThemeIcon } from '@mantine/core';
import { IconCheck, IconCode, IconBrain, IconRocket, IconShield, IconSchool } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '../Layout';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useTranslation } from '../../hooks/useTranslation';

export const About = () => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : { duration: 0.6 },
    },
  };

  const skills = [
    {
      category: t.about.skills.aiLlm.category,
      icon: IconBrain,
      items: t.about.skills.aiLlm.items,
    },
    { 
      category: t.about.skills.frontend.category, 
      icon: IconCode, 
      items: t.about.skills.frontend.items 
    },
    { 
      category: t.about.skills.backend.category, 
      icon: IconRocket, 
      items: t.about.skills.backend.items 
    },
    { 
      category: t.about.skills.cloud.category, 
      icon: IconCheck, 
      items: t.about.skills.cloud.items 
    },
    { 
      category: t.about.skills.quality.category, 
      icon: IconShield, 
      items: t.about.skills.quality.items 
    },
    { 
      category: t.about.skills.training.category, 
      icon: IconSchool, 
      items: t.about.skills.training.items 
    },
  ];

  return (
    <Section id="about">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
                  backgroundClip: 'text',
                }}
              >
                {t.about.title}
              </Title>
              <Text size="lg" c="var(--text-secondary)" maw="700px">
                {t.about.subtitle}
              </Text>
            </Stack>
          </motion.div>

          <Group align="flex-start" gap="xl" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
            {/* Text Content */}
            <motion.div variants={itemVariants} style={{ flex: 1 }}>
              <Stack gap="lg">
                <Text size="md" c="var(--text-secondary)" style={{ lineHeight: 1.7 }}>
                  {t.about.description1}
                </Text>

                <Text size="md" c="var(--text-secondary)" style={{ lineHeight: 1.7 }}>
                  {t.about.description2}
                </Text>

                <Text size="md" c="var(--text-secondary)" style={{ lineHeight: 1.7 }}>
                  {t.about.description3}
                </Text>
              </Stack>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={itemVariants} style={{ flex: isMobile ? 1 : 0.8 }}>
              <Box
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(211, 47, 47, 0.05))',
                  padding: '2rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 107, 53, 0.1)',
                }}
              >
                <Stack gap="md">
                  <Title order={4} c="var(--primary-orange)">
                    {t.about.highlights}
                  </Title>
                  <List
                    spacing="sm"
                    size="sm"
                    icon={
                      <ThemeIcon color="orange" size={20} radius="xl">
                        <IconCheck size={12} />
                      </ThemeIcon>
                    }
                  >
                    {t.about.highlightsList.map((highlight, index) => (
                      <List.Item key={index}>
                        <Text size="sm" c="var(--text-secondary)">
                          {highlight}
                        </Text>
                      </List.Item>
                    ))}
                  </List>
                </Stack>
              </Box>
            </motion.div>
          </Group>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <Stack gap="lg">
              <Title order={3} ta="center" c="var(--text-primary)">
                {t.about.expertise}
              </Title>

              <Group gap="lg" justify="center" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
                {skills.map((skillGroup) => (
                  <motion.div
                    key={skillGroup.category}
                    variants={itemVariants}
                    style={{ flex: 1, minWidth: isMobile ? '100%' : '250px' }}
                  >
                    <Box
                      className="skill-box"
                      style={{
                        padding: '1.5rem',
                        border: '1px solid #e0e0e0',
                        borderRadius: '0.75rem',
                        height: '100%',
                      }}
                    >
                      <Stack gap="md">
                        <Group gap="sm">
                          <ThemeIcon
                            variant="light"
                            color="orange"
                            size={30}
                            style={{
                              background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
                              color: 'white',
                            }}
                          >
                            <skillGroup.icon size={16} />
                          </ThemeIcon>
                          <Title order={5} c="var(--text-primary)">
                            {skillGroup.category}
                          </Title>
                        </Group>

                        <Stack gap="xs">
                          {skillGroup.items.map((skill) => (
                            <Text key={skill} size="sm" c="var(--text-secondary)">
                              • {skill}
                            </Text>
                          ))}
                        </Stack>
                      </Stack>
                    </Box>
                  </motion.div>
                ))}
              </Group>
            </Stack>
          </motion.div>
        </Stack>
      </motion.div>
    </Section>
  );
};
