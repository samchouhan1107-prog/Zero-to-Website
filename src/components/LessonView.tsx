import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Bug,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Compass,
  Copy,
  FileEdit,
  GraduationCap,
  HelpCircle,
  Layers,
  Lightbulb,
  Play,
  Printer,
  Save,
  Sparkles,
  Terminal,
  Tv,
  Zap,
} from 'lucide-react';
import { Chapter, Lesson } from '../utils/types';
import { BoxModelVisualizer } from './visualizers/BoxModelVisualizer';
import { FlexboxVisualizer } from './visualizers/FlexboxVisualizer';
import { GridVisualizer } from './visualizers/GridVisualizer';
import { DomTreeVisualizer } from './visualizers/DomTreeVisualizer';
import { GitFlowVisualizer } from './visualizers/GitFlowVisualizer';
import { NetworkFlowVisualizer } from './visualizers/NetworkFlowVisualizer';
import { PracticeSandbox } from './PracticeSandbox';
import { VideoPlayer } from './VideoPlayer';
import { DifficultyBadge } from './DifficultyBadge';
import { getActivityDeckForLesson } from '../data/activitiesData';

interface LessonViewProps {
  lesson: Lesson;
  chapter: Chapter;
  onNavigateLesson: (lessonId: string) => void;
  onCompleteLesson: (lessonId: string) => void;
  onNavigateActivities?: (lessonId: string) => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (lessonId: string) => void;
  userNote: string;
  onSaveNote: (lessonId: string, note: string) => void;
  onOpenTutor: (topic: string, code?: string) => void;
  allChapters: Chapter[];
  completedLessons?: Record<string, boolean>;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  chapter,
  onNavigateLesson,
  onCompleteLesson,
  onNavigateActivities,
  isCompleted,
  isBookmarked,
  onToggleBookmark,
  userNote,
  onSaveNote,
  onOpenTutor,
  allChapters,
  completedLessons = {},
}) => {
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'js'>('html');
  const [noteText, setNoteText] = useState(userNote || '');
  const [noteSaved, setNoteSaved] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('section-theory');

  // Find previous and next lessons across all chapters
  const allLessons = allChapters.flatMap((c) => c.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Chapter progress calculations
  const totalChapterLessons = chapter.lessons.length;
  const completedChapterLessons = chapter.lessons.filter(
    (l) => completedLessons[l.id] || (l.id === lesson.id && isCompleted)
  ).length;
  const chapterProgressPercent =
    totalChapterLessons > 0
      ? Math.round((completedChapterLessons / totalChapterLessons) * 100)
      : 0;
  const isChapterFullyCompleted = chapterProgressPercent === 100;

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    const scrollContainer = document.getElementById('main-content');
    if (el && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = el.getBoundingClientRect();
      scrollContainer.scrollTo({
        top: scrollContainer.scrollTop + elementRect.top - containerRect.top - 24,
        behavior: 'smooth',
      });
    }
  };

  const handleCopyCode = () => {
    let textToCopy = lesson.codeExample.html;
    if (activeCodeTab === 'css') textToCopy = lesson.codeExample.css;
    if (activeCodeTab === 'js') textToCopy = lesson.codeExample.js || '';

    navigator.clipboard.writeText(textToCopy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleQuizSelect = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSaveNote = () => {
    onSaveNote(lesson.id, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const renderVisualizer = () => {
    switch (lesson.visualType) {
      case 'box-model':
        return <BoxModelVisualizer />;
      case 'flexbox':
        return <FlexboxVisualizer />;
      case 'grid':
        return <GridVisualizer />;
      case 'dom-tree':
      case 'html-skeleton':
        return <DomTreeVisualizer />;
      case 'git-flow':
        return <GitFlowVisualizer />;
      case 'network-flow':
      default:
        return <NetworkFlowVisualizer />;
    }
  };

  const sectionTabs = [
    { id: 'section-theory', label: 'Theory', icon: BookOpen },
    { id: 'section-analogy', label: 'Mental Model', icon: Lightbulb },
    { id: 'section-visuals', label: 'Visual Lab', icon: Layers },
    { id: 'section-code', label: 'Annotated Code', icon: Code2 },
    { id: 'section-practice', label: 'Sandbox', icon: Zap },
    ...(lesson.video ? [{ id: 'section-video', label: 'Video Lab', icon: Tv }] : []),
    { id: 'section-quiz', label: 'Checkpoint', icon: HelpCircle },
    { id: 'section-activities', label: 'Activities', icon: GraduationCap },
    { id: 'section-notes', label: 'Notes', icon: FileEdit },
  ];

  return (
    <article
      id={`lesson-${lesson.id}`}
      className="mx-auto w-full max-w-[1080px] min-w-0 space-y-12 px-4 py-8 sm:px-6 sm:py-12 lg:px-10"
    >
      {/* 1. Spacious Engineering Header Card */}
      <section className="relative overflow-hidden rounded-2xl border border-app-border bg-app-surface p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-app-border pb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-app-amber/60 bg-app-amber/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
              Chapter {chapter.number}
            </span>
            <span className="font-mono text-xs text-app-subtle">/</span>
            <span className="font-mono text-xs font-semibold text-app-muted">
              Lesson {lesson.number}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleBookmark(lesson.id)}
              className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                isBookmarked
                  ? 'border-app-amber bg-app-amber/15 text-app-amber shadow-xs'
                  : 'border-app-border bg-app-inset text-app-muted hover:border-app-border hover:bg-app-active hover:text-app-ink'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 fill-app-amber text-app-amber" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              type="button"
              onClick={() => onCompleteLesson(lesson.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all shadow-sm ${
                isCompleted
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-app-amber text-slate-950 hover:bg-app-amber-hover hover:shadow-app-amber/20'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isCompleted ? 'Completed ✓' : 'Mark Complete (+50 XP)'}</span>
            </button>
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-app-ink leading-[1.15]">
            {lesson.title}
          </h1>
          <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-app-muted">
            {lesson.tagline}
          </p>
        </div>

        {/* Quick Lesson Metrics */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs">
          <span className="flex items-center gap-1.5 rounded-lg border border-app-border bg-app-inset px-3 py-1.5 font-mono text-app-muted">
            <Clock className="h-3.5 w-3.5 text-app-amber" />
            {lesson.durationMinutes} min read &amp; lab
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-app-border bg-app-inset px-3 py-1.5 font-mono text-app-muted">
            <Layers className="h-3.5 w-3.5 text-violet-400" />
            Interactive 3D Lab
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-app-border bg-app-inset px-3 py-1.5 font-mono text-app-muted">
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
            Live Code Sandbox
          </span>
        </div>

        {/* Interactive Chapter Stepper Progress Bar */}
        <div className="rounded-xl border border-app-border bg-app-inset p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-app-ink">
                Chapter {chapter.number} Track: {chapter.title}
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-app-amber">
              {completedChapterLessons} / {totalChapterLessons} Lessons Finished ({chapterProgressPercent}%)
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-app-active">
            <div
              className="h-full rounded-full bg-app-amber transition-all duration-500"
              style={{ width: `${chapterProgressPercent}%` }}
            />
          </div>

          {/* Stepper nodes */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar">
            {chapter.lessons.map((chLesson, idx) => {
              const isChDone = !!completedLessons[chLesson.id] || (chLesson.id === lesson.id && isCompleted);
              const isCurrent = chLesson.id === lesson.id;

              return (
                <button
                  key={chLesson.id}
                  type="button"
                  onClick={() => onNavigateLesson(chLesson.id)}
                  title={`Lesson ${chLesson.number}: ${chLesson.title}`}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-mono transition-all ${
                    isCurrent
                      ? 'border-app-amber bg-app-amber text-slate-950 font-black shadow-xs'
                      : isChDone
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold'
                      : 'border-app-border bg-app-surface text-app-muted hover:border-app-border hover:text-app-ink'
                  }`}
                >
                  <span>{isChDone ? '✓' : idx + 1}.</span>
                  <span className="truncate max-w-[120px] sm:max-w-[180px]">{chLesson.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Sticky Section Quick-Nav Ribbon */}
      <nav
        aria-label="Lesson Section Navigation"
        className="sticky top-16 z-20 -mx-2 rounded-xl border border-app-border bg-app-surface/90 backdrop-blur-md px-3 py-2 shadow-sm"
      >
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {sectionTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-app-active text-app-amber border border-app-amber/60 shadow-xs'
                    : 'text-app-muted hover:bg-app-inset hover:text-app-ink border border-transparent'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-app-amber' : 'text-app-subtle'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. Core Objectives */}
      <section id="section-objectives" className="rounded-xl border border-app-border bg-app-surface p-6 space-y-4">
        <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
          <Compass className="h-4 w-4 text-app-amber" />
          Engineering Objectives
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-app-ink">
          {lesson.learningObjectives.map((obj, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-lg border border-app-border bg-app-inset p-3"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-xs font-black">
                ✓
              </span>
              <span className="leading-relaxed font-medium">{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Theory & Core Concepts */}
      <section id="section-theory" className="space-y-6 pt-2">
        <div className="flex items-center justify-between border-b border-app-border pb-4">
          <h2 className="text-xl sm:text-2xl font-black text-app-ink flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-app-amber" />
            Core Concepts &amp; Mental Architecture
          </h2>
          <button
            type="button"
            onClick={() => onOpenTutor(lesson.title)}
            className="flex items-center gap-1.5 rounded-lg border border-app-amber/60 bg-app-active px-3 py-1.5 text-xs font-bold text-app-amber hover:border-app-amber transition-all shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-app-amber" />
            <span>Ask Tutor</span>
          </button>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-app-ink leading-relaxed">
          {lesson.theorySections.map((sec, idx) => (
            <div key={idx} className="space-y-4 rounded-xl border border-app-border bg-app-surface p-6">
              <h3 className="text-lg font-bold text-app-ink">
                {sec.heading}
              </h3>
              <p className="text-app-muted leading-relaxed">
                {sec.content}
              </p>

              {sec.bulletPoints && (
                <ul className="space-y-2 pl-2 text-sm text-app-ink">
                  {sec.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-app-amber" />
                      <span className="leading-relaxed">{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.callout && (
                <div className="rounded-lg border-l-4 border-app-amber bg-app-inset p-4 text-xs sm:text-sm text-app-ink">
                  <strong className="font-bold text-app-amber block mb-1">Key Takeaway:</strong>
                  <span className="text-app-muted">{sec.callout.text}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Real-World Mental Model / Analogy */}
      <section
        id="section-analogy"
        className="rounded-2xl border border-amber-500/30 bg-app-surface p-6 sm:p-8 space-y-4 shadow-sm"
      >
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
          <Lightbulb className="h-4 w-4 text-app-amber" />
          Real-World Intuition · {lesson.realWorldAnalogy.title}
        </div>
        <h3 className="text-xl font-bold text-app-ink">
          {lesson.realWorldAnalogy.concept}
        </h3>
        <p className="rounded-xl border border-app-border bg-app-inset p-4 text-sm sm:text-base leading-relaxed italic text-app-muted">
          "{lesson.realWorldAnalogy.story}"
        </p>
        <div className="flex items-center gap-2 pt-2 border-t border-app-border font-mono text-xs font-bold text-app-amber">
          <Zap className="h-4 w-4" />
          <span>Core Principle: {lesson.realWorldAnalogy.moral}</span>
        </div>
      </section>

      {/* 6. Interactive Visual Explainer */}
      <section id="section-visuals" className="space-y-4">
        <div className="flex items-center justify-between border-b border-app-border pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-app-ink flex items-center gap-2.5">
              <Layers className="h-5 w-5 text-violet-400" />
              Interactive Visual Explainer
            </h2>
            <p className="mt-1 text-xs text-app-muted">
              Interact with the live simulator controls to build visual mental models.
            </p>
          </div>
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-xs font-bold text-violet-400">
            Live Instrument
          </span>
        </div>
        {renderVisualizer()}
      </section>

      {/* 7. Annotated Code Breakdown */}
      <section id="section-code" className="space-y-4">
        <div className="flex items-center justify-between border-b border-app-border pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-app-ink flex items-center gap-2.5">
              <Code2 className="h-5 w-5 text-emerald-400" />
              Annotated Code Breakdown
            </h2>
            <p className="mt-1 text-xs text-app-muted">
              Inspect production-grade code structure with line-by-line architectural breakdown.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenTutor(lesson.codeExample.title, lesson.codeExample.html + '\n' + lesson.codeExample.css)}
            className="flex items-center gap-1.5 rounded-lg border border-app-border bg-app-inset px-3 py-1.5 text-xs font-bold text-app-ink hover:border-app-amber hover:text-app-amber transition-all shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-app-amber" />
            <span>Explain with Tutor</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-app-border bg-slate-950 shadow-xl">
          {/* IDE Segmented Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2">
            <div className="flex items-center gap-1.5">
              {[
                { id: 'html', label: 'index.html', badge: 'HTML5', tone: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
                { id: 'css', label: 'style.css', badge: 'CSS3', tone: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
                { id: 'js', label: 'script.js', badge: 'JS ES6', tone: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCodeTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                    activeCodeTab === tab.id
                      ? 'border border-slate-700 bg-slate-800 text-white shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <span className={`rounded border px-1 text-[9px] font-bold ${tab.tone}`}>
                    {tab.badge}
                  </span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="overflow-x-auto p-5 font-mono text-xs sm:text-sm text-slate-200 bg-slate-950">
            <pre>
              <code>
                {activeCodeTab === 'html' && lesson.codeExample.html}
                {activeCodeTab === 'css' && lesson.codeExample.css}
                {activeCodeTab === 'js' && (lesson.codeExample.js || '// No JavaScript required for this architectural concept')}
              </code>
            </pre>
          </div>

          {/* Line-by-line annotations */}
          <div className="space-y-3 border-t border-slate-800 bg-slate-900/60 p-5">
            <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
              <Terminal className="h-4 w-4 text-emerald-400" />
              Line-by-Line Annotations
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {lesson.codeExample.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between font-mono font-bold text-emerald-400">
                    <span>{item.title}</span>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                      {item.lineRange}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive Practice Sandbox */}
      <section id="section-practice" className="space-y-4">
        <div className="flex items-center justify-between border-b border-app-border pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-app-ink flex items-center gap-2.5">
              <Zap className="h-5 w-5 text-emerald-400" />
              Hands-On Practice Sandbox
            </h2>
            <p className="mt-1 text-xs text-app-muted">
              Solve the coding challenge with live preview and automated verification tests.
            </p>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
            Auto-Evaluated
          </span>
        </div>
        <PracticeSandbox
          challenge={lesson.practice}
          onComplete={() => onCompleteLesson(lesson.id)}
          isCompleted={isCompleted}
        />
      </section>

      {/* 9. Video Masterclass (if present) */}
      {lesson.video && (
        <section id="section-video" className="space-y-4">
          <div className="flex items-center justify-between border-b border-app-border pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-app-ink flex items-center gap-2.5">
                <Tv className="h-5 w-5 text-app-amber" />
                Video Studio &amp; Timestamps
              </h2>
              <p className="mt-1 text-xs text-app-muted">
                Visual walkthrough with synchronized notes and chapter markers.
              </p>
            </div>
            <span className="rounded-full border border-app-amber/30 bg-app-amber/10 px-3 py-1 font-mono text-xs font-bold text-app-amber">
              Video Masterclass
            </span>
          </div>
          <VideoPlayer
            video={lesson.video}
            currentLessonId={lesson.id}
            relatedTopics={lesson.relatedTopics}
            allChapters={allChapters}
            onSelectLesson={onNavigateLesson}
            onJumpToPractice={() => scrollToSection('section-practice')}
            onJumpToVisualLab={() => scrollToSection('section-visuals')}
          />
        </section>
      )}

      {/* 10. Checkpoint Quiz */}
      <section
        id="section-quiz"
        className="rounded-2xl border border-app-border bg-app-surface p-6 sm:p-8 space-y-6 shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-app-border pb-4">
          <div>
            <h2 className="text-xl font-black text-app-ink flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-app-amber" />
              Checkpoint Sprint
            </h2>
            <p className="mt-1 text-xs text-app-muted">
              Verify your architectural understanding before moving to the next concept.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {lesson.quiz.map((q, qIdx) => (
            <div key={q.id} className="space-y-3">
              <p className="text-sm font-bold text-app-ink">
                {qIdx + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedQuizAnswers[q.id] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;
                  let optionClass = 'border-app-border bg-app-inset text-app-ink hover:bg-app-active';

                  if (quizSubmitted) {
                    if (isCorrect) {
                      optionClass = 'border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold ring-1 ring-emerald-500';
                    } else if (isSelected) {
                      optionClass = 'border-red-500 bg-red-500/15 text-red-400 font-medium';
                    }
                  } else if (isSelected) {
                    optionClass = 'border-app-amber bg-app-amber/15 text-app-amber font-bold ring-1 ring-app-amber';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleQuizSelect(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${optionClass}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && <Check className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="rounded-xl border border-app-border bg-app-inset p-3.5 text-xs text-app-ink space-y-1">
                  <strong className="text-app-amber font-bold block">Explanation:</strong>
                  <span className="text-app-muted leading-relaxed">{q.explanation}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-app-border">
          {!quizSubmitted ? (
            <button
              type="button"
              onClick={() => setQuizSubmitted(true)}
              disabled={Object.keys(selectedQuizAnswers).length === 0}
              className="w-full py-3 rounded-xl bg-app-amber hover:bg-app-amber-hover disabled:opacity-50 text-slate-950 font-black text-xs transition-colors shadow-sm"
            >
              Submit Checkpoint Answers (+30 XP)
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSelectedQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="w-full py-3 rounded-xl border border-app-border bg-app-inset text-app-ink hover:bg-app-active text-xs font-bold"
            >
              Retry Quiz Sprint
            </button>
          )}
        </div>
      </section>

      {/* 11. Post-Class Activities & Drills */}
      {(() => {
        const lessonDeck = getActivityDeckForLesson(lesson.id);
        const overallDiff = lessonDeck.overallDifficulty || 'Beginner';
        return (
          <section
            id="section-activities"
            className="rounded-2xl border border-cyan-500/30 bg-app-surface p-6 sm:p-8 space-y-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-400">
                      POST-CLASS DRILLS
                    </span>
                    <DifficultyBadge level={overallDiff} size="sm" />
                    <span className="font-mono text-[11px] font-bold text-app-amber">+120 XP</span>
                  </div>
                  <h2 className="text-xl font-bold text-app-ink mt-1">
                    Reinforce Memory with Interactive Drills
                  </h2>
                </div>
              </div>

              {onNavigateActivities && (
                <button
                  type="button"
                  onClick={() => onNavigateActivities(lesson.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs px-4 py-2.5 shadow-sm transition-all"
                >
                  <span>Launch Full Activity Deck</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-app-muted leading-relaxed">
              Lock in your memory for <strong>Lesson {lesson.number}</strong> with active recall flashcards, spot-the-bug puzzles, and rapid sprint checks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="rounded-xl border border-app-border bg-app-inset p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-app-ink">
                  <span className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-app-amber" />
                    Recall Cards
                  </span>
                  <DifficultyBadge level={lessonDeck.flashcards[0]?.difficulty || 'Beginner'} size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-app-muted">
                  Flip 5 active recall flashcards to solidify key syntax and rules.
                </p>
              </div>

              <div className="rounded-xl border border-app-border bg-app-inset p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-app-ink">
                  <span className="flex items-center gap-1.5">
                    <Bug className="h-3.5 w-3.5 text-emerald-400" />
                    Bug Hunter
                  </span>
                  <DifficultyBadge level={lessonDeck.bugHunt.difficulty === 'Hard' ? 'Advanced' : lessonDeck.bugHunt.difficulty === 'Medium' ? 'Intermediate' : 'Beginner'} size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-app-muted">
                  Debug and fix broken code in live interactive IDE.
                </p>
              </div>

              <div className="rounded-xl border border-app-border bg-app-inset p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-app-ink">
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-cyan-400" />
                    Speed Sprint
                  </span>
                  <DifficultyBadge level={lessonDeck.speedQuiz[0]?.difficulty || 'Intermediate'} size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-app-muted">
                  Fast-paced rapid questions to evaluate concept retention.
                </p>
              </div>
            </div>
          </section>
        );
      })()}

      {/* 12. Student Notes Scratchpad */}
      <section id="section-notes" className="rounded-xl border border-app-border bg-app-surface p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-app-ink flex items-center gap-2">
            <FileEdit className="h-4 w-4 text-app-amber" />
            Engineering Scratchpad &amp; Notes
          </h3>
          <button
            type="button"
            onClick={handleSaveNote}
            className="flex items-center gap-1.5 rounded-lg bg-app-amber px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-app-amber-hover transition-all shadow-xs"
          >
            {noteSaved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            <span>{noteSaved ? 'Saved!' : 'Save Note'}</span>
          </button>
        </div>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Jot down architectural takeaways, syntax cheatsheets, or personal doubts..."
          className="w-full h-24 p-3.5 text-xs rounded-xl border border-app-border bg-app-inset text-app-ink outline-none focus:border-app-amber focus:ring-1 focus:ring-app-amber resize-none font-mono"
        />
      </section>

      {/* 13. Summary & Key Takeaways */}
      <section id="section-summary" className="rounded-xl border border-emerald-500/30 bg-app-surface p-6 space-y-3">
        <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          Lesson Summary &amp; Key Takeaways
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-app-ink">
          {lesson.summary.map((sum, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span className="leading-relaxed">{sum}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 14. Chapter Navigation Footer */}
      <nav
        aria-label="Next and Previous Lessons"
        className="flex flex-wrap items-center justify-between gap-4 border-t border-app-border pt-8"
      >
        {prevLesson ? (
          <button
            type="button"
            onClick={() => onNavigateLesson(prevLesson.id)}
            className="flex items-center gap-3 rounded-xl border border-app-border bg-app-surface px-4 py-3 text-left transition-all hover:border-app-amber hover:bg-app-active"
          >
            <ChevronLeft className="h-5 w-5 text-app-subtle" />
            <div>
              <span className="font-mono text-[10px] text-app-subtle block">Previous Lesson</span>
              <span className="text-xs font-bold text-app-ink">{prevLesson.title}</span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <button
            type="button"
            onClick={() => onNavigateLesson(nextLesson.id)}
            className="flex items-center gap-3 rounded-xl bg-app-amber px-5 py-3 text-right text-slate-950 transition-all hover:bg-app-amber-hover shadow-sm"
          >
            <div>
              <span className="font-mono text-[10px] font-bold uppercase opacity-80 block">Next Lesson</span>
              <span className="text-xs font-black">{nextLesson.title}</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onCompleteLesson(lesson.id)}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-3 text-slate-950 font-black text-xs shadow-sm transition-all"
          >
            <span>Finish Chapter Masterclass</span>
            <CheckCircle2 className="h-4 w-4" />
          </button>
        )}
      </nav>
    </article>
  );
};
