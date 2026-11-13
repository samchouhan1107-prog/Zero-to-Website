import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Zap,
  Save,
  Share2,
  Download,
  Scale,
  FileText,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { StructuredLesson, StructuredLessonBlock } from './types';
import {
  ObjectivesBlock,
  DefinitionBlock,
  CalloutBlock,
  CodeBlock,
  TableBlock,
  ListBlock,
  QABlock,
  PracticeExerciseBlock,
  QuizQuestionsBlock,
  SummaryBlock,
} from './LessonBlockComponents';
import { RightsAndLicensingModal } from '../ownership-licensing/RightsAndLicensingModal';
import { LicencePurchaseModal } from '../ownership-licensing/LicencePurchaseModal';
import { useAuth } from '../../utils/AuthContext';
import { getAuthHeaders } from '../../utils/authService';

interface StructuredLessonRendererProps {
  lesson: StructuredLesson;
  isBookmarked?: boolean;
  isCompleted?: boolean;
  onToggleBookmark?: () => void;
  onComplete?: () => void;
  onOpenSandbox?: () => void;
  onOpenTutor?: (topic: string, code?: string) => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  onSaveToStorehouse?: () => void;
}

export const StructuredLessonRenderer: React.FC<StructuredLessonRendererProps> = ({
  lesson,
  isBookmarked = false,
  isCompleted = false,
  onToggleBookmark,
  onComplete,
  onOpenSandbox,
  onOpenTutor,
  onNavigateNext,
  onNavigatePrev,
  onSaveToStorehouse,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rightsModalOpen, setRightsModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribedToast, setSubscribedToast] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const { user, refreshEntitlement } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const el = document.querySelector('.app-content-wrapper') || window;
      const scrollTop = el === window ? window.scrollY : (el as HTMLElement).scrollTop;
      const scrollHeight =
        el === window
          ? document.documentElement.scrollHeight - window.innerHeight
          : (el as HTMLElement).scrollHeight - (el as HTMLElement).clientHeight;

      if (scrollHeight > 0) {
        setScrollProgress(
          Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100)))
        );
      }
    };

    const target = document.querySelector('.app-content-wrapper') || window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, [lesson.id]);

  const handleDownloadPdf = async () => {
    setDownloadNotice(null);
    try {
      const res = await fetch(`/api/downloads/lesson-pdf/${lesson.id}`, {
        headers: { ...getAuthHeaders() },
      });
      const data = await res.json();

      if (data.success && data.html) {
        const blob = new Blob([data.html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.filename || `lesson-${lesson.id}.html`;
        a.click();
        URL.revokeObjectURL(url);
        setDownloadNotice('PDF study sheet downloaded.');
      } else if (res.status === 403 || !data.success) {
        setPurchaseModalOpen(true);
      }
    } catch {
      setPurchaseModalOpen(true);
    }
  };

  const handleQuickSubscribe = async () => {
    if (!user?.email || user.method === 'guest') {
      setPurchaseModalOpen(true);
      return;
    }
    setIsSubscribing(true);
    try {
      await fetch('/api/subscriptions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({
          studentEmail: user.email,
          studentName: user.name,
          subscribedTracks: [lesson.chapterTitle || 'Core Web Architecture'],
        }),
      });
      setSubscribedToast(true);
      setTimeout(() => setSubscribedToast(false), 4000);
    } catch {}
    setIsSubscribing(false);
  };

  const renderBlock = (block: StructuredLessonBlock) => {
    switch (block.type) {
      case 'heading':
        return (
          <h2 key={block.id} className="lesson-section-heading">
            {block.data.text || block.data}
          </h2>
        );
      case 'subheading':
        return (
          <h3 key={block.id} className="lesson-section-subheading">
            {block.data.text || block.data}
          </h3>
        );
      case 'paragraph':
        return (
          <p key={block.id} className="lesson-paragraph">
            {block.data.text || block.data}
          </p>
        );
      case 'objectives':
        return (
          <ObjectivesBlock
            key={block.id}
            objectives={block.data.items || block.data}
          />
        );
      case 'definition':
        return <DefinitionBlock key={block.id} data={block.data} />;
      case 'callout':
        return <CalloutBlock key={block.id} data={block.data} />;
      case 'code':
        return <CodeBlock key={block.id} data={block.data} />;
      case 'table':
        return <TableBlock key={block.id} data={block.data} />;
      case 'list':
        return <ListBlock key={block.id} data={block.data} />;
      case 'qa':
        return <QABlock key={block.id} data={block.data} />;
      case 'summary':
        return <SummaryBlock key={block.id} items={block.data.items || block.data} />;
      default:
        return null;
    }
  };

  return (
    <article className="lesson-article" id={`lesson-structured-${lesson.id}`}>
      {/* Reading Progress Indicator */}
      <div className="lesson-reading-progress-track" aria-hidden="true" title={`Reading progress: ${scrollProgress}%`}>
        <div
          className="lesson-reading-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Lesson Header Hero */}
      <header className="lesson-hero">
        <div className="lesson-meta-bar">
          <div className="lesson-meta-left">
            {lesson.chapterTitle && (
              <span className="badge badge-primary">
                {lesson.chapterNumber ? `Ch ${lesson.chapterNumber}: ` : ''}
                {lesson.chapterTitle}
              </span>
            )}
            {lesson.sourceType && (
              <span className="badge badge-accent">
                {lesson.sourceType === 'curriculum'
                  ? 'Core Curriculum'
                  : lesson.sourceType === 'ai-generated'
                  ? 'AI Knowledge'
                  : 'Storehouse'}
              </span>
            )}
            <span className="badge">{lesson.difficulty || 'Beginner'}</span>
          </div>

          <div className="lesson-meta-right">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="btn btn-secondary btn-sm"
              title="Download formatted study pack / PDF"
            >
              <Download size={14} />
              <span>PDF Study Pack</span>
            </button>

            {onToggleBookmark && (
              <button
                type="button"
                onClick={onToggleBookmark}
                className={`btn btn-sm ${isBookmarked ? 'btn-accent' : 'btn-secondary'}`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
              >
                {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
              </button>
            )}

            {onComplete && (
              <button
                type="button"
                onClick={onComplete}
                className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
              >
                <CheckCircle2 size={14} />
                <span>{isCompleted ? 'Completed ✓' : 'Mark Done (+50 XP)'}</span>
              </button>
            )}

            {onSaveToStorehouse && (
              <button
                type="button"
                onClick={onSaveToStorehouse}
                className="btn btn-secondary btn-sm"
                title="Save permanent copy to Storehouse"
              >
                <Save size={14} />
                <span>Save</span>
              </button>
            )}
          </div>
        </div>

        <h1 className="lesson-title">{lesson.title}</h1>
        {lesson.introduction && (
          <p className="lesson-tagline">{lesson.introduction}</p>
        )}

        <div className="lesson-quick-stats">
          <span className="lesson-stat-chip">
            <Clock size={13} style={{ color: 'var(--color-accent)' }} />
            {lesson.durationMinutes} min read
          </span>
          {lesson.practice && (
            <span className="lesson-stat-chip">
              <Zap size={13} style={{ color: 'var(--color-success)' }} />
              Practice Sandbox Included
            </span>
          )}
          <span className="lesson-stat-chip">
            <ShieldCheck size={13} style={{ color: 'var(--color-primary)' }} />
            Published by Sameer Chouhan / WebZoneBW
          </span>
          {onOpenTutor && (
            <button
              type="button"
              onClick={() => onOpenTutor(lesson.title)}
              className="btn btn-subtle btn-sm"
              style={{ padding: '0.2rem 0.5rem' }}
            >
              <MessageSquare size={13} style={{ color: 'var(--color-primary)' }} />
              <span>Ask AI Tutor</span>
            </button>
          )}
        </div>
      </header>

      {/* Learning Objectives Callout Box */}
      {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
        <ObjectivesBlock objectives={lesson.learningObjectives} />
      )}

      {/* Main Structured Sections */}
      <div className="lesson-content-body">
        {lesson.sections.map((section) => (
          <section key={section.id} className="lesson-section">
            <h2 className="lesson-section-heading">{section.heading}</h2>
            {section.subheading && (
              <h3 className="lesson-section-subheading">{section.subheading}</h3>
            )}
            <div className="lesson-section-blocks">
              {section.blocks.map((block) => renderBlock(block))}
            </div>
          </section>
        ))}
      </div>

      {/* Practice Exercise Section */}
      {lesson.practice && (
        <PracticeExerciseBlock
          practice={lesson.practice}
          onOpenSandbox={onOpenSandbox}
        />
      )}

      {/* Concept Checkpoint / Quiz */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <QuizQuestionsBlock quiz={lesson.quiz} />
      )}

      {/* Summary Box */}
      {lesson.summary && lesson.summary.length > 0 && (
        <SummaryBlock items={lesson.summary} />
      )}

      {/* Weekly Subscription Callout Ribbon */}
      <aside
        style={{
          marginTop: 'var(--space-8)',
          padding: 'var(--space-5)',
          backgroundColor: 'var(--color-surface-subtle)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <Mail size={16} style={{ color: 'var(--color-accent)' }} />
            <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
              Subscribe to Weekly Curriculum Updates
            </strong>
          </div>
          <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            Receive expanded explanations, additional chapters, practical exercises, and downloadable PDF study packs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleQuickSubscribe}
          disabled={isSubscribing || subscribedToast}
          className="btn btn-accent btn-sm"
        >
          <Mail size={14} />
          <span>{subscribedToast ? '✓ Subscribed to Track' : isSubscribing ? 'Subscribing...' : 'Subscribe Weekly (Free)'}</span>
        </button>
      </aside>

      {/* Stepper Ribbon (Previous / Next) */}
      <footer className="lesson-stepper-ribbon">
        <div>
          {onNavigatePrev ? (
            <button
              type="button"
              onClick={onNavigatePrev}
              className="btn btn-secondary btn-md"
            >
              <ArrowLeft size={16} />
              <span>Previous Lesson</span>
            </button>
          ) : (
            <div />
          )}
        </div>

        <div>
          {onNavigateNext && (
            <button
              type="button"
              onClick={onNavigateNext}
              className="btn btn-primary btn-md"
            >
              <span>Next Lesson</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </footer>

      {/* Legal Ownership, Copyright & Publisher Ribbon */}
      <div
        style={{
          marginTop: 'var(--space-6)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '11px',
          color: 'var(--color-text-subtle)',
        }}
      >
        <div>
          <span>© Sameer Chouhan / WebZoneBW. All rights reserved.</span>
        </div>

        <button
          type="button"
          onClick={() => setRightsModalOpen(true)}
          className="btn btn-subtle btn-sm"
          style={{ fontSize: '11px', padding: '0.2rem 0.5rem' }}
        >
          <Scale size={13} />
          <span>Licence &amp; Rights Terms</span>
        </button>
      </div>

      {downloadNotice && (
        <div
          style={{
            marginTop: 'var(--space-3)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-success)',
          }}
        >
          {downloadNotice}
        </div>
      )}

      {/* Rights & Licensing Modal */}
      <RightsAndLicensingModal
        isOpen={rightsModalOpen}
        onClose={() => setRightsModalOpen(false)}
        contentId="curriculum-core-webzone"
        contentTitle={`Lesson: ${lesson.title}`}
        onSelectLicenceForPurchase={() => {
          setPurchaseModalOpen(true);
        }}
      />

      {/* Licence Purchase Modal */}
      <LicencePurchaseModal
        isOpen={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        contentId="curriculum-core-webzone"
        contentTitle={lesson.title}
        availableLicences={['subscription-access', 'downloadable-learning', 'commercial-use']}
        defaultSelectedLicence="subscription-access"
        pricingUsd={{
          'personal-learning': 0,
          'downloadable-learning': 29,
          'commercial-use': 149,
          'creator-distribution': 499,
          'subscription-access': 19,
          'limited-term-access': 0,
        }}
        onSuccessGrant={() => {
          void refreshEntitlement();
          void handleDownloadPdf();
        }}
      />
    </article>
  );
};
