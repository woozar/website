import { Group, Badge, Text, ActionIcon } from '@mantine/core';
import { IconX, IconBuilding, IconTag, IconRefresh } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilterStore } from '@/stores/filterStore';
import { useTranslation } from '@/hooks/useTranslation';

export const ActiveTagsFilter = () => {
  const { t } = useTranslation();
  const { 
    selectedTags,
    selectedCustomer,
    toggleTag,
    setCustomerFilter,
    clearAllFilters 
  } = useFilterStore();

  const hasActiveFilters = selectedTags.length > 0 || selectedCustomer !== '';

  if (!hasActiveFilters) return null;

  const removeTag = (tag: string) => {
    toggleTag(tag);
  };

  const removeCustomerFilter = () => {
    setCustomerFilter('');
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
            {t.filters.activeFilters}
          </Text>
          
          <Group gap="xs">
            {selectedCustomer && (
              <motion.div
                key={`customer-${selectedCustomer}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  size="md"
                  radius="xl"
                  variant="filled"
                  color="blue"
                  style={{
                    backgroundColor: 'var(--mantine-color-blue-6)',
                    color: 'white',
                    paddingRight: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                    <IconBuilding size={14} />
                    {selectedCustomer.split(' ')[0]} {/* Show first word of company name */}
                    <ActionIcon
                      size="xs"
                      variant="transparent"
                      color="white"
                      onClick={removeCustomerFilter}
                      style={{ 
                        minWidth: '16px', 
                        minHeight: '16px',
                        color: 'white'
                      }}
                    >
                      <IconX size={12} />
                    </ActionIcon>
                  </div>
                </Badge>
              </motion.div>
            )}
            
            {selectedTags.map((tag) => (
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
                    paddingRight: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                    <IconTag size={14} />
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
                  </div>
                </Badge>
              </motion.div>
            ))}
          </Group>

          <Badge
            size="md"
            variant="outline"
            color="gray"
            style={{ 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              height: '24px',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem'
            }}
            onClick={clearAllFilters}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
              <IconRefresh size={14} />
              {t.filters.clearAllFilters}
            </div>
          </Badge>
        </Group>
      </motion.div>
    </AnimatePresence>
  );
};