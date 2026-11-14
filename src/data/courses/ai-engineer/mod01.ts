import { Chapter } from '../../../utils/types';

export const aiModule01: Chapter = {
  id: 'ai-mod-01',
  number: '1',
  badge: 'AI 01',
  slug: 'ai-llm-foundations',
  title: 'AI and LLM Foundations',
  subtitle: 'Tokens, Context Windows, Neural Representations & Probabilistic Generation',
  description: 'Deconstruct the underlying mathematical and computational foundations of modern Generative AI. Understand transformer attention mechanisms, sub-word tokenization, probabilistic sampling, context windows, and hallucination mechanics.',
  estimatedHours: '4 hrs',
  accentColor: 'indigo',
  iconName: 'Cpu',
  totalLessons: 6,
  lessons: [
    {
      id: 'ai-01-01',
      chapterId: 'ai-mod-01',
      number: '1.1',
      slug: 'ai-ml-fundamentals',
      title: 'Artificial Intelligence and Machine Learning Fundamentals',
      tagline: 'From symbolic heuristics to deep representation learning: the shift to probabilistic models',
      durationMinutes: 25,
      learningObjectives: [
        'Differentiate between rule-based classical software, discriminative ML, and generative deep learning',
        'Understand neural weights, forward inference passes, loss gradients, and embedding vector spaces',
        'Analyze how language models predict next-token probability distributions P(w_t | w_<t)'
      ],
      theorySections: [
        {
          heading: '1. The Paradigm Shift: Deterministic Code vs. Statistical Inference',
          content: 'In traditional software engineering, developers write deterministic conditional algorithms: If A then B. In machine learning, algorithms optimize millions of floating-point parameters (weights) based on vast training datasets to recognize patterns and generate probabilistic completions.',
          bulletPoints: [
            'Classical Software: Input Data + Explicit Handcrafted Rules = Deterministic Output',
            'Discriminative ML: Input Data + Training Labels = Learned Classification Function f(x) -> y',
            'Generative AI: Unsupervised Next-Token Prediction = Probability Distribution over Vocabulary'
          ],
          callout: {
            type: 'key-rule',
            text: 'Key Principle: An LLM does not possess database memory or deductive logic; it evaluates a high-dimensional vector dot-product to predict the most statistically probable continuation of text.'
          }
        },
        {
          heading: '2. The Transformer Attention Revolution',
          content: 'Introduced in Vaswani et al. (2017), the self-attention mechanism enables language models to calculate relative semantic importance across all words in a sequence simultaneously, avoiding recurrent bottlenecks.',
          bulletPoints: [
            'Query, Key, and Value Matrices: Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V',
            'Multi-Head Attention: Allows the model to attend to syntax, semantics, and reference relationships simultaneously',
            'Positional Encoding: Injects sequence order awareness into parallelized attention tensors'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Master Improvisational Pianist',
        concept: 'Next-Token Generation',
        story: 'Imagine an accomplished jazz musician who has listened to every recorded piece in history. When you play three opening chords, the pianist does not look up a rigid sheet music manual; instead, their muscle memory immediately suggests the most harmonically coherent next note, measure by measure.',
        moral: 'LLMs generate code and language via harmonic statistical resonance with their training weights, not rigid rule lookups.',
        icon: 'Lightbulb'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Simulating Next-Token Probability Scoring in JavaScript',
        description: 'A working simulation illustrating vocabulary logits, softmax normalization, and temperature sampling.',
        html: `<div class="token-sim-card">
  <h3>Next-Token Softmax Distribution</h3>
  <div id="prompt-display">Prompt: "The capital of France is"</div>
  <ul id="token-candidates"></ul>
  <button id="sample-btn" class="interactive-btn">Sample Token</button>
</div>`,
        css: `.token-sim-card { background: #0f172a; color: #f8fafc; padding: 1.5rem; border-radius: 8px; font-family: monospace; }
#token-candidates { list-style: none; padding: 0; margin: 1rem 0; }
.candidate-row { display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px solid #1e293b; }
.bar-fill { height: 6px; background: #3b82f6; border-radius: 3px; }`,
        js: `const vocab = [
  { token: ' Paris', logit: 8.4 },
  { token: ' located', logit: 3.2 },
  { token: ' known', logit: 2.1 },
  { token: ' beautiful', logit: 1.8 }
];
const maxLogit = Math.max(...vocab.map(v => v.logit));
const exps = vocab.map(v => Math.exp(v.logit - maxLogit));
const sumExp = exps.reduce((a, b) => a + b, 0);
const probabilities = vocab.map((v, i) => ({ token: v.token, prob: (exps[i] / sumExp).toFixed(4) }));
console.log('Normalized Token Probabilities:', probabilities);`,
        breakdown: [
          { lineRange: '1-6', title: 'Vocabulary Logits', explanation: 'Raw unnormalized score predictions output from the final linear projection layer.' },
          { lineRange: '7-10', title: 'Numerically Stable Softmax', explanation: 'Subtracts maximum logit to avoid floating-point overflow before exponential normalization.' }
        ]
      },
      video: {
        title: 'Deep Dive: Neural Attention & Token Logits',
        duration: '14:20',
        description: 'Step-by-step mathematical walkthrough of query-key attention and token probability distributions.',
        keyPoints: ['Logit projection', 'Softmax calculation', 'Temperature effects on distribution entropy'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Introduction', description: 'Overview of predictive architectures.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Welcome to AI Foundations. Today we explore token probability mechanics.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-01-01',
        title: 'Calculate Softmax Probabilities for Candidate Tokens',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Implement a pure JavaScript function that converts raw logits into percentage probabilities summing to 100%.',
        instructions: [
          'Calculate Math.exp for each logit',
          'Sum all exponentials to create the denominator',
          'Return each token paired with its decimal probability'
        ],
        starterHtml: `<div id="output">Run calculation to inspect probabilities</div>`,
        starterCss: `#output { font-family: monospace; padding: 1rem; background: #f1f5f9; border-radius: 6px; }`,
        starterJs: `function calculateProbabilities(logits) {
  // Your implementation here
  return [];
}`,
        solutionHtml: `<div id="output">Paris: 99.1% | Lyon: 0.6% | Marseille: 0.3%</div>`,
        solutionCss: `#output { font-family: monospace; padding: 1rem; background: #e0f2fe; color: #0369a1; }`,
        solutionJs: `function calculateProbabilities(logits) {
  const sum = logits.reduce((acc, l) => acc + Math.exp(l), 0);
  return logits.map(l => (Math.exp(l) / sum));
}`,
        hints: ['Remember that softmax is exp(x_i) / sum(exp(x_j)).'],
        testCases: [
          { id: 'tc-1', description: 'Probabilities must sum to approximately 1.0', hint: 'Check your sum accumulator', checkType: 'text-contains', expectedValue: 'Paris' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-01-01',
          question: 'What is the primary objective function during LLM pretraining?',
          options: [
            'Executing rule-based logic algorithms',
            'Minimizing cross-entropy loss on next-token prediction',
            'Indexing static databases into SQL tables',
            'Directly optimizing for human conversation preferences'
          ],
          correctIndex: 1,
          explanation: 'Pretraining optimizes next-token prediction cross-entropy loss over trillions of tokens of text.'
        }
      ],
      summary: [
        'Classical programming relies on deterministic if-else rules; AI models rely on probabilistic parameter weights.',
        'The Transformer architecture relies on Self-Attention to correlate tokens across long contexts in parallel.',
        'Outputs are sampled from probability distributions over a fixed vocabulary generated by softmax over logits.'
      ],
      relatedTopics: [
        { title: 'Understanding Large Language Models', chapterNumber: '1', lessonId: 'ai-01-02', context: 'Deep dive into model architectures.' }
      ]
    },
    {
      id: 'ai-01-02',
      chapterId: 'ai-mod-01',
      number: '1.2',
      slug: 'understanding-llms',
      title: 'Understanding Large Language Models',
      tagline: 'Transformer architectures: Encoder-only, Decoder-only, and Sequence-to-Sequence',
      durationMinutes: 25,
      learningObjectives: [
        'Compare BERT (Encoder), T5 (Encoder-Decoder), and GPT/Llama (Decoder-only) architectures',
        'Analyze pre-training vs. supervised fine-tuning (SFT) vs. reinforcement learning from human feedback (RLHF)',
        'Understand parameter scale (7B, 13B, 70B+) and memory footprints'
      ],
      theorySections: [
        {
          heading: '1. Why Decoder-Only Architectures Dominate Modern LLMs',
          content: 'Modern conversational LLMs (GPT-4, Llama 3, Mistral, Gemini) are autoregressive decoder-only transformers. By masking future tokens with causal attention, they generate coherent text sequentially from left to right.',
          bulletPoints: [
            'Encoder-Only (BERT): Bidirectional attention, ideal for embeddings, text classification, and search',
            'Encoder-Decoder (T5): Translates input sequence to output sequence, common in language translation',
            'Decoder-Only (GPT, Llama): Causal masking allows scalable autoregressive streaming of novel tokens'
          ]
        },
        {
          heading: '2. The Three Phases of Model Training',
          content: 'Creating a production conversational model requires three distinct computational stages: Pre-training, Supervised Instruction Tuning (SFT), and Preference Alignment (RLHF / DPO).',
          bulletPoints: [
            'Pre-Training: Ingests 15+ trillion tokens of unstructured internet text; builds world knowledge and grammar',
            'Instruction Tuning: Trains on curated prompt-response pairs to transform a raw text completer into an assistant',
            'Direct Preference Optimization: Aligns model responses with human helpfulness, honesty, and safety standards'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The University Scholar to Medical Resident',
        concept: 'Training Phases',
        story: 'Pre-training is like reading every textbook in the library for 20 years. Fine-tuning is attending medical residency to learn how to speak with patients. RLHF is learning bedside manner so you do not terrify your patients.',
        moral: 'Raw pre-trained models simply continue sentences; fine-tuning and alignment turn raw knowledge into a practical conversational tool.',
        icon: 'BookOpen'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Estimating Model VRAM Requirements for Inference',
        description: 'Formula to calculate GPU memory needed to load a 16-bit, 8-bit, or 4-bit quantized model.',
        html: `<div class="vram-calc">
  <h4>Model Memory Footprint Calculator</h4>
  <p>Formula: VRAM = Parameters * (Bits per Weight / 8) * 1.25 (KV Cache &amp; Overhead)</p>
  <pre><code>// 7B Model at 16-bit (FP16): 7 * 2 * 1.25 = ~17.5 GB VRAM
// 7B Model at 4-bit (Q4_K_M): 7 * 0.5 * 1.25 = ~4.4 GB VRAM</code></pre>
</div>`,
        css: `.vram-calc { background: #1e1e2e; color: #cdd6f4; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #89b4fa; }`,
        breakdown: [
          { lineRange: '1-4', title: 'KV Cache Overhead', explanation: 'Accounts for key-value attention tensors cached in GPU memory during multi-turn conversations.' }
        ]
      },
      video: {
        title: 'Decoder-Only Models Explained',
        duration: '12:45',
        description: 'How autoregressive causal masking works and why GPT architectures superseded RNNs.',
        keyPoints: ['Causal masking', 'KV caching mechanism', 'Autoregressive generation loop'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Overview', description: 'Transformer decoders.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Let us understand how autoregressive decoders generate text token by token.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-01-02',
        title: 'Calculate Quantized Model Memory Footprints',
        difficulty: 'Intermediate',
        estimatedTime: '15 mins',
        prompt: 'Calculate the minimum VRAM required to run a 14-billion parameter model in 4-bit quantized mode.',
        instructions: [
          'Multiply 14 billion parameters by 0.5 bytes per parameter (4 bits = 0.5 bytes)',
          'Add a 25% safety overhead for KV cache',
          'Output the result in gigabytes'
        ],
        starterHtml: `<div id="vram-result">Awaiting calculation...</div>`,
        starterCss: `#vram-result { padding: 1rem; background: #f8fafc; font-weight: bold; }`,
        starterJs: `function calculateVramGB(paramsBillion, bitsPerWeight) {
  // Return required VRAM in GB
  return 0;
}`,
        solutionHtml: `<div id="vram-result">8.75 GB minimum VRAM required</div>`,
        solutionCss: `#vram-result { padding: 1rem; background: #ecfdf5; color: #065f46; font-weight: bold; }`,
        solutionJs: `function calculateVramGB(paramsBillion, bitsPerWeight) {
  const bytesPerParam = bitsPerWeight / 8;
  const rawModelSizeGB = paramsBillion * bytesPerParam;
  return rawModelSizeGB * 1.25; // includes 25% KV cache overhead
}`,
        hints: ['14 * 0.5 = 7 GB raw weight size. Multiply by 1.25.'],
        testCases: [
          { id: 'tc-2', description: 'Must calculate 8.75 GB for 14B Q4', hint: '14 * 0.5 * 1.25 = 8.75', checkType: 'text-contains', expectedValue: '8.75' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-01-02',
          question: 'Why are modern LLMs such as Llama 3 and GPT-4 built as decoder-only architectures?',
          options: [
            'Because encoders cannot understand English grammar',
            'Decoder-only architectures allow efficient unidirectional causal generation with scalable parallel training',
            'Because decoders require no training data',
            'To prevent users from using temperature settings'
          ],
          correctIndex: 1,
          explanation: 'Decoder-only models excel at autoregressive next-token prediction and scale predictably with compute.'
        }
      ],
      summary: [
        'Decoder-only architectures dominate generative AI due to their natural alignment with autoregressive sequence generation.',
        'Instruction tuning and preference alignment (RLHF/DPO) transform raw probabilistic completers into helpful assistants.',
        'Quantization (e.g. 4-bit GGUF/AWQ) drastically cuts memory requirements, allowing large models to run on consumer hardware.'
      ],
      relatedTopics: [
        { title: 'Tokens and Context Windows', chapterNumber: '1', lessonId: 'ai-01-03', context: 'Understand how text is digitized for LLMs.' }
      ]
    },
    {
      id: 'ai-01-03',
      chapterId: 'ai-mod-01',
      number: '1.3',
      slug: 'tokens-and-context-windows',
      title: 'Tokens and Context Windows',
      tagline: 'Byte-pair encoding, vocabulary size, token budgets, and quadratic attention limits',
      durationMinutes: 25,
      learningObjectives: [
        'Master Byte-Pair Encoding (BPE) and understand why 1 token is roughly 0.75 English words',
        'Analyze how context window constraints impact prompt engineering and application memory',
        'Understand FlashAttention, RoPE (Rotary Position Embeddings), and context compression'
      ],
      theorySections: [
        {
          heading: '1. What is a Token?',
          content: 'LLMs do not process characters or words directly. Instead, a tokenizer converts raw Unicode strings into integer token IDs using Byte-Pair Encoding (BPE). Common words are assigned single tokens, while rare words or code are split into sub-word fragments.',
          bulletPoints: [
            'English rule of thumb: 100 tokens ≈ 75 words (or ~4 characters per token)',
            'Code & foreign languages: Higher token density due to rare character combinations',
            'Spaces and punctuation: Often attached to the following token (e.g., " world" vs "world")'
          ],
          callout: {
            type: 'warning',
            text: 'Cost and Latency Warning: Every token in both your prompt (input) and response (output) consumes token budget and incurs API fees.'
          }
        },
        {
          heading: '2. The Quadratic Nature of Naive Attention',
          content: 'In standard attention mechanisms, every token computes an attention score against every other token in the prompt, resulting in O(N^2) time and memory complexity. Modern innovations like FlashAttention and Rotary Position Embeddings (RoPE) enable context windows of 128k to 1M+ tokens.',
          bulletPoints: [
            'Standard Attention: 4k context requires 16M attention interactions; 32k requires 1B interactions',
            'FlashAttention: Fuses GPU kernel operations, reading and writing to SRAM to bypass memory bandwidth bottlenecks',
            'KV Caching: Reuses cached Key and Value vectors from prior turns, eliminating re-computation of historical tokens'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Short-Term Working Desk',
        concept: 'Context Window Limits',
        story: 'Imagine an analyst sitting at a physical desk. The context window is the physical surface area of the desk. Every document, instruction, and message must sit on the desk to be referenced. When the desk fills up, older papers must be filed away or shredded to make room for new ones.',
        moral: 'The context window is working memory, not permanent storage. Long-term memory requires external retrieval systems like RAG.',
        icon: 'Layers'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Inspecting Tokenization Boundaries with JavaScript Regex',
        description: 'Demonstrating sub-word token splitting principles.',
        html: `<div class="token-split-card">
  <h4>Tokenizer Word Breakdown</h4>
  <p>Input: "Unbelievable full-stack engineering!"</p>
  <div class="token-chips">
    <span class="chip">Un</span><span class="chip">believ</span><span class="chip">able</span>
    <span class="chip"> full</span><span class="chip">-</span><span class="chip">stack</span>
    <span class="chip"> engineer</span><span class="chip">ing</span><span class="chip">!</span>
  </div>
</div>`,
        css: `.token-split-card { background: #0f172a; color: white; padding: 1.25rem; border-radius: 8px; }
.token-chips { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 0.5rem; }
.chip { background: #3b82f6; color: white; padding: 2px 8px; border-radius: 4px; font-family: monospace; font-size: 13px; }`,
        breakdown: [
          { lineRange: '4-7', title: 'Sub-word Tokens', explanation: 'Rare or complex words split into prefixes, stems, and suffixes to keep vocabulary sizes bounded (~32k to 128k tokens).' }
        ]
      },
      video: {
        title: 'Byte-Pair Encoding & Context Windows',
        duration: '15:10',
        description: 'How BPE builds vocabulary and why context length is bounded by memory constraints.',
        keyPoints: ['BPE merge tables', 'Tokenization anomalies', 'FlashAttention v2 mechanics'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Token Basics', description: 'Sub-word mechanics.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Today we break down how words become tokens.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-ai-01-03',
        title: 'Estimate Token Costs for Batch Processing',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Calculate the total cost to process 1,000 documents averaging 1,200 words each on an API priced at $0.50 per million input tokens.',
        instructions: [
          'Convert words to tokens using the 1 word = 1.33 tokens ratio (1,200 words = 1,600 tokens)',
          'Multiply by 1,000 documents to get total tokens',
          'Calculate total cost based on $0.50 per 1,000,000 tokens'
        ],
        starterHtml: `<div id="cost-output">Cost: $0.00</div>`,
        starterCss: `#cost-output { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function calculateCost(docCount, wordsPerDoc, costPerMillion) {
  // Implement token cost calculator
  return 0;
}`,
        solutionHtml: `<div id="cost-output">Cost: $0.80</div>`,
        solutionCss: `#cost-output { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function calculateCost(docCount, wordsPerDoc, costPerMillion) {
  const totalTokens = docCount * (wordsPerDoc * 1.333333);
  return (totalTokens / 1000000) * costPerMillion;
}`,
        hints: ['1,000 docs * 1,600 tokens = 1,600,000 tokens. 1.6M * $0.50 = $0.80.'],
        testCases: [
          { id: 'tc-3', description: 'Calculates $0.80 for 1.6M tokens', hint: '1.6 * 0.5 = 0.8', checkType: 'text-contains', expectedValue: '0.8' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-01-03',
          question: 'Why do LLMs use sub-word tokenization instead of individual whole words?',
          options: [
            'Because computers can only store 256 words in memory',
            'To keep vocabulary sizes bounded while handling unseen words, typos, and multilingual code gracefully',
            'To make generation slower and more deliberate',
            'To hide the true meaning of sentences from end users'
          ],
          correctIndex: 1,
          explanation: 'Sub-word tokenizers represent virtually any Unicode string while keeping the model vocabulary bounded between 32,000 and 128,000 tokens.'
        }
      ],
      summary: [
        'Tokens are the fundamental computational units of LLMs; roughly 1,000 tokens represent 750 English words.',
        'Attention complexity is quadratically bound to context length unless hardware-aware optimizations like FlashAttention are used.',
        'Managing context limits requires selective prompt trimming, conversation summarization, and vector retrieval.'
      ],
      relatedTopics: [
        { title: 'Model Limitations and Hallucinations', chapterNumber: '1', lessonId: 'ai-01-04', context: 'Learn why models generate inaccuracies.' }
      ]
    },
    {
      id: 'ai-01-04',
      chapterId: 'ai-mod-01',
      number: '1.4',
      slug: 'model-limitations-and-hallucinations',
      title: 'Model Limitations and Hallucinations',
      tagline: 'Why models generate false assertions with extreme confidence and how to engineer guardrails',
      durationMinutes: 25,
      learningObjectives: [
        'Deconstruct the structural causes of hallucinations in probabilistic language models',
        'Identify common failure modes: factual fabrication, sycophancy, instruction drift, and reasoning errors',
        'Implement practical mitigation patterns: ground-truth retrieval, temperature tuning, and output verification'
      ],
      theorySections: [
        {
          heading: '1. The Root Cause of Hallucination',
          content: 'Language models are trained to produce fluent, plausible-sounding text, not verified truth. When an LLM encounters gaps in training data or ambiguous prompts, it does not stop and admit ignorance; it predicts the most statistically harmonious continuation.',
          bulletPoints: [
            'Fluent fabrication: The syntax and tone are flawless, but dates, citations, or API methods are invented',
            'Sycophancy: The model agrees with false premises introduced by the user in the prompt',
            'Context distraction: Overly long prompts cause the model to ignore critical constraints'
          ],
          callout: {
            type: 'key-rule',
            text: 'Engineering Golden Rule: Never rely on an LLM as a primary database of record. Always provide verified ground-truth context via RAG or function calling.'
          }
        },
        {
          heading: '2. Guardrail Architectures and Temperature Control',
          content: 'Engineers control hallucination through temperature adjustments, deterministic output schemas, and multi-step verification pipelines.',
          bulletPoints: [
            'Temperature 0.0: Greedily selects the top-1 highest probability token; produces deterministic, conservative answers',
            'Temperature 0.7 - 1.0: Introduces stochastic sampling; ideal for creative brainstorming, dangerous for API contracts',
            'Self-Consistency & Verification: Prompting the model to cite exact source sentences before drawing conclusions'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Confident Tour Guide',
        concept: 'Hallucination',
        story: 'Imagine a tour guide in a historic city who has lost the official map. When a tourist asks who built a obscure 14th-century fountain, the guide does not say "I do not know." Instead, they invent a compelling, poetic story about a fictional Duke, complete with dates that sound plausible to everyone on the bus.',
        moral: 'The model optimizes for compelling narrative continuity, not historical verification. Your application must supply the verified map.',
        icon: 'ShieldCheck'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Designing a Fact-Grounding Prompt Pattern',
        description: 'Constraining an LLM to answer strictly from supplied context.',
        html: `<div class="guardrail-card">
  <h4>Strict Grounding System Prompt</h4>
  <pre><code>You are a factual verification assistant.
Rules:
1. Answer the question ONLY using the factual facts provided below.
2. If the answer cannot be found directly in the text, respond:
   "I cannot verify this from the provided documents."
3. Quote the exact sentence used to formulate your answer.

Facts:
{context_documents}

Question: {user_query}</code></pre>
</div>`,
        css: `.guardrail-card { background: #18181b; color: #a1a1aa; padding: 1.25rem; border-radius: 8px; border-left: 4px solid #ef4444; }
code { color: #f43f5e; font-family: monospace; }`,
        breakdown: [
          { lineRange: '2-4', title: 'Negative Constraint', explanation: 'Gives the model an explicit permitted escape hatch when information is missing, preventing fabrication.' }
        ]
      },
      video: {
        title: 'Mitigating Hallucinations in Production',
        duration: '16:00',
        description: 'Practical architectural patterns to catch and prevent fabricated outputs.',
        keyPoints: ['Sampling temperature tradeoffs', 'Grounding prompts', 'LLM-as-a-judge evaluators'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Hallucination Analysis', description: 'Why fabrication occurs.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we engineer deterministic guardrails against hallucinations.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-01-04',
        title: 'Write a Grounded Evaluation Prompt',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Formulate a robust system prompt that prevents the model from assuming knowledge outside the provided policy document.',
        instructions: [
          'Include explicit refusal instructions if the query is not in the text',
          'Require citation of exact section numbers'
        ],
        starterHtml: `<textarea id="prompt-input" rows="6" style="width:100%;">You are an assistant. Answer questions about refund policies.</textarea>`,
        starterCss: `#prompt-input { font-family: monospace; padding: 0.5rem; }`,
        starterJs: `console.log("Validate prompt completeness");`,
        solutionHtml: `<textarea id="prompt-input" rows="6" style="width:100%;">You are a strict compliance auditor. Only answer using the Refund Policy text below. If the text does not state the answer, reply "Information not present in policy". Quote Section numbers.</textarea>`,
        solutionCss: `#prompt-input { font-family: monospace; padding: 0.5rem; border-color: #10b981; }`,
        solutionJs: `console.log("Validated strict compliance prompt");`,
        hints: ['Provide an explicit fallback phrase like "Information not present in policy".'],
        testCases: [
          { id: 'tc-4', description: 'Prompt must contain negative fallback constraint', hint: 'Add refusal instructions', checkType: 'text-contains', expectedValue: 'Policy' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-01-04',
          question: 'What is the most effective engineering method to eliminate factual hallucinations in mission-critical applications?',
          options: [
            'Increasing temperature to 2.0',
            'Supplying verified factual context via Retrieval-Augmented Generation (RAG) and setting temperature to 0',
            'Repeating the user question five times in the prompt',
            'Asking the model if it is feeling honest today'
          ],
          correctIndex: 1,
          explanation: 'Grounded retrieval with low temperature and strict negative constraints provides the highest factual reliability.'
        }
      ],
      summary: [
        'Hallucinations arise because models optimize for plausible statistical continuation, not verified truth.',
        'Sycophancy, out-of-domain queries, and context saturation trigger the highest rates of fabrication.',
        'Mitigate via strict ground-truth injection, explicit refusal instructions, low temperature (0.0), and verification pipelines.'
      ],
      relatedTopics: [
        { title: 'Local Models vs. Cloud-Hosted Models', chapterNumber: '1', lessonId: 'ai-01-05', context: 'Compare infrastructure choices.' }
      ]
    },
    {
      id: 'ai-01-05',
      chapterId: 'ai-mod-01',
      number: '1.5',
      slug: 'local-models-vs-cloud-llms',
      title: 'Local Models versus Cloud-Hosted Models',
      tagline: 'Cost, latency, privacy, availability, and regulatory compliance trade-offs',
      durationMinutes: 25,
      learningObjectives: [
        'Compare deployment trade-offs between local inference (Ollama, vLLM, llama.cpp) and cloud APIs (Gemini, OpenAI, Anthropic)',
        'Evaluate data privacy mandates (HIPAA, GDPR, enterprise intellectual property) against managed conveniences',
        'Analyze total cost of ownership (TCO): hardware procurement vs. per-token cloud billing'
      ],
      theorySections: [
        {
          heading: '1. The Architectural Comparison Matrix',
          content: 'Modern AI architecture is not an either-or decision. Production engineering often employs hybrid routing: high-volume classification and sensitive data stay on local hardware, while complex multimodal reasoning routes to cloud frontier models.',
          bulletPoints: [
            'Local LLMs (Llama 3, Mistral, Qwen): Zero per-token API cost, 100% offline air-gapped privacy, deterministic latency, but constrained by host GPU VRAM and compute',
            'Cloud APIs (Gemini 1.5, Claude 3.5, GPT-4o): Massive parameter scale (1T+), vast context windows (1M+ tokens), multimodal capabilities, zero hardware management, but recurring token fees and external data transmission'
          ]
        },
        {
          heading: '2. The Total Cost of Ownership (TCO) Inflection Point',
          content: 'For applications processing under 500,000 tokens daily, managed cloud APIs are almost always cheaper than buying or leasing GPU instances. Above 50 million tokens daily, self-hosted vLLM clusters on dedicated GPUs yield massive cost savings.',
          bulletPoints: [
            'Low Volume (<500k tokens/day): Cloud APIs win (~$0.50 to $5/month)',
            'Medium Volume (1M - 20M tokens/day): Serverless cloud endpoints win due to elastic auto-scaling',
            'Enterprise High Volume (>50M tokens/day): Dedicated local/on-prem GPU clusters save 60-80% of infrastructure costs'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'Municipal Water Grid vs. On-Site Well',
        concept: 'Cloud vs. Local',
        story: 'Using a cloud API is like turning on the municipal water tap: you pay per gallon used, require zero plumbing maintenance, and can draw high pressure immediately. Running a local LLM is like drilling a private well on your property: high upfront equipment costs, but zero recurring meter bills, total privacy, and no risk of a city-wide shutoff.',
        moral: 'Choose municipal cloud for speed and elasticity; choose private local for sovereign privacy and massive continuous volume.',
        icon: 'Network'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Implementing Hybrid Intelligent Request Routing',
        description: 'TypeScript logic that routes sensitive or routine tasks to local Ollama and complex queries to cloud.',
        html: `<div class="router-card">
  <h4>Hybrid AI Router</h4>
  <pre><code>async function routeAiRequest(prompt, isPiiSensitive) {
  if (isPiiSensitive || prompt.length < 150) {
    // Route to local Ollama runtime on localhost:11434
    return await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({ model: 'llama3:8b', prompt })
    });
  }
  // Route complex analysis to cloud API
  return await callCloudFrontierModel(prompt);
}</code></pre>
</div>`,
        css: `.router-card { background: #020617; color: #94a3b8; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '2-7', title: 'Privacy Fallback', explanation: 'Ensures personally identifiable data never leaves the local perimeter.' }
        ]
      },
      video: {
        title: 'Local vs Cloud AI Architecture',
        duration: '15:45',
        description: 'Benchmarking latency, cost per 1M tokens, and compliance constraints.',
        keyPoints: ['Latency benchmarks', 'Hardware sizing for Llama 3 8B & 70B', 'Hybrid cloud-local routers'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Comparison Matrix', description: 'Feature comparison.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'When should you run locally and when should you use cloud APIs?' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-01-05',
        title: 'Design an Enterprise Compliance Decision Tree',
        difficulty: 'Intermediate',
        estimatedTime: '15 mins',
        prompt: 'Write a decision function that returns "local", "cloud-us", or "cloud-eu" based on patient health data privacy flags.',
        instructions: [
          'If data contains HIPAA or PII identifiers, return "local"',
          'If data originates from EU citizens, return "cloud-eu"',
          'Default to "cloud-us"'
        ],
        starterHtml: `<div id="routing-out">Pending evaluation</div>`,
        starterCss: `#routing-out { font-family: monospace; padding: 1rem; background: #f8fafc; }`,
        starterJs: `function determineDeployment(hasPii, userRegion) {
  // Your logic here
  return "cloud-us";
}`,
        solutionHtml: `<div id="routing-out">Routing: local (HIPAA privacy strictly enforced)</div>`,
        solutionCss: `#routing-out { font-family: monospace; padding: 1rem; background: #fef2f2; color: #991b1b; }`,
        solutionJs: `function determineDeployment(hasPii, userRegion) {
  if (hasPii) return "local";
  if (userRegion === "EU") return "cloud-eu";
  return "cloud-us";
}`,
        hints: ['Check hasPii first as a blocking condition.'],
        testCases: [
          { id: 'tc-5', description: 'Returns local when hasPii is true', hint: 'PII must stay local', checkType: 'text-contains', expectedValue: 'local' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-01-05',
          question: 'Under which scenario is self-hosting an open-weights model locally clearly superior to cloud APIs?',
          options: [
            'When processing 20 queries a month on a budget of $2',
            'When handling strict on-premises confidential clinical records under strict zero-egress compliance regulations',
            'When you have no GPU hardware and only an old mobile phone',
            'When you need a 2-million-token context window with zero engineering effort'
          ],
          correctIndex: 1,
          explanation: 'Strict zero-data-egress compliance mandates make local inference on private hardware indispensable.'
        }
      ],
      summary: [
        'Local models provide absolute sovereignty, zero token bills, and offline availability at the expense of hardware procurement.',
        'Cloud APIs provide bleeding-edge frontier reasoning and elastic scaling without operations overhead.',
        'Modern enterprise web systems leverage hybrid routing to maximize both privacy and intelligence.'
      ],
      relatedTopics: [
        { title: 'Selecting an Appropriate Model', chapterNumber: '1', lessonId: 'ai-01-06', context: 'Framework for choosing model weights.' }
      ]
    },
    {
      id: 'ai-01-06',
      chapterId: 'ai-mod-01',
      number: '1.6',
      slug: 'selecting-an-appropriate-model',
      title: 'Selecting an Appropriate Model',
      tagline: 'Matching task complexity to parameter size, reasoning benchmarks, and operational budgets',
      durationMinutes: 25,
      learningObjectives: [
        'Master the model selection taxonomy across Small Language Models (SLMs: 1B-3B), Mid-tier (7B-14B), and Frontier models (70B+ / Proprietary)',
        'Interpret benchmark metrics (MMLU, HumanEval, GSM8K, LMSYS Chatbot Arena Elo)',
        'Formulate a cost-performance optimization checklist for production applications'
      ],
      theorySections: [
        {
          heading: '1. The Right Tool for the Job: Avoid Frontier Overkill',
          content: 'A widespread architectural mistake is routing every trivial request (like sentiment tagging or date extraction) to a massive 1-trillion parameter model. This wastes money and adds 1-2 seconds of unnecessary latency.',
          bulletPoints: [
            'Small Models (1B - 3B, e.g., Phi-3 Mini, Gemma 2 2B): Instant inference (<50ms), runs on mobile devices, perfect for classification, formatting, and auto-complete',
            'Mid-tier Models (7B - 14B, e.g., Llama 3.1 8B, Mistral 7B): The sweet spot for tool use, RAG summarization, and interactive chat at ultra-low cost',
            'Frontier Models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro): Complex multi-step reasoning, architectural code generation, and complex multimodal analysis'
          ]
        },
        {
          heading: '2. Evaluating Benchmarks Beyond Marketing Claims',
          content: 'Never rely on vendor press releases. Look at independent leaderboards and task-specific benchmarks.',
          bulletPoints: [
            'LMSYS Chatbot Arena: Crowdsourced human blind pairwise comparisons (Elo ratings); best for conversational feel',
            'HumanEval / SWE-bench: Code generation and real-world GitHub bug resolution ability',
            'Needle in a Haystack (NIAH): Ability to retrieve specific facts buried deep inside 100k+ token context windows'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Fleet: Bicycle, Cargo Van, and Commercial Cargo Plane',
        concept: 'Model Sizing',
        story: 'If you need to deliver an envelope across town, you do not charter a Boeing 747; you send a bicycle courier. It is 100x cheaper, arrives faster in city traffic, and consumes negligible fuel. You only charter the cargo plane when moving 50 tons of transatlantic freight.',
        moral: 'Do not use a 1-trillion parameter frontier model to capitalize a username or categorize an invoice.',
        icon: 'Award'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Task-to-Model Tier Mapping Configuration',
        description: 'Production configuration mapping tasks to appropriate model tiers.',
        html: `<div class="model-tier-card">
  <h4>Production Model Tier Configuration</h4>
  <pre><code>export const MODEL_ROUTING_TIERS = {
  // Fast & Cheap: $0.05 / 1M tokens
  classification: 'gemma-2-2b-it',
  extraction: 'llama-3.1-8b-instruct',
  
  // Balanced: $0.50 / 1M tokens
  conversational_rag: 'llama-3.1-8b-instruct',
  code_explanation: 'claude-3-5-haiku',
  
  // Frontier Reasoning: $3.00+ / 1M tokens
  system_architecture: 'claude-3-5-sonnet',
  complex_agentic_loop: 'gpt-4o'
};</code></pre>
</div>`,
        css: `.model-tier-card { background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #a855f7; }`,
        breakdown: [
          { lineRange: '2-12', title: 'Tier Definition', explanation: 'Classifies workloads into micro-tasks, balanced interactions, and deep reasoning.' }
        ]
      },
      video: {
        title: 'Selecting the Optimal LLM for Production',
        duration: '14:30',
        description: 'Real-world benchmarks, pricing matrix analysis, and tier selection guide.',
        keyPoints: ['SLM vs LLM tradeoffs', 'MMLU vs Arena Elo', 'Cost modeling in Excel'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Model Landscape', description: 'Taxonomy overview.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we build a disciplined model selection matrix.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-01-06',
        title: 'Build a Cost-Optimized Model Selector',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Write a JavaScript function that inspects a task complexity rating ("simple", "moderate", "complex") and returns the most cost-effective model.',
        instructions: [
          'For "simple", return "gemma-2-2b"',
          'For "moderate", return "llama-3-8b"',
          'For "complex", return "claude-3-5-sonnet"'
        ],
        starterHtml: `<div id="sel-out">Select model</div>`,
        starterCss: `#sel-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function selectModel(complexity) {
  // Return model ID
  return "";
}`,
        solutionHtml: `<div id="sel-out">Selected: llama-3-8b (Cost-effective for moderate tasks)</div>`,
        solutionCss: `#sel-out { padding: 1rem; background: #f0fdf4; color: #15803d; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function selectModel(complexity) {
  switch (complexity) {
    case 'simple': return 'gemma-2-2b';
    case 'moderate': return 'llama-3-8b';
    case 'complex': return 'claude-3-5-sonnet';
    default: return 'llama-3-8b';
  }
}`,
        hints: ['Use a switch statement or lookup table.'],
        testCases: [
          { id: 'tc-6', description: 'Maps simple to gemma-2-2b', hint: 'Check simple mapping', checkType: 'text-contains', expectedValue: 'llama-3-8b' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-01-06',
          question: 'What is the most effective approach to minimize production AI latency and operational expense?',
          options: [
            'Using the most expensive frontier model for all tasks to ensure perfection',
            'Pairing small specialized models (1B-8B) for classification, extraction, and validation with frontier models reserved for ambiguous high-stakes reasoning',
            'Disabling temperature settings in the backend',
            'Deleting system prompts to save 10 tokens'
          ],
          correctIndex: 1,
          explanation: 'Tiered multi-model architecture cuts costs by 70-90% while improving average response times.'
        }
      ],
      summary: [
        'Match model size to task complexity: use SLMs for high-throughput extraction and reserve frontier models for deep reasoning.',
        'Rely on independent human evaluation metrics (LMSYS Arena) and task-specific benchmarks rather than vendor claims.',
        'A tiered multi-model architecture delivers the optimal balance of speed, cost, and intelligence in production.'
      ],
      relatedTopics: [
        { title: 'Local Model Architecture', chapterNumber: '2', lessonId: 'ai-02-01', context: 'Begin Module 2 on local LLM deployment.' }
      ]
    }
  ]
};
