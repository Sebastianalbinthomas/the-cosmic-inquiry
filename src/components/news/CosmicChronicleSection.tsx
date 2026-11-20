import React from 'react';
import type { NewsItem } from '../../lib/types';
import { Newspaper, Flame, ExternalLink, Calendar, Compass, ArrowRight } from 'lucide-react';

interface CosmicChronicleSectionProps {
  news: NewsItem[];
}

export default function CosmicChronicleSection({ news }: CosmicChronicleSectionProps) {
  const featured = news.find((n) => n.featured) || news[0];
  const secondaries = news.filter((n) => n.id !== featured?.id).slice(0, 3);

  return (
    <section id="chronicle" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-pink-400 bg-pink-950/40 border border-pink-500/30 mb-3">
            <Newspaper className="w-3.5 h-3.5" />
            <span>The Cosmic Chronicle</span>
          </div>
          <h2 className="chronicle-title-text text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight">
            Latest Astronomical Discoveries
          </h2>
          <p className="chronicle-desc-text mt-3 text-base text-slate-300 max-w-2xl font-body">
            Peer-reviewed discoveries, space agency mission milestones, and observational updates from NASA, ESA, and international astronomical arrays.
          </p>
        </div>

        <div>
          <a
            href="/chronicle"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
          >
            <span>View All Dispatches</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Magazine Layout: 1 Large Hero Discovery + Secondary Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Large Featured Discovery (7 cols) */}
        {featured && (
          <div className="lg:col-span-7">
            <a
              href={`/chronicle/${featured.slug}`}
              className="group block relative rounded-3xl overflow-hidden bg-cosmic-900 border border-violet-500/25 hover:border-violet-500/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] h-full flex flex-col justify-between"
            >
              <div className="relative h-80 sm:h-96 overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 via-cosmic-950/40 to-transparent" />

                {/* Breaking / Featured Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {featured.isBreaking && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-600/90 text-white font-mono text-xs font-bold uppercase tracking-wider animate-pulse shadow-lg">
                      <Flame className="w-3.5 h-3.5" />
                      Breaking Discovery
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-cosmic-950/80 backdrop-blur-md border border-white/10 text-xs font-mono text-cyan-300">
                    {featured.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span>•</span>
                    <span className="text-violet-300">{featured.sourceName}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-violet-300 transition-colors leading-snug">
                    {featured.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed font-body">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-violet-500/15 flex items-center justify-between text-xs font-mono text-cyan-400 font-semibold group-hover:text-cyan-300">
                  <span>READ FULL DISPATCH</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Secondary Discoveries Stack (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {secondaries.map((item) => (
            <a
              key={item.id}
              href={`/chronicle/${item.slug}`}
              className="group flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-cosmic-900/80 border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-950/50"
            >
              <div className="sm:w-44 h-44 sm:h-auto relative overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-cosmic-950/20" />
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <span className="text-pink-400 font-semibold">{item.category}</span>
                    <span>
                      {new Date(item.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold font-heading text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 font-body">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-violet-500/10 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-slate-200">
                  <span className="truncate max-w-[160px]">{item.sourceName}</span>
                  <span className="text-cyan-400">Read &rarr;</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
