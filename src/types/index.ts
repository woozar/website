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
  selectedPrimaryTags: string[];
  selectedSecondaryTags: string[];
  searchQuery: string;
}

export interface MediaQueries {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}