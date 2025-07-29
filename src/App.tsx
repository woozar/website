import { Box } from '@mantine/core';
import { ImprovedNavigation } from './components/Navigation/ImprovedNavigation';
import { AnimatedHero } from './components/Hero/AnimatedHero';
import { SimpleServices } from './components/Services/SimpleServices';
import { SimpleProjectsSection } from './components/Projects/SimpleProjectsSection';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';

function App() {
  return (
    <Box style={{ minHeight: '100vh' }}>
      <ImprovedNavigation />
      <main style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '4rem',
        paddingTop: '2rem',
        paddingBottom: '1rem'
      }}>
        <AnimatedHero />
        <SimpleServices />
        <SimpleProjectsSection />
        <About />
        <Contact />
      </main>
    </Box>
  );
}

export default App;