# Graph Report - Andong-project  (2026-11-22)

## Corpus Check
- 48 files · ~14,939 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .ico 1, .bin 1)

## Summary
- 224 nodes · 313 edges · 27 communities (15 shown, 12 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ceec33bb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Tech stack (Astro 5, React 19, Tailwind v4, Playfair/DM Sans, Vitest, Playwright)
- Polaroid Line Carousel & asymmetric grid
- Astro dev server background mode commands
- Astro official documentation guides
- prefers-reduced-motion fallback (pure fade)
- WCAG AA 4.5:1 minimum text contrast
- Andong, Berdua album overview (Basecamp Pendem 1.300 mdpl to Puncak 1.726 mdpl)
- Accessible fullscreen Lightbox with caption and touch navigation
- Visual Identity & Atmosphere (warm analog cinematic, 35mm film memory album)
- robots.txt and noindex privacy protection
- Polaroid Line Carousel 1
- Package 1
- Index 1
- Rahasia 1
- Package 2
- Build Media 1
- Content Config 1
- Layout.astro
- Package 3
- Tsconfig 1
- MusikToggle 1
- PRODUCT 1
- Favicon 1
- Andong, Berdua product summary (Gunung Andong 1.726 mdpl)
- Robots 1
- Typography system (Playfair Display Variable, DM Sans Variable, tabular-nums)

## God Nodes (most connected - your core abstractions)
1. `isLightMode()` - 12 edges
2. `scripts` - 10 edges
3. `PolaroidLineCarousel()` - 10 edges
4. `vitest` - 8 edges
5. `Slide` - 7 edges
6. `initVideos()` - 7 edges
7. `enkripsi()` - 6 edges
8. `react` - 5 edges
9. `Galeri()` - 5 edges
10. `clamp()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `main()` --calls--> `enkripsi()`  [EXTRACTED]
  scripts/enkripsi-rahasia.ts → src/lib/kripto.ts
- `fixture()` --calls--> `initVideos()`  [EXTRACTED]
  tests/video.test.ts → src/lib/video.ts
- `WebCrypto AES-GCM + PBKDF2 (100.000 iterations) for /rahasia` --semantically_similar_to--> `WebCrypto AES-GCM password protection for /rahasia`  [INFERRED] [semantically similar]
  README.md → PRODUCT.md
- `Galeri()` --calls--> `isLightMode()`  [EXTRACTED]
  src/components/Galeri.tsx → src/lib/gerak.ts
- `Lightbox()` --calls--> `isLightMode()`  [EXTRACTED]
  src/components/Lightbox.tsx → src/lib/gerak.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Favicon visual elements form one brand mark** — public_favicon_favicon, public_favicon_sun_circle, public_favicon_back_mountain, public_favicon_front_mountain, public_favicon_golden_peak, public_favicon_horizon_line [EXTRACTED 1.00]

## Communities (27 total, 12 thin omitted)

### Community 0 - "Tech stack (Astro 5, React 19, Tailwind v4, Playfair/DM Sans, Vitest, Playwright)"
Cohesion: 0.67
Nodes (3): Tech stack (Astro 5, React 19, Tailwind v4, Playfair/DM Sans, Vitest, Playwright), Vanta.js Clouds + Three.js r134 3D background, Procedural mountain ambient audio via Web Audio API

### Community 25 - "Polaroid Line Carousel 1"
Cohesion: 0.13
Nodes (21): motion, react, Props, Props, Props, Props, Props, Galeri() (+13 more)

### Community 26 - "Package 1"
Cohesion: 0.08
Nodes (24): devDependencies, @astrojs/check, @types/node, typescript, vitest, engines, node, name (+16 more)

### Community 29 - "Index 1"
Cohesion: 0.21
Nodes (8): cover, responsiveImage(), getSlidesForBab(), langitSlides, MediaItemRaw, puncakSlides, sabanaSlides, sunriseSlides

### Community 31 - "Rahasia 1"
Cohesion: 0.13
Nodes (18): kontenPribadi, main(), base64ToBuf(), bufToBase64(), dapatkanKunci(), dekripsi(), enkripsi(), btnBuka (+10 more)

### Community 45 - "Package 2"
Cohesion: 0.13
Nodes (15): dependencies, astro, @astrojs/react, @fontsource-variable/dm-sans, @fontsource-variable/playfair-display, gsap, lenis, motion (+7 more)

### Community 47 - "Build Media 1"
Cohesion: 0.21
Nodes (4): sharp, chapters, files, manifest

### Community 48 - "Content Config 1"
Cohesion: 0.18
Nodes (7): Props, Props, babSchema, collections, mediaItemSchema, initVideos(), fixture()

### Community 51 - "Layout.astro"
Cohesion: 0.12
Nodes (13): vitest, Props, babList, initVanta(), shouldDisableVanta(), preference, Props, update() (+5 more)

### Community 57 - "Package 3"
Cohesion: 0.20
Nodes (10): scripts, astro, build, check, check:media, dev, prebuild, predev (+2 more)

### Community 63 - "Tsconfig 1"
Cohesion: 0.20
Nodes (9): astro/tsconfigs/strict, compilerOptions, baseUrl, jsx, jsxImportSource, paths, exclude, extends (+1 more)

### Community 70 - "MusikToggle 1"
Cohesion: 0.28
Nodes (8): audio, bars, btn, label, Props, startProceduralWind(), stopProceduralWind(), toggleMusic()

### Community 78 - "PRODUCT 1"
Cohesion: 0.29
Nodes (5): Page structure (main / and private /rahasia), Audiences & personas (Pacar, Teman/Publik, Pengembang/Recruiter), WebCrypto AES-GCM password protection for /rahasia, npm scripts and scripts/enkripsi-rahasia.ts generator, WebCrypto AES-GCM + PBKDF2 (100.000 iterations) for /rahasia

### Community 90 - "Favicon 1"
Cohesion: 0.40
Nodes (6): Back mountain ridge, Favicon depicting Gunung Andong at dawn, Front mountain ridge (Gunung Andong), Golden peak light, Horizon base line, Sun or dawn circle

### Community 129 - "Robots 1"
Cohesion: 0.67
Nodes (3): Allow all paths directive, Disallow /rahasia path directive, User-agent wildcard directive

## Knowledge Gaps
- **30 isolated node(s):** `@fontsource-variable/dm-sans`, `@fontsource-variable/playfair-display`, `@types/react`, `@types/react-dom`, `tailwindcss` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 124 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `Layout.astro` to `Build Media 1`, `Content Config 1`, `Polaroid Line Carousel 1`, `Package 1`, `Rahasia 1`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **What connects `@fontsource-variable/dm-sans`, `@fontsource-variable/playfair-display`, `@types/react` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Polaroid Line Carousel 1` be split into smaller, more focused modules?**
  _Cohesion score 0.13257575757575757 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Package 2` to `Package 1`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `Package 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08307692307692308 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `Package 3` to `Package 1`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Should `Rahasia 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12987012987012986 - nodes in this community are weakly interconnected._