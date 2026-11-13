import { Chapter } from '../../../utils/types';

export const cssModule01: Chapter = {
  id: 'css-mod-01',
  number: '1',
  badge: 'CSS 01',
  slug: 'modern-css-foundations',
  title: 'Modern CSS Foundations',
  subtitle: 'Rendering Engines, Specificity Mathematics, Cascade Layers & CSS Custom Properties',
  description: 'Master the fundamental mechanics of the CSS rendering engine. Understand the Critical Rendering Path, CSSOM generation, selector specificity calculation, cascade layers (@layer), the standard box model (box-sizing: border-box), and dynamic CSS custom properties.',
  estimatedHours: '4 hrs',
  accentColor: 'blue',
  iconName: 'Layout',
  totalLessons: 5,
  lessons: [
    {
      id: 'css-01-01',
      chapterId: 'css-mod-01',
      number: '1.1',
      slug: 'css-syntax-and-browser-rendering',
      title: 'CSS Syntax and Browser Rendering',
      tagline: 'From raw text tokens to the CSSOM tree: how browsers parse rules, compute styles, and layout pixels',
      durationMinutes: 25,
      learningObjectives: [
        'Trace how browser rendering engines (Blink, WebKit, Gecko) construct the CSS Object Model (CSSOM)',
        'Understand the Critical Rendering Path: Parse -> Recalculate Styles -> Layout (Reflow) -> Paint -> Composite',
        'Identify which CSS properties trigger expensive Layout reflows vs. hardware-accelerated GPU compositing'
      ],
      theorySections: [
        {
          heading: '1. The Construction of the CSSOM',
          content: 'When a browser downloads a CSS file, the tokenization engine parses rulesets into a hierarchical tree called the CSSOM (CSS Object Model). While the DOM represents document nodes, the CSSOM attaches computed visual styles to each node. Until the CSSOM is completely constructed, the browser blocks page rendering.',
          bulletPoints: [
            'CSS is Render-Blocking: The browser will not paint pixels until all stylesheets in <head> are parsed',
            'Style Invalidation: Changing a selector at the root level forces the browser to re-check all descendant nodes',
            'Rule Evaluation Direction: Browsers evaluate CSS selectors from RIGHT to LEFT (key selector first)'
          ],
          callout: {
            type: 'key-rule',
            text: 'Performance Rule: Browsers read selectors right-to-left. In .nav ul li a, the engine first finds every <a> tag in the entire document, then climbs parent nodes to check if they match li, ul, and .nav.'
          }
        },
        {
          heading: '2. The 3 Phases of Pixel Rendering',
          content: 'Every visual update in a browser triggers one of three rendering pipelines:',
          bulletPoints: [
            '1. Layout (Reflow): Calculating geometry and dimensions (e.g. width, height, margin, padding, top, left). Most expensive!',
            '2. Paint (Repaint): Filling in pixels without altering geometry (e.g. background-color, color, box-shadow)',
            '3. Composite: Moving pre-rendered pixel bitmaps across GPU layers (transform, opacity). Fastest, 60fps/120fps smooth'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Blueprint, The Carpenter, and The Painter',
        concept: 'Browser Rendering Pipeline',
        story: 'Layout is the architect moving physical walls and rebuilding room dimensions (Reflow). Paint is the painter applying a fresh coat of blue paint to the existing walls (Repaint). Compositing is sliding a pre-painted painting 2 inches to the left along a wall hook (Transform on GPU). Changing a wall dimension disrupts the entire house; sliding the picture hook disrupts nothing.',
        moral: 'Animate transforms and opacity to stay on the lightning-fast GPU compositing layer.',
        icon: 'Box'
      },
      visualType: 'box-model',
      codeExample: {
        title: 'Reflow vs. Composited Animation Comparison',
        description: 'Demonstrating how transform avoids layout recalculations compared to top/left positioning.',
        html: `<div class="demo-container">
  <div class="box bad-box">Reflow (top: 50px)</div>
  <div class="box good-box">Composited (transform)</div>
</div>`,
        css: `.demo-container { display: flex; gap: 2rem; padding: 1.5rem; background: #0f172a; border-radius: 8px; }
.box { width: 140px; height: 70px; display: flex; align-items: center; justify-content: center; font-family: sans-serif; font-size: 11px; font-weight: bold; border-radius: 6px; }
/* Triggers Layout Reflow */
.bad-box { background: #ef4444; color: white; position: relative; transition: top 0.3s ease; }
.bad-box:hover { top: 20px; }
/* Pure GPU Compositing */
.good-box { background: #10b981; color: white; transition: transform 0.3s ease; will-change: transform; }
.good-box:hover { transform: translateY(20px); }`,
        breakdown: [
          { lineRange: '6-7', title: 'top: 20px', explanation: 'Forces the browser to recalculate bounding boxes and geometry for the element and siblings.' },
          { lineRange: '9-10', title: 'transform: translateY', explanation: 'Directs the GPU compositor to translate the pre-rendered texture layer with zero CPU reflow.' }
        ]
      },
      video: {
        title: 'CSS Browser Rendering & The Critical Path',
        duration: '15:10',
        description: 'Using Chrome DevTools Performance panel to record layout shifts, style recalculations, and paint passes.',
        keyPoints: ['CSSOM generation', 'Right-to-left selector matching', 'DevTools rendering profiler'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'CRP Overview', description: 'Browser pipelines.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Welcome to Modern CSS Architecture. Today we master how the browser paints pixels.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-css-01-01',
        title: 'Convert Reflow Animation to GPU Compositing',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Refactor a button hover style from left: 10px to transform: translateX(10px) to prevent layout shifts.',
        instructions: [
          'Replace left: 10px with transform: translateX(10px)',
          'Remove position: relative if unnecessary'
        ],
        starterHtml: `<button class="hover-btn">Hover Me</button>`,
        starterCss: `.hover-btn { position: relative; left: 0; transition: left 0.2s ease; }
.hover-btn:hover { left: 10px; }`,
        starterJs: `console.log("Optimize CSS transition");`,
        solutionHtml: `<button class="hover-btn">Hover Me</button>`,
        solutionCss: `.hover-btn { transform: translateX(0); transition: transform 0.2s ease; }
.hover-btn:hover { transform: translateX(10px); }`,
        solutionJs: `console.log("Composited transform verified");`,
        hints: ['Use transform: translateX(10px).'],
        testCases: [
          { id: 'tc-css-1', description: 'Uses transform translateX', hint: 'Check transform property', checkType: 'style-computed', expectedValue: 'transform' }
        ]
      },
      quiz: [
        {
          id: 'q-css-01-01',
          question: 'Which of the following CSS properties is handled entirely on the GPU compositing layer without triggering Layout reflow or Repaint?',
          options: [
            'width and height',
            'transform and opacity',
            'padding and margin',
            'border-width and top'
          ],
          correctIndex: 1,
          explanation: 'transform and opacity are composited directly on the GPU, avoiding CPU geometry calculations and repaints.'
        }
      ],
      summary: [
        'CSS is render-blocking; the browser must construct the CSSOM tree before drawing any pixels.',
        'Selectors are evaluated right-to-left; overly nested selectors increase style recalculation overhead.',
        'Prioritize GPU-composited properties (transform, opacity) over layout properties (width, top, margin) for fluid animations.'
      ],
      relatedTopics: [
        { title: 'Selectors, Specificity and Inheritance', chapterNumber: '1', lessonId: 'css-01-02', context: 'Master specificity calculation.' }
      ]
    },
    {
      id: 'css-01-02',
      chapterId: 'css-mod-01',
      number: '1.2',
      slug: 'selectors-specificity-and-inheritance',
      title: 'Selectors, Specificity and Inheritance',
      tagline: 'The Specificity Tuple (A, B, C), !important hazards, and natural property inheritance',
      durationMinutes: 25,
      learningObjectives: [
        'Calculate exact specificity scores using the (A, B, C) tuple: IDs, Classes/Attributes/Pseudo-classes, Elements/Pseudo-elements',
        'Understand property inheritance (inherited typography vs. non-inherited box properties)',
        'Leverage modern pseudo-classes :is() and :where() to control specificity zeroing'
      ],
      theorySections: [
        {
          heading: '1. The Specificity Tuple: (ID, Class, Element)',
          content: 'When two conflicting CSS rules target the same element, the browser resolves the conflict by comparing their specificity tuple: (A, B, C). Specificity is not base-10; ten classes cannot override a single ID selector.',
          bulletPoints: [
            'A (IDs): #header -> (1, 0, 0)',
            'B (Classes, Attributes, Pseudo-classes): .btn, [type="text"], :hover -> (0, 1, 0)',
            'C (Elements, Pseudo-elements): div, p, ::before -> (0, 0, 1)',
            '!important: Not a specificity score; it creates an entirely separate, overriding cascade tier'
          ],
          callout: {
            type: 'warning',
            text: 'Anti-pattern: Using !important to solve specificity wars creates a maintenance dead-end where subsequent styles must also use !important.'
          }
        },
        {
          heading: '2. Specificity Manipulation with :where() and :is()',
          content: 'Modern CSS provides two powerful pseudo-classes for specificity management:',
          bulletPoints: [
            ':is(.card, .modal) -> Takes the specificity of its highest-specificity argument',
            ':where(.card, .modal) -> Specificity is ALWAYS (0, 0, 0). Ideal for building easily-overridable component libraries!'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Military Rank Hierarchy',
        concept: 'Specificity Tuples',
        story: 'In the military, an ID selector is a General (A), a class selector is a Captain (B), and an element selector is a Private (C). No matter how many Privates shout an order, a single Captain outranks them. And no matter how many Captains shout, a single General outranks them.',
        moral: 'Keep all styles at the Captain rank (single classes) so they can be easily overridden without calling in a General (#id) or launching a missile (!important).',
        icon: 'Award'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Specificity Score Comparison Table',
        description: 'Comparing specificity values and using :where() to zero out specificity.',
        html: `<div class="specificity-table">
  <h4>Specificity Calculation Matrix</h4>
  <pre><code>/* Selector                          (A, B, C)  Score */
header #logo                         (1, 0, 1)  101
.nav-list .item a:hover              (0, 3, 1)  031
body div ul li a                     (0, 0, 5)  005
:where(.card, .modal) a              (0, 0, 1)  001 (Zeroed!)</code></pre>
</div>`,
        css: `.specificity-table { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '6', title: ':where() Zeroing', explanation: ':where() completely removes specificity from inside classes, making them effortlessly overridable.' }
        ]
      },
      video: {
        title: 'Specificity Mathematics & :where() Masterclass',
        duration: '14:40',
        description: 'Calculating specificity tuples, understanding inheritance, and using :where() for design system baselines.',
        keyPoints: ['(A, B, C) tuple calculation', ':where() vs :is()', 'Inherited vs non-inherited properties'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Specificity', description: 'Tuple mathematics.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Today we master CSS specificity calculation and modern pseudo-class zeroing.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-css-01-02',
        title: 'Zero Specificity with :where()',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Wrap the class selector .article-content in :where() so any utility class can override its heading color without specificity conflicts.',
        instructions: [
          'Change .article-content h2 to :where(.article-content) h2',
          'Verify that a simple .blue-text class can override the color'
        ],
        starterHtml: `<div class="article-content"><h2 class="blue-text">Title</h2></div>`,
        starterCss: `.article-content h2 { color: black; }
.blue-text { color: #3b82f6; }`,
        starterJs: `console.log("Check specificity resolution");`,
        solutionHtml: `<div class="article-content"><h2 class="blue-text">Title</h2></div>`,
        solutionCss: `:where(.article-content) h2 { color: black; }
.blue-text { color: #3b82f6; }`,
        solutionJs: `console.log("Specificity zeroed; blue-text wins!");`,
        hints: ['Use :where(.article-content) h2.'],
        testCases: [
          { id: 'tc-css-2', description: 'Uses :where() for zeroed specificity', hint: 'Check :where', checkType: 'text-contains', expectedValue: ':where' }
        ]
      },
      quiz: [
        {
          id: 'q-css-01-02',
          question: 'What is the specificity score of the selector :where(.alert, .card) p?',
          options: [
            '(0, 2, 1)',
            '(0, 1, 1)',
            '(0, 0, 1) because :where() contributes 0 specificity regardless of its arguments',
            '(1, 0, 0)'
          ],
          correctIndex: 2,
          explanation: ':where() contributes exactly (0, 0, 0) specificity, so only the element selector p (0, 0, 1) counts.'
        }
      ],
      summary: [
        'Specificity is evaluated as a three-part tuple: (IDs, Classes/Attributes, Elements).',
        'Avoid !important and ID selectors in component styling to prevent unresolvable specificity wars.',
        'Use :where() to define low-specificity baseline styles that can be easily customized.'
      ],
      relatedTopics: [
        { title: 'Cascade and the Box Model', chapterNumber: '1', lessonId: 'css-01-03', context: 'Master box-sizing: border-box.' }
      ]
    },
    {
      id: 'css-01-03',
      chapterId: 'css-mod-01',
      number: '1.3',
      slug: 'cascade-and-box-model',
      title: 'Cascade and the Box Model',
      tagline: 'Standard box model math, border-box resets, margin collapsing, and cascade layers (@layer)',
      durationMinutes: 25,
      learningObjectives: [
        'Master the CSS Box Model: Content, Padding, Border, Margin',
        'Understand why box-sizing: border-box is the universal foundation of modern predictable web layout',
        'Diagnose and control vertical margin collapsing mechanics between adjacent and nested block boxes'
      ],
      theorySections: [
        {
          heading: '1. The Box-Sizing Revolution: content-box vs. border-box',
          content: 'In the legacy W3C box model (content-box), setting width: 100px with 20px padding and 2px border resulted in an actual rendered element width of 144px (100 + 40 + 4). This caused horizontal layout overflows across the web. The modern standard applies box-sizing: border-box universally.',
          bulletPoints: [
            'content-box: Rendered Width = width + padding-left + padding-right + border-left + border-right',
            'border-box: Rendered Width = width (Padding and border absorb inward into the defined width)',
            'Universal Reset: *, *::before, *::after { box-sizing: border-box; }'
          ],
          callout: {
            type: 'key-rule',
            text: 'Universal Rule: Always declare *, *::before, *::after { box-sizing: border-box; } at the top of your global stylesheet.'
          }
        },
        {
          heading: '2. The Mechanics of Margin Collapsing',
          content: 'In standard normal document flow, adjacent vertical margins collapse into a single margin equal to the largest of the two margins, rather than summing together.',
          bulletPoints: [
            'Adjacent Siblings: If element A has margin-bottom: 20px and element B has margin-top: 30px, the space between them is 30px (not 50px)',
            'Parent & First Child: If a parent has no padding or border, the top margin of its first child collapses with the parent',
            'Flex and Grid items NEVER collapse margins with their siblings'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Suitcase Dimensions',
        concept: 'box-sizing: border-box',
        story: 'If an airline permits a 22-inch carry-on suitcase, you need a suitcase whose outer shell measures 22 inches (border-box). If you bought an old suitcase where the 22 inches only counted the interior cloth, and the wheels and handles added 4 more inches (content-box), the suitcase would not fit in the overhead bin.',
        moral: 'border-box guarantees that your elements never exceed the exact width you specify.',
        icon: 'Box'
      },
      visualType: 'box-model',
      codeExample: {
        title: 'The Universal Modern CSS Box Model Reset',
        description: 'Industry-standard baseline reset ensuring predictable layout math.',
        html: `<div class="box-demo-card">
  <h4>Universal Box Model Reset</h4>
  <pre><code>/* 1. Universal Box-Sizing Inheritance */
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}</code></pre>
</div>`,
        css: `.box-demo-card { background: #0f172a; color: #a5f3fc; padding: 1.25rem; border-radius: 8px; font-family: monospace; }
code { color: #38bdf8; }`,
        breakdown: [
          { lineRange: '2-4', title: 'html box-sizing', explanation: 'Declares border-box on the root element, allowing embedded 3rd-party widgets to opt-out if needed.' },
          { lineRange: '6-10', title: 'inherit wildcard', explanation: 'Ensures all pseudo-elements and elements inherit predictable border-box sizing.' }
        ]
      },
      video: {
        title: 'Box Model Mastery & Margin Collapsing',
        duration: '15:20',
        description: 'Visualizing content, padding, border, and margin in browser DevTools and debugging margin collapsing.',
        keyPoints: ['border-box vs content-box', 'Margin collapsing rules', 'Cascade layer (@layer) ordering'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Box Model', description: 'Dimensions and padding.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we eliminate layout overflow issues by mastering the CSS box model.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-css-01-03',
        title: 'Apply Universal Border-Box Reset',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Implement the standard border-box reset on all elements and pseudo-elements.',
        instructions: [
          'Select *, *::before, *::after',
          'Apply box-sizing: border-box'
        ],
        starterHtml: `<div class="demo-box">Box Model Content</div>`,
        starterCss: `.demo-box { width: 100px; padding: 20px; }`,
        starterJs: `console.log("Check border-box");`,
        solutionHtml: `<div class="demo-box">Box Model Content</div>`,
        solutionCss: `*, *::before, *::after { box-sizing: border-box; }
.demo-box { width: 100px; padding: 20px; }`,
        solutionJs: `console.log("Universal reset verified");`,
        hints: ['Use *, *::before, *::after.'],
        testCases: [
          { id: 'tc-css-3', description: 'Sets box-sizing to border-box', hint: 'Check box-sizing', checkType: 'style-computed', expectedValue: 'border-box' }
        ]
      },
      quiz: [
        {
          id: 'q-css-01-03',
          question: 'If a <div> has width: 200px, padding: 20px, and border: 5px solid black with box-sizing: border-box, what is its total rendered outer width?',
          options: [
            '250px',
            '200px because padding and border absorb inward',
            '225px',
            '150px'
          ],
          correctIndex: 1,
          explanation: 'Under box-sizing: border-box, the total rendered outer width is exactly 200px; padding and borders take up space inside the 200px.'
        }
      ],
      summary: [
        'box-sizing: border-box ensures padding and borders are absorbed inside the defined width, preventing layout overflow.',
        'Adjacent vertical margins collapse to the largest value in normal flow, but never in Flexbox or CSS Grid.',
        'Use the modern universal reset to ensure predictable sizing across all components and pseudo-elements.'
      ],
      relatedTopics: [
        { title: 'CSS Variables', chapterNumber: '1', lessonId: 'css-01-04', context: 'Leverage dynamic custom properties.' }
      ]
    },
    {
      id: 'css-01-04',
      chapterId: 'css-mod-01',
      number: '1.4',
      slug: 'css-variables',
      title: 'CSS Variables',
      tagline: 'Custom properties (--name), scoping, fallback values, and dynamic runtime manipulation',
      durationMinutes: 25,
      learningObjectives: [
        'Declare and consume CSS Custom Properties (--variable-name) with var() and fallback defaults',
        'Master cascade scoping: global (:root) vs. component-level local variable overrides',
        'Manipulate CSS variables dynamically via JavaScript (element.style.setProperty) for themes and interactive layouts'
      ],
      theorySections: [
        {
          heading: '1. Why CSS Variables Surpass Preprocessor Variables',
          content: 'Sass and Less variables ($color) are static: they are compiled away into hardcoded values at build time. CSS Custom Properties (--color) are living, dynamic DOM entities that inherit down the cascade and update instantly at runtime without re-compiling stylesheets.',
          bulletPoints: [
            'Dynamic Inheritance: Overriding --theme-color inside a container automatically updates all descendant elements',
            'Media Query Aware: Update --font-size inside @media or @container queries and all calculations adapt',
            'Fallback Values: var(--custom-color, #3b82f6) provides resilient default styling if a variable is undefined'
          ]
        },
        {
          heading: '2. Scoping and Contextual Overrides',
          content: 'Declare design tokens at :root for global consistency, but override them locally within components to create dark card sections, alert variations, and status badges.',
          bulletPoints: [
            ':root { --card-bg: #ffffff; --card-text: #0f172a; }',
            '.card.dark { --card-bg: #0f172a; --card-text: #ffffff; } /* One single class re-themes entire subtree! */'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Master Radio Broadcast Tower',
        concept: 'CSS Custom Properties',
        story: 'Sass variables are like writing the time on 1,000 physical wristwatches before shipping them from the factory. CSS variables are like a radio tower broadcasting the atomic clock signal. When daylight saving time occurs, the tower updates its broadcast signal (updating :root), and all 1,000 digital clocks update simultaneously in real time.',
        moral: 'Change the token value once at the top of the tree, and every consumer updates instantly.',
        icon: 'Radio'
      },
      visualType: 'color-palette',
      codeExample: {
        title: 'Dynamic Theming with CSS Custom Properties',
        description: 'Instant theme switching powered by CSS custom properties and JavaScript.',
        html: `<div class="theme-card" id="demo-card">
  <h3>Dynamic Theme Container</h3>
  <p>Theming is handled via --surface-bg and --text-color variables.</p>
  <button id="theme-btn" class="interactive-btn">Toggle Dark Theme</button>
</div>`,
        css: `:root {
  --surface-bg: #ffffff;
  --text-color: #0f172a;
}
.theme-card {
  background-color: var(--surface-bg);
  color: var(--text-color);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  transition: all 0.3s ease;
}
.theme-card.dark {
  --surface-bg: #0f172a;
  --text-color: #f8fafc;
}`,
        js: `const btn = document.getElementById('theme-btn');
const card = document.getElementById('demo-card');
btn?.addEventListener('click', () => {
  card.classList.toggle('dark');
});`,
        breakdown: [
          { lineRange: '9-17', title: 'Variable Consumption', explanation: 'The component consumes the variables; toggling the .dark class updates the tokens without rewriting CSS rules.' }
        ]
      },
      video: {
        title: 'Mastering CSS Custom Properties & Design Tokens',
        duration: '15:30',
        description: 'Building light/dark themes, responsive fluid scales, and JS property manipulation.',
        keyPoints: [':root token declarations', 'Scoped local overrides', 'document.documentElement.style.setProperty'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'CSS Variables', description: 'Custom properties.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we build dynamic, cascade-aware design systems using CSS variables.' }],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-css-01-04',
        title: 'Define Scoped CSS Variable Override',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Create a .badge-success class that overrides the local --badge-color variable to #10b981.',
        instructions: [
          'Set --badge-color: #10b981 inside .badge-success',
          'Ensure background uses var(--badge-color)'
        ],
        starterHtml: `<span class="badge badge-success">Success</span>`,
        starterCss: `.badge { background: var(--badge-color, #64748b); color: white; padding: 4px 8px; border-radius: 4px; }
.badge-success { }`,
        starterJs: `console.log("Check variable override");`,
        solutionHtml: `<span class="badge badge-success">Success</span>`,
        solutionCss: `.badge { background: var(--badge-color, #64748b); color: white; padding: 4px 8px; border-radius: 4px; }
.badge-success { --badge-color: #10b981; }`,
        solutionJs: `console.log("Scoped variable override verified");`,
        hints: ['Declare --badge-color: #10b981 inside .badge-success.'],
        testCases: [
          { id: 'tc-css-4', description: 'Overrides --badge-color', hint: 'Check variable declaration', checkType: 'text-contains', expectedValue: '--badge-color' }
        ]
      },
      quiz: [
        {
          id: 'q-css-01-04',
          question: 'What happens when a CSS property references an undefined CSS variable, e.g. background-color: var(--missing-token, #3b82f6)?',
          options: [
            'The entire stylesheet is rejected and the screen goes blank',
            'The browser gracefully falls back to the secondary fallback value (#3b82f6)',
            'The browser throws an unhandled JavaScript error',
            'The server restarts'
          ],
          correctIndex: 1,
          explanation: 'The second parameter of var() is a fallback value used automatically if the variable is not defined.'
        }
      ],
      summary: [
        'CSS variables are living DOM entities that inherit down the cascade and update dynamically at runtime.',
        'Define design tokens globally in :root and override them locally inside specific component classes.',
        'Always provide sensible fallback values in var() to prevent visual breakage if tokens are omitted.'
      ],
      relatedTopics: [
        { title: 'Reusable Styling Principles', chapterNumber: '1', lessonId: 'css-01-05', context: 'Build scalable CSS architectures.' }
      ]
    },
    {
      id: 'css-01-05',
      chapterId: 'css-mod-01',
      number: '1.5',
      slug: 'reusable-styling-principles',
      title: 'Reusable Styling Principles',
      tagline: 'DRY architecture, composition over duplication, utility restraint, and single responsibility',
      durationMinutes: 25,
      learningObjectives: [
        'Apply the Single Responsibility Principle (SRP) to CSS class design',
        'Understand Composition vs. Duplication: pairing semantic base components with modifier tokens',
        'Avoid utility class sprawl: why writing 40 utility classes per HTML tag creates maintenance nightmares'
      ],
      theorySections: [
        {
          heading: '1. Semantic Component Modularity',
          content: 'A sustainable CSS architecture organizes styles into reusable components that encapsulate layout and appearance without cluttering HTML markup with dozens of repetitive utility strings.',
          bulletPoints: [
            'Base Component (.btn): Establishes baseline geometry, display, padding, font, and transitions',
            'Modifier Class (.btn-primary, .btn-sm): Modifies only color, border, or dimensions via variables',
            'Zero HTML Bloat: Keeps HTML semantic and readable (<button class="btn btn-primary">Save</button>)'
          ]
        },
        {
          heading: '2. The Danger of Utility Class Sprawl',
          content: 'While utility classes (e.g. flex items-center justify-between p-4 bg-slate-900 rounded-lg shadow-md) offer fast prototyping, they duplicate dozens of classes across thousands of HTML elements, create massive HTML payload bloat, and make sitewide redesigns nearly impossible.',
          bulletPoints: [
            'Pure CSS3: Change one stylesheet rule to restyle 5,000 buttons across your entire website',
            'Clean DOM: Assistive screen readers and developers inspect clean, semantic markup'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'LEGO Bricks vs. Carved Marble Blocks',
        concept: 'Reusable Component Classes',
        story: 'If you want to build a house, you use standardized interlocking LEGO bricks (base components). If you carved each wall out of an individual unique boulder with custom hand tools (copy-pasting 50 utility classes on every element), altering the window height would require recarving the entire house from scratch.',
        moral: 'Build with reusable, modular components to make future redesigns effortless.',
        icon: 'Layers'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Clean Component + Modifier Architecture',
        description: 'Composing base classes with modifier tokens using pure CSS3.',
        html: `<div class="btn-group">
  <button class="btn btn-primary">Primary Action</button>
  <button class="btn btn-secondary">Secondary Action</button>
  <button class="btn btn-danger btn-sm">Delete</button>
</div>`,
        css: `/* Base Component */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md, 6px);
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}
/* Modifiers */
.btn-primary { background: #3b82f6; color: white; }
.btn-primary:hover { background: #2563eb; }
.btn-secondary { background: #f1f5f9; color: #0f172a; border-color: #cbd5e1; }
.btn-danger { background: #ef4444; color: white; }
.btn-sm { padding: 0.25rem 0.5rem; font-size: 0.75rem; }`,
        breakdown: [
          { lineRange: '2-13', title: 'Base Class', explanation: 'Encapsulates all common geometry and interactions so modifiers only specify colors and size deltas.' }
        ]
      },
      video: {
        title: 'Architecting Scalable Pure CSS3 Systems',
        duration: '15:50',
        description: 'Comparing utility frameworks with semantic component architecture and avoiding CSS bloat.',
        keyPoints: ['Base vs modifier classes', 'Refactoring utility soup', 'Sitewide theme updates in 1 line'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Architecture Principles', description: 'Component design.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we establish scalable, DRY styling principles without utility framework bloat.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-css-01-05',
        title: 'Refactor Repeated Styles into a Base Class',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Extract shared padding, border-radius, and font-weight from .alert-info and .alert-error into a shared .alert base class.',
        instructions: [
          'Create .alert with padding: 1rem, border-radius: 6px, font-weight: 500',
          'Keep only background and color in the modifier classes'
        ],
        starterHtml: `<div class="alert alert-info">Info Message</div>`,
        starterCss: `.alert-info { padding: 1rem; border-radius: 6px; font-weight: 500; background: #e0f2fe; color: #0369a1; }
.alert-error { padding: 1rem; border-radius: 6px; font-weight: 500; background: #fee2e2; color: #991b1b; }`,
        starterJs: `console.log("Extract base class");`,
        solutionHtml: `<div class="alert alert-info">Info Message</div>`,
        solutionCss: `.alert { padding: 1rem; border-radius: 6px; font-weight: 500; }
.alert-info { background: #e0f2fe; color: #0369a1; }
.alert-error { background: #fee2e2; color: #991b1b; }`,
        solutionJs: `console.log("Refactored into clean base class");`,
        hints: ['Move shared properties to .alert.'],
        testCases: [
          { id: 'tc-css-5', description: 'Extracts .alert base class', hint: 'Check .alert declaration', checkType: 'text-contains', expectedValue: '.alert {' }
        ]
      },
      quiz: [
        {
          id: 'q-css-01-05',
          question: 'What is the primary advantage of writing semantic component classes (.card, .btn) over repeating 30 utility classes on every HTML element?',
          options: [
            'It makes CSS files larger',
            'Sitewide redesigns can be executed in a single centralized stylesheet file rather than hunting through thousands of HTML/JSX templates',
            'It forces the browser to run in quirks mode',
            'It disables JavaScript'
          ],
          correctIndex: 1,
          explanation: 'Centralized component rules allow immediate global restyling across the entire application without touching HTML markup.'
        }
      ],
      summary: [
        'Structure CSS into single-responsibility base components (.btn) and targeted modifier classes (.btn-primary).',
        'Avoid utility class sprawl: keep HTML semantic, concise, and accessible.',
        'Rely on CSS custom properties to drive component variations with minimal selector duplication.'
      ],
      relatedTopics: [
        { title: 'Normal Document Flow', chapterNumber: '2', lessonId: 'css-02-01', context: 'Advance to Module 2 on Layout.' }
      ]
    }
  ]
};

export const cssModule02: Chapter = {
  id: 'css-mod-02',
  number: '2',
  badge: 'CSS 02',
  slug: 'layout-architecture',
  title: 'Layout Architecture',
  subtitle: 'Normal Document Flow, Flexbox 1D Math, CSS Grid 2D Matrices, Template Areas & Subgrid',
  description: 'Master modern 2D and 1D layout architecture without utility hacks. Understand block and inline document flow, Flexbox alignment algorithms, CSS Grid fractional tracks (fr), repeat(auto-fit, minmax()), grid template areas, and nested Subgrid alignment.',
  estimatedHours: '4 hrs',
  accentColor: 'cyan',
  iconName: 'Grid',
  totalLessons: 5,
  lessons: [
    {
      id: 'css-02-01',
      chapterId: 'css-mod-02',
      number: '2.1',
      slug: 'normal-document-flow',
      title: 'Normal Document Flow',
      tagline: 'Block, inline, inline-block, formatting contexts, and positioning schemes',
      durationMinutes: 25,
      learningObjectives: [
        'Understand Block Formatting Contexts (BFC) and Inline Formatting Contexts (IFC)',
        'Compare display modes: block, inline, inline-block, none, and contents',
        'Master the 5 positioning schemes: static, relative, absolute, fixed, and sticky'
      ],
      theorySections: [
        {
          heading: '1. How Browsers Position Elements by Default',
          content: 'Before Flexbox or Grid are applied, elements arrange themselves according to Normal Document Flow. Block-level elements stack vertically, expanding to fill 100% of their container width. Inline elements flow horizontally side-by-side like words in a sentence.',
          bulletPoints: [
            'Block Elements (div, p, h1, section): Stack vertically; respect width, height, and all margins/padding',
            'Inline Elements (span, a, strong, em): Flow horizontally; ignore top/bottom margins and height properties',
            'Inline-Block: Flows horizontally with adjacent text, but respects custom width, height, and vertical padding'
          ]
        },
        {
          heading: '2. Positioning Contexts: relative, absolute, and sticky',
          content: 'CSS positioning removes elements from normal flow to position them against coordinate reference frames.',
          bulletPoints: [
            'position: relative: Leaves element in flow, but offsets it visually; establishes an anchor context for absolute children',
            'position: absolute: Removed completely from document flow; positioned relative to nearest positioned ancestor',
            'position: fixed: Positioned relative to the viewport window; stays locked in place during scrolling',
            'position: sticky: Acts as normal flow until scrolling reaches threshold, then pins to viewport'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Paragraph of Text and the Post-It Note',
        concept: 'Normal Flow vs. Positioning',
        story: 'Normal flow is writing words on lined notebook paper: words follow left-to-right, wrapping to the next line when they hit the margin. An absolute element is a yellow Post-It note: you can stick it on any exact coordinate of the notebook page (top: 20px; right: 20px;), floating above the lined paper without pushing any words out of the way.',
        moral: 'Use normal flow for structure; use positioning only for floating badges, dropdowns, and sticky headers.',
        icon: 'FileText'
      },
      visualType: 'box-model',
      codeExample: {
        title: 'Positioning Anchor Pattern in CSS',
        description: 'Anchoring an absolute badge to a relative card container.',
        html: `<div class="card-container">
  <span class="badge-ribbon">FEATURED</span>
  <h3>Architecture Masterclass</h3>
  <p>Learn pure CSS3 positioning mechanics.</p>
</div>`,
        css: `.card-container {
  position: relative; /* Positioning anchor */
  background: #0f172a;
  color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 280px;
}
.badge-ribbon {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #3b82f6;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 4px;
}`,
        breakdown: [
          { lineRange: '2', title: 'position: relative', explanation: 'Establishes the boundary coordinate system so top: 12px; right: 12px positions inside the card, not the entire webpage.' }
        ]
      },
      video: {
        title: 'Document Flow & CSS Positioning Deep Dive',
        duration: '15:20',
        description: 'Mastering BFC creation, sticky headers, and avoiding positioning anti-patterns.',
        keyPoints: ['Block vs inline formatting contexts', 'The position: relative anchor rule', 'position: sticky scroll boundaries'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Document Flow', description: 'Flow mechanics.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we explore normal document flow and CSS coordinate systems.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-css-02-01',
        title: 'Anchor Absolute Badge to Relative Parent',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Add position: relative to .parent-card so the child badge stays locked inside the top-right corner of the card.',
        instructions: [
          'Add position: relative to .parent-card',
          'Verify that badge sits at top: 10px, right: 10px of card'
        ],
        starterHtml: `<div class="parent-card"><span class="child-badge">NEW</span>Card Content</div>`,
        starterCss: `.parent-card { background: #f8fafc; padding: 2rem; }
.child-badge { position: absolute; top: 10px; right: 10px; background: #3b82f6; color: white; }`,
        starterJs: `console.log("Anchor parent card");`,
        solutionHtml: `<div class="parent-card"><span class="child-badge">NEW</span>Card Content</div>`,
        solutionCss: `.parent-card { position: relative; background: #f8fafc; padding: 2rem; }
.child-badge { position: absolute; top: 10px; right: 10px; background: #3b82f6; color: white; }`,
        solutionJs: `console.log("Parent card anchored successfully");`,
        hints: ['Declare position: relative on the parent container.'],
        testCases: [
          { id: 'tc-css-6', description: 'Sets position relative on parent', hint: 'Check position', checkType: 'style-computed', expectedValue: 'relative' }
        ]
      },
      quiz: [
        {
          id: 'q-css-02-01',
          question: 'Against what reference frame is an element with position: absolute positioned?',
          options: [
            'Always the bottom of the HTML page',
            'The nearest ancestor element that has a position property other than static (such as relative, absolute, or fixed)',
            'The mouse cursor coordinates',
            'The closest <h1> tag'
          ],
          correctIndex: 1,
          explanation: 'Absolute elements climb parent nodes until finding an ancestor with non-static position, defaulting to the initial containing block (viewport) if none is found.'
        }
      ],
      summary: [
        'Normal document flow stacks block elements vertically while inline elements flow horizontally.',
        'Use position: relative on parent containers to establish clean coordinate boundaries for absolute children.',
        'position: sticky provides native scroll-locking headers without JavaScript scroll event listeners.'
      ],
      relatedTopics: [
        { title: 'Flexbox', chapterNumber: '2', lessonId: 'css-02-02', context: 'Master one-dimensional layouts.' }
      ]
    },
    {
      id: 'css-02-02',
      chapterId: 'css-mod-02',
      number: '2.2',
      slug: 'flexbox',
      title: 'Flexbox',
      tagline: 'One-dimensional layout engine: main-axis, cross-axis, flex-grow, flex-shrink, and flex-basis',
      durationMinutes: 25,
      learningObjectives: [
        'Master the dual-axis coordinate system: Main Axis (flex-direction) and Cross Axis',
        'Control space distribution with justify-content, align-items, and gap',
        'Deconstruct the flex shorthand: flex: 1 1 0 vs. flex: 0 0 auto vs. flex: 1'
      ],
      theorySections: [
        {
          heading: '1. The Flexbox Axis Mental Model',
          content: 'Flexbox is a 1-dimensional layout engine designed for distributing space along a single line (row or column).',
          bulletPoints: [
            'Main Axis (flex-direction: row | column): Governed by justify-content (flex-start, center, flex-end, space-between)',
            'Cross Axis (perpendicular to main): Governed by align-items (stretch, center, flex-start, flex-end, baseline)',
            'gap property: Defines modern, clean spacing between flex items without hacky margin selectors'
          ]
        },
        {
          heading: '2. The Mathematical Shorthand: flex: grow shrink basis',
          content: 'The flex property governs how an item expands or contracts when container width varies.',
          bulletPoints: [
            'flex-grow: Proportional factor for distributing surplus space (e.g. flex-grow: 2 gets 2x surplus space)',
            'flex-shrink: Factor for absorbing deficit space when overflowing (0 = never shrink, prevents squishing)',
            'flex-basis: Initial starting dimension before space distribution (e.g. 200px or 0)',
            'flex: 1 (shorthand for 1 1 0%): All items absorb equal width and flex dynamically'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Elastic Rubber Band Train',
        concept: 'Flexbox',
        story: 'Imagine toy train cars connected by elastic rubber bands along a single track. When you pull the train longer, the rubber bands stretch to distribute the extra distance evenly between cars (justify-content: space-between). If you set flex-grow: 2 on the caboose, its rubber band stretches twice as wide as the others.',
        moral: 'Flexbox distributes surplus space elastically along one dimensional axis.',
        icon: 'Move'
      },
      visualType: 'flexbox',
      codeExample: {
        title: 'Modern Responsive Navbar with Flexbox and gap',
        description: 'Standard responsive navigation header with left logo and right actions.',
        html: `<nav class="flex-navbar">
  <div class="brand">WebZoneBW</div>
  <div class="nav-links">
    <a href="#courses">Courses</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </div>
  <button class="nav-cta">Enroll</button>
</nav>`,
        css: `.flex-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #0f172a;
  color: white;
  border-radius: 8px;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem; /* Modern spacing */
}
.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover { color: #38bdf8; }
.nav-cta {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 4px;
}`,
        breakdown: [
          { lineRange: '2-4', title: 'Navbar Alignment', explanation: 'display: flex with justify-content: space-between pushes brand, links, and CTA into balanced slots.' }
        ]
      },
      video: {
        title: 'Flexbox Alignment & Growth Math',
        duration: '16:00',
        description: 'Hands-on interactive manipulation of main-axis, cross-axis, flex-grow, and flex-shrink.',
        keyPoints: ['justify-content vs align-items', 'flex-basis calculation math', 'flex-wrap card rows'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Flexbox Math', description: 'Axis orientation.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we master Flexbox space distribution algorithms.' }],
        demoAnimationType: 'flex-align'
      },
      practice: {
        id: 'prac-css-02-02',
        title: 'Center Content Horizontally and Vertically with Flexbox',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Use Flexbox to perfectly center an icon inside a 200px box both horizontally and vertically.',
        instructions: [
          'display: flex',
          'justify-content: center',
          'align-items: center'
        ],
        starterHtml: `<div class="center-box"><span>★</span></div>`,
        starterCss: `.center-box { width: 200px; height: 200px; background: #f8fafc; }`,
        starterJs: `console.log("Center element");`,
        solutionHtml: `<div class="center-box"><span>★</span></div>`,
        solutionCss: `.center-box { width: 200px; height: 200px; background: #ecfdf5; display: flex; justify-content: center; align-items: center; }`,
        solutionJs: `console.log("Centered perfectly with flexbox");`,
        hints: ['Combine justify-content: center and align-items: center.'],
        testCases: [
          { id: 'tc-css-7', description: 'Applies center alignment', hint: 'Check align-items', checkType: 'style-computed', expectedValue: 'center' }
        ]
      },
      quiz: [
        {
          id: 'q-css-02-02',
          question: 'What happens to the main axis and cross axis when you declare flex-direction: column on a flex container?',
          options: [
            'Flexbox disables itself and reverts to block flow',
            'The main axis becomes vertical (top-to-bottom) and the cross axis becomes horizontal (left-to-right)',
            'Elements are sorted in alphabetical order',
            'Text color flips to black'
          ],
          correctIndex: 1,
          explanation: 'flex-direction: column rotates the main axis to vertical, so justify-content now controls vertical spacing.'
        }
      ],
      summary: [
        'Flexbox is the premier 1D layout tool for toolbars, navbars, item lists, and vertical alignments.',
        'Use gap instead of margins to create clean, predictable spacing between flex items.',
        'Understand flex: 1 (flex-grow: 1, flex-shrink: 1, flex-basis: 0%) to create equally balanced elastic columns.'
      ],
      relatedTopics: [
        { title: 'CSS Grid', chapterNumber: '2', lessonId: 'css-02-03', context: 'Advance to 2D CSS Grid.' }
      ]
    },
    {
      id: 'css-02-03',
      chapterId: 'css-mod-02',
      number: '2.3',
      slug: 'css-grid',
      title: 'CSS Grid',
      tagline: 'Two-dimensional layout engine: tracks, fractional units (fr), and auto-fit minmax()',
      durationMinutes: 25,
      learningObjectives: [
        'Master true 2D layout: aligning items simultaneously across rows and columns',
        'Understand fractional units (1fr): sharing available space mathematically',
        'Create self-responsive card layouts without media queries using repeat(auto-fit, minmax(280px, 1fr))'
      ],
      theorySections: [
        {
          heading: '1. The True 2D Matrix Engine',
          content: 'While Flexbox operates on a single line at a time, CSS Grid controls both rows and columns simultaneously. Grid allows child elements to span multiple rows and columns with microscopic mathematical alignment.',
          bulletPoints: [
            'grid-template-columns: Defines column tracks (e.g. 250px 1fr 300px)',
            'fractional unit (fr): Represents a fraction of available free space after fixed pixel tracks are deducted',
            'grid-gap / gap: Clean gutter spacing between grid cells'
          ]
        },
        {
          heading: '2. The Holy Grail of Responsive Grids: auto-fit + minmax()',
          content: 'The most powerful pattern in modern CSS allows creating fully responsive grid layouts without writing a single media query:',
          bulletPoints: [
            'grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))',
            'How it works: On mobile (360px), cards take 1fr (1 column). On tablet (600px), 2 columns fit. On desktop (1200px), 4 columns fit automatically!'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden Pattern: repeat(auto-fit, minmax(minSize, 1fr)) is the most elegant responsive card grid pattern in web history.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Architectural Floor Plan Grid',
        concept: 'CSS Grid',
        story: 'If Flexbox is like hanging pictures along a single hallway wall in a row, CSS Grid is the master architectural blueprint of the entire house: living room in cell (1, 1), kitchen in cell (1, 2), and the garage spanning across (2, 1) and (2, 2).',
        moral: 'Use CSS Grid for page layouts and 2D matrices; use Flexbox for 1D component interiors.',
        icon: 'Grid'
      },
      visualType: 'css-grid',
      codeExample: {
        title: 'Auto-Responsive Card Grid Without Media Queries',
        description: 'Adaptive 2D card grid adjusting automatically from mobile to 4K displays.',
        html: `<div class="responsive-card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>`,
        css: `.responsive-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  background: #0f172a;
  border-radius: 8px;
}
.card {
  background: #1e293b;
  color: white;
  padding: 2rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #334155;
}`,
        breakdown: [
          { lineRange: '2-4', title: 'repeat(auto-fit, minmax)', explanation: 'Calculates the maximum number of 200px columns that can fit into the container width and expands them equally to 1fr.' }
        ]
      },
      video: {
        title: 'CSS Grid Mastery: Tracks, Fr Units & auto-fit',
        duration: '16:40',
        description: 'Interactive demonstration of CSS Grid track calculations, line numbers, and auto-fit vs auto-fill.',
        keyPoints: ['Fractional units (fr)', 'auto-fit vs auto-fill mechanics', 'Grid inspector in Firefox and Chrome'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Grid Basics', description: '2D matrices.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we build responsive 2D layouts using CSS Grid.' }],
        demoAnimationType: 'grid-tracks'
      },
      practice: {
        id: 'prac-css-02-03',
        title: 'Implement Auto-Fit Minmax Card Grid',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Configure .card-grid as a CSS grid with repeat(auto-fit, minmax(220px, 1fr)) and a 1rem gap.',
        instructions: [
          'display: grid',
          'grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))',
          'gap: 1rem'
        ],
        starterHtml: `<div class="card-grid"><div>1</div><div>2</div><div>3</div></div>`,
        starterCss: `.card-grid { padding: 1rem; }`,
        starterJs: `console.log("Configure auto-fit grid");`,
        solutionHtml: `<div class="card-grid"><div>1</div><div>2</div><div>3</div></div>`,
        solutionCss: `.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }`,
        solutionJs: `console.log("Auto-fit grid verified");`,
        hints: ['Use repeat(auto-fit, minmax(220px, 1fr)).'],
        testCases: [
          { id: 'tc-css-8', description: 'Uses auto-fit minmax', hint: 'Check grid-template-columns', checkType: 'style-computed', expectedValue: 'grid' }
        ]
      },
      quiz: [
        {
          id: 'q-css-02-03',
          question: 'What is the key advantage of repeat(auto-fit, minmax(250px, 1fr)) over media query breakpoints?',
          options: [
            'It forces users to view the site on mobile phones',
            'It automatically adapts column counts dynamically to any container width without writing hardcoded @media breakpoints',
            'It makes images load faster',
            'It disables dark mode'
          ],
          correctIndex: 1,
          explanation: 'auto-fit combined with minmax creates an intrinsically fluid grid that wraps columns seamlessly without manual breakpoint queries.'
        }
      ],
      summary: [
        'CSS Grid is the ultimate 2D layout tool, governing both rows and columns in a unified matrix.',
        'Fractional units (fr) distribute surplus space proportionally without pixel math.',
        'repeat(auto-fit, minmax()) builds responsive card grids that adapt to all screen sizes without media queries.'
      ],
      relatedTopics: [
        { title: 'Grid Template Areas', chapterNumber: '2', lessonId: 'css-02-04', context: 'Visual layout modeling.' }
      ]
    },
    {
      id: 'css-02-04',
      chapterId: 'css-mod-02',
      number: '2.4',
      slug: 'grid-template-areas',
      title: 'Grid Template Areas',
      tagline: 'Visual ASCII layout modeling in code: named areas, line names, and responsive restyling',
      durationMinutes: 25,
      learningObjectives: [
        'Model complete application dashboard layouts visually using grid-template-areas',
        'Assign child elements using grid-area: header | sidebar | main | footer',
        'Rearrange entire page layouts inside media queries simply by re-typing the ASCII area string'
      ],
      theorySections: [
        {
          heading: '1. Visual Layout Modeling in Code',
          content: 'grid-template-areas allows you to literally draw your layout in your stylesheet using readable strings. Each word in the string represents a named grid cell.',
          bulletPoints: [
            '"header header"',
            '"sidebar main"',
            '"footer footer"',
            '. (Period): Represents an empty, unassigned grid cell'
          ]
        },
        {
          heading: '2. Restructuring Entire Pages in 1 Rule',
          content: 'When changing layouts for mobile, you do not need to rewrite positioning or margins on individual components. You simply redefine the grid-template-areas string inside a media query!',
          bulletPoints: [
            'Desktop: "sidebar main"',
            'Mobile: "main" "sidebar" (Sidebar moves beneath main content in 2 lines of CSS!)'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Newspaper Page Layout Wireframe',
        concept: 'Named Grid Areas',
        story: 'An editor sketches on a napkin: "Headline across the top, photo on the left, article on the right, sports score at the bottom." With grid-template-areas, that exact napkin sketch becomes the executable CSS code.',
        moral: 'Readable named areas make complex page layouts self-documenting and trivial to maintain.',
        icon: 'Layout'
      },
      visualType: 'css-grid',
      codeExample: {
        title: 'Complete Application Shell with grid-template-areas',
        description: 'Dashboard layout modeled visually with named areas.',
        html: `<div class="dashboard-shell">
  <header class="area-header">Header (Nav &amp; User)</header>
  <aside class="area-sidebar">Sidebar (Navigation)</aside>
  <main class="area-main">Main Content Area</main>
  <footer class="area-footer">Footer (Copyright)</footer>
</div>`,
        css: `.dashboard-shell {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "sidebar footer";
  min-height: 350px;
  gap: 10px;
  background: #0f172a;
  padding: 10px;
  color: white;
}
.area-header { grid-area: header; background: #1e293b; padding: 1rem; border-radius: 4px; }
.area-sidebar { grid-area: sidebar; background: #334155; padding: 1rem; border-radius: 4px; }
.area-main { grid-area: main; background: #1e293b; padding: 1rem; border-radius: 4px; }
.area-footer { grid-area: footer; background: #0f172a; border: 1px solid #334155; padding: 0.5rem; border-radius: 4px; }`,
        breakdown: [
          { lineRange: '4-8', title: 'grid-template-areas', explanation: 'Visual ASCII map specifying which areas span across which columns and rows.' }
        ]
      },
      video: {
        title: 'Visual Dashboard Architecture with Grid Areas',
        duration: '15:10',
        description: 'Modeling full dashboard interfaces and restructuring for mobile with grid-template-areas.',
        keyPoints: ['Named areas syntax', 'Empty cell notation (.)', 'Responsive area flipping'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Grid Areas', description: 'ASCII layout modeling.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we design full-page application shells using named grid areas.' }],
        demoAnimationType: 'grid-tracks'
      },
      practice: {
        id: 'prac-css-02-04',
        title: 'Assign Child to Named Grid Area',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Assign the class .main-panel to the grid area "content".',
        instructions: [
          'Add grid-area: content to .main-panel'
        ],
        starterHtml: `<main class="main-panel">Article Body</main>`,
        starterCss: `.main-panel { background: #f8fafc; }`,
        starterJs: `console.log("Assign grid area");`,
        solutionHtml: `<main class="main-panel">Article Body</main>`,
        solutionCss: `.main-panel { grid-area: content; background: #f8fafc; }`,
        solutionJs: `console.log("Grid area content assigned");`,
        hints: ['Use grid-area: content.'],
        testCases: [
          { id: 'tc-css-9', description: 'Assigns grid-area: content', hint: 'Check grid-area', checkType: 'style-computed', expectedValue: 'content' }
        ]
      },
      quiz: [
        {
          id: 'q-css-02-04',
          question: 'In grid-template-areas, what does a period (.) represent in the area string, such as "header ." ?',
          options: [
            'A syntax error',
            'An empty, unassigned grid cell slot',
            'A bullet point list item',
            'A link to the home page'
          ],
          correctIndex: 1,
          explanation: 'A period in a grid-template-areas definition indicates an intentional empty cell with no assigned child.'
        }
      ],
      summary: [
        'grid-template-areas turns page layouts into readable ASCII blueprints directly inside your stylesheet.',
        'Child components bind to layout slots via grid-area: name, regardless of source HTML order.',
        'Restructure responsive desktop/mobile layouts by simply redefining the area string inside media queries.'
      ],
      relatedTopics: [
        { title: 'Subgrid and Nested Layouts', chapterNumber: '2', lessonId: 'css-02-05', context: 'Align nested cards with Subgrid.' }
      ]
    },
    {
      id: 'css-02-05',
      chapterId: 'css-mod-02',
      number: '2.5',
      slug: 'subgrid-and-nested-layouts',
      title: 'Subgrid and Nested Layouts',
      tagline: 'grid-template-rows: subgrid: solving the ragged card alignment problem permanently',
      durationMinutes: 25,
      learningObjectives: [
        'Understand the "ragged card" problem in nested card grids where headers and buttons misalign across cards',
        'Implement grid-template-rows: subgrid to inherit parent grid track dimensions into child cards',
        'Verify browser compatibility and graceful fallbacks for subgrid'
      ],
      theorySections: [
        {
          heading: '1. The Classic "Ragged Card" Problem',
          content: 'In traditional CSS grids, when you place 3 cards side-by-side, each card is an independent container. If Card 1 has a 1-line title, and Card 2 has a 3-line title, the card action buttons and descriptions end up misaligned and ragged.',
          bulletPoints: [
            'Old Hack: Setting fixed heights (min-height: 80px) on titles; breaks on longer translations or zoom',
            'The Subgrid Solution: The child card inherits the parent row tracks directly: grid-template-rows: subgrid',
            'Result: Titles in Card 1, 2, and 3 all share the exact same row track, locking into mathematical alignment across the entire row!'
          ]
        },
        {
          heading: '2. Implementing Subgrid in Modern CSS',
          content: 'Subgrid is supported across all modern evergreen browsers (Chrome 117+, Firefox, Safari 16+).',
          bulletPoints: [
            'Parent: display: grid; grid-template-columns: repeat(3, 1fr);',
            'Child Card: grid-row: span 3; display: grid; grid-template-rows: subgrid;',
            'Card Children: Automatically occupy row 1 (Header), row 2 (Body), and row 3 (Action Button) perfectly aligned!'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Shared Ledger Rulers',
        concept: 'CSS Subgrid',
        story: 'If three accountants write on separate pieces of blank paper, their ledger totals and column lines will all be at slightly different heights. If you place a lined ruler behind all three translucent papers (Subgrid), every title, debit, and credit line aligns to the exact millimeter across all three sheets.',
        moral: 'Subgrid allows child cards to share the parent invisible alignment lines.',
        icon: 'Grid'
      },
      visualType: 'css-grid',
      codeExample: {
        title: 'Perfect Multi-Card Alignment with Subgrid',
        description: 'Titles, descriptions, and action buttons locked into alignment across cards.',
        html: `<div class="subgrid-parent">
  <div class="card-item">
    <h3>Short Title</h3>
    <p>Short description text.</p>
    <button>Enroll</button>
  </div>
  <div class="card-item">
    <h3>Much Longer Multi-Line Course Title That Wraps</h3>
    <p>Comprehensive description detailing multiple modules and outcomes.</p>
    <button>Enroll</button>
  </div>
</div>`,
        css: `.subgrid-parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  background: #0f172a;
  padding: 1.5rem;
  border-radius: 8px;
}
.card-item {
  grid-row: span 3; /* Spans 3 rows: Title, Body, Button */
  display: grid;
  grid-template-rows: subgrid; /* Inherits parent row lines! */
  background: #1e293b;
  color: white;
  padding: 1.25rem;
  border-radius: 6px;
}`,
        breakdown: [
          { lineRange: '10-12', title: 'grid-template-rows: subgrid', explanation: 'Causes title, paragraph, and button to lock into shared row lines across all sibling cards.' }
        ]
      },
      video: {
        title: 'CSS Subgrid: Eliminating Ragged Cards Forever',
        duration: '15:40',
        description: 'Comparing flex hacks vs native subgrid alignment across varied text lengths.',
        keyPoints: ['Ragged card defect analysis', 'grid-row: span 3 setup', 'Browser support and fallbacks'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Subgrid Mechanics', description: 'Shared row lines.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we solve card misalignment permanently using CSS Subgrid.' }],
        demoAnimationType: 'grid-tracks'
      },
      practice: {
        id: 'prac-css-02-05',
        title: 'Configure Child Card for Subgrid Rows',
        difficulty: 'Intermediate',
        estimatedTime: '15 mins',
        prompt: 'Configure .card to span 3 rows and inherit row lines via subgrid.',
        instructions: [
          'Add grid-row: span 3',
          'Add display: grid',
          'Add grid-template-rows: subgrid'
        ],
        starterHtml: `<div class="card"><h3>Title</h3><p>Text</p><button>Action</button></div>`,
        starterCss: `.card { background: #f8fafc; }`,
        starterJs: `console.log("Configure subgrid");`,
        solutionHtml: `<div class="card"><h3>Title</h3><p>Text</p><button>Action</button></div>`,
        solutionCss: `.card { grid-row: span 3; display: grid; grid-template-rows: subgrid; background: #f8fafc; }`,
        solutionJs: `console.log("Subgrid configured successfully");`,
        hints: ['Combine grid-row: span 3 and grid-template-rows: subgrid.'],
        testCases: [
          { id: 'tc-css-10', description: 'Applies subgrid rows', hint: 'Check subgrid value', checkType: 'style-computed', expectedValue: 'subgrid' }
        ]
      },
      quiz: [
        {
          id: 'q-css-02-05',
          question: 'What problem does CSS Subgrid solve that nested Flexbox or standalone Grid containers could never solve cleanly?',
          options: [
            'It translates CSS into C++',
            'It allows nested child elements (like titles, descriptions, and buttons inside cards) to align to the parent grid rows, keeping them aligned across sibling cards regardless of varying text lengths',
            'It makes the internet faster',
            'It deletes old cookies'
          ],
          correctIndex: 1,
          explanation: 'Subgrid allows nested children to participate in the parent grid tracks, keeping card headers, bodies, and footers aligned across rows.'
        }
      ],
      summary: [
        'Subgrid allows nested grid containers to inherit the row or column tracks of their parent grid.',
        'It eliminates the classic "ragged card" problem where varying title lengths misalign action buttons.',
        'Subgrid is widely supported across modern evergreen browsers (Chrome, Safari, Firefox).'
      ],
      relatedTopics: [
        { title: 'Mobile-First Architecture', chapterNumber: '3', lessonId: 'css-03-01', context: 'Advance to Module 3 on Responsive Design.' }
      ]
    }
  ]
};

export const cssModule03: Chapter = {
  id: 'css-mod-03',
  number: '3',
  badge: 'CSS 03',
  slug: 'responsive-design',
  title: 'Responsive Design',
  subtitle: 'Mobile-First Architecture, Media Queries, Container Queries (@container), Fluid Typography & clamp()',
  description: 'Design resilient responsive web applications that adapt gracefully across mobile, tablet, desktop, and ultra-wide viewports. Master mobile-first CSS architecture, CSS Container Queries (@container), fluid typography with clamp(), and responsive spacing scales.',
  estimatedHours: '4 hrs',
  accentColor: 'indigo',
  iconName: 'Maximize2',
  totalLessons: 5,
  lessons: [
    {
      id: 'css-03-01',
      chapterId: 'css-mod-03',
      number: '3.1',
      slug: 'mobile-first-architecture',
      title: 'Mobile-First Architecture',
      tagline: 'Progressive enhancement: building baseline constraints before layering desktop enhancements',
      durationMinutes: 25,
      learningObjectives: [
        'Understand the core philosophy of mobile-first CSS: min-width queries rather than max-width overrides',
        'Analyze performance benefits: mobile devices parse smaller baseline rules without desktop overrides',
        'Structure stylesheets with progressive enhancement layers'
      ],
      theorySections: [
        {
          heading: '1. Why Desktop-Down CSS is Broken',
          content: 'In legacy desktop-down CSS, developers styled a 1400px layout with fixed widths, floats, and multi-column grids, and then wrote dozens of max-width media queries trying to hide, shrink, or undo those rules for mobile. This led to bloated stylesheets and sluggish mobile rendering.',
          bulletPoints: [
            'Desktop-Down (Anti-pattern): Write desktop rules -> undo them with max-width: 768px -> undo again with max-width: 480px',
            'Mobile-First (Standard): Baseline rules target mobile screens (1 column, 100% width) -> enhance progressively with min-width: 768px for tablet and min-width: 1024px for desktop',
            'Simpler Code: You only add layout complexity when screen real estate expands; you never write rules to undo previous rules'
          ]
        },
        {
          heading: '2. Standard Breakpoint Strategy',
          content: 'Do not base breakpoints on specific device models (like "iPhone 15 Pro"). Base breakpoints on where your content naturally breaks.',
          bulletPoints: [
            '640px (sm): Large phones and small tablets in portrait',
            '768px (md): Tablets in portrait / dual column cards',
            '1024px (lg): Laptops and desktop workstations / full sidebar navigation',
            '1280px (xl): Large desktop displays / max content width bounds'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'Building a Watch Before a Grandfather Clock',
        concept: 'Mobile-First',
        story: 'If a watchmaker designs an ultra-compact mechanical watch movement that fits into a 38mm wrist frame, placing that movement into a large wooden grandfather clock cabinet is easy: you simply add a decorative frame around it. If you started with a 7-foot grandfather clock mechanism, trying to squish it into a wrist watch would break every gear.',
        moral: 'Solve layout within tight mobile constraints first; expanding onto large screens is effortless.',
        icon: 'Smartphone'
      },
      visualType: 'responsive-view',
      codeExample: {
        title: 'Mobile-First Progressive Enhancement Pattern',
        description: 'Single-column mobile baseline enhanced with min-width queries.',
        html: `<div class="responsive-layout">
  <div class="main-column">Primary Content</div>
  <aside class="sidebar-column">Sidebar Information</aside>
</div>`,
        css: `/* 1. Mobile Baseline (Default: 100% width, stacked vertically) */
.responsive-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
}

/* 2. Tablet & Desktop Enhancement (min-width: 768px) */
@media (min-width: 768px) {
  .responsive-layout {
    flex-direction: row;
    padding: 2rem;
  }
  .main-column {
    flex: 1;
  }
  .sidebar-column {
    width: 280px;
    flex-shrink: 0;
  }
}`,
        breakdown: [
          { lineRange: '2-7', title: 'Mobile Baseline', explanation: 'No media query needed; mobile devices parse and render this lightweight layout instantaneously.' },
          { lineRange: '10-21', title: 'min-width: 768px', explanation: 'Progressively introduces horizontal multi-column structure only when screen space permits.' }
        ]
      },
      video: {
        title: 'Mobile-First Responsive Engineering',
        duration: '15:15',
        description: 'Auditing mobile-first CSS architecture, simulating devices in DevTools, and eliminating max-width hacks.',
        keyPoints: ['min-width vs max-width', 'Content-driven breakpoints', 'Mobile performance audits'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Mobile First', description: 'Progressive enhancement.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we enforce mobile-first progressive enhancement across our stylesheets.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-css-03-01',
        title: 'Refactor max-width to min-width',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Convert a legacy desktop-down max-width layout into a clean mobile-first min-width layout.',
        instructions: [
          'Set mobile baseline: 1 column',
          'Add @media (min-width: 768px) with grid-template-columns: 1fr 1fr'
        ],
        starterHtml: `<div class="cols"><div>A</div><div>B</div></div>`,
        starterCss: `.cols { display: grid; grid-template-columns: 1fr 1fr; }
@media (max-width: 768px) { .cols { grid-template-columns: 1fr; } }`,
        starterJs: `console.log("Refactor to mobile first");`,
        solutionHtml: `<div class="cols"><div>A</div><div>B</div></div>`,
        solutionCss: `.cols { display: grid; grid-template-columns: 1fr; }
@media (min-width: 768px) { .cols { grid-template-columns: 1fr 1fr; } }`,
        solutionJs: `console.log("Mobile-first refactor complete");`,
        hints: ['Baseline: 1fr; min-width: 768px: 1fr 1fr.'],
        testCases: [
          { id: 'tc-css-11', description: 'Uses min-width: 768px', hint: 'Check min-width', checkType: 'text-contains', expectedValue: 'min-width' }
        ]
      },
      quiz: [
        {
          id: 'q-css-03-01',
          question: 'Why does mobile-first architecture (using min-width media queries) produce cleaner, more maintainable stylesheets than desktop-first (max-width)?',
          options: [
            'Because mobile-first code is encrypted',
            'You build a simple single-column baseline first, then add layout rules as screen space expands, avoiding complex rules that exist solely to undo previous desktop declarations',
            'Because Apple requires min-width by law',
            'It makes images black and white'
          ],
          correctIndex: 1,
          explanation: 'Mobile-first progressive enhancement only adds complexity as viewport grows, avoiding the brittle undoing of styles common in desktop-first CSS.'
        }
      ],
      summary: [
        'Mobile-first CSS uses min-width media queries to progressively enhance a clean single-column baseline.',
        'Base breakpoints on content requirements rather than specific manufacturer phone models.',
        'Mobile devices execute fewer calculations and render faster when not forced to override heavy desktop rules.'
      ],
      relatedTopics: [
        { title: 'Media Queries', chapterNumber: '3', lessonId: 'css-03-02', context: 'Master modern range syntax.' }
      ]
    },
    {
      id: 'css-03-02',
      chapterId: 'css-mod-03',
      number: '3.2',
      slug: 'media-queries',
      title: 'Media Queries',
      tagline: 'Modern range syntax (@media (width >= 768px)), hover capabilities, and print styles',
      durationMinutes: 25,
      learningObjectives: [
        'Master the modern Media Query Level 4 range syntax: @media (width >= 768px) instead of min-width',
        'Detect pointer capabilities with @media (hover: hover) vs. touch screens with @media (hover: none)',
        'Author print stylesheets with @media print for downloadable study guides and PDF exports'
      ],
      theorySections: [
        {
          heading: '1. The Modern Mathematical Range Syntax',
          content: 'Historically, media queries used clunky min-width / max-width syntax. Media Queries Level 4 introduced standard mathematical comparison operators (>=, <=, <, >), which are now universally supported in all evergreen browsers.',
          bulletPoints: [
            'Legacy: @media (min-width: 768px) and (max-width: 1024px)',
            'Modern: @media (768px <= width <= 1024px) (Clean, intuitive, readable range syntax!)',
            'Singular: @media (width >= 768px)'
          ]
        },
        {
          heading: '2. Interaction Media Features: hover and pointer',
          content: 'Never assume that small screen = touch and large screen = mouse. Touchscreen laptops and mice connected to iPads require feature queries that detect actual hardware input capabilities.',
          bulletPoints: [
            '@media (hover: hover): Device has a true mouse cursor capable of hovering over elements without activating them',
            '@media (hover: none): Pure touch screen; do NOT rely on hover effects to reveal critical action buttons or menus!'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Multi-Tool Inspection Sensor',
        concept: 'Media & Feature Queries',
        story: 'Instead of guessing what kind of vehicle is approaching based on weight alone, a toll booth sensor inspects multiple dimensions: height, axle count, and tire tread. Similarly, CSS inspects screen width, resolution, color gamut, and whether the user is touching the glass or holding a precision mouse.',
        moral: 'Query the hardware capabilities directly rather than guessing device types based on screen width.',
        icon: 'Maximize2'
      },
      visualType: 'responsive-view',
      codeExample: {
        title: 'Modern Range & Hover Feature Queries',
        description: 'Using modern comparison operators and hover detection.',
        html: `<div class="feature-query-card">
  <h4>Interaction Query Example</h4>
  <button class="action-btn">Hover Indicator</button>
</div>`,
        css: `/* Modern Range Syntax */
@media (width >= 768px) {
  .feature-query-card { padding: 2rem; }
}

/* Touch vs Mouse capability query */
@media (hover: hover) {
  .action-btn:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }
}
@media (hover: none) {
  /* On touch devices, keep buttons large and visible without hover */
  .action-btn {
    padding: 0.75rem 1.25rem;
  }
}`,
        breakdown: [
          { lineRange: '2-4', title: 'width >= 768px', explanation: 'Modern mathematical comparison syntax replacing legacy min-width declarations.' },
          { lineRange: '7-12', title: 'hover: hover', explanation: 'Only applies hover lift animations on devices with true mouse pointer capabilities.' }
        ]
      },
      video: {
        title: 'Modern Media Queries Level 4 Masterclass',
        duration: '14:30',
        description: 'Range syntax, hover feature detection, and authoring clean print stylesheets.',
        keyPoints: ['Comparison operators (>=, <=)', 'hover: hover and pointer: coarse', '@media print formatting'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Media Queries Level 4', description: 'Range syntax.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we master modern range syntax and interaction capability queries.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-css-03-02',
        title: 'Write Modern Range Query with Comparison Operator',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Author a media query using the modern range syntax for viewports greater than or equal to 1024px.',
        instructions: [
          'Use @media (width >= 1024px)',
          'Set .container { max-width: 1000px; }'
        ],
        starterHtml: `<div class="container">Content</div>`,
        starterCss: `.container { width: 100%; }`,
        starterJs: `console.log("Check modern range syntax");`,
        solutionHtml: `<div class="container">Content</div>`,
        solutionCss: `.container { width: 100%; }
@media (width >= 1024px) {
  .container { max-width: 1000px; }
}`,
        solutionJs: `console.log("Modern range query verified");`,
        hints: ['Use @media (width >= 1024px).'],
        testCases: [
          { id: 'tc-css-12', description: 'Uses width >= 1024px', hint: 'Check range syntax', checkType: 'text-contains', expectedValue: 'width >=' }
        ]
      },
      quiz: [
        {
          id: 'q-css-03-02',
          question: 'What is the purpose of the feature query @media (hover: hover)?',
          options: [
            'To detect if the user device has a pointing device capable of hovering over elements (like a mouse or trackpad)',
            'To make the website hover above the desk',
            'To play an audio sound effect',
            'To increase brightness'
          ],
          correctIndex: 0,
          explanation: '@media (hover: hover) tests whether the primary input mechanism can hover over elements, differentiating mice from touchscreens.'
        }
      ],
      summary: [
        'Modern CSS supports mathematical comparison syntax: @media (width >= 768px) and @media (768px <= width <= 1024px).',
        'Use @media (hover: hover) to restrict hover transitions to true mouse devices, preventing sticky hover bugs on touchscreens.',
        'Implement clean @media print stylesheets to ensure exported PDFs and printouts format cleanly without navbars or ads.'
      ],
      relatedTopics: [
        { title: 'Container Queries', chapterNumber: '3', lessonId: 'css-03-03', context: 'Component-level responsive design.' }
      ]
    },
    {
      id: 'css-03-03',
      chapterId: 'css-mod-03',
      number: '3.3',
      slug: 'container-queries',
      title: 'Container Queries',
      tagline: '@container queries: styling components based on parent container width, not viewport width',
      durationMinutes: 25,
      learningObjectives: [
        'Understand the fundamental limitation of viewport media queries for modular components',
        'Declare containment contexts using container-type: inline-size and container-name',
        'Write @container (width >= 400px) queries that adapt automatically whether a card is in a sidebar or main content'
      ],
      theorySections: [
        {
          heading: '1. Why Viewport Media Queries Broke Modular Design',
          content: 'For 15 years, responsive design suffered from a fundamental architectural flaw: media queries only measure the browser window width (@media (width >= 768px)). If you put a Card component into a narrow 250px sidebar on a 1920px desktop monitor, the card mistakenly rendered in wide desktop mode and broke, because the viewport was wide!',
          bulletPoints: [
            'Container Queries (@container): Measures the width of the parent container element, NOT the browser window',
            'True Component Modularity: The exact same Card component automatically renders as a stacked card in the sidebar, and as a wide horizontal card in the main column'
          ]
        },
        {
          heading: '2. Declaring a Container Context',
          content: 'To query an element size, its parent must establish a containment context.',
          bulletPoints: [
            'container-type: inline-size (Measures horizontal width of parent)',
            'container-name: card-slot (Optional named container targeting)',
            '@container (width >= 450px) { .card { flex-direction: row; } }'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Room Thermostat vs. The Weather Forecast',
        concept: 'Container Queries vs Media Queries',
        story: 'A media query is checking the city weather forecast on TV: "It is 25°C in London." A container query is the smart thermostat inside your specific room: "It is 18°C in this bedroom; turn on the radiator." The bedroom responds to its immediate local environment, not the city-wide atmosphere.',
        moral: 'Components should respond to the size of their parent room, not the size of the whole city viewport.',
        icon: 'Layout'
      },
      visualType: 'responsive-view',
      codeExample: {
        title: 'True Responsive Component with Container Queries',
        description: 'Card layout adapting based on its container slot width.',
        html: `<div class="sidebar-slot">
  <div class="adaptive-card">
    <div class="card-thumb">IMG</div>
    <div class="card-body">Adaptive Card (Narrow Slot)</div>
  </div>
</div>`,
        css: `/* Establish Container Context on Parent Slot */
.sidebar-slot {
  container-type: inline-size;
  container-name: slot;
  width: 100%;
}

/* Default Mobile/Narrow Representation */
.adaptive-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #0f172a;
  color: white;
  border-radius: 8px;
}

/* Adaptive Container Enhancement */
@container (width >= 400px) {
  .adaptive-card {
    flex-direction: row;
    align-items: center;
  }
}`,
        breakdown: [
          { lineRange: '2-4', title: 'container-type: inline-size', explanation: 'Establishes a containment boundary allowing child elements to query parent width.' },
          { lineRange: '18-23', title: '@container (width >= 400px)', explanation: 'Switches to horizontal layout only when the parent slot has 400px or more of space.' }
        ]
      },
      video: {
        title: 'CSS Container Queries: The Holy Grail of Modular Design',
        duration: '16:20',
        description: 'Hands-on comparison of @media vs @container queries and testing sidebar card responsiveness.',
        keyPoints: ['container-type: inline-size', '@container query syntax', 'Universal browser support'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Container Queries', description: 'Component-level responsive.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we unlock true component-level responsiveness using CSS Container Queries.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-css-03-03',
        title: 'Establish Container Context on Wrapper',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Declare container-type: inline-size on .card-wrapper so child elements can use @container queries.',
        instructions: [
          'Add container-type: inline-size to .card-wrapper'
        ],
        starterHtml: `<div class="card-wrapper"><div class="card">Card</div></div>`,
        starterCss: `.card-wrapper { width: 100%; }`,
        starterJs: `console.log("Add container context");`,
        solutionHtml: `<div class="card-wrapper"><div class="card">Card</div></div>`,
        solutionCss: `.card-wrapper { container-type: inline-size; width: 100%; }`,
        solutionJs: `console.log("Container context established");`,
        hints: ['Use container-type: inline-size.'],
        testCases: [
          { id: 'tc-css-13', description: 'Sets container-type inline-size', hint: 'Check container-type', checkType: 'style-computed', expectedValue: 'inline-size' }
        ]
      },
      quiz: [
        {
          id: 'q-css-03-03',
          question: 'What is the primary architectural breakthrough enabled by CSS Container Queries (@container)?',
          options: [
            'Components adapt based on the actual width of their immediate parent container rather than the entire browser viewport, making components truly portable and reusable anywhere in the UI',
            'It allows HTML to compile to WebAssembly',
            'It makes font files download faster',
            'It forces elements to display in 3D'
          ],
          correctIndex: 0,
          explanation: 'Container queries allow modular components to adapt to their immediate parent slot, whether placed in a narrow sidebar or wide hero section.'
        }
      ],
      summary: [
        'Container queries measure the parent element container rather than the global browser window.',
        'Declare container-type: inline-size on parent wrappers to enable container querying.',
        'Container queries enable truly self-contained, portable components that adapt flawlessly to any layout slot.'
      ],
      relatedTopics: [
        { title: 'Fluid Typography', chapterNumber: '3', lessonId: 'css-03-04', context: 'Master clamp() font scaling.' }
      ]
    },
    {
      id: 'css-03-04',
      chapterId: 'css-mod-03',
      number: '3.4',
      slug: 'fluid-typography',
      title: 'Fluid Typography',
      tagline: 'Dynamic font scaling with clamp(min, preferred, max) without stepping breakpoints',
      durationMinutes: 25,
      learningObjectives: [
        'Master the clamp(minimum, preferredVal, maximum) mathematical function',
        'Calculate fluid typography equations combining rem units with viewport units (vw)',
        'Eliminate jarring abrupt font size jumps across window resizing'
      ],
      theorySections: [
        {
          heading: '1. The Problem with Stepped Media Query Typography',
          content: 'In legacy CSS, developers wrote font-size: 16px on mobile, font-size: 20px at 768px, and font-size: 32px at 1024px. As users resized their browser or used unconventional display ratios, text jumped jarringly at each breakpoint. Modern CSS solves this with continuous fluid scaling.',
          bulletPoints: [
            'clamp(MIN, PREFERRED, MAX): Takes three parameters: minimum bound, ideal fluid scaling rate, and maximum ceiling',
            'Fluid Equation: font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem)',
            'On 320px screen: Evaluates to minimum 1.5rem (24px)',
            'On 1400px screen: Evaluates to maximum 3rem (48px)',
            'In between: Scales smoothly with every single pixel of screen resize!'
          ]
        },
        {
          heading: '2. Accessibility Guardrails for clamp()',
          content: 'Never use pure viewport units alone (e.g. font-size: 4vw). If a user increases their browser default zoom settings for visual accessibility, pure vw units do not zoom, violating WCAG standards. Always include a rem component in the preferred calculation: clamp(1rem, 0.8rem + 1vw, 2rem).',
          bulletPoints: [
            'WCAG 1.4.4 Compliance: Users must be able to zoom text up to 200% without loss of content',
            'Adding rem ensures browser zoom preferences are respected'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Continuous Stepless Dimmer Switch',
        concept: 'clamp() vs Media Breakpoints',
        story: 'A legacy media query is a 3-position toggle switch: Low (16px), Medium (24px), High (32px). When you flip the switch, the room abruptly flashes brighter. clamp() is a stepless rotary dimmer knob: you turn it smoothly, and the light transitions seamlessly to the exact lux required without any jarring clicks.',
        moral: 'clamp() creates smooth continuous scaling instead of harsh stepped jumps.',
        icon: 'Sliders'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Fluid Typography & Spacing Scale with clamp()',
        description: 'Smooth mathematical typography scaling from mobile to 4K displays.',
        html: `<div class="fluid-type-card">
  <h1 class="fluid-heading">Fluid Heading Scale</h1>
  <p class="fluid-body">This paragraph scales smoothly between 16px and 20px.</p>
</div>`,
        css: `:root {
  /* Fluid Typographic Tokens */
  --text-body: clamp(1rem, 0.95rem + 0.25vw, 1.25rem);      /* 16px to 20px */
  --text-h1: clamp(2rem, 1.5rem + 2vw, 3.5rem);             /* 32px to 56px */
  --space-gutter: clamp(1rem, 0.5rem + 2vw, 3rem);          /* 16px to 48px */
}
.fluid-heading {
  font-size: var(--text-h1);
  line-height: 1.15;
  color: #0f172a;
}
.fluid-body {
  font-size: var(--text-body);
  line-height: 1.6;
  color: #475569;
}`,
        breakdown: [
          { lineRange: '3-5', title: 'Fluid Tokens', explanation: 'Combines rem units with vw to create accessible, steplessly scalable typography and spacing tokens.' }
        ]
      },
      video: {
        title: 'Fluid Typography & Mathematical clamp() Scaling',
        duration: '14:50',
        description: 'Deriving fluid slope formulas, testing browser zoom accessibility, and fluid spacing scales.',
        keyPoints: ['clamp() mathematics formula', 'WCAG zoom compliance with rem', 'Fluid padding and gutters'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Fluid Math', description: 'clamp() mechanics.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we eliminate stepped media queries using mathematical fluid typography.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-css-03-04',
        title: 'Write a Fluid Heading clamp() Rule',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Set font-size on .hero-title using clamp(1.75rem, 1.2rem + 2vw, 3rem).',
        instructions: [
          'font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem)'
        ],
        starterHtml: `<h1 class="hero-title">Fluid Hero</h1>`,
        starterCss: `.hero-title { line-height: 1.2; }`,
        starterJs: `console.log("Check clamp typography");`,
        solutionHtml: `<h1 class="hero-title">Fluid Hero</h1>`,
        solutionCss: `.hero-title { font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem); line-height: 1.2; }`,
        solutionJs: `console.log("Fluid clamp typography verified");`,
        hints: ['Use font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem).'],
        testCases: [
          { id: 'tc-css-14', description: 'Applies clamp to font-size', hint: 'Check clamp()', checkType: 'text-contains', expectedValue: 'clamp(' }
        ]
      },
      quiz: [
        {
          id: 'q-css-03-04',
          question: 'Why must the middle "preferred" value in a fluid typography clamp() function include a rem or px component alongside viewport units (e.g. 1rem + 2vw instead of 2vw alone)?',
          options: [
            'To satisfy browser accessibility zoom: pure viewport units do not scale when a visually impaired user increases their browser zoom settings, violating WCAG standards',
            'Because browsers crash on pure vw units',
            'To make letters italic',
            'To change the font family to Comic Sans'
          ],
          correctIndex: 0,
          explanation: 'Pure vw units ignore browser default zoom settings; mixing rem preserves user accessibility zoom preferences.'
        }
      ],
      summary: [
        'clamp(min, preferred, max) creates stepless, continuous fluid typography that scales with every pixel of screen resize.',
        'Always combine rem with viewport units in the preferred parameter to respect accessibility zoom settings.',
        'Apply clamp() to padding, margins, and gutters to create fully harmonious fluid layouts.'
      ],
      relatedTopics: [
        { title: 'Responsive Spacing and Layouts', chapterNumber: '3', lessonId: 'css-03-05', context: 'Build harmonious spacing scales.' }
      ]
    },
    {
      id: 'css-03-05',
      chapterId: 'css-mod-03',
      number: '3.5',
      slug: 'responsive-spacing-and-layouts',
      title: 'Responsive Spacing and Layouts',
      tagline: 'Harmonious spacing scales, viewport-responsive gutters, and content bounds',
      durationMinutes: 25,
      learningObjectives: [
        'Build a mathematical spacing system based on a 4px/8px modular grid',
        'Implement fluid layout gutters and containers with max-width content bounds',
        'Prevent horizontal overflow scrollbars permanently across all viewport dimensions'
      ],
      theorySections: [
        {
          heading: '1. The 8-Point Spacing System',
          content: 'Arbitrary margins (e.g. margin-top: 17px; padding-left: 23px) make layouts feel chaotic. Professional design systems adhere strictly to an 8-point modular spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px).',
          bulletPoints: [
            'Multiples of 8px align perfectly with standard screen resolutions and icon dimensions',
            'Predictable spacing tokens: --space-1: 4px; --space-2: 8px; --space-4: 16px; --space-6: 24px; --space-8: 32px'
          ]
        },
        {
          heading: '2. Eliminating Horizontal Scrollbars Forever',
          content: 'Unintended horizontal scrolling is the most common bug in responsive web development. It is caused by fixed widths (width: 500px), unconstrained images, or elements with 100vw that do not account for browser scrollbar widths.',
          bulletPoints: [
            'Rule 1: Never use width: 100vw for full-width elements; use width: 100% to avoid vertical scrollbar track overflow',
            'Rule 2: Always declare img, video, svg { max-width: 100%; height: auto; }',
            'Rule 3: Use max-width with margin: 0 auto for centered reading containers'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Precision Architectural Grid Paper',
        concept: 'Spacing Scales',
        story: 'When an engineer draws a mechanical schematic, they draw on blue grid paper with 8mm squares. Every screw hole, plate width, and bolt spacing is an exact multiple of the 8mm grid. The components bolt together effortlessly with zero measurement discrepancies.',
        moral: 'Adhere to an 8-point spacing scale to give your entire interface visual harmony and rhythmic cohesion.',
        icon: 'Layout'
      },
      visualType: 'box-model',
      codeExample: {
        title: 'Responsive Centered Container Pattern',
        description: 'Standard container pattern with max-width bounds and fluid padding.',
        html: `<div class="content-container">
  <h2>Centered Responsive Content</h2>
  <p>Constrained to 1280px maximum width with fluid side padding.</p>
</div>`,
        css: `.content-container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
}`,
        breakdown: [
          { lineRange: '2-5', title: 'max-width & auto margins', explanation: 'Centers content on large screens while allowing it to adapt to 100% width on mobile.' },
          { lineRange: '6-7', title: 'clamp padding', explanation: 'Creates comfortable 16px gutters on mobile that expand to 40px on desktop screens.' }
        ]
      },
      video: {
        title: 'Mastering Responsive Spacing & Layout Bounds',
        duration: '15:20',
        description: 'Auditing 8-point spacing tokens, debugging horizontal scroll overflow, and container constraints.',
        keyPoints: ['8-point spacing system', 'Debugging overflow-x causes', 'max-width auto-centering'],
        timestamps: [{ time: '00:00', seconds: 0, title: 'Spacing Scales', description: 'Harmonious systems.' }],
        transcript: [{ speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, we enforce disciplined spacing systems and eliminate horizontal overflow.' }],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-css-03-05',
        title: 'Create Centered Container with Fluid Gutters',
        difficulty: 'Beginner',
        estimatedTime: '10 mins',
        prompt: 'Build a container class with max-width: 1200px, auto margins, and fluid padding using clamp(1rem, 3vw, 2rem).',
        instructions: [
          'max-width: 1200px',
          'margin-inline: auto',
          'padding-inline: clamp(1rem, 3vw, 2rem)'
        ],
        starterHtml: `<div class="wrap">Content</div>`,
        starterCss: `.wrap { width: 100%; }`,
        starterJs: `console.log("Check centered container");`,
        solutionHtml: `<div class="wrap">Content</div>`,
        solutionCss: `.wrap { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: clamp(1rem, 3vw, 2rem); }`,
        solutionJs: `console.log("Centered fluid container verified");`,
        hints: ['Use margin-inline: auto for horizontal centering.'],
        testCases: [
          { id: 'tc-css-15', description: 'Applies max-width: 1200px', hint: 'Check max-width', checkType: 'style-computed', expectedValue: '1200px' }
        ]
      },
      quiz: [
        {
          id: 'q-css-03-05',
          question: 'Why does setting width: 100vw on an element frequently cause an unwanted horizontal scrollbar on desktop browsers?',
          options: [
            'Because CSS dislikes the letter w',
            '100vw includes the width of the vertical scrollbar track, so when vertical content causes a scrollbar to appear, 100vw exceeds the viewport inner width by the scrollbar thickness (~15px)',
            'Because images are not allowed to be full width',
            'Because of font rendering bugs'
          ],
          correctIndex: 1,
          explanation: '100vw calculates width including the scrollbar track, whereas 100% respects the actual inner document box width.'
        }
      ],
      summary: [
        'Adhere to an 8-point modular spacing scale (4, 8, 16, 24, 32, 48px) for harmonious visual rhythm.',
        'Use width: 100% instead of 100vw to prevent horizontal scrollbar overflows.',
        'Combine max-width with margin: 0 auto and fluid clamp() gutters for robust page containers.'
      ],
      relatedTopics: [
        { title: 'Design Tokens', chapterNumber: '4', lessonId: 'css-04-01', context: 'Advance to Module 4 on Design Systems.' }
      ]
    }
  ]
};

export const MODERN_CSS_MODULES_1_TO_3: Chapter[] = [
  cssModule01,
  cssModule02,
  cssModule03
];
