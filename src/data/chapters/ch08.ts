import { Chapter } from '../../utils/types';

export const chapter08: Chapter = {
  id: 'ch-08',
  number: '08',
  badge: '08',
  slug: 'advanced-dom-browser-apis',
  title: 'Advanced DOM & Browser APIs',
  subtitle: 'Event Delegation, Storage, Intersection Observer, HTML5 Templates, FormData & Interactive Projects',
  description: 'Master enterprise DOM engineering and native Web APIs. Master event bubbling and delegation, client-side persistence with localStorage, performant scroll animations with IntersectionObserver, HTML5 <template> cloning, and build a persistent interactive task application.',
  estimatedHours: '5 hrs',
  accentColor: 'indigo',
  iconName: 'Layout',
  totalLessons: 6,
  lessons: [
    {
      id: 'ch-08-l-01',
      chapterId: 'ch-08',
      number: '8.1',
      slug: 'event-delegation-bubbling',
      title: 'Event Delegation, Bubbling & Capturing',
      tagline: 'Attach one listener to a parent to manage thousands of dynamic children using the event propagation tree',
      durationMinutes: 25,
      learningObjectives: [
        'Understand the three phases of DOM event flow: Capturing, Target, and Bubbling',
        'Learn why attaching event listeners to hundreds of individual list items wastes memory and leaks resources',
        'Implement Event Delegation by listening on a common ancestor using e.target and e.target.closest()',
        'Master e.stopPropagation() and e.preventDefault() for fine-grained interaction control'
      ],
      theorySections: [
        {
          heading: '1. The 3 Phases of Event Propagation',
          content: 'When a user clicks an element deep inside the DOM, the event does not simply appear at that element. It travels through three distinct phases across the document tree.',
          bulletPoints: [
            '1. Capturing Phase: The event travels down from window -> document -> body down to the target parent',
            '2. Target Phase: The event arrives at the exact element that triggered the interaction (e.target)',
            '3. Bubbling Phase: The event bubbles back upward from the target all the way up to window (default for addEventListener)'
          ]
        },
        {
          heading: '2. The Power of Event Delegation',
          content: 'Instead of attaching 500 separate click listeners to 500 table rows or list items, you attach a single listener to the parent <ul> container.',
          bulletPoints: [
            'Memory Efficiency: 1 event listener in memory instead of hundreds',
            'Dynamic Child Support: Items added to the DOM in the future automatically work without rebinding listeners',
            'e.target.closest(".item"): Robustly finds the matching ancestor even if the user clicked an inner <span> or <i> icon'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden Pattern: Always use event.target.closest(".btn") inside delegated listeners so clicks on child icons/spans still trigger the intended action!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Apartment Complex Front Desk Concierge',
        concept: 'Event Delegation',
        story: 'In an apartment building with 200 units, the post office does not hire 200 couriers to walk upstairs and ring each resident’s individual doorbell. Instead, mail is delivered to a single front desk concierge in the lobby (the parent container listener). The concierge checks the name on the envelope (event.target) and places it into the correct resident mailbox.',
        moral: 'A central handler handles any number of incoming events with minimal overhead.',
        icon: 'Layers'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Event Delegation on a Dynamic Task List',
        description: 'Single listener on parent #taskList handles clicks on all delete buttons, even newly created ones.',
        html: `<div class="delegation-card">
  <ul id="taskList">
    <li data-id="1"><span>Learn HTML</span> <button class="delete-btn">&times;</button></li>
    <li data-id="2"><span>Master CSS</span> <button class="delete-btn">&times;</button></li>
  </ul>
</div>`,
        css: `.delegation-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
ul { list-style: none; padding: 0; margin: 0; }
li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}
.delete-btn {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-weight: bold;
}`,
        js: `const taskList = document.getElementById("taskList");

taskList?.addEventListener("click", (e) => {
  const target = e.target;
  // Check if click was on or inside a delete button
  const deleteBtn = target.closest(".delete-btn");
  if (deleteBtn) {
    const item = deleteBtn.closest("li");
    item?.remove();
    console.log("Deleted item via single delegated listener");
  }
});`,
        breakdown: [
          {
            lineRange: 'Line 3',
            title: 'Single Parent Listener',
            explanation: 'Listens for bubbling click events on the parent <ul> element.',
            highlightTokens: ['taskList?.addEventListener("click"']
          },
          {
            lineRange: 'Line 6-10',
            title: 'target.closest() Inspection',
            explanation: 'Detects if the clicked element is or is contained within .delete-btn.',
            highlightTokens: ['target.closest(".delete-btn")']
          }
        ]
      },
      video: {
        title: 'Event Delegation, Bubbling, Capturing & closest()',
        duration: '15:40',
        description: 'Visualizing event propagation through the DOM tree, memory profiling event listeners, and mastering closest().',
        keyPoints: [
          'The 3 phases of event propagation',
          'Memory leak risks of per-item listeners',
          'Using event.target.closest() safely'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Event Flow', description: 'Capture vs Bubble' },
          { time: '05:30', seconds: 330, title: 'Event Delegation', description: 'Parent listening' },
          { time: '10:45', seconds: 645, title: 'closest() Pattern', description: 'Bulletproof target handling' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Event delegation is the foundation of high-performance front-end architecture.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-08-01',
        title: 'Implement Delegated Button Click Handling',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Attach a single delegated click listener to #buttonGrid. When any child button with class .action-btn is clicked, read its data-action attribute and set #lastAction text to match.',
        instructions: [
          'Select #buttonGrid and add click listener',
          'Use e.target.closest(".action-btn")',
          'Read const action = btn.dataset.action;',
          'Set #lastAction textContent to action'
        ],
        starterHtml: `<div class="grid-card">
  <div id="buttonGrid">
    <button class="action-btn" data-action="Save">Save</button>
    <button class="action-btn" data-action="Edit">Edit</button>
    <button class="action-btn" data-action="Delete">Delete</button>
  </div>
  <p>Last Action: <strong id="lastAction">None</strong></p>
</div>`,
        starterCss: `.grid-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
#buttonGrid { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
button {
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}`,
        starterJs: `// Implement delegated click listener on #buttonGrid
`,
        solutionHtml: `<div class="grid-card">
  <div id="buttonGrid">
    <button class="action-btn" data-action="Save">Save</button>
    <button class="action-btn" data-action="Edit">Edit</button>
    <button class="action-btn" data-action="Delete">Delete</button>
  </div>
  <p>Last Action: <strong id="lastAction">None</strong></p>
</div>`,
        solutionCss: `.grid-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
#buttonGrid { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
button {
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}`,
        solutionJs: `const grid = document.getElementById("buttonGrid");
const out = document.getElementById("lastAction");

grid?.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest(".action-btn");
  if (btn && out) {
    out.textContent = (btn as HTMLElement).dataset.action || "None";
  }
});`,
        hints: [
          'const btn = e.target.closest(".action-btn");',
          'out.textContent = btn.dataset.action;'
        ],
        testCases: [
          {
            id: 'tc-08-1a',
            description: 'buttonGrid listener is active',
            hint: 'Attach click listener to #buttonGrid',
            checkType: 'selector-exists',
            target: '#buttonGrid'
          }
        ],
        conceptQuestion: {
          question: 'What is the primary performance benefit of using event delegation on a table with 1,000 rows?',
          options: [
            'Only 1 event listener is created in memory instead of 1,000, saving RAM and CPU cycles',
            'It makes the CSS animations smoother',
            'It compresses the HTML file size',
            'It prevents right-clicking'
          ],
          correctIndex: 0,
          explanation: 'Attaching one listener to the parent avoids allocating hundreds of handler functions and handles newly added child elements automatically.'
        }
      },
      quiz: [
        {
          id: 'q-08-1',
          question: 'Which method stops an event from bubbling any further up the DOM tree hierarchy?',
          options: ['event.stopPropagation()', 'event.preventDefault()', 'event.stop()', 'event.cancel()'],
          correctIndex: 0,
          explanation: 'stopPropagation() stops the event from propagating up (or down) the DOM tree hierarchy.'
        }
      ],
      summary: [
        'DOM events follow a three-phase cycle: Capturing, Target, and Bubbling.',
        'Event delegation leverages bubbling to handle interactions across multiple children with one parent listener.',
        'target.closest() safely resolves parent selectors even when inner child icons are clicked.',
        'preventDefault() stops native browser actions (like form reloads); stopPropagation() stops bubbling.'
      ],
      relatedTopics: [
        {
          title: 'HTML5 Templates & Dynamic Components',
          chapterNumber: '08',
          lessonId: 'ch-08-l-02',
          context: 'Render dynamic DOM elements safely using template cloning.'
        }
      ]
    },
    {
      id: 'ch-08-l-02',
      chapterId: 'ch-08',
      number: '8.2',
      slug: 'html5-templates-dynamic-components',
      title: 'HTML5 <template> & Dynamic Components',
      tagline: 'Stamp out high-performance reusable UI components using native <template> tags and cloneNode(true)',
      durationMinutes: 25,
      learningObjectives: [
        'Understand how the HTML5 <template> tag holds inert markup that is not rendered on page load',
        'Clone template fragments safely with template.content.cloneNode(true)',
        'Hydrate cloned template elements with dynamic data without vulnerable string concatenation',
        'Append DocumentFragments to minimize browser reflows and repaints'
      ],
      theorySections: [
        {
          heading: '1. What is the <template> Tag?',
          content: 'The HTML5 <template> tag is a mechanism for holding client-side content that is not rendered when the page is loaded, but may be instantiated during runtime using JavaScript.',
          bulletPoints: [
            'Inert DOM: Scripts inside <template> do not run, images do not download, and CSS is not applied until cloned',
            'template.content: Returns a lightweight DocumentFragment containing the template nodes',
            'cloneNode(true): Creates a deep copy of the template fragment ready for data population'
          ]
        },
        {
          heading: '2. Avoiding innerHTML Injection Risks',
          content: 'Using raw template literals with innerHTML is dangerous if user data is unescaped (XSS risk). Using <template> allows you to manipulate live DOM nodes safely with textContent and setAttribute.',
          bulletPoints: [
            'Safe: clone.querySelector(".title").textContent = item.title (auto-escapes characters)',
            'Batching: Appending multiple clones to a DocumentFragment triggers only 1 browser reflow when appended to the document'
          ],
          callout: {
            type: 'tip',
            text: 'Performance Pro Tip: Accumulate cloned cards into a DocumentFragment, then append the fragment once to the container.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Silicon Cookie Cutter Mold',
        concept: 'The HTML5 <template> Tag',
        story: 'A cookie cutter hanging on the kitchen wall is not a cookie. It has no calories and you cannot eat it. But when you press it into rolled dough, it stamps out a dozen identical gingerbread stars. You decorate each star with different colored icing (data hydration). The <template> tag is your reusable silicon mold.',
        moral: 'Templates define the structure once, stamping out dynamic cards efficiently.',
        icon: 'Layers'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Cloning and Hydrating <template> Elements',
        description: 'Using template.content.cloneNode(true) to populate student badges.',
        html: `<div class="template-demo">
  <div id="badgeGrid" class="badge-grid"></div>

  <!-- Reusable inert template -->
  <template id="badgeTemplate">
    <div class="user-badge">
      <h4 class="badge-name"></h4>
      <span class="badge-role"></span>
    </div>
  </template>
</div>`,
        css: `.template-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.badge-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}
.user-badge {
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}
.badge-name { margin: 0 0 0.25rem 0; color: #0f172a; font-size: 1rem; }
.badge-role { font-size: 0.8rem; color: #64748b; }`,
        js: `const users = [
  { name: "Siddharth Rao", role: "Cloud Architect" },
  { name: "Chloe Dupont", role: "Security Engineer" }
];

const template = document.getElementById("badgeTemplate");
const grid = document.getElementById("badgeGrid");

if (template && grid) {
  const fragment = document.createDocumentFragment();

  users.forEach(user => {
    // Deep clone inert template
    const clone = template.content.cloneNode(true);
    clone.querySelector(".badge-name").textContent = user.name;
    clone.querySelector(".badge-role").textContent = user.role;
    fragment.appendChild(clone);
  });

  // Single DOM reflow
  grid.appendChild(fragment);
}`,
        breakdown: [
          {
            lineRange: 'Line 14',
            title: 'Deep Clone with cloneNode(true)',
            explanation: 'Clones the template fragment and all of its descendants.',
            highlightTokens: ['template.content.cloneNode(true)']
          },
          {
            lineRange: 'Line 15-16',
            title: 'Safe Data Hydration',
            explanation: 'Uses textContent to prevent script injection vulnerabilities.',
            highlightTokens: ['textContent = user.name']
          }
        ]
      },
      video: {
        title: 'HTML5 Templates, DocumentFragments & Performant Rendering',
        duration: '14:20',
        description: 'How modern browsers optimize <template> memory, benchmarking cloneNode vs innerHTML, and DocumentFragment batching.',
        keyPoints: [
          'Inert nature of <template>',
          'template.content.cloneNode(true)',
          'Single-reflow rendering with DocumentFragment'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'The <template> Tag', description: 'Inert markup' },
          { time: '05:00', seconds: 300, title: 'Cloning Nodes', description: 'Deep copying elements' },
          { time: '09:30', seconds: 570, title: 'DocumentFragment', description: 'Batching DOM updates' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'The template tag is the native browser precursor to JSX components.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-08-02',
        title: 'Clone and Stamp a Card Template',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Clone #itemTemplate, set its .title text to "Product A", and append it into #itemContainer.',
        instructions: [
          'Get #itemTemplate and #itemContainer',
          'Call const clone = template.content.cloneNode(true);',
          'Set clone.querySelector(".title").textContent = "Product A";',
          'Append clone to #itemContainer'
        ],
        starterHtml: `<div class="card-demo">
  <div id="itemContainer"></div>
  <template id="itemTemplate">
    <div class="product-item">
      <h5 class="title"></h5>
    </div>
  </template>
</div>`,
        starterCss: `.card-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.product-item {
  padding: 0.75rem;
  background: #f1f5f9;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}`,
        starterJs: `// Clone and append template here
`,
        solutionHtml: `<div class="card-demo">
  <div id="itemContainer"></div>
  <template id="itemTemplate">
    <div class="product-item">
      <h5 class="title"></h5>
    </div>
  </template>
</div>`,
        solutionCss: `.card-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.product-item {
  padding: 0.75rem;
  background: #f1f5f9;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}`,
        solutionJs: `const tmpl = document.getElementById("itemTemplate");
const container = document.getElementById("itemContainer");

if (tmpl && container) {
  const clone = tmpl.content.cloneNode(true);
  const title = clone.querySelector(".title");
  if (title) title.textContent = "Product A";
  container.appendChild(clone);
}`,
        hints: [
          'Use tmpl.content.cloneNode(true);',
          'Find .title in the clone and set textContent = "Product A".'
        ],
        testCases: [
          {
            id: 'tc-08-2a',
            description: 'Product item rendered in container',
            hint: 'Append cloned item into #itemContainer',
            checkType: 'selector-exists',
            target: '#itemContainer .product-item'
          }
        ],
        conceptQuestion: {
          question: 'Does the browser load images or execute script tags placed directly inside an un-cloned <template> tag?',
          options: [
            'No, template contents are completely inert until cloned into the active document',
            'Yes, all images download immediately',
            'Only in Firefox',
            'Yes, but only in background mode'
          ],
          correctIndex: 0,
          explanation: 'Markup inside a <template> tag is inert. Images do not download, scripts do not execute, and styles are not applied until cloned.'
        }
      },
      quiz: [
        {
          id: 'q-08-2',
          question: 'What method is used to create a deep copy of a <template> element’s content?',
          options: ['template.content.cloneNode(true)', 'template.copy()', 'template.duplicate()', 'template.render()'],
          correctIndex: 0,
          explanation: 'template.content.cloneNode(true) performs a deep clone of the template DocumentFragment and all child nodes.'
        }
      ],
      summary: [
        'The <template> tag holds inert, non-rendered HTML blueprints.',
        'cloneNode(true) stamps deep duplicates of the template markup.',
        'Hydrating cloned elements with textContent eliminates XSS vulnerabilities.',
        'DocumentFragment allows batch appending to minimize layout reflows.'
      ],
      relatedTopics: [
        {
          title: 'LocalStorage & Persistence',
          chapterNumber: '08',
          lessonId: 'ch-08-l-03',
          context: 'Persist state across browser refreshes and sessions.'
        }
      ]
    },
    {
      id: 'ch-08-l-03',
      chapterId: 'ch-08',
      number: '8.3',
      slug: 'localstorage-sessionstorage-persistence',
      title: 'Client-Side Persistence: LocalStorage & SessionStorage',
      tagline: 'Save user preferences, drafts, and app state permanently across page reloads and browser restarts',
      durationMinutes: 25,
      learningObjectives: [
        'Understand the Storage API: localStorage (permanent) vs sessionStorage (tab lifecycle)',
        'Master the 4 core storage methods: setItem, getItem, removeItem, and clear',
        'Serialize objects and arrays to strings using JSON.stringify() and JSON.parse()',
        'Handle quota exceptions (5MB storage limit) with try/catch defense'
      ],
      theorySections: [
        {
          heading: '1. LocalStorage vs SessionStorage',
          content: 'Web applications need to remember user settings (dark mode preference, drafted form inputs, shopping cart items) even if the user refreshes or closes the browser tab.',
          bulletPoints: [
            'localStorage: Persists permanently until cleared by the user or code (domain origin scoped)',
            'sessionStorage: Survives page refreshes, but is wiped clean as soon as the specific browser tab is closed',
            'Storage Limits: Typically ~5MB per origin (as opposed to 4KB for HTTP cookies)'
          ]
        },
        {
          heading: '2. Storing Objects with JSON Serialization',
          content: 'The Storage API ONLY accepts and returns strings. Storing a raw object directly results in the string "[object Object]". You must serialize using JSON.',
          bulletPoints: [
            'Saving: localStorage.setItem("key", JSON.stringify(dataObject));',
            'Loading: const data = JSON.parse(localStorage.getItem("key") || "[]");',
            'Always provide a fallback string (e.g. "[]" or "{}") to prevent null reference errors'
          ],
          callout: {
            type: 'key-rule',
            text: 'Security Warning: Never store sensitive authentication passwords, credit card numbers, or secret API keys in localStorage (accessible via XSS)!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Hotel Safe vs The Gym Day Locker',
        concept: 'localStorage vs sessionStorage',
        story: 'A hotel room safe with a numeric code (localStorage) holds your jewelry and documents throughout your entire week-long vacation. Even when you leave for dinner or come back the next morning, your items remain safe. A gym locker with a temporary key (sessionStorage) holds your sneakers only while you workout. The moment you check out and leave the facility, the locker is wiped clean for the next visitor.',
        moral: 'Choose your storage mechanism based on how long data needs to survive.',
        icon: 'HardDrive'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Saving and Restoring User Settings',
        description: 'Syncing an active theme toggle with localStorage persistence.',
        html: `<div class="storage-card">
  <h4>User Preferences</h4>
  <label>
    <input type="checkbox" id="prefNotifications"> Enable Desktop Notifications
  </label>
  <p id="storageStatus">Status: Synced with storage.</p>
</div>`,
        css: `.storage-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
label { display: flex; align-items: center; gap: 0.5rem; font-weight: 500; cursor: pointer; }`,
        js: `const STORAGE_KEY = "user_pref_notifications";
const toggle = document.getElementById("prefNotifications");
const statusEl = document.getElementById("storageStatus");

// 1. Restore saved state on page load
const savedPref = localStorage.getItem(STORAGE_KEY);
if (savedPref !== null && toggle) {
  toggle.checked = JSON.parse(savedPref);
}

// 2. Save new state whenever user toggles
toggle?.addEventListener("change", (e) => {
  const isChecked = (e.target as HTMLInputElement).checked;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(isChecked));
  if (statusEl) statusEl.textContent = \`Status: Preference saved (\${isChecked ? "ON" : "OFF"})\`;
});`,
        breakdown: [
          {
            lineRange: 'Line 6-9',
            title: 'Hydration from Storage',
            explanation: 'Checks localStorage on load and restores the checkbox state.',
            highlightTokens: ['localStorage.getItem', 'JSON.parse']
          },
          {
            lineRange: 'Line 12-16',
            title: 'setItem Serialization',
            explanation: 'Saves the boolean state to persistent storage on change.',
            highlightTokens: ['localStorage.setItem', 'JSON.stringify']
          }
        ]
      },
      video: {
        title: 'LocalStorage, SessionStorage, and Quota Management',
        duration: '14:40',
        description: 'Deep dive into browser storage APIs, JSON serialization best practices, quota management, and cross-tab storage events.',
        keyPoints: [
          'localStorage vs sessionStorage lifecycle',
          'JSON.stringify and JSON.parse patterns',
          'Listening to window "storage" events',
          'Handling QuotaExceededError'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Storage Overview', description: 'Persistence types' },
          { time: '05:00', seconds: 300, title: 'JSON Serialization', description: 'Objects to strings' },
          { time: '10:00', seconds: 600, title: 'Storage Events', description: 'Cross-tab syncing' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'LocalStorage turns ephemeral web pages into full stateful applications.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-08-03',
        title: 'Save and Load a Persistent Learner Note',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Read "student_note" from localStorage. If it exists, populate #noteInput. When #saveNoteBtn is clicked, save the input value to localStorage under "student_note" and update #noteStatus to "Saved!".',
        instructions: [
          'const saved = localStorage.getItem("student_note"); if (saved) noteInput.value = saved;',
          'On button click, localStorage.setItem("student_note", noteInput.value);',
          'Set #noteStatus to "Saved!"'
        ],
        starterHtml: `<div class="note-box">
  <input type="text" id="noteInput" placeholder="Enter persistent note...">
  <button id="saveNoteBtn">Save Note</button>
  <span id="noteStatus">Unsaved</span>
</div>`,
        starterCss: `.note-box {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
input {
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  flex: 1;
}
button {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}`,
        starterJs: `// Implement note storage logic here
`,
        solutionHtml: `<div class="note-box">
  <input type="text" id="noteInput" placeholder="Enter persistent note...">
  <button id="saveNoteBtn">Save Note</button>
  <span id="noteStatus">Unsaved</span>
</div>`,
        solutionCss: `.note-box {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
input {
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  flex: 1;
}
button {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}`,
        solutionJs: `const input = document.getElementById("noteInput");
const btn = document.getElementById("saveNoteBtn");
const status = document.getElementById("noteStatus");

const existing = localStorage.getItem("student_note");
if (existing && input) (input as HTMLInputElement).value = existing;

btn?.addEventListener("click", () => {
  if (input) {
    localStorage.setItem("student_note", (input as HTMLInputElement).value);
    if (status) status.textContent = "Saved!";
  }
});`,
        hints: [
          'Use localStorage.getItem("student_note") on page load.',
          'Use localStorage.setItem("student_note", input.value) on click.'
        ],
        testCases: [
          {
            id: 'tc-08-3a',
            description: 'saveNoteBtn listener configured',
            hint: 'Attach click listener to #saveNoteBtn',
            checkType: 'selector-exists',
            target: '#saveNoteBtn'
          }
        ],
        conceptQuestion: {
          question: 'What happens to data stored in sessionStorage when the user closes their browser tab?',
          options: [
            'It is permanently deleted for that session',
            'It is uploaded to the cloud',
            'It is moved to localStorage',
            'It stays preserved indefinitely'
          ],
          correctIndex: 0,
          explanation: 'sessionStorage data is strictly scoped to the lifecycle of the browser tab. Closing the tab wipes the session data.'
        }
      },
      quiz: [
        {
          id: 'q-08-3',
          question: 'What data format can localStorage natively store without serialization?',
          options: ['Strings only', 'Objects and Arrays', 'Booleans and Numbers', 'Functions'],
          correctIndex: 0,
          explanation: 'localStorage can only store strings. All objects and numbers must be converted using JSON.stringify() or String().'
        }
      ],
      summary: [
        'localStorage persists data indefinitely; sessionStorage clears on tab close.',
        'The Storage API provides setItem, getItem, removeItem, and clear.',
        'Complex arrays and objects must be serialized using JSON.stringify() and JSON.parse().',
        'Never store sensitive passwords or secrets in client-accessible browser storage.'
      ],
      relatedTopics: [
        {
          title: 'Intersection Observer API',
          chapterNumber: '08',
          lessonId: 'ch-08-l-04',
          context: 'Build high-performance scroll triggers and image lazy-loading without scroll event lag.'
        }
      ]
    },
    {
      id: 'ch-08-l-04',
      chapterId: 'ch-08',
      number: '8.4',
      slug: 'intersection-observer-api',
      title: 'Intersection Observer API',
      tagline: 'High-performance lazy loading, scroll-triggered animations, and infinite feeds without scroll event jank',
      durationMinutes: 30,
      learningObjectives: [
        'Understand why window.addEventListener("scroll") causes serious frame rate drops and main-thread jank',
        'Configure an IntersectionObserver instance with root, rootMargin, and threshold options',
        'Detect when an element enters or leaves the viewport with entry.isIntersecting',
        'Implement performant image lazy loading and scroll-triggered reveal animations'
      ],
      theorySections: [
        {
          heading: '1. Why Traditional Scroll Listeners Fail',
          content: 'Attaching listeners to the scroll event runs code up to 60 or 120 times every second. Calling getBoundingClientRect() inside a scroll handler forces synchronous layout reflows, causing choppy scrolling.',
          bulletPoints: [
            'Intersection Observer runs asynchronously off the main thread',
            'Zero Main Thread Jank: The browser notifies you ONLY when visibility thresholds are crossed',
            'Ideal for image lazy loading, infinite scroll feeds, and scroll animations'
          ]
        },
        {
          heading: '2. The Observer Configuration Object',
          content: 'You configure an observer using three primary parameters.',
          bulletPoints: [
            'root: The scroll container (null defaults to the browser viewport)',
            'rootMargin: Margin around the root (e.g. "0px 0px 200px 0px" to pre-load images 200px before they enter view)',
            'threshold: Number between 0.0 and 1.0 indicating what percentage of the target must be visible to trigger (e.g. 0.5 = 50%)'
          ],
          callout: {
            type: 'key-rule',
            text: 'Cleanup Rule: Always call observer.unobserve(target) after triggering a one-time enter animation to release memory.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Motion-Detector Security Floodlight',
        concept: 'The Intersection Observer API',
        story: 'A home security guard could stand on the porch looking at the front gate 60 times a second, shouting "Nobody here!" all night long (the old scroll event). Or, you can install an infrared motion detector above the garage (Intersection Observer). The detector sits completely silent with zero electricity until a car crosses the property threshold, at which point it instantly clicks the floodlights ON.',
        moral: 'Event triggers should only fire when thresholds are crossed, saving CPU power.',
        icon: 'Eye'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Scroll-Triggered Fade-In Reveal Animation',
        description: 'Using IntersectionObserver to add .visible class when cards enter the viewport.',
        html: `<div class="observer-demo">
  <div class="reveal-box" id="targetBox">
    <h4>Scroll-Revealed Content</h4>
    <p>I animate smoothly when entering viewport!</p>
  </div>
</div>`,
        css: `.observer-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.reveal-box {
  padding: 1.5rem;
  background: #e0f2fe;
  border: 1px solid #7dd3fc;
  border-radius: 8px;
  opacity: 0.3;
  transform: translateY(20px);
  transition: all 0.5s ease;
}
.reveal-box.visible {
  opacity: 1;
  transform: translateY(0);
  background: #dcfce7;
  border-color: #86efac;
}`,
        js: `const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Stop observing once animated
      obs.unobserve(entry.target);
      console.log("Element crossed viewport threshold!");
    }
  });
}, {
  threshold: 0.2 // Trigger when 20% visible
});

const box = document.getElementById("targetBox");
if (box) observer.observe(box);`,
        breakdown: [
          {
            lineRange: 'Line 1',
            title: 'IntersectionObserver Constructor',
            explanation: 'Instantiates the observer with an entries callback and threshold configuration.',
            highlightTokens: ['new IntersectionObserver']
          },
          {
            lineRange: 'Line 3-6',
            title: 'isIntersecting & unobserve()',
            explanation: 'Adds animation class and unobserves target so it only animates once.',
            highlightTokens: ['entry.isIntersecting', 'obs.unobserve']
          }
        ]
      },
      video: {
        title: 'Mastering the Intersection Observer API for High-FPS UIs',
        duration: '16:00',
        description: 'Comparing getBoundingClientRect vs IntersectionObserver performance, building infinite scroll loaders, and threshold math.',
        keyPoints: [
          'Why scroll listeners tank FPS',
          'rootMargin pre-fetching strategies',
          'entry.isIntersecting and intersectionRatio'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'The Problem with Scroll', description: 'Layout thrashing' },
          { time: '05:30', seconds: 330, title: 'Observer Config', description: 'root, margin & threshold' },
          { time: '11:00', seconds: 660, title: 'Infinite Scroll', description: 'Sentinel elements' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'IntersectionObserver provides silky 60fps animations by running off the main thread.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-08-04',
        title: 'Create an Intersection Observer Trigger',
        difficulty: 'Intermediate',
        estimatedTime: '10 min',
        prompt: 'Instantiate an IntersectionObserver that sets the textContent of #observeStatus to "In View!" whenever #observedCard intersects.',
        instructions: [
          'Create const obs = new IntersectionObserver((entries) => { ... });',
          'Inside callback: if (entries[0].isIntersecting) { set #observeStatus text to "In View!"; }',
          'Call obs.observe(document.getElementById("observedCard")!);'
        ],
        starterHtml: `<div class="io-card">
  <div id="observedCard" class="card-item">Target Card</div>
  <p>Viewport Status: <strong id="observeStatus">Out of View</strong></p>
</div>`,
        starterCss: `.io-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.card-item {
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}`,
        starterJs: `// Instantiate observer and observe #observedCard
`,
        solutionHtml: `<div class="io-card">
  <div id="observedCard" class="card-item">Target Card</div>
  <p>Viewport Status: <strong id="observeStatus">Out of View</strong></p>
</div>`,
        solutionCss: `.io-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.card-item {
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}`,
        solutionJs: `const status = document.getElementById("observeStatus");
const target = document.getElementById("observedCard");

const obs = new IntersectionObserver((entries) => {
  if (entries[0]?.isIntersecting && status) {
    status.textContent = "In View!";
  }
});

if (target) obs.observe(target);`,
        hints: [
          'new IntersectionObserver((entries) => { if (entries[0].isIntersecting) ... });',
          'obs.observe(target);'
        ],
        testCases: [
          {
            id: 'tc-08-4a',
            description: 'observedCard element is being observed',
            hint: 'Attach observer to #observedCard',
            checkType: 'selector-exists',
            target: '#observedCard'
          }
        ],
        conceptQuestion: {
          question: 'What does a threshold value of 0.5 indicate in an IntersectionObserver configuration?',
          options: [
            'The callback will trigger when at least 50% of the target element is visible in the viewport',
            'The observer triggers every 0.5 seconds',
            'The observer stops working after 50 scrolls',
            'The image opacity is 50%'
          ],
          correctIndex: 0,
          explanation: 'threshold: 0.5 means the observer callback fires when 50% of the element’s bounding rectangle intersects with the root viewport.'
        }
      },
      quiz: [
        {
          id: 'q-08-4',
          question: 'Which property on an IntersectionObserverEntry tells you whether the element has entered the visible viewport?',
          options: ['entry.isIntersecting', 'entry.isVisible', 'entry.active', 'entry.inView'],
          correctIndex: 0,
          explanation: 'entry.isIntersecting is a boolean flag indicating if the target element currently intersects with the intersection root.'
        }
      ],
      summary: [
        'IntersectionObserver runs asynchronously, eliminating scroll listener performance jank.',
        'entry.isIntersecting indicates whether an element has crossed into visibility.',
        'rootMargin allows pre-fetching images before they enter the screen.',
        'Always unobserve elements when completing one-time reveal animations.'
      ],
      relatedTopics: [
        {
          title: 'Forms, FormData & Constraint Validation',
          chapterNumber: '08',
          lessonId: 'ch-08-l-05',
          context: 'Manage complex forms, extract key-value payloads, and validate inputs.'
        }
      ]
    },
    {
      id: 'ch-08-l-05',
      chapterId: 'ch-08',
      number: '8.5',
      slug: 'forms-formdata-validation',
      title: 'Forms, FormData & Constraint Validation',
      tagline: 'Master form submit events, new FormData(form), custom validity messages, and real-time input validation',
      durationMinutes: 25,
      learningObjectives: [
        'Intercept form submission with e.preventDefault() to create smooth single-page experiences',
        'Extract all form inputs automatically using the native FormData API',
        'Leverage HTML5 Constraint Validation: pattern, minlength, required, and input.checkValidity()',
        'Provide custom accessible error feedback with input.setCustomValidity()'
      ],
      theorySections: [
        {
          heading: '1. The Modern Form Submission Flow',
          content: 'By default, submitting an HTML form causes the browser to refresh the page and perform a synchronous HTTP request. In modern Single Page Applications (SPAs), JavaScript intercepts this event.',
          bulletPoints: [
            'e.preventDefault(): Stops the browser from reloading the page',
            'new FormData(form): Automatically captures every named input, select, and textarea in the form',
            'Object.fromEntries(formData.entries()): Converts FormData directly into a clean JavaScript object for JSON APIs'
          ]
        },
        {
          heading: '2. Native Constraint Validation API',
          content: 'Instead of writing bulky custom regex validation libraries, modern browsers have built-in validation APIs.',
          bulletPoints: [
            'input.checkValidity(): Returns true if the input passes all HTML constraints',
            'input.validity: Object detailing why validation failed (valueMissing, typeMismatch, patternMismatch, tooShort)',
            'input.setCustomValidity("Message"): Sets a custom error message displayed to the user'
          ],
          callout: {
            type: 'key-rule',
            text: 'Crucial Gotcha: The FormData API requires each form input to have a name="..." attribute, or it will be ignored!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Customs Inspection Counter at the Border',
        concept: 'The FormData & Validation API',
        story: 'Before crossing an international border, travelers submit a declaration slip (the Form). The customs agent checks that every required box is checked and that your passport isn’t expired (Constraint Validation). If a line is blank, the agent circles it in red and asks you to fix it before proceeding. Once verified, the agent stamps your slip and logs the contents into the database.',
        moral: 'Validate data at the gate before sending payloads across the network.',
        icon: 'Shield'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Extracting Form Payloads with new FormData()',
        description: 'Clean extraction of inputs into a JSON-ready object without manual document.getElementById calls.',
        html: `<form id="signupForm" class="form-demo">
  <div class="form-group">
    <label for="userName">Learner Name</label>
    <input type="text" id="userName" name="name" required minlength="3">
  </div>
  <div class="form-group">
    <label for="userTrack">Track</label>
    <select id="userTrack" name="track">
      <option value="frontend">Frontend Engineer</option>
      <option value="fullstack">Full Stack Engineer</option>
    </select>
  </div>
  <button type="submit">Submit Registration</button>
  <pre id="formOutput">Awaiting submission...</pre>
</form>`,
        css: `.form-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.form-group { margin-bottom: 1rem; }
label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.25rem; }
input, select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
}
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
pre {
  background: #0f172a;
  color: #38bdf8;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
  font-size: 0.8rem;
}`,
        js: `const form = document.getElementById("signupForm");
const out = document.getElementById("formOutput");

form?.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page reload

  // Automatically extract all named inputs
  const formData = new FormData(form as HTMLFormElement);
  const payload = Object.fromEntries(formData.entries());

  if (out) {
    out.textContent = "Extracted Payload:\\n" + JSON.stringify(payload, null, 2);
  }
});`,
        breakdown: [
          {
            lineRange: 'Line 5',
            title: 'e.preventDefault()',
            explanation: 'Cancels default browser submission to keep the user on the current SPA screen.',
            highlightTokens: ['e.preventDefault()']
          },
          {
            lineRange: 'Line 8-9',
            title: 'new FormData() & Object.fromEntries()',
            explanation: 'Converts all named inputs into a clean key-value dictionary.',
            highlightTokens: ['new FormData', 'Object.fromEntries']
          }
        ]
      },
      video: {
        title: 'Mastering Forms, FormData, and Constraint Validation in JavaScript',
        duration: '15:10',
        description: 'Handling form submissions, using FormData for multipart/json payloads, checking validities, and creating accessible error states.',
        keyPoints: [
          'e.preventDefault() in SPAs',
          'Why name attributes are required for FormData',
          'Object.fromEntries(formData.entries())',
          'checkValidity() and custom error messages'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Form Submissions', description: 'Preventing reloads' },
          { time: '04:30', seconds: 270, title: 'The FormData API', description: 'Extracting named fields' },
          { time: '09:45', seconds: 585, title: 'Validation API', description: 'checkValidity and styles' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'FormData eliminates dozens of manual document.getElementById calls in your form handlers.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-08-05',
        title: 'Prevent Form Reload and Extract Input Value',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Add a submit event listener to #sampleForm that prevents the default reload, extracts the "email" input value, and writes it into #submittedEmail.',
        instructions: [
          'Add submit listener to #sampleForm with e.preventDefault()',
          'Extract email with const email = new FormData(e.target).get("email");',
          'Display email in #submittedEmail'
        ],
        starterHtml: `<form id="sampleForm" class="sample-form">
  <input type="email" name="email" placeholder="you@example.com" required>
  <button type="submit">Subscribe</button>
  <p>Submitted: <span id="submittedEmail">None</span></p>
</form>`,
        starterCss: `.sample-form {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
input { padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px; }
button { padding: 0.5rem; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; }`,
        starterJs: `// Intercept form submit and update #submittedEmail
`,
        solutionHtml: `<form id="sampleForm" class="sample-form">
  <input type="email" name="email" placeholder="you@example.com" required>
  <button type="submit">Subscribe</button>
  <p>Submitted: <span id="submittedEmail">None</span></p>
</form>`,
        solutionCss: `.sample-form {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
input { padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px; }
button { padding: 0.5rem; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; }`,
        solutionJs: `const form = document.getElementById("sampleForm");
const out = document.getElementById("submittedEmail");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form as HTMLFormElement);
  const email = data.get("email");
  if (out && email) out.textContent = String(email);
});`,
        hints: [
          'e.preventDefault(); stops the page reload.',
          'const email = new FormData(form).get("email");'
        ],
        testCases: [
          {
            id: 'tc-08-5a',
            description: 'sampleForm submit listener is attached',
            hint: 'Attach submit listener to #sampleForm',
            checkType: 'selector-exists',
            target: '#sampleForm'
          }
        ],
        conceptQuestion: {
          question: 'What HTML attribute MUST be present on an <input> element for it to be captured by new FormData(form)?',
          options: ['name', 'id', 'class', 'placeholder'],
          correctIndex: 0,
          explanation: 'The FormData API exclusively indexes form controls that have a valid name attribute. Inputs lacking a name attribute are skipped.'
        }
      },
      quiz: [
        {
          id: 'q-08-5',
          question: 'Which method converts a FormData object directly into a plain JavaScript key-value object?',
          options: [
            'Object.fromEntries(formData.entries())',
            'formData.toObject()',
            'JSON.parse(formData)',
            'formData.json()'
          ],
          correctIndex: 0,
          explanation: 'Object.fromEntries(formData.entries()) takes the iterable key-value pairs of the FormData instance and transforms them into a standard JavaScript object.'
        }
      ],
      summary: [
        'e.preventDefault() stops default full-page form reloads in SPAs.',
        'new FormData(form) packages all inputs possessing a name attribute.',
        'Object.fromEntries() converts FormData into clean JSON payloads.',
        'HTML5 Constraint Validation provides accessible client-side checks before network dispatch.'
      ],
      relatedTopics: [
        {
          title: 'Working DOM Project: Persistent Task App',
          chapterNumber: '08',
          lessonId: 'ch-08-l-06',
          context: 'Synthesize all Chapter 08 concepts into a fully functional persistent application.'
        }
      ]
    },
    {
      id: 'ch-08-l-06',
      chapterId: 'ch-08',
      number: '8.6',
      slug: 'interactive-dom-capstone-project',
      title: 'Capstone Project: Persistent Task Manager',
      tagline: 'Combine event delegation, localStorage, <template> cloning, and form validation into a robust application',
      durationMinutes: 35,
      learningObjectives: [
        'Synthesize event delegation, localStorage, <template> cloning, and forms into a cohesive production project',
        'Maintain a single source of truth data array synchronized with localStorage',
        'Handle dynamic task additions, status toggles, and item deletions with a single delegated listener',
        'Implement empty states and real-time task counter statistics'
      ],
      theorySections: [
        {
          heading: '1. The State-Driven UI Pattern',
          content: 'In professional front-end architecture, you do not directly manipulate the DOM when things change. Instead, you update an in-memory data array (state), persist it to localStorage, and re-render the UI from that state.',
          bulletPoints: [
            'State: let tasks = [{ id: 1, text: "Deploy App", done: false }];',
            'Synchronize: localStorage.setItem("tasks", JSON.stringify(tasks));',
            'Render: Clear container and stamp items from the <template>'
          ]
        },
        {
          heading: '2. Complete Event Delegation Strategy',
          content: 'A single click listener on the task container handles both checkbox toggling and delete button clicks by inspecting data-action attributes on clicked elements.',
          bulletPoints: [
            'Toggle: e.target.closest("[data-action=toggle]") flips completed status',
            'Delete: e.target.closest("[data-action=delete]") removes item from state array',
            'Save & Re-render: Every action updates state, saves to storage, and re-renders'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Restaurant Order Carousel',
        concept: 'State-Driven UI Rendering',
        story: 'When orders enter the kitchen, the manager writes them on paper tickets and clips them to a rotating carousel (the state). When a chef finishes grilling a steak, they do not shout random words into the dining room; they slide the ticket to the "Done" rail. The expediter looks at the carousel state and knows exactly which trays to carry to which tables.',
        moral: 'State drives the view; keeping state in sync guarantees zero visual bugs.',
        icon: 'CheckSquare'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Complete Persistent Task Application Architecture',
        description: 'End-to-end implementation with state synchronization, template cloning, and event delegation.',
        html: `<div class="task-app-shell">
  <form id="taskForm" class="task-input-bar">
    <input type="text" name="taskText" placeholder="What needs to be done?" required minlength="2">
    <button type="submit">Add Task</button>
  </form>
  
  <div class="task-meta">
    <span>Active Tasks: <strong id="activeCount">0</strong></span>
  </div>

  <ul id="taskContainer" class="task-list"></ul>

  <!-- Reusable Task Item Template -->
  <template id="taskItemTemplate">
    <li class="task-item" data-id="">
      <button class="toggle-btn" data-action="toggle">&#10003;</button>
      <span class="task-label"></span>
      <button class="remove-btn" data-action="delete">&times;</button>
    </li>
  </template>
</div>`,
        css: `.task-app-shell {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  max-width: 480px;
}
.task-input-bar { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.task-input-bar input { flex: 1; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px; }
.task-input-bar button { background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }
.task-meta { font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem; }
.task-list { list-style: none; padding: 0; margin: 0; }
.task-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}
.task-item.completed .task-label { text-decoration: line-through; color: #94a3b8; }
.toggle-btn { background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer; }
.remove-btn { margin-left: auto; background: none; border: none; color: #ef4444; font-size: 1.25rem; cursor: pointer; }`,
        js: `interface Task { id: number; text: string; done: boolean; }
const STORAGE_KEY = "capstone_tasks_v1";

let tasks: Task[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

const form = document.getElementById("taskForm") as HTMLFormElement;
const container = document.getElementById("taskContainer");
const tmpl = document.getElementById("taskItemTemplate") as HTMLTemplateElement;
const countDisplay = document.getElementById("activeCount");

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  if (!container || !tmpl) return;
  
  container.innerHTML = "";
  const frag = document.createDocumentFragment();

  tasks.forEach(t => {
    const clone = tmpl.content.cloneNode(true) as DocumentFragment;
    const li = clone.querySelector(".task-item") as HTMLElement;
    li.dataset.id = String(t.id);
    if (t.done) li.classList.add("completed");
    
    (clone.querySelector(".task-label") as HTMLElement).textContent = t.text;
    frag.appendChild(clone);
  });

  container.appendChild(frag);
  if (countDisplay) {
    countDisplay.textContent = String(tasks.filter(t => !t.done).length);
  }
}

// Delegated action listener
container?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const item = target.closest(".task-item") as HTMLElement;
  if (!item) return;
  const id = Number(item.dataset.id);

  if (target.closest("[data-action=toggle]")) {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    saveAndRender();
  } else if (target.closest("[data-action=delete]")) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
  }
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.elements.namedItem("taskText") as HTMLInputElement;
  if (!input.value.trim()) return;

  tasks.push({ id: Date.now(), text: input.value.trim(), done: false });
  input.value = "";
  saveAndRender();
});

saveAndRender();`,
        breakdown: [
          {
            lineRange: 'Line 4',
            title: 'Hydrate State from LocalStorage',
            explanation: 'Loads existing tasks or falls back to an empty array on startup.',
            highlightTokens: ['JSON.parse', 'localStorage.getItem']
          },
          {
            lineRange: 'Line 11-30',
            title: 'Template Rendering Pipeline',
            explanation: 'Stamps items using the <template> tag and updates active count.',
            highlightTokens: ['tmpl.content.cloneNode(true)', 'saveAndRender']
          },
          {
            lineRange: 'Line 33-47',
            title: 'Delegated Action Handling',
            explanation: 'Handles both toggle and delete actions via a single parent listener.',
            highlightTokens: ['data-action=toggle', 'data-action=delete']
          }
        ]
      },
      video: {
        title: 'Building a Resilient State-Driven Persistent Task Manager',
        duration: '21:00',
        description: 'Complete capstone project build: state design, localStorage sync, template stamping, and event delegation architecture.',
        keyPoints: [
          'State-first UI architecture',
          'Syncing state with localStorage',
          'Delegated item toggling and removal',
          'Active task count aggregation'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'App Architecture', description: 'State vs DOM' },
          { time: '06:00', seconds: 360, title: 'Rendering Loop', description: 'Template stamping' },
          { time: '14:00', seconds: 840, title: 'Delegation & Storage', description: 'Handling user clicks' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'This capstone unites every skill from Chapter 08 into a production-grade application.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-08-06',
        title: 'Implement Task Completion Counter',
        difficulty: 'Intermediate',
        estimatedTime: '15 min',
        prompt: 'Given an array of tasks: [{done: false}, {done: true}, {done: false}], write a function updateCounter() that counts how many are active (done === false) and writes the number into #activeCountDisplay.',
        instructions: [
          'Filter tasks to count those where done === false',
          'Write the count into #activeCountDisplay',
          'Ensure the counter displays "2"'
        ],
        starterHtml: `<div class="counter-box">
  <p>Remaining: <span id="activeCountDisplay">0</span></p>
</div>`,
        starterCss: `.counter-box {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `const tasks = [{ done: false }, { done: true }, { done: false }];
// Write updateCounter function here
`,
        solutionHtml: `<div class="counter-box">
  <p>Remaining: <span id="activeCountDisplay">0</span></p>
</div>`,
        solutionCss: `.counter-box {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `const tasks = [{ done: false }, { done: true }, { done: false }];

function updateCounter() {
  const active = tasks.filter(t => !t.done).length;
  const out = document.getElementById("activeCountDisplay");
  if (out) out.textContent = String(active);
}

updateCounter();`,
        hints: [
          'tasks.filter(t => !t.done).length gives the count of uncompleted tasks.',
          'Update out.textContent = String(active);'
        ],
        testCases: [
          {
            id: 'tc-08-6a',
            description: 'activeCountDisplay has count',
            hint: 'Set active count on #activeCountDisplay',
            checkType: 'selector-exists',
            target: '#activeCountDisplay'
          }
        ],
        conceptQuestion: {
          question: 'Why is separating application state from DOM presentation considered best practice in modern web development?',
          options: [
            'It prevents UI and data from drifting out of sync, and makes saving and testing state straightforward',
            'It makes CSS files smaller',
            'It reduces server bandwidth to zero',
            'It hides the source code from users'
          ],
          correctIndex: 0,
          explanation: 'State-driven architecture ensures that the user interface is a pure reflection of the underlying data, making persistence, testing, and debugging clean and predictable.'
        }
      },
      quiz: [
        {
          id: 'q-08-6',
          question: 'What pattern allows you to handle interactions across dozens of dynamically created task items using only one event listener?',
          options: ['Event Delegation on the parent container', 'Polling with setInterval', 'Multiple recursive setTimeout calls', 'Inline onclick HTML attributes'],
          correctIndex: 0,
          explanation: 'Event Delegation on the parent container listens for bubbling events from all existing and future child elements efficiently.'
        }
      ],
      summary: [
        'State-driven architecture treats data as the single source of truth.',
        'Event delegation handles dynamic elements with minimal memory footprint.',
        'LocalStorage guarantees user tasks and states persist across sessions.',
        'The HTML5 <template> tag stamps reusable components safely without innerHTML risks.'
      ],
      relatedTopics: [
        {
          title: 'Frontend Frameworks & React Architecture',
          chapterNumber: '09',
          lessonId: 'ch-09-l-01',
          context: 'Translate your DOM mastery into modern component frameworks like React and Vite.'
        }
      ]
    }
  ]
};
