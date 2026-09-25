import { Chapter } from '../../utils/types';

export const chapter01: Chapter = {
  id: 'ch-01',
  number: '01',
  badge: '01',
  slug: 'development-environment',
  title: 'Development Environment & Tools',
  subtitle: 'Editor, Terminal, DevTools & Project Architecture',
  description: 'Set up a professional modern web development environment. Learn VS Code workflows, master the Chrome/Firefox DevTools Elements & Console panels, understand file naming conventions, and run local live preview servers.',
  estimatedHours: '3 hrs',
  accentColor: 'blue',
  iconName: 'Terminal',
  totalLessons: 5,
  lessons: [
    {
      id: 'ch-01-l-01',
      chapterId: 'ch-01',
      number: '1.1',
      slug: 'your-first-webpage',
      title: 'Your First Webpage',
      tagline: 'Write, save, and preview your very first HTML document inside your browser',
      durationMinutes: 20,
      learningObjectives: [
        'Create and save a valid index.html file',
        'Write the basic HTML5 document boilerplate structure',
        'Understand the roles of <!DOCTYPE html>, <html>, <head>, and <body>',
        'Preview HTML documents directly in Google Chrome, Edge, or Firefox'
      ],
      theorySections: [
        {
          heading: '1. Anatomy of a Webpage',
          content: 'Every website in the world begins with a single file: index.html. When your browser opens this file, it parses angle-bracket tags into visual structures on screen.',
          bulletPoints: [
            'Tags: Words enclosed in angle brackets like <p> (opening) and </p> (closing)',
            'Elements: The complete tag plus the text or child elements inside it',
            'Attributes: Extra configurations inside opening tags like class="highlight" or id="main"'
          ],
          callout: {
            type: 'key-rule',
            text: 'Why index.html? Web servers automatically look for index.html as the default homepage file when a directory is requested.'
          }
        },
        {
          heading: '2. The Fundamental HTML5 Skeleton',
          content: 'An HTML5 document is structured like a human being: it has a head (which holds meta information) and a body (which holds all visible content).',
          bulletPoints: [
            '<!DOCTYPE html>: Tells the browser to use modern standards mode',
            '<head>: Contains the <title>, character sets, and stylesheets (invisible to users)',
            '<body>: Contains all paragraphs, headers, buttons, and images visible on page'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Blueprint and the House',
        concept: 'HTML Document Structure',
        story: 'The <head> is the architectural blueprint filed with the city permit office — nobody lives in the blueprint, but it states the dimensions, owner name, and electrical codes. The <body> is the actual living room, kitchen, and bedrooms where people walk, sit, and interact.',
        moral: 'Put metadata in the head, and put everything the user should see in the body.',
        icon: 'FileCode'
      },
      visualType: 'devtools-suite',
      codeExample: {
        title: 'Your Complete First Webpage',
        description: 'A clean, standards-compliant HTML page with styling and heading structure.',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Webpage</title>
</head>
<body>
  <header>
    <h1>Hello, World!</h1>
    <p>This is my first live webpage crafted with HTML5.</p>
  </header>
  <main>
    <button id="alertBtn">Click Me</button>
  </main>
</body>
</html>`,
        css: `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 2rem;
  background-color: #f1f5f9;
  color: #1e293b;
}
header {
  border-bottom: 2px solid #cbd5e1;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}
h1 {
  color: #2563eb;
  margin: 0 0 0.5rem 0;
}
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
}`,
        js: `const btn = document.getElementById('alertBtn');
btn?.addEventListener('click', () => {
  alert('Congratulations! Your first script is running!');
});`,
        breakdown: [
          {
            lineRange: 'Lines 1-5',
            title: 'HTML5 Header Boilerplate',
            explanation: 'Declares document type and sets the browser tab title to "My First Webpage".',
            highlightTokens: ['<!DOCTYPE html>', '<title>']
          },
          {
            lineRange: 'Lines 6-12',
            title: 'Visible Semantic Body',
            explanation: 'Encapsulates page title, intro text, and an action button inside semantic tags.',
            highlightTokens: ['<header>', '<h1>', '<button>']
          }
        ]
      },
      video: {
        title: 'Creating and Running Your First index.html File',
        duration: '10:15',
        description: 'Step-by-step recording of creating a file in a text editor, typing boilerplate tags, and opening it in Chrome.',
        keyPoints: [
          'Creating a new file in a folder',
          'Saving with the exact .html extension',
          'Double-clicking to preview in browser',
          'Using Ctrl+R / Cmd+R to refresh changes'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Creating the File', description: 'Setting up index.html' },
          { time: '03:40', seconds: 220, title: 'Typing the Tags', description: 'Writing head and body' },
          { time: '07:20', seconds: 440, title: 'Opening in Browser', description: 'Viewing the result' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'In this lesson, you will see your code transform into an actual webpage.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-01-01',
        title: 'Create Your Personal Intro Card',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Build a personal profile card containing a level 1 heading (<h1>) with your name, a paragraph (<p>) with your role, and a badge tag (<span class="badge">) indicating "Web Developer".',
        instructions: [
          'Add an <h1> heading with your name or username',
          'Add a <p> tag describing what you enjoy building',
          'Add a <span class="badge"> with the text "Web Developer"'
        ],
        starterHtml: `<div class="profile-card">
  <!-- Write your h1, p, and span.badge here -->
</div>`,
        starterCss: `.profile-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  max-width: 400px;
}
.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #dbeafe;
  color: #1d4ed8;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}`,
        starterJs: `console.log("Profile card loaded.");`,
        solutionHtml: `<div class="profile-card">
  <span class="badge">Web Developer</span>
  <h1>Alex Rivers</h1>
  <p>Passionate about building fast, accessible web applications.</p>
</div>`,
        solutionCss: `.profile-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  max-width: 400px;
}
.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #dbeafe;
  color: #1d4ed8;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}
h1 {
  margin: 0.5rem 0 0.25rem 0;
  color: #0f172a;
}
p {
  color: #475569;
  margin: 0;
}`,
        solutionJs: `console.log("Profile card loaded.");`,
        hints: [
          'Use <h1> for the main name heading.',
          'Use <span class="badge">Web Developer</span> for the badge.'
        ],
        testCases: [
          {
            id: 'tc-01-1a',
            description: 'Contains an <h1> heading',
            hint: 'Add an <h1> tag inside the profile card',
            checkType: 'selector-exists',
            target: '.profile-card h1'
          },
          {
            id: 'tc-01-1b',
            description: 'Contains a .badge element',
            hint: 'Add an element with class="badge"',
            checkType: 'selector-exists',
            target: '.profile-card .badge'
          }
        ],
        conceptQuestion: {
          question: 'Where should user-visible text and images always be placed in an HTML document?',
          options: ['Inside the <body> tag', 'Inside the <head> tag', 'Before the <!DOCTYPE> declaration', 'Inside <title>'],
          correctIndex: 0,
          explanation: 'The <body> element contains all the visible content rendered to the end user in the browser window.'
        }
      },
      quiz: [
        {
          id: 'q-01-1',
          question: 'What is the default filename web servers look for as the directory index?',
          options: ['index.html', 'home.html', 'main.html', 'default.html'],
          correctIndex: 0,
          explanation: 'Standard web servers configure index.html as the primary landing page file for root or folder requests.'
        }
      ],
      summary: [
        'index.html is the universal entry point for every website.',
        'HTML documents consist of <!DOCTYPE html>, <head> (metadata), and <body> (visible content).',
        'Tags open with <tag> and close with </tag>.',
        'Double-clicking an HTML file opens it locally in your default web browser.'
      ],
      relatedTopics: [
        {
          title: 'Code Editor Setup',
          chapterNumber: '01',
          lessonId: 'ch-01-l-02',
          context: 'Install and configure VS Code to write HTML with autocomplete and live server.'
        }
      ]
    },
    {
      id: 'ch-01-l-02',
      chapterId: 'ch-01',
      number: '1.2',
      slug: 'code-editor-setup',
      title: 'Code Editor Setup & Productivity',
      tagline: 'Configure VS Code, essential web extensions, Emmet abbreviations, and shortcuts',
      durationMinutes: 20,
      learningObjectives: [
        'Understand why professional developers use dedicated code editors rather than word processors',
        'Configure Visual Studio Code for HTML, CSS, and JavaScript development',
        'Master Emmet shortcuts (! tab to generate instant HTML5 boilerplate)',
        'Install essential extensions: Prettier, Live Server, and Auto Rename Tag'
      ],
      theorySections: [
        {
          heading: '1. Why Code Editors Matter',
          content: 'Word processors like MS Word or Google Docs inject hidden formatting characters that corrupt code files. Dedicated code editors save pure UTF-8 plain text while providing syntax highlighting, auto-completion, and error linting.',
          bulletPoints: [
            'Syntax Highlighting: Colors tags, attributes, and strings differently for instant readability',
            'Auto-Completion (IntelliSense): Predicts tag names, CSS properties, and function signatures',
            'Integrated Terminal: Lets you run commands without switching windows'
          ]
        },
        {
          heading: '2. Emmet: The Web Developer Superpower',
          content: 'Emmet is a built-in abbreviations engine in VS Code that expands short CSS-like snippets into full HTML structures.',
          bulletPoints: [
            '! followed by Tab: Expands into full HTML5 boilerplate',
            'div.container: Expands to <div class="container"></div>',
            'ul>li*3: Expands to an unordered list with 3 list items',
            'nav>a[href="#"]{Home}: Expands to <nav><a href="#">Home</a></nav>'
          ],
          callout: {
            type: 'tip',
            text: 'Emmet cuts boilerplate typing by over 70%. Memorizing just 5 Emmet patterns will save you hundreds of hours.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Carpenter Toolbox vs Kitchen Scissors',
        concept: 'Tools Designed for Purpose',
        story: 'You could theoretically cut lumber using heavy kitchen shears, but you will tire quickly and produce jagged, splintered edges. A master carpenter uses precision saws, squares, and laser guides. A code editor is your precision power tool.',
        moral: 'Master your tools early so your focus remains on solving problems, not fighting your editor.',
        icon: 'Wrench'
      },
      visualType: 'devtools-suite',
      codeExample: {
        title: 'Emmet Abbreviations in Action',
        description: 'Notice how typing "article.post>h2+p+button.btn" generates a complete card structure.',
        html: `<article class="post">
  <h2>Emmet Mastery</h2>
  <p>Generated in seconds using shorthand abbreviations.</p>
  <button class="btn">Read Article</button>
</article>`,
        css: `.post {
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.post h2 {
  color: #1e293b;
  margin-top: 0;
}
.btn {
  background: #0ea5e9;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}`,
        breakdown: [
          {
            lineRange: 'Line 1',
            title: 'article.post',
            explanation: 'The class notation .post automatically creates class="post".',
            highlightTokens: ['class="post"']
          },
          {
            lineRange: 'Line 2-4',
            title: 'Nested Children',
            explanation: 'The + operator placed h2, p, and button as sibling elements inside the article.',
            highlightTokens: ['<h2>', '<p>', '<button>']
          }
        ]
      },
      video: {
        title: 'Setting Up VS Code for Peak Productivity',
        duration: '12:00',
        description: 'Installing VS Code, enabling Prettier format on save, and demonstrating Emmet shortcuts live.',
        keyPoints: [
          'Downloading VS Code',
          'Setting formatOnSave: true',
          'Using Emmet ! for boilerplate',
          'Live Server extension demo'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Download & Install', description: 'Getting VS Code' },
          { time: '04:10', seconds: 250, title: 'Key Extensions', description: 'Prettier and Live Server' },
          { time: '08:30', seconds: 510, title: 'Emmet Speed Typing', description: 'Expanding abbreviations' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'A well-configured editor makes coding feel like flying.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-01-02',
        title: 'Build a Multi-Item Product Showcase',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create a product list container (<div class="product-list">) containing two product cards (<div class="product-card">), each with an <h3> title and a <span class="price">.',
        instructions: [
          'Create a container <div class="product-list">',
          'Add two child cards: <div class="product-card">',
          'Inside each card, add an <h3> product name and a <span class="price"> tag'
        ],
        starterHtml: `<!-- Build your product showcase below -->
<div class="product-list">
  
</div>`,
        starterCss: `.product-list {
  display: flex;
  gap: 1rem;
}
.product-card {
  padding: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  flex: 1;
}
.price {
  color: #16a34a;
  font-weight: bold;
}`,
        starterJs: `console.log("Products ready.");`,
        solutionHtml: `<div class="product-list">
  <div class="product-card">
    <h3>Wireless Mechanical Keyboard</h3>
    <span class="price">$89.99</span>
  </div>
  <div class="product-card">
    <h3>Ergonomic Mouse</h3>
    <span class="price">$49.99</span>
  </div>
</div>`,
        solutionCss: `.product-list {
  display: flex;
  gap: 1rem;
}
.product-card {
  padding: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  flex: 1;
}
.price {
  color: #16a34a;
  font-weight: bold;
}`,
        solutionJs: `console.log("Products ready.");`,
        hints: [
          'Nest two div elements with class="product-card" inside product-list.',
          'Each product card needs an <h3> and a <span class="price">.'
        ],
        testCases: [
          {
            id: 'tc-01-2a',
            description: 'Two product-card elements exist',
            hint: 'Ensure you have at least two elements with class="product-card"',
            checkType: 'selector-exists',
            target: '.product-list .product-card'
          },
          {
            id: 'tc-01-2b',
            description: 'Price tag exists inside cards',
            hint: 'Add a <span class="price"> inside each card',
            checkType: 'selector-exists',
            target: '.product-card .price'
          }
        ],
        conceptQuestion: {
          question: 'What happens when you type "!" and press Tab in an empty HTML file in VS Code?',
          options: [
            'Generates a complete HTML5 boilerplate document',
            'Throws a syntax error',
            'Deletes the active line',
            'Opens the terminal window'
          ],
          correctIndex: 0,
          explanation: 'The ! Emmet shortcut expands into a complete HTML5 document structure with head, meta, title, and body tags.'
        }
      },
      quiz: [
        {
          id: 'q-01-2',
          question: 'Which VS Code extension automatically formats your code with standard indentation when you save?',
          options: ['Prettier', 'Live Server', 'Docker', 'GitLens'],
          correctIndex: 0,
          explanation: 'Prettier is the industry-standard opinionated code formatter for web projects.'
        }
      ],
      summary: [
        'Dedicated code editors prevent hidden characters and provide syntax assistance.',
        'VS Code is the world’s most popular free editor for web development.',
        'Emmet enables rapid HTML and CSS generation via shorthand abbreviations.',
        'Extensions like Prettier and Live Server streamline formatting and testing.'
      ],
      relatedTopics: [
        {
          title: 'Browser Developer Tools',
          chapterNumber: '01',
          lessonId: 'ch-01-l-03',
          context: 'Inspect and debug live web pages using your browser DevTools.'
        }
      ]
    },
    {
      id: 'ch-01-l-03',
      chapterId: 'ch-01',
      number: '1.3',
      slug: 'browser-developer-tools',
      title: 'Browser Developer Tools',
      tagline: 'Inspect the live DOM, edit styles on the fly, debug JavaScript errors, and audit network calls',
      durationMinutes: 25,
      learningObjectives: [
        'Open and navigate Chrome/Firefox/Edge DevTools (F12 or Cmd+Option+I)',
        'Inspect elements and modify live HTML and CSS in real time',
        'Use the Console tab to view log messages, warnings, and uncaught exceptions',
        'Toggle responsive device emulation mode to test mobile viewports'
      ],
      theorySections: [
        {
          heading: '1. The Developer Super-Vision',
          content: 'Browser DevTools are built right into modern web browsers. They let you peer directly into the living memory of the rendering engine.',
          bulletPoints: [
            'Elements Tab: Shows the live DOM tree as interpreted by the browser, plus computed styles',
            'Console Tab: JavaScript REPL (Read-Eval-Print Loop) displaying logs and runtime errors',
            'Network Tab: Shows every asset requested (images, stylesheets, APIs) with timing and status',
            'Device Toolbar: Simulates mobile devices (iPhone, iPad, Galaxy) with touch emulation'
          ]
        },
        {
          heading: '2. Live Style Manipulation',
          content: 'In the Styles pane of the Elements tab, you can click any CSS rule to change colors, margins, or fonts, or click the + icon to add temporary rules.',
          bulletPoints: [
            'Real-Time Feedback: Changes apply immediately to the page without reloading',
            'Temporary Sandbox: Refreshing the page reverts your changes back to the saved files',
            'Computed Tab: Shows the exact pixel values calculated after CSS cascade inheritance'
          ],
          callout: {
            type: 'warning',
            text: 'DevTools edits are temporary! Always copy your successful CSS tweaks back into your actual project stylesheet before refreshing.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The X-Ray Machine and Surgical Monitor',
        concept: 'Inspection vs Source Code',
        story: 'When a surgeon operates, they don’t guess where organs are — they look at high-resolution live monitors and ultrasound scans. DevTools is your X-ray machine. It reveals what the browser is actually doing under the surface.',
        moral: 'Never guess what is wrong with your layout. Inspect it in DevTools and read the exact computed values.',
        icon: 'Search'
      },
      visualType: 'devtools-suite',
      codeExample: {
        title: 'Console Logging and Debugging Targets',
        description: 'Demonstrating how console methods communicate with the DevTools Console tab.',
        html: `<div class="debug-panel">
  <button id="logBtn">Log Info</button>
  <button id="warnBtn">Log Warning</button>
  <button id="errBtn">Log Error</button>
</div>`,
        css: `.debug-panel {
  display: flex;
  gap: 0.5rem;
  padding: 1.5rem;
  background: #0f172a;
  border-radius: 8px;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
#logBtn { background: #38bdf8; color: #0f172a; }
#warnBtn { background: #facc15; color: #0f172a; }
#errBtn { background: #f87171; color: white; }`,
        js: `document.getElementById('logBtn')?.addEventListener('click', () => {
  console.log('Informational message logged to console');
});
document.getElementById('warnBtn')?.addEventListener('click', () => {
  console.warn('Warning: Check your responsive layout at 375px!');
});
document.getElementById('errBtn')?.addEventListener('click', () => {
  console.error('Error: Simulation of an uncaught exception');
});`,
        breakdown: [
          {
            lineRange: 'Line 2',
            title: 'console.log()',
            explanation: 'Outputs standard diagnostic information to the DevTools Console.',
            highlightTokens: ['console.log']
          },
          {
            lineRange: 'Line 5-8',
            title: 'console.warn() & error()',
            explanation: 'Formats messages with yellow warning triangles or red error badges for priority visibility.',
            highlightTokens: ['console.warn', 'console.error']
          }
        ]
      },
      video: {
        title: 'Mastering Browser DevTools Elements and Console',
        duration: '15:30',
        description: 'Walkthrough of inspecting elements, testing CSS hover states, using device emulation, and filtering console logs.',
        keyPoints: [
          'Opening DevTools with shortcut keys',
          'The inspect element cursor tool',
          'Live CSS property editing',
          'Simulating slow 3G network conditions'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Opening DevTools', description: 'Shortcuts and UI layout' },
          { time: '04:30', seconds: 270, title: 'Elements & Styles', description: 'Inspecting live nodes' },
          { time: '09:15', seconds: 555, title: 'The Console Tab', description: 'Running JS directly' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'DevTools is the single most important application in your daily web development life.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-01-03',
        title: 'Style an Interactive Alert Notification Box',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Build an alert notification box with class "alert-box", containing an alert title (<h4>) and a description (<p>). Style it with an amber warning color scheme.',
        instructions: [
          'Create a <div class="alert-box">',
          'Add an <h4> with the text "System Notification"',
          'Add a <p> explaining that DevTools is ready for inspection',
          'Apply an amber border and light background in CSS'
        ],
        starterHtml: `<!-- Build alert-box here -->
<div class="alert-box">
  
</div>`,
        starterCss: `.alert-box {
  padding: 1rem;
  border-radius: 6px;
  /* Add your amber border and background below */
}`,
        starterJs: `console.log("Alert box ready to inspect in DevTools.");`,
        solutionHtml: `<div class="alert-box">
  <h4>System Notification</h4>
  <p>DevTools inspector is active and monitoring DOM updates.</p>
</div>`,
        solutionCss: `.alert-box {
  padding: 1rem;
  border-radius: 6px;
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  color: #92400e;
}
.alert-box h4 {
  margin: 0 0 0.25rem 0;
  font-weight: 700;
}
.alert-box p {
  margin: 0;
  font-size: 0.875rem;
}`,
        solutionJs: `console.log("Alert box ready to inspect in DevTools.");`,
        hints: [
          'Use .alert-box { background: #fef3c7; border-left: 4px solid #f59e0b; }',
          'Ensure you include an <h4> and <p> tag inside.'
        ],
        testCases: [
          {
            id: 'tc-01-3a',
            description: 'Contains .alert-box with heading',
            hint: 'Add an <h4> tag inside .alert-box',
            checkType: 'selector-exists',
            target: '.alert-box h4'
          },
          {
            id: 'tc-01-3b',
            description: 'Contains paragraph description',
            hint: 'Add a <p> tag inside .alert-box',
            checkType: 'selector-exists',
            target: '.alert-box p'
          }
        ],
        conceptQuestion: {
          question: 'What happens to changes made directly in the DevTools Elements or Styles pane when you refresh the page?',
          options: [
            'They are discarded and the page reverts to the original saved files',
            'They are automatically saved permanently to your disk',
            'They are sent to your GitHub repository',
            'The browser prompts you for your password'
          ],
          correctIndex: 0,
          explanation: 'DevTools is an in-memory runtime inspector. Refreshing reload the source files from disk or server, wiping temporary inspector edits.'
        }
      },
      quiz: [
        {
          id: 'q-01-3',
          question: 'Which DevTools panel displays network requests, image downloads, and API payloads?',
          options: ['Network tab', 'Elements tab', 'Sources tab', 'Memory tab'],
          correctIndex: 0,
          explanation: 'The Network tab records all HTTP traffic between the browser and servers, including timing and payload sizes.'
        }
      ],
      summary: [
        'DevTools allows real-time inspection and debugging of DOM and CSS.',
        'The Console tab logs diagnostic information and runtime errors.',
        'The Network tab audits resource loading speeds and HTTP status codes.',
        'Device emulation mode lets you test responsive behavior across mobile screen sizes.'
      ],
      relatedTopics: [
        {
          title: 'Project Structure & File Organization',
          chapterNumber: '01',
          lessonId: 'ch-01-l-04',
          context: 'Organize HTML, CSS, JavaScript, and asset folders cleanly.'
        }
      ]
    },
    {
      id: 'ch-01-l-04',
      chapterId: 'ch-01',
      number: '1.4',
      slug: 'files-folders-project-structure',
      title: 'Files, Folders & Project Structure',
      tagline: 'Standardize project directories, file naming rules, and relative vs absolute asset paths',
      durationMinutes: 20,
      learningObjectives: [
        'Learn the standard web project directory layout (/css, /js, /images, /assets)',
        'Master file naming rules: lowercase, kebab-case, no spaces, no special characters',
        'Understand relative paths (./, ../, images/logo.png) vs absolute paths (/css/style.css)',
        'Avoid common path errors that cause 404 image and stylesheet failures'
      ],
      theorySections: [
        {
          heading: '1. Standard Directory Hierarchy',
          content: 'Professional web developers follow strict directory organization to keep code scalable and maintainable.',
          bulletPoints: [
            'Root Directory: Holds index.html, README.md, and project configs',
            'css/ or styles/: Stores all stylesheets (e.g. style.css, responsive.css)',
            'js/ or scripts/: Stores all client-side JavaScript files (e.g. app.js, utils.js)',
            'images/ or assets/: Stores SVGs, WebPs, PNGs, and audio/video media'
          ],
          callout: {
            type: 'key-rule',
            text: 'Never use spaces or uppercase letters in file or folder names on the web! Use kebab-case (e.g. about-us.html instead of About Us.html). Linux servers are case-sensitive and spaces convert to messy %20.'
          }
        },
        {
          heading: '2. Relative Path Navigation',
          content: 'Relative paths are instructions telling the browser how to walk from the current file to the target asset.',
          bulletPoints: [
            './file.ext or file.ext: In the same directory as the current file',
            'css/style.css: Look inside the child folder named css',
            '../images/hero.jpg: Go UP one level into parent directory, then into images folder',
            '../../index.html: Go UP two levels in the directory tree'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'Street Addresses vs Walking Directions',
        concept: 'Absolute vs Relative Paths',
        story: 'An absolute path is like GPS coordinates (Latitude 40.7128, Longitude -74.0060) — it points to an exact fixed point regardless of where you are standing. A relative path is walking directions: "Walk out of this room, turn left down the hall, and enter the second door on your right."',
        moral: 'Relative paths make your project portable: your website will work identically whether running on localhost, a staging server, or a production domain.',
        icon: 'Layers'
      },
      visualType: 'devtools-suite',
      codeExample: {
        title: 'Linking Assets via Relative Paths',
        description: 'How an index.html file links external CSS, images, and JavaScript files correctly.',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Asset Linking Demo</title>
  <!-- Relative link to stylesheet in css/ folder -->
  <link rel="stylesheet" href="./css/main.css">
</head>
<body>
  <!-- Relative link to image in assets/ folder -->
  <img src="./assets/logo.svg" alt="Company Logo" class="brand-logo">
  
  <!-- Relative link to script in js/ folder -->
  <script src="./js/app.js" defer></script>
</body>
</html>`,
        css: `.brand-logo {
  max-width: 180px;
  height: auto;
  display: block;
  margin: 1rem 0;
}`,
        breakdown: [
          {
            lineRange: 'Line 6',
            title: '<link rel="stylesheet">',
            explanation: 'href="./css/main.css" instructs the browser to look inside the css folder adjacent to index.html.',
            highlightTokens: ['href="./css/main.css"']
          },
          {
            lineRange: 'Line 9',
            title: '<img src="...">',
            explanation: 'src points to an SVG vector file in the assets folder. alt provides essential text for screen readers.',
            highlightTokens: ['alt="Company Logo"']
          }
        ]
      },
      video: {
        title: 'Mastering File Paths & Project Organization',
        duration: '11:15',
        description: 'Visual demonstration of directory trees, terminal navigation, and resolving broken image 404 errors.',
        keyPoints: [
          'Setting up a clean root folder',
          'Why spaces break web links',
          'Understanding ./ vs ../ paths',
          'Verifying asset loads in the Network tab'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Folder Structure', description: 'Standard layouts' },
          { time: '04:20', seconds: 260, title: 'Path Syntax', description: 'Walking directory trees' },
          { time: '08:00', seconds: 480, title: 'Debugging 404s', description: 'Fixing broken links' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Clean file organization is the hallmark of a disciplined web professional.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-01-04',
        title: 'Build a Multi-Page Navigation Bar',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create a semantic site navigation menu (<nav class="site-nav">) with an unordered list (<ul>) containing 3 links: "Home" (href="./index.html"), "About" (href="./pages/about.html"), and "Contact" (href="./pages/contact.html").',
        instructions: [
          'Create a <nav class="site-nav"> container',
          'Add a <ul> list with three <li> items',
          'Inside each list item, add an <a> link with the specified relative href'
        ],
        starterHtml: `<!-- Build your nav here -->
<nav class="site-nav">
  
</nav>`,
        starterCss: `.site-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.5rem;
}
.site-nav a {
  text-decoration: none;
  color: #2563eb;
  font-weight: 600;
}
.site-nav a:hover {
  text-decoration: underline;
}`,
        starterJs: `console.log("Navigation initialized.");`,
        solutionHtml: `<nav class="site-nav">
  <ul>
    <li><a href="./index.html">Home</a></li>
    <li><a href="./pages/about.html">About</a></li>
    <li><a href="./pages/contact.html">Contact</a></li>
  </ul>
</nav>`,
        solutionCss: `.site-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.5rem;
}
.site-nav a {
  text-decoration: none;
  color: #2563eb;
  font-weight: 600;
}
.site-nav a:hover {
  text-decoration: underline;
}`,
        solutionJs: `console.log("Navigation initialized.");`,
        hints: [
          'Use <nav class="site-nav"><ul><li><a href="...">Text</a></li>...</ul></nav>',
          'Make sure href points to the relative page paths.'
        ],
        testCases: [
          {
            id: 'tc-01-4a',
            description: 'Contains .site-nav with unordered list',
            hint: 'Add a <ul> inside .site-nav',
            checkType: 'selector-exists',
            target: '.site-nav ul'
          },
          {
            id: 'tc-01-4b',
            description: 'Contains 3 navigation links',
            hint: 'Include at least three <a> tags in your list',
            checkType: 'selector-exists',
            target: '.site-nav a'
          }
        ],
        conceptQuestion: {
          question: 'What does the path "../images/hero.jpg" indicate?',
          options: [
            'Go up one directory level, then look inside the images folder for hero.jpg',
            'Look in the root of the hard drive',
            'Delete the images folder',
            'Look in the current folder for a file named ..'
          ],
          correctIndex: 0,
          explanation: 'Two dots (..) represent the parent directory, allowing you to traverse upwards in the file tree.'
        }
      },
      quiz: [
        {
          id: 'q-01-4',
          question: 'Why should web developers avoid spaces in filenames (such as "my photo.jpg")?',
          options: [
            'URLs convert spaces to %20 which can break links and look messy across servers',
            'Browsers will refuse to render images with spaces',
            'Spaces will increase file size by 50%',
            'HTML does not support spaces anywhere in files'
          ],
          correctIndex: 0,
          explanation: 'Spaces are illegal in raw URL syntax and are percent-encoded as %20, often leading to broken deep links across operating systems.'
        }
      ],
      summary: [
        'Standard project structures group assets into css/, js/, and images/ folders.',
        'Use lowercase kebab-case naming for all files and directories.',
        'Relative paths (./ and ../) ensure projects remain portable across environments.',
        'Always check the DevTools Network tab if an image or stylesheet fails with 404.'
      ],
      relatedTopics: [
        {
          title: 'Running and Testing a Website',
          chapterNumber: '01',
          lessonId: 'ch-01-l-05',
          context: 'Learn to launch local preview servers and test across devices.'
        }
      ]
    },
    {
      id: 'ch-01-l-05',
      chapterId: 'ch-01',
      number: '1.5',
      slug: 'running-and-testing-a-website',
      title: 'Running and Testing a Website',
      tagline: 'Run local HTTP development servers, test live reload, and verify cross-browser compatibility',
      durationMinutes: 20,
      learningObjectives: [
        'Understand the difference between file:// and http:// protocols',
        'Run a local development server using VS Code Live Server or Node/Vite',
        'Test websites across multiple viewports and browsers (Chrome, Safari, Firefox)',
        'Verify console cleanliness and audit Core Web Vitals basics'
      ],
      theorySections: [
        {
          heading: '1. file:// vs http:// Protocols',
          content: 'Double-clicking an HTML file loads it with the file:// protocol. While this works for basic HTML, advanced web features (fetch APIs, modules, service workers) require a real HTTP server.',
          bulletPoints: [
            'file:// Protocol: Direct local filesystem read. Strict security blocks AJAX and web workers',
            'http:// Protocol: Real client-server simulation. Unlocks all browser APIs, cookies, and CORS requests',
            'Localhost (127.0.0.1): The loopback IP address that points back to your own computer'
          ]
        },
        {
          heading: '2. The Quality Assurance Checklist',
          content: 'Before showing your website to clients or publishing live, professional engineers perform a 4-step sanity test.',
          bulletPoints: [
            '1. Zero Console Errors: Open DevTools Console and verify no red error messages',
            '2. Responsive Check: Resize browser from 360px (mobile) to 1440px (desktop)',
            '3. Cross-Browser Check: Test in Chromium, WebKit (Safari), and Gecko (Firefox)',
            '4. Accessible Contrast: Check that text is easily readable against background colors'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Flight Simulator Before Takeoff',
        concept: 'Local Testing Environments',
        story: 'Commercial pilots do not practice emergency landings with 300 passengers in the air. They train in realistic flight simulators that recreate every crosswind and engine condition safely on the ground. A local development server is your web flight simulator.',
        moral: 'Catch bugs locally on your machine before they reach real users in production.',
        icon: 'Play'
      },
      visualType: 'devtools-suite',
      codeExample: {
        title: 'Cross-Device Responsive Test Shell',
        description: 'A responsive container that adapts smoothly across screen sizes.',
        html: `<div class="responsive-container">
  <h2>Device Adaptive Layout</h2>
  <p>Resize your browser window to observe fluid adaptation.</p>
  <div class="metrics-grid">
    <div class="metric-card">
      <span class="val">100%</span>
      <span class="lbl">Standards Compliant</span>
    </div>
    <div class="metric-card">
      <span class="val">0</span>
      <span class="lbl">Console Errors</span>
    </div>
  </div>
</div>`,
        css: `.responsive-container {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.metric-card {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #e2e8f0;
}
.val {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
}
.lbl {
  font-size: 0.75rem;
  color: #64748b;
}`,
        breakdown: [
          {
            lineRange: 'Line 8-11',
            title: 'Fluid Grid Auto-Fit',
            explanation: 'Uses repeat(auto-fit, minmax(140px, 1fr)) to automatically wrap metric cards without media queries.',
            highlightTokens: ['grid-template-columns', 'auto-fit']
          }
        ]
      },
      video: {
        title: 'Running and Testing Websites Locally',
        duration: '10:45',
        description: 'Demonstrating how to launch Live Server, test on physical mobile devices on the same Wi-Fi, and audit performance.',
        keyPoints: [
          'Starting Live Server on port 5500',
          'Viewing on mobile via local IP address',
          'Checking DevTools Console tab',
          'Verifying touch target sizes'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Local Servers', description: 'Starting Live Server' },
          { time: '04:15', seconds: 255, title: 'Mobile Testing', description: 'Testing on phones' },
          { time: '07:50', seconds: 470, title: 'QA Checklist', description: 'Pre-launch inspection' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Testing your website early and often prevents costly surprises.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-01-05',
        title: 'Build a Website Pre-Launch Checklist Card',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Build a pre-launch checklist component (<div class="qa-checklist">) containing an <h3> title and three checklist items (<label class="check-item">) with checkboxes (<input type="checkbox">) for: "Zero Console Errors", "Responsive at 375px", and "Valid HTML5 Doctype".',
        instructions: [
          'Create a <div class="qa-checklist"> container',
          'Add an <h3> with the text "Pre-Launch Quality Checklist"',
          'Add three <label class="check-item"> elements, each containing an <input type="checkbox">'
        ],
        starterHtml: `<!-- Build your QA checklist below -->
<div class="qa-checklist">
  
</div>`,
        starterCss: `.qa-checklist {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.check-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0;
  cursor: pointer;
  font-size: 0.9rem;
}`,
        starterJs: `console.log("Checklist ready.");`,
        solutionHtml: `<div class="qa-checklist">
  <h3>Pre-Launch Quality Checklist</h3>
  <label class="check-item">
    <input type="checkbox" checked /> Zero Console Errors
  </label>
  <label class="check-item">
    <input type="checkbox" checked /> Responsive at 375px
  </label>
  <label class="check-item">
    <input type="checkbox" checked /> Valid HTML5 Doctype
  </label>
</div>`,
        solutionCss: `.qa-checklist {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.check-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0;
  cursor: pointer;
  font-size: 0.9rem;
  color: #334155;
}`,
        solutionJs: `console.log("Checklist ready.");`,
        hints: [
          'Use <input type="checkbox"> inside each <label class="check-item">.',
          'Include 3 check items in total.'
        ],
        testCases: [
          {
            id: 'tc-01-5a',
            description: 'Checklist contains heading',
            hint: 'Add an <h3> inside .qa-checklist',
            checkType: 'selector-exists',
            target: '.qa-checklist h3'
          },
          {
            id: 'tc-01-5b',
            description: 'Contains at least 3 checkboxes',
            hint: 'Add 3 checkbox inputs inside the checklist',
            checkType: 'selector-exists',
            target: '.qa-checklist input[type="checkbox"]'
          }
        ],
        conceptQuestion: {
          question: 'Why is running an HTTP local server preferred over opening files with file://?',
          options: [
            'file:// blocks essential browser features like fetch APIs and ES modules due to security rules',
            'file:// makes text blurry on high-resolution screens',
            'file:// is slower by 500%',
            'file:// deletes your CSS files automatically'
          ],
          correctIndex: 0,
          explanation: 'Modern browsers enforce strict cross-origin security on file:// URLs, disabling asynchronous API calls, web workers, and modules.'
        }
      },
      quiz: [
        {
          id: 'q-01-5',
          question: 'What does the hostname localhost (127.0.0.1) refer to in computer networking?',
          options: [
            'The local computer you are currently working on (loopback)',
            'Google’s primary DNS server',
            'The nearest cloud data center',
            'The public gateway of your Wi-Fi router'
          ],
          correctIndex: 0,
          explanation: 'localhost and 127.0.0.1 always refer to the local machine executing the request.'
        }
      ],
      summary: [
        'Local HTTP servers unlock full web API and module capabilities.',
        'Always verify zero console errors before shipping.',
        'Test layouts across mobile, tablet, and desktop viewports.',
        'A thorough QA checklist guarantees professional deployment quality.'
      ],
      relatedTopics: [
        {
          title: 'HTML Fundamentals',
          chapterNumber: '02',
          lessonId: 'ch-02-l-01',
          context: 'Begin deep-diving into semantic HTML tags, forms, and accessibility.'
        }
      ]
    }
  ]
};
