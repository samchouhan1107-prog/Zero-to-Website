import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Zap,
  Clock,
  ArrowRight,
  FolderArchive,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Scale,
  ShieldCheck,
  Sliders,
  Mail,
  FileText,
  Users,
  Compass,
} from 'lucide-react';
import { UserProgress, Chapter } from '../../utils/types';
import { XP_MILESTONES } from '../../data/milestonesData';
import { VERIFIED_COURSE_OPPORTUNITIES } from '../../shared/courseIntelligenceTypes';

interface DashboardViewProps {
  progress: UserProgress;
  chapters: Chapter[];
  onNavigateView: (view: any) => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenAssistant: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  chapters,
  onNavigateView,
  onOpenLesson,
  onOpenAssistant,
}) => {
  const [activeAreaTab, setActiveAreaTab] = useState<'all' | 'learning' | 'intelligence' | 'operations'>('all');

  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedCount = Object.keys(progress.completedLessons || {}).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Next lesson to study
  let nextLesson = chapters[0]?.lessons[0];
  let nextChapter = chapters[0];
  for (const ch of chapters) {
    const uncompleted = ch.lessons.find((l) => !progress.completedLessons?.[l.id]);
    if (uncompleted) {
      nextLesson = uncompleted;
      nextChapter = ch;
      break;
    }
  }

  // Next XP Milestone
  const currentXp = progress.xpPoints || 0;
  const nextMilestone = XP_MILESTONES.find((m) => m.xpRequired > currentXp) || XP_MILESTONES[XP_MILESTONES.length - 1];
  const prevMilestoneXp = XP_MILESTONES.filter((m) => m.xpRequired <= currentXp).slice(-1)[0]?.xpRequired || 0;
  const milestoneProgress = Math.min(
    100,
    Math.round(((currentXp - prevMilestoneXp) / Math.max(1, nextMilestone.xpRequired - prevMilestoneXp)) * 100)
  );

  return (
    <div className="app-main">
      {/* 1. Hero Overview */}
      <section className="dashboard-hero">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
              <ShieldCheck size={14} /> Official Publisher: Sameer Chouhan / WebZoneBW
            </div>
            <h1 className="dashboard-hero-title">Knowledge Hub &amp; Course Creator Engine</h1>
          </div>
          <span className="badge badge-accent" style={{ padding: '0.35rem 0.75rem' }}>
            5-Week Editorial Review Cycle
          </span>
        </div>

        <p className="dashboard-hero-subtitle">
          Evolving from a human-centred web engineering academy into a complete course creation, publishing, and sustainable USD revenue ecosystem.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => onOpenLesson(nextLesson?.id || 'ch-00-l-01')}
            className="btn btn-accent btn-md"
          >
            <BookOpen size={16} />
            <span>Continue Chapter {nextChapter.number}: {nextLesson?.title || 'Next Lesson'}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateView('course-intelligence')}
            className="btn btn-primary btn-md"
          >
            <Compass size={16} />
            <span>Course Intelligence Engine</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateView('publishing')}
            className="btn btn-secondary btn-md"
          >
            <FileText size={16} />
            <span>Publishing &amp; Rights Pipeline</span>
          </button>
        </div>
      </section>

      {/* Area Selector Segmented Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setActiveAreaTab('all')}
          className={`btn btn-sm ${activeAreaTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
        >
          All Connected Areas
        </button>
        <button
          type="button"
          onClick={() => setActiveAreaTab('learning')}
          className={`btn btn-sm ${activeAreaTab === 'learning' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Area A: Learning Management
        </button>
        <button
          type="button"
          onClick={() => setActiveAreaTab('intelligence')}
          className={`btn btn-sm ${activeAreaTab === 'intelligence' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Area B: Course Opportunity Intelligence
        </button>
        <button
          type="button"
          onClick={() => setActiveAreaTab('operations')}
          className={`btn btn-sm ${activeAreaTab === 'operations' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Area C: Platform Operations &amp; Ledger
        </button>
      </div>

      {/* AREA A: LEARNING MANAGEMENT */}
      {(activeAreaTab === 'all' || activeAreaTab === 'learning') && (
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
            <BookOpen size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 800 }}>
              Area A: Learning &amp; Student Management
            </h3>
          </div>

          <div className="dashboard-metrics-grid" style={{ marginBottom: 'var(--space-5)' }}>
            <div className="metric-card">
              <div className="metric-label">
                <Zap size={14} style={{ color: 'var(--color-accent)' }} />
                <span>Curriculum Completion</span>
              </div>
              <div className="metric-value">{progressPercent}%</div>
              <div className="metric-subtext">{completedCount} of {totalLessons} structured lessons completed</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">
                <Clock size={14} style={{ color: 'var(--color-primary)' }} />
                <span>Study &amp; Sandbox Time</span>
              </div>
              <div className="metric-value">{progress.studyMinutes || 45} min</div>
              <div className="metric-subtext">Active reading depth and code execution</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">
                <Mail size={14} style={{ color: 'var(--color-success)' }} />
                <span>Weekly Subscriptions</span>
              </div>
              <div className="metric-value">Active (Free)</div>
              <div className="metric-subtext">Receives weekly chapters &amp; PDF study packs</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">
                <FolderArchive size={14} style={{ color: 'var(--color-info)' }} />
                <span>Storehouse Archive</span>
              </div>
              <div className="metric-value">{progress.bookmarks?.length || 0} Items</div>
              <div className="metric-subtext">Saved lessons, notes, and code blueprints</div>
            </div>
          </div>
        </section>
      )}

      {/* AREA B: COURSE OPPORTUNITY INTELLIGENCE */}
      {(activeAreaTab === 'all' || activeAreaTab === 'intelligence') && (
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={18} style={{ color: 'var(--color-accent)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 800 }}>
                Area B: Course Opportunity Intelligence
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateView('course-intelligence')}
              className="btn btn-subtle btn-sm"
            >
              <span>Explore All Opportunities</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
            {VERIFIED_COURSE_OPPORTUNITIES.slice(0, 3).map((opp) => (
              <div
                key={opp.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span className="badge badge-primary">{opp.category}</span>
                    <span className="badge badge-accent">Demand: {opp.marketDemandScore}/100</span>
                  </div>
                  <h4 style={{ margin: '0 0 0.4rem 0', fontSize: 'var(--text-base)', fontWeight: 700 }}>
                    {opp.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    {opp.tagline}
                  </p>
                </div>

                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                  <span>Suggested: <strong>${opp.suggestedPriceUsd.selfPaced} – ${opp.suggestedPriceUsd.withDownloads} USD</strong></span>
                  <button
                    type="button"
                    onClick={() => onNavigateView('course-intelligence')}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '11px', padding: '0.25rem 0.5rem' }}
                  >
                    View Blueprint
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AREA C: PLATFORM OPERATIONS & VERIFIED COMMERCIAL LEDGER */}
      {(activeAreaTab === 'all' || activeAreaTab === 'operations') && (
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 800 }}>
                Area C: Platform Operations &amp; Commercial Ledger
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => onNavigateView('publishing')}
                className="btn btn-secondary btn-sm"
              >
                <FileText size={14} />
                <span>Publishing Pipeline</span>
              </button>
            </div>
          </div>

          <div
            className="card"
            style={{
              padding: 'var(--space-5)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)', marginBottom: '1.25rem' }}>
              {/* Publisher & Ownership Identity */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Users size={16} style={{ color: 'var(--color-primary)' }} />
                  <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                    Publisher &amp; Platform Identity
                  </strong>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-strong)' }}>
                  Sameer Chouhan / WebZoneBW
                </div>
                <p style={{ margin: '0.35rem 0 0 0', fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Platform owner and official publisher identity. 4–6 week audit scheduler active for curriculum freshness.
                </p>
              </div>

              {/* Google Analytics 4 */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={16} style={{ color: 'var(--color-success)' }} />
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                      Google Analytics 4
                    </strong>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '10px' }}>Active</span>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-strong)' }}>
                  Measurement ID: G-L1KR6MWWP3
                </div>
                <p style={{ margin: '0.35rem 0 0 0', fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Measures audience traffic, learning path engagement, and student lesson completion events.
                </p>
              </div>

              {/* Google AdSense Integration */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <DollarSign size={16} style={{ color: 'var(--color-accent)' }} />
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                      Google AdSense
                    </strong>
                  </div>
                  <span className="badge badge-warning" style={{ fontSize: '10px' }}>Verification Pending</span>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-strong)' }}>
                  Official Advertising Service
                </div>
                <p style={{ margin: '0.35rem 0 0 0', fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Advertising monetization is handled through Google AdSense. Ad earnings are kept completely separate from educational course sales.
                </p>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', lineHeight: 1.5, borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
              Zero-to-Website records actual student enrolments, downloadable licences, and weekly subscriptions in the local verified database without hypothetical simulations.
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
