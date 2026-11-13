import { Chapter } from '../../../utils/types';

export const aiModule03: Chapter = {
  id: 'ai-mod-03',
  number: '3',
  badge: 'AI 03',
  slug: 'cloud-llm-integration',
  title: 'Cloud LLM Integration',
  subtitle: 'API Contracts, Secure Key Management, Server-Sent Events, Rate Limits & Exponential Backoff',
  description: 'Connect production full-stack web applications to frontier cloud LLM providers (Google Gemini, Anthropic Claude, OpenAI). Master secure environment architecture, server-side credential isolation, HTTP streaming with SSE, and robust multi-provider fallback circuits.',
  estimatedHours: '4 hrs',
  accentColor: 'blue',
  iconName: 'Cloud',
  totalLessons: 5,
  lessons: [
    {
      id: 'ai-03-01',
      chapterId: 'ai-mod-03',
      number: '3.1',
      slug: 'understanding-model-apis',
      title: 'Understanding Model APIs',
      tagline: 'Standardizing request schemas, temperature, top_p, penalty multipliers, and token quotas',
      durationMinutes: 25,
      learningObjectives: [
        'Analyze standard REST and SDK communication patterns for major frontier cloud models',
        'Master generation hyper-parameters: Temperature, Top-P (Nucleus Sampling), Top-K, Frequency Penalty, and Presence Penalty',
        'Compare cost structures: cached prompts vs. uncached input vs. output completion tokens'
      ],
      theorySections: [
        {
          heading: '1. Anatomy of a Cloud Model Request',
          content: 'While SDK syntax varies slightly between Google Gemini (@google/genai), OpenAI, and Anthropic, all frontier cloud providers adhere to common probabilistic generation contracts.',
          bulletPoints: [
            'System Instructions: Establishes persona, domain boundaries, and output formatting rules',
            'Messages Array: Hierarchical multi-turn conversation history (user, assistant, model)',
            'Temperature (0.0 to 2.0): Scales logit distributions before softmax; 0 = deterministic, 1.0 = creative',
            'Top-P / Nucleus Sampling: Limits candidate tokens to the cumulative top P percentile (e.g. 0.95), cutting off nonsensical long-tail tokens'
          ]
        },
        {
          heading: '2. Prompt Caching Economics',
          content: 'Modern frontier models support Context Caching. If your application sends the same large document or codebase (e.g. 50,000 tokens) across multiple requests, cloud providers cache the compiled KV state, offering up to a 75-90% discount on cached input tokens and reducing latency by 80%.',
          bulletPoints: [
            'Uncached Input: Full price per million tokens (e.g. $2.50 / 1M)',
            'Cached Input: Massive discount (e.g. $0.62 / 1M tokens) when static context is reused',
            'Output Tokens: The most computationally expensive phase (~3x - 5x more costly than input)'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Consultative Law Partner',
        concept: 'Cloud Model APIs',
        story: 'Hiring a cloud frontier model is like retaining a world-class legal partner. You pay them by the minute for reading your legal brief (input tokens) and typing their formal legal opinion (output tokens). If you brief them on the same 100-page company contract repeatedly, they remember the contract (prompt caching) and only charge you for reviewing the new amendment.',
        moral: 'Design prompts so unchanging context sits at the beginning, maximizing caching efficiency and minimizing API expense.',
        icon: 'Scale'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Unified Cloud Request Payload Contract',
        description: 'Standard JSON structure for sending structured prompts to cloud endpoints.',
        html: `<div class="cloud-payload-card">
  <h4>Frontier Cloud Model Request Payload</h4>
  <pre><code>{
  "model": "gemini-1.5-pro",
  "contents": [
    { "role": "user", "parts": [{ "text": "Audit this CSS for reflow bottlenecks." }] }
  ],
  "generationConfig": {
    "temperature": 0.2,
    "topP": 0.95,
    "maxOutputTokens": 2048,
    "responseMimeType": "application/json"
  }
}</code></pre>
</div>`,
        css: `.cloud-payload-card { background: #0f172a; color: #67e8f9; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '6-11', title: 'generationConfig', explanation: 'Pins temperature to 0.2 and constrains output MIME type to strict JSON.' }
        ]
      },
      video: {
        title: 'Cloud LLM APIs & Generation Parameters',
        duration: '15:10',
        description: 'Visualizing how temperature and Top-P shape the token probability distribution curve.',
        keyPoints: ['Nucleus sampling math', 'Temperature scaling curves', 'Prompt caching architectures'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'API Basics', description: 'Cloud request lifecycles.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Welcome to Cloud LLM Integration. Today we master generation parameters.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-03-01',
        title: 'Configure Generation Parameters for Code Generation',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Return the optimal generation config object for generating strict TypeScript types where randomness must be zero.',
        instructions: [
          'Set temperature to 0.0 for deterministic output',
          'Set topP to 0.1 to eliminate random tokens',
          'Set maxOutputTokens to 1024'
        ],
        starterHtml: `<div id="config-out">Config: {}</div>`,
        starterCss: `#config-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function getCodeGenerationConfig() {
  return {};
}`,
        solutionHtml: `<div id="config-out">Config: { temperature: 0, topP: 0.1, maxOutputTokens: 1024 }</div>`,
        solutionCss: `#config-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function getCodeGenerationConfig() {
  return {
    temperature: 0.0,
    topP: 0.1,
    maxOutputTokens: 1024
  };
}`,
        hints: ['Deterministic tasks require temperature: 0.0.'],
        testCases: [
          { id: 'tc-12', description: 'Sets temperature to 0.0', hint: 'Temperature must be zero', checkType: 'text-contains', expectedValue: 'temperature: 0' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-03-01',
          question: 'What is the primary architectural purpose of setting Temperature to 0.0 in an AI API call?',
          options: [
            'To make generation answers as unexpected and humorous as possible',
            'To eliminate sampling entropy and force deterministic greedy selection of the single highest-probability token at each step',
            'To double the speed of internet transmission',
            'To disable SSL encryption'
          ],
          correctIndex: 1,
          explanation: 'Temperature 0.0 collapses the probability distribution onto the single highest-ranking logit, producing consistent deterministic completions.'
        }
      ],
      summary: [
        'Cloud APIs accept standardized payloads configuring system instructions, message histories, and sampling hyper-parameters.',
        'Temperature controls sampling randomness, while Top-P restricts the candidate token pool to the most probable cumulative mass.',
        'Prompt caching drastically cuts both latency and financial cost when handling large reusable context blocks.'
      ],
      relatedTopics: [
        { title: 'Secure API Key and Environment Configuration', chapterNumber: '3', lessonId: 'ai-03-02', context: 'Safeguard secrets in production.' }
      ]
    },
    {
      id: 'ai-03-02',
      chapterId: 'ai-mod-03',
      number: '3.2',
      slug: 'secure-api-key-configuration',
      title: 'Secure API Key and Environment Configuration',
      tagline: 'Zero-leakage secret management, server-side proxies, and frontend isolation',
      durationMinutes: 25,
      learningObjectives: [
        'Eliminate client-side API key leaks by enforcing strict server-side proxy architectures',
        'Configure environment variables (.env / process.env) with validation and secret masking',
        'Implement role-based rate-limiting and user authentication on internal API proxies'
      ],
      theorySections: [
        {
          heading: '1. The Cardinal Rule: Never Expose API Keys in Client Code',
          content: 'A catastrophic security flaw frequently committed by beginner AI developers is bundling API keys (like GEMINI_API_KEY or OPENAI_API_KEY) into client-side React or Vite bundles (e.g. VITE_AI_API_KEY). Within minutes of deployment, web scrapers extract the key from compiled JS assets and run up thousands of dollars in unauthorized usage.',
          bulletPoints: [
            'Client code is public: Any variable baked into a React/Vite client bundle can be read by any visitor with DevTools',
            'Server-Side Proxy Pattern: The browser makes requests strictly to your own authenticated backend (e.g. /api/ai/chat)',
            'Isolated Environment: The backend server reads secrets from secure environment variables and calls the cloud LLM securely'
          ],
          callout: {
            type: 'warning',
            text: 'Security Mandate: Never prefix secret AI API keys with VITE_ or REACT_APP_. Secrets must strictly reside in server-side memory.'
          }
        },
        {
          heading: '2. Validating Secrets at Server Startup',
          content: 'Robust production servers should fail fast on startup if required API keys are missing, rather than crashing during an active user request.',
          bulletPoints: [
            'Environment Validation: Use Zod or envalid to assert process.env.AI_SECRET_KEY exists on boot',
            'Secret Masking: When logging configuration, always redact secrets (e.g. "sk-...12a4")',
            'Rotation Strategy: Implement automated secret rotation without requiring application code changes'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Hotel Master Key vs. The Guest Room Card',
        concept: 'Server-Side Key Isolation',
        story: 'Your cloud API key is like the hotel master key that unlocks every safe in the building. You never give the master key to a hotel guest. Instead, the guest shows their temporary room badge at the front desk (authenticated user session), and the bonded concierge uses the master key behind a secure counter to retrieve their specific luggage.',
        moral: 'Your frontend users get temporary session cookies; your backend server holds the master API credentials safely behind the counter.',
        icon: 'Lock'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Server-Side Express Proxy for Cloud LLMs',
        description: 'Safe Node.js/Express proxy isolating the API key from browser clients.',
        html: `<div class="proxy-code-card">
  <h4>Server-Side Proxy Route (/api/ai/chat)</h4>
  <pre><code>import express from 'express';
const router = express.Router();

// Read secret securely from server environment
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("FATAL: GEMINI_API_KEY is not defined in server environment");
}

router.post('/api/ai/chat', async (req, res) => {
  // 1. Verify user session / authorization
  if (!req.session?.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // 2. Call cloud provider server-to-server
  try {
    const aiResponse = await fetch('https://generativelanguage.googleapis.com/...', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY 
      },
      body: JSON.stringify(req.body)
    });
    const data = await aiResponse.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'AI Gateway Error' });
  }
});</code></pre>
</div>`,
        css: `.proxy-code-card { background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '5-8', title: 'Server Secret Isolation', explanation: 'API key is never shipped to the browser or embedded in client JS bundles.' }
        ]
      },
      video: {
        title: 'Zero-Trust AI Key Security',
        duration: '14:20',
        description: 'How keys are extracted from client bundles and how to set up server-side proxy gateways.',
        keyPoints: ['Client bundle inspection', 'Express proxy architecture', 'Environment validation with Zod'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Key Leaks', description: 'How leaks occur.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we enforce zero-leakage security architectures for our AI credentials.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-03-02',
        title: 'Build a Redacted Secret Formatter',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper function that redacts an API key for logs, showing only the first 3 and last 4 characters.',
        instructions: [
          'If key length is less than 8, return "[REDACTED]"',
          'Otherwise return first 3 chars + "..." + last 4 chars'
        ],
        starterHtml: `<div id="redact-out">Key: sk-secret-123456789</div>`,
        starterCss: `#redact-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function redactKey(key) {
  // Return masked key string
  return "";
}`,
        solutionHtml: `<div id="redact-out">Key: sk-...6789</div>`,
        solutionCss: `#redact-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function redactKey(key) {
  if (!key || key.length < 8) return "[REDACTED]";
  return key.slice(0, 3) + "..." + key.slice(-4);
}`,
        hints: ['Use key.slice(0, 3) and key.slice(-4).'],
        testCases: [
          { id: 'tc-13', description: 'Redacts key correctly to sk-...6789', hint: 'Check slicing', checkType: 'text-contains', expectedValue: 'sk-...6789' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-03-02',
          question: 'Why should a frontend web application never directly invoke third-party AI APIs using client-side API keys?',
          options: [
            'Because modern browsers refuse to render HTML if AI APIs are called',
            'Because any API key present in client-side code can be immediately extracted by any visitor, leading to credential theft and uncapped financial abuse',
            'Because AI models only respond to requests written in Python',
            'Because cloud providers charge double for browser requests'
          ],
          correctIndex: 1,
          explanation: 'Client-side assets are completely public. Anyone can inspect browser network traffic or search source bundles to steal exposed keys.'
        }
      ],
      summary: [
        'Never expose production AI API keys in client-side code or public Git repositories.',
        'Always proxy AI requests through an authenticated backend server that validates user identity before calling the cloud LLM.',
        'Enforce startup environment assertions and sanitize all operational logs to prevent credential leakage.'
      ],
      relatedTopics: [
        { title: 'Sending Prompts and Processing Responses', chapterNumber: '3', lessonId: 'ai-03-03', context: 'Learn to process model responses.' }
      ]
    },
    {
      id: 'ai-03-03',
      chapterId: 'ai-mod-03',
      number: '3.3',
      slug: 'sending-prompts-and-processing-responses',
      title: 'Sending Prompts and Processing Responses',
      tagline: 'Multi-turn message state, payload validation, token budgeting, and response parsing',
      durationMinutes: 25,
      learningObjectives: [
        'Structure stateful multi-turn conversation arrays without creating unbounded token growth',
        'Parse model responses safely, extracting text, citations, and function call intents',
        'Implement conversation window pruning and summarization strategies'
      ],
      theorySections: [
        {
          heading: '1. Managing Stateful Multi-Turn Conversations',
          content: 'HTTP is stateless, and LLMs have zero memory between requests. To maintain a conversation, your application must transmit the entire conversation history on every single turn.',
          bulletPoints: [
            'History Array: [{role: "system", content: "..."}, {role: "user", content: "Hi"}, {role: "assistant", content: "Hello!"}]',
            'Token Compounding: Turn 1 is 50 tokens. Turn 10 is 5,000 tokens. Unmanaged history results in quadratic cost growth',
            'Pruning Strategies: Keep the system prompt + sliding window of last N messages (e.g. last 6 turns)'
          ]
        },
        {
          heading: '2. Robust Response Parsing',
          content: 'Model completions may return unexpected formatting (markdown code fences around JSON, conversational pleasantries, or refusal strings). Your parser must normalize outputs before passing them to application business logic.',
          bulletPoints: [
            'Stripping Code Fences: Cleaning ```json and ``` delimiters before JSON.parse()',
            'Finish Reason Checks: Checking if the model stopped because it finished (STOP) or because it hit maxOutputTokens (LENGTH)',
            'Handling Truncation: Detecting truncated JSON when the output token budget is exceeded'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Medical Chart at the Doctor Office',
        concept: 'Stateless Conversation History',
        story: 'When you visit the clinic, the doctor does not remember your exact blood pressure from three weeks ago out of memory. The nurse hands the doctor your physical medical chart (the conversation history array). The doctor reads the entire chart before speaking to you. At the end of the visit, the doctor writes new notes on the chart for next time.',
        moral: 'Your backend database is the medical chart; the LLM reads the chart anew on every API call.',
        icon: 'FileText'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Robust Markdown JSON Extractor in TypeScript',
        description: 'Extracting clean JSON from LLM responses even if surrounded by markdown fences.',
        html: `<div class="json-clean-card">
  <h4>Safe JSON Extraction Helper</h4>
  <pre><code>export function extractJsonFromLlmResponse<T>(rawText: string): T {
  let cleaned = rawText.trim();
  
  // Strip markdown code fences if present
  if (cleaned.startsWith('\\\`\\\`\\\`')) {
    cleaned = cleaned.replace(/^\\\`\\\`\\\`(?:json)?\\n?/, '').replace(/\\n?\\\`\\\`\\\`$/, '').trim();
  }
  
  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    throw new Error('LLM output was not valid JSON: ' + cleaned.slice(0, 100));
  }
}</code></pre>
</div>`,
        css: `.json-clean-card { background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '4-7', title: 'Fence Stripping', explanation: 'Safely removes ```json headers that models often include even when instructed not to.' }
        ]
      },
      video: {
        title: 'Multi-Turn Chat Architecture & Response Parsing',
        duration: '15:30',
        description: 'Building a sliding-window message history manager with token budget controls.',
        keyPoints: ['Sliding window history', 'Handling finish_reason = LENGTH', 'Cleaning markdown fences'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Chat State', description: 'Stateless history mechanics.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Today we handle stateful conversations over stateless HTTP APIs.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-03-03',
        title: 'Implement a Sliding Window History Trimmer',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Write a function that keeps the system prompt (index 0) and only the most recent 4 messages, discarding older messages.',
        instructions: [
          'Preserve the system message at messages[0]',
          'Slice the remaining messages to keep only the last 4',
          'Return [systemMsg, ...last4]'
        ],
        starterHtml: `<div id="trim-out">Trimmed count: 0</div>`,
        starterCss: `#trim-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function trimHistory(messages) {
  // Return trimmed array
  return [];
}`,
        solutionHtml: `<div id="trim-out">Trimmed count: 5 (1 system + 4 recent messages)</div>`,
        solutionCss: `#trim-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function trimHistory(messages) {
  if (messages.length <= 5) return messages;
  const systemMsg = messages[0];
  const recent = messages.slice(-4);
  return [systemMsg, ...recent];
}`,
        hints: ['Use messages.slice(-4) to get the tail.'],
        testCases: [
          { id: 'tc-14', description: 'Keeps system message and 4 recent messages', hint: 'Check slice math', checkType: 'text-contains', expectedValue: '5' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-03-03',
          question: 'If a model response stops mid-sentence and finish_reason is reported as "LENGTH", what occurred?',
          options: [
            'The internet connection dropped',
            'The generation hit the maxOutputTokens limit before completing its sentence or closing its JSON bracket',
            'The user asked an illegal question',
            'The server ran out of memory'
          ],
          correctIndex: 1,
          explanation: 'finish_reason: "LENGTH" indicates the output was cut off because it consumed the allocated maxOutputTokens budget.'
        }
      ],
      summary: [
        'LLMs are stateless; clients must re-transmit full message history on every turn.',
        'Use sliding-window history trimming to prevent unbounded cost and latency compounding.',
        'Always sanitize raw model text by stripping markdown code blocks before attempting JSON parsing.'
      ],
      relatedTopics: [
        { title: 'Streaming Responses', chapterNumber: '3', lessonId: 'ai-03-04', context: 'Stream responses with Server-Sent Events.' }
      ]
    },
    {
      id: 'ai-03-04',
      chapterId: 'ai-mod-03',
      number: '3.4',
      slug: 'streaming-responses',
      title: 'Streaming Responses',
      tagline: 'Server-Sent Events (SSE), HTTP chunked transfer, and smooth React UI rendering',
      durationMinutes: 25,
      learningObjectives: [
        'Implement Server-Sent Events (SSE) in Express: Content-Type: text/event-stream, Cache-Control: no-cache',
        'Consume SSE streams in React using fetch and ReadableStream with text decoders',
        'Engineer smooth character-by-character UI typing effects without causing DOM re-render lag'
      ],
      theorySections: [
        {
          heading: '1. Why Streaming is Mandatory for UX',
          content: 'A comprehensive AI response of 400 words takes 6-12 seconds to generate. Without streaming, a user experiences a dead UI for 12 seconds. With streaming, the first token renders in ~400ms, and the user reads along comfortably as words flow onto the screen.',
          bulletPoints: [
            'Time to First Token (TTFT): The metric that dictates perceived application speed',
            'Server-Sent Events (SSE): Lightweight unidirectional text streaming over standard HTTP; simpler than WebSockets',
            'Protocol Specification: Messages formatted as data: {"text": "word"}\\n\\n followed by data: [DONE]\\n\\n'
          ]
        },
        {
          heading: '2. Express SSE Endpoint Architecture',
          content: 'Configuring an Express route for streaming requires setting explicit HTTP headers and disabling standard response buffering.',
          bulletPoints: [
            'res.setHeader("Content-Type", "text/event-stream")',
            'res.setHeader("Cache-Control", "no-cache")',
            'res.setHeader("Connection", "keep-alive")',
            'res.flushHeaders(): Immediately dispatches HTTP headers to client without waiting for body content'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Live Dictation Reporter',
        concept: 'Streaming vs Polling',
        story: 'Waiting for a non-streaming response is like waiting for a court stenographer to type an entire 8-hour trial transcript, bind it in leather, and mail it to you tomorrow. Streaming is like a live audio broadcast: you hear each word the instant the judge speaks it.',
        moral: 'Streaming eliminates user anxiety by providing immediate, continuous visual feedback.',
        icon: 'Radio'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Complete Express SSE Streaming Route',
        description: 'Streaming cloud AI chunks directly to the web client via Server-Sent Events.',
        html: `<div class="sse-code-card">
  <h4>Express SSE Controller</h4>
  <pre><code>app.post('/api/ai/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const stream = await callFrontierCloudStream(req.body.prompt);
    for await (const chunk of stream) {
      const token = chunk.text();
      res.write(\`data: \${JSON.stringify({ text: token })}\\n\\n\`);
    }
    res.write('data: [DONE]\\n\\n');
    res.end();
  } catch (err) {
    res.write(\`data: \${JSON.stringify({ error: 'Stream interrupted' })}\\n\\n\`);
    res.end();
  }
});</code></pre>
</div>`,
        css: `.sse-code-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '2-5', title: 'SSE Headers', explanation: 'Prevents proxies or Nginx from buffering the chunks, ensuring real-time arrival.' }
        ]
      },
      video: {
        title: 'Implementing Server-Sent Events for AI Streams',
        duration: '16:40',
        description: 'End-to-end implementation from Express controller to React frontend state updates.',
        keyPoints: ['SSE headers', 'React reader loop', 'Auto-scrolling smooth UI'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Streaming Setup', description: 'SSE protocols.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Let us build a lightning-fast streaming interface using Server-Sent Events.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-03-04',
        title: 'Format an SSE Event Frame',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper function that formats a JavaScript object into a valid Server-Sent Event data packet.',
        instructions: [
          'Stringify the payload object',
          'Prefix with "data: "',
          'Suffix with two newline characters "\\n\\n"'
        ],
        starterHtml: `<div id="sse-frame">data: pending</div>`,
        starterCss: `#sse-frame { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function formatSseEvent(payload) {
  return "";
}`,
        solutionHtml: `<div id="sse-frame">data: {"token":"Hello"}\\n\\n</div>`,
        solutionCss: `#sse-frame { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function formatSseEvent(payload) {
  return "data: " + JSON.stringify(payload) + "\\n\\n";
}`,
        hints: ['Must terminate with double newlines \\n\\n.'],
        testCases: [
          { id: 'tc-15', description: 'Formats valid SSE frame ending with double newline', hint: 'Check double newline', checkType: 'text-contains', expectedValue: 'data: ' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-03-04',
          question: 'Which HTTP Content-Type header must be returned by the server to establish a standard Server-Sent Events (SSE) stream?',
          options: [
            'application/json',
            'text/event-stream',
            'multipart/form-data',
            'application/x-www-form-urlencoded'
          ],
          correctIndex: 1,
          explanation: 'text/event-stream instructs the browser and intermediary reverse proxies to keep the connection open for continuous event chunks.'
        }
      ],
      summary: [
        'Streaming drastically reduces perceived latency by lowering Time to First Token (TTFT) to under 500ms.',
        'Server-Sent Events (SSE) provide a robust, firewall-friendly unidirectional text streaming protocol over HTTP.',
        'Always set Cache-Control: no-cache and flush headers immediately to prevent proxy buffering.'
      ],
      relatedTopics: [
        { title: 'Error Handling, Rate Limits and Usage Control', chapterNumber: '3', lessonId: 'ai-03-05', context: 'Production resilience and rate limits.' }
      ]
    },
    {
      id: 'ai-03-05',
      chapterId: 'ai-mod-03',
      number: '3.5',
      slug: 'error-handling-rate-limits-usage-control',
      title: 'Error Handling, Rate Limits and Usage Control',
      tagline: 'HTTP 429 backoff, token budgeting, multi-provider fallbacks, and circuit breakers',
      durationMinutes: 25,
      learningObjectives: [
        'Handle HTTP 429 (Too Many Requests) and HTTP 503 errors using exponential backoff with full jitter',
        'Implement circuit breaker patterns to prevent cascade failures when a provider experiences an outage',
        'Architect multi-provider fallback routines (e.g. Gemini Primary -> Claude Secondary -> Local Tertiary)'
      ],
      theorySections: [
        {
          heading: '1. Rate Limits and Exponential Backoff with Jitter',
          content: 'Cloud AI providers enforce strict rate limits across two dimensions: Requests Per Minute (RPM) and Tokens Per Minute (TPM). When an application spikes, the API returns HTTP 429 Too Many Requests.',
          bulletPoints: [
            'Fixed Sleep (Anti-pattern): Retrying every 1 second causes thundering herds that immediately trigger another 429',
            'Exponential Backoff: Doubling wait time on each retry: base * 2^attempt (e.g. 1s, 2s, 4s, 8s)',
            'Full Jitter: Randomizing sleep interval: Math.random() * (base * 2^attempt) to spread traffic smoothly over time'
          ]
        },
        {
          heading: '2. Multi-Provider Fallback Circuits',
          content: 'No mission-critical application should depend on a single cloud vendor. When the primary provider encounters an outage or rate limit, your proxy gateway should automatically failover to a secondary model.',
          bulletPoints: [
            'Circuit Breaker States: Closed (Healthy), Open (Tripped due to errors; immediate fallback), Half-Open (Canary testing recovery)',
            'Schema Normalization: Ensure fallback providers receive prompts in their native format and parse responses uniformly'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Dual-Generator Hospital Power Grid',
        concept: 'High-Availability Fallback',
        story: 'A hospital does not rely solely on the city electrical grid. If the primary transformer blows (HTTP 503 Provider Outage), an automatic transfer switch (circuit breaker) immediately routes power to on-site diesel generators (secondary cloud provider or local model) within milliseconds.',
        moral: 'Build failover into your AI architecture before production launch, not during a high-traffic crisis.',
        icon: 'ShieldCheck'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Exponential Backoff with Full Jitter Implementation',
        description: 'Robust retry wrapper for resilient AI API requests in TypeScript.',
        html: `<div class="backoff-code-card">
  <h4>Exponential Backoff with Full Jitter</h4>
  <pre><code>export async function callWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelayMs = 1000
): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (err: any) {
      attempt++;
      // Only retry on rate limits (429) or transient server errors (500, 503)
      const isTransient = err.status === 429 || (err.status >= 500 && err.status < 600);
      if (!isTransient || attempt >= maxRetries) throw err;

      // Calculate exponential backoff with full jitter
      const maxBackoff = baseDelayMs * Math.pow(2, attempt);
      const jitteredDelay = Math.random() * maxBackoff;
      console.warn(\`Rate limit hit (attempt \${attempt}/\${maxRetries}). Retrying in \${Math.round(jitteredDelay)}ms\`);
      await new Promise(res => setTimeout(res, jitteredDelay));
    }
  }
  throw new Error("Max retries exceeded");
}</code></pre>
</div>`,
        css: `.backoff-code-card { background: #0f172a; color: #f87171; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #fca5a5; }`,
        breakdown: [
          { lineRange: '15-18', title: 'Full Jitter Math', explanation: 'Randomizes the delay across the exponential window to disperse concurrent retries.' }
        ]
      },
      video: {
        title: 'Resilient AI Gateways: Backoff & Circuit Breakers',
        duration: '16:15',
        description: 'Testing 429 rate limit simulation, circuit breaker tripping, and seamless multi-provider failover.',
        keyPoints: ['Jitter formula mathematics', 'Circuit breaker states', 'Multi-provider fallback routing'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Resilience Patterns', description: 'Handling 429 errors.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we build bulletproof retry logic for cloud AI gateways.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-03-05',
        title: 'Calculate Exponential Backoff Interval',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Calculate the maximum backoff window for attempt 3 given a base delay of 1,000ms.',
        instructions: [
          'Calculate baseDelay * Math.pow(2, attempt)',
          'For attempt 3 and base 1000ms: 1000 * 2^3 = 8,000ms',
          'Return the result in milliseconds'
        ],
        starterHtml: `<div id="backoff-out">Backoff: 0ms</div>`,
        starterCss: `#backoff-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function calculateMaxBackoff(attempt, baseDelay) {
  return 0;
}`,
        solutionHtml: `<div id="backoff-out">Backoff: 8000ms</div>`,
        solutionCss: `#backoff-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function calculateMaxBackoff(attempt, baseDelay) {
  return baseDelay * Math.pow(2, attempt);
}`,
        hints: ['1000 * 8 = 8000.'],
        testCases: [
          { id: 'tc-16', description: 'Calculates 8000ms for attempt 3', hint: '1000 * 8', checkType: 'text-contains', expectedValue: '8000' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-03-05',
          question: 'Why is "Full Jitter" (randomization) added to exponential backoff when handling HTTP 429 rate limits?',
          options: [
            'To confuse web crawlers and scrapers',
            'To prevent hundreds of concurrent clients from retrying at the exact same millisecond and causing repeated thundering herd rate limits',
            'To reduce memory usage on the client',
            'To bypass authentication checks'
          ],
          correctIndex: 1,
          explanation: 'Without jitter, all failed clients retry simultaneously in lockstep, repeatedly overwhelming the server in rhythmic spikes.'
        }
      ],
      summary: [
        'Always handle HTTP 429 and transient 500 errors using exponential backoff with full jitter.',
        'Implement circuit breakers to fail fast and divert traffic to secondary providers during prolonged outages.',
        'Multi-provider redundancy ensures your application maintains high availability regardless of individual vendor status.'
      ],
      relatedTopics: [
        { title: 'Prompt Engineering and Structured Output', chapterNumber: '4', lessonId: 'ai-04-01', context: 'Advance to Module 4.' }
      ]
    }
  ]
};
