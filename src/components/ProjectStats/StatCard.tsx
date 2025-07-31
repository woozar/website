import { Card, Stack, Text, Box, Tooltip } from '@mantine/core';
import { motion, useReducedMotion } from 'framer-motion';
import { IconProps } from '@tabler/icons-react';

interface StatCardProps {
  icon: React.ComponentType<IconProps>;
  title: string;
  value: string;
  description: string;
  tooltip?: React.ReactNode;
}

export const StatCard = ({ icon: Icon, title, value, description, tooltip }: StatCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  const card = (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Card
        padding="lg"
        radius="lg"
        withBorder
        style={{
          height: '100%',
          textAlign: 'center',
          borderColor: 'var(--border-color)',
          backgroundColor: 'var(--background-primary)',
          position: 'relative'
        }}
      >
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
            style={{
              background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
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
    </motion.div>
  );

  if (tooltip) {
    return (
      <Tooltip
        label={tooltip}
        position="bottom"
        withArrow
        multiline
        w={300}
        style={{
          background: 'var(--background-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          boxShadow: '0 8px 32px var(--shadow-color)'
        }}
      >
        {card}
      </Tooltip>
    );
  }

  return card;
};