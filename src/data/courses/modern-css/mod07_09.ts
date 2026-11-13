import { Chapter } from '../../../utils/types';

export const MODERN_CSS_MODULES_7_TO_9: Chapter[] = [
  {
    "id": "css-mod-07",
    "number": "7",
    "badge": "CSS 07",
    "slug": "performance-web-vitals",
    "title": "Module 7: Performance, Accessibility, and Core Web Vitals",
    "subtitle": "Zero CLS, Critical CSS, content-visibility & WCAG 2.2 AA Contrast",
    "description": "Eliminating layout shifts (CLS), mastering content-visibility, auditing contrast ratios, and enforcing WCAG 2.2 standards.",
    "estimatedHours": "4 hrs",
    "accentColor": "indigo",
    "iconName": "Layers",
    "totalLessons": 5,
    "lessons": [
      {
        "id": "css-07-01",
        "chapterId": "css-mod-07",
        "number": "7.1",
        "slug": "css-07-01",
        "title": "Eliminating Cumulative Layout Shifts (CLS) with Modern CSS",
        "tagline": "Employing aspect-ratio, min-height locks, and font metric overrides to achieve zero layout shift.",
        "durationMinutes": 26,
        "learningObjectives": [
          "Understand Cumulative Layout Shift (CLS) and its impact on Google Core Web Vitals",
          "Reserve layout geometry for images and dynamic media using aspect-ratio",
          "Prevent web font loading reflows using size-adjust and font-display: optional"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Layout shifts happen when visible content changes position as resources load asynchronously. A jumping button can cause users to misclick accidental purchases. Modern CSS eliminates CLS by locking layout geometry before media and web fonts finish downloading.",
            "bulletPoints": [
              "Define aspect-ratio on all media containers (images, videos, embeds).",
              "Lock skeleton placeholders with exact min-height matching dynamic card content.",
              "Tune fallback font metrics with size-adjust and ascent-override to prevent FOYT reflows."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "CLS (Cumulative Layout Shift): A Core Web Vital measuring the total sum of all individual layout shift scores for every unexpected layout shift occurring during page lifecycle.",
              "aspect-ratio: CSS property that establishes a preferred aspect ratio for the box, calculating height from width automatically."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Leaving img tags without explicit width and height attributes or aspect-ratio CSS. -> Fix: Always provide width/height attributes in HTML or aspect-ratio in CSS so the browser calculates dimensions before download."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Eliminating Cumulative Layout Shifts (CLS) with Modern CSS",
          "concept": "Eliminating Cumulative Layout Shifts (CLS) with Modern CSS",
          "story": "Layout shifts happen when visible content changes position as resources load asynchronously. A jumping button can cause users to misclick accidental purchases. Modern CSS eliminates CLS by locking lay...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Zero-CLS Media Container & Font Metric Override",
          "description": "Employing aspect-ratio, min-height locks, and font metric overrides to achieve zero layout shift.",
          "html": "<div class=\"demo-box\"><h4>Eliminating Cumulative Layout Shifts (CLS) with Modern CSS</h4><p>Employing aspect-ratio, min-height locks, and font metric overrides to achieve zero layout shift.</p></div>",
          "css": "/* 1. Media Aspect Ratio Reservation */\n.responsive-media-container {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  background-color: #f1f5f9;\n  border-radius: 12px;\n  overflow: hidden;\n}\n\n.responsive-media-container img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n\n/* 2. Web Font Metric Matching to Prevent Reflow */\n@font-face {\n  font-family: 'Fallback-Inter';\n  src: local('Arial');\n  ascent-override: 90%;\n  descent-override: 22%;\n  line-gap-override: 0%;\n  size-adjust: 107%;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Eliminating Cumulative Layout Shifts (CLS) with Modern CSS Architecture Deep Dive",
          "duration": "26 min",
          "description": "Employing aspect-ratio, min-height locks, and font metric overrides to achieve zero layout shift.",
          "keyPoints": [
            "Understand Cumulative Layout Shift (CLS) and its impact on Google Core Web Vitals",
            "Reserve layout geometry for images and dynamic media using aspect-ratio",
            "Prevent web font loading reflows using size-adjust and font-display: optional"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Employing aspect-ratio, min-height locks, and font metric overrides to achieve zero layout shift."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-07-01",
          "title": "Hands-on: Eliminating Cumulative Layout Shifts (CLS) with Modern CSS",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "What is a good target CLS score according to Google Web Vitals?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-07-01-1",
            "question": "Which CSS property lets the browser compute an element height from its width before an image loads?",
            "options": [
              "object-fit",
              "aspect-ratio",
              "image-rendering",
              "box-sizing"
            ],
            "correctIndex": 1,
            "explanation": "aspect-ratio establishes a proportional relationship between width and height, reserving correct layout space instantly."
          }
        ],
        "summary": [
          "Disciplined use of aspect-ratio and font metric overrides achieves a CLS score of 0.0, satisfying Core Web Vitals benchmarks."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "7",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-07-02",
        "chapterId": "css-mod-07",
        "number": "7.2",
        "slug": "css-07-02",
        "title": "Efficient CSS Architecture and Critical Rendering Path",
        "tagline": "Streamlining stylesheet weight, inlining critical path CSS, and deferring non-blocking stylesheets.",
        "durationMinutes": 24,
        "learningObjectives": [
          "Analyze the Critical Rendering Path: DOM + CSSOM = Render Tree",
          "Separate critical above-the-fold CSS from deferred asynchronous styles",
          "Avoid render-blocking @import statements inside external stylesheets"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "CSS is render-blocking: browsers will not render any painted pixels until all linked stylesheets are downloaded and parsed into the CSSOM. By minimizing stylesheet footprint and eliminating nested @import statements, First Contentful Paint (FCP) drops dramatically.",
            "bulletPoints": [
              "Inline critical structural CSS directly into the HTML <head>.",
              "Load secondary stylesheets asynchronously using rel=\"preload\" as=\"style\".",
              "Eliminate nested CSS @import rules in favor of parallel <link> tags or bundled files."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "CSSOM (CSS Object Model): The hierarchical representation of parsed CSS rules constructed before rendering.",
              "FCP (First Contentful Paint): Core performance metric tracking when the browser renders the first piece of DOM content."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Using @import url(\"other.css\") inside an external stylesheet. -> Fix: Avoid @import in CSS production code because it forces sequential waterfall requests; use bundlers or parallel <link> elements."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Efficient CSS Architecture and Critical Rendering Path",
          "concept": "Efficient CSS Architecture and Critical Rendering Path",
          "story": "CSS is render-blocking: browsers will not render any painted pixels until all linked stylesheets are downloaded and parsed into the CSSOM. By minimizing stylesheet footprint and eliminating nested @im...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Critical CSS Loading Pattern",
          "description": "Streamlining stylesheet weight, inlining critical path CSS, and deferring non-blocking stylesheets.",
          "html": "<div class=\"demo-box\"><h4>Efficient CSS Architecture and Critical Rendering Path</h4><p>Streamlining stylesheet weight, inlining critical path CSS, and deferring non-blocking stylesheets.</p></div>",
          "css": "<!-- 1. Inline Critical CSS in HTML Head for Instant First Paint -->\n<style>\n  :root { --brand: #2563eb; --bg: #ffffff; }\n  body { margin: 0; font-family: system-ui, sans-serif; background: var(--bg); }\n  .hero-header { padding: 3rem 1.5rem; text-align: center; }\n</style>\n\n<!-- 2. Asynchronous Non-blocking Load for Complete Theme & Components -->\n<link rel=\"preload\" href=\"/styles/main.css\" as=\"style\" onload=\"this.onload=null;this.rel='stylesheet'\">\n<noscript><link rel=\"stylesheet\" href=\"/styles/main.css\"></noscript>",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Efficient CSS Architecture and Critical Rendering Path Architecture Deep Dive",
          "duration": "24 min",
          "description": "Streamlining stylesheet weight, inlining critical path CSS, and deferring non-blocking stylesheets.",
          "keyPoints": [
            "Analyze the Critical Rendering Path: DOM + CSSOM = Render Tree",
            "Separate critical above-the-fold CSS from deferred asynchronous styles",
            "Avoid render-blocking @import statements inside external stylesheets"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Streamlining stylesheet weight, inlining critical path CSS, and deferring non-blocking stylesheets."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-07-02",
          "title": "Hands-on: Efficient CSS Architecture and Critical Rendering Path",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "Why does @import inside a CSS file hurt web performance?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-07-02-1",
            "question": "Why is CSS classified as a render-blocking resource?",
            "options": [
              "Because it is written in text",
              "Because the browser cannot construct the render tree without the CSSOM",
              "Because it requires GPU execution",
              "Because it disables JavaScript"
            ],
            "correctIndex": 1,
            "explanation": "The browser cannot calculate layout or paint pixels until the CSSOM is completely constructed to avoid visual flashes."
          }
        ],
        "summary": [
          "Inlining critical above-the-fold CSS and avoiding @import waterfalls guarantees lightning-fast First Contentful Paint."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "7",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-07-03",
        "chapterId": "css-mod-07",
        "number": "7.3",
        "slug": "css-07-03",
        "title": "Rendering Optimization with content-visibility and contain-intrinsic-size",
        "tagline": "Skipping rendering of off-screen DOM nodes to drastically cut initial page rendering times.",
        "durationMinutes": 22,
        "learningObjectives": [
          "Accelerate long-form pages using content-visibility: auto",
          "Prevent scrollbar jumpiness by reserving estimated height with contain-intrinsic-size",
          "Understand CSS containment boundaries (size, layout, paint)"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "On content-heavy pages with hundreds of cards or lessons, browsers normally compute layout and paint for every element, even those 5,000 pixels below the screen fold. content-visibility: auto instructs the browser to skip rendering off-screen elements entirely until they approach the viewport.",
            "bulletPoints": [
              "Apply content-visibility: auto to long-page sections or modular cards.",
              "Declare contain-intrinsic-size with an estimated height (e.g., contain-intrinsic-size: 0 450px).",
              "Observe dramatic reductions in initial rendering time in DevTools Performance audits."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "content-visibility: auto: Allows the browser to skip an element layout and rendering work until it approaches the viewport.",
              "contain-intrinsic-size: Provides placeholder dimensions so an element with content-visibility does not collapse to 0 height off-screen."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Omitting contain-intrinsic-size when applying content-visibility: auto. -> Fix: Always provide contain-intrinsic-size; otherwise off-screen elements collapse to 0px, causing the browser scrollbar to jump erratically."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Rendering Optimization with content-visibility and contain-intrinsic-size",
          "concept": "Rendering Optimization with content-visibility and contain-intrinsic-size",
          "story": "On content-heavy pages with hundreds of cards or lessons, browsers normally compute layout and paint for every element, even those 5,000 pixels below the screen fold. content-visibility: auto instruct...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Optimizing Long Curricula with content-visibility",
          "description": "Skipping rendering of off-screen DOM nodes to drastically cut initial page rendering times.",
          "html": "<div class=\"demo-box\"><h4>Rendering Optimization with content-visibility and contain-intrinsic-size</h4><p>Skipping rendering of off-screen DOM nodes to drastically cut initial page rendering times.</p></div>",
          "css": "/* Highly optimized long-list rendering */\n.curriculum-module-section {\n  content-visibility: auto;\n  contain-intrinsic-size: 0 480px; /* estimated width & height */\n  margin-block-end: 2rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 1.5rem;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Rendering Optimization with content-visibility and contain-intrinsic-size Architecture Deep Dive",
          "duration": "22 min",
          "description": "Skipping rendering of off-screen DOM nodes to drastically cut initial page rendering times.",
          "keyPoints": [
            "Accelerate long-form pages using content-visibility: auto",
            "Prevent scrollbar jumpiness by reserving estimated height with contain-intrinsic-size",
            "Understand CSS containment boundaries (size, layout, paint)"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Skipping rendering of off-screen DOM nodes to drastically cut initial page rendering times."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-07-03",
          "title": "Hands-on: Rendering Optimization with content-visibility and contain-intrinsic-size",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "What does content-visibility: auto do when an element scrolls into view?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-07-03-1",
            "question": "Which property prevents the scrollbar from jumping when using content-visibility: auto?",
            "options": [
              "overflow: scroll",
              "contain-intrinsic-size",
              "aspect-ratio",
              "height: auto"
            ],
            "correctIndex": 1,
            "explanation": "contain-intrinsic-size acts as an estimated dimension placeholder while the off-screen content rendering is skipped."
          }
        ],
        "summary": [
          "content-visibility: auto provides near-instantaneous page load times for long-form editorial content and lesson listings."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "7",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-07-04",
        "chapterId": "css-mod-07",
        "number": "7.4",
        "slug": "css-07-04",
        "title": "Accessible Colour Contrast and WCAG 2.2 AA/AAA Compliance",
        "tagline": "Calculating contrast ratios, designing accessible text hierarchies, and meeting regulatory requirements.",
        "durationMinutes": 25,
        "learningObjectives": [
          "Calculate contrast ratios according to WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large text/UI components)",
          "Implement accessible subtext and helper text without compromising legibility",
          "Conduct automated and manual contrast audits using modern browser developer tools"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Web accessibility is an essential civil right and legal obligation. Faint grey text on white backgrounds may look minimalistic, but it renders platforms unusable for millions of readers with low vision, cataract conditions, or outdoor sunlight glare. Designing with verified contrast guarantees readability.",
            "bulletPoints": [
              "Verify all body copy satisfies at least 4.5:1 contrast against its background.",
              "Verify interactive boundaries, borders, and icons satisfy at least 3:1 contrast.",
              "Audit contrast programmatically using Lighthouse and browser DevTools color pickers."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "WCAG 2.2 AA: The global benchmark standard for web accessibility compliance.",
              "Contrast Ratio: The numerical difference in luminance between foreground text and background surface, ranging from 1:1 to 21:1."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Using #999999 or lighter for body subtext on a white background, which fails AA compliance. -> Fix: Ensure muted text on white is never lighter than #64748b to maintain minimum 4.5:1 contrast."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Accessible Colour Contrast and WCAG 2.2 AA/AAA Compliance",
          "concept": "Accessible Colour Contrast and WCAG 2.2 AA/AAA Compliance",
          "story": "Web accessibility is an essential civil right and legal obligation. Faint grey text on white backgrounds may look minimalistic, but it renders platforms unusable for millions of readers with low visio...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Accessible Palette Tokens with Verified Contrast",
          "description": "Calculating contrast ratios, designing accessible text hierarchies, and meeting regulatory requirements.",
          "html": "<div class=\"demo-box\"><h4>Accessible Colour Contrast and WCAG 2.2 AA/AAA Compliance</h4><p>Calculating contrast ratios, designing accessible text hierarchies, and meeting regulatory requirements.</p></div>",
          "css": ":root {\n  --surface-base: #ffffff;\n\n  /* WCAG AAA Compliant Text (11.5:1 contrast against white) */\n  --text-high-contrast: #0f172a;\n\n  /* WCAG AA Compliant Body Text (7.2:1 contrast against white) */\n  --text-body: #334155;\n\n  /* WCAG AA Compliant Muted Subtext (4.6:1 contrast against white) */\n  --text-muted: #64748b; /* Fails if made lighter than #64748b */\n\n  /* UI Component Border (3.1:1 contrast against white) */\n  --ui-border-accessible: #94a3b8;\n}\n\n.lesson-meta-text {\n  color: var(--text-muted); /* Guaranteed >= 4.5:1 compliance */\n  font-size: 0.875rem;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Accessible Colour Contrast and WCAG 2.2 AA/AAA Compliance Architecture Deep Dive",
          "duration": "25 min",
          "description": "Calculating contrast ratios, designing accessible text hierarchies, and meeting regulatory requirements.",
          "keyPoints": [
            "Calculate contrast ratios according to WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large text/UI components)",
            "Implement accessible subtext and helper text without compromising legibility",
            "Conduct automated and manual contrast audits using modern browser developer tools"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Calculating contrast ratios, designing accessible text hierarchies, and meeting regulatory requirements."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-07-04",
          "title": "Hands-on: Accessible Colour Contrast and WCAG 2.2 AA/AAA Compliance",
          "difficulty": "Intermediate",
          "estimatedTime": "15 min",
          "prompt": "What is the minimum WCAG 2.2 AA contrast ratio required for standard body text?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-07-04-1",
            "question": "Which contrast ratio is required for non-text UI elements (such as button borders and input outlines) under WCAG 2.2 AA?",
            "options": [
              "1.5:1",
              "3:1",
              "4.5:1",
              "7:1"
            ],
            "correctIndex": 1,
            "explanation": "WCAG 2.2 requires a minimum contrast ratio of 3:1 for user interface components and graphical objects."
          }
        ],
        "summary": [
          "Adhering strictly to WCAG 2.2 contrast standards guarantees an inclusive, comfortable reading experience for all global audiences."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "7",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-07-05",
        "chapterId": "css-mod-07",
        "number": "7.5",
        "slug": "css-07-05",
        "title": "Screen Reader and Assistive Technology Styling Patterns",
        "tagline": "Writing bulletproof .sr-only utility classes, aria-hidden styling, and accessible icon representations.",
        "durationMinutes": 22,
        "learningObjectives": [
          "Construct the modern standard .sr-only visually-hidden CSS utility",
          "Avoid destructive techniques like display: none or visibility: hidden for screen reader text",
          "Style aria-disabled, aria-expanded, and aria-current states directly in CSS"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Visual clarity often requires hiding text from sighted users (such as icon-only buttons), but screen reader users still require descriptive audio labels. Using a properly configured visually-hidden class preserves accessibility tree presence while removing the element from visual flow.",
            "bulletPoints": [
              "Build a .visually-hidden class using clip-path, width: 1px, and position: absolute.",
              "Never hide accessible content using display: none, which strips elements from screen readers.",
              "Use standard ARIA attribute selectors in CSS (e.g., button[aria-expanded=\"true\"])."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Screen Reader: Assistive software that vocalizes or braille-renders graphical UI elements for visually impaired users.",
              "Accessibility Tree: The parallel object model generated by browsers specifically for assistive technology."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Using display: none to hide text intended for screen readers. -> Fix: Use the .sr-only class; display: none completely removes the node from the accessibility tree."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Screen Reader and Assistive Technology Styling Patterns",
          "concept": "Screen Reader and Assistive Technology Styling Patterns",
          "story": "Visual clarity often requires hiding text from sighted users (such as icon-only buttons), but screen reader users still require descriptive audio labels. Using a properly configured visually-hidden cl...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Standard Visually-Hidden Class & ARIA Styling",
          "description": "Writing bulletproof .sr-only utility classes, aria-hidden styling, and accessible icon representations.",
          "html": "<div class=\"demo-box\"><h4>Screen Reader and Assistive Technology Styling Patterns</h4><p>Writing bulletproof .sr-only utility classes, aria-hidden styling, and accessible icon representations.</p></div>",
          "css": "/* Standard WCAG-compliant screen reader only utility */\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n/* Accessible ARIA-driven styling */\nbutton[aria-expanded=\"true\"] .accordion-icon {\n  transform: rotate(180deg);\n}\n\nnav a[aria-current=\"page\"] {\n  font-weight: 700;\n  border-block-end: 2px solid #2563eb;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Screen Reader and Assistive Technology Styling Patterns Architecture Deep Dive",
          "duration": "22 min",
          "description": "Writing bulletproof .sr-only utility classes, aria-hidden styling, and accessible icon representations.",
          "keyPoints": [
            "Construct the modern standard .sr-only visually-hidden CSS utility",
            "Avoid destructive techniques like display: none or visibility: hidden for screen reader text",
            "Style aria-disabled, aria-expanded, and aria-current states directly in CSS"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Writing bulletproof .sr-only utility classes, aria-hidden styling, and accessible icon representations."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-07-05",
          "title": "Hands-on: Screen Reader and Assistive Technology Styling Patterns",
          "difficulty": "Intermediate",
          "estimatedTime": "15 min",
          "prompt": "Why does display: none fail screen reader users?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-07-05-1",
            "question": "Which CSS selector styles the active page link based on accessibility best practices?",
            "options": [
              "a.active",
              "a[aria-current=\"page\"]",
              "a:visited",
              "a:hover"
            ],
            "correctIndex": 1,
            "explanation": "a[aria-current=\"page\"] binds visual styling directly to the accessible ARIA attribute."
          }
        ],
        "summary": [
          "Screen reader utility patterns and ARIA-based styling unite visual elegance with comprehensive accessibility compliance."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "7",
            "context": "Modern CSS Mastery"
          }
        ]
      }
    ]
  },
  {
    "id": "css-mod-08",
    "number": "8",
    "badge": "CSS 08",
    "slug": "enterprise-css-architecture",
    "title": "Module 8: Enterprise CSS Architecture and Code Organization",
    "subtitle": "Cascade Layers (@layer), Component Folder Structure, Pragmatic BEM & Token Governance",
    "description": "Structuring large-scale stylesheets, mastering CSS cascade layers (@layer), naming conventions, and preventing style drift.",
    "estimatedHours": "4 hrs",
    "accentColor": "indigo",
    "iconName": "Layers",
    "totalLessons": 5,
    "lessons": [
      {
        "id": "css-08-01",
        "chapterId": "css-mod-08",
        "number": "8.1",
        "slug": "css-08-01",
        "title": "Cascade Layers (@layer) for Specificity Control",
        "tagline": "Taming specificity wars once and for all using native standard CSS cascade layers.",
        "durationMinutes": 28,
        "learningObjectives": [
          "Organize stylesheets into discrete priority layers using @layer",
          "Order layer precedence explicitly: reset, base, design-tokens, components, utilities",
          "Eliminate !important overrides and specificity escalation"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Historically, CSS specificity was a relentless escalation battle where developers wrote longer selectors or reached for !important. Native CSS Cascade Layers (@layer) solve this fundamentally: rules declared in a higher-priority layer always beat rules in a lower layer, regardless of selector specificity.",
            "bulletPoints": [
              "Establish layer order at the very top of your global stylesheet: @layer reset, base, components, overrides;",
              "Assign styles into layers: @layer components { .btn { ... } }.",
              "Enjoy zero specificity clashes: a simple .utility class in the overrides layer effortlessly beats a complex nested selector in components."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "@layer: CSS at-rule used to declare a cascade layer and define order of precedence.",
              "Layer Precedence: The rule that styles in later layers take priority over earlier layers, completely superseding selector specificity."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Declaring layers without defining the layer order at the document head. -> Fix: Always define the master @layer order at the top of your root CSS file to guarantee consistent precedence."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Cascade Layers (@layer) for Specificity Control",
          "concept": "Cascade Layers (@layer) for Specificity Control",
          "story": "Historically, CSS specificity was a relentless escalation battle where developers wrote longer selectors or reached for !important. Native CSS Cascade Layers (@layer) solve this fundamentally: rules d...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Standard Cascade Layer Architecture",
          "description": "Taming specificity wars once and for all using native standard CSS cascade layers.",
          "html": "<div class=\"demo-box\"><h4>Cascade Layers (@layer) for Specificity Control</h4><p>Taming specificity wars once and for all using native standard CSS cascade layers.</p></div>",
          "css": "/* 1. Explicit Layer Order Definition */\n@layer reset, base, theme, components, utilities;\n\n/* 2. Low-Priority Layer */\n@layer reset {\n  *, *::before, *::after {\n    box-sizing: border-box;\n    margin: 0;\n  }\n}\n\n/* 3. Component Layer */\n@layer components {\n  .nav-card {\n    background-color: #ffffff;\n    border: 1px solid #e2e8f0;\n    padding: 1.5rem;\n  }\n}\n\n/* 4. High-Priority Utility Layer */\n@layer utilities {\n  .u-no-border {\n    border: none !important; /* Rules here cleanly override components layer */\n  }\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Cascade Layers (@layer) for Specificity Control Architecture Deep Dive",
          "duration": "28 min",
          "description": "Taming specificity wars once and for all using native standard CSS cascade layers.",
          "keyPoints": [
            "Organize stylesheets into discrete priority layers using @layer",
            "Order layer precedence explicitly: reset, base, design-tokens, components, utilities",
            "Eliminate !important overrides and specificity escalation"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Taming specificity wars once and for all using native standard CSS cascade layers."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-08-01",
          "title": "Hands-on: Cascade Layers (@layer) for Specificity Control",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "In @layer base, components;, which layer wins if both target the same element with identical properties?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-08-01-1",
            "question": "How do Cascade Layers affect traditional selector specificity?",
            "options": [
              "They multiply specificity by 10",
              "Layer order takes precedence over selector specificity between different layers",
              "They disable specificity entirely",
              "They only apply in Firefox"
            ],
            "correctIndex": 1,
            "explanation": "Between two different layers, the layer declared later always wins, completely bypassing selector specificity calculation."
          }
        ],
        "summary": [
          "@layer represents the biggest architectural leap in modern CSS, providing deterministic control over stylesheet hierarchy."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "8",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-08-02",
        "chapterId": "css-mod-08",
        "number": "8.2",
        "slug": "css-08-02",
        "title": "Component-Level Stylesheet Organization and File Structure",
        "tagline": "Architecting maintainable directory structures for large standard CSS3 applications.",
        "durationMinutes": 24,
        "learningObjectives": [
          "Structure enterprise stylesheets into variables, layout, components, and pages",
          "Avoid giant monolithic single-file stylesheets without incurring performance penalties",
          "Establish clean file naming conventions for zero cognitive friction"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Large-scale CSS projects fail when hundreds of unrelated styles are dumped into a single 4,000-line file. Adopting a modular, feature-aligned folder structure keeps stylesheets self-contained, predictable, and simple to debug.",
            "bulletPoints": [
              "Create a styles/ directory containing variables.css, base.css, layout.css, and components/.",
              "Create one CSS file per major UI component (e.g., button.css, modal.css, card.css).",
              "Assemble them into a master stylesheet or import via Vite/bundler for production concatenation."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Modular CSS: The practice of breaking down styling into small, independent, reusable component files.",
              "Single Responsibility Principle: Each CSS file should encapsulate the styles of exactly one component or concern."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Creating deeply nested CSS folder hierarchies (> 3 levels). -> Fix: Keep styling directories flat and aligned with components to avoid path confusion."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Component-Level Stylesheet Organization and File Structure",
          "concept": "Component-Level Stylesheet Organization and File Structure",
          "story": "Large-scale CSS projects fail when hundreds of unrelated styles are dumped into a single 4,000-line file. Adopting a modular, feature-aligned folder structure keeps stylesheets self-contained, predict...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Recommended Enterprise Stylesheet Directory Structure",
          "description": "Architecting maintainable directory structures for large standard CSS3 applications.",
          "html": "<div class=\"demo-box\"><h4>Component-Level Stylesheet Organization and File Structure</h4><p>Architecting maintainable directory structures for large standard CSS3 applications.</p></div>",
          "css": "/* index.html or main entry point imports */\n/* 1. Global foundation */\n@import \"./variables.css\";\n@import \"./base.css\";\n@import \"./layout.css\";\n\n/* 2. Isolated UI components */\n@import \"./components/button.css\";\n@import \"./components/card.css\";\n@import \"./components/dialog.css\";\n@import \"./components/table.css\";\n\n/* 3. Feature views */\n@import \"./features/lesson-reader.css\";\n@import \"./features/code-editor.css\";",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Component-Level Stylesheet Organization and File Structure Architecture Deep Dive",
          "duration": "24 min",
          "description": "Architecting maintainable directory structures for large standard CSS3 applications.",
          "keyPoints": [
            "Structure enterprise stylesheets into variables, layout, components, and pages",
            "Avoid giant monolithic single-file stylesheets without incurring performance penalties",
            "Establish clean file naming conventions for zero cognitive friction"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Architecting maintainable directory structures for large standard CSS3 applications."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-08-02",
          "title": "Hands-on: Component-Level Stylesheet Organization and File Structure",
          "difficulty": "Intermediate",
          "estimatedTime": "15 min",
          "prompt": "What is the primary benefit of matching CSS file names to component names?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-08-02-1",
            "question": "Which file in a modular CSS architecture should hold custom property definitions?",
            "options": [
              "layout.css",
              "variables.css / tokens.css",
              "components.css",
              "index.html inline only"
            ],
            "correctIndex": 1,
            "explanation": "A dedicated variables.css or tokens.css file houses global custom properties for centralized modification."
          }
        ],
        "summary": [
          "A clean, modular directory structure ensures team scalability and eliminates CSS maintenance nightmares."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "8",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-08-03",
        "chapterId": "css-mod-08",
        "number": "8.3",
        "slug": "css-08-03",
        "title": "Naming Conventions: Modern Pragmatic BEM and Scope Hygiene",
        "tagline": "Writing readable, intent-revealing CSS classes without dogmatic overhead.",
        "durationMinutes": 22,
        "learningObjectives": [
          "Apply pragmatic Block Element Modifier (BEM) conventions to communicate intent",
          "Prevent class name collisions in shared component environments",
          "Differentiate between structural layout classes and visual skin classes"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Class names should be self-documenting. A developer glancing at HTML markup should immediately understand what an element does and whether it is an independent block, a descendant part, or an active state modifier. Pragmatic BEM delivers this clarity without needing complex scoping runtimes.",
            "bulletPoints": [
              "Block: The standalone component entity (e.g., .course-card).",
              "Element: A child piece bound to the block (e.g., .course-card__title).",
              "Modifier: A visual or behavioral variation (e.g., .course-card--featured, .is-active)."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Block: Standalone entity that is meaningful on its own (e.g., .header, .menu).",
              "Element: Part of a block that has no standalone meaning and is semantically tied to its block.",
              "Modifier: A flag on a block or element used to change appearance or behavior."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Creating grandchild element chains like .card__body__item__title. -> Fix: Keep element selectors single-level: .card__title or create a new block for the sub-component."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Naming Conventions: Modern Pragmatic BEM and Scope Hygiene",
          "concept": "Naming Conventions: Modern Pragmatic BEM and Scope Hygiene",
          "story": "Class names should be self-documenting. A developer glancing at HTML markup should immediately understand what an element does and whether it is an independent block, a descendant part, or an active s...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Pragmatic BEM in Action",
          "description": "Writing readable, intent-revealing CSS classes without dogmatic overhead.",
          "html": "<div class=\"demo-box\"><h4>Naming Conventions: Modern Pragmatic BEM and Scope Hygiene</h4><p>Writing readable, intent-revealing CSS classes without dogmatic overhead.</p></div>",
          "css": "/* Block */\n.pricing-card {\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 2rem;\n  background-color: #ffffff;\n}\n\n/* Block Modifier */\n.pricing-card--popular {\n  border-color: #2563eb;\n  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.15);\n}\n\n/* Elements */\n.pricing-card__title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin-block-end: 0.5rem;\n}\n\n.pricing-card__price {\n  font-size: 2.25rem;\n  font-weight: 800;\n  color: #0f172a;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Naming Conventions: Modern Pragmatic BEM and Scope Hygiene Architecture Deep Dive",
          "duration": "22 min",
          "description": "Writing readable, intent-revealing CSS classes without dogmatic overhead.",
          "keyPoints": [
            "Apply pragmatic Block Element Modifier (BEM) conventions to communicate intent",
            "Prevent class name collisions in shared component environments",
            "Differentiate between structural layout classes and visual skin classes"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Writing readable, intent-revealing CSS classes without dogmatic overhead."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-08-03",
          "title": "Hands-on: Naming Conventions: Modern Pragmatic BEM and Scope Hygiene",
          "difficulty": "Intermediate",
          "estimatedTime": "15 min",
          "prompt": "What separator denotes an Element in classical BEM notation?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-08-03-1",
            "question": "In BEM terminology, what is --popular in .card--popular?",
            "options": [
              "An element",
              "A modifier",
              "A block",
              "A pseudo-class"
            ],
            "correctIndex": 1,
            "explanation": "A double hyphen (--) designates a modifier that changes the appearance or state of a block or element."
          }
        ],
        "summary": [
          "Pragmatic BEM naming provides instant structural readability and prevents destructive selector collisions."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "8",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-08-04",
        "chapterId": "css-mod-08",
        "number": "8.4",
        "slug": "css-08-04",
        "title": "Design System Governance and Token Maintenance",
        "tagline": "Managing breaking changes, deprecating old tokens, and documenting CSS variables across teams.",
        "durationMinutes": 25,
        "learningObjectives": [
          "Establish token versioning and deprecation strategies",
          "Document design tokens using self-documenting CSS comments and style dictionaries",
          "Conduct visual regression audits to protect design system integrity"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "A design system is a living product used by multiple developers. When colors or padding tokens change, uncoordinated updates can break dozens of application views. Establishing systematic governance, fallback chains, and deprecation notices keeps design systems rock-solid over years of iteration.",
            "bulletPoints": [
              "Introduce new tokens alongside legacy tokens before retiring the old ones.",
              "Aliasing deprecated tokens: --color-old-blue: var(--color-brand-primary).",
              "Document every token with purpose, type, and permissible values directly in CSS."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Design System Governance: The processes and rules used to maintain, update, and evolve design tokens and components across an organization.",
              "Token Aliasing: Pointing an older custom property to a new semantic token to prevent immediate breaking changes."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Deleting old tokens abruptly, causing immediate CSS rendering failures across consumer views. -> Fix: Alias deprecated tokens to their modern replacements for at least one minor release cycle."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Design System Governance and Token Maintenance",
          "concept": "Design System Governance and Token Maintenance",
          "story": "A design system is a living product used by multiple developers. When colors or padding tokens change, uncoordinated updates can break dozens of application views. Establishing systematic governance, ...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Token Governance & Deprecation Migration Chain",
          "description": "Managing breaking changes, deprecating old tokens, and documenting CSS variables across teams.",
          "html": "<div class=\"demo-box\"><h4>Design System Governance and Token Maintenance</h4><p>Managing breaking changes, deprecating old tokens, and documenting CSS variables across teams.</p></div>",
          "css": ":root {\n  /* ==========================================================================\n     CURRENT CANONICAL SEMANTIC TOKENS (v2.0)\n     ========================================================================== */\n  --sys-color-primary: oklch(0.62 0.22 255);\n  --sys-color-surface: oklch(0.99 0.005 250);\n  --sys-radius-card: 12px;\n\n  /* ==========================================================================\n     DEPRECATED TOKENS (Will be removed in v3.0 - aliased to canonical)\n     ========================================================================== */\n  --brand-blue: var(--sys-color-primary); /* DEPRECATED: Use --sys-color-primary */\n  --card-radius: var(--sys-radius-card);  /* DEPRECATED: Use --sys-radius-card */\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Design System Governance and Token Maintenance Architecture Deep Dive",
          "duration": "25 min",
          "description": "Managing breaking changes, deprecating old tokens, and documenting CSS variables across teams.",
          "keyPoints": [
            "Establish token versioning and deprecation strategies",
            "Document design tokens using self-documenting CSS comments and style dictionaries",
            "Conduct visual regression audits to protect design system integrity"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Managing breaking changes, deprecating old tokens, and documenting CSS variables across teams."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-08-04",
          "title": "Hands-on: Design System Governance and Token Maintenance",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "How can you deprecate a CSS variable without breaking existing components immediately?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-08-04-1",
            "question": "What is the safest way to evolve a design token used in production?",
            "options": [
              "Delete it immediately",
              "Alias the old token to the new replacement",
              "Rename it across all files simultaneously in one commit",
              "Change the CSS engine"
            ],
            "correctIndex": 1,
            "explanation": "Aliasing guarantees backwards compatibility while allowing developers time to migrate to the new token."
          }
        ],
        "summary": [
          "Disciplined token governance and backward-compatible aliasing preserve stability across enterprise design systems."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "8",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-08-05",
        "chapterId": "css-mod-08",
        "number": "8.5",
        "slug": "css-08-05",
        "title": "Zero-Duplication: Eliminating Dead CSS and Style Bloat",
        "tagline": "Auditing CSS coverage, removing dead rules, and eliminating repetitive utility declarations.",
        "durationMinutes": 22,
        "learningObjectives": [
          "Use Chrome DevTools Coverage panel to pinpoint unused CSS rules",
          "Refactor repetitive utility declarations into semantic reusable classes",
          "Maintain lean stylesheet bundle sizes (< 40kb uncompressed)"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "CSS bloat accumulates silently. As features evolve, old rules are forgotten while new rules are appended to the bottom. Over time, stylesheets swell with dead code that slows down parsing and wastes mobile bandwidth. Systematic audits keep stylesheets lean, fast, and pristine.",
            "bulletPoints": [
              "Open Chrome DevTools -> More Tools -> Coverage.",
              "Record page interactions to see which CSS lines execute and which remain unused.",
              "Consolidate repetitive inline styles into well-defined design system components."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Coverage Tool: Browser developer tool that measures how much CSS and JS code actually executed on a page.",
              "Dead Code: CSS rules that no longer match any element across the entire web application."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Adding new rules to the bottom of a stylesheet instead of editing existing matching rules. -> Fix: Always search for existing component rules first before writing new CSS."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Zero-Duplication: Eliminating Dead CSS and Style Bloat",
          "concept": "Zero-Duplication: Eliminating Dead CSS and Style Bloat",
          "story": "CSS bloat accumulates silently. As features evolve, old rules are forgotten while new rules are appended to the bottom. Over time, stylesheets swell with dead code that slows down parsing and wastes m...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Consolidating Redundant CSS into DRY Patterns",
          "description": "Auditing CSS coverage, removing dead rules, and eliminating repetitive utility declarations.",
          "html": "<div class=\"demo-box\"><h4>Zero-Duplication: Eliminating Dead CSS and Style Bloat</h4><p>Auditing CSS coverage, removing dead rules, and eliminating repetitive utility declarations.</p></div>",
          "css": "/* BAD PRACTICE: Repetitive copy-pasted styling\n.news-badge { display: inline-flex; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; background: #dbeafe; color: #1e40af; }\n.sale-badge { display: inline-flex; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; background: #fee2e2; color: #991b1b; }\n*/\n\n/* EXCELLENT PRACTICE: Composable DRY pattern */\n.badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1;\n}\n\n.badge--info { background: #dbeafe; color: #1e40af; }\n.badge--danger { background: #fee2e2; color: #991b1b; }",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Zero-Duplication: Eliminating Dead CSS and Style Bloat Architecture Deep Dive",
          "duration": "22 min",
          "description": "Auditing CSS coverage, removing dead rules, and eliminating repetitive utility declarations.",
          "keyPoints": [
            "Use Chrome DevTools Coverage panel to pinpoint unused CSS rules",
            "Refactor repetitive utility declarations into semantic reusable classes",
            "Maintain lean stylesheet bundle sizes (< 40kb uncompressed)"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Auditing CSS coverage, removing dead rules, and eliminating repetitive utility declarations."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-08-05",
          "title": "Hands-on: Zero-Duplication: Eliminating Dead CSS and Style Bloat",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "Where can you find the Coverage tool in Chromium-based browsers?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-08-05-1",
            "question": "What is the primary danger of unpruned dead CSS code?",
            "options": [
              "It causes memory leaks in JavaScript",
              "It increases download times and slows down CSSOM rendering",
              "It turns the page black",
              "It breaks HTML validation"
            ],
            "correctIndex": 1,
            "explanation": "Unused CSS wastes network bandwidth and forces the browser to parse unnecessary rules during page load."
          }
        ],
        "summary": [
          "Regular coverage audits and composable component refactoring prevent CSS bloat and guarantee lightning-fast performance."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "8",
            "context": "Modern CSS Mastery"
          }
        ]
      }
    ]
  },
  {
    "id": "css-mod-09",
    "number": "9",
    "badge": "CSS 09",
    "slug": "capstone-production-projects",
    "title": "Module 9: Capstone Production Design Projects",
    "subtitle": "Editorial Landing Page, Component Library, Porcelain/Obsidian Themes & Dashboard Shell",
    "description": "Synthesizing all architectural principles into 4 complete, production-ready, pure CSS3 projects.",
    "estimatedHours": "4 hrs",
    "accentColor": "indigo",
    "iconName": "Layers",
    "totalLessons": 4,
    "lessons": [
      {
        "id": "css-09-01",
        "chapterId": "css-mod-09",
        "number": "9.1",
        "slug": "css-09-01",
        "title": "Capstone 1: High-Performance Editorial Landing Page",
        "tagline": "Developing a complete responsive landing page with sticky glass nav, hero mesh, fluid type, and zero CLS.",
        "durationMinutes": 45,
        "learningObjectives": [
          "Synthesize fluid typography, CSS Grid, and OKLCH color palettes into a complete editorial landing page",
          "Implement a sticky frosted-glass header with backdrop-filter",
          "Achieve 100/100 Core Web Vitals performance using pure standard CSS3"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "This capstone project combines every core skill acquired throughout the course. You will build a complete, highly responsive editorial landing page featuring fluid typographic scales, a responsive card grid, ambient mesh backgrounds, and zero cumulative layout shifts.",
            "bulletPoints": [
              "Define root token architecture (OKLCH colors, fluid typography clamp, 8pt spacing).",
              "Construct responsive layout grid: header, hero, 3-column feature grid, testimonials, and footer.",
              "Apply frosted glass backdrop-filter to the sticky header.",
              "Verify layout stability across mobile (375px), tablet (768px), and 4K desktop (1920px)."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Editorial Design: A design discipline focused on typographic hierarchy, whitespace, and literary pacing.",
              "Production-Ready: Code that meets all accessibility, performance, and cross-browser standards."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Relying on hardcoded pixel widths that break on small mobile viewports. -> Fix: Use minmax(), clamp(), and max-width: 100% to guarantee fluid responsiveness on all devices."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Capstone 1: High-Performance Editorial Landing Page",
          "concept": "Capstone 1: High-Performance Editorial Landing Page",
          "story": "This capstone project combines every core skill acquired throughout the course. You will build a complete, highly responsive editorial landing page featuring fluid typographic scales, a responsive car...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Complete Capstone Landing Page Architecture",
          "description": "Developing a complete responsive landing page with sticky glass nav, hero mesh, fluid type, and zero CLS.",
          "html": "<div class=\"demo-box\"><h4>Capstone 1: High-Performance Editorial Landing Page</h4><p>Developing a complete responsive landing page with sticky glass nav, hero mesh, fluid type, and zero CLS.</p></div>",
          "css": "/* Complete Landing Page Container */\n.landing-shell {\n  --page-max-w: 1200px;\n  --page-px: clamp(1rem, 0.5rem + 2vw, 2.5rem);\n  width: 100%;\n  max-width: var(--page-max-w);\n  margin-inline: auto;\n  padding-inline: var(--page-px);\n}\n\n.editorial-hero {\n  padding-block: clamp(3rem, 2rem + 5vw, 7rem);\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1.5rem;\n}\n\n.editorial-hero__headline {\n  font-size: clamp(2.25rem, 1.5rem + 3.5vw, 4.5rem);\n  line-height: 1.1;\n  font-weight: 800;\n  letter-spacing: -0.03em;\n  max-width: 20ch;\n}\n\n.feature-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n  padding-block: 4rem;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Capstone 1: High-Performance Editorial Landing Page Architecture Deep Dive",
          "duration": "45 min",
          "description": "Developing a complete responsive landing page with sticky glass nav, hero mesh, fluid type, and zero CLS.",
          "keyPoints": [
            "Synthesize fluid typography, CSS Grid, and OKLCH color palettes into a complete editorial landing page",
            "Implement a sticky frosted-glass header with backdrop-filter",
            "Achieve 100/100 Core Web Vitals performance using pure standard CSS3"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Developing a complete responsive landing page with sticky glass nav, hero mesh, fluid type, and zero CLS."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-09-01",
          "title": "Hands-on: Capstone 1: High-Performance Editorial Landing Page",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "What CSS Grid declaration guarantees automatic wrapping without media queries?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-09-01-1",
            "question": "Which CSS function allows typography to scale smoothly between 320px and 1440px viewports?",
            "options": [
              "calc() alone",
              "clamp(min, preferred, max)",
              "var()",
              "min() alone"
            ],
            "correctIndex": 1,
            "explanation": "clamp() provides lower and upper boundaries while scaling along a viewport-based preferred value."
          }
        ],
        "summary": [
          "Building a complete editorial landing page demonstrates the formidable power and elegance of modern pure CSS3."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "9",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-09-02",
        "chapterId": "css-mod-09",
        "number": "9.2",
        "slug": "css-09-02",
        "title": "Capstone 2: Production Component Library & Style Guide",
        "tagline": "Building an enterprise-grade component kit with buttons, inputs, modals, toasts, and badges.",
        "durationMinutes": 45,
        "learningObjectives": [
          "Assemble a 10-component design system kit using pure CSS custom property APIs",
          "Style native HTML5 form controls and custom accessible checkboxes/radios",
          "Package components with isolated CSS cascade layers for zero specificity leaks"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Component libraries are the foundation of modern product development. In this capstone, you will construct a fully functioning, self-documenting component library containing buttons, form inputs, dialogs, badges, and alerts using pure standard CSS.",
            "bulletPoints": [
              "Define the master design system token file with OKLCH colors and spacing.",
              "Implement base button styles with primary, secondary, outline, and destructive variants.",
              "Build accessible form controls styled with :focus-visible and :invalid pseudoclasses.",
              "Construct floating toast notifications with slide-in CSS animations."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Component Library: A collection of reusable, standardized UI components that conform to a unified design system.",
              "Style Guide: Living documentation presenting all component variants and usage guidelines."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Overriding native form elements with non-semantic div tags. -> Fix: Always style native HTML5 elements (<input>, <select>, <dialog>) to maintain built-in keyboard and screen reader accessibility."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Capstone 2: Production Component Library & Style Guide",
          "concept": "Capstone 2: Production Component Library & Style Guide",
          "story": "Component libraries are the foundation of modern product development. In this capstone, you will construct a fully functioning, self-documenting component library containing buttons, form inputs, dial...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Standard Form Input and Toast Component Kit",
          "description": "Building an enterprise-grade component kit with buttons, inputs, modals, toasts, and badges.",
          "html": "<div class=\"demo-box\"><h4>Capstone 2: Production Component Library & Style Guide</h4><p>Building an enterprise-grade component kit with buttons, inputs, modals, toasts, and badges.</p></div>",
          "css": "/* Standard Accessible Text Input */\n.input-field {\n  width: 100%;\n  padding: 0.625rem 0.875rem;\n  font-size: 0.95rem;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  background-color: #ffffff;\n  color: #0f172a;\n  transition: border-color 150ms ease, box-shadow 150ms ease;\n}\n\n.input-field:focus-visible {\n  outline: none;\n  border-color: #2563eb;\n  box-shadow: 0 0 0 3px oklch(0.62 0.22 255 / 0.2);\n}\n\n/* Floating Toast Notification */\n.toast-notice {\n  position: fixed;\n  inset-block-end: 1.5rem;\n  inset-inline-end: 1.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 1rem 1.25rem;\n  background-color: #0f172a;\n  color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);\n  animation: toastIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Capstone 2: Production Component Library & Style Guide Architecture Deep Dive",
          "duration": "45 min",
          "description": "Building an enterprise-grade component kit with buttons, inputs, modals, toasts, and badges.",
          "keyPoints": [
            "Assemble a 10-component design system kit using pure CSS custom property APIs",
            "Style native HTML5 form controls and custom accessible checkboxes/radios",
            "Package components with isolated CSS cascade layers for zero specificity leaks"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Building an enterprise-grade component kit with buttons, inputs, modals, toasts, and badges."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-09-02",
          "title": "Hands-on: Capstone 2: Production Component Library & Style Guide",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "Why is styling the native <dialog> element superior to custom modal div structures?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-09-02-1",
            "question": "Which CSS selector styles an input when the user types invalid data in a required field?",
            "options": [
              "input:error",
              "input:invalid",
              "input:not-working",
              "input::invalid"
            ],
            "correctIndex": 1,
            "explanation": ":invalid matches any form element whose value fails HTML validation constraints."
          }
        ],
        "summary": [
          "A clean, well-architected CSS component library accelerates application development while ensuring uncompromising quality."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "9",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-09-03",
        "chapterId": "css-mod-09",
        "number": "9.3",
        "slug": "css-09-03",
        "title": "Capstone 3: Complete Soft Porcelain and Midnight Obsidian Themes",
        "tagline": "Building a dynamic theme switcher supporting OS sync, manual toggle, and zero flash of unstyled content.",
        "durationMinutes": 40,
        "learningObjectives": [
          "Construct the complete Soft Porcelain (light) and Midnight Obsidian (dark) theme system",
          "Synchronize user preferences with localStorage and prefers-color-scheme",
          "Eliminate all white flashes during theme transitions with inline execution"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Theme switching is an essential requirement for modern digital products. In this capstone, you will implement Zero-to-Website flagship theme system: Soft Porcelain as the default editorial light mode and Midnight Obsidian as the high-focus dark mode, complete with contrast preservation and smooth color interpolation.",
            "bulletPoints": [
              "Declare semantic variables on :root for Soft Porcelain.",
              "Declare Midnight Obsidian overrides under :root[data-theme=\"dark\"].",
              "Map color-scheme to light and dark respectively.",
              "Implement a toggle button with accessible aria-pressed state."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Soft Porcelain: A refined light theme utilizing warm white tones and soft slate contrasts.",
              "Midnight Obsidian: A deep, high-focus dark theme built on deep obsidian and glowing indigo accents."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Transitioning every CSS property during theme toggle, causing sluggish frame rates. -> Fix: Only transition background-color, color, and border-color during theme switches."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Capstone 3: Complete Soft Porcelain and Midnight Obsidian Themes",
          "concept": "Capstone 3: Complete Soft Porcelain and Midnight Obsidian Themes",
          "story": "Theme switching is an essential requirement for modern digital products. In this capstone, you will implement Zero-to-Website flagship theme system: Soft Porcelain as the default editorial light mode ...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Soft Porcelain & Midnight Obsidian Theme Definitions",
          "description": "Building a dynamic theme switcher supporting OS sync, manual toggle, and zero flash of unstyled content.",
          "html": "<div class=\"demo-box\"><h4>Capstone 3: Complete Soft Porcelain and Midnight Obsidian Themes</h4><p>Building a dynamic theme switcher supporting OS sync, manual toggle, and zero flash of unstyled content.</p></div>",
          "css": "/* Soft Porcelain Theme (Default) */\n:root {\n  --theme-bg-canvas: #f8fafc;\n  --theme-bg-surface: #ffffff;\n  --theme-text-main: #0f172a;\n  --theme-text-subtle: #475569;\n  --theme-border: #e2e8f0;\n  --theme-accent: #2563eb;\n  color-scheme: light;\n}\n\n/* Midnight Obsidian Theme */\n:root[data-theme=\"dark\"] {\n  --theme-bg-canvas: #090d16;\n  --theme-bg-surface: #0f172a;\n  --theme-text-main: #f8fafc;\n  --theme-text-subtle: #94a3b8;\n  --theme-border: #1e293b;\n  --theme-accent: #38bdf8;\n  color-scheme: dark;\n}\n\n/* Smooth theme transition */\nbody {\n  background-color: var(--theme-bg-canvas);\n  color: var(--theme-text-main);\n  transition: background-color 200ms ease, color 200ms ease;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Capstone 3: Complete Soft Porcelain and Midnight Obsidian Themes Architecture Deep Dive",
          "duration": "40 min",
          "description": "Building a dynamic theme switcher supporting OS sync, manual toggle, and zero flash of unstyled content.",
          "keyPoints": [
            "Construct the complete Soft Porcelain (light) and Midnight Obsidian (dark) theme system",
            "Synchronize user preferences with localStorage and prefers-color-scheme",
            "Eliminate all white flashes during theme transitions with inline execution"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Building a dynamic theme switcher supporting OS sync, manual toggle, and zero flash of unstyled content."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-09-03",
          "title": "Hands-on: Capstone 3: Complete Soft Porcelain and Midnight Obsidian Themes",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "Why should color-scheme be updated alongside custom CSS variables?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-09-03-1",
            "question": "Which HTML attribute is commonly targeted by CSS to toggle application-wide dark mode?",
            "options": [
              "class=\"dark-mode-all\"",
              "data-theme=\"dark\"",
              "theme=\"midnight\"",
              "style=\"dark\""
            ],
            "correctIndex": 1,
            "explanation": "data-theme=\"dark\" on the <html> or <body> root element is the standard modern pattern for theme switching."
          }
        ],
        "summary": [
          "Crafting comprehensive themes with semantic custom properties provides user comfort and unmatched visual polish."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "9",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-09-04",
        "chapterId": "css-mod-09",
        "number": "9.4",
        "slug": "css-09-04",
        "title": "Capstone 4: Responsive Analytics Dashboard Shell in Pure CSS3",
        "tagline": "Architecting a full desktop-and-mobile dashboard shell with fixed sidebar, scrollable content, and KPI cards.",
        "durationMinutes": 50,
        "learningObjectives": [
          "Construct a full dashboard shell featuring fixed sidebar dimensions (250px expanded, 68px collapsed)",
          "Implement an internal scrollable main view with sticky top header",
          "Build responsive metric KPI cards using standard CSS Grid and zero external UI frameworks"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Complex software interfaces demand rock-solid layout architecture. In this final capstone project, you will build a complete dashboard application shell. The sidebar remains fixed with predictable dimensions (250px expanded, 68px collapsed), the header remains pinned to the top, and the main content area scrolls independently with responsive metric grids.",
            "bulletPoints": [
              "Create the master shell layout using CSS Grid: 100dvh viewport height.",
              "Fix the sidebar dimensions: width: 250px; min-width: 250px; max-width: 250px; overflow: hidden.",
              "Support collapsed mode: .sidebar.collapsed with width: 68px and tooltips.",
              "Construct the KPI card grid using repeat(auto-fit, minmax(240px, 1fr))."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Application Shell: The minimal HTML, CSS, and layout structure that powers a user interface and houses dynamic content.",
              "100dvh: Dynamic viewport height unit that accounts for mobile browser address bar expansion and contraction."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Forgetting min-width: 0 on flex children, allowing wide content to stretch the sidebar. -> Fix: Always set min-width: 0 on flex items containing scrollable tables or long text."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Capstone 4: Responsive Analytics Dashboard Shell in Pure CSS3",
          "concept": "Capstone 4: Responsive Analytics Dashboard Shell in Pure CSS3",
          "story": "Complex software interfaces demand rock-solid layout architecture. In this final capstone project, you will build a complete dashboard application shell. The sidebar remains fixed with predictable dim...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Standard Enterprise Dashboard Shell Layout",
          "description": "Architecting a full desktop-and-mobile dashboard shell with fixed sidebar, scrollable content, and KPI cards.",
          "html": "<div class=\"demo-box\"><h4>Capstone 4: Responsive Analytics Dashboard Shell in Pure CSS3</h4><p>Architecting a full desktop-and-mobile dashboard shell with fixed sidebar, scrollable content, and KPI cards.</p></div>",
          "css": "/* Master Dashboard Shell Container */\n.app-shell {\n  display: flex;\n  height: 100dvh;\n  width: 100vw;\n  overflow: hidden;\n  background-color: #f8fafc;\n}\n\n/* Sidebar with Rigid Dimension Boundaries */\n.app-sidebar {\n  width: 250px;\n  min-width: 250px;\n  max-width: 250px;\n  height: 100%;\n  background-color: #0f172a;\n  color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  transition: width 200ms cubic-bezier(0.16, 1, 0.3, 1);\n  overflow: hidden;\n  box-sizing: border-box;\n}\n\n.app-sidebar.collapsed {\n  width: 68px;\n  min-width: 68px;\n  max-width: 68px;\n}\n\n/* Independent Main Content Region */\n.app-main {\n  flex: 1;\n  min-width: 0; /* Prevents flex overflow */\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow-y: auto;\n}\n\n/* KPI Metrics Grid */\n.kpi-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1.5rem;\n  padding: 1.5rem;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Capstone 4: Responsive Analytics Dashboard Shell in Pure CSS3 Architecture Deep Dive",
          "duration": "50 min",
          "description": "Architecting a full desktop-and-mobile dashboard shell with fixed sidebar, scrollable content, and KPI cards.",
          "keyPoints": [
            "Construct a full dashboard shell featuring fixed sidebar dimensions (250px expanded, 68px collapsed)",
            "Implement an internal scrollable main view with sticky top header",
            "Build responsive metric KPI cards using standard CSS Grid and zero external UI frameworks"
          ],
          "timestamps": [
            {
              "time": "00:00",
              "seconds": 0,
              "title": "Foundations",
              "description": "Overview of core concepts"
            },
            {
              "time": "08:30",
              "seconds": 510,
              "title": "Implementation",
              "description": "Writing standard code"
            }
          ],
          "transcript": [
            {
              "speaker": "Lead Architect",
              "time": "00:00",
              "seconds": 0,
              "text": "Architecting a full desktop-and-mobile dashboard shell with fixed sidebar, scrollable content, and KPI cards."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-09-04",
          "title": "Hands-on: Capstone 4: Responsive Analytics Dashboard Shell in Pure CSS3",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "Why is 100dvh preferred over 100vh on mobile browser interfaces?",
          "instructions": [
            "Inspect the starter code in the sandbox.",
            "Write the required CSS rules using standard properties.",
            "Verify rendering in the live preview."
          ],
          "starterHtml": "<div class=\"exercise-card\"><h3>Exercise</h3><p>Complete this task.</p></div>",
          "starterCss": ".exercise-card { padding: 1rem; border: 1px solid #ccc; }",
          "starterJs": "",
          "solutionJs": "",
          "hints": [
            "Refer to the lesson code example above."
          ],
          "testCases": [
            {
              "id": "tc-1",
              "description": "Card element renders",
              "hint": "Ensure class is present",
              "checkType": "selector-exists",
              "target": ".exercise-card"
            }
          ]
        },
        "quiz": [
          {
            "id": "q-css-09-04-1",
            "question": "Which property prevents flex containers from expanding beyond their bounds when containing wide children?",
            "options": [
              "flex-shrink: 0",
              "min-width: 0",
              "overflow: visible",
              "width: 100vw"
            ],
            "correctIndex": 1,
            "explanation": "In CSS Flexbox, min-width: 0 overrides the default auto minimum sizing, allowing containers to contract and scroll properly."
          }
        ],
        "summary": [
          "Mastering the application shell layout completes your journey to becoming an elite modern CSS architect."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "9",
            "context": "Modern CSS Mastery"
          }
        ]
      }
    ]
  }
];
