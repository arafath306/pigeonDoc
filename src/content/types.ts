import { ReactNode } from 'react';

export type FeatureStatus = 'available' | 'planned' | 'beta';

export interface TocItem {
  id: string;
  title: string;
  level?: number;
}

export interface DocSection {
  type: 'paragraph' | 'heading' | 'list' | 'code' | 'callout' | 'info-box' | 'table' | 'steps';
  text?: string;
  level?: number;
  id?: string;
  items?: string[];
  ordered?: boolean;
  language?: string;
  calloutType?: 'info' | 'tip' | 'warning' | 'note';
  title?: string;
  rows?: string[][];
  headers?: string[];
  steps?: { title: string; description: string }[];
}

export interface DocArticle {
  slug: string;
  category: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: DocSection[];
  related?: string[];
  status?: FeatureStatus;
  badge?: string;
}

export interface FeatureItem {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  status: FeatureStatus;
  category: string;
  highlights: string[];
  details: DocSection[];
  related?: string[];
}

export interface UseCase {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  problem: string;
  howPigeonHelps: string;
  featuresUsed: string[];
  workflow: { title: string; description: string }[];
  benefits: string[];
}

export interface ChangelogVersion {
  version: string;
  date: string;
  tag?: string;
  sections: { label: 'New' | 'Improved' | 'Fixed' | 'Security'; items: string[] }[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface SearchEntry {
  title: string;
  category: string;
  description: string;
  path: string;
  kind: 'Documentation' | 'Feature' | 'Use Case' | 'FAQ' | 'Changelog';
}
