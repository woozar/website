import { render } from '@testing-library/react';
import { SEOHead } from './SEOHead';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock useTranslation
vi.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: {
      hero: {
        description: 'Mocked hero description'
      }
    }
  })
}));

describe('SEOHead', () => {
  beforeEach(() => {
    // Clean up document head before each test
    document.head.innerHTML = '';
    document.title = '';
  });

  it('should update document title with default site title', () => {
    render(<SEOHead />);
    
    expect(document.title).toBe('12 of Spades - Johannes Herrmann');
  });

  it('should update document title with custom title', () => {
    render(<SEOHead title="Custom Page" />);
    
    expect(document.title).toBe('Custom Page | 12 of Spades - Johannes Herrmann');
  });

  it('should create basic meta tags', () => {
    render(<SEOHead />);
    
    const descriptionMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    expect(descriptionMeta?.content).toBe('Mocked hero description');
    
    const authorMeta = document.querySelector('meta[name="author"]') as HTMLMetaElement;
    expect(authorMeta?.content).toBe('Johannes Herrmann');
    
    const keywordsMeta = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    expect(keywordsMeta?.content).toContain('Software Freelancer');
  });

  it('should create OpenGraph meta tags', () => {
    render(<SEOHead />);
    
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    expect(ogTitle?.content).toBe('12 of Spades - Johannes Herrmann');
    
    const ogType = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
    expect(ogType?.content).toBe('website');
    
    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    expect(ogUrl?.content).toBe('https://v2.12-of-spades.com');
  });

  it('should create Twitter Card meta tags', () => {
    render(<SEOHead />);
    
    const twitterCard = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;
    expect(twitterCard?.content).toBe('summary_large_image');
    
    const twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
    expect(twitterTitle?.content).toBe('12 of Spades - Johannes Herrmann');
  });

  it('should create profile-specific meta tags when type is profile', () => {
    render(<SEOHead type="profile" />);
    
    const firstName = document.querySelector('meta[property="profile:first_name"]') as HTMLMetaElement;
    expect(firstName?.content).toBe('Johannes');
    
    const lastName = document.querySelector('meta[property="profile:last_name"]') as HTMLMetaElement;
    expect(lastName?.content).toBe('Herrmann');
  });

  it('should create canonical link', () => {
    render(<SEOHead url="https://example.com" />);
    
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    expect(canonical?.href).toBe('https://example.com/');
  });

  it('should set document language', () => {
    render(<SEOHead />);
    
    expect(document.documentElement.lang).toBe('de');
  });

  it('should create structured data scripts', () => {
    render(<SEOHead />);
    
    const personSchema = document.querySelector('script[data-id="person-schema"]') as HTMLScriptElement;
    expect(personSchema).toBeTruthy();
    
    const websiteSchema = document.querySelector('script[data-id="website-schema"]') as HTMLScriptElement;
    expect(websiteSchema).toBeTruthy();
    
    // Verify JSON-LD content
    const personData = JSON.parse(personSchema.textContent || '{}');
    expect(personData['@type']).toBe('Person');
    expect(personData.name).toBe('Johannes Herrmann');
  });

  it('should use custom description when provided', () => {
    const customDescription = 'Custom description for testing';
    render(<SEOHead description={customDescription} />);
    
    const descriptionMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    expect(descriptionMeta?.content).toBe(customDescription);
  });

  it('should handle absolute image URLs', () => {
    const absoluteImageUrl = 'https://example.com/image.jpg';
    render(<SEOHead image={absoluteImageUrl} />);
    
    const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    expect(ogImage?.content).toBe(absoluteImageUrl);
  });

  it('should construct relative image URLs correctly', () => {
    render(<SEOHead image="/custom-image.jpg" url="https://example.com" />);
    
    const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    expect(ogImage?.content).toBe('https://example.com/custom-image.jpg');
  });
});