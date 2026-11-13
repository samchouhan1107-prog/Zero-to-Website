import { Chapter } from '../../../utils/types';

export const MODERN_CSS_MODULES_4_TO_6: Chapter[] = [
  {
    "id": "css-mod-04",
    "number": "4",
    "badge": "CSS 04",
    "slug": "design-systems-tokens",
    "title": "Module 4: Design Systems and Tokens",
    "subtitle": "Design Tokens, Fluid Typography, Baseline Spacing & Component APIs",
    "description": "Constructing robust token architectures, typography ladders, fluid spacing scales, component kits, and theme switches.",
    "estimatedHours": "4 hrs",
    "accentColor": "indigo",
    "iconName": "Layers",
    "totalLessons": 6,
    "lessons": [
      {
        "id": "css-04-01",
        "chapterId": "css-mod-04",
        "number": "4.1",
        "slug": "css-04-01",
        "title": "Design Tokens Architecture with CSS Custom Properties",
        "tagline": "Architecting tiered design tokens (global, semantic, and component-level) using standard CSS custom properties.",
        "durationMinutes": 26,
        "learningObjectives": [
          "Differentiate between primitive tokens, semantic alias tokens, and component-scoped tokens",
          "Organize CSS custom properties in hierarchical layers for effortless maintenance",
          "Enforce brand consistency across complex multi-page web applications"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Design tokens are the atomic visual decisions of an interface encoded as data. In modern standard CSS, custom properties provide the premier engine for tokens because they inherit natively down the DOM tree, can be updated dynamically at runtime via JavaScript or media queries, and do not require preprocessors.",
            "bulletPoints": [
              "Define Primitive (Tier 1) Tokens on :root: raw hex values, base spacing units, and raw font families.",
              "Define Semantic (Tier 2) Tokens referencing primitives: --color-surface, --color-on-surface, --color-accent.",
              "Define Component-Scoped (Tier 3) Tokens: --btn-bg: var(--color-accent); --btn-radius: var(--radius-sm)."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Primitive Token: Raw, brand-level literal values such as --palette-blue-500: #2563eb.",
              "Semantic Token: Purpose-driven alias describing function rather than appearance, e.g., --color-border-subtle.",
              "Component Token: Tokens scoped specifically to a UI widget, allowing isolated theme overrides."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Exposing primitive values directly in component CSS instead of semantic variables. -> Fix: Route all component styling through semantic aliases so themes can be switched globally."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Design Tokens Architecture with CSS Custom Properties",
          "concept": "Design Tokens Architecture with CSS Custom Properties",
          "story": "Design tokens are the atomic visual decisions of an interface encoded as data. In modern standard CSS, custom properties provide the premier engine for tokens because they inherit natively down the DO...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Three-Tier Token Architecture in Pure CSS",
          "description": "Architecting tiered design tokens (global, semantic, and component-level) using standard CSS custom properties.",
          "html": "<div class=\"demo-box\"><h4>Design Tokens Architecture with CSS Custom Properties</h4><p>Architecting tiered design tokens (global, semantic, and component-level) using standard CSS custom properties.</p></div>",
          "css": ":root {\n  /* Tier 1: Primitive Tokens */\n  --blue-100: #dbeafe;\n  --blue-500: #3b82f6;\n  --blue-900: #1e3a8a;\n  --slate-50: #f8fafc;\n  --slate-900: #0f172a;\n\n  /* Tier 2: Semantic System Tokens */\n  --sys-color-background: var(--slate-50);\n  --sys-color-on-background: var(--slate-900);\n  --sys-color-primary: var(--blue-500);\n  --sys-radius-card: 12px;\n}\n\n/* Tier 3: Component Token Usage */\n.editorial-card {\n  --card-bg: var(--sys-color-background);\n  --card-fg: var(--sys-color-on-background);\n  --card-border-color: rgba(0, 0, 0, 0.08);\n\n  background-color: var(--card-bg);\n  color: var(--card-fg);\n  border: 1px solid var(--card-border-color);\n  border-radius: var(--sys-radius-card);\n  padding: 1.5rem;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Design Tokens Architecture with CSS Custom Properties Architecture Deep Dive",
          "duration": "26 min",
          "description": "Architecting tiered design tokens (global, semantic, and component-level) using standard CSS custom properties.",
          "keyPoints": [
            "Differentiate between primitive tokens, semantic alias tokens, and component-scoped tokens",
            "Organize CSS custom properties in hierarchical layers for effortless maintenance",
            "Enforce brand consistency across complex multi-page web applications"
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
              "text": "Architecting tiered design tokens (global, semantic, and component-level) using standard CSS custom properties."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-04-01",
          "title": "Hands-on: Design Tokens Architecture with CSS Custom Properties",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "What is the primary advantage of referencing semantic tokens rather than raw hex values in components?",
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
            "id": "q-css-04-01-1",
            "question": "Which tier should a button component directly reference for its default background color?",
            "options": [
              "Primitive hex code",
              "Semantic or component token",
              "Browser user-agent default",
              "Inline style"
            ],
            "correctIndex": 1,
            "explanation": "Components should reference semantic or component-scoped tokens to preserve modularity and theming flexibility."
          }
        ],
        "summary": [
          "A three-tier token hierarchy provides supreme architectural clarity and ensures that design modifications propagate predictably across entire enterprise codebases."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "4",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-04-02",
        "chapterId": "css-mod-04",
        "number": "4.2",
        "slug": "css-04-02",
        "title": "Perceptually Uniform Colour Systems with OKLCH",
        "tagline": "Constructing accessible, predictable color palettes with modern OKLCH and relative color syntax.",
        "durationMinutes": 28,
        "learningObjectives": [
          "Understand how OKLCH addresses the perceptual lightness distortions of HSL and RGB",
          "Build 10-step accessible tonal palettes with constant perceived brightness",
          "Apply CSS relative color syntax to generate tints and shades dynamically"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Traditional color spaces like sRGB and HSL are not perceptually uniform: pure yellow in HSL appears vastly brighter than pure blue despite both having a lightness value of 50%. OKLCH aligns mathematical lightness with human visual perception, enabling rock-solid accessible color systems.",
            "bulletPoints": [
              "Specify color using oklch(L C H): Lightness (0-1), Chroma (saturation), and Hue (0-360).",
              "Keep Lightness constant across differing hues to guarantee equal perceived brightness.",
              "Derive interactive hover and active states using relative color syntax: oklch(from var(--primary) calc(l - 0.08) c h)."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Perceptual Lightness (L): A measure of brightness calibrated to human ocular perception.",
              "Chroma (C): The purity or colorfulness of an area relative to neutral grey.",
              "Relative Color Syntax: Standard CSS feature allowing creation of new colors derived from existing color variables."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Using HSL for automated contrast verification. -> Fix: Adopt OKLCH where L strictly correlates with perceived ocular luminance."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Perceptually Uniform Colour Systems with OKLCH",
          "concept": "Perceptually Uniform Colour Systems with OKLCH",
          "story": "Traditional color spaces like sRGB and HSL are not perceptually uniform: pure yellow in HSL appears vastly brighter than pure blue despite both having a lightness value of 50%. OKLCH aligns mathematic...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "OKLCH Palette and Relative Color Syntax",
          "description": "Constructing accessible, predictable color palettes with modern OKLCH and relative color syntax.",
          "html": "<div class=\"demo-box\"><h4>Perceptually Uniform Colour Systems with OKLCH</h4><p>Constructing accessible, predictable color palettes with modern OKLCH and relative color syntax.</p></div>",
          "css": ":root {\n  /* Base brand color in OKLCH */\n  --brand-primary: oklch(0.62 0.22 255); /* L, C, H */\n  --brand-accent: oklch(0.70 0.18 45);\n\n  /* Accessible state variants derived dynamically */\n  --brand-hover: oklch(from var(--brand-primary) calc(l - 0.08) c h);\n  --brand-subtle: oklch(from var(--brand-primary) 0.94 calc(c * 0.25) h);\n  --brand-contrast-text: oklch(0.98 0.01 255);\n}\n\n.primary-button {\n  background: var(--brand-primary);\n  color: var(--brand-contrast-text);\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 150ms ease;\n}\n\n.primary-button:hover {\n  background: var(--brand-hover);\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Perceptually Uniform Colour Systems with OKLCH Architecture Deep Dive",
          "duration": "28 min",
          "description": "Constructing accessible, predictable color palettes with modern OKLCH and relative color syntax.",
          "keyPoints": [
            "Understand how OKLCH addresses the perceptual lightness distortions of HSL and RGB",
            "Build 10-step accessible tonal palettes with constant perceived brightness",
            "Apply CSS relative color syntax to generate tints and shades dynamically"
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
              "text": "Constructing accessible, predictable color palettes with modern OKLCH and relative color syntax."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-04-02",
          "title": "Hands-on: Perceptually Uniform Colour Systems with OKLCH",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "What does the C parameter represent in oklch(0.7 0.15 140)?",
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
            "id": "q-css-04-02-1",
            "question": "Why is OKLCH superior to standard HSL for building design systems?",
            "options": [
              "It uses fewer characters",
              "It offers perceptual uniformity across all hues",
              "It only works in Safari",
              "It replaces JavaScript"
            ],
            "correctIndex": 1,
            "explanation": "OKLCH matches human ocular perception, ensuring that two colors with the same lightness value exhibit identical perceived contrast."
          }
        ],
        "summary": [
          "OKLCH represents the state-of-the-art color standard in CSS, providing predictable contrast ratios and dynamic palette derivation."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "4",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-04-03",
        "chapterId": "css-mod-04",
        "number": "4.3",
        "slug": "css-04-03",
        "title": "Modular Typography Scales and Fluid Type",
        "tagline": "Formulating mathematical typographic ladders and fluid font scaling using CSS clamp.",
        "durationMinutes": 24,
        "learningObjectives": [
          "Construct a harmonic typographic scale based on mathematical ratios (e.g., Perfect Fourth 1.333)",
          "Implement fluid font sizing using clamp(min, val, max) without abrupt breakpoint jumps",
          "Establish harmonious line-height (leading) and letter-spacing (tracking) relationships"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "A modular typography scale uses a fixed mathematical multiplier to generate harmonious heading sizes. Pairing this scale with the CSS clamp() function produces fluid typography that scales smoothly between mobile viewports and large desktop displays without layout popping.",
            "bulletPoints": [
              "Choose a modular ratio (e.g., Minor Third 1.2, Major Third 1.25, or Perfect Fourth 1.333).",
              "Compute step variables: --step--1, --step-0 (base), --step-1, --step-2, --step-3.",
              "Inject viewport units into the ideal clamp parameter: clamp(1.75rem, 1.2rem + 2.5vw, 3rem)."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Modular Scale: A sequence of numbers that bear a proportional mathematical relationship to one another.",
              "Fluid Typography: Text that smoothly scales along a viewport width gradient using CSS clamp.",
              "Optimal Measure: The ideal line length for readability, typically 45 to 75 characters per line."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Setting line-height in pixels instead of unitless values. -> Fix: Always use unitless line-height (e.g., 1.5) so child elements scale their leading proportionally with font-size changes."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Modular Typography Scales and Fluid Type",
          "concept": "Modular Typography Scales and Fluid Type",
          "story": "A modular typography scale uses a fixed mathematical multiplier to generate harmonious heading sizes. Pairing this scale with the CSS clamp() function produces fluid typography that scales smoothly be...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Fluid Modular Typography Scale",
          "description": "Formulating mathematical typographic ladders and fluid font scaling using CSS clamp.",
          "html": "<div class=\"demo-box\"><h4>Modular Typography Scales and Fluid Type</h4><p>Formulating mathematical typographic ladders and fluid font scaling using CSS clamp.</p></div>",
          "css": ":root {\n  /* Fluid Typographic Steps calculated via clamp */\n  --font-step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem); /* Body base */\n  --font-step-1: clamp(1.2rem, 1.1rem + 0.5vw, 1.45rem);   /* Subheadings */\n  --font-step-2: clamp(1.44rem, 1.25rem + 0.95vw, 1.95rem); /* H3 */\n  --font-step-3: clamp(1.728rem, 1.45rem + 1.4vw, 2.6rem);  /* H2 */\n  --font-step-4: clamp(2.074rem, 1.6rem + 2.4vw, 3.5rem);   /* H1 */\n\n  /* Line-height proportional scale */\n  --leading-tight: 1.15;\n  --leading-snug: 1.3;\n  --leading-normal: 1.6;\n}\n\nh1 {\n  font-size: var(--font-step-4);\n  line-height: var(--leading-tight);\n  letter-spacing: -0.025em;\n  max-width: 25ch;\n}\n\np {\n  font-size: var(--font-step-0);\n  line-height: var(--leading-normal);\n  max-width: 65ch;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Modular Typography Scales and Fluid Type Architecture Deep Dive",
          "duration": "24 min",
          "description": "Formulating mathematical typographic ladders and fluid font scaling using CSS clamp.",
          "keyPoints": [
            "Construct a harmonic typographic scale based on mathematical ratios (e.g., Perfect Fourth 1.333)",
            "Implement fluid font sizing using clamp(min, val, max) without abrupt breakpoint jumps",
            "Establish harmonious line-height (leading) and letter-spacing (tracking) relationships"
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
              "text": "Formulating mathematical typographic ladders and fluid font scaling using CSS clamp."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-04-03",
          "title": "Hands-on: Modular Typography Scales and Fluid Type",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "Why is unitless line-height recommended in CSS typography?",
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
            "id": "q-css-04-03-1",
            "question": "In clamp(1.5rem, 1rem + 2vw, 3rem), what is the maximum font-size achievable?",
            "options": [
              "1.5rem",
              "1rem",
              "3rem",
              "Dependent on screen density"
            ],
            "correctIndex": 2,
            "explanation": "The third parameter of clamp() sets the rigid upper boundary, which is 3rem in this expression."
          }
        ],
        "summary": [
          "Fluid modular typography harmonizes readability across all screen dimensions with clean, predictable mathematical relationships."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "4",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-04-04",
        "chapterId": "css-mod-04",
        "number": "4.4",
        "slug": "css-04-04",
        "title": "Harmonic Spacing Systems and Intrinsic Layouts",
        "tagline": "Implementing 4px/8px baseline grid systems and intrinsic content-driven spacing.",
        "durationMinutes": 22,
        "learningObjectives": [
          "Establish an 8pt geometric spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)",
          "Eliminate arbitrary pixel margins and paddings across all component stylesheets",
          "Combine flexbox and grid gap properties to create fluid structural relationships"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Consistent spatial rhythm transforms chaotic layouts into polished editorial designs. By constraining all margins, paddings, and layout gaps to an established geometric scale, user interfaces attain visual balance and predictability.",
            "bulletPoints": [
              "Declare spacing variables as multiples of a base unit (e.g., 0.25rem = 4px).",
              "Reserve smaller intervals (4px, 8px, 12px) for internal component padding.",
              "Reserve larger intervals (32px, 48px, 64px, 96px) for macroscopic section divisions."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Baseline Grid: A structured coordinate grid that guides horizontal and vertical alignment of visual elements.",
              "Spatial Rhythm: The cadence and relationship of empty space surrounding visual units in a composition."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Using ad-hoc pixel values like margin-top: 17px or padding: 23px. -> Fix: Always round to the nearest established spacing token to preserve grid integrity."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Harmonic Spacing Systems and Intrinsic Layouts",
          "concept": "Harmonic Spacing Systems and Intrinsic Layouts",
          "story": "Consistent spatial rhythm transforms chaotic layouts into polished editorial designs. By constraining all margins, paddings, and layout gaps to an established geometric scale, user interfaces attain v...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Standard Geometric Spacing System",
          "description": "Implementing 4px/8px baseline grid systems and intrinsic content-driven spacing.",
          "html": "<div class=\"demo-box\"><h4>Harmonic Spacing Systems and Intrinsic Layouts</h4><p>Implementing 4px/8px baseline grid systems and intrinsic content-driven spacing.</p></div>",
          "css": ":root {\n  --space-1: 0.25rem;  /* 4px */\n  --space-2: 0.5rem;   /* 8px */\n  --space-3: 0.75rem;  /* 12px */\n  --space-4: 1rem;     /* 16px */\n  --space-5: 1.25rem;  /* 20px */\n  --space-6: 1.5rem;   /* 24px */\n  --space-8: 2rem;     /* 32px */\n  --space-10: 2.5rem;  /* 40px */\n  --space-12: 3rem;    /* 48px */\n  --space-16: 4rem;    /* 64px */\n  --space-fluid-section: clamp(2rem, 1rem + 4vw, 5rem);\n}\n\n.content-section {\n  padding-block: var(--space-fluid-section);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-6);\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Harmonic Spacing Systems and Intrinsic Layouts Architecture Deep Dive",
          "duration": "22 min",
          "description": "Implementing 4px/8px baseline grid systems and intrinsic content-driven spacing.",
          "keyPoints": [
            "Establish an 8pt geometric spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)",
            "Eliminate arbitrary pixel margins and paddings across all component stylesheets",
            "Combine flexbox and grid gap properties to create fluid structural relationships"
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
              "text": "Implementing 4px/8px baseline grid systems and intrinsic content-driven spacing."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-04-04",
          "title": "Hands-on: Harmonic Spacing Systems and Intrinsic Layouts",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "What is the advantage of using gap instead of margin on child elements?",
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
            "id": "q-css-04-04-1",
            "question": "Which CSS property should be preferred for spacing between items in Flexbox and Grid layouts?",
            "options": [
              "margin-right on children",
              "gap",
              "padding-bottom",
              "empty spacer divs"
            ],
            "correctIndex": 1,
            "explanation": "The gap property cleanly manages internal spacing between items without requiring margin-cancelling hacks."
          }
        ],
        "summary": [
          "A disciplined spacing ladder provides visual coherence, eliminates magic numbers, and speeds up UI assembly."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "4",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-04-05",
        "chapterId": "css-mod-04",
        "number": "4.5",
        "slug": "css-04-05",
        "title": "Building a Pure CSS Reusable Component Kit",
        "tagline": "Architecting buttons, badges, modals, cards, and form inputs using clean BEM and CSS custom property APIs.",
        "durationMinutes": 32,
        "learningObjectives": [
          "Create a component API surface using custom properties as inputs",
          "Implement reusable buttons, badges, and card patterns with state variants",
          "Construct accessible modal overlays using the HTML dialog element and modern CSS"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Modern CSS custom properties allow components to expose clean, declarative API surfaces. A card or button can accept property overrides from its consumer without overriding internal selectors, making CSS components as modular as React or Web Components.",
            "bulletPoints": [
              "Define base styling with sensible fallbacks: background: var(--btn-bg, #2563eb).",
              "Create modifier classes or data-attributes that update the exposed tokens.",
              "Style native elements like <dialog> and :focus-visible for accessibility."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Component API Surface: The set of CSS custom properties a component exposes for external configuration.",
              "BEM (Block Element Modifier): A structured naming methodology: block__element--modifier."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Writing high-specificity selector overrides to change button colors. -> Fix: Use localized custom properties so variants simply reassign the internal token."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Building a Pure CSS Reusable Component Kit",
          "concept": "Building a Pure CSS Reusable Component Kit",
          "story": "Modern CSS custom properties allow components to expose clean, declarative API surfaces. A card or button can accept property overrides from its consumer without overriding internal selectors, making ...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Modular Button Component API",
          "description": "Architecting buttons, badges, modals, cards, and form inputs using clean BEM and CSS custom property APIs.",
          "html": "<div class=\"demo-box\"><h4>Building a Pure CSS Reusable Component Kit</h4><p>Architecting buttons, badges, modals, cards, and form inputs using clean BEM and CSS custom property APIs.</p></div>",
          "css": "/* Base Component */\n.btn {\n  --_btn-bg: var(--btn-bg, #2563eb);\n  --_btn-color: var(--btn-color, #ffffff);\n  --_btn-border: var(--btn-border, transparent);\n  --_btn-px: var(--btn-px, 1.25rem);\n  --_btn-py: var(--btn-py, 0.625rem);\n\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: var(--_btn-py) var(--_btn-px);\n  background-color: var(--_btn-bg);\n  color: var(--_btn-color);\n  border: 1px solid var(--_btn-border);\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n/* Modifiers redefine local tokens */\n.btn--secondary {\n  --btn-bg: #f1f5f9;\n  --btn-color: #0f172a;\n  --btn-border: #cbd5e1;\n}\n\n.btn--ghost {\n  --btn-bg: transparent;\n  --btn-color: #0f172a;\n}\n\n.btn--danger {\n  --btn-bg: #dc2626;\n  --btn-color: #ffffff;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Building a Pure CSS Reusable Component Kit Architecture Deep Dive",
          "duration": "32 min",
          "description": "Architecting buttons, badges, modals, cards, and form inputs using clean BEM and CSS custom property APIs.",
          "keyPoints": [
            "Create a component API surface using custom properties as inputs",
            "Implement reusable buttons, badges, and card patterns with state variants",
            "Construct accessible modal overlays using the HTML dialog element and modern CSS"
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
              "text": "Architecting buttons, badges, modals, cards, and form inputs using clean BEM and CSS custom property APIs."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-04-05",
          "title": "Hands-on: Building a Pure CSS Reusable Component Kit",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "What is the purpose of the private custom property pattern (--_btn-bg: var(--btn-bg, fallback))?",
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
            "id": "q-css-04-05-1",
            "question": "How should an accessible modal backdrop be styled when using the native <dialog> element?",
            "options": [
              "Using an absolute div with z-index: 9999",
              "Using the ::backdrop pseudo-element",
              "Using javascript window opacity",
              "Using body:after"
            ],
            "correctIndex": 1,
            "explanation": "Standard HTML5 dialogs provide the ::backdrop pseudo-element, which is rendered in the top layer."
          }
        ],
        "summary": [
          "By encapsulating styling logic into localized custom property APIs, pure CSS components achieve extraordinary reusability and clean maintainability."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "4",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-04-06",
        "chapterId": "css-mod-04",
        "number": "4.6",
        "slug": "css-04-06",
        "title": "Theme Switching: Light, Dark, and Contrast Modes",
        "tagline": "Implementing seamless light, dark, and high-contrast theme toggling with zero flash of unstyled content.",
        "durationMinutes": 26,
        "learningObjectives": [
          "Synchronize system preferences (prefers-color-scheme) with user-selected theme overrides",
          "Prevent theme flickering during page initialisation without heavy runtime scripts",
          "Support prefers-contrast for users with visual impairments"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "A professional theme architecture respects both operating system preferences and user manual overrides. By defining semantic color tokens that switch values based on data-theme attributes and prefers-color-scheme media queries, theme switching becomes instantaneous and zero-cost.",
            "bulletPoints": [
              "Define light theme semantic variables as the default on :root.",
              "Override semantic variables in @media (prefers-color-scheme: dark) for system preference.",
              "Support explicit manual overrides via :root[data-theme=\"dark\"] and :root[data-theme=\"light\"].",
              "Add high contrast enhancements via @media (prefers-contrast: more)."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "prefers-color-scheme: CSS media query that detects whether the user has requested a light or dark OS theme.",
              "FOUC (Flash of Unstyled Content): The visual flicker that occurs when a dark-mode user receives a white page before script initialization.",
              "prefers-contrast: Media query detecting user request for increased visual contrast."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Forgetting to specify color-scheme: light dark, causing native inputs and scrollbars to clash with custom colors. -> Fix: Always set the color-scheme CSS property to inform browser native chrome of the active mode."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Theme Switching: Light, Dark, and Contrast Modes",
          "concept": "Theme Switching: Light, Dark, and Contrast Modes",
          "story": "A professional theme architecture respects both operating system preferences and user manual overrides. By defining semantic color tokens that switch values based on data-theme attributes and prefers-...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Standard Theme Architecture with System & Manual Toggles",
          "description": "Implementing seamless light, dark, and high-contrast theme toggling with zero flash of unstyled content.",
          "html": "<div class=\"demo-box\"><h4>Theme Switching: Light, Dark, and Contrast Modes</h4><p>Implementing seamless light, dark, and high-contrast theme toggling with zero flash of unstyled content.</p></div>",
          "css": ":root {\n  --bg-primary: #ffffff;\n  --bg-secondary: #f8fafc;\n  --text-primary: #0f172a;\n  --text-muted: #64748b;\n  --border-color: #e2e8f0;\n  color-scheme: light;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme=\"light\"]) {\n    --bg-primary: #0b0f19;\n    --bg-secondary: #111827;\n    --text-primary: #f8fafc;\n    --text-muted: #94a3b8;\n    --border-color: #1e293b;\n    color-scheme: dark;\n  }\n}\n\n:root[data-theme=\"dark\"] {\n  --bg-primary: #0b0f19;\n  --bg-secondary: #111827;\n  --text-primary: #f8fafc;\n  --text-muted: #94a3b8;\n  --border-color: #1e293b;\n  color-scheme: dark;\n}\n\nbody {\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  transition: background-color 200ms ease, color 200ms ease;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Theme Switching: Light, Dark, and Contrast Modes Architecture Deep Dive",
          "duration": "26 min",
          "description": "Implementing seamless light, dark, and high-contrast theme toggling with zero flash of unstyled content.",
          "keyPoints": [
            "Synchronize system preferences (prefers-color-scheme) with user-selected theme overrides",
            "Prevent theme flickering during page initialisation without heavy runtime scripts",
            "Support prefers-contrast for users with visual impairments"
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
              "text": "Implementing seamless light, dark, and high-contrast theme toggling with zero flash of unstyled content."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-04-06",
          "title": "Hands-on: Theme Switching: Light, Dark, and Contrast Modes",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "Why is setting the color-scheme property critical in modern CSS theme implementations?",
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
            "id": "q-css-04-06-1",
            "question": "Which media feature allows developers to detect if an operating system is in dark mode?",
            "options": [
              "prefers-reduced-motion",
              "prefers-color-scheme",
              "device-theme",
              "inverted-colors"
            ],
            "correctIndex": 1,
            "explanation": "prefers-color-scheme detects whether the user preferences indicate dark or light appearance."
          }
        ],
        "summary": [
          "A hybrid approach that unifies media queries with data-attribute overrides provides the ultimate balance of automatic convenience and explicit user choice."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "4",
            "context": "Modern CSS Mastery"
          }
        ]
      }
    ]
  },
  {
    "id": "css-mod-05",
    "number": "5",
    "badge": "CSS 05",
    "slug": "advanced-visual-styling",
    "title": "Module 5: Advanced Visual Styling and Effects",
    "subtitle": "Modern Selectors, Pseudo-Elements, Mesh Gradients & Layered Shadows",
    "description": "Mastering modern pseudo-elements, layered gradients, backdrop filters, box shadows, and visual hierarchy.",
    "estimatedHours": "4 hrs",
    "accentColor": "indigo",
    "iconName": "Layers",
    "totalLessons": 5,
    "lessons": [
      {
        "id": "css-05-01",
        "chapterId": "css-mod-05",
        "number": "5.1",
        "slug": "css-05-01",
        "title": "Modern Selectors: :has(), :is(), :where(), and Complex Nesting",
        "tagline": "Leveraging relational and pseudo-class selectors to build resilient, parent-aware CSS styles without JavaScript.",
        "durationMinutes": 28,
        "learningObjectives": [
          "Use the :has() relational selector to style parents based on child state or content",
          "Reduce selector specificity using :where() and consolidate groupings with :is()",
          "Write clean native CSS nesting following CSS nesting standards"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "CSS gained relational superpowers with the :has() pseudo-class—often called the parent selector. Combined with :is(), :where(), and native nesting, developers can express intricate UI state logic completely in CSS without touching DOM event listeners.",
            "bulletPoints": [
              "Use :is(h1, h2, h3) to bundle repetitive selectors without inflating specificity.",
              "Use :where() to apply reset styles with 0 specificity, making overrides effortless.",
              "Use :has() to detect child states: article:has(img) or form:has(:invalid).",
              "Nest child rules naturally inside parent blocks using standard native CSS."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              ":has(): A relational pseudo-class that matches an element if any selector passed as an argument matches at least one element relative to it.",
              ":where(): A functional pseudo-class selector with specificity value of 0, ideal for design system defaults.",
              ":is(): Matches any element in the list and adopts the specificity of the most specific selector in its arguments."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Nesting too deeply (> 3 levels) in native CSS nesting. -> Fix: Keep nesting shallow (1-2 levels) to avoid runaway selector complexity and maintain code legibility."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Modern Selectors: :has(), :is(), :where(), and Complex Nesting",
          "concept": "Modern Selectors: :has(), :is(), :where(), and Complex Nesting",
          "story": "CSS gained relational superpowers with the :has() pseudo-class—often called the parent selector. Combined with :is(), :where(), and native nesting, developers can express intricate UI state logic comp...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Practical :has() and Native Nesting Patterns",
          "description": "Leveraging relational and pseudo-class selectors to build resilient, parent-aware CSS styles without JavaScript.",
          "html": "<div class=\"demo-box\"><h4>Modern Selectors: :has(), :is(), :where(), and Complex Nesting</h4><p>Leveraging relational and pseudo-class selectors to build resilient, parent-aware CSS styles without JavaScript.</p></div>",
          "css": "/* Style card parent based on child presence */\n.product-card {\n  border: 1px solid #e2e8f0;\n  padding: 1.5rem;\n  border-radius: 12px;\n\n  /* Native CSS nesting */\n  & h3 {\n    margin-block-start: 0;\n  }\n\n  /* Parent adapts when a sale badge is present inside */\n  &:has(.sale-badge) {\n    border-color: #3b82f6;\n    background-color: #f8fafc;\n  }\n}\n\n/* Form fieldset styling when child is invalid */\n.form-group:has(input:focus-visible) {\n  outline: 2px solid #3b82f6;\n  outline-offset: 4px;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Modern Selectors: :has(), :is(), :where(), and Complex Nesting Architecture Deep Dive",
          "duration": "28 min",
          "description": "Leveraging relational and pseudo-class selectors to build resilient, parent-aware CSS styles without JavaScript.",
          "keyPoints": [
            "Use the :has() relational selector to style parents based on child state or content",
            "Reduce selector specificity using :where() and consolidate groupings with :is()",
            "Write clean native CSS nesting following CSS nesting standards"
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
              "text": "Leveraging relational and pseudo-class selectors to build resilient, parent-aware CSS styles without JavaScript."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-05-01",
          "title": "Hands-on: Modern Selectors: :has(), :is(), :where(), and Complex Nesting",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "What is the specificity calculation for :where(.card, #nav)?",
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
            "id": "q-css-05-01-1",
            "question": "Which selector styles a navigation list only if it contains an active link?",
            "options": [
              "nav > a.active",
              "nav:has(a.active)",
              "nav:is(a.active)",
              "nav::active-child"
            ],
            "correctIndex": 1,
            "explanation": "nav:has(a.active) matches the nav element itself whenever it contains a descendant matching a.active."
          }
        ],
        "summary": [
          ":has(), :is(), and :where() revolutionize stylesheet architecture by unlocking parent-aware styling and zero-specificity defaults."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "5",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-05-02",
        "chapterId": "css-mod-05",
        "number": "5.2",
        "slug": "css-05-02",
        "title": "Mastering Pseudo-Elements and Decorative Flourishes",
        "tagline": "Employing ::before, ::after, ::marker, and ::selection for sophisticated visual accents.",
        "durationMinutes": 22,
        "learningObjectives": [
          "Generate non-semantic decorative accents using ::before and ::after",
          "Customize list markers cleanly using ::marker without reset hacks",
          "Style text selection highlights with ::selection for brand polish"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Decorative flourishes should never pollute HTML markup with empty divs or spans. Pseudo-elements create phantom nodes in the render tree that can be styled, positioned, and animated independently, keeping semantic markup spotless.",
            "bulletPoints": [
              "Always supply content: \"\" on ::before and ::after for them to render.",
              "Position pseudo-elements relative to parent containers using position: absolute.",
              "Style custom ordered and unordered list indicators using the ::marker selector."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Pseudo-element: A keyword added to a selector that lets you style a specific part of the selected element(s).",
              "::marker: Target for styling the bullet or number indicator of a list item.",
              "::selection: Target for styling the portion of a document that has been highlighted by the user."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Omission of content: \"\" property on ::before or ::after. -> Fix: Always declare content: \"\" even if the pseudo-element only holds a background or visual shape."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Mastering Pseudo-Elements and Decorative Flourishes",
          "concept": "Mastering Pseudo-Elements and Decorative Flourishes",
          "story": "Decorative flourishes should never pollute HTML markup with empty divs or spans. Pseudo-elements create phantom nodes in the render tree that can be styled, positioned, and animated independently, kee...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Pure CSS Decorative Editorial Accents",
          "description": "Employing ::before, ::after, ::marker, and ::selection for sophisticated visual accents.",
          "html": "<div class=\"demo-box\"><h4>Mastering Pseudo-Elements and Decorative Flourishes</h4><p>Employing ::before, ::after, ::marker, and ::selection for sophisticated visual accents.</p></div>",
          "css": "/* Editorial pull quote with oversized quotation mark */\n.editorial-quote {\n  position: relative;\n  font-size: 1.25rem;\n  font-style: italic;\n  padding-inline-start: 2.5rem;\n}\n\n.editorial-quote::before {\n  content: \"“\";\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: -0.5rem;\n  font-size: 4rem;\n  line-height: 1;\n  color: #3b82f6;\n  opacity: 0.3;\n  pointer-events: none;\n}\n\n/* Custom list marker styling */\nli::marker {\n  color: #3b82f6;\n  font-size: 1.2em;\n}\n\n/* Custom brand selection */\n::selection {\n  background-color: #dbeafe;\n  color: #1e3a8a;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Mastering Pseudo-Elements and Decorative Flourishes Architecture Deep Dive",
          "duration": "22 min",
          "description": "Employing ::before, ::after, ::marker, and ::selection for sophisticated visual accents.",
          "keyPoints": [
            "Generate non-semantic decorative accents using ::before and ::after",
            "Customize list markers cleanly using ::marker without reset hacks",
            "Style text selection highlights with ::selection for brand polish"
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
              "text": "Employing ::before, ::after, ::marker, and ::selection for sophisticated visual accents."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-05-02",
          "title": "Hands-on: Mastering Pseudo-Elements and Decorative Flourishes",
          "difficulty": "Intermediate",
          "estimatedTime": "15 min",
          "prompt": "Why should decorative icon shapes be implemented via pseudo-elements rather than empty spans?",
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
            "id": "q-css-05-02-1",
            "question": "Which property is mandatory for a ::before pseudo-element to render in the browser?",
            "options": [
              "display: block",
              "content",
              "width",
              "z-index"
            ],
            "correctIndex": 1,
            "explanation": "Without the content property (even if empty string content: \"\"), pseudo-elements will not generate boxes in the layout."
          }
        ],
        "summary": [
          "Pseudo-elements provide clean separation between semantic document structure and ornamental graphic design flourishes."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "5",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-05-03",
        "chapterId": "css-mod-05",
        "number": "5.3",
        "slug": "css-05-03",
        "title": "Layered Backgrounds, Gradients, and Blend Modes",
        "tagline": "Composing multi-layered backgrounds, mesh gradients, and blend modes for tactile editorial surfaces.",
        "durationMinutes": 26,
        "learningObjectives": [
          "Stack multiple background images and gradients in a single CSS rule",
          "Construct organic mesh gradients using radial-gradient overlays",
          "Apply mix-blend-mode and background-blend-mode for print-inspired graphic effects"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "CSS allows stacking an arbitrary number of background layers on any element. By layering radial gradients, noise textures, and linear washes with CSS blend modes, you can craft high-end editorial textures that execute at 60fps without heavy raster assets.",
            "bulletPoints": [
              "Order background layers from front to back: first layer listed renders on top.",
              "Combine linear-gradient() with multiple radial-gradient() shapes to simulate light spots.",
              "Apply background-blend-mode: multiply, screen, or overlay to harmonize color boundaries."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "background-blend-mode: Determines how an element background images blend with each other and the background color.",
              "Mesh Gradient: A multi-point gradient that produces fluid, organic color diffusion resembling fine mesh."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Specifying large uncompressed PNGs for subtle gradients. -> Fix: Use native CSS radial-gradient layers; they scale infinitely and require zero network bytes."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Layered Backgrounds, Gradients, and Blend Modes",
          "concept": "Layered Backgrounds, Gradients, and Blend Modes",
          "story": "CSS allows stacking an arbitrary number of background layers on any element. By layering radial gradients, noise textures, and linear washes with CSS blend modes, you can craft high-end editorial text...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Multi-Layer Ambient Mesh Gradient in Pure CSS",
          "description": "Composing multi-layered backgrounds, mesh gradients, and blend modes for tactile editorial surfaces.",
          "html": "<div class=\"demo-box\"><h4>Layered Backgrounds, Gradients, and Blend Modes</h4><p>Composing multi-layered backgrounds, mesh gradients, and blend modes for tactile editorial surfaces.</p></div>",
          "css": ".ambient-hero-surface {\n  background-color: #0b0f19;\n  background-image:\n    radial-gradient(circle at 15% 20%, oklch(0.45 0.20 260 / 0.4) 0%, transparent 45%),\n    radial-gradient(circle at 85% 30%, oklch(0.50 0.18 190 / 0.3) 0%, transparent 40%),\n    radial-gradient(circle at 50% 80%, oklch(0.40 0.22 310 / 0.25) 0%, transparent 50%),\n    linear-gradient(180deg, transparent 60%, #0b0f19 100%);\n  background-size: 100% 100%;\n  border-radius: 16px;\n  padding: 4rem 2rem;\n  position: relative;\n  overflow: hidden;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Layered Backgrounds, Gradients, and Blend Modes Architecture Deep Dive",
          "duration": "26 min",
          "description": "Composing multi-layered backgrounds, mesh gradients, and blend modes for tactile editorial surfaces.",
          "keyPoints": [
            "Stack multiple background images and gradients in a single CSS rule",
            "Construct organic mesh gradients using radial-gradient overlays",
            "Apply mix-blend-mode and background-blend-mode for print-inspired graphic effects"
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
              "text": "Composing multi-layered backgrounds, mesh gradients, and blend modes for tactile editorial surfaces."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-05-03",
          "title": "Hands-on: Layered Backgrounds, Gradients, and Blend Modes",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "In the background shorthand property, which layer is rendered on top?",
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
            "id": "q-css-05-03-1",
            "question": "Which property blends multiple background layers within a single HTML element?",
            "options": [
              "mix-blend-mode",
              "background-blend-mode",
              "filter: blend()",
              "color-interpolation"
            ],
            "correctIndex": 1,
            "explanation": "background-blend-mode blends an element background layers together, while mix-blend-mode blends an element with its parent DOM backdrop."
          }
        ],
        "summary": [
          "Layered CSS gradients produce lightweight, responsive, and infinitely scalable visual surfaces with zero HTTP overhead."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "5",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-05-04",
        "chapterId": "css-mod-05",
        "number": "5.4",
        "slug": "css-05-04",
        "title": "Layered Shadows, Depth, and Glassmorphic Surfaces",
        "tagline": "Synthesizing realistic directional lighting using layered box shadows and backdrop filters.",
        "durationMinutes": 24,
        "learningObjectives": [
          "Create realistic optical depth by chaining multiple micro-shadows in box-shadow",
          "Implement frosted glass navigation headers with backdrop-filter: blur()",
          "Differentiate between flat drop-shadows and ambient light diffusion"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Single hard box shadows look dated and artificial. Real-world surfaces interact with diffuse environmental light, casting multiple overlapping shadows with varying blur radii. Stacking multiple shadow offsets produces smooth, tactile elevations.",
            "bulletPoints": [
              "Stack 3-5 shadows: a sharp micro-contact shadow, a soft ambient shadow, and a wide diffusion shadow.",
              "Keep opacity low (between 3% and 12%) for photographic realism.",
              "Combine translucent background colors with backdrop-filter: blur(12px) for glassmorphic bars."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Layered Box-Shadow: A technique of listing multiple comma-separated shadows to emulate authentic ambient occlusion.",
              "backdrop-filter: Applies graphical effects like blur or color shift to the area behind an element."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Using a single dark, saturated shadow (e.g., box-shadow: 0 10px 20px #000). -> Fix: Layer multiple faint shadows with high blur and low opacity to emulate natural sunlight."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Layered Shadows, Depth, and Glassmorphic Surfaces",
          "concept": "Layered Shadows, Depth, and Glassmorphic Surfaces",
          "story": "Single hard box shadows look dated and artificial. Real-world surfaces interact with diffuse environmental light, casting multiple overlapping shadows with varying blur radii. Stacking multiple shadow...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Multi-Stop Shadow Depth & Glass Header",
          "description": "Synthesizing realistic directional lighting using layered box shadows and backdrop filters.",
          "html": "<div class=\"demo-box\"><h4>Layered Shadows, Depth, and Glassmorphic Surfaces</h4><p>Synthesizing realistic directional lighting using layered box shadows and backdrop filters.</p></div>",
          "css": ":root {\n  /* High-fidelity 4-stop elevation shadow */\n  --elevation-raised:\n    0 1px 2px oklch(0 0 0 / 0.05),\n    0 4px 8px oklch(0 0 0 / 0.04),\n    0 12px 24px oklch(0 0 0 / 0.03),\n    0 24px 48px oklch(0 0 0 / 0.02);\n}\n\n.card-tactile {\n  background: #ffffff;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 12px;\n  box-shadow: var(--elevation-raised);\n}\n\n/* Glassmorphism Navigation Bar */\n.sticky-glass-nav {\n  position: sticky;\n  inset-block-start: 0;\n  z-index: 100;\n  background-color: oklch(1 0 0 / 0.85);\n  backdrop-filter: blur(12px) saturate(160%);\n  -webkit-backdrop-filter: blur(12px) saturate(160%);\n  border-block-end: 1px solid oklch(0 0 0 / 0.08);\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Layered Shadows, Depth, and Glassmorphic Surfaces Architecture Deep Dive",
          "duration": "24 min",
          "description": "Synthesizing realistic directional lighting using layered box shadows and backdrop filters.",
          "keyPoints": [
            "Create realistic optical depth by chaining multiple micro-shadows in box-shadow",
            "Implement frosted glass navigation headers with backdrop-filter: blur()",
            "Differentiate between flat drop-shadows and ambient light diffusion"
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
              "text": "Synthesizing realistic directional lighting using layered box shadows and backdrop filters."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-05-04",
          "title": "Hands-on: Layered Shadows, Depth, and Glassmorphic Surfaces",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "Why must -webkit-backdrop-filter be included alongside backdrop-filter?",
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
            "id": "q-css-05-04-1",
            "question": "Which property applies blur to the elements positioned underneath a translucent container?",
            "options": [
              "filter: blur()",
              "backdrop-filter: blur()",
              "box-shadow",
              "opacity-filter"
            ],
            "correctIndex": 1,
            "explanation": "backdrop-filter applies graphic effects to whatever is visible behind the element."
          }
        ],
        "summary": [
          "Multi-layer box shadows and frosted glass backdrop filters produce rich spatial depth while maintaining modern editorial subtlety."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "5",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-05-05",
        "chapterId": "css-mod-05",
        "number": "5.5",
        "slug": "css-05-05",
        "title": "Borders, Outlines, and Accessible Focus Indicators",
        "tagline": "Mastering modern border-image, corner shaping, and high-visibility :focus-visible indicators.",
        "durationMinutes": 22,
        "learningObjectives": [
          "Distinguish between :focus and :focus-visible for keyboard accessibility",
          "Construct non-intrusive focus rings using outline-offset and standard custom properties",
          "Apply gradient borders without introducing layout shifts"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Accessible focus management is both a legal requirement and an ergonomic imperative. The :focus-visible pseudo-class ensures keyboard navigators receive prominent visual indicators while preventing distracting rings for mouse clicks.",
            "bulletPoints": [
              "Never write :focus { outline: none; } without providing an accessible alternative.",
              "Use :focus-visible to selectively target keyboard navigation.",
              "Use outline and outline-offset so focus indicators do not alter component box dimensions."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              ":focus-visible: Pseudo-class that matches an element when it has focus and the user agent determines that focus should be visibly indicated.",
              "outline-offset: Offsets an outline from the element border edge, creating clear visual separation."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Removing outline globally via * { outline: none !important; }. -> Fix: Always style :focus-visible with high-contrast outlines to support keyboard and assistive device users."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Borders, Outlines, and Accessible Focus Indicators",
          "concept": "Borders, Outlines, and Accessible Focus Indicators",
          "story": "Accessible focus management is both a legal requirement and an ergonomic imperative. The :focus-visible pseudo-class ensures keyboard navigators receive prominent visual indicators while preventing di...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Universal Accessible :focus-visible System",
          "description": "Mastering modern border-image, corner shaping, and high-visibility :focus-visible indicators.",
          "html": "<div class=\"demo-box\"><h4>Borders, Outlines, and Accessible Focus Indicators</h4><p>Mastering modern border-image, corner shaping, and high-visibility :focus-visible indicators.</p></div>",
          "css": "/* Reset raw outline only when :focus-visible is available */\n:focus:not(:focus-visible) {\n  outline: none;\n}\n\n/* Prominent keyboard focus ring adhering to WCAG 2.2 AA */\n:focus-visible {\n  outline: 2px solid #2563eb;\n  outline-offset: 3px;\n  border-radius: 4px;\n}\n\n/* Gradient border pattern without extra wrapper divs */\n.gradient-border-card {\n  border: 1px solid transparent;\n  background:\n    linear-gradient(#ffffff, #ffffff) padding-box,\n    linear-gradient(135deg, #3b82f6, #8b5cf6) border-box;\n  border-radius: 12px;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Borders, Outlines, and Accessible Focus Indicators Architecture Deep Dive",
          "duration": "22 min",
          "description": "Mastering modern border-image, corner shaping, and high-visibility :focus-visible indicators.",
          "keyPoints": [
            "Distinguish between :focus and :focus-visible for keyboard accessibility",
            "Construct non-intrusive focus rings using outline-offset and standard custom properties",
            "Apply gradient borders without introducing layout shifts"
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
              "text": "Mastering modern border-image, corner shaping, and high-visibility :focus-visible indicators."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-05-05",
          "title": "Hands-on: Borders, Outlines, and Accessible Focus Indicators",
          "difficulty": "Intermediate",
          "estimatedTime": "15 min",
          "prompt": "Why does outline not cause layout shift when an element gains focus?",
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
            "id": "q-css-05-05-1",
            "question": "Which pseudo-class targets focus only when the user navigates via keyboard?",
            "options": [
              ":focus",
              ":focus-visible",
              ":focus-within",
              ":hover"
            ],
            "correctIndex": 1,
            "explanation": ":focus-visible activates specifically when the browser determines visual focus is necessary, such as during keyboard tab navigation."
          }
        ],
        "summary": [
          ":focus-visible paired with outline-offset enables uncompromising accessibility compliance while preserving pristine mouse interactions."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "5",
            "context": "Modern CSS Mastery"
          }
        ]
      }
    ]
  },
  {
    "id": "css-mod-06",
    "number": "6",
    "badge": "CSS 06",
    "slug": "animation-motion",
    "title": "Module 6: Animation, Micro-Interactions, and Motion",
    "subtitle": "Cubic-Bezier Easing, Keyframe Loops, 3D Transforms & Motion Accessibility",
    "description": "Crafting 60fps hardware-accelerated transitions, keyframe animations, 3D transforms, and respectful motion preferences.",
    "estimatedHours": "4 hrs",
    "accentColor": "indigo",
    "iconName": "Layers",
    "totalLessons": 5,
    "lessons": [
      {
        "id": "css-06-01",
        "chapterId": "css-mod-06",
        "number": "6.1",
        "slug": "css-06-01",
        "title": "CSS Transitions and Easing Curves",
        "tagline": "Mastering cubic-bezier curves, hardware-friendly properties, and fluid interaction feedback.",
        "durationMinutes": 24,
        "learningObjectives": [
          "Configure smooth cubic-bezier easing functions for lifelike momentum",
          "Differentiate between linear, ease-in, ease-out, and spring-like curves",
          "Avoid animating layout-triggering properties (width, height, top, left)"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "CSS transitions animate property changes smoothly between states. The key to natural motion lies in easing curves: real-world objects do not start and stop at constant velocities. Utilizing custom cubic-bezier timing curves imparts weight, snap, and physical presence to UI widgets.",
            "bulletPoints": [
              "Identify properties that animate on the compositor thread (transform, opacity).",
              "Define transition duration (typically 150ms-300ms for UI micro-interactions).",
              "Apply an expressive cubic-bezier timing function such as cubic-bezier(0.16, 1, 0.3, 1)."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "cubic-bezier: A four-point parametric curve defining the acceleration profile of a transition over time.",
              "Compositor Thread: The browser rendering thread that processes transforms and opacity without triggering layout reflows."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Using transition: all for every interactive element. -> Fix: Explicitly specify the exact properties being transitioned (e.g., transition: transform 200ms ease) to prevent performance penalties."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: CSS Transitions and Easing Curves",
          "concept": "CSS Transitions and Easing Curves",
          "story": "CSS transitions animate property changes smoothly between states. The key to natural motion lies in easing curves: real-world objects do not start and stop at constant velocities. Utilizing custom cub...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Hardware-Accelerated UI Transition with Custom Easing",
          "description": "Mastering cubic-bezier curves, hardware-friendly properties, and fluid interaction feedback.",
          "html": "<div class=\"demo-box\"><h4>CSS Transitions and Easing Curves</h4><p>Mastering cubic-bezier curves, hardware-friendly properties, and fluid interaction feedback.</p></div>",
          "css": ":root {\n  /* Deceleration curve for entering elements */\n  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);\n  /* Snappy curve for responsive clicks */\n  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.interactive-card {\n  transform: translateY(0);\n  transition: transform 250ms var(--ease-out-expo), box-shadow 250ms var(--ease-out-expo);\n  will-change: transform;\n}\n\n.interactive-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);\n}\n\n.interactive-card:active {\n  transform: translateY(-1px) scale(0.99);\n  transition-duration: 100ms;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "CSS Transitions and Easing Curves Architecture Deep Dive",
          "duration": "24 min",
          "description": "Mastering cubic-bezier curves, hardware-friendly properties, and fluid interaction feedback.",
          "keyPoints": [
            "Configure smooth cubic-bezier easing functions for lifelike momentum",
            "Differentiate between linear, ease-in, ease-out, and spring-like curves",
            "Avoid animating layout-triggering properties (width, height, top, left)"
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
              "text": "Mastering cubic-bezier curves, hardware-friendly properties, and fluid interaction feedback."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-06-01",
          "title": "Hands-on: CSS Transitions and Easing Curves",
          "difficulty": "Intermediate",
          "estimatedTime": "15 min",
          "prompt": "Why is transition: all considered bad practice in large applications?",
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
            "id": "q-css-06-01-1",
            "question": "Which of the following properties can be animated without triggering browser layout or repaint?",
            "options": [
              "height",
              "margin-top",
              "transform",
              "top"
            ],
            "correctIndex": 2,
            "explanation": "transform is handled directly by the GPU compositor thread, making it immune to layout reflows."
          }
        ],
        "summary": [
          "Disciplined use of hardware-accelerated properties and custom cubic-bezier curves ensures 60fps micro-interactions."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "6",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-06-02",
        "chapterId": "css-mod-06",
        "number": "6.2",
        "slug": "css-06-02",
        "title": "Keyframe Animations and Continuous Motion Loops",
        "tagline": "Writing complex multi-step @keyframes animations, infinite progress indicators, and pulsing states.",
        "durationMinutes": 26,
        "learningObjectives": [
          "Construct multi-step keyframe sequences with granular percentage stops",
          "Control animation fill modes (forwards, backwards, both)",
          "Implement infinite loading spinners and skeleton shimmer effects"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "While transitions require state triggers (like :hover), CSS @keyframes animations can execute automatically on mount and repeat indefinitely. Keyframes define intermediate checkpoints throughout an animation cycle, enabling complex multi-stage choreographies.",
            "bulletPoints": [
              "Define an @keyframes rule with 0%, 50%, and 100% states.",
              "Attach the animation using animation-name, duration, iteration-count, and fill-mode.",
              "Use animation-fill-mode: forwards to retain the final animated frame without snapping back."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "@keyframes: CSS at-rule that defines intermediate steps in a CSS animation sequence.",
              "animation-fill-mode: Specifies how a CSS animation should apply styles to its target before and after its execution.",
              "Skeleton Shimmer: An animated gradient pulse indicating background data loading."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Forgetting animation-fill-mode: forwards on one-shot entrance animations, causing elements to blink back to initial state. -> Fix: Apply forwards fill mode to preserve the completed keyframe appearance."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Keyframe Animations and Continuous Motion Loops",
          "concept": "Keyframe Animations and Continuous Motion Loops",
          "story": "While transitions require state triggers (like :hover), CSS @keyframes animations can execute automatically on mount and repeat indefinitely. Keyframes define intermediate checkpoints throughout an an...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Skeleton Shimmer and Entrance Keyframes",
          "description": "Writing complex multi-step @keyframes animations, infinite progress indicators, and pulsing states.",
          "html": "<div class=\"demo-box\"><h4>Keyframe Animations and Continuous Motion Loops</h4><p>Writing complex multi-step @keyframes animations, infinite progress indicators, and pulsing states.</p></div>",
          "css": "/* Skeleton Shimmer Effect */\n@keyframes shimmer {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n\n.skeleton-box {\n  background: linear-gradient(\n    90deg,\n    #f1f5f9 25%,\n    #e2e8f0 50%,\n    #f1f5f9 75%\n  );\n  background-size: 200% 100%;\n  animation: shimmer 1.8s infinite linear;\n  border-radius: 6px;\n}\n\n/* Modal Entrance */\n@keyframes slideUpFade {\n  from {\n    opacity: 0;\n    transform: translateY(16px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n\n.modal-dialog {\n  animation: slideUpFade 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Keyframe Animations and Continuous Motion Loops Architecture Deep Dive",
          "duration": "26 min",
          "description": "Writing complex multi-step @keyframes animations, infinite progress indicators, and pulsing states.",
          "keyPoints": [
            "Construct multi-step keyframe sequences with granular percentage stops",
            "Control animation fill modes (forwards, backwards, both)",
            "Implement infinite loading spinners and skeleton shimmer effects"
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
              "text": "Writing complex multi-step @keyframes animations, infinite progress indicators, and pulsing states."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-06-02",
          "title": "Hands-on: Keyframe Animations and Continuous Motion Loops",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "What does animation-iteration-count: infinite do?",
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
            "id": "q-css-06-02-1",
            "question": "Which animation-fill-mode keeps the element at the 100% keyframe state when the animation completes?",
            "options": [
              "none",
              "forwards",
              "backwards",
              "infinite"
            ],
            "correctIndex": 1,
            "explanation": "forwards ensures the styles applied by the final keyframe persist after the animation finishes."
          }
        ],
        "summary": [
          "@keyframes animations provide complete control over timing and multi-stage rendering for complex interface choreographies."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "6",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-06-03",
        "chapterId": "css-mod-06",
        "number": "6.3",
        "slug": "css-06-03",
        "title": "3D Transforms, Perspective, and Spatial Depth",
        "tagline": "Manipulating elements in three-dimensional space with perspective, rotate3d, and translateZ.",
        "durationMinutes": 28,
        "learningObjectives": [
          "Configure perspective on parent containers for accurate 3D spatial illusions",
          "Manipulate elements along X, Y, and Z axes using transform3d functions",
          "Construct interactive 3D card flips with backface-visibility: hidden"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "CSS is not limited to 2D flat planes. By establishing a perspective viewing distance on a parent element, child elements can rotate, pitch, and yaw in 3D coordinate space with real-time GPU hardware acceleration.",
            "bulletPoints": [
              "Define perspective: 1000px on the container to establish the visual vanishing point.",
              "Enable transform-style: preserve-3d on the rotating element.",
              "Hide rear surfaces using backface-visibility: hidden during flips.",
              "Transform coordinates along translateZ(px) and rotateY(deg)."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "perspective: Determines the distance between the viewer and the z=0 plane, controlling the intensity of the 3D foreshortening.",
              "transform-style: preserve-3d: Indicates that the children of the element should be positioned in 3D space.",
              "backface-visibility: Specifies whether the back face of an element is visible when facing the viewer."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Applying perspective directly to the rotating element instead of its parent container. -> Fix: Place perspective on the parent viewport container so all children share the same vanishing point."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: 3D Transforms, Perspective, and Spatial Depth",
          "concept": "3D Transforms, Perspective, and Spatial Depth",
          "story": "CSS is not limited to 2D flat planes. By establishing a perspective viewing distance on a parent element, child elements can rotate, pitch, and yaw in 3D coordinate space with real-time GPU hardware a...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Pure CSS 3D Card Flip Implementation",
          "description": "Manipulating elements in three-dimensional space with perspective, rotate3d, and translateZ.",
          "html": "<div class=\"demo-box\"><h4>3D Transforms, Perspective, and Spatial Depth</h4><p>Manipulating elements in three-dimensional space with perspective, rotate3d, and translateZ.</p></div>",
          "css": ".flip-card-scene {\n  width: 320px;\n  height: 200px;\n  perspective: 1000px;\n}\n\n.flip-card-inner {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  transform-style: preserve-3d;\n  transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n.flip-card-scene:hover .flip-card-inner,\n.flip-card-scene.is-flipped .flip-card-inner {\n  transform: rotateY(180deg);\n}\n\n.flip-face {\n  position: absolute;\n  inset: 0;\n  backface-visibility: hidden;\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n\n.flip-face--front {\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n}\n\n.flip-face--back {\n  background-color: #0f172a;\n  color: #ffffff;\n  transform: rotateY(180deg);\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "3D Transforms, Perspective, and Spatial Depth Architecture Deep Dive",
          "duration": "28 min",
          "description": "Manipulating elements in three-dimensional space with perspective, rotate3d, and translateZ.",
          "keyPoints": [
            "Configure perspective on parent containers for accurate 3D spatial illusions",
            "Manipulate elements along X, Y, and Z axes using transform3d functions",
            "Construct interactive 3D card flips with backface-visibility: hidden"
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
              "text": "Manipulating elements in three-dimensional space with perspective, rotate3d, and translateZ."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-06-03",
          "title": "Hands-on: 3D Transforms, Perspective, and Spatial Depth",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "What happens if backface-visibility is set to visible on a card back face?",
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
            "id": "q-css-06-03-1",
            "question": "Which property must be declared on a container so its children exist in a shared 3D volume?",
            "options": [
              "transform: 3d",
              "transform-style: preserve-3d",
              "display: 3d-grid",
              "perspective-origin: center"
            ],
            "correctIndex": 1,
            "explanation": "transform-style: preserve-3d ensures that child elements retain their independent 3D coordinate space."
          }
        ],
        "summary": [
          "CSS 3D transforms supply spatial depth and interactive card flips with zero JavaScript physics libraries."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "6",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-06-04",
        "chapterId": "css-mod-06",
        "number": "6.4",
        "slug": "css-06-04",
        "title": "Motion Accessibility with prefers-reduced-motion",
        "tagline": "Honoring vestibular health and motion sensitivities using standard media queries and graceful fallbacks.",
        "durationMinutes": 22,
        "learningObjectives": [
          "Understand how excessive motion triggers nausea, dizziness, and vestibular distress",
          "Detect OS-level motion reductions using @media (prefers-reduced-motion: reduce)",
          "Replace sweeping translational motion with gentle opacity dissolves"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "Motion can be physically sickening for people with vestibular balance disorders. Respecting prefers-reduced-motion is a fundamental tenet of ethical frontend architecture. Rather than stripping animations entirely, replace wide translational sweeps with subtle crossfades.",
            "bulletPoints": [
              "Query prefers-reduced-motion in global CSS.",
              "Clamp transition-duration and animation-duration to minimal thresholds (or 0.01ms).",
              "Convert translational movement (slide-in) into immediate or fade-in transitions."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "prefers-reduced-motion: Media query detecting if the user has requested the system minimize non-essential motion.",
              "Vestibular Disorder: Inner-ear balance conditions where large animations can provoke vertigo, nausea, and disorientation."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Removing transitions completely using transition: none, which can cause jarring layout flashes. -> Fix: Use 0.01ms duration or gentle opacity fades so event handlers and state transitions still complete cleanly."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Motion Accessibility with prefers-reduced-motion",
          "concept": "Motion Accessibility with prefers-reduced-motion",
          "story": "Motion can be physically sickening for people with vestibular balance disorders. Respecting prefers-reduced-motion is a fundamental tenet of ethical frontend architecture. Rather than stripping animat...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "Production-Grade prefers-reduced-motion Reset",
          "description": "Honoring vestibular health and motion sensitivities using standard media queries and graceful fallbacks.",
          "html": "<div class=\"demo-box\"><h4>Motion Accessibility with prefers-reduced-motion</h4><p>Honoring vestibular health and motion sensitivities using standard media queries and graceful fallbacks.</p></div>",
          "css": "/* Standard smooth animations */\n.modal-panel {\n  transform: translateY(0);\n  opacity: 1;\n  transition: transform 300ms ease, opacity 300ms ease;\n}\n\n/* Reduced motion override */\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n\n  /* Retain gentle opacity changes for context */\n  .modal-panel {\n    transition: opacity 150ms ease !important;\n    transform: none !important;\n  }\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Motion Accessibility with prefers-reduced-motion Architecture Deep Dive",
          "duration": "22 min",
          "description": "Honoring vestibular health and motion sensitivities using standard media queries and graceful fallbacks.",
          "keyPoints": [
            "Understand how excessive motion triggers nausea, dizziness, and vestibular distress",
            "Detect OS-level motion reductions using @media (prefers-reduced-motion: reduce)",
            "Replace sweeping translational motion with gentle opacity dissolves"
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
              "text": "Honoring vestibular health and motion sensitivities using standard media queries and graceful fallbacks."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-06-04",
          "title": "Hands-on: Motion Accessibility with prefers-reduced-motion",
          "difficulty": "Intermediate",
          "estimatedTime": "15 min",
          "prompt": "Why is 0.01ms duration preferred over transition: none in universal reset rules?",
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
            "id": "q-css-06-04-1",
            "question": "Which media feature detects the users operating system motion preference?",
            "options": [
              "prefers-motion-safe",
              "prefers-reduced-motion",
              "no-animation-mode",
              "system-accessibility-motion"
            ],
            "correctIndex": 1,
            "explanation": "prefers-reduced-motion is the official W3C media feature for detecting motion sensitivities."
          }
        ],
        "summary": [
          "Designing with prefers-reduced-motion ensures that interfaces are welcoming, inclusive, and medically safe for every user."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "6",
            "context": "Modern CSS Mastery"
          }
        ]
      },
      {
        "id": "css-06-05",
        "chapterId": "css-mod-06",
        "number": "6.5",
        "slug": "css-06-05",
        "title": "Performance-Conscious Animation and Compositor Budgets",
        "tagline": "Diagnosing jank, utilizing will-change judiciously, and maintaining steady 60fps frame rates.",
        "durationMinutes": 26,
        "learningObjectives": [
          "Understand the browser rendering pipeline: Parse -> Style -> Layout -> Paint -> Composite",
          "Identify properties that force expensive Layout and Paint cycles",
          "Use the will-change hint appropriately without depleting device GPU memory"
        ],
        "theorySections": [
          {
            "heading": "1. Core Architectural Concept",
            "content": "To sustain 60 frames per second, a web browser has a strict budget of 16.6 milliseconds per frame (8.3ms for 120Hz displays). Animating properties like margin, width, or top forces the CPU to recalculate document geometry across all elements. Sticking strictly to transform and opacity guarantees GPU-only composition.",
            "bulletPoints": [
              "Audit animations using DevTools Performance panel to detect layout reflows.",
              "Replace top/left animations with transform: translate(x, y).",
              "Apply will-change: transform only on actively animated elements and remove after completion."
            ]
          },
          {
            "heading": "2. Key Definitions & Architecture Rules",
            "content": "Understanding standard terminology is essential for accurate CSS engineering:",
            "bulletPoints": [
              "Layout Reflow: The process where the browser recalculates the positions and geometries of all elements in the document.",
              "Compositing: The final rendering stage where layers are drawn to the screen by the GPU.",
              "will-change: CSS property that hints to the browser ahead of time what properties are expected to change."
            ]
          },
          {
            "heading": "3. Common Pitfalls & Solutions",
            "content": "Avoid these common production antipatterns:",
            "bulletPoints": [
              "Slapping will-change: transform across dozens of static elements in global stylesheets. -> Fix: will-change allocates dedicated GPU memory buffers; apply it sparingly only to actively animated components."
            ]
          }
        ],
        "realWorldAnalogy": {
          "title": "Engineering Model: Performance-Conscious Animation and Compositor Budgets",
          "concept": "Performance-Conscious Animation and Compositor Budgets",
          "story": "To sustain 60 frames per second, a web browser has a strict budget of 16.6 milliseconds per frame (8.3ms for 120Hz displays). Animating properties like margin, width, or top forces the CPU to recalcul...",
          "moral": "Adhere to standard CSS3 specifications for maintainable systems.",
          "icon": "Layers"
        },
        "visualType": "box-model",
        "codeExample": {
          "title": "High-Performance Sliding Drawer Navigation",
          "description": "Diagnosing jank, utilizing will-change judiciously, and maintaining steady 60fps frame rates.",
          "html": "<div class=\"demo-box\"><h4>Performance-Conscious Animation and Compositor Budgets</h4><p>Diagnosing jank, utilizing will-change judiciously, and maintaining steady 60fps frame rates.</p></div>",
          "css": "/* BAD PRACTICE: Triggers Layout on every frame\n.drawer {\n  left: -300px;\n  transition: left 300ms ease;\n}\n.drawer.open { left: 0; }\n*/\n\n/* EXCELLENT PRACTICE: Pure GPU Compositor execution */\n.drawer {\n  position: fixed;\n  inset-block: 0;\n  inset-inline-start: 0;\n  width: 280px;\n  background: #ffffff;\n  transform: translateX(-100%);\n  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);\n  will-change: transform;\n}\n\n.drawer.is-open {\n  transform: translateX(0);\n}",
          "breakdown": [
            {
              "lineRange": "1-10",
              "title": "Declaration",
              "explanation": "Implements standard modern CSS specification principles."
            }
          ]
        },
        "video": {
          "title": "Performance-Conscious Animation and Compositor Budgets Architecture Deep Dive",
          "duration": "26 min",
          "description": "Diagnosing jank, utilizing will-change judiciously, and maintaining steady 60fps frame rates.",
          "keyPoints": [
            "Understand the browser rendering pipeline: Parse -> Style -> Layout -> Paint -> Composite",
            "Identify properties that force expensive Layout and Paint cycles",
            "Use the will-change hint appropriately without depleting device GPU memory"
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
              "text": "Diagnosing jank, utilizing will-change judiciously, and maintaining steady 60fps frame rates."
            }
          ],
          "demoAnimationType": "css-cascade"
        },
        "practice": {
          "id": "prac-css-06-05",
          "title": "Hands-on: Performance-Conscious Animation and Compositor Budgets",
          "difficulty": "Advanced",
          "estimatedTime": "15 min",
          "prompt": "Why does animating translateX perform faster than animating left?",
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
            "id": "q-css-06-05-1",
            "question": "Which browser rendering stage is completely bypassed when animating opacity?",
            "options": [
              "Compositing only",
              "Layout and Paint",
              "Network fetching",
              "CSS parsing"
            ],
            "correctIndex": 1,
            "explanation": "Opacity animations bypass both Layout (reflow) and Paint, operating solely on the GPU Compositor layer."
          }
        ],
        "summary": [
          "Adhering to transform and opacity animations preserves frame budgets, protects battery life on mobile devices, and eliminates visual stutter."
        ],
        "relatedTopics": [
          {
            "title": "Standard CSS Architecture",
            "chapterNumber": "6",
            "context": "Modern CSS Mastery"
          }
        ]
      }
    ]
  }
];
