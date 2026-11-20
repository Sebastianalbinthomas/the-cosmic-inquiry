import React from 'react';
import type { Topic } from '../../lib/types';
import { TrendingUp, ArrowUpRight, Sparkles, Clock, Eye } from 'lucide-react';

interface TrendingTopicsSectionProps {
  topics: Topic[];
}

export default function TrendingTopicsSection({ topics }: TrendingTopicsSectionProps) {
  const trendingList = topics.slice(0, 4);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-stellar-gold bg-amber-950/40 border border-amber-500/30 mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Trending Scientific Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white">
            What The Universe Is Talking About
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingList.map((t, idx) => (
          <a
            key={t.id}
            href={`/explore/${t.slug}`}
            className="group relative rounded-2xl overflow-hidden bg-cosmic-900/70 border border-violet-500/20 hover:border-violet-500/60 p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                <span className="text-violet-400 font-semibold">#{idx + 1} TRENDING</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {t.readingTime}
                </span>
              </div>

              <h3 className="text-base font-bold font-heading text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                {t.title}
              </h3>

              <p className="mt-2 text-xs text-slate-400 line-clamp-3 font-body">
                {t.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-violet-500/10 flex items-center justify-between text-xs font-mono text-cyan-400 font-medium">
              <span>EXPLORE</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
