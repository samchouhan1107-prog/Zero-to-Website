import React from 'react';
import {
  User,
  Award,
  Bookmark,
  FileEdit,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { UserProgress, Chapter } from '../../utils/types';

interface UserProfileViewProps {
  progress: UserProgress;
  chapters: Chapter[];
  onOpenLesson: (lessonId: string) => void;
  onOpenSettings: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  progress,
  chapters,
  onOpenLesson,
  onOpenSettings,
}) => {
  const bookmarks = progress.bookmarks || [];
  const notes = progress.notes || {};

  // Find bookmarked lesson metadata
  const allLessons = chapters.flatMap((c) => c.lessons);
  const bookmarkedLessons = allLessons.filter((l) => bookmarks.includes(l.id));

  return (
    <div className="app-main">
      {/* Profile Header */}
      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-inverse)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              fontWeight: 800,
            }}
          >
            Z
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h2 style={{ margin: 0, fontSize: 'var(--text-xl)' }}>Student Engineer</h2>
              <span className="badge badge-accent">Scholar Tier</span>
            </div>
            <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              Zero-to-Website Continuous Learning Academy · Active Member
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenSettings}
          className="btn btn-secondary btn-md"
        >
          Profile &amp; Theme Settings
        </button>
      </div>

      {/* Bookmarked Lessons */}
      <h3 style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Bookmark size={18} style={{ color: 'var(--color-accent)' }} />
        <span>Bookmarked Curriculum Lessons ({bookmarkedLessons.length})</span>
      </h3>

      {bookmarkedLessons.length === 0 ? (
        <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>
          No bookmarked lessons yet. Click the bookmark button on any lesson to save it for quick reference.
        </div>
      ) : (
        <div className="grid-auto-fit-cards" style={{ marginBottom: 'var(--space-8)' }}>
          {bookmarkedLessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => onOpenLesson(lesson.id)}
              className="card card-interactive"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
                  Lesson {lesson.number}
                </span>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: 'var(--text-base)' }}>
                  {lesson.title}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {lesson.tagline}
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
                  {lesson.durationMinutes} min read
                </span>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)' }}>
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Personal Notes */}
      <h3 style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <FileEdit size={18} style={{ color: 'var(--color-primary)' }} />
        <span>Personal Study Notes ({Object.keys(notes).length})</span>
      </h3>

      {Object.keys(notes).length === 0 ? (
        <div className="card" style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No study notes recorded yet. Add your personal observations and architectural notes while studying lessons.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {Object.entries(notes).map(([lessonId, noteContent]) => {
            const lesson = allLessons.find((l) => l.id === lessonId);
            return (
              <div key={lessonId} className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <h4 style={{ margin: 0, fontSize: 'var(--text-base)' }}>
                    {lesson ? lesson.title : `Lesson: ${lessonId}`}
                  </h4>
                  {lesson && (
                    <button
                      type="button"
                      onClick={() => onOpenLesson(lesson.id)}
                      className="btn btn-subtle btn-sm"
                    >
                      <span>Jump to Lesson</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {noteContent}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
