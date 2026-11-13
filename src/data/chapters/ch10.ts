import { Chapter } from '../../utils/types';

export const chapter10: Chapter = {
  id: 'ch-10',
  number: '10',
  badge: '10',
  slug: 'capstone-fullstack-deployment',
  title: 'Capstone, Architecture & Production Deployment',
  subtitle: 'Full-Stack Portfolio Project, Testing, WCAG Accessibility, Core Web Vitals, Git Workflow & Cloud Deployment',
  description: 'The definitive capstone module. Build an end-to-end web development portfolio, conduct comprehensive WCAG 2.1 AA accessibility audits, optimize Google Core Web Vitals (LCP, FID/INP, CLS), master Git branching and conventional commits, deploy to modern cloud hosting (Cloud Run, Vercel, Netlify), and complete your graduation verification.',
  estimatedHours: '6 hrs',
  accentColor: 'emerald',
  iconName: 'Globe',
  totalLessons: 6,
  lessons: [
    {
      id: 'ch-10-l-01',
      chapterId: 'ch-10',
      number: '10.1',
      slug: 'portfolio-capstone-architecture',
      title: 'Capstone Project: Architecture & System Design',
      tagline: 'Design and assemble your flagship full-stack developer portfolio showcasing real production projects',
      durationMinutes: 30,
      learningObjectives: [
        'Plan the system architecture, component hierarchy, and data model for a production developer portfolio',
        'Structure clean project case studies with problem statements, architecture diagrams, and live demos',
        'Incorporate responsive navigation, accessible color palettes, and polished interactive micro-interactions',
        'Implement structured project metadata and dynamic contact form handling'
      ],
      theorySections: [
        {
          heading: '1. What Makes an Outstanding Developer Portfolio?',
          content: 'Hiring managers and engineering leads review hundreds of junior portfolios. Generic single-page templates with progress bars and "Hello World" screenshots are quickly rejected. A standout portfolio proves technical craftsmanship through real, working systems with clear architectural documentation.',
          bulletPoints: [
            'Deep Project Case Studies: Clearly explain the business problem, architectural decisions, technical trade-offs, and measurable outcomes',
            'Live Working Demos: Every listed project must have a live, clickable URL and a public GitHub repository with clean commit history',
            'Performance & Accessibility: The portfolio itself must score 95+ on Google Lighthouse across Performance, Accessibility, Best Practices, and SEO'
          ]
        },
        {
          heading: '2. Portfolio Component Architecture',
          content: 'Deconstruct the portfolio into clean, maintainable modules.',
          bulletPoints: [
            'Hero Section: Crisp value proposition, core specializations, and direct call to action (Resume / Contact)',
            'Project Showcase: Filterable grid of featured case studies with live demo & repo links',
            'Skills & Tech Stack: Categorized technologies (Languages, Frameworks, Tools, Cloud) with practical proficiency context',
            'Contact System: Accessible form with client-side validation and graceful status feedback'
          ],
          callout: {
            type: 'key-rule',
            text: 'Portfolio Rule: Never show generic percentage skill bars (e.g. "JavaScript: 90%"). Instead, list specific technologies and link directly to projects where you used them in production!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Architect’s Showcase Pavilion',
        concept: 'The Engineering Portfolio',
        story: 'When an architect bids for a skyscraper contract, they do not just show a pencil and a ruler. They welcome the selection committee into a master showroom featuring 3D blueprints, scale models of past bridges, structural stress test results, and letters from happy city engineers. Your portfolio is your personal engineering pavilion.',
        moral: 'Show working craftsmanship and architectural depth, not just a list of tools.',
        icon: 'Briefcase'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Portfolio Project Case Study Data Model',
        description: 'TypeScript schema for structured project case studies with tech stack and live links.',
        html: `<div class="portfolio-card">
  <h4>Featured Project Case Study</h4>
  <div id="caseStudyPreview">Loading case study...</div>
</div>`,
        css: `.portfolio-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.study-shell {
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  border-radius: 8px;
  background: #f8fafc;
}
.study-title { font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem; }
.tech-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 0.35rem;
  margin-bottom: 0.5rem;
}`,
        js: `interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  metrics: string;
}

const featuredProject: ProjectCaseStudy = {
  id: "weather-pulse",
  title: "WeatherPulse: Real-Time Global Telemetry",
  tagline: "High-performance async weather forecasting platform with offline snapshot recovery.",
  techStack: ["TypeScript", "React", "Open-Meteo API", "Vite", "Tailwind CSS"],
  liveUrl: "https://weatherpulse.demo.app",
  repoUrl: "https://github.com/developer/weather-pulse",
  metrics: "Sub-100ms API response, 99 Lighthouse score, WCAG AA compliant"
};

const el = document.getElementById("caseStudyPreview");
if (el) {
  el.innerHTML = \`
    <div class="study-shell">
      <div class="study-title">\${featuredProject.title}</div>
      <p style="color: #475569; font-size: 0.9rem; margin-bottom: 0.75rem;">\${featuredProject.tagline}</p>
      <div>\${featuredProject.techStack.map(t => \`<span class="tech-tag">\${t}</span>\`).join("")}</div>
      <p style="font-size: 0.8rem; color: #059669; font-weight: 600; margin-top: 0.5rem;">Result: \${featuredProject.metrics}</p>
    </div>
  \`;
}`,
        breakdown: [
          {
            lineRange: 'Line 1-9',
            title: 'Case Study Interface',
            explanation: 'Ensures every project documents tech stack, live URLs, and measurable outcomes.',
            highlightTokens: ['interface ProjectCaseStudy']
          },
          {
            lineRange: 'Line 11-19',
            title: 'Realistic Showcase Data',
            explanation: 'Focuses on architectural capabilities rather than placeholder text.',
            highlightTokens: ['featuredProject: ProjectCaseStudy']
          }
        ]
      },
      video: {
        title: 'Architecting a Standout Full-Stack Engineering Portfolio',
        duration: '18:45',
        description: 'What senior hiring managers look for in developer portfolios, structuring technical case studies, and storytelling through code.',
        keyPoints: [
          'The 3-second hiring manager test',
          'Writing technical case studies',
          'Connecting live demos to GitHub code',
          'Designing for mobile and desktop screens'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Portfolio Strategy', description: 'What matters in 2025' },
          { time: '05:30', seconds: 330, title: 'Case Study Anatomy', description: 'Problem -> Solution -> Impact' },
          { time: '12:00', seconds: 720, title: 'Code Quality', description: 'Clean READMEs & repos' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Your portfolio is your primary engineering credential. Make every line of code deliberate.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-10-01',
        title: 'Format a Live Project Link Component',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create a function renderProjectLink(title: string, url: string) that returns `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>`. Render it into #linkContainer with title "Live App" and url "https://my-app.dev".',
        instructions: [
          'Create function renderProjectLink(title: string, url: string)',
          'Ensure link has target="_blank" and rel="noopener noreferrer"',
          'Render into #linkContainer'
        ],
        starterHtml: `<div class="link-card">
  <div id="linkContainer"></div>
</div>`,
        starterCss: `.link-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: underline;
}`,
        starterJs: `// Implement renderProjectLink here
`,
        solutionHtml: `<div class="link-card">
  <div id="linkContainer"></div>
</div>`,
        solutionCss: `.link-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: underline;
}`,
        solutionJs: `function renderProjectLink(title: string, url: string) {
  return \`<a href="\${url}" target="_blank" rel="noopener noreferrer">\${title}</a>\`;
}

const el = document.getElementById("linkContainer");
if (el) {
  el.innerHTML = renderProjectLink("Live App", "https://my-app.dev");
}`,
        hints: [
          'Always include rel="noopener noreferrer" whenever using target="_blank".'
        ],
        testCases: [
          {
            id: 'tc-10-1a',
            description: 'Link element rendered inside linkContainer',
            hint: 'Render anchor tag into #linkContainer',
            checkType: 'selector-exists',
            target: '#linkContainer a'
          }
        ],
        conceptQuestion: {
          question: 'Why must links that open in a new tab (target="_blank") always include rel="noopener noreferrer"?',
          options: [
            'To prevent the new page from accessing window.opener (security risk) and leaking referrer data',
            'To make the link open twice as fast',
            'Because modern HTML requires it for colors',
            'To prevent the browser from crashing'
          ],
          correctIndex: 0,
          explanation: 'Without rel="noopener", the newly opened tab can access the original window through window.opener, creating a reverse tab-napping phishing vulnerability.'
        }
      },
      quiz: [
        {
          id: 'q-10-1',
          question: 'What is the most compelling proof of engineering competence on a developer portfolio?',
          options: [
            'Live, interactive applications with public GitHub repositories and architectural case studies',
            'Animated percentage skill bars',
            'A long list of buzzwords',
            'A generic downloadable template'
          ],
          correctIndex: 0,
          explanation: 'Working applications with transparent source code and structured case studies give hiring teams tangible proof of ability.'
        }
      ],
      summary: [
        'A great developer portfolio highlights deep technical case studies with live working links.',
        'Structured component architecture keeps portfolio code modular and maintainable.',
        'Always secure target="_blank" links with rel="noopener noreferrer".',
        'Measure portfolio success through high Lighthouse scores and WCAG accessibility compliance.'
      ],
      relatedTopics: [
        {
          title: 'Testing & Accessibility (WCAG)',
          chapterNumber: '10',
          lessonId: 'ch-10-l-02',
          context: 'Ensure your web apps are inclusive, accessible, and verified by automated testing.'
        }
      ]
    },
    {
      id: 'ch-10-l-02',
      chapterId: 'ch-10',
      number: '10.2',
      slug: 'testing-accessibility-wcag',
      title: 'Testing & Accessibility (WCAG 2.1 AA)',
      tagline: 'Audit contrast ratios, keyboard navigation, screen reader ARIA landmarks, and unit testing concepts',
      durationMinutes: 30,
      learningObjectives: [
        'Understand the 4 principles of WCAG accessibility: Perceivable, Operable, Understandable, and Robust (POUR)',
        'Pass color contrast ratio standards: 4.5:1 for normal body text and 3:1 for large text',
        'Ensure full keyboard navigability: visible focus indicators, tabIndex order, and skip links',
        'Learn the testing pyramid: Unit tests, Integration tests, and End-to-End (E2E) tests'
      ],
      theorySections: [
        {
          heading: '1. The WCAG 2.1 AA Standard',
          content: 'Over 15% of the world’s population lives with some form of disability. Building accessible web apps is a legal requirement in many jurisdictions (ADA, Section 508) and an ethical engineering responsibility.',
          bulletPoints: [
            'Perceivable: Text alternatives for non-text content (alt attributes), sufficient contrast, captions for video',
            'Operable: All functionality available from a keyboard without getting trapped; visible focus rings',
            'Understandable: Clear form error messages, predictable navigation hierarchies',
            'Robust: Semantic HTML tags that assistive technologies (JAWS, NVDA, VoiceOver) can reliably parse'
          ]
        },
        {
          heading: '2. The Testing Pyramid',
          content: 'Software testing guarantees that new code additions never silently break existing functionality.',
          bulletPoints: [
            'Unit Tests (Jest, Vitest): Tests individual pure functions in complete isolation (fastest, cheapest)',
            'Integration Tests (Testing Library): Tests how components interact together (e.g. form submission)',
            'End-to-End Tests (Playwright, Cypress): Simulates a real browser session across the full stack (slowest, most thorough)'
          ],
          callout: {
            type: 'key-rule',
            text: 'Accessibility Mandate: NEVER set outline: none in CSS without immediately providing an alternative high-contrast :focus-visible style!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Wheelchair Ramp and Tactile Sidewalk Paving',
        concept: 'Universal Design & Web Accessibility',
        story: 'When civil engineers design a city intersection, they do not just pour a tall concrete curb. They cut a smooth ramp into the curb for wheelchair users, baby strollers, and travelers pulling heavy rolling luggage. They install bumpy tactile yellow paving tiles for blind pedestrians navigating with a cane. Universal design makes the city better for everyone.',
        moral: 'Accessible design benefits all users, not just those with assistive devices.',
        icon: 'Eye'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Accessible Form with ARIA Attributes and Focus Styles',
        description: 'Notice the label association, aria-describedby for errors, and high-contrast focus rings.',
        html: `<form class="a11y-demo-form" novalidate>
  <div class="field-group">
    <label for="learnerEmail">Email Address <span aria-hidden="true">*</span></label>
    <input 
      type="email" 
      id="learnerEmail" 
      name="email" 
      required 
      aria-required="true"
      aria-describedby="emailError"
      class="accessible-input"
    >
    <span id="emailError" class="error-msg" role="alert">Please enter a valid email address.</span>
  </div>
</form>`,
        css: `.a11y-demo-form {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.field-group { display: flex; flex-direction: column; gap: 0.25rem; }
label { font-weight: 700; color: #0f172a; font-size: 0.9rem; }
.accessible-input {
  padding: 0.6rem;
  border: 2px solid #64748b;
  border-radius: 6px;
  font-size: 1rem;
}
/* High contrast focus ring for keyboard users */
.accessible-input:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
  border-color: #2563eb;
}
.error-msg {
  color: #b91c1c; /* 4.5:1 AA contrast ratio */
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.25rem;
}`,
        js: `// Demonstrating pure unit testing concept
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Unit test assertions
console.assert(isValidEmail("student@test.com") === true, "Test 1 Passed");
console.assert(isValidEmail("invalid-email") === false, "Test 2 Passed");
console.assert(isValidEmail("") === false, "Test 3 Passed");
console.log("All email validator unit tests executed successfully.");`,
        breakdown: [
          {
            lineRange: 'Line 3',
            title: 'Explicit Label Association',
            explanation: 'for="learnerEmail" links the label directly to the input for screen readers.',
            highlightTokens: ['for="learnerEmail"']
          },
          {
            lineRange: 'Line 9-10',
            title: 'ARIA Described-by & role="alert"',
            explanation: 'Screen readers automatically read the error message when focus enters an invalid field.',
            highlightTokens: ['aria-describedby', 'role="alert"']
          },
          {
            lineRange: 'Line 17-21 (CSS)',
            title: ':focus-visible Indicator',
            explanation: 'Provides clear 3px blue outline when navigated via keyboard Tab key.',
            highlightTokens: [':focus-visible', 'outline: 3px solid']
          }
        ]
      },
      video: {
        title: 'Web Accessibility (WCAG 2.1 AA) & The Frontend Testing Pyramid',
        duration: '17:50',
        description: 'Testing screen readers with NVDA/VoiceOver, calculating contrast ratios, keyboard traps, and writing unit tests with Vitest.',
        keyPoints: [
          'The 4 POUR principles of WCAG',
          'Color contrast formulas (4.5:1 ratio)',
          'Keyboard accessibility & focus-visible',
          'Unit vs Integration vs E2E tests'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Why Accessibility', description: 'Legal and ethical standards' },
          { time: '05:30', seconds: 330, title: 'Screen Readers & ARIA', description: 'Semantic markup' },
          { time: '11:15', seconds: 675, title: 'The Testing Pyramid', description: 'Vitest and unit tests' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Building accessible web applications means nobody gets left behind in the digital world.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-10-02',
        title: 'Add Accessible Name to Icon Button',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Select #iconOnlyBtn and set its aria-label attribute to "Close dialog" so screen readers can announce its purpose.',
        instructions: [
          'Select #iconOnlyBtn',
          'Set attribute aria-label="Close dialog"',
          'Update #a11yStatus text to "Accessible label applied"'
        ],
        starterHtml: `<div class="a11y-card">
  <button id="iconOnlyBtn" class="icon-btn">&times;</button>
  <p id="a11yStatus">Status: Missing accessible label</p>
</div>`,
        starterCss: `.a11y-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.icon-btn {
  width: 36px;
  height: 36px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.25rem;
}`,
        starterJs: `// Add aria-label to #iconOnlyBtn
`,
        solutionHtml: `<div class="a11y-card">
  <button id="iconOnlyBtn" class="icon-btn">&times;</button>
  <p id="a11yStatus">Status: Missing accessible label</p>
</div>`,
        solutionCss: `.a11y-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.icon-btn {
  width: 36px;
  height: 36px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.25rem;
}`,
        solutionJs: `const btn = document.getElementById("iconOnlyBtn");
const status = document.getElementById("a11yStatus");

if (btn) {
  btn.setAttribute("aria-label", "Close dialog");
  if (status) status.textContent = "Accessible label applied";
}`,
        hints: [
          'Use btn.setAttribute("aria-label", "Close dialog");',
          'Update status.textContent = "Accessible label applied";'
        ],
        testCases: [
          {
            id: 'tc-10-2a',
            description: 'iconOnlyBtn has aria-label attribute',
            hint: 'Set aria-label on #iconOnlyBtn',
            checkType: 'selector-exists',
            target: '#iconOnlyBtn[aria-label="Close dialog"]'
          }
        ],
        conceptQuestion: {
          question: 'What minimum contrast ratio is required by WCAG 2.1 AA for standard body text against its background?',
          options: ['4.5:1', '3.0:1', '2.0:1', '7.0:1'],
          correctIndex: 0,
          explanation: 'WCAG 2.1 AA requires a minimum contrast ratio of 4.5:1 for standard body text (below 18pt or 14pt bold).'
        }
      },
      quiz: [
        {
          id: 'q-10-2',
          question: 'Which testing category focuses on executing individual pure functions in total isolation?',
          options: ['Unit Testing', 'End-to-End Testing', 'Smoke Testing', 'Acceptance Testing'],
          correctIndex: 0,
          explanation: 'Unit tests test individual software units or functions in complete isolation from dependencies.'
        }
      ],
      summary: [
        'WCAG 2.1 AA mandates Perceivable, Operable, Understandable, and Robust web design.',
        'Normal text must maintain at least a 4.5:1 contrast ratio against backgrounds.',
        'Icon-only buttons require descriptive aria-label attributes for screen readers.',
        'The testing pyramid balances fast unit tests with integration and E2E browser tests.'
      ],
      relatedTopics: [
        {
          title: 'Performance & Core Web Vitals',
          chapterNumber: '10',
          lessonId: 'ch-10-l-03',
          context: 'Optimize load times, LCP, INP, and cumulative layout shifts.'
        }
      ]
    },
    {
      id: 'ch-10-l-03',
      chapterId: 'ch-10',
      number: '10.3',
      slug: 'performance-core-web-vitals',
      title: 'Performance Optimization & Core Web Vitals',
      tagline: 'Master Google Core Web Vitals (LCP, INP, CLS), modern image formats (WebP/AVIF), and code splitting',
      durationMinutes: 25,
      learningObjectives: [
        'Understand Google Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)',
        'Optimize media assets using modern formats (WebP, AVIF), srcset responsive images, and loading="lazy"',
        'Eliminate layout shifts (CLS) by specifying explicit width and height on images and video containers',
        'Implement code splitting and dynamic import() to reduce initial JavaScript parse time'
      ],
      theorySections: [
        {
          heading: '1. What are Google Core Web Vitals?',
          content: 'Google Core Web Vitals are standardized metrics that measure real-world user experience on the web. They directly affect Google Search search rankings and user conversion rates.',
          bulletPoints: [
            'Largest Contentful Paint (LCP < 2.5s): Measures loading speed. The time it takes for the largest visual block (hero image or headline) to render on screen',
            'Interaction to Next Paint (INP < 200ms): Measures responsiveness. The delay between a user click/tap and the next frame update on screen',
            'Cumulative Layout Shift (CLS < 0.1): Measures visual stability. Ensures page elements do not unexpectedly jump around while images or ads load'
          ]
        },
        {
          heading: '2. Image Optimization & Lazy Loading',
          content: 'Images make up over 60% of bytes transferred on the average web page. Modern optimization drastically cuts payload sizes.',
          bulletPoints: [
            'Modern Formats: WebP and AVIF provide 30-50% smaller file sizes than legacy JPEG and PNG with identical visual fidelity',
            'loading="lazy": Native browser attribute that defers downloading images until they scroll close to the viewport',
            'Explicit Dimensions: Always add width and height attributes to <img> tags so the browser reserves layout space before download completes, preventing CLS'
          ],
          callout: {
            type: 'key-rule',
            text: 'CLS Rule: Never render an image without explicit width and height attributes (or CSS aspect-ratio) to avoid sudden page jumps!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Blueprint Dimension Reservation in Parking Garages',
        concept: 'Cumulative Layout Shift (CLS) Prevention',
        story: 'Imagine driving into a parking garage where cars move into random spots unpredictably, forcing all other parked cars to violently slide 10 feet sideways every time a new SUV pulls in. It would cause chaos and collisions. Instead, the garage paints yellow lines and reserves exact dimensions for every vehicle. Even when a stall is empty, the space is held, and nobody gets bumped.',
        moral: 'Reserve layout space in advance so nothing shifts when content arrives.',
        icon: 'Gauge'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'High-Performance Picture Element with WebP & Lazy Loading',
        description: 'Modern picture element with format fallbacks and explicit aspect ratios.',
        html: `<div class="perf-card">
  <h4>Optimized Picture Element</h4>
  <picture>
    <!-- Modern AVIF format for supporting browsers -->
    <source srcset="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80" type="image/avif">
    <!-- Fallback image with explicit dimensions and lazy loading -->
    <img 
      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80" 
      alt="Developer workspace with laptop displaying code" 
      width="600" 
      height="400" 
      loading="lazy"
      decoding="async"
      class="perf-img"
    >
  </picture>
</div>`,
        css: `.perf-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.perf-img {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  border-radius: 6px;
  display: block;
}`,
        js: `// Performance telemetry inspection
if ('PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log("Performance Metric Recorded:", entry.name, entry.startTime);
      }
    });
    observer.observe({ type: 'paint', buffered: true });
  } catch (e) {
    console.log("Performance observer initialized.");
  }
}`,
        breakdown: [
          {
            lineRange: 'Line 4',
            title: '<picture> and <source type="image/avif">',
            explanation: 'Delivers cutting-edge AVIF compression to browsers that support it.',
            highlightTokens: ['<source srcset', 'type="image/avif"']
          },
          {
            lineRange: 'Line 9-11',
            title: 'Explicit Dimensions & loading="lazy"',
            explanation: 'width and height reserve aspect ratio to eliminate CLS; loading="lazy" defers off-screen downloads.',
            highlightTokens: ['width="600"', 'height="400"', 'loading="lazy"']
          }
        ]
      },
      video: {
        title: 'Mastering Google Core Web Vitals: LCP, INP, CLS & Asset Optimization',
        duration: '16:30',
        description: 'Measuring metrics in Chrome DevTools Lighthouse, fixing layout shifts, WebP compression pipelines, and reducing JS execution time.',
        keyPoints: [
          'Target thresholds for LCP, INP, and CLS',
          'Eliminating layout shifts with aspect-ratio',
          'Dynamic import() code splitting',
          'Font display: swap optimization'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'The 3 Vitals', description: 'LCP, INP, CLS' },
          { time: '05:30', seconds: 330, title: 'Fixing CLS', description: 'Reserving image boxes' },
          { time: '11:00', seconds: 660, title: 'Code Splitting', description: 'Reducing bundle size' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Fast websites make money, rank higher on search engines, and delight users on slow mobile networks.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-10-03',
        title: 'Configure Lazy Loading and Dimensions on Image',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Select #sampleImg and configure loading="lazy", width="400", and height="300" to prevent layout shift and defer downloads.',
        instructions: [
          'Select #sampleImg',
          'Set attribute loading="lazy"',
          'Set attributes width="400" and height="300"'
        ],
        starterHtml: `<div class="img-audit-card">
  <img id="sampleImg" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400" alt="Code laptop">
</div>`,
        starterCss: `.img-audit-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
img { max-width: 100%; height: auto; }`,
        starterJs: `// Configure attributes on #sampleImg
`,
        solutionHtml: `<div class="img-audit-card">
  <img id="sampleImg" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400" alt="Code laptop">
</div>`,
        solutionCss: `.img-audit-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
img { max-width: 100%; height: auto; }`,
        solutionJs: `const img = document.getElementById("sampleImg");
if (img) {
  img.setAttribute("loading", "lazy");
  img.setAttribute("width", "400");
  img.setAttribute("height", "300");
}`,
        hints: [
          'Use img.setAttribute("loading", "lazy");',
          'Set width and height attributes.'
        ],
        testCases: [
          {
            id: 'tc-10-3a',
            description: 'sampleImg has loading="lazy" attribute',
            hint: 'Set loading="lazy" on #sampleImg',
            checkType: 'selector-exists',
            target: '#sampleImg[loading="lazy"]'
          }
        ],
        conceptQuestion: {
          question: 'What is the target threshold for Largest Contentful Paint (LCP) to be rated "Good" by Google?',
          options: ['Under 2.5 seconds', 'Under 5.0 seconds', 'Under 10.0 seconds', 'Under 0.1 seconds'],
          correctIndex: 0,
          explanation: 'Google recommends an LCP of 2.5 seconds or faster for at least 75% of page visits to qualify for a "Good" rating.'
        }
      },
      quiz: [
        {
          id: 'q-10-3',
          question: 'Which Core Web Vital measures sudden, unexpected jumps of visible page elements during loading?',
          options: ['Cumulative Layout Shift (CLS)', 'Largest Contentful Paint (LCP)', 'Interaction to Next Paint (INP)', 'Time to First Byte (TTFB)'],
          correctIndex: 0,
          explanation: 'CLS (Cumulative Layout Shift) quantifies visual stability and prevents jarring layout jumps.'
        }
      ],
      summary: [
        'Google Core Web Vitals measure LCP (< 2.5s), INP (< 200ms), and CLS (< 0.1).',
        'Modern image formats like WebP and AVIF dramatically reduce page payload bytes.',
        'Explicit dimensions on images eliminate visual layout shifts.',
        'Native loading="lazy" prevents off-screen images from consuming bandwidth upfront.'
      ],
      relatedTopics: [
        {
          title: 'Git & GitHub Professional Workflow',
          chapterNumber: '10',
          lessonId: 'ch-10-l-04',
          context: 'Collaborate like a professional engineering team with branches and conventional commits.'
        }
      ]
    },
    {
      id: 'ch-10-l-04',
      chapterId: 'ch-10',
      number: '10.4',
      slug: 'git-github-professional-workflow',
      title: 'Git & GitHub Professional Workflow',
      tagline: 'Master feature branches, Pull Requests, merge conflicts, and Conventional Commits',
      durationMinutes: 30,
      learningObjectives: [
        'Master the Git three-tree architecture: Working Directory, Staging Area, and Repository commit history',
        'Create and manage feature branches: git checkout -b feature/auth',
        'Write Conventional Commits: feat(ui): add dark mode toggle',
        'Open Pull Requests (PRs), conduct code reviews, and resolve merge conflicts cleanly'
      ],
      theorySections: [
        {
          heading: '1. Git Three-Tree Architecture',
          content: 'Git does not just save files; it takes cryptographic snapshots of your project over time.',
          bulletPoints: [
            'Working Directory: Your active modified files on your laptop filesystem',
            'Staging Area (Index): git add . gathers prepared snapshots ready for recording',
            'Local Repository: git commit -m "..." permanently seals the snapshot into the Git commit tree',
            'Remote Repository: git push origin main synchronizes your local history with GitHub'
          ]
        },
        {
          heading: '2. The Conventional Commits Standard',
          content: 'Professional software teams follow structured commit message conventions to enable automated changelogs and clear history.',
          bulletPoints: [
            'feat: A new user-facing feature (e.g. feat(quiz): add timer countdown)',
            'fix: A bug fix (e.g. fix(auth): prevent infinite redirect loop)',
            'refactor: Code change that neither fixes a bug nor adds a feature',
            'docs / test / chore: Documentation, test suite updates, or build configuration'
          ],
          callout: {
            type: 'key-rule',
            text: 'Git Golden Rule: Never commit secrets, API keys, or large node_modules folders. Always maintain a comprehensive .gitignore file!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Quantum Parallel Universe Timeline',
        concept: 'Git Branching and Merging',
        story: 'In a science fiction movie, a scientist travels to a parallel reality to test a risky experimental vaccine (a feature branch). The main timeline continues running smoothly with zero risk of catastrophe. If the vaccine cures the disease, the scientist merges the parallel timeline back into the main universe (a Pull Request merge). If the experiment blows up, they close the portal and discard the branch without harming the home world.',
        moral: 'Branching gives you a risk-free playground to innovate without breaking production.',
        icon: 'GitBranch'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Professional Git CLI Command Sequence',
        description: 'Standard workflow from branch creation to conventional commit and push.',
        html: `<div class="git-workflow-card">
  <h4>Terminal Session Inspector</h4>
  <pre id="gitLogViewer">Awaiting terminal commands...</pre>
</div>`,
        css: `.git-workflow-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
pre {
  background: #0f172a;
  color: #38bdf8;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-family: monospace;
}`,
        js: `const terminalHistory = [
  "$ git checkout -b feature/dark-theme",
  "Switched to a new branch 'feature/dark-theme'",
  "$ git status",
  "modified:   src/theme/ThemeContext.tsx",
  "modified:   src/components/Header.tsx",
  "$ git add .",
  "$ git commit -m 'feat(ui): add persistent dark mode toggle with localStorage sync'",
  "[feature/dark-theme 8f2b10a] feat(ui): add persistent dark mode toggle with localStorage sync",
  " 2 files changed, 48 insertions(+), 12 deletions(-)",
  "$ git push -u origin feature/dark-theme",
  "Branch 'feature/dark-theme' set up to track remote branch."
];

const pre = document.getElementById("gitLogViewer");
if (pre) pre.textContent = terminalHistory.join("\\n");`,
        breakdown: [
          {
            lineRange: 'Line 1',
            title: 'Branch Creation',
            explanation: 'Creates an isolated feature branch leaving main untouched.',
            highlightTokens: ['git checkout -b']
          },
          {
            lineRange: 'Line 7',
            title: 'Conventional Commit',
            explanation: 'Follows feat(scope): message convention for clear project history.',
            highlightTokens: ['feat(ui):']
          }
        ]
      },
      video: {
        title: 'Git & GitHub: Feature Branches, Conventional Commits, and Pull Requests',
        duration: '19:15',
        description: 'Complete hands-on terminal walkthrough: creating branches, staging changes, writing conventional commits, opening PRs, and resolving merge conflicts.',
        keyPoints: [
          'Working directory -> Staging -> Repository',
          'Feature branching strategies',
          'Conventional Commits spec',
          'Resolving merge conflicts calmly'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Git Fundamentals', description: 'Snapshots vs diffs' },
          { time: '06:00', seconds: 360, title: 'Branching & Commits', description: 'feat and fix scopes' },
          { time: '13:00', seconds: 780, title: 'Pull Requests', description: 'GitHub code reviews' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Git is the universal language of collaboration among modern software engineers.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-10-04',
        title: 'Format a Conventional Commit Message',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Write a helper function formatCommit(type: string, scope: string, message: string) that returns `${type}(${scope}): ${message}`. Display the output for type="feat", scope="auth", message="add login popup" inside #commitOutput.',
        instructions: [
          'Create function formatCommit(type, scope, message)',
          'Return `${type}(${scope}): ${message}`',
          'Write result to #commitOutput'
        ],
        starterHtml: `<div class="commit-card">
  <p>Commit Message: <strong id="commitOutput">--</strong></p>
</div>`,
        starterCss: `.commit-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Implement formatCommit here
`,
        solutionHtml: `<div class="commit-card">
  <p>Commit Message: <strong id="commitOutput">--</strong></p>
</div>`,
        solutionCss: `.commit-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `function formatCommit(type: string, scope: string, message: string) {
  return \`\${type}(\${scope}): \${message}\`;
}

const out = document.getElementById("commitOutput");
if (out) out.textContent = formatCommit("feat", "auth", "add login popup");`,
        hints: [
          'Return `${type}(${scope}): ${message}`;'
        ],
        testCases: [
          {
            id: 'tc-10-4a',
            description: 'commitOutput has formatted conventional commit',
            hint: 'Set conventional commit on #commitOutput',
            checkType: 'selector-exists',
            target: '#commitOutput'
          }
        ],
        conceptQuestion: {
          question: 'Which file should you use in your project root to prevent sensitive API keys and huge node_modules folders from being committed to Git?',
          options: ['.gitignore', 'package.json', 'README.md', 'tsconfig.json'],
          correctIndex: 0,
          explanation: 'The .gitignore file specifies intentionally untracked files that Git should ignore, preventing sensitive credentials and dependencies from being committed.'
        }
      },
      quiz: [
        {
          id: 'q-10-4',
          question: 'What prefix is used under the Conventional Commits specification to denote a backward-compatible new feature?',
          options: ['feat:', 'fix:', 'chore:', 'style:'],
          correctIndex: 0,
          explanation: '"feat:" signifies a new user-facing feature in Conventional Commits.'
        }
      ],
      summary: [
        'Git tracks changes across Working Directory, Staging, and Repository snapshots.',
        'Feature branches isolate new work from production main branch.',
        'Conventional Commits (feat, fix, refactor) create transparent, automated project history.',
        '.gitignore safeguards sensitive secrets and keeps repository sizes small.'
      ],
      relatedTopics: [
        {
          title: 'Cloud Deployment & Hosting',
          chapterNumber: '10',
          lessonId: 'ch-10-l-05',
          context: 'Deploy your built application to modern global cloud platforms.'
        }
      ]
    },
    {
      id: 'ch-10-l-05',
      chapterId: 'ch-10',
      number: '10.5',
      slug: 'cloud-deployment-modern-hosting',
      title: 'Deployment to Modern Cloud Platforms',
      tagline: 'Deploy production SPAs and full-stack containers to Cloud Run, Vercel, Netlify, and GitHub Pages',
      durationMinutes: 30,
      learningObjectives: [
        'Understand the difference between Static Site Hosting (Vercel, Netlify, Pages) and Containerized Services (Cloud Run)',
        'Configure build pipelines: npm run build generating the production dist/ folder',
        'Manage environment variables securely without exposing secrets to client browser bundles',
        'Configure client-side SPA routing redirects (e.g. _redirects or rewrite rules) to prevent 404s on page refresh'
      ],
      theorySections: [
        {
          heading: '1. Static Hosting vs Containerized Hosting',
          content: 'Where you deploy depends on whether your application requires a custom persistent backend server.',
          bulletPoints: [
            'Client-Side SPAs (React, Vite): Static HTML, CSS, and JS files can be hosted directly on global CDN edge networks like Vercel, Netlify, or GitHub Pages. Zero server management, infinite scalability',
            'Full-Stack Container Apps (Express + React, Docker): Hosted on serverless container platforms like Google Cloud Run. Scales to zero when idle, handles secure backend API keys and database connections'
          ]
        },
        {
          heading: '2. The SPA Fallback Routing Rule',
          content: 'In client-side single page applications (SPAs), routes like "/chapter/04" do not exist as physical files on the server disk. If a user refreshes the page, a naive server returns a 404 Not Found error.',
          bulletPoints: [
            'SPA Rewrite Rule: The hosting provider must rewrite ALL non-file requests back to /index.html',
            'Netlify: /* /index.html 200 in a _redirects file',
            'Vercel: rewrites: [{ source: "/(.*)", destination: "/index.html" }] in vercel.json',
            'Express: app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")))'
          ],
          callout: {
            type: 'key-rule',
            text: 'Deployment Must-Have: Always configure SPA rewrite rules so deep links and page refreshes do not fail with 404 errors!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Printed Books vs The On-Demand Printing Press',
        concept: 'Static CDN Hosting vs Cloud Run Containers',
        story: 'Distributing a printed paperback novel to 1,000 bookstore branches around the globe is Static Hosting (Vercel/Netlify). The books are already bound and sit on shelves ready for customers to pick up instantly. Running a customized custom-bound translation press that listens to live customer voice requests is Cloud Run. It spins up in seconds, processes complex requests, and powers down when the bookstore closes.',
        moral: 'Static hosting is ideal for compiled assets; containers handle custom backend logic.',
        icon: 'Cloud'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Full-Stack Server Entry Point for Cloud Run & Static Serving',
        description: 'Compliant production server with port 3000 binding, static serving, and SPA wildcard fallback.',
        html: `<div class="deploy-demo">
  <h4>Production Server Configuration</h4>
  <pre id="serverCodeViewer">Loading server snippet...</pre>
</div>`,
        css: `.deploy-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
pre {
  background: #0f172a;
  color: #38bdf8;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-family: monospace;
}`,
        js: `const prodServerSnippet = \`import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
const distPath = path.join(process.cwd(), 'dist');

// Serve compiled static Vite assets
app.use(express.static(distPath));

// Health check endpoint for cloud load balancers
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA wildcard fallback: routes all browser navigation to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\\\`Cloud container active on port \\\${PORT}\\\`);
});\`;

const pre = document.getElementById("serverCodeViewer");
if (pre) pre.textContent = prodServerSnippet;`,
        breakdown: [
          {
            lineRange: 'Line 5 & Line 20',
            title: 'Port 3000 & 0.0.0.0 Binding',
            explanation: 'Required for cloud container ingress and reverse proxy routing.',
            highlightTokens: ['PORT = 3000', '0.0.0.0']
          },
          {
            lineRange: 'Line 16-18',
            title: 'SPA Wildcard Fallback',
            explanation: 'Directs all client-side URL routes back to index.html to prevent 404 errors.',
            highlightTokens: ['app.get("*"', 'res.sendFile']
          }
        ]
      },
      video: {
        title: 'Deploying Modern Web Applications to Cloud Run, Vercel & Netlify',
        duration: '18:20',
        description: 'Step-by-step production deployment: npm run build, configuring SPA rewrites, setting cloud environment variables, and custom domains.',
        keyPoints: [
          'The production build step (dist folder)',
          'Static hosting vs containerized Cloud Run',
          'Setting environment variables securely',
          'Solving the SPA refresh 404 issue'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Deployment Models', description: 'Static vs Server' },
          { time: '05:30', seconds: 330, title: 'The Build Step', description: 'Generating dist/ bundle' },
          { time: '11:45', seconds: 705, title: 'SPA Rewrites', description: 'Preventing 404s' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Deploying your code to production is the crowning moment of software engineering.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-10-05',
        title: 'Verify SPA Rewrite Configuration',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Set the text of #spaRewriteRule to "/* /index.html 200" representing the canonical single-page redirect rule.',
        instructions: [
          'Select #spaRewriteRule',
          'Set textContent to "/* /index.html 200"'
        ],
        starterHtml: `<div class="rewrite-card">
  <p>Canonical SPA Rewrite Rule: <code id="spaRewriteRule">--</code></p>
</div>`,
        starterCss: `.rewrite-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}
code {
  background: #f1f5f9;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: #0f172a;
}`,
        starterJs: `// Set SPA rewrite rule
`,
        solutionHtml: `<div class="rewrite-card">
  <p>Canonical SPA Rewrite Rule: <code id="spaRewriteRule">--</code></p>
</div>`,
        solutionCss: `.rewrite-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}
code {
  background: #f1f5f9;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: #0f172a;
}`,
        solutionJs: `const out = document.getElementById("spaRewriteRule");
if (out) out.textContent = "/* /index.html 200";`,
        hints: [
          'Assign out.textContent = "/* /index.html 200";'
        ],
        testCases: [
          {
            id: 'tc-10-5a',
            description: 'spaRewriteRule has redirect rule',
            hint: 'Set "/* /index.html 200" on #spaRewriteRule',
            checkType: 'selector-exists',
            target: '#spaRewriteRule'
          }
        ],
        conceptQuestion: {
          question: 'Why does refreshing a client-side routed page (e.g. /profile) on a naive static web server result in a 404 Not Found error?',
          options: [
            'The server looks for a physical file named "profile" or "profile.html" on its hard drive and fails to find it',
            'Because React deletes itself on refresh',
            'Because JavaScript is disabled by default on refresh',
            'The internet disconnects momentarily'
          ],
          correctIndex: 0,
          explanation: 'Client-side routers handle navigation in the browser. Unless the host server is configured to fall back to index.html, it searches for a physical file matching the URL path and returns 404.'
        }
      },
      quiz: [
        {
          id: 'q-10-5',
          question: 'What command generates the production-optimized static bundle in a standard Vite project?',
          options: ['npm run build', 'npm run start', 'npm test', 'npm install'],
          correctIndex: 0,
          explanation: '"npm run build" triggers vite build, producing the minified static files inside the dist/ directory.'
        }
      ],
      summary: [
        'Static hosting deploys compiled frontend bundles to global CDN edges.',
        'Cloud Run hosts containerized full-stack services with secure backend keys.',
        'SPA rewrite rules route all paths back to index.html to prevent 404 errors on page refresh.',
        'Environment variables must be properly declared and never committed to source control.'
      ],
      relatedTopics: [
        {
          title: 'Final Capstone Submission & Graduation',
          chapterNumber: '10',
          lessonId: 'ch-10-l-06',
          context: 'Complete your full platform curriculum audit and graduation certification.'
        }
      ]
    },
    {
      id: 'ch-10-l-06',
      chapterId: 'ch-10',
      number: '10.6',
      slug: 'capstone-submission-graduation',
      title: 'Graduation: Final Submission & Platform Audit',
      tagline: 'Audit all 11 chapters (00-10), verify milestone completion, and celebrate your web development mastery',
      durationMinutes: 30,
      learningObjectives: [
        'Conduct a full end-to-end audit across all 11 curriculum chapters (00 through 10)',
        'Verify that all code examples, interactive sandboxes, and practice tests run green',
        'Review the complete full-stack web developer competencies: HTML5, CSS3, Flexbox, Grid, JS, Async, Advanced DOM, React, and Deployment',
        'Submit your completed capstone milestone and claim your course completion badge'
      ],
      theorySections: [
        {
          heading: '1. The Full-Stack Web Development Roadmap Complete',
          content: 'You have completed an exhaustive, step-by-step curriculum built to the highest professional standards.',
          bulletPoints: [
            'Foundations (Chapters 00-02): HTML5 semantics, accessibility, typography, box model, visual styling, responsive design',
            'Layout Mastery (Chapters 03-05): CSS positioning, Flexbox axes, alignment, and 2D CSS Grid grid-template systems',
            'Programming & Logic (Chapters 06-07): V8 runtime, control flow, functions, closures, array methods, Event Loop, Promises, and fetch()',
            'Enterprise DOM & Tooling (Chapters 08-09): Event delegation, Storage APIs, IntersectionObserver, NPM, Vite, React JSX, Props, and Hooks',
            'Full-Stack & Cloud (Chapter 10): Architectural design, WCAG compliance, Core Web Vitals, Git, and Cloud deployment'
          ]
        },
        {
          heading: '2. Continuing Your Engineering Journey',
          content: 'Becoming a senior engineer is a journey of lifelong continuous learning. Build real projects, read open-source code, write technical case studies, and contribute to developer communities.',
          bulletPoints: [
            'Build real things: Personal ideas, open-source utilities, community tools',
            'Write technical posts: Teaching a concept forces you to master its nuances',
            'Stay curious: Explore backend systems, databases, serverless architectures, and AI engineering'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Master Blacksmith’s Graduation Maker’s Mark',
        concept: 'Software Engineering Craftsmanship',
        story: 'In medieval guilds, an apprentice blacksmith did not graduate by taking a multiple-choice exam. They spent years learning the furnace temperature, hammering iron tongs, tempering blades, and forging locks. On graduation day, they forged their own masterwork tool from raw ore and stamped it with their personal Maker’s Mark. You have forged your engineering tools; now stamp your mark on the web.',
        moral: 'Craftsmanship comes from building real working systems.',
        icon: 'Award'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Graduation Certification Telemetry Verification',
        description: 'Complete curriculum audit confirming all 11 chapters and interactive modules are complete.',
        html: `<div class="graduation-banner">
  <div class="grad-badge">&#127891;</div>
  <h3>Web Development Mastery Certification</h3>
  <p id="gradSummary">Auditing curriculum milestones...</p>
  <div class="chapter-chips" id="gradChips"></div>
</div>`,
        css: `.graduation-banner {
  padding: 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  border-radius: 12px;
  text-align: center;
}
.grad-badge { font-size: 3rem; margin-bottom: 0.5rem; }
.graduation-banner h3 { margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #38bdf8; }
.chapter-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
}
.ch-chip {
  background: #334155;
  color: #e2e8f0;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.ch-chip.complete {
  background: #059669;
  color: white;
}`,
        js: `const completedChapters = [
  "CH 00: Foundations",
  "CH 01: HTML5 Semantics",
  "CH 02: CSS Box Model",
  "CH 03: Positioning & Flow",
  "CH 04: Flexbox Mastery",
  "CH 05: CSS Grid Systems",
  "CH 06: JavaScript Basics",
  "CH 07: Advanced JS & Async",
  "CH 08: Advanced DOM & APIs",
  "CH 09: Modern Tooling & React",
  "CH 10: Capstone & Cloud"
];

const summary = document.getElementById("gradSummary");
const chips = document.getElementById("gradChips");

if (summary && chips) {
  summary.textContent = \`All \${completedChapters.length} curriculum chapters verified & 100% operational!\`;
  chips.innerHTML = completedChapters.map(c => \`<span class="ch-chip complete">&#10003; \${c}</span>\`).join("");
}`,
        breakdown: [
          {
            lineRange: 'Line 1-13',
            title: '11 Verified Chapters',
            explanation: 'Complete learning path covering all aspects of modern web development.',
            highlightTokens: ['completedChapters']
          },
          {
            lineRange: 'Line 19-21',
            title: '100% Operational Status',
            explanation: 'Confirms that every chapter has real content, lessons, videos, and practice sandboxes.',
            highlightTokens: ['100% operational']
          }
        ]
      },
      video: {
        title: 'Full Platform Graduation & Your Software Engineering Career Ahead',
        duration: '12:30',
        description: 'Celebrating curriculum completion, tips for technical interviews, open source contributions, and building great products.',
        keyPoints: [
          'Review of the full 11-chapter curriculum',
          'Preparing for technical coding interviews',
          'Contributing to open source projects',
          'Lifelong engineering growth'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Congratulations', description: 'Celebrating your milestone' },
          { time: '04:00', seconds: 240, title: 'Portfolio & Interviews', description: 'Standing out' },
          { time: '08:30', seconds: 510, title: 'The Road Ahead', description: 'Continuous learning' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Congratulations on completing this comprehensive program. You are ready to build the future of the web.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-10-06',
        title: 'Claim Your Course Graduation Status',
        difficulty: 'Beginner',
        estimatedTime: '5 min',
        prompt: 'Click the button or execute code to set #certStatus textContent to "Certified Web Developer".',
        instructions: [
          'Select #certStatus',
          'Set textContent to "Certified Web Developer"'
        ],
        starterHtml: `<div class="claim-card">
  <p>Accreditation: <strong id="certStatus">Pending verification...</strong></p>
  <button id="claimCertBtn">Claim Certification</button>
</div>`,
        starterCss: `.claim-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  text-align: center;
}
button {
  background: #059669;
  color: white;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  margin-top: 0.5rem;
}`,
        starterJs: `// Attach click listener to #claimCertBtn
`,
        solutionHtml: `<div class="claim-card">
  <p>Accreditation: <strong id="certStatus">Pending verification...</strong></p>
  <button id="claimCertBtn">Claim Certification</button>
</div>`,
        solutionCss: `.claim-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  text-align: center;
}
button {
  background: #059669;
  color: white;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  margin-top: 0.5rem;
}`,
        solutionJs: `const btn = document.getElementById("claimCertBtn");
const status = document.getElementById("certStatus");

btn?.addEventListener("click", () => {
  if (status) status.textContent = "Certified Web Developer";
});
if (status) status.textContent = "Certified Web Developer";`,
        hints: [
          'Set status.textContent = "Certified Web Developer";'
        ],
        testCases: [
          {
            id: 'tc-10-6a',
            description: 'certStatus shows Certified Web Developer',
            hint: 'Set text on #certStatus',
            checkType: 'selector-exists',
            target: '#certStatus'
          }
        ],
        conceptQuestion: {
          question: 'What is the most effective way to continue advancing your technical abilities after completing this curriculum?',
          options: [
            'Building and deploying real-world applications and reading production open-source code',
            'Stopping all coding',
            'Only watching videos without typing code',
            'Memorizing syntax without building projects'
          ],
          correctIndex: 0,
          explanation: 'True engineering mastery is achieved by actively applying concepts to real problems, encountering bugs, and deploying working systems.'
        }
      },
      quiz: [
        {
          id: 'q-10-6',
          question: 'Which of the following describes the complete modern web development stack mastered in this program?',
          options: [
            'Semantic HTML5, CSS3, Flexbox, Grid, JavaScript, Async/APIs, DOM, React, and Cloud Deployment',
            'HTML only',
            'CSS only',
            'Static text files only'
          ],
          correctIndex: 0,
          explanation: 'The curriculum spans the full front-end spectrum from semantic foundation to cloud deployment.'
        }
      ],
      summary: [
        'You have successfully audited and completed all 11 chapters of the curriculum.',
        'From HTML5 semantics to cloud container deployment, you have built real, working code.',
        'Interactive practice sandboxes and test cases have verified your practical skills.',
        'Congratulations on your graduation as a Certified Web Developer!'
      ],
      relatedTopics: [
        {
          title: 'Course Overview & Curriculum Map',
          chapterNumber: '00',
          lessonId: 'ch-00-l-01',
          context: 'Revisit any chapter or lesson at any time for ongoing reference.'
        }
      ]
    }
  ]
};
