import {
  Box,
  Button,
  Card,
  Image,
  List,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import {
  IconBrain,
  IconCheck,
  IconClock,
  IconHome,
  IconTarget,
  IconTrendingUp,
  IconUsers,
  IconX,
} from "@tabler/icons-react";

import { Variants, motion, useReducedMotion } from "framer-motion";

import { useLocation } from "react-router-dom";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";

import { Contact } from "../Contact/Contact";
import { Grid, Section } from "../Layout";
import { SEOHead } from "../SEO/SEOHead";
import { SuccessStories } from "./SuccessStories";

export const WorkshopLandingPage = () => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();

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

  const handleWorkshopInquiry = () => {
    const subject = encodeURIComponent(
      "Workshop Anfrage: AI - Low Hanging Fruits"
    );
    const body = encodeURIComponent(`Hallo Johannes,

ich interessiere mich für den Workshop "AI - Low Hanging Fruits" und würde gerne mehr Informationen erhalten.

Bitte kontaktieren Sie mich für ein unverbindliches Gespräch.

Viele Grüße`);

    window.location.href = `mailto:workshops@12ofspades.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <SEOHead
        type="article"
        title={t.workshop.seo.title}
        description={t.workshop.seo.description}
        keywords={t.workshop.seo.keywords}
      />
      <main
        key={location.pathname}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          paddingTop: "2rem",
          paddingBottom: "1rem",
        }}
      >
        {/* Hero Section */}
        <Section>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid
              cols={{ mobile: 1, tablet: 1, desktop: 2 }}
              spacing="xl"
              style={{ alignItems: "center" }}
            >
              {/* Text Content */}
              <Stack gap="xl" ta={isMobile ? "center" : "left"}>
                <Title
                  order={1}
                  style={{
                    fontSize: isMobile ? "2.5rem" : "3.5rem",
                    background:
                      "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.2,
                  }}
                >
                  {t.workshop.hero.title}
                </Title>

                <Text
                  size="xl"
                  c="var(--text-secondary)"
                  style={{ lineHeight: 1.6 }}
                >
                  {t.workshop.hero.subtitle}
                </Text>

                <Stack gap="sm" align={isMobile ? "center" : "flex-start"}>
                  <Button
                    size="lg"
                    onClick={() => {
                      const contactSection = document.querySelector("#contact");
                      if (contactSection) {
                        const headerHeight = 100;
                        const elementPosition =
                          (contactSection as HTMLElement).offsetTop -
                          headerHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth",
                        });
                      }
                    }}
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                      border: "none",
                      fontSize: "1.1rem",
                      padding: "0.75rem 2rem",
                    }}
                  >
                    {t.workshop.hero.ctaButton}
                  </Button>
                </Stack>
              </Stack>

              {/* Low Hanging Fruits Concept Image */}
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Image
                  src="/assets/ai-low-hanging-fruits-illustration.webp"
                  alt="AI Low Hanging Fruits - Einfache Gewinne zuerst"
                  width="100%"
                  height="auto"
                  style={{
                    maxWidth: isMobile ? "280px" : "380px",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                  }}
                />
              </Box>
            </Grid>
          </motion.div>
        </Section>

        {/* Problem/Solution Section */}
        <Section>
          <motion.div
            key="problem-solution"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }} spacing="xl">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
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
                  shadow="sm"
                  padding="xl"
                  radius="lg"
                  withBorder
                  style={{
                    height: "100%",
                    borderColor: "var(--border-color)",
                    backgroundColor: "var(--background-primary)",
                    cursor: "default",
                  }}
                >
                  <Stack gap="md">
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
                            "linear-gradient(135deg, #ff6b35, #d32f2f)",
                          color: "white",
                        }}
                      >
                        <IconTarget size={28} />
                      </ThemeIcon>
                      <Title order={3} c="var(--text-primary)">
                        {t.workshop.problem.title}
                      </Title>
                    </Box>
                    <List
                      spacing="sm"
                      icon={
                        <ThemeIcon color="red" size={20} radius="xl">
                          <IconX size={12} />
                        </ThemeIcon>
                      }
                    >
                      {t.workshop.problem.points.map(
                        (point: string, index: number) => (
                          <List.Item key={index}>{point}</List.Item>
                        )
                      )}
                    </List>
                  </Stack>
                </Card>
              </motion.div>

              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
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
                  shadow="sm"
                  padding="xl"
                  radius="lg"
                  withBorder
                  style={{
                    height: "100%",
                    borderColor: "var(--border-color)",
                    backgroundColor: "var(--background-primary)",
                    cursor: "default",
                  }}
                >
                  <Stack gap="md">
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
                          color: "white",
                        }}
                      >
                        <IconBrain size={28} />
                      </ThemeIcon>
                      <Title order={3} c="var(--text-primary)">
                        {t.workshop.solution.title}
                      </Title>
                    </Box>
                    <List
                      spacing="sm"
                      icon={
                        <ThemeIcon color="green" size={20} radius="xl">
                          <IconCheck size={12} />
                        </ThemeIcon>
                      }
                    >
                      {t.workshop.solution.points.map(
                        (point: string, index: number) => (
                          <List.Item key={index}>{point}</List.Item>
                        )
                      )}
                    </List>
                  </Stack>
                </Card>
              </motion.div>
            </Grid>
          </motion.div>
        </Section>

        {/* Success Stories */}
        <div id="success-stories">
          <SuccessStories />
        </div>

        {/* Workshop Details */}
        <Section id="workshop-details">
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
                  <motion.div
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
                          <IconClock size={28} />
                        </ThemeIcon>
                        <Box>
                          <Title order={4}>
                            {t.workshop.details.duration.title}
                          </Title>
                          <Text c="var(--text-primary)" fw={500}>
                            {t.workshop.details.duration.value}
                          </Text>
                          <Text
                            size="sm"
                            c="var(--text-secondary)"
                            style={{ lineHeight: 1.4 }}
                          >
                            {t.workshop.details.duration.description}
                          </Text>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>

                  <motion.div
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
                          <IconUsers size={28} />
                        </ThemeIcon>
                        <Box>
                          <Title order={4}>
                            {t.workshop.details.participants.title}
                          </Title>
                          <Text c="var(--text-primary)" fw={500}>
                            {t.workshop.details.participants.value}
                          </Text>
                          <Text
                            size="sm"
                            c="var(--text-secondary)"
                            style={{ lineHeight: 1.4 }}
                          >
                            {t.workshop.details.participants.description}
                          </Text>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>

                  <motion.div
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
                          <IconTrendingUp size={28} />
                        </ThemeIcon>
                        <Box>
                          <Title order={4}>
                            {t.workshop.details.outcome.title}
                          </Title>
                          <Text c="var(--text-primary)" fw={500}>
                            {t.workshop.details.outcome.value}
                          </Text>
                          <Text
                            size="sm"
                            c="var(--text-secondary)"
                            style={{ lineHeight: 1.4 }}
                          >
                            {t.workshop.details.outcome.description}
                          </Text>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
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
        </Section>

        {/* Workshop Agenda */}
        <Section id="workshop-agenda">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.01 }}
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
                  {t.workshop.agenda.title}
                </Title>
              </Stack>

              <Grid cols={{ mobile: 1, tablet: 1, desktop: 2 }} spacing="xl">
                {t.workshop.agenda.items.map((item, index: number) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.01 }}
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
                      shadow="sm"
                      padding="xl"
                      radius="lg"
                      withBorder
                      style={{
                        height: "100%",
                        borderColor: "var(--border-color)",
                        backgroundColor: "var(--background-primary)",
                        cursor: "default",
                      }}
                    >
                      <Stack gap="md">
                        <Title order={3} c="var(--text-primary)">
                          {item.title}
                        </Title>
                        <Text
                          c="var(--text-secondary)"
                          style={{ lineHeight: 1.6 }}
                        >
                          {item.description}
                        </Text>
                        <List spacing="xs" size="sm">
                          {item.points.map(
                            (point: string, pointIndex: number) => (
                              <List.Item key={pointIndex}>{point}</List.Item>
                            )
                          )}
                        </List>
                      </Stack>
                    </Card>
                  </motion.div>
                ))}
              </Grid>
            </Stack>
          </motion.div>
        </Section>

        {/* Final CTA & Navigation */}
        <Section>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.01 }}
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
                  Wie geht es weiter?
                </Title>
              </Stack>

              <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }} spacing="xl">
                {/* Workshop CTA */}
                <Card
                  shadow="lg"
                  padding="xl"
                  radius="lg"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                    color: "white",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <Stack
                    gap="lg"
                    align="center"
                    style={{ height: "100%", justifyContent: "space-between" }}
                  >
                    <Stack gap="lg" align="center">
                      <Title order={2} c="white">
                        {t.workshop.cta.title}
                      </Title>
                      <Text size="lg" c="white">
                        {t.workshop.cta.subtitle}
                      </Text>
                    </Stack>
                    <Button
                      size="lg"
                      variant="filled"
                      onClick={handleWorkshopInquiry}
                      style={{
                        fontSize: "1.1rem",
                        padding: "0.75rem 2rem",
                        backgroundColor: "var(--background-primary)",
                        color: "var(--text-primary)",
                        transition: "all 0.3s ease",
                      }}
                      styles={{
                        root: {
                          "&:hover": {
                            backgroundColor: "var(--text-primary)",
                            color: "var(--background-primary)",
                            transform: "translateY(-2px)",
                          },
                        },
                      }}
                    >
                      {t.workshop.cta.button}
                    </Button>
                  </Stack>
                </Card>

                {/* Navigation to main site */}
                <Card
                  shadow="sm"
                  padding="xl"
                  radius="lg"
                  withBorder
                  style={{
                    borderColor: "var(--border-color)",
                    backgroundColor: "var(--background-primary)",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <Stack
                    gap="lg"
                    align="center"
                    style={{ height: "100%", justifyContent: "space-between" }}
                  >
                    <Stack gap="lg" align="center">
                      <Title order={3} c="var(--text-primary)">
                        Mehr über meine Arbeit erfahren?
                      </Title>
                      <Text c="var(--text-secondary)">
                        Entdecken Sie meine anderen Services, Projekte und
                        Referenzen auf der Hauptseite.
                      </Text>
                    </Stack>

                    <Button
                      component="a"
                      href="/"
                      size="lg"
                      leftSection={<IconHome size={20} />}
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                        border: "none",
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      Zur Hauptseite
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Stack>
          </motion.div>
        </Section>

        {/* Contact Section */}
        <div id="contact">
          <Contact />
        </div>
      </main>
    </>
  );
};
