import { Box } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import { useLanguageStore } from './stores/languageStore';
import { useEffect } from 'react';
import { ModalProvider } from './contexts/ModalContext';
import { ImprovedNavigation } from './components/Navigation/ImprovedNavigation';
import { AnimatedHero } from './components/Hero/AnimatedHero';
import { SimpleServices } from './components/Services/SimpleServices';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { ProjectStats } from './components/ProjectStats';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { SEOHead } from './components/SEO/SEOHead';
import { WorkshopLandingPage } from './components/Workshops/WorkshopLandingPage';

const HomePage = () => {
  return (
    <>
      <SEOHead type="profile" />
      <main
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '4rem',
          paddingTop: '2rem',
          paddingBottom: '1rem'
        }}
      >
        <AnimatedHero />
        <SimpleServices />
        <ProjectStats />
        <ProjectsSection />
        <About />
        <Contact />
      </main>
    </>
  );
};

function App() {
  const language = useLanguageStore((state) => state.language);
  
  // Update document language attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  
  return (
    <ModalProvider>
      <Box style={{ minHeight: '100vh' }}>
        <ImprovedNavigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workshops/ai-low-hanging-fruits" element={<WorkshopLandingPage />} />
        </Routes>
      </Box>
    </ModalProvider>
  );
}

export default App;