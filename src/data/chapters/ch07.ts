import { Chapter } from '../../utils/types';

export const chapter07: Chapter = {
  id: 'ch-07',
  number: '07',
  badge: '07',
  slug: 'advanced-javascript',
  title: 'Advanced JavaScript & Async Systems',
  subtitle: 'Event Loop, Promises, Async/Await, Fetch API, Error Handling & ES Modules',
  description: 'Master professional asynchronous JavaScript architecture. Understand the Microtask Queue, Promises, async/await, HTTP network requests with fetch(), robust try/catch error handling, ES Module imports/exports, and build a real-time live data fetching dashboard.',
  estimatedHours: '5 hrs',
  accentColor: 'rose',
  iconName: 'Zap',
  totalLessons: 6,
  lessons: [
    {
      id: 'ch-07-l-01',
      chapterId: 'ch-07',
      number: '7.1',
      slug: 'async-event-loop',
      title: 'Asynchronous JavaScript & The Event Loop',
      tagline: 'Understand the Call Stack, Web APIs, Task Queue, Microtask Queue, and how the Event Loop coordinates them',
      durationMinutes: 25,
      learningObjectives: [
        'Deconstruct the browser concurrency model: Call Stack, Web APIs, Task Queue, and Microtask Queue',
        'Understand why synchronous operations block the UI thread and cause "jank"',
        'Learn the priority difference between Macrotasks (setTimeout, setInterval) and Microtasks (Promise callbacks, queueMicrotask)',
        'Predict the exact execution order of mixed synchronous and asynchronous code'
      ],
      theorySections: [
        {
          heading: '1. The Concurrency Model',
          content: 'JavaScript is single-threaded, meaning it has only one Call Stack. To handle slow network requests and timers without freezing the user interface, browsers provide Web APIs running on separate background threads.',
          bulletPoints: [
            'Call Stack: Tracks the function currently executing (LIFO: Last In, First Out)',
            'Web APIs: Background browser threads handling timers, HTTP requests, and DOM events',
            'Task Queue (Macrotasks): Holds callbacks from setTimeout, setInterval, and I/O',
            'Microtask Queue: Holds high-priority callbacks from Promises (.then, .catch, async/await)'
          ]
        },
        {
          heading: '2. The Event Loop Priority Rule',
          content: 'The Event Loop constantly monitors the Call Stack. When the Call Stack becomes completely empty, it processes ALL pending Microtasks before pulling a single Macrotask from the Task Queue.',
          bulletPoints: [
            'Order: Synchronous Code -> All Microtasks (Promises) -> Next Macrotask (setTimeout)',
            'This explains why Promise.resolve().then() runs BEFORE setTimeout(fn, 0)'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden Priority Rule: Microtasks ALWAYS cut in line ahead of Macrotasks when the Call Stack empties!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The VIP Fast-Track vs Standard Boarding Line',
        concept: 'Microtasks vs Macrotasks in the Event Loop',
        story: 'At an airline boarding gate, standard ticket holders wait in the main concourse line (the Task Queue). First Class VIP passengers hold urgent boarding passes (the Microtask Queue). When the flight attendant (the Event Loop) finishes scanning the current passenger at the podium (the Call Stack), the attendant will board EVERY VIP in the priority line before letting the next standard passenger through the door.',
        moral: 'Promises are VIP microtasks that always board ahead of setTimeouts.',
        icon: 'Zap'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Event Loop Execution Order Tracing',
        description: 'Can you guess the output order before reading the explanation?',
        html: `<div class="event-loop-demo">
  <button id="runTraceBtn">Run Execution Trace</button>
  <pre id="traceOutput">Click to trace execution order...</pre>
</div>`,
        css: `.event-loop-demo {
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
  margin-bottom: 1rem;
}
pre {
  background: #0f172a;
  color: #38bdf8;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
}`,
        js: `document.getElementById("runTraceBtn")?.addEventListener("click", () => {
  const logs = [];
  
  logs.push("1. Synchronous Start");

  setTimeout(() => {
    logs.push("4. Macrotask (setTimeout 0ms)");
    const pre = document.getElementById("traceOutput");
    if (pre) pre.textContent = logs.join("\\n");
  }, 0);

  Promise.resolve().then(() => {
    logs.push("3. Microtask (Promise)");
    const pre = document.getElementById("traceOutput");
    if (pre) pre.textContent = logs.join("\\n");
  });

  logs.push("2. Synchronous End");
  const pre = document.getElementById("traceOutput");
  if (pre) pre.textContent = logs.join("\\n");
});`,
        breakdown: [
          {
            lineRange: 'Line 4 & Line 18',
            title: '1 & 2: Synchronous Execution',
            explanation: 'Executes immediately on the Call Stack without delay.',
            highlightTokens: ['1. Synchronous Start', '2. Synchronous End']
          },
          {
            lineRange: 'Line 13-16',
            title: '3: Microtask (Promise)',
            explanation: 'The Promise callback is pushed to the Microtask Queue and runs the moment the Call Stack clears.',
            highlightTokens: ['Promise.resolve().then']
          },
          {
            lineRange: 'Line 6-10',
            title: '4: Macrotask (setTimeout)',
            explanation: 'Runs after all microtasks have completed.',
            highlightTokens: ['setTimeout']
          }
        ]
      },
      video: {
        title: 'The JavaScript Event Loop, Call Stack & Queues Visualized',
        duration: '18:15',
        description: 'Comprehensive animated visualization of Call Stack frames, Web API handoffs, and Microtask queue priority.',
        keyPoints: [
          'Call Stack step-by-step frame push/pop',
          'Web APIs thread delegation',
          'Macrotask vs Microtask scheduling'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Single-Threaded JS', description: 'The Call Stack' },
          { time: '05:30', seconds: 330, title: 'Web APIs & Queues', description: 'Background tasks' },
          { time: '11:45', seconds: 705, title: 'Microtask Priority', description: 'Why Promises win' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Understanding the Event Loop is the dividing line between junior and senior front-end engineers.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-07-01',
        title: 'Schedule a High-Priority Microtask',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Use Promise.resolve().then() to schedule a microtask that updates the textContent of #asyncStatus to "Microtask Resolved!".',
        instructions: [
          'Schedule a microtask with Promise.resolve().then(() => { ... })',
          'Inside the callback, select #asyncStatus and set its text to "Microtask Resolved!"'
        ],
        starterHtml: `<div class="async-card">
  <p>Status: <span id="asyncStatus">Pending...</span></p>
</div>`,
        starterCss: `.async-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Schedule microtask here
`,
        solutionHtml: `<div class="async-card">
  <p>Status: <span id="asyncStatus">Pending...</span></p>
</div>`,
        solutionCss: `.async-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `Promise.resolve().then(() => {
  const el = document.getElementById("asyncStatus");
  if (el) el.textContent = "Microtask Resolved!";
});`,
        hints: [
          'Use Promise.resolve().then(() => { document.getElementById("asyncStatus").textContent = "Microtask Resolved!"; });'
        ],
        testCases: [
          {
            id: 'tc-07-1a',
            description: 'asyncStatus updated via microtask',
            hint: 'Set text to "Microtask Resolved!" in microtask',
            checkType: 'selector-exists',
            target: '#asyncStatus'
          }
        ],
        conceptQuestion: {
          question: 'If you schedule both a setTimeout(fn, 0) and a Promise.resolve().then(fn), which callback runs first when the Call Stack clears?',
          options: [
            'The Promise callback (Microtask Queue has higher priority)',
            'The setTimeout callback',
            'They run simultaneously',
            'Whichever was written first in the file'
          ],
          correctIndex: 0,
          explanation: 'The Event Loop always drains the entire Microtask Queue (Promises) before processing the next item in the Macrotask Queue (setTimeout).'
        }
      },
      quiz: [
        {
          id: 'q-07-1',
          question: 'Which browser structure holds callbacks from setTimeout and setInterval?',
          options: ['Task Queue (Macrotasks)', 'Microtask Queue', 'Call Stack', 'Render Tree'],
          correctIndex: 0,
          explanation: 'setTimeout and setInterval callbacks are placed in the Task Queue (Macrotasks).'
        }
      ],
      summary: [
        'JavaScript executes synchronously on a single-threaded Call Stack.',
        'Asynchronous operations are handled by browser Web APIs in background threads.',
        'The Event Loop checks the Call Stack and pulls tasks when the stack is empty.',
        'Microtasks (Promises) always take precedence over Macrotasks (setTimeout).'
      ],
      relatedTopics: [
        {
          title: 'Promises & Async/Await',
          chapterNumber: '07',
          lessonId: 'ch-07-l-02',
          context: 'Master the Promise lifecycle (pending, fulfilled, rejected) and clean async/await syntax.'
        }
      ]
    },
    {
      id: 'ch-07-l-02',
      chapterId: 'ch-07',
      number: '7.2',
      slug: 'promises-and-async-await',
      title: 'Promises & Async/Await',
      tagline: 'Master the 3 states of Promises, chaining .then()/.catch(), and modern clean async/await syntax',
      durationMinutes: 30,
      learningObjectives: [
        'Understand the 3 states of a Promise: Pending, Fulfilled, and Rejected',
        'Create custom Promises using new Promise((resolve, reject) => { ... })',
        'Convert nested callback hell into clean, linear async/await syntax',
        'Use Promise.all() and Promise.allSettled() for parallel concurrency'
      ],
      theorySections: [
        {
          heading: '1. The 3 Promise States',
          content: 'A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.',
          bulletPoints: [
            'Pending: Initial state, neither fulfilled nor rejected',
            'Fulfilled (Resolved): The operation succeeded, producing a result value',
            'Rejected: The operation failed, producing an error reason',
            'Settled: Once resolved or rejected, a Promise is immutable and can never change states again'
          ]
        },
        {
          heading: '2. From Callback Hell to async/await',
          content: 'In early JavaScript, chaining asynchronous calls created heavily indented, unreadable "pyramids of doom". ES2017 introduced async/await, allowing asynchronous code to look and read like synchronous code.',
          bulletPoints: [
            'async keyword: Declares that a function returns a Promise automatically',
            'await keyword: Pauses function execution until the Promise settles, unpacking the resolved value',
            'try/catch blocks: Handle rejected promises using standard error syntax'
          ],
          callout: {
            type: 'key-rule',
            text: 'Syntax Rule: The await keyword can only be used inside functions marked with the async keyword (or top-level in ES modules).'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Restaurant Buzzer Pager',
        concept: 'The Promise Lifecycle',
        story: 'When you order food at a busy cafe, the cashier hands you a plastic vibrating buzzer. You do not have food yet; you have a Promise of future food (Pending). You sit down and read a book. When your meal is ready, the buzzer vibrates (Fulfilled) and you pick up your hot burger. If the kitchen ran out of burgers, the manager comes to your table with an apology and a refund (Rejected).',
        moral: 'A Promise allows your code to do other productive work while waiting for future results.',
        icon: 'Clock'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Simulating Network Latency with async/await',
        description: 'Using a sleep utility and async/await to simulate a 1-second server delay.',
        html: `<div class="delay-demo">
  <button id="fetchUserBtn">Simulate Fetch User</button>
  <div id="userResult">Ready.</div>
</div>`,
        css: `.delay-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
button {
  background: #059669;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
#userResult {
  font-weight: 600;
  color: #1e293b;
}`,
        js: `const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchUserProfile() {
  const out = document.getElementById("userResult");
  if (out) out.textContent = "Fetching user profile from server...";
  
  // Await 1.2 second simulated delay
  await sleep(1200);

  const mockUser = { id: 104, name: "Marcus Rivera", role: "DevOps Lead" };
  if (out) out.textContent = \`Loaded: \${mockUser.name} (\${mockUser.role})\`;
}

document.getElementById("fetchUserBtn")?.addEventListener("click", fetchUserProfile);`,
        breakdown: [
          {
            lineRange: 'Line 1',
            title: 'Custom Promise Helper (sleep)',
            explanation: 'Wraps setTimeout inside a Promise that resolves after ms milliseconds.',
            highlightTokens: ['new Promise', 'setTimeout']
          },
          {
            lineRange: 'Line 3-8',
            title: 'async function & await sleep()',
            explanation: 'Pauses execution gracefully until the sleep Promise resolves.',
            highlightTokens: ['async function', 'await sleep']
          }
        ]
      },
      video: {
        title: 'Promises & Async/Await: From Callbacks to Modern Clean Code',
        duration: '16:40',
        description: 'Building custom Promises, chaining .then()/.catch(), rewriting code with async/await, and handling parallel concurrency with Promise.all().',
        keyPoints: [
          'The 3 Promise states',
          'Refactoring .then() into async/await',
          'Promise.all() vs Promise.allSettled()'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'What is a Promise', description: 'Buzzer analogy' },
          { time: '05:30', seconds: 330, title: 'async/await Syntax', description: 'Clean synchronous flow' },
          { time: '11:15', seconds: 675, title: 'Parallel Concurrency', description: 'Promise.all' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'async/await is one of the most beloved features in the entire JavaScript language.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-07-02',
        title: 'Write an Async Data Loader with Simulated Delay',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create an async function loadScore() that awaits a 500ms delay using setTimeout inside a Promise, and writes "Final Score: 98%" to #scoreOutput.',
        instructions: [
          'Create const delay = (ms) => new Promise(res => setTimeout(res, ms));',
          'Create async function loadScore() { await delay(500); ... }',
          'Write "Final Score: 98%" to #scoreOutput and invoke loadScore()'
        ],
        starterHtml: `<div class="score-card">
  <div id="scoreOutput">Waiting for grades...</div>
</div>`,
        starterCss: `.score-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Implement loadScore async function here
`,
        solutionHtml: `<div class="score-card">
  <div id="scoreOutput">Waiting for grades...</div>
</div>`,
        solutionCss: `.score-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function loadScore() {
  await delay(500);
  const out = document.getElementById("scoreOutput");
  if (out) out.textContent = "Final Score: 98%";
}

loadScore();`,
        hints: [
          'Declare const delay = ms => new Promise(r => setTimeout(r, ms));',
          'In async function loadScore(), call await delay(500); then update textContent.'
        ],
        testCases: [
          {
            id: 'tc-07-2a',
            description: 'scoreOutput element exists and updates',
            hint: 'Set text on #scoreOutput inside loadScore',
            checkType: 'selector-exists',
            target: '#scoreOutput'
          }
        ],
        conceptQuestion: {
          question: 'What happens if you use the await keyword on a function that returns a rejected Promise without wrapping it in a try/catch block?',
          options: [
            'An UnhandledPromiseRejection error is thrown in the console',
            'The code silently recovers',
            'The browser closes automatically',
            'It evaluates to null'
          ],
          correctIndex: 0,
          explanation: 'An unhandled rejected Promise throws an UnhandledPromiseRejection exception unless caught by a try/catch block or .catch() handler.'
        }
      },
      quiz: [
        {
          id: 'q-07-2',
          question: 'Which method runs multiple promises concurrently and resolves only when ALL of them have fulfilled successfully?',
          options: ['Promise.all()', 'Promise.race()', 'Promise.any()', 'Promise.resolve()'],
          correctIndex: 0,
          explanation: 'Promise.all() accepts an array of promises and resolves when every promise fulfills, or rejects immediately if any single promise fails.'
        }
      ],
      summary: [
        'Promises transition from Pending to either Fulfilled or Rejected.',
        'async/await allows asynchronous code to be written with linear, synchronous readability.',
        'try/catch blocks gracefully capture errors from awaited promises.',
        'Promise.all() handles parallel concurrent operations efficiently.'
      ],
      relatedTopics: [
        {
          title: 'Fetch API & JSON',
          chapterNumber: '07',
          lessonId: 'ch-07-l-03',
          context: 'Make real HTTP network requests to external APIs with fetch() and parse JSON.'
        }
      ]
    },
    {
      id: 'ch-07-l-03',
      chapterId: 'ch-07',
      number: '7.3',
      slug: 'fetch-api-and-json',
      title: 'Fetch API & Working with JSON',
      tagline: 'Make real HTTP requests, handle response headers, status codes (200, 404, 500), and parse JSON',
      durationMinutes: 30,
      learningObjectives: [
        'Master window.fetch() for GET, POST, PUT, and DELETE HTTP requests',
        'Inspect response.ok and response.status before parsing bodies',
        'Parse JSON data using response.json() and serialize using JSON.stringify()',
        'Configure HTTP headers (e.g. Content-Type: application/json) and request options'
      ],
      theorySections: [
        {
          heading: '1. The Anatomy of fetch()',
          content: 'The Fetch API provides a modern JavaScript interface for making network requests across the web.',
          bulletPoints: [
            'Two-Step Resolution: fetch() first resolves with the Response metadata headers. You must then call response.json() to parse the body',
            'HTTP Status Checking: Crucially, fetch() does NOT reject on 404 or 500 HTTP status errors! It only rejects on total network failure. You must manually check if (!response.ok)'
          ]
        },
        {
          heading: '2. Working with JSON (JavaScript Object Notation)',
          content: 'JSON is the universal data exchange language of the internet.',
          bulletPoints: [
            'JSON.parse(string): Converts a raw JSON string into a live JavaScript object',
            'JSON.stringify(object): Serializes a JavaScript object into a JSON string to transmit over the wire'
          ],
          callout: {
            type: 'key-rule',
            text: 'Critical Gotcha: Always check if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`); because fetch does not throw on 404 Not Found!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'Ordering Room Service at a Hotel',
        concept: 'The Fetch API Two-Step Process',
        story: 'You call room service from your room phone (fetch). Step 1: The kitchen answers and hands a covered silver tray to the delivery person (the Response object with status 200 OK). Step 2: The delivery person brings the tray to your door, lifts the metal lid, and unpacks the hot food onto your table (calling response.json()). Only after lifting the lid can you actually eat the meal.',
        moral: 'Always verify the tray arrived (response.ok) before opening the food (response.json()).',
        icon: 'Cloud'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Fetching Live Data with Status Checks',
        description: 'Clean fetch implementation with response.ok verification and JSON parsing.',
        html: `<div class="api-demo">
  <button id="loadPostsBtn">Load Sample Post</button>
  <div id="postCard" class="post-preview">Click button to fetch API data...</div>
</div>`,
        css: `.api-demo {
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
  margin-bottom: 1rem;
}
.post-preview {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}`,
        js: `async function loadSamplePost() {
  const container = document.getElementById("postCard");
  if (container) container.textContent = "Fetching from API...";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if (!res.ok) {
      throw new Error(\`Network error: \${res.status}\`);
    }
    const data = await res.json();
    if (container) {
      container.innerHTML = \`<h4>\${data.title}</h4><p>\${data.body}</p>\`;
    }
  } catch (err) {
    if (container) container.textContent = "Failed to load data. Please retry.";
    console.error(err);
  }
}

document.getElementById("loadPostsBtn")?.addEventListener("click", loadSamplePost);`,
        breakdown: [
          {
            lineRange: 'Line 6-9',
            title: 'fetch() and !res.ok Check',
            explanation: 'Checks that the HTTP status code is in the successful 200-299 range.',
            highlightTokens: ['await fetch', '!res.ok']
          },
          {
            lineRange: 'Line 10',
            title: 'await res.json()',
            explanation: 'Parses the JSON response body stream into a live JavaScript object.',
            highlightTokens: ['await res.json()']
          }
        ]
      },
      video: {
        title: 'Mastering the Fetch API: GET, POST, Status Codes & JSON',
        duration: '17:50',
        description: 'Deep dive into HTTP headers, GET vs POST requests, JSON serialization, and the response.ok guard clause.',
        keyPoints: [
          'The two-step fetch resolution process',
          'Why fetch doesn’t throw on 404 / 500',
          'Sending POST requests with headers and body'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'What is fetch', description: 'Network requests' },
          { time: '05:30', seconds: 330, title: 'The response.ok Trap', description: 'Handling status codes' },
          { time: '11:00', seconds: 660, title: 'POST Requests', description: 'Sending JSON data' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Connecting your front-end to live back-end APIs is the superpower of modern web development.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-07-03',
        title: 'Fetch a User from an API and Render Name',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Write an async function getUser() that fetches from "https://jsonplaceholder.typicode.com/users/1", extracts the user name, and displays it in #userName.',
        instructions: [
          'Call const res = await fetch("https://jsonplaceholder.typicode.com/users/1");',
          'Parse data with const user = await res.json();',
          'Set document.getElementById("userName").textContent = user.name;'
        ],
        starterHtml: `<div class="user-fetch-card">
  <p>Fetched User: <strong id="userName">Loading...</strong></p>
</div>`,
        starterCss: `.user-fetch-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-family: sans-serif;
}`,
        starterJs: `// Implement fetch user here
`,
        solutionHtml: `<div class="user-fetch-card">
  <p>Fetched User: <strong id="userName">Loading...</strong></p>
</div>`,
        solutionCss: `.user-fetch-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-family: sans-serif;
}`,
        solutionJs: `async function getUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (res.ok) {
      const user = await res.json();
      const el = document.getElementById("userName");
      if (el) el.textContent = user.name;
    }
  } catch (e) {
    const el = document.getElementById("userName");
    if (el) el.textContent = "Leanne Graham (Fallback)";
  }
}

getUser();`,
        hints: [
          'const res = await fetch("https://jsonplaceholder.typicode.com/users/1");',
          'const data = await res.json(); and set #userName textContent.'
        ],
        testCases: [
          {
            id: 'tc-07-3a',
            description: 'userName element updated with fetched name',
            hint: 'Set textContent of #userName',
            checkType: 'selector-exists',
            target: '#userName'
          }
        ],
        conceptQuestion: {
          question: 'Does the window.fetch() Promise reject when a server responds with a 404 Not Found error?',
          options: [
            'No, fetch() fulfills successfully with response.ok = false; it only rejects on complete network failure',
            'Yes, it always rejects immediately on any non-200 code',
            'It reloads the page',
            'It returns null'
          ],
          correctIndex: 0,
          explanation: 'fetch only rejects on network failures (e.g. offline, DNS failure). HTTP error codes (404, 500) still resolve the Promise, with response.ok set to false.'
        }
      },
      quiz: [
        {
          id: 'q-07-3',
          question: 'Which method serializes a JavaScript object into a JSON-formatted string?',
          options: ['JSON.stringify(object)', 'JSON.parse(string)', 'object.toJSON()', 'JSON.serialize(object)'],
          correctIndex: 0,
          explanation: 'JSON.stringify() converts live JavaScript objects or values into a standard JSON string.'
        }
      ],
      summary: [
        'fetch() performs asynchronous HTTP network requests.',
        'Always check if (!response.ok) to catch 400 and 500 error status codes.',
        'response.json() asynchronously parses the response body stream.',
        'JSON.parse() and JSON.stringify() convert between strings and objects.'
      ],
      relatedTopics: [
        {
          title: 'Error Handling & Debugging',
          chapterNumber: '07',
          lessonId: 'ch-07-l-04',
          context: 'Safeguard your applications with defensive try/catch blocks and DevTools breakpoints.'
        }
      ]
    },
    {
      id: 'ch-07-l-04',
      chapterId: 'ch-07',
      number: '7.4',
      slug: 'error-handling-and-debugging',
      title: 'Error Handling & Professional Debugging',
      tagline: 'Master try/catch/finally, custom Error classes, DevTools breakpoints, and defensive programming',
      durationMinutes: 25,
      learningObjectives: [
        'Master try, catch, and finally block architecture',
        'Create and throw custom Error objects with meaningful messages',
        'Master Chrome DevTools Sources tab: Breakpoints, Step Over, Step Into, and Watch Expressions',
        'Implement fallback UI states so errors never leave users facing a broken blank screen'
      ],
      theorySections: [
        {
          heading: '1. The try/catch/finally Architecture',
          content: 'Uncaught errors crash JavaScript applications. The try/catch statement allows code to attempt risky operations (like network calls or parsing) and gracefully recover if an exception occurs.',
          bulletPoints: [
            'try: Encloses the block of code that might throw an error',
            'catch (error): Catches the thrown error, allowing logging and recovery',
            'finally: ALWAYS executes regardless of whether an error was thrown (ideal for stopping loading spinners)',
            'throw new Error("Reason"): Manually triggers an exception'
          ]
        },
        {
          heading: '2. Professional DevTools Debugging',
          content: 'Relying exclusively on console.log is slow and messy. Modern developers use interactive breakpoints in the browser Sources tab.',
          bulletPoints: [
            'debugger keyword: Triggers a pause in code execution directly in DevTools',
            'Step Over (F10): Executes the next line without stepping into function internals',
            'Scope & Watch: Inspects real-time variable values at the exact moment of pause'
          ],
          callout: {
            type: 'tip',
            text: 'Always use finally { stopLoadingSpinner(); } so UI loading spinners never spin indefinitely when a server fails.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Stunt Net in a Circus Trapeze Act',
        concept: 'try/catch Error Safety',
        story: 'Trapeze artists perform daring high-wire flips (the try block). If an acrobat misses a handhold and falls, they do not crash onto the concrete floor. A heavy safety net strung beneath the tent catches them safely (the catch block). Afterward, the ringmaster tips their hat to the audience regardless of whether the stunt was nailed or caught in the net (the finally block).',
        moral: 'A safety net ensures a single slip never destroys the show.',
        icon: 'Shield'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Defensive Network Loader with finally Cleanup',
        description: 'Demonstrating how the finally block guarantees spinner cleanup.',
        html: `<div class="robust-demo">
  <button id="riskyBtn">Attempt Risky Load</button>
  <div id="loaderStatus">Ready.</div>
</div>`,
        css: `.robust-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
button {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
#loaderStatus {
  font-weight: 600;
  color: #334155;
}`,
        js: `async function performRiskyOperation() {
  const status = document.getElementById("loaderStatus");
  if (status) status.textContent = "Loading...";

  try {
    // Intentionally bad URL to test error recovery
    const res = await fetch("https://nonexistent-domain-12345.xyz");
    const data = await res.json();
    if (status) status.textContent = "Success!";
  } catch (err) {
    if (status) status.textContent = "Caught Error: Network unavailable. Fallback activated.";
    console.warn("Handled network exception safely:", err);
  } finally {
    console.log("Cleanup complete. Loader dismissed.");
  }
}

document.getElementById("riskyBtn")?.addEventListener("click", performRiskyOperation);`,
        breakdown: [
          {
            lineRange: 'Line 5-9',
            title: 'Risky try Block',
            explanation: 'Attempts network call that might throw an error.',
            highlightTokens: ['try']
          },
          {
            lineRange: 'Line 10-13',
            title: 'Graceful catch Handler',
            explanation: 'Intercepts the failure and presents a user-friendly fallback state.',
            highlightTokens: ['catch (err)']
          },
          {
            lineRange: 'Line 14-16',
            title: 'Guaranteed finally Cleanup',
            explanation: 'Executes without fail to clean up loading states.',
            highlightTokens: ['finally']
          }
        ]
      },
      video: {
        title: 'Error Handling, Custom Errors & DevTools Breakpoints',
        duration: '15:20',
        description: 'Live debugging with Chrome DevTools Sources tab, setting conditional breakpoints, and designing custom Error classes.',
        keyPoints: [
          'try, catch, and finally lifecycle',
          'Setting line breakpoints in DevTools',
          'The debugger statement',
          'Graceful degradation UI patterns'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Error Philosophy', description: 'Anticipating failure' },
          { time: '05:00', seconds: 300, title: 'try/catch/finally', description: 'Code architecture' },
          { time: '10:00', seconds: 600, title: 'DevTools Debugger', description: 'Step Over and Watches' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Great engineers write code assuming networks will fail, inputs will be invalid, and servers will be slow.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-07-04',
        title: 'Catch a JSON Parse Error Safely',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Use a try/catch block to parse an invalid JSON string: const badJson = "{ invalid: true }";. Catch the SyntaxError and write "Invalid JSON Handled" to #errorOutput.',
        instructions: [
          'In a try block, call JSON.parse("{ invalid: true }");',
          'In the catch block, select #errorOutput and set its text to "Invalid JSON Handled"'
        ],
        starterHtml: `<div class="json-guard-card">
  <p>Status: <span id="errorOutput">Ready.</span></p>
</div>`,
        starterCss: `.json-guard-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Test try/catch with JSON.parse
`,
        solutionHtml: `<div class="json-guard-card">
  <p>Status: <span id="errorOutput">Ready.</span></p>
</div>`,
        solutionCss: `.json-guard-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `try {
  JSON.parse("{ invalid: true }");
} catch (err) {
  const el = document.getElementById("errorOutput");
  if (el) el.textContent = "Invalid JSON Handled";
}`,
        hints: [
          'Wrap JSON.parse in try { ... } catch (err) { ... }',
          'In catch, update document.getElementById("errorOutput").textContent.'
        ],
        testCases: [
          {
            id: 'tc-07-4a',
            description: 'errorOutput shows error handled text',
            hint: 'Set text to "Invalid JSON Handled" in catch block',
            checkType: 'selector-exists',
            target: '#errorOutput'
          }
        ],
        conceptQuestion: {
          question: 'When does the finally block execute in a try/catch/finally construct?',
          options: [
            'Always, regardless of whether an error was thrown or not',
            'Only when an error occurs',
            'Only when no errors occur',
            'Only if the server responds'
          ],
          correctIndex: 0,
          explanation: 'The finally block is guaranteed to execute whether the try block completes successfully or the catch block intercepts an error.'
        }
      },
      quiz: [
        {
          id: 'q-07-4',
          question: 'Which built-in JavaScript statement automatically pauses execution and opens the browser debugger tool?',
          options: ['debugger;', 'pause();', 'breakpoint;', 'stop();'],
          correctIndex: 0,
          explanation: 'The debugger; statement invokes any available debugging functionality (like Chrome DevTools), pausing execution on that line.'
        }
      ],
      summary: [
        'try/catch blocks intercept exceptions to prevent whole-app crashes.',
        'finally blocks guarantee resource cleanup and spinner dismissal.',
        'DevTools breakpoints and step execution provide deep runtime inspection.',
        'Defensive design pairs fallback UI states with every network call.'
      ],
      relatedTopics: [
        {
          title: 'ES Modules: import/export',
          chapterNumber: '07',
          lessonId: 'ch-07-l-05',
          context: 'Modularize your codebase with ES Module exports and imports.'
        }
      ]
    },
    {
      id: 'ch-07-l-05',
      chapterId: 'ch-07',
      number: '7.5',
      slug: 'es-modules-import-export',
      title: 'ES Modules: import & export',
      tagline: 'Break monolithic files into clean, reusable modules with named and default exports',
      durationMinutes: 25,
      learningObjectives: [
        'Understand why modularity is essential for large-scale web development',
        'Master named exports (export const fn) vs default exports (export default fn)',
        'Import modules using import { fn } from "./module.js"',
        'Configure <script type="module"> in modern HTML documents'
      ],
      theorySections: [
        {
          heading: '1. Why Monolithic Files Fail',
          content: 'Putting thousands of lines of JavaScript into a single file results in variable naming collisions, difficult testing, and poor team collaboration. ES Modules (ESM) provide a standardized module system natively supported by all browsers and Node.js.',
          bulletPoints: [
            'Explicit Dependencies: Every module explicitly declares what it imports and what it exports',
            'Encapsulation: Module-level variables are private to that file and never pollute the global window object',
            'Tree-Shaking: Modern bundlers (Vite, Webpack) automatically eliminate unused exported code'
          ]
        },
        {
          heading: '2. Named Exports vs Default Exports',
          content: 'ES Modules offer two primary export mechanisms.',
          bulletPoints: [
            'Named Exports: export const calculateTotal = () => ... (multiple per file, imported with exact names in curly braces)',
            'Default Export: export default class User ... (one per file, imported without curly braces)',
            'Renaming: import { calculateTotal as getTotal } from "./math.js"'
          ],
          callout: {
            type: 'key-rule',
            text: 'HTML Rule: To use ES Module syntax directly in browser HTML, the script tag MUST declare type="module": <script type="module" src="./main.js"></script>.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'Standardized Lego Modular Bricks',
        concept: 'Modular Architecture',
        story: 'Instead of pouring molten plastic into one giant solid blob of a toy castle, Lego manufactures thousands of precision interlocking bricks: wheels, windows, hinges, and arches. Each piece has a standard connector. You can import 4 wheels to build a car, or export the window block into a house without melting down the entire toy set.',
        moral: 'Modules make your codebase scalable, swappable, and easy to maintain.',
        icon: 'Layers'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Named and Default Module Exports',
        description: 'Clean separation of math utility functions and a default configuration class.',
        html: `<div class="module-card">
  <h4>Module Inspector</h4>
  <p id="moduleOutput">Testing module exports...</p>
</div>`,
        css: `.module-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}`,
        js: `// MathUtils.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// Main.js
// import { add, multiply } from './MathUtils.js';
const sum = add(15, 25);
const product = multiply(4, 5);

const el = document.getElementById("moduleOutput");
if (el) el.textContent = \`Sum: \${sum}, Product: \${product}\`;`,
        breakdown: [
          {
            lineRange: 'Line 2-3',
            title: 'Named Exports',
            explanation: 'Exports individual utility functions that can be imported selectively.',
            highlightTokens: ['export const add', 'export const multiply']
          },
          {
            lineRange: 'Line 6',
            title: 'Destructured Import Syntax',
            explanation: 'Selects only the specific functions needed from the module.',
            highlightTokens: ['import { add, multiply }']
          }
        ]
      },
      video: {
        title: 'ES Modules in Modern JavaScript: Named, Default & Bundlers',
        duration: '14:50',
        description: 'Learn how browsers parse modules, how Vite and Webpack bundle them, and best practices for folder organization.',
        keyPoints: [
          'type="module" in the browser',
          'Named vs default exports',
          'Barrel exports (index.js)',
          'Tree-shaking dead code elimination'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Why Modules', description: 'Solving global pollution' },
          { time: '04:30', seconds: 270, title: 'Named vs Default', description: 'Syntax comparison' },
          { time: '09:40', seconds: 580, title: 'Vite & Bundlers', description: 'Production bundling' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Modular architecture is what allows engineering teams to build applications with millions of lines of code.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-07-05',
        title: 'Define and Invoke an Exported Formatter',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create an arrow function formatCurrency(amount) that returns `$${amount.toFixed(2)}`. Call it with amount = 49.5 and write the formatted string to #currencyDisplay.',
        instructions: [
          'Create const formatCurrency = (amount) => `$${amount.toFixed(2)}`;',
          'Call formatCurrency(49.5);',
          'Display "$49.50" inside #currencyDisplay'
        ],
        starterHtml: `<div class="currency-card">
  <p>Price: <strong id="currencyDisplay">--</strong></p>
</div>`,
        starterCss: `.currency-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Implement formatCurrency and test output
`,
        solutionHtml: `<div class="currency-card">
  <p>Price: <strong id="currencyDisplay">--</strong></p>
</div>`,
        solutionCss: `.currency-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `const formatCurrency = (amount) => \`$\${amount.toFixed(2)}\`;
const result = formatCurrency(49.5);

const el = document.getElementById("currencyDisplay");
if (el) el.textContent = result;`,
        hints: [
          'amount.toFixed(2) formats numbers to two decimal places.',
          'Use template literal: `$${amount.toFixed(2)}`.'
        ],
        testCases: [
          {
            id: 'tc-07-5a',
            description: 'currencyDisplay has formatted price',
            hint: 'Set $49.50 on #currencyDisplay',
            checkType: 'selector-exists',
            target: '#currencyDisplay'
          }
        ],
        conceptQuestion: {
          question: 'What attribute must be added to a <script> tag to enable native ES module import/export syntax in the browser?',
          options: ['type="module"', 'module="true"', 'mode="es6"', 'async="module"'],
          correctIndex: 0,
          explanation: '<script type="module"> instructs modern browsers to parse the script as an ES Module, allowing import and export statements.'
        }
      },
      quiz: [
        {
          id: 'q-07-5',
          question: 'How many default exports are permitted in a single JavaScript module file?',
          options: ['Exactly one', 'As many as needed', 'Zero', 'Up to five'],
          correctIndex: 0,
          explanation: 'A module can have at most one default export, alongside as many named exports as needed.'
        }
      ],
      summary: [
        'ES Modules structure code into clean, isolated, reusable files.',
        'Named exports export multiple items; default exports export one primary item.',
        'Module variables are private and do not pollute the global window object.',
        'Tree-shaking removes unused exports from production application bundles.'
      ],
      relatedTopics: [
        {
          title: 'Live Data Fetching Dashboard Project',
          chapterNumber: '07',
          lessonId: 'ch-07-l-06',
          context: 'Build an end-to-end async dashboard integrating fetch, async/await, and error handling.'
        }
      ]
    },
    {
      id: 'ch-07-l-06',
      chapterId: 'ch-07',
      number: '7.6',
      slug: 'advanced-js-project',
      title: 'Advanced Project: Live Data Fetching Dashboard',
      tagline: 'Build a production-ready asynchronous live weather and metric dashboard with real API fetching and graceful fallbacks',
      durationMinutes: 35,
      learningObjectives: [
        'Synthesize Promises, async/await, fetch(), try/catch/finally, and DOM manipulation into a complete project',
        'Fetch real-time data from an online API with loading indicators and error recovery',
        'Transform raw JSON payloads using map() and filter() into polished UI elements',
        'Handle offline connectivity and API timeout degradation gracefully'
      ],
      theorySections: [
        {
          heading: '1. Production Data Architecture',
          content: 'Professional web applications do not just fetch data; they manage a 4-stage UI lifecycle: Idle, Loading, Success, and Error.',
          bulletPoints: [
            'Idle: Initial state awaiting user interaction',
            'Loading: Active spinner or skeleton placeholder while network request is in flight',
            'Success: Rendered data visualization with calculated metrics',
            'Error: Clear user-friendly message with a "Retry" button'
          ]
        },
        {
          heading: '2. Resilient Fallbacks',
          content: 'If an external public API is rate-limited or the user loses Wi-Fi, the dashboard must seamlessly fall back to cached local storage or realistic demo data rather than displaying a blank broken screen.',
          bulletPoints: [
            'Try real public endpoint first',
            'If network throws or response is !ok, log telemetry and hydrate with realistic fallback snapshot',
            'Display a subtle "Offline / Demo Data" pill badge so users know the current mode'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Dual-Generator Hospital Power Grid',
        concept: 'Resilient Asynchronous Fallback Systems',
        story: 'A major hospital draws electricity from the municipal power grid (the live API). But if a lightning storm knocks down the power lines, hospital life-support machines do not simply power down. In 50 milliseconds, backup diesel generators kick on (the fallback data cache), keeping surgery lights and heart monitors running seamlessly while displaying a yellow "Auxiliary Power" light on the dashboard.',
        moral: 'Always design resilient systems that stay alive even when external networks fail.',
        icon: 'Activity'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Full Asynchronous Weather Dashboard Component',
        description: 'Complete dashboard handling loading states, API fetching, and fallback rendering.',
        html: `<div class="dashboard-shell">
  <div class="dash-header">
    <h3>Live Weather & Air Quality Monitor</h3>
    <button id="refreshDataBtn" class="refresh-btn">Refresh Data</button>
  </div>
  <div id="dashLoader" class="loader-banner" style="display: none;">Fetching satellite telemetry...</div>
  <div class="metrics-grid">
    <div class="metric-card">
      <span class="label">Temperature</span>
      <div id="tempVal" class="metric-val">--&deg;C</div>
    </div>
    <div class="metric-card">
      <span class="label">Wind Speed</span>
      <div id="windVal" class="metric-val">-- km/h</div>
    </div>
    <div class="metric-card">
      <span class="label">Condition</span>
      <div id="conditionVal" class="metric-val">--</div>
    </div>
  </div>
</div>`,
        css: `.dashboard-shell {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
}
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.refresh-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.loader-banner {
  padding: 0.5rem;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-weight: 500;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.metric-card {
  background: white;
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.metric-val {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-top: 0.5rem;
}`,
        js: `async function fetchWeatherData() {
  const loader = document.getElementById("dashLoader");
  if (loader) loader.style.display = "block";

  try {
    // Fetch live weather from public open-meteo endpoint (Paris coordinates)
    const url = "https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true";
    const res = await fetch(url);
    if (!res.ok) throw new Error("API Offline");
    const data = await res.json();
    
    document.getElementById("tempVal").textContent = \`\${data.current_weather.temperature}°C\`;
    document.getElementById("windVal").textContent = \`\${data.current_weather.windspeed} km/h\`;
    document.getElementById("conditionVal").textContent = "Live Telemetry";
  } catch (err) {
    // Graceful fallback
    document.getElementById("tempVal").textContent = "21.4°C";
    document.getElementById("windVal").textContent = "12.8 km/h";
    document.getElementById("conditionVal").textContent = "Cached Snapshot";
  } finally {
    if (loader) loader.style.display = "none";
  }
}

document.getElementById("refreshDataBtn")?.addEventListener("click", fetchWeatherData);
fetchWeatherData();`,
        breakdown: [
          {
            lineRange: 'Line 2-3 & Line 22-24',
            title: 'Loading State Management',
            explanation: 'Shows loading banner on start and guarantees hiding it via finally block.',
            highlightTokens: ['loader.style.display = "block"', 'finally']
          },
          {
            lineRange: 'Line 5-15',
            title: 'Live Network Request with Fallback',
            explanation: 'Queries real API and falls back to snapshot data if network is unavailable.',
            highlightTokens: ['await fetch', 'catch (err)']
          }
        ]
      },
      video: {
        title: 'Building a Real-Time Asynchronous Live Weather Dashboard',
        duration: '19:40',
        description: 'Complete capstone walkthrough: structuring state, making live API requests, error recovery, and updating DOM nodes dynamically.',
        keyPoints: [
          'Managing the 4 UI states (idle, loading, success, error)',
          'Calling real public weather APIs with fetch()',
          'Implementing zero-crash fallback snapshots'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Project Overview', description: 'Architecture & UI' },
          { time: '05:30', seconds: 330, title: 'The Fetch Controller', description: 'Connecting to Open-Meteo' },
          { time: '12:00', seconds: 720, title: 'Error Boundaries', description: 'Graceful fallback logic' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'You now possess full asynchronous capability to connect any web app to the world.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-07-06',
        title: 'Build an Async Metric Dashboard with Loading State',
        difficulty: 'Intermediate',
        estimatedTime: '15 min',
        prompt: 'Build a function refreshMetrics() that shows #spinner, waits 400ms, populates #metricScore with "94/100", and hides #spinner in a finally block.',
        instructions: [
          'Select #spinner and set display to "block"',
          'Await a 400ms Promise delay in try block',
          'Set #metricScore textContent to "94/100"',
          'Hide #spinner in the finally block'
        ],
        starterHtml: `<div class="dashboard-project">
  <div id="spinner" style="display: none;">Loading metrics...</div>
  <p>Performance Score: <strong id="metricScore">--</strong></p>
  <button id="updateBtn">Fetch Metrics</button>
</div>`,
        starterCss: `.dashboard-project {
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
  margin-top: 0.5rem;
}`,
        starterJs: `// Implement refreshMetrics here
`,
        solutionHtml: `<div class="dashboard-project">
  <div id="spinner" style="display: none;">Loading metrics...</div>
  <p>Performance Score: <strong id="metricScore">--</strong></p>
  <button id="updateBtn">Fetch Metrics</button>
</div>`,
        solutionCss: `.dashboard-project {
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
  margin-top: 0.5rem;
}`,
        solutionJs: `const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function refreshMetrics() {
  const spinner = document.getElementById("spinner");
  const score = document.getElementById("metricScore");
  if (spinner) spinner.style.display = "block";

  try {
    await sleep(400);
    if (score) score.textContent = "94/100";
  } finally {
    if (spinner) spinner.style.display = "none";
  }
}

document.getElementById("updateBtn")?.addEventListener("click", refreshMetrics);
refreshMetrics();`,
        hints: [
          'Remember to set spinner.style.display = "none" in the finally block.',
          'Update score.textContent to "94/100" in the try block.'
        ],
        testCases: [
          {
            id: 'tc-07-6a',
            description: 'metricScore populated with score',
            hint: 'Set text to "94/100" on #metricScore',
            checkType: 'selector-exists',
            target: '#metricScore'
          }
        ],
        conceptQuestion: {
          question: 'Why should front-end web applications implement graceful fallbacks for all external API requests?',
          options: [
            'Public APIs can suffer downtime, rate limits, or network disconnections, and apps must never crash into a blank screen',
            'To make the code harder to read',
            'Because modern browsers ban external APIs',
            'To increase memory consumption'
          ],
          correctIndex: 0,
          explanation: 'Graceful fallbacks ensure user trust and resilience by displaying cached snapshots or helpful recovery actions during outages.'
        }
      },
      quiz: [
        {
          id: 'q-07-6',
          question: 'What are the 4 standard user interface lifecycle states for network-driven components?',
          options: [
            'Idle, Loading, Success, Error',
            'Start, Middle, End, Exit',
            'Alpha, Beta, RC, GA',
            'Open, Read, Write, Close'
          ],
          correctIndex: 0,
          explanation: 'The 4 canonical asynchronous UI states are Idle (initial), Loading (in-flight), Success (data rendered), and Error (failure with retry).'
        }
      ],
      summary: [
        'Production asynchronous applications manage Idle, Loading, Success, and Error UI states.',
        'The Fetch API pairs with async/await and response.ok checks for reliable data retrieval.',
        'try/catch/finally ensures network failures degrade gracefully without crashing the application.',
        'Chapter 07 elevates your front-end capabilities to professional full-stack engineering standards.'
      ],
      relatedTopics: [
        {
          title: 'Advanced DOM & Component Architecture',
          chapterNumber: '08',
          lessonId: 'ch-08-l-01',
          context: 'Take DOM manipulation to enterprise level with event delegation and Web Components.'
        }
      ]
    }
  ]
};
