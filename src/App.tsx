import { useEffect } from "react";

import { Box } from "@mantine/core";

import { Route, Routes } from "react-router-dom";

import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { AnimatedHero } from "./components/Hero/AnimatedHero";
import { Navigation } from "./components/Navigation";
import { ProjectStats } from "./components/ProjectStats";
import { ProjectsSection } from "./components/Projects/ProjectsSection";
import { SEOHead } from "./components/SEO/SEOHead";
import { SimpleServices } from "./components/Services/SimpleServices";
import { WorkshopLandingPage } from "./components/Workshops/WorkshopLandingPage";
import { ModalProvider } from "./contexts/ModalContext";
import { useLanguageStore } from "./stores/languageStore";

const HomePage = () => {
  return (
    <>
      <SEOHead type="profile" />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          paddingTop: "2rem",
          paddingBottom: "1rem",
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
      <Box style={{ minHeight: "100vh" }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/workshops/ai-low-hanging-fruits"
            element={<WorkshopLandingPage />}
          />
        </Routes>
      </Box>
    </ModalProvider>
  );
}

export default App;
