import { Box, Button, Card, Image, Stack, Text, Title } from "@mantine/core";

import {
  IconArrowRight,
  IconBrain,
  IconCloud,
  IconCode,
} from "@tabler/icons-react";

import { Variants, motion, useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";

import { Grid, Section } from "../Layout";
import { TagList } from "../Projects/TagList";

// import aiImage from '../../assets/ai-development.webp';
// import cloudImage from '../../assets/cloud-architecture.webp';
// import fullstackImage from '../../assets/fullstack-development.webp';
const aiImage = "/assets/ai-development.webp";
const cloudImage = "/assets/cloud-architecture.webp";
const fullstackImage = "/assets/fullstack-development.webp";

export const SimpleServices = () => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 40,
      scale: shouldReduceMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: shouldReduceMotion ? {} : { duration: 0.6, ease: "easeOut" },
    },
  };

  const services = [
    {
      icon: IconBrain,
      title: t.services.items.ai.title,
      description: t.services.items.ai.description,
      technologies: [
        "OpenAI GPT-4",
        "Anthropic Claude",
        "Google Gemini",
        "LangChain",
        "Vercel AI",
      ],
      image: aiImage,
      hasWorkshop: true,
      workshopTitle: t.services.items.ai.workshopTitle,
      workshopDescription: t.services.items.ai.workshopDescription,
    },
    {
      icon: IconCloud,
      title: t.services.items.cloud.title,
      description: t.services.items.cloud.description,
      technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
      image: cloudImage,
    },
    {
      icon: IconCode,
      title: t.services.items.fullstack.title,
      description: t.services.items.fullstack.description,
      technologies: ["React", "Angular", "Node.js", "TypeScript", "Next.js"],
      image: fullstackImage,
    },
  ];

  return (
    <Section id="services">
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
                fontSize: isMobile ? "2rem" : "2.5rem",
                background:
                  "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.services.title}
            </Title>
            <Text size="lg" c="var(--text-secondary)" maw="600px">
              {t.services.subtitle}
            </Text>
          </Stack>
        </motion.div>

        <Grid
          cols={{ mobile: 1, tablet: 1, desktop: 3 }}
          spacing={isMobile ? "md" : "xl"}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.01 }}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -8,
                      transition: { duration: 0.3 },
                    }
              }
            >
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                withBorder
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderColor: "var(--border-color)",
                  cursor: "default",
                  backgroundColor: "var(--background-primary)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      borderColor: "var(--primary-orange)",
                      boxShadow: "0 10px 30px var(--shadow-color)",
                    },
                  },
                }}
              >
                <Stack gap="md" style={{ flex: 1 }}>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
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
                          objectFit: "cover",
                          border: "2px solid var(--border-color)",
                        }}
                        fallbackSrc="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='80'%20height='80'%20viewBox='0%200%2080%2080'%3e%3crect%20width='80'%20height='80'%20fill='%23f0f0f0'/%3e%3ctext%20x='50%25'%20y='50%25'%20text-anchor='middle'%20dy='.3em'%20fill='%23999'%20font-size='12'%3eImage%3c/text%3e%3c/svg%3e"
                      />
                    )}
                  </Box>

                  <Stack gap="sm" style={{ flex: 1 }}>
                    <Title order={3} size="h3" c="var(--text-primary)">
                      {service.title}
                    </Title>

                    <Text
                      c="var(--text-secondary)"
                      style={{ lineHeight: 1.6, textAlign: "justify" }}
                    >
                      {service.description}
                    </Text>
                  </Stack>

                  <Stack gap="xs" style={{ marginTop: "auto" }}>
                    <Text size="sm" fw={600} c="var(--text-primary)">
                      {t.services.technologies}
                    </Text>
                    <TagList
                      primaryTags={service.technologies}
                      secondaryTags={[]}
                      showMoreBadge={false}
                      selectable={false}
                      fontSize="0.75rem"
                    />

                    {service.hasWorkshop && (
                      <Button
                        component="a"
                        href="/workshops/ai-low-hanging-fruits"
                        size="xs"
                        variant="outline"
                        color="orange"
                        rightSection={<IconArrowRight size={12} />}
                        styles={{
                          section: { marginLeft: "4px" },
                        }}
                        style={{
                          alignSelf: "flex-end",
                          marginTop: "0.5rem",
                          fontSize: "0.75rem",
                          textDecoration: "none",
                        }}
                      >
                        {t.services.items.ai.workshopSpecificButton}
                      </Button>
                    )}
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
