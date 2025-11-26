import { Box, Stack, Text } from "@mantine/core";

import { useTranslation } from "@/hooks/useTranslation";

interface BenefitsListProps {
  benefits:
    | string[]
    | {
        oneTime: string[];
        ongoing: string[];
      };
}

export const BenefitsList = ({ benefits }: BenefitsListProps) => {
  const { t } = useTranslation();

  const renderBenefitItem = (benefit: string) => (
    <Box
      key={benefit}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.5rem",
      }}
    >
      <Text size="xs" c="green" style={{ marginTop: "0.1rem" }}>
        ✓
      </Text>
      <Text size="xs" c="var(--text-secondary)" style={{ lineHeight: 1.4 }}>
        {benefit}
      </Text>
    </Box>
  );

  return (
    <Stack gap="xs" style={{ marginTop: "1rem" }}>
      {Array.isArray(benefits) ? (
        // Simple benefits list (for non-legacy cases)
        benefits.map(renderBenefitItem)
      ) : (
        // Structured benefits with oneTime/ongoing (for legacy case)
        <Stack gap="md">
          <Box>
            <Text size="sm" fw={600} c="var(--text-primary)" mb="xs">
              {t.workshop.successStories.benefitLabels.oneTime}
            </Text>
            <Stack gap="xs">{benefits.oneTime.map(renderBenefitItem)}</Stack>
          </Box>
          <Box>
            <Text size="sm" fw={600} c="var(--text-primary)" mb="xs">
              {t.workshop.successStories.benefitLabels.ongoing}
            </Text>
            <Stack gap="xs">{benefits.ongoing.map(renderBenefitItem)}</Stack>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};
