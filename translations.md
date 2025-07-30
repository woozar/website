# Translation System Documentation

This document explains how the internationalization (i18n) system works in this portfolio website.

## Overview

The website supports German (DE) and English (EN) with a hybrid translation approach:
- **UI Elements**: Translated via centralized translation files
- **Project Data**: Translated via a custom hook system

## Translation Architecture

### 1. UI Translations

**Location:** `src/translations/`
- `en.ts` - English translations
- `de.ts` - German translations
- `index.ts` - Export and type definitions

**Usage:**
```typescript
import { useTranslation } from '../hooks/useTranslation';

const { t, language } = useTranslation();
// Access translations: t.navigation.services, t.hero.title, etc.
```

**Structure:**
```typescript
export const en = {
  navigation: { services: 'Services', projects: 'Projects', ... },
  hero: { name: 'Johannes Herrmann', title: '...', ... },
  services: { title: 'My Services', items: { ai: { title: '...', ... } } },
  about: { title: 'About Me', skills: { ... } },
  contact: { title: 'Contact', ... },
  projects: { title: 'Projects & Experience', subtitle: '...', ... }
};
```

### 2. Project Data Translations

**Location:** `src/hooks/useProjects.ts`

Project data is stored in English in `src/data/projects.ts` but translated dynamically via the `useProjects` hook.

**Translation Object:**
```typescript
const germanTranslations: { [key: string]: Partial<Project> } = {
  "Project Title in English": {
    title: "German Title (optional)",
    description: [
      "German paragraph 1",
      "German paragraph 2", 
      // ... more paragraphs
    ]
  },
  // ... more project translations
};
```

**How it works:**
1. `useProjects()` hook checks current language
2. If German: merges English project data with German translations
3. If English: returns original project data
4. Projects without German translations fall back to English

**Usage:**
```typescript
import { useProjects } from '../hooks/useProjects';

const { projects } = useProjects();
// Automatically returns translated projects based on current language
```

## Adding New Translations

### Adding UI Translations

1. **Add to English file** (`src/translations/en.ts`):
```typescript
export const en = {
  // ... existing translations
  newSection: {
    title: 'New Section',
    subtitle: 'Description'
  }
};
```

2. **Add to German file** (`src/translations/de.ts`):
```typescript
export const de = {
  // ... existing translations  
  newSection: {
    title: 'Neue Sektion',
    subtitle: 'Beschreibung'
  }
};
```

3. **Use in components**:
```typescript
const { t } = useTranslation();
return <h1>{t.newSection.title}</h1>;
```

### Adding Project Translations

1. **Add project to English data** (`src/data/projects.ts`):
```typescript
{
  "customer": "Customer Name",
  "title": "Project Title",
  "description": [
    "English description paragraph 1",
    "English description paragraph 2"
  ],
  "primary_tags": ["Tag1", "Tag2"],
  "tags": ["DetailTag1", "DetailTag2"]
}
```

2. **Add German translation** (`src/hooks/useProjects.ts`):
```typescript
const germanTranslations: { [key: string]: Partial<Project> } = {
  // ... existing translations
  "Project Title": {
    title: "German Project Title", // Optional - omit to keep English title
    description: [
      "German description paragraph 1",
      "German description paragraph 2"
    ]
  }
};
```

**Important Notes:**
- The key in `germanTranslations` must **exactly match** the English `title` in `projects.ts`
- You can translate `title` and/or `description` - other fields (customer, tags) stay in English
- If no German translation exists, the project displays in English

## Language Switching

**Component:** `src/components/LanguageSwitcher/LanguageSwitcher.tsx`
**Store:** `src/stores/languageStore.ts`

The language switcher updates a Zustand store that triggers re-renders of all translated content.

## Testing Translations

**Test files:**
- `src/hooks/useProjects.test.ts` - Tests project translation logic
- `src/hooks/useTranslation.test.ts` - Tests UI translation logic

**Key test scenarios:**
- Language switching works correctly
- Projects without translations fall back to English
- Partial translations (title only, description only) work
- All projects return in both languages

## Common Patterns

### Conditional Content Based on Language
```typescript
const { language } = useTranslation();

return (
  <div>
    {language === 'de' ? 'Deutscher Inhalt' : 'English Content'}
  </div>
);
```

### Pluralization/Dynamic Content
```typescript
// In translation files
showingCount: (filtered: number, total: number) => 
  `Showing ${filtered} of ${total} projects`,

// Usage
const message = t.projects.showingCount(5, 20);
```

## File Structure
```
src/
├── translations/
│   ├── index.ts
│   ├── en.ts
│   └── de.ts
├── hooks/
│   ├── useTranslation.ts
│   └── useProjects.ts
├── stores/
│   └── languageStore.ts
├── data/
│   └── projects.ts
└── components/
    └── LanguageSwitcher/
```

## Best Practices

1. **Keep project data in English** - only translate display text
2. **Use descriptive translation keys** - `hero.title` not `h1`
3. **Group related translations** - `contact.items.email`
4. **Test both languages** when adding new content
5. **Partial translations are OK** - missing German falls back to English
6. **Match keys exactly** - `germanTranslations["Exact Title"]`
7. **Keep customer names in English** - for consistency
8. **Only translate descriptions and titles** for projects

## Debugging Translation Issues

1. **Check browser console** for missing translation warnings
2. **Verify exact key matching** between projects.ts and germanTranslations
3. **Test language switching** in development
4. **Run translation tests** with `npm test useProjects`
5. **Check language store state** in React DevTools