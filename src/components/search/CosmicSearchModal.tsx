import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, Compass, Newspaper, Globe, ArrowRight } from 'lucide-react';
import { searchCosmos } from '../../lib/cosmic-service';
import type { Topic, Category, NewsItem, Planet } from '../../lib/types';

interface SearchResultState {
  topics: Topic[];
  categories: Category[];
  news: NewsItem[];
  planets: Planet[];
}

export default function CosmicSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultState>({
    topics: [],
    categories: [],
    news: [],
    planets: []
  });
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Global shortcut (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults({ topics: [], categories: [], news: [], planets: [] });
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ topics: [], categories: [], news: [], planets: [] });
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await searchCosmos(query);
        setResults(res);
      } finally {
        setIsSearching(false);
      }
    }, 180);
    return () => clearTimeout(timer);
  }, [query]);

  const trendingQueries = [
    'Black Holes',
    'James Webb',
    'The Big Bang',
    'Dark Matter',
    'Mars',
    'Saturn Rings',
    'Gravitational Waves'
  ];

  const totalResults =
    results.topics.length +
    results.categories.length +
    results.news.length +
    results.planets.length;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 bg-cosmic-900/60 border border-violet-500/20 hover:border-violet-500/50 hover:bg-cosmic-800 transition-all shadow-sm"
        aria-label="Search The Cosmic Inquiry"
      >
        <Search className="w-3.5 h-3.5 text-violet-400" />
        <span className="hidden md:inline">Search Cosmos...</span>
        <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-cosmic-800/80 border border-slate-700 text-slate-400">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-2xl bg-cosmic-900/95 border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-violet-500/20 flex items-center gap-3">
              <Search className="w-5 h-5 text-violet-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search galaxies, black holes, cosmic mysteries..."
                className="w-full bg-transparent text-lg text-white placeholder-slate-500 focus:outline-none font-heading"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-cosmic-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content area */}
            <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
              {/* Trending pills if query empty */}
              {!query.trim() && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-violet-300/80 mb-3 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-stellar-gold" />
                    <span>What The Universe Is Talking About</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingQueries.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-cosmic-800/80 hover:bg-violet-900/40 border border-violet-500/15 text-slate-300 hover:text-white hover:border-violet-500/40 transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Searching indicator */}
              {isSearching && (
                <div className="text-center py-6 text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                  Scanning cosmic archives...
                </div>
              )}

              {/* No results */}
              {!isSearching && query.trim() && totalResults === 0 && (
                <div className="text-center py-10 text-slate-400">
                  <p className="text-base text-slate-300 font-heading mb-1">
                    No celestial records found for "{query}"
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    Try searching for "supernovae", "relativity", "jupiter", or "inflation".
                  </p>
                </div>
              )}

              {/* Topics section */}
              {results.topics.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5" />
                    Exploration Topics ({results.topics.length})
                  </h4>
                  <div className="space-y-2">
                    {results.topics.map((t) => (
                      <a
                        key={t.id}
                        href={`/explore/${t.slug}`}
                        className="flex items-start justify-between p-3 rounded-xl bg-cosmic-850/60 hover:bg-violet-950/40 border border-violet-500/15 hover:border-violet-500/40 transition-all group"
                      >
                        <div>
                          <h5 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                            {t.title}
                          </h5>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {t.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Solar System Planets */}
              {results.planets.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" />
                    Solar System Objects ({results.planets.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.planets.map((p) => (
                      <a
                        key={p.id}
                        href={`/explore/${p.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-cosmic-850/60 hover:bg-cyan-950/40 border border-cyan-500/20 hover:border-cyan-400/50 transition-all group"
                      >
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: p.colorHex, boxShadow: `0 0 10px ${p.glowColor}` }}
                        />
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-white group-hover:text-cyan-300 truncate block">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-slate-400 truncate block">
                            {p.type}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {results.categories.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-stellar-gold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Categories ({results.categories.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.categories.map((c) => (
                      <a
                        key={c.id}
                        href={`/categories/${c.slug}`}
                        className="p-3 rounded-xl bg-cosmic-850/60 hover:bg-amber-950/30 border border-amber-500/20 hover:border-amber-400/40 transition-all group"
                      >
                        <h5 className="text-sm font-medium text-white group-hover:text-stellar-amber">
                          {c.name}
                        </h5>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {c.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {results.news.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-pink-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Newspaper className="w-3.5 h-3.5" />
                    Cosmic Chronicle News ({results.news.length})
                  </h4>
                  <div className="space-y-2">
                    {results.news.map((n) => (
                      <a
                        key={n.id}
                        href={`/chronicle/${n.slug}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-cosmic-850/60 hover:bg-pink-950/30 border border-pink-500/20 hover:border-pink-400/40 transition-all group"
                      >
                        <div>
                          <span className="text-xs text-pink-400 font-mono">
                            {n.category}
                          </span>
                          <h5 className="text-sm font-medium text-white group-hover:text-pink-300">
                            {n.title}
                          </h5>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-cosmic-950/80 border-t border-violet-500/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Press ESC to close</span>
              <span>The Cosmic Inquiry Knowledge Network</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
