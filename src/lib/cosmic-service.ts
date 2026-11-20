import {
  COSMIC_CATEGORIES,
  COSMIC_TOPICS,
  COSMIC_NEWS,
  SOLAR_SYSTEM_PLANETS,
  TIMELINE_ERAS,
  GLOSSARY_TERMS
} from './cosmic-data';
import type { Category, Topic, NewsItem, Planet, GlossaryItem, TimelineEra } from './types';

// In-memory / dynamic store for demo, SSR, and client edits
let dynamicTopics: Topic[] = [...COSMIC_TOPICS];
let dynamicCategories: Category[] = [...COSMIC_CATEGORIES];
let dynamicNews: NewsItem[] = [...COSMIC_NEWS];

// Browser LocalStorage persistence helpers for autonomous client edits
const STORAGE_KEYS = {
  TOPICS: 'cosmic_inquiry_topics',
  NEWS: 'cosmic_inquiry_news',
  CATEGORIES: 'cosmic_inquiry_categories'
};

function initBrowserState() {
  if (typeof window !== 'undefined') {
    try {
      const storedTopics = localStorage.getItem(STORAGE_KEYS.TOPICS);
      if (storedTopics) {
        dynamicTopics = JSON.parse(storedTopics);
      }
      const storedNews = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (storedNews) {
        dynamicNews = JSON.parse(storedNews);
      }
      const storedCats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (storedCats) {
        dynamicCategories = JSON.parse(storedCats);
      }
    } catch (e) {
      console.warn('LocalStorage load skipped', e);
    }
  }
}

// Initialize on module load
initBrowserState();

function syncBrowserStorage() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(dynamicTopics));
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(dynamicNews));
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(dynamicCategories));
    } catch (e) {
      console.warn('LocalStorage save skipped', e);
    }
  }
}

export async function getCategories(): Promise<Category[]> {
  initBrowserState();
  return dynamicCategories.map((c) => ({
    ...c,
    topicCount: dynamicTopics.filter((t) => t.categoryId === c.id && t.status === 'published').length
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getTopics(categorySlug?: string): Promise<Topic[]> {
  initBrowserState();
  let list = dynamicTopics.filter((t) => t.status === 'published');
  if (categorySlug) {
    const cat = dynamicCategories.find((c) => c.slug === categorySlug);
    if (cat) {
      list = list.filter((t) => t.categoryId === cat.id);
    }
  }
  return list;
}

export async function getAllTopicsAdmin(): Promise<Topic[]> {
  initBrowserState();
  return dynamicTopics;
}

export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  initBrowserState();
  const found = dynamicTopics.find((t) => t.slug === slug);
  return found || null;
}

export async function getFeaturedTopics(): Promise<Topic[]> {
  const all = await getTopics();
  return all.filter((t) => t.featured).slice(0, 6);
}

export async function getNews(): Promise<NewsItem[]> {
  initBrowserState();
  return dynamicNews;
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  initBrowserState();
  const found = dynamicNews.find((n) => n.slug === slug);
  return found || null;
}

export async function getBreakingNews(): Promise<NewsItem[]> {
  const all = await getNews();
  return all.filter((n) => n.isBreaking);
}

export function getSolarSystemPlanets(): Planet[] {
  return SOLAR_SYSTEM_PLANETS;
}

export function getPlanetBySlug(slug: string): Planet | null {
  return SOLAR_SYSTEM_PLANETS.find((p) => p.slug === slug) || null;
}

export function getTimelineEras(): TimelineEra[] {
  return TIMELINE_ERAS;
}

export function getGlossaryTerms(category?: string): GlossaryItem[] {
  if (category && category !== 'All') {
    return GLOSSARY_TERMS.filter((g) => g.category === category);
  }
  return GLOSSARY_TERMS;
}

export async function searchContent(query: string) {
  if (!query || query.trim() === '') {
    return { topics: [], news: [], planets: [], glossary: [] };
  }

  const q = query.toLowerCase().trim();
  const allTopics = await getTopics();
  const allNews = await getNews();

  const matchedTopics = allTopics.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.excerpt.toLowerCase().includes(q) ||
      (t.categoryName && t.categoryName.toLowerCase().includes(q))
  );

  const matchedNews = allNews.filter(
    (n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)
  );

  const matchedPlanets = SOLAR_SYSTEM_PLANETS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.detailedDescription.toLowerCase().includes(q)
  );

  const matchedGlossary = GLOSSARY_TERMS.filter(
    (g) =>
      g.term.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
  );

  return {
    topics: matchedTopics.slice(0, 5),
    news: matchedNews.slice(0, 5),
    planets: matchedPlanets.slice(0, 5),
    glossary: matchedGlossary.slice(0, 5)
  };
}

export const searchCosmos = searchContent;

// Autonomous Admin Operations (GitHub & Netlify Native)
export async function createTopic(topic: Partial<Topic>): Promise<Topic> {
  const newTopic: Topic = {
    id: `topic-${Date.now()}`,
    title: topic.title || 'Untitled Cosmic Topic',
    slug: topic.slug || (topic.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    categoryId: topic.categoryId || 'cat-solar-system',
    categoryName: topic.categoryName || 'The Solar System',
    excerpt: topic.excerpt || '',
    content: topic.content || '',
    coverImage: topic.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    videoUrl: topic.videoUrl,
    authorName: topic.authorName || 'Albin Thomas',
    readingTime: topic.readingTime || '5 min read',
    keyFacts: topic.keyFacts || [],
    referencesList: topic.referencesList || [],
    status: topic.status || 'published',
    featured: topic.featured || false,
    viewsCount: 0,
    seoTitle: topic.seoTitle || topic.title,
    seoDescription: topic.seoDescription || topic.excerpt,
    publishedAt: new Date().toISOString()
  };

  dynamicTopics = [newTopic, ...dynamicTopics];
  syncBrowserStorage();
  return newTopic;
}

export async function updateTopic(id: string, updates: Partial<Topic>): Promise<Topic | null> {
  const index = dynamicTopics.findIndex((t) => t.id === id);
  if (index === -1) return null;

  dynamicTopics[index] = {
    ...dynamicTopics[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  syncBrowserStorage();
  return dynamicTopics[index];
}

export async function deleteTopic(id: string): Promise<boolean> {
  dynamicTopics = dynamicTopics.filter((t) => t.id !== id);
  syncBrowserStorage();
  return true;
}

export async function createNews(item: Partial<NewsItem>): Promise<NewsItem> {
  const newItem: NewsItem = {
    id: `news-${Date.now()}`,
    title: item.title || 'Untitled Discovery',
    slug: item.slug || (item.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    excerpt: item.excerpt || '',
    content: item.content || '',
    image: item.image || 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    sourceName: item.sourceName || 'NASA / ESA',
    sourceUrl: item.sourceUrl,
    category: (item.category as any) || 'Breaking Discoveries',
    featured: item.featured || false,
    isBreaking: item.isBreaking || false,
    publishedAt: new Date().toISOString()
  };

  dynamicNews = [newItem, ...dynamicNews];
  syncBrowserStorage();
  return newItem;
}

export async function deleteNews(id: string): Promise<boolean> {
  dynamicNews = dynamicNews.filter((n) => n.id !== id);
  syncBrowserStorage();
  return true;
}

export async function getAdminStats() {
  const allTopics = await getAllTopicsAdmin();
  const allCats = await getCategories();
  const allNews = await getNews();

  const publishedTopics = allTopics.filter((t) => t.status === 'published').length;
  const draftTopics = allTopics.filter((t) => t.status === 'draft').length;
  const totalViews = allTopics.reduce((acc, t) => acc + (t.viewsCount || 0), 0);

  return {
    totalTopics: allTopics.length,
    publishedTopics,
    draftTopics,
    totalCategories: allCats.length,
    totalNews: allNews.length,
    totalViews
  };
}
