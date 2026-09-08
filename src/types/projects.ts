export interface ProjectMedia {
  id: string;
  type: 'image' | 'video';
  title: string;
  caption?: string;
  url?: string;
  thumbnail?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '9/16';
}

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  category: 'templates' | 'learning' | 'main';
  categoryLabel: string;
  typeLabel: string;
  shortDescription: string;
  detailedDescription?: string;
  demonstrates?: string; // Specific to learning projects
  githubUrl: string;
  liveUrl?: string;
  streamlitUrl?: string;
  technologies: string[];
  features?: string[];
  videos?: ProjectMedia[];
  images?: ProjectMedia[];
}

export interface CategoryCardData {
  id: 'templates' | 'learning' | 'main';
  number: string;
  title: string;
  categoryLabel: string;
  description: string;
  count: number;
  highlight?: boolean;
  tags: string[];
  features: string[];
  route: string;
}
