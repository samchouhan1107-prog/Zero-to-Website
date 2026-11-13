import { GoogleGenAI } from '@google/genai';

/**
 * ============================================================================
 * COURSE INTELLIGENCE & MARKET OPPORTUNITY ENGINE (SERVER)
 * Re-exports shared opportunity models and handles server-side AI synthesis.
 * ============================================================================
 */

export type {
  CourseOpportunity,
  RevenueFunnelInputs,
  RevenueProjectionScenario,
} from '../src/shared/courseIntelligenceTypes';

export {
  VERIFIED_COURSE_OPPORTUNITIES,
  calculateRevenueScenarios,
} from '../src/shared/courseIntelligenceTypes';

// Generate dynamic AI course proposal with Gemini 3.7 Flash fallback
export async function synthesizeCourseProposal(
  ai: GoogleGenAI | null,
  topic: string,
  targetAudience?: string,
  difficulty?: string
): Promise<{ success: boolean; proposal: any; source: string }> {
  const selectedTopic = topic || 'Modern Web Security and Zero-Trust Architecture';
  const audience = targetAudience || 'Full-Stack Developers and Software Engineers';
  const diff = difficulty || 'Intermediate';

  const staticFallbackProposal = {
    title: selectedTopic,
    targetAudience: audience,
    difficulty: diff,
    learningOutcomes: [
      `Master the core architectural principles and mental models of ${selectedTopic}`,
      'Implement production-ready patterns with full error boundaries and type safety',
      'Design, build, and deploy an end-to-end portfolio project solving real-world challenges',
      'Avoid common industry pitfalls, security bugs, and performance regressions',
    ],
    courseFormat: 'Hybrid (Interactive Reading + Hands-on Sandbox Labs + Weekly Updates)',
    suggestedPriceUsd: {
      selfPaced: 89,
      withDownloads: 129,
      teamCommercial: 349,
      monthlySubscription: 14,
    },
    estimatedDevelopmentWeeks: 4,
    monetizationOpportunities: [
      'Self-paced one-time purchase licence',
      'Downloadable PDF study packs and code assets',
      'Corporate team licences for engineering upskilling',
      'Weekly content update subscription',
    ],
    chapters: [
      {
        chapterNumber: 1,
        title: 'Foundations & Mental Models',
        description: 'Core concepts, historical context, and architectural fundamentals.',
        lessons: [
          '1.1 Industry Overview & Motivation',
          '1.2 Architectural Terminology & Definitions',
          '1.3 First Practical Implementation',
        ],
        practiceChallenge: 'Build a minimal working prototype in the sandbox.',
      },
      {
        chapterNumber: 2,
        title: 'Production Patterns & Implementation',
        description: 'Deep dive into robust implementation, edge cases, and type safety.',
        lessons: [
          '2.1 Component Breakdown & Data Flow',
          '2.2 Handling Errors & Asynchronous States',
          '2.3 Unit Testing & Verification',
        ],
        practiceChallenge: 'Implement hardened validation and error boundaries.',
      },
      {
        chapterNumber: 3,
        title: 'Advanced Optimizations & Real-World Capstone',
        description: 'Performance profiling, security hardening, and deployment pipeline.',
        lessons: [
          '3.1 Performance Benchmarking & Memory Profiling',
          '3.2 Security Considerations & Attack Surface',
          '3.3 Production Deployment & Monitoring',
        ],
        practiceChallenge: 'Deploy complete capstone project with automated checks.',
      },
    ],
    risksAndSuggestions: [
      'Scope creep: Keep initial release focused on 3 core chapters before expanding.',
      'Audience mismatch: Clearly state prerequisite programming knowledge in introduction.',
    ],
  };

  if (!ai) {
    return { success: true, proposal: staticFallbackProposal, source: 'built-in-intelligence-engine' };
  }

  const prompt = `You are a Senior Curriculum Architect and Educational Product Strategist.
Create a comprehensive, human-centred, production-grade course proposal for:
Topic: "${selectedTopic}"
Target Audience: "${audience}"
Difficulty: "${diff}"

Return a valid JSON object with these exact keys:
- title: (string) compelling, clear course title
- targetAudience: (string) who will benefit most
- difficulty: (string) Beginner, Intermediate, or Advanced
- learningOutcomes: (array of 4 specific, actionable learning achievements)
- courseFormat: (string) e.g., "Interactive Reading + Code Sandboxes + Formatted PDFs"
- suggestedPriceUsd: (object with selfPaced, withDownloads, teamCommercial, monthlySubscription numbers)
- estimatedDevelopmentWeeks: (number between 2 and 8)
- monetizationOpportunities: (array of 4 distinct monetization angles)
- chapters: (array of 3-4 structured chapters, each with chapterNumber, title, description, lessons array of 3 strings, and practiceChallenge string)
- risksAndSuggestions: (array of 2-3 genuine risks and practical mitigations)

Guidelines:
1. Avoid generic AI marketing buzzwords. Use natural, conversational, professional educator language.
2. Ensure realistic pricing and realistic development timelines.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    if (response && response.text) {
      const parsed = JSON.parse(response.text);
      return { success: true, proposal: parsed, source: 'gemini-3.7-flash' };
    }
    return { success: true, proposal: staticFallbackProposal, source: 'built-in-intelligence-engine' };
  } catch (err: any) {
    console.warn('[CourseIntelligence] AI Synthesis failed, using built-in engine:', err?.message || err);
    return { success: true, proposal: staticFallbackProposal, source: 'built-in-intelligence-engine' };
  }
}
