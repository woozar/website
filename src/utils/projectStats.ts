import { Project } from '../types';

export interface TechnologyStats {
  name: string;
  count: number;
  percentage: number;
  category: 'primary' | 'secondary';
}

export interface ProjectStats {
  totalProjects: number;
  totalTechnologies: number;
  totalFrameworks: number;
  topTechnologies: TechnologyStats[];
  primaryTagStats: TechnologyStats[];
  companiesWorkedWith: string[];
  yearRange: {
    start: number;
    end: number;
  };
  categoryBreakdown: {
    [key: string]: number;
  };
}

// Define common frameworks for categorization
const FRAMEWORKS = [
  'React', 'Angular', 'Vue', 'Vue.js', 'Svelte', 'Next.js', 'Nuxt.js',
  'Express', 'Express.js', 'Fastify', 'Koa', 'NestJS',
  'Django', 'Flask', 'FastAPI', 'Spring', 'Spring Boot',
  'Laravel', 'Symfony', 'CodeIgniter',
  'Bootstrap', 'Tailwind', 'Tailwind CSS', 'Material UI', 'Ant Design', 'Chakra UI',
  'Jest', 'Cypress', 'Playwright', 'Vitest', 'Mocha', 'Jasmine',
  'T3 Stack', 'T3', 'create-t3-app'
];

export const calculateProjectStats = (projects: Project[]): ProjectStats => {
  const totalProjects = projects.length;
  
  // Count all technologies (primary_tags + tags)
  const technologyCount = new Map<string, number>();
  const primaryTagCount = new Map<string, number>();
  const frameworks = new Set<string>();
  const companies = new Set<string>();
  const categories = new Map<string, number>();

  projects.forEach(project => {
    // Count companies
    companies.add(project.customer);

    // Count primary tags
    project.primary_tags?.forEach(tag => {
      primaryTagCount.set(tag, (primaryTagCount.get(tag) || 0) + 1);
      technologyCount.set(tag, (technologyCount.get(tag) || 0) + 1);
      
      // Check if it's a framework
      if (FRAMEWORKS.includes(tag)) {
        frameworks.add(tag);
      }
      
      // Categorize primary tags
      categories.set(tag, (categories.get(tag) || 0) + 1);
    });

    // Count secondary tags
    project.tags?.forEach(tag => {
      technologyCount.set(tag, (technologyCount.get(tag) || 0) + 1);
      
      // Check if it's a framework
      if (FRAMEWORKS.includes(tag)) {
        frameworks.add(tag);
      }
    });
  });

  // Convert to arrays and sort
  const topTechnologies: TechnologyStats[] = Array.from(technologyCount.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalProjects) * 100),
      category: primaryTagCount.has(name) ? 'primary' as const : 'secondary' as const
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15); // Top 15 technologies

  const primaryTagStats: TechnologyStats[] = Array.from(primaryTagCount.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalProjects) * 100),
      category: 'primary' as const
    }))
    .sort((a, b) => b.count - a.count);

  // Estimate year range from project data (simplified approach)
  // This could be enhanced with actual project dates if available
  const currentYear = new Date().getFullYear();
  const yearRange = {
    start: currentYear - Math.max(10, Math.floor(totalProjects / 2)), // Rough estimate
    end: currentYear
  };

  return {
    totalProjects,
    totalTechnologies: technologyCount.size,
    totalFrameworks: frameworks.size,
    topTechnologies,
    primaryTagStats,
    companiesWorkedWith: Array.from(companies).sort(),
    yearRange,
    categoryBreakdown: Object.fromEntries(categories)
  };
};

export const getTechnologyExperienceLevel = (count: number, totalProjects: number): string => {
  const percentage = (count / totalProjects) * 100;
  
  if (percentage >= 60) return 'Expert';
  if (percentage >= 40) return 'Advanced';
  if (percentage >= 20) return 'Intermediate';
  return 'Familiar';
};

export const getYearsOfExperience = (count: number): string => {
  // Rough estimation: 1 project ≈ 3-6 months of experience
  const years = Math.max(1, Math.floor((count * 4) / 12)); // Average 4 months per project
  
  if (years >= 8) return '8+ years';
  if (years >= 5) return '5+ years';
  if (years >= 3) return '3+ years';
  if (years >= 2) return '2+ years';
  return '1+ year';
};