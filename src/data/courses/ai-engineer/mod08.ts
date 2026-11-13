import { Chapter } from '../../../utils/types';

export const aiModule08: Chapter = {
  id: 'ai-mod-08',
  number: '8',
  badge: 'AI 08',
  slug: 'advanced-ai-engineering',
  title: 'Advanced AI Engineering',
  subtitle: 'LLM-as-a-Judge, Continuous Evaluation, Semantic Caching, Latency Optimization & Production Telemetry',
  description: 'Operate AI systems reliably at enterprise scale. Master automated evaluation pipelines with LLM-as-a-judge, continuous regression benchmarking, token cost optimization, semantic vector caching with Redis, and real-time observability telemetry.',
  estimatedHours: '4 hrs',
  accentColor: 'rose',
  iconName: 'BarChart',
  totalLessons: 5,
  lessons: [
    {
      id: 'ai-08-01',
      chapterId: 'ai-mod-08',
      number: '8.1',
      slug: 'model-evaluation',
      title: 'Model Evaluation',
      tagline: 'Automated evaluation pipelines, synthetic test generation, and LLM-as-a-Judge rubrics',
      durationMinutes: 25,
      learningObjectives: [
        'Build automated evaluation test suites using the LLM-as-a-Judge pattern with calibrated rubrics',
        'Measure core metrics: Faithfulness, Answer Relevance, Context Recall, and Semantic Similarity',
        'Prevent regression drift when updating prompts or migrating between model versions'
      ],
      theorySections: [
        {
          heading: '1. Why Unit Tests Fail for Generative AI',
          content: 'Traditional assert(actual === expected) assertions fail in generative applications because an LLM can phrase the exact same correct answer in 50 different valid ways. Automated evaluation uses a powerful judge model (e.g. Gemini 1.5 Pro or Claude 3.5 Sonnet) prompted with an objective numerical rubric to score outputs on a 1-5 scale.',
          bulletPoints: [
            'Reference Evaluation: Compares candidate output against golden reference answers',
            'Reference-Free Evaluation: Evaluates factual consistency against supplied RAG context alone',
            'Golden Dataset: Curated repository of 50-200 real-world user queries representing edge cases and malicious inputs'
          ]
        },
        {
          heading: '2. The RAG Triad Metrics',
          content: 'Production RAG quality is quantified across three orthogonal mathematical axes (TruLens / Ragas framework):',
          bulletPoints: [
            'Context Relevance: Did the retrieval engine fetch documents relevant to the question?',
            'Groundedness / Faithfulness: Is the answer strictly derived from the retrieved documents?',
            'Answer Relevance: Does the generated answer directly address the user core question?'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Olympic Diving Judges',
        concept: 'LLM-as-a-Judge',
        story: 'In Olympic gymnastics or diving, you cannot measure performance with a mechanical stopwatch alone. A panel of certified expert judges observes the dive and assigns scores (1-10) across predefined criteria: execution, difficulty, splash, and posture. By averaging scores across judges, subjective performance becomes a calibrated scientific metric.',
        moral: 'Calibrated rubrics and judge models transform qualitative prose into quantitative engineering metrics.',
        icon: 'Award'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'LLM-as-a-Judge Rubric Evaluator in TypeScript',
        description: 'Scoring candidate answers using a strict evaluation prompt rubric.',
        html: `<div class="eval-card">
  <h4>Automated Judge Evaluator Function</h4>
  <pre><code>export async function evaluateAnswerGroundedness(
  question: string,
  context: string,
  answer: string
): Promise<{ score: number; reasoning: string }> {
  const prompt = \`You are an impartial evaluation judge.
Evaluate the factual groundedness of the Candidate Answer based SOLELY on the Ground Truth Context.

RUBRIC:
5 = Every claim in the answer is directly supported by the context.
3 = Minor details are extrapolated, but core facts match.
1 = The answer contains severe hallucinations or contradicts context.

Context: \${context}
Question: \${question}
Candidate Answer: \${answer}

Output JSON strictly: { "score": number, "reasoning": string }\`;

  const response = await callJudgeModel(prompt);
  return JSON.parse(response);
}</code></pre>
</div>`,
        css: `.eval-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '6-10', title: 'Calibrated Rubric', explanation: 'Provides concrete scoring criteria to ensure consistent numerical ratings across thousands of runs.' }
        ]
      },
      video: {
        title: 'Building Automated CI/CD Evaluation Pipelines',
        duration: '16:00',
        description: 'Setting up automated GitHub Actions regression tests for prompts using golden evaluation datasets.',
        keyPoints: ['Golden dataset curation', 'RAG triad scores', 'Automated PR regression testing'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Evaluation CI/CD', description: 'Continuous evaluation.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we build automated regression suites for our AI models.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-08-01',
        title: 'Compute Average Evaluation Batch Score',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper that takes an array of evaluation scores [5, 4, 5, 2, 5] and returns the mean average rounded to 2 decimals.',
        instructions: [
          'Calculate sum of scores',
          'Divide by array length',
          'Return number rounded to 2 decimal places'
        ],
        starterHtml: `<div id="eval-avg">Average: 0</div>`,
        starterCss: `#eval-avg { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function calculateAverageScore(scores) {
  return 0;
}`,
        solutionHtml: `<div id="eval-avg">Average: 4.20</div>`,
        solutionCss: `#eval-avg { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function calculateAverageScore(scores) {
  const sum = scores.reduce((a, b) => a + b, 0);
  return Number((sum / scores.length).toFixed(2));
}`,
        hints: ['Sum array with reduce and divide by length.'],
        testCases: [
          { id: 'tc-37', description: 'Calculates 4.20 for [5, 4, 5, 2, 5]', hint: '21 / 5 = 4.2', checkType: 'text-contains', expectedValue: '4.2' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-08-01',
          question: 'Why are automated evaluation test suites run before merging prompt changes in production software?',
          options: [
            'To increase the size of the Git commit history',
            'To catch regressions, ensuring that fixing prompt behavior for user case A does not accidentally break behavior for user cases B, C, or D',
            'To translate the codebase into Python',
            'To delete temporary cookies'
          ],
          correctIndex: 1,
          explanation: 'Prompts are fragile code. Prompt modifications often fix one issue while introducing silent regressions across other tasks without automated test suites.'
        }
      ],
      summary: [
        'Traditional unit tests cannot evaluate variable natural language; use LLM-as-a-judge with calibrated rubrics.',
        'Track the RAG Triad: Context Relevance, Groundedness/Faithfulness, and Answer Relevance.',
        'Establish automated CI/CD evaluation pipelines against golden datasets before approving prompt revisions.'
      ],
      relatedTopics: [
        { title: 'Hallucination Reduction', chapterNumber: '8', lessonId: 'ai-08-02', context: 'Advanced anti-hallucination engineering.' }
      ]
    },
    {
      id: 'ai-08-02',
      chapterId: 'ai-mod-08',
      number: '8.2',
      slug: 'hallucination-reduction',
      title: 'Hallucination Reduction',
      tagline: 'Chain-of-verification, self-consistency sampling, and constraint enforcers',
      durationMinutes: 25,
      learningObjectives: [
        'Implement Chain-of-Verification (CoVe): generate baseline answer -> generate verification questions -> execute factual checks -> synthesize corrected final answer',
        'Apply Self-Consistency majority voting: sample 3-5 completions at temperature 0.7 and pick the modal consensus',
        'Build post-generation sanity checkers to detect numerical or entity discrepancies'
      ],
      theorySections: [
        {
          heading: '1. The Chain-of-Verification (CoVe) Architecture',
          content: 'Developed by Meta AI researchers, Chain-of-Verification breaks generation into a 4-step pipeline that reduces factual hallucinations by over 70% in high-stakes reasoning.',
          bulletPoints: [
            'Step 1 (Draft): Model generates an initial draft response to the user query',
            'Step 2 (Plan Verification): Model generates 3-5 factual verification questions targeting its own claims',
            'Step 3 (Execute Verification): Model independently answers each verification question against primary search context without seeing its draft',
            'Step 4 (Final Synthesis): Model cross-examines its draft against the verified answers and emits a revised, hallucination-free answer'
          ]
        },
        {
          heading: '2. Self-Consistency Majority Voting (Wang et al.)',
          content: 'For math, logic, and extraction tasks, sampling a single output can be risky. By generating 3 or 5 completions at temperature 0.5-0.7 and taking the consensus majority answer (modal vote), accuracy improves by 10-25%.',
          bulletPoints: [
            'Parallel generation: Dispatch 3 parallel calls with identical prompts',
            'Voting extraction: Extract the final answer token from each run and select the majority consensus'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Newspaper Fact-Checking Desk',
        concept: 'Chain-of-Verification',
        story: 'A star investigative journalist writes a breaking draft article (Step 1). The managing editor hands the draft to a dedicated fact-checker. The fact-checker writes a list of claims: "Did Company X actually file for bankruptcy on Oct 4?" (Step 2). The fact-checker calls the courthouse and checks public records independently (Step 3). The article is corrected before going to print (Step 4).',
        moral: 'Never publish the first draft of an LLM on critical facts; run an automated fact-checking loop.',
        icon: 'CheckCircle2'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Chain-of-Verification Pipeline in TypeScript',
        description: 'Automated 4-step self-verification loop reducing hallucinated claims.',
        html: `<div class="cove-card">
  <h4>Chain-of-Verification Controller</h4>
  <pre><code>export async function runChainOfVerification(query: string, context: string) {
  // 1. Initial Draft
  const draft = await callAi(\`Answer based on context: \${query}\\nContext: \${context}\`);

  // 2. Formulate verification questions
  const qPrompt = \`Review this draft: "\${draft}"
Generate 3 independent factual verification questions to verify specific assertions in this draft. Output as JSON array of strings.\`;
  const questions: string[] = JSON.parse(await callAi(qPrompt));

  // 3. Execute factual verification
  const verificationResults = await Promise.all(questions.map(q => 
    callAi(\`Fact check this question strictly from context: \${q}\\nContext: \${context}\`)
  ));

  // 4. Final revised synthesis
  const finalPrompt = \`Original Question: \${query}
Draft Answer: \${draft}
Verified Fact Checks:
\${verificationResults.join('\\n')}

Synthesize the final, verified answer. Remove any claims that failed the fact check.\`;

  return await callAi(finalPrompt);
}</code></pre>
</div>`,
        css: `.cove-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 13px; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '6-8', title: 'Question Generation', explanation: 'Directs the model to generate adversarial verification challenges targeting its own assertions.' }
        ]
      },
      video: {
        title: 'Eliminating Hallucinations with CoVe & Self-Consistency',
        duration: '15:50',
        description: 'Implementing Chain-of-Verification and majority voting algorithms in production.',
        keyPoints: ['CoVe 4-step architecture', 'Self-consistency majority voting', 'Evaluating latency vs accuracy tradeoffs'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'CoVe Pipeline', description: 'Verification steps.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we implement automated verification loops to eradicate hallucinations.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-08-02',
        title: 'Calculate Majority Consensus Vote',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper that receives an array of 5 answers ["A", "B", "A", "A", "C"] and returns the majority winner ("A").',
        instructions: [
          'Count occurrences of each answer',
          'Return the candidate with the highest frequency'
        ],
        starterHtml: `<div id="vote-out">Winner: pending</div>`,
        starterCss: `#vote-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function findMajorityWinner(votes) {
  return "";
}`,
        solutionHtml: `<div id="vote-out">Winner: A (3 votes)</div>`,
        solutionCss: `#vote-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function findMajorityWinner(votes) {
  const counts: Record<string, number> = {};
  votes.forEach(v => counts[v] = (counts[v] || 0) + 1);
  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}`,
        hints: ['Use an accumulator map to tally votes.'],
        testCases: [
          { id: 'tc-38', description: 'Picks A as majority winner', hint: 'Count frequencies', checkType: 'text-contains', expectedValue: 'A' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-08-02',
          question: 'What is the core mechanism of the Chain-of-Verification (CoVe) framework?',
          options: [
            'Rerunning the exact same prompt 10 times in a row without changes',
            'Drafting an initial answer, generating targeted verification questions, answering them independently against ground truth, and synthesizing a corrected final answer',
            'Encrypting the output with an AES key',
            'Asking the user if they believe the answer'
          ],
          correctIndex: 1,
          explanation: 'CoVe forces the model to interrogate its own claims through independent verification questions before delivering the final answer.'
        }
      ],
      summary: [
        'Chain-of-Verification (CoVe) systematically fact-checks model assertions against primary source documents.',
        'Self-Consistency majority voting eliminates random sampling errors by selecting the consensus result across multiple parallel passes.',
        'Combine automated verification loops for mission-critical medical, financial, or legal reasoning tasks.'
      ],
      relatedTopics: [
        { title: 'Cost and Latency Optimisation', chapterNumber: '8', lessonId: 'ai-08-03', context: 'Cut token costs and response times.' }
      ]
    },
    {
      id: 'ai-08-03',
      chapterId: 'ai-mod-08',
      number: '8.3',
      slug: 'cost-and-latency-optimisation',
      title: 'Cost and Latency Optimisation',
      tagline: 'Prompt compression, speculative decoding, model distillation, and token budgeting',
      durationMinutes: 25,
      learningObjectives: [
        'Apply prompt compression techniques (LLMLingua) to remove redundant tokens while preserving semantic intent',
        'Understand Speculative Decoding: using a 1B model to draft tokens and a 70B model to verify them in parallel',
        'Implement model distillation principles: fine-tuning smaller 8B models on frontier 70B synthetic trajectories'
      ],
      theorySections: [
        {
          heading: '1. The Economics of Prompt Compression',
          content: 'Unchecked prompts can easily reach 10,000+ tokens per call. Prompt compression techniques analyze token information entropy, stripping out filler words, punctuation redundancy, and verbose phrasing to compress context by 40-60% without hurting reasoning performance.',
          bulletPoints: [
            'Selective Pruning: Removing stop words and boilerplate that add zero mutual information to the task',
            'Structured Summarization: Replacing raw document dumps with structured bulleted property tables',
            'Cost Impact: A 50% reduction in prompt tokens cuts input token costs and TTFT latency by half'
          ]
        },
        {
          heading: '2. Speculative Decoding for 2-3x Speedup',
          content: 'Autoregressive generation is fundamentally memory-bound. Speculative decoding pairs a small, lightning-fast "draft model" (e.g. 1B parameter) with a large "target model" (e.g. 70B parameter).',
          bulletPoints: [
            'Drafting: The 1B draft model guesses the next 5 tokens in 10ms',
            'Verification: The 70B target model evaluates all 5 tokens simultaneously in a single parallel forward pass',
            'Result: 2x to 3x speedup in generation tokens-per-second with mathematically identical output to the large model'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Junior Associate and the Senior Partner',
        concept: 'Speculative Decoding',
        story: 'A junior associate quickly drafts 4 paragraphs of a legal contract in 10 minutes (the draft model). The senior partner reads all 4 paragraphs in 30 seconds and approves 3.5 of them, editing only two words (the target model). The contract is completed 4x faster than if the senior partner had slowly hand-typed every word from scratch.',
        moral: 'Speculative decoding lets small fast models do the typing while big models do the instant verification.',
        icon: 'Zap'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Client-Side Prompt Token Trimmer in TypeScript',
        description: 'Compressing repetitive whitespace, markdown boilerplate, and redundant line breaks.',
        html: `<div class="compress-card">
  <h4>Prompt Token Trimmer</h4>
  <pre><code>export function compressPromptText(rawText: string): string {
  return rawText
    // Collapse multiple spaces into single space
    .replace(/[ \\t]+/g, ' ')
    // Collapse 3+ newlines into double newline
    .replace(/\\n{3,}/g, '\\n\\n')
    // Strip HTML comments or internal markdown annotations
    .replace(/<!--[\\s\\S]*?-->/g, '')
    .trim();
}</code></pre>
</div>`,
        css: `.compress-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '3-8', title: 'Whitespace Normalization', explanation: 'Eliminates wasted tokens caused by excess spaces and line breaks without altering semantics.' }
        ]
      },
      video: {
        title: 'Cost & Latency Optimization for Production AI',
        duration: '15:30',
        description: 'Benchmarking prompt compression ratios, speculative decoding speedups, and token budget audits.',
        keyPoints: ['LLMLingua prompt pruning', 'Speculative decoding mechanics', 'Token budgeting spreadsheets'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Optimization', description: 'Cost reduction.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we cut our cloud AI bills by 50% while doubling generation speeds.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-08-03',
        title: 'Calculate Monthly Cost Savings from 40% Compression',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Calculate the monthly financial savings on an application spending $2,500/month on input tokens if prompt compression saves 40%.',
        instructions: [
          'Multiply $2,500 by 0.40',
          'Return savings dollar amount'
        ],
        starterHtml: `<div id="savings-out">Savings: $0.00</div>`,
        starterCss: `#savings-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function calculateSavings(monthlyBill, compressionPercent) {
  return 0;
}`,
        solutionHtml: `<div id="savings-out">Monthly Savings: $1000.00</div>`,
        solutionCss: `#savings-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function calculateSavings(monthlyBill, compressionPercent) {
  return monthlyBill * (compressionPercent / 100);
}`,
        hints: ['2500 * 0.40 = 1000.'],
        testCases: [
          { id: 'tc-39', description: 'Calculates $1000 savings', hint: '2500 * 0.4', checkType: 'text-contains', expectedValue: '1000' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-08-03',
          question: 'How does Speculative Decoding accelerate LLM generation without compromising output quality?',
          options: [
            'It skips generating punctuation marks',
            'A small draft model rapidly generates candidate token sequences, which the large target model verifies in a single parallel attention pass',
            'It runs the model in reverse order',
            'It compresses the screen resolution'
          ],
          correctIndex: 1,
          explanation: 'Speculative decoding drafts tokens quickly with a small model and validates them in a single parallel pass with the large model.'
        }
      ],
      summary: [
        'Prompt compression removes redundant tokens, slashing input token bills and Time to First Token latency.',
        'Speculative decoding delivers 2-3x faster generation by pairing fast draft models with large verifiers.',
        'Always establish token budgets for prompts to prevent silent cost creeping across product updates.'
      ],
      relatedTopics: [
        { title: 'Caching and Rate Limiting', chapterNumber: '8', lessonId: 'ai-08-04', context: 'Implement semantic vector caches.' }
      ]
    },
    {
      id: 'ai-08-04',
      chapterId: 'ai-mod-08',
      number: '8.4',
      slug: 'caching-and-rate-limiting',
      title: 'Caching and Rate Limiting',
      tagline: 'Semantic vector caching with Redis, exact match caches, and distributed token bucket limits',
      durationMinutes: 25,
      learningObjectives: [
        'Differentiate between Exact Key-Value Caching (SHA-256 hash) and Semantic Vector Caching (cosine similarity > 0.95)',
        'Build a semantic cache that intercepts semantically identical questions and returns cached answers in 5ms with $0.00 cost',
        'Implement distributed token bucket rate limiters to protect upstream cloud quotas'
      ],
      theorySections: [
        {
          heading: '1. Exact vs. Semantic Caching',
          content: 'In traditional web applications, caches look for identical string keys. But users ask the same question in slightly different words: "How do I reset my password?" vs "Steps to change password?". Exact caching misses 90% of repeat queries. Semantic caching embeds the incoming query and checks if a semantically equivalent query was answered recently.',
          bulletPoints: [
            'Exact Match (Redis string key = SHA256(prompt)): 0ms overhead, but only catches character-identical queries',
            'Semantic Cache (Vector search with cosine threshold > 0.96): Catches synonyms and rephrasings; eliminates 30-50% of expensive model calls',
            'Cache TTL: Set Time-to-Live (e.g. 24 hours) to prevent serving stale information'
          ]
        },
        {
          heading: '2. The Token Bucket Rate Limiting Algorithm',
          content: 'To prevent users from exhausting your shared company API quota, implement token bucket rate limiters that allow bursts while enforcing a steady average throughput.',
          bulletPoints: [
            'Bucket Capacity: Maximum burst size (e.g. 50 tokens)',
            'Refill Rate: Tokens added per second (e.g. 5 tokens/sec)',
            'Distributed Sync: Stored in Redis so multiple Express web server instances enforce a unified global quota'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The College Professor Office Hours FAQ',
        concept: 'Semantic Caching',
        story: 'If 40 students ask the professor the exact same question phrased differently ("When is the midterm?" vs "What day is the exam?"), the professor does not spend 10 minutes deriving the schedule from scratch 40 times. The professor pins a sheet on the door with the date (the cache). 38 students read the door sheet in 2 seconds without knocking.',
        moral: 'Do not re-compute identical answers; intercept repeat queries at the front door with a semantic cache.',
        icon: 'Database'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Semantic Vector Cache Lookup in TypeScript',
        description: 'Checking semantic similarity against cached queries before calling the cloud LLM.',
        html: `<div class="cache-code-card">
  <h4>Semantic Cache Interceptor</h4>
  <pre><code>interface CachedEntry {
  embedding: number[];
  answer: string;
}

export async function checkSemanticCache(
  queryEmbedding: number[],
  cache: CachedEntry[],
  similarityThreshold = 0.96
): Promise<string | null> {
  for (const entry of cache) {
    const similarity = cosineSimilarity(queryEmbedding, entry.embedding);
    if (similarity >= similarityThreshold) {
      console.log(\`Semantic cache hit! Score: \${similarity.toFixed(4)}\`);
      return entry.answer; // 5ms response, $0.00 cost!
    }
  }
  return null; // Cache miss; call frontier LLM
}</code></pre>
</div>`,
        css: `.cache-code-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '12-16', title: 'Threshold Check', explanation: 'If cosine similarity is above 0.96, the query is functionally identical and returns the cached answer instantly.' }
        ]
      },
      video: {
        title: 'Building a Semantic Cache with Redis & Embeddings',
        duration: '16:15',
        description: 'Implementing semantic cache intercepts, TTL expiry, and distributed rate limiting.',
        keyPoints: ['Semantic threshold calibration', 'Redis vector search indexes', 'Token bucket rate limiting'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Semantic Caching', description: 'Cache architectures.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we build a semantic cache that cuts API bills by up to 50%.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-08-04',
        title: 'Detect Semantic Cache Match Threshold',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper that returns true if a candidate score is >= 0.96, indicating a semantic cache hit.',
        instructions: [
          'If score >= 0.96 return true',
          'Otherwise return false'
        ],
        starterHtml: `<div id="cache-hit-out">Cache: pending</div>`,
        starterCss: `#cache-hit-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function isCacheHit(score) {
  return false;
}`,
        solutionHtml: `<div id="cache-hit-out">Cache Hit: true (Score: 0.98 >= 0.96)</div>`,
        solutionCss: `#cache-hit-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function isCacheHit(score) {
  return score >= 0.96;
}`,
        hints: ['Check score >= 0.96.'],
        testCases: [
          { id: 'tc-40', description: 'Returns true for 0.98', hint: '0.98 >= 0.96', checkType: 'text-contains', expectedValue: 'true' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-08-04',
          question: 'What is the primary operational advantage of Semantic Vector Caching over traditional exact-key caching for AI applications?',
          options: [
            'It translates the query into binary code',
            'It recognizes when two differently worded prompts ("How to pay my bill" vs "Where do I submit payments") share identical semantic intent, serving cached answers without calling the expensive LLM',
            'It eliminates the need for internet',
            'It deletes the user account'
          ],
          correctIndex: 1,
          explanation: 'Semantic caching matches conceptual meaning rather than exact character strings, dramatically increasing cache hit rates.'
        }
      ],
      summary: [
        'Exact match caches miss 90% of repeat queries; semantic vector caching matches rephrased questions with identical intent.',
        'Calibrate similarity thresholds tightly (e.g. 0.95 - 0.97) to prevent serving false positive cached answers.',
        'Distributed token bucket rate limiters prevent individual users from starving application-wide cloud quotas.'
      ],
      relatedTopics: [
        { title: 'Monitoring and Production Reliability', chapterNumber: '8', lessonId: 'ai-08-05', context: 'Production telemetry and observability.' }
      ]
    },
    {
      id: 'ai-08-05',
      chapterId: 'ai-mod-08',
      number: '8.5',
      slug: 'monitoring-and-production-reliability',
      title: 'Monitoring and Production Reliability',
      tagline: 'OpenTelemetry, token metrics, latency percentiles (p50/p95/p99), and cost tracking',
      durationMinutes: 25,
      learningObjectives: [
        'Instrument AI calls using OpenTelemetry spans to trace end-to-end request latency',
        'Monitor critical production SLOs: Time to First Token (TTFT), tokens per second (TPS), and p99 latency',
        'Build real-time budget alert dashboards tracking daily and monthly token expenditures'
      ],
      theorySections: [
        {
          heading: '1. The Core AI Observability Metrics',
          content: 'Monitoring an AI application differs from monitoring a standard CRUD web service. You must track token economics alongside latency distributions.',
          bulletPoints: [
            'Time to First Token (TTFT): Time elapsed between client request and first rendered token (Target: <500ms)',
            'Inter-Token Latency (ITL): Time between consecutive streamed tokens (Target: <40ms, smooth reading flow)',
            'Total Tokens & Cost: Tracking input tokens, cached tokens, and output tokens per user and per endpoint',
            'Safety & Refusal Rates: Spikes in model refusal rates indicate prompt drift or potential adversarial injection attacks'
          ]
        },
        {
          heading: '2. OpenTelemetry Tracing for Complex Agent Pipelines',
          content: 'When an agent calls RAG vector search, executes two tools, and synthesizes an answer, debugging latency bottlenecks requires distributed trace spans.',
          bulletPoints: [
            'Root Span: Overall user request (duration: 2.4s)',
            'Child Span 1: Vector embedding generation (45ms)',
            'Child Span 2: pgvector query (12ms)',
            'Child Span 3: Cloud LLM inference (2.3s - identifies the true bottleneck)'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Commercial Aircraft Flight Data Recorder',
        concept: 'Telemetry',
        story: 'An airplane does not fly without a black box flight recorder logging altitude, airspeed, engine temperature, and rudder angle every second. When turbulence occurs, aeronautical engineers inspect the exact telemetry data to understand the cause and prevent future incidents.',
        moral: 'Log latency percentiles and token metrics on every call so you can pinpoint regressions instantly.',
        icon: 'BarChart'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'OpenTelemetry Latency Span Instrumentation in Node.js',
        description: 'Logging structured telemetry spans for AI gateway requests.',
        html: `<div class="telemetry-card">
  <h4>Structured AI Telemetry Logger</h4>
  <pre><code>export async function executeMonitoredAiCall(prompt: string, userId: string) {
  const startTime = Date.now();
  let firstTokenTime: number | null = null;
  let tokenCount = 0;

  try {
    const stream = await callFrontierCloudStream(prompt);
    for await (const chunk of stream) {
      if (!firstTokenTime) firstTokenTime = Date.now();
      tokenCount++;
    }

    const totalDuration = Date.now() - startTime;
    const ttft = firstTokenTime ? firstTokenTime - startTime : totalDuration;

    // Log structured telemetry event
    logger.info({
      event: 'ai_inference_complete',
      userId,
      ttftMs: ttft,
      totalDurationMs: totalDuration,
      tokenCount,
      tokensPerSec: Number((tokenCount / (totalDuration / 1000)).toFixed(2))
    });
  } catch (err: any) {
    logger.error({ event: 'ai_inference_error', userId, error: err.message });
    throw err;
  }
}</code></pre>
</div>`,
        css: `.telemetry-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '13-22', title: 'Telemetry Metrics', explanation: 'Captures TTFT, total latency, and tokens-per-second for Prometheus/Datadog monitoring.' }
        ]
      },
      video: {
        title: 'Production AI Observability & Monitoring',
        duration: '15:40',
        description: 'Setting up Grafana dashboards for token burn rates, p95 latency percentiles, and error tracking.',
        keyPoints: ['TTFT and ITL metrics', 'Cost tracking dashboards', 'Alerting on rate limit spikes'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Observability', description: 'Production metrics.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we instrument comprehensive observability dashboards for our AI systems.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-08-05',
        title: 'Calculate Tokens Per Second Generation Rate',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper that takes tokenCount and durationMs and returns tokens per second rounded to 1 decimal place.',
        instructions: [
          'Convert durationMs to seconds (durationMs / 1000)',
          'Divide tokenCount by seconds',
          'Return number rounded to 1 decimal place'
        ],
        starterHtml: `<div id="tps-out">Rate: 0 tps</div>`,
        starterCss: `#tps-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function calculateTps(tokenCount, durationMs) {
  return 0;
}`,
        solutionHtml: `<div id="tps-out">Rate: 50.0 tps (100 tokens in 2000ms)</div>`,
        solutionCss: `#tps-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function calculateTps(tokenCount, durationMs) {
  const seconds = durationMs / 1000;
  return Number((tokenCount / seconds).toFixed(1));
}`,
        hints: ['100 / 2 = 50.0.'],
        testCases: [
          { id: 'tc-41', description: 'Calculates 50.0 tps', hint: 'Check conversion to seconds', checkType: 'text-contains', expectedValue: '50' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-08-05',
          question: 'What metric best reflects the perceived responsiveness and interactive feel of a streaming AI web application?',
          options: [
            'Total size of the HTML file on disk',
            'Time to First Token (TTFT)',
            'The number of CSS color classes',
            'The brand of router used in the office'
          ],
          correctIndex: 1,
          explanation: 'TTFT measures how quickly the user sees the first token begin streaming onto their screen, dictating perceived speed.'
        }
      ],
      summary: [
        'Instrument Time to First Token (TTFT), tokens per second (TPS), and p99 latency across all AI endpoints.',
        'Use distributed OpenTelemetry trace spans to isolate whether latency stems from vector search, database lookups, or model inference.',
        'Establish automated alerting on token burn rates to prevent surprise billing overages.'
      ],
      relatedTopics: [
        { title: 'Final Practical Projects', chapterNumber: '9', lessonId: 'ai-09-01', context: 'Advance to Module 9 capstones.' }
      ]
    }
  ]
};
