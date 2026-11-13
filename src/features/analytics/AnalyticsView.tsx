import React from 'react';
import {
  BarChart3,
  Clock,
  CheckCircle2,
  BookOpen,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { UserProgress, Chapter } from '../../utils/types';

interface AnalyticsViewProps {
  progress: UserProgress;
  chapters: Chapter[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  progress,
  chapters,
}) => {
  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedLessonsCount = Object.keys(progress.completedLessons || {}).length;
  const quizScores = Object.values(progress.quizScores || {});
  const avgQuizScore =
    quizScores.length > 0
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 100;

  return (
    <div className="app-main">
      <div className="section-heading-bar">
        <div>
          <h2>Analytics &amp; Study Metrics</h2>
          <p className="lead-paragraph" style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-sm)' }}>
            Transparent learning metrics tracking your curriculum velocity, retention, and sandbox engagement.
          </p>
        </div>
      </div>

      <div className="dashboard-metrics-grid" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="metric-card">
          <div className="metric-label">
            <Clock size={14} style={{ color: 'var(--color-primary)' }} />
            <span>Total Study Time</span>
          </div>
          <div className="metric-value">{progress.studyMinutes || 15} min</div>
          <div className="metric-subtext">Active reading and laboratory sessions</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">
            <Zap size={14} style={{ color: 'var(--color-accent)' }} />
            <span>Concepts Mastered</span>
          </div>
          <div className="metric-value">{progress.conceptsMastered || 1}</div>
          <div className="metric-subtext">Verified through quizzes and practice</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">
            <TrendingUp size={14} style={{ color: 'var(--color-success)' }} />
            <span>Checkpoint Accuracy</span>
          </div>
          <div className="metric-value">{avgQuizScore}%</div>
          <div className="metric-subtext">Average score across quizzes</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">
            <CheckCircle2 size={14} style={{ color: 'var(--color-info)' }} />
            <span>Completion Rate</span>
          </div>
          <div className="metric-value">
            {Math.round((completedLessonsCount / Math.max(1, totalLessons)) * 100)}%
          </div>
          <div className="metric-subtext">{completedLessonsCount} of {totalLessons} curriculum lessons</div>
        </div>
      </div>

      {/* Chapter Breakdown Table */}
      <h3 style={{ marginBottom: 'var(--space-4)' }}>Track-by-Track Completion Status</h3>
      <div className="lesson-table-wrapper">
        <table className="lesson-table">
          <thead>
            <tr>
              <th>Chapter Track</th>
              <th>Lessons</th>
              <th>Completed</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((ch) => {
              const done = ch.lessons.filter((l) => progress.completedLessons?.[l.id]).length;
              const pct = Math.round((done / ch.lessons.length) * 100);
              return (
                <tr key={ch.id}>
                  <td>
                    <strong>Chapter {ch.number}:</strong> {ch.title}
                  </td>
                  <td>{ch.lessons.length}</td>
                  <td>{done}</td>
                  <td>
                    {pct === 100 ? (
                      <span className="badge badge-success">Completed</span>
                    ) : pct > 0 ? (
                      <span className="badge badge-accent">In Progress</span>
                    ) : (
                      <span className="badge">Not Started</span>
                    )}
                  </td>
                  <td style={{ minWidth: '120px' }}>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
