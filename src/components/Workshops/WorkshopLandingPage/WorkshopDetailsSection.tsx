import { Box, Card, Image, Stack, Text, ThemeIcon, Title } from "@mantine/core";

import { IconClock, IconTrendingUp, IconUsers } from "@tabler/icons-react";

import { Variants, motion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/hooks/useTranslation";

import { Grid } from "../../Layout";

interface WorkshopDetailsSectionProps {
  itemVariants: Variants;
}

export const WorkshopDetailsSection = ({
  itemVariants,
}: WorkshopDetailsSectionProps) => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const detailCards = [
    {
      icon: IconClock,
      title: t.workshop.details.duration.title,
      value: t.workshop.details.duration.value,
      description: t.workshop.details.duration.description,
    },
    {
      icon: IconUsers,
      title: t.workshop.details.participants.title,
      value: t.workshop.details.participants.value,
      description: t.workshop.details.participants.description,
    },
    {
      icon: IconTrendingUp,
      title: t.workshop.details.outcome.title,
      value: t.workshop.details.outcome.value,
      description: t.workshop.details.outcome.description,
    },
  ];

  return (
    <motion.div
      key="workshop-details"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <Stack gap="xl">
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
            {t.workshop.details.title}
          </Title>
        </Stack>

        <Grid
          cols={{ mobile: 1, tablet: 1, desktop: 2 }}
          spacing="xl"
          style={{ alignItems: "center" }}
        >
          {/* Left column: Quick Details */}
          <Stack gap="md">
            {detailCards.map((detail, index) => (
              <motion.div
                key={index}
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
                    borderColor: "var(--border-color)",
                    backgroundColor: "var(--background-primary)",
                    cursor: "default",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <ThemeIcon
                      size="xl"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                      }}
                    >
                      <detail.icon size={28} />
                    </ThemeIcon>
                    <Box>
                      <Title order={4}>{detail.title}</Title>
                      <Text c="var(--text-primary)" fw={500}>
                        {detail.value}
                      </Text>
                      <Text
                        size="sm"
                        c="var(--text-secondary)"
                        style={{ lineHeight: 1.4 }}
                      >
                        {detail.description}
                      </Text>
                    </Box>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Stack>

          {/* Right column: Workshop Environment Image */}
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src="/assets/workshop-participants.webp"
              alt="AI Workshop Symbolbild"
              width="100%"
              height="auto"
              style={{
                maxWidth: isMobile ? "320px" : "400px",
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              }}
            />
          </Box>
        </Grid>
      </Stack>
    </motion.div>
  );
};
