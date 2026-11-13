import { Chapter } from '../../utils/types';
import { CHAPTERS_DATA } from '../chaptersData';
import { AI_ENGINEER_MODULES, AI_ENGINEER_COURSE } from './ai-engineer';
import { MODERN_CSS_MODULES, MODERN_CSS_COURSE } from './modern-css';

export interface FeaturedCourseDefinition {
  id: string;
  title: string;
  tagline: string;
  level: string;
  duration: string;
  lessonsCount: number;
  description: string;
  priceUsd: number;
  weeklySubscriptionUsd: number;
  learningOutcomes: string[];
  modules: Chapter[];
  isFeatured?: boolean;
}

export const CORE_FULLSTACK_COURSE: FeaturedCourseDefinition = {
  id: 'course-core-fullstack',
  title: 'Full-Stack Modern Web Engineering & Production Systems',
  tagline: 'Master end-to-end full stack development from foundational HTML/CSS/TypeScript to reactive UI, Node.js backend architectures, and secure deployment.',
  level: 'Beginner to Advanced',
  duration: '8 Modules • 32 Lessons',
  lessonsCount: CHAPTERS_DATA.reduce((acc, c) => acc + c.lessons.length, 0),
  description: 'The premier hands-on full-stack web engineering curriculum. Master clean architecture, reactive components, server APIs, state persistence, and enterprise software practices.',
  priceUsd: 49,
  weeklySubscriptionUsd: 14,
  learningOutcomes: [
    'Build and deploy responsive, modern web applications from scratch',
    'Master TypeScript fundamentals, data structures, and typed APIs',
    'Construct scalable backend servers with Express and real-time endpoints',
    'Manage state, databases, and persistent user sessions securely'
  ],
  modules: CHAPTERS_DATA,
  isFeatured: true
};

export const AI_ENGINEER_FEATURED_COURSE: FeaturedCourseDefinition = {
  id: AI_ENGINEER_COURSE.id,
  title: AI_ENGINEER_COURSE.title,
  tagline: AI_ENGINEER_COURSE.tagline,
  level: AI_ENGINEER_COURSE.difficulty,
  duration: `${AI_ENGINEER_COURSE.totalModules} Modules • ${AI_ENGINEER_COURSE.totalLessons} Lessons`,
  lessonsCount: AI_ENGINEER_COURSE.totalLessons,
  description: AI_ENGINEER_COURSE.description,
  priceUsd: AI_ENGINEER_COURSE.pricingUsd.selfPaced,
  weeklySubscriptionUsd: AI_ENGINEER_COURSE.pricingUsd.monthlySubscription,
  learningOutcomes: [
    'Deploy and run local LLMs (Llama 3, Mistral, Gemma) using Ollama and GGUF runtimes',
    'Stream tokens real-time using SSE (Server-Sent Events) with zero UI freezing',
    'Enforce structured JSON output with Zod schemas and validation constraints',
    'Implement multi-turn autonomous function-calling and tool-use agents',
    'Build end-to-end RAG pipelines with vector embeddings and cosine search',
    'Deploy production AI microservices on standard cloud infrastructure'
  ],
  modules: AI_ENGINEER_MODULES,
  isFeatured: true
};

export const FEATURED_COURSES: FeaturedCourseDefinition[] = [
  CORE_FULLSTACK_COURSE,
  AI_ENGINEER_FEATURED_COURSE,
  {
    ...MODERN_CSS_COURSE,
    isFeatured: true
  }
];

// Unified list of all chapters/modules across all courses
export const ALL_PLATFORM_CHAPTERS: Chapter[] = [
  ...CHAPTERS_DATA,
  ...AI_ENGINEER_MODULES,
  ...MODERN_CSS_MODULES
];

export function findCourseByLessonId(lessonId: string): FeaturedCourseDefinition | undefined {
  if (AI_ENGINEER_MODULES.some(m => m.lessons.some(l => l.id === lessonId))) {
    return AI_ENGINEER_FEATURED_COURSE;
  }
  if (MODERN_CSS_MODULES.some(m => m.lessons.some(l => l.id === lessonId))) {
    return { ...MODERN_CSS_COURSE, isFeatured: true };
  }
  return CORE_FULLSTACK_COURSE;
}
