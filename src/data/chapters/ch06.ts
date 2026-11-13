import { Chapter } from '../../utils/types';

export const chapter06: Chapter = {
  id: 'ch-06',
  number: '06',
  badge: '06',
  slug: 'javascript-basics',
  title: 'JavaScript Fundamentals & Logic',
  subtitle: 'Variables, Conditionals, Loops, Functions, Arrays, Objects & DOM Preview',
  description: 'Learn the foundational programming language of the modern web. Master the V8 engine, let/const, types, operators, conditionals, loops, functions, closures, array methods, and bridge into interactive DOM manipulation.',
  estimatedHours: '5 hrs',
  accentColor: 'amber',
  iconName: 'Cpu',
  totalLessons: 6,
  lessons: [
    {
      id: 'ch-06-l-01',
      chapterId: 'ch-06',
      number: '6.1',
      slug: 'intro-to-javascript-runtime',
      title: 'Introduction to JavaScript & The Runtime',
      tagline: 'Understand the JS engine (V8), call stack, web APIs, console, and how script tags execute',
      durationMinutes: 25,
      learningObjectives: [
        'Understand what JavaScript is and how browser engines (like V8) parse, compile, and execute it',
        'Learn how the Call Stack and Event Loop operate',
        'Master the browser Console: console.log(), console.warn(), console.error(), and console.table()',
        'Understand script tag placement: async vs defer in HTML documents'
      ],
      theorySections: [
        {
          heading: '1. What is JavaScript?',
          content: 'JavaScript is a lightweight, single-threaded, just-in-time compiled programming language with first-class functions. While HTML provides structure and CSS provides style, JavaScript provides behavior, logic, and interactivity.',
          bulletPoints: [
            'Single-Threaded: JavaScript has one Call Stack and executes one piece of code at a time',
            'JIT Compilation: Modern engines like Google V8 translate JavaScript source code directly into optimized machine bytecode at runtime',
            'Non-Blocking I/O: The browser Web APIs and Event Loop handle asynchronous tasks (timers, network requests) without freezing the UI'
          ]
        },
        {
          heading: '2. Connecting JS to HTML: async vs defer',
          content: 'How you load JavaScript into your HTML document determines whether your page renders smoothly or stutters during initial load.',
          bulletPoints: [
            'Default <script src="...">: Pauses HTML parsing while downloading and executing script (blocks rendering)',
            'async: Downloads in parallel and executes the moment download completes (order not guaranteed)',
            'defer: Downloads in parallel and executes in exact document order ONLY after HTML parsing is complete (recommended standard)'
          ],
          callout: {
            type: 'key-rule',
            text: 'Performance Rule: Always use <script defer src="..."> for scripts placed in the <head> of your document to prevent parser blocking.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Master Chef and the Kitchen Assistants',
        concept: 'Single-Threaded JS with Web APIs',
        story: 'The master chef (the JS Call Stack) can only chop one carrot at a time. If the chef had to stand idle waiting 45 minutes for a cake to bake in the oven, the entire restaurant would starve. Instead, the chef slides the cake into the oven (Web API timer) and continues chopping vegetables. When the oven timer dings, an assistant places the cake on the pass (Callback Queue) for the chef to inspect when ready.',
        moral: 'JavaScript stays lightning fast by offloading slow tasks to browser background workers.',
        icon: 'Cpu'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Console Debugging and Runtime Inspection',
        description: 'Using diverse console methods to inspect data types and structures.',
        html: `<div class="runtime-card">
  <h3>Runtime Inspector Ready</h3>
  <p>Check the interactive console below to see output.</p>
</div>`,
        css: `.runtime-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}`,
        js: `// Professional console methods
console.log("Welcome to JavaScript Fundamentals!");

const student = { name: "Alex Morgan", track: "Full Stack", score: 98 };
console.table(student);

console.warn("Notice: Strict mode enabled.");`,
        breakdown: [
          {
            lineRange: 'Line 2',
            title: 'console.log()',
            explanation: 'Prints informational text or values directly to the developer console.',
            highlightTokens: ['console.log']
          },
          {
            lineRange: 'Line 5',
            title: 'console.table()',
            explanation: 'Renders objects or arrays in an elegant tabular format in DevTools.',
            highlightTokens: ['console.table']
          }
        ]
      },
      video: {
        title: 'JavaScript Runtime: Call Stack, V8 Engine, and defer',
        duration: '16:00',
        description: 'Visual breakdown of the V8 execution pipeline, parser blocking, and mastering the browser DevTools console.',
        keyPoints: [
          'V8 parsing and JIT compilation',
          'The Call Stack vs Event Loop',
          'async vs defer script loading'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'What is JS', description: 'Origins and capabilities' },
          { time: '05:30', seconds: 330, title: 'The V8 Engine', description: 'Call stack and heap' },
          { time: '11:00', seconds: 660, title: 'async vs defer', description: 'Loading scripts without lag' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'JavaScript is the engine that powers every interactive experience on the web.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-06-01',
        title: 'Log an Array with console.table',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create an array of three course strings called "courses" (e.g. ["HTML", "CSS", "JavaScript"]), and output it using console.table(courses).',
        instructions: [
          'Declare const courses = ["HTML", "CSS", "JavaScript"];',
          'Call console.table(courses);',
          'Call console.log("System initialized");'
        ],
        starterHtml: `<div class="runtime-box">
  <h4>DevTools Console Output</h4>
  <p>Open browser console or view output below.</p>
</div>`,
        starterCss: `.runtime-box {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}`,
        starterJs: `// Write your JavaScript code here
`,
        solutionHtml: `<div class="runtime-box">
  <h4>DevTools Console Output</h4>
  <p>Open browser console or view output below.</p>
</div>`,
        solutionCss: `.runtime-box {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}`,
        solutionJs: `const courses = ["HTML", "CSS", "JavaScript"];
console.table(courses);
console.log("System initialized");`,
        hints: [
          'Declare const courses = ["HTML", "CSS", "JavaScript"];',
          'Then use console.table(courses);'
        ],
        testCases: [
          {
            id: 'tc-06-1a',
            description: 'courses array is logged via console',
            hint: 'Log courses with console.table',
            checkType: 'selector-exists',
            target: '.runtime-box'
          }
        ],
        conceptQuestion: {
          question: 'Why is adding the defer attribute to <script> tags recommended for production websites?',
          options: [
            'It downloads scripts in the background without blocking HTML parsing and runs them after the DOM is ready',
            'It disables JavaScript errors',
            'It makes the server load faster',
            'It prevents users from inspecting source code'
          ],
          correctIndex: 0,
          explanation: 'defer allows the browser to parse HTML uninterrupted while downloading scripts in parallel, executing them cleanly before DOMContentLoaded.'
        }
      },
      quiz: [
        {
          id: 'q-06-1',
          question: 'Is JavaScript inherently single-threaded or multi-threaded?',
          options: ['Single-threaded', 'Multi-threaded', 'Dual-core only', 'Triple-threaded'],
          correctIndex: 0,
          explanation: 'JavaScript is single-threaded; it executes one statement at a time on its main Call Stack.'
        }
      ],
      summary: [
        'JavaScript provides logic, dynamic state, and user interactivity to web applications.',
        'Modern browser engines (V8, SpiderMonkey) execute JavaScript using Just-In-Time compilation.',
        'defer ensures scripts download in parallel without pausing HTML document parsing.',
        'console methods (log, table, warn, error) are critical debugging tools.'
      ],
      relatedTopics: [
        {
          title: 'Variables, Data Types & Operators',
          chapterNumber: '06',
          lessonId: 'ch-06-l-02',
          context: 'Master let, const, primitive types, and mathematical/comparison operators.'
        }
      ]
    },
    {
      id: 'ch-06-l-02',
      chapterId: 'ch-06',
      number: '6.2',
      slug: 'variables-data-types-operators',
      title: 'Variables, Data Types & Operators',
      tagline: 'Master let vs const, primitive vs reference types, template literals, and strict equality (===)',
      durationMinutes: 25,
      learningObjectives: [
        'Understand why var is legacy and why modern code strictly uses const and let',
        'Learn the 7 primitive types: string, number, boolean, null, undefined, symbol, bigint',
        'Master template literals (`Hello, ${name}!`) for clean string interpolation',
        'Understand the crucial difference between loose equality (==) and strict equality (===)'
      ],
      theorySections: [
        {
          heading: '1. Variable Declaration: const vs let',
          content: 'In modern ES6+ JavaScript, variable declaration is block-scoped and predictable.',
          bulletPoints: [
            'const: For values that will never be reassigned. Default to const for 90% of your variables',
            'let: For variables that need to change over time (counters, loop iterators, toggles)',
            'var (Legacy): Function-scoped and hoisted. Prone to severe bugs. Avoid in modern code'
          ]
        },
        {
          heading: '2. Strict Equality (===) vs Loose Equality (==)',
          content: 'JavaScript loose equality (==) performs type coercion behind the scenes, leading to bizarre bugs (e.g. "0" == false is true). Strict equality (===) checks both value AND data type without coercion.',
          bulletPoints: [
            'Always use strict equality: 5 === 5 (true), 5 === "5" (false)',
            'Avoid loose equality: 5 == "5" (true due to implicit type coercion)'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden Rule: NEVER use == or !=. ALWAYS use strict equality === and !==.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Permanent Engraving vs The Dry-Erase Whiteboard',
        concept: 'const vs let',
        story: 'A laser-engraved steel plaque with your birthdate is a const. It cannot be erased or rewritten without destroying the plaque. A classroom whiteboard where the teacher writes today’s lunch menu is a let. It can be wiped clean and rewritten with tomorrow’s menu whenever needed.',
        moral: 'Use const unless you explicitly know the value must be rewritten.',
        icon: 'Hash'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Modern Variables and Template Literals',
        description: 'Declaring const values and interpolating strings cleanly.',
        html: `<div class="profile-card">
  <div id="output">Loading student info...</div>
</div>`,
        css: `.profile-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-family: sans-serif;
}`,
        js: `const studentName = "Elena Gomez";
const completedChapters = 5;
const totalChapters = 10;

// Template literal interpolation
const progressPercent = (completedChapters / totalChapters) * 100;
const summary = \`Learner \${studentName} is \${progressPercent}% through the curriculum.\`;

const el = document.getElementById("output");
if (el) el.textContent = summary;`,
        breakdown: [
          {
            lineRange: 'Line 1-3',
            title: 'const Declarations',
            explanation: 'Stores immutable bindings for values that will not be reassigned.',
            highlightTokens: ['const']
          },
          {
            lineRange: 'Line 7',
            title: 'Template Literal (`...${...}`)',
            explanation: 'Backtick syntax enables clean embedded expressions without clunky string concatenation (+).',
            highlightTokens: ['`Learner ${studentName}']
          }
        ]
      },
      video: {
        title: 'Variables, Types, and the Truth about Strict Equality',
        duration: '14:20',
        description: 'Why var is dead, primitive vs reference memory in the Heap, and why == causes bugs.',
        keyPoints: [
          'const vs let block scoping',
          'Primitive vs Reference types',
          'The perils of type coercion'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'const and let', description: 'Block scoping' },
          { time: '04:30', seconds: 270, title: 'Data Types', description: 'Primitives vs objects' },
          { time: '09:15', seconds: 555, title: 'Strict Equality', description: '=== vs ==' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Strict equality is one of the easiest ways to safeguard your JavaScript logic.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-06-02',
        title: 'Calculate Discounted Price with Template Literals',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Declare const originalPrice = 120 and const discount = 0.2. Calculate const finalPrice = originalPrice * (1 - discount). Then create a template string message: "Sale Price: $96" and render it to #priceOutput.',
        instructions: [
          'Declare const originalPrice = 120;',
          'Declare const discount = 0.2;',
          'Calculate const finalPrice = originalPrice * (1 - discount);',
          'Output the message using template literal interpolation to #priceOutput'
        ],
        starterHtml: `<div class="pricing-card">
  <div id="priceOutput">Calculating discount...</div>
</div>`,
        starterCss: `.pricing-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
  color: #0f172a;
}`,
        starterJs: `// Calculate price and set output text
`,
        solutionHtml: `<div class="pricing-card">
  <div id="priceOutput">Calculating discount...</div>
</div>`,
        solutionCss: `.pricing-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
  color: #0f172a;
}`,
        solutionJs: `const originalPrice = 120;
const discount = 0.2;
const finalPrice = originalPrice * (1 - discount);
const out = document.getElementById("priceOutput");
if (out) out.textContent = \`Sale Price: $\${finalPrice}\`;`,
        hints: [
          'Use backticks (`) for template literals: `Sale Price: $${finalPrice}`.',
          'Assign it to out.textContent.'
        ],
        testCases: [
          {
            id: 'tc-06-2a',
            description: 'priceOutput element exists',
            hint: 'Ensure element #priceOutput is populated',
            checkType: 'selector-exists',
            target: '#priceOutput'
          }
        ],
        conceptQuestion: {
          question: 'What is the evaluated result of ("5" === 5) in JavaScript?',
          options: ['false (one is a string, one is a number)', 'true', 'null', 'undefined'],
          correctIndex: 0,
          explanation: 'Strict equality (===) checks both value and data type. Because "5" is a string and 5 is a number, the result is strictly false.'
        }
      },
      quiz: [
        {
          id: 'q-06-2',
          question: 'Which keyword should you use by default when creating a variable in modern JavaScript?',
          options: ['const', 'let', 'var', 'def'],
          correctIndex: 0,
          explanation: 'Default to const for all variables unless you explicitly know the value needs to be reassigned, in which case use let.'
        }
      ],
      summary: [
        'Always prefer const over let, and never use legacy var.',
        'JavaScript primitives include string, number, boolean, null, undefined, symbol, and bigint.',
        'Template literals (`${expression}`) provide clean string formatting.',
        'Always use strict equality (===) to prevent unexpected type coercion bugs.'
      ],
      relatedTopics: [
        {
          title: 'Control Flow: Conditionals & Loops',
          chapterNumber: '06',
          lessonId: 'ch-06-l-03',
          context: 'Control logic branches with if/else, switch, and iterate with for/while.'
        }
      ]
    },
    {
      id: 'ch-06-l-03',
      chapterId: 'ch-06',
      number: '6.3',
      slug: 'control-flow-conditionals-loops',
      title: 'Control Flow: Conditionals & Loops',
      tagline: 'Direct program logic with if/else, ternary operators, switch cases, and for/while loops',
      durationMinutes: 25,
      learningObjectives: [
        'Master if, else if, and else branching logic',
        'Use concise ternary operators (condition ? exprIfTrue : exprIfFalse) for clean UI states',
        'Learn logical operators: AND (&&), OR (||), and Nullish Coalescing (??)',
        'Master loop structures: for, while, and the modern for...of loop for arrays'
      ],
      theorySections: [
        {
          heading: '1. Decision Making: Conditionals and Ternaries',
          content: 'Computers become intelligent when they can make decisions based on changing conditions.',
          bulletPoints: [
            'if / else if / else: Standard multi-branch decision tree',
            'Ternary Operator: condition ? A : B (ideal for inline expressions and UI state toggles)',
            'Nullish Coalescing (??): user.name ?? "Guest" (only falls back if value is null or undefined, unlike || which also triggers on 0 or empty strings)'
          ]
        },
        {
          heading: '2. Iteration: The Modern for...of Loop',
          content: 'While traditional index-based for loops (let i = 0; i < len; i++) still exist, the modern for...of loop is cleaner and prevents off-by-one index bugs.',
          bulletPoints: [
            'for...of: Iterates over values of iterable collections (arrays, strings, sets)',
            'break: Immediately exits the loop',
            'continue: Skips the current iteration and jumps to the next'
          ],
          callout: {
            type: 'key-rule',
            text: 'Loop Safety: Always ensure loop exit conditions will be met to avoid locking the single-threaded JS runtime in an infinite loop.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Airport Security Line Fork',
        concept: 'Conditional Branching',
        story: 'At the airport checkpoint, passengers reach a fork in the stanchion line. If the passenger holds a PreCheck boarding pass (condition true), an agent directs them to the expedited lane. Otherwise (else), they enter the standard scanning line. Every passenger takes exactly one path based on their credential.',
        moral: 'Conditionals ensure each user receives the exact experience matching their credentials.',
        icon: 'GitBranch'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Ternary Operator and for...of Iteration',
        description: 'Evaluating user status and iterating through course milestones.',
        html: `<div class="status-box">
  <div id="statusBadge">Checking access...</div>
  <ul id="milestoneList"></ul>
</div>`,
        css: `.status-box {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.badge-active { color: #059669; font-weight: 700; }
.badge-locked { color: #dc2626; font-weight: 700; }`,
        js: `const isSubscribed = true;
const accessText = isSubscribed ? "Full Course Access" : "Preview Mode Only";

const badge = document.getElementById("statusBadge");
if (badge) {
  badge.textContent = accessText;
  badge.className = isSubscribed ? "badge-active" : "badge-locked";
}

const chapters = ["HTML5", "CSS3", "Flexbox", "CSS Grid", "JavaScript"];
const list = document.getElementById("milestoneList");

if (list) {
  for (const ch of chapters) {
    const li = document.createElement("li");
    li.textContent = ch;
    list.appendChild(li);
  }
}`,
        breakdown: [
          {
            lineRange: 'Line 2',
            title: 'Ternary Operator',
            explanation: 'Evaluates isSubscribed and assigns the appropriate text expression in a single line.',
            highlightTokens: ['isSubscribed ?']
          },
          {
            lineRange: 'Line 13-17',
            title: 'for...of Loop',
            explanation: 'Iterates cleanly through each chapter string without managing index counters.',
            highlightTokens: ['for (const ch of chapters)']
          }
        ]
      },
      video: {
        title: 'Conditionals, Truthy/Falsy, and Modern Loops',
        duration: '15:30',
        description: 'Mastering ternary expressions, truthy vs falsy values (0, "", NaN, null), and for...of iterations.',
        keyPoints: [
          'Truthy and falsy values in JS',
          'Ternary vs if/else readability',
          'for...of vs traditional index for loops'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Truthy & Falsy', description: 'How JS evaluates booleans' },
          { time: '05:00', seconds: 300, title: 'The Ternary Operator', description: 'Clean inline branches' },
          { time: '10:15', seconds: 615, title: 'for...of Iteration', description: 'Looping cleanly' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Writing clean conditionals keeps your application code easy to maintain.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-06-03',
        title: 'Classify Scores with if-else and Loop',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Given an array of scores [45, 82, 95], loop through them with a for...of loop and count how many are passing (score >= 70). Write the final count to #passingCount.',
        instructions: [
          'Declare const scores = [45, 82, 95];',
          'Declare let passing = 0;',
          'Loop through scores with for (const score of scores)',
          'Increment passing if score >= 70',
          'Write the result to #passingCount'
        ],
        starterHtml: `<div class="results-card">
  <p>Passing Students: <span id="passingCount">0</span></p>
</div>`,
        starterCss: `.results-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Count passing scores here
`,
        solutionHtml: `<div class="results-card">
  <p>Passing Students: <span id="passingCount">0</span></p>
</div>`,
        solutionCss: `.results-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `const scores = [45, 82, 95];
let passing = 0;
for (const score of scores) {
  if (score >= 70) {
    passing++;
  }
}
const out = document.getElementById("passingCount");
if (out) out.textContent = String(passing);`,
        hints: [
          'Use for (const s of scores) { if (s >= 70) passing++; }',
          'Update document.getElementById("passingCount").textContent.'
        ],
        testCases: [
          {
            id: 'tc-06-3a',
            description: 'passingCount element is updated',
            hint: 'Set textContent on #passingCount',
            checkType: 'selector-exists',
            target: '#passingCount'
          }
        ],
        conceptQuestion: {
          question: 'Which of the following values is NOT falsy in JavaScript?',
          options: ['"false" (a non-empty string)', '0', '"" (empty string)', 'null'],
          correctIndex: 0,
          explanation: 'Any non-empty string (even "false" or "0") is truthy in JavaScript. The 8 falsy values are false, 0, -0, 0n, "", null, undefined, and NaN.'
        }
      },
      quiz: [
        {
          id: 'q-06-3',
          question: 'Which operator evaluates the right-hand operand only if the left-hand operand is strictly null or undefined?',
          options: ['?? (Nullish Coalescing)', '|| (Logical OR)', '&& (Logical AND)', '?: (Ternary)'],
          correctIndex: 0,
          explanation: 'The nullish coalescing operator (??) returns the right-hand side only if the left-hand side is null or undefined.'
        }
      ],
      summary: [
        'if/else statements direct logic across branching execution paths.',
        'The ternary operator (a ? b : c) simplifies simple 2-way value assignments.',
        'for...of provides safe, clean value iteration over array collections.',
        'Nullish coalescing (??) provides safe defaults without falsely triggering on 0 or empty strings.'
      ],
      relatedTopics: [
        {
          title: 'Functions, Scope & Callbacks',
          chapterNumber: '06',
          lessonId: 'ch-06-l-04',
          context: 'Encapsulate reusable logic into functions, arrow functions, and callbacks.'
        }
      ]
    },
    {
      id: 'ch-06-l-04',
      chapterId: 'ch-06',
      number: '6.4',
      slug: 'functions-scope-callbacks',
      title: 'Functions, Scope & Callbacks',
      tagline: 'Master function declarations, arrow syntax (=>), lexical scope, closures, and callbacks',
      durationMinutes: 30,
      learningObjectives: [
        'Master the difference between function declarations and arrow functions (() => {})',
        'Understand lexical scope: global scope, function scope, and block scope',
        'Master Closures: functions that retain access to their outer lexical environment',
        'Use callback functions for event listeners and asynchronous actions'
      ],
      theorySections: [
        {
          heading: '1. Arrow Functions vs Traditional Functions',
          content: 'ES6 introduced arrow functions, providing a more concise syntax and lexical this binding.',
          bulletPoints: [
            'Declaration: function add(a, b) { return a + b; }',
            'Arrow Function: const add = (a, b) => a + b; (concise implicit return)',
            'First-Class Citizens: In JavaScript, functions can be assigned to variables, passed as arguments into other functions, and returned from functions'
          ]
        },
        {
          heading: '2. Closures & Lexical Scope',
          content: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment).',
          bulletPoints: [
            'Lexical Scoping: Inner functions have access to variables declared in their outer parent scope',
            'Data Privacy: Closures allow you to create private state variables that cannot be modified directly from the outside world'
          ],
          callout: {
            type: 'key-rule',
            text: 'Closure Definition: A closure gives a function access to its outer scope even after the outer function has finished executing!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Backpack of the Traveling Explorer',
        concept: 'Closures and Lexical Scope',
        story: 'When an explorer leaves their hometown to climb a mountain, they pack a travel backpack with water, a map, and a family photo from home. Even when they reach the mountain peak 1,000 miles away (a new scope), they can reach into their backpack and pull out the water bottle packed back home. A closure is a function carrying its hometown backpack wherever it goes.',
        moral: 'Closures keep outer variables alive as long as the inner function exists.',
        icon: 'Code'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Creating a Private State Counter with Closures',
        description: 'Notice how count cannot be tampered with directly from outside the createCounter function.',
        html: `<div class="counter-card">
  <p>Count: <strong id="countDisplay">0</strong></p>
  <button id="incBtn">Increment (+1)</button>
</div>`,
        css: `.counter-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}`,
        js: `function createCounter() {
  let count = 0; // Private state variable
  return () => {
    count++;
    return count;
  };
}

const increment = createCounter();
const display = document.getElementById("countDisplay");
const btn = document.getElementById("incBtn");

btn?.addEventListener("click", () => {
  const newVal = increment();
  if (display) display.textContent = String(newVal);
});`,
        breakdown: [
          {
            lineRange: 'Line 1-7',
            title: 'Closure Function',
            explanation: 'The returned arrow function retains access to the private count variable in its parent lexical scope.',
            highlightTokens: ['function createCounter()', 'return () =>']
          },
          {
            lineRange: 'Line 13-16',
            title: 'Callback Function',
            explanation: 'The arrow function passed into addEventListener is called as a callback when the click event fires.',
            highlightTokens: ['addEventListener("click"']
          }
        ]
      },
      video: {
        title: 'Deep Dive: Arrow Functions, Lexical Scope, and Closures',
        duration: '16:45',
        description: 'Mastering the return shorthand, visual Call Stack tracing of closures, and high-order callback functions.',
        keyPoints: [
          'Function declaration vs arrow function',
          'Lexical scope and block scope chains',
          'Live visual animation of closures'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Arrow Functions', description: 'Concise syntax' },
          { time: '05:00', seconds: 300, title: 'Scope Chains', description: 'Global vs local' },
          { time: '10:30', seconds: 630, title: 'Closures Demystified', description: 'Persistent state' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Closures are the cornerstone of React hooks, event listeners, and modular JS.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-06-04',
        title: 'Build a Pure Math Utility Function',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Write an arrow function called "calcArea" that takes (width, height) and returns width * height. Test it with width = 8 and height = 5, and display the result in #areaDisplay.',
        instructions: [
          'Declare const calcArea = (width, height) => width * height;',
          'Calculate const area = calcArea(8, 5);',
          'Display the result inside #areaDisplay'
        ],
        starterHtml: `<div class="math-card">
  <p>Computed Area: <span id="areaDisplay">--</span></p>
</div>`,
        starterCss: `.math-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Declare calcArea and output result
`,
        solutionHtml: `<div class="math-card">
  <p>Computed Area: <span id="areaDisplay">--</span></p>
</div>`,
        solutionCss: `.math-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `const calcArea = (width, height) => width * height;
const area = calcArea(8, 5);
const out = document.getElementById("areaDisplay");
if (out) out.textContent = String(area);`,
        hints: [
          'const calcArea = (w, h) => w * h;',
          'Set document.getElementById("areaDisplay").textContent = calcArea(8, 5);'
        ],
        testCases: [
          {
            id: 'tc-06-4a',
            description: 'areaDisplay has calculated value',
            hint: 'Set area result on #areaDisplay',
            checkType: 'selector-exists',
            target: '#areaDisplay'
          }
        ],
        conceptQuestion: {
          question: 'What is a closure in JavaScript?',
          options: [
            'A function that retains access to its parent lexical scope even after the parent function has finished executing',
            'Closing a browser window',
            'A tool to close HTML tags automatically',
            'A function without parameters'
          ],
          correctIndex: 0,
          explanation: 'A closure preserves the variables of its outer lexical environment, allowing private state to persist over time.'
        }
      },
      quiz: [
        {
          id: 'q-06-4',
          question: 'What is the concise implicit return syntax of an arrow function that doubles a number x?',
          options: ['const double = x => x * 2;', 'const double = (x) => { x * 2 };', 'function double(x) => x * 2;', 'const double = x : x * 2;'],
          correctIndex: 0,
          explanation: 'When omitting curly braces, arrow functions implicitly return the evaluated result of the single expression.'
        }
      ],
      summary: [
        'Arrow functions provide concise syntax and lexical this binding.',
        'JavaScript functions are first-class citizens that can be passed as callbacks.',
        'Lexical scope dictates that inner scopes have access to variables in outer parent scopes.',
        'Closures allow functions to bundle and protect private persistent state.'
      ],
      relatedTopics: [
        {
          title: 'Arrays & Object Data Structures',
          chapterNumber: '06',
          lessonId: 'ch-06-l-05',
          context: 'Master modern array transformation methods (map, filter, reduce) and object destructuring.'
        }
      ]
    },
    {
      id: 'ch-06-l-05',
      chapterId: 'ch-06',
      number: '6.5',
      slug: 'arrays-and-objects',
      title: 'Arrays, Objects & Modern Methods',
      tagline: 'Master map(), filter(), reduce(), object destructuring, spread operators, and JSON',
      durationMinutes: 30,
      learningObjectives: [
        'Master functional array transformation methods: map(), filter(), find(), and reduce()',
        'Learn object property access, method definitions, and Object.keys/values/entries',
        'Master modern destructuring syntax for both arrays and objects',
        'Use the rest and spread operators (...) to clone and merge data structures immutably'
      ],
      theorySections: [
        {
          heading: '1. Modern Array Transformations: map & filter',
          content: 'Modern JavaScript avoids mutating arrays in place. Instead, functional methods return fresh transformed copies.',
          bulletPoints: [
            'map(): Transforms every element in an array and returns a new array of the same length',
            'filter(): Evaluates a condition on every item and returns a new array containing only matching items',
            'reduce(): Condenses an array down to a single value (sum, tally, aggregated object)'
          ]
        },
        {
          heading: '2. Destructuring and the Spread Operator (...)',
          content: 'ES6 introduced syntax that makes extracting and merging data clean and readable.',
          bulletPoints: [
            'Object Destructuring: const { name, score } = student;',
            'Array Destructuring: const [first, second] = colors;',
            'Spread Operator (...): const clone = { ...original, updatedProperty: true };'
          ],
          callout: {
            type: 'key-rule',
            text: 'Immutability Rule: In modern UI frameworks like React, never mutate arrays directly with push/splice. Always use map, filter, or spread (...arr) to produce new arrays!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Quality Inspection Conveyor Line',
        concept: 'map() and filter()',
        story: 'Apples roll down a packing line. First, an automated sorter removes any bruised fruit (filter). Next, an automated stamp applies a clean USDA Organic wax seal to every remaining apple (map). The apples that emerge are sorted, cleaned, and stamped without damaging the orchard trees.',
        moral: 'Array methods produce clean, predictable data pipelines.',
        icon: 'Layers'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Chaining filter() and map() Pipelines',
        description: 'Filtering active courses and mapping them into HTML bullet items.',
        html: `<div class="course-list-card">
  <h4>Active Core Curriculum</h4>
  <ul id="activeCourseList"></ul>
</div>`,
        css: `.course-list-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
ul { margin: 0; padding-left: 1.25rem; }
li { padding: 0.25rem 0; color: #1e293b; font-weight: 500; }`,
        js: `const catalog = [
  { id: 1, title: "HTML Fundamentals", level: "Beginner", published: true },
  { id: 2, title: "CSS Mastery", level: "Beginner", published: true },
  { id: 3, title: "Quantum Computing", level: "Advanced", published: false },
  { id: 4, title: "JavaScript Basics", level: "Intermediate", published: true }
];

// Pipeline: filter published -> map title strings
const publishedTitles = catalog
  .filter(course => course.published)
  .map(course => \`\${course.title} (\${course.level})\`);

const list = document.getElementById("activeCourseList");
if (list) {
  list.innerHTML = publishedTitles.map(t => \`<li>\${t}</li>\`).join("");
}`,
        breakdown: [
          {
            lineRange: 'Line 9-11',
            title: 'Chained Method Pipeline',
            explanation: 'filter discards unpublished items; map formats the remaining items into strings.',
            highlightTokens: ['.filter', '.map']
          }
        ]
      },
      video: {
        title: 'Mastering map, filter, reduce, Destructuring, and Spread',
        duration: '18:10',
        description: 'Complete visual walkthrough of functional array pipelines, destructuring syntax, and immutable state updates.',
        keyPoints: [
          'map vs forEach vs filter',
          'reduce() aggregator patterns',
          'Destructuring objects and arrays',
          'Spread operator (...) cloning'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Array Pipelines', description: 'map and filter' },
          { time: '06:00', seconds: 360, title: 'reduce() Deep Dive', description: 'Accumulating sums' },
          { time: '12:15', seconds: 735, title: 'Destructuring & Spread', description: 'Clean data unpacking' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'map and filter are the bread and butter of modern JavaScript development.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-06-05',
        title: 'Filter Passing Grades and Compute Average',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Given const grades = [65, 80, 90, 45, 95], use .filter() to extract grades >= 70. Compute their total using .reduce() and calculate the average. Display the average score in #avgScore.',
        instructions: [
          'Filter grades to include only scores >= 70',
          'Sum the passing scores with reduce((acc, val) => acc + val, 0)',
          'Compute average = sum / passingScores.length',
          'Write average to #avgScore'
        ],
        starterHtml: `<div class="grades-card">
  <p>Passing Average: <span id="avgScore">--</span></p>
</div>`,
        starterCss: `.grades-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `const grades = [65, 80, 90, 45, 95];
// Write filter and reduce pipeline here
`,
        solutionHtml: `<div class="grades-card">
  <p>Passing Average: <span id="avgScore">--</span></p>
</div>`,
        solutionCss: `.grades-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `const grades = [65, 80, 90, 45, 95];
const passing = grades.filter(g => g >= 70);
const sum = passing.reduce((acc, val) => acc + val, 0);
const avg = sum / passing.length;

const out = document.getElementById("avgScore");
if (out) out.textContent = String(Math.round(avg));`,
        hints: [
          'const passing = grades.filter(g => g >= 70);',
          'const sum = passing.reduce((a, b) => a + b, 0);'
        ],
        testCases: [
          {
            id: 'tc-06-5a',
            description: 'avgScore element exists and is updated',
            hint: 'Set calculated average on #avgScore',
            checkType: 'selector-exists',
            target: '#avgScore'
          }
        ],
        conceptQuestion: {
          question: 'What does the .map() method return when executed on an array?',
          options: [
            'A new array of the exact same length containing the transformed values',
            'A single number',
            'A boolean',
            'It modifies the original array in place'
          ],
          correctIndex: 0,
          explanation: 'The map() method creates a brand new array populated with the results of calling a provided function on every element in the calling array.'
        }
      },
      quiz: [
        {
          id: 'q-06-5',
          question: 'How do you unpack properties "name" and "role" directly from a user object in ES6?',
          options: [
            'const { name, role } = user;',
            'const [name, role] = user;',
            'const (name, role) = user;',
            'const name, role from user;'
          ],
          correctIndex: 0,
          explanation: 'Curly braces on the left side of the assignment (const { name, role } = user;) unpack matching properties via object destructuring.'
        }
      ],
      summary: [
        'map() transforms arrays into new arrays of equal length.',
        'filter() selects elements matching a boolean predicate.',
        'reduce() condenses arrays into single accumulator values.',
        'Destructuring and spread (...) unpack and merge objects and arrays immutably.'
      ],
      relatedTopics: [
        {
          title: 'DOM Manipulation Preview',
          chapterNumber: '06',
          lessonId: 'ch-06-l-06',
          context: 'Connect your JavaScript logic directly to HTML elements and browser events.'
        }
      ]
    },
    {
      id: 'ch-06-l-06',
      chapterId: 'ch-06',
      number: '6.6',
      slug: 'dom-manipulation-preview',
      title: 'Interactive DOM Manipulation Preview',
      tagline: 'Bridge JavaScript logic to HTML elements: querySelector, classList, textContent, and event listeners',
      durationMinutes: 30,
      learningObjectives: [
        'Understand the Document Object Model (DOM) tree representation in browser memory',
        'Select elements using document.querySelector() and document.querySelectorAll()',
        'Modify DOM content, HTML attributes, and styles via classList (add, remove, toggle)',
        'Attach interactive event listeners with addEventListener("click", handler)'
      ],
      theorySections: [
        {
          heading: '1. What is the DOM?',
          content: 'When a browser loads an HTML document, it translates the raw text markup into a tree of live JavaScript objects called the Document Object Model (DOM).',
          bulletPoints: [
            'Live Object Tree: Every <div>, <p>, and <button> is a JavaScript object with properties and methods',
            'document.querySelector(".class"): Targets the first matching element using standard CSS selector syntax',
            'document.querySelectorAll(".item"): Targets all matching elements and returns an iterable NodeList'
          ]
        },
        {
          heading: '2. Listening to User Events',
          content: 'JavaScript listens for user interactions (clicks, keypresses, mouse movements, form submissions) using event listeners.',
          bulletPoints: [
            'element.addEventListener(eventType, callbackFunction)',
            'event.target: References the exact HTML element that was interacted with',
            'classList.toggle("active"): Adds the class if absent, removes it if present'
          ],
          callout: {
            type: 'key-rule',
            text: 'Performance Rule: Never use innerHTML with unsanitized user inputs to avoid Cross-Site Scripting (XSS) vulnerabilities. Use textContent for text updates!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Electric Wall Switch and the Lightbulb',
        concept: 'DOM Events and State Changes',
        story: 'When you flip a light switch on your wall, you do not rewire the copper cables in the ceiling. The physical wall switch is an Event Listener. When your finger presses it (a click event), the switch sends an electrical signal to the ceiling lamp to toggle its state from OFF to ON. The DOM is the control wiring connecting user actions to screen updates.',
        moral: 'Event listeners connect user actions to dynamic interface reactions.',
        icon: 'Zap'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Interactive Like Button with State Toggle',
        description: 'Toggling active states and updating numeric counter in the DOM.',
        html: `<div class="interactive-demo">
  <button id="likeBtn" class="like-btn">
    <span class="heart">&hearts;</span> Like (<span id="likeCount">0</span>)
  </button>
</div>`,
        css: `.interactive-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.like-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.like-btn.liked {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #dc2626;
}`,
        js: `let likes = 0;
const btn = document.getElementById("likeBtn");
const countEl = document.getElementById("likeCount");

btn?.addEventListener("click", () => {
  btn.classList.toggle("liked");
  const isLiked = btn.classList.contains("liked");
  likes = isLiked ? likes + 1 : Math.max(0, likes - 1);
  if (countEl) countEl.textContent = String(likes);
});`,
        breakdown: [
          {
            lineRange: 'Line 2-3',
            title: 'Selecting Elements',
            explanation: 'Captures references to the button and counter elements.',
            highlightTokens: ['document.getElementById']
          },
          {
            lineRange: 'Line 5-11',
            title: 'addEventListener & classList.toggle',
            explanation: 'Listens for click events, toggles the CSS styling class, and updates the numerical count.',
            highlightTokens: ['addEventListener', 'classList.toggle']
          }
        ]
      },
      video: {
        title: 'Interactive DOM Manipulation: querySelector, classList, and Events',
        duration: '17:30',
        description: 'Step-by-step guide to DOM traversal, event delegation, toggle patterns, and building interactive web components.',
        keyPoints: [
          'Selecting single vs multiple elements',
          'classList (add, remove, toggle, contains)',
          'Event listeners and preventDefault()',
          'Safe textContent vs unsafe innerHTML'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'The DOM Tree', description: 'HTML to objects' },
          { time: '05:30', seconds: 330, title: 'Query Selectors', description: 'Finding elements' },
          { time: '11:00', seconds: 660, title: 'Event Listeners', description: 'Responding to clicks' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'This is the moment where code comes alive. You can now build any interactive feature on the web.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-06-06',
        title: 'Build an Interactive Dark Mode Toggle',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Attach a click event listener to #themeToggleBtn that toggles the "dark-theme" class on #previewCard, and switches the button text between "Switch to Dark" and "Switch to Light".',
        instructions: [
          'Select #themeToggleBtn and #previewCard',
          'Add a click listener on the button',
          'Toggle class "dark-theme" on #previewCard',
          'Update button text accordingly'
        ],
        starterHtml: `<div id="previewCard" class="card-preview">
  <h3>Interactive Theme Toggle</h3>
  <p>Click the button below to switch themes dynamically.</p>
  <button id="themeToggleBtn">Switch to Dark</button>
</div>`,
        starterCss: `.card-preview {
  padding: 1.5rem;
  background: white;
  color: #0f172a;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  transition: all 0.3s ease;
}
.card-preview.dark-theme {
  background: #0f172a;
  color: #f8fafc;
  border-color: #334155;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #94a3b8;
  background: #f1f5f9;
  cursor: pointer;
  font-weight: 600;
}`,
        starterJs: `// Attach event listener here
`,
        solutionHtml: `<div id="previewCard" class="card-preview">
  <h3>Interactive Theme Toggle</h3>
  <p>Click the button below to switch themes dynamically.</p>
  <button id="themeToggleBtn">Switch to Dark</button>
</div>`,
        solutionCss: `.card-preview {
  padding: 1.5rem;
  background: white;
  color: #0f172a;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  transition: all 0.3s ease;
}
.card-preview.dark-theme {
  background: #0f172a;
  color: #f8fafc;
  border-color: #334155;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #94a3b8;
  background: #f1f5f9;
  cursor: pointer;
  font-weight: 600;
}`,
        solutionJs: `const btn = document.getElementById("themeToggleBtn");
const card = document.getElementById("previewCard");

btn?.addEventListener("click", () => {
  card?.classList.toggle("dark-theme");
  const isDark = card?.classList.contains("dark-theme");
  if (btn) btn.textContent = isDark ? "Switch to Light" : "Switch to Dark";
});`,
        hints: [
          'Use card.classList.toggle("dark-theme");',
          'Check card.classList.contains("dark-theme") to update button text.'
        ],
        testCases: [
          {
            id: 'tc-06-6a',
            description: 'themeToggleBtn listener attached',
            hint: 'Attach click listener to #themeToggleBtn',
            checkType: 'selector-exists',
            target: '#themeToggleBtn'
          }
        ],
        conceptQuestion: {
          question: 'Why should you prefer using classList.toggle("active") over modifying element.style.display directly?',
          options: [
            'classList separates CSS presentation rules from JavaScript logic and allows clean transition animations',
            'classList is faster to download',
            'element.style does not work in Chrome',
            'classList deletes unused HTML'
          ],
          correctIndex: 0,
          explanation: 'Toggling classes keeps visual styles consolidated inside CSS stylesheets, promoting clean architecture and enabling CSS transition animations.'
        }
      },
      quiz: [
        {
          id: 'q-06-6',
          question: 'Which method is the modern standard for listening to user clicks on an HTML button?',
          options: [
            'button.addEventListener("click", handler)',
            'button.onclick = "handler"',
            'button.listen("click")',
            'button.attachClick(handler)'
          ],
          correctIndex: 0,
          explanation: 'addEventListener("click", handler) is the W3C standard, allowing multiple independent listeners to attach to the same element.'
        }
      ],
      summary: [
        'The DOM is the browser live in-memory object representation of HTML.',
        'querySelector and querySelectorAll target elements using CSS selector syntax.',
        'classList (add, remove, toggle, contains) manipulates styling state cleanly.',
        'addEventListener connects user clicks and inputs to dynamic application logic.'
      ],
      relatedTopics: [
        {
          title: 'Advanced JavaScript & Async Programming',
          chapterNumber: '07',
          lessonId: 'ch-07-l-01',
          context: 'Master Promises, async/await, Fetch API, and asynchronous architecture.'
        }
      ]
    }
  ]
};
