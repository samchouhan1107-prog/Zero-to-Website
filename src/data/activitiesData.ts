import { LessonActivityDeck } from '../types';

export const ACTIVITIES_DATA: Record<string, LessonActivityDeck> = {
  'ch-00-l-01': {
    lessonId: 'ch-00-l-01',
    title: 'How the Internet & Browsers Work',
    flashcards: [
      {
        id: 'fc-01',
        category: 'Concept',
        front: 'What is the role of DNS in web communication?',
        back: 'DNS (Domain Name System) translates human-readable domain names (like google.com) into numerical IP addresses (like 142.250.190.46) so browsers can locate servers.',
        tip: 'Think of DNS as the phonebook directory of the internet.'
      },
      {
        id: 'fc-02',
        category: 'Concept',
        front: 'What is the difference between a Client and a Server?',
        back: 'A Client (e.g. browser, mobile app) requests resources and renders UI. A Server listens for requests, processes business logic, queries databases, and sends back responses.',
        tip: 'Clients request, Servers respond.'
      },
      {
        id: 'fc-03',
        category: 'Syntax',
        front: 'What are the 3 foundational pillars of modern web pages?',
        back: 'HTML provides the structural skeleton, CSS controls the styling and layout presentation, and JavaScript powers dynamic behavior and user interactivity.',
        codeSnippet: '<!-- HTML --> <h1>Hi</h1>\n/* CSS */ h1 { color: blue; }\n// JS: alert("Hello!");'
      },
      {
        id: 'fc-04',
        category: 'Best Practice',
        front: 'Why is HTTPS preferred over HTTP?',
        back: 'HTTPS encrypts all data sent between client and server using TLS/SSL cryptographic certificates, preventing eavesdropping, tampering, and man-in-the-middle attacks.'
      },
      {
        id: 'fc-05',
        category: 'Concept',
        front: 'What is the Critical Rendering Path?',
        back: 'The sequential pipeline browsers use to turn code into pixels: HTML -> DOM tree, CSS -> CSSOM tree, Combined -> Render Tree -> Layout computation -> Paint to screen.'
      }
    ],
    bugHunt: {
      id: 'bug-00-01',
      title: 'Missing Event Listener Connection',
      difficulty: 'Easy',
      description: 'The developer wants to log a message when the user clicks the button, but the event listener has a syntax typo and is targeting the wrong ID.',
      hint: 'Check document.getElementById selector name and ensure addEventListener receives "click", not "onclick".',
      brokenCode: `// Broken code
const myButton = document.getElementById('my-btn');
myButton.addEventListener('onclick', function() {
  console.log('Button clicked successfully!');
});`,
      fixedCode: `// Fixed code
const myButton = document.getElementById('my-btn');
myButton.addEventListener('click', function() {
  console.log('Button clicked successfully!');
});`,
      explanation: 'When using addEventListener(), event names are passed without the "on" prefix (use "click", not "onclick").',
      language: 'javascript'
    },
    codeSequence: {
      id: 'seq-00-01',
      title: 'HTTP Request-Response Lifecycle Flow',
      instructions: 'Arrange the sequence of steps that occur when a user visits a website in chronological order.',
      language: 'javascript',
      steps: [
        { id: 's1', code: '// 1. User types domain name in address bar and hits Enter', order: 1 },
        { id: 's2', code: '// 2. Browser queries DNS resolver to get server IP address', order: 2 },
        { id: 's3', code: '// 3. TCP / TLS Handshake established with target server (port 443)', order: 3 },
        { id: 's4', code: '// 4. Browser sends HTTP GET request with Request Headers', order: 4 },
        { id: 's5', code: '// 5. Server responds with 200 OK status, headers & HTML payload', order: 5 },
        { id: 's6', code: '// 6. Browser parses HTML, builds DOM tree & downloads CSS/JS', order: 6 }
      ],
      explanation: 'DNS maps URL to IP, TLS secures the socket, HTTP requests the file, and the browser parses DOM/CSSOM to paint pixels!'
    },
    speedQuiz: [
      {
        id: 'sq-1',
        prompt: 'Which HTTP status code signifies a successful resource delivery?',
        options: ['200 OK', '301 Moved Permanently', '404 Not Found', '500 Internal Server Error'],
        correctIndex: 0,
        explanation: 'Status 200 means the server successfully processed the request and sent the payload.'
      },
      {
        id: 'sq-2',
        prompt: 'What happens during DNS lookup?',
        options: ['HTML is compiled into bytecode', 'A domain name is resolved into an IP address', 'CSS is transformed into AST', 'Cookies are encrypted on the client'],
        correctIndex: 1,
        explanation: 'DNS resolves human-friendly names (e.g. github.com) into network IP addresses.'
      },
      {
        id: 'sq-3',
        prompt: 'Which browser tree structure combines DOM nodes and CSS styling rules for painting?',
        options: ['AST Tree', 'Shadow DOM', 'Render Tree', 'B-Tree Index'],
        correctIndex: 2,
        explanation: 'The Render Tree combines DOM hierarchy with CSSOM style rules to compute physical layout coordinates.'
      }
    ],
    cheatsheetItems: [
      { term: 'DNS', definition: 'Domain Name System. Translates domain names into machine-routable IP addresses.' },
      { term: 'HTTP / HTTPS', definition: 'HyperText Transfer Protocol (Secure). Standard protocol for web client-server communication over port 80 / 443.' },
      { term: 'DOM', definition: 'Document Object Model. Tree representation of HTML tags in browser memory accessible via JS.' },
      { term: 'CSSOM', definition: 'CSS Object Model. Tree representation of styling rules calculated for each element node.' }
    ]
  },
  'ch-00-l-02': {
    lessonId: 'ch-00-l-02',
    title: 'Setting Up Developer Environment',
    flashcards: [
      {
        id: 'fc-02-01',
        category: 'Concept',
        front: 'What is Node.js and why do frontend developers need it?',
        back: 'Node.js is a V8 JavaScript runtime that runs outside the browser, powering package managers (npm/pnpm), build tools (Vite/Webpack), and local development servers.',
        tip: 'Node allows JS to execute scripts, bundle files, and run command-line tools.'
      },
      {
        id: 'fc-02-02',
        category: 'Syntax',
        front: 'What does npm install (or npm i) do?',
        back: 'It reads package.json, downloads all listed dependencies and sub-dependencies into node_modules, and creates or updates package-lock.json with exact version hashes.',
        codeSnippet: '$ npm install lodash'
      },
      {
        id: 'fc-02-03',
        category: 'Best Practice',
        front: 'Why should node_modules never be committed to Git?',
        back: 'node_modules contains thousands of generated files that bloat repository size. Team members can regenerate it reliably using "npm install" from package.json and lockfile.',
        tip: 'Always add node_modules/ to your .gitignore file.'
      }
    ],
    bugHunt: {
      id: 'bug-00-02',
      title: 'Broken JSON in package.json',
      difficulty: 'Easy',
      description: 'The dev server refuses to start because package.json contains a trailing comma error, which is invalid JSON syntax.',
      hint: 'JSON standard strictly disallows trailing commas after the last property in an object.',
      brokenCode: `{\n  "name": "my-cool-app",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n  }\n}`,
      fixedCode: `{\n  "name": "my-cool-app",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  }\n}`,
      explanation: 'Standard JSON forbids trailing commas after the last key-value pair in objects and arrays.',
      language: 'javascript'
    },
    codeSequence: {
      id: 'seq-00-02',
      title: 'Starting a Modern Frontend Project',
      instructions: 'Arrange the terminal commands to initialize a new Vite project from scratch.',
      language: 'javascript',
      steps: [
        { id: 's1', code: '$ npm create vite@latest my-app -- --template react-ts', order: 1 },
        { id: 's2', code: '$ cd my-app', order: 2 },
        { id: 's3', code: '$ npm install', order: 3 },
        { id: 's4', code: '$ git init && git add . && git commit -m "Initial commit"', order: 4 },
        { id: 's5', code: '$ npm run dev', order: 5 }
      ],
      explanation: 'Initialize template -> navigate to folder -> install node modules -> initialize git repo -> boot local dev server!'
    },
    speedQuiz: [
      {
        id: 'sq-02-1',
        prompt: 'Which file ensures identical dependency versions across all developer machines?',
        options: ['package-lock.json', '.gitignore', 'tsconfig.json', 'README.md'],
        correctIndex: 0,
        explanation: 'package-lock.json locks down exact resolved hashes and versions of nested modules.'
      },
      {
        id: 'sq-02-2',
        prompt: 'Which shortcut opens Chrome DevTools on Mac?',
        options: ['Cmd + Option + I', 'Cmd + Shift + P', 'Ctrl + Alt + Delete', 'Cmd + K'],
        correctIndex: 0,
        explanation: 'Cmd + Option + I (or F12 on Windows/Linux) opens browser Developer Tools.'
      }
    ],
    cheatsheetItems: [
      { term: 'npm init', definition: 'Initializes a new package.json file in the current working directory.' },
      { term: '.gitignore', definition: 'Specifies intentionally untracked files that Git should ignore (e.g. node_modules, .env).' },
      { term: 'Vite', definition: 'Next-generation frontend tooling providing ultra-fast HMR and optimized Rollup production builds.' }
    ]
  },
  'ch-01-l-01': {
    lessonId: 'ch-01-l-01',
    title: 'HTML Anatomy, Semantics & Document Tree',
    flashcards: [
      {
        id: 'fc-01-01',
        category: 'Concept',
        front: 'Why should you prefer semantic tags (<main>, <nav>, <article>) over generic <div> tags?',
        back: 'Semantic tags provide clear meaning to search engines (SEO), screen readers (accessibility), and fellow developers, while generic <div> tags convey zero structural meaning.',
        tip: 'Think of semantic tags as descriptive architectural blueprints.'
      },
      {
        id: 'fc-01-02',
        category: 'Syntax',
        front: 'What is the purpose of the <!DOCTYPE html> declaration?',
        back: 'It tells the browser engine to render the document in modern HTML5 standards mode rather than legacy "quirks mode".',
        codeSnippet: '<!DOCTYPE html>\n<html lang="en">\n  <head>...</head>\n</html>'
      },
      {
        id: 'fc-01-03',
        category: 'Best Practice',
        front: 'Why is the alt attribute required on <img> elements?',
        back: 'The alt attribute provides text descriptions for visually impaired users using screen readers, and displays fallback text if image loading fails.',
        codeSnippet: '<img src="profile.jpg" alt="Smiling portrait of Alex Dev">'
      },
      {
        id: 'fc-01-04',
        category: 'Syntax',
        front: 'What goes in the <head> vs the <body> of an HTML document?',
        back: '<head> contains metadata, title, charsets, and stylesheet links (not directly visible). <body> contains all renderable content seen on page.',
        tip: 'Head = Brain/Settings; Body = Visible Anatomy.'
      }
    ],
    bugHunt: {
      id: 'bug-01-01',
      title: 'Unclosed Tags & Broken Hierarchy',
      difficulty: 'Easy',
      description: 'The navigation links are incorrectly nested and missing closing tags, causing screen readers to misread the menu.',
      hint: 'Ensure every <nav> has a properly closed <ul> and nested <li> items.',
      brokenCode: `<!-- Broken Navigation Structure -->
<nav>
  <ul>
    <li><a href="/home">Home</a>
    <li><a href="/about">About</a>
    <li><a href="/contact">Contact</a>
</nav>`,
      fixedCode: `<!-- Fixed Clean Semantic Navigation -->
<nav aria-label="Main Navigation">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`,
      explanation: 'All list items <li> and parent <ul> must be explicitly closed before terminating the <nav> block.',
      language: 'html'
    },
    codeSequence: {
      id: 'seq-01-01',
      title: 'Standard HTML5 Document Skeleton',
      instructions: 'Arrange the fundamental boilerplate elements of an HTML5 document in correct hierarchy.',
      language: 'html',
      steps: [
        { id: 's1', code: '<!DOCTYPE html>', order: 1 },
        { id: 's2', code: '<html lang="en">', order: 2 },
        { id: 's3', code: '  <head>\n    <meta charset="UTF-8">\n    <title>My Web Page</title>\n  </head>', order: 3 },
        { id: 's4', code: '  <body>', order: 4 },
        { id: 's5', code: '    <header><nav>Navigation Bar</nav></header>\n    <main><article>Core Content</article></main>\n    <footer>Copyright 2026</footer>', order: 5 },
        { id: 's6', code: '  </body>\n</html>', order: 6 }
      ],
      explanation: 'DocType -> html tag -> head (metadata) -> body (header, main, footer) -> closing tags.'
    },
    speedQuiz: [
      {
        id: 'sq-1-1',
        prompt: 'Which HTML tag represents the primary, unique content of a document?',
        options: ['<section>', '<main>', '<content>', '<article>'],
        correctIndex: 1,
        explanation: '<main> specifies the main content body of the document, excluding headers, sidebars, and footers.'
      },
      {
        id: 'sq-1-2',
        prompt: 'Which element is NOT a self-closing (void) tag in HTML5?',
        options: ['<img>', '<input>', '<p>', '<br>'],
        correctIndex: 2,
        explanation: '<p> is a container tag requiring a closing </p>, whereas <img>, <input>, and <br> are void elements.'
      }
    ],
    cheatsheetItems: [
      { term: '<header>', definition: 'Container for introductory content, logos, or navigational links.' },
      { term: '<main>', definition: 'Dominant content of the <body>. There should only be one per page.' },
      { term: '<article>', definition: 'Self-contained, reusable piece of content (e.g. blog post, card, news item).' },
      { term: '<aside>', definition: 'Content tangentially related to the content around it (e.g. sidebar, pull quotes).' }
    ]
  },
  'ch-01-l-02': {
    lessonId: 'ch-01-l-02',
    title: 'Forms, Accessibility & Media',
    flashcards: [
      {
        id: 'fc-12-01',
        category: 'Accessibility',
        front: 'How do you correctly connect a <label> with an <input>?',
        back: 'Set the label\'s "for" (or htmlFor) attribute to match the input\'s unique "id" attribute.',
        codeSnippet: '<label for="user-email">Email Address</label>\n<input type="email" id="user-email" name="email" required>'
      },
      {
        id: 'fc-12-02',
        category: 'Best Practice',
        front: 'What is the purpose of ARIA attributes (like aria-label, aria-live)?',
        back: 'Accessible Rich Internet Applications (ARIA) attributes communicate widget states, dynamic updates, and labels to assistive technologies like screen readers.',
        tip: 'Rule of thumb: Always use native HTML elements first; use ARIA when native tags cannot convey dynamic states.'
      },
      {
        id: 'fc-12-03',
        category: 'Syntax',
        front: 'What does the required attribute do on form inputs?',
        back: 'It triggers built-in native browser validation, preventing form submission if the field is empty.',
        codeSnippet: '<input type="text" name="username" required minlength="3">'
      }
    ],
    bugHunt: {
      id: 'bug-01-02',
      title: 'Inaccessible Form Controls',
      difficulty: 'Medium',
      description: 'The input fields lack associated labels and missing type attributes, failing accessibility audits.',
      hint: 'Wrap or connect every input with a <label for="..."> matching the input ID.',
      brokenCode: `<!-- Broken Form -->
<form>
  <span>Your Password:</span>
  <input name="pwd" />
  <button>Submit</button>
</form>`,
      fixedCode: `<!-- Accessible Form -->
<form>
  <label for="password-input">Your Password:</label>
  <input type="password" id="password-input" name="pwd" required autocomplete="current-password" />
  <button type="submit">Submit</button>
</form>`,
      explanation: 'Associating label "for" with input "id" and setting type="password" ensures privacy and screen-reader accessibility.',
      language: 'html'
    },
    codeSequence: {
      id: 'seq-01-02',
      title: 'Building an Accessible Contact Form',
      instructions: 'Order the elements inside a complete accessible HTML form with validation.',
      language: 'html',
      steps: [
        { id: 's1', code: '<form action="/api/contact" method="POST">', order: 1 },
        { id: 's2', code: '  <fieldset>\n    <legend>Personal Information</legend>', order: 2 },
        { id: 's3', code: '    <label for="full-name">Full Name *</label>\n    <input type="text" id="full-name" name="name" required />', order: 3 },
        { id: 's4', code: '    <label for="email-addr">Email *</label>\n    <input type="email" id="email-addr" name="email" required />', order: 4 },
        { id: 's5', code: '  </fieldset>', order: 5 },
        { id: 's6', code: '  <button type="submit">Send Message</button>\n</form>', order: 6 }
      ],
      explanation: 'Form opening -> Fieldset grouping -> Labeled inputs with matching IDs -> Submit button -> Form closing.'
    },
    speedQuiz: [
      {
        id: 'sq-12-1',
        prompt: 'Which input type enforces a valid domain and @ symbol in native validation?',
        options: ['type="url"', 'type="email"', 'type="text"', 'type="search"'],
        correctIndex: 1,
        explanation: 'type="email" checks for basic email address format conformance.'
      },
      {
        id: 'sq-12-2',
        prompt: 'Why should button elements inside forms have an explicit type="button" if they do not submit?',
        options: ['Because default button type is "submit"', 'Because CSS requires it', 'Because HTML5 deprecated generic buttons', 'To enable hover states'],
        correctIndex: 0,
        explanation: 'Buttons inside forms default to type="submit", which will trigger form submission on click unless specified as type="button".'
      }
    ],
    cheatsheetItems: [
      { term: '<fieldset> & <legend>', definition: 'Groups related controls together and gives the group a caption title.' },
      { term: 'aria-live="polite"', definition: 'Announces dynamic changes to screen readers as soon as the user is idle.' },
      { term: 'autocomplete', definition: 'Helps browser password managers and autofill populate address, name, or credit card info.' }
    ]
  },
  'ch-02-l-01': {
    lessonId: 'ch-02-l-01',
    title: 'CSS Box Model & Modern Layout Systems',
    flashcards: [
      {
        id: 'fc-02-01-1',
        category: 'Concept',
        front: 'What are the 4 layers of the CSS Box Model from inside out?',
        back: '1. Content (text/images) -> 2. Padding (clears area around content) -> 3. Border (wraps padding) -> 4. Margin (clears area outside border).',
        tip: 'Inside to outside: Content -> Padding -> Border -> Margin.'
      },
      {
        id: 'fc-02-01-2',
        category: 'Best Practice',
        front: 'Why is box-sizing: border-box universally recommended?',
        back: 'With border-box, the width and height properties include padding and border, preventing unexpected layout overflows when adding padding.',
        codeSnippet: '*, *::before, *::after {\n  box-sizing: border-box;\n}'
      },
      {
        id: 'fc-02-01-3',
        category: 'Syntax',
        front: 'What is margin collapsing in CSS?',
        back: 'When top and bottom margins of adjacent block elements touch, they collapse into a single margin equal to the largest of the two values rather than adding together.'
      }
    ],
    bugHunt: {
      id: 'bug-02-01',
      title: 'Unexpected Card Width Blowout',
      difficulty: 'Medium',
      description: 'A 50% width card with 20px padding and 2px border wraps to the next line instead of sitting side-by-side.',
      hint: 'The default content-box model adds padding and border onto the 50% width. Switch to box-sizing: border-box.',
      brokenCode: `/* Broken card styles */
.card-half {
  width: 50%;
  padding: 20px;
  border: 2px solid #cbd5e1;
  /* Missing border-box sizing */
}`,
      fixedCode: `/* Fixed clean styles */
.card-half {
  box-sizing: border-box;
  width: 50%;
  padding: 20px;
  border: 2px solid #cbd5e1;
}`,
      explanation: 'Setting box-sizing: border-box ensures padding and borders are calculated inside the 50% width constraint.',
      language: 'css'
    },
    codeSequence: {
      id: 'seq-02-01',
      title: 'Modern CSS Reset Declaration',
      instructions: 'Assemble the universal CSS reset rules used by modern frontend engineers.',
      language: 'css',
      steps: [
        { id: 's1', code: '*, *::before, *::after {', order: 1 },
        { id: 's2', code: '  box-sizing: border-box;', order: 2 },
        { id: 's3', code: '  margin: 0;\n  padding: 0;', order: 3 },
        { id: 's4', code: '}', order: 4 },
        { id: 's5', code: 'body {\n  min-height: 100vh;\n  line-height: 1.5;\n}', order: 5 }
      ],
      explanation: 'Universal selector resets box-sizing and default margins across all elements, while body sets baseline height.'
    },
    speedQuiz: [
      {
        id: 'sq-21-1',
        prompt: 'If a div has width: 200px, padding: 10px, border: 2px with box-sizing: content-box, what is total rendered width?',
        options: ['200px', '224px', '212px', '240px'],
        correctIndex: 1,
        explanation: '200px content + 10px left pad + 10px right pad + 2px left border + 2px right border = 224px total.'
      },
      {
        id: 'sq-21-2',
        prompt: 'Which CSS property creates space OUTSIDE of an element\'s border?',
        options: ['padding', 'margin', 'gap', 'outline'],
        correctIndex: 1,
        explanation: 'Margin creates transparent buffer space outside the border separating adjacent elements.'
      }
    ],
    cheatsheetItems: [
      { term: 'box-sizing: border-box', definition: 'Includes padding and border inside the specified width and height.' },
      { term: 'margin: 0 auto', definition: 'Horizontally centers a block element with a defined width inside its parent container.' },
      { term: 'min-height: 100vh', definition: 'Ensures the container spans at least 100% of the viewport vertical height.' }
    ]
  },
  'ch-02-l-02': {
    lessonId: 'ch-02-l-02',
    title: 'Flexbox & CSS Grid Mastery',
    flashcards: [
      {
        id: 'fc-02-02-1',
        category: 'Concept',
        front: 'When should you use Flexbox vs CSS Grid?',
        back: 'Use Flexbox for 1-dimensional layouts (a single row OR column, aligning buttons, navbars). Use CSS Grid for 2-dimensional layouts (rows AND columns simultaneously, page layout grids).',
        tip: 'Flexbox = Content-first 1D; Grid = Layout-first 2D.'
      },
      {
        id: 'fc-02-02-2',
        category: 'Syntax',
        front: 'How do you perfectly center any element with Flexbox?',
        back: 'display: flex; justify-content: center; align-items: center;',
        codeSnippet: '.center-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}'
      },
      {
        id: 'fc-02-02-3',
        category: 'Syntax',
        front: 'What does grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) do?',
        back: 'Creates an intrinsically responsive grid where columns automatically wrap and fill available space without needing media queries!',
        codeSnippet: '.bento-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1.5rem;\n}'
      }
    ],
    bugHunt: {
      id: 'bug-02-02',
      title: 'Misaligned Flexbox Items',
      difficulty: 'Medium',
      description: 'The navbar items are bunched up on the left instead of having the logo on the left and user profile on the right.',
      hint: 'Use justify-content: space-between on the flex container.',
      brokenCode: `/* Broken flex navbar */
.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}`,
      fixedCode: `/* Fixed spaced navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}`,
      explanation: 'justify-content: space-between pushes first item to the left and last item to the far right.',
      language: 'css'
    },
    codeSequence: {
      id: 'seq-02-02',
      title: 'Building a Holy Grail CSS Grid Layout',
      instructions: 'Order the CSS rules to declare a modern header-sidebar-content-footer grid.',
      language: 'css',
      steps: [
        { id: 's1', code: '.app-layout {\n  display: grid;', order: 1 },
        { id: 's2', code: '  grid-template-areas:\n    "header header"\n    "sidebar content"\n    "footer footer";', order: 2 },
        { id: 's3', code: '  grid-template-columns: 260px 1fr;\n  grid-template-rows: auto 1fr auto;', order: 3 },
        { id: 's4', code: '  min-height: 100vh;\n  gap: 1rem;\n}', order: 4 }
      ],
      explanation: 'Declare display: grid -> define named grid areas -> specify column & row tracks -> set container height.'
    },
    speedQuiz: [
      {
        id: 'sq-22-1',
        prompt: 'In a flex container with flex-direction: row, which property aligns items along the cross axis (vertical)?',
        options: ['justify-content', 'align-items', 'flex-grow', 'align-content'],
        correctIndex: 1,
        explanation: 'align-items aligns children along the cross axis (vertical in row direction).'
      },
      {
        id: 'sq-22-2',
        prompt: 'What unit represents a fractional share of free available space in CSS Grid?',
        options: ['fr', 'em', 'rem', 'vw'],
        correctIndex: 0,
        explanation: '1fr stands for one fraction of the remaining available space inside the grid container.'
      }
    ],
    cheatsheetItems: [
      { term: 'justify-content', definition: 'Aligns flex items along the main axis (e.g. center, space-between, space-around).' },
      { term: 'align-items', definition: 'Aligns flex items along the cross axis (e.g. stretch, center, flex-start).' },
      { term: 'gap', definition: 'Sets gutter spacing between flex and grid rows/columns without relying on child margins.' }
    ]
  },
  'ch-03-l-01': {
    lessonId: 'ch-03-l-01',
    title: 'JavaScript Foundations, Scope & Functions',
    flashcards: [
      {
        id: 'fc-03-01-1',
        category: 'Syntax',
        front: 'What is the difference between const, let, and var?',
        back: 'const: block-scoped, cannot be reassigned. let: block-scoped, can be reassigned. var: legacy function-scoped, prone to hoisting bugs (avoid in modern JS).',
        codeSnippet: 'const PI = 3.14159;\nlet score = 100;\nscore += 25;'
      },
      {
        id: 'fc-03-01-2',
        category: 'Concept',
        front: 'What is a Closure in JavaScript?',
        back: 'A closure is a function that retains access to its lexical outer scope variables even when executed outside that scope.',
        codeSnippet: 'function createCounter() {\n  let count = 0;\n  return () => ++count;\n}'
      },
      {
        id: 'fc-03-01-3',
        category: 'Best Practice',
        front: 'Why use === (strict equality) instead of == (loose equality)?',
        back: '=== checks both value AND type without implicit type coercion (e.g. 0 === false is false, but 0 == false is true).',
        tip: 'Always default to === for predictable logic.'
      }
    ],
    bugHunt: {
      id: 'bug-03-01',
      title: 'Reassigning a const Variable',
      difficulty: 'Easy',
      description: 'The shopping cart throws TypeError: Assignment to constant variable when calculating discount.',
      hint: 'Variables that will change value must be declared with let, not const.',
      brokenCode: `// Broken code
const totalPrice = 120;
if (totalPrice > 100) {
  totalPrice = totalPrice * 0.9; // TypeError!
}
console.log('Final price:', totalPrice);`,
      fixedCode: `// Fixed code
let totalPrice = 120;
if (totalPrice > 100) {
  totalPrice = totalPrice * 0.9;
}
console.log('Final price:', totalPrice);`,
      explanation: 'const variables cannot be reassigned. Use let when values undergo transformation.',
      language: 'javascript'
    },
    codeSequence: {
      id: 'seq-03-01',
      title: 'Modern Arrow Function with Array Methods',
      instructions: 'Order the code to filter active users and extract their uppercase names.',
      language: 'javascript',
      steps: [
        { id: 's1', code: 'const users = [{ name: "Sam", active: true }, { name: "Leo", active: false }];', order: 1 },
        { id: 's2', code: 'const activeUserNames = users', order: 2 },
        { id: 's3', code: '  .filter(user => user.active)', order: 3 },
        { id: 's4', code: '  .map(user => user.name.toUpperCase());', order: 4 },
        { id: 's5', code: 'console.log(activeUserNames); // ["SAM"]', order: 5 }
      ],
      explanation: 'Define array -> chain filter predicate -> chain map transform -> log output.'
    },
    speedQuiz: [
      {
        id: 'sq-31-1',
        prompt: 'What does typeof null return in JavaScript?',
        options: ['"object"', '"null"', '"undefined"', '"number"'],
        correctIndex: 0,
        explanation: 'Due to a historical legacy artifact in JS, typeof null returns "object".'
      },
      {
        id: 'sq-31-2',
        prompt: 'Which array method creates a new array with all elements that pass a provided test?',
        options: ['map()', 'filter()', 'reduce()', 'forEach()'],
        correctIndex: 1,
        explanation: 'filter() creates a shallow copy containing only items matching the truthy condition.'
      }
    ],
    cheatsheetItems: [
      { term: 'const / let', definition: 'Block-scoped variable declarations. Prefer const by default; let when reassigning.' },
      { term: 'Arrow Function', definition: 'Compact syntax: (param) => expression. Does not bind its own this context.' },
      { term: 'Template Literals', definition: 'Backtick strings allowing interpolated variables `${variable}` and multiline text.' }
    ]
  },
  'ch-03-l-02': {
    lessonId: 'ch-03-l-02',
    title: 'DOM Manipulation & Asynchronous JS',
    flashcards: [
      {
        id: 'fc-03-02-1',
        category: 'Concept',
        front: 'What is the Event Loop in JavaScript?',
        back: 'The event loop continuously monitors the Call Stack and Task/Microtask Queues, pushing queued callbacks onto the stack whenever the stack becomes empty.',
        tip: 'JavaScript is single-threaded; the Event Loop handles non-blocking asynchronous operations.'
      },
      {
        id: 'fc-03-02-2',
        category: 'Syntax',
        front: 'How do you perform a modern API fetch with async/await?',
        back: 'Use await fetch(url), check response.ok, and parse with await response.json() inside a try/catch block.',
        codeSnippet: 'async function loadData() {\n  try {\n    const res = await fetch("/api/users");\n    if (!res.ok) throw new Error("HTTP error " + res.status);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(err);\n  }\n}'
      },
      {
        id: 'fc-03-02-3',
        category: 'Best Practice',
        front: 'What is Event Delegation and why is it useful?',
        back: 'Attaching a single event listener to a common parent element instead of attaching hundreds of listeners to each child, utilizing event bubbling.',
        codeSnippet: 'list.addEventListener("click", (e) => {\n  if (e.target.matches(".item-btn")) handleItem(e.target);\n});'
      }
    ],
    bugHunt: {
      id: 'bug-03-02',
      title: 'Unhandled Promise Rejection & Missing await',
      difficulty: 'Medium',
      description: 'The fetch function returns Promise { <pending> } instead of JSON data because the response.json() call is missing await.',
      hint: 'response.json() is an asynchronous promise that must be awaited before accessing properties.',
      brokenCode: `// Broken async function
async function getUser() {
  const res = await fetch('https://api.example.com/user');
  const user = res.json(); // Missing await!
  console.log('User name:', user.name); // undefined!
}`,
      fixedCode: `// Fixed async function
async function getUser() {
  try {
    const res = await fetch('https://api.example.com/user');
    const user = await res.json();
    console.log('User name:', user.name);
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}`,
      explanation: 'res.json() returns a Promise that must be awaited to resolve the parsed JavaScript object.',
      language: 'javascript'
    },
    codeSequence: {
      id: 'seq-03-02',
      title: 'Dynamic DOM Element Creation Pipeline',
      instructions: 'Arrange the steps to create a new list item and append it to the document.',
      language: 'javascript',
      steps: [
        { id: 's1', code: 'const parentList = document.querySelector("#todo-list");', order: 1 },
        { id: 's2', code: 'const newLi = document.createElement("li");', order: 2 },
        { id: 's3', code: 'newLi.className = "flex items-center p-2 rounded bg-slate-100";', order: 3 },
        { id: 's4', code: 'newLi.textContent = "Learn Async JavaScript";', order: 4 },
        { id: 's5', code: 'parentList.appendChild(newLi);', order: 5 }
      ],
      explanation: 'Select target -> createElement -> set class & text content -> appendChild to DOM.'
    },
    speedQuiz: [
      {
        id: 'sq-32-1',
        prompt: 'In what phase of DOM event dispatch does an event travel from the window down to the target element?',
        options: ['Bubbling Phase', 'Capturing Phase', 'Target Phase', 'Execution Phase'],
        correctIndex: 1,
        explanation: 'The Capturing (Trickling) phase travels from Window down to Target, then Bubbles back up.'
      },
      {
        id: 'sq-32-2',
        prompt: 'Which method stops an event from bubbling up the DOM tree?',
        options: ['e.preventDefault()', 'e.stopPropagation()', 'e.stopImmediate()', 'e.cancelBubble()'],
        correctIndex: 1,
        explanation: 'stopPropagation() stops the event from propagating further up or down the DOM tree.'
      }
    ],
    cheatsheetItems: [
      { term: 'document.querySelector()', definition: 'Returns the first Element within the document that matches the specified CSS selector.' },
      { term: 'addEventListener()', definition: 'Sets up a function that will be called whenever the specified event is delivered to the target.' },
      { term: 'Promise.all()', definition: 'Takes an iterable of promises and returns a single Promise that resolves when all input promises resolve.' }
    ]
  },
  'ch-04-l-01': {
    lessonId: 'ch-04-l-01',
    title: 'Git Version Control & Terminal Power',
    flashcards: [
      {
        id: 'fc-04-01-1',
        category: 'Concept',
        front: 'What are the 3 states of files in Git?',
        back: '1. Working Directory (modified files) -> 2. Staging Area (indexed files ready for commit via git add) -> 3. Git Repository (committed snapshots via git commit).',
        tip: 'Modify -> Stage -> Commit.'
      },
      {
        id: 'fc-04-01-2',
        category: 'Syntax',
        front: 'How do you create and immediately switch to a new Git branch?',
        back: 'git checkout -b feature-branch or modern: git switch -c feature-branch',
        codeSnippet: '$ git switch -c feature/login-page'
      },
      {
        id: 'fc-04-01-3',
        category: 'Best Practice',
        front: 'What is a merge conflict and how is it resolved?',
        back: 'A merge conflict occurs when two branches modify the same lines of a file. Git pauses merge and inserts conflict markers (<<<<<<<, =======, >>>>>>>) for developer manual resolution.'
      }
    ],
    bugHunt: {
      id: 'bug-04-01',
      title: 'Accidental Direct Push to Main',
      difficulty: 'Easy',
      description: 'The engineer forgot to create a feature branch before making changes and committed directly on main.',
      hint: 'Use git checkout -b to branch off current work and leave main untouched.',
      brokenCode: `# Risky workflow
$ git checkout main
$ # edit files...
$ git add . && git commit -m "WIP changes"
$ git push origin main # 🚨 Overwriting production branch!`,
      fixedCode: `# Professional workflow
$ git switch -c feature/user-profile
$ # edit files...
$ git add . && git commit -m "feat: add user avatar upload modal"
$ git push -u origin feature/user-profile # Opens PR safely`,
      explanation: 'Always isolate feature development on dedicated topic branches and merge via Pull Request code reviews.',
      language: 'javascript'
    },
    codeSequence: {
      id: 'seq-04-01',
      title: 'Standard Git Feature Branch Workflow',
      instructions: 'Order the commands from feature start to remote branch pull request.',
      language: 'javascript',
      steps: [
        { id: 's1', code: '$ git pull origin main', order: 1 },
        { id: 's2', code: '$ git switch -c feature/dark-mode', order: 2 },
        { id: 's3', code: '$ # implement dark theme styles and test...', order: 3 },
        { id: 's4', code: '$ git add src/theme.css src/App.tsx', order: 4 },
        { id: 's5', code: '$ git commit -m "feat(ui): implement dark mode color palette"', order: 5 },
        { id: 's6', code: '$ git push -u origin feature/dark-mode', order: 6 }
      ],
      explanation: 'Pull latest main -> create feature branch -> code -> stage changes -> commit descriptive message -> push to remote.'
    },
    speedQuiz: [
      {
        id: 'sq-41-1',
        prompt: 'Which Git command shows the current branch and lists staged/unstaged changes?',
        options: ['git log', 'git status', 'git diff', 'git show'],
        correctIndex: 1,
        explanation: 'git status displays state of working tree and staging area.'
      },
      {
        id: 'sq-41-2',
        prompt: 'What does git stash do?',
        options: ['Deletes all untracked files', 'Temporarily shelves uncommitted changes to give a clean working tree', 'Merges upstream master', 'Deletes previous commit'],
        correctIndex: 1,
        explanation: 'git stash temporarily shelves modified tracked files so you can switch branches without committing.'
      }
    ],
    cheatsheetItems: [
      { term: 'git status', definition: 'Displays paths that have differences between the index file and the current HEAD commit.' },
      { term: 'git commit -m "msg"', definition: 'Records changes to the repository snapshot with an explanatory log message.' },
      { term: 'git merge <branch>', definition: 'Incorporates changes from the named branch into the current active branch.' }
    ]
  },
  'ch-04-l-02': {
    lessonId: 'ch-04-l-02',
    title: 'Cloud Deployment & CI/CD Pipelines',
    flashcards: [
      {
        id: 'fc-04-02-1',
        category: 'Concept',
        front: 'What is CI/CD?',
        back: 'Continuous Integration (CI) automatically builds and tests code on every pull request. Continuous Deployment (CD) automatically releases passing builds directly to cloud hosting environments.',
        tip: 'CI = Auto Test & Verify; CD = Auto Deploy to Users.'
      },
      {
        id: 'fc-04-02-2',
        category: 'Best Practice',
        front: 'Where should secret API keys (like STRIPE_SECRET) be stored in deployment?',
        back: 'Secrets must be stored in secure Cloud Environment Variables (Secret Manager / Cloud Run configs), NEVER hardcoded into public Git repositories or client JavaScript bundles.',
        tip: 'Never commit .env files containing production secrets.'
      },
      {
        id: 'fc-04-02-3',
        category: 'Concept',
        front: 'What is a CDN (Content Delivery Network)?',
        back: 'A geographically distributed network of edge proxy servers caching static assets (HTML, CSS, JS, images) close to end users for ultra-fast global load times.',
        tip: 'CDNs minimize network latency by serving files from nearest city edge.'
      }
    ],
    bugHunt: {
      id: 'bug-04-02',
      title: 'Exposing Private API Keys to the Client',
      difficulty: 'Hard',
      description: 'The developer accidentally exposed their secret backend API key directly inside client-side React code.',
      hint: 'API secret keys should only be used in server-side API routes, never with VITE_ prefixes in browser code.',
      brokenCode: `// 🚨 Insecure Client Code!
// App.tsx
const STRIPE_SECRET = 'sk_live_983749827394827394';
export function pay() {
  fetch('https://api.stripe.com/v1/charges', {
    headers: { Authorization: 'Bearer ' + STRIPE_SECRET }
  });
}`,
      fixedCode: `// ✅ Secure Architecture
// App.tsx (Client)
export function pay() {
  // Proxies through secure backend
  fetch('/api/create-payment', { method: 'POST' });
}

// server.ts (Backend - Key hidden safely)
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);`,
      explanation: 'Secret keys must always live on server backends; browsers must only communicate via backend proxy routes.',
      language: 'javascript'
    },
    codeSequence: {
      id: 'seq-04-02',
      title: 'GitHub Actions Automated CI Pipeline',
      instructions: 'Arrange the YAML pipeline stages for an automated pull-request build and test workflow.',
      language: 'javascript',
      steps: [
        { id: 's1', code: 'name: CI Build & Test\non: [push, pull_request]', order: 1 },
        { id: 's2', code: 'jobs:\n  test:\n    runs-on: ubuntu-latest', order: 2 },
        { id: 's3', code: '    steps:\n      - uses: actions/checkout@v4', order: 3 },
        { id: 's4', code: '      - uses: actions/setup-node@v4\n        with: { node-version: 20 }', order: 4 },
        { id: 's5', code: '      - run: npm ci', order: 5 },
        { id: 's6', code: '      - run: npm run lint && npm test && npm run build', order: 6 }
      ],
      explanation: 'Pipeline trigger -> Job environment -> Checkout repo -> Setup Node -> Clean install dependencies -> Lint, Test & Build.'
    },
    speedQuiz: [
      {
        id: 'sq-42-1',
        prompt: 'Which tool automatically runs builds and lint checks when code is pushed to GitHub?',
        options: ['GitHub Actions', 'Vite Dev Server', 'Babel', 'Nginx Proxy'],
        correctIndex: 0,
        explanation: 'GitHub Actions runs automated CI/CD workflows on GitHub event triggers.'
      },
      {
        id: 'sq-42-2',
        prompt: 'What does a 502 Bad Gateway response from a reverse proxy indicate?',
        options: ['The client sent bad JSON', 'The reverse proxy (e.g. Nginx) received an invalid response from upstream app server', 'Authentication token expired', 'Resource moved permanently'],
        correctIndex: 1,
        explanation: '502 Bad Gateway means the edge proxy server could not connect to or received an error from the backend app process.'
      }
    ],
    cheatsheetItems: [
      { term: 'npm run build', definition: 'Compiles and bundles frontend code into minified static assets in dist/ directory.' },
      { term: 'Environment Variables', definition: 'Key-value pairs configured on the host server providing secrets and config without modifying code.' },
      { term: 'Cloud Run / Containers', definition: 'Serverless container execution platforms automatically scaling applications based on traffic.' }
    ]
  }
};

export const getActivityDeckForLesson = (lessonId: string): LessonActivityDeck => {
  return ACTIVITIES_DATA[lessonId] || ACTIVITIES_DATA['ch-00-l-01'];
};
