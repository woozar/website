import { Box, SimpleGrid } from '@mantine/core';
import { useThemeStore } from '../../stores/themeStore';

interface CompanyLogosProps {
  onCompanyClick: (companyName: string) => void;
}

export const CompanyLogos = ({ onCompanyClick }: CompanyLogosProps) => {
  const theme = useThemeStore((state) => state.theme);

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, fallbackText: string, color: string) => {
    e.currentTarget.style.display = 'none';
    const textFallback = document.createElement('div');
    textFallback.innerHTML = `<span style="font-size: 16px; font-weight: 700; color: ${color}; font-family: Arial, sans-serif; letter-spacing: 0.5px;">${fallbackText}</span>`;
    e.currentTarget.parentNode?.appendChild(textFallback);
  };

  const companyLogos = [
    {
      name: 'Siemens AG',
      fileName: 'siemens-logo.svg',
      fallbackColor: '#009999'
    },
    {
      name: 'DMG MORI',
      fileName: 'dmg-mori-logo.webp',
      fallbackColor: '#333'
    },
    {
      name: 'KUKA AG',
      fileName: 'kuka-logo.svg',
      fallbackColor: '#FF8800'
    },
    {
      name: 'Saurer AG',
      fileName: 'saurer-logo.png',
      fallbackColor: '#1E40AF'
    },
    {
      name: 'Paessler AG',
      fileName: theme === 'dark' ? 'paessler-logo-dark-mode.png' : 'paessler-logo.png',
      fallbackColor: '#1976D2'
    },
    {
      name: 'T3 Software',
      fileName: 't3-logo.svg',
      fallbackColor: '#6366F1'
    },
    {
      name: 'Sikant GmbH',
      fileName: theme === 'dark' ? 'sikant-med-logo-dark-mode.png' : 'sikant-med-logo.png',
      fallbackColor: '#2563eb'
    },
    {
      name: 'ChatYourData GmbH',
      fileName: theme === 'dark' ? 'chatyourdata-logo-dark-mode.png' : 'chatyourdata-logo.png',
      fallbackColor: '#7C3AED'
    }
  ];

  return (
    <Box
      style={{
        width: '100%',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'transparent'
      }}
    >
      <SimpleGrid 
        cols={{ base: 2, sm: 3, md: 4 }} 
        spacing="xl"
        style={{ alignItems: 'center' }}
      >
        {companyLogos.map((company) => (
          <Box
            key={company.name}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80px',
              padding: '10px',
              cursor: 'pointer'
            }}
            onClick={() => onCompanyClick(company.name)}
          >
            <img
              src={`/assets/logos/${company.fileName}`}
              alt={company.name}
              style={{
                height: '40px',
                width: 'auto',
                maxWidth: '120px',
                objectFit: 'contain',
                opacity: '1',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onError={(e) => handleImageError(e, company.name, company.fallbackColor)}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};