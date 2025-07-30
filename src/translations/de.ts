export const de = {
  navigation: {
    services: 'Services',
    statistics: 'Statistiken',
    projects: 'Projekte',
    about: 'Über mich',
    contact: 'Kontakt',
    contactAction: 'Kontakt aufnehmen',
  },
  hero: {
    name: 'Johannes Herrmann',
    title: 'Software Freelancer & AI Specialist',
    description: 'Spezialisiert auf AI/LLM Entwicklung, Cloud Architecture und Full-Stack Development. Langjährige Erfahrung in der Entwicklung innovativer Tech-Lösungen für Unternehmen verschiedener Größen.',
    contactButton: 'Kontakt aufnehmen',
    projectsButton: 'Projekte ansehen',
  },
  services: {
    title: 'Meine Services',
    subtitle: 'Spezialisierte Expertise in den wichtigsten Zukunftstechnologien. Von AI-Integration bis hin zu skalierbaren Cloud-Architekturen.',
    technologies: 'Technologien:',
    items: {
      ai: {
        title: 'AI & LLM Development',
        description: 'Entwicklung von AI-basierten Anwendungen mit modernsten Large Language Models wie GPT-4, Claude und Gemini. Von Chatbots bis hin zu komplexen AI-Workflows.',
      },
      cloud: {
        title: 'Cloud Architecture',
        description: 'Design und Implementierung skalierbarer Cloud-Infrastrukturen mit AWS, Azure und modernen DevOps-Praktiken. Microservices, Serverless und Container-Orchestrierung.',
      },
      fullstack: {
        title: 'Full-Stack Development',
        description: 'Entwicklung moderner Web- und Mobile-Anwendungen mit React, Angular, Node.js und TypeScript. Responsive Design und perfekte User Experience.',
      },
    },
  },
  about: {
    title: 'Über mich',
    subtitle: 'Software Freelancer mit Leidenschaft für innovative AI-Lösungen und moderne Webtechnologien.',
    description1: 'Als erfahrener Software Freelancer mit dem Fokus auf AI/LLM Entwicklung und moderne Webtechnologien unterstütze ich Unternehmen dabei, innovative digitale Lösungen zu entwickeln und umzusetzen.',
    description2: 'Meine Expertise liegt in der Entwicklung von AI-basierten Anwendungen, der Implementierung von Cloud-Architekturen und der Erstellung von skalierbaren Full-Stack-Webanwendungen. Dabei lege ich besonderen Wert auf benutzerfreundliche Interfaces und performante Backend-Systeme.',
    description3: 'In meiner Laufbahn habe ich bereits für renommierte Unternehmen wie DMG Mori gearbeitet und dabei komplexe SharePoint-Migration, Intranet-Modernisierung und Business Process Automation Projekte erfolgreich umgesetzt.',
    highlights: 'Highlights',
    expertise: 'Technische Expertise',
    highlightsList: [
      '~20 Jahre Erfahrung in Softwareentwicklung',
      'Spezialist für AI/LLM Integration und Prompt Engineering',
      'Erfolgreich abgeschlossene Projekte für Unternehmen wie DMG Mori',
      'Expertise in modernen Web-Technologien und Cloud-Architekturen',
      'Fokus auf benutzerfreundlichen und skalierbaren Lösungen',
    ],
    skills: {
      aiLlm: {
        category: 'AI & LLM',
        items: ['LLMs (GPT, Claude, Gemini)', 'LangChain', 'Audio Stream Processing', 'Video Generation', 'Neural Network Training', 'Prompt Engineering'],
      },
      frontend: {
        category: 'Frontend',
        items: ['React', 'TypeScript', 'Next.js', 'Angular', 'Material UI', 'Responsive Design'],
      },
      backend: {
        category: 'Backend',
        items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Prisma', 'REST APIs'],
      },
      cloud: {
        category: 'Cloud & DevOps',
        items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Kafka & MQTT', 'CI/CD'],
      },
      quality: {
        category: 'Quality Assurance',
        items: ['Unit Tests', 'E2E Tests', 'Integration Tests', 'Quality Gates', 'Clean Code', 'Static Code Analysis'],
      },
      training: {
        category: 'Training & Workshops',
        items: ['Workshop-Durchführung', 'Technische Schulungen', 'Team-Mentoring', 'Präsentationen', 'Wissensvermittlung', 'Code Reviews'],
      },
    },
  },
  contact: {
    title: 'Kontakt',
    subtitle: 'Bereit für Ihr nächstes Projekt? Lassen Sie uns über Ihre Anforderungen sprechen und gemeinsam innovative Lösungen entwickeln.',
    followMe: 'Folgen Sie mir',
    contactItems: {
      email: 'E-Mail',
      phone: 'Telefon',
      location: 'Standort',
      locationValue: 'Weisendorf, Deutschland',
    },
    legal: {
      impressum: 'Impressum',
      datenschutz: 'Datenschutz',
    },
  },
  projects: {
    title: 'Projekte & Erfahrung',
    subtitle: 'Eine Auswahl meiner erfolgreichen Projekte aus verschiedenen Branchen.',
    showingCount: (filtered: number, total: number) => `${filtered} von ${total} Projekten angezeigt`,
  },
  projectStats: {
    title: 'Projekt-Statistiken',
    subtitle: 'Quantifizierte Expertise basierend auf realer Projekterfahrung',
    coreExpertise: 'Kern-Technologie-Expertise',
    trustedBy: 'Erfolgreich zusammengearbeitet mit',
    frameworksTooltip: '🛠️ Verwendete Frameworks',
    cards: {
      totalProjects: 'Gesamt-Projekte',
      totalProjectsDesc: 'Erfolgreich abgeschlossene Projekte',
      technologies: 'Technologien',
      technologiesDesc: 'Verschiedene verwendete Technologien',
      frameworks: 'Frameworks',
      frameworksDesc: 'Verwendete Frameworks & Libraries',
      companies: 'Unternehmen',
      companiesDesc: 'Zusammengearbeitete Unternehmen',
      yearsExperience: 'Jahre Erfahrung',
      yearsExperienceDesc: 'Jahre professionelle Erfahrung'
    },
    expertiseLevel: {
      expert: 'Experten-Level',
      advanced: 'Fortgeschritten',
      specialist: 'Spezialist'
    },
    technologies: {
      typescript: 'TypeScript',
      nodejs: 'Node.js',
      azure: 'Azure',
      aiLlm: 'AI & LLM'
    },
    experience: {
      years8: '8 Jahre',
      years6: '6 Jahre',
      years5: '5 Jahre'
    }
  },
  filters: {
    activeFilters: 'Aktive Filter:',
    clearAllFilters: 'Alle Filter löschen',
    showMore: 'mehr'
  },
  theme: {
    light: 'Hell',
    dark: 'Dunkel',
    switchToLight: 'Zu hellem Modus wechseln',
    switchToDark: 'Zu dunklem Modus wechseln'
  },
  language: {
    german: 'Deutsch',
    english: 'English'
  },
  project: {
    technologies: 'Technologien',
    noDescription: 'Keine Beschreibung verfügbar'
  }
};