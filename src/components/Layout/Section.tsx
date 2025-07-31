import { ReactNode } from 'react';
import { Box } from '@mantine/core';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Section = ({ 
  children, 
  id, 
  className,
  paddingY,
  containerSize = 'lg'
}: SectionProps) => {
  const paddings = {
    sm: '2rem 0',
    md: '3rem 0',
    lg: '4rem 0',
    xl: '6rem 0'
  };

  return (
    <Box
      id={id}
      className={className}
      component="section"
      style={{
        background: 'transparent',
        padding: paddingY ? paddings[paddingY] : '0',
        color: 'var(--text-primary)'
      }}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </Box>
  );
};