import { useState } from "react";

import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandStackoverflow,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";

import { motion, useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslation } from "@/hooks/useTranslation";

import { Section } from "../Layout";
import { LegalModal } from "../Modal/LegalModal";

export const Contact = () => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [impressumOpened, setImpressumOpened] = useState(false);
  const [datenschutzOpened, setDatenschutzOpened] = useState(false);

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? {}
        : {
            staggerChildren: 0.2,
            delayChildren: 0.1,
          },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : { duration: 0.6 },
    },
  };

  const contactItems = [
    {
      icon: IconMail,
      label: t.contact.contactItems.email,
      value: "info@12-of-spades.com",
      href: "mailto:info@12-of-spades.com",
    },
    {
      icon: IconPhone,
      label: t.contact.contactItems.phone,
      value: "+49 176 8100 1371",
      href: "tel:+4917681001371",
    },
    {
      icon: IconMapPin,
      label: t.contact.contactItems.location,
      value: t.contact.contactItems.locationValue,
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: IconBrandLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/johannes-herrmann-795550128/",
    },
    {
      icon: IconBrandGithub,
      label: "GitHub",
      href: "https://github.com/woozar",
    },
    {
      icon: IconBrandStackoverflow,
      label: "StackOverflow",
      href: "https://stackoverflow.com/users/3914932/woozar",
    },
  ];

  return (
    <Section id="contact">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Stack gap="xl" align="center">
          <motion.div variants={itemVariants}>
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
                {t.contact.title}
              </Title>
              <Text size="lg" c="var(--text-secondary)" maw="600px">
                {t.contact.subtitle}
              </Text>
            </Stack>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box
              style={{
                backgroundColor: "rgba(255, 107, 53, 0.1)",
                border: "1px solid rgba(255, 107, 53, 0.3)",
                color: "var(--primary-orange)",
                padding: "0.5rem 1rem",
                borderRadius: "12px",
                textAlign: "center",
                maxWidth: "400px",
              }}
            >
              <Text size="sm" fw={400}>
                {t.contact.gernePerDu}
              </Text>
            </Box>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Group
              gap="xl"
              justify="center"
              style={{ flexDirection: "row", flexWrap: "wrap" }}
            >
              {contactItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Box
                    component={item.href ? "a" : "div"}
                    href={item.href || undefined}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: item.href ? "pointer" : "default",
                    }}
                  >
                    <Stack gap="sm" align="center" ta="center">
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
                        <item.icon size={28} />
                      </Box>
                      <Stack gap="xs" align="center">
                        <Text fw={600} c="var(--text-primary)">
                          {item.label}
                        </Text>
                        <Text size="sm" c="var(--text-secondary)">
                          {item.value}
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </motion.div>
              ))}
            </Group>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Stack gap="md" align="center">
              <Text fw={600} c="var(--text-primary)">
                {t.contact.followMe}
              </Text>
              <Group gap="md">
                {socialLinks.map((link) => (
                  <motion.div
                    key={link.label}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      component="a"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      leftSection={<link.icon size={20} />}
                      style={{
                        borderColor: "var(--primary-orange)",
                        color: "var(--primary-orange)",
                      }}
                    >
                      {link.label}
                    </Button>
                  </motion.div>
                ))}
              </Group>
            </Stack>
          </motion.div>

          <motion.div variants={itemVariants} style={{ width: "100%" }}>
            <Divider my="lg" />
            <Stack gap="xs" align="center" ta="center">
              <Text size="xs" c="var(--text-secondary)">
                <strong>Johannes Herrmann - 12 of Spades</strong> • Feldweiher
                9, 91085 Weisendorf (Buch) • Umsatzsteuer-ID: DE323916092
              </Text>
              <Group gap="sm" justify="center">
                <Anchor
                  size="xs"
                  c="var(--primary-orange)"
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={() => setImpressumOpened(true)}
                >
                  {t.contact.legal.impressum}
                </Anchor>
                <Text size="xs" c="var(--text-secondary)">
                  •
                </Text>
                <Anchor
                  size="xs"
                  c="var(--primary-orange)"
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={() => setDatenschutzOpened(true)}
                >
                  {t.contact.legal.datenschutz}
                </Anchor>
              </Group>
            </Stack>
          </motion.div>
        </Stack>
      </motion.div>

      {/* Legal Modals */}
      <LegalModal
        opened={impressumOpened}
        onClose={() => setImpressumOpened(false)}
        type="impressum"
      />
      <LegalModal
        opened={datenschutzOpened}
        onClose={() => setDatenschutzOpened(false)}
        type="datenschutz"
      />
    </Section>
  );
};
