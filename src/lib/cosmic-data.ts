import type { Category, Topic, NewsItem, Planet, GlossaryItem, TimelineEra, SiteConfig } from './types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: "The Cosmic Inquiry",
  tagline: "Explore the Infinite. Question Everything. Understand the Universe.",
  creatorName: "Albin Thomas",
  creatorSubtitle: "Curated by Albin Thomas",
  heroBadge: "Scientific Observatory • Architect: Albin Thomas",
  heroHeadingLine1: "BEYOND EVERYTHING",
  heroHeadingLine2: "WE KNOW.",
  heroDescription: "Journey through space, time, matter and existence. Discover the extraordinary phenomena that shape our universe and explore the mysteries that remain beyond our understanding.",
  heroCtaPrimary: "EXPLORE THE UNIVERSE",
  heroCtaSecondary: "DISCOVER THE LATEST",
  solarSystemTitle: "The Interactive Solar System",
  solarSystemDescription: "Explore our cosmic backyard in real-time 3D. Inspect planetary orbits, atmospheric compositions, and physical characteristics.",
  domainsTitle: "Curated Cosmic Domains",
  domainsDescription: "Explore 12 foundational scientific disciplines spanning planetary geology, stellar physics, relativistic spacetime, and quantum cosmology.",
  chronicleTitle: "Latest Astronomical Discoveries",
  chronicleDescription: "Peer-reviewed discoveries, space agency mission milestones, and observational updates from NASA, ESA, and international astronomical arrays.",
  timelineTitle: "The Universe Timeline",
  timelineDescription: "13.787 billion years of spacetime expansion, matter condensation, and stellar evolution traced from t = 0 to the cosmic horizon.",
  glossaryTitle: "Cosmic Scientific Glossary",
  glossaryDescription: "An authoritative astronomical lexicon defining core concepts in astrophysics, general relativity, quantum cosmology, and observational planetary science.",
  metaTitle: "The Cosmic Inquiry | Interactive Astronomy & Cosmic Discovery Platform",
  metaDescription: "A cinematic digital observatory and scientific discovery platform exploring the solar system, black holes, the Big Bang, spacetime, and cosmic mysteries. Created by Albin Thomas.",
  metaKeywords: "astronomy, astrophysics, cosmology, black holes, solar system, james webb, albin thomas, cosmic inquiry",
  ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
};

export const CREATOR_NAME = DEFAULT_SITE_CONFIG.creatorName;
export const SITE_TITLE = DEFAULT_SITE_CONFIG.siteName;
export const SITE_TAGLINE = DEFAULT_SITE_CONFIG.tagline;

export const COSMIC_CATEGORIES: Category[] = [
  {
    id: "cat-solar-system",
    name: "The Solar System",
    slug: "solar-system",
    description: "The planetary architecture, moons, asteroids, and gravitational dynamics bound to our parent star.",
    coverImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 1,
    topicCount: 9
  },
  {
    id: "cat-stars-evolution",
    name: "Stars & Stellar Evolution",
    slug: "stars-and-stellar-evolution",
    description: "From stellar nurseries and thermonuclear fusion to red giants, white dwarfs, and cosmic nucleosynthesis.",
    coverImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 2,
    topicCount: 8
  },
  {
    id: "cat-galaxies-nebulae",
    name: "Galaxies & Nebulae",
    slug: "galaxies-and-nebulae",
    description: "Vast cosmic islands containing billions of suns, interstellar gas pillars, and sweeping galactic spirals.",
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 3,
    topicCount: 11
  },
  {
    id: "cat-black-holes",
    name: "Black Holes",
    slug: "black-holes",
    description: "Singularities of infinite density, warped event horizons, relativistic jets, and gravitational time dilation.",
    coverImage: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 4,
    topicCount: 7
  },
  {
    id: "cat-cosmic-explosions",
    name: "Cosmic Explosions",
    slug: "cosmic-explosions",
    description: "Supernovae, hypernovae, gamma-ray bursts, and kilonova mergers forging the heavy elements of reality.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 5,
    topicCount: 6
  },
  {
    id: "cat-big-bang",
    name: "The Big Bang",
    slug: "the-big-bang",
    description: "The primordial singularity, inflationary cosmology, cosmic microwave background, and genesis of spacetime.",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 6,
    topicCount: 5
  },
  {
    id: "cat-dark-universe",
    name: "Dark Matter & Dark Energy",
    slug: "dark-matter-and-dark-energy",
    description: "The 95% unseen scaffolding of the universe driving accelerating cosmic expansion and galactic cohesion.",
    coverImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 7,
    topicCount: 6
  },
  {
    id: "cat-exoplanets",
    name: "Exoplanets & Habitable Worlds",
    slug: "exoplanets",
    description: "Alien worlds orbiting distant suns, atmospheric spectroscopy, super-Earths, and oceanic moons.",
    coverImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 8,
    topicCount: 8
  },
  {
    id: "cat-spacetime",
    name: "Space-Time & Relativity",
    slug: "space-time-and-relativity",
    description: "Einsteinian gravitational curvature, gravitational lensing, frame dragging, and the fabric of the cosmos.",
    coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 9,
    topicCount: 7
  },
  {
    id: "cat-quantum",
    name: "Quantum Universe",
    slug: "quantum-universe",
    description: "Zero-point vacuum energy, quantum foam at the Planck scale, quantum entanglement, and Hawking radiation.",
    coverImage: "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 10,
    topicCount: 5
  },
  {
    id: "cat-extraterrestrial",
    name: "Extraterrestrial Life",
    slug: "extraterrestrial-life",
    description: "Astrobiology, the Drake Equation, biosignatures, technosignatures, and subsurface oceans of Europa & Enceladus.",
    coverImage: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 11,
    topicCount: 6
  },
  {
    id: "cat-mysteries",
    name: "Cosmic Mysteries",
    slug: "cosmic-mysteries",
    description: "The Fermi Paradox, the Great Attractor, cosmic voids, the arrow of time, and the ultimate fate of reality.",
    coverImage: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 12,
    topicCount: 8
  }
];

export const COSMIC_TOPICS: Topic[] = [
  {
    id: "topic-black-holes",
    title: "Black Holes: Singularities, Event Horizons and Warped Spacetime",
    slug: "black-holes",
    categoryId: "cat-black-holes",
    categoryName: "Black Holes",
    excerpt: "Regions of spacetime where gravitational curvature becomes so extreme that not even electromagnetic radiation can escape.",
    content: `## The Anatomy of an Infinite Void

A black hole represents the ultimate triumph of gravity over all fundamental forces in physics. Predicted by Albert Einstein's General Theory of Relativity in 1915 and first solved as a mathematical solution by Karl Schwarzschild in 1916, a black hole occurs when mass is compressed below its **Schwarzschild radius** ($r_s = 2GM/c^2$).

At this boundary—the **Event Horizon**—the escape velocity of the gravitational field equals the speed of light ($c \\approx 299,792\\text{ km/s}$). Beyond this threshold, all possible world-lines of matter and energy point inexorably toward the central singularity.

### Key Anatomical Components

1. **The Singularity:** The point at the exact center where matter is crushed to infinitesimal volume and infinite mathematical density, causing classical general relativity to break down.
2. **The Event Horizon:** The uncrossable causal boundary from which no information can return to the observable universe.
3. **The Accretion Disk:** A swirling disc of superheated gas and plasma orbiting at relativistic velocities, radiating intensely in X-rays.
4. **The Photon Sphere:** A region outside the horizon where gravity is so strong that photons are forced into circular orbits.
5. **Relativistic Jets:** Collimated streams of matter propelled along magnetic field axes at near-light speeds.

### Hawking Radiation and Information Paradox

In 1974, theoretical physicist Stephen Hawking demonstrated that quantum field fluctuations near the event horizon result in the emission of thermal radiation. Virtual particle-antiparticle pairs constantly spontaneously generate from the quantum vacuum; when one member falls across the horizon while the other escapes, the black hole loses mass-energy. Over unfathomable timescales (approximately $10^{67}$ years for a stellar-mass black hole), black holes will eventually evaporate entirely.

This leads to the famed **Black Hole Information Paradox**: if quantum mechanics dictates that information cannot be destroyed (unitarity), where does the quantum information of matter consumed by the black hole go once the singularity evaporates? Modern holographic principle research suggests information may be encoded on the two-dimensional surface area of the horizon itself.`,
    coverImage: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1600&q=85",
    videoUrl: "https://www.youtube-nocookie.com/embed/e-P5IFTqB98",
    authorName: "Albin Thomas",
    readingTime: "7 min read",
    keyFacts: [
      { label: "Schwarzschild Radius (Sun)", value: "2.95", unit: "km", description: "If compressed into a black hole" },
      { label: "Sagittarius A* Mass", value: "4.15 × 10⁶", unit: "Solar Masses", description: "Supermassive black hole at Milky Way core" },
      { label: "Hawking Evaporation Rate", value: "~10⁶⁷", unit: "years", description: "Lifespan of 1-solar-mass black hole" },
      { label: "First Direct Image", value: "M87*", unit: "EHT 2019", description: "Resolved by Event Horizon Telescope array" }
    ],
    referencesList: [
      { title: "On Gravitational Collapse and Spacetime Singularities", authors: "Roger Penrose", journal: "Physical Review Letters", year: 1965, doiOrUrl: "https://doi.org/10.1103/PhysRevLett.14.57" },
      { title: "Black hole explosions?", authors: "Stephen W. Hawking", journal: "Nature", year: 1974, doiOrUrl: "https://doi.org/10.1038/248030a0" },
      { title: "First M87 Event Horizon Telescope Results. I. The Shadow of the Supermassive Black Hole", authors: "EHT Collaboration", journal: "The Astrophysical Journal Letters", year: 2019, doiOrUrl: "https://doi.org/10.3847/2041-8213/ab0ec7" }
    ],
    status: "published",
    featured: true,
    viewsCount: 28450,
    seoTitle: "Black Holes: Singularities and Event Horizons | The Cosmic Inquiry",
    seoDescription: "Explore the physics of black holes, event horizons, Hawking radiation, and spacetime curvature with scientific rigor on The Cosmic Inquiry.",
    publishedAt: "2026-10-15T08:00:00Z"
  },
  {
    id: "topic-the-big-bang",
    title: "The Big Bang: The Origin and Inflationary Genesis of Spacetime",
    slug: "the-big-bang",
    categoryId: "cat-big-bang",
    categoryName: "The Big Bang",
    excerpt: "The prevailing cosmological model for the universe from the earliest known periods through its subsequent large-scale evolution.",
    content: `## The Birth of Everything

Approximately 13.787 billion years ago, all space, time, matter, and energy in our observable cosmos erupted from an unimaginably hot, dense state in an event termed the **Big Bang**.

Crucially, the Big Bang was not an explosion of matter into preexisting empty space; rather, it was an expansion of spacetime itself.

### The Cosmic Chronology

1. **The Planck Epoch (0 to $10^{-43}$ seconds):** The fundamental forces of nature (gravity, strong nuclear, weak nuclear, electromagnetism) were unified into a single quantum gravitational field.
2. **Cosmic Inflation ($10^{-36}$ to $10^{-32}$ seconds):** Spacetime underwent an exponential superluminal expansion, smoothing out spatial curvature and seeding quantum perturbations that grew into galaxies.
3. **Electroweak & Quark Epochs ($10^{-12}$ seconds):** Quarks, leptons, and photons existed in a superheated quark-gluon plasma.
4. **Baryogenesis & Nucleosynthesis (1 second to 20 minutes):** Protons and neutrons formed, fusing the primordial light nuclei: 75% Hydrogen-1, 25% Helium-4, and trace Lithium-7.
5. **Recombination & The Cosmic Microwave Background (380,000 years):** Electrons bound with nuclei to form neutral atoms, allowing photons to decouple and travel freely across the universe.

### The Decisive Observational Proofs

- **The Cosmic Microwave Background (CMB):** Discovered by Arno Penzias and Robert Wilson in 1965, this nearly uniform 2.7255 Kelvin thermal relic radiation matches blackbody radiation to one part in 100,000.
- **Hubble's Law ($v = H_0 d$):** Galaxies are receding from us with velocities proportional to their distance, proving the metric expansion of spacetime.
- **Primordial Elemental Abundances:** Spectroscopic analysis of ancient gas clouds matches the precise 3:1 Hydrogen-to-Helium ratio predicted by Big Bang nucleosynthesis models.`,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85",
    videoUrl: "https://www.youtube-nocookie.com/embed/HnP_4_2cK4s",
    authorName: "Albin Thomas",
    readingTime: "8 min read",
    keyFacts: [
      { label: "Age of Universe", value: "13.787 ± 0.020", unit: "Gyr", description: "Calculated via Planck Satellite CMB measurements" },
      { label: "CMB Temperature", value: "2.7255", unit: "Kelvin", description: "Current thermal remnant of early universe" },
      { label: "Hubble Constant (H₀)", value: "67.4 - 73.0", unit: "km/s/Mpc", description: "Subject of ongoing Hubble Tension" },
      { label: "Primordial Hydrogen", value: "~75", unit: "% mass", description: "Formed in first 20 minutes of nucleosynthesis" }
    ],
    referencesList: [
      { title: "A Measurement of Excess Antenna Temperature at 4080 Mc/s", authors: "Arno A. Penzias, Robert W. Wilson", journal: "Astrophysical Journal", year: 1965, doiOrUrl: "https://doi.org/10.1086/148307" },
      { title: "Inflationary universe: A possible solution to the horizon and flatness problems", authors: "Alan H. Guth", journal: "Physical Review D", year: 1981, doiOrUrl: "https://doi.org/10.1103/PhysRevD.23.347" },
      { title: "Planck 2018 results. VI. Cosmological parameters", authors: "Planck Collaboration", journal: "Astronomy & Astrophysics", year: 2020, doiOrUrl: "https://doi.org/10.1051/0004-6361/201833910" }
    ],
    status: "published",
    featured: true,
    viewsCount: 31200,
    seoTitle: "The Big Bang: Inflation and Cosmic Genesis | The Cosmic Inquiry",
    seoDescription: "Examine the scientific proof of the Big Bang, cosmic microwave background, inflation, and the origin of matter.",
    publishedAt: "2026-10-18T10:30:00Z"
  },
  {
    id: "topic-neutron-stars",
    title: "Neutron Stars & Pulsars: Nature's Most Extreme Atomic Laboratories",
    slug: "neutron-stars",
    categoryId: "cat-stars-evolution",
    categoryName: "Stars & Stellar Evolution",
    excerpt: "City-sized stellar remnants with core densities surpassing atomic nuclei, spinning hundreds of times per second.",
    content: `## Beyond the Edge of Atomic Structure

When a massive star between 8 and 25 solar masses exhausts its nuclear fuel, its iron core collapses under immense gravitational force in a Type II supernova. The electron degeneracy pressure is crushed, forcing electrons and protons to merge into neutrons via electron capture ($p + e^- \\to n + \\nu_e$).

The result is a **Neutron Star**: an object packing approximately 1.4 to 2.1 solar masses into a sphere merely 20 kilometers in diameter.

### Unprecedented Physical Properties

- **Astronomical Density:** A single teaspoon of neutron star material would have a mass exceeding 1 billion metric tons on Earth.
- **Relativistic Surface Gravity:** The surface gravity is approximately $2 \\times 10^{11}$ times that of Earth. Escape velocity reaches up to 50% of the speed of light.
- **Magnetic Extremes (Magnetars):** Some neutron stars possess magnetic field strengths up to $10^{15}$ Gauss (100 billion Tesla), strong enough to dissolve atomic electron orbitals into thin needles from thousands of kilometers away.
- **Pulsars:** Rapidly rotating neutron stars that emit lighthouse-like beams of electromagnetic radiation from their magnetic poles. The fastest known millisecond pulsar, PSR J1748-2446ad, spins at 716 rotations per second—its equator travelling at 24% the speed of light.

### Kilonovae and Heavy Element Synthesis

In 2017, the gravitational wave detector LIGO/Virgo and over 70 telescopes observed the collision of two neutron stars (GW170817). This event confirmed that binary neutron star mergers are the primary cosmic forge of rapid neutron capture (r-process) nucleosynthesis, creating vast quantities of gold, platinum, and uranium scattered across galaxies.`,
    coverImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=85",
    videoUrl: "https://www.youtube-nocookie.com/embed/udFxKZRyH30",
    authorName: "Albin Thomas",
    readingTime: "6 min read",
    keyFacts: [
      { label: "Diameter", value: "18 - 24", unit: "km", description: "Roughly the width of Manhattan or London" },
      { label: "Core Density", value: "3.7 × 10¹⁴", unit: "g/cm³", description: "Higher than the density of an atomic nucleus" },
      { label: "Fastest Spin Rate", value: "716", unit: "rotations/sec", description: "PSR J1748-2446ad equatorial speed ~ 70,000 km/s" },
      { label: "Tolman-Oppenheimer-Volkoff Limit", value: "2.17", unit: "M☉", description: "Maximum mass before collapsing into a black hole" }
    ],
    referencesList: [
      { title: "On Massive Neutron Cores", authors: "J. R. Oppenheimer, G. M. Volkoff", journal: "Physical Review", year: 1939, doiOrUrl: "https://doi.org/10.1103/PhysRev.55.374" },
      { title: "Observation of Gravitational Waves from a Binary Neutron Star Inspiral", authors: "LIGO Scientific Collaboration and Virgo Collaboration", journal: "Physical Review Letters", year: 2017, doiOrUrl: "https://doi.org/10.1103/PhysRevLett.119.161101" }
    ],
    status: "published",
    featured: false,
    viewsCount: 19800,
    seoTitle: "Neutron Stars and Pulsars: Physics of Extreme Matter | The Cosmic Inquiry",
    seoDescription: "Discover how neutron stars, magnetars, and pulsars behave at the limits of nuclear physics and general relativity.",
    publishedAt: "2026-10-22T14:15:00Z"
  },
  {
    id: "topic-dark-matter",
    title: "Dark Matter & Dark Energy: The 95% Invisible Cosmos",
    slug: "dark-matter",
    categoryId: "cat-dark-universe",
    categoryName: "Dark Matter & Dark Energy",
    excerpt: "Everything we can see—stars, planets, gas clouds, and living beings—constitutes barely 5% of the total cosmic mass-energy budget.",
    content: `## The Missing Universe

Modern cosmology reveals a humbling reality: baryonic matter—the protons, neutrons, and electrons that make up every star, planet, galaxy, and human being—constitutes a mere 4.9% of the universe's total mass-energy density.

The remaining 95.1% consists of two enigmatic cosmic phenomena:
- **Dark Matter (~26.8%):** Non-luminous matter that interacts gravitationally but has zero or negligible interaction with electromagnetic radiation.
- **Dark Energy (~68.3%):** A pervasive, negative-pressure energy density permeating all of space, driving the accelerating expansion of the cosmos.

### Evidence for Dark Matter

1. **Galactic Rotation Curves:** In the 1970s, astronomer Vera Rubin observed that stars at the outer fringes of spiral galaxies orbit at identical velocities to stars near the core, contradicting Keplerian orbital mechanics. Massive unseen halos of matter must envelop galaxies.
2. **Gravitational Lensing:** When light from distant galaxies passes through galaxy clusters, it bends significantly more than predicted by the visible luminous mass alone.
3. **The Bullet Cluster (1E 0657-56):** During a collision of two galaxy clusters, the normal gas collided and slowed down via electromagnetic friction, while the dark matter (mapped via gravitational lensing) passed straight through without collision.

### The Mystery of Dark Energy

In 1998, two independent teams studying Type Ia supernovae (the High-z Supernova Search Team and the Supernova Cosmology Project) discovered that distant supernovae were dimmer than expected, proving that cosmic expansion is accelerating rather than slowing down under gravity.

Einstein originally introduced a **Cosmological Constant ($\\Lambda$)** into his field equations in 1917 to maintain a static universe; today, $\\Lambda$ represents the vacuum energy density of spacetime, matching observation with startling accuracy, though quantum field theory overestimates its value by 120 orders of magnitude—the worst theoretical prediction in physics.`,
    coverImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=85",
    videoUrl: "https://www.youtube-nocookie.com/embed/9wZz7c2G-2A",
    authorName: "Albin Thomas",
    readingTime: "7 min read",
    keyFacts: [
      { label: "Baryonic Matter", value: "4.9", unit: "%", description: "All visible stars, planets, and gas in the cosmos" },
      { label: "Dark Matter Content", value: "26.8", unit: "%", description: "Gravitationally bound, non-luminous mass" },
      { label: "Dark Energy Content", value: "68.3", unit: "%", description: "Drives accelerating cosmic metric expansion" },
      { label: "Cosmological Constant Discrepancy", value: "10¹²⁰", unit: "Orders of Magnitude", description: "The vacuum catastrophe between QFT and GR" }
    ],
    referencesList: [
      { title: "Rotation of the Andromeda Nebula from a Spectroscopic Survey of Emission Regions", authors: "Vera C. Rubin, W. Kent Ford Jr.", journal: "The Astrophysical Journal", year: 1970, doiOrUrl: "https://doi.org/10.1086/150317" },
      { title: "Observational Evidence from Supernovae for an Accelerating Universe", authors: "Adam G. Riess et al.", journal: "The Astronomical Journal", year: 1998, doiOrUrl: "https://doi.org/10.1086/300499" }
    ],
    status: "published",
    featured: true,
    viewsCount: 22150,
    seoTitle: "Dark Matter & Dark Energy Explained | The Cosmic Inquiry",
    seoDescription: "Examine galactic rotation curves, gravitational lensing, the cosmological constant, and the 95% unseen universe.",
    publishedAt: "2026-10-25T11:00:00Z"
  },
  {
    id: "topic-the-milky-way",
    title: "The Milky Way: Architecture, Galactic Dynamics and Future Collision",
    slug: "the-milky-way",
    categoryId: "cat-galaxies-nebulae",
    categoryName: "Galaxies & Nebulae",
    excerpt: "Our home galactic island: a barred spiral galaxy spanning 100,000 light-years containing over 100 billion stars.",
    content: `## Our Celestial Island in the Cosmos

The Milky Way is a majestic barred spiral galaxy belonging to the Local Group, containing between 100 and 400 billion stars and at least as many planetary systems.

Our Sun sits approximately 26,670 light-years from the galactic nucleus in a quiet spiral structure known as the **Orion-Cygnus Arm**.

### Structural Architecture

1. **The Central Bulge & Bar:** A dense cluster of ancient population II stars traversed by a central stellar bar measuring approximately 27,000 light-years in length.
2. **Sagittarius A*:** The central supermassive black hole with a mass of 4.15 million suns, anchoring galactic orbits.
3. **The Galactic Disk:** A thin disk of young stars, open clusters, and star-forming nebulae spanning over 100,000 light-years across and roughly 1,000 light-years thick.
4. **The Stellar Halo:** A vast spherical cloud containing ancient globular clusters and dwarf satellite galaxies (such as the Magellanic Clouds).

### The Great Andromeda Collision

Travelling toward each other at approximately 110 kilometers per second, the Milky Way and the neighboring Andromeda Galaxy (M31) will initiate a monumental cosmic collision in roughly 4.5 billion years.

Because the interstellar distances between stars are enormous, virtually no individual stars will physically collide. Instead, gravitational tidal forces will distort both galaxies, triggering immense bursts of starburst formation before coalescing into a giant elliptical galaxy dubbed **Milkomeda**.`,
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=85",
    videoUrl: "https://www.youtube-nocookie.com/embed/4_889o3q20c",
    authorName: "Albin Thomas",
    readingTime: "6 min read",
    keyFacts: [
      { label: "Diameter", value: "100,000 - 150,000", unit: "light-years", description: "Full extent of luminous disk" },
      { label: "Total Stellar Count", value: "100 - 400", unit: "billion stars", description: "Host to hundreds of billions of exoplanets" },
      { label: "Solar Orbit Velocity", value: "230", unit: "km/s", description: "One Galactic Year ~ 230 million Earth years" },
      { label: "Andromeda Collision ETA", value: "~4.5", unit: "billion years", description: "Mutual approach at 110 km/s" }
    ],
    referencesList: [
      { title: "Gaia Data Release 3: Summary of the content and survey properties", authors: "Gaia Collaboration", journal: "Astronomy & Astrophysics", year: 2023, doiOrUrl: "https://doi.org/10.1051/0004-6361/202243940" }
    ],
    status: "published",
    featured: false,
    viewsCount: 16400,
    seoTitle: "The Milky Way Galaxy: Structure, Orbit & Destiny | The Cosmic Inquiry",
    seoDescription: "Explore the anatomy of the Milky Way, our solar system's galactic orbit, and the future collision with Andromeda.",
    publishedAt: "2026-10-28T09:00:00Z"
  },
  {
    id: "topic-gravitational-waves",
    title: "Gravitational Waves: Listening to Relativistic Spacetime Ripples",
    slug: "gravitational-waves",
    categoryId: "cat-spacetime",
    categoryName: "Space-Time & Relativity",
    excerpt: "How laser interferometers measure ripples in the fabric of space-time smaller than a fraction of a proton's diameter.",
    content: `## A New Sensory Window on the Cosmos

For millennia, astronomy was entirely dependent on electromagnetic waves: visible light, radio, infrared, ultraviolet, X-rays, and gamma rays.

On September 14, 2015, humanity unlocked a completely independent sense: gravitational waves. The Advanced LIGO detectors simultaneously sensed a perturbation generated 1.3 billion light-years away by the merger of two black holes (GW150914).

### The Nature of Spacetime Distortion

Gravitational waves are oscillations in the curvature of spacetime propagated at the speed of light, generated by accelerating quadupole mass distributions.

As a gravitational wave passes through space:
- It stretches space in one transverse direction while compressing it in the orthogonal direction (the quadrupole polarization modes: $h_+$ and $h_\\times$).
- The strain ($h = \\Delta L / L$) produced on Earth is microscopic: approximately $10^{-21}$.
- In LIGO's 4-kilometer laser arms, this corresponds to a distance change smaller than one ten-thousandth the diameter of a single proton ($10^{-19}$ meters).

### The Multi-Messenger Astronomy Revolution

Combining gravitational wave detections with traditional telescope observations has launched the era of **Multi-Messenger Astronomy**.

When two neutron stars merged in GW170817, gravitational waves arrived 1.7 seconds before gamma-ray telescopes detected a burst, confirming that gravitational radiation travels precisely at the speed of light to within one part in $10^{15}$, severely constraining alternative gravity theories.`,
    coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=85",
    videoUrl: "https://www.youtube-nocookie.com/embed/4GbWfNHtHRg",
    authorName: "Albin Thomas",
    readingTime: "6 min read",
    keyFacts: [
      { label: "Detectable Strain (h)", value: "10⁻²¹", unit: "dimensionless", description: "LIGO's measurement sensitivity" },
      { label: "Laser Arm Length", value: "4.0", unit: "km", description: "LIGO Hanford & Livingston interferometers" },
      { label: "Speed of Propagation", value: "c", unit: "exact", description: "Speed of light in vacuum verified by GW170817" },
      { label: "First Direct Event", value: "GW150914", unit: "Sep 14, 2015", description: "36 and 29 solar mass black hole coalescence" }
    ],
    referencesList: [
      { title: "Observation of Gravitational Waves from a Binary Black Hole Merger", authors: "B. P. Abbott et al. (LIGO Scientific Collaboration and Virgo Collaboration)", journal: "Physical Review Letters", year: 2016, doiOrUrl: "https://doi.org/10.1103/PhysRevLett.116.061102" }
    ],
    status: "published",
    featured: false,
    viewsCount: 17800,
    seoTitle: "Gravitational Waves: Detecting Spacetime Curvature | The Cosmic Inquiry",
    seoDescription: "Learn how gravitational wave interferometers measure black hole collisions and probe Einstein's general relativity.",
    publishedAt: "2026-11-01T15:30:00Z"
  },
  {
    id: "topic-james-webb-discoveries",
    title: "James Webb Space Telescope: Unveiling the Primordial Dawn",
    slug: "james-webb-discoveries",
    categoryId: "cat-galaxies-nebulae",
    categoryName: "Galaxies & Nebulae",
    excerpt: "Infrared astronomy piercing cosmic dust to inspect the earliest galaxies formed 300 million years after the Big Bang.",
    content: `## The Infrared Golden Eye

Positioned 1.5 million kilometers from Earth at the Second Sun-Earth Lagrange Point (L2), the **James Webb Space Telescope (JWST)** represents the apex of modern astronomical engineering.

Equipped with a 6.5-meter gold-coated beryllium primary mirror and operating at cryogenic temperatures below 50 Kelvin (-223°C), JWST observes in the near- and mid-infrared spectrum (0.6 to 28 microns).

### Shattering Early Universe Paradigms

JWST has revolutionized our understanding of the cosmic dawn:

1. **Galaxies Too Big, Too Soon:** Instruments NIRCam and NIRSpec have identified ultra-distant galaxies such as JADES-GS-z14-0 (observed at redshift $z = 14.32$, merely 290 million years post-Big Bang). These early galaxies are significantly brighter, more massive, and chemically enriched with carbon and oxygen than classical formation models predicted.
2. **Exoplanet Atmospheric Profiles:** JWST detected carbon dioxide, water vapor, sulfur dioxide photochemistry, and methane in atmospheres of worlds like WASP-39b and the TRAPPIST-1 system.
3. **Stellar Birthplaces Unveiled:** Infrared wavelengths pass cleanly through interstellar dust, resolving individual protostars, proto-planetary disks, and stellar outflow jets in the Carina and Pillars of Creation nebulae.`,
    coverImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=85",
    videoUrl: "https://www.youtube-nocookie.com/embed/1C_nuqpHND8",
    authorName: "Albin Thomas",
    readingTime: "7 min read",
    keyFacts: [
      { label: "Primary Mirror Diameter", value: "6.5", unit: "meters", description: "18 gold-plated hexagonal beryllium segments" },
      { label: "Orbital Location", value: "Sun-Earth L2", unit: "1.5M km", description: "Lagrange Point 2 outside Moon's orbit" },
      { label: "Earliest Galaxy Verified", value: "z = 14.32", unit: "JADES-GS-z14-0", description: "290 million years after Big Bang" },
      { label: "Operating Temperature", value: "< 50", unit: "Kelvin", description: "Protected by five-layer Kapton sunshield" }
    ],
    referencesList: [
      { title: "A shining cosmic dawn: properties of the z=14.32 galaxy JADES-GS-z14-0", authors: "Carniani et al.", journal: "Nature", year: 2024, doiOrUrl: "https://doi.org/10.1038/s41586-024-07864-0" }
    ],
    status: "published",
    featured: true,
    viewsCount: 26500,
    seoTitle: "James Webb Space Telescope Discoveries | The Cosmic Inquiry",
    seoDescription: "Examine the latest discoveries from JWST: primordial galaxies, exoplanet atmospheres, and deep infrared cosmology.",
    publishedAt: "2026-11-05T12:00:00Z"
  },
  {
    id: "topic-exoplanets-habitable-zones",
    title: "Exoplanets & Habitable Zones: The Search for Alien Biospheres",
    slug: "exoplanets-habitable-zones",
    categoryId: "cat-exoplanets",
    categoryName: "Exoplanets & Habitable Worlds",
    excerpt: "Analyzing the thousands of alien worlds discovered beyond our solar system and how we detect life through atmospheric signatures.",
    content: `## Beyond Our Solitary Shore

Until 1995, humanity knew of only one planetary system: our own. The discovery of 51 Pegasi b by Michel Mayor and Didier Queloz (awarded the 2019 Nobel Prize in Physics) proved that planets orbiting main-sequence stars are ubiquitous throughout our galaxy.

Today, over 5,600 confirmed exoplanets have been cataloged by Kepler, TESS, and ground observatories.

### Detection Methodologies

- **Transit Photometry:** Measuring the microscopic dip in a star's brightness as a planet passes in front of its disk. Kepler discovered over 2,600 worlds using this technique.
- **Radial Velocity (Doppler Spectroscopy):** Measuring periodic red and blue shifts in stellar absorption spectra caused by the gravitational tug of an orbiting planet.
- **Direct Imaging:** Using coronagraphs or starshades to block out blinding stellar glare and directly photograph young, hot, Jupiter-sized exoplanets.

### The Habitable Zone (Goldilocks Zone)

The habitable zone is defined as the orbital distance from a host star where liquid water can remain stable on a rocky planet's surface under appropriate atmospheric pressure.

Notable candidates include:
- **Proxima Centauri b:** Orbiting our closest stellar neighbor at 4.24 light-years, located squarely in the habitable zone.
- **TRAPPIST-1 System:** Seven Earth-sized rocky planets orbiting an ultra-cool red dwarf star 40 light-years away, with three planets (e, f, g) situated in the habitable zone.
- **Atmospheric Biosignatures:** The simultaneous detection of disequilibrium gases—such as oxygen/ozone alongside methane—is considered the primary smoking gun for extraterrestrial biological metabolism.`,
    coverImage: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=85",
    videoUrl: "https://www.youtube-nocookie.com/embed/7TYkyh_Wp2A",
    authorName: "Albin Thomas",
    readingTime: "7 min read",
    keyFacts: [
      { label: "Confirmed Exoplanets", value: "> 5,600", unit: "worlds", description: "Cataloged in NASA Exoplanet Archive" },
      { label: "Nearest Habitable Candidate", value: "4.24", unit: "light-years", description: "Proxima Centauri b" },
      { label: "Earth-Sized Planets in TRAPPIST-1", value: "7", unit: "terrestrial worlds", description: "3 in conservative habitable zone" },
      { label: "Key Biosignature Pair", value: "O₂ + CH₄", unit: "spectroscopy", description: "Photochemical disequilibrium signature" }
    ],
    referencesList: [
      { title: "A Jupiter-mass companion to a solar-type star", authors: "Michel Mayor, Didier Queloz", journal: "Nature", year: 1995, doiOrUrl: "https://doi.org/10.1038/378355a0" },
      { title: "Seven temperate terrestrial planets around the nearby ultracool dwarf star TRAPPIST-1", authors: "Michaël Gillon et al.", journal: "Nature", year: 2017, doiOrUrl: "https://doi.org/10.1038/nature21360" }
    ],
    status: "published",
    featured: false,
    viewsCount: 20100,
    seoTitle: "Exoplanets and Habitable Zones | The Cosmic Inquiry",
    seoDescription: "How astronomers find alien planets, characterize atmospheres, and identify candidates for extraterrestrial life.",
    publishedAt: "2026-11-08T16:00:00Z"
  }
];

export const SOLAR_SYSTEM_PLANETS: Planet[] = [
  {
    id: "sun",
    name: "The Sun",
    slug: "sun",
    type: "Star",
    radiusKm: 696340,
    distanceFromSunMillionKm: 0,
    orbitalPeriodDays: 0,
    rotationPeriodHours: 600,
    moonsCount: 8,
    shortDescription: "A G-type main-sequence yellow dwarf star providing 99.86% of the solar system's total mass.",
    detailedDescription: "The Sun is the thermonuclear heart of our solar system. In its core, gravity and pressures exceeding 250 billion atmospheres fuse 600 million tons of hydrogen into helium every second, generating radiant energy that sustains all terrestrial life.",
    atmosphereComposition: ["73.46% Hydrogen", "24.85% Helium", "0.77% Oxygen", "0.29% Carbon"],
    surfaceTempCelsius: { min: 5500, max: 15000000, avg: 5500 },
    colorHex: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.9)"
  },
  {
    id: "mercury",
    name: "Mercury",
    slug: "mercury",
    type: "Terrestrial Planet",
    radiusKm: 2439.7,
    distanceFromSunMillionKm: 57.9,
    orbitalPeriodDays: 88,
    rotationPeriodHours: 1407.6,
    moonsCount: 0,
    shortDescription: "The innermost, smallest planet with an iron-dense core and dramatic temperature swings.",
    detailedDescription: "Mercury orbits closer to the Sun than any other planet. Devoid of a substantial atmosphere, its surface experiences wild temperature extremes, swinging from 430°C in daylight to -180°C in the cosmic dark.",
    atmosphereComposition: ["42% Molecular Oxygen", "29% Sodium", "22% Hydrogen", "6% Helium"],
    surfaceTempCelsius: { min: -180, max: 430, avg: 167 },
    colorHex: "#a3a3a3",
    glowColor: "rgba(163, 163, 163, 0.5)"
  },
  {
    id: "venus",
    name: "Venus",
    slug: "venus",
    type: "Terrestrial Planet",
    radiusKm: 6051.8,
    distanceFromSunMillionKm: 108.2,
    orbitalPeriodDays: 224.7,
    rotationPeriodHours: -5832.5,
    moonsCount: 0,
    shortDescription: "Earth's volcanic twin suffocating under a crushing, runaway greenhouse carbon dioxide atmosphere.",
    detailedDescription: "Venus is the hottest planet in the solar system. Its dense atmosphere of carbon dioxide and clouds of sulfuric acid trap solar heat relentlessly, producing surface pressures 92 times that of Earth and temperatures high enough to melt lead.",
    atmosphereComposition: ["96.5% Carbon Dioxide", "3.5% Nitrogen", "0.015% Sulfur Dioxide"],
    surfaceTempCelsius: { min: 462, max: 462, avg: 462 },
    colorHex: "#eab308",
    glowColor: "rgba(234, 179, 8, 0.6)"
  },
  {
    id: "earth",
    name: "Earth",
    slug: "earth",
    type: "Terrestrial Planet",
    radiusKm: 6371.0,
    distanceFromSunMillionKm: 149.6,
    orbitalPeriodDays: 365.25,
    rotationPeriodHours: 23.93,
    moonsCount: 1,
    shortDescription: "Our vibrant blue oasis: the only known world harboring water, plate tectonics, and conscious life.",
    detailedDescription: "Earth is our home planet: an exquisitely balanced geological and ecological system protected by a dynamic magnetosphere, liquid oceans, an oxygen-nitrogen atmosphere, and a single stabilizing natural satellite: the Moon.",
    atmosphereComposition: ["78.08% Nitrogen", "20.95% Oxygen", "0.93% Argon", "0.04% Carbon Dioxide"],
    surfaceTempCelsius: { min: -89.2, max: 56.7, avg: 15 },
    colorHex: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.7)"
  },
  {
    id: "mars",
    name: "Mars",
    slug: "mars",
    type: "Terrestrial Planet",
    radiusKm: 3389.5,
    distanceFromSunMillionKm: 227.9,
    orbitalPeriodDays: 687,
    rotationPeriodHours: 24.62,
    moonsCount: 2,
    shortDescription: "The Red Planet: ancient river deltas, the solar system's tallest volcano, and subsurface ice reserves.",
    detailedDescription: "Mars is an oxidized iron desert world with towering geological wonders: Olympus Mons, standing 22 km high, and Valles Marineris, a canyon system spanning thousands of kilometers. Evidence gathered by rovers confirms it once supported liquid lakes and river systems.",
    atmosphereComposition: ["95.3% Carbon Dioxide", "2.6% Nitrogen", "1.9% Argon", "0.16% Oxygen"],
    surfaceTempCelsius: { min: -140, max: 20, avg: -63 },
    colorHex: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.6)"
  },
  {
    id: "jupiter",
    name: "Jupiter",
    slug: "jupiter",
    type: "Gas Giant",
    radiusKm: 69911,
    distanceFromSunMillionKm: 778.6,
    orbitalPeriodDays: 4333,
    rotationPeriodHours: 9.93,
    moonsCount: 95,
    shortDescription: "The king of planets: more massive than all other planets combined, with an ancient centuries-old Great Red Spot storm.",
    detailedDescription: "Jupiter dominates the orbital architecture of the solar system. Beneath its colorful ammonia-cloud bands lies a swirling mantle of metallic hydrogen generating a titanic magnetosphere millions of kilometers wide.",
    atmosphereComposition: ["89.8% Hydrogen", "10.2% Helium", "Trace Methane & Ammonia"],
    surfaceTempCelsius: { min: -145, max: -110, avg: -110 },
    colorHex: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.6)"
  },
  {
    id: "saturn",
    name: "Saturn",
    slug: "saturn",
    type: "Gas Giant",
    radiusKm: 58232,
    distanceFromSunMillionKm: 1433.5,
    orbitalPeriodDays: 10759,
    rotationPeriodHours: 10.7,
    moonsCount: 146,
    shortDescription: "The jewel of the solar system, encircled by thousands of shimmering rings of pure water ice.",
    detailedDescription: "Saturn is famed for its majestic planetary rings spanning up to 282,000 kilometers across yet barely 10 meters thick on average. It has 146 recognized moons, including hydrocarbon-rich Titan and cryovolcanic Enceladus.",
    atmosphereComposition: ["96.3% Hydrogen", "3.25% Helium", "0.45% Methane"],
    surfaceTempCelsius: { min: -178, max: -139, avg: -140 },
    colorHex: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.6)",
    hasRings: true
  },
  {
    id: "uranus",
    name: "Uranus",
    slug: "uranus",
    type: "Ice Giant",
    radiusKm: 25362,
    distanceFromSunMillionKm: 2872.5,
    orbitalPeriodDays: 30687,
    rotationPeriodHours: -17.24,
    moonsCount: 28,
    shortDescription: "An icy cyan giant tilted completely on its side, rolling through its 84-year orbit.",
    detailedDescription: "Uranus features an extreme 97.77-degree axial tilt, likely caused by a cataclysmic protoplanet collision during the early solar system. Its icy mantle of water, ammonia, and methane ices gives it a tranquil cyan-aquamarine hue.",
    atmosphereComposition: ["82.5% Hydrogen", "15.2% Helium", "2.3% Methane"],
    surfaceTempCelsius: { min: -224, max: -197, avg: -195 },
    colorHex: "#22d3ee",
    glowColor: "rgba(34, 211, 238, 0.6)"
  },
  {
    id: "neptune",
    name: "Neptune",
    slug: "neptune",
    type: "Ice Giant",
    radiusKm: 24622,
    distanceFromSunMillionKm: 4495.1,
    orbitalPeriodDays: 60190,
    rotationPeriodHours: 16.11,
    moonsCount: 16,
    shortDescription: "The outermost giant world: home to supersonic winds exceeding 2,100 km/h in deep cobalt clouds.",
    detailedDescription: "Neptune is a dark, cold, supersonic world. Positioned 30 times farther from the Sun than Earth, it takes over 164 Earth years to complete one orbit. Its dynamic atmosphere hosts Great Dark Spots and the retrogradely orbiting moon Triton.",
    atmosphereComposition: ["80.0% Hydrogen", "19.0% Helium", "1.5% Methane"],
    surfaceTempCelsius: { min: -218, max: -200, avg: -201 },
    colorHex: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.7)"
  }
];

export const COSMIC_NEWS: NewsItem[] = [
  {
    id: "news-jwst-primordial-galaxy",
    title: "James Webb Discovers Brightest Primordial Galaxy 290 Million Years Post-Big Bang",
    slug: "jwst-discovers-brightest-primordial-galaxy",
    excerpt: "Spectroscopic confirmation of JADES-GS-z14-0 challenges standard early galaxy assembly models, revealing rapid stellar formation.",
    content: `Astronomers utilizing the NIRSpec instrument aboard the James Webb Space Telescope have officially confirmed the distance of JADES-GS-z14-0 at redshift z = 14.32.

This places the galaxy at barely 290 million years after the Big Bang, making it the most distant spectroscopically verified galaxy ever observed.

Astonishingly, JADES-GS-z14-0 spans over 1,600 light-years in diameter and has a mass estimated at several hundred million solar masses—indicating that star formation in the primordial cosmic dawn occurred far faster and more vigorously than previously simulated.`,
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80",
    sourceName: "NASA / ESA / STScI",
    sourceUrl: "https://webbtelescope.org",
    category: "Breaking Discoveries",
    featured: true,
    isBreaking: true,
    publishedAt: "2026-11-18T14:30:00Z"
  },
  {
    id: "news-europa-clipper-cruise",
    title: "Europa Clipper Successfully Deploys Solar Arrays on Trajectory to Jupiter",
    slug: "europa-clipper-trajectory-to-jupiter",
    excerpt: "NASA's flagship mission begins its 1.8-billion-mile voyage to investigate whether Jupiter's icy moon harbors conditions suitable for life.",
    content: `NASA's Europa Clipper spacecraft has successfully unfurled its massive 30-meter solar arrays and completed initial communications checkouts with the Deep Space Network.

The spacecraft is now cruising toward a Mars gravity assist before sling-shotting toward the Jovian system, where it will perform nearly 50 close flybys of Europa to map its subsurface ocean depth, ice shell thickness, and surface chemical composition.`,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    sourceName: "NASA Jet Propulsion Laboratory",
    sourceUrl: "https://www.jpl.nasa.gov",
    category: "Space Missions",
    featured: false,
    isBreaking: false,
    publishedAt: "2026-11-15T18:00:00Z"
  },
  {
    id: "news-euclid-dark-universe-map",
    title: "ESA's Euclid Mission Releases First Cosmic Slice of the 3D Dark Universe Map",
    slug: "euclid-releases-first-dark-universe-3d-map",
    excerpt: "A breathtaking mosaic containing 14 million galaxies provides unprecedented precision on cosmic expansion and dark matter distribution.",
    content: `The European Space Agency's Euclid space observatory has unveiled the first catalog of its six-year cosmic mapping survey.

Covering a single strip of sky with 208 gigapixels of photographic detail, Euclid captures billions of light-years of cosmic structure. By measuring the subtle gravitational lensing distortions across millions of galaxies, astrophysicists are compiling the most precise map yet of dark matter filament distribution across cosmic time.`,
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    sourceName: "ESA / Euclid Consortium",
    sourceUrl: "https://www.esa.int",
    category: "Astrophysics",
    featured: false,
    isBreaking: false,
    publishedAt: "2026-11-12T09:15:00Z"
  },
  {
    id: "news-eht-sgra-magnetic-fields",
    title: "Event Horizon Telescope Resolves Spiral Magnetic Fields Around Milky Way's Supermassive Black Hole",
    slug: "eht-resolves-magnetic-fields-around-sgra",
    excerpt: "Polarized light images of Sagittarius A* reveal tightly organized magnetic field structures remarkably identical to M87*.",
    content: `The Event Horizon Telescope (EHT) collaboration has published new polarized views of Sagittarius A*, the supermassive black hole at the center of the Milky Way.

The images reveal orderly, spiraling magnetic field lines curving around the black hole's shadow. The striking structural similarity to M87* suggests that strong, coherent magnetic fields are a universal characteristic governing accretion flows and relativistic jet launching around all supermassive singularities.`,
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80",
    sourceName: "Event Horizon Telescope Collaboration",
    sourceUrl: "https://eventhorizontelescope.org",
    category: "Breaking Discoveries",
    featured: false,
    isBreaking: false,
    publishedAt: "2026-11-09T11:45:00Z"
  }
];

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    id: "era-planck",
    era: "The Planck Epoch",
    timeRange: "0 to 10⁻⁴³ Seconds",
    title: "Quantum Gravity & Universal Genesis",
    temperatureKelvin: "> 10³² K",
    description: "The earliest period of the cosmos. Spacetime curvature and quantum mechanics were intertwined into a single unified gravitational field before the separation of forces.",
    keyMilestones: [
      "Gravity separates from the grand unified force",
      "Universe diameter is smaller than 10⁻³⁵ meters",
      "Spacetime exists as quantum foam"
    ]
  },
  {
    id: "era-inflation",
    era: "Cosmic Inflation",
    timeRange: "10⁻³⁶ to 10⁻³² Seconds",
    title: "Superluminal Metric Expansion",
    temperatureKelvin: "10²⁷ K",
    description: "Driven by a scalar inflaton field, the universe expands exponentially by a factor of at least 10²⁶ in a fraction of a second, smoothing out spatial geometry.",
    keyMilestones: [
      "Quantum fluctuations are stretched to macroscopic cosmic scales",
      "Horizon and flatness problems are resolved",
      "Reheating creates quarks, leptons, and photons"
    ]
  },
  {
    id: "era-nucleosynthesis",
    era: "Primordial Nucleosynthesis",
    timeRange: "10 Seconds to 20 Minutes",
    title: "The First Atomic Nuclei",
    temperatureKelvin: "10⁹ to 10⁷ K",
    description: "As temperatures drop, protons and neutrons fuse to form the light nuclei of hydrogen, helium-4, and trace lithium.",
    keyMilestones: [
      "Quarks bind into protons and neutrons",
      "75% Hydrogen-1 and 24% Helium-4 ratio established",
      "Free neutrons decay or become locked into Helium nuclei"
    ]
  },
  {
    id: "era-recombination",
    era: "Recombination & Dark Ages",
    timeRange: "380,000 Years",
    title: "Decoupling of Light & The CMB",
    temperatureKelvin: "3,000 K",
    description: "Electrons combine with nuclei into stable neutral hydrogen atoms. The universe becomes transparent, releasing the Cosmic Microwave Background radiation.",
    keyMilestones: [
      "Photons decouple and stream freely across the cosmos",
      "Cosmic Microwave Background is established",
      "Universe enters the 'Dark Ages' before the first stars"
    ]
  },
  {
    id: "era-first-stars",
    era: "Cosmic Dawn (Reionization)",
    timeRange: "100 to 400 Million Years",
    title: "Population III Stars & First Light",
    temperatureKelvin: "60 K",
    description: "Enormous pristine Population III stars ignite in primordial dark matter halos, reionizing the interstellar medium with ultraviolet radiation.",
    keyMilestones: [
      "First massive stars synthesize the first carbon, oxygen, and iron",
      "Ultraviolet light reionizes neutral hydrogen gas",
      "First proto-galaxies assemble under gravitational attraction"
    ]
  },
  {
    id: "era-solar-system",
    era: "Solar System Formation",
    timeRange: "9.2 Billion Years Post-Big Bang (4.6 Gyr Ago)",
    title: "Birth of Sol & Earth",
    temperatureKelvin: "3 K",
    description: "A shockwave from a nearby supernova collapses a giant molecular cloud in the Orion spiral arm, forming our Sun and planetary accretion disk.",
    keyMilestones: [
      "The Sun ignites thermonuclear fusion in its core",
      "Planetesimals coalesce into rocky planets and gas giants",
      "Earth forms in the Goldilocks habitable zone"
    ]
  },
  {
    id: "era-present",
    era: "The Present Epoch",
    timeRange: "13.787 Billion Years Post-Big Bang",
    title: "The Stelliferous Era & Conscious Observers",
    temperatureKelvin: "2.7255 K",
    description: "The modern cosmos: hundreds of billions of galaxies teeming with stars, exoplanets, and human observers seeking to understand the laws of the universe.",
    keyMilestones: [
      "Dark energy accelerates cosmic expansion",
      "Humanity constructs telescopes to peer across 13 billion light-years",
      "The Cosmic Inquiry platform established by Albin Thomas"
    ]
  },
  {
    id: "era-future",
    era: "The Deep Future",
    timeRange: "10¹⁴ to 10¹⁰⁰ Years",
    title: "Degenerate Era to Heat Death",
    temperatureKelvin: "Approaching 0 K",
    description: "Stars consume their hydrogen; red dwarfs fade; black holes slowly evaporate via Hawking radiation until maximum entropy is achieved in thermodynamic equilibrium.",
    keyMilestones: [
      "Stelliferous era ends: last red dwarfs fade (100 trillion years)",
      "Black hole era: only singularities remain (10⁴⁰ to 10¹⁰⁰ years)",
      "Heat Death: universe reaches maximum entropy at absolute zero"
    ]
  }
];

export const GLOSSARY_TERMS: GlossaryItem[] = [
  {
    term: "Accretion Disk",
    category: "Astrophysics",
    pronunciation: "uh-KREE-shun disk",
    definition: "A rotating disk of matter, gas, and plasma formed by gravitational attraction around a massive central body such as a black hole, neutron star, or white dwarf.",
    significance: "Frictional dissipation heats the disk to millions of degrees, releasing tremendous electromagnetic radiation."
  },
  {
    term: "Chandrasekhar Limit",
    category: "Stellar Physics",
    pronunciation: "chan-druh-SAY-kar LIM-it",
    definition: "The maximum mass (approximately 1.44 solar masses) of a stable white dwarf star supported by electron degeneracy pressure.",
    formula: "M_{Ch} \\approx 1.44 M_\\odot",
    significance: "Beyond this mass, electron degeneracy is overwhelmed and the star collapses into a neutron star or black hole."
  },
  {
    term: "Event Horizon",
    category: "General Relativity",
    pronunciation: "ih-VENT huh-RYE-zun",
    definition: "A boundary in spacetime beyond which events cannot affect an outside observer. The surface at which the gravitational escape velocity equals the speed of light.",
    formula: "r_s = \\frac{2GM}{c^2}",
    significance: "Acts as a one-way causal membrane isolating the singularity from the rest of the universe."
  },
  {
    term: "Gravitational Lensing",
    category: "Observational Cosmology",
    pronunciation: "grav-uh-TAY-shun-ul LEN-zing",
    definition: "The bending and magnification of light from a distant source as it passes through the warped spacetime of a massive intervening object, such as a galaxy cluster.",
    significance: "Used as a primary tool to map invisible dark matter distribution and magnify ultra-distant early galaxies."
  },
  {
    term: "Hawking Radiation",
    category: "Quantum Gravity",
    pronunciation: "HAW-king ray-dee-AY-shun",
    definition: "Theoretical blackbody radiation released by a black hole outside its event horizon due to quantum vacuum fluctuations near the boundary.",
    formula: "T_H = \\frac{\\hbar c^3}{8\\pi G M k_B}",
    significance: "Proves that black holes possess temperature and entropy, and will eventually evaporate over cosmic epochs."
  },
  {
    term: "Hubble Constant",
    category: "Cosmology",
    pronunciation: "HUB-ul KON-stunt",
    definition: "The unit of measurement describing the current rate at which the universe is expanding per megaparsec of distance.",
    formula: "v = H_0 \\cdot d",
    significance: "Key parameter determining the age and ultimate geometry of the cosmos."
  },
  {
    term: "Kilonova",
    category: "High-Energy Astrophysics",
    pronunciation: "KIL-uh-noh-vuh",
    definition: "A transient astronomical event that occurs when two neutron stars or a neutron star and a black hole collide and merge.",
    significance: "The principal source of rapid neutron-capture nucleosynthesis, forging elements like gold, platinum, and uranium."
  },
  {
    term: "Redshift (z)",
    category: "Spectroscopy",
    pronunciation: "RED-shift",
    definition: "The displacement of spectral lines toward longer (redder) wavelengths in radiation from distant galaxies due to the metric expansion of spacetime.",
    formula: "z = \\frac{\\lambda_{obs} - \\lambda_{emit}}{\\lambda_{emit}}",
    significance: "Allows astronomers to calculate both distance and lookback time to the earliest epochs of the universe."
  }
];
