import { Box, Button, Card, List, Stack, Text, Title } from "@mantine/core";

import { IconHome } from "@tabler/icons-react";

import { Variants, motion } from "framer-motion";

import { useLocation } from "react-router-dom";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/hooks/useTranslation";

import { Contact } from "../Contact/Contact";
import { Grid, Section } from "../Layout";
import { SEOHead } from "../SEO/SEOHead";
import { SuccessStories } from "./SuccessStories";
import { HeroSection } from "./WorkshopLandingPage/HeroSection";
import { ProblemSolutionSection } from "./WorkshopLandingPage/ProblemSolutionSection";
import { WorkshopDetailsSection } from "./WorkshopLandingPage/WorkshopDetailsSection";

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

    window.location.href = `mailto:workshops@12-of-spades.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <SEOHead
        type="article"
        title={t.workshop.seo.title}
        description={t.workshop.seo.description}
        keywords={t.workshop.seo.keywords}
        url="https://12-of-spades.com/workshops/ai-low-hanging-fruits"
        image="/assets/ai-low-hanging-fruits-illustration.webp"
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
        {/* Hero & Problem/Solution Section */}
        <Section>
          <HeroSection itemVariants={itemVariants} />

          <ProblemSolutionSection
            itemVariants={itemVariants}
            cardVariants={cardVariants}
          />
        </Section>

        {/* Success Stories */}
        <div id="success-stories">
          <SuccessStories />
        </div>

        {/* Workshop Details */}
        <Section id="workshop-details">
          <WorkshopDetailsSection itemVariants={itemVariants} />
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

              {/* Konkreter Ablauf */}
              <Stack gap="xl" style={{ marginTop: "3rem" }}>
                <Stack gap="md" align="center" ta="center">
                  <Title
                    order={3}
                    style={{
                      fontSize: isMobile ? "1.5rem" : "1.8rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {t.workshop.process.title}
                  </Title>
                  <Text
                    size="md"
                    c="var(--text-secondary)"
                    ta="center"
                    style={{ maxWidth: "100%" }}
                  >
                    {t.workshop.process.subtitle}
                  </Text>
                </Stack>

                <Stack gap="xl" style={{ marginTop: "1rem" }}>
                  {t.workshop.process.steps.map((step, index: number) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.01 }}
                      transition={{ delay: index * 0.2 }}
                      style={{ position: "relative" }}
                    >
                      <Box
                        style={{
                          position: "absolute",
                          top: "-5px",
                          left: "30px",
                          background:
                            "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                          color: "white",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "1rem",
                          zIndex: 10,
                        }}
                      >
                        {step.number}
                      </Box>
                      <Card
                        shadow="sm"
                        padding="xl"
                        radius="lg"
                        withBorder
                        style={{
                          borderColor: "var(--border-color)",
                          backgroundColor: "var(--background-primary)",
                          position: "relative",
                          marginTop: "20px",
                        }}
                      >
                        <Stack gap="md" style={{ paddingTop: "1rem" }}>
                          <Title
                            order={4}
                            c="var(--text-primary)"
                            style={{ paddingLeft: "20px" }}
                          >
                            {step.title}
                          </Title>
                          <Text
                            c="var(--text-secondary)"
                            style={{ lineHeight: 1.6 }}
                          >
                            {step.description}
                          </Text>

                          {step.options && (
                            <Stack gap="md" style={{ marginTop: "1rem" }}>
                              {step.options.map(
                                (option, optionIndex: number) => (
                                  <Box
                                    key={optionIndex}
                                    style={{
                                      backgroundColor:
                                        "var(--background-secondary)",
                                      padding: "1rem",
                                      borderRadius: "8px",
                                      borderLeft:
                                        "4px solid var(--primary-orange)",
                                    }}
                                  >
                                    <Stack gap="xs">
                                      <Text fw={600} c="var(--text-primary)">
                                        {option.title}
                                      </Text>
                                      <Text size="sm" c="var(--text-secondary)">
                                        {option.description}
                                      </Text>
                                    </Stack>
                                  </Box>
                                )
                              )}
                            </Stack>
                          )}
                        </Stack>
                      </Card>
                    </motion.div>
                  ))}
                </Stack>
              </Stack>
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
