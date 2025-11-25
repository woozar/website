import { useState } from "react";

import { Badge, Group } from "@mantine/core";

import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { useFilterStore } from "@/stores/filterStore";

import { TagChip } from "../Filter/TagChip";

interface TagListProps {
  primaryTags: string[];
  secondaryTags: string[];
  maxTags?: number;
  fontSize?: string;
  showMoreBadge?: boolean;
  selectable?: boolean;
}

export const TagList = ({
  primaryTags,
  secondaryTags,
  maxTags = 100,
  fontSize = "0.8rem",
  showMoreBadge = true,
  selectable = true,
}: TagListProps) => {
  const { t } = useTranslation();
  const { toggleTag, selectedTags } = useFilterStore();
  const [showAllTags, setShowAllTags] = useState(false);

  // Combine and sort tags: primary first, then secondary, both alphabetically sorted
  // Remove duplicates - if a tag exists in both arrays, prioritize primary
  // Also deduplicate within each array
  const uniquePrimaryTags = [...new Set(primaryTags || [])].sort((a, b) =>
    a.localeCompare(b)
  );
  const uniqueSecondaryTags = [...new Set(secondaryTags || [])].sort((a, b) =>
    a.localeCompare(b)
  );
  const filteredSecondaryTags = uniqueSecondaryTags.filter(
    (tag) => !uniquePrimaryTags.includes(tag)
  );

  const allTags = [
    ...uniquePrimaryTags.map((tag) => ({ tag, isPrimary: true })),
    ...filteredSecondaryTags.map((tag) => ({ tag, isPrimary: false })),
  ];

  // Ensure selected tags are always visible by prioritizing them
  const selectedTagsSet = new Set(selectedTags);
  const selectedTagItems = allTags.filter(({ tag }) =>
    selectedTagsSet.has(tag)
  );
  const unselectedTagItems = allTags.filter(
    ({ tag }) => !selectedTagsSet.has(tag)
  );

  // Combine with selected tags first, then unselected tags
  const prioritizedTags = [...selectedTagItems, ...unselectedTagItems];

  // Show all tags if showAllTags is true, otherwise limit to maxTags
  const displayedTags = showAllTags
    ? prioritizedTags
    : prioritizedTags.slice(0, maxTags);
  const hasMoreTags = prioritizedTags.length > maxTags && !showAllTags;

  const handleTagClick = (tag: string) => {
    if (!selectable) return;
    toggleTag(tag);
  };

  return (
    <Group gap={8} style={{ rowGap: 0 }}>
      {displayedTags.map(({ tag, isPrimary }) => (
        <motion.div
          key={`${isPrimary ? "primary" : "secondary"}-${tag}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TagChip
            tag={tag}
            isPrimary={isPrimary}
            isSelected={selectable ? selectedTags.includes(tag) : false}
            onClick={() => handleTagClick(tag)}
            style={{
              cursor: selectable ? "pointer" : "default",
              fontSize,
              lineHeight: 1,
            }}
          />
        </motion.div>
      ))}
      {hasMoreTags && showMoreBadge && (
        <Badge
          size="sm"
          color="orange"
          variant="outline"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            setShowAllTags(true);
          }}
        >
          +{prioritizedTags.length - maxTags} {t.filters.showMore}
        </Badge>
      )}
    </Group>
  );
};
