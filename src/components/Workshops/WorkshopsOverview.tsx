import {
  Badge,
  Box,
  Button,
  Card,
  List,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import { IconCheck } from "@tabler/icons-react";

import { motion } from "framer-motion";

import {
  useCardVariants,
  useItemVariants,
  useWhileHover,
} from "@/hooks/useAnimations";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";

import { CtaButton } from "../CtaButton.tsx";
import { Grid, Section } from "../Layout";

export const WorkshopsOverview = () => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();
  const cardHover = useWhileHover({ type: "card" });

  const itemVariants = useItemVariants({ y: 30 });
  const cardVariants = useCardVariants({ y: 40 });

  const handleContactClick = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const headerHeight = 100;
      const elementPosition =
        (contactSection as HTMLElement).offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section id="workshops">
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
              {t.workshopsOverview.title}
            </Title>
            <Text size="lg" c="var(--text-secondary)" maw="700px">
              {t.workshopsOverview.subtitle}
            </Text>
          </Stack>
        </motion.div>

        <Grid
          cols={{ mobile: 1, tablet: 1, desktop: 2 }}
          spacing={isMobile ? "md" : "xl"}
        >
          {t.workshopsOverview.workshops.map((workshop, index: number) => (
            <motion.div
              key={workshop.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.01 }}
              transition={{ delay: index * 0.15 }}
              whileHover={cardHover}
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
                  borderColor: workshop.available
                    ? "var(--primary-orange)"
                    : "var(--border-color)",
                  cursor: "default",
                  backgroundColor: "var(--background-primary)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
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
                {workshop.comingSoon && (
                  <Badge
                    color="orange"
                    variant="filled"
                    size="lg"
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                    }}
                  >
                    Coming Soon
                  </Badge>
                )}

                <Stack gap="lg" style={{ flex: 1 }}>
                  <Stack gap="xs">
                    <Title order={3} c="var(--text-primary)">
                      {workshop.title}
                    </Title>
                    <Box
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <Badge color="blue" variant="light" size="sm">
                        {workshop.type}
                      </Badge>
                      <Badge color="gray" variant="light" size="sm">
                        {workshop.duration}
                      </Badge>
                    </Box>
                  </Stack>

                  <Text
                    c="var(--text-secondary)"
                    style={{ lineHeight: 1.6, textAlign: "justify" }}
                  >
                    {workshop.description}
                  </Text>

                  <List
                    spacing="xs"
                    size="sm"
                    icon={
                      <ThemeIcon color="green" size={20} radius="xl">
                        <IconCheck size={12} />
                      </ThemeIcon>
                    }
                  >
                    {workshop.highlights.map((highlight: string) => (
                      <List.Item key={highlight}>{highlight}</List.Item>
                    ))}
                  </List>

                  <Box style={{ marginTop: "auto" }}>
                    {workshop.available ? (
                      <CtaButton
                        variant="card"
                        component="a"
                        href={workshop.link}
                        fullWidth
                      >
                        {workshop.cta}
                      </CtaButton>
                    ) : (
                      <Button
                        size="md"
                        fullWidth
                        variant="outline"
                        color="orange"
                        onClick={handleContactClick}
                      >
                        {workshop.cta}
                      </Button>
                    )}
                  </Box>
                </Stack>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Stack>
    </Section>
  );
};
