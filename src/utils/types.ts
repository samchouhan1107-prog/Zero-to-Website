export type VisualType =
  | 'network-flow'
  | 'box-model'
  | 'flexbox'
  | 'grid'
  | 'dom-tree'
  | 'git-flow'
  | 'responsive-view'
  | 'html-skeleton'
  | 'color-palette';

export interface Objective {
  text: string;
}

export interface Analogy {
  title: string;
  concept: string;
  story: string;
  moral: string;
  icon?: string;
}

export interface CodeBreakdownLine {
  lineRange: string;
  title: string;
  explanation: string;
  highlightTokens?: string[];
}

export interface CodeExample {
  title: string;
  description: string;
  html: string;
  css: string;
  js?: string;
  breakdown: CodeBreakdownLine[];
  outputPreviewTitle?: string;
}

export interface VideoTimestamp {
  time: string;
  seconds: number;
  title: string;
  description: string;
}

export interface VideoTranscriptItem {
  speaker: string;
  time: string;
  seconds: number;
  text: string;
}

export interface LessonVideo {
  title: string;
  duration: string;
  description: string;
  keyPoints: string[];
  timestamps: VideoTimestamp[];
  transcript: VideoTranscriptItem[];
  demoAnimationType: 'packet-route' | 'dom-build' | 'css-cascade' | 'flex-align' | 'grid-track' | 'js-event' | 'git-branch' | 'deploy-cloud';
}

export interface TestCase {
  id: string;
  description: string;
  hint: string;
  // Rule definition evaluated on rendered sandbox
  checkType: 'selector-exists' | 'style-computed' | 'text-contains' | 'js-executed' | 'attribute-equals';
  target?: string;
  expectedValue?: string;
}

export interface PracticeChallenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  prompt: string;
  instructions: string[];
  starterHtml: string;
  starterCss: string;
  starterJs: string;
  solutionHtml: string;
  solutionCss: string;
  solutionJs: string;
  hints: string[];
  testCases: TestCase[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MiniProject {
  title: string;
  subtitle: string;
  description: string;
  specifications: string[];
  starterCode: {
    html: string;
    css: string;
    js: string;
  };
}

export interface RelatedTopic {
  title: string;
  chapterNumber: string;
  lessonId?: string;
  lessonSlug?: string;
  context: string;
}

export interface Lesson {
  id: string;
  chapterId: string;
  number: string;
  slug: string;
  title: string;
  tagline: string;
  durationMinutes: number;
  learningObjectives: string[];
  theorySections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
    callout?: {
      type: 'tip' | 'warning' | 'note' | 'key-rule';
      text: string;
    };
  }[];
  realWorldAnalogy: Analogy;
  visualType: VisualType;
  codeExample: CodeExample;
  video: LessonVideo;
  practice: PracticeChallenge;
  quiz: QuizQuestion[];
  miniProject?: MiniProject;
  summary: string[];
  relatedTopics: RelatedTopic[];
}

export interface Chapter {
  id: string;
  number: string;
  badge: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedHours: string;
  accentColor: string;
  iconName: string;
  totalLessons: number;
  lessons: Lesson[];
}

export interface XpMilestone {
  id: string;
  xpRequired: number;
  title: string;
  rank: string;
  badge: string;
  rewardDescription: string;
  unlockedPerks: string[];
  motivationQuote: string;
  accentColor: string;
}

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastery';

export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  category: 'Concept' | 'Syntax' | 'Best Practice' | 'Debugging' | 'Accessibility';
  difficulty?: DifficultyLevel;
  codeSnippet?: string;
  tip?: string;
}

export interface BugHuntPuzzle {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  hint: string;
  brokenCode: string;
  fixedCode: string;
  explanation: string;
  language: 'html' | 'css' | 'javascript';
}

export interface CodeSequenceStep {
  id: string;
  code: string;
  hint?: string;
  order: number;
}

export interface CodeSequencePuzzle {
  id: string;
  title: string;
  difficulty?: DifficultyLevel;
  instructions: string;
  language: 'html' | 'css' | 'javascript';
  steps: CodeSequenceStep[];
  explanation: string;
}

export interface SpeedQuizItem {
  id: string;
  prompt: string;
  difficulty?: DifficultyLevel;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonActivityDeck {
  lessonId: string;
  title: string;
  overallDifficulty?: DifficultyLevel;
  flashcards: FlashcardItem[];
  bugHunt: BugHuntPuzzle;
  codeSequence: CodeSequencePuzzle;
  speedQuiz: SpeedQuizItem[];
  cheatsheetItems: {
    term: string;
    definition: string;
    codeExample?: string;
  }[];
}

export interface UserProgress {
  completedLessons: Record<string, boolean>;
  completedChallenges: Record<string, boolean>;
  completedActivities?: Record<string, boolean>;
  quizScores: Record<string, number>;
  claimedMilestones: string[];
  bookmarks: string[];
  notes: Record<string, string>;
  lastVisitedLessonId?: string;
  streakDays: number;
  lastActiveDate: string;
  xpPoints: number;
}

export type AppTheme = 'dark' | 'light';

export interface AppSettings {
  theme: AppTheme;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  fontFamily: 'sans' | 'serif' | 'mono' | 'dyslexic';
  readingMode: boolean;
  autoRunSandbox: boolean;
  soundEnabled: boolean;
}

export type ViewMode =
  | 'home'
  | 'chapter'
  | 'lesson'
  | 'activities'
  | 'practice-hub'
  | 'visual-lab'
  | 'video-studio'
  | 'curriculum';
