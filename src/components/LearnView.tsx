import React, { useState, useMemo } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  Compass,
  FileCode,
  GraduationCap,
  Layers,
  Lightbulb,
  Lock,
  Play,
  Rocket,
  Search,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Chapter, UserProgress } from "../utils/types";

interface LearnViewProps {
  chapters: Chapter[];
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  onOpenPractice: (chapterId?: string) => void;
  onOpenTutor?: (topic?: string) => void;
  onNavigateHome?: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  chapters,
  progress,
  onSelectLesson,
  onOpenPractice,
  onOpenTutor,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<"all" | "foundations" | "styling" | "scripting" | "fullstack">("all");
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>("ch-00");

  // Track categories mapping
  const trackMap: Record<string, string[]> = {
    foundations: ["ch-00", "ch-01", "ch-02"],
    styling: ["ch-03", "ch-04", "ch-05", "ch-07", "ch-08"],
    scripting: ["ch-06", "ch-09"],
    fullstack: ["ch-00", "ch-01", "ch-02", "ch-03", "ch-04", "ch-05", "ch-06", "ch-07", "ch-08", "ch-09", "ch-10"],
  };

  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedLessonsCount = Object.values(progress.completedLessons).filter(Boolean).length;
  const overallPercent = Math.min(100, Math.round((completedLessonsCount / (totalLessons || 1)) * 100));

  const filteredChapters = useMemo(() => {
    return chapters.filter((ch) => {
      // Track filter
      if (selectedTrack !== "all") {
        const allowedIds = trackMap[selectedTrack] || [];
        if (!allowedIds.includes(ch.id)) return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = ch.title.toLowerCase().includes(q);
        const matchesDesc = (ch.description || ch.subtitle || "").toLowerCase().includes(q);
        const matchesLessons = ch.lessons.some((l) => l.title.toLowerCase().includes(q));
        return matchesTitle || matchesDesc || matchesLessons;
      }
      return true;
    });
  }, [chapters, selectedTrack, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-app-border bg-gradient-to-br from-app-surface via-app-inset to-app-surface p-6 sm:p-10 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs font-semibold text-blue-400">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Structured Web Engineering Curriculum</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-app-ink">
            Master Web Development <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              From Zero to Production
            </span>
          </h1>

          <p className="text-sm sm:text-base text-app-muted leading-relaxed">
            10 comprehensive chapters engineered with interactive lessons, hands-on code sandboxes, live visualizers, and interconnected learning pathways. Complete each module to unlock advanced concepts and earn your Certificate of Completion.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-xl border border-app-border bg-app-surface/80 p-3">
              <span className="text-xs text-app-subtle block">Total Chapters</span>
              <span className="text-xl font-black text-app-ink">{chapters.length} Modules</span>
            </div>
            <div className="rounded-xl border border-app-border bg-app-surface/80 p-3">
              <span className="text-xs text-app-subtle block">Interactive Lessons</span>
              <span className="text-xl font-black text-app-ink">{totalLessons} Lessons</span>
            </div>
            <div className="rounded-xl border border-app-border bg-app-surface/80 p-3">
              <span className="text-xs text-app-subtle block">Lessons Completed</span>
              <span className="text-xl font-black text-emerald-400">
                {completedLessonsCount} / {totalLessons}
              </span>
            </div>
            <div className="rounded-xl border border-app-border bg-app-surface/80 p-3">
              <span className="text-xs text-app-subtle block">Curriculum Progress</span>
              <span className="text-xl font-black text-app-amber">{overallPercent}%</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-app-active/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-700"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-20 -bottom-12 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
      </section>

      {/* 2. Tracks & Search Filtering */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Track Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: "all", label: "All Chapters (00–10)" },
            { id: "foundations", label: "🌱 Web Foundations" },
            { id: "styling", label: "🎨 CSS & Layout" },
            { id: "scripting", label: "⚡ JavaScript & Logic" },
            { id: "fullstack", label: "🚀 Full Stack" },
          ].map((track) => (
            <button
              key={track.id}
              type="button"
              onClick={() => setSelectedTrack(track.id as any)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedTrack === track.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "border border-app-border bg-app-surface text-app-muted hover:border-blue-500/40 hover:text-app-ink"
              }`}
            >
              {track.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-app-subtle" />
          <input
            type="text"
            placeholder="Search lessons or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-app-border bg-app-surface pl-9 pr-4 py-2 text-xs text-app-ink placeholder:text-app-subtle focus:border-blue-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* 3. Curriculum Pathway & Chapter List */}
      <div className="space-y-4">
        {filteredChapters.map((chapter, index) => {
          const isExpanded = expandedChapterId === chapter.id;
          const completedInChapter = chapter.lessons.filter((l) => progress.completedLessons[l.id]).length;
          const chapterPercent = Math.round((completedInChapter / (chapter.lessons.length || 1)) * 100);
          const isDone = chapterPercent === 100;

          // Sequential chapter connections
          const prevChapter = index > 0 ? filteredChapters[index - 1] : null;
          const nextChapter = index < filteredChapters.length - 1 ? filteredChapters[index + 1] : null;

          return (
            <div
              key={chapter.id}
              className={`rounded-2xl border transition-all ${
                isDone
                  ? "border-emerald-500/30 bg-app-surface/90 shadow-sm"
                  : isExpanded
                    ? "border-blue-500/40 bg-app-surface shadow-md"
                    : "border-app-border bg-app-surface hover:border-app-border-hover"
              }`}
            >
              {/* Chapter Card Header */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Number + Title + Meta */}
                  <div className="flex items-start gap-4 min-w-0">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-base font-black ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="h-6 w-6" /> : chapter.number}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-app-subtle">
                          Chapter {chapter.number}
                        </span>
                        <span className="rounded-full border border-app-border bg-app-inset px-2.5 py-0.5 text-[10px] font-bold text-app-muted">
                          {chapter.badge || "Beginner"}
                        </span>
                        {isDone && (
                          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                            Completed
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-app-ink truncate">
                        {chapter.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-app-muted line-clamp-2 max-w-2xl">
                        {chapter.description || chapter.subtitle || "Learn the key foundational concepts and hands-on practices for this chapter."}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions & Progress */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-app-ink">
                        {completedInChapter} / {chapter.lessons.length} Finished
                      </span>
                      <div className="mt-1 h-2 w-28 overflow-hidden rounded-full bg-app-active">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
                          style={{ width: `${chapterPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (chapter.lessons.length > 0) {
                            onSelectLesson(chapter.lessons[0].id);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all cursor-pointer"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Start</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setExpandedChapterId(isExpanded ? null : chapter.id)}
                        className="rounded-xl border border-app-border bg-app-inset hover:bg-app-active px-3 py-1.5 text-xs font-bold text-app-muted hover:text-app-ink transition-all cursor-pointer"
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "Collapse" : "Explore"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chapter Connection Ribbon */}
                <div className="mt-4 pt-3 border-t border-app-border/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-app-subtle">
                    <Compass className="h-3.5 w-3.5 text-blue-400" />
                    <span>
                      {prevChapter ? (
                        <>Builds on <strong className="text-app-ink">Chapter {prevChapter.number}: {prevChapter.title}</strong></>
                      ) : (
                        "Course starting point — No prerequisites required"
                      )}
                    </span>
                  </div>

                  {nextChapter && (
                    <div className="flex items-center gap-1 text-app-subtle">
                      <span>Leads to <strong className="text-app-ink">Chapter {nextChapter.number}</strong></span>
                      <ChevronRight className="h-3.5 w-3.5 text-app-amber" />
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Lesson Drawer */}
              {isExpanded && (
                <div className="border-t border-app-border bg-app-inset/40 p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-app-subtle">
                      Lessons in Chapter {chapter.number}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenPractice(chapter.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      <span>Open Chapter Practice Drills</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {chapter.lessons.map((lesson, lIdx) => {
                      const isLessonDone = !!progress.completedLessons[lesson.id];
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson.id)}
                          className={`group flex items-center justify-between rounded-xl border p-3.5 transition-all cursor-pointer ${
                            isLessonDone
                              ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50"
                              : "border-app-border bg-app-surface hover:border-blue-500/40 hover:bg-app-active"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                                isLessonDone
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-app-inset text-app-subtle group-hover:text-blue-400"
                              }`}
                            >
                              {isLessonDone ? <CheckCircle2 className="h-4 w-4" /> : lIdx + 1}
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-app-ink block truncate group-hover:text-blue-400 transition-colors">
                                {lesson.title}
                              </span>
                              <span className="text-[11px] text-app-subtle block truncate">
                                {lesson.tagline || `${lesson.learningObjectives?.[0] || "Interactive lesson"}`}
                              </span>
                            </div>
                          </div>

                          <ChevronRight className="h-4 w-4 shrink-0 text-app-subtle group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Capstone & Next Milestone Callout */}
      <section className="rounded-2xl border border-app-border bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-indigo-950/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
            <Trophy className="h-4 w-4" />
            <span>Capstone Verification & Certificate</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-app-ink">
            Ready to test your complete stack skills?
          </h3>
          <p className="text-xs sm:text-sm text-app-muted max-w-xl">
            Complete Chapter 10's Capstone Portfolio, verify your coding challenges, and generate your verifiable WebZoneBW SC Certificate of Completion.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenPractice()}
            className="rounded-xl border border-app-border bg-app-surface hover:bg-app-active px-4 py-2.5 text-xs font-bold text-app-ink transition-all cursor-pointer"
          >
            Launch Practice Arena
          </button>
          <button
            type="button"
            onClick={() => {
              const lastChapter = chapters[chapters.length - 1];
              if (lastChapter && lastChapter.lessons.length > 0) {
                onSelectLesson(lastChapter.lessons[0].id);
              }
            }}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md transition-all cursor-pointer"
          >
            Go to Capstone Project →
          </button>
        </div>
      </section>
    </div>
  );
};
