import { LicenceType } from './ownershipTypes';

/**
 * ============================================================================
 * SHARED PUBLISHING & EDITORIAL PIPELINE TYPES
 * ============================================================================
 */

export type PublishingStage =
  | 'creation'
  | 'ownership-verification'
  | 'originality-review'
  | 'quality-review'
  | 'licence-selection'
  | 'pricing-approval'
  | 'published';

export interface PublishingDraft {
  id: string;
  courseTitle: string;
  creatorId: string;
  creatorName: string;
  creatorEmail: string;
  contentOwner: string; // Default: 'Sameer Chouhan / WebZoneBW'
  publisherIdentity: string; // 'Sameer Chouhan / WebZoneBW'
  currentStage: PublishingStage;
  targetAudience: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  chaptersCount: number;
  totalLessonsCount: number;
  wordCount: number;
  hasSandboxPractices: boolean;
  hasAssessments: boolean;
  selectedLicences: LicenceType[];
  pricingUsd: Record<LicenceType, number>;
  originalityScore: number; // 0 - 100
  originalityFlags: string[];
  qualityChecklist: {
    hasClearObjectives: boolean;
    hasDefinitionsAndMentalModels: boolean;
    hasWorkingCodeExamples: boolean;
    hasPracticeExercises: boolean;
    hasKnowledgeCheckpoints: boolean;
    hasKeyTakeaways: boolean;
    toneIsConversationalAndHuman: boolean;
    avoidsRoboticFiller: boolean;
  };
  ownershipVerified: boolean;
  rightsConfirmedByCreator: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  nextMaintenanceDue: string; // 4-6 week review cycle
  version: string;
}

// Automated Originality and Heuristic Quality Review Scanner
export function scanTextForOriginality(content: string): {
  score: number; // 0-100
  flags: string[];
  recommendations: string[];
} {
  const flags: string[] = [];
  const recommendations: string[] = [];
  let deduction = 0;

  const genericClichés = [
    'delve into',
    'testament to',
    'game changer',
    'in the ever-evolving landscape',
    'revolutionize the way',
    'fast-paced world of',
    'a tapestry of',
    'unlock your potential',
    'paradigm shift',
    'without further ado',
  ];

  const lower = content.toLowerCase();
  for (const cliché of genericClichés) {
    if (lower.includes(cliché)) {
      deduction += 6;
      flags.push(`Found generic AI cliché phrase: "${cliché}".`);
      recommendations.push(`Replace "${cliché}" with concrete, conversational engineering terminology.`);
    }
  }

  // Check code example density
  if (!content.includes('```') && !content.includes('<code>')) {
    deduction += 15;
    flags.push('No code examples detected in lesson content.');
    recommendations.push('Include executable code examples with line-by-line breakdown.');
  }

  // Check technical definitions
  if (!content.includes('Definition') && !content.includes('mental model') && !content.includes('term')) {
    deduction += 8;
    flags.push('Lacks formal terminology definition box.');
    recommendations.push('Add explicit definition blocks to ground student mental models.');
  }

  const score = Math.max(30, 100 - deduction);

  return {
    score,
    flags: flags.length > 0 ? flags : ['No unverified phrasing or stock clichés detected. Content reads naturally.'],
    recommendations:
      recommendations.length > 0
        ? recommendations
        : ['Exemplary human educator voice with practical demonstrations.'],
  };
}
