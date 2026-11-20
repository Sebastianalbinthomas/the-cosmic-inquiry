import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Compass,
  Layers,
  Newspaper,
  Image as ImageIcon,
  Settings,
  Shield,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Eye,
  Sparkles,
  Save,
  X,
  LogOut,
  LogIn
} from 'lucide-react';
import {
  getAllTopicsAdmin,
  getCategories,
  getNews,
  createTopic,
  updateTopic,
  deleteTopic,
  createNews,
  deleteNews,
  getAdminStats
} from '../../lib/cosmic-service';
import type { Topic, Category, NewsItem } from '../../lib/types';
import { CREATOR_NAME } from '../../lib/cosmic-data';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'topics' | 'categories' | 'news' | 'media' | 'settings'>('overview');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [stats, setStats] = useState({
    totalTopics: 0,
    publishedTopics: 0,
    draftTopics: 0,
    totalCategories: 0,
    totalNews: 0,
    totalViews: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Partial<Topic>>({});
  const [isCreatingNews, setIsCreatingNews] = useState(false);
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({
    category: 'Breaking Discoveries',
    isBreaking: false,
    featured: false
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allT, allC, allN, allS] = await Promise.all([
        getAllTopicsAdmin(),
        getCategories(),
        getNews(),
        getAdminStats()
      ]);
      setTopics(allT);
      setCategories(allC);
      setNews(allN);
      setStats(allS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Save Topic (Create or Update)
  const handleSaveTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTopic.title) {
      alert('Topic title is required');
      return;
    }

    if (editingTopic.id) {
      await updateTopic(editingTopic.id, editingTopic);
      showNotification(`Updated topic: ${editingTopic.title}`);
    } else {
      await createTopic(editingTopic);
      showNotification(`Created new topic: ${editingTopic.title}`);
    }

    setIsEditingTopic(false);
    setEditingTopic({});
    await loadData();
  };

  // Handle Delete Topic
  const handleDeleteTopic = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      await deleteTopic(id);
      showNotification(`Deleted topic: ${title}`);
      await loadData();
    }
  };

  // Handle Save News
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title) {
      alert('News title is required');
      return;
    }

    await createNews(newNews);
    showNotification(`Published news dispatch: ${newNews.title}`);
    setIsCreatingNews(false);
    setNewNews({ category: 'Breaking Discoveries', isBreaking: false, featured: false });
    await loadData();
  };

  // Handle Delete News
  const handleDeleteNews = async (id: string, title: string) => {
    if (confirm(`Delete news article "${title}"?`)) {
      await deleteNews(id);
      showNotification(`Deleted news dispatch`);
      await loadData();
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col md:flex-row font-body">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-violet-900/90 border border-violet-400 text-white font-mono text-xs shadow-2xl animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Left Navigation Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a1020] border-r border-slate-800/80 p-5 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Admin Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold font-mono shadow-lg shadow-violet-600/40">
              CI
            </div>
            <div>
              <span className="text-sm font-bold font-heading text-white tracking-wider block">
                CONTROL ROOM
              </span>
              <span className="text-[10px] font-mono text-cyan-400 uppercase">
                The Cosmic Inquiry
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1.5 text-xs font-mono">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-violet-600 text-white font-semibold shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('topics')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'topics'
                  ? 'bg-violet-600 text-white font-semibold shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Topic Manager</span>
              <span className="ml-auto text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                {stats.totalTopics}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'categories'
                  ? 'bg-violet-600 text-white font-semibold shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Categories</span>
              <span className="ml-auto text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                {stats.totalCategories}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'news'
                  ? 'bg-violet-600 text-white font-semibold shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>News & Chronicle</span>
              <span className="ml-auto text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                {stats.totalNews}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'media'
                  ? 'bg-violet-600 text-white font-semibold shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'settings'
                  ? 'bg-violet-600 text-white font-semibold shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>SEO & System</span>
            </button>
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="pt-6 border-t border-slate-800/80 space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono space-y-1">
            <span className="text-slate-400 block">Lead Architect</span>
            <span className="text-white font-bold">{CREATOR_NAME}</span>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] text-cyan-300 font-semibold">
                GitHub & Netlify Native
              </span>
            </div>
          </div>

          <a
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Live Website</span>
          </a>
        </div>
      </aside>

      {/* Main Administrative Work Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Dashboard Overview
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                  System telemetry, research library metrics, and publication activity.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTopic({
                    categoryId: categories[0]?.id || 'cat-solar-system',
                    status: 'published',
                    authorName: CREATOR_NAME,
                    readingTime: '6 min read'
                  });
                  setIsEditingTopic(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Topic</span>
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0e1628] border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">Total Topics</span>
                <span className="text-3xl font-bold font-heading text-white">{stats.totalTopics}</span>
                <span className="text-[11px] font-mono text-emerald-400 block mt-2">
                  {stats.publishedTopics} Published • {stats.draftTopics} Drafts
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e1628] border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">Categories</span>
                <span className="text-3xl font-bold font-heading text-white">{stats.totalCategories}</span>
                <span className="text-[11px] font-mono text-cyan-400 block mt-2">All Active</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e1628] border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">Chronicle Dispatches</span>
                <span className="text-3xl font-bold font-heading text-white">{stats.totalNews}</span>
                <span className="text-[11px] font-mono text-pink-400 block mt-2">Astronomical News</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e1628] border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-1">Total Reader Impressions</span>
                <span className="text-3xl font-bold font-heading text-white">{stats.totalViews.toLocaleString()}</span>
                <span className="text-[11px] font-mono text-stellar-gold block mt-2">Across All Articles</span>
              </div>
            </div>

            {/* Recent Publications Table */}
            <div className="p-6 rounded-2xl bg-[#0e1628] border border-slate-800">
              <h3 className="text-base font-bold font-heading text-white mb-4">
                Recently Published Topics
              </h3>
              <div className="divide-y divide-slate-800/80">
                {topics.slice(0, 5).map((t) => (
                  <div key={t.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <a
                        href={`/explore/${t.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-white hover:text-violet-400 transition-colors truncate block"
                      >
                        {t.title}
                      </a>
                      <span className="text-xs font-mono text-slate-500">
                        /{t.slug} • {t.authorName} • {new Date(t.publishedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                          t.status === 'published'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {t.status.toUpperCase()}
                      </span>
                      <button
                        onClick={() => {
                          setEditingTopic(t);
                          setIsEditingTopic(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="Edit Topic"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TOPICS MANAGER TAB */}
        {activeTab === 'topics' && (
          <div className="space-y-6 animate-fade-in max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold font-heading text-white">
                  Topic Manager
                </h1>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Publish, update, or archive individual scientific articles and exploration pages.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTopic({
                    categoryId: categories[0]?.id || 'cat-solar-system',
                    status: 'published',
                    authorName: CREATOR_NAME,
                    readingTime: '6 min read'
                  });
                  setIsEditingTopic(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-semibold shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Topic</span>
              </button>
            </div>

            {/* Topics List Table */}
            <div className="rounded-2xl bg-[#0e1628] border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#121c33] text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Title & Slug</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Views</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {topics.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-white text-sm font-heading">{t.title}</div>
                        <div className="text-slate-500 text-[11px]">/explore/{t.slug}</div>
                      </td>
                      <td className="p-4 text-slate-300">{t.categoryName || 'Astrophysics'}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            t.status === 'published'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{t.viewsCount.toLocaleString()}</td>
                      <td className="p-4 text-right space-x-2">
                        <a
                          href={`/explore/${t.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300"
                          title="View Live Page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => {
                            setEditingTopic(t);
                            setIsEditingTopic(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-violet-300"
                          title="Edit Topic"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTopic(t.id, t.title)}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-400"
                          title="Delete Topic"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fade-in max-w-6xl">
            <div>
              <h1 className="text-2xl font-bold font-heading text-white">
                Category Manager
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Curate the 12 cosmic research disciplines displayed on the homepage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-[#0e1628] border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">
                      SLUG: /categories/{c.slug}
                    </span>
                    <h3 className="text-lg font-bold font-heading text-white mb-2">{c.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3">{c.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Order: #{c.displayOrder}</span>
                    <a
                      href={`/categories/${c.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-violet-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWS & DISCOVERIES TAB */}
        {activeTab === 'news' && (
          <div className="space-y-6 animate-fade-in max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold font-heading text-white">
                  The Cosmic Chronicle Manager
                </h1>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Manage breaking discoveries, space agency dispatches, and mission feeds.
                </p>
              </div>

              <button
                onClick={() => setIsCreatingNews(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-semibold shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Dispatch</span>
              </button>
            </div>

            <div className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#0e1628] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-mono mb-1">
                      <span className="text-pink-400 font-semibold">{item.category}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{item.sourceName}</span>
                    </div>
                    <h3 className="text-base font-bold font-heading text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.excerpt}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                    <a
                      href={`/chronicle/${item.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300"
                      title="View Article"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDeleteNews(item.id, item.title)}
                      className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-400"
                      title="Delete Dispatch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MEDIA LIBRARY TAB */}
        {activeTab === 'media' && (
          <div className="space-y-6 animate-fade-in max-w-6xl">
            <div>
              <h1 className="text-2xl font-bold font-heading text-white">
                Media Library & Storage
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Optimized high-resolution celestial photography, textures, and video assets.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: 'Black Hole Singularity', url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=800&q=80' },
                { title: 'JWST Infrared Deep Field', url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80' },
                { title: 'Primordial Inflation CMB', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
                { title: 'Andromeda Galactic Spiral', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80' },
                { title: 'Neutron Star Magnetar', url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80' },
                { title: 'Relativistic Spacetime Mesh', url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80' },
                { title: 'Alien Exoplanet Atmosphere', url: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80' },
                { title: 'Thermonuclear Solar Corona', url: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80' }
              ].map((m, idx) => (
                <div key={idx} className="group rounded-2xl overflow-hidden bg-[#0e1628] border border-slate-800">
                  <div className="h-40 overflow-hidden relative">
                    <img src={m.url} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3 text-[11px] font-mono text-slate-300">
                    <span className="font-semibold block truncate">{m.title}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(m.url);
                        showNotification('Copied asset URL to clipboard');
                      }}
                      className="text-cyan-400 hover:text-cyan-300 text-[10px] mt-1"
                    >
                      Copy Asset URL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS / SEO / SYSTEM TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <div>
              <h1 className="text-2xl font-bold font-heading text-white">
                SEO & System Architecture
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Configure global search engine metadata, Netlify server-side rendering, and Supabase security.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1628] border border-slate-800 space-y-4">
              <h3 className="text-base font-bold font-heading text-white">Platform Identity & Creator</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">Platform Name</label>
                  <input
                    type="text"
                    readOnly
                    value="The Cosmic Inquiry"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Creator & Lead Architect</label>
                  <input
                    type="text"
                    readOnly
                    value={CREATOR_NAME}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1628] border border-slate-800 space-y-4">
              <h3 className="text-base font-bold font-heading text-white">Database & Hosting Status</h3>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">Hosting Environment:</span>
                  <span className="text-cyan-400 font-semibold">Netlify Production SSR (Astro Adapter)</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">Backend Database:</span>
                  <span className={isSupabaseConfigured ? 'text-emerald-400 font-semibold' : 'text-cyan-400 font-semibold'}>
                    {isSupabaseConfigured ? 'Supabase Connected' : 'Local Autonomous Engine (Seed Active)'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">Row Level Security (RLS):</span>
                  <span className="text-emerald-400 font-semibold">Configured in supabase/migrations</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* TOPIC CREATE / EDIT MODAL */}
      {isEditingTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#0e1628] border border-violet-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-xl font-bold font-heading text-white">
                {editingTopic.id ? 'Edit Scientific Topic' : 'Create New Exploration Topic'}
              </h3>
              <button
                onClick={() => setIsEditingTopic(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTopic} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-300 block mb-1">Topic Title *</label>
                <input
                  type="text"
                  required
                  value={editingTopic.title || ''}
                  onChange={(e) => setEditingTopic({ ...editingTopic, title: e.target.value })}
                  placeholder="e.g. Gravitational Lensing and Dark Matter Filaments"
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-violet-500 font-heading text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingTopic.slug || ''}
                    onChange={(e) => setEditingTopic({ ...editingTopic, slug: e.target.value })}
                    placeholder="e.g. gravitational-lensing"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Category</label>
                  <select
                    value={editingTopic.categoryId || 'cat-solar-system'}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.id === e.target.value);
                      setEditingTopic({
                        ...editingTopic,
                        categoryId: e.target.value,
                        categoryName: cat?.name
                      });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Excerpt / Subtitle *</label>
                <textarea
                  required
                  rows={2}
                  value={editingTopic.excerpt || ''}
                  onChange={(e) => setEditingTopic({ ...editingTopic, excerpt: e.target.value })}
                  placeholder="Concise overview explaining the phenomenon..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={editingTopic.coverImage || ''}
                  onChange={(e) => setEditingTopic({ ...editingTopic, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Embedded Video URL (Optional)</label>
                <input
                  type="url"
                  value={editingTopic.videoUrl || ''}
                  onChange={(e) => setEditingTopic({ ...editingTopic, videoUrl: e.target.value })}
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Full Scientific Content (Markdown / Text) *</label>
                <textarea
                  required
                  rows={8}
                  value={editingTopic.content || ''}
                  onChange={(e) => setEditingTopic({ ...editingTopic, content: e.target.value })}
                  placeholder="Write the full scientific explanation with headers, equations, observations, and references..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingTopic.status === 'published'}
                      onChange={(e) =>
                        setEditingTopic({
                          ...editingTopic,
                          status: e.target.checked ? 'published' : 'draft'
                        })
                      }
                      className="rounded bg-slate-800 border-slate-700 text-violet-600"
                    />
                    <span className="text-slate-300">Publish Immediately</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingTopic(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-600/30"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Topic</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEWS CREATE MODAL */}
      {isCreatingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#0e1628] border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-xl font-bold font-heading text-white">
                Publish Astronomical Dispatch
              </h3>
              <button
                onClick={() => setIsCreatingNews(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-300 block mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  value={newNews.title || ''}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  placeholder="e.g. NASA's Artemis III Identifies Lunar South Pole Landing Sites"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1">Source Name</label>
                  <input
                    type="text"
                    value={newNews.sourceName || ''}
                    onChange={(e) => setNewNews({ ...newNews, sourceName: e.target.value })}
                    placeholder="NASA / ESA / STScI"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Category</label>
                  <select
                    value={newNews.category || 'Breaking Discoveries'}
                    onChange={(e) => setNewNews({ ...newNews, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Breaking Discoveries">Breaking Discoveries</option>
                    <option value="NASA Updates">NASA Updates</option>
                    <option value="ESA Updates">ESA Updates</option>
                    <option value="Space Missions">Space Missions</option>
                    <option value="Astrophysics">Astrophysics</option>
                    <option value="Planetary Science">Planetary Science</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={newNews.excerpt || ''}
                  onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Full Dispatch Content *</label>
                <textarea
                  required
                  rows={4}
                  value={newNews.content || ''}
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newNews.isBreaking || false}
                    onChange={(e) => setNewNews({ ...newNews, isBreaking: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-pink-600"
                  />
                  <span className="text-slate-300">Mark as Breaking Discovery</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreatingNews(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold shadow-lg shadow-pink-600/30"
                >
                  Publish Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
