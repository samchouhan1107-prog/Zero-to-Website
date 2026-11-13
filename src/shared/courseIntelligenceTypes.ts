/**
 * ============================================================================
 * SHARED COURSE INTELLIGENCE & REVENUE ENGINE TYPES & DATA
 * ============================================================================
 */

export interface CourseOpportunity {
  id: string;
  title: string;
  tagline: string;
  category: 'ai-fullstack' | 'frontend-css' | 'security-backend' | 'devops-cloud' | 'architecture';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  targetAudience: string;
  skillGapDescription: string;
  marketDemandScore: number;       // 0-100
  competitionSaturationScore: number; // 0-100 (lower means less crowded)
  practicalUtilityScore: number;   // 0-100
  overallOpportunityScore: number; // Weighted composite score
  estimatedEffortWeeks: number;
  estimatedVideoHours: number;
  suggestedPriceUsd: {
    selfPaced: number;
    withDownloads: number;
    teamCommercial: number;
    monthlySubscription: number;
  };
  monetizationChannels: string[];
  keyModules: Array<{
    moduleNumber: number;
    title: string;
    description: string;
    lessonsCount: number;
    deliverableProject: string;
  }>;
  downloadableAssets: string[];
  risksAndMitigations: string[];
  researchDate: string;
  researchSources: string[];
}

export interface RevenueFunnelInputs {
  monthlyVisitors: number;
  conversionRatePercent: number;
  averageOrderValueUsd: number;
  platformCommissionPercent?: number;
  paymentProcessingFeePercent?: number; // e.g. 2.9
  paymentProcessingFixedUsd?: number;  // e.g. 0.30
  refundRatePercent?: number;          // e.g. 3.0
}

export interface RevenueProjectionScenario {
  scenarioName: 'Conservative' | 'Moderate' | 'Optimistic';
  assumedConversionRate: number;
  monthlyVisitors: number;
  projectedPurchasesMonthly: number;
  grossRevenueMonthlyUsd: number;
  paymentProcessingFeesMonthlyUsd: number;
  platformFeesMonthlyUsd: number;
  refundReserveMonthlyUsd: number;
  netRevenueMonthlyUsd: number;
  netRevenueAnnualUsd: number;
  confidenceDescription: string;
}

// 5 Verified International Course Opportunities
export const VERIFIED_COURSE_OPPORTUNITIES: CourseOpportunity[] = [
  {
    id: 'opp-ai-fullstack-cloud-llms',
    title: 'Full-Stack AI Engineer with Local & Cloud LLMs',
    tagline: 'Build production AI applications with function calling, streaming SSE, vector embeddings, and fallback patterns.',
    category: 'ai-fullstack',
    difficulty: 'Intermediate',
    targetAudience: 'Software engineers, web developers, and tech leads transitioning into generative AI application development.',
    skillGapDescription:
      'Most online tutorials stop at basic chat completions. Production teams require expertise in deterministic function calling, server-sent event (SSE) streaming reliability, prompt injection defense, token cost budgeting, and graceful multi-model fallback routines.',
    marketDemandScore: 96,
    competitionSaturationScore: 38, // High demand, low high-grade practical competition
    practicalUtilityScore: 98,
    overallOpportunityScore: 94,
    estimatedEffortWeeks: 4,
    estimatedVideoHours: 12,
    suggestedPriceUsd: {
      selfPaced: 89,
      withDownloads: 129,
      teamCommercial: 349,
      monthlySubscription: 19,
    },
    monetizationChannels: [
      'Direct individual enrolments (USD global checkout)',
      'Enterprise team licensing for engineering departments',
      'Downloadable boilerplate & architecture kit bundle',
      'Continuous monthly updates via Weekly Learning Subscription',
    ],
    keyModules: [
      {
        moduleNumber: 1,
        title: 'Production LLM Architecture: Beyond Chat Prompts',
        description: 'Mental models of token budgets, system instructions, temperature, and API abstractions.',
        lessonsCount: 4,
        deliverableProject: 'Configurable multi-provider AI gateway proxy.',
      },
      {
        moduleNumber: 2,
        title: 'Server-Sent Events (SSE) & Resilient Live Streaming',
        description: 'Handling network drops, backpressure, and typing visualizers without React re-render lag.',
        lessonsCount: 5,
        deliverableProject: '60fps zero-lag streaming markdown workspace.',
      },
      {
        moduleNumber: 3,
        title: 'Structured Outputs, Tool Calling & Agentic Loops',
        description: 'Enforcing JSON schemas, deterministic validation, and multi-step tool execution with human-in-the-loop safeguards.',
        lessonsCount: 5,
        deliverableProject: 'Automated data researcher agent with schema validation.',
      },
      {
        moduleNumber: 4,
        title: 'Embeddings, Semantic Search & Retrieval (RAG)',
        description: 'Vector chunking strategies, cosine similarity, hybrid keyword-vector search, and context budgeting.',
        lessonsCount: 6,
        deliverableProject: 'Offline-first documentation assistant with vector search.',
      },
      {
        moduleNumber: 5,
        title: 'Production Hardening, Cost Capping & Security Defense',
        description: 'Defending against prompt injection, sanitizing outputs, token usage rate limits, and fallback circuit breakers.',
        lessonsCount: 4,
        deliverableProject: 'Enterprise production-readiness security compliance suite.',
      },
    ],
    downloadableAssets: [
      'Complete production TypeScript boilerplate with Express & Vite',
      'Comprehensive PDF Textbook Study Pack with architectural diagrams',
      'Automated testing harness with token cost simulator',
      'Pre-built Docker compose container for local WebGPU LLM experiments',
    ],
    risksAndMitigations: [
      'Rapid API deprecation ➔ Mitigated by focusing on durable HTTP/SSE patterns and SDK abstraction layers.',
      'Token consumption costs ➔ Mitigated by integrating mock test harnesses and local WebGPU models.',
    ],
    researchDate: '2026-03-01',
    researchSources: [
      'Stack Overflow Developer Survey (AI Engineering Growth)',
      'GitHub Octoverse (Fastest growing open-source repositories)',
      'Hacker News Who is Hiring analysis (LLM Engineering requirements)',
    ],
  },
  {
    id: 'opp-modern-css-design-systems',
    title: 'High-Performance Modern CSS Architecture & Design Systems',
    tagline: 'Master standard CSS3, Subgrid, fluid clamp typography, container queries, and 60fps micro-animations.',
    category: 'frontend-css',
    difficulty: 'Beginner',
    targetAudience: 'Junior to mid-level frontend engineers, UI/UX designers, and freelance web developers.',
    skillGapDescription:
      'Developers suffer from Tailwind fatigue and bloated framework dependencies. There is strong international demand for mastering native CSS3 modern engines: CSS Grid Subgrid, Container Queries, fluid clamp mathematics, and accessibility standards without runtime overhead.',
    marketDemandScore: 91,
    competitionSaturationScore: 52, // Moderate saturation, but high demand for pure CSS
    practicalUtilityScore: 95,
    overallOpportunityScore: 88,
    estimatedEffortWeeks: 3,
    estimatedVideoHours: 10,
    suggestedPriceUsd: {
      selfPaced: 59,
      withDownloads: 89,
      teamCommercial: 249,
      monthlySubscription: 12,
    },
    monetizationChannels: [
      'Individual course enrolment',
      'Downloadable UI Component Vault (pre-built accessible widgets)',
      'Figma-to-Code companion packs',
      'Agency and freelance client-delivery kit',
    ],
    keyModules: [
      {
        moduleNumber: 1,
        title: 'Modern CSS Foundation: Box Model, Logical Properties & Reset',
        description: 'Writing zero-bug CSS resets and layout math.',
        lessonsCount: 4,
        deliverableProject: 'Bulletproof cross-browser editorial layout.',
      },
      {
        moduleNumber: 2,
        title: 'CSS Grid, Subgrid & Multi-Axis Fluid Layouts',
        description: 'Solving complex nested layouts without wrapper hacks.',
        lessonsCount: 5,
        deliverableProject: 'Responsive dashboard and magazine layout.',
      },
      {
        moduleNumber: 3,
        title: 'Container Queries & Intrinsic Responsive Web Design',
        description: 'Designing components that respond to container dimensions rather than viewport width.',
        lessonsCount: 4,
        deliverableProject: 'Universal polymorphic card component system.',
      },
      {
        moduleNumber: 4,
        title: 'Fluid Typography & Math-Driven Design Tokens',
        description: 'Mastering CSS clamp(), calc(), and color-mix().',
        lessonsCount: 4,
        deliverableProject: 'Self-scaling design token system with zero CSS files.',
      },
      {
        moduleNumber: 5,
        title: '60fps GPU Animations & WCAG 2.2 Accessibility',
        description: 'Silky page transitions, reduced-motion queries, and high-contrast compliance.',
        lessonsCount: 5,
        deliverableProject: 'Accessible micro-interaction UI library.',
      },
    ],
    downloadableAssets: [
      'Copy-paste CSS component vault with 45+ accessible widgets',
      'Figma design token synchronization template',
      'Formatted offline PDF reference sheets and layout cheat-sheets',
    ],
    risksAndMitigations: [
      'Perception that CSS is "easy" ➔ Mitigated by framing as senior-level architecture and performance optimization.',
      'Browser compatibility ➔ Mitigated by testing against Baseline 2025/2026 browser matrices.',
    ],
    researchDate: '2026-02-15',
    researchSources: [
      'State of CSS Annual Survey',
      'MDN Web Docs Web Status Tracker',
      'CSS-Tricks & Smashing Magazine Developer Reading Metrics',
    ],
  },
  {
    id: 'opp-enterprise-web-security',
    title: 'Enterprise Web Security, Authentication & Zero-Trust Architecture',
    tagline: 'Defend web applications against OWASP Top 10, secure cross-domain sessions, OAuth 2.1, and cryptographic auditing.',
    category: 'security-backend',
    difficulty: 'Advanced',
    targetAudience: 'Mid-to-senior full-stack developers, backend engineers, and aspiring Tech Leads.',
    skillGapDescription:
      'Security breaches are costly and prevalent. Boot camps barely touch true session security, cross-site leak mitigation, iframe sandbox boundaries, or cryptographically verified audit trails. High corporate expense reimbursement makes this a lucrative niche.',
    marketDemandScore: 89,
    competitionSaturationScore: 24, // Low saturation for deep technical security courses
    practicalUtilityScore: 99,
    overallOpportunityScore: 92,
    estimatedEffortWeeks: 6,
    estimatedVideoHours: 16,
    suggestedPriceUsd: {
      selfPaced: 249,
      withDownloads: 349,
      teamCommercial: 899,
      monthlySubscription: 29,
    },
    monetizationChannels: [
      'Corporate team training & compliance licensing',
      'Individual security certification path',
      'Security audit checklist and policy template bundle',
      'Premium 1-on-1 architecture review add-on ($450/hr)',
    ],
    keyModules: [
      {
        moduleNumber: 1,
        title: 'OWASP Top 10 Deconstruction & Exploit Reproduction',
        description: 'Hands-on reproduction of XSS, CSRF, SSRF, and SQLi in controlled test sandboxes.',
        lessonsCount: 5,
        deliverableProject: 'Penetration testing write-up and patch suite.',
      },
      {
        moduleNumber: 2,
        title: 'Modern Session Management & Zero-Trust Auth',
        description: 'HttpOnly SameSite cookies, JWT rotation, refresh token reuse detection, and MFA.',
        lessonsCount: 5,
        deliverableProject: 'Zero-trust authentication microservice.',
      },
      {
        moduleNumber: 3,
        title: 'Cryptographic Auditing & Tamper-Evident Ledgers',
        description: 'HMAC signature verification, content integrity hashes, and secure audit logging.',
        lessonsCount: 4,
        deliverableProject: 'Immutable audit log with cryptographic verification.',
      },
      {
        moduleNumber: 4,
        title: 'Content Security Policy (CSP Level 3) & Subresource Integrity',
        description: 'Eliminating inline script vectors, strict nonces, and SRI hashes in CDNs.',
        lessonsCount: 4,
        deliverableProject: 'Strictest Level 3 CSP implementation without breaking analytics.',
      },
    ],
    downloadableAssets: [
      'Enterprise security checklist (80-point audit template)',
      'Pre-configured attack sandbox Docker containers',
      'Production middleware library for CSRF, CSP, and rate limiting in Node.js',
    ],
    risksAndMitigations: [
      'High difficulty threshold ➔ Mitigated with step-by-step visual sandbox demonstrations.',
      'Corporate purchasing friction ➔ Mitigated with formal expense reimbursement invoice generators.',
    ],
    researchDate: '2026-01-20',
    researchSources: [
      'OWASP Foundation Annual Reports',
      'Verizon Data Breach Investigations Report (DBIR)',
      'Enterprise Developer Security Spending Trends',
    ],
  },
  {
    id: 'opp-cloud-devops-containers',
    title: 'Zero-Cost to Scale: Modern Cloud DevOps & Container Orchestration',
    tagline: 'Deploy, monitor, and scale full-stack web applications on modern cloud infrastructure with CI/CD.',
    category: 'devops-cloud',
    difficulty: 'Intermediate',
    targetAudience: 'Developers tired of manual deployment and expensive hosting bills.',
    skillGapDescription:
      'Engineers know how to write code on localhost, but struggle with automated CI/CD pipelines, Docker multi-stage builds, reverse proxies, and cloud cost containment. Learners are eager to escape vendor lock-in.',
    marketDemandScore: 93,
    competitionSaturationScore: 48,
    practicalUtilityScore: 97,
    overallOpportunityScore: 90,
    estimatedEffortWeeks: 4,
    estimatedVideoHours: 11,
    suggestedPriceUsd: {
      selfPaced: 79,
      withDownloads: 119,
      teamCommercial: 299,
      monthlySubscription: 15,
    },
    monetizationChannels: [
      'Direct course sales',
      'Cloud deployment template marketplace',
      'Affiliate partnerships with transparent hosting providers',
    ],
    keyModules: [
      {
        moduleNumber: 1,
        title: 'Production Docker: Multi-Stage Builds & Distroless Images',
        description: 'Shrinking 1.2GB node_modules images down to 45MB secure production containers.',
        lessonsCount: 4,
        deliverableProject: 'Optimized Docker container with zero CVEs.',
      },
      {
        moduleNumber: 2,
        title: 'Automated CI/CD with GitHub Actions',
        description: 'Automated test runners, branch preview environments, and zero-downtime rolling deploys.',
        lessonsCount: 5,
        deliverableProject: 'Complete production CI/CD pipeline.',
      },
      {
        moduleNumber: 3,
        title: 'Reverse Proxies, SSL Certificates & Domain Routing',
        description: 'Nginx, Caddy, Cloudflare DNS, automatic Let’s Encrypt certificates, and HTTP/3.',
        lessonsCount: 4,
        deliverableProject: 'High-speed edge proxy with automatic SSL and caching.',
      },
      {
        moduleNumber: 4,
        title: 'Infrastructure as Code (IaC) & Cloud Cost Optimization',
        description: 'Deploying with Terraform / Pulumi, monitoring resource limits, and setting billing alerts.',
        lessonsCount: 4,
        deliverableProject: 'Scale-to-zero cloud deployment costing under $5/month.',
      },
    ],
    downloadableAssets: [
      'Ready-to-deploy GitHub Actions workflow templates',
      'Optimized Dockerfile library for Node, Python, and Go',
      'Terraform modular cloud provisioning scripts',
    ],
    risksAndMitigations: [
      'Cloud provider UI changes ➔ Mitigated by teaching CLI and Infrastructure-as-Code standards.',
    ],
    researchDate: '2026-02-10',
    researchSources: ['GitHub DevOps Report', 'DORA State of DevOps Research'],
  },
  {
    id: 'opp-microservices-distributed-systems',
    title: 'Distributed Systems & Event-Driven Architecture for Web Apps',
    tagline: 'Build fault-tolerant distributed web applications with event sourcing, CQRS, and transactional outbox patterns.',
    category: 'architecture',
    difficulty: 'Advanced',
    targetAudience: 'Senior developers and architects designing high-volume data-intensive systems.',
    skillGapDescription:
      'Engineers struggle when moving from single-process apps to distributed systems. Distributed transactions, outbox patterns, message ordering, and failure recovery are essential skills for senior engineers.',
    marketDemandScore: 87,
    competitionSaturationScore: 42,
    practicalUtilityScore: 94,
    overallOpportunityScore: 86,
    estimatedEffortWeeks: 5,
    estimatedVideoHours: 13,
    suggestedPriceUsd: {
      selfPaced: 129,
      withDownloads: 179,
      teamCommercial: 449,
      monthlySubscription: 19,
    },
    monetizationChannels: ['Direct course sales', 'Enterprise team training', 'Downloadable microservice template blueprints'],
    keyModules: [
      {
        moduleNumber: 1,
        title: 'Deconstructing Monoliths & Domain-Driven Design (DDD)',
        description: 'Bounded contexts, event storms, and service boundaries.',
        lessonsCount: 4,
        deliverableProject: 'Domain boundary mapping specification.',
      },
      {
        moduleNumber: 2,
        title: 'Message Brokers & Event Streams',
        description: 'Publish/subscribe patterns, dead-letter queues, and at-least-once delivery.',
        lessonsCount: 5,
        deliverableProject: 'Resilient message consumer with retry backoff.',
      },
      {
        moduleNumber: 3,
        title: 'The Transactional Outbox Pattern & Idempotency',
        description: 'Guaranteed message publishing without two-phase commit.',
        lessonsCount: 4,
        deliverableProject: 'Idempotent payment processing event handler.',
      },
      {
        moduleNumber: 4,
        title: 'Distributed Observability, OpenTelemetry & Distributed Tracing',
        description: 'Tracing requests across multiple microservices with correlation IDs.',
        lessonsCount: 4,
        deliverableProject: 'End-to-end tracing dashboard with OpenTelemetry.',
      },
    ],
    downloadableAssets: [
      'Docker Compose distributed multi-service development environment',
      'Outbox pattern reference implementation in TypeScript',
      '100-page distributed architecture handbook',
    ],
    risksAndMitigations: ['Complexity of local setup ➔ Mitigated with 1-click Docker containers and mock brokers.'],
    researchDate: '2026-02-28',
    researchSources: ['CNCF Cloud Native Survey', 'ThoughtWorks Technology Radar'],
  },
];

// Calculate transparent multi-scenario revenue estimates
export function calculateRevenueScenarios(inputs: RevenueFunnelInputs): {
  scenarios: RevenueProjectionScenario[];
  assumptions: {
    visitors: number;
    aovUsd: number;
    platformFeePct: number;
    gatewayFee: string;
    refundReservePct: number;
  };
  disclaimer: string;
} {
  const visitors = Math.max(100, inputs.monthlyVisitors);
  const aov = Math.max(10, inputs.averageOrderValueUsd);
  const platformFeePct = inputs.platformCommissionPercent ?? 12; // 12% platform fee
  const gatewayPct = (inputs.paymentProcessingFeePercent ?? 2.9) / 100;
  const gatewayFixed = inputs.paymentProcessingFixedUsd ?? 0.30;
  const refundPct = (inputs.refundRatePercent ?? 3.0) / 100;

  const SCENARIO_CONFIGS: Array<{
    name: 'Conservative' | 'Moderate' | 'Optimistic';
    convRate: number;
    confidence: string;
  }> = [
    {
      name: 'Conservative',
      convRate: Number((inputs.conversionRatePercent * 0.55).toFixed(2)),
      confidence: 'Realistic baseline assuming cold organic traffic and standard email capture.',
    },
    {
      name: 'Moderate',
      convRate: Number(inputs.conversionRatePercent.toFixed(2)),
      confidence: 'Expected outcome with engaging course previews, verified reviews, and targeted developer audiences.',
    },
    {
      name: 'Optimistic',
      convRate: Number((inputs.conversionRatePercent * 1.65).toFixed(2)),
      confidence: 'Upper-bound performance assuming warm community referrals, email launch sequence, and high purchase intent.',
    },
  ];

  const scenarios: RevenueProjectionScenario[] = SCENARIO_CONFIGS.map((cfg) => {
    const purchases = Math.max(0, Math.round(visitors * (cfg.convRate / 100)));
    const grossMonthly = Number((purchases * aov).toFixed(2));
    const gatewayFees = Number((purchases * (aov * gatewayPct + gatewayFixed)).toFixed(2));
    const refundReserve = Number((grossMonthly * refundPct).toFixed(2));
    const netBeforePlatform = grossMonthly - gatewayFees - refundReserve;
    const platformFees = Number((netBeforePlatform * (platformFeePct / 100)).toFixed(2));
    const netMonthly = Number(Math.max(0, netBeforePlatform - platformFees).toFixed(2));
    const netAnnual = Number((netMonthly * 12).toFixed(2));

    return {
      scenarioName: cfg.name,
      assumedConversionRate: cfg.convRate,
      monthlyVisitors: visitors,
      projectedPurchasesMonthly: purchases,
      grossRevenueMonthlyUsd: grossMonthly,
      paymentProcessingFeesMonthlyUsd: gatewayFees,
      platformFeesMonthlyUsd: platformFees,
      refundReserveMonthlyUsd: refundReserve,
      netRevenueMonthlyUsd: netMonthly,
      netRevenueAnnualUsd: netAnnual,
      confidenceDescription: cfg.confidence,
    };
  });

  return {
    scenarios,
    assumptions: {
      visitors,
      aovUsd: aov,
      platformFeePct,
      gatewayFee: '2.9% + $0.30 per transaction',
      refundReservePct: 3.0,
    },
    disclaimer:
      'LEGAL & FINANCIAL TRANSPARENCY NOTICE: The figures above represent mathematical model simulations based on user-editable conversion and traffic variables. They do NOT constitute guaranteed income, financial promises, or investment advice. Actual revenue depends on instructional quality, marketing execution, audience fit, economic conditions, and customer retention.',
  };
}
