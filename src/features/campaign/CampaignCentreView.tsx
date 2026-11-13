import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  BookOpen,
  Crown,
  Check,
  ExternalLink,
  ShieldCheck,
  FileText,
  Lock,
  Gift,
} from 'lucide-react';
import { UserProgress } from '../../utils/types';
import { XP_MILESTONES } from '../../data/milestonesData';

interface CampaignCentreViewProps {
  progress: UserProgress;
  onClaimMilestone?: (milestoneId: string) => void;
  onOpenLesson: (lessonId: string) => void;
}

export const CampaignCentreView: React.FC<CampaignCentreViewProps> = ({
  progress,
  onClaimMilestone,
  onOpenLesson,
}) => {
  const currentXp = progress.xpPoints || 0;
  const claimedMilestones = progress.claimedMilestones || [];
  const [showProModal, setShowProModal] = useState(false);
  const [proJoined, setProJoined] = useState(false);

  // Calculate learning level based on cumulative XP (250 XP per level)
  const currentLevel = Math.max(1, Math.floor(currentXp / 250) + 1);
  const nextLevelXp = currentLevel * 250;
  const currentLevelFloorXp = (currentLevel - 1) * 250;
  const levelProgressPct = Math.min(
    100,
    Math.round(((currentXp - currentLevelFloorXp) / (nextLevelXp - currentLevelFloorXp)) * 100)
  );

  // Find next unclaimed milestone
  const nextMilestone = XP_MILESTONES.find((m) => currentXp < m.xpRequired);
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
            Celebrate your cumulative engineering mastery and technical milestones. No artificial streak anxiety—your knowledge is permanent.
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
              Next Target: {nextMilestone ? nextMilestone.title : 'Mastery Attained'}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-accent)' }}>
              {levelProgressPct}%
            </span>
          </div>
          <div
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
                width: `${levelProgressPct}%`,
                height: '100%',
                backgroundColor: 'var(--color-accent)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <div style={{ marginTop: '0.4rem', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            {nextMilestone
              ? `${nextMilestone.xpRequired - currentXp} XP remaining to unlock ${nextMilestone.rank}`
              : 'All current curriculum milestones completed!'}
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
              Milestone Rewards
            </div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-text-strong)' }}>
              {claimedMilestones.length} of {XP_MILESTONES.length} Claimed
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: claimableCount > 0 ? 'var(--color-accent)' : 'var(--color-text-muted)', fontWeight: claimableCount > 0 ? 700 : 500 }}>
              {claimableCount > 0 ? `${claimableCount} new reward ready to claim!` : 'Active progress synced with Storehouse'}
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Pro Membership & Scholar Tier Section */}
      <section
        className="card"
        style={{
          marginBottom: 'var(--space-8)',
          background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-subtle) 100%)',
          border: '1px solid var(--color-border)',
          borderLeft: '4px solid var(--color-accent)',
          padding: 'var(--space-6)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Crown size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 800 }}>
                Scholar Tier &amp; Transparent Accreditation
              </h3>
              <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Zero-to-Website is committed to open educational access with an optional Pro Scholar upgrade for accelerated industry readiness.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowProModal(true)}
            className="btn btn-accent btn-md"
          >
            <Sparkles size={16} />
            <span>View Pro Scholar Privileges</span>
          </button>
        </div>

        {/* Comparison Pills */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {/* Free Standard Tier */}
          <div
            style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>Community Scholar</span>
              <span className="badge">Always 100% Free</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'grid', gap: '0.35rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Check size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span>Complete 11-Chapter Core Curriculum</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Check size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span>Interactive Practice Sandbox &amp; Live Preview</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Check size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span>Standard Gemini AI Tutor Q&amp;A Assistance</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Check size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span>Storehouse Local Persistent Archives</span>
              </li>
            </ul>
          </div>

          {/* Pro Scholar Tier */}
          <div
            style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-accent)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: 'var(--text-sm)', color: 'var(--color-accent)' }}>
                Scholar Pro Fellow
              </span>
              <span className="badge badge-accent">Optional Upgrade</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text)', display: 'grid', gap: '0.35rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <span><strong>Unlimited Gemini 3.7 Flash</strong> pedagogical tutoring</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <span><strong>Cryptographically Verified</strong> graduation certificates</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <span><strong>Full-Stack Sandbox Templates</strong> (APIs, DBs, Auth)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <span><strong>Offline PDF Study Packs</strong> &amp; Storehouse Cloud Backup</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Milestone Roadmap */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div>
          <h3 style={{ margin: 0 }}>Curriculum Milestones &amp; Privilege Roadmap</h3>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            Each milestone grants permanent engineering privileges and unlocks deeper technical features.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {XP_MILESTONES.map((m) => {
          const isUnlocked = currentXp >= m.xpRequired;
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
                  : isUnlocked
                  ? '4px solid var(--color-accent)'
                  : '4px solid var(--color-border)',
                backgroundColor: isUnlocked ? 'var(--color-surface)' : 'var(--color-surface-subtle)',
                opacity: isUnlocked ? 1 : 0.8,
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
                      : isUnlocked
                      ? 'var(--color-accent-subtle)'
                      : 'var(--color-inset)',
                    border: `1px solid ${
                      isClaimed
                        ? 'var(--color-success-border)'
                        : isUnlocked
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
                      : isUnlocked
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
                    {isClaimed && <span className="badge badge-success">Unlocked &amp; Active</span>}
                  </div>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    <strong>Perk:</strong> {m.rewardDescription} — <span style={{ opacity: 0.85 }}>"{m.motivationQuote}"</span>
                  </p>
                </div>
              </div>

              <div>
                {isUnlocked ? (
                  isClaimed ? (
                    <span className="badge badge-success" style={{ padding: '0.35rem 0.75rem' }}>
                      <CheckCircle2 size={14} />
                      <span>Privilege Claimed</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onClaimMilestone?.(m.id)}
                      className="btn btn-accent btn-sm"
                    >
                      <Sparkles size={14} />
                      <span>Claim Privilege</span>
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
                    <span>{m.xpRequired - currentXp} XP to unlock</span>
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

      {/* Modal: Pro Scholar Membership Details */}
      {showProModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 'var(--z-modal)',
            padding: 'var(--space-4)',
          }}
          onClick={() => setShowProModal(false)}
        >
          <div
            className="card"
            style={{
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '2px solid var(--color-accent)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Crown size={22} style={{ color: 'var(--color-accent)' }} />
                <h3 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 800 }}>Scholar Pro Fellowship</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowProModal(false)}
                className="btn btn-subtle btn-sm"
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              The Scholar Pro Fellowship is an optional membership for engineers looking to accelerate their portfolio, receive cryptographic proof of completion, and access continuous AI tutor analysis.
            </p>

            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <ShieldCheck size={18} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: 'var(--text-sm)' }}>Cryptographically Signed Accreditation</strong>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    Shareable on LinkedIn, GitHub, and resumes with public cryptographic verification hashes.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <Zap size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: 'var(--text-sm)' }}>High-Speed Gemini 3.7 Flash AI Tutor</strong>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    Unlimited contextual code reviews, architectural debugging, and custom lesson synthesis.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <FileText size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: 'var(--text-sm)' }}>Downloadable Offline Textbook Packs</strong>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    High-resolution PDF reference sheets, cheatsheets, and offline Storehouse bundles.
                  </div>
                </div>
              </div>
            </div>

            {proJoined ? (
              <div
                style={{
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--color-success-bg)',
                  border: '1px solid var(--color-success-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-success)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                ✓ Scholar Pro Fellowship Preview Activated! All features unlocked for your session.
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowProModal(false)}
                  className="btn btn-secondary btn-md"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => setProJoined(true)}
                  className="btn btn-accent btn-md"
                >
                  <Sparkles size={16} />
                  <span>Activate Scholar Pro (Free Preview)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
