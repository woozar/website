import { useState, useEffect } from 'react';
import { Group, Burger, Drawer, Stack, Button, Image, Anchor, Box, Text } from '@mantine/core';
import { IconMail, IconFileText } from '@tabler/icons-react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Container } from '../Layout';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { useTranslation } from '../../hooks/useTranslation';
import { useModal } from '../../hooks/useModal';
// import logoImage from '../../assets/logo.webp';
const logoImage = '/assets/logo.webp';

export const ImprovedNavigation = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { isMobile, isTablet } = useMediaQuery();
  const { t } = useTranslation();
  const { isModalOpen } = useModal();


  // Close drawer when screen becomes desktop size or when modal opens
  useEffect(() => {
    if (!isMobile && drawerOpened) {
      setDrawerOpened(false);
    }
  }, [isMobile, drawerOpened]);

  // Close drawer when modal opens
  useEffect(() => {
    if (isModalOpen && drawerOpened) {
      setDrawerOpened(false);
    }
  }, [isModalOpen, drawerOpened]);

  const navItems = [
    { label: t.navigation.services, href: '#services' },
    { label: t.navigation.statistics, href: '#statistics' },
    { label: t.navigation.projects, href: '#projects' },
    { label: t.navigation.about, href: '#about' }
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
          backgroundColor: 'var(--backdrop-filter)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-color)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: '0 2px 20px var(--shadow-color)',
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
                {!isMobile && !isTablet && (
                  <Box>
                    <Text size="lg" fw={700} c="var(--text-primary)" style={{ lineHeight: 1.2 }}>
                      Johannes Herrmann
                    </Text>
                    <Text size="xs" c="var(--primary-orange)" fw={500} style={{ lineHeight: 1.2 }}>
                      Software Freelancer & AI Specialist
                    </Text>
                  </Box>
                )}
                {!isMobile && isTablet && (
                  <Box>
                    <Text size="md" fw={700} c="var(--text-primary)" style={{ lineHeight: 1.1 }}>
                      J. Herrmann
                    </Text>
                  </Box>
                )}
              </Group>
            </Anchor>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Group gap={isTablet ? "sm" : "md"} align="center">
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
                      fontSize: isTablet ? '0.85rem' : '0.9rem',
                      color: 'var(--text-primary)',
                      padding: isTablet ? '0.3rem 0.6rem' : '0.4rem 0.8rem',
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
                
                {/* Theme & Language Switchers */}
                {!isTablet && (
                  <Group gap="xs">
                    <ThemeSwitcher variant="desktop" />
                    <LanguageSwitcher variant="desktop" />
                  </Group>
                )}
                
                {/* CTA Button */}
                <Button
                  variant="filled"
                  leftSection={<IconMail size={18} />}
                  style={{
                    background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))',
                    border: 'none',
                    fontSize: isTablet ? '0.85rem' : '0.9rem',
                    fontWeight: 600,
                    padding: isTablet ? '0.5rem 1rem' : '0.6rem 1.2rem',
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
                  {t.navigation.contact}
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
                  {t.navigation.contact}
                </Button>
                
                <Burger
                  opened={drawerOpened}
                  onClick={() => {
                    // Prevent opening drawer when modal is open
                    if (!isModalOpen) {
                      setDrawerOpened(!drawerOpened);
                    }
                  }}
                  size="sm"
                  color="var(--primary-orange)"
                  style={{
                    opacity: isModalOpen ? 0.5 : 1,
                    pointerEvents: isModalOpen ? 'none' : 'auto',
                    transition: 'opacity 0.2s ease'
                  }}
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
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--background-primary)'
          },
          body: {
            padding: '1.5rem',
            backgroundColor: 'var(--background-primary)'
          },
          content: {
            backgroundColor: 'var(--background-primary)'
          },
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
          
          {/* Theme Switcher */}
          <ThemeSwitcher variant="mobile" />
          
          {/* Language Switcher */}
          <LanguageSwitcher variant="mobile" />
          
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
            {t.navigation.contactAction}
          </Button>
        </Stack>
      </Drawer>

      {/* Spacer for fixed header */}
      <Box h={96} />
    </>
  );
};