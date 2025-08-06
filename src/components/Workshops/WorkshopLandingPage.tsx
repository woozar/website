import { useEffect, useRef, useState } from "react";

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
  IconAlertTriangle,
  IconBrain,
  IconCheck,
  IconClock,
  IconHome,
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
  const { isMobile, isTablet } = useMediaQuery();
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const [frontHeight, setFrontHeight] = useState<number>(300);

  useEffect(() => {
    const updateHeight = () => {
      if (frontRef.current) {
        // Measure the natural height of the front content
        const height = frontRef.current.scrollHeight;
        setFrontHeight(height);
      }
    };

    // Initial measurement with delay to ensure content is rendered
    const timer = setTimeout(updateHeight, 150);

    // Update on resize
    window.addEventListener("resize", updateHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

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
          {/* Hero Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Box
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: window.innerWidth >= 1024 ? "flex-start" : "center",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              {/* Text Content */}
              <Stack
                gap="xl"
                ta={isMobile ? "center" : "left"}
                style={{ flex: 1, width: isMobile ? "100%" : "auto" }}
              >
                <Title
                  order={1}
                  style={{
                    fontSize: isMobile
                      ? "2.2rem"
                      : isTablet
                        ? "2.6rem"
                        : "3rem",
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

                {/* Flipcard für Hero-Text */}
                <Box
                  style={{
                    perspective: "1000px",
                    width: "100%",
                  }}
                >
                  <Box
                    style={{
                      position: "relative",
                      width: "100%",
                      height: `${frontHeight}px`,
                      transformStyle: "preserve-3d",
                      transition:
                        "transform 0.8s ease-in-out, height 0.3s ease-in-out",
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    }}
                  >
                    {/* Vorderseite */}
                    <Box
                      ref={frontRef}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "fit-content",
                        backfaceVisibility: "hidden",
                        padding: "1.5rem",
                        borderRadius: "16px",
                        background: "var(--background-primary)",
                        border: "2px solid var(--border-color)",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          gap: "1.5rem",
                          alignItems: "flex-start",
                          flexDirection: isMobile ? "column" : "row",
                        }}
                      >
                        {!isMobile && (
                          <Box style={{ flex: 1 }}>
                            <Text
                              size="xl"
                              c="var(--text-secondary)"
                              style={{
                                lineHeight: 1.6,
                                textAlign: "justify",
                                marginBottom: "1rem",
                              }}
                            >
                              {t.workshop.hero.subtitle}
                            </Text>
                          </Box>
                        )}

                        {/* Baum-Bild */}
                        <Box
                          style={{
                            flexShrink: 0,
                            width: isMobile ? "100%" : "180px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src="/assets/ai-low-hanging-fruits-illustration.webp"
                            alt="KI Low Hanging Fruits"
                            width="100%"
                            height="auto"
                            style={{
                              maxWidth: "180px",
                              borderRadius: "8px",
                              opacity: 0.9,
                            }}
                          />
                        </Box>

                        {isMobile && (
                          <Box style={{ width: "100%" }}>
                            <Text
                              size="xl"
                              c="var(--text-secondary)"
                              style={{
                                lineHeight: 1.6,
                                textAlign: "center",
                                marginBottom: "1rem",
                              }}
                            >
                              {t.workshop.hero.subtitle}
                            </Text>
                          </Box>
                        )}
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: isMobile ? "center" : "space-between",
                          gap: "1rem",
                          marginTop: "1rem",
                          flexDirection: isMobile ? "row" : "row",
                        }}
                      >
                        <Button
                          size="md"
                          onClick={() => {
                            const contactSection =
                              document.querySelector("#contact");
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
                            fontSize: "0.9rem",
                            padding: "0.5rem 1.2rem",
                          }}
                        >
                          {t.workshop.hero.ctaButton}
                        </Button>

                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.8rem",
                          }}
                        >
                          <Text size="sm" c="var(--text-secondary)" fw={400}>
                            {t.workshop.hero.aiGenerated}
                          </Text>
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => setIsFlipped(true)}
                            style={{
                              fontSize: "0.75rem",
                              padding: "0.3rem 0.8rem",
                              borderColor: "var(--text-secondary)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {t.workshop.hero.showPrompt}
                          </Button>
                        </Box>
                      </Box>
                    </Box>

                    {/* Rückseite */}
                    <Box
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        borderRadius: "16px",
                        background:
                          "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                        color: "white",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        style={{
                          padding: "1.5rem",
                          paddingBottom: "1rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          size="lg"
                          fw={600}
                          style={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          💬 Verwendete KI-Prompts
                        </Text>
                        <Box
                          style={{
                            cursor: "pointer",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background-color 0.2s ease",
                          }}
                          onClick={() => setIsFlipped(false)}
                        >
                          <Text
                            size="lg"
                            style={{
                              color: "white",
                              fontWeight: 600,
                              lineHeight: 1,
                            }}
                          >
                            ×
                          </Text>
                        </Box>
                      </Box>

                      <Box
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          minHeight: 0, // Wichtig für Flexbox-Scrolling
                          padding: "0 1.5rem 1.5rem 1.5rem",
                        }}
                      >
                        <Box
                          style={{
                            flex: 1,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            padding: "0",
                            minHeight: 0, // Wichtig für Flexbox-Scrolling
                          }}
                        >
                          <Box
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.3)",
                              padding: "0.8rem",
                              borderRadius: "6px",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            <Text
                              size="xs"
                              style={{
                                color: "rgba(255,255,255,0.7)",
                                fontWeight: 600,
                                marginBottom: "0.5rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Text-Prompt
                            </Text>
                            <Text
                              size="sm"
                              style={{
                                lineHeight: 1.5,
                                color: "rgba(255,255,255,0.95)",
                                fontFamily:
                                  "ui-monospace, SFMono-Regular, 'SF Mono', monospace",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {t.workshop.hero.textPrompt}
                            </Text>
                          </Box>

                          <Box
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.3)",
                              padding: "0.8rem",
                              borderRadius: "6px",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            <Text
                              size="xs"
                              style={{
                                color: "rgba(255,255,255,0.7)",
                                fontWeight: 600,
                                marginBottom: "0.5rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Bild-Prompt
                            </Text>
                            <Text
                              size="sm"
                              style={{
                                lineHeight: 1.5,
                                color: "rgba(255,255,255,0.95)",
                                fontFamily:
                                  "ui-monospace, SFMono-Regular, 'SF Mono', monospace",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {t.workshop.hero.imagePrompt}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </motion.div>

          {/* Problem/Solution Section */}
          <Box style={{ marginTop: "2rem" }}>
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
                          <IconAlertTriangle size={28} />
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
          </Box>
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
