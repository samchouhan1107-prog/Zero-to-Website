import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Check,
  Code2,
  Tv,
  Layers,
  BookOpen,
  ArrowRight,
  FileEdit,
  Save,
  Clock,
  Compass,
  Copy,
  Terminal,
  Zap,
  Award,
  TrendingUp,
  Printer,
  GraduationCap,
  Bug,
} from 'lucide-react';
import { Lesson, Chapter } from '../types';
import { BoxModelVisualizer } from './Visualizers/BoxModelVisualizer';
import { FlexboxVisualizer } from './Visualizers/FlexboxVisualizer';
import { GridVisualizer } from './Visualizers/GridVisualizer';
import { DomTreeVisualizer } from './Visualizers/DomTreeVisualizer';
import { GitFlowVisualizer } from './Visualizers/GitFlowVisualizer';
import { NetworkFlowVisualizer } from './Visualizers/NetworkFlowVisualizer';
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

  // Find previous and next lessons
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
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
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
    { id: 'section-visuals', label: 'Diagram', icon: Layers },
    { id: 'section-code', label: 'Code', icon: Code2 },
    { id: 'section-video', label: 'Video Studio', icon: Tv },
    { id: 'section-practice', label: 'Sandbox', icon: Zap },
    { id: 'section-quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'section-activities', label: 'Activities', icon: GraduationCap },
    { id: 'section-notes', label: 'Notes', icon: FileEdit },
  ];

  const handlePrintLesson = () => {
    window.print();
  };

  return (
    <article id={`lesson-${lesson.id}`} className="max-w-5xl mx-auto px-6 sm:px-10 py-10 sm:py-14 space-y-12">
      {/* Printable Document Header (Visible only on Print / PDF) */}
      <div className="hidden print-header-banner">
        <span>WEBZONE FULL-STACK ACADEMY • OFFLINE STUDY GUIDE</span>
        <span>CHAPTER {chapter.number}: {chapter.title.toUpperCase()}</span>
      </div>

      {/* 1. Spacious Hero Lesson Header Card */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-[#0b0d13] border border-slate-800 dark:border-[#1a1e2a] p-8 sm:p-12 text-white shadow-2xl">
        {/* Ambient Glow Gradients matching Home Hero */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-12 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 dark:text-cyan-400 border border-indigo-500/30">
                Chapter {chapter.number}
              </span>
              <span className="text-xs font-mono text-slate-400">/</span>
              <span className="text-xs font-mono font-semibold text-slate-300">Lesson {lesson.number}</span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Print / Save PDF Button */}
              <button
                onClick={handlePrintLesson}
                className="p-2.5 sm:px-3.5 rounded-xl border border-slate-700 dark:border-[#1f2536] bg-slate-800/80 dark:bg-[#141722] text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                title="Print lesson or save as PDF for offline study"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={() => onToggleBookmark(lesson.id)}
                className={`p-2.5 sm:px-4 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-xs'
                    : 'bg-slate-800/80 dark:bg-[#141722] border-slate-700 dark:border-[#1f2536] text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400/20" /> : <Bookmark className="w-4 h-4" />}
                <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </button>

              <button
                onClick={() => onCompleteLesson(lesson.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-amber-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2]">
              {lesson.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-3xl">
              {lesson.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/70 dark:bg-[#141722] border border-slate-700/60 dark:border-[#1f2536] font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> {lesson.durationMinutes} min read
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/70 dark:bg-[#141722] border border-slate-700/60 dark:border-[#1f2536] font-medium">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> Interactive Visuals
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/70 dark:bg-[#141722] border border-slate-700/60 dark:border-[#1f2536] font-medium">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Live Sandbox
            </span>
          </div>

          {/* Chapter Visual Progress Bar */}
          <div id="chapter-progress-bar" className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 dark:bg-[#07090e]/80 border border-slate-700/50 dark:border-[#1f2536] shadow-xs space-y-3 mt-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-xl ${isChapterFullyCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {isChapterFullyCompleted ? <Award className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                </div>
                <div>
                  <h2 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                    <span>Chapter {chapter.number} Progress</span>
                    <span className="text-slate-500 font-normal">•</span>
                    <span className="text-slate-300 font-medium normal-case truncate max-w-[200px] sm:max-w-none">
                      {chapter.title}
                    </span>
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                  isChapterFullyCompleted
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                }`}>
                  {completedChapterLessons} of {totalChapterLessons} Lessons ({chapterProgressPercent}%)
                </span>
              </div>
            </div>

            {/* Visual Track */}
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700/60 shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-500 relative ${
                  isChapterFullyCompleted
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/40'
                    : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-sm shadow-amber-500/40'
                }`}
                style={{ width: `${chapterProgressPercent}%` }}
              >
                {chapterProgressPercent > 10 && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                )}
              </div>
            </div>

            {/* Interactive Lesson Mini Step Nodes */}
            <div className="pt-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {chapter.lessons.map((chLesson, idx) => {
                const isChCompleted = !!completedLessons[chLesson.id] || (chLesson.id === lesson.id && isCompleted);
                const isCurrent = chLesson.id === lesson.id;

                return (
                  <button
                    key={chLesson.id}
                    id={`progress-lesson-step-${chLesson.id}`}
                    onClick={() => onNavigateLesson(chLesson.id)}
                    title={`Lesson ${chLesson.number}: ${chLesson.title} (${isChCompleted ? 'Completed' : isCurrent ? 'Current' : 'Upcoming'})`}
                    className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-xs font-black'
                        : isChCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                        : 'bg-slate-800/80 text-slate-400 border border-slate-700/50 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black">
                      {isChCompleted ? '✓' : idx + 1}
                    </span>
                    <span className="truncate max-w-[120px] sm:max-w-[180px]">{chLesson.title}</span>
                    {isCurrent && (
                      <span className="text-[9px] px-1 py-0.2 rounded-full bg-slate-950/20 text-slate-950 uppercase font-black">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Sticky Section Tab Bar */}
      <nav aria-label="Lesson Outline Tabs" className="sticky top-[58px] z-20 -mx-2 px-2 py-2 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {sectionTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/40 ring-1 ring-indigo-400'
                    : 'bg-slate-100/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 2. Learning Objectives */}
      <section id="section-objectives" className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-cyan-500/5 to-transparent border border-indigo-200/70 dark:border-indigo-900/40 space-y-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-cyan-400 flex items-center gap-2">
          <Compass className="w-4 h-4" />
          Core Learning Objectives
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
          {lesson.learningObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2 bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                ✓
              </span>
              <span className="font-medium">{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Theory & Core Concepts */}
      <section id="section-theory" className="space-y-6 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
            Core Concepts & Theory
          </h2>
          <button
            onClick={() => onOpenTutor(lesson.title)}
            className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:brightness-105 flex items-center gap-1.5 font-bold cursor-pointer transition-all shadow-xs"
            title="Ask 24/7 Tutor about this lesson"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" /> Ask Tutor
          </button>
        </div>

        <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {lesson.theorySections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {sec.heading}
              </h3>
              <p>{sec.content}</p>

              {sec.bulletPoints && (
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 dark:text-slate-300">
                  {sec.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx}>{bp}</li>
                  ))}
                </ul>
              )}

              {sec.callout && (
                <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border-l-4 border-indigo-500 text-xs text-indigo-950 dark:text-indigo-200 font-medium">
                  <strong className="text-indigo-600 dark:text-cyan-400 font-bold">Key Takeaway:</strong> {sec.callout.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Real-World Analogy */}
      <section id="section-analogy" className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-transparent border border-amber-300/80 dark:border-amber-900/50 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-black text-xs uppercase tracking-wider">
          <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          Real-World Mental Model • {lesson.realWorldAnalogy.title}
        </div>
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
          {lesson.realWorldAnalogy.concept}
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic bg-white/50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
          "{lesson.realWorldAnalogy.story}"
        </p>
        <div className="pt-2 border-t border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 font-bold flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> Core Principle: {lesson.realWorldAnalogy.moral}
        </div>
      </section>

      {/* 5. Interactive Visual Diagram */}
      <section id="section-visuals" className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            Interactive Visual Explainer
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-mono font-bold uppercase">
            Live Simulator
          </span>
        </div>
        {renderVisualizer()}
      </section>

      {/* 6. Upgraded Annotated Code Breakdown with IDE Tabs */}
      <section id="section-code" className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
            Annotated Code Breakdown
          </h2>
          <button
            onClick={() => onOpenTutor(lesson.codeExample.title, lesson.codeExample.html + '\n' + lesson.codeExample.css)}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-mono flex items-center gap-1.5 cursor-pointer font-bold transition-all shadow-xs"
            title="Ask 24/7 Tutor to explain this code snippet"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" /> Explain with Tutor
          </button>
        </div>

        <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          {/* IDE Segmented Tabs */}
          <div className="flex items-center justify-between px-3 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-1.5 py-1.5">
              {[
                { id: 'html', label: 'index.html', badge: 'HTML5', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
                { id: 'css', label: 'style.css', badge: 'CSS3', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
                { id: 'js', label: 'script.js', badge: 'JS ES6', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCodeTab(tab.id as any)}
                  className={`text-xs font-mono font-bold py-1.5 px-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
                    activeCodeTab === tab.id
                      ? 'bg-slate-800 text-white shadow-xs border border-slate-700 ring-1 ring-white/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span className={`text-[9px] px-1 rounded border font-mono font-extrabold ${tab.color}`}>
                    {tab.badge}
                  </span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyCode}
              className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy code snippet"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-4 font-mono text-xs text-slate-100 overflow-x-auto bg-slate-950">
            <pre>
              <code>
                {activeCodeTab === 'html' && lesson.codeExample.html}
                {activeCodeTab === 'css' && lesson.codeExample.css}
                {activeCodeTab === 'js' && (lesson.codeExample.js || '// No JavaScript needed for this foundational concept')}
              </code>
            </pre>
          </div>

          {/* Breakdown Notes */}
          <div className="p-4 bg-slate-900/80 border-t border-slate-800 space-y-2.5">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Line-by-Line Annotations
            </h4>
            <div className="space-y-2">
              {lesson.codeExample.breakdown.map((item, idx) => (
                <div key={idx} className="text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-indigo-400 dark:text-cyan-300 font-mono font-bold">
                    <span>{item.title}</span>
                    <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">{item.lineRange}</span>
                  </div>
                  <p className="text-slate-300 mt-1 leading-relaxed">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Video Masterclass */}
      <section id="section-video" className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Tv className="w-5 h-5 text-red-500" />
            Video Masterclass & Synchronized Notes
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-mono font-bold uppercase">
            Audio Studio
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

      {/* 8. Interactive Practice Sandbox */}
      <section id="section-practice" className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
            Hands-On Practice Sandbox
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold uppercase">
            Auto-Evaluated
          </span>
        </div>
        <PracticeSandbox
          challenge={lesson.practice}
          onComplete={() => onCompleteLesson(lesson.id)}
          isCompleted={isCompleted}
        />
      </section>

      {/* 9. Knowledge Checkpoint Quiz */}
      <section id="section-quiz" className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              Checkpoint Quiz
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Test your mastery of this lesson before advancing to the next topic.</p>
          </div>
        </div>

        <div className="space-y-6">
          {lesson.quiz.map((q, qIdx) => (
            <div key={q.id} className="space-y-3">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {qIdx + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedQuizAnswers[q.id] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;
                  let optionClass = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750';

                  if (quizSubmitted) {
                    if (isCorrect) {
                      optionClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
                    } else if (isSelected) {
                      optionClass = 'border-red-500 bg-red-50 dark:bg-red-950/70 text-red-800 dark:text-red-200';
                    }
                  } else if (isSelected) {
                    optionClass = 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-200 font-bold ring-2 ring-indigo-500/70';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleQuizSelect(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${optionClass}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <p className="text-xs text-indigo-950 dark:text-indigo-200 bg-indigo-50/80 dark:bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 font-medium">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="pt-2">
          {!quizSubmitted ? (
            <button
              onClick={() => setQuizSubmitted(true)}
              disabled={Object.keys(selectedQuizAnswers).length === 0}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs transition-colors shadow-md shadow-indigo-500/30 cursor-pointer"
            >
              Submit Checkpoint Answers
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer"
            >
              Retry Quiz
            </button>
          )}
        </div>
      </section>

      {/* 9.5 Post-Class Activities & Practice Hub */}
      {(() => {
        const lessonDeck = getActivityDeckForLesson(lesson.id);
        const overallDiff = lessonDeck.overallDifficulty || 'Beginner';
        return (
          <section
            id="section-activities"
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-indigo-500/10 border border-emerald-400/40 dark:border-emerald-700/40 space-y-5 shadow-lg"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <GraduationCap className="w-6 h-6 text-emerald-400" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Post-Class Mastery
                    </span>
                    <DifficultyBadge level={overallDiff} size="sm" />
                    <span className="text-[10px] font-bold text-amber-400">+120 XP Available</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                    Post-Class Activities & Practice Lab
                  </h2>
                </div>
              </div>

              {onNavigateActivities && (
                <button
                  onClick={() => onNavigateActivities(lesson.id)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer group"
                >
                  <span>Launch Full Activity Deck</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Reinforce everything you just learned in <strong>Lesson {lesson.number}</strong> with active recall flashcards, bug hunting puzzles, and code sequencing exercises.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#090d16] border border-emerald-200/80 dark:border-[#1c2438] space-y-1">
                <div className="flex items-center justify-between gap-1 text-xs font-bold text-slate-900 dark:text-white">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>🗂️ Active Recall Cards</span>
                  </div>
                  <DifficultyBadge level={lessonDeck.flashcards[0]?.difficulty || 'Beginner'} size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Flip through 5 key concept and syntax flashcards to lock in memory.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#090d16] border border-emerald-200/80 dark:border-[#1c2438] space-y-1">
                <div className="flex items-center justify-between gap-1 text-xs font-bold text-slate-900 dark:text-white">
                  <div className="flex items-center gap-2">
                    <Bug className="w-3.5 h-3.5 text-emerald-400" />
                    <span>🐛 Bug Hunter Puzzle</span>
                  </div>
                  <DifficultyBadge level={lessonDeck.bugHunt.difficulty === 'Hard' ? 'Advanced' : lessonDeck.bugHunt.difficulty === 'Medium' ? 'Intermediate' : 'Beginner'} size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Spot and fix the deliberate syntax error in live code editor.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#090d16] border border-emerald-200/80 dark:border-[#1c2438] space-y-1">
                <div className="flex items-center justify-between gap-1 text-xs font-bold text-slate-900 dark:text-white">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>⚡ Speed Recall Sprint</span>
                  </div>
                  <DifficultyBadge level={lessonDeck.speedQuiz[0]?.difficulty || 'Intermediate'} size="sm" showIcon={false} />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Fast-paced rapid check to verify concept retention before moving on.
                </p>
              </div>
            </div>

            {onNavigateActivities && (
              <div className="pt-1 flex items-center justify-between border-t border-emerald-500/20 text-xs">
                <span className="text-emerald-800 dark:text-emerald-300 font-bold">
                  Ready to practice?
                </span>
                <button
                  onClick={() => onNavigateActivities(lesson.id)}
                  className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Start Lesson Activities ➔
                </button>
              </div>
            )}
          </section>
        );
      })()}

      {/* 10. Student Notes Drawer */}
      <section id="section-notes" className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileEdit className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
            My Lesson Notes
          </h3>
          <button
            onClick={handleSaveNote}
            className="text-xs px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 flex items-center gap-1.5 font-bold transition-all shadow-xs cursor-pointer"
          >
            {noteSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {noteSaved ? 'Saved!' : 'Save Note'}
          </button>
        </div>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write down personal notes, syntax cheat notes, or questions here..."
          className="w-full h-24 p-3.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none font-mono"
        />
      </section>

      {/* 11. Key Takeaways & Summary */}
      <section id="section-summary" className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-300/80 dark:border-emerald-900/40 space-y-3 shadow-xs">
        <h2 className="text-base font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          Lesson Summary & Key Takeaways
        </h2>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200 font-medium">
          {lesson.summary.map((sum, i) => (
            <li key={i}>{sum}</li>
          ))}
        </ul>
      </section>

      {/* 12. Related Topics Reference */}
      {lesson.relatedTopics.length > 0 && (
        <section id="section-related" className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            Related Curriculum References
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.relatedTopics.map((rel, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs shadow-xs hover:border-indigo-400/50 transition-colors">
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{rel.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                    Ch {rel.chapterNumber}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-[11px] leading-snug">{rel.context}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 13. Navigation Buttons (Previous / Next) */}
      <nav aria-label="Lesson Navigation" className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {prevLesson ? (
          <button
            onClick={() => onNavigateLesson(prevLesson.id)}
            className="text-xs px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-normal">Previous Lesson</div>
              <span>{prevLesson.title}</span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <button
            onClick={() => onNavigateLesson(nextLesson.id)}
            className="text-xs px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center gap-2 shadow-md shadow-indigo-500/30 cursor-pointer transition-all"
          >
            <div className="text-right">
              <div className="text-[10px] opacity-80 font-normal">Next Lesson</div>
              <span>{nextLesson.title}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onCompleteLesson(lesson.id)}
            className="text-xs px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-2 shadow-md shadow-emerald-500/30 cursor-pointer transition-all"
          >
            <span>Finish Chapter</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </nav>

      {/* Printable Document Footer (Visible only on Print / PDF) */}
      <div className="hidden print-footer-banner">
        <span>Lesson {lesson.number}: {lesson.title} • WebZone Curriculum</span>
        <span>Generated for offline studying</span>
      </div>
    </article>
  );
};
