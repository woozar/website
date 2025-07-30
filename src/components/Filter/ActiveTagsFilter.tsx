import { Group, Badge, Text, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilterStore } from '../../stores/filterStore';

export const ActiveTagsFilter = () => {
  const { 
    selectedTags, 
    toggleTag,
    clearAllFilters 
  } = useFilterStore();

  const hasActiveFilters = selectedTags.length > 0;

  if (!hasActiveFilters) return null;

  const removeTag = (tag: string) => {
    toggleTag(tag);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        style={{ marginBottom: '1rem' }}
      >
        <Group gap="md" align="center">
          <Text size="sm" fw={600} c="var(--text-primary)">
            Aktive Filter:
          </Text>
          
          <Group gap="xs">
            {selectedTags.map((tag: string) => (
              <motion.div
                key={`tag-${tag}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  size="md"
                  radius="xl"
                  variant="filled"
                  color="red"
                  style={{
                    backgroundColor: 'var(--primary-red)',
                    color: 'white',
                    paddingRight: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {tag}
                  <ActionIcon
                    size="xs"
                    variant="transparent"
                    color="white"
                    onClick={() => removeTag(tag)}
                    style={{ 
                      minWidth: '16px', 
                      minHeight: '16px',
                      color: 'white'
                    }}
                  >
                    <IconX size={12} />
                  </ActionIcon>
                </Badge>
              </motion.div>
            ))}
          </Group>

          <Badge
            size="sm"
            variant="outline"
            color="gray"
            style={{ cursor: 'pointer' }}
            onClick={clearAllFilters}
          >
            Alle Filter löschen
          </Badge>
        </Group>
      </motion.div>
    </AnimatePresence>
  );
};