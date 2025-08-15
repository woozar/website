import { useEffect, useRef, useState } from "react";

import { Box, Button, Image, Stack, Text, Title } from "@mantine/core";

import { Variants, motion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";

interface HeroSectionProps {
  itemVariants: Variants;
}

export const HeroSection = ({ itemVariants }: HeroSectionProps) => {
  const { isMobile, isTablet } = useMediaQuery();
  const { t } = useTranslation();
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

  const handleScrollToContact = () => {
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
    <motion.div variants={itemVariants} initial="hidden" animate="visible">
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
              fontSize: isMobile ? "2.2rem" : isTablet ? "2.6rem" : "3rem",
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
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
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
                  {!isMobile && (
                    <Button
                      size="md"
                      onClick={handleScrollToContact}
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
                  )}

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
                        whiteSpace: "nowrap",
                        minWidth: "fit-content",
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
  );
};
