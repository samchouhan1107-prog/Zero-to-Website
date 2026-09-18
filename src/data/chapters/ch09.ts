import { Chapter } from '../../utils/types';

export const chapter09: Chapter = {
  id: 'ch-09',
  number: '09',
  badge: '09',
  slug: 'modern-tooling-frameworks',
  title: 'Modern Tooling & Component Frameworks',
  subtitle: 'NPM, Vite, Bundling, React JSX, Props, useState & useEffect Mental Models',
  description: 'Step into the modern web ecosystem. Master NPM and package.json dependency trees, fast module bundlers like Vite, React component architecture, JSX syntax rules, unidirectional data flow with Props, reactive state management with useState, and lifecycle side effects with useEffect.',
  estimatedHours: '5 hrs',
  accentColor: 'sky',
  iconName: 'Code',
  totalLessons: 6,
  lessons: [
    {
      id: 'ch-09-l-01',
      chapterId: 'ch-09',
      number: '9.1',
      slug: 'npm-dependencies-scripts',
      title: 'NPM, package.json & Dependency Management',
      tagline: 'Understand semantic versioning (SemVer), dependencies vs devDependencies, and custom build scripts',
      durationMinutes: 25,
      learningObjectives: [
        'Understand package.json as the project manifest and configuration hub',
        'Learn the difference between production dependencies and devDependencies (-D)',
        'Master Semantic Versioning (SemVer: MAJOR.MINOR.PATCH) and the caret (^) vs tilde (~)',
        'Run and configure custom npm scripts (dev, build, test, lint)'
      ],
      theorySections: [
        {
          heading: '1. What is package.json?',
          content: 'In modern JavaScript and TypeScript development, package.json is the heart of every application. It defines project metadata, specifies exact third-party package dependencies, and configures CLI executable commands.',
          bulletPoints: [
            'dependencies: Packages required in production (e.g. react, express, lucide-react)',
            'devDependencies: Packages needed only during local development and building (e.g. vite, typescript, eslint)',
            'package-lock.json: Freezes exact dependency versions and checksum hashes to guarantee identical installs across team members'
          ]
        },
        {
          heading: '2. Demystifying Semantic Versioning (SemVer)',
          content: 'npm uses SemVer to describe version compatibility: MAJOR . MINOR . PATCH (e.g. 18.2.0).',
          bulletPoints: [
            'MAJOR (18.x.x): Breaking changes that require code updates',
            'MINOR (x.2.x): Backward-compatible new features',
            'PATCH (x.x.4): Backward-compatible bug fixes',
            'Caret (^1.2.0): Allows updates to newer minor/patch versions (< 2.0.0)',
            'Tilde (~1.2.0): Allows updates to newer patch versions only (< 1.3.0)'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden Rule: Always commit package-lock.json to Git so your teammates and CI/CD pipelines install identical package versions!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Blueprint and the Construction Scaffolding',
        concept: 'dependencies vs devDependencies',
        story: 'When building a modern skyscraper, steel beams, glass windows, and elevator motors remain in the finished tower permanently (dependencies). The cranes, scaffolding platforms, and safety helmets used by the construction crew are removed once the building opens to the public (devDependencies). You need both to build, but only the building materials go to production.',
        moral: 'Keep production bundles lightweight by placing developer tools into devDependencies.',
        icon: 'Box'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Anatomy of a Professional package.json',
        description: 'Notice the clean separation between scripts, runtime dependencies, and devDependencies.',
        html: `<div class="npm-card">
  <h4>Project Manifest Inspector</h4>
  <pre id="manifestViewer">Loading package.json...</pre>
</div>`,
        css: `.npm-card {
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
  overflow-x: auto;
}`,
        js: `const sampleManifest = {
  name: "learn-web-dev-app",
  version: "1.0.0",
  type: "module",
  scripts: {
    dev: "vite --host 0.0.0.0 --port 3000",
    build: "vite build",
    preview: "vite preview"
  },
  dependencies: {
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0"
  },
  devDependencies: {
    typescript: "^5.3.3",
    vite: "^5.1.4"
  }
};

const pre = document.getElementById("manifestViewer");
if (pre) pre.textContent = JSON.stringify(sampleManifest, null, 2);`,
        breakdown: [
          {
            lineRange: 'Line 4-8',
            title: 'CLI Scripts Block',
            explanation: 'Executable commands triggered via "npm run <script>".',
            highlightTokens: ['dev', 'build']
          },
          {
            lineRange: 'Line 9-17',
            title: 'dependencies vs devDependencies',
            explanation: 'Separates production runtime code from local build tools.',
            highlightTokens: ['dependencies', 'devDependencies']
          }
        ]
      },
      video: {
        title: 'NPM, package.json, SemVer, and Lockfiles Explained',
        duration: '15:20',
        description: 'Complete breakdown of node_modules, resolving dependency conflicts, understanding SemVer symbols (^ and ~), and npm scripts.',
        keyPoints: [
          'Anatomy of package.json',
          'Why package-lock.json is mandatory',
          'SemVer: Major, Minor, Patch rules',
          'npm install vs npm ci'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'What is NPM', description: 'Package registry' },
          { time: '05:00', seconds: 300, title: 'package.json Anatomy', description: 'Scripts and deps' },
          { time: '10:15', seconds: 615, title: 'SemVer & Lockfiles', description: 'Version stability' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Mastering npm is your gateway to utilizing the largest software registry in human history.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-09-01',
        title: 'Identify Correct SemVer Update Range',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Given a dependency version "^2.4.1", write a short helper function getUpperLimit() that returns "< 3.0.0" and displays it in #semverOutput.',
        instructions: [
          'Declare const getUpperLimit = () => "< 3.0.0";',
          'Write the string to #semverOutput'
        ],
        starterHtml: `<div class="semver-card">
  <p>Caret Range for ^2.4.1: <strong id="semverOutput">--</strong></p>
</div>`,
        starterCss: `.semver-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Output SemVer range
`,
        solutionHtml: `<div class="semver-card">
  <p>Caret Range for ^2.4.1: <strong id="semverOutput">--</strong></p>
</div>`,
        solutionCss: `.semver-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `const out = document.getElementById("semverOutput");
if (out) out.textContent = "< 3.0.0";`,
        hints: [
          'The caret (^) allows updates up to the next major breaking version (< 3.0.0).'
        ],
        testCases: [
          {
            id: 'tc-09-1a',
            description: 'semverOutput populated',
            hint: 'Set text to "< 3.0.0" on #semverOutput',
            checkType: 'selector-exists',
            target: '#semverOutput'
          }
        ],
        conceptQuestion: {
          question: 'Which flag should you pass to npm install to save a package into devDependencies?',
          options: ['-D (or --save-dev)', '-P', '--prod', '-G'],
          correctIndex: 0,
          explanation: 'The -D or --save-dev flag instructs npm to install and record the package inside the devDependencies section of package.json.'
        }
      },
      quiz: [
        {
          id: 'q-09-1',
          question: 'What type of version change does the middle number in 3.4.1 represent according to SemVer?',
          options: ['MINOR version (new backward-compatible features)', 'MAJOR version', 'PATCH version', 'BUILD number'],
          correctIndex: 0,
          explanation: 'In SemVer (MAJOR.MINOR.PATCH), the middle digit represents MINOR releases with new backward-compatible capabilities.'
        }
      ],
      summary: [
        'package.json is the central project manifest for dependencies and scripts.',
        'devDependencies hold build tools; dependencies hold runtime libraries.',
        'SemVer communicates breaking changes (Major), features (Minor), and fixes (Patch).',
        'package-lock.json ensures reproducible and deterministic installs across machines.'
      ],
      relatedTopics: [
        {
          title: 'Build Tools & Bundlers: Vite vs Webpack',
          chapterNumber: '09',
          lessonId: 'ch-09-l-02',
          context: 'Understand how modern bundlers like Vite compile TypeScript and JSX at lightning speed.'
        }
      ]
    },
    {
      id: 'ch-09-l-02',
      chapterId: 'ch-09',
      number: '9.2',
      slug: 'build-tools-vite-bundling',
      title: 'Build Tools: Vite vs Webpack & Bundling Concepts',
      tagline: 'Understand Native ES Modules, Rollup/esbuild, bundling, tree-shaking, and why Vite starts instantly',
      durationMinutes: 25,
      learningObjectives: [
        'Understand what a module bundler does: resolving import trees, transpiling, and packaging assets',
        'Learn why legacy bundlers (Webpack) slow down on large codebases with heavy bundle rebuilds',
        'Master how Vite uses Native ES Modules (ESM) in development and Rollup/esbuild for production',
        'Understand tree-shaking and asset minification for minimal production bundle payloads'
      ],
      theorySections: [
        {
          heading: '1. What Problem Do Bundlers Solve?',
          content: 'Modern web apps consist of hundreds of TypeScript files, CSS stylesheets, images, and npm packages. Browsers cannot efficiently make 800 individual HTTP requests for every tiny file on initial load. Bundlers analyze your import dependency graph and combine them into optimized, minified production files.',
          bulletPoints: [
            'Transpilation: Converts modern TypeScript and JSX into browser-compatible JavaScript',
            'Minification: Strips whitespace, comments, and shortens variable names to minimize bytes',
            'Tree-Shaking: Automatically removes unused functions and modules from the production bundle'
          ]
        },
        {
          heading: '2. The Vite Revolution',
          content: 'Legacy bundlers like Webpack bundled your entire application before starting the dev server, resulting in 30-second start times on large projects. Vite uses native browser ES Modules during development.',
          bulletPoints: [
            'Development: Vite serves source files over native ESM without bundling. The browser requests files on demand as needed',
            'Pre-Bundling: Uses esbuild (written in Go) to pre-bundle npm dependencies 10-100x faster than JavaScript bundlers',
            'Production: Compiles with Rollup into ultra-optimized static chunks for global CDN distribution'
          ],
          callout: {
            type: 'key-rule',
            text: 'Vite Architecture: Dev server starts instantly because it does not bundle source code upfront; the browser loads native ESM modules on demand.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Prepared Banquet vs The Live Sushi Bar',
        concept: 'Webpack vs Vite Dev Architecture',
        story: 'Webpack is a traditional catering banquet: the chefs cook all 50 dishes for all 200 guests before letting anyone through the front door (long server startup). Vite is an agile sushi conveyor bar: the chef opens the door immediately, and prepares each plate on demand as customers point to what they want to eat right now.',
        moral: 'On-demand serving provides an instant development feedback loop.',
        icon: 'Zap'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Vite Configuration File (vite.config.ts)',
        description: 'Clean Vite configuration with React plugin and server host/port binding.',
        html: `<div class="vite-card">
  <h4>Vite Configuration</h4>
  <pre id="viteConfigViewer">Loading vite.config.ts...</pre>
</div>`,
        css: `.vite-card {
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
}`,
        js: `const sampleViteConfig = \`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});\`;

const el = document.getElementById("viteConfigViewer");
if (el) el.textContent = sampleViteConfig;`,
        breakdown: [
          {
            lineRange: 'Line 5',
            title: 'React Plugin',
            explanation: 'Enables Fast Refresh and JSX transformation.',
            highlightTokens: ['plugins: [react()]']
          },
          {
            lineRange: 'Line 6-9',
            title: 'Server Ingress Configuration',
            explanation: 'Binds to 0.0.0.0 and port 3000 for standard cloud container hosting.',
            highlightTokens: ['host: "0.0.0.0"', 'port: 3000']
          }
        ]
      },
      video: {
        title: 'How Vite Works: Native ESM, esbuild, and Production Bundling',
        duration: '14:30',
        description: 'Under the hood of modern build tools: why Vite replaced Webpack, how esbuild achieves speed in Go, and production tree-shaking.',
        keyPoints: [
          'Native ESM in development',
          'esbuild pre-bundling speed',
          'Production compilation with Rollup',
          'Hot Module Replacement mechanics'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Why Bundling Matters', description: 'HTTP/1 vs HTTP/2' },
          { time: '04:30', seconds: 270, title: 'Vite Architecture', description: 'Native ESM server' },
          { time: '09:15', seconds: 555, title: 'Production Builds', description: 'Rollup & Tree-shaking' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Vite revolutionized web development by giving engineers instant server startup and instantaneous file updates.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-09-02',
        title: 'Verify Build Output Directory',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'In standard Vite projects, production builds are output to a folder named "dist". Set the textContent of #outDirValue to "dist".',
        instructions: [
          'Select #outDirValue',
          'Set textContent to "dist"'
        ],
        starterHtml: `<div class="build-card">
  <p>Vite Default Output Directory: <strong id="outDirValue">--</strong></p>
</div>`,
        starterCss: `.build-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Set output directory name
`,
        solutionHtml: `<div class="build-card">
  <p>Vite Default Output Directory: <strong id="outDirValue">--</strong></p>
</div>`,
        solutionCss: `.build-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `const out = document.getElementById("outDirValue");
if (out) out.textContent = "dist";`,
        hints: [
          'Assign out.textContent = "dist";'
        ],
        testCases: [
          {
            id: 'tc-09-2a',
            description: 'outDirValue has dist text',
            hint: 'Set text to "dist" on #outDirValue',
            checkType: 'selector-exists',
            target: '#outDirValue'
          }
        ],
        conceptQuestion: {
          question: 'Why does the Vite development server start virtually instantaneously compared to legacy Webpack?',
          options: [
            'Vite serves source code over native browser ES Modules without bundling the entire app upfront',
            'Vite skips compiling TypeScript',
            'Vite runs on WebAssembly exclusively',
            'Vite disables CSS styles'
          ],
          correctIndex: 0,
          explanation: 'Vite avoids upfront bundling in development by leveraging native browser ES modules (ESM), serving files strictly on demand as the browser requests them.'
        }
      },
      quiz: [
        {
          id: 'q-09-2',
          question: 'What is the term for the process where modern bundlers automatically remove unused code from the final production bundle?',
          options: ['Tree-shaking', 'Code splitting', 'Transpilation', 'Hot reloading'],
          correctIndex: 0,
          explanation: 'Tree-shaking relies on static ES Module syntax (import/export) to detect and eliminate dead code that is never invoked.'
        }
      ],
      summary: [
        'Bundlers compile, transpile, minify, and bundle source files for production.',
        'Vite uses Native ES Modules in development and Rollup for production.',
        'esbuild compiles TypeScript and dependencies up to 100x faster than older JS compilers.',
        'Tree-shaking strips out unused library code to produce minimal production payloads.'
      ],
      relatedTopics: [
        {
          title: 'Introduction to React & JSX',
          chapterNumber: '09',
          lessonId: 'ch-09-l-03',
          context: 'Build declarative, reusable UI components using React and JSX.'
        }
      ]
    },
    {
      id: 'ch-09-l-03',
      chapterId: 'ch-09',
      number: '9.3',
      slug: 'intro-to-react-jsx-props',
      title: 'Introduction to React, JSX & Props',
      tagline: 'Write declarative components with JSX, understand Virtual DOM, and pass unidirectional Props',
      durationMinutes: 30,
      learningObjectives: [
        'Understand declarative UI programming vs imperative DOM manipulation',
        'Learn JSX rules: single parent wrapper, className instead of class, and closing all tags',
        'Pass data into child components using Props and children',
        'Destructure props with default fallback values'
      ],
      theorySections: [
        {
          heading: '1. Declarative vs Imperative UI',
          content: 'In imperative DOM manipulation (vanilla JS), you tell the browser every single step: find the element, change its class, create an li, append it to the ul. In declarative React, you declare what the UI should look like for a given state, and React handles the DOM updates automatically.',
          bulletPoints: [
            'Declarative: return <UserCard name={user.name} active={user.isOnline} />',
            'Virtual DOM: React keeps a lightweight representation of the UI in memory, calculating minimal diffs before touching the real browser DOM'
          ]
        },
        {
          heading: '2. JSX Rules & Passing Props',
          content: 'JSX is a syntax extension for JavaScript that looks like HTML but possesses the full power of JavaScript expressions inside curly braces {}.',
          bulletPoints: [
            'className: HTML "class" is reserved in JS, so JSX uses className',
            'Expressions: Any JavaScript expression (variable, ternary, function call) can be embedded inside {expression}',
            'Unidirectional Props: Data flows in one direction from parent to child via props (read-only in child)'
          ],
          callout: {
            type: 'key-rule',
            text: 'JSX Rule: Every component must return a single root element (or a React Fragment <>...</>) and all tags must be closed.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Custom Ordered Food Box',
        concept: 'React Components and Props',
        story: 'A bakery has a standard recipe for cupcakes (the Component). When a customer orders, they specify custom options: vanilla frosting, rainbow sprinkles, and a customized birthday candle (the Props). The bakery does not reinvent the cupcake oven; they use the same recipe and pass your custom toppings into the mold. The resulting cupcake is uniquely yours.',
        moral: 'Components are reusable recipes; props are custom ingredients.',
        icon: 'Cpu'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Declarative React Component with Typed Props',
        description: 'A reusable MetricCard component accepting label, value, and trend props.',
        html: `<div class="react-demo-card">
  <div id="reactMount">Rendering simulated React component...</div>
</div>`,
        css: `.react-demo-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}`,
        js: `// TypeScript interface for Props
interface MetricCardProps {
  label: string;
  value: string;
  isPositive?: boolean;
}

// React Functional Component
function MetricCard({ label, value, isPositive = true }: MetricCardProps) {
  const trendColor = isPositive ? "#059669" : "#dc2626";
  const trendIcon = isPositive ? "▲" : "▼";

  return \`
    <div style="border: 1px solid #e2e8f0; padding: 1rem; border-radius: 8px;">
      <span style="font-size: 0.85rem; color: #64748b;">\${label}</span>
      <div style="font-size: 1.5rem; font-weight: bold; color: #0f172a;">\${value}</div>
      <span style="color: \${trendColor}; font-weight: 600; font-size: 0.85rem;">
        \${trendIcon} \${isPositive ? "+12% this week" : "-4% this week"}
      </span>
    </div>
  \`;
}

const mount = document.getElementById("reactMount");
if (mount) {
  mount.innerHTML = MetricCard({ label: "Weekly Active Learners", value: "14,820", isPositive: true });
}`,
        breakdown: [
          {
            lineRange: 'Line 2-6',
            title: 'TypeScript Props Interface',
            explanation: 'Defines the exact shape and types of props the component accepts.',
            highlightTokens: ['interface MetricCardProps']
          },
          {
            lineRange: 'Line 9',
            title: 'Destructuring with Defaults',
            explanation: 'Unpacks props cleanly with fallback value isPositive = true.',
            highlightTokens: ['MetricCard({ label, value, isPositive = true }']
          }
        ]
      },
      video: {
        title: 'React Fundamentals: JSX, Functional Components, and Props',
        duration: '16:45',
        description: 'The shift from imperative DOM to declarative React, mastering JSX syntax quirks, and passing props down component trees.',
        keyPoints: [
          'Declarative vs Imperative UI',
          'JSX rules and {expressions}',
          'Props as immutable configuration',
          'TypeScript interfaces for Props'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Why React', description: 'Declarative components' },
          { time: '05:30', seconds: 330, title: 'JSX Syntax', description: 'HTML inside JS' },
          { time: '11:00', seconds: 660, title: 'Passing Props', description: 'Component configuration' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'React components allow you to decompose complex user interfaces into small, testable, reusable units.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-09-03',
        title: 'Render Component with Formatted Props',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create a function UserPill(props: { name: string; role: string }) that returns `<div class="user-pill">${props.name} - ${props.role}</div>`. Render it with name: "Tara Chen" and role: "Senior Dev" into #pillMount.',
        instructions: [
          'Define function UserPill(props: { name: string; role: string })',
          'Return `<div class="user-pill">${props.name} - ${props.role}</div>`',
          'Render into #pillMount'
        ],
        starterHtml: `<div class="pill-demo">
  <div id="pillMount"></div>
</div>`,
        starterCss: `.pill-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.user-pill {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 9999px;
  font-weight: 600;
}`,
        starterJs: `// Implement UserPill component and mount it
`,
        solutionHtml: `<div class="pill-demo">
  <div id="pillMount"></div>
</div>`,
        solutionCss: `.pill-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.user-pill {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 9999px;
  font-weight: 600;
}`,
        solutionJs: `function UserPill(props: { name: string; role: string }) {
  return \`<div class="user-pill">\${props.name} - \${props.role}</div>\`;
}

const mount = document.getElementById("pillMount");
if (mount) {
  mount.innerHTML = UserPill({ name: "Tara Chen", role: "Senior Dev" });
}`,
        hints: [
          'Return `<div class="user-pill">${props.name} - ${props.role}</div>`;',
          'mount.innerHTML = UserPill({ name: "Tara Chen", role: "Senior Dev" });'
        ],
        testCases: [
          {
            id: 'tc-09-3a',
            description: 'user-pill element rendered in pillMount',
            hint: 'Render user-pill into #pillMount',
            checkType: 'selector-exists',
            target: '#pillMount .user-pill'
          }
        ],
        conceptQuestion: {
          question: 'Why are React component Props strictly read-only (immutable) inside the receiving child component?',
          options: [
            'To enforce predictable, unidirectional data flow from parent to child and prevent cascading side-effect bugs',
            'Because JavaScript freezes all objects',
            'To make styling simpler',
            'Props can actually be mutated at any time'
          ],
          correctIndex: 0,
          explanation: 'Unidirectional data flow guarantees that parent components maintain authoritative ownership of state, preventing child components from secretly corrupting parent data.'
        }
      },
      quiz: [
        {
          id: 'q-09-3',
          question: 'What HTML attribute must be written as className in React JSX?',
          options: ['class', 'style', 'id', 'for'],
          correctIndex: 0,
          explanation: 'Because "class" is a reserved keyword in JavaScript for defining classes, JSX uses "className" to assign CSS classes.'
        }
      ],
      summary: [
        'React uses declarative component architecture instead of imperative DOM scripting.',
        'JSX combines HTML structure with JavaScript expressions inside curly braces {}.',
        'Props pass data unidirectionally from parent to child components.',
        'TypeScript interfaces ensure strict type safety for all component props.'
      ],
      relatedTopics: [
        {
          title: 'State Management with useState',
          chapterNumber: '09',
          lessonId: 'ch-09-l-04',
          context: 'Make components interactive by managing reactive state.'
        }
      ]
    },
    {
      id: 'ch-09-l-04',
      chapterId: 'ch-09',
      number: '9.4',
      slug: 'react-state-usestate',
      title: 'State Management: The useState Hook',
      tagline: 'Master reactive component state, the useState setter pattern, and batching re-renders',
      durationMinutes: 30,
      learningObjectives: [
        'Understand what state is: memory that persists across component re-renders',
        'Learn the useState hook syntax: const [count, setCount] = useState(0)',
        'Understand why you must never mutate state directly (e.g. count++ is forbidden)',
        'Use functional state updater callbacks: setCount(prev => prev + 1)'
      ],
      theorySections: [
        {
          heading: '1. What is Component State?',
          content: 'While Props allow a parent to configure a child, State is a component’s private, internal memory. When state updates, React automatically schedules a re-render of the component to update the user interface.',
          bulletPoints: [
            'const [state, setState] = useState(initialValue);',
            'Re-render Trigger: Calling setState() notifies React that data changed and the UI must refresh',
            'Immutability: You must NEVER mutate state directly (e.g. user.name = "Bob" will not trigger a re-render). Always pass a new value or object'
          ]
        },
        {
          heading: '2. The Functional Updater Pattern',
          content: 'React batches state updates for performance. If you need to update state based on its previous value, always pass an updater function.',
          bulletPoints: [
            'Standard: setCount(count + 1) (vulnerable to stale closure states in rapid updates)',
            'Functional: setCount(prev => prev + 1) (guaranteed to receive the latest committed state)',
            'Updating Objects: setUser(prev => ({ ...prev, name: "Alice" }))'
          ],
          callout: {
            type: 'key-rule',
            text: 'Immutability Mandate: Never modify arrays or objects in place. Always return a brand new copy using the spread operator {...obj} or [...arr]!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Scoreboard Operator in a Basketball Arena',
        concept: 'React State and Re-rendering',
        story: 'The digital scoreboard hanging above the basketball court has a display (the View). The operator sitting at the courtside table has a control panel with a button labeled "+2 Points" (the setState function). The operator does not climb a ladder with a paint roller to paint the number 42 over 40. They press the button; an electronic pulse triggers the digital LED board to refresh its lights to 42 instantly.',
        moral: 'Calling the setter triggers React to repaint the digital display.',
        icon: 'Activity'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Simulating React useState State Loop in Pure JS',
        description: 'Visualizing how a state setter function triggers a clean component re-render.',
        html: `<div class="state-sim-card">
  <h4>Interactive Counter Simulation</h4>
  <p>State Value: <strong id="simScore" style="font-size: 1.5rem;">0</strong></p>
  <button id="simIncBtn">Increment (+1)</button>
  <button id="simResetBtn">Reset</button>
</div>`,
        css: `.state-sim-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background: #f1f5f9;
  cursor: pointer;
  font-weight: 600;
  margin-right: 0.5rem;
}`,
        js: `// Conceptual model of useState
function createComponent() {
  let _state = 0; // Component memory

  function setState(newVal: number | ((prev: number) => number)) {
    _state = typeof newVal === "function" ? newVal(_state) : newVal;
    render(); // Trigger re-render
  }

  function render() {
    const el = document.getElementById("simScore");
    if (el) el.textContent = String(_state);
  }

  return {
    increment: () => setState(prev => prev + 1),
    reset: () => setState(0)
  };
}

const component = createComponent();
document.getElementById("simIncBtn")?.addEventListener("click", () => component.increment());
document.getElementById("simResetBtn")?.addEventListener("click", () => component.reset());`,
        breakdown: [
          {
            lineRange: 'Line 3',
            title: 'Private State Memory',
            explanation: 'Retains value across re-renders in the component fiber/closure.',
            highlightTokens: ['let _state = 0']
          },
          {
            lineRange: 'Line 5-8',
            title: 'setState & Automatic Re-render',
            explanation: 'Updates state and immediately updates the DOM display.',
            highlightTokens: ['setState', 'render()']
          }
        ]
      },
      video: {
        title: 'Mastering useState: Mental Models, Batching, and Immutability',
        duration: '17:15',
        description: 'Deep dive into why React batches state updates, the perils of mutating objects, and functional updater patterns.',
        keyPoints: [
          'How useState retains memory',
          'Why direct mutation breaks re-renders',
          'The functional updater prev => prev + 1',
          'Updating nested objects immutably'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'What is State', description: 'Internal component memory' },
          { time: '05:30', seconds: 330, title: 'The Setter Pattern', description: 'Triggering re-renders' },
          { time: '11:00', seconds: 660, title: 'Immutability & Spread', description: 'Updating objects' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'State is the beating heart of interactive applications. Treat it with immutability.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-09-04',
        title: 'Build an Immutable State Array Updater',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Given const items = ["HTML", "CSS"];, write an immutable update that adds "JS" to a new array using the spread operator [...items, "JS"]. Write the comma-joined string to #arrayOutput.',
        instructions: [
          'Declare const items = ["HTML", "CSS"];',
          'Create const updated = [...items, "JS"];',
          'Set #arrayOutput text to updated.join(", ")'
        ],
        starterHtml: `<div class="immutable-card">
  <p>Skills: <strong id="arrayOutput">--</strong></p>
</div>`,
        starterCss: `.immutable-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Implement immutable spread update
`,
        solutionHtml: `<div class="immutable-card">
  <p>Skills: <strong id="arrayOutput">--</strong></p>
</div>`,
        solutionCss: `.immutable-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `const items = ["HTML", "CSS"];
const updated = [...items, "JS"];
const out = document.getElementById("arrayOutput");
if (out) out.textContent = updated.join(", ");`,
        hints: [
          'Use [...items, "JS"] to create a fresh array copy.',
          'out.textContent = updated.join(", ");'
        ],
        testCases: [
          {
            id: 'tc-09-4a',
            description: 'arrayOutput has HTML, CSS, JS',
            hint: 'Set joined text on #arrayOutput',
            checkType: 'selector-exists',
            target: '#arrayOutput'
          }
        ],
        conceptQuestion: {
          question: 'What happens if you directly mutate a React state variable (e.g. state.count = 5) without calling its setter function?',
          options: [
            'React will not detect the change, and the component will fail to re-render',
            'React throws a compile error',
            'The browser tab crashes',
            'The entire page reloads'
          ],
          correctIndex: 0,
          explanation: 'React relies on the setter function (setState) to know when data has changed. Directly mutating the variable bypasses React’s scheduler, leaving the UI stale.'
        }
      },
      quiz: [
        {
          id: 'q-09-4',
          question: 'When should you use the functional updater form: setCount(prev => prev + 1)?',
          options: [
            'Whenever the new state depends on the previous state value',
            'Only when count is zero',
            'Only inside while loops',
            'Never, it is deprecated'
          ],
          correctIndex: 0,
          explanation: 'The functional updater pattern ensures you are working with the most up-to-date state value, preventing bugs from asynchronous batching.'
        }
      ],
      summary: [
        'State provides persistent reactive memory within React components.',
        'Calling the setState function schedules a re-render to synchronize the UI.',
        'Never mutate state directly; always produce fresh copies immutably.',
        'Use the functional updater callback (prev => ...) when new state depends on prior state.'
      ],
      relatedTopics: [
        {
          title: 'Component Lifecycle & useEffect',
          chapterNumber: '09',
          lessonId: 'ch-09-l-05',
          context: 'Synchronize components with external systems, timers, and APIs.'
        }
      ]
    },
    {
      id: 'ch-09-l-05',
      chapterId: 'ch-09',
      number: '9.5',
      slug: 'component-lifecycle-useeffect',
      title: 'Component Lifecycle & The useEffect Mental Model',
      tagline: 'Synchronize components with external systems, fetch data on mount, and master the dependency array',
      durationMinutes: 30,
      learningObjectives: [
        'Understand side effects: fetching data, setting timers, listening to window events, and logging',
        'Learn the useEffect signature: useEffect(() => { ... return cleanup; }, [deps])',
        'Master the 3 dependency array modes: no array (every render), empty [] (mount only), and [id] (value change)',
        'Implement cleanup functions to prevent memory leaks and dangling subscriptions'
      ],
      theorySections: [
        {
          heading: '1. What is a Side Effect?',
          content: 'Pure React components calculate JSX from props and state. Anything that reaches outside the component—fetching from an API, subscribing to WebSockets, setting an interval timer, or updating document.title—is a Side Effect. The useEffect hook is the dedicated escape hatch for managing side effects.',
          bulletPoints: [
            'Mounting: The component appears on screen for the first time',
            'Updating: The component re-renders due to changed props or state',
            'Unmounting: The component is removed from the screen'
          ]
        },
        {
          heading: '2. The Dependency Array Rule',
          content: 'The second argument to useEffect controls when the effect re-runs.',
          bulletPoints: [
            'No dependency array: Runs after EVERY single render (rarely desired)',
            'Empty array []: Runs ONCE when component mounts (ideal for initial API fetches)',
            '[userId]: Runs on mount and re-runs whenever userId changes value',
            'Cleanup Return: () => { clearInterval(timer); } executes before unmount or before the effect re-runs to prevent leaks'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden useEffect Rule: Always include every reactive variable (props or state) used inside the effect in the dependency array!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Hotel Room Light and the Departure Maid',
        concept: 'useEffect Mount and Cleanup',
        story: 'When you check into a hotel room (Mount), you slide your keycard into the wall slot to turn on the air conditioner and lights (the Effect). While you stay there, you can adjust the thermostat. When you check out and pack your suitcase (Unmount), you remove the keycard from the wall, switching off the lights and saving electricity (the Cleanup function).',
        moral: 'Always clean up after yourself when a component leaves the screen.',
        icon: 'Repeat'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'useEffect Timer with Guaranteed Cleanup',
        description: 'Simulating a mounting timer that cleans itself up when dismantled.',
        html: `<div class="effect-sim-card">
  <h4>Lifecycle Timer Simulation</h4>
  <p>Elapsed Time: <strong id="timerElapsed">0</strong>s</p>
  <button id="stopTimerBtn">Unmount (Stop Timer)</button>
</div>`,
        css: `.effect-sim-card {
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
  margin-top: 0.5rem;
}`,
        js: `// Simulating useEffect lifecycle
function mountTimerComponent() {
  let seconds = 0;
  const display = document.getElementById("timerElapsed");

  // Effect: Start timer
  const intervalId = setInterval(() => {
    seconds++;
    if (display) display.textContent = String(seconds);
  }, 1000);

  // Cleanup function returned by useEffect
  return function cleanup() {
    clearInterval(intervalId);
    console.log("Timer cleaned up successfully. No memory leak!");
  };
}

const unmount = mountTimerComponent();
document.getElementById("stopTimerBtn")?.addEventListener("click", () => {
  unmount(); // Execute cleanup
  const btn = document.getElementById("stopTimerBtn");
  if (btn) btn.textContent = "Timer Stopped & Cleaned";
});`,
        breakdown: [
          {
            lineRange: 'Line 7-10',
            title: 'Side Effect Setup (Mount)',
            explanation: 'Starts interval timer communicating with the Web API.',
            highlightTokens: ['setInterval']
          },
          {
            lineRange: 'Line 13-16',
            title: 'Cleanup Return (Unmount)',
            explanation: 'Clears the interval to prevent timer leaks when the component unmounts.',
            highlightTokens: ['clearInterval(intervalId)']
          }
        ]
      },
      video: {
        title: 'The useEffect Mental Model: Synchronization, Dependencies & Cleanup',
        duration: '18:30',
        description: 'Mastering the dependency array, avoiding infinite re-render loops, fetching data cleanly, and writing memory leak cleanups.',
        keyPoints: [
          'Mental model: synchronization, not lifecycle',
          'The 3 dependency array variations',
          'Why infinite loops happen and how to fix them',
          'Cleanup functions for timers and event listeners'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'What are Side Effects', description: 'Reaching outside React' },
          { time: '06:00', seconds: 360, title: 'The Dependency Array', description: 'Controlling execution' },
          { time: '12:00', seconds: 720, title: 'The Cleanup Pattern', description: 'Preventing leaks' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Do not think of useEffect as componentDidMount; think of it as synchronizing with an external system.' }
        ],
        demoAnimationType: 'js-exec'
      },
      practice: {
        id: 'prac-09-05',
        title: 'Configure a Document Title Synchronization Effect',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create a simulated effect syncDocumentTitle(title: string) that sets document.title = title and writes "Title Synced: " + title to #titleSyncStatus.',
        instructions: [
          'Create function syncDocumentTitle(title: string)',
          'Set document.title = title',
          'Write "Title Synced: " + title to #titleSyncStatus'
        ],
        starterHtml: `<div class="title-sync-card">
  <p id="titleSyncStatus">Awaiting sync...</p>
</div>`,
        starterCss: `.title-sync-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `// Implement syncDocumentTitle here
`,
        solutionHtml: `<div class="title-sync-card">
  <p id="titleSyncStatus">Awaiting sync...</p>
</div>`,
        solutionCss: `.title-sync-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `function syncDocumentTitle(title: string) {
  document.title = title;
  const out = document.getElementById("titleSyncStatus");
  if (out) out.textContent = "Title Synced: " + title;
}

syncDocumentTitle("Web Dev Platform - Chapter 09");`,
        hints: [
          'Set document.title = title;',
          'Update #titleSyncStatus textContent.'
        ],
        testCases: [
          {
            id: 'tc-09-5a',
            description: 'titleSyncStatus is updated',
            hint: 'Set sync text on #titleSyncStatus',
            checkType: 'selector-exists',
            target: '#titleSyncStatus'
          }
        ],
        conceptQuestion: {
          question: 'What happens if you omit the dependency array completely from a useEffect call: useEffect(() => { ... })?',
          options: [
            'The effect callback will execute after EVERY single render of the component',
            'The effect will never execute',
            'It will throw a syntax error',
            'It will execute only once on mount'
          ],
          correctIndex: 0,
          explanation: 'Without a dependency array, React runs the effect after initial render and after every subsequent state or prop re-render, which often causes performance degradation.'
        }
      },
      quiz: [
        {
          id: 'q-09-5',
          question: 'What is the purpose of the cleanup function returned inside a useEffect callback?',
          options: [
            'To clean up subscriptions, timers, and event listeners before the component unmounts or before the effect re-runs',
            'To delete unused state variables',
            'To wipe localStorage',
            'To clear browser cache'
          ],
          correctIndex: 0,
          explanation: 'The returned cleanup function is invoked before unmounting and before subsequent effect runs to prevent memory leaks and stale event listeners.'
        }
      ],
      summary: [
        'useEffect coordinates side effects that interact outside of React rendering.',
        'Passing an empty dependency array [] runs the effect once on initial mount.',
        'Passing reactive dependencies [id] re-runs the effect only when values change.',
        'Returning a cleanup function prevents memory leaks from timers and subscriptions.'
      ],
      relatedTopics: [
        {
          title: 'Mini Project: Interactive React Component',
          chapterNumber: '09',
          lessonId: 'ch-09-l-06',
          context: 'Synthesize JSX, props, useState, and useEffect into an interactive component.'
        }
      ]
    },
    {
      id: 'ch-09-l-06',
      chapterId: 'ch-09',
      number: '9.6',
      slug: 'react-component-mini-project',
      title: 'Mini Project: Interactive Modern Widget',
      tagline: 'Synthesize components, props, state, and lifecycle effects into an interactive productivity widget',
      durationMinutes: 35,
      learningObjectives: [
        'Build a multi-component interactive widget utilizing state and lifecycle patterns',
        'Manage search filtering and real-time category filtering using derived state',
        'Synchronize user preferences to localStorage inside a simulated effect',
        'Handle empty states, loading skeletons, and interactive action buttons'
      ],
      theorySections: [
        {
          heading: '1. Derived State vs Redundant State',
          content: 'A frequent beginner mistake is storing computed values in state (e.g. keeping both an allItems array AND a filteredItems array in state). In modern React, you calculate filtered items on the fly during render.',
          bulletPoints: [
            'Single Source of Truth: Store items and searchQuery in state',
            'Derived Calculation: const filtered = items.filter(item => item.name.includes(searchQuery));',
            'Zero Sync Bugs: Because filtered is calculated on the fly, it can never become out of date'
          ]
        },
        {
          heading: '2. Component Decomposition',
          content: 'Break your widget into single-responsibility sub-components.',
          bulletPoints: [
            'SearchBar: Controlled input handling search text',
            'CategoryFilter: Pill buttons toggling active tags',
            'ItemCard: Pure display component rendering individual items'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Swiss Army Multi-Tool',
        concept: 'Composing Modular Components',
        story: 'A Swiss Army knife is not a single giant clumsy blade. It is a compact red chassis that neatly houses independent precision tools: a scissors, a screwdriver, a corkscrew, and a blade. Each tool does one job well. You fold out only the tool you need. A well-designed React widget is composed of focused, reusable component blades.',
        moral: 'Decompose complex UIs into small, dedicated components.',
        icon: 'Layout'
      },
      visualType: 'syntax-breakdown',
      codeExample: {
        title: 'Complete Interactive Resource Directory Widget',
        description: 'Real-time search filtering, category pills, and simulated component state.',
        html: `<div class="directory-widget">
  <div class="dir-header">
    <input type="text" id="dirSearch" placeholder="Search resources...">
    <div class="dir-categories" id="dirCategories">
      <button class="cat-pill active" data-cat="all">All</button>
      <button class="cat-pill" data-cat="docs">Docs</button>
      <button class="cat-pill" data-cat="tools">Tools</button>
    </div>
  </div>
  <div id="dirResults" class="dir-results"></div>
</div>`,
        css: `.directory-widget {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
}
.dir-header { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
#dirSearch {
  padding: 0.6rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
}
.dir-categories { display: flex; gap: 0.5rem; }
.cat-pill {
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
}
.cat-pill.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
.dir-results { display: grid; gap: 0.5rem; }
.res-card {
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
        js: `interface Resource { id: number; title: string; category: string; }

const resources: Resource[] = [
  { id: 1, title: "MDN Web Docs", category: "docs" },
  { id: 2, title: "CanIUse Browser Support", category: "tools" },
  { id: 3, title: "CSS-Tricks Almanac", category: "docs" },
  { id: 4, title: "Vite Bundler Guide", category: "tools" }
];

let currentSearch = "";
let currentCategory = "all";

function renderWidget() {
  const container = document.getElementById("dirResults");
  if (!container) return;

  // Derived state calculation
  const filtered = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(currentSearch.toLowerCase());
    const matchesCat = currentCategory === "all" || res.category === currentCategory;
    return matchesSearch && matchesCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p style="color: #64748b;">No matching resources found.</p>';
    return;
  }

  container.innerHTML = filtered.map(r => \`
    <div class="res-card">
      <strong>\${r.title}</strong>
      <span style="font-size: 0.75rem; color: #64748b; text-transform: uppercase;">\${r.category}</span>
    </div>
  \`).join("");
}

document.getElementById("dirSearch")?.addEventListener("input", (e) => {
  currentSearch = (e.target as HTMLInputElement).value;
  renderWidget();
});

document.getElementById("dirCategories")?.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest(".cat-pill");
  if (!btn) return;

  document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  currentCategory = (btn as HTMLElement).dataset.cat || "all";
  renderWidget();
});

renderWidget();`,
        breakdown: [
          {
            lineRange: 'Line 17-23',
            title: 'Derived State Calculation',
            explanation: 'Filters resources on the fly without storing redundant duplicated arrays in state.',
            highlightTokens: ['const filtered = resources.filter']
          },
          {
            lineRange: 'Line 36-47',
            title: 'Reactive Input Listeners',
            explanation: 'Listens to text input and category pills to re-render the view cleanly.',
            highlightTokens: ['renderWidget()']
          }
        ]
      },
      video: {
        title: 'Building a Full Interactive Component Widget in Modern React Style',
        duration: '20:10',
        description: 'Complete capstone widget build: props interfaces, derived search filtering, event handling, and clean styling.',
        keyPoints: [
          'Decomposing UI into sub-components',
          'Computing derived filter state',
          'Handling search input and category pills',
          'Responsive styling best practices'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Widget Architecture', description: 'Decomposing parts' },
          { time: '06:00', seconds: 360, title: 'Derived State', description: 'Filtering logic' },
          { time: '13:30', seconds: 810, title: 'Event Handling', description: 'Reactivity' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'You now possess the core mental model that underpins every modern front-end engineering team.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-09-06',
        title: 'Filter Items by Search Query',
        difficulty: 'Intermediate',
        estimatedTime: '15 min',
        prompt: 'Given const items = ["React", "Vue", "Angular", "Svelte"];, filter the array for items that include the substring "e" (case-insensitive). Count how many match and set the result in #matchCount.',
        instructions: [
          'Filter items with item.toLowerCase().includes("e")',
          'Compute count of matching items',
          'Display count in #matchCount'
        ],
        starterHtml: `<div class="filter-practice">
  <p>Matching Frameworks: <strong id="matchCount">0</strong></p>
</div>`,
        starterCss: `.filter-practice {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `const items = ["React", "Vue", "Angular", "Svelte"];
// Filter items containing 'e' and write count to #matchCount
`,
        solutionHtml: `<div class="filter-practice">
  <p>Matching Frameworks: <strong id="matchCount">0</strong></p>
</div>`,
        solutionCss: `.filter-practice {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `const items = ["React", "Vue", "Angular", "Svelte"];
const matches = items.filter(i => i.toLowerCase().includes("e"));
const out = document.getElementById("matchCount");
if (out) out.textContent = String(matches.length);`,
        hints: [
          'items.filter(i => i.toLowerCase().includes("e")).length',
          'Update out.textContent with the length.'
        ],
        testCases: [
          {
            id: 'tc-09-6a',
            description: 'matchCount updated with count',
            hint: 'Set matching count on #matchCount',
            checkType: 'selector-exists',
            target: '#matchCount'
          }
        ],
        conceptQuestion: {
          question: 'Why should you prefer calculating filtered lists as derived state during render rather than storing a filteredItems state variable?',
          options: [
            'Derived state is guaranteed to never get out of sync with the main data array or search term',
            'Because React forbids more than 2 useState hooks',
            'To make CSS animations faster',
            'To avoid using TypeScript'
          ],
          correctIndex: 0,
          explanation: 'Calculating derived state on the fly guarantees zero synchronization bugs because the filtered list is dynamically evaluated directly from the source arrays.'
        }
      },
      quiz: [
        {
          id: 'q-09-6',
          question: 'Which of the following is considered "derived state" in a shopping cart application?',
          options: [
            'cartTotal (calculated by summing item prices * quantities during render)',
            'cartItems (the array of items chosen by user)',
            'userDiscountCode (the text typed into promo input)',
            'shippingAddress (the customer address)'
          ],
          correctIndex: 0,
          explanation: 'cartTotal can be computed directly from cartItems at any moment, so it should be derived during render rather than stored in independent state.'
        }
      ],
      summary: [
        'Prefer derived state calculations during render over redundant state variables.',
        'Decompose complex user interfaces into small, single-responsibility sub-components.',
        'Controlled inputs keep JavaScript state synchronized with HTML input elements.',
        'Chapter 09 equips you with the modern component architecture used across professional software teams.'
      ],
      relatedTopics: [
        {
          title: 'Capstone Project & Full-Stack Deployment',
          chapterNumber: '10',
          lessonId: 'ch-10-l-01',
          context: 'Bring everything together: build, audit, test, and deploy a complete production web application.'
        }
      ]
    }
  ]
};
