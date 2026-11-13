import { Chapter } from '../../../utils/types';

export const aiModule09: Chapter = {
  id: 'ai-mod-09',
  number: '9',
  badge: 'AI 09',
  slug: 'final-practical-projects',
  title: 'Final Practical Projects',
  subtitle: 'Full-Stack Capstones: Local Assistants, Cloud Streamers, RAG Knowledge Hubs & Hybrid Gateways',
  description: 'Synthesize all 8 previous modules into complete, portfolio-grade production engineering capstones. Build a 100% private local assistant, a cloud streaming assistant with SSE and custom tools, an enterprise document RAG search engine with verified citations, and a hybrid multi-model router.',
  estimatedHours: '6 hrs',
  accentColor: 'indigo',
  iconName: 'Award',
  totalLessons: 4,
  lessons: [
    {
      id: 'ai-09-01',
      chapterId: 'ai-mod-09',
      number: '9.1',
      slug: 'project-local-ai-assistant',
      title: 'Build a Local AI Assistant',
      tagline: 'End-to-end full-stack local assistant with Ollama, Express proxy, and zero-data-egress privacy',
      durationMinutes: 30,
      learningObjectives: [
        'Assemble an end-to-end local AI application connecting a React chat interface to a local Ollama daemon',
        'Package custom Modelfile instructions and enforce offline air-gapped data privacy',
        'Handle local hardware streaming and implement graceful offline fallback messaging'
      ],
      theorySections: [
        {
          heading: '1. Project Architecture Blueprint',
          content: 'In this capstone project, you construct a complete offline-capable developer assistant. The application operates entirely inside the local network with zero external cloud dependencies.',
          bulletPoints: [
            'Frontend: React SPA with conversation history, markdown rendering, and local storage caching',
            'Backend Gateway: Express server running on port 3000 proxying requests to localhost:11434',
            'Model Runtime: Ollama executing Llama 3.1 8B in Q4_K_M quantization on local GPU/Metal'
          ]
        },
        {
          heading: '2. Step-by-Step Implementation Guide',
          content: 'Follow this 3-step checklist to deploy the local assistant:',
          bulletPoints: [
            'Step 1: Pull and verify model in terminal (ollama pull llama3.1:8b && ollama run llama3.1:8b "hello")',
            'Step 2: Mount the Express /api/local-chat controller using fetch to localhost:11434/api/chat',
            'Step 3: Connect the React useAiChat hook to stream the response into the UI'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Off-Grid Solar Cabin',
        concept: 'Self-Sustaining Local AI',
        story: 'An off-grid solar cabin generates its own electricity from rooftop panels and stores it in private battery banks. Even during a city-wide blackout or severed utility line, the cabin lights remain on and the refrigerator keeps humming in total independence.',
        moral: 'A local AI assistant continues operating flawlessly on airplanes, remote locations, and during global cloud vendor outages.',
        icon: 'Server'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Complete Local AI Controller in Node.js',
        description: 'Express gateway streaming local Ollama chunks directly to the web client.',
        html: `<div class="capstone-code-card">
  <h4>Local Assistant Express Gateway</h4>
  <pre><code>import express from 'express';
export const localAiRouter = express.Router();

localAiRouter.post('/api/local/chat', async (req, res) => {
  const { messages } = req.body;
  
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  try {
    const ollamaRes = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama3.1:8b', messages, stream: true })
    });

    const reader = ollamaRes.body?.getReader();
    const decoder = new TextDecoder();
    if (!reader) return res.end();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      for (const line of chunk.split('\\n').filter(Boolean)) {
        const parsed = JSON.parse(line);
        if (parsed.message?.content) {
          res.write(\`data: \${JSON.stringify({ token: parsed.message.content })}\\n\\n\`);
        }
      }
    }
    res.write('data: [DONE]\\n\\n');
  } catch (err: any) {
    res.write(\`data: \${JSON.stringify({ error: 'Local runtime unreachable' })}\\n\\n\`);
  } finally {
    res.end();
  }
});</code></pre>
</div>`,
        css: `.capstone-code-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 13px; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '13-17', title: 'Ollama Connection', explanation: 'Connects directly to localhost:11434 with zero external telemetry or cloud egress.' }
        ]
      },
      video: {
        title: 'Capstone Walkthrough: The Local AI Assistant',
        duration: '18:30',
        description: 'Complete architecture build from Modelfile tuning to React frontend chat streaming.',
        keyPoints: ['Ollama background daemon', 'Express proxy implementation', 'Testing air-gapped performance'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Project Overview', description: 'Local assistant capstone.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Welcome to Capstone 1. Today we assemble our self-hosted local AI assistant.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-09-01',
        title: 'Verify Local Runtime Connection Status',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Write an async health check function that pings http://localhost:11434/api/tags, returning true if status is 200.',
        instructions: [
          'fetch("http://localhost:11434/api/tags")',
          'Return res.ok (true if 200, false on network error)'
        ],
        starterHtml: `<div id="health-out">Status: checking...</div>`,
        starterCss: `#health-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `async function checkOllamaHealth() {
  return false;
}`,
        solutionHtml: `<div id="health-out">Status: Local Ollama runtime connected (200 OK)</div>`,
        solutionCss: `#health-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `async function checkOllamaHealth() {
  try {
    const res = await fetch('http://localhost:11434/api/tags');
    return res.ok;
  } catch {
    return false;
  }
}`,
        hints: ['Wrap in try/catch to handle connection refused errors.'],
        testCases: [
          { id: 'tc-42', description: 'Checks Ollama health endpoint', hint: 'Check /api/tags', checkType: 'text-contains', expectedValue: 'Ollama' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-09-01',
          question: 'What is the primary architectural guarantee provided by our Local AI Assistant capstone?',
          options: [
            'It guarantees unlimited free access to OpenAI cloud servers',
            'Zero data egress: prompt data and user conversation records never leave the local machine, providing complete sovereign privacy',
            'It automatically prints physical papers',
            'It requires no RAM or storage'
          ],
          correctIndex: 1,
          explanation: 'Running inference locally ensures that sensitive user data never leaves the host perimeter.'
        }
      ],
      summary: [
        'Built an end-to-end private local assistant pairing React with an Express proxy and local Ollama daemon.',
        'Enforced zero data egress, guaranteeing enterprise compliance and offline availability.',
        'Streamed tokens chunk-by-chunk using Server-Sent Events with instant user feedback.'
      ],
      relatedTopics: [
        { title: 'Build a Cloud-Powered Streaming Assistant', chapterNumber: '9', lessonId: 'ai-09-02', context: 'Build the cloud capstone.' }
      ]
    },
    {
      id: 'ai-09-02',
      chapterId: 'ai-mod-09',
      number: '9.2',
      slug: 'project-cloud-streaming-assistant',
      title: 'Build a Cloud-Powered Streaming Assistant',
      tagline: 'Production frontier assistant with Google Gemini, tool calling, and token budget telemetry',
      durationMinutes: 30,
      learningObjectives: [
        'Deploy a production cloud-powered assistant using the modern @google/genai TypeScript SDK',
        'Equip the assistant with real-world tool execution (weather lookup, order search, currency converter)',
        'Track Time to First Token (TTFT) and token consumption metrics in an administrative dashboard'
      ],
      theorySections: [
        {
          heading: '1. Project Architecture Blueprint',
          content: 'This capstone builds a high-performance frontier cloud assistant equipped with real-world function calling tools.',
          bulletPoints: [
            'SDK Integration: Uses @google/genai with gemini-1.5-flash for sub-500ms TTFT latency',
            'Tool Calling: Auto-dispatches lookupOrderTool and fetchInventoryTool before synthesizing final responses',
            'Streaming UX: Full Server-Sent Events pipeline with character cursor typing animations and stop generation controls'
          ]
        },
        {
          heading: '2. Tool Dispatching Integration',
          content: 'The assistant transparently pauses generation when tool calls are emitted, executes backend SQL queries, and streams the grounded answer seamlessly to the user.',
          bulletPoints: [
            'Tool Execution Gate: Validates arguments with Zod before running database queries',
            'Telemetry Stream: Emits token counts and latency metrics alongside the final [DONE] event'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The High-Speed Stock Trading Terminal',
        concept: 'Cloud Tool Assistant',
        story: 'A professional Bloomberg terminal does not just display static quotes. When a trader requests an analysis of a tech stock, the terminal pulls live SEC filings, queries real-time order books, calculates volatility metrics, and displays a streaming market synthesis in under 1 second.',
        moral: 'Frontier cloud models combined with fast function calling act as an intelligent real-time operating system for enterprise data.',
        icon: 'Sparkles'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Cloud Assistant Route with Integrated Tool Calling',
        description: 'Express controller orchestrating tool execution and streaming with Gemini.',
        html: `<div class="cloud-capstone-card">
  <h4>Cloud Assistant with Tools</h4>
  <pre><code>import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI();

app.post('/api/cloud/assistant', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  const chat = ai.chats.create({
    model: 'gemini-1.5-flash',
    config: {
      systemInstruction: 'You are an intelligent e-commerce operations assistant.',
      tools: [{ functionDeclarations: [inventoryLookupDeclaration] }]
    }
  });

  const resultStream = await chat.sendMessageStream({ message: req.body.prompt });
  for await (const chunk of resultStream) {
    if (chunk.text) {
      res.write(\`data: \${JSON.stringify({ text: chunk.text })}\\n\\n\`);
    }
  }
  res.write('data: [DONE]\\n\\n');
  res.end();
});</code></pre>
</div>`,
        css: `.cloud-capstone-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 13px; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '10-16', title: 'Chat Initialization', explanation: 'Creates a stateful chat session with system instructions and declarative tool schemas.' }
        ]
      },
      video: {
        title: 'Capstone Walkthrough: Cloud Streaming Assistant',
        duration: '18:15',
        description: 'Building the complete cloud assistant with function calling, streaming SSE, and token metrics.',
        keyPoints: ['Gemini chat streaming', 'Tool execution dispatch', 'Observability telemetry headers'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Cloud Capstone', description: 'Architecture review.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Welcome to Capstone 2. Today we build a production frontier assistant with live tools.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-09-02',
        title: 'Emit Final SSE Token Packet',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Format and write the terminating SSE packet containing "[DONE]" to finish a stream.',
        instructions: [
          'Return "data: [DONE]\\n\\n"'
        ],
        starterHtml: `<div id="done-out">Pending termination</div>`,
        starterCss: `#done-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function emitDonePacket() {
  return "";
}`,
        solutionHtml: `<div id="done-out">data: [DONE]\\n\\n (Stream terminated cleanly)</div>`,
        solutionCss: `#done-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function emitDonePacket() {
  return "data: [DONE]\\n\\n";
}`,
        hints: ['Standard SSE termination string is data: [DONE]\\n\\n.'],
        testCases: [
          { id: 'tc-43', description: 'Outputs [DONE] event packet', hint: 'Check string format', checkType: 'text-contains', expectedValue: '[DONE]' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-09-02',
          question: 'What is the primary benefit of using gemini-1.5-flash for the streaming assistant capstone?',
          options: [
            'It generates audio files instead of text',
            'Sub-500ms Time to First Token (TTFT) paired with ultra-low token pricing, making high-volume consumer chat responsive and cost-effective',
            'It only works on mobile phones',
            'It disables SSL'
          ],
          correctIndex: 1,
          explanation: 'gemini-1.5-flash provides frontier reasoning with industry-leading low latency and high cost efficiency.'
        }
      ],
      summary: [
        'Built a frontier cloud assistant with the modern @google/genai TypeScript SDK and Express.',
        'Equipped the model with executable tool calling and Zod parameter validation.',
        'Delivered responsive sub-500ms streaming UX with Server-Sent Events.'
      ],
      relatedTopics: [
        { title: 'Build a Document Question-Answering Application', chapterNumber: '9', lessonId: 'ai-09-03', context: 'Build the RAG capstone.' }
      ]
    },
    {
      id: 'ai-09-03',
      chapterId: 'ai-mod-09',
      number: '9.3',
      slug: 'project-document-qa-rag',
      title: 'Build a Document Question-Answering Application',
      tagline: 'Enterprise RAG application with PDF ingestion, hybrid search, and interactive source citations',
      durationMinutes: 30,
      learningObjectives: [
        'Build a production RAG application capable of ingesting PDF/Markdown documents and answering user questions',
        'Implement recursive text chunking and store embeddings in a vector database',
        'Enforce strict source citations ([1], [2]) with interactive citation badges in the React frontend'
      ],
      theorySections: [
        {
          heading: '1. RAG Capstone Architecture Blueprint',
          content: 'This capstone builds an enterprise-grade document question-answering system. Users upload documentation, and the application answers queries with verified factual grounding and clickable footnotes.',
          bulletPoints: [
            'Ingestion Worker: Parses text, chunks recursively (500 chars with 100 overlap), and generates 768-dim embeddings',
            'Retrieval Engine: Executes cosine vector search, returning top 3 matching chunks',
            'Grounded Synthesis: Prompts the model to answer strictly using retrieved chunks and format citations as [1], [2]'
          ]
        },
        {
          heading: '2. Frontend Citation Rendering',
          content: 'The React UI parses incoming bracketed citations in real-time, converting [1] into interactive badges that display the cited source passage on hover.',
          bulletPoints: [
            'Side Panel Inspector: Clicking a citation badge slides open the original source document page',
            'Faithfulness Audit: Shows users the exact matching text highlighted in green'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Corporate Legal Document Search Room',
        concept: 'Enterprise RAG',
        story: 'When an auditor asks, "What is our company policy on server backups?", a junior paralegal does not invent an answer. They search the company policy binder, highlight Section 4.2 on page 19, bookmark the page with a sticky note (citation [1]), and place the open binder directly in front of the auditor.',
        moral: 'Enterprise users demand verified citations they can click and audit with their own eyes.',
        icon: 'Database'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'End-to-End RAG Controller in TypeScript',
        description: 'Complete query-to-retrieval-to-citation-generation pipeline.',
        html: `<div class="rag-capstone-card">
  <h4>Document QA RAG Pipeline</h4>
  <pre><code>app.post('/api/rag/query', async (req, res) => {
  const { question } = req.body;

  // 1. Generate query embedding
  const queryVec = await getVectorEmbedding(question);

  // 2. Search vector database for top 3 matching chunks
  const matchedChunks = await vectorDb.search(queryVec, 3);

  // 3. Construct grounded prompt
  const contextStr = matchedChunks.map((c, i) => \`[Source \${i + 1}: \${c.title}]\\n\${c.text}\`).join('\\n\\n');
  const prompt = \`You are an authoritative document search assistant.
Answer the user question based SOLELY on the sources below.
Cite sources using bracketed numbers, e.g. [1].

Sources:
\${contextStr}

Question: \${question}\`;

  // 4. Generate grounded completion
  const aiResponse = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt
  });

  res.json({
    answer: aiResponse.text,
    sources: matchedChunks.map((c, i) => ({ id: i + 1, title: c.title, text: c.text }))
  });
});</code></pre>
</div>`,
        css: `.rag-capstone-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 13px; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '8-16', title: 'Context Grounding', explanation: 'Injects numbered source chunks directly into the prompt with strict citation constraints.' }
        ]
      },
      video: {
        title: 'Capstone Walkthrough: Enterprise Document RAG',
        duration: '19:00',
        description: 'Step-by-step construction of PDF text chunking, vector indexing, and interactive citation badges.',
        keyPoints: ['Vector indexing pipeline', 'Citation prompt engineering', 'Interactive React citation badges'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'RAG Capstone', description: 'End-to-end architecture.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Welcome to Capstone 3. Today we build an enterprise document search engine with verified citations.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-09-03',
        title: 'Format Multi-Chunk Context Block',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Write a helper function that formats an array of search results into a clean numbered source context string.',
        instructions: [
          'Iterate through chunks with index i',
          'Format as "[Source ${i+1}: ${c.title}]\\n${c.text}"',
          'Join with double newlines'
        ],
        starterHtml: `<div id="context-out">Context: pending</div>`,
        starterCss: `#context-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function formatContext(chunks) {
  return "";
}`,
        solutionHtml: `<div id="context-out">[Source 1: Security] Zero-trust network access enforced</div>`,
        solutionCss: `#context-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function formatContext(chunks) {
  return chunks.map((c, i) => \`[Source \${i + 1}: \${c.title}]\\n\${c.text}\`).join('\\n\\n');
}`,
        hints: ['Use template literals with [Source ${i+1}: ${c.title}].'],
        testCases: [
          { id: 'tc-44', description: 'Formats numbered source context', hint: 'Check source header', checkType: 'text-contains', expectedValue: 'Source' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-09-03',
          question: 'What is the primary benefit of returning matched source chunks alongside the model answer in our Document QA API?',
          options: [
            'To double the internet bandwidth usage',
            'It enables the frontend to render interactive citation badges, allowing users to inspect the exact original text and verify claims immediately',
            'To format the text in bold',
            'It prevents the browser from closing'
          ],
          correctIndex: 1,
          explanation: 'Returning sources allows the web UI to render interactive badges with snippet previews, establishing total user trust.'
        }
      ],
      summary: [
        'Built an enterprise document RAG system featuring recursive text chunking and vector search.',
        'Enforced strict source citations ([1], [2]) in the system prompt to eliminate ungrounded hallucinations.',
        'Engineered responsive React UI citation chips that link directly to authoritative document passages.'
      ],
      relatedTopics: [
        { title: 'Combine Local and Cloud Models in One Project', chapterNumber: '9', lessonId: 'ai-09-04', context: 'The grand hybrid capstone.' }
      ]
    },
    {
      id: 'ai-09-04',
      chapterId: 'ai-mod-09',
      number: '9.4',
      slug: 'project-hybrid-local-cloud-ai',
      title: 'Combine Local and Cloud Models in One Project',
      tagline: 'The ultimate hybrid architecture: privacy routing, local preprocessing, and cloud frontier escalation',
      durationMinutes: 30,
      learningObjectives: [
        'Architect the ultimate production hybrid system combining local Ollama SLMs with cloud frontier models',
        'Implement privacy-aware request routing: PII data stays local; complex multimodal analysis escalates to cloud',
        'Build an automated fallback circuit breaker that fails over to local models during cloud outages'
      ],
      theorySections: [
        {
          heading: '1. The Grand Hybrid Architecture',
          content: 'The most sophisticated AI systems in the world do not rely exclusively on the cloud or exclusively on local hardware. They use a unified hybrid gateway.',
          bulletPoints: [
            'Tier 1 (Local SLM - Ollama Llama 3 8B): Handles fast sentiment classification, PII redaction, query routing, and routine FAQ questions at $0.00 cost',
            'Tier 2 (Cloud Frontier - Gemini 1.5 Pro): Handles deep multi-step reasoning, complex code generation, and vast 1M+ token context analysis',
            'Failover Circuit: If the cloud API hits HTTP 429 or outages, requests automatically degrade gracefully to the local model'
          ]
        },
        {
          heading: '2. The Privacy Redaction Pipeline',
          content: 'Local models act as sovereign gatekeepers. A local SLM scans user prompts, detects credit card numbers or patient names, redacts them into tokens ([REDACTED_USER_1]), sends the safe prompt to the cloud LLM, and re-hydrates the names locally before rendering.',
          bulletPoints: [
            'Zero Cloud PII Leakage: Cloud providers never see real personal data',
            'Maximum Reasoning: The application still benefits from frontier cloud intelligence'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Local General Practitioner and the World-Class Specialist Hospital',
        concept: 'Hybrid AI Routing',
        story: 'For a common cold or blood pressure check (80% of visits), you visit your local neighborhood doctor 5 minutes away. It is fast, affordable, and private. If a rare, complex cardiovascular condition is detected (2% of cases), the local doctor prepares your records, removes identifying private data, and consults an international specialist hospital for specialized guidance.',
        moral: 'Use local models for everyday high-volume tasks; escalate to cloud frontier models for rare, complex challenges.',
        icon: 'Network'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Unified Hybrid AI Gateway Router in TypeScript',
        description: 'Intelligent routing between local Ollama and cloud Gemini with automated failover.',
        html: `<div class="hybrid-card">
  <h4>Unified Hybrid Gateway Router</h4>
  <pre><code>export async function hybridAiRouter(prompt: string, options: { hasPii?: boolean; complexReasoning?: boolean }) {
  // 1. Mandatory Local Routing for Sensitive Data
  if (options.hasPii) {
    console.log("Routing to Local Ollama (Zero-Egress Privacy Enforced)");
    return await callLocalOllama(prompt);
  }

  // 2. Route Routine Tasks to Local Model to Save Costs
  if (!options.complexReasoning && prompt.length < 200) {
    console.log("Routing to Local Ollama (Cost Optimization Tier)");
    return await callLocalOllama(prompt);
  }

  // 3. Route Complex Workloads to Cloud Frontier with Local Fallback
  try {
    console.log("Routing to Cloud Frontier (Deep Reasoning Tier)");
    return await callCloudFrontier(prompt);
  } catch (err: any) {
    console.warn("Cloud API unavailable or rate-limited. Activating local fallback circuit!");
    return await callLocalOllama(prompt);
  }
}</code></pre>
</div>`,
        css: `.hybrid-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 13px; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '3-6', title: 'Privacy Gate', explanation: 'Directs sensitive data to the local runtime with zero data transmission over WAN.' },
          { lineRange: '14-19', title: 'Automated Failover', explanation: 'Catches cloud provider errors and routes to the local model to ensure 100% application uptime.' }
        ]
      },
      video: {
        title: 'Capstone Walkthrough: The Hybrid AI Gateway',
        duration: '20:00',
        description: 'Complete architecture build of the hybrid gateway with privacy routing, local PII redaction, and cloud failover.',
        keyPoints: ['Hybrid routing rules', 'Local PII redaction pipelines', 'Automated cloud-to-local failovers'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Hybrid Architecture', description: 'Grand capstone review.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Welcome to our grand capstone. Today we combine local and cloud AI into a unified architecture.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-09-04',
        title: 'Implement Hybrid Route Selector',
        difficulty: 'Intermediate',
        estimatedTime: '15 mins',
        prompt: 'Write a router function that returns "local" if hasPii is true, "cloud" if complex is true, and defaults to "local".',
        instructions: [
          'If hasPii is true, return "local"',
          'Else if complex is true, return "cloud"',
          'Default to "local"'
        ],
        starterHtml: `<div id="route-out">Route: pending</div>`,
        starterCss: `#route-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function selectRoute(hasPii, complex) {
  return "cloud";
}`,
        solutionHtml: `<div id="route-out">Route: local (PII flag detected)</div>`,
        solutionCss: `#route-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function selectRoute(hasPii, complex) {
  if (hasPii) return "local";
  if (complex) return "cloud";
  return "local";
}`,
        hints: ['hasPii has highest precedence.'],
        testCases: [
          { id: 'tc-45', description: 'Routes to local when hasPii is true', hint: 'Check precedence', checkType: 'text-contains', expectedValue: 'local' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-09-04',
          question: 'What is the primary commercial and engineering advantage of a hybrid (local + cloud) AI architecture?',
          options: [
            'It guarantees that software never needs to be updated',
            'It combines the absolute privacy, zero-token cost, and offline resilience of local models with the immense reasoning scale and multimodal power of frontier cloud models',
            'It allows monitors to display 3D graphics without glasses',
            'It bypasses all operating system security'
          ],
          correctIndex: 1,
          explanation: 'Hybrid architecture delivers the best of both worlds: local models handle privacy and routine volume, while cloud models provide frontier intelligence.'
        }
      ],
      summary: [
        'Hybrid architectures route sensitive or routine queries to local models and complex tasks to cloud frontier models.',
        'Local PII redaction enables sending anonymized prompts to cloud providers while preserving user privacy.',
        'Automated local failover ensures your application remains 100% operational even during global cloud vendor outages.'
      ],
      relatedTopics: [
        { title: 'High-Performance Modern CSS Architecture', chapterNumber: '1', lessonId: 'css-01-01', context: 'Transition to Course B.' }
      ]
    }
  ]
};
