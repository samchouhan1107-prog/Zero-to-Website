# Zero-to-Website CSS3 Stylesheet Architecture (`src/styles/`)

All styles in Zero-to-Website use **pure, standards-compliant CSS3** custom properties, Flexbox, CSS Grid, and semantic class selectors (zero Tailwind or CSS-in-JS runtime overhead).

All files are loaded in deterministic cascade order by `/src/styles/main.css`, which is imported once at application boot via `/src/utils/index.css` -> `/src/utils/main.tsx`.

## Quick Reference Map for Future Checks & Updates

| Order | File | Purpose & Quick Edit Target |
| :--- | :--- | :--- |
| `01` | `reset.css` | HTML5 element box-sizing, margin resets, smooth scrolling, and focus defaults |
| `02` | `variables.css` | Global sizing tokens (`--font-*`, `--text-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--z-*`) |
| `03` | `themes.css` | Light (`html.light` Soft Porcelain) & Dark (`html.dark` Midnight Obsidian) colour palettes |
| `04` | `typography.css` | Headings (`h1`–`h6`), paragraph measure, inline code styling, and monospace helpers |
| `05` | `layout.css` | `.app-root`, `.app-sidebar` (sticky/collapsed), `.app-header`, `.public-layout-shell`, Grid utilities |
| `06` | `components.css` | `.btn`, `.badge`, `.card`, `.progress-track`, `.tabs-nav`, `.modal-dialog`, `.toast` |
| `07` | `forms.css` | `.form-input`, `.form-textarea`, `.form-select`, `.search-input-wrapper`, `.checkbox-label` |
| `08` | `lesson-content.css` | Structured lesson reader blocks, code snippets, quizzes, and live checkpoints |
| `09` | `chat.css` | AI Learning Assistant bubbles, threads, and message composer |
| `10` | `dashboard.css` | Student dashboard hero, metric cards, continue-learning card, and chapter track grid |
| `11` | `blog.css` | Editorial Blog hero, search/category bar, article card grid, reader layout, code & checkpoints |
| `12` | `responsive.css` | Breakpoint adaptations (`<= 1200px`, `<= 960px` tablet drawer, `<= 640px` mobile, `<= 420px`) |
