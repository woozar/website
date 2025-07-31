import { describe, it, expect } from 'vitest';
import { en } from './en';

describe('English translations (en)', () => {
  it('should export translation object', () => {
    expect(en).toBeDefined();
    expect(typeof en).toBe('object');
  });

  it('should have navigation translations', () => {
    expect(en.navigation).toBeDefined();
    expect(en.navigation.services).toBe('Services');
    expect(en.navigation.statistics).toBe('Statistics');
    expect(en.navigation.projects).toBe('Projects');
    expect(en.navigation.about).toBe('About');
    expect(en.navigation.contact).toBe('Contact');
    expect(en.navigation.contactAction).toBe('Get in Touch');
  });

  it('should have hero translations', () => {
    expect(en.hero).toBeDefined();
    expect(en.hero.name).toBe('Johannes Herrmann');
    expect(en.hero.title).toBe('Software Freelancer & AI Specialist');
    expect(typeof en.hero.description).toBe('string');
    expect(en.hero.contactButton).toBe('Get in Touch');
    expect(en.hero.projectsButton).toBe('View Projects');
  });

  it('should have services translations', () => {
    expect(en.services).toBeDefined();
    expect(en.services.title).toBe('My Services');
    expect(typeof en.services.subtitle).toBe('string');
    expect(en.services.technologies).toBe('Technologies:');
  });

  it('should have all main sections defined', () => {
    expect(en).toHaveProperty('navigation');
    expect(en).toHaveProperty('hero');
    expect(en).toHaveProperty('services');
    expect(en).toHaveProperty('projects');
    expect(en).toHaveProperty('about');
    expect(en).toHaveProperty('contact');
    expect(en).toHaveProperty('projectStats');
  });

  it('should have projects section with required properties', () => {
    expect(en.projects).toBeDefined();
    expect(en.projects).toHaveProperty('title');
    expect(en.projects).toHaveProperty('subtitle');
    expect(typeof en.projects.title).toBe('string');
    expect(typeof en.projects.subtitle).toBe('string');
  });

  it('should have about section with required properties', () => {
    expect(en.about).toBeDefined();
    expect(en.about).toHaveProperty('title');
    expect(en.about).toHaveProperty('subtitle');
    expect(typeof en.about.title).toBe('string');
    expect(typeof en.about.subtitle).toBe('string');
  });

  it('should have contact section with required properties', () => {
    expect(en.contact).toBeDefined();
    expect(en.contact).toHaveProperty('title');
    expect(en.contact).toHaveProperty('subtitle');
    expect(typeof en.contact.title).toBe('string');
    expect(typeof en.contact.subtitle).toBe('string');
  });

  it('should have projectStats section with required properties', () => {
    expect(en.projectStats).toBeDefined();
    expect(en.projectStats).toHaveProperty('title');
    expect(en.projectStats).toHaveProperty('subtitle');
    expect(typeof en.projectStats.title).toBe('string');
    expect(typeof en.projectStats.subtitle).toBe('string');
  });

  it('should have consistent English language content', () => {
    // Ensure English translations are properly in English
    expect(en.navigation.about).toBe('About');
    expect(en.navigation.contact).toBe('Contact');
    expect(en.services.title).toBe('My Services');
    
    // Ensure no German text leaked into English translations
    expect(JSON.stringify(en)).not.toContain('Über');
    expect(JSON.stringify(en)).not.toContain('Kontakt');
    expect(JSON.stringify(en)).not.toContain('Meine');
    expect(JSON.stringify(en)).not.toContain('Projekte');
  });

  it('should use proper English grammar and terminology', () => {
    // Check for proper English terms
    expect(en.hero.contactButton).toBe('Get in Touch');
    expect(en.hero.projectsButton).toBe('View Projects');
    expect(en.navigation.contactAction).toBe('Get in Touch');
    
    // Check that proper English capitalization is used
    expect(en.navigation.services).toBe('Services');
    expect(en.navigation.projects).toBe('Projects');
    expect(en.navigation.statistics).toBe('Statistics');
  });

  it('should have working showingCount function', () => {
    expect(typeof en.projects.showingCount).toBe('function');
    expect(en.projects.showingCount(5, 10)).toBe('Showing 5 of 10 projects');
    expect(en.projects.showingCount(1, 3)).toBe('Showing 1 of 3 projects');
    expect(en.projects.showingCount(0, 5)).toBe('Showing 0 of 5 projects');
  });
});