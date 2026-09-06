import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Compass,
  FileCode,
  Globe,
  Grid,
  Layers,
  Layout,
  Play,
  Search,
  Server,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from 'lucide-react';
import { Chapter, UserProgress } from '../utils/types';
import { WebZoneDeveloperGraphic } from './WebZoneDeveloperGraphic';
import { NEWS_UPDATES } from '../data/newsData';

export interface HomeHeroProps {
  chapters: Chapter[];
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  onOpenPracticeHub: () => void;
  onOpenVisualLab: (toolId?: string) => void;
  onOpenActivities?: () => void;
  onOpenTutor: () => void;
  onOpenMilestones: () => void;
  onOpenSearch?: (query?: string) => void;
  selectedCategory?: string;
}

type ToolCategory = 'All' | 'Web Tools' | 'Image Tools' | 'Developer Tools' | 'SEO Tools' | 'Performance' | 'Utilities';

interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  icon: typeof Wrench;
  description: string;
  ctaText: string;
  action: () => void;
  badge?: string;
  accentColor: string;
}

const POPULAR_SEARCH_TAGS = [
  { label: 'CSS Flexbox', query: 'flexbox' },
  { label: 'CSS Grid', query: 'grid' },
  { label: 'Web REPL Sandbox', query: 'sandbox' },
  { label: 'DOM Tree Inspector', query: 'dom' },
  { label: 'HTTP & DNS Trace', query: 'http' },
  { label: 'CSS Box Model', query: 'box model' },
];

export const HomeHero: React.FC<HomeHeroProps> = ({
  chapters,
  progress,
  onSelectLesson,
  onOpenPracticeHub,
  onOpenVisualLab,
  onOpenActivities,
  onOpenTutor,
  onOpenMilestones,
  onOpenSearch,
  selectedCategory = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToolCategory, setActiveToolCategory] = useState<ToolCategory>('All');

  const allLessons = chapters.flatMap((chapter) => chapter.lessons);
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;
  const nextIncompleteLesson = allLessons.find((lesson) => !progress.completedLessons[lesson.id]) || allLessons[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenSearch) {
      onOpenSearch(searchQuery);
    }
  };

  const handleQuickTagClick = (tagQuery: string) => {
    setSearchQuery(tagQuery);
    if (onOpenSearch) {
      onOpenSearch(tagQuery);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tool catalog mapped to genuine existing features
  const toolsList: ToolItem[] = [
    // Web Tools
    {
      id: 'tool-sandbox',
      name: 'Interactive Web REPL Sandbox',
      category: 'Web Tools',
      icon: Code2,
      description: 'Real-time client-side HTML, CSS, and JavaScript coding sandbox with instant DOM isolation and live preview.',
      ctaText: 'Open Sandbox',
      action: onOpenPracticeHub,
      badge: 'Interactive',
      accentColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      id: 'tool-dom',
      name: 'DOM Tree Inspector',
      category: 'Web Tools',
      icon: Terminal,
      description: 'Inspect live HTML nodes, parent-child document tree structures, attribute state, and tree traversal in real time.',
      ctaText: 'Open Inspector',
      action: () => onOpenVisualLab('dom'),
      badge: 'Visual Model',
      accentColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      id: 'tool-net',
      name: 'HTTP & DNS Flow Trace',
      category: 'Web Tools',
      icon: Globe,
      description: 'Trace client-server request pipelines, DNS resolution stages, TCP handshakes, TLS negotiation, and response headers.',
      ctaText: 'Trace Flow',
      action: () => onOpenVisualLab('net'),
      badge: 'Protocol Lab',
      accentColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    },

    // Image Tools
    {
      id: 'tool-box-model',
      name: 'CSS Box Model Studio',
      category: 'Image Tools',
      icon: Layers,
      description: 'Visual workbench for margin collapse, border radius, padding geometry, content-box vs border-box calculations.',
      ctaText: 'Open Box Studio',
      action: () => onOpenVisualLab('box'),
      badge: 'Spatial Engine',
      accentColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      id: 'tool-responsive',
      name: 'Responsive Viewport & Media Engine',
      category: 'Image Tools',
      icon: Layout,
      description: 'Simulate responsive viewports, CSS media queries, and fluid layout scaling across desktop, tablet, and mobile screens.',
      ctaText: 'Test Viewports',
      action: onOpenPracticeHub,
      badge: 'Viewport Tool',
      accentColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    },

    // Developer Tools
    {
      id: 'tool-flexbox',
      name: 'Flexbox Studio',
      category: 'Developer Tools',
      icon: Layout,
      description: 'Interactive 1D flex container engine with live main-axis and cross-axis alignment, flex-wrap, and item ordering.',
      ctaText: 'Open Flex Studio',
      action: () => onOpenVisualLab('flex'),
      badge: '1D Axis',
      accentColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
    {
      id: 'tool-grid',
      name: 'CSS Grid Matrix',
      category: 'Developer Tools',
      icon: Grid,
      description: 'Two-dimensional CSS grid tracks generator with fractional fr units, auto-fit tracks, minmax boundaries, and template areas.',
      ctaText: 'Open Grid Matrix',
      action: () => onOpenVisualLab('grid'),
      badge: '2D Grid',
      accentColor: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
    },
    {
      id: 'tool-git',
      name: 'Git Commit DAG Explorer',
      category: 'Developer Tools',
      icon: Compass,
      description: 'Visualize directed acyclic graph (DAG) commit history, branching topology, fast-forward merges, and detached HEAD states.',
      ctaText: 'Explore DAG',
      action: () => onOpenVisualLab('git'),
      badge: 'VCS Explorer',
      accentColor: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
    },

    // SEO Tools
    {
      id: 'tool-semantic-html',
      name: 'Semantic HTML5 Architecture Guide',
      category: 'SEO Tools',
      icon: FileCode,
      description: 'Audit document landmark hierarchies (<header>, <nav>, <main>, <article>, <aside>, <footer>) for search crawler indexing.',
      ctaText: 'Inspect Semantics',
      action: () => onSelectLesson('ch-01-l-01'),
      badge: 'SEO Standards',
      accentColor: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    },
    {
      id: 'tool-aria',
      name: 'Web Accessibility (WAI-ARIA) Validator',
      category: 'SEO Tools',
      icon: CheckCircle2,
      description: 'Evaluate accessible names, ARIA roles, states, screen-reader focus management, and WCAG AA contrast compliance.',
      ctaText: 'Review ARIA',
      action: () => onSelectLesson('ch-01-l-02'),
      badge: 'Accessibility',
      accentColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },

    // Performance
    {
      id: 'tool-crp',
      name: 'Critical Rendering Path Inspector',
      category: 'Performance',
      icon: Zap,
      description: 'Understand browser engine parsing, DOM + CSSOM construction, render tree calculation, layout reflow, and pixel paint.',
      ctaText: 'Inspect Pipeline',
      action: () => onSelectLesson('ch-00-l-04'),
      badge: 'Core Vitals',
      accentColor: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    },
    {
      id: 'tool-cache',
      name: 'Network Latency & Cache Inspector',
      category: 'Performance',
      icon: Activity,
      description: 'Understand client caching headers (Cache-Control, ETag), 304 responses, and asset payload optimization.',
      ctaText: 'Audit Latency',
      action: () => onOpenVisualLab('net'),
      badge: 'Network Perf',
      accentColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },

    // Utilities
    {
      id: 'tool-tutor',
      name: 'Developer AI Code Tutor',
      category: 'Utilities',
      icon: Sparkles,
      description: 'Interactive AI tutor ready to explain tricky CSS algorithms, debug syntax errors, and review standard web architecture.',
      ctaText: 'Ask AI Tutor',
      action: onOpenTutor,
      badge: 'AI Assistant',
      accentColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    },
    {
      id: 'tool-drills',
      name: 'Recall Drills & Bug Hunt Sandbox',
      category: 'Utilities',
      icon: Wrench,
      description: 'Hands-on debugging arena featuring spot-the-bug puzzles, syntax sequencing tests, and rapid flashcard reviews.',
      ctaText: 'Start Drills',
      action: onOpenActivities ? onOpenActivities : onOpenPracticeHub,
      badge: 'Debugging Arena',
      accentColor: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
    },
  ];

  const filteredTools = activeToolCategory === 'All'
    ? toolsList
    : toolsList.filter((t) => t.category === activeToolCategory);

  const toolCategories: ToolCategory[] = [
    'All',
    'Web Tools',
    'Image Tools',
    'Developer Tools',
    'SEO Tools',
    'Performance',
    'Utilities',
  ];

  return (
    <div id="home-dashboard" className="mx-auto w-full max-w-[1550px] min-w-0 space-y-12 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section
        aria-label="WebZoneBW Hero Section"
        className="relative overflow-hidden rounded-2xl border border-[#27272a] bg-[#121215] p-6 sm:p-10 lg:p-12 shadow-2xl"
      >
        {/* Soft background ambient radial glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
          {/* Left Column: Headline, Supporting Text, Search Experience, and Action CTAs */}
          <div className="space-y-6">
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs font-semibold text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <span>WebZoneBW SC · Developer Studio</span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                Powerful Web Tools, <br />
                <span className="text-white">Built for the Modern Web</span>
              </h1>

              {/* Exact Requested Supporting Text */}
              <p className="text-base sm:text-lg font-normal text-[#a1a1aa] leading-relaxed max-w-xl">
                Explore practical web, image, developer and performance tools designed to help you build, test and improve your websites.
              </p>
            </div>

            {/* Prominent Search Control */}
            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div className="relative flex w-full max-w-xl items-center rounded-xl border border-[#27272a] bg-[#18181c] p-1.5 shadow-lg transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                <div className="flex items-center pl-3 text-[#71717a]">
                  <Search className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search web tools, CSS visualizers, sandbox, DOM..."
                  className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-[#71717a] focus:outline-none"
                  aria-label="Search WebZoneBW tools and resources"
                />

                <span className="hidden sm:inline-flex items-center rounded border border-[#27272a] bg-[#222228] px-2 py-0.5 font-mono text-[10px] text-[#9ca3af] mr-2">
                  ⌘K
                </span>

                {/* Dominant Search Button */}
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98] shadow-md shrink-0"
                >
                  Search
                </button>
              </div>

              {/* Popular quick-discovery chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#71717a]">
                  Quick Explore:
                </span>
                {POPULAR_SEARCH_TAGS.map((tag) => (
                  <button
                    key={tag.query}
                    type="button"
                    onClick={() => handleQuickTagClick(tag.query)}
                    className="rounded-md border border-[#27272a] bg-[#18181c] px-2.5 py-1 text-xs font-medium text-blue-400 transition-colors hover:border-blue-500/50 hover:bg-[#222228]"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </form>

            {/* Primary and Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Dominant CTA: Explore Tools */}
              <button
                type="button"
                onClick={() => scrollToSection('tool-discovery')}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98] shadow-lg shadow-blue-600/20"
              >
                <Wrench className="h-4 w-4" />
                <span>Explore Tools</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Secondary CTA: Explore WebZoneBW */}
              <button
                type="button"
                onClick={() => scrollToSection('explore-webzonebw')}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#27272a] bg-[#18181c] px-5 text-sm font-bold text-[#d4d4d8] transition-all hover:border-[#3f3f46] hover:bg-[#222228] hover:text-white"
              >
                <BookOpen className="h-4 w-4 text-purple-400" />
                <span>Explore WebZoneBW</span>
              </button>

              {/* Fast Track to Practice Sandbox */}
              <button
                type="button"
                onClick={onOpenPracticeHub}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 text-xs font-bold text-emerald-400 transition-colors hover:bg-emerald-500/20"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Live REPL Sandbox</span>
              </button>
            </div>
          </div>

          {/* Right Column: Premium Abstract WebZoneBW Visual */}
          <div className="w-full">
            <WebZoneDeveloperGraphic />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TOOL DISCOVERY SECTION                                                 */}
      {/* ========================================================================= */}
      <section id="tool-discovery" aria-labelledby="tools-heading" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#27272a] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
              <Wrench className="h-3.5 w-3.5" />
              <span>Tool Discovery</span>
            </div>
            <h2 id="tools-heading" className="mt-1 text-2xl sm:text-3xl font-black text-white">
              Practical Web Engineering Utilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-lg leading-relaxed">
            Select an instrument category to explore hands-on visualizers, interactive layout workbenches, and sandbox environments.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {toolCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveToolCategory(category)}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                activeToolCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'border border-[#27272a] bg-[#18181c] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Clean Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="group relative flex flex-col justify-between rounded-xl border border-[#27272a] bg-[#16161a] p-5 sm:p-6 transition-all hover:border-blue-500/50 hover:bg-[#1a1a20] shadow-sm hover:shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${tool.accentColor}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {tool.badge && (
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider rounded border border-[#27272a] bg-[#121215] px-2 py-0.5 text-[#a1a1aa]">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-blue-400 tracking-wider">
                      {tool.category}
                    </span>
                    <h3 className="mt-1 text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#27272a]/60">
                  <button
                    type="button"
                    onClick={tool.action}
                    className="w-full inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#27272a] bg-[#1c1c22] px-4 text-xs font-bold text-white transition-all group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white active:scale-[0.98]"
                  >
                    <span>{tool.ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CONTENT / RESOURCE AREA: "Explore WebZoneBW"                          */}
      {/* ========================================================================= */}
      <section id="explore-webzonebw" aria-labelledby="resources-heading" className="space-y-6 pt-4">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#27272a] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Knowledge Base &amp; Guides</span>
            </div>
            <h2 id="resources-heading" className="mt-1 text-2xl sm:text-3xl font-black text-white">
              Explore WebZoneBW
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-lg leading-relaxed">
            Curated developer references, core standards documentation, and genuine platform release updates.
          </p>
        </div>

        {/* 4 Cards Bento: Featured Tools, Latest Resources, Helpful Guides, Developer Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bento Card 1: Featured Learning Tracks */}
          <div className="rounded-xl border border-[#27272a] bg-[#16161a] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <Compass className="h-4 w-4 text-blue-400" />
                <span>Featured Curriculum Tracks</span>
              </div>
              <span className="font-mono text-xs text-[#71717a]">5 Chapters · 20 Lessons</span>
            </div>

            <div className="divide-y divide-[#27272a]/70">
              {chapters.slice(0, 4).map((ch) => (
                <div key={ch.id} className="py-3 flex items-start justify-between gap-3 group">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#27272a] text-blue-400">
                        Ch {ch.number}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {ch.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#a1a1aa] line-clamp-1">{ch.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectLesson(ch.lessons[0]?.id || 'ch-00-l-01')}
                    className="shrink-0 inline-flex items-center gap-1 rounded-md border border-[#27272a] bg-[#1c1c22] px-2.5 py-1 text-xs font-semibold text-[#d4d4d8] hover:border-blue-500/50 hover:text-white transition-colors"
                  >
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 2: Helpful Guides & Specifications */}
          <div className="rounded-xl border border-[#27272a] bg-[#16161a] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <FileCode className="h-4 w-4 text-purple-400" />
                <span>Helpful Developer Guides</span>
              </div>
              <span className="font-mono text-xs text-[#71717a]">Verified References</span>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-[#27272a] bg-[#121215] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">HTTP Lifecycle &amp; Networking Protocol</span>
                  <span className="font-mono text-[10px] text-blue-400">RFC Standards</span>
                </div>
                <p className="text-xs text-[#a1a1aa]">
                  In-depth walkthrough of DNS lookup stages, TCP handshakes, TLS negotiation, and status response codes.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectLesson('ch-00-l-01')}
                  className="pt-1 text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Guide</span> <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="rounded-lg border border-[#27272a] bg-[#121215] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">CSS Box Model &amp; Spatial Geometry</span>
                  <span className="font-mono text-[10px] text-amber-400">W3C Recommendation</span>
                </div>
                <p className="text-xs text-[#a1a1aa]">
                  Complete analysis of margin collapsing, padding depth, border dimensions, and standard box-sizing rules.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectLesson('ch-02-l-01')}
                  className="pt-1 text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Guide</span> <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="rounded-lg border border-[#27272a] bg-[#121215] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Modern Flexbox &amp; CSS Grid Matrix</span>
                  <span className="font-mono text-[10px] text-teal-400">Layout Specification</span>
                </div>
                <p className="text-xs text-[#a1a1aa]">
                  Two-dimensional track definitions, auto-fit repeat matrices, and 1D flex item alignment mechanics.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectLesson('ch-03-l-01')}
                  className="pt-1 text-xs font-bold text-teal-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Guide</span> <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Developer Articles & Genuine Releases */}
          <div className="rounded-xl border border-[#27272a] bg-[#16161a] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Developer Articles &amp; Updates</span>
              </div>
              <span className="font-mono text-xs text-[#71717a]">Live Platform Notes</span>
            </div>

            <div className="divide-y divide-[#27272a]/70">
              {NEWS_UPDATES.slice(0, 3).map((news) => (
                <div key={news.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white">{news.title}</span>
                    <span className="font-mono text-[10px] text-[#71717a]">{news.date}</span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">{news.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 4: Interactive Exercises & AI Review */}
          <div className="rounded-xl border border-[#27272a] bg-[#16161a] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span>Interactive Practice &amp; AI Assistance</span>
              </div>
              <span className="font-mono text-xs text-emerald-400">Ready to Code</span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#a1a1aa]">
              <p>
                WebZoneBW features verified interactive code challenges with instant DOM isolation, live preview rendering, automated test assertion passes, and on-demand AI code tutoring.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenPracticeHub}
                  className="rounded-lg border border-[#27272a] bg-[#121215] p-3 text-left hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">Practice Arena</div>
                  <div className="text-[11px] text-[#71717a] mt-0.5">Solve code challenges</div>
                </button>

                <button
                  type="button"
                  onClick={onOpenTutor}
                  className="rounded-lg border border-[#27272a] bg-[#121215] p-3 text-left hover:border-blue-500/50 transition-colors group"
                >
                  <div className="font-bold text-white group-hover:text-blue-400 transition-colors">AI Code Tutor</div>
                  <div className="text-[11px] text-[#71717a] mt-0.5">Ask questions anytime</div>
                </button>
              </div>

              {nextIncompleteLesson && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectLesson(nextIncompleteLesson.id)}
                    className="w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white hover:bg-blue-500 transition-colors"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{completedCount > 0 ? `Resume: ${nextIncompleteLesson.title}` : 'Start Curriculum'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
