import { useEffect } from "react";

import { Button, Modal, Stack, Text, Title } from "@mantine/core";

import { IconX } from "@tabler/icons-react";

import {
  AnimatePresence,
  Variants,
  motion,
  useReducedMotion,
} from "framer-motion";

import { useModal } from "@/hooks/useModal";

interface LegalModalProps {
  opened: boolean;
  onClose: () => void;
  type: "impressum" | "datenschutz";
}

export const LegalModal = ({ opened, onClose, type }: LegalModalProps) => {
  const { openModal, closeModal } = useModal();
  const shouldReduceMotion = useReducedMotion();

  // Hide scrollbars during modal animation and update global modal state
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
      openModal();
    } else {
      document.body.style.overflow = "";
      closeModal();
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened, openModal, closeModal]);

  const modalVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: 1,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: shouldReduceMotion
        ? {}
        : {
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.3,
          },
    },
    exit: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.9,
      y: shouldReduceMotion ? 0 : 30,
      transition: shouldReduceMotion
        ? {}
        : {
            duration: 0.2,
            ease: "easeInOut",
          },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? {}
        : {
            staggerChildren: 0.05,
            delayChildren: 0.1,
          },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? {} : { duration: 0.3 },
    },
  };

  const getContent = () => {
    if (type === "impressum") {
      return {
        title: "Impressum",
        content: (
          <Stack gap="md">
            <Text fw={600}>Johannes Herrmann</Text>
            <Text fw={600}>12 of Spades</Text>
            <Text>Feldweiher 9</Text>
            <Text>91085 Weisendorf(Buch)</Text>

            <Stack gap="xs" mt="md">
              <Text>
                <strong>Telefon:</strong> +49 176 8100 1371
              </Text>
              <Text>
                <strong>E-Mail:</strong> info@12ofspades.com
              </Text>
            </Stack>

            <Text mt="md">
              <strong>
                Umsatzsteuer-Identifikationsnummer nach §27a Umsatzsteuergesetz:
              </strong>
              <br />
              DE323916092
            </Text>
          </Stack>
        ),
      };
    } else {
      return {
        title: "Disclaimer - rechtliche Hinweise",
        content: (
          <Stack gap="lg">
            <Stack gap="md">
              <Title order={4} c="var(--primary-orange)">
                § 1 Warnhinweis zu Inhalten
              </Title>
              <Text size="sm" style={{ lineHeight: 1.7 }}>
                Die kostenlosen und frei zugänglichen Inhalte dieser Webseite
                wurden mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser
                Webseite übernimmt jedoch keine Gewähr für die Richtigkeit und
                Aktualität der bereitgestellten kostenlosen und frei
                zugänglichen journalistischen Ratgeber und Nachrichten.
                Namentlich gekennzeichnete Beiträge geben die Meinung des
                jeweiligen Autors und nicht immer die Meinung des Anbieters
                wieder. Allein durch den Aufruf der kostenlosen und frei
                zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen
                dem Nutzer und dem Anbieter zustande, insoweit fehlt es am
                Rechtsbindungswillen des Anbieters.
              </Text>
            </Stack>

            <Stack gap="md">
              <Title order={4} c="var(--primary-orange)">
                § 2 Externe Links
              </Title>
              <Text size="sm" style={{ lineHeight: 1.7 }}>
                Diese Website enthält Verknüpfungen zu Websites Dritter
                ("externe Links"). Diese Websites unterliegen der Haftung der
                jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen
                Verknüpfung der externen Links die fremden Inhalte daraufhin
                überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt
                waren keine Rechtsverstöße ersichtlich. Der Anbieter hat
                keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung
                und auf die Inhalte der verknüpften Seiten. Das Setzen von
                externen Links bedeutet nicht, dass sich der Anbieter die hinter
                dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine
                ständige Kontrolle der externen Links ist für den Anbieter ohne
                konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei
                Kenntnis von Rechtsverstößen werden jedoch derartige externe
                Links unverzüglich gelöscht.
              </Text>
            </Stack>

            <Stack gap="md">
              <Title order={4} c="var(--primary-orange)">
                § 3 Urheber- und Leistungsschutzrechte
              </Title>
              <Text size="sm" style={{ lineHeight: 1.7 }}>
                Die auf dieser Website veröffentlichten Inhalte unterliegen dem
                deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen
                Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung
                bedarf der vorherigen schriftlichen Zustimmung des Anbieters
                oder jeweiligen Rechteinhabers. Dies gilt insbesondere für
                Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung,
                Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder
                anderen elektronischen Medien und Systemen. Inhalte und Rechte
                Dritter sind dabei als solche gekennzeichnet. Die unerlaubte
                Vervielfältigung oder Weitergabe einzelner Inhalte oder
                kompletter Seiten ist nicht gestattet und strafbar. Lediglich
                die Herstellung von Kopien und Downloads für den persönlichen,
                privaten und nicht kommerziellen Gebrauch ist erlaubt.
              </Text>
              <Text size="sm" style={{ lineHeight: 1.7, marginTop: "1rem" }}>
                Die Darstellung dieser Website in fremden Frames ist nur mit
                schriftlicher Erlaubnis zulässig.
              </Text>
            </Stack>

            <Stack gap="md">
              <Title order={4} c="var(--primary-orange)">
                § 4 Besondere Nutzungsbedingungen
              </Title>
              <Text size="sm" style={{ lineHeight: 1.7 }}>
                Soweit besondere Bedingungen für einzelne Nutzungen dieser
                Website von den vorgenannten Paragraphen abweichen, wird an
                entsprechender Stelle ausdrücklich darauf hingewiesen. In diesem
                Falle gelten im jeweiligen Einzelfall die besonderen
                Nutzungsbedingungen.
              </Text>
              <Text
                size="xs"
                style={{ marginTop: "0.5rem", fontStyle: "italic" }}
              >
                Quelle: Impressum-Generator von Impressum-Recht.de
              </Text>
            </Stack>

            <Stack gap="md" mt="xl">
              <Title order={3} c="var(--primary-orange)">
                Datenschutzerklärung
              </Title>

              <Stack gap="md">
                <Title order={4} c="var(--primary-orange)">
                  Datenschutz
                </Title>
                <Text size="sm" style={{ lineHeight: 1.7 }}>
                  Nachfolgend möchten wir Sie über unsere Datenschutzerklärung
                  informieren. Sie finden hier Informationen über die Erhebung
                  und Verwendung persönlicher Daten bei der Nutzung unserer
                  Webseite. Wir beachten dabei das für Deutschland geltende
                  Datenschutzrecht. Sie können diese Erklärung jederzeit auf
                  unserer Webseite abrufen.
                </Text>
                <Text size="sm" style={{ lineHeight: 1.7, marginTop: "1rem" }}>
                  Wir weisen ausdrücklich darauf hin, dass die Datenübertragung
                  im Internet (z.B. bei der Kommunikation per E-Mail)
                  Sicherheitslücken aufweisen und nicht lückenlos vor dem
                  Zugriff durch Dritte geschützt werden kann.
                </Text>
                <Text size="sm" style={{ lineHeight: 1.7, marginTop: "1rem" }}>
                  Die Verwendung der Kontaktdaten unseres Impressums zur
                  gewerblichen Werbung ist ausdrücklich nicht erwünscht, es sei
                  denn wir hatten zuvor unsere schriftliche Einwilligung erteilt
                  oder es besteht bereits eine Geschäftsbeziehung. Der Anbieter
                  und alle auf dieser Website genannten Personen widersprechen
                  hiermit jeder kommerziellen Verwendung und Weitergabe ihrer
                  Daten.
                </Text>
              </Stack>

              <Stack gap="md">
                <Title order={4} c="var(--primary-orange)">
                  Personenbezogene Daten
                </Title>
                <Text size="sm" style={{ lineHeight: 1.7 }}>
                  Sie können unsere Webseite ohne Angabe personenbezogener Daten
                  besuchen. Soweit auf unseren Seiten personenbezogene Daten
                  (wie Name, Anschrift oder E-Mail Adresse) erhoben werden,
                  erfolgt dies, soweit möglich, auf freiwilliger Basis. Diese
                  Daten werden ohne Ihre ausdrückliche Zustimmung nicht an
                  Dritte weitergegeben. Sofern zwischen Ihnen und uns ein
                  Vertragsverhältnis begründet, inhaltlich ausgestaltet oder
                  geändert werden soll oder Sie an uns eine Anfrage stellen,
                  erheben und verwenden wir personenbezogene Daten von Ihnen,
                  soweit dies zu diesen Zwecken erforderlich ist
                  (Bestandsdaten). Wir erheben, verarbeiten und nutzen
                  personenbezogene Daten soweit dies erforderlich ist, um Ihnen
                  die Inanspruchnahme des Webangebots zu ermöglichen
                  (Nutzungsdaten). Sämtliche personenbezogenen Daten werden nur
                  solange gespeichert wie dies für den geannten Zweck
                  (Bearbeitung Ihrer Anfrage oder Abwicklung eines Vertrags)
                  erforderlich ist. Hierbei werden steuer- und handelsrechtliche
                  Aufbewahrungsfristen berücksichtigt. Auf Anordnung der
                  zuständigen Stellen dürfen wir im Einzelfall Auskunft über
                  diese Daten (Bestandsdaten) erteilen, soweit dies für Zwecke
                  der Strafverfolgung, zur Gefahrenabwehr, zur Erfüllung der
                  gesetzlichen Aufgaben der Verfassungsschutzbehörden oder des
                  Militärischen Abschirmdienstes oder zur Durchsetzung der
                  Rechte am geistigen Eigentum erforderlich ist.
                </Text>
              </Stack>

              <Stack gap="md">
                <Title order={4} c="var(--primary-orange)">
                  Datenschutzerklärung für den Webanalysedienst Google Analytics
                </Title>
                <Text size="sm" style={{ lineHeight: 1.7 }}>
                  Diese Website benutzt Google Analytics, einen Webanalysedienst
                  der Google Inc. ("Google"). Google Analytics verwendet sog.
                  "Cookies", Textdateien, die auf Ihrem Computer gespeichert
                  werden und die eine Analyse der Benutzung der Website durch
                  Sie ermöglichen. Die durch den Cookie erzeugten Informationen
                  über Ihre Benutzung dieser Website werden in der Regel an
                  einen Server von Google in den USA übertragen und dort
                  gespeichert. Wir haben die IP-Anonymisierung aktiviert. Auf
                  dieser Webseite wird Ihre IP-Adresse von Google daher
                  innerhalb von Mitgliedstaaten der Europäischen Union oder in
                  anderen Vertragsstaaten des Abkommens über den Europäischen
                  Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die
                  volle IP-Adresse an einen Server von Google in den USA
                  übertragen und dort gekürzt. Im Auftrag des Betreibers dieser
                  Website wird Google diese Informationen benutzen, um Ihre
                  Nutzung der Website auszuwerten, um Reports über die
                  Websiteaktivitäten zusammenzustellen und um weitere mit der
                  Websitenutzung und der Internetnutzung verbundene
                  Dienstleistungen gegenüber dem Websitebetreiber zu erbringen.
                  Die im Rahmen von Google Analytics von Ihrem Browser
                  übermittelte IP-Adresse wird nicht mit anderen Daten von
                  Google zusammengeführt. Sie können die Speicherung der Cookies
                  durch eine entsprechende Einstellung Ihrer Browser-Software
                  verhindern; wir weisen Sie jedoch darauf hin, dass Sie in
                  diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser
                  Website vollumfänglich werden nutzen können. Sie können
                  darüber hinaus die Erfassung der durch das Cookie erzeugten
                  und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer
                  IP-Adresse) an Google sowie die Verarbeitung dieser Daten
                  durch Google verhindern, indem sie das unter dem folgenden
                  Link verfügbare Browser-Plugin herunterladen und installieren:
                  http://tools.google.com/dlpage/gaoptout?hl=de
                </Text>
              </Stack>

              <Stack gap="md">
                <Title order={4} c="var(--primary-orange)">
                  Auskunftsrecht
                </Title>
                <Text size="sm" style={{ lineHeight: 1.7 }}>
                  Sie haben das jederzeitige Recht, sich unentgeltlich und
                  unverzüglich über die zu Ihrer Person erhobenen Daten zu
                  erkundigen. Sie haben das jederzeitige Recht, Ihre Zustimmung
                  zur Verwendung Ihrer angegeben persönlichen Daten mit Wirkung
                  für die Zukunft zu widerrufen. Zur Auskunftserteilung wenden
                  Sie sich bitte an den Anbieter unter den Kontaktdaten im
                  Impressum.
                </Text>
              </Stack>
            </Stack>
          </Stack>
        ),
      };
    }
  };

  const { title, content } = getContent();

  return (
    <AnimatePresence>
      {opened && (
        <Modal
          opened={opened}
          onClose={onClose}
          size="xl"
          centered
          padding={0}
          radius="lg"
          withCloseButton={false}
          overlayProps={{
            backgroundOpacity: 0.6,
            blur: 8,
          }}
          zIndex={1100}
          styles={{
            body: {
              background: "transparent",
              boxShadow: "none",
              padding: 0,
              overflow: "hidden",
            },
            content: {
              background: "transparent",
              boxShadow: "none",
              overflow: "hidden",
            },
          }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              background: "var(--background-primary)",
              borderRadius: "1rem",
              padding: "2rem",
              maxHeight: "80vh",
              position: "relative",
              boxShadow: "0 20px 60px var(--shadow-color)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close Button */}
            <motion.div
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 10,
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
            >
              <Button
                variant="subtle"
                size="sm"
                onClick={onClose}
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  padding: 0,
                  color: "var(--text-secondary)",
                }}
              >
                <IconX size={20} />
              </Button>
            </motion.div>

            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <motion.div variants={itemVariants} style={{ flexShrink: 0 }}>
                <Title
                  order={2}
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, var(--primary-orange), var(--primary-red))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingRight: "3rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {title}
                </Title>
              </motion.div>

              {/* Scrollable Content */}
              <motion.div
                variants={itemVariants}
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflow: "auto",
                  padding: "0 2px",
                }}
              >
                {content}
              </motion.div>
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};
