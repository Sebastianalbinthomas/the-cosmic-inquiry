import React from 'react';
import type { Category } from '../../lib/types';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section id="discover" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-stellar-gold bg-amber-950/40 border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover The Cosmos</span>
          </div>
          <h2 className="domains-title-text text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight">
            Curated Cosmic Domains
          </h2>
          <p className="domains-desc-text mt-3 text-base text-slate-300 max-w-2xl font-body">
            Explore 12 foundational scientific disciplines spanning planetary geology, stellar physics, relativistic spacetime, and quantum cosmology.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-slate-400">
            {categories.length} Research Domains Active
          </span>
        </div>
      </div>

      {/* Grid of 12 categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat, idx) => (
          <a
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group relative rounded-3xl overflow-hidden bg-cosmic-900/80 border border-violet-500/20 hover:border-violet-500/60 transition-all duration-500 hover:shadow-[0_0_35px_rgba(139,92,246,0.3)] hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Visual Header Image */}
            <div className="relative h-48 sm:h-52 overflow-hidden">
              <img
                src={cat.coverImage}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900 via-cosmic-900/30 to-transparent" />

              {/* Order Number Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cosmic-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
                DOMAIN {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Topic count badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-violet-950/80 backdrop-blur-md border border-violet-500/30 text-[10px] font-mono text-violet-300">
                {cat.topicCount ?? 6} Topics
              </div>
            </div>

            {/* Description & Action */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold font-heading text-white group-hover:text-violet-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-body">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-violet-500/15 flex items-center justify-between text-xs font-mono font-medium text-slate-300 group-hover:text-cyan-300 transition-colors">
                <span>EXPLORE CATEGORY</span>
                <div className="w-8 h-8 rounded-full bg-cosmic-800 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-400 group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
