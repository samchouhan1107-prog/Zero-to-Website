import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Tv,
  Layers,
  Sparkles,
  Flame,
  Award,
  Search,
  X,
  Compass,
  ChevronsUpDown,
  Shield,
  Zap,
  GraduationCap,
} from 'lucide-react';
import { Chapter, UserProgress } from '../types';
import { WebZoneBrandLogo } from './WebZoneBrandLogo';

interface SidebarProps {
  chapters: Chapter[];
  currentLessonId?: string;
  onSelectLesson: (lessonId: string) => void;
  progress: UserProgress;
  isOpen: boolean;
  onCloseMobile: () => void;
  onOpenPracticeHub: () => void;
  onOpenVisualLab: () => void;
  onOpenActivities?: () => void;
  onOpenMilestones: () => void;
  onOpenTutor?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chapters,
  currentLessonId,
  onSelectLesson,
  progress,
  isOpen,
  onCloseMobile,
  onOpenPracticeHub,
  onOpenVisualLab,
  onOpenActivities,
  onOpenMilestones,
  onOpenTutor,
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'ch-00': true,
    'ch-01': true,
    'ch-02': true,
    'ch-03': true,
    'ch-04': true,
  });
  const [filterQuery, setFilterQuery] = useState('');

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const toggleAllChapters = () => {
    const anyCollapsed = chapters.some((c) => !expandedChapters[c.id]);
    const newState: Record<string, boolean> = {};
    chapters.forEach((c) => {
      newState[c.id] = anyCollapsed;
    });
    setExpandedChapters(newState);
  };

  const totalLessons = chapters.flatMap((c) => c.lessons).length;
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / (totalLessons || 1)) * 100);

  const filteredChapters = chapters
    .map((chapter) => {
      const matchingLessons = chapter.lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
          chapter.title.toLowerCase().includes(filterQuery.toLowerCase())
      );
      return { ...chapter, lessons: matchingLessons };
    })
    .filter((c) => c.lessons.length > 0 || c.title.toLowerCase().includes(filterQuery.toLowerCase()));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
        />
      )}

      <aside
        id="curriculum-sidebar"
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 bg-white dark:bg-[#0d0f15] border-r border-slate-200 dark:border-[#1a1e2a] flex flex-col z-50 transition-transform duration-300 shadow-xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 dark:border-[#1a1e2a] flex items-center justify-between bg-slate-50/70 dark:bg-[#0a0b10]">
          <div className="flex items-center gap-2">
            <WebZoneBrandLogo size="sm" showSubtitle={true} />
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20">
              STUDIO
            </span>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Action Navigation Hub */}
        <div className="p-3 border-b border-slate-200 dark:border-[#1a1e2a] grid grid-cols-3 gap-1.5 bg-slate-100/60 dark:bg-[#07090e]">
          <button
            onClick={() => {
              onOpenPracticeHub();
              onCloseMobile();
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-[#1f2536] bg-white dark:bg-[#10131d] text-left hover:border-emerald-500 hover:shadow-xs transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
              <Code2 className="w-3 h-3 text-emerald-500 group-hover:scale-110 transition-transform" />
              Practice
            </div>
            <span className="text-[9px] text-slate-500 dark:text-slate-400">Sandbox</span>
          </button>

          <button
            onClick={() => {
              onOpenVisualLab();
              onCloseMobile();
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-[#1f2536] bg-white dark:bg-[#10131d] text-left hover:border-amber-500 dark:hover:border-yellow-400 hover:shadow-xs transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-yellow-400">
              <Layers className="w-3 h-3 text-amber-500 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
              Visual
            </div>
            <span className="text-[9px] text-slate-500 dark:text-slate-400">3D Models</span>
          </button>

          {onOpenActivities && (
            <button
              onClick={() => {
                onOpenActivities();
                onCloseMobile();
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-[#1f2536] bg-white dark:bg-[#10131d] text-left hover:border-indigo-500 hover:shadow-xs transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                <GraduationCap className="w-3 h-3 text-indigo-500 group-hover:scale-110 transition-transform" />
                Activities
              </div>
              <span className="text-[9px] text-slate-500 dark:text-slate-400">After Class</span>
            </button>
          )}
        </div>

        {/* Course Progress & Daily Streak Widget */}
        <div
          onClick={() => {
            onOpenMilestones();
            onCloseMobile();
          }}
          className="p-3 mx-3 my-2.5 rounded-xl bg-slate-50 dark:bg-[#10131d] border border-slate-200 dark:border-[#1f2536] cursor-pointer hover:border-amber-400 dark:hover:border-yellow-400/80 hover:shadow-md transition-all group"
          title="Click to view XP Milestones & Level Roadmap"
        >
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400 group-hover:rotate-12 transition-transform" />
              <span>Progress & Mastery</span>
            </span>
            <span className="font-mono text-amber-600 dark:text-yellow-400 font-extrabold">{progressPercent}%</span>
          </div>

          <div className="w-full h-2 bg-slate-200 dark:bg-[#1c2230] rounded-full mt-2 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-600 dark:text-slate-300 mt-2 font-medium">
            <span>{completedCount} of {totalLessons} Lessons</span>
            <div className="flex items-center gap-1.5 font-bold font-mono">
              <span className="flex items-center gap-0.5 text-orange-600 dark:text-orange-400">
                <Flame className="w-3 h-3 fill-current text-orange-500" /> {progress.streakDays}d
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-0.5 text-amber-600 dark:text-yellow-400">
                {progress.xpPoints} XP
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Collapse Controls */}
        <div className="px-3 pb-2 flex items-center gap-1.5">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search chapters or topics..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-[#1f2536] bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 outline-none focus:border-amber-400 dark:focus:border-yellow-400/80 transition-all placeholder:text-slate-400"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={toggleAllChapters}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-[#1f2536] text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-[#07090e] hover:bg-slate-100 dark:hover:bg-[#10131d] cursor-pointer"
            title="Expand/Collapse All Chapters"
          >
            <ChevronsUpDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Chapter List */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-2 text-xs scrollbar-thin">
          {filteredChapters.map((chapter) => {
            const isExpanded = expandedChapters[chapter.id];
            const chapterCompletedCount = chapter.lessons.filter((l) => progress.completedLessons[l.id]).length;
            const isChapterAllDone = chapterCompletedCount === chapter.lessons.length && chapter.lessons.length > 0;

            return (
              <div
                key={chapter.id}
                className="rounded-xl border border-slate-200/90 dark:border-[#1a1e2a] overflow-hidden bg-white dark:bg-[#0d0f15] transition-all"
              >
                {/* Chapter Title Bar */}
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className={`w-full text-left p-2.5 flex items-center justify-between transition-colors cursor-pointer ${
                    isExpanded
                      ? 'bg-slate-100/90 dark:bg-[#141722] text-slate-900 dark:text-white font-bold'
                      : 'bg-white dark:bg-[#0d0f15] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#12151e]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-yellow-400/15 text-amber-800 dark:text-yellow-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border border-amber-300/40 dark:border-yellow-400/30">
                      {chapter.number}
                    </span>
                    <span className="truncate text-xs font-bold">{chapter.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      {chapterCompletedCount}/{chapter.lessons.length}
                    </span>
                    {isChapterAllDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      )
                    )}
                  </div>
                </button>

                {/* Lessons in Chapter */}
                {isExpanded && (
                  <div className="bg-slate-50/70 dark:bg-[#08090e] divide-y divide-slate-100 dark:divide-[#141722]">
                    {chapter.lessons.map((lesson) => {
                      const isSelected = currentLessonId === lesson.id;
                      const isDone = progress.completedLessons[lesson.id];

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            onSelectLesson(lesson.id);
                            onCloseMobile();
                          }}
                          className={`w-full text-left py-2 px-3 pl-8 flex items-center justify-between text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/15 dark:bg-yellow-400/10 text-amber-900 dark:text-yellow-300 font-bold border-l-3 border-amber-500 dark:border-yellow-400 shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#12151e] hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          <span className="truncate">{lesson.title}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-1.5" />
                          ) : (
                            <span className={`w-2 h-2 rounded-full shrink-0 ml-1.5 ${isSelected ? 'bg-amber-500 dark:bg-yellow-400' : 'bg-slate-300 dark:bg-slate-700'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 24/7 AI Tutor Card */}
        {onOpenTutor && (
          <div className="p-3 border-t border-slate-200 dark:border-[#1a1e2a] bg-slate-50/90 dark:bg-[#0a0b10]">
            <button
              onClick={() => {
                onOpenTutor();
                onCloseMobile();
              }}
              className="w-full p-2.5 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-[#141722] dark:via-[#1c2230] dark:to-[#141722] hover:brightness-115 text-white flex items-center justify-between text-xs font-bold transition-all shadow-md border border-amber-400/30 dark:border-yellow-400/30 group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-amber-400/20 text-yellow-400">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] leading-tight text-white flex items-center gap-1">
                    Ask 24/7 AI Tutor
                  </div>
                  <div className="text-[9px] text-amber-200/80 dark:text-yellow-300/80 font-normal">Resolve code doubts instantly</div>
                </div>
              </div>
              <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-yellow-400 text-slate-950">
                AI 24/7
              </span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

