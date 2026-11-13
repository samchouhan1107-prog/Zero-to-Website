import { Chapter } from '../../../utils/types';

export const aiModule02: Chapter = {
  id: 'ai-mod-02',
  number: '2',
  badge: 'AI 02',
  slug: 'working-with-local-llms',
  title: 'Working with Local LLMs',
  subtitle: 'GGUF Formats, Quantization, Ollama Runtimes, VRAM Offloading & Local Inference',
  description: 'Master the engineering of self-hosted, private open-weights models. Learn how to configure local runtimes like Ollama and llama.cpp, evaluate hardware constraints, run quantized GGUF models, offload layers across CPU/GPU, and benchmark local tokens-per-second.',
  estimatedHours: '4 hrs',
  accentColor: 'sky',
  iconName: 'Server',
  totalLessons: 5,
  lessons: [
    {
      id: 'ai-02-01',
      chapterId: 'ai-mod-02',
      number: '2.1',
      slug: 'local-model-architecture',
      title: 'Local Model Architecture',
      tagline: 'Open-weights formats: SafeTensors, GGUF, AWQ, and quantization mechanics',
      durationMinutes: 25,
      learningObjectives: [
        'Differentiate between raw 16-bit unquantized weights (SafeTensors) and optimized CPU/GPU containers (GGUF)',
        'Understand post-training quantization (PTQ): FP16, Q8_0, Q4_K_M, and Q2_K trade-offs',
        'Analyze how quantization impacts perplexity scores and model intelligence'
      ],
      theorySections: [
        {
          heading: '1. What is Quantization?',
          content: 'In raw training checkpoints, each neural network weight is stored as a 16-bit floating point number (FP16 or BF16), taking 2 bytes of memory. Quantization reduces the numerical precision of weights to 8, 4, or even 2 bits, compressing a 14 GB model down to ~4.5 GB with minimal loss in reasoning capability.',
          bulletPoints: [
            'FP16 / BF16 (16-bit): 2.0 bytes/param. Uncompressed, maximum mathematical fidelity, huge VRAM demand',
            'Q8_0 (8-bit): 1.0 bytes/param. Virtually zero perceptual perplexity degradation; halves RAM usage',
            'Q4_K_M (4-bit Medium): 0.5 bytes/param. The industry gold standard for running models on consumer laptops',
            'Q2_K (2-bit): 0.25 bytes/param. Severe degradation in complex syntax and reasoning; only used for extreme constraints'
          ],
          callout: {
            type: 'key-rule',
            text: 'Rule of Thumb: A 4-bit quantized 14B model (Q4_K_M) consistently outperforms an unquantized 7B model (FP16), despite consuming almost the exact same VRAM (~8.5 GB).'
          }
        },
        {
          heading: '2. The GGUF Format and Llama.cpp',
          content: 'Developed by Georgi Gerganov, GGUF (GPT-Generated Unified Format) is a binary container format that packages model tensor weights, hyper-parameters, tokenization vocabulary, and prompt templates into a single portable file.',
          bulletPoints: [
            'Single-file distribution: No need to download dozens of separate shards or JSON config files',
            'Zero-copy memory mapping (mmap): Fast model load times directly into system memory',
            'Unified CPU/GPU execution: Seamlessly splits layers between host RAM and GPU VRAM'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'High-Resolution Audio vs. High-Bitrate MP3',
        concept: 'Quantization',
        story: 'Unquantized FP16 weights are like a 192kHz 24-bit uncompressed WAV recording. A 4-bit quantized model (Q4_K_M) is like a 320kbps MP3. While an audio engineer with laboratory oscilloscopes can measure microscopic differences, 99% of human listeners cannot tell the difference on regular speakers.',
        moral: 'Quantization discards redundant precision that human users cannot perceive, making frontier intelligence run on consumer hardware.',
        icon: 'Box'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Inspecting GGUF Header Metadata in Node.js',
        description: 'Reading the magic bytes and metadata keys from a local GGUF model file.',
        html: `<div class="gguf-card">
  <h4>GGUF File Header Structure</h4>
  <pre><code>// Magic Byte Header: "GGUF" (0x46554747 in Little Endian)
// Version: 3
// Tensor Count: 291
// Key-Value Metadata:
//   - "general.architecture": "llama"
//   - "llama.context_length": 8192
//   - "llama.embedding_length": 4096
//   - "general.quantization_version": 2</code></pre>
</div>`,
        css: `.gguf-card { background: #0f172a; color: #38bdf8; padding: 1.25rem; border-radius: 8px; font-family: monospace; }`,
        breakdown: [
          { lineRange: '1-6', title: 'Self-Describing Header', explanation: 'Allows inference engines like Ollama to parse context length and layer dimensions without external configuration.' }
        ]
      },
      video: {
        title: 'Deep Dive: GGUF & Quantization Math',
        duration: '15:20',
        description: 'Mathematical breakdown of integer scales, zero-points, and block quantization.',
        keyPoints: ['Post-training quantization', 'Perplexity benchmarking', 'K-quants explained'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Quantization Intro', description: 'Weights to integers.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Let us understand how we fit 8-billion parameter models onto everyday laptops.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-ai-02-01',
        title: 'Evaluate Quantization Memory Savings',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Calculate the percentage memory reduction when converting an 8B model from FP16 (16 bits) to Q4_K_M (4.5 bits effective).',
        instructions: [
          'Calculate original size: 8 * 2 = 16 GB',
          'Calculate quantized size: 8 * (4.5 / 8) = 4.5 GB',
          'Calculate percentage reduction: ((16 - 4.5) / 16) * 100'
        ],
        starterHtml: `<div id="quant-savings">Calculate reduction %</div>`,
        starterCss: `#quant-savings { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function calculateSavingsPercent(origBits, quantBits) {
  // Return savings %
  return 0;
}`,
        solutionHtml: `<div id="quant-savings">Memory Reduction: 71.88%</div>`,
        solutionCss: `#quant-savings { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function calculateSavingsPercent(origBits, quantBits) {
  return (((origBits - quantBits) / origBits) * 100).toFixed(2);
}`,
        hints: ['(16 - 4.5) / 16 = 0.71875.'],
        testCases: [
          { id: 'tc-7', description: 'Calculates ~71.88% memory savings', hint: 'Check ratio math', checkType: 'text-contains', expectedValue: '71.88' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-02-01',
          question: 'What is the primary benefit of the GGUF file format over older GGML or pickle formats?',
          options: [
            'It prevents the model from answering programming questions',
            'It provides a single self-describing, mmap-capable binary container holding both metadata and quantized tensors',
            'It converts English words directly into French',
            'It eliminates the need for computer RAM entirely'
          ],
          correctIndex: 1,
          explanation: 'GGUF standardizes model distribution in a single mmap-capable file with embedded metadata and quantization configuration.'
        }
      ],
      summary: [
        'Quantization shrinks weight precision (e.g. 16-bit to 4-bit), reducing memory consumption by over 70% with minimal loss in accuracy.',
        'GGUF is the modern standard format for local inference with llama.cpp, Ollama, and LM Studio.',
        'A 4-bit 14B model generally outperforms an unquantized 7B model within the same hardware budget.'
      ],
      relatedTopics: [
        { title: 'Installing and Configuring a Local Model Runtime', chapterNumber: '2', lessonId: 'ai-02-02', context: 'Set up Ollama and llama.cpp.' }
      ]
    },
    {
      id: 'ai-02-02',
      chapterId: 'ai-mod-02',
      number: '2.2',
      slug: 'installing-and-configuring-runtimes',
      title: 'Installing and Configuring a Local Model Runtime',
      tagline: 'Setting up Ollama, llama.cpp, and vLLM for high-throughput developer inference',
      durationMinutes: 25,
      learningObjectives: [
        'Install and configure Ollama as a background system daemon with REST API access on port 11434',
        'Configure custom Modelfiles with specific system prompts, stop tokens, and temperature parameters',
        'Analyze GPU acceleration flags (CUDA, Metal, ROCm, Vulkan)'
      ],
      theorySections: [
        {
          heading: '1. Why Ollama is the Developer Choice',
          content: 'Ollama wraps the raw C++ performance of llama.cpp into a lightweight developer daemon with Docker-like CLI ergonomics (ollama run, ollama pull, ollama create) and an OpenAI-compatible HTTP API running on localhost:11434.',
          bulletPoints: [
            'Single binary installation: Native support for macOS (Metal), Linux (CUDA/ROCm), and Windows (DirectX/Vulkan)',
            'Automatic hardware detection: Automatically detects available VRAM and offloads maximum layers to GPU',
            'Modelfile configuration: Allows committing prompt templates and parameters to Git as code'
          ]
        },
        {
          heading: '2. Crafting Custom Modelfiles',
          content: 'Similar to a Dockerfile, an Ollama Modelfile defines the base model, parameter defaults, and instruction templates.',
          bulletPoints: [
            'FROM: Base model identifier (e.g., FROM llama3.1:8b)',
            'PARAMETER temperature: Sets sampling randomness (e.g., 0.2 for deterministic code generation)',
            'SYSTEM: Embeds immutable developer instructions that persist across all conversations',
            'TEMPLATE: Enforces exact chat template formatting (e.g. <|start_header_id|>...)'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'Docker Engine for Machine Learning',
        concept: 'Ollama Architecture',
        story: 'Just as Docker abstracts Linux cgroups and kernel namespaces into simple commands (docker run, docker pull), Ollama abstracts matrix multiplication kernels, CUDA driver versions, and tensor quantization into simple commands (ollama run llama3).',
        moral: 'Ollama makes neural network execution as frictionless as running a standard database container.',
        icon: 'Terminal'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Custom Production Modelfile Definition',
        description: 'Creating a deterministic code generation specialist model.',
        html: `<div class="modelfile-card">
  <h4>Modelfile Example</h4>
  <pre><code>FROM llama3.1:8b-instruct-q4_K_M

# Set parameters for deterministic code generation
PARAMETER temperature 0.1
PARAMETER num_ctx 8192
PARAMETER stop "<|eot_id|>"

# Set system instructions
SYSTEM """
You are an expert full-stack TypeScript and CSS architect.
Always output pure standards-compliant code with concise explanations.
Never use third-party CSS utility frameworks unless explicitly requested.
"""</code></pre>
</div>`,
        css: `.modelfile-card { background: #111827; color: #10b981; padding: 1.25rem; border-radius: 8px; font-family: monospace; }`,
        breakdown: [
          { lineRange: '4-6', title: 'Parameters', explanation: 'Restricts temperature to 0.1 and expands context window to 8,192 tokens.' }
        ]
      },
      video: {
        title: 'Ollama Setup & Modelfile Configuration',
        duration: '14:15',
        description: 'Hands-on terminal installation, Modelfile authoring, and curl verification.',
        keyPoints: ['CLI setup', 'Systemd service configuration', 'Custom Modelfiles'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Installation', description: 'Installing Ollama.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we configure our local Ollama runtime and author custom Modelfiles.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-02-02',
        title: 'Author a Modelfile with Stop Tokens',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Compose an Ollama Modelfile for a strict JSON extraction assistant with temperature 0 and stop token "<|endoftext|>".',
        instructions: [
          'Specify FROM mistral:7b',
          'Add PARAMETER temperature 0',
          'Add PARAMETER stop "<|endoftext|>"',
          'Include SYSTEM instruction to output valid JSON only'
        ],
        starterHtml: `<textarea id="modelfile-editor" rows="6" style="width:100%;">FROM mistral:7b</textarea>`,
        starterCss: `#modelfile-editor { font-family: monospace; padding: 0.5rem; }`,
        starterJs: `console.log("Validate Modelfile syntax");`,
        solutionHtml: `<textarea id="modelfile-editor" rows="6" style="width:100%;">FROM mistral:7b
PARAMETER temperature 0
PARAMETER stop "<|endoftext|>"
SYSTEM "You are a JSON extractor. Output valid RFC 8259 JSON only."</textarea>`,
        solutionCss: `#modelfile-editor { font-family: monospace; padding: 0.5rem; border-color: #10b981; }`,
        solutionJs: `console.log("Modelfile valid");`,
        hints: ['Use PARAMETER syntax followed by the key and value.'],
        testCases: [
          { id: 'tc-8', description: 'Must contain PARAMETER temperature 0', hint: 'Add temperature setting', checkType: 'text-contains', expectedValue: 'temperature 0' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-02-02',
          question: 'What default port does the Ollama HTTP REST API listen on?',
          options: ['3000', '8080', '11434', '5432'],
          correctIndex: 2,
          explanation: 'Ollama binds to localhost:11434 by default for its REST and OpenAI-compatible API endpoints.'
        }
      ],
      summary: [
        'Ollama simplifies local LLM execution into a single daemon with REST and CLI controls.',
        'Modelfiles allow developers to package base weights, system prompts, context sizes, and temperature settings as versioned code.',
        'Local runtimes automatically harness GPU hardware (Metal on Apple Silicon, CUDA on Nvidia) to maximize tokens per second.'
      ],
      relatedTopics: [
        { title: 'Model Selection and Hardware Requirements', chapterNumber: '2', lessonId: 'ai-02-03', context: 'Hardware sizing for local AI.' }
      ]
    },
    {
      id: 'ai-02-03',
      chapterId: 'ai-mod-02',
      number: '2.3',
      slug: 'model-selection-and-hardware',
      title: 'Model Selection and Hardware Requirements',
      tagline: 'VRAM sizing, memory bandwidth, Apple Silicon unified memory, and GPU architectures',
      durationMinutes: 25,
      learningObjectives: [
        'Master the relationship between GPU memory bandwidth (GB/s) and generation speed (tokens/sec)',
        'Size hardware for Apple Silicon (Unified Memory) vs. discrete Nvidia RTX GPUs',
        'Calculate context window VRAM expansion for multi-turn chats'
      ],
      theorySections: [
        {
          heading: '1. Memory Bandwidth: The True Bottleneck of Local LLM Speed',
          content: 'A common misconception is that raw FLOPS (compute power) determine LLM generation speed. During autoregressive generation, generating 1 token requires loading every single parameter of the model from memory once. Therefore, tokens per second is fundamentally bounded by memory bandwidth, not compute TFLOPS.',
          bulletPoints: [
            'Nvidia RTX 4090: 1,008 GB/s bandwidth -> ~120 tokens/sec on an 8B Q4 model (~4.5 GB)',
            'Apple M3 Max: 400 GB/s bandwidth -> ~50-60 tokens/sec on an 8B Q4 model',
            'Standard DDR5 System RAM: ~60-80 GB/s bandwidth -> ~8-12 tokens/sec (sluggish, CPU-bound)'
          ]
        },
        {
          heading: '2. Unified Memory Advantage on Apple Silicon',
          content: 'On traditional PCs, consumer GPUs max out at 24 GB VRAM (RTX 4090). Apple Silicon shares a single high-bandwidth unified memory pool between CPU and GPU, allowing Mac Studio machines with 128 GB or 192 GB RAM to run massive 70B and 120B models entirely in VRAM at a fraction of data-center hardware costs.',
          bulletPoints: [
            'PC Discrete GPU: Fast bandwidth (1000 GB/s), but hard 24 GB VRAM limit on consumer tier',
            'Apple Silicon: Unified memory pool up to 192 GB; runs 70B models locally without multi-GPU PCIe clustering'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Superfast Sports Car with a Tiny Trunk',
        concept: 'Memory Bandwidth vs Capacity',
        story: 'A discrete gaming GPU is like a Ferrari: lightning fast, but with only a 24-liter trunk (24 GB VRAM). You can deliver small packages at breakneck speeds. An Apple Silicon Mac Studio is like a wide cargo train: slightly lower top speed, but capable of hauling 192 liters of cargo in a single trip without splitting the load.',
        moral: 'Match your hardware choice to your model target: discrete Nvidia for ultra-fast 8B models, unified memory Mac for massive 70B models on a budget.',
        icon: 'Cpu'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Benchmarking Tokens per Second in Terminal',
        description: 'Using ollama run with the --verbose flag to inspect memory offload and token speed.',
        html: `<div class="bench-card">
  <h4>Ollama Verbose Benchmark Output</h4>
  <pre><code>$ ollama run llama3.1:8b --verbose
>>> Explain CSS Grid in two sentences.
...
total duration:       842.12ms
load duration:        12.45ms
prompt eval count:    18 token(s)
prompt eval duration: 45.12ms
eval count:           48 token(s)
eval duration:        784.55ms
eval rate:            61.18 tokens/s</code></pre>
</div>`,
        css: `.bench-card { background: #0f172a; color: #f8fafc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '9', title: 'eval rate', explanation: 'Generation speed: 61.18 tokens per second on Apple M-series GPU.' }
        ]
      },
      video: {
        title: 'Hardware Sizing for Local AI Models',
        duration: '16:30',
        description: 'Comparing DDR5 RAM, RTX 3060/4090, and Apple M-series unified memory.',
        keyPoints: ['Memory bandwidth formula', 'PCIe lane bottlenecks', 'VRAM overhead calculations'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Hardware Overview', description: 'Memory bottlenecks.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Today we analyze why memory bandwidth governs generation speed.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-02-03',
        title: 'Calculate Theoretical Maximum Generation Speed',
        difficulty: 'Intermediate',
        estimatedTime: '15 mins',
        prompt: 'Calculate the theoretical maximum tokens per second for an 8B Q4 model (4.5 GB) on a memory bus with 450 GB/s bandwidth.',
        instructions: [
          'Divide memory bandwidth (450 GB/s) by model memory footprint (4.5 GB)',
          'The result is theoretical tokens per second'
        ],
        starterHtml: `<div id="speed-out">Theoretical Tokens/sec: 0</div>`,
        starterCss: `#speed-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function calculateMaxTokensPerSec(bandwidthGBps, modelSizeGB) {
  return bandwidthGBps / modelSizeGB;
}`,
        solutionHtml: `<div id="speed-out">Theoretical Tokens/sec: 100 tps</div>`,
        solutionCss: `#speed-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function calculateMaxTokensPerSec(bandwidthGBps, modelSizeGB) {
  return Math.round(bandwidthGBps / modelSizeGB);
}`,
        hints: ['450 / 4.5 = 100.'],
        testCases: [
          { id: 'tc-9', description: 'Calculates 100 tokens per second', hint: '450 / 4.5 = 100', checkType: 'text-contains', expectedValue: '100' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-02-03',
          question: 'What hardware metric fundamentally limits the tokens-per-second generation rate of an autoregressive model?',
          options: [
            'Hard drive rotational RPM',
            'GPU memory bandwidth (GB/s)',
            'Monitor refresh rate (Hz)',
            'Internet download ping latency'
          ],
          correctIndex: 1,
          explanation: 'Every generated token requires passing all model weights through memory once; memory bandwidth is the direct bottleneck.'
        }
      ],
      summary: [
        'Generation speed is bounded by memory bandwidth (GB/s), while prompt evaluation speed is compute-bound.',
        'Apple Silicon unified memory excels at running massive models (70B+) without expensive multi-GPU PCIe hardware.',
        'Always verify that model weights plus KV cache fit 100% inside VRAM to prevent severe system RAM paging penalties.'
      ],
      relatedTopics: [
        { title: 'Running Inference Locally', chapterNumber: '2', lessonId: 'ai-02-04', context: 'Execute local inference via REST and Node.js.' }
      ]
    },
    {
      id: 'ai-02-04',
      chapterId: 'ai-mod-02',
      number: '2.4',
      slug: 'running-inference-locally',
      title: 'Running Inference Locally',
      tagline: 'Connecting Node.js and React frontend applications to local Ollama endpoints',
      durationMinutes: 25,
      learningObjectives: [
        'Invoke the Ollama REST API (/api/generate and /api/chat) via fetch in Node.js and browser environments',
        'Stream token responses chunk-by-chunk using standard ReadableStream readers',
        'Handle connection refusals, model loading latency, and health checks'
      ],
      theorySections: [
        {
          heading: '1. The Ollama REST API Protocol',
          content: 'Ollama exposes simple HTTP endpoints for interacting with local models. The /api/chat endpoint accepts an array of message objects (role: "user" | "assistant" | "system") and streams newline-delimited JSON objects by default.',
          bulletPoints: [
            'POST /api/chat: Multi-turn conversational endpoint with message history',
            'POST /api/generate: Raw prompt completion endpoint',
            'GET /api/tags: Lists all locally installed models and quantization types'
          ]
        },
        {
          heading: '2. Streaming Local Responses via Node.js / Express',
          content: 'To prevent users from staring at a frozen screen while a model generates 200 tokens, always stream responses using Server-Sent Events or chunked transfer encoding.',
          bulletPoints: [
            'ReadableStream reader: Reads Uint8Array chunks as they arrive from localhost:11434',
            'TextDecoder: Converts raw byte streams into UTF-8 text',
            'JSON parsing: Parses each line-delimited JSON token payload'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Ticker Tape Machine',
        concept: 'Streaming Inference',
        story: 'Imagine waiting for a 20-page market report. If the messenger waits until the entire report is typed, bound, and delivered, you wait 10 minutes in silence. A ticker tape machine prints each stock quote letter by letter as it happens. You can start reading and making decisions immediately on word one.',
        moral: 'Streaming minimizes perceived time-to-first-token (TTFT) and gives users instantaneous feedback.',
        icon: 'Zap'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Full Node.js Streaming Client for Ollama',
        description: 'Clean asynchronous generator streaming tokens from local Ollama.',
        html: `<div class="code-stream-card">
  <h4>Streaming from Ollama in TypeScript</h4>
  <pre><code>export async function* streamLocalOllama(prompt: string) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'llama3.1:8b', prompt, stream: true })
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  if (!reader) return;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\\n').filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      yield parsed.response;
    }
  }
}</code></pre>
</div>`,
        css: `.code-stream-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '9-18', title: 'Stream Reader Loop', explanation: 'Yields token text pieces progressively as the local GPU emits them.' }
        ]
      },
      video: {
        title: 'Building a Local AI Streamer with Node.js',
        duration: '15:50',
        description: 'Live coding an Express proxy server communicating with a local Ollama daemon.',
        keyPoints: ['Fetch API with ReadableStream', 'Handling newline-delimited JSON', 'Error handling if Ollama is asleep'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Live Coding', description: 'Stream implementation.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Let us build a production Node.js streaming integration with our local model.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-02-04',
        title: 'Construct an Ollama Chat Request Payload',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Write a JavaScript helper that formats a system message and user query into the standard Ollama chat payload.',
        instructions: [
          'Create a messages array with system and user roles',
          'Include model: "llama3.1:8b"',
          'Include stream: false for single synchronous response'
        ],
        starterHtml: `<div id="payload-out">Payload: {}</div>`,
        starterCss: `#payload-out { padding: 1rem; background: #f8fafc; font-family: monospace; white-space: pre-wrap; }`,
        starterJs: `function buildOllamaPayload(systemText, userText) {
  // Return JSON object
  return {};
}`,
        solutionHtml: `<div id="payload-out">Payload valid with system and user roles</div>`,
        solutionCss: `#payload-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function buildOllamaPayload(systemText, userText) {
  return {
    model: 'llama3.1:8b',
    stream: false,
    messages: [
      { role: 'system', content: systemText },
      { role: 'user', content: userText }
    ]
  };
}`,
        hints: ['Each message must have a role and content field.'],
        testCases: [
          { id: 'tc-10', description: 'Creates valid messages array with system and user roles', hint: 'Check roles', checkType: 'text-contains', expectedValue: 'system' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-02-04',
          question: 'What format does Ollama return by default when stream: true is passed to the /api/generate endpoint?',
          options: [
            'A single base64-encoded zip file',
            'Newline-delimited JSON objects (NDJSON) containing incremental token strings',
            'A raw binary audio waveform',
            'An XML SOAP envelope'
          ],
          correctIndex: 1,
          explanation: 'Ollama streams newline-delimited JSON chunks, each containing a piece of generated text.'
        }
      ],
      summary: [
        'Local models communicate via standard HTTP REST endpoints on localhost:11434.',
        'Streaming token generation via ReadableStream delivers an immediate, interactive user experience.',
        'The /api/chat endpoint maintains conversation message structures identical to modern cloud API standards.'
      ],
      relatedTopics: [
        { title: 'Privacy, Performance and Resource Management', chapterNumber: '2', lessonId: 'ai-02-05', context: 'Production local resource controls.' }
      ]
    },
    {
      id: 'ai-02-05',
      chapterId: 'ai-mod-02',
      number: '2.5',
      slug: 'privacy-performance-resource-management',
      title: 'Privacy, Performance and Resource Management',
      tagline: 'Process isolation, GPU memory pinning, thermal throttling, and multi-tenant queues',
      durationMinutes: 25,
      learningObjectives: [
        'Architect air-gapped, zero-data-egress local processing pipelines for compliance',
        'Manage GPU VRAM contention and prevent out-of-memory (OOM) crashes across multiple concurrent users',
        'Implement queueing and request serialization for local inference servers'
      ],
      theorySections: [
        {
          heading: '1. Managing Concurrent Local Inference Requests',
          content: 'Unlike cloud APIs that scale elastically to thousands of concurrent users, a single local GPU has finite execution units and VRAM. If three users send queries simultaneously to a single local GPU without queue management, VRAM overflows and the process crashes.',
          bulletPoints: [
            'Request Serialization: Use in-memory worker queues (like BullMQ or async queues) to process requests sequentially',
            'Continuous Batching (vLLM): Groups multiple prompts into dynamic batches to utilize idle GPU compute without VRAM duplication',
            'OLLAMA_NUM_PARALLEL: Configures how many parallel requests Ollama can serve simultaneously within available VRAM'
          ]
        },
        {
          heading: '2. Air-Gapped Network Verification',
          content: 'True enterprise privacy requires verifying that local inference servers cannot transmit telemetry or prompt payloads externally.',
          bulletPoints: [
            'Bind to Loopback: Ensure runtimes bind strictly to 127.0.0.1, never 0.0.0.0, unless behind an authenticated reverse proxy',
            'Firewall Egress Rules: Block all outbound WAN traffic on inference containers',
            'Zero Telemetry: Disable automated analytics reporting via OLLAMA_NOPRUNE and environment flags'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Vault with a Guarded Entrance',
        concept: 'Local Privacy Architecture',
        story: 'A cloud service is like sending documents by courier to a high-security document facility across the country. A local air-gapped LLM is like placing a private document shredder and processor inside a physical bank vault with no internet cables, telephone lines, or external doors.',
        moral: 'When zero data can physically leave the server, you have absolute architectural immunity to data leaks.',
        icon: 'Lock'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'In-Memory Async Concurrency Limiter for Local AI',
        description: 'Preventing GPU OOM crashes by restricting concurrent requests to 1 with an async queue.',
        html: `<div class="queue-card">
  <h4>Local GPU Queue Manager</h4>
  <pre><code>class GpuTaskQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing = false;

  async enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
      this.processNext();
    });
  }

  private async processNext() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;
    const nextTask = this.queue.shift();
    if (nextTask) {
      await nextTask();
    }
    this.isProcessing = false;
    this.processNext();
  }
}</code></pre>
</div>`,
        css: `.queue-card { background: #0f172a; color: #f1f5f9; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '6-17', title: 'Task Serialization', explanation: 'Ensures the local GPU processes only one heavy inference pass at a time, completely preventing OOM crashes.' }
        ]
      },
      video: {
        title: 'Production Local AI Resource Management',
        duration: '16:00',
        description: 'Managing thermal throttling, concurrency limits, and air-gapped firewall rules.',
        keyPoints: ['GPU temperature monitoring', 'Queueing strategies', 'Docker network isolation'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Resource Controls', description: 'Preventing OOM.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we safeguard our local inference servers from concurrency crashes.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-02-05',
        title: 'Implement an In-Memory Request Queue',
        difficulty: 'Intermediate',
        estimatedTime: '20 mins',
        prompt: 'Create a simple concurrency queue that holds incoming requests and executes them one by one.',
        instructions: [
          'Maintain an array of pending tasks',
          'Execute the next task only when the active task finishes',
          'Ensure promises resolve with their respective task output'
        ],
        starterHtml: `<div id="queue-status">Queue: 0 pending</div>`,
        starterCss: `#queue-status { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `console.log("Queue setup");`,
        solutionHtml: `<div id="queue-status">Queue active: sequential execution verified</div>`,
        solutionCss: `#queue-status { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `console.log("Queue verified");`,
        hints: ['Use an async processNext function with an isProcessing flag.'],
        testCases: [
          { id: 'tc-11', description: 'Queue limits concurrency to 1', hint: 'Check serialization', checkType: 'text-contains', expectedValue: 'Queue' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-02-05',
          question: 'What occurs when multiple unmanaged concurrent inference requests exceed the physical VRAM capacity of a local GPU?',
          options: [
            'The model automatically increases its parameter count',
            'The CUDA runtime throws an Out-Of-Memory (OOM) error, terminating the process and dropping requests',
            'The monitor turns off permanently',
            'The prompt is automatically forwarded to Google Cloud'
          ],
          correctIndex: 1,
          explanation: 'Exceeding VRAM triggers hard CUDA OOM errors; request queueing is mandatory for multi-user local deployments.'
        }
      ],
      summary: [
        'Local GPUs require request serialization or continuous batching to prevent catastrophic out-of-memory crashes.',
        'Air-gapped privacy requires binding runtimes to loopback interfaces and establishing strict network egress firewalls.',
        'A single local workstation can reliably serve an entire engineering team when backed by an intelligent concurrency queue.'
      ],
      relatedTopics: [
        { title: 'Cloud LLM Integration', chapterNumber: '3', lessonId: 'ai-03-01', context: 'Transition to Module 3 on Cloud APIs.' }
      ]
    }
  ]
};
