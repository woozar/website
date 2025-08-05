import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'profile' | 'article';
  keywords?: string;
}

export const SEOHead = ({
  title,
  description,
  image = '/assets/hero-portrait.webp',
  url = 'https://v2.12-of-spades.com',
  type = 'website',
  keywords,
}: SEOHeadProps) => {
  const { t } = useTranslation();

  const siteTitle = '12 of Spades - Johannes Herrmann';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDescription = description || t.hero.description;
  const imageUrl = image.startsWith('http') ? image : `${url}${image}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic Meta Tags
    updateMetaTag('description', siteDescription);
    updateMetaTag('author', 'Johannes Herrmann');
    updateMetaTag(
      'keywords',
      keywords ||
        'Software Freelancer, AI Specialist, LLM Development, Cloud Architecture, Full-Stack Development, React, TypeScript, Node.js, AWS, Azure'
    );

    // OpenGraph Tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', siteDescription, true);
    updateMetaTag('og:image', imageUrl, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:site_name', '12 of Spades', true);
    updateMetaTag('og:locale', 'de_DE', true);

    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', siteDescription);
    updateMetaTag('twitter:image', imageUrl);
    updateMetaTag('twitter:creator', '@12ofspades');

    // Professional/Business specific
    if (type === 'profile') {
      updateMetaTag('profile:first_name', 'Johannes', true);
      updateMetaTag('profile:last_name', 'Herrmann', true);
      updateMetaTag('profile:username', '12ofspades', true);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Update language
    document.documentElement.lang = 'de';

    // Add structured data
    const addStructuredData = (id: string, data: object) => {
      let script = document.querySelector(`script[data-id="${id}"]`) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-id', id);
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    // Person Schema
    addStructuredData('person-schema', {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Johannes Herrmann',
      alternateName: '12 of Spades',
      description: siteDescription,
      url: url,
      image: imageUrl,
      sameAs: ['https://www.linkedin.com/in/johannes-herrmann-795550128/', 'https://github.com/woozar'],
      jobTitle: 'Software Freelancer & AI Specialist',
      worksFor: {
        '@type': 'Organization',
        name: '12 of Spades',
      },
      knowsAbout: [
        'Artificial Intelligence',
        'Large Language Models',
        'Cloud Architecture',
        'Full-Stack Development',
        'React',
        'TypeScript',
        'Node.js',
        'AWS',
        'Azure',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Weisendorf',
        addressCountry: 'DE',
      },
      email: 'info@12ofspades.com',
      telephone: '+49 176 8100 1371',
    });

    // Website Schema
    addStructuredData('website-schema', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: '12 of Spades',
      alternateName: 'Johannes Herrmann Portfolio',
      url: url,
      description: siteDescription,
      author: {
        '@type': 'Person',
        name: 'Johannes Herrmann',
      },
      inLanguage: 'de-DE',
    });
  }, [fullTitle, siteDescription, imageUrl, url, type, keywords]);

  return null; // This component only manages head tags
};
