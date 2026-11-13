import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  Star,
  FileCheck,
} from 'lucide-react';
import { UserProgress } from '../../utils/types';

interface AchievementEngineViewProps {
  progress: UserProgress;
  userName?: string;
}

const BADGES = [
  {
    id: 'badge-foundations',
    name: 'Web Foundations & Protocols',
    desc: 'Mastered DNS, HTTP/HTTPS client-server requests, and packet routing.',
    icon: '🌐',
    minXp: 50,
  },
  {
    id: 'badge-semantics',
    name: 'Semantic HTML5 Architect',
    desc: 'Clean accessible document outlines, ARIA roles, and high-readability structures.',
    icon: '🏛️',
    minXp: 150,
  },
  {
    id: 'badge-boxmodel',
    name: 'CSS Box Model Specialist',
    desc: 'Flawless margin collapse handling, padding containment, and border-box calculations.',
    icon: '📦',
    minXp: 300,
  },
  {
    id: 'badge-flexgrid',
    name: 'Flexbox & CSS Grid Master',
    desc: '1D alignment axis mastery and 2D auto-fit grid track responsiveness.',
    icon: '📐',
    minXp: 600,
  },
  {
    id: 'badge-dom',
    name: 'Reactive DOM Engineer',
    desc: 'Event propagation, bubbling delegation, and dynamic DOM manipulation without memory leaks.',
    icon: '⚡',
    minXp: 1000,
  },
  {
    id: 'badge-storehouse',
    name: 'Storehouse Knowledge Curator',
    desc: 'Archived and synthesized curriculum lessons and custom technical notes.',
    icon: '📚',
    minXp: 1500,
  },
];

export const AchievementEngineView: React.FC<AchievementEngineViewProps> = ({
  progress,
  userName = 'Web Developer Graduate',
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const currentXp = progress.xpPoints || 0;
  const isEligibleForCert = currentXp >= 100;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-main">
      <div className="section-heading-bar">
        <div>
          <h2>Achievement Engine &amp; Accreditation</h2>
          <p className="lead-paragraph" style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-sm)' }}>
            Official credentials verifying your mastery of web standards, engineering principles, and interactive sandbox milestones.
          </p>
        </div>

        {isEligibleForCert && (
          <button
            type="button"
            onClick={() => setShowCertificate(true)}
            className="btn btn-accent btn-sm"
          >
            <Award size={16} />
            <span>View Verified Certificate</span>
          </button>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="modal-overlay" onClick={() => setShowCertificate(false)}>
          <div
            className="modal-dialog"
            style={{ maxWidth: '820px', backgroundColor: '#ffffff', color: '#0f172a' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header" style={{ borderBottomColor: '#e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} style={{ color: '#d97706' }} />
                <h3 style={{ margin: 0, color: '#0f172a' }}>Official Engineering Certificate</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="btn btn-subtle btn-sm"
                style={{ color: '#0f172a' }}
              >
                ✕
              </button>
            </div>

            <div
              className="modal-body"
              style={{
                padding: '3rem 2.5rem',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #ffffff, #f8fafc)',
                border: '8px double #cbd5e1',
                margin: '1.5rem',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', fontWeight: 800 }}>
                Zero-to-Website Academy of Engineering
              </div>
              <h1 style={{ fontSize: '2.4rem', color: '#1e3a8a', margin: '1rem 0 0.5rem 0', fontWeight: 900 }}>
                Certificate of Technical Mastery
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                This is to officially certify that
              </p>
              <h2 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '1rem 0', borderBottom: '2px solid #e2e8f0', display: 'inline-block', paddingBottom: '0.5rem', minWidth: '280px' }}>
                {userName}
              </h2>
              <p style={{ maxWidth: '58ch', margin: '1rem auto 2rem auto', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Has successfully demonstrated mastery of modern web architecture, semantic HTML5, pure CSS3 design systems, asynchronous DOM scripting, and persistent Storehouse curation.
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Verified XP: {currentXp}</div>
                  <small style={{ color: '#64748b' }}>Accredited Standing</small>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Date: {new Date().toLocaleDateString()}</div>
                  <small style={{ color: '#64748b' }}>Standard Issue</small>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ borderTopColor: '#e2e8f0', backgroundColor: '#f8fafc' }}>
              <button
                type="button"
                onClick={handlePrint}
                className="btn btn-secondary btn-md"
                style={{ color: '#0f172a' }}
              >
                <Printer size={16} />
                <span>Print Certificate</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="btn btn-primary btn-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Badges Matrix */}
      <h3 style={{ marginBottom: 'var(--space-4)' }}>Technical Badges</h3>
      <div className="grid-auto-fit-cards">
        {BADGES.map((b) => {
          const isUnlocked = currentXp >= b.minXp;
          return (
            <div
              key={b.id}
              className="card"
              style={{
                opacity: isUnlocked ? 1 : 0.65,
                borderLeft: isUnlocked ? '4px solid var(--color-success)' : '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontSize: '1.75rem' }}>{b.icon}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: 'var(--text-base)' }}>{b.name}</h4>
                  <span className="badge badge-accent">{b.minXp} XP Required</span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                {b.desc}
              </p>
              <div style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-xs)', fontWeight: 600, color: isUnlocked ? 'var(--color-success)' : 'var(--color-text-subtle)' }}>
                {isUnlocked ? '✓ Unlocked & Verified' : 'Locked'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
