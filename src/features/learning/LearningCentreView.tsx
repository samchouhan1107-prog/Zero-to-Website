import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Filter,
  Lock,
} from 'lucide-react';
import { Chapter, Lesson, UserProgress } from '../../utils/types';
import { useAuth } from '../../utils/AuthContext';

interface LearningCentreViewProps {
  chapters: Chapter[];
  progress: UserProgress;
  onOpenLesson: (lessonId: string) => void;
}

export const LearningCentreView: React.FC<LearningCentreViewProps> = ({
  chapters,
  progress,
  onOpenLesson,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { entitlement } = useAuth();

  const filteredChapters = chapters.filter((ch) => {
    if (selectedChapterId !== 'all' && ch.id !== selectedChapterId) return false;
    return true;
  });

  return (
    <div className="app-main">
      <div className="section-heading-bar">
        <div>
          <h2>Learning Centre &amp; Curriculum Library</h2>
          <p className="lead-paragraph" style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-sm)' }}>
            11 comprehensive engineering tracks covering internet protocols, semantic HTML5, modern CSS3 layout engines, reactive DOM, and production deployment.
          </p>
        </div>
      </div>

      {/* Chapter Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 'var(--space-6) 0',
        }}
      >
        <div style={{ maxWidth: '380px', width: '100%' }}>
          <div className="search-input-wrapper">
            <Search size={16} className="search-input-icon" />
            <input
              type="text"
              placeholder="Search lessons, terms, or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input search-input"
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={15} style={{ color: 'var(--color-text-subtle)' }} />
          <select
            value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}
            className="form-select"
            style={{ width: 'auto', minWidth: '220px' }}
          >
            <option value="all">All Chapters (11 Tracks)</option>
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                Chapter {ch.number}: {ch.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chapters & Lessons Listing */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {filteredChapters.map((chapter) => {
          const filteredLessons = chapter.lessons.filter((l) => {
            if (!searchQuery) return true;
            return (
              l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.learningObjectives.some((obj) => obj.toLowerCase().includes(searchQuery.toLowerCase()))
            );
          });

          if (filteredLessons.length === 0) return null;

          const chCompleted = chapter.lessons.filter((l) => progress.completedLessons?.[l.id]).length;
          const chPct = Math.round((chCompleted / chapter.lessons.length) * 100);

          return (
            <section
              key={chapter.id}
              className="card"
              style={{ padding: 'var(--space-6)' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid var(--color-border-subtle)',
                  paddingBottom: 'var(--space-4)',
                  marginBottom: 'var(--space-5)',
                  gap: 'var(--space-3)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-primary">Chapter {chapter.number}</span>
                    {chapter.id === 'ch-00' ? (
                      <span className="badge badge-accent">Free Chapter</span>
                    ) : entitlement.hasActiveMonthlyPack || entitlement.unlockedAllChapters ? (
                      <span className="badge badge-success">Unlocked (Monthly Pack)</span>
                    ) : (
                      <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Lock size={11} />
                        <span>Monthly Pack Required</span>
                      </span>
                    )}
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
                      ~{chapter.estimatedHours}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: 'var(--text-xl)' }}>{chapter.title}</h3>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    {chapter.subtitle}
                  </p>
                </div>

                <div style={{ minWidth: '160px', textAlign: 'right' }}>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', marginBottom: '0.25rem' }}>
                    {chCompleted} / {chapter.lessons.length} Completed ({chPct}%)
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${chPct}%` }} />
                  </div>
                </div>
              </div>

              {/* Lesson Items in this Chapter */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {filteredLessons.map((lesson) => {
                  const isDone = !!progress.completedLessons?.[lesson.id];
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onOpenLesson(lesson.id)}
                      style={{
                        padding: 'var(--space-4)',
                        backgroundColor: 'var(--color-surface-subtle)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'var(--space-4)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                        e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.backgroundColor = 'var(--color-surface-subtle)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0 }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            backgroundColor: isDone ? 'var(--color-success-bg)' : 'var(--color-inset)',
                            border: `1px solid ${isDone ? 'var(--color-success-border)' : 'var(--color-border)'}`,
                            color: isDone ? 'var(--color-success)' : 'var(--color-text-subtle)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 700,
                          }}
                        >
                          {isDone ? '✓' : lesson.number}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <h4 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-strong)' }}>
                            {lesson.title}
                          </h4>
                          <p style={{ margin: '0.15rem 0 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {lesson.tagline}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={12} />
                          {lesson.durationMinutes} min
                        </span>
                        <ArrowRight size={16} style={{ color: 'var(--color-text-subtle)' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
