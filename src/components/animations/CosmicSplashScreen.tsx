import React, { useState, useEffect } from 'react';

export default function CosmicSplashScreen() {
  const [stage, setStage] = useState<'stars' | 'symbol' | 'rings' | 'glow' | 'title' | 'beam' | 'exit' | 'done'>('stars');

  useEffect(() => {
    // Check if user already saw splash in current session
    const hasSeenSplash = sessionStorage.getItem('cosmic_splash_seen');
    if (hasSeenSplash) {
      setStage('done');
      return;
    }

    const t1 = setTimeout(() => setStage('symbol'), 400);
    const t2 = setTimeout(() => setStage('rings'), 800);
    const t3 = setTimeout(() => setStage('glow'), 1200);
    const t4 = setTimeout(() => setStage('title'), 1600);
    const t5 = setTimeout(() => setStage('beam'), 2100);
    const t6 = setTimeout(() => setStage('exit'), 2700);
    const t7 = setTimeout(() => {
      setStage('done');
      sessionStorage.setItem('cosmic_splash_seen', 'true');
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, []);

  const handleSkip = () => {
    setStage('done');
    sessionStorage.setItem('cosmic_splash_seen', 'true');
  };

  if (stage === 'done') return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02040a] cursor-pointer transition-opacity duration-700 ${
        stage === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Cosmic Splash Screen (Click to skip)"
    >
      {/* Background starlight particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping opacity-60" />
        <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-70" />
        <div className="absolute top-1/2 left-4/5 w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse opacity-50" />
      </div>

      {/* Central Celestial Orbital Symbol */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Orbital Ring 1 */}
        <div
          className={`absolute inset-0 rounded-full border border-violet-500/40 transition-all duration-1000 ${
            stage === 'stars'
              ? 'opacity-0 scale-50'
              : 'opacity-100 scale-100 animate-spin-slow'
          }`}
          style={{ transform: 'rotateX(65deg)' }}
        />

        {/* Orbital Ring 2 (Orthogonal) */}
        <div
          className={`absolute inset-2 rounded-full border border-cyan-400/40 transition-all duration-1000 ${
            stage === 'stars' || stage === 'symbol'
              ? 'opacity-0 scale-75'
              : 'opacity-100 scale-100 animate-spin-reverse-slow'
          }`}
          style={{ transform: 'rotateY(65deg)' }}
        />

        {/* Orbital Ring 3 (Tilted) */}
        <div
          className={`absolute inset-5 rounded-full border border-amber-400/30 transition-all duration-1000 ${
            stage === 'stars' || stage === 'symbol'
              ? 'opacity-0'
              : 'opacity-100'
          }`}
          style={{ transform: 'rotateZ(45deg)' }}
        />

        {/* Central Singularity Star */}
        <div
          className={`relative z-10 w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 via-cyan-400 to-white transition-all duration-700 ${
            stage === 'stars' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          } ${
            stage === 'glow' || stage === 'title' || stage === 'beam'
              ? 'shadow-[0_0_35px_rgba(139,92,246,0.9),0_0_60px_rgba(6,182,212,0.6)]'
              : ''
          }`}
        >
          {/* Inner point of singularity */}
          <div className="absolute inset-1.5 rounded-full bg-white animate-pulse" />
        </div>

        {/* Passing Light Beam */}
        {stage === 'beam' && (
          <div className="absolute w-64 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-beam" />
        )}
      </div>

      {/* Typography */}
      <div
        className={`mt-8 text-center transition-all duration-1000 ${
          stage === 'title' || stage === 'beam' || stage === 'exit'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <h1 className="text-xl sm:text-2xl font-bold tracking-[0.3em] font-heading text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-violet-300">
          THE COSMIC INQUIRY
        </h1>
        <p className="mt-2 text-[11px] font-mono tracking-[0.25em] text-cyan-400/80 uppercase">
          Observatory & Discovery Platform
        </p>
      </div>

      {/* Skip indicator */}
      <span className="absolute bottom-8 text-[11px] font-mono text-slate-600 tracking-wider hover:text-slate-400 transition-colors">
        CLICK ANYWHERE TO ENTER
      </span>
    </div>
  );
}
