import { Stack, Title, Text, Card, Image, Box } from '@mantine/core';
import { IconBrain, IconCloud, IconCode } from '@tabler/icons-react';
import { motion, Variants } from 'framer-motion';
import { Section, Grid } from '../Layout';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import aiImage from '../../assets/ai-development.webp';
import cloudImage from '../../assets/cloud-architecture.webp';
import fullstackImage from '../../assets/fullstack-development.webp';

export const SimpleServices = () => {
  const { isMobile } = useMediaQuery();


  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const services = [
    {
      icon: IconBrain,
      title: 'AI & LLM Development',
      description: 'Entwicklung von AI-basierten Anwendungen mit modernsten Large Language Models wie GPT-4, Claude und Gemini. Von Chatbots bis hin zu komplexen AI-Workflows.',
      technologies: ['OpenAI GPT-4', 'Anthropic Claude', 'Google Gemini', 'LangChain', 'Vercel AI'],
      image: aiImage
    },
    {
      icon: IconCloud,
      title: 'Cloud Architecture',
      description: 'Design und Implementierung skalierbarer Cloud-Infrastrukturen mit AWS, Azure und modernen DevOps-Praktiken. Microservices, Serverless und Container-Orchestrierung.',
      technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
      image: cloudImage
    },
    {
      icon: IconCode,
      title: 'Full-Stack Development',
      description: 'Entwicklung moderner Web- und Mobile-Anwendungen mit React, Angular, Node.js und TypeScript. Responsive Design und perfekte User Experience.',
      technologies: ['React', 'Angular', 'Node.js', 'TypeScript', 'Next.js'],
      image: fullstackImage
    }
  ];

  return (
    <Section id="services" background="white">
      <Stack gap="xl">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.01 }}
        >
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
              Meine Services
            </Title>
            <Text size="lg" c="var(--text-secondary)" maw="600px">
              Spezialisierte Expertise in den wichtigsten Zukunftstechnologien. 
              Von AI-Integration bis hin zu skalierbaren Cloud-Architekturen.
            </Text>
          </Stack>
        </motion.div>

        <Grid
          cols={{ mobile: 1, tablet: 1, desktop: 3 }}
          spacing={isMobile ? 'md' : 'xl'}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.01 }}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 } 
              }}
            >
                  <Card
                  shadow="sm"
                  padding="xl"
                  radius="lg"
                  withBorder
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderColor: '#e0e0e0',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'default'
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        borderColor: 'var(--primary-orange)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                      }
                    }
                  }}
            >
              <Stack gap="md" style={{ flex: 1 }}>
                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <service.icon size={28} />
                  </Box>
                  
                  {!isMobile && (
                    <Image
                      src={service.image}
                      alt={service.title}
                      w={80}
                      h={80}
                      radius="md"
                      style={{ 
                        objectFit: 'cover',
                        border: '2px solid var(--neutral-light)'
                      }}
                      fallbackSrc="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='80'%20height='80'%20viewBox='0%200%2080%2080'%3e%3crect%20width='80'%20height='80'%20fill='%23f0f0f0'/%3e%3ctext%20x='50%25'%20y='50%25'%20text-anchor='middle'%20dy='.3em'%20fill='%23999'%20font-size='12'%3eImage%3c/text%3e%3c/svg%3e"
                    />
                  )}
                </Box>

                <Stack gap="sm" style={{ flex: 1 }}>
                  <Title order={3} size="h3" c="var(--text-primary)">
                    {service.title}
                  </Title>
                  
                  <Text c="var(--text-secondary)" style={{ lineHeight: 1.6 }}>
                    {service.description}
                  </Text>
                </Stack>

                <Stack gap="xs" style={{ marginTop: 'auto' }}>
                  <Text size="sm" fw={600} c="var(--text-primary)">
                    Technologien:
                  </Text>
                  <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {service.technologies.map((tech) => (
                      <Text
                        key={tech}
                        size="xs"
                        px="xs"
                        py={4}
                        style={{
                          backgroundColor: 'var(--neutral-light)',
                          borderRadius: '12px',
                          color: 'var(--text-secondary)',
                          fontWeight: 500
                        }}
                      >
                        {tech}
                      </Text>
                    ))}
                  </Box>
                  </Stack>
                </Stack>
                </Card>
            </motion.div>
          ))}
        </Grid>
      </Stack>
    </Section>
  );
};