import { Chapter } from '../../../utils/types';

export const aiModule06: Chapter = {
  id: 'ai-mod-06',
  number: '6',
  badge: 'AI 06',
  slug: 'function-calling-and-tools',
  title: 'Function Calling and AI Tools',
  subtitle: 'Tool Declarations, Schema Contracts, Execution Loops, Human-in-the-Loop & Safe Dispatch',
  description: 'Bridge the gap between probabilistic reasoning and deterministic software execution. Master function-calling declarations, tool definition schemas, multi-turn tool calling loops, argument validation, permission checks, and safe sandboxed execution.',
  estimatedHours: '4 hrs',
  accentColor: 'amber',
  iconName: 'Wrench',
  totalLessons: 5,
  lessons: [
    {
      id: 'ai-06-01',
      chapterId: 'ai-mod-06',
      number: '6.1',
      slug: 'function-calling-fundamentals',
      title: 'Function-Calling Fundamentals',
      tagline: 'How models emit structured function call intents instead of prose to invoke external systems',
      durationMinutes: 25,
      learningObjectives: [
        'Understand the mechanics of function calling: model emits tool_call name and JSON arguments instead of prose',
        'Trace the 4-step execution lifecycle: Prompt -> Tool Call -> Local Execution -> Model Synthesis',
        'Compare agentic tool use vs. traditional API integrations'
      ],
      theorySections: [
        {
          heading: '1. What is Function Calling?',
          content: 'LLMs cannot directly execute code, query SQL databases, or send emails. Instead, developers provide the model with a catalog of function signatures (declarations). When the model realizes it needs external data or actions, it stops generating text and outputs a structured tool_call intent specifying which function to run and with what JSON arguments.',
          bulletPoints: [
            '1. Developer passes tool definitions alongside user prompt',
            '2. Model reasons: "To answer this, I must call getWeatherData({ city: \'Tokyo\' })"',
            '3. Model emits a structured function call payload and pauses generation',
            '4. Application server executes getWeatherData(), returns raw JSON data back to model',
            '5. Model ingests the function result and generates a grounded conversational answer'
          ],
          callout: {
            type: 'key-rule',
            text: 'Core Concept: The model never executes the function. Your backend application executes the function, verifies permissions, and feeds the result back to the model.'
          }
        },
        {
          heading: '2. The Agentic Tool Loop',
          content: 'Modern models can execute multiple tool calls in sequence or in parallel (e.g. searching a database, querying a calculator, and formatting a report) before synthesizing a final answer.',
          bulletPoints: [
            'Parallel Tool Calling: Calling fetchPrice("AAPL") and fetchPrice("GOOG") simultaneously in turn 1',
            'Sequential Tool Calling: Output of tool 1 (userId) serves as the input argument for tool 2 (fetchUserOrders)'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Architect and the General Contractor',
        concept: 'Function Calling Lifecycle',
        story: 'The AI model is an architect sitting in a design studio. The architect cannot physically pour concrete or weld steel. Instead, the architect writes a detailed work order: "Pour 500 bags of concrete at coordinates X, Y" (function call). The general contractor (your backend application) reviews the order, checks permits, pours the concrete, and reports back: "Concrete poured successfully at 2:00 PM" (function response). The architect then draws the next phase of the building.',
        moral: 'The model plans the action; your application executes the action safely.',
        icon: 'Wrench'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'The 4-Step Function Calling Loop in TypeScript',
        description: 'Handling model function call responses and feeding data back.',
        html: `<div class="tool-loop-card">
  <h4>Function Calling Execution Loop</h4>
  <pre><code>// 1. Initial turn: Model emits a tool call
const response1 = await ai.models.generateContent({
  model: 'gemini-1.5-flash',
  contents: 'What is the balance of account 4821?',
  config: { tools: [{ functionDeclarations: [checkAccountBalanceTool] }] }
});

const call = response1.functionCalls?.[0];
if (call) {
  // 2. Application executes function locally
  const accountData = await db.getAccount(call.args.accountId);
  
  // 3. Send result back to model in turn 2
  const response2 = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [
      { role: 'user', parts: [{ text: 'What is the balance of account 4821?' }] },
      { role: 'model', parts: [{ functionCall: call }] },
      { role: 'user', parts: [{ functionResponse: { name: call.name, response: accountData } }] }
    ]
  });
  console.log(response2.text); // Grounded final answer
}</code></pre>
</div>`,
        css: `.tool-loop-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '8-11', title: 'Local Execution', explanation: 'Backend runs the real database query; the model never has direct database access.' }
        ]
      },
      video: {
        title: 'Function Calling Fundamentals & Tool Loops',
        duration: '16:10',
        description: 'End-to-end trace of model function calls, local execution, and secondary model response synthesis.',
        keyPoints: ['Function call payload structure', 'functionResponse return framing', 'Parallel vs sequential tool calling'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Function Calling', description: 'Core mechanics.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Welcome to Function Calling. Today we bridge AI reasoning with real code execution.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-06-01',
        title: 'Extract Function Call Name and Arguments',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Write a helper that inspects a model response and returns { name, args } if a function call was emitted.',
        instructions: [
          'Check if response.functionCalls is an array with at least 1 item',
          'Return { name: call.name, args: call.args }',
          'Return null if no function call exists'
        ],
        starterHtml: `<div id="call-out">Call: pending</div>`,
        starterCss: `#call-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function extractCall(response) {
  return null;
}`,
        solutionHtml: `<div id="call-out">Detected function: checkBalance({ accountId: 101 })</div>`,
        solutionCss: `#call-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function extractCall(response) {
  const call = response?.functionCalls?.[0];
  if (!call) return null;
  return { name: call.name, args: call.args };
}`,
        hints: ['Check response?.functionCalls?.[0].'],
        testCases: [
          { id: 'tc-27', description: 'Extracts name and args correctly', hint: 'Check properties', checkType: 'text-contains', expectedValue: 'checkBalance' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-06-01',
          question: 'Does an LLM directly execute the functions you provide in tool declarations?',
          options: [
            'Yes, the model runs JavaScript directly inside its neural weights',
            'No, the model only emits structured text declaring which function to run and with what parameters; your backend application must execute the function',
            'Yes, via WebAssembly compiled into the prompt',
            'Only if the model has an internet connection'
          ],
          correctIndex: 1,
          explanation: 'The model has no direct execution capability. It generates a structured function call intent; the hosting server executes the code.'
        }
      ],
      summary: [
        'Function calling allows language models to request external data and actions via structured JSON contracts.',
        'The execution lifecycle involves: prompt submission, tool call generation, server-side execution, and response synthesis.',
        'Your application maintains absolute security authority over which functions are permitted to execute.'
      ],
      relatedTopics: [
        { title: 'Defining Tool Schemas', chapterNumber: '6', lessonId: 'ai-06-02', context: 'Learn OpenAPI tool schema design.' }
      ]
    },
    {
      id: 'ai-06-02',
      chapterId: 'ai-mod-06',
      number: '6.2',
      slug: 'defining-tool-schemas',
      title: 'Defining Tool Schemas',
      tagline: 'OpenAPI parameter specifications, descriptions as prompts, and type constraints',
      durationMinutes: 25,
      learningObjectives: [
        'Author precise function declarations with names, descriptions, parameters, and required fields',
        'Write effective property descriptions that guide the model on when and how to call the tool',
        'Define complex parameter types: enums, nested objects, and arrays'
      ],
      theorySections: [
        {
          heading: '1. Tool Schemas as Prompts',
          content: 'A function declaration is not just a type definition; it is a specialized prompt instruction. The model reads the function name, the function description, and every property description to decide whether a tool is relevant to the user query.',
          bulletPoints: [
            'Function Name: Clear, imperative, descriptive (e.g. searchKnowledgeBase, not doAction)',
            'Function Description: Explains exact capability and usage boundaries (e.g. "Searches internal support documents. Call this whenever the user asks about account billing policies.")',
            'Property Descriptions: Explains format expectations (e.g. "ISO 8601 date string, e.g. 2026-11-12")',
            'Required Array: Mandates essential parameters so the model never passes undefined'
          ]
        },
        {
          heading: '2. Avoiding Tool Ambiguity',
          content: 'If you provide two tools with overlapping descriptions (e.g. searchUsers and findCustomers), the model will oscillate randomly between them. Keep tools orthogonal and mutually exclusive.',
          bulletPoints: [
            'Orthogonal Responsibility: Each tool must perform one clear, unambiguous task',
            'Enum Constraints: Use enums for categorical filters (e.g. status: ["ACTIVE", "INACTIVE", "ARCHIVED"]) to eliminate string hallucination'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Well-Organized Mechanic Toolbox',
        concept: 'Tool Schemas',
        story: 'If a mechanic has 50 unmarked silver sockets thrown into a bucket, finding the 10mm socket takes 5 minutes of trial and error. If the toolbox has labeled molded slots with clear stamped sizes (10mm, 12mm, 14mm), the mechanic reaches for the exact tool in half a second without hesitation.',
        moral: 'Clear names and explicit parameter descriptions allow the model to select the correct tool instantaneously.',
        icon: 'Tool'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Production Tool Declaration in @google/genai',
        description: 'Complete function declaration for an e-commerce order lookup tool.',
        html: `<div class="tool-schema-card">
  <h4>Function Declaration Schema</h4>
  <pre><code>import { Type, FunctionDeclaration } from '@google/genai';

export const lookupOrderTool: FunctionDeclaration = {
  name: 'lookupOrderDetails',
  description: 'Retrieves shipping and tracking status for a specific customer order number. Call this whenever a customer inquires about their shipment.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      orderId: {
        type: Type.STRING,
        description: 'The 8-digit order confirmation number (e.g. "ORD-94821")'
      },
      includeTrackingHistory: {
        type: Type.BOOLEAN,
        description: 'Whether to include full carrier transit checkpoints'
      }
    },
    required: ['orderId']
  }
};</code></pre>
</div>`,
        css: `.tool-schema-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '4-6', title: 'Intentional Description', explanation: 'Tells the model exactly when this tool should be invoked.' },
          { lineRange: '16', title: 'Required Array', explanation: 'Guarantees the model cannot trigger the call without providing the orderId.' }
        ]
      },
      video: {
        title: 'Designing High-Accuracy Tool Declarations',
        duration: '15:30',
        description: 'Techniques to prevent tool hallucination and optimize parameter schema definitions.',
        keyPoints: ['Parameter documentation prompts', 'Enums for argument constraints', 'Testing tool selection accuracy'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Schema Design', description: 'Authoring tools.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we write high-precision tool declarations that models select accurately.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-06-02',
        title: 'Author a Weather Lookup Tool Declaration',
        difficulty: 'Beginner',
        estimatedTime: '15 mins',
        prompt: 'Author a function declaration for "getCurrentWeather" taking a required "location" string and an optional "units" enum ("celsius" | "fahrenheit").',
        instructions: [
          'name: "getCurrentWeather"',
          'properties: location (STRING), units (STRING)',
          'required: ["location"]'
        ],
        starterHtml: `<div id="weather-tool-out">Tool: pending</div>`,
        starterCss: `#weather-tool-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function getWeatherTool() {
  return {};
}`,
        solutionHtml: `<div id="weather-tool-out">getCurrentWeather declaration verified</div>`,
        solutionCss: `#weather-tool-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function getWeatherTool() {
  return {
    name: 'getCurrentWeather',
    description: 'Get current weather conditions for a given location',
    parameters: {
      type: 'OBJECT',
      properties: {
        location: { type: 'STRING', description: 'City name or zip code' },
        units: { type: 'STRING', enum: ['celsius', 'fahrenheit'] }
      },
      required: ['location']
    }
  };
}`,
        hints: ['Specify location in the required array.'],
        testCases: [
          { id: 'tc-28', description: 'Declaration contains name and required location', hint: 'Check required', checkType: 'text-contains', expectedValue: 'getCurrentWeather' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-06-02',
          question: 'Why are descriptions in tool declarations and property parameters so critically important?',
          options: [
            'They are only used by developers in GitHub pull requests',
            'The LLM directly reads tool descriptions and parameter descriptions as prompt instructions to decide whether to invoke the tool and what format to pass',
            'They translate parameters into C++ header files',
            'They are ignored by the AI model during inference'
          ],
          correctIndex: 1,
          explanation: 'Tool and parameter descriptions are prompt inputs that direct the model semantic attention and parameter selection.'
        }
      ],
      summary: [
        'Tool declarations act as micro-prompts: clear names and vivid descriptions maximize tool invocation accuracy.',
        'Use enum constraints on string properties to eliminate argument hallucinations.',
        'Always populate the required fields array to guarantee essential parameters are provided.'
      ],
      relatedTopics: [
        { title: 'Connecting Models to Application Functions', chapterNumber: '6', lessonId: 'ai-06-03', context: 'Build execution dispatchers.' }
      ]
    },
    {
      id: 'ai-06-03',
      chapterId: 'ai-mod-06',
      number: '6.3',
      slug: 'connecting-models-to-functions',
      title: 'Connecting Models to Application Functions',
      tagline: 'Building the execution dispatcher, tool registry maps, and response serialization',
      durationMinutes: 25,
      learningObjectives: [
        'Build a type-safe Tool Registry pattern mapping function call names to concrete executable TypeScript handlers',
        'Execute tools asynchronously and serialize return objects into standardized functionResponse structures',
        'Handle multi-step agentic execution loops until the model decides to emit a final text answer'
      ],
      theorySections: [
        {
          heading: '1. The Tool Registry Pattern',
          content: 'Hardcoding long switch(call.name) statements across your application code is brittle and unmaintainable. The Tool Registry pattern maps string tool names to typed execution handlers.',
          bulletPoints: [
            'Tool Map: Record<string, (args: any) => Promise<any>>',
            'Dispatcher: Looks up registry[call.name]; throws helpful error if tool is unrecognized',
            'Serialization: Standardizes the function return payload into { name: call.name, response: { output } }'
          ]
        },
        {
          heading: '2. The Multi-Turn Agent Execution Loop',
          content: 'Complex tasks require looping: Model calls Tool A -> Server runs Tool A -> Model ingests Tool A and calls Tool B -> Server runs Tool B -> Model outputs final text.',
          bulletPoints: [
            'While loop condition: Continue as long as response.functionCalls exists and loop count < maxLimit (e.g. 5)',
            'Loop Guardrail: Always enforce a hard ceiling (e.g. max 5 iterations) to prevent infinite billing loops if a tool returns an unexpected error'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Smart Home Dispatcher',
        concept: 'Tool Dispatcher',
        story: 'When you say to a smart home hub, "Set living room to movie mode," the brain does not wire the lights. The hub looks up its device registry: 1) Dim living room lights to 20%, 2) Close motorized blinds, 3) Turn on soundbar. It calls each device API in sequence, confirms they all succeeded, and announces: "Movie mode activated."',
        moral: 'The central dispatcher executes each requested tool in order and informs the brain of the outcome.',
        icon: 'Cpu'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Complete Tool Dispatcher & Execution Loop',
        description: 'Type-safe dispatcher executing tools and feeding responses back to Gemini.',
        html: `<div class="dispatcher-code-card">
  <h4>Tool Registry Dispatcher</h4>
  <pre><code>// 1. Tool Registry Map
const TOOL_REGISTRY: Record<string, (args: any) => Promise<any>> = {
  lookupOrderDetails: async ({ orderId }) => await db.findOrder(orderId),
  cancelOrder: async ({ orderId }) => await db.cancelOrder(orderId)
};

// 2. Autonomous Execution Loop
export async function runAgentLoop(userPrompt: string, maxTurns = 5) {
  let contents: any[] = [{ role: 'user', parts: [{ text: userPrompt }] }];

  for (let turn = 0; turn < maxTurns; turn++) {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents,
      config: { tools: [{ functionDeclarations: [lookupOrderTool, cancelOrderTool] }] }
    });

    const calls = response.functionCalls;
    if (!calls || calls.length === 0) {
      return response.text; // Final answer reached!
    }

    // Append model function call to history
    contents.push({ role: 'model', parts: calls.map(c => ({ functionCall: c })) });

    // Execute each tool and append response
    const responses = await Promise.all(calls.map(async (call) => {
      const handler = TOOL_REGISTRY[call.name];
      if (!handler) throw new Error(\`Unknown tool: \${call.name}\`);
      const result = await handler(call.args);
      return { functionResponse: { name: call.name, response: result } };
    }));

    contents.push({ role: 'user', parts: responses });
  }
  throw new Error("Agent loop exceeded maximum turns");
}</code></pre>
</div>`,
        css: `.dispatcher-code-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 13px; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '2-5', title: 'Tool Registry', explanation: 'Centralized registry mapping declarative tool names to server-side async handlers.' },
          { lineRange: '23-28', title: 'Parallel Dispatch', explanation: 'Uses Promise.all to execute multiple tool calls concurrently if the model emits parallel calls.' }
        ]
      },
      video: {
        title: 'Building an Autonomous Agent Loop',
        duration: '16:45',
        description: 'Implementing the multi-turn agent while-loop with tool dispatchers and infinite loop guardrails.',
        keyPoints: ['Tool registry pattern', 'Promise.all parallel tool execution', 'Loop termination conditions'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Agent Loop', description: 'Multi-turn execution.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we build the core execution loop that drives agentic tool use.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-06-03',
        title: 'Build a Tool Dispatcher Lookup',
        difficulty: 'Intermediate',
        estimatedTime: '15 mins',
        prompt: 'Write a dispatch function that receives a tool call object { name, args } and executes the matching handler from a registry.',
        instructions: [
          'If tool name exists in registry, call handler(args)',
          'If tool name does not exist, throw Error("Unknown tool: " + name)'
        ],
        starterHtml: `<div id="dispatch-out">Dispatcher: pending</div>`,
        starterCss: `#dispatch-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `async function dispatchTool(registry, call) {
  return null;
}`,
        solutionHtml: `<div id="dispatch-out">Dispatcher executed handler successfully</div>`,
        solutionCss: `#dispatch-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `async function dispatchTool(registry, call) {
  const fn = registry[call.name];
  if (!fn) throw new Error("Unknown tool: " + call.name);
  return await fn(call.args);
}`,
        hints: ['Check if registry[call.name] is defined.'],
        testCases: [
          { id: 'tc-29', description: 'Executes matching handler', hint: 'Check registry lookup', checkType: 'text-contains', expectedValue: 'Dispatcher' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-06-03',
          question: 'Why must every agentic tool execution loop enforce a strict maximum turn ceiling (e.g. max 5 iterations)?',
          options: [
            'To force the server to restart every minute',
            'To prevent infinite billing loops and runaway latency if a tool returns an error or if the model oscillates repeatedly',
            'Because models are legally forbidden from calling more than 5 tools',
            'To save monitor electricity'
          ],
          correctIndex: 1,
          explanation: 'Without a hard loop ceiling, a malfunctioning tool or confusing error message can trap the agent in an infinite invocation loop.'
        }
      ],
      summary: [
        'Use the Tool Registry pattern to decouple string tool names from concrete backend business handlers.',
        'Leverage Promise.all to dispatch multiple parallel tool calls concurrently.',
        'Always enforce a strict loop iteration ceiling (e.g. 5 turns) to prevent infinite agent execution loops.'
      ],
      relatedTopics: [
        { title: 'Validating Tool Arguments', chapterNumber: '6', lessonId: 'ai-06-04', context: 'Validate incoming tool parameters.' }
      ]
    },
    {
      id: 'ai-06-04',
      chapterId: 'ai-mod-06',
      number: '6.4',
      slug: 'validating-tool-arguments',
      title: 'Validating Tool Arguments',
      tagline: 'Defensive validation of AI-generated arguments with Zod before backend execution',
      durationMinutes: 25,
      learningObjectives: [
        'Prevent injection attacks and crashes by validating model tool arguments with Zod before execution',
        'Handle malformed parameter types (e.g. string passed when integer was requested)',
        'Return structured error messages back to the model so it can correct invalid parameters'
      ],
      theorySections: [
        {
          heading: '1. Never Trust Model Arguments Blindly',
          content: 'Just because an LLM was provided with a schema does not mean its emitted arguments are safe. A model can hallucinate a non-existent database ID, pass a negative quantity for an order, or generate an invalid email address. Executing database operations directly with raw model arguments leads to corrupted state and crashes.',
          bulletPoints: [
            'Validation Step: Parse call.args through a strict Zod schema before invoking backend functions',
            'Graceful Interception: If Zod fails, do NOT crash the server; package the validation error as the tool response',
            'Model Self-Correction: The model reads: "Validation failed: Quantity must be greater than 0" and immediately re-emits a valid call'
          ]
        },
        {
          heading: '2. Handling Missing and Hallucinated Fields',
          content: 'Models occasionally invent extra parameters not defined in your schema. Use Zod .strip() to discard unexpected keys safely.',
          bulletPoints: [
            'z.object({...}).strip(): Automatically strips hallucinated extra arguments',
            'z.coerce: Coerces strings to numbers or booleans if the model passed "42" instead of 42'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Pharmacist Checking the Doctor Prescription',
        concept: 'Argument Validation',
        story: 'A doctor writes a prescription for a patient (the model tool call). The patient hands the paper to the pharmacist (Zod validator). If the doctor wrote an impossible dosage (10,000 milligrams instead of 10), the pharmacist does not dispense the poison. The pharmacist calls the doctor: "You wrote 10,000mg; did you mean 10mg?" The doctor corrects the slip, and safe medicine is dispensed.',
        moral: 'Never execute a tool call without a pharmacist (Zod) verifying the dosage and parameters.',
        icon: 'ShieldCheck'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Defensive Tool Argument Validator in TypeScript',
        description: 'Validating tool arguments and returning structured error responses to the model.',
        html: `<div class="tool-val-card">
  <h4>Defensive Tool Execution Wrapper</h4>
  <pre><code>import { z } from 'zod';

const TransferFundsArgsSchema = z.object({
  recipientAccountId: z.string().regex(/^ACC-\\d{5}$/, 'Must be ACC-XXXXX format'),
  amountUsd: z.number().positive('Amount must be greater than $0.00').max(5000, 'Max single transfer is $5,000')
});

export async function executeTransferTool(rawArgs: unknown) {
  // 1. Validate arguments with Zod
  const validation = TransferFundsArgsSchema.safeParse(rawArgs);
  if (!validation.success) {
    // Return validation error back to the model as tool output!
    return {
      status: 'VALIDATION_ERROR',
      message: 'Your parameters were rejected: ' + validation.error.issues.map(i => i.message).join('; ')
    };
  }

  // 2. Execute safe business logic
  const { recipientAccountId, amountUsd } = validation.data;
  return await bankService.transfer(recipientAccountId, amountUsd);
}</code></pre>
</div>`,
        css: `.tool-val-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '10-16', title: 'Safe Interception', explanation: 'Returns the validation error as normal tool response text, allowing the model to repair its arguments.' }
        ]
      },
      video: {
        title: 'Validating AI Tool Arguments with Zod',
        duration: '15:10',
        description: 'How to intercept malformed arguments and guide the model into self-correcting parameter errors.',
        keyPoints: ['Zod argument schemas', 'Handling hallucinated extra keys', 'Self-healing tool argument loops'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Argument Safety', description: 'Zod validation.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we safeguard our database from malformed AI tool arguments.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-06-04',
        title: 'Validate Order Quantity Parameters',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Author a Zod schema validating that "quantity" is an integer between 1 and 50.',
        instructions: [
          'quantity: z.number().int().min(1).max(50)',
          'Return Zod object schema'
        ],
        starterHtml: `<div id="qty-val-out">Quantity Validator: pending</div>`,
        starterCss: `#qty-val-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function getQtySchema(z) {
  return null;
}`,
        solutionHtml: `<div id="qty-val-out">Quantity Validator verified: integer between 1 and 50</div>`,
        solutionCss: `#qty-val-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function getQtySchema(z) {
  return z.object({
    quantity: z.number().int().min(1).max(50)
  });
}`,
        hints: ['Use z.number().int().min(1).max(50).'],
        testCases: [
          { id: 'tc-30', description: 'Validates quantity bounds', hint: 'Check min and max', checkType: 'text-contains', expectedValue: 'quantity' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-06-04',
          question: 'If an LLM passes an invalid argument (such as a negative number) to a function call, what should your application do?',
          options: [
            'Crash the server and throw an unhandled exception',
            'Intercept the error with Zod and return a clear validation error string as the function response, allowing the model to correct its parameter on the next turn',
            'Delete the database table',
            'Execute the negative transfer anyway'
          ],
          correctIndex: 1,
          explanation: 'Returning the validation failure as the tool response allows the model to self-heal and re-try with valid arguments.'
        }
      ],
      summary: [
        'Never trust model-generated arguments; always validate them with runtime Zod schemas.',
        'Intercept argument validation failures and return friendly error messages as tool responses for automated model correction.',
        'Use Zod coercion and stripping to handle minor formatting discrepancies cleanly.'
      ],
      relatedTopics: [
        { title: 'Permission Checks and Safe Execution', chapterNumber: '6', lessonId: 'ai-06-05', context: 'Enforce human-in-the-loop and RBAC.' }
      ]
    },
    {
      id: 'ai-06-05',
      chapterId: 'ai-mod-06',
      number: '6.5',
      slug: 'permission-checks-and-safe-execution',
      title: 'Permission Checks and Safe Execution',
      tagline: 'Role-Based Access Control (RBAC), Human-in-the-Loop confirmations, and sandbox isolation',
      durationMinutes: 25,
      learningObjectives: [
        'Enforce Role-Based Access Control (RBAC) on tool execution: ensure user A cannot call deleteDatabase()',
        'Implement Human-in-the-Loop (HITL) UI confirmations for destructive or financial actions',
        'Audit-log all tool invocations with user ID, timestamps, and argument snapshots'
      ],
      theorySections: [
        {
          heading: '1. Role-Based Access Control (RBAC) for AI Tools',
          content: 'An AI assistant must never have more authority than the user currently talking to it. If a standard student asks the assistant, "Delete all student accounts," the model might gladly attempt to emit a call to deleteAllAccounts(). The backend execution dispatcher must assert user role permissions before running any tool handler.',
          bulletPoints: [
            'User Authority Boundary: Tool execution permissions must match the calling user session',
            'Permission Check: if (user.role !== "ADMIN") return { status: "FORBIDDEN", error: "Insufficient permissions" }',
            'Audit Logging: Record every tool invocation in a security compliance ledger'
          ]
        },
        {
          heading: '2. Human-in-the-Loop (HITL) Confirmations',
          content: 'For irreversible actions (transferring funds, deleting files, sending external emails), never execute autonomously. Pause the execution loop and render an interactive confirmation modal in the user UI.',
          bulletPoints: [
            'Action Suspension: Server returns { requiresConfirmation: true, action: "TRANSFER", details: {...} }',
            'User Approval: User explicitly clicks "Approve Transfer ($500 to Account B)" in UI',
            'Resumption: Frontend sends confirmation token back to server to finalize execution'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Dual-Key Nuclear Silo Switch',
        concept: 'Human-in-the-Loop',
        story: 'No matter how smart the automated guidance computer is, it cannot launch a missile alone. Two human officers must physically insert two separate keys and turn them simultaneously. The computer plans the trajectory; the humans confirm the final irreversible action.',
        moral: 'Autonomous execution for read operations; mandatory human confirmation for destructive write operations.',
        icon: 'Lock'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Human-in-the-Loop Permission Guard in TypeScript',
        description: 'Requiring explicit user confirmation for high-risk tool execution.',
        html: `<div class="hitl-code-card">
  <h4>Human-in-the-Loop Action Gate</h4>
  <pre><code>export async function executeHighRiskTool(toolCall: any, userSession: any) {
  // 1. RBAC Authority Assertion
  if (!userSession.canPerformAction(toolCall.name)) {
    return { status: 'DENIED', message: 'You lack permissions to perform this action.' };
  }

  // 2. High-Risk Action Gate (Destructive or Financial)
  const isDestructive = ['deleteAccount', 'transferMoney', 'publishLive'].includes(toolCall.name);
  if (isDestructive && !toolCall.userConfirmationToken) {
    return {
      status: 'REQUIRES_USER_CONFIRMATION',
      promptToUser: \`Are you sure you want to \${toolCall.name} with: \${JSON.stringify(toolCall.args)}?\`,
      pendingActionId: generatePendingId(toolCall)
    };
  }

  // 3. Verified Execution
  return await realActionExecution(toolCall.args);
}</code></pre>
</div>`,
        css: `.hitl-code-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '8-14', title: 'Suspension Gate', explanation: 'Halts execution and returns a confirmation challenge to the UI before performing destructive actions.' }
        ]
      },
      video: {
        title: 'Implementing Human-in-the-Loop AI Workflows',
        duration: '16:00',
        description: 'Building confirmation modals, RBAC permission matrices, and tamper-proof audit trails.',
        keyPoints: ['RBAC tool filtering', 'Pending action tokens', 'Audit logging compliance'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Permission Security', description: 'HITL design.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we enforce strict human-in-the-loop safety for high-stakes tool execution.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-ai-06-05',
        title: 'Enforce Role-Based Tool Permissions',
        difficulty: 'Intermediate',
        estimatedTime: '15 mins',
        prompt: 'Write a permission check function that returns false if role is not "ADMIN" and tool name is "deleteUser".',
        instructions: [
          'If toolName === "deleteUser" and userRole !== "ADMIN", return false',
          'Otherwise return true'
        ],
        starterHtml: `<div id="perm-out">Permission: pending</div>`,
        starterCss: `#perm-out { padding: 1rem; background: #f8fafc; font-family: monospace; }`,
        starterJs: `function checkPermission(userRole, toolName) {
  return true;
}`,
        solutionHtml: `<div id="perm-out">Permission denied for non-admin deleteUser</div>`,
        solutionCss: `#perm-out { padding: 1rem; background: #ecfdf5; color: #065f46; font-family: monospace; font-weight: bold; }`,
        solutionJs: `function checkPermission(userRole, toolName) {
  if (toolName === 'deleteUser' && userRole !== 'ADMIN') {
    return false;
  }
  return true;
}`,
        hints: ['Check if userRole === "ADMIN".'],
        testCases: [
          { id: 'tc-31', description: 'Rejects deleteUser for non-admin', hint: 'Check role condition', checkType: 'text-contains', expectedValue: 'Permission' }
        ]
      },
      quiz: [
        {
          id: 'q-ai-06-05',
          question: 'Why should destructive actions (like deleting records or transferring funds) always implement a Human-in-the-Loop (HITL) confirmation step?',
          options: [
            'To give the server time to reboot',
            'To prevent catastrophic irreversible actions caused by prompt injection, user ambiguity, or model hallucination by requiring explicit human authorization',
            'Because databases cannot delete records without human touch',
            'To increase website ad revenue'
          ],
          correctIndex: 1,
          explanation: 'Requiring human authorization on high-stakes actions prevents autonomous AI systems from causing catastrophic real-world damage.'
        }
      ],
      summary: [
        'An AI assistant must never exceed the specific permissions of the authenticated user invoking it.',
        'Implement Human-in-the-Loop (HITL) confirmation challenges for all financial or destructive actions.',
        'Maintain comprehensive audit logs recording every tool invocation, timestamp, user ID, and parameter payload.'
      ],
      relatedTopics: [
        { title: 'Retrieval-Augmented Generation', chapterNumber: '7', lessonId: 'ai-07-01', context: 'Advance to Module 7 on RAG.' }
      ]
    }
  ]
};
