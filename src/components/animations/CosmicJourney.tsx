import React from 'react';
import { ArrowRight, Compass, Sparkles, Orbit, Flame, CloudSun, Eye, Layers } from 'lucide-react';

const JOURNEY_STAGES = [
  {
    step: '01',
    title: 'The Solar System & Planetary Boundaries',
    subtitle: 'From the Kuiper Belt to the Scorched Core',
    description: 'Leave the gravitational cradle of Earth behind. Journey past terrestrial rocky spheres, through the treacherous asteroid belt, and across the titanic gas giants and icy outer realms.',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    link: '/explore/solar-system',
    badge: 'Solar Scale',
    accentColor: '#38bdf8'
  },
  {
    step: '02',
    title: 'Thermonuclear Stars & Stellar Life Cycles',
    subtitle: 'Cosmic Engines Forging the Chemical Elements',
    description: 'Witness the thermonuclear crucible where hydrogen fuses into helium under crushing gravitational pressures. Understand how main-sequence stars evolve, collapse into red giants, and eject planetary nebulae.',
    image: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=1200&q=80',
    link: '/explore/neutron-stars',
    badge: 'Stellar Physics',
    accentColor: '#f59e0b'
  },
  {
    step: '03',
    title: 'Nebulae & Stellar Nurseries',
    subtitle: 'Pillars of Creation & Ionized Gas Clouds',
    description: 'Plunge through vast molecular dust clouds spanning hundreds of light-years. In these iridescent stellar cradles, turbulent magnetic shockwaves trigger the birth of new solar systems.',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    link: '/categories/galaxies-and-nebulae',
    badge: 'Interstellar Medium',
    accentColor: '#ec4899'
  },
  {
    step: '04',
    title: 'Galaxies & Cosmic Structures',
    subtitle: 'Island Universes Bound by Supermassive Singularities',
    description: 'Zoom out into deep space where hundreds of billions of suns spin in grand spiral arms. Examine the gravitational dance between the Milky Way, Andromeda, and the cosmic filament web.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
    link: '/explore/the-milky-way',
    badge: 'Galactic Scale',
    accentColor: '#8b5cf6'
  },
  {
    step: '05',
    title: 'Black Holes & Warped Spacetime',
    subtitle: 'Where General Relativity and Quantum Mechanics Collide',
    description: 'Approach the uncrossable event horizon. Observe photon spheres where light circles in endless orbits, relativistic jet eruptions, and extreme gravitational time dilation.',
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80',
    link: '/explore/black-holes',
    badge: 'Relativistic Physics',
    accentColor: '#a78bfa'
  },
  {
    step: '06',
    title: 'The Deep Universe & Primordial Dawn',
    subtitle: 'Peering 13.5 Billion Years Into the Past',
    description: 'Through the infrared vision of the James Webb Space Telescope, behold the first galaxies that illuminated the cosmos after the cosmic dark ages, just 300 million years after genesis.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    link: '/explore/james-webb-discoveries',
    badge: 'Infrared Cosmology',
    accentColor: '#06b6d4'
  },
  {
    step: '07',
    title: 'The Big Bang & Inflationary Genesis',
    subtitle: 'The Creation of Spacetime, Matter & Natural Laws',
    description: 'Arrive at the ultimate beginning: the Planck epoch and the explosive metric inflation of space itself. Decouple with the Cosmic Microwave Background and understand how our universe came to be.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    link: '/explore/the-big-bang',
    badge: 'Cosmic Origin',
    accentColor: '#fbbf24'
  },
  {
    step: '08',
    title: 'Unanswered Cosmic Mysteries & The Destiny of Reality',
    subtitle: 'The Fermi Paradox, Dark Energy & The Ultimate Fate',
    description: 'Confront the profound enigmas that keep theoretical physicists awake: Where is everyone? What is dark energy? And will the cosmos end in a Big Freeze, Big Rip, or quantum resurgence?',
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1200&q=80',
    link: '/explore/dark-matter',
    badge: 'Frontier Mysteries',
    accentColor: '#f43f5e'
  }
];

export default function CosmicJourney() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-violet-300 bg-violet-950/60 border border-violet-500/30 mb-4">
          <Orbit className="w-3.5 h-3.5 text-cyan-400" />
          <span>The Cinematic Voyage</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight">
          Journey Deeper Into The Cosmos
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 font-body leading-relaxed">
          From our terrestrial horizon to the primordial singularity, scroll through the eight strata of cosmic reality.
        </p>
      </div>

      {/* Vertical Timeline Journey Container */}
      <div className="relative">
        {/* Center glowing guide line */}
        <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-violet-500 to-amber-500 opacity-30 pointer-events-none" />

        <div className="space-y-16 lg:space-y-28">
          {JOURNEY_STAGES.map((stage, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={stage.step}
                className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Card */}
                <div className="w-full lg:w-1/2 group">
                  <div className="relative rounded-3xl overflow-hidden border border-violet-500/25 bg-cosmic-900 shadow-2xl transition-all duration-500 group-hover:border-violet-500/60 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]">
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-64 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 via-cosmic-950/40 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-cosmic-950/80 backdrop-blur-md border border-white/10 uppercase tracking-widest text-slate-200"
                        style={{ borderLeftColor: stage.accentColor, borderLeftWidth: '3px' }}
                      >
                        {stage.badge}
                      </span>
                    </div>

                    {/* Step Number on image */}
                    <div className="absolute bottom-4 right-4 text-3xl font-bold font-mono text-white/20 group-hover:text-white/40 transition-colors">
                      {stage.step}
                    </div>
                  </div>
                </div>

                {/* Center Node Indicator (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cosmic-950 border-2 border-violet-500 items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)] z-10 text-xs font-mono font-bold text-cyan-300">
                  {stage.step}
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                    STAGE {stage.step} — {stage.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                    {stage.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
                    {stage.description}
                  </p>
                  <div>
                    <a
                      href={stage.link}
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-violet-300 hover:text-white group pt-2 transition-colors"
                    >
                      <span>Explore this domain</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-cyan-400" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
