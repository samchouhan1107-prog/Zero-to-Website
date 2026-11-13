import { Chapter } from '../../../utils/types';
import { aiModule01 } from './mod01';
import { aiModule02 } from './mod02';
import { aiModule03 } from './mod03';
import { aiModule04 } from './mod04';
import { aiModule05 } from './mod05';
import { aiModule06 } from './mod06';
import { aiModule07 } from './mod07';
import { aiModule08 } from './mod08';
import { aiModule09 } from './mod09';

export const AI_ENGINEER_MODULES: Chapter[] = [
  aiModule01,
  aiModule02,
  aiModule03,
  aiModule04,
  aiModule05,
  aiModule06,
  aiModule07,
  aiModule08,
  aiModule09,
];

export const AI_ENGINEER_COURSE = {
  id: 'opp-ai-fullstack-cloud-llms',
  title: 'Full-Stack AI Engineer with Local & Cloud LLMs',
  tagline: 'Master local and cloud LLMs, streaming SSE, prompt engineering, function calling, RAG pipelines, and hybrid architectures.',
  description: 'A comprehensive, production-grade engineering masterclass. Build complete AI applications from transformer fundamentals to local GGUF models, cloud APIs, vector embeddings, and autonomous agent loops with standard web technologies.',
  difficulty: 'Intermediate' as const,
  category: 'ai-fullstack' as const,
  estimatedHours: '36 hrs',
  totalModules: 9,
  totalLessons: AI_ENGINEER_MODULES.reduce((acc, m) => acc + m.lessons.length, 0),
  badge: 'AI Specialization',
  modules: AI_ENGINEER_MODULES,
  status: 'published' as const,
  pricingUsd: {
    selfPaced: 89,
    monthlySubscription: 19,
  }
};
