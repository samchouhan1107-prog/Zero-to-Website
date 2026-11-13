import React from 'react';
import { Chapter, UserProgress } from '../utils/types';

interface LearnViewProps {
  chapters: Chapter[];
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  onOpenPractice?: () => void;
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
  const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const completedCount = Object.values(progress.completedLessons || {}).filter(Boolean).length;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-app-ink">Curriculum</h1>
          <p className="text-app-muted text-sm mt-1">
            {completedCount}/{totalLessons} lessons completed
          </p>
        </div>
        {onNavigateHome && (
          <button
            type="button"
            onClick={onNavigateHome}
            className="rounded-lg border border-app-border bg-app-inset px-4 py-2 text-sm font-semibold text-app-ink transition-colors hover:bg-app-active"
          >
            Back to Home
          </button>
        )}
      </div>

      <div className="space-y-6">
        {chapters.map((chapter) => {
          const chapterCompleted = chapter.lessons.filter((l) => progress.completedLessons?.[l.id]).length;
          return (
            <div key={chapter.id} className="panel-surface p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-app-ink">
                    Ch {chapter.number}: {chapter.title}
                  </h2>
                  <p className="text-xs text-app-muted mt-1">
                    {chapterCompleted}/{chapter.lessons.length} lessons completed
                  </p>
                </div>
                {chapter.lessons.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onSelectLesson(chapter.lessons[0].id)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-500"
                  >
                    Start Chapter
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
