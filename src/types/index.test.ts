import { describe, expect, it } from "vitest";

import type { FilterState, MediaQueries, Project, ProjectsData } from "./index";

describe("TypeScript type definitions", () => {
  describe("Project interface", () => {
    it("should allow valid project objects", () => {
      const validProject: Project = {
        customer: "Test Customer",
        title: "Test Project",
        description: ["Test description"],
        primary_tags: ["React"],
        tags: ["TypeScript", "JavaScript"],
        comment: "Optional comment",
      };

      expect(validProject.customer).toBe("Test Customer");
      expect(validProject.title).toBe("Test Project");
      expect(validProject.description).toEqual(["Test description"]);
      expect(validProject.primary_tags).toEqual(["React"]);
      expect(validProject.tags).toEqual(["TypeScript", "JavaScript"]);
      expect(validProject.comment).toBe("Optional comment");
    });

    it("should allow project without optional comment", () => {
      const projectWithoutComment: Project = {
        customer: "Test Customer",
        title: "Test Project",
        description: ["Test description"],
        primary_tags: ["React"],
        tags: ["TypeScript"],
      };

      expect(projectWithoutComment.comment).toBeUndefined();
      expect(projectWithoutComment.customer).toBe("Test Customer");
    });

    it("should require all mandatory fields", () => {
      // This test validates TypeScript compilation - the types must be correct
      const project: Project = {
        customer: "Required",
        title: "Required",
        description: ["Required"],
        primary_tags: ["Required"],
        tags: ["Required"],
      };

      expect(project).toBeDefined();
    });

    it("should handle arrays correctly", () => {
      const project: Project = {
        customer: "Test",
        title: "Test",
        description: ["First paragraph", "Second paragraph", "Third paragraph"],
        primary_tags: ["AI", "LLM", "React"],
        tags: ["TypeScript", "Node.js", "AWS", "Azure", "Docker"],
      };

      expect(Array.isArray(project.description)).toBe(true);
      expect(Array.isArray(project.primary_tags)).toBe(true);
      expect(Array.isArray(project.tags)).toBe(true);
      expect(project.description.length).toBe(3);
      expect(project.primary_tags.length).toBe(3);
      expect(project.tags.length).toBe(5);
    });
  });

  describe("ProjectsData interface", () => {
    it("should allow valid projects data structure", () => {
      const validProjectsData: ProjectsData = {
        projects: [
          {
            customer: "Customer 1",
            title: "Project 1",
            description: ["Description 1"],
            primary_tags: ["Tag 1"],
            tags: ["Tech 1"],
          },
          {
            customer: "Customer 2",
            title: "Project 2",
            description: ["Description 2"],
            primary_tags: ["Tag 2"],
            tags: ["Tech 2"],
          },
        ],
      };

      expect(validProjectsData.projects).toHaveLength(2);
      expect(validProjectsData.projects[0].customer).toBe("Customer 1");
      expect(validProjectsData.projects[1].customer).toBe("Customer 2");
    });

    it("should allow empty projects array", () => {
      const emptyProjectsData: ProjectsData = {
        projects: [],
      };

      expect(emptyProjectsData.projects).toHaveLength(0);
      expect(Array.isArray(emptyProjectsData.projects)).toBe(true);
    });

    it("should maintain array structure", () => {
      const projectsData: ProjectsData = {
        projects: [
          {
            customer: "Test",
            title: "Test",
            description: ["Test"],
            primary_tags: ["Test"],
            tags: ["Test"],
          },
        ],
      };

      expect(Array.isArray(projectsData.projects)).toBe(true);
      expect(
        projectsData.projects.every((p) => typeof p.customer === "string")
      ).toBe(true);
    });
  });

  describe("FilterState interface", () => {
    it("should allow valid filter state objects", () => {
      const validFilterState: FilterState = {
        selectedTags: ["AI", "React", "TypeScript", "Node.js"],
        searchQuery: "test query",
        selectedCustomer: "Test Customer",
      };

      expect(validFilterState.selectedTags).toEqual([
        "AI",
        "React",
        "TypeScript",
        "Node.js",
      ]);
      expect(validFilterState.searchQuery).toBe("test query");
      expect(validFilterState.selectedCustomer).toBe("Test Customer");
    });

    it("should allow empty arrays and strings", () => {
      const emptyFilterState: FilterState = {
        selectedTags: [],
        searchQuery: "",
        selectedCustomer: "",
      };

      expect(emptyFilterState.selectedTags).toHaveLength(0);
      expect(emptyFilterState.searchQuery).toBe("");
      expect(emptyFilterState.selectedCustomer).toBe("");
    });

    it("should handle array operations", () => {
      const filterState: FilterState = {
        selectedTags: ["React", "TypeScript"],
        searchQuery: "test",
        selectedCustomer: "",
      };

      // Should support array methods
      expect(filterState.selectedTags.includes("React")).toBe(true);
      expect(filterState.selectedTags.length).toBe(2);

      // Should allow array modifications
      filterState.selectedTags.push("Vue");
      expect(filterState.selectedTags).toContain("Vue");
    });
  });

  describe("MediaQueries interface", () => {
    it("should allow valid media query objects", () => {
      const validMediaQueries: MediaQueries = {
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      };

      expect(validMediaQueries.isMobile).toBe(false);
      expect(validMediaQueries.isTablet).toBe(true);
      expect(validMediaQueries.isDesktop).toBe(false);
    });

    it("should handle all device types", () => {
      const mobileQueries: MediaQueries = {
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      };

      const tabletQueries: MediaQueries = {
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      };

      const desktopQueries: MediaQueries = {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      };

      expect(mobileQueries.isMobile).toBe(true);
      expect(tabletQueries.isTablet).toBe(true);
      expect(desktopQueries.isDesktop).toBe(true);
    });

    it("should only accept boolean values", () => {
      const mediaQueries: MediaQueries = {
        isMobile: Boolean(0),
        isTablet: Boolean(1),
        isDesktop: Boolean(""),
      };

      expect(typeof mediaQueries.isMobile).toBe("boolean");
      expect(typeof mediaQueries.isTablet).toBe("boolean");
      expect(typeof mediaQueries.isDesktop).toBe("boolean");
    });
  });

  describe("Type consistency", () => {
    it("should maintain type consistency across interfaces", () => {
      // Create objects that use multiple interfaces together
      const project: Project = {
        customer: "Test Customer",
        title: "Test Project",
        description: ["Test description"],
        primary_tags: ["React"],
        tags: ["TypeScript"],
      };

      const projectsData: ProjectsData = {
        projects: [project],
      };

      const filterState: FilterState = {
        selectedTags: [...project.primary_tags, ...project.tags],
        searchQuery: project.title,
        selectedCustomer: project.customer,
      };

      // Should work together without type conflicts
      expect(projectsData.projects[0]).toBe(project);
      expect(filterState.selectedTags).toContain(project.primary_tags[0]);
      expect(filterState.searchQuery).toBe(project.title);
    });

    it("should support common operations", () => {
      const projects: Project[] = [
        {
          customer: "Customer A",
          title: "Project A",
          description: ["Description A"],
          primary_tags: ["Tag A"],
          tags: ["Tech A"],
        },
        {
          customer: "Customer B",
          title: "Project B",
          description: ["Description B"],
          primary_tags: ["Tag B"],
          tags: ["Tech B"],
        },
      ];

      // Should support array operations
      const titles = projects.map((p) => p.title);
      const allTags = projects.flatMap((p) => [...p.primary_tags, ...p.tags]);

      expect(titles).toEqual(["Project A", "Project B"]);
      expect(allTags).toEqual(["Tag A", "Tech A", "Tag B", "Tech B"]);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty arrays in Project", () => {
      const projectWithEmptyArrays: Project = {
        customer: "Test",
        title: "Test",
        description: [],
        primary_tags: [],
        tags: [],
      };

      expect(projectWithEmptyArrays.description).toHaveLength(0);
      expect(projectWithEmptyArrays.primary_tags).toHaveLength(0);
      expect(projectWithEmptyArrays.tags).toHaveLength(0);
    });

    it("should handle large arrays", () => {
      const largeDescriptionArray = Array(100).fill("Description paragraph");
      const largePrimaryTagsArray = Array(50).fill("Primary Tag");
      const largeTagsArray = Array(200).fill("Tag");

      const projectWithLargeArrays: Project = {
        customer: "Test",
        title: "Test",
        description: largeDescriptionArray,
        primary_tags: largePrimaryTagsArray,
        tags: largeTagsArray,
      };

      expect(projectWithLargeArrays.description).toHaveLength(100);
      expect(projectWithLargeArrays.primary_tags).toHaveLength(50);
      expect(projectWithLargeArrays.tags).toHaveLength(200);
    });

    it("should handle special characters in strings", () => {
      const projectWithSpecialChars: Project = {
        customer: "Émile & Co. GmbH",
        title: 'Project "Alpha" - Phase 1/2',
        description: ["Description with émojis 🚀 and spëcial chars"],
        primary_tags: ["AI/ML", "C#/.NET"],
        tags: ["Node.js", "Vue.js"],
      };

      expect(projectWithSpecialChars.customer).toContain("É");
      expect(projectWithSpecialChars.title).toContain('"');
      expect(projectWithSpecialChars.description[0]).toContain("🚀");
      expect(projectWithSpecialChars.primary_tags[0]).toContain("/");
    });
  });
});
