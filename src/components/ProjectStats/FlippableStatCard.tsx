import { Card, Stack, Text, Box, SimpleGrid, ActionIcon } from '@mantine/core';
import { motion, useReducedMotion } from 'framer-motion';
import { IconProps, IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';

interface FlippableStatCardProps {
  icon: React.ComponentType<IconProps>;
  title: string;
  value: string;
  description: string;
  backContent: {
    title: string;
    items: string[];
  };
  isMobile?: boolean;
  accessibility: {
    cardFlipShow: string;
    cardFlipHide: string;
  };
}

export const FlippableStatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  description, 
  backContent,
  isMobile,
  accessibility
}: FlippableStatCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFlip();
    }
  };

  // If user prefers reduced motion, show back content immediately when requested
  const showBackContent = shouldReduceMotion ? isFlipped : false;
  const animationProps = shouldReduceMotion ? {} : {
    rotateY: isFlipped ? 180 : 0,
    transition: { duration: 0.6 }
  };

  return (
    <motion.div
      style={{ 
        perspective: '1000px',
        height: '100%'
      }}
      whileHover={shouldReduceMotion ? {} : { 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          cursor: 'pointer'
        }}
        animate={animationProps}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${title} card. ${isFlipped ? accessibility.cardFlipHide : accessibility.cardFlipShow}.`}
        aria-expanded={isFlipped}
      >
        {/* Front Side */}
        <Card
          padding="md"
          radius="lg"
          withBorder
          style={{
            position: shouldReduceMotion && showBackContent ? 'absolute' : 'relative',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--background-primary)',
            backfaceVisibility: 'hidden',
            transform: shouldReduceMotion ? 'none' : 'rotateY(0deg)',
            display: shouldReduceMotion && showBackContent ? 'none' : 'block',
            zIndex: isFlipped ? 1 : 2
          }}
        >
          <ActionIcon
            variant="subtle"
            size="xs"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: 'var(--text-secondary)',
              minWidth: '16px',
              minHeight: '16px',
              zIndex: 3,
            }}
            aria-hidden="true"
          >
            <motion.div
              animate={shouldReduceMotion ? {} : {
                rotate: isFlipped ? 180 : 0,
                transition: { duration: 0.6 }
              }}
            >
              <IconRefresh size={12} />
            </motion.div>
          </ActionIcon>

          <Stack gap="sm" align="center">
            <Box
              style={{
                background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
                borderRadius: '50%',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon size={24} color="white" />
            </Box>
            
            <Text 
              size="xl" 
              fw={700} 
              c="var(--text-primary)"
              style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}
            >
              {value}
            </Text>
            
            <Text size="sm" fw={600} c="var(--text-primary)" ta="center">
              {title}
            </Text>
            
            <Text size="xs" c="var(--text-secondary)" ta="center" style={{ lineHeight: 1.4 }}>
              {description}
            </Text>
          </Stack>
        </Card>

        {/* Back Side */}
        <Card
          padding="md"
          radius="lg"
          withBorder
          style={{
            position: shouldReduceMotion ? 'relative' : 'absolute',
            top: shouldReduceMotion ? 0 : '0',
            left: shouldReduceMotion ? 0 : '0',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--background-primary)',
            backfaceVisibility: shouldReduceMotion ? 'visible' : 'hidden',
            transform: shouldReduceMotion ? 'none' : 'rotateY(180deg)',
            display: shouldReduceMotion && !showBackContent ? 'none' : 'block',
            zIndex: isFlipped ? 2 : 1
          }}
        >
          <ActionIcon
            variant="subtle"
            size="xs"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: 'var(--text-secondary)',
              minWidth: '16px',
              minHeight: '16px',
              zIndex: 3,
            }}
            aria-hidden="true"
          >
            <motion.div
              animate={shouldReduceMotion ? {} : {
                rotate: isFlipped ? 180 : 0,
                transition: { duration: 0.6 }
              }}
            >
              <IconRefresh size={12} />
            </motion.div>
          </ActionIcon>

          <Stack gap="sm" style={{ height: '100%', justifyContent: 'center' }}>
            <Text
              size="xs"
              fw={700}
              c="var(--primary-orange)"
              style={{
                borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                paddingBottom: '0.5rem',
                marginBottom: '0.5rem'
              }}
            >
              {backContent.title}
            </Text>
            
            <SimpleGrid cols={2} spacing="xs" style={{ flex: 1 }}>
              {backContent.items.map((item) => (
                <Box key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Box
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
                      flexShrink: 0,
                    }}
                  />
                  <Text 
                    size="xs" 
                    c="var(--text-primary)" 
                    fw={500}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {item}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Card>
      </motion.div>
    </motion.div>
  );
};