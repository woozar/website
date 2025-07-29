import { Stack, Title, Text, Group, Box, List, ThemeIcon } from '@mantine/core';
import { IconCheck, IconCode, IconBrain, IconRocket, IconShield, IconSchool } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Section } from '../Layout';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const About = () => {
  const { isMobile } = useMediaQuery();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const skills = [
    {
      category: 'AI & LLM',
      icon: IconBrain,
      items: ['LLMs (GPT, Claude, Gemini)', 'LangChain', 'Audio Stream Processing', 'Video Generation', 'Neural Network Training', 'Prompt Engineering'],
    },
    { category: 'Frontend', icon: IconCode, items: ['React', 'TypeScript', 'Next.js', 'Angular', 'Material UI', 'Responsive Design'] },
    { category: 'Backend', icon: IconRocket, items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Prisma', 'REST APIs'] },
    { category: 'Cloud & DevOps', icon: IconCheck, items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Kafka & MQTT', 'CI/CD'] },
    { category: 'Quality Assurance', icon: IconShield, items: ['Unit Tests', 'E2E Tests', 'Integration Tests', 'Quality Gates', 'Clean Code', 'Static Code Analysis'] },
    { category: 'Training & Workshops', icon: IconSchool, items: ['Workshop-Durchführung', 'Technische Schulungen', 'Team-Mentoring', 'Präsentationen', 'Wissensvermittlung', 'Code Reviews'] },
  ];

  const highlights = [
    'Über 17 Jahre Erfahrung in der Softwareentwicklung',
    'Spezialist für AI/LLM Integration und Prompt Engineering',
    'Erfolgreich abgeschlossene Projekte für Unternehmen wie DMG Mori',
    'Expertise in modernen Web-Technologien und Cloud-Architekturen',
    'Fokus auf benutzerfreundliche und skalierbare Lösungen',
  ];

  return (
    <Section id="about" background="white">
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
                Über mich
              </Title>
              <Text size="lg" c="var(--text-secondary)" maw="700px">
                Tech Freelancer mit Leidenschaft für innovative AI-Lösungen und moderne Webtechnologien.
              </Text>
            </Stack>
          </motion.div>

          <Group align="flex-start" gap="xl" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
            {/* Text Content */}
            <motion.div variants={itemVariants} style={{ flex: 1 }}>
              <Stack gap="lg">
                <Text size="md" c="var(--text-secondary)" style={{ lineHeight: 1.7 }}>
                  Als erfahrener Tech Freelancer mit dem Fokus auf <strong>AI/LLM Entwicklung</strong> und{' '}
                  <strong> moderne Webtechnologien</strong> unterstütze ich Unternehmen dabei, innovative digitale
                  Lösungen zu entwickeln und umzusetzen.
                </Text>

                <Text size="md" c="var(--text-secondary)" style={{ lineHeight: 1.7 }}>
                  Meine Expertise liegt in der Entwicklung von <strong>AI-basierten Anwendungen</strong>, der
                  Implementierung von <strong>Cloud-Architekturen</strong> und der Erstellung von{' '}
                  <strong> skalierbaren Full-Stack-Webanwendungen</strong>. Dabei lege ich besonderen Wert auf
                  benutzerfreundliche Interfaces und performante Backend-Systeme.
                </Text>

                <Text size="md" c="var(--text-secondary)" style={{ lineHeight: 1.7 }}>
                  In meiner Laufbahn habe ich bereits für renommierte Unternehmen wie <strong>DMG Mori</strong>{' '}
                  gearbeitet und dabei komplexe SharePoint-Migration, Intranet-Modernisierung und Business Process
                  Automation Projekte erfolgreich umgesetzt.
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
                    Highlights
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
                    {highlights.map((highlight, index) => (
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
                Technische Expertise
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
