import { supabase, isSupabaseConfigured } from './supabase';
import {
  COSMIC_CATEGORIES,
  COSMIC_TOPICS,
  COSMIC_NEWS,
  SOLAR_SYSTEM_PLANETS,
  TIMELINE_ERAS,
  GLOSSARY_TERMS
} from './cosmic-data';
import type { Category, Topic, NewsItem, Planet, GlossaryItem, TimelineEra } from './types';

// In-memory / dynamic store for demo and local edits
let dynamicTopics: Topic[] = [...COSMIC_TOPICS];
let dynamicCategories: Category[] = [...COSMIC_CATEGORIES];
let dynamicNews: NewsItem[] = [...COSMIC_NEWS];

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          coverImage: c.cover_image,
          displayOrder: c.display_order,
          topicCount: 0
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local dataset', e);
    }
  }

  // Calculate dynamic topic counts
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
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('topics').select('*, categories(name, slug)').eq('status', 'published');
      if (categorySlug) {
        query = query.eq('categories.slug', categorySlug);
      }
      const { data, error } = await query.order('published_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((t) => ({
          id: t.id,
          title: t.title,
          slug: t.slug,
          categoryId: t.category_id,
          categoryName: t.categories?.name,
          excerpt: t.excerpt,
          content: t.content,
          coverImage: t.cover_image,
          videoUrl: t.video_url,
          authorName: t.author_name || 'Albin Thomas',
          readingTime: t.reading_time || '6 min read',
          keyFacts: t.key_facts || [],
          referencesList: t.references_list || [],
          status: t.status,
          featured: t.featured,
          viewsCount: t.views_count || 0,
          seoTitle: t.seo_title,
          seoDescription: t.seo_description,
          publishedAt: t.published_at || t.created_at
        }));
      }
    } catch (e) {
      console.warn('Supabase getTopics failed, falling back to local', e);
    }
  }

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
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('topics')
        .select('*, categories(name, slug)')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data.map((t) => ({
          id: t.id,
          title: t.title,
          slug: t.slug,
          categoryId: t.category_id,
          categoryName: t.categories?.name,
          excerpt: t.excerpt,
          content: t.content,
          coverImage: t.cover_image,
          videoUrl: t.video_url,
          authorName: t.author_name || 'Albin Thomas',
          readingTime: t.reading_time || '6 min read',
          keyFacts: t.key_facts || [],
          referencesList: t.references_list || [],
          status: t.status,
          featured: t.featured,
          viewsCount: t.views_count || 0,
          seoTitle: t.seo_title,
          seoDescription: t.seo_description,
          publishedAt: t.published_at || t.created_at
        }));
      }
    } catch (e) {
      console.warn('Supabase getAllTopicsAdmin failed', e);
    }
  }
  return [...dynamicTopics];
}

export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('topics')
        .select('*, categories(name, slug)')
        .eq('slug', slug)
        .single();
      if (!error && data) {
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          categoryId: data.category_id,
          categoryName: data.categories?.name,
          excerpt: data.excerpt,
          content: data.content,
          coverImage: data.cover_image,
          videoUrl: data.video_url,
          authorName: data.author_name || 'Albin Thomas',
          readingTime: data.reading_time || '6 min read',
          keyFacts: data.key_facts || [],
          referencesList: data.references_list || [],
          status: data.status,
          featured: data.featured,
          viewsCount: data.views_count || 0,
          seoTitle: data.seo_title,
          seoDescription: data.seo_description,
          publishedAt: data.published_at || data.created_at
        };
      }
    } catch (e) {
      console.warn('Supabase getTopicBySlug failed', e);
    }
  }

  // Check if it's one of the solar system planets (e.g. /explore/mars, /explore/earth)
  const planet = SOLAR_SYSTEM_PLANETS.find((p) => p.slug === slug);
  if (planet) {
    return {
      id: `topic-${planet.slug}`,
      title: `${planet.name}: Astronomical Architecture & Planetary Exploration`,
      slug: planet.slug,
      categoryId: 'cat-solar-system',
      categoryName: 'The Solar System',
      excerpt: planet.shortDescription,
      content: `## Planetary Overview: ${planet.name}\n\n${planet.detailedDescription}\n\n### Orbital & Physical Dynamics\n\n- **Orbital Distance:** ${planet.distanceFromSunMillionKm} million km from the Sun\n- **Orbital Period:** ${planet.orbitalPeriodDays} Earth days\n- **Rotation Period:** ${Math.abs(planet.rotationPeriodHours)} hours ${planet.rotationPeriodHours < 0 ? '(Retrograde Rotation)' : ''}\n- **Mean Radius:** ${planet.radiusKm.toLocaleString()} km\n- **Natural Satellites:** ${planet.moonsCount} confirmed moons\n- **Average Surface Temperature:** ${planet.surfaceTempCelsius.avg}°C\n\n### Atmospheric Composition\n\n${planet.atmosphereComposition.map((c) => `- ${c}`).join('\n')}\n\n### Scientific Significance\n\nInvestigating ${planet.name} provides planetary geologists and astrobiologists crucial boundary conditions for comparative planetology and solar system evolution.`,
      coverImage: planet.slug === 'sun'
        ? 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=1600&q=85'
        : 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=85',
      authorName: 'Albin Thomas',
      readingTime: '5 min read',
      keyFacts: [
        { label: 'Type', value: planet.type },
        { label: 'Radius', value: `${planet.radiusKm.toLocaleString()}`, unit: 'km' },
        { label: 'Solar Distance', value: `${planet.distanceFromSunMillionKm}`, unit: 'million km' },
        { label: 'Moons', value: `${planet.moonsCount}`, unit: 'confirmed' }
      ],
      referencesList: [
        { title: `${planet.name} Planetary Fact Sheet`, authors: 'NASA Goddard Space Flight Center', journal: 'NASA Planetary Data System', year: 2026, doiOrUrl: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' }
      ],
      status: 'published',
      featured: false,
      viewsCount: 14200,
      seoTitle: `${planet.name} Planetary Exploration | The Cosmic Inquiry`,
      seoDescription: `Explore ${planet.name}'s orbital mechanics, atmosphere, and surface science on The Cosmic Inquiry by Albin Thomas.`,
      publishedAt: '2026-10-10T12:00:00Z'
    };
  }

  return dynamicTopics.find((t) => t.slug === slug) || null;
}

export async function getNews(): Promise<NewsItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((n) => ({
          id: n.id,
          title: n.title,
          slug: n.slug,
          excerpt: n.excerpt,
          content: n.content,
          image: n.image,
          sourceName: n.source_name,
          sourceUrl: n.source_url,
          category: n.category,
          featured: n.featured,
          isBreaking: n.is_breaking,
          publishedAt: n.published_at
        }));
      }
    } catch (e) {
      console.warn('Supabase getNews failed', e);
    }
  }
  return dynamicNews.filter((n) => true);
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const all = await getNews();
  return all.find((n) => n.slug === slug) || null;
}

export function getPlanets(): Planet[] {
  return SOLAR_SYSTEM_PLANETS;
}

export function getPlanetBySlug(slug: string): Planet | null {
  return SOLAR_SYSTEM_PLANETS.find((p) => p.slug === slug) || null;
}

export function getTimelineEras(): TimelineEra[] {
  return TIMELINE_ERAS;
}

export function getGlossaryTerms(): GlossaryItem[] {
  return GLOSSARY_TERMS;
}

// Search across topics, categories, news, and planets
export async function searchCosmos(query: string) {
  const clean = query.trim().toLowerCase();
  if (!clean) return { topics: [], categories: [], news: [], planets: [] };

  const allTopics = await getTopics();
  const allCats = await getCategories();
  const allNews = await getNews();
  const allPlanets = getPlanets();

  const matchedTopics = allTopics.filter(
    (t) =>
      t.title.toLowerCase().includes(clean) ||
      t.excerpt.toLowerCase().includes(clean) ||
      t.content.toLowerCase().includes(clean)
  );

  const matchedCats = allCats.filter(
    (c) =>
      c.name.toLowerCase().includes(clean) ||
      c.description.toLowerCase().includes(clean)
  );

  const matchedNews = allNews.filter(
    (n) =>
      n.title.toLowerCase().includes(clean) ||
      n.excerpt.toLowerCase().includes(clean)
  );

  const matchedPlanets = allPlanets.filter(
    (p) =>
      p.name.toLowerCase().includes(clean) ||
      p.shortDescription.toLowerCase().includes(clean)
  );

  return {
    topics: matchedTopics,
    categories: matchedCats,
    news: matchedNews,
    planets: matchedPlanets
  };
}

// Admin Operations
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

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('topics').insert({
        title: newTopic.title,
        slug: newTopic.slug,
        category_id: newTopic.categoryId,
        excerpt: newTopic.excerpt,
        content: newTopic.content,
        cover_image: newTopic.coverImage,
        video_url: newTopic.videoUrl,
        author_name: newTopic.authorName,
        reading_time: newTopic.readingTime,
        key_facts: newTopic.keyFacts,
        references_list: newTopic.referencesList,
        status: newTopic.status,
        featured: newTopic.featured,
        seo_title: newTopic.seoTitle,
        seo_description: newTopic.seoDescription
      });
    } catch (e) {
      console.error('Supabase create topic error', e);
    }
  }

  dynamicTopics = [newTopic, ...dynamicTopics];
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

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('topics').update({
        title: updates.title,
        slug: updates.slug,
        excerpt: updates.excerpt,
        content: updates.content,
        cover_image: updates.coverImage,
        status: updates.status,
        featured: updates.featured
      }).eq('id', id);
    } catch (e) {
      console.error('Supabase update topic error', e);
    }
  }

  return dynamicTopics[index];
}

export async function deleteTopic(id: string): Promise<boolean> {
  dynamicTopics = dynamicTopics.filter((t) => t.id !== id);
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('topics').delete().eq('id', id);
    } catch (e) {
      console.error('Supabase delete topic error', e);
    }
  }
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
  return newItem;
}

export async function deleteNews(id: string): Promise<boolean> {
  dynamicNews = dynamicNews.filter((n) => n.id !== id);
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
