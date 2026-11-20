export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  displayOrder: number;
  topicCount?: number;
}

export interface KeyFact {
  label: string;
  value: string;
  unit?: string;
  description?: string;
}

export interface ScientificReference {
  title: string;
  authors: string;
  journal?: string;
  year: number;
  doiOrUrl?: string;
}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  excerpt: string;
  content: string;
  coverImage: string;
  videoUrl?: string;
  authorName: string;
  readingTime: string;
  keyFacts: KeyFact[];
  referencesList: ScientificReference[];
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  viewsCount: number;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt: string;
  updatedAt?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  sourceName: string;
  sourceUrl?: string;
  category: 'Breaking Discoveries' | 'NASA Updates' | 'ESA Updates' | 'Space Missions' | 'Astrophysics' | 'Planetary Science' | 'Space Exploration';
  featured: boolean;
  isBreaking: boolean;
  publishedAt: string;
}

export interface Planet {
  id: string;
  name: string;
  slug: string;
  type: 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant' | 'Star' | 'Natural Satellite';
  radiusKm: number;
  distanceFromSunMillionKm: number;
  orbitalPeriodDays: number;
  rotationPeriodHours: number;
  moonsCount: number;
  shortDescription: string;
  detailedDescription: string;
  atmosphereComposition: string[];
  surfaceTempCelsius: { min: number; max: number; avg: number };
  colorHex: string;
  glowColor: string;
  hasRings?: boolean;
}

export interface GlossaryItem {
  term: string;
  category: string;
  pronunciation?: string;
  definition: string;
  formula?: string;
  significance: string;
}

export interface TimelineEra {
  id: string;
  era: string;
  timeRange: string;
  title: string;
  description: string;
  temperatureKelvin?: string;
  keyMilestones: string[];
}

export interface MediaItem {
  id: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  altText: string;
  caption: string;
  createdAt: string;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  creatorName: string;
  creatorSubtitle: string;
  heroBadge: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroDescription: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  solarSystemTitle: string;
  solarSystemDescription: string;
  domainsTitle: string;
  domainsDescription: string;
  chronicleTitle: string;
  chronicleDescription: string;
  timelineTitle: string;
  timelineDescription: string;
  glossaryTitle: string;
  glossaryDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
}
