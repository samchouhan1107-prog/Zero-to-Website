export interface TagToWordMapping {
  codeSnippet: string;
  tagOrKeyword: string;
  humanWord: string;
  mentalModel: string;
  realLifeAnalogy: string;
  beginnerTip: string;
}

export interface ConceptStone {
  id: string;
  stoneNumber: number;
  title: string;
  category: 'HTML Structure' | 'CSS Layout' | 'JavaScript Logic' | 'DOM Manipulation' | 'Async & APIs';
  stoneIcon: string;
  stoneColor: string;
  tagline: string;
  tagsToWords: TagToWordMapping[];
  practiceExample: {
    title: string;
    description: string;
    html: string;
    css: string;
    js?: string;
    interactiveActionPrompt: string;
  };
}

export const BRAIN_CONCEPT_STONES: ConceptStone[] = [
  {
    id: 'stone-semantic-landmarks',
    stoneNumber: 1,
    title: 'The Semantic Blueprint Stone',
    category: 'HTML Structure',
    stoneIcon: '🏛️',
    stoneColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-500',
    tagline: 'Converting cryptic HTML tags into crystal-clear human architectural spaces.',
    tagsToWords: [
      {
        tagOrKeyword: '<header>',
        codeSnippet: '<header><h1>Storehouse</h1></header>',
        humanWord: 'The Crown / Welcome Banner',
        mentalModel: 'The entrance roof of the building with the logo and identity.',
        realLifeAnalogy: 'The signboard hanging above a storefront.',
        beginnerTip: 'Put your logo, title, or main greeting inside here.',
      },
      {
        tagOrKeyword: '<nav>',
        codeSnippet: '<nav><a href="#home">Home</a></nav>',
        humanWord: 'The Signpost / Map',
        mentalModel: 'Directions guiding visitors to different rooms of the website.',
        realLifeAnalogy: 'The floor directory inside an elevator.',
        beginnerTip: 'Reserve <nav> only for major navigation links.',
      },
      {
        tagOrKeyword: '<main>',
        codeSnippet: '<main><p>Core lesson content</p></main>',
        humanWord: 'The Center Stage',
        mentalModel: 'The unique core reason why the user is reading this specific page.',
        realLifeAnalogy: 'The movie screen inside the theater.',
        beginnerTip: 'There can be only ONE <main> element per webpage!',
      },
      {
        tagOrKeyword: '<section>',
        codeSnippet: '<section><h2>Chapter Summary</h2></section>',
        humanWord: 'Book Chapter / Thematic Zone',
        mentalModel: 'A self-contained chunk of knowledge that always has its own heading.',
        realLifeAnalogy: 'A distinct chapter in a textbook.',
        beginnerTip: 'Always put an <h2> or <h3> heading inside a <section>.',
      },
      {
        tagOrKeyword: '<footer>',
        codeSnippet: '<footer><p>&copy; 2026 WebZone</p></footer>',
        humanWord: 'The Ground Floor / Signoff',
        mentalModel: 'The bottom exit with copyright, links, and contact information.',
        realLifeAnalogy: 'The signature at the bottom of a formal letter.',
        beginnerTip: 'Use for author credits, legal terms, and social links.',
      },
    ],
    practiceExample: {
      title: 'Brain-Friendly Semantic Webpage',
      description: 'See how each tag functions as an architectural room in a modern house.',
      html: `<div style="font-family: sans-serif; padding: 12px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
  <header style="background: #1e293b; padding: 10px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 8px;">
    <strong style="color: #38bdf8;">👑 &lt;header&gt;</strong> The Crown / Logo Room
  </header>
  <nav style="background: #1e293b; padding: 8px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 8px; display: flex; gap: 8px;">
    <span style="color: #a855f7;">🧭 &lt;nav&gt;</span>
    <span style="background: #334155; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Lesson 01</span>
    <span style="background: #334155; padding: 2px 8px; border-radius: 4px; font-size: 11px;">Code Lab</span>
  </nav>
  <main style="background: #1e1b4b; padding: 12px; border-radius: 8px; border: 1px solid #4338ca; margin-bottom: 8px;">
    <strong style="color: #818cf8;">🎭 &lt;main&gt;</strong> The Core Content Stage
    <p style="margin: 6px 0 0 0; font-size: 12px; color: #c7d2fe;">Your brain processes clear semantic rooms 10x faster than 50 generic div tags!</p>
  </main>
  <footer style="background: #1e293b; padding: 8px; border-radius: 8px; border: 1px solid #334155; font-size: 11px; color: #94a3b8;">
    🦶 &lt;footer&gt; WebZone Storehouse Verified Foundation
  </footer>
</div>`,
      css: `/* Click Run or modify tags to see instant room updates */`,
      interactiveActionPrompt: 'Notice how each container wraps its content in a clear semantic zone!',
    },
  },
  {
    id: 'stone-flexbox-flow',
    stoneNumber: 2,
    title: 'The Stretchy Flexbox Stone',
    category: 'CSS Layout',
    stoneIcon: '🤸',
    stoneColor: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-500',
    tagline: 'Translating flex properties into elastic rubber bands that align items smoothly.',
    tagsToWords: [
      {
        tagOrKeyword: 'display: flex',
        codeSnippet: 'display: flex;',
        humanWord: 'Stretchy Rubber-Band Row',
        mentalModel: 'Tells child elements to line up side-by-side like people on a bench.',
        realLifeAnalogy: 'Turning a single file line into an organized seating row.',
        beginnerTip: 'Put this on the parent container to control all children inside it.',
      },
      {
        tagOrKeyword: 'justify-content: space-between',
        codeSnippet: 'justify-content: space-between;',
        humanWord: 'Magnetic Push Apart',
        mentalModel: 'Pushes the first item to the left wall and the last item to the right wall.',
        realLifeAnalogy: 'Two magnets repelling each other to opposite edges of a table.',
        beginnerTip: 'Perfect for navbars with a logo on the left and a button on the right.',
      },
      {
        tagOrKeyword: 'align-items: center',
        codeSnippet: 'align-items: center;',
        humanWord: 'Vertical Height Balancing',
        mentalModel: 'Levels items of different heights so their centers match up perfectly.',
        realLifeAnalogy: 'Lining up people of different heights along an imaginary equator line.',
        beginnerTip: 'Solves the classic "how to vertically center" challenge in one line!',
      },
      {
        tagOrKeyword: 'gap: 1rem',
        codeSnippet: 'gap: 16px;',
        humanWord: 'Personal Breathing Space',
        mentalModel: 'Places an exact buffer between elements without messy manual margins.',
        realLifeAnalogy: 'Safe social distance between parked cars.',
        beginnerTip: 'Always use gap instead of margin-right on child items!',
      },
    ],
    practiceExample: {
      title: 'Rubber-Band Alignment in Action',
      description: 'Watch 3 cards snap into a balanced row with dynamic spacing.',
      html: `<div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 12px; background: #090d16; border-radius: 10px; border: 1px solid #1e293b; font-family: sans-serif;">
  <div style="background: #1e3a8a; color: #93c5fd; padding: 8px 12px; border-radius: 8px; font-weight: bold; font-size: 12px;">Logo</div>
  <div style="display: flex; gap: 6px;">
    <span style="background: #1e293b; color: #cbd5e1; padding: 4px 8px; border-radius: 6px; font-size: 11px;">Lessons</span>
    <span style="background: #1e293b; color: #cbd5e1; padding: 4px 8px; border-radius: 6px; font-size: 11px;">Stones</span>
  </div>
  <button style="background: #3b82f6; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;">Start</button>
</div>`,
      css: `/* Flex container handles dynamic viewport squishing */`,
      interactiveActionPrompt: 'The elements balance naturally regardless of container width.',
    },
  },
  {
    id: 'stone-dom-puppet',
    stoneNumber: 3,
    title: 'The DOM Puppet String Stone',
    category: 'DOM Manipulation',
    stoneIcon: '⚡',
    stoneColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-500',
    tagline: 'Controlling webpage elements using JavaScript like puppet strings.',
    tagsToWords: [
      {
        tagOrKeyword: 'document.querySelector()',
        codeSnippet: 'const btn = document.querySelector("#myBtn");',
        humanWord: 'The Element Megaphone',
        mentalModel: 'Shouts out across the whole page to grab a specific element by name or ID.',
        realLifeAnalogy: 'Calling a friend with a megaphone in a crowded stadium.',
        beginnerTip: 'Remember to include the "#" hash symbol when searching for an ID!',
      },
      {
        tagOrKeyword: 'element.addEventListener()',
        codeSnippet: 'btn.addEventListener("click", () => { ... });',
        humanWord: 'The Security Guard Sensor',
        mentalModel: 'Stands silently waiting for a specific event (like click or keypress) before acting.',
        realLifeAnalogy: 'An automatic motion sensor door opening when someone approaches.',
        beginnerTip: 'The first argument is the event name ("click"), second is the action function.',
      },
      {
        tagOrKeyword: 'element.classList.toggle()',
        codeSnippet: 'card.classList.toggle("active");',
        humanWord: 'The Outfit Switcher',
        mentalModel: 'Slips a style costume on or off without altering the HTML structure.',
        realLifeAnalogy: 'Flipping a light switch on the wall from dark to lit.',
        beginnerTip: 'Much cleaner than editing inline style properties directly!',
      },
    ],
    practiceExample: {
      title: 'Live Puppet Switcher',
      description: 'Click the button to watch JavaScript update the DOM in real time.',
      html: `<div id="dom-box" style="padding: 16px; background: #0f172a; border-radius: 12px; border: 1px solid #334155; text-align: center; font-family: sans-serif; transition: all 0.3s;">
  <span id="dom-emoji" style="font-size: 32px; display: block; margin-bottom: 8px;">🌱</span>
  <h4 id="dom-title" style="margin: 0 0 6px 0; color: #f8fafc; font-size: 14px;">Seed Stage</h4>
  <p id="dom-desc" style="margin: 0 0 12px 0; color: #94a3b8; font-size: 11px;">Waiting for JavaScript interaction sensor...</p>
  <button id="dom-grow-btn" onclick="const e = document.getElementById('dom-emoji'); const t = document.getElementById('dom-title'); const d = document.getElementById('dom-desc'); if (e.innerText === '🌱') { e.innerText = '🌳'; t.innerText = 'Flourishing Tree!'; t.style.color = '#34d399'; d.innerText = 'DOM mutated successfully in browser memory!'; } else { e.innerText = '🌱'; t.innerText = 'Seed Stage'; t.style.color = '#f8fafc'; d.innerText = 'Waiting for JavaScript interaction sensor...'; }" style="background: #10b981; color: #022c22; font-weight: bold; font-size: 12px; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer;">
    Pull DOM String (Click Me)
  </button>
</div>`,
      css: ``,
      interactiveActionPrompt: 'Click the button to witness the DOM mutate live on your screen!',
    },
  },
  {
    id: 'stone-async-cafe',
    stoneNumber: 4,
    title: 'The Async Coffee Shop Stone',
    category: 'Async & APIs',
    stoneIcon: '☕',
    stoneColor: 'from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-500',
    tagline: 'Understanding non-blocking code and network requests with zero confusion.',
    tagsToWords: [
      {
        tagOrKeyword: 'fetch(url)',
        codeSnippet: 'const response = await fetch("/api/data");',
        humanWord: 'Placing the Order',
        mentalModel: 'Sending an order ticket across the Internet to another computer.',
        realLifeAnalogy: 'Ordering a cappuccino at Starbucks and receiving a pickup buzzer.',
        beginnerTip: 'Fetch runs in the background so the rest of your app never freezes.',
      },
      {
        tagOrKeyword: 'await',
        codeSnippet: 'const data = await response.json();',
        humanWord: 'Waiting for the Buzzer',
        mentalModel: 'Pauses this one task until the data arrives, while other tasks keep running.',
        realLifeAnalogy: 'Checking your phone at a cafe table until the buzzer vibrates.',
        beginnerTip: 'You can only use "await" inside a function marked with "async".',
      },
      {
        tagOrKeyword: 'try...catch',
        codeSnippet: 'try { ... } catch (err) { ... }',
        humanWord: 'The Safety Net / Plan B',
        mentalModel: 'A protective bubble so if the internet drops, your app shows a polite message instead of crashing.',
        realLifeAnalogy: 'Carrying an umbrella in case it rains.',
        beginnerTip: 'Always wrap network fetches in try...catch for production reliability.',
      },
    ],
    practiceExample: {
      title: 'Async Simulated Data Fetch',
      description: 'Experience how async functions wait for remote data smoothly.',
      html: `<div style="padding: 14px; background: #1e1b4b; border-radius: 12px; border: 1px solid #4338ca; font-family: sans-serif;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
    <strong style="color: #c7d2fe; font-size: 13px;">☕ Async Order Simulator</strong>
    <span id="order-status" style="font-size: 11px; background: #312e81; color: #a5b4fc; padding: 2px 8px; border-radius: 4px;">Ready to order</span>
  </div>
  <p id="order-result" style="color: #e0e7ff; font-size: 12px; margin: 8px 0;">Click below to dispatch an asynchronous network request.</p>
  <button onclick="const s = document.getElementById('order-status'); const r = document.getElementById('order-result'); s.innerText = 'Brewing data... (1.5s)'; s.style.background = '#854d0e'; s.style.color = '#fef08a'; r.innerText = '☕ Fetching JSON payload over async bridge...'; setTimeout(() => { s.innerText = 'Data Served (200 OK)'; s.style.background = '#065f46'; s.style.color = '#a7f3d0'; r.innerHTML = '<strong>Payload Received:</strong> { &quot;concept&quot;: &quot;Async Mastered&quot;, &quot;latency&quot;: &quot;42ms&quot; }'; }, 1500);" style="background: #a855f7; color: #fff; border: none; padding: 7px 14px; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;">
    Dispatch Async Fetch()
  </button>
</div>`,
      css: ``,
      interactiveActionPrompt: 'Click to see the async state transition from pending to fulfilled!',
    },
  },
];
