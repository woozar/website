import { Stack, Title, Text, Card, Badge, SimpleGrid, Box, Tooltip, ActionIcon } from '@mantine/core';
import { IconCode, IconUsers, IconCalendar, IconTrendingUp, IconStack, IconQuestionMark } from '@tabler/icons-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '../Layout';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useTranslation } from '../../hooks/useTranslation';
import { useProjects } from '../../hooks/useProjects';
import { calculateProjectStats } from '../../utils/projectStats';
import { useMemo } from 'react';
import { useThemeStore } from '../../stores/themeStore';
import { useFilterStore } from '../../stores/filterStore';

export const ProjectStats = () => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();
  const { projects } = useProjects();
  const shouldReduceMotion = useReducedMotion();
  const theme = useThemeStore((state) => state.theme);
  const { setCustomerFilter } = useFilterStore();

  const stats = useMemo(() => calculateProjectStats(projects), [projects]);

  // Get the actual frameworks used in projects
  const usedFrameworks = useMemo(() => {
    const frameworks = new Set<string>();
    projects.forEach(project => {
      [...(project.primary_tags || []), ...(project.tags || [])].forEach(tag => {
        const FRAMEWORKS = [
          'React', 'Angular', 'Vue', 'Vue.js', 'Svelte', 'Next.js', 'Nuxt.js',
          'Express', 'Express.js', 'Fastify', 'Koa', 'NestJS',
          'Django', 'Flask', 'FastAPI', 'Spring', 'Spring Boot',
          'Laravel', 'Symfony', 'CodeIgniter',
          'Bootstrap', 'Tailwind', 'Tailwind CSS', 'Material UI', 'Ant Design', 'Chakra UI',
          'Jest', 'Cypress', 'Playwright', 'Vitest', 'Mocha', 'Jasmine',
          'T3 Stack', 'T3', 'create-t3-app'
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
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : { duration: 0.5 }
    }
  };

  const statCards = [
    {
      icon: IconCode,
      title: t.projectStats.cards.totalProjects,
      value: stats.totalProjects.toString(),
      description: t.projectStats.cards.totalProjectsDesc
    },
    {
      icon: IconTrendingUp,
      title: t.projectStats.cards.technologies,
      value: stats.totalTechnologies.toString(),
      description: t.projectStats.cards.technologiesDesc
    },
    {
      icon: IconStack,
      title: t.projectStats.cards.frameworks,
      value: stats.totalFrameworks.toString(),
      description: t.projectStats.cards.frameworksDesc
    },
    {
      icon: IconUsers,
      title: t.projectStats.cards.companies,
      value: stats.companiesWorkedWith.length.toString(),
      description: t.projectStats.cards.companiesDesc
    },
    {
      icon: IconCalendar,
      title: t.projectStats.cards.yearsExperience,
      value: '20',
      description: t.projectStats.cards.yearsExperienceDesc
    }
  ];

  return (
    <Section background="white" id="statistics">
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
                  backgroundClip: 'text'
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
            <SimpleGrid
              cols={{ base: 2, sm: 3, md: 5 }}
              spacing={isMobile ? 'md' : 'lg'}
            >
              {statCards.map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={shouldReduceMotion ? {} : { 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
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
                      position: 'relative'
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
                                paddingBottom: '0.5rem'
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
                                      flexShrink: 0
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
                            padding: 0
                          },
                          arrow: {
                            borderColor: 'var(--border-color)'
                          }
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
                            zIndex: 1
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
                          margin: '0 auto'
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
                  backgroundColor: 'var(--background-primary)'
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
              
              <Box
                style={{
                  width: '100%',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'transparent'
                }}
              >
                <SimpleGrid 
                  cols={{ base: 2, sm: 3, md: 4 }} 
                  spacing="xl"
                  style={{ alignItems: 'center' }}
                >
                  {/* Siemens */}
                  <Box 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      height: '80px',
                      padding: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCompanyClick('Siemens AG')}
                  >
                    <img
                      src="/assets/logos/siemens-logo.svg"
                      alt="Siemens"
                      style={{
                        height: '40px',
                        width: 'auto',
                        maxWidth: '120px',
                        objectFit: 'contain',
                        opacity: '1',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.currentTarget.style.display = 'none';
                        const textFallback = document.createElement('div');
                        textFallback.innerHTML = '<span style="font-size: 18px; font-weight: 700; color: #009999; font-family: Arial, sans-serif; letter-spacing: 1px;">SIEMENS</span>';
                        e.currentTarget.parentNode?.appendChild(textFallback);
                      }}
                    />
                  </Box>

                  {/* DMG MORI */}
                  <Box 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      height: '80px',
                      padding: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCompanyClick('DMG Mori Software Solution')}
                  >
                    <img
                      src="/assets/logos/dmg-mori-logo.webp"
                      alt="DMG MORI"
                      style={{
                        height: '40px',
                        width: 'auto',
                        maxWidth: '120px',
                        objectFit: 'contain',
                        opacity: '1',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const textFallback = document.createElement('div');
                        textFallback.innerHTML = '<span style="font-size: 16px; font-weight: 700; color: #333; font-family: Arial, sans-serif; letter-spacing: 0.5px;">DMG MORI</span>';
                        e.currentTarget.parentNode?.appendChild(textFallback);
                      }}
                    />
                  </Box>

                  {/* KUKA */}
                  <Box 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      height: '80px',
                      padding: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCompanyClick('KUKA')}
                  >
                    <img
                      src="/assets/logos/kuka-logo.svg"
                      alt="KUKA"
                      style={{
                        height: '40px',
                        width: 'auto',
                        maxWidth: '120px',
                        objectFit: 'contain',
                        opacity: '1',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const textFallback = document.createElement('div');
                        textFallback.innerHTML = '<span style="font-size: 18px; font-weight: 700; color: #FF8800; font-family: Arial, sans-serif; letter-spacing: 1px;">KUKA</span>';
                        e.currentTarget.parentNode?.appendChild(textFallback);
                      }}
                    />
                  </Box>

                  {/* Saurer */}
                  <Box 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      height: '80px',
                      padding: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCompanyClick('Saurer AG')}
                  >
                    <img
                      src="/assets/logos/saurer-logo.png"
                      alt="Saurer"
                      style={{
                        height: '40px',
                        width: 'auto',
                        maxWidth: '120px',
                        objectFit: 'contain',
                        opacity: '1',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const textFallback = document.createElement('div');
                        textFallback.innerHTML = '<span style="font-size: 16px; font-weight: 600; color: #003366; font-family: Arial, sans-serif; letter-spacing: 0.5px;">SAURER</span>';
                        e.currentTarget.parentNode?.appendChild(textFallback);
                      }}
                    />
                  </Box>

                  {/* Paessler */}
                  <Box 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      height: '80px',
                      padding: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCompanyClick('Paessler AG')}
                  >
                    <img
                      src={theme === 'dark' ? "/assets/logos/paessler-logo-dark-mode.png" : "/assets/logos/paessler-logo.png"}
                      alt="Paessler AG"
                      style={{
                        height: '40px',
                        width: 'auto',
                        maxWidth: '120px',
                        objectFit: 'contain',
                        opacity: '1',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const textFallback = document.createElement('div');
                        textFallback.innerHTML = '<span style="font-size: 14px; font-weight: 600; color: #0066CC; font-family: Arial, sans-serif; letter-spacing: 0.5px; text-align: center;">Paessler AG</span>';
                        e.currentTarget.parentNode?.appendChild(textFallback);
                      }}
                    />
                  </Box>

                  {/* T3 Stack */}
                  <Box 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      height: '80px',
                      padding: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCompanyClick('T3 GmbH')}
                  >
                    <img
                      src="/assets/logos/t3-logo.svg"
                      alt="T3 Stack"
                      style={{
                        height: '40px',
                        width: 'auto',
                        maxWidth: '120px',
                        objectFit: 'contain',
                        opacity: '1',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const textFallback = document.createElement('div');
                        textFallback.innerHTML = '<span style="font-size: 16px; font-weight: 700; color: #8B5CF6; font-family: Arial, sans-serif; letter-spacing: 0.5px;">T3 Stack</span>';
                        e.currentTarget.parentNode?.appendChild(textFallback);
                      }}
                    />
                  </Box>

                  {/* Sikant Med */}
                  <Box 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      height: '80px',
                      padding: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCompanyClick('Sikant GmbH')}
                  >
                    <img
                      src={theme === 'dark' ? "/assets/logos/sikant-med-logo-dark-mode.png" : "/assets/logos/sikant-med-logo.png"}
                      alt="Sikant Med"
                      style={{
                        height: '40px',
                        width: 'auto',
                        maxWidth: '120px',
                        objectFit: 'contain',
                        opacity: '1',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const textFallback = document.createElement('div');
                        textFallback.innerHTML = '<span style="font-size: 16px; font-weight: 700; color: #2563eb; font-family: Arial, sans-serif; letter-spacing: 0.5px;">Sikant Med</span>';
                        e.currentTarget.parentNode?.appendChild(textFallback);
                      }}
                    />
                  </Box>

                  {/* ChatYourData */}
                  <Box 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      height: '80px',
                      padding: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCompanyClick('ChatYourData GmbH')}
                  >
                    <img
                      src={theme === 'dark' ? "/assets/logos/chatyourdata-logo-dark-mode.png" : "/assets/logos/chatyourdata-logo.png"}
                      alt="ChatYourData"
                      style={{
                        height: '40px',
                        width: 'auto',
                        maxWidth: '120px',
                        objectFit: 'contain',
                        opacity: '1',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const textFallback = document.createElement('div');
                        textFallback.innerHTML = '<span style="font-size: 16px; font-weight: 700; color: #3b82f6; font-family: Arial, sans-serif; letter-spacing: 0.5px;">ChatYourData</span>';
                        e.currentTarget.parentNode?.appendChild(textFallback);
                      }}
                    />
                  </Box>
                </SimpleGrid>
              </Box>
            </Stack>
          </motion.div>
        </Stack>
      </motion.div>
    </Section>
  );
};