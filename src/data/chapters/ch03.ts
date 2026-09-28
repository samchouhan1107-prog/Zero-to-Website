import { Chapter } from '../../utils/types';

export const chapter03: Chapter = {
  id: 'ch-03',
  number: '03',
  badge: '03',
  slug: 'css-mastery',
  title: 'CSS Mastery & Visual Design',
  subtitle: 'Box Model, Specificity, Typography, Positioning & Page Builds',
  description: 'Master CSS from mathematical box sizing to advanced cascading specificity. Learn content, padding, border, and margin relationships, master rem/em/vh units, understand absolute/relative/sticky positioning, and build a complete styled landing page.',
  estimatedHours: '4 hrs',
  accentColor: 'teal',
  iconName: 'Layout',
  totalLessons: 6,
  lessons: [
    {
      id: 'ch-03-l-01',
      chapterId: 'ch-03',
      number: '3.1',
      slug: 'css-box-model',
      title: 'The CSS Box Model',
      tagline: 'Master the 4 concentric layers of every rendered HTML element: content, padding, border, and margin',
      durationMinutes: 25,
      learningObjectives: [
        'Deconstruct the 4 concentric layers: Content, Padding, Border, Margin',
        'Understand the critical difference between content-box and border-box sizing',
        'Explain why box-sizing: border-box is the universal CSS reset standard',
        'Inspect and measure computed box dimensions in browser DevTools'
      ],
      theorySections: [
        {
          heading: '1. The 4 Concentric Layers',
          content: 'Every single element on a webpage is a rectangular box. Even circular avatars or rounded badges are mathematically computed as rectangles governed by the Box Model.',
          bulletPoints: [
            'Content: The innermost area where text and images actually render (width x height)',
            'Padding: The transparent cushion clearing space between content and the border (inside the box)',
            'Border: The outline wrapping the padding and content (has width, style, and color)',
            'Margin: The transparent cushion clearing space outside the border between neighboring elements'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden Rule of Sizing: In content-box, width = content only. Adding padding or border expands the total element width! In border-box, width = content + padding + border combined.'
          }
        },
        {
          heading: '2. The Universal Box Sizing Reset',
          content: 'Modern CSS starts with a universal reset that enforces border-box across every element, eliminating unexpected layout overflow bugs.',
          bulletPoints: [
            '*, *::before, *::after { box-sizing: border-box; }',
            'Prevents padding from expanding containers beyond their specified width',
            'Enables intuitive 100% width inputs with interior padding'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Framed Painting on a Living Room Wall',
        concept: 'The 4 Concentric Layers',
        story: 'The canvas painting of a mountain landscape is the Content. The white matting paper protecting the artwork is the Padding. The polished wooden frame holding it together is the Border. The empty wall space you leave between this frame and the next framed painting is the Margin.',
        moral: 'Padding protects the inside; Margin respects the neighbors outside.',
        icon: 'Box'
      },
      visualType: 'box-model',
      codeExample: {
        title: 'Comparing content-box vs border-box',
        description: 'Notice how both boxes have width: 200px and padding: 20px, but render at drastically different actual sizes.',
        html: `<div class="box-comparison">
  <div class="box content-box">
    <h4>content-box</h4>
    <p>Total: 240px wide!</p>
  </div>
  <div class="box border-box">
    <h4>border-box</h4>
    <p>Total: exactly 200px</p>
  </div>
</div>`,
        css: `.box-comparison {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
}
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid #0284c7;
  background: white;
  border-radius: 6px;
}
.content-box {
  box-sizing: content-box;
}
.border-box {
  box-sizing: border-box;
}`,
        breakdown: [
          {
            lineRange: 'Lines 12-16',
            title: 'box-sizing: content-box',
            explanation: 'Width (200px) + Padding Left/Right (40px) = 240px total rendered width.',
            highlightTokens: ['box-sizing: content-box']
          },
          {
            lineRange: 'Lines 17-20',
            title: 'box-sizing: border-box',
            explanation: 'Total width remains strictly 200px; the content area shrinks to accommodate padding.',
            highlightTokens: ['box-sizing: border-box']
          }
        ]
      },
      video: {
        title: 'Mastering the CSS Box Model and DevTools Diagram',
        duration: '14:30',
        description: 'Visual walkthrough of margin collapse, padding calculations, and the DevTools Box Model diagram.',
        keyPoints: [
          'The DevTools Box Model visualizer',
          'Margin collapse on vertical siblings',
          'Why border-box is essential for responsive grids'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'The 4 Layers', description: 'Content, padding, border, margin' },
          { time: '05:00', seconds: 300, title: 'content-box vs border-box', description: 'Math and sizing' },
          { time: '10:00', seconds: 600, title: 'Margin Collapse', description: 'Vertical spacing quirks' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'If you master the Box Model, 80% of your CSS layout confusion vanishes forever.' }
        ],
        demoAnimationType: 'css-cascade'
      },
      practice: {
        id: 'prac-03-01',
        title: 'Build a Pixel-Perfect Feature Card with border-box',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Style a feature container (<div class="stat-card">) using box-sizing: border-box, with padding: 24px, a 2px solid border, and margin-bottom: 16px.',
        instructions: [
          'Apply box-sizing: border-box to .stat-card',
          'Add padding: 24px and border: 2px solid #0284c7',
          'Set a distinct background and border-radius: 8px'
        ],
        starterHtml: `<div class="stat-card">
  <h3>Active Learners</h3>
  <span class="number">12,450+</span>
</div>`,
        starterCss: `.stat-card {
  /* Add box-sizing, padding, and border below */
  width: 250px;
}
.stat-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #64748b;
}
.number {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0284c7;
}`,
        starterJs: `console.log("Stat card loaded.");`,
        solutionHtml: `<div class="stat-card">
  <h3>Active Learners</h3>
  <span class="number">12,450+</span>
</div>`,
        solutionCss: `.stat-card {
  box-sizing: border-box;
  width: 250px;
  padding: 24px;
  border: 2px solid #0284c7;
  border-radius: 8px;
  background: white;
}
.stat-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #64748b;
}
.number {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0284c7;
}`,
        solutionJs: `console.log("Stat card loaded.");`,
        hints: [
          'Set box-sizing: border-box on .stat-card.',
          'Add padding: 24px and border: 2px solid #0284c7.'
        ],
        testCases: [
          {
            id: 'tc-03-1a',
            description: 'stat-card has border-box sizing',
            hint: 'Set box-sizing: border-box on .stat-card',
            checkType: 'style-computed',
            target: '.stat-card',
            expectedValue: 'border-box'
          }
        ],
        conceptQuestion: {
          question: 'If an element has width: 300px, padding: 20px, and box-sizing: content-box, what is its total rendered width on screen?',
          options: ['340px', '300px', '260px', '320px'],
          correctIndex: 0,
          explanation: 'With content-box, total width = width (300px) + left padding (20px) + right padding (20px) = 340px.'
        }
      },
      quiz: [
        {
          id: 'q-03-1',
          question: 'Which CSS property creates spacing INSIDE an element between its content and its border?',
          options: ['padding', 'margin', 'gap', 'outline'],
          correctIndex: 0,
          explanation: 'Padding is the interior spacing between content and border. Margin is exterior spacing.'
        }
      ],
      summary: [
        'The Box Model contains Content, Padding, Border, and Margin.',
        'box-sizing: border-box ensures width includes padding and border.',
        'Margin creates space between sibling elements; padding creates space within elements.',
        'DevTools Elements tab displays an interactive Box Model diagram for any selected node.'
      ],
      relatedTopics: [
        {
          title: 'Selectors & Specificity',
          chapterNumber: '03',
          lessonId: 'ch-03-l-02',
          context: 'Understand how CSS rules target elements and resolve conflicts.'
        }
      ]
    },
    {
      id: 'ch-03-l-02',
      chapterId: 'ch-03',
      number: '3.2',
      slug: 'selectors-and-specificity',
      title: 'Selectors & Specificity',
      tagline: 'Master class, ID, attribute, and pseudo-class selectors, and calculate the specificity hierarchy',
      durationMinutes: 25,
      learningObjectives: [
        'Master core selectors: element, class, ID, descendant, child, and sibling',
        'Learn interactive pseudo-classes: :hover, :focus, :active, :nth-child()',
        'Understand the Specificity Hierarchy: Inline > IDs > Classes/Attributes > Elements',
        'Avoid common specificity traps and understand why !important is considered an anti-pattern'
      ],
      theorySections: [
        {
          heading: '1. The Specificity Hierarchy (A-B-C-D)',
          content: 'When two conflicting CSS rules target the exact same element, the browser uses Specificity Math to decide which rule wins.',
          bulletPoints: [
            'Inline styles: style="..." (Weight: 1000)',
            'IDs: #main-header (Weight: 100)',
            'Classes, pseudo-classes, attribute selectors: .btn, :hover, [type="text"] (Weight: 10)',
            'Elements and pseudo-elements: p, div, ::before (Weight: 1)'
          ],
          callout: {
            type: 'warning',
            text: 'Why avoid !important? It overrides the natural specificity cascade, making future styling overrides almost impossible without adding even more !important tags.'
          }
        },
        {
          heading: '2. Combinators and Pseudo-Classes',
          content: 'Combinators define relationships between selectors.',
          bulletPoints: [
            'Descendant (space): div p selects all <p> anywhere inside <div>',
            'Child (>): ul > li selects only direct children <li> of <ul>',
            ':nth-child(even/odd): Targets alternating rows in tables or lists',
            ':not(.active): Targets all elements that do not match the class'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Military Ranking Protocol',
        concept: 'CSS Specificity Weights',
        story: 'If a Private (element selector) gives you an order, you follow it. But if a Sergeant (class selector) gives a contradictory order, the Sergeant outranks the Private. If a General (ID selector) enters and issues an order, the General overrides both. And if the Commander-in-Chief hands you an Executive Order in person (inline style), it supersedes everyone.',
        moral: 'Structure your styles using Sergeant-level classes (.card, .btn) for clean, predictable overrides.',
        icon: 'Shield'
      },
      visualType: 'box-model',
      codeExample: {
        title: 'Specificity Score Comparison',
        description: 'Demonstrating how a class (.highlight) overrides a plain element selector (p).',
        html: `<div id="content">
  <p class="announcement">Default announcement text</p>
  <p class="announcement highlight">Special highlighted text</p>
</div>`,
        css: `/* Specificity: 0,0,0,1 */
p {
  color: #64748b;
}

/* Specificity: 0,0,1,0 */
.announcement {
  font-size: 1rem;
  color: #1e293b;
}

/* Specificity: 0,0,2,0 - Wins! */
.announcement.highlight {
  color: #059669;
  font-weight: 700;
}`,
        breakdown: [
          {
            lineRange: 'Line 2-4',
            title: 'Element Selector (p)',
            explanation: 'Lowest specificity weight (0,0,0,1).',
            highlightTokens: ['p']
          },
          {
            lineRange: 'Line 12-15',
            title: 'Chained Class Selectors (.announcement.highlight)',
            explanation: 'Combines two class weights (0,0,2,0) to triumph over single class selectors.',
            highlightTokens: ['.announcement.highlight']
          }
        ]
      },
      video: {
        title: 'Calculating CSS Specificity and Avoiding !important Wars',
        duration: '13:40',
        description: 'Visual breakdown of the specificity calculator, combinators, and pseudo-class styling.',
        keyPoints: [
          'Calculating (Inline, ID, Class, Element) scores',
          'Pseudo-classes vs pseudo-elements',
          'Safe refactoring without !important'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'What is Specificity', description: 'Conflict resolution' },
          { time: '04:30', seconds: 270, title: 'The Scoring System', description: '1000 - 100 - 10 - 1' },
          { time: '09:00', seconds: 540, title: 'Pseudo-Classes', description: ':hover and :focus' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Understanding specificity prevents the dreaded CSS specificity war.' }
        ],
        demoAnimationType: 'css-cascade'
      },
      practice: {
        id: 'prac-03-02',
        title: 'Style an Interactive Button with :hover and :active',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Style a button with class "cta-btn" with a primary blue background (#2563eb). Add a :hover state that darkens the background to #1d4ed8, and an :active state that shrinks it with transform: scale(0.98).',
        instructions: [
          'Style .cta-btn with background: #2563eb, color: white, and padding: 0.5rem 1.25rem',
          'Add .cta-btn:hover with background: #1d4ed8',
          'Add .cta-btn:active with transform: scale(0.98)'
        ],
        starterHtml: `<button class="cta-btn">Enroll Now</button>`,
        starterCss: `.cta-btn {
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  /* Add styles here */
}`,
        starterJs: `console.log("CTA button initialized.");`,
        solutionHtml: `<button class="cta-btn">Enroll Now</button>`,
        solutionCss: `.cta-btn {
  background: #2563eb;
  color: white;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}
.cta-btn:hover {
  background: #1d4ed8;
}
.cta-btn:active {
  transform: scale(0.98);
}`,
        solutionJs: `console.log("CTA button initialized.");`,
        hints: [
          'Use .cta-btn:hover { background: #1d4ed8; }',
          'Use .cta-btn:active { transform: scale(0.98); }'
        ],
        testCases: [
          {
            id: 'tc-03-2a',
            description: 'Button exists with class cta-btn',
            hint: 'Ensure button has class cta-btn',
            checkType: 'selector-exists',
            target: 'button.cta-btn'
          }
        ],
        conceptQuestion: {
          question: 'Which selector has higher specificity: an ID selector (#nav) or five chained class selectors (.header.nav.menu.dark.fixed)?',
          options: [
            'The ID selector (#nav)',
            'The five chained class selectors',
            'They have equal specificity',
            'It depends on which comes later in the stylesheet'
          ],
          correctIndex: 0,
          explanation: 'An ID selector has a specificity weight of 0,1,0,0 (100). No amount of class selectors (0,0,5,0 = 50) can override a single ID selector.'
        }
      },
      quiz: [
        {
          id: 'q-03-2',
          question: 'Which pseudo-class targets an input element when the user clicks inside to type?',
          options: [':focus', ':hover', ':active', ':visited'],
          correctIndex: 0,
          explanation: ':focus applies when an element receives keyboard or pointer input focus.'
        }
      ],
      summary: [
        'Specificity dictates which CSS rule applies when conflicting styles target an element.',
        'Specificity formula: Inline (1000) > ID (100) > Class/Pseudo-class (10) > Element (1).',
        'Pseudo-classes (:hover, :focus, :active) style dynamic interaction states.',
        'Prefer classes over IDs and inline styles for flexible, maintainable code.'
      ],
      relatedTopics: [
        {
          title: 'Colors, Units & Typography',
          chapterNumber: '03',
          lessonId: 'ch-03-l-03',
          context: 'Explore modern color formats (OKLCH, HEX), relative units (rem, em), and typography.'
        }
      ]
    },
    {
      id: 'ch-03-l-03',
      chapterId: 'ch-03',
      number: '3.3',
      slug: 'colors-units-typography',
      title: 'Colors, Units & Typography',
      tagline: 'Master relative vs absolute units (rem, em, px, vh), modern color spaces, and web typography',
      durationMinutes: 25,
      learningObjectives: [
        'Differentiate between absolute (px) and relative units (rem, em, %, vh, vw)',
        'Understand why rem is the gold standard for accessible, responsive font sizing',
        'Explore modern color models: HEX, RGB, HSL, and modern OKLCH',
        'Master typography rules: font-family stacks, font-weight, line-height, and letter-spacing'
      ],
      theorySections: [
        {
          heading: '1. The Unit Ecosystem: Why rem Reigns Supreme',
          content: 'Hardcoding pixel values (px) disables user accessibility preferences. If an elder user increases their browser default font size from 16px to 24px, websites built with px will remain tiny and unreadable.',
          bulletPoints: [
            'px (Pixels): Absolute fixed screen units. Ignores user accessibility font scaling',
            'rem (Root EM): Relative to the root <html> font size (default 1rem = 16px). Scales perfectly with user accessibility settings',
            'em: Relative to the font size of the immediate parent element (great for component padding)',
            'vh / vw: Viewport percentage units (100vh = 100% of the visible browser window height)'
          ]
        },
        {
          heading: '2. Modern Color Models & Contrast',
          content: 'Modern CSS supports intuitive color spaces that make creating harmonious color palettes straightforward.',
          bulletPoints: [
            'HEX (#2563eb): Compact 6-character hexadecimal notation for RGB channels',
            'HSL (hsl(217, 91%, 60%)): Hue (0-360), Saturation (0-100%), Lightness (0-100%)',
            'Accessibility Contrast: WCAG AA requires a 4.5:1 contrast ratio between body text and its background'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'Elastic Waistbands vs Rigid Steel Belts',
        concept: 'Relative Units (rem) vs Fixed Pixels (px)',
        story: 'A rigid steel belt only fits one exact waist size. If your body changes after dinner, you are in agony. An elastic waistband adjusts comfortably whether you are sitting, standing, or growing. The rem unit is an elastic waistband that adjusts fluidly to whatever font size the user requires for comfortable reading.',
        moral: 'Build accessible UIs using rem for fonts and spacing so all users can read comfortably.',
        icon: 'Type'
      },
      visualType: 'box-model',
      codeExample: {
        title: 'Fluid Accessible Typography Stack',
        description: 'Using rem units and system font stacks for clean readability.',
        html: `<div class="typography-sample">
  <h1>Accessible Heading (2rem)</h1>
  <p class="body-text">This paragraph uses 1rem font size with 1.6 line-height for optimal reading ergonomics.</p>
  <span class="caption">0.875rem helper caption</span>
</div>`,
        css: `.typography-sample {
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
h1 {
  font-size: 2rem; /* 32px by default */
  line-height: 1.25;
  color: #0f172a;
  margin-top: 0;
}
.body-text {
  font-size: 1rem; /* 16px by default */
  line-height: 1.6;
  color: #334155;
}
.caption {
  font-size: 0.875rem; /* 14px */
  color: #64748b;
}`,
        breakdown: [
          {
            lineRange: 'Line 9-13',
            title: 'Heading with 2rem and Tight line-height',
            explanation: 'Headings look best with tighter line-heights (1.2 to 1.3).',
            highlightTokens: ['font-size: 2rem', 'line-height: 1.25']
          },
          {
            lineRange: 'Line 14-18',
            title: 'Body Text with 1.6 line-height',
            explanation: 'Body paragraphs require generous line-height (1.5 - 1.7) to prevent visual fatigue.',
            highlightTokens: ['line-height: 1.6']
          }
        ]
      },
      video: {
        title: 'Mastering CSS Units: rem, em, px, and Viewport Units',
        duration: '12:50',
        description: 'Why you should stop using px for font sizes, and how rem empowers accessible scaling.',
        keyPoints: [
          'The rem vs em calculation breakdown',
          'Viewport height units (100vh vs 100dvh)',
          'WCAG contrast checking in DevTools'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'The Unit Debate', description: 'px vs rem' },
          { time: '04:30', seconds: 270, title: 'Typography Hierarchy', description: 'Font scales' },
          { time: '08:45', seconds: 525, title: 'Color Contrast', description: 'Meeting WCAG AA' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Typography is 95% of web design. Mastering rem and line-height makes your sites instantly look professional.' }
        ],
        demoAnimationType: 'css-cascade'
      },
      practice: {
        id: 'prac-03-03',
        title: 'Create an Accessible Reading Card',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Style a reading card (<article class="reading-card">) with font-size: 1rem, line-height: 1.6, and an <h2> title with font-size: 1.5rem and color: #0f172a.',
        instructions: [
          'Set font-size: 1rem and line-height: 1.6 on .reading-card',
          'Set font-size: 1.5rem and color: #0f172a on .reading-card h2',
          'Add padding: 1.5rem with a light border'
        ],
        starterHtml: `<article class="reading-card">
  <h2>The Power of Typography</h2>
  <p>Good typography establishes clear hierarchy and ensures high legibility across all screen sizes.</p>
</article>`,
        starterCss: `.reading-card {
  max-width: 500px;
  background: white;
  border-radius: 8px;
  /* Add font-size, line-height, and padding */
}`,
        starterJs: `console.log("Reading card ready.");`,
        solutionHtml: `<article class="reading-card">
  <h2>The Power of Typography</h2>
  <p>Good typography establishes clear hierarchy and ensures high legibility across all screen sizes.</p>
</article>`,
        solutionCss: `.reading-card {
  max-width: 500px;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  line-height: 1.6;
  color: #334155;
}
.reading-card h2 {
  font-size: 1.5rem;
  color: #0f172a;
  margin-top: 0;
  margin-bottom: 0.5rem;
}`,
        solutionJs: `console.log("Reading card ready.");`,
        hints: [
          'Use font-size: 1.5rem on the h2.',
          'Use line-height: 1.6 on .reading-card for comfortable reading.'
        ],
        testCases: [
          {
            id: 'tc-03-3a',
            description: 'Reading card exists with h2',
            hint: 'Ensure .reading-card has an h2 heading',
            checkType: 'selector-exists',
            target: '.reading-card h2'
          }
        ],
        conceptQuestion: {
          question: 'If the browser root font size is 16px, how many pixels does 2rem represent?',
          options: ['32px', '16px', '24px', '20px'],
          correctIndex: 0,
          explanation: '2rem = 2 * 16px = 32px.'
        }
      },
      quiz: [
        {
          id: 'q-03-3',
          question: 'What is the minimum recommended line-height for body paragraphs to ensure comfortable readability?',
          options: ['1.5 to 1.7', '1.0', '0.8', '2.5'],
          correctIndex: 0,
          explanation: 'A line-height of 1.5 to 1.7 provides optimal vertical breathing room between lines of text.'
        }
      ],
      summary: [
        'rem units scale relative to the root font size, preserving user accessibility settings.',
        'em units scale relative to parent font size, ideal for component padding.',
        'Always maintain a 4.5:1 contrast ratio for body text to pass WCAG AA standards.',
        'Generous line-height (1.5-1.7) prevents eye strain on long paragraphs.'
      ],
      relatedTopics: [
        {
          title: 'Display & Positioning',
          chapterNumber: '03',
          lessonId: 'ch-03-l-04',
          context: 'Control element placement with block, inline-block, relative, absolute, and fixed positioning.'
        }
      ]
    },
    {
      id: 'ch-03-l-04',
      chapterId: 'ch-03',
      number: '3.4',
      slug: 'display-and-positioning',
      title: 'Display & Positioning',
      tagline: 'Understand block vs inline flow, and master static, relative, absolute, fixed, and sticky positioning',
      durationMinutes: 25,
      learningObjectives: [
        'Master the display property: block, inline, inline-block, and none',
        'Learn the 5 CSS position modes: static, relative, absolute, fixed, and sticky',
        'Understand the absolute positioning anchor rule (position: relative on the parent)',
        'Master z-index stacking contexts to control layer overlap'
      ],
      theorySections: [
        {
          heading: '1. Display Types: Block vs Inline',
          content: 'HTML elements fall into normal document flow depending on their display behavior.',
          bulletPoints: [
            'block (div, p, h1): Takes up the full width available and starts on a fresh line',
            'inline (span, a, strong): Only takes up space needed for its content; width and height properties have no effect',
            'inline-block: Sits inline on the same line as neighboring text, but respects width, height, and vertical padding',
            'none: Completely removes the element from the render tree'
          ]
        },
        {
          heading: '2. The 5 Position Values',
          content: 'The position property changes how an element is located in the document.',
          bulletPoints: [
            'static: The default. Sits in normal document flow. top/left/z-index do nothing',
            'relative: Sits in normal flow, but can be offset relative to its original position without affecting siblings',
            'absolute: Removed from normal flow. Positioned relative to its nearest positioned ancestor (usually position: relative)',
            'fixed: Positioned relative to the browser viewport window. Remains locked in place during scroll',
            'sticky: Hybrid. Scrolls normally until a threshold (e.g. top: 0), then sticks like fixed'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden Absolute Rule: An element with position: absolute looks up the DOM tree for the nearest ancestor with position: relative. If none exists, it positions relative to the entire <html> page!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Pinned Post-it Note and the Desk',
        concept: 'position: relative and position: absolute',
        story: 'Your desk is the container (position: relative). You place a sticky Post-it note on top of it (position: absolute; top: 10px; right: 10px). If you pick up and move the entire desk to the other side of the room, the Post-it stays right in the top-right corner of the desk because it is anchored to the desk, not the room.',
        moral: 'Always put position: relative on the parent container when positioning badges or overlays.',
        icon: 'Layers'
      },
      visualType: 'box-model',
      codeExample: {
        title: 'Badge Overlay with Absolute Positioning',
        description: 'Notice how the badge anchors perfectly to the top-right corner of the relative card.',
        html: `<div class="card-container">
  <span class="notification-badge">NEW</span>
  <h3>Cloud Architecture Masterclass</h3>
  <p>Learn scalable distributed systems design.</p>
</div>`,
        css: `.card-container {
  position: relative; /* Anchor for absolute children */
  width: 300px;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.notification-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 800;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`,
        breakdown: [
          {
            lineRange: 'Line 2',
            title: 'position: relative on Parent',
            explanation: 'Establishes the coordinate origin (0,0) for any absolute child.',
            highlightTokens: ['position: relative']
          },
          {
            lineRange: 'Line 9-12',
            title: 'position: absolute with top/right offsets',
            explanation: 'Offsets the badge -10px outside the top and right edges.',
            highlightTokens: ['position: absolute', 'top: -10px', 'right: -10px']
          }
        ]
      },
      video: {
        title: 'Demystifying CSS Position: Relative, Absolute, Fixed & Sticky',
        duration: '15:10',
        description: 'Live coding sticky navigation bars, badge overlays, modal backdrops, and debugging z-index stacking contexts.',
        keyPoints: [
          'Static vs relative vs absolute',
          'Building a sticky navbar in 2 lines of CSS',
          'How stacking contexts work with z-index'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'The 5 Positions', description: 'Definitions' },
          { time: '05:00', seconds: 300, title: 'Absolute Anchor Rule', description: 'Parent-child anchoring' },
          { time: '10:15', seconds: 615, title: 'Sticky Navigation', description: 'top: 0 and z-index' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Once you understand the parent-child anchor relationship, absolute positioning becomes your best friend.' }
        ],
        demoAnimationType: 'css-cascade'
      },
      practice: {
        id: 'prac-03-04',
        title: 'Build a Notification Card with Floating Pill Badge',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create a relative container (<div class="promo-card">) containing an <h3> title, and an absolute pill badge (<span class="pill-badge">PRO</span>) pinned to top: 12px and right: 12px.',
        instructions: [
          'Set position: relative on .promo-card',
          'Set position: absolute, top: 12px, right: 12px on .pill-badge',
          'Style the badge with background: #059669 and color: white'
        ],
        starterHtml: `<div class="promo-card">
  <span class="pill-badge">PRO</span>
  <h3>Full-Stack Track</h3>
  <p>Access all 10 chapters and certification capstones.</p>
</div>`,
        starterCss: `.promo-card {
  /* Add position: relative and padding */
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  max-width: 350px;
}
.pill-badge {
  /* Add position: absolute and coordinates */
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: bold;
}`,
        starterJs: `console.log("Promo card ready.");`,
        solutionHtml: `<div class="promo-card">
  <span class="pill-badge">PRO</span>
  <h3>Full-Stack Track</h3>
  <p>Access all 10 chapters and certification capstones.</p>
</div>`,
        solutionCss: `.promo-card {
  position: relative;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  max-width: 350px;
}
.pill-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #059669;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: bold;
}`,
        solutionJs: `console.log("Promo card ready.");`,
        hints: [
          'Give .promo-card position: relative so the badge anchors to it.',
          'Give .pill-badge position: absolute, top: 12px, right: 12px.'
        ],
        testCases: [
          {
            id: 'tc-03-4a',
            description: 'promo-card has position: relative',
            hint: 'Set position: relative on .promo-card',
            checkType: 'style-computed',
            target: '.promo-card',
            expectedValue: 'relative'
          },
          {
            id: 'tc-03-4b',
            description: 'pill-badge has position: absolute',
            hint: 'Set position: absolute on .pill-badge',
            checkType: 'style-computed',
            target: '.pill-badge',
            expectedValue: 'absolute'
          }
        ],
        conceptQuestion: {
          question: 'What happens if you give an element position: absolute but none of its ancestor containers have position: relative?',
          options: [
            'It positions relative to the entire viewport / HTML root document',
            'It disappears from the screen completely',
            'It causes a fatal CSS syntax error',
            'It defaults back to display: inline'
          ],
          correctIndex: 0,
          explanation: 'Without a positioned ancestor, an absolutely positioned element falls back to the initial containing block (the viewport/root).'
        }
      },
      quiz: [
        {
          id: 'q-03-4',
          question: 'Which position value keeps an element visible in the exact same spot on the screen even when the user scrolls down the page?',
          options: ['fixed', 'static', 'relative', 'inherit'],
          correctIndex: 0,
          explanation: 'position: fixed anchors an element relative to the browser viewport window regardless of scrolling.'
        }
      ],
      summary: [
        'block elements stack vertically; inline elements flow horizontally.',
        'position: absolute elements position relative to their nearest positioned ancestor.',
        'position: fixed locks elements relative to the browser viewport window.',
        'position: sticky toggles between relative and fixed based on scroll position.'
      ],
      relatedTopics: [
        {
          title: 'Spacing, Borders & Visual Styling',
          chapterNumber: '03',
          lessonId: 'ch-03-l-05',
          context: 'Craft clean shadows, gradients, transitions, and subtle borders.'
        }
      ]
    },
    {
      id: 'ch-03-l-05',
      chapterId: 'ch-03',
      number: '3.5',
      slug: 'spacing-borders-styling',
      title: 'Spacing, Borders & Visual Styling',
      tagline: 'Craft polished modern interfaces with subtle box-shadows, border-radii, transitions, and hover effects',
      durationMinutes: 25,
      learningObjectives: [
        'Design harmonious spacing systems using consistent 8px/4px increments',
        'Master the box-shadow property: offset-x, offset-y, blur-radius, spread-radius, and color',
        'Learn the mathematical nested border radius rule: inner radius = outer radius - padding',
        'Add smooth interactive polish with CSS transitions and transform properties'
      ],
      theorySections: [
        {
          heading: '1. The 8-Point Spacing Grid',
          content: 'Professional UI designers use multiples of 4px and 8px (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px) for all margins and paddings. This creates rhythm and visual harmony across screens.',
          bulletPoints: [
            'Rhythmic Consistency: Eliminates arbitrary numbers like 17px or 23px',
            'Predictable Scaling: Easy to adapt across mobile and desktop breakpoints'
          ]
        },
        {
          heading: '2. Modern Layering with Subtle Shadows',
          content: 'Amateur designs use harsh black shadows. Professional modern interfaces use multi-layered, soft shadows with low opacity (< 10%).',
          bulletPoints: [
            'Elevation: Higher elevation gets larger blur and subtle vertical drop',
            'Subtle Borders: Pairing a 1px soft border (#e2e8f0) with a light shadow produces clean visual definition'
          ],
          callout: {
            type: 'key-rule',
            text: 'Nested Border Radius Rule: When nesting a rounded container inside another rounded container, the inner radius must equal: Outer Radius minus Padding. Otherwise, corners look warped.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'Architectural Shadow Lines and Trim',
        concept: 'Visual Depth and Polished Details',
        story: 'In modern architecture, high-end buildings do not use heavy ornate moldings. They use recessed shadow reveals — a tiny 1/2-inch reveal where the baseboard meets the hardwood floor. That subtle line gives the room visual depth and craftsmanship.',
        moral: 'Restraint in shadows and borders is the hallmark of modern visual craftsmanship.',
        icon: 'Sparkles'
      },
      visualType: 'box-model',
      codeExample: {
        title: 'Elevated Modern Interactive Card',
        description: 'Clean card with subtle shadow, soft border, and smooth hover lift transition.',
        html: `<div class="interactive-card">
  <h3>Scalable Design</h3>
  <p>Built with mathematical spacing and smooth CSS transitions.</p>
</div>`,
        css: `.interactive-card {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}
.interactive-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
}`,
        breakdown: [
          {
            lineRange: 'Line 6',
            title: 'Subtle Layered Box-Shadow',
            explanation: 'Uses subtle alpha transparency (0.05) to simulate realistic ambient lighting.',
            highlightTokens: ['box-shadow']
          },
          {
            lineRange: 'Line 7-12',
            title: 'Transform & Transition Hover Lift',
            explanation: 'translateY(-4px) lifts the card subtly on mouse hover with smooth easing.',
            highlightTokens: ['transition', 'translateY(-4px)']
          }
        ]
      },
      video: {
        title: 'Crafting Modern Cards with Shadows, Borders, and Transitions',
        duration: '13:15',
        description: 'How to combine soft borders, natural ambient shadows, and hardware-accelerated transforms for fluid micro-interactions.',
        keyPoints: [
          'Natural lighting box-shadow formulas',
          'Nested border radius calculation',
          'Hardware accelerated transforms (translate vs top)'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Spacing Systems', description: 'The 8-point grid' },
          { time: '04:20', seconds: 260, title: 'Shadow Physics', description: 'Soft ambient shadows' },
          { time: '08:45', seconds: 525, title: 'Hover Transitions', description: 'Smooth interaction' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Micro-interactions and subtle depth separate good websites from extraordinary ones.' }
        ],
        demoAnimationType: 'css-cascade'
      },
      practice: {
        id: 'prac-03-05',
        title: 'Build a Floating Action Card with Hover Lift',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Style an action card (<div class="action-card">) with border-radius: 12px, a subtle box-shadow, transition: all 0.2s ease, and a :hover state that applies transform: translateY(-3px).',
        instructions: [
          'Set border-radius: 12px and padding: 1.5rem on .action-card',
          'Add a soft box-shadow and transition: transform 0.2s ease',
          'Add .action-card:hover with transform: translateY(-3px)'
        ],
        starterHtml: `<div class="action-card">
  <h3>Interactive Micro-Interaction</h3>
  <p>Hover over this card to observe the smooth elevation lift.</p>
</div>`,
        starterCss: `.action-card {
  background: white;
  border: 1px solid #e2e8f0;
  max-width: 320px;
  /* Add border-radius, box-shadow, transition */
}
/* Add :hover state */`,
        starterJs: `console.log("Action card ready.");`,
        solutionHtml: `<div class="action-card">
  <h3>Interactive Micro-Interaction</h3>
  <p>Hover over this card to observe the smooth elevation lift.</p>
</div>`,
        solutionCss: `.action-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 320px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  cursor: pointer;
}
.action-card:hover {
  transform: translateY(-3px);
}`,
        solutionJs: `console.log("Action card ready.");`,
        hints: [
          'Set border-radius: 12px on .action-card.',
          'Use .action-card:hover { transform: translateY(-3px); }'
        ],
        testCases: [
          {
            id: 'tc-03-5a',
            description: 'Action card exists with heading',
            hint: 'Ensure .action-card has an h3 heading',
            checkType: 'selector-exists',
            target: '.action-card h3'
          }
        ],
        conceptQuestion: {
          question: 'What is the correct mathematical formula for calculating the border-radius of an inner child element nested inside a padded container?',
          options: [
            'Inner Radius = Outer Radius - Padding',
            'Inner Radius = Outer Radius + Padding',
            'Inner Radius = Outer Radius * 2',
            'Inner Radius must always be 0'
          ],
          correctIndex: 0,
          explanation: 'Inner Radius = Outer Radius - Padding ensures that the curve of the inside element mirrors the curve of the outside container harmoniously.'
        }
      },
      quiz: [
        {
          id: 'q-03-5',
          question: 'Why should you prefer transform: translateY(-4px) over top: -4px for hover lift animations?',
          options: [
            'transform runs on the GPU compositor thread, preventing CPU layout reflows',
            'top does not work on buttons',
            'transform reduces file size',
            'top only works in Firefox'
          ],
          correctIndex: 0,
          explanation: 'CSS transforms execute on the GPU layer without triggering expensive layout reflows, ensuring smooth 60fps animations.'
        }
      ],
      summary: [
        'An 8-point spacing system creates visual rhythm and consistency.',
        'Subtle, layered box-shadows produce realistic optical depth.',
        'The nested radius formula (Outer - Padding) prevents warped corners.',
        'Use GPU-accelerated transforms (translate) for fluid hover micro-interactions.'
      ],
      relatedTopics: [
        {
          title: 'Practical CSS Page Build',
          chapterNumber: '03',
          lessonId: 'ch-03-l-06',
          context: 'Assemble everything you have learned into a complete styled landing page.'
        }
      ]
    },
    {
      id: 'ch-03-l-06',
      chapterId: 'ch-03',
      number: '3.6',
      slug: 'practical-css-page-build',
      title: 'Practical CSS Page Build',
      tagline: 'Assemble box model, typography, spacing, and positioning into a complete responsive landing page hero',
      durationMinutes: 30,
      learningObjectives: [
        'Combine box-sizing, typography stacks, and relative units into a unified project stylesheet',
        'Build a complete hero section with eyebrow badge, display headline, body lead, and CTA buttons',
        'Implement responsive containers with max-width and margin: 0 auto centering',
        'Audit spacing, contrast, and layout integrity across viewport sizes'
      ],
      theorySections: [
        {
          heading: '1. The Container Pattern',
          content: 'A central pillar of modern web layout is the centered container. It prevents content from stretching uncontrollably across ultra-wide monitors.',
          bulletPoints: [
            'max-width: e.g. 1200px (sets an upper bound on reading width)',
            'margin-inline: auto (or margin: 0 auto): Centers the container horizontally in the viewport',
            'padding-inline: 1.5rem: Guarantees breathing room so content never touches screen edges on mobile'
          ]
        },
        {
          heading: '2. Component Assembly Architecture',
          content: 'Professional websites assemble independent, modular components into page sections.',
          bulletPoints: [
            'Hero Section: Catches attention with high-contrast typography and clear call-to-action',
            'Button Group: Pairs a primary button (high contrast) with a secondary outline button',
            'Metrics Strip: Displays social proof numbers to build trust immediately'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Orchestra Conductor',
        concept: 'Bringing All Techniques Together',
        story: 'A violinist practicing alone is just scales. A percussionist alone is just a beat. An orchestra conductor brings together the strings, brass, woodwinds, and percussion at the exact right tempo to create a breathtaking symphony. This lesson is where you conduct your HTML, Box Model, Typography, and Styling into a complete visual composition.',
        moral: 'Craftsmanship comes from harmonizing every detail into a unified experience.',
        icon: 'Layout'
      },
      visualType: 'box-model',
      codeExample: {
        title: 'Full Landing Page Hero Component',
        description: 'Complete hero section with badge, heading, lead text, and action buttons.',
        html: `<section class="hero-section">
  <div class="hero-container">
    <span class="hero-badge">WebZone Curriculum 2026</span>
    <h1 class="hero-title">Master Modern Full-Stack Web Development</h1>
    <p class="hero-lead">Step-by-step from browser fundamentals to production cloud capstones.</p>
    <div class="hero-actions">
      <button class="btn btn-primary">Start Chapter 01</button>
      <button class="btn btn-secondary">Explore Syllabus</button>
    </div>
  </div>
</section>`,
        css: `.hero-section {
  padding: 3rem 1.5rem;
  background: #f8fafc;
}
.hero-container {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}
.hero-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e0e7ff;
  color: #4338ca;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.hero-title {
  font-size: 2.25rem;
  color: #0f172a;
  line-height: 1.2;
  margin: 0 0 1rem 0;
}
.hero-lead {
  font-size: 1.125rem;
  color: #475569;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.btn {
  padding: 0.65rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.btn-primary {
  background: #2563eb;
  color: white;
  border: none;
}
.btn-secondary {
  background: transparent;
  color: #334155;
  border: 1px solid #cbd5e1;
}`,
        breakdown: [
          {
            lineRange: 'Line 4-7',
            title: 'Centered Hero Container',
            explanation: 'max-width: 700px with margin: 0 auto creates a balanced, focused hero block.',
            highlightTokens: ['max-width: 700px', 'margin: 0 auto']
          }
        ]
      },
      video: {
        title: 'Building a Complete Responsive Landing Page with Pure CSS',
        duration: '18:20',
        description: 'Full project build: setting up custom variables, structuring containers, typography, and button hover states.',
        keyPoints: [
          'Setting up base variables',
          'Responsive max-width containers',
          'Button design system',
          'Testing across mobile and desktop'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Project Overview', description: 'Figma to code' },
          { time: '06:00', seconds: 360, title: 'Container & Typography', description: 'Hero layout' },
          { time: '12:30', seconds: 750, title: 'Button Component States', description: 'Hover and focus' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'You now have all the tools needed to build stunning, production-ready web interfaces.' }
        ],
        demoAnimationType: 'css-cascade'
      },
      practice: {
        id: 'prac-03-06',
        title: 'Build a Centered Hero Banner Component',
        difficulty: 'Intermediate',
        estimatedTime: '15 min',
        prompt: 'Build a centered hero banner (<header class="hero-banner">) containing a centered container (<div class="container">) with an <h1> title, a <p class="subtitle">, and a button (<button class="cta">Start Learning</button>).',
        instructions: [
          'Apply max-width: 600px and margin: 0 auto on .container',
          'Style .hero-banner with text-align: center and padding: 2rem 1rem',
          'Style the button with background: #2563eb, color: white, and padding: 0.6rem 1.25rem'
        ],
        starterHtml: `<header class="hero-banner">
  <div class="container">
    <!-- Add h1, p.subtitle, and button.cta here -->
  </div>
</header>`,
        starterCss: `.hero-banner {
  background: #f8fafc;
  /* Add text-align and padding */
}
.container {
  /* Add max-width and margin centering */
}
/* Style button.cta */`,
        starterJs: `console.log("Hero banner initialized.");`,
        solutionHtml: `<header class="hero-banner">
  <div class="container">
    <h1>Code Your Future Today</h1>
    <p class="subtitle">Master modern web development with real interactive lessons and projects.</p>
    <button class="cta">Start Learning</button>
  </div>
</header>`,
        solutionCss: `.hero-banner {
  background: #f8fafc;
  text-align: center;
  padding: 2.5rem 1rem;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}
h1 {
  font-size: 2rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
}
.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}
.cta {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.65rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`,
        solutionJs: `console.log("Hero banner initialized.");`,
        hints: [
          'Center the container with max-width: 600px; margin: 0 auto;.',
          'Include <h1>, <p class="subtitle">, and <button class="cta">.'
        ],
        testCases: [
          {
            id: 'tc-03-6a',
            description: 'Container has auto margins',
            hint: 'Set margin: 0 auto on .container',
            checkType: 'selector-exists',
            target: '.hero-banner .container h1'
          },
          {
            id: 'tc-03-6b',
            description: 'CTA button exists',
            hint: 'Add button with class cta',
            checkType: 'selector-exists',
            target: '.hero-banner button.cta'
          }
        ],
        conceptQuestion: {
          question: 'What does the CSS rule "margin: 0 auto" accomplish on a block element with a declared max-width?',
          options: [
            'Horizontally centers the element within its parent container',
            'Vertically centers the element on the screen',
            'Removes all borders from the element',
            'Floats the element to the right'
          ],
          correctIndex: 0,
          explanation: 'margin: 0 auto sets top/bottom margins to 0 and evenly distributes left and right margins, centering the element horizontally.'
        }
      },
      quiz: [
        {
          id: 'q-03-6',
          question: 'What is the primary role of a max-width container in responsive web design?',
          options: [
            'Prevents text and UI from stretching uncomfortably wide on large desktop screens',
            'Makes the website load 2x faster',
            'Enables dark mode automatically',
            'Encodes image files into Base64'
          ],
          correctIndex: 0,
          explanation: 'A max-width container keeps line lengths constrained to an ergonomic 65-75 characters on widescreen monitors.'
        }
      ],
      summary: [
        'max-width containers with margin: 0 auto provide centered, responsive layouts.',
        'Cohesive typography hierarchies pair prominent headings with generous line-height body text.',
        'Harmonized button systems establish clear primary and secondary calls to action.',
        'CSS Mastery is the foundation for flexible multi-dimensional layouts in Flexbox and CSS Grid.'
      ],
      relatedTopics: [
        {
          title: 'CSS Flexbox Layout Engine',
          chapterNumber: '04',
          lessonId: 'ch-04-l-01',
          context: 'Step into modern one-dimensional layout with CSS Flexbox.'
        }
      ]
    }
  ]
};
