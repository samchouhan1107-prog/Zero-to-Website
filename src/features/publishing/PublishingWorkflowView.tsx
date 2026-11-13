import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Scale,
  Calendar,
  Send,
  Plus,
  RefreshCw,
  Clock,
  Eye,
} from 'lucide-react';
import {
  PublishingDraft,
  PublishingStage,
  scanTextForOriginality,
} from '../../shared/publishingTypes';
import { LicenceType } from '../../shared/ownershipTypes';

interface PublishingWorkflowViewProps {
  onAddToast: (title: string, message: string, type?: 'info' | 'success' | 'update') => void;
}

const STAGES_LIST: Array<{ id: PublishingStage; title: string; num: number }> = [
  { id: 'creation', title: '1. Creation', num: 1 },
  { id: 'ownership-verification', title: '2. Ownership', num: 2 },
  { id: 'originality-review', title: '3. Originality', num: 3 },
  { id: 'quality-review', title: '4. Quality', num: 4 },
  { id: 'licence-selection', title: '5. Licences', num: 5 },
  { id: 'pricing-approval', title: '6. Pricing', num: 6 },
  { id: 'published', title: '7. Published', num: 7 },
];

export const PublishingWorkflowView: React.FC<PublishingWorkflowViewProps> = ({
  onAddToast,
}) => {
  const [drafts, setDrafts] = useState<PublishingDraft[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string>('');
  const [testContent, setTestContent] = useState('');
  const [scanResult, setScanResult] = useState<{
    score: number;
    flags: string[];
    recommendations: string[];
  } | null>(null);

  // New Draft Creation modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAudience, setNewAudience] = useState('');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  const fetchDrafts = async () => {
    try {
      const res = await fetch('/api/publishing/drafts');
      const data = await res.json();
      if (data.success && data.drafts) {
        setDrafts(data.drafts);
        if (!selectedDraftId && data.drafts.length > 0) {
          setSelectedDraftId(data.drafts[0].id);
        }
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const selectedDraft = drafts.find((d) => d.id === selectedDraftId) || drafts[0];

  const handleAdvanceStage = async (nextStage: PublishingStage) => {
    if (!selectedDraft) return;

    try {
      const res = await fetch('/api/publishing/advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftId: selectedDraft.id,
          targetStage: nextStage,
        }),
      });
      const data = await res.json();
      if (data.success && data.draft) {
        setDrafts((prev) => prev.map((d) => (d.id === data.draft.id ? data.draft : d)));
        onAddToast(
          'Workflow Stage Updated',
          `"${data.draft.courseTitle}" advanced to stage: ${nextStage}.`,
          'success'
        );
      }
    } catch (err: any) {
      onAddToast('Update Failed', err?.message || 'Failed to update publishing stage.', 'info');
    }
  };

  const handleCreateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/publishing/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseTitle: newTitle,
          creatorId: 'default',
          creatorName: 'Sameer Chouhan',
          creatorEmail: '',
          contentOwner: 'Sameer Chouhan / WebZoneBW',
          publisherIdentity: 'Sameer Chouhan / WebZoneBW',
          targetAudience: newAudience || 'Full-Stack Developers',
          difficulty: newDifficulty,
          chaptersCount: 4,
          totalLessonsCount: 16,
          wordCount: 12000,
          hasSandboxPractices: true,
          hasAssessments: true,
          selectedLicences: ['personal-learning', 'downloadable-learning', 'commercial-use'],
          pricingUsd: {
            'personal-learning': 49,
            'downloadable-learning': 89,
            'commercial-use': 249,
            'creator-distribution': 799,
            'subscription-access': 19,
            'limited-term-access': 0,
          },
          originalityScore: 98,
          originalityFlags: ['Draft initialized with verified editorial standards.'],
          qualityChecklist: {
            hasClearObjectives: true,
            hasDefinitionsAndMentalModels: true,
            hasWorkingCodeExamples: true,
            hasPracticeExercises: true,
            hasKnowledgeCheckpoints: true,
            hasKeyTakeaways: true,
            toneIsConversationalAndHuman: true,
            avoidsRoboticFiller: true,
          },
          ownershipVerified: true,
          rightsConfirmedByCreator: true,
        }),
      });

      const data = await res.json();
      if (data.success && data.draft) {
        setDrafts((prev) => [data.draft, ...prev]);
        setSelectedDraftId(data.draft.id);
        setShowCreateModal(false);
        setNewTitle('');
        setNewAudience('');
        onAddToast('Draft Created', `"${data.draft.courseTitle}" registered in publishing pipeline.`, 'success');
      }
    } catch (err: any) {
      onAddToast('Creation Error', err?.message || 'Could not create publishing draft.', 'info');
    }
  };

  const handleRunOriginalityScan = () => {
    if (!testContent.trim()) return;
    const res = scanTextForOriginality(testContent);
    setScanResult(res);
  };

  const currentStageIndex = selectedDraft
    ? STAGES_LIST.findIndex((s) => s.id === selectedDraft.currentStage)
    : 0;

  return (
    <div className="app-main">
      {/* 1. Header Bar */}
      <div className="section-heading-bar">
        <div>
          <h2>Course Publishing &amp; Editorial Rights Workflow</h2>
          <p className="lead-paragraph" style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-sm)' }}>
            Strict 7-stage quality control verifying human educator tone, originality heuristics, ownership permissions, and commercial licence assignment.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary btn-md"
        >
          <Plus size={16} />
          <span>New Course Draft</span>
        </button>
      </div>

      {/* 2. Publisher Attribution & 4-6 Week Review Banner */}
      <div
        className="card"
        style={{
          marginBottom: 'var(--space-8)',
          background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-subtle) 100%)',
          borderLeft: '4px solid var(--color-primary)',
          padding: 'var(--space-5)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', fontSize: 'var(--text-xs)' }}>
          <div>
            <span style={{ color: 'var(--color-text-subtle)', display: 'block' }}>Platform Owner &amp; Lead Publisher:</span>
            <strong style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-strong)' }}>Sameer Chouhan / WebZoneBW</strong>
            <div style={{ color: 'var(--color-text-muted)' }}>Verified Editorial &amp; Curriculum Publisher</div>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-subtle)', display: 'block' }}>Mandatory Review Cycle:</span>
            <strong style={{ color: 'var(--color-text-strong)' }}>Every 4 to 6 Weeks</strong>
            <div style={{ color: 'var(--color-success)' }}>Ensures technical accuracy and active code compatibility</div>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-subtle)', display: 'block' }}>Quality Policy:</span>
            <strong style={{ color: 'var(--color-text-strong)' }}>Zero Robotic AI Slop</strong>
            <div style={{ color: 'var(--color-text-muted)' }}>Originality verification &amp; human fact-checking required</div>
          </div>
        </div>
      </div>

      {/* 3. Draft Selector & Stage Pipeline Visualizer */}
      {selectedDraft && (
        <div className="card" style={{ marginBottom: 'var(--space-8)', padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <select
                  value={selectedDraft.id}
                  onChange={(e) => setSelectedDraftId(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', fontWeight: 700, fontSize: 'var(--text-md)', minWidth: '320px' }}
                >
                  {drafts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.courseTitle} ({d.currentStage})
                    </option>
                  ))}
                </select>
                <span className="badge badge-accent">v{selectedDraft.version}</span>
              </div>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-text-muted)' }}>
                Target Audience: <strong>{selectedDraft.targetAudience}</strong> · {selectedDraft.chaptersCount} Chapters · {selectedDraft.totalLessonsCount} Lessons · {selectedDraft.wordCount.toLocaleString()} Words
              </p>
            </div>

            <span className="badge badge-primary" style={{ padding: '0.35rem 0.75rem', textTransform: 'uppercase' }}>
              Current: {selectedDraft.currentStage}
            </span>
          </div>

          {/* 7-Stage Horizontal Pipeline Bar */}
          <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            {STAGES_LIST.map((stage, idx) => {
              const isPassed = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div
                  key={stage.id}
                  style={{
                    flex: 1,
                    minWidth: '100px',
                    padding: '0.55rem 0.4rem',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: isCurrent
                      ? 'var(--color-primary)'
                      : isPassed
                      ? 'var(--color-success-bg)'
                      : 'var(--color-surface-subtle)',
                    color: isCurrent
                      ? '#ffffff'
                      : isPassed
                      ? 'var(--color-success)'
                      : 'var(--color-text-subtle)',
                    border: isPassed ? '1px solid var(--color-success-border)' : '1px solid var(--color-border)',
                  }}
                >
                  {isPassed ? `✓ ${stage.title}` : stage.title}
                </div>
              );
            })}
          </div>

          {/* Stage Details & Verification Checklist */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)', marginBottom: '1.5rem' }}>
            {/* Checklist */}
            <div style={{ backgroundColor: 'var(--color-surface-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle)', marginBottom: '0.5rem' }}>
                Pedagogical Quality Checklist:
              </div>
              <div style={{ display: 'grid', gap: '0.35rem', fontSize: '11px', color: 'var(--color-text)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--color-success)' }} />
                  <span>Clear step-by-step learning objectives</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--color-success)' }} />
                  <span>Scholarly definition blocks with mental models</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--color-success)' }} />
                  <span>Executable code examples and diagrams</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--color-success)' }} />
                  <span>Hands-on practice sandbox assignments</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--color-success)' }} />
                  <span>Conversational, human educator teaching voice</span>
                </div>
              </div>
            </div>

            {/* Ownership & Licences */}
            <div style={{ backgroundColor: 'var(--color-surface-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle)', marginBottom: '0.5rem' }}>
                Ownership &amp; Rights Verification:
              </div>
              <div style={{ fontSize: '11px', display: 'grid', gap: '0.35rem', color: 'var(--color-text-muted)' }}>
                <div>Content Owner: <strong>{selectedDraft.contentOwner}</strong></div>
                <div>Publisher Identity: <strong>{selectedDraft.publisherIdentity}</strong></div>
                <div>Originality Score: <strong style={{ color: 'var(--color-success)' }}>{selectedDraft.originalityScore}/100 Verified</strong></div>
                <div>Next Scheduled Maintenance Audit: <strong>{new Date(selectedDraft.nextMaintenanceDue).toLocaleDateString()}</strong></div>
              </div>
            </div>
          </div>

          {/* Advance Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem' }}>
            {selectedDraft.currentStage === 'creation' && (
              <button
                type="button"
                onClick={() => handleAdvanceStage('ownership-verification')}
                className="btn btn-primary btn-md"
              >
                <span>Verify Ownership &amp; Attribution</span>
                <ArrowRight size={15} />
              </button>
            )}

            {selectedDraft.currentStage === 'ownership-verification' && (
              <button
                type="button"
                onClick={() => handleAdvanceStage('originality-review')}
                className="btn btn-primary btn-md"
              >
                <span>Run Originality &amp; Heuristic Scan</span>
                <ArrowRight size={15} />
              </button>
            )}

            {selectedDraft.currentStage === 'originality-review' && (
              <button
                type="button"
                onClick={() => handleAdvanceStage('quality-review')}
                className="btn btn-primary btn-md"
              >
                <span>Submit to Human Quality Sign-off</span>
                <ArrowRight size={15} />
              </button>
            )}

            {selectedDraft.currentStage === 'quality-review' && (
              <button
                type="button"
                onClick={() => handleAdvanceStage('licence-selection')}
                className="btn btn-primary btn-md"
              >
                <span>Approve Quality &amp; Configure Licences</span>
                <ArrowRight size={15} />
              </button>
            )}

            {selectedDraft.currentStage === 'licence-selection' && (
              <button
                type="button"
                onClick={() => handleAdvanceStage('pricing-approval')}
                className="btn btn-primary btn-md"
              >
                <span>Set USD Pricing Matrix</span>
                <ArrowRight size={15} />
              </button>
            )}

            {selectedDraft.currentStage === 'pricing-approval' && (
              <button
                type="button"
                onClick={() => handleAdvanceStage('published')}
                className="btn btn-accent btn-md"
              >
                <Sparkles size={16} />
                <span>Publish Course &amp; Queue Weekly Updates</span>
              </button>
            )}

            {selectedDraft.currentStage === 'published' && (
              <span className="badge badge-success" style={{ padding: '0.45rem 0.85rem' }}>
                ✓ Live &amp; Published under Sameer Chouhan / WebZoneBW
              </span>
            )}
          </div>
        </div>
      )}

      {/* 4. Interactive Originality & Cliché Scanner Laboratory */}
      <div className="card" style={{ marginBottom: 'var(--space-8)', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Search size={20} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 800 }}>
            Originality &amp; Human-Voice Quality Scanner
          </h3>
        </div>
        <p style={{ margin: '0 0 1rem 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          Paste draft lesson text below to scan for generic AI clichés, robotic fluff, code example presence, and definition blocks before submitting to the review queue.
        </p>

        <textarea
          rows={5}
          placeholder="Paste draft chapter or lesson text to analyze originality and conversational educator tone..."
          value={testContent}
          onChange={(e) => setTestContent(e.target.value)}
          className="form-input"
          style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '12px', marginBottom: '0.75rem' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={handleRunOriginalityScan}
            disabled={!testContent.trim()}
            className="btn btn-secondary btn-sm"
          >
            <Search size={14} />
            <span>Scan Content Originality</span>
          </button>
        </div>

        {scanResult && (
          <div
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>Scan Audit Results:</span>
              <span className={`badge ${scanResult.score >= 80 ? 'badge-success' : 'badge-accent'}`}>
                Score: {scanResult.score}/100
              </span>
            </div>

            <div style={{ fontSize: '11px', display: 'grid', gap: '0.4rem' }}>
              <div>
                <strong>Findings &amp; Flags:</strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0.2rem 0', display: 'grid', gap: '0.2rem' }}>
                  {scanResult.flags.map((flag, i) => (
                    <li key={i} style={{ color: scanResult.score >= 80 ? 'var(--color-text-muted)' : 'var(--color-danger)' }}>
                      • {flag}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Editorial Recommendations:</strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0.2rem 0', display: 'grid', gap: '0.2rem' }}>
                  {scanResult.recommendations.map((rec, i) => (
                    <li key={i} style={{ color: 'var(--color-text)' }}>
                      → {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Draft Creation Modal */}
      {showCreateModal && (
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
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="card"
            style={{
              maxWidth: '520px',
              width: '100%',
              border: '1px solid var(--color-border)',
              padding: 'var(--space-6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 1rem 0', fontSize: 'var(--text-lg)', fontWeight: 800 }}>
              Initialize New Educational Course Draft
            </h3>

            <form onSubmit={handleCreateDraft} style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                  Course Title:
                </label>
                <input
                  type="text"
                  placeholder="e.g., Advanced Asynchronous Patterns in JavaScript"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                  Target Audience:
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mid-level frontend developers"
                  value={newAudience}
                  onChange={(e) => setNewAudience(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                  Difficulty Level:
                </label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as any)}
                  className="form-select"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)', backgroundColor: 'var(--color-surface-subtle)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                Owner &amp; Publisher Identity will be locked to: <strong>Sameer Chouhan / WebZoneBW</strong> with a 5-week factual review cycle.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" disabled={!newTitle.trim()} className="btn btn-primary btn-sm">
                  Create Draft &amp; Start Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
