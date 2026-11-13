import { PracticeChallenge, QuizQuestion, RelatedTopic } from '../../utils/types';

export type BlockType =
  | 'heading'
  | 'subheading'
  | 'paragraph'
  | 'objectives'
  | 'definition'
  | 'callout'
  | 'example'
  | 'code'
  | 'table'
  | 'list'
  | 'diagram'
  | 'visualizer'
  | 'practice'
  | 'qa'
  | 'summary';

export interface DefinitionBlockData {
  term: string;
  phonetic?: string;
  definition: string;
  context?: string;
}

export interface CalloutBlockData {
  type: 'tip' | 'warning' | 'note' | 'key-rule' | 'info';
  title?: string;
  content: string;
}

export interface ExampleBlockData {
  title: string;
  description: string;
  code?: {
    html?: string;
    css?: string;
    js?: string;
    language?: string;
  };
  outputPreview?: string;
  explanation?: string;
}

export interface CodeBlockData {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
}

export interface TableBlockData {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ListBlockData {
  style: 'bullet' | 'ordered';
  items: string[];
}

export interface QABlockData {
  question: string;
  answer: string;
  explanation?: string;
  options?: string[];
  correctIndex?: number;
}

export interface StructuredLessonBlock {
  id: string;
  type: BlockType;
  data: any;
}

export interface StructuredLessonSection {
  id: string;
  heading: string;
  subheading?: string;
  blocks: StructuredLessonBlock[];
}

export interface StructuredLesson {
  id: string;
  chapterId?: string;
  chapterNumber?: string;
  chapterTitle?: string;
  number?: string;
  slug?: string;
  title: string;
  introduction: string;
  durationMinutes: number;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
  learningObjectives?: string[];
  sections: StructuredLessonSection[];
  summary?: string[];
  practice?: PracticeChallenge;
  quiz?: QuizQuestion[];
  relatedTopics?: RelatedTopic[];
  author?: {
    name: string;
    role: string;
  };
  createdAt?: string;
  updatedAt?: string;
  sourceType?: 'curriculum' | 'ai-generated' | 'user-created' | 'chat-saved' | 'imported';
}
