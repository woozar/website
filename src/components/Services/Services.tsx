import { Box, Card, Stack, Text, Title } from "@mantine/core";

import { IconBrain, IconCloud, IconCode } from "@tabler/icons-react";

import { Variants, motion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/hooks/useTranslation";

import { Grid, Section } from "../Layout";

export const Services = () => {
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
    },
    {
      icon: IconCloud,
      title: t.services.items.cloud.title,
      description: t.services.items.cloud.description,
    },
    {
      icon: IconCode,
      title: t.services.items.fullstack.title,
      description: t.services.items.fullstack.description,
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
            <Text size="lg" c="var(--text-secondary)" maw="800px">
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
                </Stack>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Stack>
    </Section>
  );
};
