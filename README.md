# THE COSMIC INQUIRY

> **"Explore the Infinite. Question Everything. Understand the Universe."**

**The Cosmic Inquiry** is an advanced, cinematic, interactive digital observatory, space museum, and scientific discovery platform. Designed as a long-term, expandable scientific knowledge ecosystem, it seamlessly bridges planetary science, stellar physics, relativistic spacetime, and quantum cosmology into a unified discovery experience.

- **Creator & Lead Architect:** Albin Thomas  
- **Category:** Interactive Astronomy, Astrophysics, Cosmology & Cosmic Discovery  
- **Architecture:** Autonomous, Git-Driven (GitHub & Netlify Native — Zero External Database Required)
- **Frontend Framework:** Astro 5 (Server-Side Rendered & Static Optimized) + React  
- **3D Planetary Engine:** Three.js Interactive WebGL Simulation  
- **Design System:** Tailwind CSS with Cosmic Dark Theme  
- **Hosting & Deployment:** Netlify  

---

## 🌌 Core Features & Capabilities

1. **Interactive 3D Solar System (Three.js):** Real-time planetary engine with Sun, 8 planets + Moon, Saturn rings, orbital pause/play, touch and drag controls, raycast selection, and metrics HUD.
2. **Deep Space Hero & Ambient Resonance:** Web Audio synthesizer generating deep space harmonic drone, particle starfields, and cosmic animations.
3. **12 Curated Cosmic Domains:** Categorized explorations from the Solar System to Relativistic Spacetime and Quantum Cosmology (`/categories/[slug]`).
4. **Permanent Scientific Inquiries (`/explore/[slug]`):** Cleanly formatted scientific articles with physical parameters, inline math, and peer-reviewed citations.
5. **The Cosmic Chronicle (`/chronicle`):** Space mission updates, breaking telescope discoveries, and institutional dispatches.
6. **Universe Chronology (`/timeline`):** 13.8 billion years of spacetime expansion from the Planck Epoch ($10^{-43}$s) to the deep degenerate future.
7. **Scientific Glossary (`/glossary`):** Searchable glossary of astronomical formulas, constants, and terms.
8. **Instant Search (Cmd+K / Ctrl+K):** Instant client-side index across topics, planets, glossary terms, and news dispatches.
9. **Responsive Design:** Fluid layout across mobile phones, tablets, and ultra-wide desktops with dedicated mobile navigation drawer.
10. **Administrative Control Room (`/admin`):** Integrated browser control room to create, edit, draft, and publish topics, dispatches, and categories with local persistence.

---

## 🚀 How to Run Locally

```bash
# 1. Navigate to the project directory
cd J:\sebin\the-cosmic-inquiry

# 2. Start the local development server
npm run dev
```

Open **`http://localhost:4321`** in your browser.

---

## 🌐 Exact Steps to Deploy to GitHub & Netlify

### Step 1: Push to GitHub

1. Create a new repository on your GitHub account (e.g. `the-cosmic-inquiry`).
2. In your terminal, link your remote repository and push:
   ```bash
   git remote add origin https://github.com/<your-github-username>/the-cosmic-inquiry.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Netlify

You can deploy using either the **Netlify Web UI** or the **Netlify CLI**:

#### Option A: Via Netlify Web Dashboard (Recommended)
1. Go to [https://app.netlify.com](https://app.netlify.com) and log in.
2. Click **"Add new site"** &rarr; **"Import an existing project"**.
3. Select **GitHub** and choose your repository `the-cosmic-inquiry`.
4. Netlify will automatically detect `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**.
6. That's it! Your site will be live at `https://<your-site-name>.netlify.app` in under 60 seconds.

#### Option B: Via Netlify CLI
```bash
# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# Login and deploy
netlify login
netlify init
netlify deploy --prod
```

---

## 🛠️ Managing Content (GitHub-Driven)

All scientific topics, planetary properties, and news dispatches are stored directly in version control:
- **Core Scientific Data:** `src/lib/cosmic-data.ts`
- **Topic Formatting:** Cleanly converted via `src/lib/format-content.ts` (no raw `#*` markdown artifacts)
- **Local Browser Edits:** `/admin` allows live drafting with persistence in browser `localStorage`.

---

## 📜 Authorship & Philosophy

- **Creator & Lead Architect:** Albin Thomas  
- **Core Philosophy:** *"Explore the Infinite. Question Everything. Understand the Universe."*
