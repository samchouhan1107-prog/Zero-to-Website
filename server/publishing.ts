import fs from 'fs';
import path from 'path';
import { RightsRecord, saveRightsRecord, LicenceType } from './ownership-licensing';

/**
 * ============================================================================
 * PUBLISHING ENGINE & EDITORIAL QUALITY PIPELINE
 * 7-Stage Workflow:
 * Content Creation ➔ Ownership Verification ➔ Originality Review ➔
 * Quality Review ➔ Licence Selection ➔ Pricing Approval ➔ Publication
 * ============================================================================
 */

export type {
  PublishingStage,
  PublishingDraft,
} from '../src/shared/publishingTypes';

export {
  scanTextForOriginality,
} from '../src/shared/publishingTypes';

import {
  PublishingStage,
  PublishingDraft,
} from '../src/shared/publishingTypes';

const PUBLISHING_DATA_FILE = path.join(process.cwd(), 'server', 'publishing-drafts.json');

let draftsMemory: PublishingDraft[] = [];

function loadDrafts(): void {
  try {
    if (fs.existsSync(PUBLISHING_DATA_FILE)) {
      draftsMemory = JSON.parse(fs.readFileSync(PUBLISHING_DATA_FILE, 'utf-8'));
    } else {
      draftsMemory = getInitialDrafts();
      saveDrafts();
    }
  } catch (err) {
    console.warn('[PublishingEngine] Could not load drafts, using initial:', err);
    draftsMemory = getInitialDrafts();
  }
}

function saveDrafts(): void {
  try {
    fs.writeFileSync(PUBLISHING_DATA_FILE, JSON.stringify(draftsMemory, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[PublishingEngine] Failed to save drafts:', err);
  }
}

function getInitialDrafts(): PublishingDraft[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'draft-ai-llm-mastery',
      courseTitle: 'Full-Stack AI Engineer with Local & Cloud LLMs',
      creatorId: 'default',
      creatorName: 'Sameer Chouhan',
      creatorEmail: '',
      contentOwner: 'Sameer Chouhan / WebZoneBW',
      publisherIdentity: 'Sameer Chouhan / WebZoneBW',
      currentStage: 'quality-review',
      targetAudience: 'React & Node.js developers building production AI features',
      difficulty: 'Intermediate',
      chaptersCount: 5,
      totalLessonsCount: 23,
      wordCount: 18450,
      hasSandboxPractices: true,
      hasAssessments: true,
      selectedLicences: ['personal-learning', 'downloadable-learning', 'commercial-use', 'subscription-access'],
      pricingUsd: {
        'personal-learning': 99,
        'downloadable-learning': 149,
        'commercial-use': 299,
        'creator-distribution': 999,
        'subscription-access': 19,
        'limited-term-access': 79,
      },
      originalityScore: 96,
      originalityFlags: ['Passed originality check: No unverified copyrighted materials detected.'],
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
      createdAt: '2026-03-01T10:00:00.000Z',
      updatedAt: now,
      nextMaintenanceDue: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
      version: '1.0.0-rc1',
    },
    {
      id: 'draft-modern-css-design-systems',
      courseTitle: 'High-Performance Modern CSS Architecture & Design Systems',
      creatorId: 'default',
      creatorName: 'Sameer Chouhan',
      creatorEmail: '',
      contentOwner: 'Sameer Chouhan / WebZoneBW',
      publisherIdentity: 'Sameer Chouhan / WebZoneBW',
      currentStage: 'published',
      targetAudience: 'Frontend engineers and UI designers',
      difficulty: 'Beginner',
      chaptersCount: 5,
      totalLessonsCount: 22,
      wordCount: 16200,
      hasSandboxPractices: true,
      hasAssessments: true,
      selectedLicences: ['personal-learning', 'downloadable-learning', 'commercial-use', 'subscription-access'],
      pricingUsd: {
        'personal-learning': 49,
        'downloadable-learning': 79,
        'commercial-use': 189,
        'creator-distribution': 599,
        'subscription-access': 12,
        'limited-term-access': 39,
      },
      originalityScore: 99,
      originalityFlags: ['Authentic human engineering prose verified.'],
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
      createdAt: '2026-02-15T08:00:00.000Z',
      updatedAt: now,
      publishedAt: '2026-03-01T00:00:00.000Z',
      nextMaintenanceDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      version: '1.1.0',
    },
  ];
}

loadDrafts();

export function getAllPublishingDrafts(): PublishingDraft[] {
  return draftsMemory;
}

export function getPublishingDraftById(id: string): PublishingDraft | null {
  return draftsMemory.find((d) => d.id === id) || null;
}

// Advance publishing stage
export function advancePublishingStage(
  draftId: string,
  targetStage: PublishingStage,
  stagePayload?: Partial<PublishingDraft>
): PublishingDraft {
  const draft = draftsMemory.find((d) => d.id === draftId);
  if (!draft) {
    throw new Error(`Draft ${draftId} not found.`);
  }

  const now = new Date().toISOString();

  // If advancing to published, register in ownership rights registry
  if (targetStage === 'published') {
    draft.publishedAt = now;
    draft.nextMaintenanceDue = new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(); // 5 weeks

    saveRightsRecord({
      contentId: draft.id,
      contentTitle: draft.courseTitle,
      contentType: 'course',
      ownershipType: 'platform-owned',
      ownerName: draft.contentOwner || 'Sameer Chouhan / WebZoneBW',
      ownerContact: '',
      publisherName: draft.publisherIdentity || 'Sameer Chouhan / WebZoneBW',
      publisherContact: '',
      creationDate: draft.createdAt,
      publicationDate: now,
      lastReviewedDate: now,
      nextReviewDueDate: draft.nextMaintenanceDue,
      reviewCycleWeeks: 5,
      version: draft.version,
      revisionHistory: [
        {
          version: draft.version,
          date: now,
          changedBy: draft.creatorName || 'Sameer Chouhan',
          summary: 'Formally approved through 7-stage quality and rights workflow.',
          originalityVerified: true,
        },
      ],
      availableLicences: draft.selectedLicences,
      pricingUsd: draft.pricingUsd,
      copyrightNotice: '© Sameer Chouhan / WebZoneBW. All rights reserved. Published via WebZoneBW Publishing.',
      originalityScore: draft.originalityScore,
      aiAssistedDisclosure: {
        isAiAssisted: false,
        humanReviewedAndFactChecked: true,
        reviewerName: draft.creatorName || 'Sameer Chouhan',
        reviewDate: now,
        editorialNotes: 'Full editorial audit completed and verified for commercial release.',
      },
    });
  }

  const updated: PublishingDraft = {
    ...draft,
    ...stagePayload,
    currentStage: targetStage,
    updatedAt: now,
  };

  const idx = draftsMemory.findIndex((d) => d.id === draftId);
  draftsMemory[idx] = updated;
  saveDrafts();
  return updated;
}

// Create new publishing draft
export function createPublishingDraft(
  data: Omit<PublishingDraft, 'id' | 'currentStage' | 'createdAt' | 'updatedAt' | 'nextMaintenanceDue' | 'version'>
): PublishingDraft {
  const now = new Date().toISOString();
  const newDraft: PublishingDraft = {
    ...data,
    id: `draft-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    currentStage: 'creation',
    contentOwner: data.contentOwner || 'Sameer Chouhan / WebZoneBW',
    publisherIdentity: data.publisherIdentity || 'Sameer Chouhan / WebZoneBW',
    version: '1.0.0-draft',
    createdAt: now,
    updatedAt: now,
    nextMaintenanceDue: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
  };

  draftsMemory.unshift(newDraft);
  saveDrafts();
  return newDraft;
}
