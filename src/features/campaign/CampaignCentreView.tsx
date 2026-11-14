import React from 'react';
import {
  Award,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Lock,
  Gift,
} from 'lucide-react';
import { UserProgress } from '../../utils/types';
import { getMilestoneProgressPercent, XP_MILESTONES } from '../../data/milestonesData';

interface CampaignCentreViewProps {
  progress: UserProgress;
  onClaimMilestone: (milestoneId: string) => void;
  onNavigateMembership: () => void;
}

export const CampaignCentreView: React.FC<CampaignCentreViewProps> = ({
  progress,
  onClaimMilestone,
  onNavigateMembership,
}) => {
  const currentXp = Math.max(0, progress.xpPoints || 0);
  const claimedMilestones = progress.claimedMilestones || [];

  // Calculate learning level based on cumulative XP (250 XP per level)
  const currentLevel = Math.max(1, Math.floor(currentXp / 250) + 1);
  const { percent: milestoneProgressPct, next: nextMilestone } = getMilestoneProgressPercent(currentXp);
  const claimableCount = XP_MILESTONES.filter(
    (m) => currentXp >= m.xpRequired && !claimedMilestones.includes(m.id)
  ).length;

  return (
    <div className="app-main">
      {/* Page Header */}
      <div className="section-heading-bar">
        <div>
          <h2>Learning Progress &amp; Rewards Centre</h2>
          <p className="lead-paragraph" style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-sm)' }}>
            Track experience points earned through lessons and practice. Milestones recognize progress; they do not unlock separate tools or course access.
          </p>
        </div>
      </div>

      {/* Top Summary Grid (3 Compact Metrics Cards) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
        }}
      >
        {/* Metric 1: Scholar Level */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-primary-subtle)',
              border: '1px solid var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              flexShrink: 0,
            }}
          >
            <Award size={28} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-subtle)' }}>
              Scholar Standing
            </div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-text-strong)' }}>
              Level {currentLevel} Scholar
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              {currentXp} Cumulative Experience Points
            </div>
          </div>
        </div>

        {/* Metric 2: Next Milestone Progress */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-subtle)' }}>
            Progress to {nextMilestone ? nextMilestone.title : 'highest milestone'}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-accent)' }}>
              {milestoneProgressPct}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Progress to next XP milestone"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={milestoneProgressPct}
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${milestoneProgressPct}%`,
                height: '100%',
                backgroundColor: 'var(--color-accent)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <div style={{ marginTop: '0.4rem', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            {nextMilestone
              ? `${nextMilestone.xpRequired - currentXp} XP to reach ${nextMilestone.rank}`
              : 'You have reached the highest milestone currently listed.'}
          </div>
        </div>

        {/* Metric 3: Rewards & Claims */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-accent-subtle)',
              border: '1px solid var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-accent)',
              flexShrink: 0,
            }}
          >
            <Gift size={28} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-subtle)' }}>
              Milestone Bonus XP
            </div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-text-strong)' }}>
              {claimedMilestones.length} of {XP_MILESTONES.length} claimed
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: claimableCount > 0 ? 'var(--color-accent)' : 'var(--color-text-muted)', fontWeight: claimableCount > 0 ? 700 : 500 }}>
              {claimableCount > 0 ? `${claimableCount} milestone bonus${claimableCount === 1 ? '' : 'es'} ready to claim` : 'No milestone bonuses are ready to claim'}
            </div>
          </div>
        </div>
      </div>

      {/* Existing membership access */}
      <section
        className="card"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
          borderLeft: '4px solid var(--color-accent)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', minWidth: 0, flex: 1 }}>
          <BookOpen size={22} aria-hidden="true" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>Weekly Learning Membership</h3>
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Chapter 00 introductory lessons and Live Code are free. Chapters 01 to 10 and offline PDF study packs unlock after verification of the $19 USD/month membership.
            </p>
          </div>
        </div>
        <button type="button" onClick={onNavigateMembership} className="btn btn-accent btn-md">
          <span>View Membership</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </section>
      {/* XP milestones */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div>
          <h3 style={{ margin: 0 }}>XP Milestones</h3>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            Each milestone marks an XP threshold. Claiming an eligible milestone adds a one-time 100 XP bonus.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {XP_MILESTONES.map((m) => {
          const isReached = currentXp >= m.xpRequired;
          const isClaimed = claimedMilestones.includes(m.id);

          return (
            <div
              key={m.id}
              className="card"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                borderLeft: isClaimed
                  ? '4px solid var(--color-success)'
                  : isReached
                  ? '4px solid var(--color-accent)'
                  : '4px solid var(--color-border)',
                backgroundColor: isReached ? 'var(--color-surface)' : 'var(--color-surface-subtle)',
                opacity: isReached ? 1 : 0.8,
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isClaimed
                      ? 'var(--color-success-bg)'
                      : isReached
                      ? 'var(--color-accent-subtle)'
                      : 'var(--color-inset)',
                    border: `1px solid ${
                      isClaimed
                        ? 'var(--color-success-border)'
                        : isReached
                        ? 'var(--color-accent)'
                        : 'var(--color-border)'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: isClaimed
                      ? 'var(--color-success)'
                      : isReached
                      ? 'var(--color-accent)'
                      : 'var(--color-text-subtle)',
                    flexShrink: 0,
                  }}
                >
                  {isClaimed ? <CheckCircle2 size={20} /> : m.badge}
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h4 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 700 }}>{m.title}</h4>
                    <span className="badge badge-primary">{m.rank}</span>
                    <span className="badge">{m.xpRequired} XP</span>
                    {isClaimed && <span className="badge badge-success">100 XP bonus claimed</span>}
                  </div>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    <strong>Reward:</strong> {m.rewardDescription} — <span style={{ opacity: 0.85 }}>"{m.motivationQuote}"</span>
                  </p>
                </div>
              </div>

              <div>
                {isReached ? (
                  isClaimed ? (
                    <span className="badge badge-success" style={{ padding: '0.35rem 0.75rem' }}>
                      <CheckCircle2 size={14} />
                      <span>Bonus XP claimed</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onClaimMilestone(m.id)}
                      className="btn btn-accent btn-sm"
                    >
                      <Award size={14} />
                      <span>Claim +100 XP</span>
                    </button>
                  )
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-subtle)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <Lock size={12} />
                    <span>{m.xpRequired - currentXp} XP to reach</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Partner Learning Resources & Transparency Disclosure */}
      <div
        style={{
          marginTop: 'var(--space-10)',
          padding: 'var(--space-5)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface-subtle)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-subtle)',
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
          Industry Standards &amp; Ethical Educational Transparency
        </div>
        <p style={{ margin: 0 }}>
          Zero-to-Website curates open web standards aligned with W3C, MDN Web Docs, and WHATWG specifications. External tools or partner platforms recommended throughout chapters may carry educational discounts; our curriculum remains unbiased, non-commercial, and human-verified.
        </p>
      </div>

    </div>
  );
};
