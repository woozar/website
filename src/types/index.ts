export interface Project {
  customer: string;
  title: string;
  description: string[];
  primary_tags: string[];
  tags: string[];
  comment?: string;
}

export interface ProjectsData {
  projects: Project[];
}

export interface FilterState {
  selectedTags: string[];
  searchQuery: string;
  selectedCustomer: string;
}

export interface MediaQueries {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export interface StoryData {
  inputs: Array<{ title: string; description: string }>;
  processing: { title: string; description: string };
  output: {
    title: string;
    description: string;
    benefits?:
      | string[]
      | {
          oneTime: string[];
          ongoing: string[];
        };
  };
  implementation: string;
  cost: string;
}
