# THE COSMIC INQUIRY

> **"Explore the Infinite. Question Everything. Understand the Universe."**

**The Cosmic Inquiry** is an advanced, cinematic, interactive digital observatory, space museum, and scientific discovery platform. Designed as a long-term, expandable scientific knowledge ecosystem, it seamlessly bridges planetary science, stellar physics, relativistic spacetime, and quantum cosmology into a unified discovery experience.

**Creator & Lead Architect:** Albin Thomas  
**Category:** Interactive Astronomy, Astrophysics, Cosmology & Cosmic Discovery  
**Frontend Framework:** Astro 5 (Server-Side Rendered via Netlify Adapter) + React  
**3D Engine:** Three.js Interactive WebGL Planetary Engine  
**Styling & Design System:** Tailwind CSS with Cosmic Dark Theme  
**Database & Auth:** Supabase (PostgreSQL with Row Level Security, Auth, Storage)  
**Hosting & Serverless:** Netlify + Netlify Functions  

---

## 🌌 Platform Architecture & Modules

### 1. Cinematic Splash Screen & Visual Identity
- Celestial orbital structure featuring singularity star, orthogonal orbital rings, and glowing blue-violet emission.
- Micro-timed atmospheric sequence with instant skip support and session persistence.

### 2. Deep-Space Hero
- Atmospheric nebula gradients, particle starfield parallax, and cosmic typography: **"BEYOND EVERYTHING WE KNOW."**
- Direct navigation to the planetary simulator and latest scientific dispatches.

### 3. Interactive 3D Solar System (Three.js)
- Real-time WebGL simulation featuring the Sun, Mercury, Venus, Earth (+ Moon), Mars, Jupiter, Saturn (+ procedural rings), Uranus, and Neptune.
- Mouse & touch drag rotation, wheel zoom, click-to-focus raycasting, camera fly-to animations, orbital pause/play, and HUD metrics panel with instant links to dedicated planetary exploration pages (`/explore/[planet]`).

### 4. Scroll-Triggered Cinematic Voyage
- 8-stage descent into deep space: Solar System &rarr; Thermonuclear Stars &rarr; Nebulae &rarr; Galaxies &rarr; Black Holes &rarr; Primordial Dawn &rarr; The Big Bang &rarr; Future Heat Death.

### 5. Curated Cosmic Domains (12 Foundational Categories)
- The Solar System
- Stars & Stellar Evolution
- Galaxies & Nebulae
- Black Holes
- Cosmic Explosions
- The Big Bang
- Dark Matter & Dark Energy
- Exoplanets & Habitable Worlds
- Space-Time & Relativity
- Quantum Universe
- Extraterrestrial Life
- Cosmic Mysteries
- Dedicated permanent category landing pages (`/categories/[slug]`).

### 6. The Cosmic Chronicle (Astronomical Journalism)
- Latest discoveries with attributions to NASA, ESA, STScI, and the Event Horizon Telescope.
- Breaking discovery badges, source links, and dedicated readable pages (`/chronicle/[slug]`).

### 7. Instant Cosmic Search (Command+K / Ctrl+K)
- Instant search-as-you-type indexing topics, planets, categories, and news with trending inquiry suggestions.

### 8. Dedicated Individual Exploration Pages (`/explore/[slug]`)
- Permanent, server-rendered URLs with unique Open Graph, Twitter cards, and Schema.org metadata.
- Reading time, author attribution, astrophysical parameters grid, rich scientific explanations, video embeds, and peer-reviewed citations.

### 9. Interactive Universe Timeline (`/timeline`)
- 13.8 billion year journey from the Planck Epoch ($10^{-43}$s) to Recombination (CMB), First Stars, and the deep degenerate future.

### 10. Scientific Glossary (`/glossary`)
- Searchable lexicon of astrophysics terminology, relativistic formulas, and cosmological constants.

### 11. Administration Control Room (`/admin`)
- Dark control room dashboard with telemetry overview, Topic Manager (Create, Edit, Delete, Draft, Publish), Category Manager, News Manager, Media Library, and SEO Manager.
- Dual-mode operation: connects directly to Supabase when credentials are provided, or runs autonomously with in-memory persistence in offline mode.

---

## 🛠️ Project Structure

```
the-cosmic-inquiry/
├── public/
│   ├── favicon.svg              # Brand celestial singularity icon
│   ├── robots.txt               # Search engine directives
│   └── assets/                  # Public astronomical assets
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx      # Full-featured control room UI
│   │   ├── animations/
│   │   │   ├── CosmicAudio.tsx         # Web Audio API deep space resonance synth
│   │   │   ├── CosmicJourney.tsx       # 8-stage cinematic scroll voyage
│   │   │   ├── CosmicSplashScreen.tsx  # Brand logo intro animation
│   │   │   └── StarfieldCanvas.tsx     # Particle starfield background
│   │   ├── news/
│   │   │   └── CosmicChronicleSection.tsx # Newspaper & breaking dispatches
│   │   ├── search/
│   │   │   └── CosmicSearchModal.tsx   # Cmd+K search modal
│   │   ├── solar-system/
│   │   │   └── SolarSystem3D.tsx       # Three.js interactive 3D solar system
│   │   └── topics/
│   │       ├── CategoryGrid.tsx        # 12 curated category cards
│   │       └── TrendingTopicsSection.tsx # Trending scientific questions
│   ├── layouts/
│   │   └── Layout.astro                # Master layout with SEO & header/footer
│   ├── lib/
│   │   ├── cosmic-data.ts              # Core scientific catalog & data models
│   │   ├── cosmic-service.ts           # Unified data queries & mutations
│   │   ├── supabase.ts                 # Supabase client & fallback layer
│   │   └── types.ts                    # TypeScript interfaces
│   ├── pages/
│   │   ├── admin/
│   │   │   └── index.astro             # Dedicated /admin route
│   │   ├── api/
│   │   │   ├── news.ts                 # News API endpoint
│   │   │   ├── search.ts               # Search API endpoint
│   │   │   └── topics.ts               # Topics REST API endpoint
│   │   ├── categories/
│   │   │   └── [slug].astro            # Dynamic category routes
│   │   ├── chronicle/
│   │   │   ├── [slug].astro            # Dynamic news article routes
│   │   │   └── index.astro             # Chronicle feed index
│   │   ├── explore/
│   │   │   └── [slug].astro            # Individual topic exploration pages
│   │   ├── glossary.astro              # Scientific glossary
│   │   ├── index.astro                 # Homepage
│   │   ├── sitemap.xml.ts              # Dynamic XML sitemap
│   │   └── timeline.astro              # Universe chronology
│   └── styles/
│       └── global.css                  # Tailwind styles & cosmic utilities
├── supabase/
│   └── migrations/
│       └── 20261120000000_cosmic_inquiry_init.sql # Master DB schema & RLS
├── .env.example                         # Environment variables template
├── astro.config.mjs                     # Astro SSR + Netlify + React config
├── netlify.toml                         # Netlify build & deployment config
├── package.json                         # Project dependencies
├── tailwind.config.mjs                  # Cosmic color palette & animations
└── tsconfig.json                        # TypeScript configuration
```

---

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/the-cosmic-inquiry.git
   cd the-cosmic-inquiry
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser.

---

## 🗄️ Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase project dashboard.
3. Paste and run the entire SQL script from `supabase/migrations/20261120000000_cosmic_inquiry_init.sql`.
4. Copy your **Project URL** and **Anon Public Key** from `Settings` &rarr; `API`.
5. Add them to your `.env` file:
   ```env
   PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

---

## 🌐 Netlify Deployment

1. Push your repository to **GitHub**.
2. Log into [Netlify](https://app.netlify.com) and click **"Add new site" &rarr; "Import an existing project"**.
3. Select your GitHub repository `the-cosmic-inquiry`.
4. The build settings are configured automatically via `netlify.toml`:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Under **Environment variables**, set:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy Site**.

---

## 📜 Authorship & Legal

- **Conception, Architecture & Implementation:** Albin Thomas
- **Educational Open License:** All educational and scientific explanations are provided for non-commercial astronomical education and public scientific discovery.
