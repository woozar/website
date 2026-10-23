import { Anchor, Box, Group, Text } from "@mantine/core";

import { IconExternalLink } from "@tabler/icons-react";

import { useTranslation } from "@/hooks/useTranslation";
import { PressReference } from "@/types";

interface PressLinkProps {
  reference: PressReference;
}

export const PressLink = ({ reference }: PressLinkProps) => {
  const { t, language } = useTranslation();

  const meta =
    reference.language && reference.language !== language
      ? `${reference.source} · ${t.press.languageHint[reference.language]}`
      : reference.source;

  return (
    <Group gap="sm" wrap="nowrap" align="flex-start">
      {reference.favicon && (
        // Decorative only, the link text names the source
        <img
          src={reference.favicon}
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          style={{ flexShrink: 0, marginTop: "0.3rem" }}
        />
      )}
      <Box style={{ textAlign: "left" }}>
        <Anchor
          href={reference.url}
          target="_blank"
          rel="noopener noreferrer"
          fw={600}
          c="var(--primary-orange)"
          underline="hover"
        >
          „{reference.title}“{" "}
          <IconExternalLink
            size={14}
            aria-hidden="true"
            style={{ verticalAlign: "middle" }}
          />
        </Anchor>
        <Text size="sm" c="var(--text-secondary)">
          {meta}
        </Text>
      </Box>
    </Group>
  );
};
