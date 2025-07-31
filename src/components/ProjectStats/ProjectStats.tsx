import { Stack, Title, Text, Card, Badge, SimpleGrid, Box, Tooltip, ActionIcon } from '@mantine/core';
import { IconCode, IconUsers, IconCalendar, IconTrendingUp, IconStack, IconQuestionMark } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '../Layout';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useTranslation } from '../../hooks/useTranslation';
import { useProjects } from '../../hooks/useProjects';
import { calculateProjectStats } from '../../utils/projectStats';
import { useMemo } from 'react';
import { CompanyLogos } from './CompanyLogos';
import { useFilterStore } from '../../stores/filterStore';

export const ProjectStats = () => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();
  const { projects } = useProjects();
  const shouldReduceMotion = useReducedMotion();
  const { setCustomerFilter } = useFilterStore();

  const stats = useMemo(() => calculateProjectStats(projects), [projects]);

  // Get the actual frameworks used in projects
  const usedFrameworks = useMemo(() => {
    const frameworks = new Set<string>();
    projects.forEach((project) => {
      [...project.primary_tags, ...project.tags].forEach((tag) => {
        const FRAMEWORKS = [
          'React',
          'Angular',
          'Vue',
          'Vue.js',
          'Svelte',
          'Next.js',
          'Nuxt.js',
          'Express',
          'Express.js',
          'Fastify',
          'Koa',
          'NestJS',
          'Django',
          'Flask',
          'FastAPI',
          'Spring',
          'Spring Boot',
          'Laravel',
          'Symfony',
          'CodeIgniter',
          'Bootstrap',
          'Tailwind',
          'Tailwind CSS',
          'Material UI',
          'Ant Design',
          'Chakra UI',
          'Jest',
          'Cypress',
          'Playwright',
          'Vitest',
          'Mocha',
          'Jasmine',
          'create-t3-app',
        ];
        if (FRAMEWORKS.includes(tag)) {
          frameworks.add(tag);
        }
      });
    });
    return Array.from(frameworks).sort();
  }, [projects]);

  // Function to handle company logo clicks
  const handleCompanyClick = (customerName: string) => {
    setCustomerFilter(customerName);
    // Scroll to projects section
    const projectsElement = document.querySelector('#projects');
    if (projectsElement) {
      const headerHeight = 100; // Fixed header height
      const elementPosition = (projectsElement as HTMLElement).offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? {}
        : {
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
      transition: shouldReduceMotion ? {} : { duration: 0.5 },
    },
  };

  const statCards = [
    {
      icon: IconCode,
      title: t.projectStats.cards.totalProjects,
      value: stats.totalProjects.toString(),
      description: t.projectStats.cards.totalProjectsDesc,
    },
    {
      icon: IconTrendingUp,
      title: t.projectStats.cards.technologies,
      value: stats.totalTechnologies.toString(),
      description: t.projectStats.cards.technologiesDesc,
    },
    {
      icon: IconStack,
      title: t.projectStats.cards.frameworks,
      value: stats.totalFrameworks.toString(),
      description: t.projectStats.cards.frameworksDesc,
    },
    {
      icon: IconUsers,
      title: t.projectStats.cards.companies,
      value: stats.companiesWorkedWith.length.toString(),
      description: t.projectStats.cards.companiesDesc,
    },
    {
      icon: IconCalendar,
      title: t.projectStats.cards.yearsExperience,
      value: '20',
      description: t.projectStats.cards.yearsExperienceDesc,
    },
  ];

  return (
    <Section id="statistics">
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
                {t.projectStats.title}
              </Title>
              <Text size="lg" c="var(--text-secondary)" maw="600px">
                {t.projectStats.subtitle}
              </Text>
            </Stack>
          </motion.div>

          {/* Overview Cards */}
          <motion.div variants={itemVariants}>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing={isMobile ? 'md' : 'lg'}>
              {statCards.map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -5,
                          transition: { duration: 0.2 },
                        }
                  }
                >
                  <Card
                    padding="lg"
                    radius="lg"
                    withBorder
                    style={{
                      height: '100%',
                      textAlign: 'center',
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--background-primary)',
                      position: 'relative',
                    }}
                  >
                    {card.title === 'Frameworks' && (
                      <Tooltip
                        label={
                          <Box p="md">
                            <Text
                              size="sm"
                              fw={700}
                              mb="sm"
                              c="var(--primary-orange)"
                              style={{
                                borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                                paddingBottom: '0.5rem',
                              }}
                            >
                              {t.projectStats.frameworksTooltip}
                            </Text>
                            <SimpleGrid cols={2} spacing="xs">
                              {usedFrameworks.map((framework) => (
                                <Box key={framework} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <Box
                                    style={{
                                      width: '6px',
                                      height: '6px',
                                      borderRadius: '50%',
                                      background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
                                      flexShrink: 0,
                                    }}
                                  />
                                  <Text size="sm" c="var(--text-primary)" fw={500}>
                                    {framework}
                                  </Text>
                                </Box>
                              ))}
                            </SimpleGrid>
                          </Box>
                        }
                        multiline
                        w={280}
                        withArrow
                        position="bottom"
                        radius="lg"
                        styles={{
                          tooltip: {
                            backgroundColor: 'var(--background-primary)',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                            backdropFilter: 'blur(10px)',
                            padding: 0,
                          },
                          arrow: {
                            borderColor: 'var(--border-color)',
                          },
                        }}
                      >
                        <ActionIcon
                          variant="subtle"
                          size="xs"
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            color: 'var(--text-secondary)',
                            minWidth: '16px',
                            minHeight: '16px',
                            zIndex: 1,
                          }}
                        >
                          <IconQuestionMark size={12} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                    <Stack gap="sm" style={{ height: '100%' }}>
                      <Box
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          margin: '0 auto',
                        }}
                      >
                        <card.icon size={20} />
                      </Box>
                      <Stack gap="xs" style={{ flex: 1 }}>
                        <Text
                          size="xl"
                          fw={700}
                          c="var(--text-primary)"
                          style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}
                        >
                          {card.value}
                        </Text>
                        <Text size="sm" fw={600} c="var(--text-primary)">
                          {card.title}
                        </Text>
                        <Text size="xs" c="var(--text-secondary)">
                          {card.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>

          {/* Core Technologies - Simplified */}
          <motion.div variants={itemVariants}>
            <Stack gap="lg">
              <Title order={3} ta="center" c="var(--text-primary)">
                {t.projectStats.coreExpertise}
              </Title>

              <Card
                padding="xl"
                radius="lg"
                withBorder
                style={{
                  maxWidth: '600px',
                  margin: '0 auto',
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--background-primary)',
                }}
              >
                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="lg">
                  <Stack gap="xs" align="center">
                    <Text size="lg" fw={700} c="var(--text-primary)">
                      {t.projectStats.technologies.typescript}
                    </Text>
                    <Badge size="sm" variant="light" color="blue">
                      {t.projectStats.experience.years8}
                    </Badge>
                    <Text size="xs" c="var(--text-secondary)" ta="center">
                      {t.projectStats.expertiseLevel.expert}
                    </Text>
                  </Stack>

                  <Stack gap="xs" align="center">
                    <Text size="lg" fw={700} c="var(--text-primary)">
                      {t.projectStats.technologies.nodejs}
                    </Text>
                    <Badge size="sm" variant="light" color="green">
                      {t.projectStats.experience.years6}
                    </Badge>
                    <Text size="xs" c="var(--text-secondary)" ta="center">
                      {t.projectStats.expertiseLevel.expert}
                    </Text>
                  </Stack>

                  <Stack gap="xs" align="center">
                    <Text size="lg" fw={700} c="var(--text-primary)">
                      {t.projectStats.technologies.azure}
                    </Text>
                    <Badge size="sm" variant="light" color="cyan">
                      {t.projectStats.experience.years5}
                    </Badge>
                    <Text size="xs" c="var(--text-secondary)" ta="center">
                      {t.projectStats.expertiseLevel.advanced}
                    </Text>
                  </Stack>

                  <Stack gap="xs" align="center">
                    <Text size="lg" fw={700} c="var(--text-primary)">
                      {t.projectStats.technologies.aiLlm}
                    </Text>
                    <Badge size="sm" variant="light" color="orange">
                      {t.projectStats.experience.years5}
                    </Badge>
                    <Text size="xs" c="var(--text-secondary)" ta="center">
                      {t.projectStats.expertiseLevel.specialist}
                    </Text>
                  </Stack>
                </SimpleGrid>
              </Card>
            </Stack>
          </motion.div>

          {/* Company Logos */}
          <motion.div variants={itemVariants}>
            <Stack gap="lg" align="center">
              <Title order={4} c="var(--text-primary)">
                {t.projectStats.trustedBy}
              </Title>

              <CompanyLogos onCompanyClick={handleCompanyClick} />
            </Stack>
          </motion.div>
        </Stack>
      </motion.div>
    </Section>
  );
};
