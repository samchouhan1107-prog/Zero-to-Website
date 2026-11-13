import { UserProgress } from './types';

export interface ReadingRecognitionState {
  lessonId: string;
  chapterId: string;
  impressionCount: number;
  readSeconds: number;
  scrollDepth: number; // 0 to 100
  isVerifiedReader: boolean;
  comprehensionConfidence: number; // 0 to 100
  recognitionSignals: string[];
  algorithmStatus: 'Analyzing Reading Pace' | 'Authentic Reading Recognized' | 'Deep Comprehension Verified';
}

// Baseline realistic community impressions per chapter
const CHAPTER_BASE_IMPRESSIONS: Record<string, number> = {
  'ch-00': 3420,
  'ch-01': 2890,
  'ch-02': 2640,
  'ch-03': 2310,
  'ch-04': 2180,
  'ch-05': 1950,
  'ch-06': 1840,
  'ch-07': 1720,
  'ch-08': 1590,
  'ch-09': 1480,
  'ch-10': 1390,
};

/**
 * Calculates total recognized impressions for a chapter or lesson
 */
export function getCalculatedImpressions(progress: UserProgress, chapterId: string, lessonId?: string): number {
  const base = CHAPTER_BASE_IMPRESSIONS[chapterId] || 1200;
  const userChapterImpressions = (progress.chapterImpressions && progress.chapterImpressions[chapterId]) || 0;
  
  if (lessonId && progress.readingEngagement && progress.readingEngagement[lessonId]) {
    const userEngagement = progress.readingEngagement[lessonId];
    return base + userChapterImpressions + (userEngagement.verifiedReading ? 7 : 2);
  }
  return base + userChapterImpressions;
}

/**
 * Reading Recognition Algorithm:
 * Evaluates active reading speed, dwell time, and scroll depth to recognize authentic student engagement.
 */
export function evaluateReadingRecognition(
  scrollDepth: number,
  readSeconds: number,
  hasCopiedCode: boolean = false,
  hasAnsweredQuiz: boolean = false,
  lessonId: string = '',
  chapterId: string = ''
): ReadingRecognitionState {
  const depth = Math.min(100, Math.max(0, Math.round(scrollDepth)));
  const signals: string[] = [];

  if (depth > 25) signals.push('Introduction & Objectives Processed');
  if (depth > 55) signals.push('Core Theory & Mental Model Scrolled');
  if (depth > 80) signals.push('Complete Specification Reviewed');
  if (readSeconds >= 20) signals.push('Active Focus Dwell Time ≥ 20s');
  if (readSeconds >= 60) signals.push('Deep Conceptual Processing ≥ 60s');
  if (hasCopiedCode) signals.push('Code Snippet Copied to Clipboard');
  if (hasAnsweredQuiz) signals.push('Interactive Knowledge Check Answered');

  // Confidence computation (0-100)
  let confidence = Math.min(40, Math.round((depth / 100) * 40));
  confidence += Math.min(30, Math.round((readSeconds / 45) * 30));
  if (hasCopiedCode) confidence += 15;
  if (hasAnsweredQuiz) confidence += 15;
  confidence = Math.min(100, confidence);

  const isVerified = depth >= 45 && (readSeconds >= 15 || hasCopiedCode || hasAnsweredQuiz);
  
  let algorithmStatus: ReadingRecognitionState['algorithmStatus'] = 'Analyzing Reading Pace';
  if (confidence >= 80) {
    algorithmStatus = 'Deep Comprehension Verified';
  } else if (isVerified) {
    algorithmStatus = 'Authentic Reading Recognized';
  }

  const base = CHAPTER_BASE_IMPRESSIONS[chapterId] || 1200;

  return {
    lessonId,
    chapterId,
    impressionCount: base + (isVerified ? 3 : 1),
    readSeconds,
    scrollDepth: depth,
    isVerifiedReader: isVerified,
    comprehensionConfidence: confidence,
    recognitionSignals: signals,
    algorithmStatus,
  };
}
