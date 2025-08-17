import { Box, Button, Group, Image, Stack, Text, Title } from "@mantine/core";

import { IconDownload, IconMail } from "@tabler/icons-react";

import { Variants, motion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useModal } from "@/hooks/useModal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/hooks/useTranslation";

import { Section } from "../Layout";

// import heroPortrait from '../../assets/hero-portrait.webp';
const heroPortrait = "/assets/hero-portrait.webp";

export const Hero = () => {
  const { isMobile, isTablet } = useMediaQuery();
  const { openImageModal } = useModal();
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 100; // Fixed header height
      const elementPosition = (element as HTMLElement).offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? {}
        : {
            staggerChildren: 0.2,
            delayChildren: 0.3,
          },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? {}
        : {
            duration: 0.8,
            ease: "easeOut",
          },
    },
  };

  const logoVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.8,
      rotate: shouldReduceMotion ? 0 : -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: shouldReduceMotion
        ? {}
        : {
            duration: 1,
            ease: "easeOut",
          },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: shouldReduceMotion ? 1 : 1.05,
      transition: shouldReduceMotion ? {} : { duration: 0.2 },
    },
    tap: { scale: shouldReduceMotion ? 1 : 0.95 },
  };

  return (
    <Section>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Group
          align="center"
          justify="space-between"
          gap="xl"
          style={{
            flexDirection: isMobile
              ? "column-reverse"
              : isTablet
                ? "column-reverse"
                : "row",
            textAlign: isMobile ? "center" : isTablet ? "center" : "left",
          }}
        >
          {/* Content */}
          <Stack gap="xl" style={{ flex: 1 }}>
            <motion.div variants={itemVariants}>
              <Stack gap="md">
                <Title
                  order={1}
                  style={{
                    fontSize: isMobile
                      ? "2.5rem"
                      : isTablet
                        ? "3rem"
                        : "3.5rem",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    background:
                      "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.hero.name}
                </Title>
                <Text
                  size={isMobile ? "lg" : "xl"}
                  fw={600}
                  c="var(--text-primary)"
                  style={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }}
                >
                  {t.hero.title}
                </Text>
              </Stack>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Stack gap="sm">
                {t.hero.description.map((descItem, index) => {
                  return (
                    <Text
                      key={index}
                      size={isMobile ? "md" : "lg"}
                      c="var(--text-secondary)"
                      style={{ lineHeight: 1.7 }}
                    >
                      <>
                        <Text
                          component="span"
                          fw={700}
                          c="var(--primary-orange)"
                        >
                          {descItem.highlight}
                        </Text>
                        <Text component="span">: {descItem.text}</Text>
                      </>
                    </Text>
                  );
                })}
              </Stack>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Group
                gap="md"
                justify={isMobile || isTablet ? "center" : "flex-start"}
              >
                <motion.div
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    size="lg"
                    variant="filled"
                    leftSection={<IconMail size={20} />}
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                      border: "none",
                      fontSize: "1rem",
                    }}
                    onClick={() => handleNavClick("#contact")}
                  >
                    {t.hero.contactButton}
                  </Button>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    leftSection={<IconDownload size={20} />}
                    style={{
                      borderColor: "var(--primary-orange)",
                      color: "var(--primary-orange)",
                      fontSize: "1rem",
                    }}
                    onClick={() => handleNavClick("#projects")}
                  >
                    {t.hero.projectsButton}
                  </Button>
                </motion.div>
              </Group>
            </motion.div>
          </Stack>

          {/* Portrait/Image */}
          <motion.div
            variants={logoVariants}
            style={{ flex: isMobile ? "0 0 auto" : "0 0 350px" }}
          >
            <Box
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }
                }
              >
                <Image
                  src={heroPortrait}
                  alt="Johannes Herrmann - Software Freelancer"
                  style={{
                    width: isMobile ? "200px" : isTablet ? "250px" : "300px",
                    height: isMobile ? "200px" : isTablet ? "250px" : "300px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "4px solid var(--primary-orange)",
                    filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.15))",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    openImageModal({
                      src: heroPortrait,
                      alt: "Johannes Herrmann - Software Freelancer (Vergrößerte Ansicht)",
                    });
                  }}
                />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "20%",
                  right: "-10%",
                  width: "40px",
                  height: "40px",
                  background:
                    "linear-gradient(135deg, var(--secondary-orange), var(--accent-gold))",
                  borderRadius: "50%",
                  opacity: 0.3,
                  filter: "blur(1px)",
                }}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {}
                    : {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              />

              <motion.div
                style={{
                  position: "absolute",
                  bottom: "30%",
                  left: "-5%",
                  width: "20px",
                  height: "20px",
                  background: "var(--primary-red)",
                  borderRadius: "50%",
                  opacity: 0.4,
                }}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: [0, 15, 0],
                        x: [0, 5, 0],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? {}
                    : {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }
                }
              />
            </Box>
          </motion.div>
        </Group>
      </motion.div>
    </Section>
  );
};
