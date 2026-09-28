import os
import sys
from templates import create_lesson_html, create_practice_html

# ==========================================
# Chapter 06: JavaScript & DOM Magic (10 Lessons)
# ==========================================
ch06_lessons = [
    {
        "num": "01",
        "dir": "Lesson-01-JavaScript-Introduction",
        "title": "JavaScript Introduction & Runtime",
        "tagline": "Discover how the Google V8 engine interprets code, executes through the call stack, and drives web interactivity.",
        "duration": "25 mins",
        "summary": [
            {"title": "Execution", "desc": "Single-threaded Call Stack"},
            {"title": "Engine", "desc": "Google V8 JIT Compilation"},
            {"title": "Script Loading", "desc": "defer vs async"},
            {"title": "Console", "desc": "console.log & DevTools"}
        ],
        "objectives": [
            "Understand the role of JavaScript in web architecture alongside HTML & CSS",
            "Learn how modern browser engines execute JavaScript through the call stack",
            "Use developer console methods (log, warn, table) for real-time inspection",
            "Prevent render-blocking by applying the defer attribute on script tags"
        ],
        "sections": [
            {
                "heading": "1. What is the Modern JavaScript Engine?",
                "content": "JavaScript is an ECMAScript-standardized programming language that gives dynamic behavior to web documents. Under the hood, modern browsers like Google Chrome and Microsoft Edge use Google's V8 engine to compile JavaScript directly into native machine code using Just-In-Time (JIT) compilation.",
                "bullets": [
                    "Single-Threaded: One call stack executes instructions sequentially without race conditions",
                    "Event Loop: Background Web APIs handle network requests, timers, and user clicks smoothly",
                    "EcmaScript (ES6+): Modern standards provide arrow functions, destructuring, modules, and classes"
                ]
            },
            {
                "heading": "2. Script Placement and Non-Blocking Loading",
                "content": "Placing a plain <script> in the <head> pauses HTML parsing. By adding the defer attribute, the browser downloads the script in parallel and executes it cleanly right after the DOM tree is assembled.",
                "bullets": [
                    "<script defer src='app.js'>: Recommended for predictable DOM readiness and high Lighthouse performance",
                    "<script async src='analytics.js'>: Ideal for independent tracking scripts where order doesn't matter"
                ]
            }
        ],
        "code": """<div style="padding: 20px; text-align: center;">
  <h3 id="headline" style="color: #4f46e5; margin: 0 0 10px;">JavaScript is Running!</h3>
  <p id="timestamp" style="color: #64748b;">Ready for interaction.</p>
  <button id="actionBtn" style="padding: 10px 18px; background: #4f46e5; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Click to Inspect Timestamp</button>
</div>

<script>
  const btn = document.getElementById('actionBtn');
  const timeEl = document.getElementById('timestamp');
  btn.addEventListener('click', () => {
    const now = new Date().toLocaleTimeString();
    timeEl.textContent = 'Last clicked at: ' + now;
    console.log('User clicked at', now);
  });
</script>""",
        "practice": {
            "title": "Interactive Console Logger & Welcome Banner",
            "desc": "Build an interactive greeting card that prints a structured object to console.table() and updates text on the screen.",
            "tasks": [
                "Select the display element using document.getElementById('welcomeText')",
                "Add an event listener to the trigger button",
                "Output student details (name, age, course) to console.table() when clicked",
                "Update the welcome text with your own custom developer moniker"
            ],
            "starter": """<div style="max-width: 420px; margin: 20px auto; padding: 24px; border: 2px solid #e2e8f0; border-radius: 12px; font-family: sans-serif; text-align: center;">
  <h2 id="welcomeText" style="color: #0f172a; margin-top: 0;">Welcome, Future Coder</h2>
  <p style="color: #64748b;">Click the button below to register your session and view telemetry in the browser console.</p>
  <button id="startBtn" style="background: #0284c7; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer;">Register Developer</button>
</div>

<script>
  const startBtn = document.getElementById('startBtn');
  const welcomeText = document.getElementById('welcomeText');

  startBtn.addEventListener('click', () => {
    const studentInfo = {
      name: "Alex Dev",
      skillTrack: "Full-Stack Web Development",
      targetAgeGroup: "15+",
      status: "Actively Coding"
    };

    console.table(studentInfo);
    welcomeText.textContent = "Welcome, " + studentInfo.name + "!";
    welcomeText.style.color = "#0284c7";
  });
</script>"""
        }
    },
    {
        "num": "03",
        "dir": "Lesson-03-Operators-Conditions",
        "title": "Operators, Truthy/Falsy & Conditionals",
        "tagline": "Master comparison operators, strict equality (===), logical operators (&&, ||, ??), and if-else branches.",
        "duration": "30 mins",
        "summary": [
            {"title": "Strict Equality", "desc": "=== vs == (type coercion)"},
            {"title": "Logical", "desc": "&&, ||, and ?? (nullish)"},
            {"title": "Control Flow", "desc": "if, else if, switch"},
            {"title": "Ternary", "desc": "condition ? a : b"}
        ],
        "objectives": [
            "Learn why strict equality (===) protects against implicit type coercion bugs",
            "Understand truthy and falsy values (0, '', null, undefined, NaN)",
            "Construct multi-branch conditional flows with if/else if/else and switch statements",
            "Write concise UI conditionals using ternary operators and short-circuit evaluation"
        ],
        "sections": [
            {
                "heading": "1. Strict vs Loose Equality",
                "content": "Always prefer === and !== over == and !=. Loose equality performs silent type conversion (for example, '0' == 0 is true), which causes unpredictable runtime defects. Strict equality requires both the type and the value to match.",
                "bullets": [
                    "5 === '5' -> false (Number vs String)",
                    "null === undefined -> false (Distinct primitive types)",
                    "false === 0 -> false (Boolean vs Number)"
                ]
            },
            {
                "heading": "2. Logical Operators and Short-Circuiting",
                "content": "Logical AND (&&) returns the first falsy operand or the last operand. Logical OR (||) returns the first truthy operand. Nullish coalescing (??) only falls back when encountering null or undefined (leaving 0 and '' valid).",
                "bullets": [
                    "userRole === 'admin' && showAdminDashboard()",
                    "const displayName = inputName || 'Guest User'",
                    "const count = userCount ?? 0"
                ]
            }
        ],
        "code": """<div style="padding: 20px; font-family: sans-serif; max-width: 440px; margin: auto;">
  <label for="ageInput" style="font-weight: 600; color: #334155;">Enter Age:</label>
  <input type="number" id="ageInput" value="16" style="padding: 8px; width: 80px; margin: 0 10px;">
  <button id="verifyBtn" style="padding: 8px 16px; background: #059669; color: white; border: none; border-radius: 6px; cursor: pointer;">Evaluate Level</button>
  <div id="evalResult" style="margin-top: 16px; padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #166534; font-weight: 600;">Result will appear here.</div>
</div>

<script>
  document.getElementById('verifyBtn').addEventListener('click', () => {
    const age = parseInt(document.getElementById('ageInput').value, 10);
    const resultEl = document.getElementById('evalResult');

    if (isNaN(age) || age < 0) {
      resultEl.textContent = 'Please enter a valid positive number.';
      resultEl.style.color = '#dc2626';
    } else if (age >= 18) {
      resultEl.textContent = 'Adult Developer Track: Access to advanced backend and cloud deployment modules.';
      resultEl.style.color = '#059669';
    } else if (age >= 15) {
      resultEl.textContent = 'Young Developer Track (15+): Ideal foundation for foundational frontend engineering.';
      resultEl.style.color = '#0284c7';
    } else {
      resultEl.textContent = 'Junior Explorer Track: Recommended to start with visual block tools before full code.';
      resultEl.style.color = '#d97706';
    }
  });
</script>""",
        "practice": {
            "title": "Grade & Access Gatekeeper",
            "desc": "Create a discount or course tier evaluator that checks user input and applies conditional badges based on scores.",
            "tasks": [
                "Parse an integer score from the provided input element",
                "Check boundary conditions: 90+ ('Senior Honors'), 75-89 ('Proficient Coder'), <75 ('Practice Needed')",
                "Use strict comparison operators (===, >=, <=)",
                "Style the resulting badge container dynamically with appropriate border and background colors"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 10px; text-align: center;">
  <h3 style="margin-top: 0; color: #1e293b;">Coding Assessment Gate</h3>
  <p style="font-size: 14px; color: #64748b;">Enter your practice challenge points (0-100):</p>
  <input type="number" id="quizScore" placeholder="Score (e.g. 85)" style="padding: 8px; width: 140px; text-align: center; border: 1px solid #94a3b8; border-radius: 6px;">
  <br><br>
  <button id="calcBtn" style="background: #6366f1; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; cursor: pointer;">Calculate Tier</button>
  <div id="badgeCard" style="margin-top: 16px; padding: 12px; border-radius: 8px; font-weight: bold; display: none;"></div>
</div>

<script>
  const calcBtn = document.getElementById('calcBtn');
  const quizInput = document.getElementById('quizScore');
  const badgeCard = document.getElementById('badgeCard');

  calcBtn.addEventListener('click', () => {
    const score = Number(quizInput.value);
    badgeCard.style.display = 'block';

    if (score >= 90) {
      badgeCard.textContent = '🌟 Master Level (Age 15+ Advanced Developer)';
      badgeCard.style.background = '#e0e7ff';
      badgeCard.style.color = '#3730a3';
    } else if (score >= 70) {
      badgeCard.textContent = '⚡ Proficient Apprentice Developer';
      badgeCard.style.background = '#dbeafe';
      badgeCard.style.color = '#1e40af';
    } else {
      badgeCard.textContent = '🌱 Foundation Level - Keep Practicing!';
      badgeCard.style.background = '#fef3c7';
      badgeCard.style.color = '#92400e';
    }
  });
</script>"""
        }
    },
    {
        "num": "04",
        "dir": "Lesson-04-Functions",
        "title": "Functions, Scope & Arrow Syntax",
        "tagline": "Master reusable modular code: declaration vs expression, ES6 arrow functions, default parameters, and closures.",
        "duration": "35 mins",
        "summary": [
            {"title": "Declarations", "desc": "Hoisted function keyword"},
            {"title": "Arrow Syntax", "desc": "() => {} with lexical this"},
            {"title": "Parameters", "desc": "Default values & Rest (...) parameters"},
            {"title": "Scope", "desc": "Global, Function, and Block scope"}
        ],
        "objectives": [
            "Differentiate between function declarations and arrow function expressions",
            "Understand block scoping (let/const) versus function scoping",
            "Write clean functions with single responsibilities and return values",
            "Use closures to preserve private state variables across multiple function invocations"
        ],
        "sections": [
            {
                "heading": "1. The Anatomy of Modern Functions",
                "content": "A function encapsulates a specific task or calculation. Modern JavaScript makes extensive use of ES6 arrow functions for concise logic and predictable lexical binding.",
                "bullets": [
                    "Arrow Function: const add = (a, b) => a + b;",
                    "Implicit Return: Omit curly braces for single-expression returns",
                    "Default Parameters: const greet = (name = 'Developer') => `Hello, ${name}`;"
                ]
            },
            {
                "heading": "2. Understanding Closures",
                "content": "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). Closures allow an inner function to access an outer function's scope even after the outer function has finished executing.",
                "bullets": [
                    "Private State: Creating counter variables that cannot be modified from outside code",
                    "Factory Functions: Creating specialized handlers configured with preset parameters"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; padding: 20px; max-width: 440px; margin: auto; text-align: center;">
  <h3 style="color: #0f172a; margin: 0 0 12px;">Counter with Closure</h3>
  <div id="counterVal" style="font-size: 40px; font-weight: 800; color: #2563eb; margin: 10px 0;">0</div>
  <div style="display: flex; justify-content: center; gap: 10px;">
    <button id="decBtn" style="padding: 8px 16px; border: 1px solid #cbd5e1; background: white; border-radius: 6px; cursor: pointer; font-weight: bold;">- 1</button>
    <button id="incBtn" style="padding: 8px 16px; border: none; background: #2563eb; color: white; border-radius: 6px; cursor: pointer; font-weight: bold;">+ 1</button>
    <button id="resetBtn" style="padding: 8px 16px; border: 1px solid #f87171; color: #dc2626; background: white; border-radius: 6px; cursor: pointer;">Reset</button>
  </div>
</div>

<script>
  // Closure Factory
  function createCounter(initial = 0) {
    let count = initial;
    return {
      increment: () => ++count,
      decrement: () => --count,
      reset: () => { count = initial; return count; },
      get: () => count
    };
  }

  const myCounter = createCounter(0);
  const display = document.getElementById('counterVal');

  document.getElementById('incBtn').onclick = () => { display.textContent = myCounter.increment(); };
  document.getElementById('decBtn').onclick = () => { display.textContent = myCounter.decrement(); };
  document.getElementById('resetBtn').onclick = () => { display.textContent = myCounter.reset(); };
</script>""",
        "practice": {
            "title": "Currency & Tax Calculator Function",
            "desc": "Create a reusable function that calculates net and gross totals with a configurable tax percentage.",
            "tasks": [
                "Define an arrow function calculateTotal(subtotal, taxRate = 0.08)",
                "Calculate sales tax and total amount rounded to 2 decimal places using .toFixed(2)",
                "Attach event listener to the calculate button",
                "Render a clean itemized receipt into the result container"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 420px; margin: 20px auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
  <h3 style="margin-top: 0; color: #1e293b;">Price Calculator</h3>
  <label style="font-size: 14px; color: #475569;">Item Subtotal ($):</label><br>
  <input type="number" id="subtotalInput" value="50" style="padding: 8px; width: 100%; box-sizing: border-box; margin: 6px 0 14px; border: 1px solid #cbd5e1; border-radius: 6px;">
  
  <label style="font-size: 14px; color: #475569;">Tax Rate (Decimal e.g. 0.07):</label><br>
  <input type="number" step="0.01" id="taxInput" value="0.08" style="padding: 8px; width: 100%; box-sizing: border-box; margin: 6px 0 14px; border: 1px solid #cbd5e1; border-radius: 6px;">

  <button id="computeBtn" style="width: 100%; background: #0d9488; color: white; padding: 10px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Calculate Total</button>

  <div id="receiptBox" style="margin-top: 16px; padding: 14px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; font-size: 14px; line-height: 1.6;">
    Enter values above and click calculate.
  </div>
</div>

<script>
  const computeBtn = document.getElementById('computeBtn');
  const subtotalInput = document.getElementById('subtotalInput');
  const taxInput = document.getElementById('taxInput');
  const receiptBox = document.getElementById('receiptBox');

  // Task: Implement the pure calculation function
  const calculateTotal = (subtotal, taxRate = 0.08) => {
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2)
    };
  };

  computeBtn.addEventListener('click', () => {
    const sub = parseFloat(subtotalInput.value) || 0;
    const rate = parseFloat(taxInput.value) || 0;
    const res = calculateTotal(sub, rate);

    receiptBox.innerHTML = `
      <strong>Itemized Receipt</strong><br>
      Subtotal: $${res.subtotal}<br>
      Tax (${(rate * 100).toFixed(1)}%): $${res.tax}<br>
      <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 8px 0;">
      <strong style="color: #0d9488; font-size: 16px;">Final Total: $${res.total}</strong>
    `;
  });
</script>"""
        }
    }
]

# We will also define Lessons 05 to 10 for Chapter 06:
ch06_lessons_extended = [
    {
        "num": "05",
        "dir": "Lesson-05-Arrays-Objects",
        "title": "Arrays, Objects & Modern Data Structures",
        "tagline": "Work with structured data: map(), filter(), reduce(), destructuring, spread operators, and JSON.",
        "duration": "40 mins",
        "summary": [
            {"title": "Iterators", "desc": "map, filter, find, some, every"},
            {"title": "Destructuring", "desc": "const { title } = lesson;"},
            {"title": "Spread", "desc": "[...items] and {...props}"},
            {"title": "JSON", "desc": "JSON.stringify and JSON.parse"}
        ],
        "objectives": [
            "Store and transform collections with map() and filter() without mutating originals",
            "Use object and array destructuring for clean, readable variable extraction",
            "Merge and clone arrays and objects using the spread operator (...)",
            "Serialize and deserialize client data with JSON.stringify and JSON.parse"
        ],
        "sections": [
            {
                "heading": "1. Declarative Array Iteration",
                "content": "Rather than writing classic imperative for-loops, modern frontend engineers use immutable functional array methods.",
                "bullets": [
                    "map(): Creates a new array with the results of calling a provided function on every element",
                    "filter(): Creates a new array with all elements that pass the test implemented by the function",
                    "find(): Returns the first element that satisfies the testing condition",
                    "reduce(): Executes a reducer function on each element, resulting in a single output value"
                ]
            },
            {
                "heading": "2. Modern Destructuring and Spread Syntax",
                "content": "Destructuring extracts properties directly into standalone variables. The spread operator shallow-copies elements cleanly.",
                "bullets": [
                    "const { name, level } = user; (Direct property unpacking)",
                    "const updatedList = [...oldList, newItem]; (Pure immutable addition)",
                    "const mergedUser = { ...user, role: 'admin' }; (Immutable attribute override)"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; max-width: 440px; margin: auto; padding: 20px;">
  <h4 style="margin: 0 0 10px; color: #1e293b;">Active Learning Modules</h4>
  <ul id="courseList" style="list-style: none; padding: 0; margin: 0;"></ul>
  <div style="margin-top: 14px;">
    <button id="filterBtn" style="padding: 8px 14px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px;">Show Only Advanced (Age 15+)</button>
    <button id="resetListBtn" style="padding: 8px 14px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; margin-left: 6px;">Show All</button>
  </div>
</div>

<script>
  const modules = [
    { title: "HTML5 Semantic Web", level: "Beginner", hours: 2 },
    { title: "CSS Grid Architecture", level: "Advanced", hours: 4 },
    { title: "JavaScript Call Stack", level: "Advanced", hours: 5 },
    { title: "Flexbox Layouts", level: "Beginner", hours: 3 }
  ];

  const listEl = document.getElementById('courseList');

  function render(items) {
    listEl.innerHTML = items.map(item => `
      <li style="padding: 10px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between;">
        <span><strong>${item.title}</strong> (${item.hours} hrs)</span>
        <span style="font-size: 12px; padding: 2px 8px; border-radius: 4px; background: ${item.level === 'Advanced' ? '#fee2e2; color: #991b1b;' : '#e0f2fe; color: #075985;'}">${item.level}</span>
      </li>
    `).join('');
  }

  render(modules);
  document.getElementById('filterBtn').onclick = () => render(modules.filter(m => m.level === 'Advanced'));
  document.getElementById('resetListBtn').onclick = () => render(modules);
</script>""",
        "practice": {
            "title": "Inventory & Price Filter System",
            "desc": "Build a product inventory search using JavaScript array filter() and map() that updates dynamically.",
            "tasks": [
                "Create an array of at least 4 product objects with id, name, category, and price",
                "Use .filter() to find items matching category or price under $50",
                "Use .map() to construct formatted HTML list items",
                "Render the total count of matched products in the summary bar"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 440px; margin: 20px auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h3 style="margin-top: 0; color: #0f172a;">Dev Equipment Catalog</h3>
  <div style="display: flex; gap: 8px; margin-bottom: 12px;">
    <button id="allBtn" style="padding: 6px 12px; border: 1px solid #94a3b8; background: #f8fafc; border-radius: 6px; cursor: pointer;">All</button>
    <button id="budgetBtn" style="padding: 6px 12px; border: 1px solid #94a3b8; background: #f8fafc; border-radius: 6px; cursor: pointer;">Under $50</button>
    <button id="hardwareBtn" style="padding: 6px 12px; border: 1px solid #94a3b8; background: #f8fafc; border-radius: 6px; cursor: pointer;">Peripherals</button>
  </div>
  <div id="productGrid" style="display: flex; flex-direction: column; gap: 8px;"></div>
  <p id="itemCount" style="font-size: 12px; color: #64748b; margin-top: 12px;"></p>
</div>

<script>
  const products = [
    { id: 1, name: "Mechanical Keyboard", price: 79, cat: "peripherals" },
    { id: 2, name: "Optical Mouse", price: 29, cat: "peripherals" },
    { id: 3, name: "Desk Mat", price: 19, cat: "accessories" },
    { id: 4, name: "USB-C Multi-Hub", price: 45, cat: "accessories" },
    { id: 5, name: "Monitor Arm", price: 89, cat: "furniture" }
  ];

  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('itemCount');

  function showProducts(items) {
    grid.innerHTML = items.map(p => `
      <div style="padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
        <div><strong>${p.name}</strong> <span style="font-size: 11px; color: #64748b;">[${p.cat}]</span></div>
        <div style="color: #059669; font-weight: bold;">$${p.price}</div>
      </div>
    `).join('');
    countEl.textContent = `Showing ${items.length} of ${products.length} products.`;
  }

  showProducts(products);

  document.getElementById('allBtn').onclick = () => showProducts(products);
  document.getElementById('budgetBtn').onclick = () => showProducts(products.filter(p => p.price < 50));
  document.getElementById('hardwareBtn').onclick = () => showProducts(products.filter(p => p.cat === 'peripherals'));
</script>"""
        }
    },
    {
        "num": "06",
        "dir": "Lesson-06-Loops",
        "title": "Loops, Iteration & Performance",
        "tagline": "Master repetition: for, while, for...of, for...in, break, continue, and avoiding blocking the main thread.",
        "duration": "30 mins",
        "summary": [
            {"title": "for Loop", "desc": "Indexed counter iteration"},
            {"title": "for...of", "desc": "Clean iterable sequence traversal"},
            {"title": "for...in", "desc": "Enumerable object key reflection"},
            {"title": "while/do", "desc": "Condition-driven loops"}
        ],
        "objectives": [
            "Use for...of loops for intuitive iteration over arrays, strings, and NodeLists",
            "Safely use while and do...while loops with guaranteed termination conditions",
            "Control flow cleanly using break and continue statements",
            "Understand why expensive loops should not block the browser render frame (60fps)"
        ],
        "sections": [
            {
                "heading": "1. Selecting the Right Loop for the Job",
                "content": "JavaScript offers multiple looping primitives. Choosing the most idiomatic construct improves readability and minimizes off-by-one errors.",
                "bullets": [
                    "for (const item of array): Best for arrays, Sets, and Maps",
                    "for (const key in object): Best for inspecting object properties (pair with Object.hasOwn)",
                    "for (let i = 0; i < n; i++): Best when the index position is directly needed for step calculations"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; padding: 20px; max-width: 420px; margin: auto;">
  <h4 style="margin-top: 0; color: #1e293b;">Generate Number Matrix</h4>
  <input type="number" id="rowsInput" value="5" min="1" max="10" style="padding: 6px; width: 60px;">
  <button id="genBtn" style="padding: 6px 12px; background: #0284c7; color: white; border: none; border-radius: 6px; cursor: pointer;">Generate</button>
  <div id="gridOutput" style="margin-top: 14px; font-family: monospace; line-height: 1.6; background: #f8fafc; padding: 12px; border-radius: 8px;"></div>
</div>

<script>
  document.getElementById('genBtn').onclick = () => {
    const rows = parseInt(document.getElementById('rowsInput').value, 10) || 3;
    let output = '';
    for (let r = 1; r <= rows; r++) {
      let line = '';
      for (let c = 1; c <= r; c++) {
        line += '★ ';
      }
      output += line + '<br>';
    }
    document.getElementById('gridOutput').innerHTML = output;
  };
</script>""",
        "practice": {
            "title": "Prime Number & Factor Finder",
            "desc": "Write a script that loops through numbers from 1 to N and identifies prime numbers or multiples.",
            "tasks": [
                "Read an upper bound integer N from the user input",
                "Use a loop with an internal conditional to check divisibility",
                "Accumulate matched numbers into a formatted list",
                "Display results with distinct colored tags"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 420px; margin: 20px auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; text-align: center;">
  <h3 style="margin-top: 0; color: #1e293b;">FizzBuzz Multiples Generator</h3>
  <p style="font-size: 13px; color: #64748b;">Generate sequence up to:</p>
  <input type="number" id="limitInput" value="20" min="5" max="50" style="padding: 8px; width: 80px; text-align: center; border: 1px solid #94a3b8; border-radius: 6px;">
  <button id="runLoopBtn" style="padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-left: 8px;">Generate</button>
  <div id="resultsContainer" style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 6px; justify-content: center;"></div>
</div>

<script>
  document.getElementById('runLoopBtn').onclick = () => {
    const limit = parseInt(document.getElementById('limitInput').value, 10) || 15;
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    for (let i = 1; i <= limit; i++) {
      let text = i;
      let bg = '#e2e8f0';
      let color = '#334155';

      if (i % 15 === 0) {
        text = 'FizzBuzz'; bg = '#fef08a'; color = '#854d0e';
      } else if (i % 3 === 0) {
        text = 'Fizz'; bg = '#bbf7d0'; color = '#166534';
      } else if (i % 5 === 0) {
        text = 'Buzz'; bg = '#fed7aa'; color = '#9a3412';
      }

      const badge = document.createElement('span');
      badge.style.cssText = `padding: 4px 8px; font-size: 12px; font-weight: bold; border-radius: 4px; background: ${bg}; color: ${color};`;
      badge.textContent = text;
      container.appendChild(badge);
    }
  };
</script>"""
        }
    },
    {
        "num": "07",
        "dir": "Lesson-07-DOM-Manipulation",
        "title": "DOM Selection, Creation & Modification",
        "tagline": "Master the Document Object Model: querySelector, createElement, appendChild, classList, and attributes.",
        "duration": "40 mins",
        "summary": [
            {"title": "Selection", "desc": "querySelector & querySelectorAll"},
            {"title": "Creation", "desc": "document.createElement"},
            {"title": "Insertion", "desc": "append, prepend, insertAdjacentHTML"},
            {"title": "Classes", "desc": "classList.add, remove, toggle"}
        ],
        "objectives": [
            "Traverse and select elements using standard CSS selector strings",
            "Construct new DOM nodes dynamically and mount them to the page tree",
            "Manipulate CSS classes cleanly using element.classList methods",
            "Understand innerHTML security risks (XSS) and when to use textContent instead"
        ],
        "sections": [
            {
                "heading": "1. Modern DOM Query Methods",
                "content": "Forget legacy getElementsByClassName. Modern web standards provide document.querySelector (which matches the first element matching a CSS selector) and document.querySelectorAll (which returns a static NodeList).",
                "bullets": [
                    "const mainHeader = document.querySelector('header.site-nav h1');",
                    "const cards = document.querySelectorAll('.card-item');",
                    "NodeList iteration: cards.forEach(card => ...)"
                ]
            },
            {
                "heading": "2. Safe Element Construction vs innerHTML",
                "content": "Using innerHTML with untrusted user input introduces Cross-Site Scripting (XSS) vulnerabilities. Always use document.createElement and set textContent when rendering user-submitted text.",
                "bullets": [
                    "Safe: const el = document.createElement('div'); el.textContent = userInput;",
                    "Safe class toggle: el.classList.toggle('active-state');",
                    "Safe attribute removal: el.removeAttribute('disabled');"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; max-width: 440px; margin: auto; padding: 20px;">
  <div style="display: flex; gap: 8px;">
    <input type="text" id="taskInput" placeholder="Add new learning objective..." style="flex: 1; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
    <button id="addTaskBtn" style="padding: 8px 14px; background: #059669; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Add</button>
  </div>
  <ul id="taskList" style="list-style: none; padding: 0; margin-top: 16px; display: flex; flex-direction: column; gap: 6px;"></ul>
</div>

<script>
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  addBtn.onclick = () => {
    const val = taskInput.value.trim();
    if (!val) return;

    const li = document.createElement('li');
    li.style.cssText = 'padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;';

    const span = document.createElement('span');
    span.textContent = val;

    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.style.cssText = 'border: none; background: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 4px;';
    delBtn.onclick = () => li.remove();

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();
  };
</script>""",
        "practice": {
            "title": "Interactive Notification & Alert Banner Manager",
            "desc": "Build a dynamic toast notification generator that appends alert messages to the screen and auto-dismisses them after a timeout.",
            "tasks": [
                "Select the toast container element",
                "Create a new toast <div> on button click with message and status style",
                "Append the toast element to the active notification container",
                "Use setTimeout() to smoothly fade out and remove the element after 3 seconds"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 440px; margin: 20px auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h3 style="margin-top: 0; color: #1e293b;">Toast Alert Generator</h3>
  <div style="display: flex; gap: 8px; margin-bottom: 16px;">
    <button id="successBtn" style="padding: 8px 14px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Success Toast</button>
    <button id="warnBtn" style="padding: 8px 14px; background: #f59e0b; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Warning Toast</button>
  </div>
  <div id="toastArea" style="display: flex; flex-direction: column; gap: 8px;"></div>
</div>

<script>
  function showToast(message, color, bg) {
    const toastArea = document.getElementById('toastArea');
    const toast = document.createElement('div');
    toast.style.cssText = `padding: 10px 14px; border-radius: 6px; font-size: 13px; font-weight: 600; color: ${color}; background: ${bg}; border: 1px solid ${color}; transition: opacity 0.3s;`;
    toast.textContent = message;
    toastArea.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  document.getElementById('successBtn').onclick = () => showToast('✔ Lesson progress saved successfully!', '#065f46', '#d1fae5');
  document.getElementById('warnBtn').onclick = () => showToast('⚠ Sandbox code has unsaved modifications.', '#92400e', '#fef3c7');
</script>"""
        }
    },
    {
        "num": "08",
        "dir": "Lesson-08-Events",
        "title": "Events, Listeners & Event Bubbling",
        "tagline": "Master user interaction: addEventListener, Event object, event.preventDefault(), stopPropagation, and event delegation.",
        "duration": "35 mins",
        "summary": [
            {"title": "Listeners", "desc": "addEventListener('click', fn)"},
            {"title": "Event Object", "desc": "e.target, e.currentTarget, e.key"},
            {"title": "Propagation", "desc": "Capturing -> Target -> Bubbling"},
            {"title": "Delegation", "desc": "Single listener on parent"}
        ],
        "objectives": [
            "Attach listeners to multiple user actions: click, input, keydown, submit, and change",
            "Understand event propagation phases: capture and bubbling",
            "Stop unintended navigation or reloads with event.preventDefault()",
            "Apply event delegation to handle dynamically created child elements efficiently"
        ],
        "sections": [
            {
                "heading": "1. Event Delegation: The Professional Pattern",
                "content": "Attaching 1,000 event listeners to 1,000 list items consumes excess memory. By attaching a single listener to the parent element and inspecting event.target, you handle all current and future child clicks effortlessly.",
                "bullets": [
                    "parent.addEventListener('click', (e) => { if (e.target.matches('.item')) ... });",
                    "Massive performance gain and zero memory leaks for dynamic tables/lists"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; max-width: 440px; margin: auto; padding: 20px;">
  <h4 style="margin: 0 0 10px; color: #1e293b;">Interactive Skill Tags (Click to Toggle)</h4>
  <div id="tagContainer" style="display: flex; flex-wrap: wrap; gap: 8px; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
    <span class="skill-tag" style="padding: 6px 12px; border-radius: 20px; background: #e2e8f0; color: #334155; font-size: 13px; cursor: pointer; user-select: none;">HTML5</span>
    <span class="skill-tag" style="padding: 6px 12px; border-radius: 20px; background: #e2e8f0; color: #334155; font-size: 13px; cursor: pointer; user-select: none;">CSS Grid</span>
    <span class="skill-tag" style="padding: 6px 12px; border-radius: 20px; background: #e2e8f0; color: #334155; font-size: 13px; cursor: pointer; user-select: none;">JavaScript</span>
    <span class="skill-tag" style="padding: 6px 12px; border-radius: 20px; background: #e2e8f0; color: #334155; font-size: 13px; cursor: pointer; user-select: none;">Git & GitHub</span>
  </div>
  <p id="selectedStatus" style="font-size: 13px; color: #64748b; margin-top: 10px;">0 skills selected.</p>
</div>

<script>
  const tagContainer = document.getElementById('tagContainer');
  const statusEl = document.getElementById('selectedStatus');

  // Single delegated listener on parent!
  tagContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('skill-tag')) {
      const isSelected = e.target.dataset.selected === 'true';
      if (isSelected) {
        e.target.dataset.selected = 'false';
        e.target.style.background = '#e2e8f0';
        e.target.style.color = '#334155';
      } else {
        e.target.dataset.selected = 'true';
        e.target.style.background = '#4f46e5';
        e.target.style.color = 'white';
      }
      const count = tagContainer.querySelectorAll('[data-selected="true"]').length;
      statusEl.textContent = `${count} skill(s) selected for development portfolio.`;
    }
  });
</script>""",
        "practice": {
            "title": "Interactive FAQ Accordion with Event Delegation",
            "desc": "Build an expandable FAQ list where clicking any question toggles the answer visibility using a single delegated listener.",
            "tasks": [
                "Attach an event listener to the parent .accordion container",
                "Check if event.target has class .faq-header",
                "Toggle display or class on the sibling .faq-body",
                "Close other open questions (single open accordion pattern)"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 440px; margin: 20px auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h3 style="margin-top: 0; color: #0f172a;">Developer Track FAQ</h3>
  <div id="faqList" style="display: flex; flex-direction: column; gap: 8px;">
    <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
      <button class="faq-btn" style="width: 100%; text-align: left; padding: 12px; background: #f8fafc; border: none; font-weight: bold; cursor: pointer;">What is the age recommendation for this course?</button>
      <div class="faq-content" style="padding: 12px; font-size: 14px; color: #475569; display: none; border-top: 1px solid #e2e8f0;">This course is optimized for learners aged 15 and older, covering real industry tools, syntax, and workflows.</div>
    </div>
    <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
      <button class="faq-btn" style="width: 100%; text-align: left; padding: 12px; background: #f8fafc; border: none; font-weight: bold; cursor: pointer;">Do I need prior coding experience?</button>
      <div class="faq-content" style="padding: 12px; font-size: 14px; color: #475569; display: none; border-top: 1px solid #e2e8f0;">No, Chapter 00 and 01 teach core development environments from complete scratch.</div>
    </div>
  </div>
</div>

<script>
  document.getElementById('faqList').addEventListener('click', (e) => {
    if (e.target.classList.contains('faq-btn')) {
      const content = e.target.nextElementSibling;
      const isOpen = content.style.display === 'block';
      content.style.display = isOpen ? 'none' : 'block';
      e.target.style.background = isOpen ? '#f8fafc' : '#ede9fe';
    }
  });
</script>"""
        }
    },
    {
        "num": "09",
        "dir": "Lesson-09-Forms-Validation",
        "title": "Forms, Input Handling & Real-time Validation",
        "tagline": "Collect and validate user input: FormData, preventDefault(), regex verification, and immediate feedback.",
        "duration": "35 mins",
        "summary": [
            {"title": "Submit Event", "desc": "form.addEventListener('submit')"},
            {"title": "Prevention", "desc": "e.preventDefault() to stop reloads"},
            {"title": "FormData", "desc": "new FormData(form) extraction"},
            {"title": "Validation", "desc": "RegEx and Constraint API"}
        ],
        "objectives": [
            "Intercept form submissions and prevent default full-page browser reloads",
            "Read input values using FormData and element.value",
            "Validate email addresses, password strength, and mandatory fields in real time",
            "Provide accessible inline error messages and visual feedback indicators"
        ],
        "sections": [
            {
                "heading": "1. Modern Client-Side Validation",
                "content": "Users appreciate instant feedback. By combining HTML5 constraint validation attributes (required, minlength, type='email') with JavaScript input listeners, you guide the user through error-free data submission.",
                "bullets": [
                    "Live checking on 'input' event for immediate typing validation",
                    "Final verification on 'submit' event before dispatching to API"
                ]
            }
        ],
        "code": """<form id="signupForm" style="font-family: sans-serif; max-width: 400px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 10px;">
  <h3 style="margin-top: 0; color: #1e293b;">Developer Registration</h3>
  <label style="font-size: 13px; font-weight: 600; color: #475569;">Email Address:</label><br>
  <input type="email" id="emailField" required style="width: 100%; box-sizing: border-box; padding: 8px; margin: 4px 0 2px; border: 1px solid #94a3b8; border-radius: 6px;">
  <span id="emailError" style="font-size: 12px; color: #dc2626; display: none;">Please enter a valid email address.</span>
  <br><br>
  <button type="submit" style="width: 100%; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Register</button>
  <div id="formSuccess" style="display: none; margin-top: 12px; padding: 10px; background: #dcfce7; color: #15803d; border-radius: 6px; font-size: 13px; text-align: center;">Registration successful!</div>
</form>

<script>
  const form = document.getElementById('signupForm');
  const email = document.getElementById('emailField');
  const emailError = document.getElementById('emailError');
  const successBox = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValid = email.value.includes('@') && email.value.includes('.');
    if (!isValid) {
      emailError.style.display = 'block';
      email.style.borderColor = '#dc2626';
    } else {
      emailError.style.display = 'none';
      email.style.borderColor = '#16a34a';
      successBox.style.display = 'block';
      form.reset();
    }
  });
</script>""",
        "practice": {
            "title": "Password Strength & Match Validator",
            "desc": "Build a registration credential checker that inspects length, special characters, and matching confirm password.",
            "tasks": [
                "Listen to 'input' event on password fields",
                "Evaluate criteria: 8+ characters, contains number, passwords match",
                "Update a color-coded strength bar (Red -> Yellow -> Green)",
                "Enable submit button only when all criteria pass"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h3 style="margin-top: 0; color: #0f172a;">Password Verification Gate</h3>
  <label style="font-size: 13px; color: #475569;">Enter Password:</label>
  <input type="password" id="pwd" placeholder="Min 8 characters" style="width: 100%; box-sizing: border-box; padding: 8px; margin: 4px 0 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
  <div id="strengthBar" style="height: 6px; width: 0%; background: #ef4444; border-radius: 3px; transition: all 0.3s; margin-bottom: 8px;"></div>
  <p id="pwdFeedback" style="font-size: 12px; color: #64748b; margin: 0;">Password is too short.</p>
</div>

<script>
  const pwd = document.getElementById('pwd');
  const bar = document.getElementById('strengthBar');
  const feedback = document.getElementById('pwdFeedback');

  pwd.addEventListener('input', () => {
    const val = pwd.value;
    if (val.length === 0) {
      bar.style.width = '0%';
      feedback.textContent = 'Enter password.';
    } else if (val.length < 6) {
      bar.style.width = '30%';
      bar.style.background = '#ef4444';
      feedback.textContent = 'Weak: needs more characters.';
    } else if (val.length < 10 || !/\d/.test(val)) {
      bar.style.width = '65%';
      bar.style.background = '#f59e0b';
      feedback.textContent = 'Medium: add numbers or symbols.';
    } else {
      bar.style.width = '100%';
      bar.style.background = '#10b981';
      feedback.textContent = 'Strong password! Ready to proceed.';
    }
  });
</script>"""
        }
    },
    {
        "num": "10",
        "dir": "Lesson-10-Mini-Project",
        "title": "Chapter 06 Capstone: Interactive Web App",
        "tagline": "Synthesize all Chapter 06 concepts: state management, event handling, DOM rendering, and local persistence.",
        "duration": "50 mins",
        "summary": [
            {"title": "Architecture", "desc": "State -> Render -> Event loop"},
            {"title": "Persistence", "desc": "localStorage client store"},
            {"title": "Synthesis", "desc": "DOM, Arrays, and Functions"},
            {"title": "Outcome", "desc": "Interactive Pomodoro / Task Manager"}
        ],
        "objectives": [
            "Structure an application around a single source of truth (state object)",
            "Persist application state across browser reloads using localStorage",
            "Handle user interactions cleanly without DOM/state desynchronization",
            "Deliver a complete, production-ready interactive micro-application"
        ],
        "sections": [
            {
                "heading": "1. The Single Source of Truth Pattern",
                "content": "Rather than scraping data directly from HTML tags, maintain your state in JavaScript data structures (arrays and objects). When an action occurs, update the state, save to localStorage, and re-render the view.",
                "bullets": [
                    "State: let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');",
                    "Update: tasks.push(newTask);",
                    "Persist & Render: saveTasks(); renderUI();"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; max-width: 440px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white;">
  <h3 style="margin-top: 0; color: #1e293b; display: flex; justify-content: space-between;">
    <span>Quick Task Tracker</span>
    <span id="badgeCount" style="font-size: 12px; background: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 12px;">0 items</span>
  </h3>
  <div style="display: flex; gap: 8px; margin-bottom: 12px;">
    <input type="text" id="newInput" placeholder="New task..." style="flex: 1; padding: 8px; border: 1px solid #94a3b8; border-radius: 6px;">
    <button id="addBtn" style="padding: 8px 14px; background: #4f46e5; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Add</button>
  </div>
  <div id="todoContainer" style="display: flex; flex-direction: column; gap: 6px;"></div>
</div>

<script>
  let items = ['Read Chapter 06', 'Complete Practice Sandbox'];
  const input = document.getElementById('newInput');
  const container = document.getElementById('todoContainer');
  const badge = document.getElementById('badgeCount');

  function render() {
    badge.textContent = items.length + ' items';
    container.innerHTML = items.map((t, idx) => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
        <span>${t}</span>
        <button onclick="removeItem(${idx})" style="border: none; background: none; color: #ef4444; font-weight: bold; cursor: pointer;">✕</button>
      </div>
    `).join('');
  }

  window.removeItem = (idx) => { items.splice(idx, 1); render(); };
  document.getElementById('addBtn').onclick = () => {
    if (input.value.trim()) { items.push(input.value.trim()); input.value = ''; render(); }
  };
  render();
</script>""",
        "practice": {
            "title": "Interactive Study Timer & Focus Counter",
            "desc": "Build a focus timer using setInterval, clearInterval, and sound or visual celebration upon completion.",
            "tasks": [
                "Implement a 25-minute Pomodoro timer countdown with Start, Pause, and Reset controls",
                "Format seconds and minutes to always show leading zeros (e.g. 05:00)",
                "Update document.title dynamically with remaining time",
                "Trigger a visual completion banner when the countdown reaches 00:00"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 400px; margin: 20px auto; padding: 24px; border: 1px solid #cbd5e1; border-radius: 12px; text-align: center;">
  <h3 style="margin-top: 0; color: #0f172a;">Developer Focus Timer</h3>
  <div id="timerDisplay" style="font-size: 48px; font-weight: 900; color: #0284c7; margin: 16px 0;">25:00</div>
  <div style="display: flex; justify-content: center; gap: 10px;">
    <button id="startTimerBtn" style="padding: 10px 20px; background: #0284c7; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Start</button>
    <button id="pauseTimerBtn" style="padding: 10px 20px; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 8px; font-weight: bold; cursor: pointer;">Pause</button>
    <button id="resetTimerBtn" style="padding: 10px 20px; background: #fee2e2; color: #991b1b; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Reset</button>
  </div>
</div>

<script>
  let secondsLeft = 25 * 60;
  let timerInterval = null;
  const display = document.getElementById('timerDisplay');

  function updateDisplay() {
    const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const secs = String(secondsLeft % 60).padStart(2, '0');
    display.textContent = `${mins}:${secs}`;
  }

  document.getElementById('startTimerBtn').onclick = () => {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        display.textContent = "Done! 🎉";
      }
    }, 1000);
  };

  document.getElementById('pauseTimerBtn').onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;
  };

  document.getElementById('resetTimerBtn').onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    secondsLeft = 25 * 60;
    updateDisplay();
  };
</script>"""
        }
    }
]

# Write Chapter 06 lessons and practices
ch06_base = "Chapters/Chapter-06-JavaScript"
all_ch06 = ch06_lessons + ch06_lessons_extended

for item in all_ch06:
    ldir = os.path.join(ch06_base, item["dir"])
    os.makedirs(ldir, exist_ok=True)
    
    # lesson.html
    lhtml = create_lesson_html(
        "06", "Chapter 06: JavaScript", item["num"], item["title"],
        item["tagline"], item["duration"], item["summary"], item["objectives"],
        item["sections"], item["code"]
    )
    with open(os.path.join(ldir, "lesson.html"), "w", encoding="utf-8") as f:
        f.write(lhtml)

    # practice.html
    phtml = create_practice_html(
        "06", "Chapter 06: JavaScript", item["num"], item["practice"]["title"],
        item["practice"]["desc"], item["practice"]["tasks"], item["practice"]["starter"]
    )
    with open(os.path.join(ldir, "practice.html"), "w", encoding="utf-8") as f:
        f.write(phtml)

print(f"Generated {len(all_ch06)} lessons and practice files for Chapter 06!")
