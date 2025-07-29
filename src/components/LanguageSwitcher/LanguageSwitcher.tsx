import { Button, Menu } from '@mantine/core';
import { useLanguageStore, Language } from '../../stores/languageStore';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
}

export const LanguageSwitcher = ({ variant = 'desktop' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguageStore();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const buttonStyle = {
    borderColor: 'var(--primary-orange)',
    color: 'var(--primary-orange)',
    background: 'transparent',
    border: '1px solid var(--primary-orange)',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease'
  };

  const hoverStyle = {
    '&:hover': {
      background: 'rgba(255, 107, 53, 0.08)',
      transform: 'translateY(-1px)'
    }
  };

  if (variant === 'mobile') {
    return (
      <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? 'filled' : 'outline'}
            size="sm"
            fullWidth
            leftSection={<span style={{ fontSize: '1rem' }}>{lang.flag}</span>}
            onClick={() => setLanguage(lang.code)}
            style={{
              borderColor: 'var(--primary-orange)',
              color: language === lang.code ? 'white' : 'var(--primary-orange)',
              background: language === lang.code 
                ? 'linear-gradient(135deg, var(--primary-orange), var(--primary-red))' 
                : 'transparent'
            }}
          >
            {lang.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <Menu shadow="md" width={180} position="bottom-end" zIndex={1100}>
      <Menu.Target>
        <Button
          variant="outline"
          size="xs"
          style={{
            ...buttonStyle,
            minWidth: '40px',
            height: '28px',
            fontSize: '1rem',
            padding: '0 8px'
          }}
          styles={{ root: hoverStyle }}
        >
          {currentLanguage.flag}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {languages.map((lang) => (
          <Menu.Item
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            style={{
              fontSize: '0.85rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: language === lang.code ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
              color: language === lang.code ? 'var(--primary-orange)' : 'var(--text-primary)',
              fontWeight: language === lang.code ? 600 : 400
            }}
            leftSection={<span style={{ fontSize: '0.9rem' }}>{lang.flag}</span>}
          >
            {lang.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};