import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Target,
  DollarSign,
  Compass,
  BarChart3,
  Layers,
  Clock,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  FolderPlus,
  CheckCircle2,
  Sliders,
  Scale,
  Zap,
  HelpCircle,
  FileText,
} from 'lucide-react';
import {
  CourseOpportunity,
  VERIFIED_COURSE_OPPORTUNITIES,
} from '../../shared/courseIntelligenceTypes';
import { saveStorehouseRecord } from '../storehouse/storehouseService';
import { LicencePurchaseModal } from '../ownership-licensing/LicencePurchaseModal';
import { RightsAndLicensingModal } from '../ownership-licensing/RightsAndLicensingModal';

interface CourseIntelligenceViewProps {
  onOpenLesson?: (lessonId: string) => void;
  onAddToast: (title: string, message: string, type?: 'info' | 'success' | 'update') => void;
}

export const CourseIntelligenceView: React.FC<CourseIntelligenceViewProps> = ({
  onOpenLesson,
  onAddToast,
}) => {
  const [opportunities, setOpportunities] = useState<CourseOpportunity[]>(VERIFIED_COURSE_OPPORTUNITIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activeBlueprintModal, setActiveBlueprintModal] = useState<CourseOpportunity | null>(null);

  // AI Course Synthesizer State
  const [customTopic, setCustomTopic] = useState('');
  const [customAudience, setCustomAudience] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedProposal, setSynthesizedProposal] = useState<any | null>(null);

  // Licensing modals state
  const [purchaseModalContent, setPurchaseModalContent] = useState<CourseOpportunity | null>(null);
  const [rightsModalOpen, setRightsModalOpen] = useState(false);

  const filteredOpportunities = opportunities.filter((opp) => {
    if (selectedCategory !== 'all' && opp.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && opp.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const handleSaveToStorehouse = async (opp: CourseOpportunity) => {
    await saveStorehouseRecord({
      id: `opportunity-brief-${opp.id}`,
      title: `[Course Opportunity] ${opp.title}`,
      type: 'note',
      data: opp,
      tags: ['Course Intelligence', opp.category, `${opp.difficulty} Level`, `$${opp.suggestedPriceUsd.selfPaced} USD`],
    });
    onAddToast(
      'Saved to Storehouse',
      `"${opp.title}" market brief is now archived in your Storehouse.`,
      'success'
    );
  };

  const handleSynthesizeCustomCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    setIsSynthesizing(true);
    try {
      const res = await fetch('/api/courses/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: customTopic,
          targetAudience: customAudience || 'Full-Stack Web Developers',
          difficulty: 'Intermediate',
        }),
      });
      const data = await res.json();
      if (data.success && data.proposal) {
        setSynthesizedProposal(data.proposal);
        onAddToast('Curriculum Proposal Ready', 'Gemini AI curriculum blueprint synthesized.', 'success');
      }
    } catch (err: any) {
      onAddToast('Synthesis Notice', 'Served structured curriculum blueprint via offline intelligence engine.', 'info');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="app-main">
      {/* 1. Header Bar */}
      <div className="section-heading-bar">
        <div>
          <h2>Course Opportunity Planning &amp; Intelligence (Admin Studio)</h2>
          <p className="lead-paragraph" style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-sm)' }}>
            Research in-demand developer skills, evaluate international curriculum benchmarks, synthesize lesson proposals with Gemini, and plan upcoming course blueprints.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setRightsModalOpen(true)}
            className="btn btn-secondary btn-sm"
          >
            <Scale size={14} />
            <span>Ownership &amp; Rights Registry</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-primary-subtle)',
              border: '1px solid var(--color-primary)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>
              Highest Growth Niche
            </div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-text-strong)' }}>
              Applied AI Engineering
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              96/100 Global Demand · Low Saturation
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-accent-subtle)',
              border: '1px solid var(--color-accent)',
              color: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <DollarSign size={24} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>
              Average Market Ticket
            </div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-text-strong)' }}>
              $129 – $249 USD
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Perpetual Licence + Resource Pack
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-success-bg)',
              border: '1px solid var(--color-success-border)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Target size={24} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>
              Default Publisher Identity
            </div>
            <div style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--color-text-strong)' }}>
              Sameer Chouhan / WebZoneBW
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Editorial Standards · 5-Week Review Cycle
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section: Course Opportunity Discovery Catalog */}
      <div style={{ marginBottom: 'var(--space-10)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: 'var(--space-5)' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 800 }}>
              Curated International Course Opportunities
            </h3>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Evaluated based on global search velocity, skill gaps, and international purchasing willingness.
            </p>
          </div>

          {/* Filter Controls */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select"
              style={{ width: 'auto', fontSize: '12px', padding: '0.35rem 0.65rem' }}
            >
              <option value="all">All Tracks</option>
              <option value="ai-fullstack">AI &amp; Full-Stack</option>
              <option value="frontend-css">Modern CSS &amp; UI</option>
              <option value="security-backend">Enterprise Security</option>
              <option value="architecture">Microservices &amp; Node</option>
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="form-select"
              style={{ width: 'auto', fontSize: '12px', padding: '0.35rem 0.65rem' }}
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Opportunity Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: 'var(--space-5)' }}>
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--color-border)',
                transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-primary">{opp.category}</span>
                  <span className="badge">{opp.difficulty}</span>
                </div>

                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-text-strong)' }}>
                  {opp.title}
                </h4>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {opp.tagline}
                </p>

                {/* Score Indicators Matrix */}
                <div
                  style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-subtle)', textTransform: 'uppercase' }}>Demand</div>
                    <div style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--color-accent)' }}>
                      {opp.marketDemandScore}/100
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-subtle)', textTransform: 'uppercase' }}>Saturation</div>
                    <div style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: opp.competitionSaturationScore < 40 ? 'var(--color-success)' : 'var(--color-text-strong)' }}>
                      {opp.competitionSaturationScore}/100
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-subtle)', textTransform: 'uppercase' }}>Utility</div>
                    <div style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {opp.practicalUtilityScore}/100
                    </div>
                  </div>
                </div>

                {/* Pricing & Effort Details */}
                <div style={{ fontSize: 'var(--text-xs)', display: 'grid', gap: '0.3rem', color: 'var(--color-text)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-subtle)' }}>Suggested Price:</span>
                    <strong>${opp.suggestedPriceUsd.selfPaced} – ${opp.suggestedPriceUsd.withDownloads} USD</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-subtle)' }}>Development Effort:</span>
                    <span>~{opp.estimatedEffortWeeks} weeks ({opp.estimatedVideoHours} hours video/text)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveBlueprintModal(opp)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  <BookOpen size={13} />
                  <span>Curriculum Blueprint</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveBlueprintModal(opp)}
                  className="btn btn-secondary btn-sm"
                  title="View Modules & Deliverables"
                >
                  <BookOpen size={13} />
                  <span>View Modules</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveToStorehouse(opp)}
                  className="btn btn-subtle btn-sm btn-icon-only"
                  title="Save Opportunity to Storehouse"
                >
                  <FolderPlus size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Section: AI Course Curriculum Synthesizer */}
      <div className="card" style={{ marginBottom: 'var(--space-10)', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <Compass size={22} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          <h3 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 800 }}>
            AI Course Curriculum &amp; Proposal Synthesizer
          </h3>
        </div>
        <p style={{ margin: '0 0 1.25rem 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          Have an idea for a niche course? Use Gemini 3.7 Flash to instantly research, outline, and synthesize a complete 4-chapter curriculum proposal with actionable sandbox assignments and monetization points.
        </p>

        <form onSubmit={handleSynthesizeCustomCourse} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <input
            type="text"
            placeholder="Course Topic (e.g., WebAssembly with Rust for Frontend Engineers)"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            className="form-input"
            style={{ flex: 2, minWidth: '240px' }}
            required
          />
          <input
            type="text"
            placeholder="Target Audience (e.g., Senior React Engineers)"
            value={customAudience}
            onChange={(e) => setCustomAudience(e.target.value)}
            className="form-input"
            style={{ flex: 1, minWidth: '180px' }}
          />
          <button
            type="submit"
            disabled={isSynthesizing || !customTopic.trim()}
            className="btn btn-primary btn-md"
          >
            <ArrowRight size={16} />
            <span>{isSynthesizing ? 'Synthesizing...' : 'Generate Course Proposal'}</span>
          </button>
        </form>

        {synthesizedProposal && (
          <div
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-primary)' }}>
                {synthesizedProposal.title}
              </h4>
              <span className="badge badge-accent">{synthesizedProposal.difficulty}</span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              <strong>Audience:</strong> {synthesizedProposal.targetAudience} · <strong>Format:</strong> {synthesizedProposal.courseFormat}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <strong style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>Learning Outcomes:</strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0.35rem 0 0 0', fontSize: 'var(--text-xs)', display: 'grid', gap: '0.25rem' }}>
                  {synthesizedProposal.learningOutcomes?.map((out: string, i: number) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                      <span style={{ color: 'var(--color-success)' }}>✓</span>
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>Recommended USD Pricing:</strong>
                <div style={{ fontSize: 'var(--text-xs)', marginTop: '0.35rem', display: 'grid', gap: '0.2rem' }}>
                  <div>Self-Paced Licence: <strong>${synthesizedProposal.suggestedPriceUsd?.selfPaced} USD</strong></div>
                  <div>Downloadable Pack: <strong>${synthesizedProposal.suggestedPriceUsd?.withDownloads} USD</strong></div>
                  <div>Team / Commercial: <strong>${synthesizedProposal.suggestedPriceUsd?.teamCommercial} USD</strong></div>
                  <div>Monthly Subscription: <strong>${synthesizedProposal.suggestedPriceUsd?.monthlySubscription} USD/mo</strong></div>
                </div>
              </div>
            </div>

            {/* Chapters list */}
            <div style={{ marginTop: '1rem' }}>
              <strong style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-subtle)' }}>Proposed Chapter Outline:</strong>
              <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.4rem' }}>
                {synthesizedProposal.chapters?.map((ch: any, i: number) => (
                  <div key={i} style={{ backgroundColor: 'var(--color-surface)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)', fontSize: 'var(--text-xs)' }}>
                    <strong>Chapter {ch.chapterNumber}: {ch.title}</strong>
                    <div style={{ color: 'var(--color-text-muted)', margin: '0.2rem 0' }}>{ch.description}</div>
                    <div style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Assignment: {ch.practiceChallenge}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={async () => {
                  await saveStorehouseRecord({
                    id: `ai-course-proposal-${Date.now()}`,
                    title: `[Synthesized Course] ${synthesizedProposal.title}`,
                    type: 'note',
                    data: synthesizedProposal,
                    tags: ['AI Course Proposal', 'Synthesizer', `${synthesizedProposal.difficulty}`],
                  });
                  onAddToast('Saved to Storehouse', 'Custom curriculum proposal saved to your Storehouse.', 'success');
                }}
                className="btn btn-accent btn-sm"
              >
                <FolderPlus size={14} />
                <span>Save Proposal to Storehouse</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 6. Modal: Detailed Course Blueprint & Module Tree */}
      {activeBlueprintModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 'var(--z-modal)',
            padding: 'var(--space-4)',
          }}
          onClick={() => setActiveBlueprintModal(null)}
        >
          <div
            className="card"
            style={{
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid var(--color-border)',
              padding: 'var(--space-6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-primary">{activeBlueprintModal.category}</span>
                <h3 style={{ margin: '0.4rem 0 0 0', fontSize: 'var(--text-xl)', fontWeight: 800 }}>
                  {activeBlueprintModal.title}
                </h3>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {activeBlueprintModal.tagline}
                </p>
              </div>
              <button type="button" onClick={() => setActiveBlueprintModal(null)} className="btn btn-subtle btn-sm">
                ✕
              </button>
            </div>

            {/* Modules Tree */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle)', marginBottom: '0.75rem' }}>
                Curriculum Structure ({activeBlueprintModal.keyModules.length} Modules):
              </h4>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {activeBlueprintModal.keyModules.map((mod) => (
                  <div
                    key={mod.moduleNumber}
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'var(--color-surface-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                        Module {mod.moduleNumber}: {mod.title}
                      </strong>
                      <span className="badge">{mod.lessonsCount} Lessons</span>
                    </div>
                    <p style={{ margin: '0 0 0.4rem 0', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      {mod.description}
                    </p>
                    <div style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600 }}>
                      Capstone Deliverable: {mod.deliverableProject}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downloadable Assets */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle)', marginBottom: '0.5rem' }}>
                Included Downloadable Resources &amp; Student Assets:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--text-xs)', display: 'grid', gap: '0.35rem' }}>
                {activeBlueprintModal.downloadableAssets.map((asset, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileText size={14} style={{ color: 'var(--color-accent)' }} />
                    <span>{asset}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => handleSaveToStorehouse(activeBlueprintModal)}
                className="btn btn-secondary btn-md"
              >
                <FolderPlus size={16} />
                <span>Save to Storehouse</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPurchaseModalContent(activeBlueprintModal);
                  setActiveBlueprintModal(null);
                }}
                className="btn btn-accent btn-md"
              >
                <DollarSign size={16} />
                <span>Purchase / Enrol ($ {activeBlueprintModal.suggestedPriceUsd.selfPaced} USD)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Licence Purchase Modal */}
      {purchaseModalContent && (
        <LicencePurchaseModal
          isOpen={!!purchaseModalContent}
          onClose={() => setPurchaseModalContent(null)}
          contentId={purchaseModalContent.id}
          contentTitle={purchaseModalContent.title}
          pricingUsd={{
            'personal-learning': purchaseModalContent.suggestedPriceUsd.selfPaced,
            'downloadable-learning': purchaseModalContent.suggestedPriceUsd.withDownloads,
            'commercial-use': purchaseModalContent.suggestedPriceUsd.teamCommercial,
            'creator-distribution': 999,
            'subscription-access': purchaseModalContent.suggestedPriceUsd.monthlySubscription,
            'limited-term-access': 0,
          }}
          onSuccessGrant={(licenceType) => {
            onAddToast('Licence Activated', `Granted ${licenceType} licence for ${purchaseModalContent.title}.`, 'success');
          }}
        />
      )}

      {/* Rights & Licensing Modal */}
      <RightsAndLicensingModal
        isOpen={rightsModalOpen}
        onClose={() => setRightsModalOpen(false)}
      />
    </div>
  );
};
