import { useEffect } from 'react';

interface SEOMetaConfig {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, any>;
}

const DEFAULT_META: SEOMetaConfig = {
  title: 'WebZoneBW SC — Free Interactive Web Developer Tools & Tutorials',
  description: 'WebZoneBW SC is a free developer platform with interactive web tools, CSS visualizers, HTML/CSS/JS sandboxes, a complete web engineering curriculum, and an AI code tutor.',
  ogTitle: 'WebZoneBW SC — Free Interactive Web Developer Tools & Tutorials',
  ogDescription: 'Free developer platform with interactive web tools, CSS visualizers, code sandboxes, and a complete web engineering curriculum.',
  ogType: 'website',
};

function setMetaContent(property: string, content: string) {
  // Try property attribute first (for og: and article: tags), then name
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement | null;
  }
  if (el) {
    el.setAttribute('content', content);
  } else {
    el = document.createElement('meta');
    if (property.startsWith('og:') || property.startsWith('article:')) {
      el.setAttribute('property', property);
    } else {
      el.setAttribute('name', property);
    }
    el.setAttribute('content', content);
    document.head.appendChild(el);
  }
}

function setJsonLd(data: Record<string, any>, id?: string) {
  // Remove existing
  const existingId = id || 'dynamic-jsonld';
  const existing = document.getElementById(existingId);
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = existingId;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function useSEOMeta(config: Partial<SEOMetaConfig>) {
  useEffect(() => {
    const merged = { ...DEFAULT_META, ...config };

    // Update page title
    document.title = merged.title;

    // Update primary meta tags
    setMetaContent('description', merged.description);

    // Update Open Graph tags
    setMetaContent('og:title', merged.ogTitle);
    setMetaContent('og:description', merged.ogDescription);
    setMetaContent('og:type', merged.ogType || 'website');

    if (merged.ogImage) {
      setMetaContent('og:image', merged.ogImage);
    }

    // Update Twitter tags
    setMetaContent('twitter:title', merged.ogTitle);
    setMetaContent('twitter:description', merged.ogDescription);

    // Update canonical
    if (merged.canonical) {
      let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (canonicalEl) {
        canonicalEl.setAttribute('href', merged.canonical);
      } else {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        canonicalEl.setAttribute('href', merged.canonical);
        document.head.appendChild(canonicalEl);
      }
    }

    // Add JSON-LD structured data
    if (merged.jsonLd) {
      setJsonLd(merged.jsonLd, 'dynamic-jsonld');
    }
  }, [config.title, config.description]);
}

// Preset meta configs for each view
export const SEO_PRESETS = {
  home: {
    title: 'WebZoneBW SC — Free Interactive Web Developer Tools & Tutorials',
    description: 'WebZoneBW SC is a free developer platform with interactive web tools, CSS visualizers, HTML/CSS/JS sandboxes, a complete web engineering curriculum, and an AI code tutor.',
    ogTitle: 'WebZoneBW SC — Free Interactive Web Developer Tools & Tutorials',
    ogDescription: 'Free developer platform with interactive web tools, CSS visualizers, code sandboxes, and a complete web engineering curriculum.',
    canonical: 'https://webzonebw.shop/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'WebZoneBW SC',
      url: 'https://webzonebw.shop',
      description: 'Free interactive web developer tools, CSS visualizers, code sandboxes, and a complete web engineering curriculum.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://webzonebw.shop/?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  },

  practiceHub: {
    title: 'Interactive Web REPL Sandbox — HTML, CSS & JavaScript | WebZoneBW SC',
    description: 'Write, test, and preview HTML, CSS, and JavaScript code in real time with the WebZoneBW SC interactive REPL sandbox. Instant live preview with DOM isolation.',
    ogTitle: 'Interactive Web REPL Sandbox — WebZoneBW SC',
    ogDescription: 'Write and test HTML, CSS, and JavaScript code in real time with instant live preview.',
    canonical: 'https://webzonebw.shop/?view=practice-hub',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Interactive Web REPL Sandbox',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      url: 'https://webzonebw.shop/?view=practice-hub',
    },
  },

  visualLab: (tool?: string) => ({
    title: tool
      ? `${tool.toUpperCase()} Visualizer — Developer Tool | WebZoneBW SC`
      : 'Visual Lab — Interactive Developer Tools | WebZoneBW SC',
    description: tool
      ? `Explore the ${tool.toUpperCase()} visualizer tool on WebZoneBW SC. Interactive real-time visualization for web developers and designers.`
      : 'Interactive developer visualizers for CSS Box Model, Flexbox, CSS Grid, DOM Tree, HTTP/DNS flow, and Git DAG on WebZoneBW SC.',
    ogTitle: tool ? `${tool.toUpperCase()} Visualizer — WebZoneBW SC` : 'Visual Lab — WebZoneBW SC',
    ogDescription: tool
      ? `Interactive ${tool.toUpperCase()} visualization tool for web developers.`
      : 'Interactive developer visualizers for CSS, DOM, HTTP, and Git.',
    canonical: tool ? `https://webzonebw.shop/?view=visual-lab&tool=${tool}` : 'https://webzonebw.shop/?view=visual-lab',
  }),

  lesson: (title: string, description: string, lessonId: string) => ({
    title: `${title} — WebZoneBW SC`,
    description,
    ogTitle: `${title} — WebZoneBW SC`,
    ogDescription: description,
    canonical: `https://webzonebw.shop/?lesson=${lessonId}`,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: title,
      description,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'WebZoneBW SC',
        url: 'https://webzonebw.shop',
      },
      url: `https://webzonebw.shop/?lesson=${lessonId}`,
      educationalLevel: 'Beginner to Advanced',
    },
  }),

  activities: {
    title: 'Recall Drills & Bug Hunt — Practice Arena | WebZoneBW SC',
    description: 'Test your web development knowledge with recall drills, bug hunt puzzles, code sequencing challenges, and speed quizzes on WebZoneBW SC.',
    ogTitle: 'Recall Drills & Bug Hunt — WebZoneBW SC',
    ogDescription: 'Test your web development knowledge with interactive drills and bug hunt puzzles.',
    canonical: 'https://webzonebw.shop/?view=activities',
  },

  blog: {
    title: 'Blog — Web Development Tutorials & Insights | WebZoneBW SC',
    description: 'In-depth articles, tutorials, and best practices for modern web development. Learn CSS, HTML, JavaScript, responsive design, and more from the WebZoneBW editorial team.',
    ogTitle: 'Blog — Web Development Tutorials | WebZoneBW SC',
    ogDescription: 'In-depth web development tutorials, guides, and best practices from the WebZoneBW editorial team.',
    canonical: 'https://webzonebw.shop/?view=blog',
    ogType: 'website',
  },
};
