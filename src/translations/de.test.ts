import { describe, it, expect } from 'vitest';
import { de } from './de';

describe('German translations (de)', () => {
  it('should export translation object', () => {
    expect(de).toBeDefined();
    expect(typeof de).toBe('object');
  });

  it('should have navigation translations', () => {
    expect(de.navigation).toBeDefined();
    expect(de.navigation.services).toBe('Services');
    expect(de.navigation.statistics).toBe('Statistiken');
    expect(de.navigation.projects).toBe('Projekte');
    expect(de.navigation.about).toBe('Über mich');
    expect(de.navigation.contact).toBe('Kontakt');
    expect(de.navigation.contactAction).toBe('Kontakt aufnehmen');
  });

  it('should have hero translations', () => {
    expect(de.hero).toBeDefined();
    expect(de.hero.name).toBe('Johannes Herrmann');
    expect(de.hero.title).toBe('Software Freelancer & AI Specialist');
    expect(typeof de.hero.description).toBe('string');
    expect(de.hero.contactButton).toBe('Kontakt aufnehmen');
    expect(de.hero.projectsButton).toBe('Projekte ansehen');
  });

  it('should have services translations', () => {
    expect(de.services).toBeDefined();
    expect(de.services.title).toBe('Meine Services');
    expect(typeof de.services.subtitle).toBe('string');
    expect(de.services.technologies).toBe('Technologien:');
  });

  it('should have all main sections defined', () => {
    expect(de).toHaveProperty('navigation');
    expect(de).toHaveProperty('hero');
    expect(de).toHaveProperty('services');
    expect(de).toHaveProperty('projects');
    expect(de).toHaveProperty('about');
    expect(de).toHaveProperty('contact');
    expect(de).toHaveProperty('projectStats');
  });

  it('should have projects section with required properties', () => {
    expect(de.projects).toBeDefined();
    expect(de.projects).toHaveProperty('title');
    expect(de.projects).toHaveProperty('subtitle');
    expect(typeof de.projects.title).toBe('string');
    expect(typeof de.projects.subtitle).toBe('string');
  });

  it('should have about section with required properties', () => {
    expect(de.about).toBeDefined();
    expect(de.about).toHaveProperty('title');
    expect(de.about).toHaveProperty('subtitle');
    expect(typeof de.about.title).toBe('string');
    expect(typeof de.about.subtitle).toBe('string');
  });

  it('should have contact section with required properties', () => {
    expect(de.contact).toBeDefined();
    expect(de.contact).toHaveProperty('title');
    expect(de.contact).toHaveProperty('subtitle');
    expect(typeof de.contact.title).toBe('string');
    expect(typeof de.contact.subtitle).toBe('string');
  });

  it('should have projectStats section with required properties', () => {
    expect(de.projectStats).toBeDefined();
    expect(de.projectStats).toHaveProperty('title');
    expect(de.projectStats).toHaveProperty('subtitle');
    expect(typeof de.projectStats.title).toBe('string');
    expect(typeof de.projectStats.subtitle).toBe('string');
  });

  it('should have consistent German language content', () => {
    // Check that German-specific characters and terms are used appropriately
    expect(de.navigation.about).toContain('Über');
    expect(de.hero.contactButton).toContain('Kontakt');
    expect(de.services.title).toContain('Meine');
    
    // Ensure no inappropriate English text leaked into German translations
    expect(JSON.stringify(de)).not.toContain('About Me');
    expect(JSON.stringify(de)).not.toContain('Get in Touch');
    // Note: 'Services' is used in German translations as well, so we don't check for it
  });

  it('should have working showingCount function', () => {
    expect(typeof de.projects.showingCount).toBe('function');
    expect(de.projects.showingCount(5, 10)).toBe('5 von 10 Projekten angezeigt');
    expect(de.projects.showingCount(1, 3)).toBe('1 von 3 Projekten angezeigt');
    expect(de.projects.showingCount(0, 5)).toBe('0 von 5 Projekten angezeigt');
  });
});