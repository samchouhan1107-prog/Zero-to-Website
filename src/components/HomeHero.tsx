import React, { useState } from "react";
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
  Trophy,
  Wrench,
  Zap,
  Award,
} from "lucide-react";
import { Chapter, UserProgress } from "../utils/types";
import { WebZoneDeveloperGraphic } from "./WebZoneDeveloperGraphic";
import { NEWS_UPDATES } from "../data/newsData";

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

type ToolCategory =
  | "All"
  | "Web Tools"
  | "Image Tools"
  | "Developer Tools"
  | "SEO Tools"
  | "Performance"
  | "Utilities";

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
  { label: "CSS Flexbox", query: "flexbox" },
  { label: "CSS Grid", query: "grid" },
  { label: "Web REPL Sandbox", query: "sandbox" },
  { label: "DOM Tree Inspector", query: "dom" },
  { label: "HTTP & DNS Trace", query: "http" },
  { label: "CSS Box Model", query: "box model" },
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
  selectedCategory = "All",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeToolCategory, setActiveToolCategory] =
    useState<ToolCategory>("All");

  const allLessons = chapters.flatMap((chapter) => chapter.lessons);
  const completedCount = Object.values(progress.completedLessons || {}).filter(
    Boolean,
  ).length;
  const totalLessons = allLessons.length;
  const percentComplete =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const nextIncompleteLesson =
    allLessons.find((lesson) => !progress.completedLessons?.[lesson.id]) ||
    allLessons[0];
  const nextChapter =
    chapters.find((c) =>
      c.lessons.some((l) => l.id === nextIncompleteLesson?.id),
    ) || chapters[0];

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
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Tool catalog mapped to genuine existing features
  const toolsList: ToolItem[] = [
    // Web Tools
    {
      id: "tool-sandbox",
      name: "Interactive Web REPL Sandbox",
      category: "Web Tools",
      icon: Code2,
      description:
        "Real-time client-side HTML, CSS, and JavaScript coding sandbox with instant DOM isolation and live preview.",
      ctaText: "Open Sandbox",
      action: onOpenPracticeHub,
      badge: "Interactive",
      accentColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      id: "tool-dom",
      name: "DOM Tree Inspector",
      category: "Web Tools",
      icon: Terminal,
      description:
        "Inspect live HTML nodes, parent-child document tree structures, attribute state, and tree traversal in real time.",
      ctaText: "Open Inspector",
      action: () => onOpenVisualLab("dom"),
      badge: "Visual Model",
      accentColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },
    {
      id: "tool-net",
      name: "HTTP & DNS Flow Trace",
      category: "Web Tools",
      icon: Globe,
      description:
        "Trace client-server request pipelines, DNS resolution stages, TCP handshakes, TLS negotiation, and response headers.",
      ctaText: "Trace Flow",
      action: () => onOpenVisualLab("net"),
      badge: "Protocol Lab",
      accentColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    },

    // Image Tools
    {
      id: "tool-box-model",
      name: "CSS Box Model Studio",
      category: "Image Tools",
      icon: Layers,
      description:
        "Visual workbench for margin collapse, border radius, padding geometry, content-box vs border-box calculations.",
      ctaText: "Open Box Studio",
      action: () => onOpenVisualLab("box"),
      badge: "Spatial Engine",
      accentColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    {
      id: "tool-responsive",
      name: "Responsive Viewport & Media Engine",
      category: "Image Tools",
      icon: Layout,
      description:
        "Simulate responsive viewports, CSS media queries, and fluid layout scaling across desktop, tablet, and mobile screens.",
      ctaText: "Test Viewports",
      action: onOpenPracticeHub,
      badge: "Viewport Tool",
      accentColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
    },

    // Developer Tools
    {
      id: "tool-flexbox",
      name: "Flexbox Studio",
      category: "Developer Tools",
      icon: Layout,
      description:
        "Interactive 1D flex container engine with live main-axis and cross-axis alignment, flex-wrap, and item ordering.",
      ctaText: "Open Flex Studio",
      action: () => onOpenVisualLab("flex"),
      badge: "1D Axis",
      accentColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    },
    {
      id: "tool-grid",
      name: "CSS Grid Matrix",
      category: "Developer Tools",
      icon: Grid,
      description:
        "Two-dimensional CSS grid tracks generator with fractional fr units, auto-fit tracks, minmax boundaries, and template areas.",
      ctaText: "Open Grid Matrix",
      action: () => onOpenVisualLab("grid"),
      badge: "2D Grid",
      accentColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    },
    {
      id: "tool-git",
      name: "Git Commit DAG Explorer",
      category: "Developer Tools",
      icon: Compass,
      description:
        "Visualize directed acyclic graph (DAG) commit history, branching topology, fast-forward merges, and detached HEAD states.",
      ctaText: "Explore DAG",
      action: () => onOpenVisualLab("git"),
      badge: "VCS Explorer",
      accentColor: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    },

    // SEO Tools
    {
      id: "tool-semantic-html",
      name: "Semantic HTML5 Architecture Guide",
      category: "SEO Tools",
      icon: FileCode,
      description:
        "Audit document landmark hierarchies (<header>, <nav>, <main>, <article>, <aside>, <footer>) for search crawler indexing.",
      ctaText: "Inspect Semantics",
      action: () => onSelectLesson("ch-01-l-01"),
      badge: "SEO Standards",
      accentColor: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    },
    {
      id: "tool-aria",
      name: "Web Accessibility (WAI-ARIA) Validator",
      category: "SEO Tools",
      icon: CheckCircle2,
      description:
        "Evaluate accessible names, ARIA roles, states, screen-reader focus management, and WCAG AA contrast compliance.",
      ctaText: "Review ARIA",
      action: () => onSelectLesson("ch-01-l-02"),
      badge: "Accessibility",
      accentColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },

    // Performance
    {
      id: "tool-crp",
      name: "Critical Rendering Path Inspector",
      category: "Performance",
      icon: Zap,
      description:
        "Understand browser engine parsing, DOM + CSSOM construction, render tree calculation, layout reflow, and pixel paint.",
      ctaText: "Inspect Pipeline",
      action: () => onOpenVisualLab("criticalpath"),
      badge: "Core Vitals",
      accentColor: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    },
    {
      id: "tool-cache",
      name: "Network Latency & Cache Inspector",
      category: "Performance",
      icon: Activity,
      description:
        "Understand client caching headers (Cache-Control, ETag), 304 responses, and asset payload optimization.",
      ctaText: "Audit Latency",
      action: () => onOpenVisualLab("net"),
      badge: "Network Perf",
      accentColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },

    // Utilities
    {
      id: "tool-tutor",
      name: "Developer AI Code Tutor",
      category: "Utilities",
      icon: Sparkles,
      description:
        "Interactive AI tutor ready to explain tricky CSS algorithms, debug syntax errors, and review standard web architecture.",
      ctaText: "Ask AI Tutor",
      action: onOpenTutor,
      badge: "AI Assistant",
      accentColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    },
    {
      id: "tool-drills",
      name: "Recall Drills & Bug Hunt Sandbox",
      category: "Utilities",
      icon: Wrench,
      description:
        "Hands-on debugging arena featuring spot-the-bug puzzles, syntax sequencing tests, and rapid flashcard reviews.",
      ctaText: "Start Drills",
      action: onOpenActivities ? onOpenActivities : onOpenPracticeHub,
      badge: "Debugging Arena",
      accentColor: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    },
  ];

  const filteredTools =
    activeToolCategory === "All"
      ? toolsList
      : toolsList.filter((t) => t.category === activeToolCategory);

  const toolCategories: ToolCategory[] = [
    "All",
    "Web Tools",
    "Image Tools",
    "Developer Tools",
    "SEO Tools",
    "Performance",
    "Utilities",
  ];

  return (
    <div
      id="home-dashboard"
      className="mx-auto w-full max-w-[1550px] min-w-0 space-y-16 px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section
        aria-label="WebZoneBW Hero Section"
        className="relative overflow-hidden rounded-2xl border border-app-border bg-app-surface p-8 sm:p-12 lg:p-16 shadow-lg min-h-[600px] flex flex-col"
      >
        {/* Soft background ambient radial glows */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-80 w-80 rounded-full bg-blue-600/10 blur-2xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-2xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start flex-1">
          {/* Left Column: Headline, Supporting Text, Search Experience, and Action CTAs */}
          <div className="space-y-6 sm:space-y-8 flex-1 min-w-0">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs font-semibold text-blue-500 dark:text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span>WebZoneBW SC · Developer Studio</span>
              </div>

              {/* Professional Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-app-ink leading-[1.25]">
                Learn to Build Real Websites, <br />
                <span className="text-app-ink">From Zero to Professional</span>
              </h1>

              {/* Clear Supporting Statement */}
              <p className="text-base sm:text-lg font-normal text-app-muted leading-relaxed max-w-xl">
                Master modern web development through hands-on projects. Build
                portfolio-worthy websites while learning industry best
                practices.
              </p>

              {/* Learning Journey Progress */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    START YOUR JOURNEY
                  </h3>
                  <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                    {completedCount} / {totalLessons} Lessons
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs font-mono text-app-subtle mb-1">
                    <span>Progress</span>
                    <span>{percentComplete}% Complete</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-app-active overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${Math.max(4, percentComplete)}%` }}
                    />
                  </div>
                </div>

                <div className="text-xs font-mono text-app-subtle mb-2">
                  HTML → CSS → JavaScript → Projects → Portfolio
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onSelectLesson(nextIncompleteLesson?.id || "ch-00-l-01")
                  }
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors cursor-pointer"
                >
                  <span>
                    {completedCount === 0
                      ? "Start Learning"
                      : "Continue Journey"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Search & Quick Explore */}
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="relative flex w-full max-w-2xl items-center rounded-xl border border-app-border bg-app-inset p-2 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                <div className="flex items-center pl-4 text-app-subtle">
                  <Search
                    className="h-5 w-5 text-blue-500"
                    aria-hidden="true"
                  />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools, lessons, CSS flexbox, JavaScript..."
                  className="flex-1 bg-transparent px-4 py-3 text-sm sm:text-base text-app-ink placeholder:text-app-subtle focus:outline-none min-w-0"
                  aria-label="Search WebZoneBW tools and resources"
                />

                <span className="hidden sm:inline-flex items-center rounded border border-app-border bg-app-active px-3 py-1.5 font-mono text-[11px] text-app-subtle mr-3">
                  ⌘K
                </span>

                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98] shadow-md shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex-shrink-0"
                >
                  Search
                </button>
              </div>

              {/* Quick Explore Tools */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-app-subtle">
                  Quick Explore:
                </span>
                {POPULAR_SEARCH_TAGS.map((tag) => (
                  <button
                    key={tag.query}
                    type="button"
                    onClick={() => handleQuickTagClick(tag.query)}
                    className="rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 transition-all hover:border-blue-500/50 hover:bg-app-active cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 w-full">
              <button
                type="button"
                onClick={() => scrollToSection("tool-discovery")}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98] shadow-md shadow-blue-600/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex-1 min-w-[200px]"
              >
                <Wrench className="h-4 w-4" />
                <span>Explore Tools</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenPracticeHub}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 text-sm font-bold text-emerald-600 dark:text-emerald-400 transition-all hover:bg-emerald-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 flex-1 min-w-[200px]"
              >
                <Code2 className="h-4 w-4" />
                <span>Start Coding</span>
              </button>
            </div>
          </div>

          {/* Right Column: Integrated Visual Experience */}
          <div className="w-full flex items-start justify-center lg:items-center">
            <div className="relative max-w-[440px] w-full">
              <WebZoneDeveloperGraphic />
              {/* Subtle integration overlay */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TOOL DISCOVERY SECTION                                                 */}
      {/* ========================================================================= */}
      <section
        id="tool-discovery"
        aria-labelledby="tools-heading"
        className="space-y-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-app-border pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">
              <Wrench className="h-3.5 w-3.5" />
              <span>Tool Discovery</span>
            </div>
            <h2
              id="tools-heading"
              className="mt-1 text-2xl sm:text-3xl font-black text-app-ink"
            >
              Practical Web Engineering Utilities
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-app-muted max-w-lg leading-relaxed">
            Select an instrument category to explore hands-on visualizers,
            interactive layout workbenches, and sandbox environments.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4">
          {toolCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveToolCategory(category)}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeToolCategory === category
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-app-border bg-app-surface text-app-muted hover:border-app-border/80 hover:text-app-ink hover:bg-app-active"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Clean Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="group relative flex flex-col justify-between rounded-xl border border-app-border bg-app-surface p-5 sm:p-6 transition-all hover:border-blue-500/50 hover:bg-app-active/40 shadow-xs hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border ${tool.accentColor}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {tool.badge && (
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider rounded border border-app-border bg-app-inset px-2 py-0.5 text-app-subtle">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase text-blue-500 dark:text-blue-400 tracking-wider">
                      {tool.category}
                    </span>
                    <h3 className="mt-1 text-base sm:text-lg font-bold text-app-ink group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-app-muted leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-app-border/60">
                  <button
                    type="button"
                    onClick={tool.action}
                    className="w-full inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-app-border bg-app-inset px-4 text-xs font-bold text-app-ink transition-all group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white active:scale-[0.98] cursor-pointer"
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
      <section
        id="explore-webzonebw"
        aria-labelledby="resources-heading"
        className="space-y-8 pt-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-app-border pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Knowledge Base &amp; Guides</span>
            </div>
            <h2
              id="resources-heading"
              className="mt-2 text-2xl sm:text-3xl font-black text-app-ink"
            >
              Explore WebZoneBW
            </h2>
          </div>
          <p className="text-sm sm:text-base text-app-muted max-w-lg leading-relaxed">
            Curated developer references, core standards documentation, and
            genuine platform release updates.
          </p>
        </div>

        {/* 4 Cards Bento: Featured Tools, Latest Resources, Helpful Guides, Developer Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bento Card 1: Featured Learning Tracks */}
          <div className="rounded-xl border border-app-border bg-app-surface p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-app-border pb-4">
              <div className="flex items-center gap-2 font-bold text-app-ink text-base">
                <Compass className="h-4 w-4 text-blue-500" />
                <span>Curriculum Roadmap</span>
              </div>
              <span className="font-mono text-xs text-app-subtle">
                {chapters.length} Chapters · {allLessons.length} Comprehensive
                Lessons
              </span>
            </div>

            <div className="divide-y divide-app-border/70 max-h-[360px] overflow-y-auto pr-1">
              {chapters.map((ch) => {
                const chDoneCount = ch.lessons.filter(
                  (l) => progress.completedLessons?.[l.id],
                ).length;
                const chTotal = ch.lessons.length;
                const isChapterDone = chTotal > 0 && chDoneCount === chTotal;

                return (
                  <div
                    key={ch.id}
                    className="py-2.5 flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isChapterDone
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                              : chDoneCount > 0
                                ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                : "bg-app-active text-app-muted"
                          }`}
                        >
                          Ch {ch.number}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-app-ink group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {ch.title}
                        </h4>
                        {isChapterDone && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-app-subtle font-mono">
                        {chDoneCount}/{chTotal} lessons completed
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onSelectLesson(ch.lessons[0]?.id || "ch-00-l-01")
                      }
                      className="shrink-0 inline-flex items-center gap-1 rounded-md border border-app-border bg-app-inset px-2.5 py-1 text-xs font-semibold text-app-ink hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{isChapterDone ? "Review" : "Open"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bento Card 2: Helpful Guides & Specifications */}
          <div className="rounded-xl border border-app-border bg-app-surface p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-app-border pb-3">
              <div className="flex items-center gap-2 font-bold text-app-ink text-base">
                <FileCode className="h-4 w-4 text-purple-500" />
                <span>Helpful Developer Guides</span>
              </div>
              <span className="font-mono text-xs text-app-subtle">
                Verified References
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-app-border bg-app-inset p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-app-ink">
                    HTTP Lifecycle &amp; Networking Protocol
                  </span>
                  <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">
                    RFC Standards
                  </span>
                </div>
                <p className="text-xs text-app-muted">
                  In-depth walkthrough of DNS lookup stages, TCP handshakes, TLS
                  negotiation, and status response codes.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectLesson("ch-00-l-01")}
                  className="pt-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Guide</span> <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="rounded-lg border border-app-border bg-app-inset p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-app-ink">
                    CSS Box Model &amp; Spatial Geometry
                  </span>
                  <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">
                    W3C Recommendation
                  </span>
                </div>
                <p className="text-xs text-app-muted">
                  Complete analysis of margin collapsing, padding depth, border
                  dimensions, and standard box-sizing rules.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectLesson("ch-02-l-01")}
                  className="pt-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Guide</span> <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="rounded-lg border border-app-border bg-app-inset p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-app-ink">
                    Modern Flexbox &amp; CSS Grid Matrix
                  </span>
                  <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400">
                    Layout Specification
                  </span>
                </div>
                <p className="text-xs text-app-muted">
                  Two-dimensional track definitions, auto-fit repeat matrices,
                  and 1D flex item alignment mechanics.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectLesson("ch-03-l-01")}
                  className="pt-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Guide</span> <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Developer Articles & Genuine Releases */}
          <div className="rounded-xl border border-app-border bg-app-surface p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-app-border pb-3">
              <div className="flex items-center gap-2 font-bold text-app-ink text-base">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <span>Developer Articles &amp; Updates</span>
              </div>
              <span className="font-mono text-xs text-app-subtle">
                Live Platform Notes
              </span>
            </div>

            <div className="divide-y divide-app-border/70">
              {NEWS_UPDATES.slice(0, 3).map((news) => (
                <div key={news.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-app-ink">
                      {news.title}
                    </span>
                    <span className="font-mono text-[10px] text-app-subtle">
                      {news.date}
                    </span>
                  </div>
                  <p className="text-xs text-app-muted leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 4: Build Your Portfolio Project */}
          <div className="rounded-xl border border-app-border bg-app-surface p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-app-border pb-3">
              <div className="flex items-center gap-2 font-bold text-app-ink text-base">
                <Trophy className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Build Your Portfolio Project</span>
              </div>
              <span className="font-mono text-xs text-amber-600 dark:text-amber-400">
                Real-World Skills
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-app-muted">
              <p>
                Learn by building actual portfolio projects. Each lesson
                contributes to creating professional websites you can showcase
                to employers.
              </p>

              {/* Current Project Progress */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <p className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                  🎯 Current Project: Personal Portfolio
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>HTML Structure</span>
                    <span className="text-emerald-400">✓ Complete</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>CSS Layout</span>
                    <span className="text-amber-400">In Progress</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>JavaScript Features</span>
                    <span className="text-gray-400">Next</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenPracticeHub}
                  className="rounded-lg border border-app-border bg-app-inset p-3 text-left hover:border-amber-500/50 transition-colors group cursor-pointer"
                >
                  <div className="font-bold text-app-ink group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Continue Project
                  </div>
                  <div className="text-[11px] text-app-subtle mt-0.5">
                    Add portfolio sections
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectLesson("ch-02-l-01")}
                  className="rounded-lg border border-app-border bg-app-inset p-3 text-left hover:border-blue-500/50 transition-colors group cursor-pointer"
                >
                  <div className="font-bold text-app-ink group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Next Skill
                  </div>
                  <div className="text-[11px] text-app-subtle mt-0.5">
                    CSS Styling
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
