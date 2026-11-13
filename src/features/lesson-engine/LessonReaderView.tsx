import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import { Chapter, UserProgress } from '../../utils/types';
import { StructuredLesson } from './types';
import { normalizeLessonToStructured } from './adapter';
import { StructuredLessonRenderer } from './StructuredLessonRenderer';
import { saveStorehouseRecord } from '../storehouse/storehouseService';
import { useAuth } from '../../utils/AuthContext';
import * as authService from '../../utils/authService';
import { LicencePurchaseModal } from '../ownership-licensing/LicencePurchaseModal';

interface LessonReaderViewProps {
  lessonId: string;
  customLesson?: StructuredLesson | null;
  chapters: Chapter[];
  progress: UserProgress;
  onNavigateLesson: (lessonId: string) => void;
  onCompleteLesson: (lessonId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
  onSaveNote: (lessonId: string, note: string) => void;
  onOpenSandbox: () => void;
  onOpenAssistant: (topic?: string, code?: string) => void;
  onAddToast: (title: string, message: string, type?: 'info' | 'success' | 'update') => void;
}

export const LessonReaderView: React.FC<LessonReaderViewProps> = ({
  lessonId,
  customLesson,
  chapters,
  progress,
  onNavigateLesson,
  onCompleteLesson,
  onToggleBookmark,
  onSaveNote,
  onOpenSandbox,
  onOpenAssistant,
  onAddToast,
}) => {
  const { user, entitlement, refreshEntitlement } = useAuth();
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const isFreeLesson = lessonId.startsWith('ch-00') || Boolean(customLesson);
  const [accessState, setAccessState] = useState<{
    checking: boolean;
    allowed: boolean;
    reason?: string;
  }>({
    checking: !isFreeLesson,
    allowed: isFreeLesson || entitlement.hasActiveMonthlyPack || entitlement.unlockedAllChapters,
  });

  useEffect(() => {
    let active = true;
    if (isFreeLesson) {
      setAccessState({ checking: false, allowed: true });
      return;
    }

    setAccessState({
      checking: true,
      allowed: entitlement.hasActiveMonthlyPack || entitlement.unlockedAllChapters,
    });

    authService
      .fetchLessonAccess(lessonId)
      .then((res) => {
        if (!active) return;
        setAccessState({
          checking: false,
          allowed: Boolean(res.allowed),
          reason: res.reason,
        });
      })
      .catch(() => {
        if (!active) return;
        setAccessState({
          checking: false,
          allowed: entitlement.hasActiveMonthlyPack || entitlement.unlockedAllChapters,
        });
      });

    return () => {
      active = false;
    };
  }, [lessonId, isFreeLesson, user?.id, entitlement.hasActiveMonthlyPack, entitlement.unlockedAllChapters]);

  // Find current lesson and chapter
  const allLessons = chapters.flatMap((c) => c.lessons);
  const currentLesson = allLessons.find((l) => l.id === lessonId);
  const currentChapter = chapters.find((c) => c.lessons.some((l) => l.id === lessonId));

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isCompleted = !!progress.completedLessons?.[lessonId];
  const isBookmarked = progress.bookmarks?.includes(lessonId) || false;

  // Convert to canonical StructuredLesson
  let structured: StructuredLesson | null = null;
  if (customLesson) {
    structured = customLesson;
  } else if (currentLesson) {
    structured = normalizeLessonToStructured(currentLesson, currentChapter);
  }

  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainEl = document.querySelector('.app-content-wrapper');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lessonId, customLesson]);

  if (!structured) {
    return (
      <div className="app-main" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
        <h3>Lesson Not Found</h3>
        <p style={{ color: 'var(--color-text-muted)' }}>
          The requested lesson ID "{lessonId}" could not be located in the curriculum.
        </p>
        <button
          type="button"
          onClick={() => onNavigateLesson('ch-00-l-01')}
          className="btn btn-primary btn-md"
        >
          Return to Chapter 00
        </button>
      </div>
    );
  }

  // Server-enforced Monthly Pack paywall gate for Chapters 01-10
  if (!accessState.checking && !accessState.allowed) {
    return (
      <div className="app-main" style={{ maxWidth: '780px', margin: '0 auto', padding: 'var(--space-10) var(--space-6)' }}>
        <div
          className="card"
          style={{
            padding: 'var(--space-8)',
            border: '2px solid var(--color-primary)',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-primary">
              {structured.chapterNumber ? `Chapter ${structured.chapterNumber}` : 'Paid Curriculum'}
            </span>
            <span className="badge badge-warning">Monthly Pack Required</span>
          </div>

          <h1 className="lesson-title" style={{ marginBottom: '0.5rem' }}>
            {structured.title}
          </h1>
          <p className="lesson-tagline" style={{ marginBottom: '1.5rem' }}>
            {structured.introduction}
          </p>

          <div
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Lock size={18} style={{ color: 'var(--color-primary)' }} />
              <strong style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-strong)' }}>
                Unlock All 11 Chapters Automatically After Merchant Verification
              </strong>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
              {accessState.reason ||
                'Chapter 00 is free for everyone. Chapters 01–10 and offline PDF study packs unlock immediately once your Weekly Learning Membership ($19.00 USD / month) is verified by our merchant payment gateway.'}
            </p>
            <div style={{ display: 'grid', gap: '0.4rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-strong)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />
                <span>Verified server-side activation in 5–10 seconds</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />
                <span>Full access to interactive sandboxes, quizzes, and PDF downloads</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setPurchaseModalOpen(true)}
              className="btn btn-primary btn-md"
            >
              <span>Unlock Monthly Pack ($19.00 USD / mo)</span>
              <ArrowRight size={15} />
            </button>
            <button
              type="button"
              onClick={() => onNavigateLesson('ch-00-l-01')}
              className="btn btn-secondary btn-md"
            >
              <BookOpen size={15} />
              <span>Read Free Chapter 00</span>
            </button>
          </div>
        </div>

        <LicencePurchaseModal
          isOpen={purchaseModalOpen}
          onClose={() => setPurchaseModalOpen(false)}
          contentId="curriculum-core-webzone"
          contentTitle={structured.title}
          availableLicences={['subscription-access']}
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
            onAddToast(
              'Subscription Activated',
              `"${structured!.title}" and all curriculum chapters are now unlocked.`,
              'success'
            );
          }}
        />
      </div>
    );
  }

  const handleSaveToStorehouse = async () => {
    if (!structured) return;
    await saveStorehouseRecord({
      id: `storehouse-copy-${structured.id}`,
      title: structured.title,
      type: 'lesson',
      data: structured,
      tags: ['Curriculum', structured.chapterTitle || 'Standard'],
    });
    onAddToast(
      'Saved to Storehouse',
      `"${structured.title}" is now permanently archived in your Storehouse.`,
      'success'
    );
  };

  return (
    <div className="app-main">
      <StructuredLessonRenderer
        lesson={structured}
        isBookmarked={isBookmarked}
        isCompleted={isCompleted}
        onToggleBookmark={() => onToggleBookmark(structured!.id)}
        onComplete={() => onCompleteLesson(structured!.id)}
        onOpenSandbox={onOpenSandbox}
        onOpenTutor={(topic, code) => onOpenAssistant(topic, code)}
        onNavigateNext={nextLesson ? () => onNavigateLesson(nextLesson.id) : undefined}
        onNavigatePrev={prevLesson ? () => onNavigateLesson(prevLesson.id) : undefined}
        onSaveToStorehouse={handleSaveToStorehouse}
      />
    </div>
  );
};
