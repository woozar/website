import { describe, expect, it } from 'vitest';
import { calculateProjectStats, getTechnologyExperienceLevel, getYearsOfExperience } from './projectStats';
import { Project } from '../types';

const mockProjects: Project[] = [
  {
    customer: 'Company A',
    title: 'Project 1',
    description: ['Test project 1'],
    primary_tags: ['React', 'TypeScript'],
    tags: ['Node.js', 'AWS', 'PostgreSQL']
  },
  {
    customer: 'Company B',
    title: 'Project 2',
    description: ['Test project 2'],
    primary_tags: ['React', 'Angular'],
    tags: ['Node.js', 'Docker', 'Azure']
  },
  {
    customer: 'Company A',
    title: 'Project 3',
    description: ['Test project 3'],
    primary_tags: ['TypeScript', 'AI'],
    tags: ['Python', 'AWS', 'GraphQL']
  }
];

describe('projectStats', () => {
  describe('calculateProjectStats', () => {
    it('should calculate basic project statistics', () => {
      const stats = calculateProjectStats(mockProjects);
      
      expect(stats.totalProjects).toBe(3);
      expect(stats.companiesWorkedWith).toEqual(['Company A', 'Company B']);
      expect(stats.companiesWorkedWith).toHaveLength(2);
    });

    it('should count technologies correctly', () => {
      const stats = calculateProjectStats(mockProjects);
      
      // React appears in 2 projects
      const reactStat = stats.topTechnologies.find(t => t.name === 'React');
      expect(reactStat).toBeDefined();
      expect(reactStat?.count).toBe(2);
      expect(reactStat?.percentage).toBe(67); // 2/3 * 100, rounded
    });

    it('should categorize primary vs secondary tags', () => {
      const stats = calculateProjectStats(mockProjects);
      
      const reactStat = stats.topTechnologies.find(t => t.name === 'React');
      expect(reactStat?.category).toBe('primary');
      
      const nodeStat = stats.topTechnologies.find(t => t.name === 'Node.js');
      expect(nodeStat?.category).toBe('secondary');
    });

    it('should calculate primary tag statistics', () => {
      const stats = calculateProjectStats(mockProjects);
      
      expect(stats.primaryTagStats).toHaveLength(4); // React, TypeScript, Angular, AI
      
      const reactPrimary = stats.primaryTagStats.find(t => t.name === 'React');
      expect(reactPrimary?.count).toBe(2);
      expect(reactPrimary?.category).toBe('primary');
    });

    it('should sort technologies by frequency', () => {
      const stats = calculateProjectStats(mockProjects);
      
      // React (2) and TypeScript (2) should be at the top
      expect(stats.topTechnologies[0].count).toBeGreaterThanOrEqual(stats.topTechnologies[1].count);
      expect(stats.topTechnologies[1].count).toBeGreaterThanOrEqual(stats.topTechnologies[2].count);
    });

    it('should handle empty projects array', () => {
      const stats = calculateProjectStats([]);
      
      expect(stats.totalProjects).toBe(0);
      expect(stats.totalTechnologies).toBe(0);
      expect(stats.topTechnologies).toHaveLength(0);
      expect(stats.companiesWorkedWith).toHaveLength(0);
    });

    it('should limit top technologies to 15', () => {
      // Create a project with many technologies
      const projectWithManyTechs: Project = {
        customer: 'Tech Company',
        title: 'Big Project',
        description: ['Project with many technologies'],
        primary_tags: ['React', 'Angular', 'Vue', 'Svelte'],
        tags: Array.from({ length: 20 }, (_, i) => `Tech${i}`)
      };
      
      const stats = calculateProjectStats([projectWithManyTechs]);
      
      expect(stats.topTechnologies.length).toBeLessThanOrEqual(15);
    });

    it('should calculate year range correctly', () => {
      const stats = calculateProjectStats(mockProjects);
      
      expect(stats.yearRange.end).toBe(new Date().getFullYear());
      expect(stats.yearRange.start).toBeLessThan(stats.yearRange.end);
    });
  });

  describe('getTechnologyExperienceLevel', () => {
    it('should return correct experience levels', () => {
      expect(getTechnologyExperienceLevel(6, 10)).toBe('Expert'); // 60%
      expect(getTechnologyExperienceLevel(4, 10)).toBe('Advanced'); // 40%
      expect(getTechnologyExperienceLevel(2, 10)).toBe('Intermediate'); // 20%
      expect(getTechnologyExperienceLevel(1, 10)).toBe('Familiar'); // 10%
    });

    it('should handle edge cases', () => {
      expect(getTechnologyExperienceLevel(0, 10)).toBe('Familiar');
      expect(getTechnologyExperienceLevel(10, 10)).toBe('Expert');
    });
  });

  describe('getYearsOfExperience', () => {
    it('should estimate years of experience correctly', () => {
      expect(getYearsOfExperience(24)).toBe('8+ years'); // 24 * 4 / 12 = 8
      expect(getYearsOfExperience(15)).toBe('5+ years'); // 15 * 4 / 12 = 5
      expect(getYearsOfExperience(9)).toBe('3+ years');  // 9 * 4 / 12 = 3
      expect(getYearsOfExperience(6)).toBe('2+ years');  // 6 * 4 / 12 = 2
      expect(getYearsOfExperience(2)).toBe('1+ year');   // 2 * 4 / 12 < 1, but min is 1
    });

    it('should return minimum 1 year', () => {
      expect(getYearsOfExperience(1)).toBe('1+ year');
      expect(getYearsOfExperience(0)).toBe('1+ year');
    });
  });
});