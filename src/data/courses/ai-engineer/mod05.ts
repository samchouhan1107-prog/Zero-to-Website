import { Chapter } from '../../../utils/types';

export const aiModule05: Chapter = {
  id: 'ai-mod-05',
  number: '5',
  badge: 'AI 05',
  slug: 'building-ai-applications',
  title: 'Building AI Applications',
  subtitle: 'Full-Stack React, Express Gateways, Conversation State, Streaming SSE & Defensive UI States',
  description: 'Build complete, production-grade AI web applications. Connect modern React user interfaces to Express backend gateways, manage client and server conversation state, implement Server-Sent Events streaming with real-time UI typing, and handle network disconnects, retry states, and rate limits gracefully.',
  estimatedHours: '4 hrs',
  accentColor: 'emerald',
  iconName: 'Layout',
  totalLessons: 5,
  lessons: [
    {
      id: 'ai-05-01',
      chapterId: 'ai-mod-05',
      number: '5.1',
      slug: 'connecting-react-to-ai-backend',
      title: 'Connecting React Frontend Applications to a Backend',
      tagline: 'Component hierarchy, custom hooks, AbortController cancellation, and decoupled state',
      durationMinutes: 25,
      learningObjectives: [
        'Design a clean, modular React component architecture for AI interactions (ChatInterface, MessageList, PromptInput)',
        'Author a reusable useAiChat custom hook encapsulating streaming state and message arrays',
        'Implement AbortController to allow users to stop long-running streaming completions instantly'
      ],
      theorySections: [
        {
          heading: '1. Frontend Architecture for AI Interfaces',
          content: 'Building an interactive AI application requires more than a simple textarea. An engineering-grade React interface separates the presentation of messages from the network streaming state machine.',
          bulletPoints: [
            'State Machine: Idle -> Submitting -> Streaming -> Complete | Error',
            'Message Data Contract: Array of { id, role: "user" | "assistant", content: string, status: "pending" | "complete" | "error" }',
            'Optimistic Updates: Instantly append the user message to the UI before the network roundtrip completes'
          ]
        },
        {
          heading: '2. User-Initiated Stream Cancellation with AbortController',
          content: 'When an AI starts generating a 500-word response that the user realizes is off-track, the user must be able to click "Stop Generating". This requires passing an AbortSignal to the fetch request, terminating the HTTP connection immediately and freeing server resources.',
          bulletPoints: [
            'const controller = new AbortController()',
            'fetch("/api/ai/chat", { signal: controller.signal })',
            'controller.abort(): Immediately closes the stream and triggers the abort event handler'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Telephone Call with a Red Hang-Up Button',
        concept: 'AbortController',
        story: 'When you call customer service, if the automated robot starts reciting a 10-minute disclaimer you already know, you press "0" or hang up the phone (AbortController). You do not let your phone remain off the hook for 10 minutes wasting your battery and their line.',
        moral: 'Always give the user a red hang-up button to stop generation and conserve both token budget and server memory.',
        icon: 'PhoneCall'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Production useAiChat Custom Hook in React',
        description: 'Complete custom hook handling messages, streaming, and AbortController.',
        html: `<div class="react-hook-card">
  <h4>Custom useAiChat Hook</h4>
  <pre><code>import { useState, useRef, useCallback } from 'react';

export function useAiChat(endpoint = '/api/ai/stream') {
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string }>>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (userText: string) => {
    const userMsg = { id: \`user-\${Date.now()}\`, role: 'user' as const, content: userText };
    const assistantId = \`ai-\${Date.now()}\`;
    
    setMessages(prev => [...prev, userMsg, { id: assistantId, role: 'assistant', content: '' }]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText }),
        signal: controller.signal
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: m.content + chunk } : m));
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') console.error(err);
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [endpoint]);

  const stopGenerating = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return { messages, isStreaming, sendMessage, stopGenerating };
}</code></pre>
</div>`,
        css: `.react-hook-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 13px; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '15-17', title: 'AbortController Setup', explanation: 'Creates and stores an AbortController instance to enable user-initiated cancellation.' },
          { lineRange: '33-36', title: 'State Append', explanation: 'Incrementally updates the assistant message text without full array reallocations.' }
        ]
      },
      video: {
        title: 'Building a Streaming Chat Interface in React',
        duration: '16:30',
        description: 'Creating the useAiChat hook, auto-scrolling message lists, and stop button integration.',
        keyPoints: ['Optimistic message updates', 'AbortController cancellation', 'ReadableStream text decoders'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'React Hook Architecture', description: 'useAiChat implementation.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we build a production React interface for streaming AI interactions.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-05-01',
        title: 'Implement Stop Generating with AbortController',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Write a React button click handler that aborts the active AbortController and resets streaming state.',
        instructions: [
          'Call controllerRef.current?.abort()',
          'Set isStreaming(false)',
          'Clear controllerRef.current = null'
        ],
        starterHtml: `<button id="stop-btn">Stop Generating</button>`,
        starterCss: `#stop-btn { padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 4px; }`,
        starterJs: `function handleStop() {
  // Implement abort logic
}`,
        solutionHtml: `<button id="stop-btn">Stopped</button>`,
        solutionCss: `#stop-btn { padding: 0.5rem 1rem; background: #991b1b; color: white; border: none; border-radius: 4px; }`,
        solutionJs: `function handleStop(controllerRef, setIsStreaming) {
  if (controllerRef.current) {
    controllerRef.current.abort();
    controllerRef.current = null;
  }
  setIsStreaming(false);
}`,
        hints: ['Call abort() on the current controller instance.'],
        testCases: [
          { id: 'tc-22', description: 'Aborts active controller', hint: 'Check abort() call', checkType: 'text-contains', expectedValue: 'abort' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-05-01',
          question: 'What standard Web API allows a browser to cancel an ongoing HTTP fetch stream when the user clicks "Stop Generating"?',
          options: [
            'document.reload()',
            'AbortController and its signal property',
            'localStorage.clear()',
            'CSS animation-play-state: paused'
          ],
          correctIndex: 1,
          explanation: 'Passing AbortController.signal to fetch() allows the application to cleanly abort ongoing network streams on command.'
        }
      ],
      summary: [
        'Decouple AI message state into presentation components and a dedicated custom hook (useAiChat).',
        'Always provide an AbortController stop button to allow users to cancel long-running token streams immediately.',
        'Apply optimistic UI updates to render user messages instantaneously before network roundtrips complete.'
      ],
      relatedTopics: [
        { title: 'Express API Integration', chapterNumber: '5', lessonId: 'ai-05-02', context: 'Build the server-side Express gateway.' }
      ]
    },
    {
      id: 'ai-05-02',
      chapterId: 'ai-mod-05',
      number: '5.2',
      slug: 'express-api-integration',
      title: 'Express API Integration',
      tagline: 'Middleware, authentication checks, payload sanitization, and streaming controllers',
      durationMinutes: 25,
      learningObjectives: [
        'Architect an Express AI controller with authentication, rate-limiting, and validation middleware',
        'Manage incoming JSON bodies safely and enforce strict content-type assertions',
        'Mount Vite development middlewares alongside Express in full-stack setups'
      ],
      theorySections: [
        {
          heading: '1. The Production AI Gateway Middleware Pipeline',
          content: 'Every AI request entering your backend must pass through a defensive pipeline before reaching the cloud provider or local runtime.',
          bulletPoints: [
            '1. Auth Middleware: Verifies session cookie or JWT Bearer token; rejects unauthenticated callers with 401',
            '2. Rate Limiting Middleware: Enforces max 10 requests/minute per user ID to prevent denial-of-wallet abuse',
            '3. Validation Middleware: Asserts prompt is a non-empty string under 2,000 characters',
            '4. AI Controller: Orchestrates prompt construction, cloud SDK call, and response streaming'
          ]
        },
        {
          heading: '2. Unified Dev and Production Architecture',
          content: 'In modern full-stack web architectures, Express serves both API routes and client assets. In development, Express mounts vite.middlewares to provide instant HMR. In production, Express serves compiled static dist/ assets directly.',
          bulletPoints: [
            'Single Port (3000): Eliminates cross-origin CORS complexity between frontend and backend',
            'Shared Types: TypeScript interfaces shared across server and client in a monorepo structure'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Airport Security Checkpoint',
        concept: 'Middleware Pipeline',
        story: 'A passenger cannot walk directly onto the airplane tarmac. First, they present their passport and boarding pass (Auth Middleware). Next, their luggage passes through the X-ray scanner (Validation & Sanitization Middleware). Only after passing all checkpoints do they board the aircraft (AI Controller).',
        moral: 'Layered middleware prevents malicious or invalid payloads from ever reaching expensive AI execution engines.',
        icon: 'ShieldCheck'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Complete Express AI Controller Route with Middleware',
        description: 'Defensive Express route with auth and rate-limiting middleware.',
        html: `<div class="express-code-card">
  <h4>Express AI Router Pipeline</h4>
  <pre><code>import express from 'express';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { error: 'Rate limit exceeded: maximum 10 queries per minute.' }
});

router.post('/api/ai/query', aiLimiter, async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'Prompt must be a non-empty string' });
  }

  try {
    const result = await executeAiInference(prompt);
    res.json({ success: true, result });
  } catch (err: any) {
    res.status(500).json({ error: 'Inference failed: ' + err.message });
  }
});</code></pre>
</div>`,
        css: `.express-code-card { background: #0f172a; color: #cbd5e1; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '6-10', title: 'Rate Limiter', explanation: 'Limits users to 10 queries per minute to protect API budgets from automated abuse.' }
        ]
      },
      video: {
        title: 'Building an Express AI Gateway',
        duration: '15:10',
        description: 'Implementing authentication, rate-limiting, and error handlers in Node.js.',
        keyPoints: ['express-rate-limit configuration', 'Zod request validation', 'Centralized error handlers'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Express Pipeline', description: 'Middleware chain.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we build a hardened Express gateway for our AI applications.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-05-02',
        title: 'Validate Prompt Request Body',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write an Express middleware that checks if req.body.prompt is a string between 1 and 2,000 characters, returning 400 if invalid.',
        instructions: [
          'Verify req.body.prompt exists and is of type "string"',
          'Verify prompt length is > 0 and <= 2000',
          'Call next() if valid; return res.status(400).json(...) if invalid'
        ],
        starterHtml: `<div id="mid-out">Middleware: pending</div>`,
        starterCss: `#mid-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function validatePrompt(req, res, next) {
  // Validate prompt
}`,
        solutionHtml: `<div id="mid-out">Middleware verified: rejects empty and >2000 chars</div>`,
        solutionCss: `#mid-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function validatePrompt(req, res, next) {
  const p = req.body?.prompt;
  if (!p || typeof p !== 'string' || p.trim().length === 0 || p.length > 2000) {
    return res.status(400).json({ error: 'Invalid prompt length' });
  }
  next();
}`,
        hints: ['Check typeof p === "string" and p.length <= 2000.'],
        testCases: [
          { id: 'tc-23', description: 'Rejects invalid prompt with 400', hint: 'Check bounds', checkType: 'text-contains', expectedValue: 'Invalid' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-05-02',
          question: 'Why is rate-limiting middleware mandatory on public-facing AI backend endpoints?',
          options: [
            'Because AI models need a break every 10 minutes to cool down',
            'To prevent a single malicious script or user from consuming thousands of dollars in cloud API tokens in seconds',
            'To prevent the server from running out of disk space',
            'To force users to clear their browser cache'
          ],
          correctIndex: 1,
          explanation: 'Without rate limits, automated bots can spam API endpoints, generating catastrophic cloud token bills within minutes.'
        }
      ],
      summary: [
        'Guard every AI endpoint with authentication and rate-limiting middleware to prevent financial denial-of-wallet attacks.',
        'Validate and sanitize user prompt inputs before passing them to backend model execution functions.',
        'Mount backend API controllers alongside frontend dev middlewares on a unified port to simplify routing and security.'
      ],
      relatedTopics: [
        { title: 'Conversation State and Memory', chapterNumber: '5', lessonId: 'ai-05-03', context: 'Persist chat history in databases.' }
      ]
    },
    {
      id: 'ai-05-03',
      chapterId: 'ai-mod-05',
      number: '5.3',
      slug: 'conversation-state-and-memory',
      title: 'Conversation State and Memory',
      tagline: 'Database persistence, session stores, sliding windows, and hierarchical summary memory',
      durationMinutes: 25,
      learningObjectives: [
        'Persist multi-turn conversation threads in a relational or document database (Postgres, SQLite, Firestore)',
        'Implement hierarchical summary memory: summarizing turns 1-10 while preserving turns 11-15 verbatim',
        'Restore user conversation state across browser refreshes and multiple devices'
      ],
      theorySections: [
        {
          heading: '1. Why Memory Cannot Live in Memory Alone',
          content: 'Keeping conversation state in local component state (useState) means that when a user accidentally refreshes their browser or switches from phone to laptop, their entire chat is lost. Production systems persist conversations to a database keyed by userId and threadId.',
          bulletPoints: [
            'threads table: id, user_id, title, created_at, updated_at',
            'messages table: id, thread_id, role, content, token_count, created_at',
            'Restoration: On page load, fetch /api/ai/threads/:id/messages to re-hydrate React state'
          ]
        },
        {
          heading: '2. The Hierarchical Summary Memory Pattern',
          content: 'In long conversations (20+ turns), passing all historical messages exceeds token budgets. Hierarchical memory uses an asynchronous background worker to summarize older turns into a persistent concise summary paragraph.',
          bulletPoints: [
            'System Prompt: Core persona + "Summary of previous discussion: [summary_text]"',
            'Active Turns: Keep only the most recent 4-6 messages in verbatim form',
            'Compaction Trigger: When conversation exceeds 10 turns, trigger a fast SLM (e.g. Gemma 2 2B) to update the summary paragraph'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Court Reporter Transcript vs. The Executive Abstract',
        concept: 'Hierarchical Memory',
        story: 'If a trial lasts 40 days, the jury does not re-read all 3,000 pages of testimony every morning. The court clerk provides a 2-page executive summary of days 1-38, while the lawyers reference the full verbatim transcript of yesterday testimony.',
        moral: 'Summarize the past into a concise paragraph, and preserve only immediate recent turns in full verbatim detail.',
        icon: 'BookOpen'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Asynchronous Conversation Summarizer in TypeScript',
        description: 'Compacting older conversation turns into a running summary paragraph.',
        html: `<div class="memory-code-card">
  <h4>Conversation Summarizer Function</h4>
  <pre><code>export async function compactConversationHistory(
  existingSummary: string,
  olderMessages: Array<{ role: string; content: string }>
): Promise<string> {
  const prompt = \`Existing Summary: "\${existingSummary}"
New Dialogue to assimilate:
\${olderMessages.map(m => \`\${m.role}: \${m.content}\`).join('\\n')}

Output an updated concise 3-sentence summary preserving all critical facts, user preferences, and decisions.\`;

  const response = await callFastSlm(prompt);
  return response.trim();
}</code></pre>
</div>`,
        css: `.memory-code-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '6-11', title: 'Compaction Prompt', explanation: 'Merges existing summary with new message lines, yielding a clean, bounded representation.' }
        ]
      },
      video: {
        title: 'Persistent Conversation Memory Architecture',
        duration: '16:00',
        description: 'Database schema design for multi-turn chats and automated background summarization.',
        keyPoints: ['Postgres schema for chat', 'Sliding window compaction', 'Session re-hydration in React'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Memory Architecture', description: 'Persistence models.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Today we persist conversation threads across sessions and devices.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-05-03',
        title: 'Partition History into Old and Recent',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper that splits an array of 10 messages into olderMessages (first 6) and recentMessages (last 4).',
        instructions: [
          'olderMessages = messages.slice(0, -4)',
          'recentMessages = messages.slice(-4)',
          'Return { olderMessages, recentMessages }'
        ],
        starterHtml: `<div id="split-out">Partition: pending</div>`,
        starterCss: `#split-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function partitionMessages(messages) {
  return {};
}`,
        solutionHtml: `<div id="split-out">Partitioned: 6 older, 4 recent</div>`,
        solutionCss: `#split-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function partitionMessages(messages) {
  return {
    olderMessages: messages.slice(0, -4),
    recentMessages: messages.slice(-4)
  };
}`,
        hints: ['Use negative indexing with slice(-4).'],
        testCases: [
          { id: 'tc-24', description: 'Splits messages correctly', hint: 'Check slice', checkType: 'text-contains', expectedValue: 'olderMessages' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-05-03',
          question: 'What is the primary benefit of Hierarchical Summary Memory over naive full-history re-transmission?',
          options: [
            'It prevents the model from generating code',
            'It compresses dozens of past turns into a single bounded summary paragraph, preventing token budget exhaustion while preserving long-term conversational context',
            'It eliminates the need for a database',
            'It changes the color of the chat window'
          ],
          correctIndex: 1,
          explanation: 'Summary memory bounds token growth to a constant size regardless of whether the conversation spans 10 turns or 1,000 turns.'
        }
      ],
      summary: [
        'Persist conversations in a backend database keyed by userId and threadId to support cross-device synchronization.',
        'Use sliding-window history combined with automated background summarization to bound context token consumption.',
        'Re-hydrate conversation state on React mount to deliver a seamless, uninterrupted user experience.'
      ],
      relatedTopics: [
        { title: 'Server-Sent Events', chapterNumber: '5', lessonId: 'ai-05-04', context: 'Master SSE streaming protocols.' }
      ]
    },
    {
      id: 'ai-05-04',
      chapterId: 'ai-mod-05',
      number: '5.4',
      slug: 'server-sent-events',
      title: 'Server-Sent Events',
      tagline: 'Deep dive into text/event-stream parsing, heartbeat pings, and reconnection resilience',
      durationMinutes: 25,
      learningObjectives: [
        'Master the W3C Server-Sent Events protocol specification: data, event, id, retry',
        'Implement 15-second heartbeat ping comments (: ping\\n\\n) to keep connections alive through cloud reverse proxies',
        'Handle stream disconnects and resume token streaming using Event IDs'
      ],
      theorySections: [
        {
          heading: '1. The Anatomy of an SSE Event Stream',
          content: 'Server-Sent Events (SSE) define a simple text-based protocol. A message is composed of plain text lines separated by a single newline, and terminated by a double newline (\\n\\n).',
          bulletPoints: [
            'data: The payload string (e.g. data: {"token": "Hello"})',
            'event: Custom event name (e.g. event: token vs event: done vs event: error)',
            'id: Unique sequence identifier used for client reconnection tracking',
            ': (Colon): Comment lines ignored by parsers; used for keep-alive heartbeat pings'
          ]
        },
        {
          heading: '2. The Proxy Timeout Problem & Heartbeats',
          content: 'Cloud reverse proxies (Cloudflare, AWS ALB, GCP Cloud Run) automatically terminate HTTP connections that remain silent for 30-60 seconds. If an LLM is thinking or processing a complex reasoning pass before emitting tokens, the proxy terminates the socket with a 504 Gateway Timeout.',
          bulletPoints: [
            'Heartbeat Solution: The server sends a comment line (: keep-alive\\n\\n) every 15 seconds',
            'Zero Parser Pollution: Standard SSE parsers silently ignore comment lines, keeping the TCP connection alive without affecting token output'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Submarine Sonar Ping',
        concept: 'Keep-Alive Heartbeats',
        story: 'A submarine running deep underwater under radio silence emits a faint sonar ping every 30 seconds back to naval headquarters. It is not sending tactical orders; it is simply letting headquarters know, "We are still operational; do not declare us lost at sea."',
        moral: 'Emit comment pings every 15 seconds so cloud reverse proxies know your generation stream is still alive.',
        icon: 'Radio'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'SSE Controller with Heartbeat Interval in Express',
        description: 'Preventing reverse proxy timeouts with automated keep-alive pings.',
        html: `<div class="sse-heartbeat-card">
  <h4>Express SSE Controller with Keep-Alive</h4>
  <pre><code>app.post('/api/ai/stream-with-heartbeat', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Emit heartbeat comment every 15 seconds to prevent proxy timeout
  const heartbeatTimer = setInterval(() => {
    res.write(': keepalive\\n\\n');
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeatTimer);
  });

  try {
    const stream = await callAiStream(req.body.prompt);
    for await (const chunk of stream) {
      res.write(\`data: \${JSON.stringify({ text: chunk })}\\n\\n\`);
    }
    res.write('data: [DONE]\\n\\n');
  } finally {
    clearInterval(heartbeatTimer);
    res.end();
  }
});</code></pre>
</div>`,
        css: `.sse-heartbeat-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '9-15', title: 'Heartbeat Timer', explanation: 'Sends : keepalive comment frames every 15s, clearing automatically when the client disconnects.' }
        ]
      },
      video: {
        title: 'Production SSE: Heartbeats & Resilient Streams',
        duration: '15:20',
        description: 'Solving proxy timeouts, buffering issues in Nginx, and handling connection recovery.',
        keyPoints: ['Nginx X-Accel-Buffering: no', 'Keep-alive comment syntax', 'Handling req.on("close")'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'SSE Internals', description: 'Heartbeat mechanics.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we harden our Server-Sent Events streams against cloud proxy timeouts.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-05-04',
        title: 'Format an SSE Heartbeat Comment',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper that returns a valid SSE comment line with the text "ping".',
        instructions: [
          'SSE comments start with a colon ":"',
          'Follow with space and message: ": ping"',
          'Terminate with double newline: "\\n\\n"'
        ],
        starterHtml: `<div id="ping-out">Ping: pending</div>`,
        starterCss: `#ping-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function formatSsePing() {
  return "";
}`,
        solutionHtml: `<div id="ping-out">: ping\\n\\n</div>`,
        solutionCss: `#ping-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function formatSsePing() {
  return ": ping\\n\\n";
}`,
        hints: ['Must start with ":" and end with "\\n\\n".'],
        testCases: [
          { id: 'tc-25', description: 'Returns valid SSE comment frame', hint: 'Check : ping', checkType: 'text-contains', expectedValue: ': ping' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-05-04',
          question: 'Why are comment lines starting with a colon (e.g. ": keepalive\\n\\n") sent during long streaming AI operations?',
          options: [
            'To translate the stream into Morse code',
            'To keep cloud load balancers and reverse proxies from terminating silent connections with 504 timeouts without polluting client token parsers',
            'To reset user passwords',
            'To reboot the client computer'
          ],
          correctIndex: 1,
          explanation: 'Reverse proxies disconnect idle TCP sockets; comment lines provide data activity that proxies respect while parsers ignore.'
        }
      ],
      summary: [
        'Server-Sent Events (SSE) format messages as data, event, id, or comment lines terminated by double newlines.',
        'Cloud reverse proxies drop idle connections after 30-60s; use 15-second heartbeat comments to maintain open streams.',
        'Always listen to req.on("close") to clear timers and abort background model generation when users disconnect.'
      ],
      relatedTopics: [
        { title: 'Loading, Error and Retry States', chapterNumber: '5', lessonId: 'ai-05-05', context: 'Build bulletproof UI error handling.' }
      ]
    },
    {
      id: 'ai-05-05',
      chapterId: 'ai-mod-05',
      number: '5.5',
      slug: 'loading-error-and-retry-states',
      title: 'Loading, Error and Retry States',
      tagline: 'Defensive UI engineering, skeleton placeholders, retry triggers, and graceful degradation',
      durationMinutes: 25,
      learningObjectives: [
        'Design responsive, human-centred loading states: pulsing skeleton shimmers vs. streaming cursors',
        'Handle network dropouts gracefully with 1-click in-place retry buttons',
        'Provide clear, non-technical error diagnostics when rate limits or safety blocks trigger'
      ],
      theorySections: [
        {
          heading: '1. Human-Centred AI State Feedback',
          content: 'AI generation involves unpredictable latency. A user must never wonder whether the application has frozen, crashed, or is actively working.',
          bulletPoints: [
            'Thinking Phase (0 - 500ms): Show subtle pulsing skeleton shimmer or "Analyzing context..." indicator',
            'Streaming Phase: Display blinking terminal cursor (e.g. ▋) at the tail of incoming text',
            'Completion Phase: Remove cursor, reveal token count / generation duration, and enable copy/share actions',
            'Error Phase: Replace spinner with clean diagnostic alert card and a 1-click Retry action'
          ]
        },
        {
          heading: '2. In-Place Error Recovery',
          content: 'If an error occurs (rate limit 429, safety filter block, or socket disconnect), never wipe out the user prompt. Keep the prompt populated and render an inline error message with a "Retry Question" button.',
          bulletPoints: [
            'Preserve User Input: Never force the user to retype a 3-paragraph prompt because of a transient server error',
            'Automated vs. Manual Retry: Automatically retry network glitches once; show manual retry button for rate limits or safety refusals'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Elevator Floor Indicator',
        concept: 'State Feedback',
        story: 'If an elevator has no floor display and no sound, stepping inside and pressing "Floor 40" is terrifying. You do not know if the elevator is moving or stuck between floors. A floor indicator showing "Floor 2... 3... 4..." gives you continuous reassurance that the system is functioning normally.',
        moral: 'Visual loading indicators eliminate user anxiety by providing continuous operational proof of life.',
        icon: 'Sparkles'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'React Error Alert with In-Place Retry Button',
        description: 'Clean error state component with retry trigger and error diagnostics.',
        html: `<div class="error-ui-card">
  <h4>AI Error State Component</h4>
  <pre><code>interface ErrorBannerProps {
  error: string | null;
  onRetry: () => void;
}

export const AiErrorBanner: React.FC<ErrorBannerProps> = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <div className="card" style={{ borderColor: 'var(--color-danger)', backgroundColor: 'var(--color-surface-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <strong style={{ color: 'var(--color-danger)' }}>Generation Interrupted</strong>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '13px', color: 'var(--color-text-muted)' }}>
            {error}
          </p>
        </div>
        <button type="button" onClick={onRetry} className="btn btn-secondary btn-sm">
          Retry Request
        </button>
      </div>
    </div>
  );
};</code></pre>
</div>`,
        css: `.error-ui-card { background: #0f172a; color: #f87171; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #fca5a5; }`,
        breakdown: [
          { lineRange: '15-18', title: 'Retry Trigger', explanation: 'Provides an immediate recovery path without forcing the user to re-enter their question.' }
        ]
      },
      video: {
        title: 'Designing Defensive AI User Experiences',
        duration: '14:50',
        description: 'Building skeleton shimmers, streaming cursors, and in-place error recovery components.',
        keyPoints: ['CSS streaming cursor animations', 'Preserving prompt state on failure', 'Human-friendly error diagnostics'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Defensive UI', description: 'State management.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we craft resilient, reassuring user interfaces for AI applications.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-05-05',
        title: 'Build a Streaming Blinking Cursor in CSS',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Create a CSS class .ai-cursor that pulses opacity from 1 to 0 using a 1-second keyframe animation.',
        instructions: [
          'Define @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }',
          'Apply animation: blink 1s infinite'
        ],
        starterHtml: `<span class="ai-cursor">▋</span>`,
        starterCss: `.ai-cursor { color: #3b82f6; }`,
        starterJs: `console.log("Cursor check");`,
        solutionHtml: `<span class="ai-cursor">▋</span>`,
        solutionCss: `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.ai-cursor { color: #3b82f6; animation: blink 1s infinite; font-weight: bold; }`,
        solutionJs: `console.log("Cursor animation verified");`,
        hints: ['Use keyframes with 0%, 50%, 100%.'],
        testCases: [
          { id: 'tc-26', description: 'Contains blink animation rule', hint: 'Check @keyframes', checkType: 'text-contains', expectedValue: 'blink' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-05-05',
          question: 'What is the most critical UX rule when an AI generation request fails due to a network glitch or rate limit?',
          options: [
            'Immediately wipe out the user input form and return to the home screen',
            'Preserve the user prompt, display a clear diagnostic explanation, and offer an immediate 1-click Retry button',
            'Log the user out of the application',
            'Play a loud buzzer sound effect'
          ],
          correctIndex: 1,
          explanation: 'Users invest significant mental effort into drafting prompts. Preserving their text and offering 1-click retry prevents severe user frustration.'
        }
      ],
      summary: [
        'Provide unambiguous visual states for idle, thinking, streaming, complete, and error phases.',
        'Never wipe out user prompt text on error; keep input preserved and offer 1-click retry buttons.',
        'Use streaming cursors and skeleton shimmers to eliminate user anxiety during generation latency.'
      ],
      relatedTopics: [
        { title: 'Function Calling and AI Tools', chapterNumber: '6', lessonId: 'ai-06-01', context: 'Advance to Module 6.' }
      ]
    }
  ]
};
