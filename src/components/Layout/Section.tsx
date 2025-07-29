import { ReactNode } from 'react';
import { Box } from '@mantine/core';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: 'white' | 'light' | 'primary';
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Section = ({ 
  children, 
  id, 
  className,
  background = 'white',
  paddingY,
  containerSize = 'lg'
}: SectionProps) => {
  const backgrounds = {
    white: 'var(--background-primary)',
    light: 'var(--background-secondary)',
    primary: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))'
  };

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
        background: backgrounds[background],
        padding: paddingY ? paddings[paddingY] : '0',
        color: background === 'primary' ? 'white' : 'var(--text-primary)'
      }}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </Box>
  );
};