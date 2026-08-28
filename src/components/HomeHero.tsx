import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Play,
  Code2,
  Layers,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  Compass,
  Clock,
  Check,
  Zap,
  Terminal,
  BrainCircuit,
  GraduationCap,
} from 'lucide-react';
import { Chapter, UserProgress } from '../types';

interface HomeHeroProps {
  chapters: Chapter[];
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  onOpenPracticeHub: () => void;
  onOpenVisualLab: () => void;
  onOpenActivities?: () => void;
  onOpenTutor: () => void;
  onOpenMilestones: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  chapters,
  progress,
  onSelectLesson,
  onOpenPracticeHub,
  onOpenVisualLab,
  onOpenActivities,
  onOpenTutor,
  onOpenMilestones,
}) => {
  const allLessons = chapters.flatMap((c) => c.lessons);
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / (allLessons.length || 1)) * 100);

  // Resume last visited or first incomplete lesson
  const nextIncompleteLesson = allLessons.find((l) => !progress.completedLessons[l.id]) || allLessons[0];
  const nextChapter = chapters.find((c) => c.lessons.some((l) => l.id === nextIncompleteLesson?.id)) || chapters[0];

  return (
    <div id="home-dashboard" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 sm:py-16 space-y-16 sm:space-y-20">
      
      {/* 1. Spacious Hero Presentation */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-[#0b0d13] border border-slate-800 dark:border-[#1a1e2a] p-8 sm:p-14 lg:p-16 text-white shadow-2xl">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider bg-amber-400/15 text-amber-300 dark:text-yellow-400 border border-amber-400/30 flex items-center gap-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Complete Web Engineering Curriculum
            </span>
            <span className="text-xs font-mono text-slate-400 bg-slate-800/60 dark:bg-[#141722] px-3.5 py-1.5 rounded-full border border-slate-700/50 dark:border-[#1f2536]">
              {chapters.length} Chapters • {allLessons.length} Interactive Lessons
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Master Modern <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 dark:from-yellow-400 dark:via-amber-300 dark:to-yellow-200">
                Web Development
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 leading-relaxed max-w-3xl pt-2">
              An interactive textbook engineered for deep comprehension. Learn HTML, CSS layout engines, JavaScript fundamentals, responsive paradigms, and modern component architecture with real-time 3D models and instant code sandboxes.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onSelectLesson(nextIncompleteLesson.id)}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center gap-2.5 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-slate-950" />
              {completedCount > 0 ? `Resume: ${nextIncompleteLesson.title}` : 'Start First Lesson'}
            </button>

            <button
              onClick={onOpenPracticeHub}
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 dark:bg-[#141722] hover:bg-slate-800 dark:hover:bg-[#1a1e2a] text-slate-200 font-bold text-sm flex items-center gap-2 border border-slate-700 dark:border-[#1f2536] hover:border-slate-500 transition-all cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              Coding Arena
            </button>

            <button
              onClick={onOpenVisualLab}
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 dark:bg-[#141722] hover:bg-slate-800 dark:hover:bg-[#1a1e2a] text-slate-200 font-bold text-sm flex items-center gap-2 border border-slate-700 dark:border-[#1f2536] hover:border-slate-500 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-400 dark:text-yellow-400" />
              Visual Lab
            </button>

            {onOpenActivities && (
              <button
                onClick={onOpenActivities}
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 dark:bg-[#141722] hover:bg-slate-800 dark:hover:bg-[#1a1e2a] text-indigo-300 font-bold text-sm flex items-center gap-2 border border-indigo-700/60 hover:border-indigo-500 transition-all cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                Activities Hub
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Spacious Up Next Focus Card */}
      {nextIncompleteLesson && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#0d0f15] border border-slate-200/90 dark:border-[#1a1e2a] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-yellow-400 bg-amber-100 dark:bg-yellow-400/10 px-2.5 py-0.5 rounded-md border border-amber-300/40 dark:border-yellow-400/30">
                Recommended Next Step
              </span>
              <span className="text-xs text-slate-400">Chapter {nextChapter?.number}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {nextIncompleteLesson.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Continue your structured path through {nextChapter?.title}. Includes live code sandboxes, visual breakdown, and self-assessment quiz.
            </p>
          </div>

          <button
            onClick={() => onSelectLesson(nextIncompleteLesson.id)}
            className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-md"
          >
            <span>Jump to Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      )}

      {/* 3. Spacious Stats & Mastery Rhythm Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0d0f15] border border-slate-200/90 dark:border-[#1a1e2a] shadow-xs space-y-4">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Curriculum Progress</span>
            <Award className="w-4 h-4 text-amber-500 dark:text-yellow-400" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">{progressPercent}%</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{completedCount} of {allLessons.length} Completed</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-[#1a1e2a] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0d0f15] border border-slate-200/90 dark:border-[#1a1e2a] shadow-xs space-y-4">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-orange-500 fill-current" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-black text-orange-600 dark:text-orange-400 font-mono">{progress.streakDays} Days</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Active Rhythm</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Complete any quiz or challenge daily for +25 XP</p>
        </div>

        <div
          onClick={onOpenMilestones}
          className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0d0f15] border border-slate-200/90 dark:border-[#1a1e2a] shadow-xs cursor-pointer hover:border-amber-400 dark:hover:border-yellow-400/80 hover:shadow-md transition-all group space-y-4"
          title="Click to view full XP Milestones & Level Roadmap"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Mastery Experience</span>
            <Sparkles className="w-4 h-4 text-amber-500 dark:text-yellow-400 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-black text-amber-600 dark:text-yellow-400 font-mono">{progress.xpPoints} XP</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Level {Math.floor(progress.xpPoints / 100) + 1}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-amber-700 dark:text-yellow-400 font-bold group-hover:underline">
            <span>Milestones Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <div
          onClick={onOpenTutor}
          className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0d0f15] border border-slate-200/90 dark:border-[#1a1e2a] shadow-xs cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500/80 hover:shadow-md transition-all group space-y-4"
          title="Click to open 24/7 Web Dev Tutor"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>24/7 AI Code Tutor</span>
            <BrainCircuit className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-black text-slate-900 dark:text-white">Online</span>
            <span className="text-xs text-emerald-500 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Always Ready
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-bold group-hover:underline">
            <span>Ask Tutor Questions</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </section>

      {/* 4. Interactive Learning Pillars */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Designed for Deep Retention
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Combine three interactive paradigms to build real developer muscle memory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-7 rounded-2xl bg-white dark:bg-[#0d0f15] border border-slate-200/90 dark:border-[#1a1e2a] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-yellow-400/10 text-amber-800 dark:text-yellow-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">3D Spatial Visualizers</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore the CSS Box Model, Flexbox axis physics, and the DOM tree as rotatable 3D mental models.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white dark:bg-[#0d0f15] border border-slate-200/90 dark:border-[#1a1e2a] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Live Code Arena</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Type HTML, CSS, and JS into synchronized browser previews with instant console logging and validation.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white dark:bg-[#0d0f15] border border-slate-200/90 dark:border-[#1a1e2a] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">24/7 AI Code Mentor</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Highlight confusing lines, generate tailored practice quizzes, and get step-by-step code explanations.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Complete Curriculum Roadmap Grid */}
      <section className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#1a1e2a]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Compass className="w-7 h-7 text-amber-500 dark:text-yellow-400" />
              Curriculum Roadmap
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select any chapter below to explore interactive lessons, diagrams, and coding sandboxes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {chapters.map((chapter) => {
            const completedInChapter = chapter.lessons.filter((l) => progress.completedLessons[l.id]).length;
            const isAllDone = completedInChapter === chapter.lessons.length && chapter.lessons.length > 0;

            return (
              <div
                key={chapter.id}
                className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#0d0f15] border border-slate-200/90 dark:border-[#1a1e2a] hover:border-amber-400 dark:hover:border-yellow-400/60 hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1a1e2a]">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-amber-100 dark:bg-yellow-400/10 text-amber-800 dark:text-yellow-400 border border-amber-300/40 dark:border-yellow-400/30">
                      CHAPTER {chapter.number}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
                      {completedInChapter}/{chapter.lessons.length} Completed
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">
                    {chapter.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {chapter.description}
                  </p>
                </div>

                {/* Lesson List within Card */}
                <div className="space-y-2 pt-2">
                  {chapter.lessons.map((lesson) => {
                    const isLessonDone = progress.completedLessons[lesson.id];
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson.id)}
                        className="w-full text-left p-3 sm:p-3.5 rounded-xl border border-slate-100 dark:border-[#1a1e2a] bg-slate-50/70 dark:bg-[#07090e] hover:bg-amber-50/70 dark:hover:bg-yellow-400/10 hover:border-amber-300 dark:hover:border-yellow-400/40 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 truncate pr-2">
                          <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 group-hover:text-amber-600 dark:group-hover:text-yellow-400">
                            {lesson.number}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 truncate group-hover:text-slate-950 dark:group-hover:text-white">
                            {lesson.title}
                          </span>
                        </div>
                        {isLessonDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
