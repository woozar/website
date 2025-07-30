import { Group, Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { TagChip } from '../Filter/TagChip';
import { useFilterStore } from '../../stores/filterStore';

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
  fontSize = '0.8rem',
  showMoreBadge = true,
  selectable = true
}: TagListProps) => {
  const { togglePrimaryTag, toggleSecondaryTag, selectedPrimaryTags, selectedSecondaryTags } = useFilterStore();

  // Combine and sort tags: primary first, then secondary, both alphabetically sorted
  // Remove duplicates - if a tag exists in both arrays, prioritize primary
  // Also deduplicate within each array
  const uniquePrimaryTags = [...new Set(primaryTags || [])].sort();
  const uniqueSecondaryTags = [...new Set(secondaryTags || [])].sort();
  const filteredSecondaryTags = uniqueSecondaryTags.filter(tag => !uniquePrimaryTags.includes(tag));
  
  const allTags = [
    ...uniquePrimaryTags.map(tag => ({ tag, isPrimary: true })),
    ...filteredSecondaryTags.map(tag => ({ tag, isPrimary: false }))
  ];

  const displayedTags = allTags.slice(0, maxTags);
  const hasMoreTags = allTags.length > maxTags;

  const handleTagClick = (tag: string, isPrimary: boolean) => {
    if (!selectable) return;
    
    if (isPrimary) {
      togglePrimaryTag(tag);
    } else {
      toggleSecondaryTag(tag);
    }
  };

  return (
    <Group gap="xs">
      {displayedTags.map(({ tag, isPrimary }) => (
        <motion.div
          key={`${isPrimary ? 'primary' : 'secondary'}-${tag}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TagChip
            tag={tag}
            isPrimary={isPrimary}
            isSelected={selectable ? (isPrimary ? selectedPrimaryTags.includes(tag) : selectedSecondaryTags.includes(tag)) : false}
            onClick={selectable ? () => handleTagClick(tag, isPrimary) : undefined}
            style={{ cursor: selectable ? 'pointer' : 'default', fontSize }}
          />
        </motion.div>
      ))}
      {hasMoreTags && showMoreBadge && (
        <Badge size="sm" color="orange" variant="outline">
          +{allTags.length - maxTags} mehr
        </Badge>
      )}
    </Group>
  );
};