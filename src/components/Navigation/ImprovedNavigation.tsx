import { useState } from 'react';
import { Group, Burger, Drawer, Stack, Button, Image, Anchor, Box, Text } from '@mantine/core';
import { IconMail, IconFileText } from '@tabler/icons-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Container } from '../Layout';
import logoImage from '../../assets/logo.webp';

export const ImprovedNavigation = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { isMobile } = useMediaQuery();

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Projekte', href: '#projects' },
    { label: 'Über mich', href: '#about' }
  ];

  const handleNavClick = (href: string) => {
    setDrawerOpened(false);
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 100; // Fixed header height
      const elementPosition = (element as HTMLElement).offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Box
        component="header"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 107, 53, 0.1)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
          paddingTop: '1.25rem',
          paddingBottom: '1rem'
        }}
      >
        <Container>
          <Group justify="space-between" align="center">
            {/* Logo & Brand */}
            <Anchor
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ textDecoration: 'none' }}
            >
              <Group gap="md" align="center">
                <Image
                  src={logoImage}
                  alt="12 of Spades"
                  h={50}
                  w="auto"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(255, 107, 53, 0.2))',
                    transition: 'transform 0.2s ease'
                  }}
                />
                {!isMobile && (
                  <Box>
                    <Text size="lg" fw={700} c="var(--text-primary)" style={{ lineHeight: 1.2 }}>
                      Johannes Herrmann
                    </Text>
                    <Text size="xs" c="var(--primary-orange)" fw={500} style={{ lineHeight: 1.2 }}>
                      Tech Freelancer & AI Specialist
                    </Text>
                  </Box>
                )}
              </Group>
            </Anchor>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Group gap="xl" align="center">
                {navItems.map((item) => (
                  <Anchor
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    style={{
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--text-primary)',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                    styles={{
                      root: {
                        '&:hover': {
                          color: 'var(--primary-orange)',
                          backgroundColor: 'rgba(255, 107, 53, 0.08)',
                          transform: 'translateY(-1px)'
                        }
                      }
                    }}
                  >
                    {item.label}
                  </Anchor>
                ))}
                
                {/* CTA Button */}
                <Button
                  variant="filled"
                  leftSection={<IconMail size={18} />}
                  style={{
                    background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
                    border: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    padding: '0.7rem 1.5rem',
                    borderRadius: '2rem',
                    boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)'
                      }
                    }
                  }}
                  onClick={() => handleNavClick('#contact')}
                >
                  Kontakt
                </Button>
              </Group>
            )}

            {/* Mobile Burger */}
            {isMobile && (
              <Group gap="md" align="center">
                {/* Mobile CTA */}
                <Button
                  variant="filled"
                  size="sm"
                  leftSection={<IconMail size={16} />}
                  style={{
                    background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
                    border: 'none',
                    borderRadius: '1.5rem'
                  }}
                  onClick={() => handleNavClick('#contact')}
                >
                  Kontakt
                </Button>
                
                <Burger
                  opened={drawerOpened}
                  onClick={() => setDrawerOpened(!drawerOpened)}
                  size="sm"
                  color="var(--primary-orange)"
                />
              </Group>
            )}
          </Group>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        position="right"
        size="xs"
        title={
          <Group gap="sm" align="center">
            <Image src={logoImage} alt="12 of Spades" h={30} w="auto" />
            <Text fw={600} size="sm">Navigation</Text>
          </Group>
        }
        styles={{
          title: { 
            color: 'var(--text-primary)',
            fontSize: '1rem'
          },
          header: {
            borderBottom: '1px solid rgba(255, 107, 53, 0.1)',
            backgroundColor: 'rgba(255, 107, 53, 0.02)'
          },
          body: {
            padding: '1.5rem'
          }
        }}
      >
        <Stack gap="lg">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="subtle"
              justify="flex-start"
              fullWidth
              onClick={() => handleNavClick(item.href)}
              style={{
                height: '50px',
                fontSize: '1.1rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                borderRadius: '0.75rem'
              }}
              styles={{
                root: {
                  '&:hover': {
                    backgroundColor: 'rgba(255, 107, 53, 0.08)',
                    color: 'var(--primary-orange)'
                  }
                }
              }}
            >
              {item.label}
            </Button>
          ))}
          
          <Button
            variant="filled"
            fullWidth
            leftSection={<IconFileText size={18} />}
            style={{
              background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
              height: '50px',
              fontSize: '1rem',
              fontWeight: 600,
              marginTop: '1rem'
            }}
            onClick={() => handleNavClick('#contact')}
          >
            Kontakt aufnehmen
          </Button>
        </Stack>
      </Drawer>

      {/* Spacer for fixed header */}
      <Box h={96} />
    </>
  );
};