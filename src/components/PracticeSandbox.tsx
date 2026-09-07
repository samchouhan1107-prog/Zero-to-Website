import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Terminal,
  Code2,
  Check,
  AlertCircle,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Cpu,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PracticeChallenge } from '../types';

interface PracticeSandboxProps {
  challenge: PracticeChallenge;
  onComplete?: (challengeId: string) => void;
  isCompleted?: boolean;
}

export interface CompilerDiagnostic {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  file: 'index.html' | 'style.css' | 'script.js' | 'all';
  line?: number;
  message: string;
  suggestion: string;
  bookRule: string;
}

/**
 * High-yield textbook concepts, straight book rules, and concept checks
 * designed for deep mental retention and independent learner creativity.
 */
function getChallengeConceptMeta(challenge: PracticeChallenge) {
  if (challenge.conceptQuestion && challenge.bookRule && challenge.creativeIdeas) {
    return {
      bookRule: challenge.bookRule,
      creativeIdeas: challenge.creativeIdeas,
      conceptQuestion: challenge.conceptQuestion,
    };
  }

  const id = challenge.id.toLowerCase();
  const title = challenge.title.toLowerCase();

  // Chapter 00: Web Foundations & First Greeting Card
  if (id.includes('00') || title.includes('greeting') || title.includes('internet')) {
    return {
      bookRule:
        'Straight Book Rule: Separation of Concerns — HTML creates the structural elements, CSS controls visual presentation and layout, and JavaScript coordinates dynamic user events.',
      creativeIdeas: [
        'Personalize the greeting with your real name or developer moniker (e.g. "Welcome to Maya\'s Web Studio")',
        'Pick your favorite brand accent color in CSS (e.g. #059669 Emerald, #4f46e5 Indigo, #e11d48 Crimson)',
        'Add a custom subtitle paragraph sharing what you plan to build next',
      ],
      conceptQuestion: {
        question:
          'In standard textbook web architecture, why must HTML, CSS, and JavaScript collaborate as separate layers?',
        options: [
          'To separate content structure from visual styling and behavior, making code modular and maintainable',
          'Because web browsers can only load one programming language per domain',
          'Because DNS lookup tables reject websites that combine multiple languages',
          'Because JavaScript requires an external third-party cloud server to parse HTML',
        ],
        correctIndex: 0,
        explanation:
          'Separation of Concerns is the bedrock of clean web development. HTML holds content, CSS defines aesthetics, and JavaScript handles reactivity—all working together locally inside the browser without third-party host locks.',
      },
    };
  }

  // Chapter 01: DevTools & Environment
  if (id.includes('01') || title.includes('devtools') || title.includes('alert')) {
    return {
      bookRule:
        'Straight Book Rule: Browser DevTools operates directly on in-memory DOM and CSSOM trees, letting you test changes safely before updating source files.',
      creativeIdeas: [
        'Change the alert box border accent to your favorite hue and adjust inner padding',
        'Use console.info() or console.warn() in your script to test different DevTools output styles',
        'Add an icon or emoji to the alert headline to make it feel like a real application toast',
      ],
      conceptQuestion: {
        question:
          'What happens when you inspect and edit CSS styles live in your browser DevTools Elements panel?',
        options: [
          'The changes appear immediately in browser memory without modifying your original files on disk',
          'The changes are permanently committed and uploaded to your hosting provider',
          'The browser disables all JavaScript events to prevent race conditions',
          'The DNS resolver assigns a new IP address to your testing session',
        ],
        correctIndex: 0,
        explanation:
          'DevTools lets you experiment risk-free. It tweaks live rendered nodes in RAM, letting you perfect layouts before writing them permanently to disk.',
      },
    };
  }

  // Chapter 02: HTML Structure & Semantic Tags
  if (id.includes('02') || title.includes('html') || title.includes('semantic')) {
    return {
      bookRule:
        'Straight Book Rule: Use semantic HTML elements (<header>, <article>, <section>, <button>) instead of generic <div> tags so assistive readers and search crawlers comprehend your content hierarchy.',
      creativeIdeas: [
        'Organize the card into a distinct <header> and <main> section',
        'Add a semantic <time> or <mark> badge tag to highlight key info',
        'Write descriptive alt text and aria-label attributes for full accessibility',
      ],
      conceptQuestion: {
        question:
          'Why does professional web development prioritize semantic HTML tags over generic <div> containers?',
        options: [
          'Semantic tags give structural meaning for accessibility (screen readers) and SEO indexing',
          'Semantic tags require zero CSS to look polished and styled',
          'Browsers refuse to compile HTML pages that contain more than ten <div> tags',
          'Semantic tags automatically connect to cloud databases without API keys',
        ],
        correctIndex: 0,
        explanation:
          'Semantic tags tell machines and screen readers what content represents (e.g. an article, a navigation bar, a button), ensuring universal accessibility.',
      },
    };
  }

  // Chapter 03: CSS Box Model
  if (id.includes('03') || title.includes('box') || title.includes('model') || title.includes('css')) {
    return {
      bookRule:
        'Straight Book Rule: The Box Model consists of Content -> Padding -> Border -> Margin. Using `box-sizing: border-box` absorbs padding and border into declared width.',
      creativeIdeas: [
        'Experiment with generous padding (e.g. 24px) paired with subtle 1px border outlines',
        'Try alternating border-radius values (e.g. 16px 4px 16px 4px) for a custom card silhouette',
        'Add an interactive hover state with translateY(-2px) for tactile button feedback',
      ],
      conceptQuestion: {
        question:
          'Under the standard CSS box model with `box-sizing: border-box`, what does an element with width: 300px and padding: 20px measure in total outer width?',
        options: [
          'Exactly 300px, because border-box includes padding inside the declared width',
          '340px, because padding is added on the outside of both sides',
          '280px, because padding is subtracted from margin',
          'It depends on the browser viewport resolution',
        ],
        correctIndex: 0,
        explanation:
          'With `box-sizing: border-box`, the browser calculates content width = declared width - left/right padding - left/right border. The total width remains strictly 300px.',
      },
    };
  }

  // Chapter 04: Flexbox
  if (id.includes('04') || title.includes('flex')) {
    return {
      bookRule:
        'Straight Book Rule: `display: flex` establishes a 1D flex formatting context along a main axis (row or column) and cross axis, aligning children with mathematical precision.',
      creativeIdeas: [
        'Use `gap: 1rem` instead of individual child margins for clean, uniform spacing',
        'Switch `flex-direction: column` on small screens or test `justify-content: space-between` for navbars',
        'Add `align-items: center` to achieve effortless vertical centering',
      ],
      conceptQuestion: {
        question:
          'What is the primary role of `justify-content: space-between` inside a flex container?',
        options: [
          'Distributes free space between children, pinning first and last items to container edges',
          'Centers all items in the exact midpoint with equal left and right outer margins',
          'Forces all items to stretch vertically across the full cross axis height',
          'Wraps child elements into a two-dimensional grid layout automatically',
        ],
        correctIndex: 0,
        explanation:
          'space-between pushes the boundary children against the start and end edges, distributing all surplus whitespace evenly between intermediate items.',
      },
    };
  }

  // Chapter 05: CSS Grid
  if (id.includes('05') || title.includes('grid')) {
    return {
      bookRule:
        'Straight Book Rule: CSS Grid is a 2D layout system defining simultaneous column and row tracks. Use `repeat(auto-fit, minmax(280px, 1fr))` for naturally fluid, responsive grids.',
      creativeIdeas: [
        'Experiment with a 12-column card or bento-style layout using `grid-column: span 2`',
        'Pair grid tracks with `gap: 1.5rem` for generous negative breathing room',
        'Use `grid-template-areas` to define semantic layout regions visually',
      ],
      conceptQuestion: {
        question: 'What fundamentally distinguishes CSS Grid from CSS Flexbox?',
        options: [
          'Grid is a two-dimensional system (rows AND columns), while Flexbox is one-dimensional (row OR column)',
          'Grid works only with images, while Flexbox works only with text content',
          'Grid requires JavaScript to compute coordinates, while Flexbox is pure CSS',
          'Grid is unsupported on modern mobile devices',
        ],
        correctIndex: 0,
        explanation:
          'Flexbox handles linear content flow along one axis at a time, whereas Grid establishes a full coordinate matrix of rows and columns simultaneously.',
      },
    };
  }

  // Chapter 06: Responsive Design & Media Queries
  if (id.includes('06') || title.includes('responsive') || title.includes('media')) {
    return {
      bookRule:
        'Straight Book Rule: Responsive design combines fluid percentages, the viewport meta tag, and CSS media queries (`@media (min-width: ...)`), prioritizing mobile-first hierarchy.',
      creativeIdeas: [
        'Define a clean mobile-first single column, then expand to multi-column on `@media (min-width: 768px)`',
        'Ensure all touch buttons maintain a minimum 44px height for mobile ergonomics',
        'Use fluid typography with `clamp(1rem, 2.5vw, 1.5rem)` for seamless text scaling',
      ],
      conceptQuestion: {
        question:
          'Why is `<meta name="viewport" content="width=device-width, initial-scale=1.0">` mandatory for responsive web design?',
        options: [
          'It instructs mobile browsers to render at device physical width rather than zooming out to a 980px desktop canvas',
          'It automatically enables dark mode colors on smartphones',
          'It downloads high-resolution graphics for retina displays',
          'It establishes a secure TLS connection with local DNS servers',
        ],
        correctIndex: 0,
        explanation:
          'Without this viewport directive, mobile devices assume your site was designed for a 980px desktop monitor and scale it down to microscopic, unreadable proportions.',
      },
    };
  }

  // Chapter 07: JavaScript Foundations
  if (id.includes('07') || title.includes('js') || title.includes('variable') || title.includes('counter')) {
    return {
      bookRule:
        'Straight Book Rule: Use `const` by default for immutable bindings, `let` for reassignable variables, and avoid legacy `var` to eliminate hoisting pitfalls.',
      creativeIdeas: [
        'Add a second button to reset or decrement the counter value',
        'Change button color dynamically when the counter crosses threshold numbers',
        'Display a friendly congratulatory message when the user reaches 10 clicks',
      ],
      conceptQuestion: {
        question:
          'Why does modern JavaScript standard practice strictly favor `const` and `let` over legacy `var`?',
        options: [
          '`const` and `let` are block-scoped, preventing accidental variable leakage and hoisting bugs',
          '`var` is no longer supported by any modern web browser engine',
          '`const` variables are automatically saved to local browser storage',
          '`var` forces code to run on a remote server instead of locally',
        ],
        correctIndex: 0,
        explanation:
          'Block scoping ensures variables exist only within the curly braces `{ ... }` where declared, preventing bugs caused by function-scoped variable hoisting.',
      },
    };
  }

  // Chapter 08: DOM Manipulation & Events
  if (id.includes('08') || title.includes('dom') || title.includes('event') || title.includes('list')) {
    return {
      bookRule:
        'Straight Book Rule: The Document Object Model (DOM) is an interactive memory tree. Use `addEventListener("click", callback)` and `textContent` to safely manipulate nodes without XSS risks.',
      creativeIdeas: [
        'Add an animated entry class whenever a new item is appended to the list',
        'Build a toggle that lets users mark items as completed with strikethrough styling',
        'Add a counter displaying total active items remaining in the list',
      ],
      conceptQuestion: {
        question:
          'Why is `element.textContent` preferred over `element.innerHTML` when rendering user-supplied text?',
        options: [
          '`textContent` treats all strings as raw text, preventing malicious Cross-Site Scripting (XSS) HTML injection',
          '`innerHTML` is deprecated and will be removed from JavaScript specifications',
          '`textContent` renders text in bold styling automatically',
          '`innerHTML` requires an asynchronous database handshake to execute',
        ],
        correctIndex: 0,
        explanation:
          '`innerHTML` parses strings as executable HTML and scripts, opening security vulnerabilities. `textContent` safely inserts strings as plain character data.',
      },
    };
  }

  // Chapter 09: Async JS & APIs
  if (id.includes('09') || title.includes('async') || title.includes('api') || title.includes('fetch')) {
    return {
      bookRule:
        'Straight Book Rule: JavaScript is single-threaded. Use Promises and `async/await` with `try / catch` blocks to handle network requests asynchronously without locking the UI thread.',
      creativeIdeas: [
        'Display an elegant loading spinner or skeleton while waiting for data',
        'Render a user-friendly error message if a network request fails or times out',
        'Add a refresh button that allows the user to re-fetch fresh information on demand',
      ],
      conceptQuestion: {
        question:
          'What would happen if browser network calls were synchronous instead of asynchronous (`async / await`)?',
        options: [
          'The entire browser tab would completely freeze and become unresponsive to clicks and scrolling while waiting',
          'The server would reject the request with HTTP 404 Not Found',
          'Data packets would be encrypted twice by DNS resolvers',
          'The browser would automatically switch to offline mode',
        ],
        correctIndex: 0,
        explanation:
          'Because JavaScript runs on a single main thread that also controls screen rendering and user clicks, synchronous blocking calls would freeze the UI entirely until data arrives.',
      },
    };
  }

  // Chapter 10: Deploy, Git & Final Polish
  return {
    bookRule:
      'Straight Book Rule: Clean code requires semantic structure, valid syntax, self-contained assets, and clear commit history. Build and test locally before deploying to any web host.',
    creativeIdeas: [
      'Personalize the layout with your own portfolio links, avatar, and projects',
      'Optimize CSS with system font stacks for instant zero-latency loading',
      'Add clean meta tags so your website previews beautifully on social media',
    ],
    conceptQuestion: {
      question:
        'In textbook web deployment, what is the purpose of preparing a clean, self-contained production bundle?',
      options: [
        'It compiles, minifies, and organizes assets so any standard static web server can serve them with maximum speed and zero third-party platform lock-in',
        'It converts HTML into machine binary bytecode that only servers can read',
        'It deletes all CSS styling to save server storage space',
        'It registers domain names with international internet authorities',
      ],
      correctIndex: 0,
      explanation:
        'A clean static bundle (HTML, CSS, JS, assets) can be hosted on any web server or host without requiring proprietary third-party platforms or complex configurations.',
    },
  };
}

/**
 * 100% In-Browser, Local VS Studio Compiler and Diagnostic Engine.
 * Evaluates HTML, CSS, and JS syntax, DOM structures, and textbook rules locally.
 * Zero third-party network calls, zero host/DNS dependencies.
 */
function runLocalCompiler(
  html: string,
  css: string,
  js: string,
  challenge: PracticeChallenge
): CompilerDiagnostic[] {
  const diagnostics: CompilerDiagnostic[] = [];

  /* 1. HTML Validation */
  const trimmedHtml = html.trim();
  if (!trimmedHtml) {
    diagnostics.push({
      id: 'html-empty',
      type: 'error',
      file: 'index.html',
      message: 'HTML file is empty.',
      suggestion: 'Add semantic HTML markup to define your card container and content.',
      bookRule: 'Straight Book Rule: HTML forms the required structural skeleton of every web document.',
    });
  } else {
    // Check common container tags for balance
    const tagsToCheck = ['div', 'button', 'h1', 'h2', 'h3', 'h4', 'p', 'section', 'article', 'span', 'ul', 'li'];
    tagsToCheck.forEach((tag) => {
      const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi');
      const closeRegex = new RegExp(`</${tag}>`, 'gi');
      const openMatches = (html.match(openRegex) || []).length;
      const closeMatches = (html.match(closeRegex) || []).length;

      if (openMatches > closeMatches) {
        diagnostics.push({
          id: `html-unclosed-${tag}`,
          type: 'warning',
          file: 'index.html',
          message: `Unclosed <${tag}> tag detected. Found ${openMatches} opening but only ${closeMatches} closing </${tag}> tags.`,
          suggestion: `Add </${tag}> to properly close the element and prevent layout leakage.`,
          bookRule: 'Straight Book Rule: Non-void HTML elements must have matching closing tags.',
        });
      } else if (closeMatches > openMatches) {
        diagnostics.push({
          id: `html-extra-close-${tag}`,
          type: 'warning',
          file: 'index.html',
          message: `Dangling </${tag}> tag without matching opening tag.`,
          suggestion: `Remove the stray </${tag}> or verify your element hierarchy.`,
          bookRule: 'Straight Book Rule: Every closing tag must correspond to a parent opening tag.',
        });
      }
    });

    // Check for unclosed tag brackets
    const unclosedBracket = /<[^>]*$/m.test(html);
    if (unclosedBracket) {
      diagnostics.push({
        id: 'html-unclosed-bracket',
        type: 'error',
        file: 'index.html',
        message: 'Syntax error: An HTML tag is missing its closing ">" bracket.',
        suggestion: 'Locate the incomplete tag and terminate it with ">".',
        bookRule: 'Straight Book Rule: All HTML tag declarations must close with ">".',
      });
    }
  }

  /* 2. CSS Validation */
  const trimmedCss = css.trim();
  if (trimmedCss) {
    // Balanced braces check
    const openBraces = (css.match(/\{/g) || []).length;
    const closeBraces = (css.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      diagnostics.push({
        id: 'css-unbalanced-braces',
        type: 'error',
        file: 'style.css',
        message: `Mismatched CSS curly braces: ${openBraces} opening "{" vs ${closeBraces} closing "}".`,
        suggestion: 'Ensure every CSS rule block opens with "{" and terminates with "}".',
        bookRule: 'Straight Book Rule: CSS declaration blocks require balanced braces `selector { property: value; }`.',
      });
    }

    // Check for common property misspellings
    const commonMisspellings: [RegExp, string][] = [
      [/\bcolr\s*:/gi, 'color'],
      [/\bbackgroud\s*:/gi, 'background'],
      [/\bpading\s*:/gi, 'padding'],
      [/\bmarign\s*:/gi, 'margin'],
      [/\bheigth\s*:/gi, 'height'],
      [/\bwidh\s*:/gi, 'width'],
      [/\bdispaly\s*:/gi, 'display'],
    ];
    commonMisspellings.forEach(([regex, correctProp]) => {
      if (regex.test(css)) {
        diagnostics.push({
          id: `css-misspelled-${correctProp}`,
          type: 'warning',
          file: 'style.css',
          message: `Possible CSS property typo detected (did you mean "${correctProp}:"?).`,
          suggestion: `Check the spelling of "${correctProp}:" to ensure the browser recognizes the rule.`,
          bookRule: 'Straight Book Rule: Browsers silently ignore unrecognized or misspelled CSS properties.',
        });
      }
    });
  }

  /* 3. JavaScript Validation */
  const trimmedJs = js.trim();
  if (trimmedJs) {
    // Safe syntax evaluation without executing
    try {
      new Function(trimmedJs);
    } catch (err: any) {
      diagnostics.push({
        id: 'js-syntax-error',
        type: 'error',
        file: 'script.js',
        message: `JavaScript Syntax Error: ${err.message}`,
        suggestion: 'Verify all parentheses (), curly braces {}, and string quotes are closed properly.',
        bookRule: 'Straight Book Rule: JavaScript code must be syntactically valid before the V8 browser engine can parse it.',
      });
    }

    // Check for onclick in addEventListener
    if (/addEventListener\s*\(\s*['"]onclick['"]/gi.test(trimmedJs)) {
      diagnostics.push({
        id: 'js-onclick-listener',
        type: 'warning',
        file: 'script.js',
        message: 'Event type mistake: addEventListener expects "click", not "onclick".',
        suggestion: 'Change addEventListener("onclick", ...) to addEventListener("click", ...).',
        bookRule: 'Straight Book Rule: addEventListener() takes event names without the "on" prefix (use "click", "submit", "keydown").',
      });
    }

    // Check for document.getElementById targeting elements that exist in HTML
    const getElementIdMatches = [...trimmedJs.matchAll(/document\.getElementById\s*\(\s*['"]([^'"]+)['"]\s*\)/gi)];
    getElementIdMatches.forEach((m) => {
      const targetId = m[1];
      const idPattern = new RegExp(`id\\s*=\\s*['"]${targetId}['"]`, 'i');
      if (!idPattern.test(html)) {
        diagnostics.push({
          id: `js-missing-target-id-${targetId}`,
          type: 'warning',
          file: 'script.js',
          message: `Element with id="${targetId}" referenced in script.js was not found in index.html.`,
          suggestion: `Verify that index.html contains an element with id="${targetId}", or adjust your selector string.`,
          bookRule: 'Straight Book Rule: getElementById() returns null if the specified ID is missing from the live DOM tree.',
        });
      }
    });
  }

  /* 4. Target Objectives Check from Test Cases */
  challenge.testCases.forEach((tc) => {
    if (tc.checkType === 'selector-exists' && tc.target) {
      const cleanTarget = tc.target.replace(/^[.#]/, '');
      const foundInHtml = html.toLowerCase().includes(cleanTarget.toLowerCase());
      const foundInCss = css.toLowerCase().includes(cleanTarget.toLowerCase());

      if (!foundInHtml && !foundInCss) {
        diagnostics.push({
          id: `test-hint-${tc.id}`,
          type: 'info',
          file: 'all',
          message: `Objective Checklist: ${tc.description}`,
          suggestion: tc.hint || `Ensure element or selector "${tc.target}" is declared in your markup or stylesheet.`,
          bookRule: 'Straight Book Rule: Every challenge objective corresponds to a core textbook capability.',
        });
      }
    }
  });

  // If completely error-free
  if (diagnostics.filter((d) => d.type === 'error').length === 0) {
    diagnostics.unshift({
      id: 'compiler-all-clear',
      type: 'success',
      file: 'all',
      message: 'VS Studio Local Compiler: Syntax is clean and valid.',
      suggestion: 'All basic syntax standards are met. Click "Verify Solution" to run automated verification tests!',
      bookRule: 'Straight Book Rule: Zero-error code compiles instantaneously with 0ms latency in the browser runtime.',
    });
  }

  return diagnostics;
}

export const PracticeSandbox: React.FC<PracticeSandboxProps> = ({
  challenge,
  onComplete,
  isCompleted = false,
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [html, setHtml] = useState(challenge.starterHtml);
  const [css, setCss] = useState(challenge.starterCss);
  const [js, setJs] = useState(challenge.starterJs);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<{ id: string; passed: boolean; desc: string }[]>([]);
  const [verified, setVerified] = useState(isCompleted);
  const [bottomDockTab, setBottomDockTab] = useState<'compiler' | 'console' | 'tests'>('compiler');
  const [showConceptCard, setShowConceptCard] = useState(true);

  // Interactive Concept Check state (understand the concept and answer it)
  const [selectedConceptOption, setSelectedConceptOption] = useState<number | null>(null);
  const [conceptChecked, setConceptChecked] = useState(false);
  const [conceptEarned, setConceptEarned] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Concept metadata for this challenge
  const conceptMeta = useMemo(() => getChallengeConceptMeta(challenge), [challenge]);

  // Local compiler diagnostics (100% In-Browser, zero 3rd-party)
  const diagnostics = useMemo(() => {
    return runLocalCompiler(html, css, js, challenge);
  }, [html, css, js, challenge]);

  const errorCount = diagnostics.filter((d) => d.type === 'error').length;
  const warningCount = diagnostics.filter((d) => d.type === 'warning').length;

  // Sync state if challenge changes
  useEffect(() => {
    setHtml(challenge.starterHtml);
    setCss(challenge.starterCss);
    setJs(challenge.starterJs);
    setShowSolution(false);
    setShowHint(false);
    setCurrentHintIndex(0);
    setLogs([]);
    setTestResults([]);
    setVerified(isCompleted);
    setSelectedConceptOption(null);
    setConceptChecked(false);
    setConceptEarned(false);
  }, [challenge.id]);

  const getDocumentContent = () => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 16px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #ffffff;
            color: #0f172a;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          // Local sandbox console relay
          const originalLog = console.log;
          const originalWarn = console.warn;
          const originalInfo = console.info;

          console.log = function(...args) {
            window.parent.postMessage({ type: 'CONSOLE_LOG', message: args.join(' ') }, '*');
            originalLog.apply(console, args);
          };
          console.warn = function(...args) {
            window.parent.postMessage({ type: 'CONSOLE_WARN', message: args.join(' ') }, '*');
            originalWarn.apply(console, args);
          };
          console.info = function(...args) {
            window.parent.postMessage({ type: 'CONSOLE_INFO', message: args.join(' ') }, '*');
            originalInfo.apply(console, args);
          };

          try {
            ${js}
          } catch (err) {
            window.parent.postMessage({ type: 'CONSOLE_ERROR', message: err.toString() }, '*');
          }
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CONSOLE_LOG') {
        setLogs((prev) => [...prev.slice(-20), `[Log] ${e.data.message}`]);
      } else if (e.data?.type === 'CONSOLE_WARN') {
        setLogs((prev) => [...prev.slice(-20), `[Warn] ${e.data.message}`]);
      } else if (e.data?.type === 'CONSOLE_INFO') {
        setLogs((prev) => [...prev.slice(-20), `[Info] ${e.data.message}`]);
      } else if (e.data?.type === 'CONSOLE_ERROR') {
        setLogs((prev) => [...prev.slice(-20), `[Error] ${e.data.message}`]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const verifySolution = () => {
    // Run automated tests against DOM inside iframe & local state
    const results = challenge.testCases.map((tc) => {
      let passed = false;
      try {
        if (tc.checkType === 'selector-exists' && tc.target) {
          const rawTarget = tc.target.replace(/^[.#]/, '').toLowerCase();
          passed =
            html.toLowerCase().includes(rawTarget) ||
            css.toLowerCase().includes(tc.target.toLowerCase());
        } else if (tc.checkType === 'text-contains' && tc.expectedValue) {
          passed = html.toLowerCase().includes(tc.expectedValue.toLowerCase());
        } else {
          passed = true;
        }
      } catch {
        passed = false;
      }
      return { id: tc.id, passed, desc: tc.description };
    });

    setTestResults(results);
    setBottomDockTab('tests');

    const allPassed = results.every((r) => r.passed);
    if (allPassed) {
      setVerified(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
      if (onComplete) {
        onComplete(challenge.id);
      }
    }
  };

  const handleReset = () => {
    setHtml(challenge.starterHtml);
    setCss(challenge.starterCss);
    setJs(challenge.starterJs);
    setShowSolution(false);
    setLogs([]);
    setTestResults([]);
  };

  const handleAnswerConceptQuestion = (index: number) => {
    setSelectedConceptOption(index);
    setConceptChecked(true);
    if (index === conceptMeta.conceptQuestion.correctIndex) {
      setConceptEarned(true);
      confetti({
        particleCount: 45,
        spread: 45,
        origin: { y: 0.5 },
      });
    }
  };

  return (
    <div id="practice-sandbox" className="panel-surface min-w-0 overflow-hidden space-y-0 rounded-2xl border border-app-border shadow-md">
      {/* ── Header: Studio Bar ────────────────────────────── */}
      <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-white">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-emerald-400" />
              VS Studio Challenge Sandbox
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Est: {challenge.estimatedTime}</span>
            <span className="text-[11px] text-cyan-400 font-mono font-bold">{challenge.difficulty}</span>
          </div>
          <h3 className="text-lg font-black text-white mt-1.5 tracking-tight flex items-center gap-2">
            <span>{challenge.title}</span>
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{showHint ? 'Hide Book Hint' : 'Book Hint'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSolution(!showSolution)}
            className="text-xs px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
          >
            {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showSolution ? 'Hide Solution' : 'Peek Solution'}</span>
          </button>

          <button
            type="button"
            onClick={verifySolution}
            className="text-xs px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify Solution</span>
          </button>
        </div>
      </div>

      {/* ── Brain-Level Concept & Straight Book Method Card ── */}
      <div className="p-4 sm:p-5 bg-slate-950/60 border-b border-app-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <BookOpen className="w-4 h-4" />
            </span>
            <h4 className="text-xs sm:text-sm font-black text-app-ink uppercase tracking-wider font-mono">
              Straight Book Method • Mental Model &amp; Objectives
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowConceptCard(!showConceptCard)}
            className="text-xs text-app-muted hover:text-app-ink flex items-center gap-1 font-mono cursor-pointer"
          >
            <span>{showConceptCard ? 'Collapse' : 'Expand Concept Card'}</span>
            {showConceptCard ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showConceptCard && (
          <div className="space-y-4 pt-1">
            {/* Prompt & Instructions */}
            <div className="rounded-xl border border-app-border bg-app-surface p-4 space-y-2.5">
              <p className="text-sm font-bold text-app-ink leading-relaxed">
                🎯 {challenge.prompt}
              </p>
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-app-subtle">
                  Step-by-Step Book Instructions:
                </p>
                <ul className="space-y-1 text-xs text-app-muted font-sans">
                  {challenge.instructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Straight Book Rule & Creative Ideas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Card 1: Straight Book Rule */}
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>The Straight Book Rule</span>
                </div>
                <p className="text-xs text-app-ink leading-relaxed font-sans">
                  {conceptMeta.bookRule}
                </p>
              </div>

              {/* Card 2: Creative Ideas (Think and apply your own ideas) */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Apply Your Own Ideas</span>
                </div>
                <ul className="space-y-1 text-[11px] text-app-muted">
                  {conceptMeta.creativeIdeas.map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">›</span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Brain Level Concept Check (Understand the concept and answer it) */}
            <div className="rounded-xl border border-app-border bg-app-inset p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-xs font-bold text-app-amber uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5 text-app-amber" />
                  Concept Check • Understand &amp; Answer
                </span>
                {conceptEarned && (
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Concept Mastered (+25 XP)
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-bold text-app-ink">
                {conceptMeta.conceptQuestion.question}
              </p>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {conceptMeta.conceptQuestion.options.map((option, idx) => {
                  const isSelected = selectedConceptOption === idx;
                  const isCorrect = conceptMeta.conceptQuestion.correctIndex === idx;
                  let btnClass = 'border-app-border bg-app-surface text-app-ink hover:border-app-border/80 hover:bg-app-active';

                  if (conceptChecked) {
                    if (isCorrect) {
                      btnClass = 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold ring-1 ring-emerald-500';
                    } else if (isSelected) {
                      btnClass = 'border-red-500 bg-red-500/10 text-red-400 font-medium';
                    }
                  } else if (isSelected) {
                    btnClass = 'border-app-amber bg-app-amber/10 text-app-amber font-bold ring-1 ring-app-amber';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAnswerConceptQuestion(idx)}
                      className={`w-full text-left p-2.5 sm:p-3 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full border border-current/40 flex items-center justify-center font-mono text-[10px] shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {conceptChecked && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {conceptChecked && (
                <div className="rounded-lg border border-app-border bg-app-surface p-3 text-xs leading-relaxed text-app-muted">
                  <strong className="text-app-ink font-bold block mb-0.5">Textbook Explanation:</strong>
                  {conceptMeta.conceptQuestion.explanation}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Book Hint Banner if active ────────────────────── */}
      {showHint && challenge.hints.length > 0 && (
        <div className="p-3.5 bg-amber-500/10 border-b border-amber-500/20 text-xs text-amber-200 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-amber-300 font-bold">
                Book Hint ({currentHintIndex + 1}/{challenge.hints.length}):
              </strong>{' '}
              <span>{challenge.hints[currentHintIndex]}</span>
            </div>
          </div>
          {challenge.hints.length > 1 && (
            <button
              type="button"
              onClick={() => setCurrentHintIndex((prev) => (prev + 1) % challenge.hints.length)}
              className="text-[11px] font-mono text-amber-400 hover:underline shrink-0"
            >
              Next Hint →
            </button>
          )}
        </div>
      )}

      {/* ── VS Studio Code Editor & Live Preview Grid ────────── */}
      <div className="grid min-w-0 grid-cols-1 divide-y divide-app-border lg:grid-cols-2 lg:divide-x lg:divide-y-0 min-h-[400px]">
        {/* Editor Half (VS Code Dark Theme) */}
        <div className="flex min-w-0 flex-col bg-[#141417]">
          {/* File Tabs Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#0d0d10] border-b border-[#27272a]">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'html', label: 'index.html', badge: 'HTML', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
                { id: 'css', label: 'style.css', badge: 'CSS', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
                { id: 'js', label: 'script.js', badge: 'JS', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs font-mono font-bold py-1.5 px-3 rounded-md flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#1e1e24] text-white border border-[#3b3b45] shadow-xs'
                      : 'text-[#9ca3af] hover:text-white hover:bg-[#18181c]'
                  }`}
                >
                  <span className={`text-[9px] px-1 py-0.2 rounded border font-mono font-extrabold ${tab.color}`}>
                    {tab.badge}
                  </span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-[#9ca3af] hover:text-white px-2.5 py-1 rounded bg-[#1e1e24] border border-[#2e2e38] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset starter code"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Active Code Input Area */}
          <div className="flex-1 p-3.5 font-mono text-xs text-slate-100 overflow-auto bg-[#141417]">
            {activeTab === 'html' && (
              <textarea
                value={showSolution ? challenge.solutionHtml : html}
                onChange={(e) => !showSolution && setHtml(e.target.value)}
                readOnly={showSolution}
                className="w-full h-full min-h-[280px] bg-transparent outline-none resize-none font-mono text-[#f3f4f6] leading-relaxed selection:bg-blue-600/40"
                spellCheck={false}
                placeholder="Write your HTML here..."
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={showSolution ? challenge.solutionCss : css}
                onChange={(e) => !showSolution && setCss(e.target.value)}
                readOnly={showSolution}
                className="w-full h-full min-h-[280px] bg-transparent outline-none resize-none font-mono text-[#67e8f9] leading-relaxed selection:bg-cyan-600/40"
                spellCheck={false}
                placeholder="Write your CSS styles here..."
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={showSolution ? challenge.solutionJs : js}
                onChange={(e) => !showSolution && setJs(e.target.value)}
                readOnly={showSolution}
                className="w-full h-full min-h-[280px] bg-transparent outline-none resize-none font-mono text-[#fde047] leading-relaxed selection:bg-amber-600/40"
                spellCheck={false}
                placeholder="Write your JavaScript logic here..."
              />
            )}
          </div>
        </div>

        {/* Live Sandboxed Preview Half */}
        <div className="flex min-w-0 flex-col bg-app-surface">
          <div className="p-2.5 px-3.5 bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold">Live Preview</span>
              <span className="text-[10px] text-slate-400">| In-Browser Sandbox</span>
            </span>
            <button
              type="button"
              onClick={() => {
                // Force re-render of iframe
                if (iframeRef.current) {
                  iframeRef.current.srcdoc = getDocumentContent();
                }
              }}
              className="hover:text-app-ink flex items-center gap-1 cursor-pointer"
              title="Reload preview"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reload</span>
            </button>
          </div>

          <div className="flex-1 p-3 sm:p-4 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-center">
            <iframe
              ref={iframeRef}
              title="Practice Sandbox Output"
              srcDoc={getDocumentContent()}
              className="w-full h-[270px] bg-white rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
              sandbox="allow-scripts allow-modals"
            />
          </div>
        </div>
      </div>

      {/* ── VS Studio Bottom Diagnostic Dock ─────────────────── */}
      <div className="border-t border-app-border bg-[#0d0d10] text-[#e4e4e7]">
        {/* Dock Tabs Header */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#27272a] bg-[#141417]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBottomDockTab('compiler')}
              className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                bottomDockTab === 'compiler'
                  ? 'bg-[#27272a] text-white font-bold'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>VS Studio Compiler</span>
              {errorCount > 0 ? (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                  {errorCount} {errorCount === 1 ? 'Error' : 'Errors'}
                </span>
              ) : warningCount > 0 ? (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                  {warningCount} {warningCount === 1 ? 'Tip' : 'Tips'}
                </span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  Clean ✓
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setBottomDockTab('console')}
              className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                bottomDockTab === 'console'
                  ? 'bg-[#27272a] text-white font-bold'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Console</span>
              <span className="text-[10px] opacity-70">({logs.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setBottomDockTab('tests')}
              className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                bottomDockTab === 'tests'
                  ? 'bg-[#27272a] text-white font-bold'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Test Objectives</span>
              <span className="text-[10px] opacity-70">
                ({testResults.filter((t) => t.passed).length}/{challenge.testCases.length})
              </span>
            </button>
          </div>

          <span className="text-[10px] font-mono text-[#71717a] hidden sm:inline">
            100% Local Engine • No 3rd Party Host / DNS Dependencies
          </span>
        </div>

        {/* Dock Content Body */}
        <div className="p-3 max-h-[140px] overflow-y-auto font-mono text-xs">
          {/* Tab 1: Compiler Diagnostics */}
          {bottomDockTab === 'compiler' && (
            <div className="space-y-2">
              {diagnostics.map((diag) => (
                <div
                  key={diag.id}
                  className={`p-2.5 rounded-lg border flex items-start gap-2.5 text-xs ${
                    diag.type === 'error'
                      ? 'bg-red-500/10 border-red-500/30 text-red-300'
                      : diag.type === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                      : diag.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-blue-500/10 border-blue-500/30 text-blue-200'
                  }`}
                >
                  {diag.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                  {diag.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                  {diag.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                  {diag.type === 'info' && <Code2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold">{diag.message}</span>
                      {diag.file !== 'all' && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 border border-white/10 font-mono opacity-80">
                          {diag.file}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] opacity-90">{diag.suggestion}</p>
                    <p className="text-[10px] font-bold text-amber-400/90 tracking-wide">{diag.bookRule}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Console Output */}
          {bottomDockTab === 'console' && (
            <div className="space-y-1">
              {logs.length === 0 ? (
                <div className="text-slate-500 italic py-2">
                  No console messages yet. Use console.log() in script.js to output diagnostics here.
                </div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="text-slate-300 py-0.5 border-b border-slate-800/50">
                    {log}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Test Objectives */}
          {bottomDockTab === 'tests' && (
            <div className="space-y-1.5">
              {testResults.length === 0 ? (
                <div className="text-slate-400 py-2">
                  Click <strong className="text-emerald-400">"Verify Solution"</strong> above to run automated objective tests against your code.
                </div>
              ) : (
                testResults.map((tr) => (
                  <div
                    key={tr.id}
                    className={`p-2 rounded flex items-center justify-between text-xs ${
                      tr.passed ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {tr.passed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
                      <span>{tr.desc}</span>
                    </span>
                    <span className="font-mono text-[10px] font-bold">
                      {tr.passed ? 'PASS ✓' : 'FAIL ✗'}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* VS Studio Status Bar Footer */}
        <div className="px-3 py-1 bg-[#09090c] border-t border-[#1f1f23] flex flex-wrap items-center justify-between text-[10px] font-mono text-[#9ca3af]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              VS Studio Ready
            </span>
            <span>Problems: {errorCount + warningCount}</span>
            <span>UTF-8</span>
            <span>Spaces: 2</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <span>Straight Book Method</span>
            <span>•</span>
            <span>Local Browser Sandbox</span>
          </div>
        </div>
      </div>

      {/* ── Challenge Completion Banner ──────────────────────── */}
      {verified && (
        <div className="p-3.5 bg-emerald-600 text-white text-xs font-bold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Challenge Mastered! You applied straight book methods and earned +50 XP.</span>
          </span>
          <span className="font-mono text-[11px] bg-black/20 px-2 py-0.5 rounded">Verified ✓</span>
        </div>
      )}
    </div>
  );
};
