import { Chapter } from '../types';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 'ch-00',
    number: '00',
    badge: '00',
    slug: 'introduction',
    title: 'Introduction & Web Foundations',
    subtitle: 'Understand how the internet works, client-server models, and website architecture',
    description: 'Demystify the World Wide Web. Learn how browsers communicate with servers, how DNS resolves domain names, and how HTML, CSS, and JS collaborate to render interactive experiences.',
    estimatedHours: '1.5 hrs',
    accentColor: 'indigo',
    iconName: 'Globe',
    totalLessons: 2,
    lessons: [
      {
        id: 'ch-00-l-01',
        chapterId: 'ch-00',
        number: '0.1',
        slug: 'how-the-internet-works',
        title: 'How the Internet & Browsers Work',
        tagline: 'The journey from typing a URL to rendering pixels on your screen',
        durationMinutes: 15,
        learningObjectives: [
          'Understand Clients (browsers) vs Servers (data hosts)',
          'Trace DNS lookup: from domain name to IP address',
          'Explain HTTP/HTTPS Request-Response lifecycle',
          'Differentiate the core roles of HTML, CSS, and JavaScript'
        ],
        theorySections: [
          {
            heading: 'The Client-Server Dance',
            content: 'Whenever you visit a website (like google.com), your browser acts as a Client requesting information from a powerful computer connected to the web known as a Server.',
            bulletPoints: [
              'Client: The requester (your browser, phone app, smart TV)',
              'Server: The provider (storing HTML, images, databases, and APIs)',
              'DNS (Domain Name System): The phonebook of the internet translating google.com into IP address 142.250.190.46',
              'Packets: Small chunks of data traveling across global optical cables'
            ],
            callout: {
              type: 'key-rule',
              text: 'A webpage is not a single file—it is a collection of HTML (structure), CSS (presentation), images, and JS scripts requested sequentially over HTTP.'
            }
          },
          {
            heading: 'The Holy Trinity of Web Development',
            content: 'Every web application is built on three foundational technologies that work together in harmony inside the browser engine.',
            bulletPoints: [
              'HTML (HyperText Markup Language): The skeleton and content (text, buttons, inputs, links)',
              'CSS (Cascading Style Sheets): The skin and aesthetics (colors, typography, spacing, responsive layout)',
              'JavaScript: The nervous system and logic (clicks, animations, server communication, dynamic changes)'
            ]
          }
        ],
        realWorldAnalogy: {
          title: 'The Restaurant Analogy',
          concept: 'Clients, Servers & HTTP Requests',
          story: 'Think of yourself as the Customer (Client) sitting at a table. The Menu is the URL. You ask the Waiter (HTTP Protocol) for a burger. The Waiter runs back to the Kitchen (Server), the Chefs prepare the food (Database & Assets), and the Waiter delivers the plate back to your table so you can enjoy it (Browser Rendering).',
          moral: 'Clients never cook in the kitchen directly; they make structured requests and receive prepared responses.'
        },
        visualType: 'network-flow',
        codeExample: {
          title: 'A Minimal Web Page in Action',
          description: 'Notice how HTML provides the button, CSS adds colors and borders, and JS handles the click event.',
          html: `<div class="card">\n  <h2>Hello Web Explorer!</h2>\n  <p>Click the button below to trigger JavaScript.</p>\n  <button id="greetBtn">Click Me</button>\n  <p id="outputMsg" class="hidden">🎉 You just made your first interactive web event!</p>\n</div>`,
          css: `.card {\n  background: #ffffff;\n  padding: 24px;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  text-align: center;\n  max-width: 400px;\n}\n\nbutton {\n  background: #4f46e5;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  transition: transform 0.15s ease;\n}\n\nbutton:hover {\n  background: #4338ca;\n  transform: translateY(-2px);\n}\n\n.hidden {\n  display: none;\n}\n\n#outputMsg {\n  margin-top: 16px;\n  color: #16a34a;\n  font-weight: 600;\n}`,
          js: `const btn = document.getElementById('greetBtn');\nconst msg = document.getElementById('outputMsg');\n\nbtn.addEventListener('click', () => {\n  msg.classList.remove('hidden');\n  btn.textContent = 'Awesome!';\n});`,
          breakdown: [
            {
              lineRange: 'HTML L1-7',
              title: 'Structure definition',
              explanation: 'Defines the container card, heading, paragraph, button trigger, and initially hidden message.'
            },
            {
              lineRange: 'CSS L9-22',
              title: 'Presentation styling',
              explanation: 'Styles the button with modern indigo background, rounded corners, and hover elevation.'
            },
            {
              lineRange: 'JS L1-7',
              title: 'DOM Event Listener',
              explanation: 'Attaches a click handler to reveal the hidden output paragraph and update button text.'
            }
          ]
        },
        video: {
          title: 'Mastering the Internet & Browser Pipeline',
          duration: '4:20',
          description: 'A visual walkthrough explaining DNS lookup, IP routing, handshake, and DOM rendering.',
          keyPoints: [
            'How browser caches DNS lookups',
            'TLS/SSL Certificate handshake for HTTPS security',
            'Critical Rendering Path: DOM + CSSOM = Render Tree'
          ],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'Introduction', description: 'What happens when you press Enter in the URL bar' },
            { time: '1:10', seconds: 70, title: 'DNS Resolution', description: 'Domain name to IP address mapping' },
            { time: '2:30', seconds: 150, title: 'Server Response & Headers', description: 'Status codes (200, 404, 500)' },
            { time: '3:45', seconds: 225, title: 'Browser Painting', description: 'Parsing HTML into DOM nodes' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:05', seconds: 5, text: 'Welcome to WZ Storehouse! Today we demystify what happens under the hood when a website loads.' },
            { speaker: 'Instructor', time: '1:15', seconds: 75, text: 'When you type a domain name, your computer asks DNS servers for the exact numerical IP address.' },
            { speaker: 'Instructor', time: '2:40', seconds: 160, text: 'Once the connection opens, the server returns HTML files which the browser parses top-to-bottom.' }
          ],
          demoAnimationType: 'packet-route'
        },
        practice: {
          id: 'prac-00-01',
          title: 'Build Your First Interactive Greeting Card',
          difficulty: 'Beginner',
          estimatedTime: '5 mins',
          prompt: 'Customize the card heading with your name, change the button color in CSS to Emerald (#059669), and make the message reveal when clicked!',
          instructions: [
            '1. Inside index.html, update the <h2> tag to say "Welcome to [Your Name]\'s Website"',
            '2. In style.css, change the button background property to #059669',
            '3. In script.js, test the event listener by running the preview and clicking the button'
          ],
          starterHtml: `<div class="card">\n  <h2>Welcome to My Website</h2>\n  <p>Practice web development the interactive way.</p>\n  <button id="startBtn">Start Journey</button>\n  <p id="welcomeNote" style="display:none; color:#059669; margin-top:12px;">🚀 Ready to build amazing things!</p>\n</div>`,
          starterCss: `.card {\n  background: #ffffff;\n  padding: 24px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.08);\n  text-align: center;\n  font-family: sans-serif;\n}\n\nbutton {\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 600;\n}`,
          starterJs: `const btn = document.getElementById('startBtn');\nconst note = document.getElementById('welcomeNote');\n\nbtn.addEventListener('click', () => {\n  note.style.display = 'block';\n  btn.textContent = 'Journey Started!';\n});`,
          solutionHtml: `<div class="card">\n  <h2>Welcome to Alex's Website</h2>\n  <p>Practice web development the interactive way.</p>\n  <button id="startBtn">Start Journey</button>\n  <p id="welcomeNote" style="display:none; color:#059669; margin-top:12px;">🚀 Ready to build amazing things!</p>\n</div>`,
          solutionCss: `.card {\n  background: #ffffff;\n  padding: 24px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.08);\n  text-align: center;\n  font-family: sans-serif;\n}\n\nbutton {\n  background: #059669;\n  color: white;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 15px;\n  font-weight: 600;\n}`,
          solutionJs: `const btn = document.getElementById('startBtn');\nconst note = document.getElementById('welcomeNote');\n\nbtn.addEventListener('click', () => {\n  note.style.display = 'block';\n  btn.textContent = 'Journey Started!';\n});`,
          hints: [
            'Look for background: #3b82f6 in CSS and replace it with #059669.',
            'Edit the text between <h2> and </h2> in the HTML tab.'
          ],
          testCases: [
            {
              id: 't-1',
              description: 'Card container exists with valid heading',
              hint: 'Make sure your HTML has a .card div with an h2 element.',
              checkType: 'selector-exists',
              target: '.card h2'
            },
            {
              id: 't-2',
              description: 'Button element exists with ID startBtn',
              hint: 'Keep the button ID as startBtn.',
              checkType: 'selector-exists',
              target: '#startBtn'
            }
          ]
        },
        quiz: [
          {
            id: 'q-00-1',
            question: 'What is the primary role of the Domain Name System (DNS)?',
            options: [
              'Translates human-readable domain names (like google.com) into numerical IP addresses',
              'Stores user passwords securely in the cloud',
              'Encrypts JavaScript files inside the browser',
              'Renders CSS flexbox containers'
            ],
            correctIndex: 0,
            explanation: 'DNS functions like an internet address book, mapping domain names humans can remember to machine-readable IP addresses.'
          },
          {
            id: 'q-00-2',
            question: 'Which technology is responsible for styling colors, layouts, and typography?',
            options: ['HTML', 'CSS', 'JavaScript', 'SQL'],
            correctIndex: 1,
            explanation: 'CSS (Cascading Style Sheets) defines all visual presentation, layouts, colors, and responsive rules.'
          }
        ],
        miniProject: {
          title: 'My First Web Profile Card',
          subtitle: 'Combine HTML, CSS and JS into a personalized card widget',
          description: 'Build a personalized developer bio card featuring an avatar placeholder, your tech interests badges, and an interactive "Hire Me / Connect" toggle.',
          specifications: [
            'Create a header section with your name and job title',
            'Add at least 3 skill chips with rounded pill styling',
            'Add an interactive button that toggles your contact email'
          ],
          starterCode: {
            html: '<div class="profile">\n  <h1>Developer Name</h1>\n  <p>Frontend Apprentice</p>\n</div>',
            css: '.profile { padding: 20px; border-radius: 8px; font-family: sans-serif; }',
            js: '// Add your interaction script here\nconsole.log("Profile ready!");'
          }
        },
        summary: [
          'The web relies on a Client-Server request-response architecture.',
          'DNS resolves domain names into routable IP addresses.',
          'HTML provides structure, CSS provides visual styling, and JavaScript provides interactive behavior.',
          'Every professional website starts with these fundamental building blocks.'
        ],
        relatedTopics: [
          {
            title: 'Development Environment & DevTools',
            chapterNumber: '01',
            context: 'In Chapter 01 we inspect network requests and DOM trees live with Chrome DevTools.'
          },
          {
            title: 'Semantic HTML Architecture',
            chapterNumber: '02',
            context: 'In Chapter 02 we write accessible, semantic HTML5 document structures.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-01',
    number: '01',
    badge: '01',
    slug: 'development-environment',
    title: 'Development Environment & Tooling',
    subtitle: 'VS Code mastery, browser DevTools inspection, and local workflows',
    description: 'Equip yourself with the tools of professional software engineers. Learn modern code editor setups, extensions, terminal shortcuts, and browser debugging.',
    estimatedHours: '2 hrs',
    accentColor: 'blue',
    iconName: 'Terminal',
    totalLessons: 1,
    lessons: [
      {
        id: 'ch-01-l-01',
        chapterId: 'ch-01',
        number: '1.1',
        slug: 'tools-and-devtools',
        title: 'Mastering Browser DevTools & VS Code',
        tagline: 'Inspect, debug, and diagnose any webpage like a seasoned engineer',
        durationMinutes: 20,
        learningObjectives: [
          'Navigate the Chrome / Firefox Developer Tools panel',
          'Use the Elements panel to inspect and tweak CSS on the fly',
          'Leverage the Console panel for logging, debugging, and testing JS snippets',
          'Understand file directory hierarchies and relative path imports'
        ],
        theorySections: [
          {
            heading: 'The Power of Browser DevTools',
            content: 'Every modern browser comes with built-in Developer Tools (press F12 or Right Click > Inspect). It allows you to peer inside any live website without affecting the original source code.',
            bulletPoints: [
              'Elements Panel: Live DOM tree viewer and interactive CSS box model calculator',
              'Console Panel: JavaScript runtime log, error stack traces, and interactive REPL',
              'Network Panel: Waterfall analysis of loaded images, CSS files, and API endpoints',
              'Device Toolbar: Real-time simulation of mobile phones, tablets, and viewports'
            ]
          }
        ],
        realWorldAnalogy: {
          title: 'The X-Ray Machine & Stethoscope',
          concept: 'Inspecting Code with DevTools',
          story: 'Just like a mechanic uses diagnostic scanners or a doctor uses an X-ray to see inside without surgery, DevTools gives developers an X-ray view of running websites, letting you test changes in real-time safely.',
          moral: 'Never guess what code is doing—inspect it live with DevTools.'
        },
        visualType: 'devtools-suite',
        codeExample: {
          title: 'Console Debugging & Element Selectors',
          description: 'Try opening your browser console and testing DOM manipulation.',
          html: `<div id="debugBox" class="p-4 bg-blue-50 border border-blue-200 rounded">\n  <h3 id="headline">Original Title</h3>\n  <p>Open Console to see the log message!</p>\n</div>`,
          css: `#debugBox {\n  transition: all 0.3s ease;\n}\n.highlight {\n  background-color: #fef08a !important;\n  border-color: #eab308 !important;\n}`,
          js: `console.log("DevTools Inspector Active 🔍");\n\nconst box = document.getElementById('debugBox');\nconst title = document.getElementById('headline');\n\nconsole.info("Target element:", box);\ntitle.textContent = "Title Updated via JavaScript!";\nbox.classList.add('highlight');`,
          breakdown: [
            {
              lineRange: 'JS L1',
              title: 'console.log()',
              explanation: 'Prints diagnostic messages to the developer console for debugging.'
            },
            {
              lineRange: 'JS L7-8',
              title: 'DOM Mutation',
              explanation: 'Dynamically updates text content and adds CSS class at runtime.'
            }
          ]
        },
        video: {
          title: 'Pro Workflow with Chrome DevTools',
          duration: '5:10',
          description: 'How senior developers inspect CSS, edit live DOM, and debug console errors in seconds.',
          keyPoints: ['Inspect Element shortcut', 'Testing CSS pseudo-states (:hover, :active)', 'Breakpoints vs console.log'],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'Opening DevTools', description: 'Shortcuts and panel layout' },
            { time: '1:45', seconds: 105, title: 'Live CSS Editing', description: 'Tweaking colors and padding in real-time' },
            { time: '3:30', seconds: 210, title: 'Mobile Device Mode', description: 'Testing responsive breakpoints' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:10', seconds: 10, text: 'DevTools is your superpower. Press Cmd+Option+I on Mac or F12 on Windows to open it.' }
          ],
          demoAnimationType: 'dom-build'
        },
        practice: {
          id: 'prac-01-01',
          title: 'Fix the Broken Element with JavaScript and CSS',
          difficulty: 'Beginner',
          estimatedTime: '5 mins',
          prompt: 'Add a new CSS rule to style the alert box and log a message to the console.',
          instructions: [
            '1. Add a style for .alert-box with background: #ecfdf5 and border-left: 4px solid #10b981',
            '2. In script.js, use console.log("Alert initialized") to log verification'
          ],
          starterHtml: `<div class="alert-box">\n  <h4>Success Alert</h4>\n  <p>Your development environment is fully operational.</p>\n</div>`,
          starterCss: `.alert-box {\n  padding: 16px;\n  border-radius: 6px;\n  font-family: sans-serif;\n}`,
          starterJs: `// Add your console log below:\n`,
          solutionHtml: `<div class="alert-box">\n  <h4>Success Alert</h4>\n  <p>Your development environment is fully operational.</p>\n</div>`,
          solutionCss: `.alert-box {\n  padding: 16px;\n  border-radius: 6px;\n  font-family: sans-serif;\n  background: #ecfdf5;\n  border-left: 4px solid #10b981;\n}`,
          solutionJs: `console.log("Alert initialized");`,
          hints: ['In the CSS tab, add background: #ecfdf5; inside .alert-box { ... }'],
          testCases: [
            {
              id: 't-1',
              description: 'Alert box has correct class',
              hint: 'Ensure .alert-box div exists.',
              checkType: 'selector-exists',
              target: '.alert-box'
            }
          ]
        },
        quiz: [
          {
            id: 'q-01-1',
            question: 'Which DevTools panel allows you to inspect and modify live HTML & CSS?',
            options: ['Elements panel', 'Memory panel', 'Security panel', 'Application panel'],
            correctIndex: 0,
            explanation: 'The Elements panel shows the live rendered DOM tree and calculated CSS styles.'
          }
        ],
        summary: [
          'DevTools allows real-time inspection of HTML, CSS, network requests, and JS console output.',
          'Changes made in DevTools are transient and help you experiment before committing code to source files.'
        ],
        relatedTopics: [
          {
            title: 'HTML Structure & Semantics',
            chapterNumber: '02',
            context: 'Apply your DevTools inspection skills to semantic HTML tags in Chapter 02.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-02',
    number: '02',
    badge: '02',
    slug: 'html-fundamentals',
    title: 'HTML Fundamentals & Semantics',
    subtitle: 'Build robust, accessible, and meaningful document architecture',
    description: 'Learn HTML5 from the ground up: document boilerplate, semantic tags, headings, lists, tables, media embeds, accessible forms, and input validation.',
    estimatedHours: '3 hrs',
    accentColor: 'orange',
    iconName: 'Code',
    totalLessons: 1,
    lessons: [
      {
        id: 'ch-02-l-01',
        chapterId: 'ch-02',
        number: '2.1',
        slug: 'semantic-html-architecture',
        title: 'Semantic HTML5 Architecture & Forms',
        tagline: 'Give true meaning to your content for users, search engines, and screen readers',
        durationMinutes: 25,
        learningObjectives: [
          'Structure a complete HTML5 document with doctype, head, and body',
          'Use semantic landmarks: <header>, <nav>, <main>, <section>, <article>, <footer>',
          'Create accessible forms with <label>, <input>, <select>, and validation attributes',
          'Understand accessibility (a11y) basics: alt text, ARIA roles, and keyboard navigation'
        ],
        theorySections: [
          {
            heading: 'Why Semantic HTML Matters',
            content: 'Semantic HTML means using HTML tags that convey the meaning of the content, rather than using generic <div> for everything.',
            bulletPoints: [
              'Accessibility: Screen readers can jump between headers, navigation, and articles easily',
              'SEO: Search engine bots understand the content hierarchy and rank pages better',
              'Maintainability: Code is intuitive for teammates and future self to read'
            ],
            callout: {
              type: 'key-rule',
              text: 'Always pair every <input> with a corresponding <label for="inputId">. Never rely on placeholder text alone for accessibility.'
            }
          }
        ],
        realWorldAnalogy: {
          title: 'The Newspaper Layout',
          concept: 'Document Structure & Semantics',
          story: 'When you read a newspaper, you instantly recognize the Masthead (header), Headline (h1), Sections (sports, finance), and Byline (footer). If every text block used identical font and size with no hierarchy, finding news would be impossible.',
          moral: 'Semantic tags provide visual and structural orientation to both humans and machines.'
        },
        visualType: 'semantic-html',
        codeExample: {
          title: 'Accessible Registration Form',
          description: 'A clean semantic form with validation, labels, and structured fieldsets.',
          html: `<main class="form-container">\n  <header>\n    <h2>Create Your Account</h2>\n    <p>Join the developer community today.</p>\n  </header>\n  \n  <form id="signupForm">\n    <div class="form-group">\n      <label for="fullName">Full Name</label>\n      <input type="text" id="fullName" name="fullName" required placeholder="Jane Doe" />\n    </div>\n    \n    <div class="form-group">\n      <label for="emailAddr">Email Address</label>\n      <input type="email" id="emailAddr" name="email" required placeholder="jane@example.com" />\n    </div>\n    \n    <button type="submit" class="submit-btn">Register</button>\n  </form>\n</main>`,
          css: `.form-container {\n  background: #ffffff;\n  padding: 32px;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  max-width: 420px;\n  font-family: system-ui, -apple-system, sans-serif;\n}\n\n.form-group {\n  margin-bottom: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\nlabel {\n  font-weight: 600;\n  font-size: 14px;\n  color: #334155;\n}\n\ninput {\n  padding: 10px 14px;\n  border-radius: 6px;\n  border: 1px solid #cbd5e1;\n  font-size: 15px;\n  outline: none;\n}\n\ninput:focus {\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);\n}\n\n.submit-btn {\n  width: 100%;\n  padding: 12px;\n  background: #4f46e5;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n}`,
          js: `document.getElementById('signupForm').addEventListener('submit', (e) => {\n  e.preventDefault();\n  const name = document.getElementById('fullName').value;\n  alert(\`Welcome aboard, \${name}!\`);\n});`,
          breakdown: [
            {
              lineRange: 'HTML L7-15',
              title: 'Label & Input associations',
              explanation: 'for="fullName" matches id="fullName", ensuring clicking the label focuses the input.'
            },
            {
              lineRange: 'HTML L10, 15',
              title: 'Built-in validation',
              explanation: 'type="email" and required enforce browser validation without complex scripts.'
            }
          ]
        },
        video: {
          title: 'Writing Clean Semantic HTML5',
          duration: '6:30',
          description: 'A deep dive into HTML5 semantic landmarks, accessibility attributes, and form validation.',
          keyPoints: ['The semantic tree', 'Forms and inputs', 'ARIA labels & accessibility'],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'Why Semantics Matter', description: 'Accessibility and SEO benefits' },
            { time: '2:15', seconds: 135, title: 'Landmark Elements', description: 'main, nav, article, section' },
            { time: '4:40', seconds: 280, title: 'Accessible Forms', description: 'Labels, inputs, and validation' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:15', seconds: 15, text: 'Semantic tags communicate intent. Let us replace empty divs with meaningful HTML5 landmarks.' }
          ],
          demoAnimationType: 'dom-build'
        },
        practice: {
          id: 'prac-02-01',
          title: 'Build a Semantic Article Card',
          difficulty: 'Beginner',
          estimatedTime: '8 mins',
          prompt: 'Structure an accessible article card using <article>, <header>, <p>, and a call-to-action button.',
          instructions: [
            '1. Wrap the card inside an <article class="post-card"> tag',
            '2. Include a <header> with an <h3> title and a <time> publication date',
            '3. Add a <button class="read-more">Read More</button>'
          ],
          starterHtml: `<!-- Build your semantic article here -->\n<div class="post-card">\n  <h3>Exploring CSS Flexbox</h3>\n  <p>Learn how to center elements with ease.</p>\n  <button>Read More</button>\n</div>`,
          starterCss: `.post-card {\n  background: #ffffff;\n  padding: 24px;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  max-width: 360px;\n  font-family: sans-serif;\n}\n\nbutton {\n  background: #2563eb;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n}`,
          starterJs: ``,
          solutionHtml: `<article class="post-card">\n  <header>\n    <h3>Exploring CSS Flexbox</h3>\n    <time datetime="2026-08-27">August 2026</time>\n  </header>\n  <p>Learn how to center elements with ease.</p>\n  <button class="read-more">Read More</button>\n</article>`,
          solutionCss: `.post-card {\n  background: #ffffff;\n  padding: 24px;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  max-width: 360px;\n  font-family: sans-serif;\n}\n\nbutton {\n  background: #2563eb;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n}`,
          solutionJs: ``,
          hints: ['Replace the outer <div> with <article class="post-card">.'],
          testCases: [
            {
              id: 't-1',
              description: 'Article landmark element used',
              hint: 'Wrap the component in an <article> tag.',
              checkType: 'selector-exists',
              target: 'article.post-card'
            }
          ]
        },
        quiz: [
          {
            id: 'q-02-1',
            question: 'Why should you always pair an <input> with a <label>?',
            options: [
              'It improves accessibility for screen readers and increases the clickable tap area',
              'It speeds up page download times',
              'It converts the input into a database query',
              'It automatically applies CSS gradients'
            ],
            correctIndex: 0,
            explanation: 'Labels give context to assistive technologies and allow users to click the text to focus the input control.'
          }
        ],
        summary: [
          'Semantic tags (<header>, <main>, <nav>, <article>) provide meaningful document hierarchy.',
          'Forms require paired labels and semantic input types for robust user experience.'
        ],
        relatedTopics: [
          {
            title: 'CSS Box Model & Styling',
            chapterNumber: '03',
            context: 'In Chapter 03 we take our HTML elements and style margins, paddings, and borders.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-03',
    number: '03',
    badge: '03',
    slug: 'css-styling',
    title: 'CSS Mastery, Box Model & Colors',
    subtitle: 'The CSS cascade, specificity, box model, typography, and variables',
    description: 'Master the visual engine of the web. Learn the Box Model (Margin, Border, Padding, Content), box-sizing: border-box, CSS custom properties, and modern color spaces.',
    estimatedHours: '3.5 hrs',
    accentColor: 'emerald',
    iconName: 'Palette',
    totalLessons: 1,
    lessons: [
      {
        id: 'ch-03-l-01',
        chapterId: 'ch-03',
        number: '3.1',
        slug: 'the-css-box-model',
        title: 'The CSS Box Model & Modern Styling',
        tagline: 'Understand how every element on the web is an adjustable geometric box',
        durationMinutes: 30,
        learningObjectives: [
          'Deconstruct the 4 layers: Content, Padding, Border, and Margin',
          'Understand box-sizing: content-box vs box-sizing: border-box',
          'Master CSS Specificity calculation (Inline > ID > Class > Element)',
          'Utilize CSS Variables (--primary-color) for consistent design tokens'
        ],
        theorySections: [
          {
            heading: 'The 4 Concentric Layers',
            content: 'Every HTML element is rendered by the browser as a rectangular box consisting of four distinct regions from the inside out.',
            bulletPoints: [
              'Content: The text, image, or child element itself (width & height)',
              'Padding: The breathable transparent space between the content and the border',
              'Border: The frame encircling the padding and content',
              'Margin: The external cushion pushing away neighboring elements'
            ],
            callout: {
              type: 'key-rule',
              text: 'Always set `* { box-sizing: border-box; }` in your global CSS reset! This prevents padding from expanding the total element width.'
            }
          }
        ],
        realWorldAnalogy: {
          title: 'Framing a Family Picture',
          concept: 'The CSS Box Model',
          story: 'Imagine framing a photo on your wall. The Photo is the Content. The White Matting around the photo is Padding. The Wooden Frame is the Border. The Empty Wall Space separating your frame from other wall art is Margin.',
          moral: 'Padding lives inside the frame; margin lives outside the frame.'
        },
        visualType: 'box-model',
        codeExample: {
          title: 'Interactive Box Model Card with CSS Tokens',
          description: 'Notice the custom variables and how margin vs padding creates breathing room.',
          html: `<div class="box-card">\n  <span class="badge">CSS Variables</span>\n  <h3>Modern Box Model</h3>\n  <p>Every element is styled with calculated margins, paddings, and borders.</p>\n  <button class="box-btn">Learn More</button>\n</div>`,
          css: `:root {\n  --primary: #059669;\n  --primary-hover: #047857;\n  --bg-card: #ffffff;\n  --radius: 12px;\n}\n\n* {\n  box-sizing: border-box;\n}\n\n.box-card {\n  background: var(--bg-card);\n  padding: 28px; /* Internal cushion */\n  margin: 16px auto; /* External spacing */\n  border: 2px solid #e2e8f0;\n  border-radius: var(--radius);\n  max-width: 380px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n\n.badge {\n  display: inline-block;\n  background: #d1fae5;\n  color: var(--primary);\n  padding: 4px 12px;\n  border-radius: 9999px;\n  font-size: 12px;\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n\n.box-btn {\n  background: var(--primary);\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  margin-top: 16px;\n  font-weight: 600;\n}`,
          js: ``,
          breakdown: [
            {
              lineRange: 'CSS L1-6',
              title: ':root Design Tokens',
              explanation: 'Defines global reusable CSS variables for colors and radii.'
            },
            {
              lineRange: 'CSS L8-10',
              title: 'box-sizing: border-box',
              explanation: 'Crucial reset ensuring padding and border are included in total width.'
            }
          ]
        },
        video: {
          title: 'Visualizing the CSS Box Model',
          duration: '5:45',
          description: 'Step-by-step 3D exploded view of Content, Padding, Border, and Margin.',
          keyPoints: ['Why elements overflow', 'border-box vs content-box', 'Collapsing margins'],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'The 4 Layers', description: 'Content, padding, border, margin' },
            { time: '2:10', seconds: 130, title: 'The Border-Box Fix', description: 'Solving width calculation headaches' },
            { time: '4:15', seconds: 255, title: 'Margin Collapse', description: 'When vertical margins merge' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:08', seconds: 8, text: 'Welcome! Today we master the single most important layout concept: the CSS Box Model.' }
          ],
          demoAnimationType: 'css-cascade'
        },
        practice: {
          id: 'prac-03-01',
          title: 'Fine-tune Box Spacing & Borders',
          difficulty: 'Beginner',
          estimatedTime: '6 mins',
          prompt: 'Adjust the card padding to 24px, add a 2px solid #6366f1 border, and round corners with border-radius: 12px.',
          instructions: [
            '1. Inside .target-card, set padding: 24px',
            '2. Add border: 2px solid #6366f1',
            '3. Set border-radius: 12px'
          ],
          starterHtml: `<div class="target-card">\n  <h2>Featured Course</h2>\n  <p>Master CSS styling with hands-on practice exercises.</p>\n  <button>Enroll Now</button>\n</div>`,
          starterCss: `.target-card {\n  background: #f8fafc;\n  /* Add padding, border, and border-radius here */\n  font-family: sans-serif;\n  max-width: 320px;\n}\n\nbutton {\n  background: #6366f1;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  margin-top: 12px;\n  cursor: pointer;\n}`,
          starterJs: ``,
          solutionHtml: `<div class="target-card">\n  <h2>Featured Course</h2>\n  <p>Master CSS styling with hands-on practice exercises.</p>\n  <button>Enroll Now</button>\n</div>`,
          solutionCss: `.target-card {\n  background: #f8fafc;\n  padding: 24px;\n  border: 2px solid #6366f1;\n  border-radius: 12px;\n  font-family: sans-serif;\n  max-width: 320px;\n}\n\nbutton {\n  background: #6366f1;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  margin-top: 12px;\n  cursor: pointer;\n}`,
          solutionJs: ``,
          hints: ['Add padding: 24px; border: 2px solid #6366f1; border-radius: 12px; inside .target-card.'],
          testCases: [
            {
              id: 't-1',
              description: 'Card exists with proper class',
              hint: 'Keep .target-card element intact.',
              checkType: 'selector-exists',
              target: '.target-card'
            }
          ]
        },
        quiz: [
          {
            id: 'q-03-1',
            question: 'What is the effect of setting `box-sizing: border-box` on an element?',
            options: [
              'Padding and borders are included inside the specified width and height',
              'The element becomes transparent',
              'The margin is doubled',
              'The font size automatically increases'
            ],
            correctIndex: 0,
            explanation: 'With border-box, the width you declare is the total final rendered width, avoiding unexpected overflow caused by padding and borders.'
          }
        ],
        summary: [
          'The Box Model contains Content, Padding, Border, and Margin.',
          '`box-sizing: border-box` makes layout math predictable and intuitive.',
          'CSS Variables allow centralized styling tokens across your entire project.'
        ],
        relatedTopics: [
          {
            title: 'CSS Flexbox Layouts',
            chapterNumber: '04',
            context: 'In Chapter 04 we use Flexbox to arrange multiple boxes across axes effortlessly.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-04',
    number: '04',
    badge: '04',
    slug: 'flexbox',
    title: 'CSS Flexbox Layout Engine',
    subtitle: '1-Dimensional layout power: align, distribute, and center effortlessly',
    description: 'Master CSS Flexible Box Layout. Learn main axis vs cross axis, justify-content, align-items, flex-wrap, flex-grow/shrink/basis, and real-world responsive navigation bars.',
    estimatedHours: '3 hrs',
    accentColor: 'violet',
    iconName: 'Layout',
    totalLessons: 1,
    lessons: [
      {
        id: 'ch-04-l-01',
        chapterId: 'ch-04',
        number: '4.1',
        slug: 'flexbox-mastery',
        title: 'Flexbox Architecture & Alignment',
        tagline: 'Never struggle with centering or distributing elements again',
        durationMinutes: 25,
        learningObjectives: [
          'Differentiate Flex Container (parent) vs Flex Items (children)',
          'Master Main Axis vs Cross Axis based on flex-direction (row vs column)',
          'Distribute space with justify-content (center, space-between, space-around)',
          'Align along cross-axis with align-items and align-self',
          'Control item growth with flex-grow, flex-shrink, and flex-basis'
        ],
        theorySections: [
          {
            heading: 'The 2-Tier Hierarchy: Container vs Item',
            content: 'Flexbox operates on a parent-child relationship. Setting `display: flex` on a container immediately activates flex formatting for its direct children.',
            bulletPoints: [
              'Container Properties: flex-direction, justify-content, align-items, flex-wrap, gap',
              'Item Properties: flex-grow, flex-shrink, flex-basis, align-self, order',
              'Main Axis: Controlled by `justify-content` (horizontal in row, vertical in column)',
              'Cross Axis: Controlled by `align-items` (vertical in row, horizontal in column)'
            ],
            callout: {
              type: 'tip',
              text: 'Centering in CSS is now just two lines: `display: flex; justify-content: center; align-items: center;`'
            }
          }
        ],
        realWorldAnalogy: {
          title: 'The Subway Train & Passengers',
          concept: 'Flex Container & Flex Items',
          story: 'The train car is the Flex Container. The passengers sitting on seats are Flex Items. The train conductor can choose to arrange seats in a line (flex-direction: row), space them evenly (justify-content: space-between), or align people to the ceiling/floor (align-items: center).',
          moral: 'The container sets the rules; the items adapt to available space.'
        },
        visualType: 'flexbox',
        codeExample: {
          title: 'Responsive Navigation Bar with Flexbox',
          description: 'A classic header with logo on the left, links in the middle, and action button on the right.',
          html: `<header class="navbar">\n  <div class="logo">⚡ CodeCraft</div>\n  <nav class="nav-links">\n    <a href="#">Courses</a>\n    <a href="#">Projects</a>\n    <a href="#">Roadmap</a>\n  </nav>\n  <button class="nav-btn">Sign In</button>\n</header>`,
          css: `.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #ffffff;\n  padding: 16px 28px;\n  border-bottom: 1px solid #e2e8f0;\n  font-family: sans-serif;\n}\n\n.logo {\n  font-size: 18px;\n  font-weight: 800;\n  color: #4f46e5;\n}\n\n.nav-links {\n  display: flex;\n  gap: 24px;\n}\n\n.nav-links a {\n  text-decoration: none;\n  color: #475569;\n  font-weight: 500;\n  transition: color 0.15s;\n}\n\n.nav-links a:hover {\n  color: #4f46e5;\n}\n\n.nav-btn {\n  background: #4f46e5;\n  color: white;\n  border: none;\n  padding: 8px 18px;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n}`,
          js: ``,
          breakdown: [
            {
              lineRange: 'CSS L2-4',
              title: 'Navbar flex container',
              explanation: 'display: flex with justify-content: space-between pushes logo to left, links to center/right.'
            },
            {
              lineRange: 'CSS L16-18',
              title: 'Nested nav links container',
              explanation: 'Nested display: flex with gap: 24px neatly spaces navigation anchor tags.'
            }
          ]
        },
        video: {
          title: 'The Complete Flexbox Mental Model',
          duration: '6:15',
          description: 'Interactive animated breakdown of main axis, cross axis, justify-content, and flex wrapping.',
          keyPoints: ['Main axis vs Cross axis', 'The gap property', 'Responsive flex wrapping'],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'What is Flexbox?', description: '1D flexible layout engine' },
            { time: '1:50', seconds: 110, title: 'Justify Content Explained', description: 'Distributing items along the main axis' },
            { time: '3:40', seconds: 220, title: 'Align Items & Self', description: 'Cross axis alignment' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:12', seconds: 12, text: 'Flexbox is the cornerstone of modern web UI layout. Let us master the axis concept once and for all.' }
          ],
          demoAnimationType: 'flex-align'
        },
        practice: {
          id: 'prac-04-01',
          title: 'Perfect Centering & Card Row Layout',
          difficulty: 'Beginner',
          estimatedTime: '6 mins',
          prompt: 'Make .hero-box center all its child elements horizontally and vertically using Flexbox.',
          instructions: [
            '1. Inside .hero-box, add display: flex',
            '2. Set justify-content: center',
            '3. Set align-items: center',
            '4. Set flex-direction: column to stack title and button vertically with a gap: 16px'
          ],
          starterHtml: `<div class="hero-box">\n  <h2>Centered with Flexbox</h2>\n  <p>Notice how easy perfect centering is.</p>\n  <button>Explore More</button>\n</div>`,
          starterCss: `.hero-box {\n  min-height: 220px;\n  background: #f1f5f9;\n  border-radius: 12px;\n  /* Apply flexbox properties here */\n  font-family: sans-serif;\n  text-align: center;\n}\n\nbutton {\n  background: #8b5cf6;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n}`,
          starterJs: ``,
          solutionHtml: `<div class="hero-box">\n  <h2>Centered with Flexbox</h2>\n  <p>Notice how easy perfect centering is.</p>\n  <button>Explore More</button>\n</div>`,
          solutionCss: `.hero-box {\n  min-height: 220px;\n  background: #f1f5f9;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n  font-family: sans-serif;\n  text-align: center;\n}\n\nbutton {\n  background: #8b5cf6;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n}`,
          solutionJs: ``,
          hints: ['Add display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 16px;'],
          testCases: [
            {
              id: 't-1',
              description: 'Hero box exists with valid styling',
              hint: 'Keep .hero-box div intact.',
              checkType: 'selector-exists',
              target: '.hero-box'
            }
          ]
        },
        quiz: [
          {
            id: 'q-04-1',
            question: 'When `flex-direction: column` is applied, which property aligns items horizontally (across the cross axis)?',
            options: ['align-items', 'justify-content', 'flex-wrap', 'order'],
            correctIndex: 0,
            explanation: 'When flex-direction is column, the cross axis becomes horizontal, so `align-items` controls horizontal alignment.'
          }
        ],
        summary: [
          'Flexbox is optimized for 1-dimensional layouts (rows or columns).',
          '`justify-content` governs main-axis alignment; `align-items` governs cross-axis alignment.',
          '`gap` provides clean spacing between flex items without tricky margin hacks.'
        ],
        relatedTopics: [
          {
            title: 'CSS Grid Matrix Layouts',
            chapterNumber: '05',
            context: 'When you need 2-dimensional (rows AND columns) control, CSS Grid takes over in Chapter 05.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-05',
    number: '05',
    badge: '05',
    slug: 'css-grid',
    title: 'CSS Grid Matrix Layouts',
    subtitle: '2-Dimensional layout master: columns, rows, areas, and auto-fit grids',
    description: 'Conquer modern 2D layouts. Master grid-template-columns, the fractional unit (fr), repeat(), minmax(), grid-template-areas, and responsive auto-fitting bento boxes.',
    estimatedHours: '3.5 hrs',
    accentColor: 'teal',
    iconName: 'Grid',
    totalLessons: 1,
    lessons: [
      {
        id: 'ch-05-l-01',
        chapterId: 'ch-05',
        number: '5.1',
        slug: 'grid-matrix-and-bento',
        title: 'CSS Grid Templates & Bento Layouts',
        tagline: 'Design magazine-quality 2D layouts with unprecedented precision',
        durationMinutes: 30,
        learningObjectives: [
          'Understand 2-dimensional layouts (simultaneous rows and columns)',
          'Master fractional units: `1fr`, `2fr` and `repeat(3, 1fr)`',
          'Build responsive layouts without media queries using `repeat(auto-fit, minmax(280px, 1fr))`',
          'Use `grid-template-areas` for visual layout mapping (header, sidebar, content, footer)'
        ],
        theorySections: [
          {
            heading: 'The Power of 2 Dimensions',
            content: 'While Flexbox handles items in one direction at a time, CSS Grid allows you to author rows and columns simultaneously.',
            bulletPoints: [
              'Grid Container: `display: grid` initiates the grid formatting context',
              'Fractional Unit (fr): Represents a fraction of free available space in the container',
              'minmax(min, max): Prevents items from shrinking below minimum or stretching beyond maximum',
              'gap: Consistent row and column gutter spacing'
            ],
            callout: {
              type: 'tip',
              text: 'The ultimate responsive card grid formula: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`'
            }
          }
        ],
        realWorldAnalogy: {
          title: 'The Bento Lunchbox',
          concept: '2D Grid Layouts',
          story: 'A Bento lunchbox has structured compartments designed for rice, vegetables, fish, and sauce. Each food item has an assigned 2D slot with precise dimensions and gutters between compartments.',
          moral: 'CSS Grid divides the page into compartments; your content snaps into place.'
        },
        visualType: 'grid',
        codeExample: {
          title: 'Responsive Dashboard Grid',
          description: 'A modern 3-card bento grid that reflows smoothly across screen sizes.',
          html: `<div class="grid-container">\n  <div class="card card-featured">\n    <h3>🚀 Analytics Pro</h3>\n    <p>Real-time metrics with automated anomaly alerts.</p>\n  </div>\n  <div class="card">\n    <h3>👥 Users</h3>\n    <p>2,840 active today</p>\n  </div>\n  <div class="card">\n    <h3>⚡ Speed</h3>\n    <p>98ms latency</p>\n  </div>\n</div>`,
          css: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  font-family: sans-serif;\n}\n\n.card {\n  background: #ffffff;\n  padding: 20px;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.04);\n}\n\n.card-featured {\n  background: #f0fdf4;\n  border-color: #bbf7d0;\n}\n\n.card-featured h3 {\n  color: #166534;\n}`,
          js: ``,
          breakdown: [
            {
              lineRange: 'CSS L2-4',
              title: 'Auto-fit Grid Matrix',
              explanation: 'repeat(auto-fit, minmax(200px, 1fr)) creates as many columns as fit, stretching remaining space.'
            }
          ]
        },
        video: {
          title: 'CSS Grid Simplified',
          duration: '7:00',
          description: 'Visualizing fr units, grid lines, track sizing, and bento layouts.',
          keyPoints: ['Grid tracks & lines', 'The fr unit', 'auto-fit vs auto-fill'],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'Introduction to Grid', description: 'When to use Grid vs Flexbox' },
            { time: '2:30', seconds: 150, title: 'The Fractional (fr) Unit', description: 'Flexible proportional sizing' },
            { time: '4:45', seconds: 285, title: 'Auto-fit Bento Grids', description: 'Responsive without media queries' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:10', seconds: 10, text: 'CSS Grid is the most capable layout system ever invented for the browser.' }
          ],
          demoAnimationType: 'grid-track'
        },
        practice: {
          id: 'prac-05-01',
          title: 'Create a 3-Column Feature Matrix',
          difficulty: 'Intermediate',
          estimatedTime: '8 mins',
          prompt: 'Configure the .feature-grid container with display: grid, 3 equal columns using repeat(3, 1fr), and a 20px gap.',
          instructions: [
            '1. Inside .feature-grid, set display: grid',
            '2. Set grid-template-columns: repeat(3, 1fr)',
            '3. Set gap: 20px'
          ],
          starterHtml: `<div class="feature-grid">\n  <div class="item">Speed</div>\n  <div class="item">Security</div>\n  <div class="item">Scalability</div>\n</div>`,
          starterCss: `.feature-grid {\n  /* Add grid rules here */\n  font-family: sans-serif;\n}\n\n.item {\n  background: #e0e7ff;\n  color: #3730a3;\n  padding: 24px;\n  border-radius: 8px;\n  text-align: center;\n  font-weight: 600;\n}`,
          starterJs: ``,
          solutionHtml: `<div class="feature-grid">\n  <div class="item">Speed</div>\n  <div class="item">Security</div>\n  <div class="item">Scalability</div>\n</div>`,
          solutionCss: `.feature-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  font-family: sans-serif;\n}\n\n.item {\n  background: #e0e7ff;\n  color: #3730a3;\n  padding: 24px;\n  border-radius: 8px;\n  text-align: center;\n  font-weight: 600;\n}`,
          solutionJs: ``,
          hints: ['Add display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; inside .feature-grid.'],
          testCases: [
            {
              id: 't-1',
              description: 'Feature grid container exists',
              hint: 'Keep .feature-grid container.',
              checkType: 'selector-exists',
              target: '.feature-grid'
            }
          ]
        },
        quiz: [
          {
            id: 'q-05-1',
            question: 'What does `1fr` represent in CSS Grid?',
            options: [
              'One fraction of the available free space in the grid container',
              'One fixed frame rate per second',
              'One French standard measurement unit',
              'One font size root unit'
            ],
            correctIndex: 0,
            explanation: 'The `fr` unit represents a proportional fraction of the unused space within the grid container.'
          }
        ],
        summary: [
          'CSS Grid handles 2D matrix layouts with rows and columns simultaneously.',
          'The `fr` unit dynamically allocates available space.',
          '`auto-fit` with `minmax()` delivers responsive layouts without media queries.'
        ],
        relatedTopics: [
          {
            title: 'JavaScript Interactivity & DOM',
            chapterNumber: '06',
            context: 'In Chapter 06 we breathe life into our layouts using dynamic JavaScript.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-06',
    number: '06',
    badge: '06',
    slug: 'javascript',
    title: 'JavaScript Interactivity & DOM',
    subtitle: 'Variables, functions, DOM manipulation, events, and API fetch',
    description: 'Learn modern ES6+ JavaScript. Master variables (let, const), functions, arrays, objects, DOM query selectors, event listeners, classList manipulation, and async/await.',
    estimatedHours: '4 hrs',
    accentColor: 'amber',
    iconName: 'Zap',
    totalLessons: 1,
    lessons: [
      {
        id: 'ch-06-l-01',
        chapterId: 'ch-06',
        number: '6.1',
        slug: 'dom-and-events',
        title: 'DOM Manipulation, Events & State',
        tagline: 'Turn static web pages into living, dynamic, interactive web applications',
        durationMinutes: 35,
        learningObjectives: [
          'Select DOM elements with querySelector() and getElementById()',
          'Listen for user actions with addEventListener() (click, input, submit, keydown)',
          'Manipulate content with textContent, innerHTML, and classList (add/remove/toggle)',
          'Manage simple local application state (counters, todo lists, modals)'
        ],
        theorySections: [
          {
            heading: 'The Document Object Model (DOM)',
            content: 'The browser converts your HTML code into a tree of JavaScript objects called the DOM. JavaScript can read, modify, add, or delete any node in this tree on the fly.',
            bulletPoints: [
              'Selecting: `const btn = document.querySelector("#myBtn");`',
              'Modifying: `btn.textContent = "Clicked!";`',
              'Styling/Classes: `btn.classList.toggle("active");`',
              'Listening: `btn.addEventListener("click", (event) => { ... });`'
            ]
          }
        ],
        realWorldAnalogy: {
          title: 'The Light Switch & Wiring',
          concept: 'Event Listeners & DOM Updates',
          story: 'When you walk into a dark room and flip the switch on the wall, a physical signal travels along the wire to the light bulb on the ceiling, switching it on. In JS, the switch is an Event Listener (click), the wire is the Callback Function, and the illuminated bulb is the DOM update.',
          moral: 'Actions trigger events; event callbacks update the DOM.'
        },
        visualType: 'js-event',
        codeExample: {
          title: 'Interactive Counter with State & Limits',
          description: 'A clean interactive counter that updates the DOM and disables buttons at bounds.',
          html: `<div class="counter-card">\n  <h2>Interactive Counter</h2>\n  <div class="display" id="countDisplay">0</div>\n  <div class="btn-group">\n    <button id="decrementBtn" class="btn secondary">- Decrement</button>\n    <button id="resetBtn" class="btn outline">Reset</button>\n    <button id="incrementBtn" class="btn primary">+ Increment</button>\n  </div>\n</div>`,
          css: `.counter-card {\n  background: #ffffff;\n  padding: 28px;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  text-align: center;\n  max-width: 360px;\n  font-family: sans-serif;\n}\n\n.display {\n  font-size: 48px;\n  font-weight: 800;\n  color: #1e293b;\n  margin: 18px 0;\n  transition: transform 0.15s;\n}\n\n.btn-group {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n}\n\n.btn {\n  padding: 8px 14px;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n}\n\n.primary { background: #4f46e5; color: white; }\n.secondary { background: #e2e8f0; color: #1e293b; }\n.outline { background: transparent; border: 1px solid #cbd5e1; }`,
          js: `let count = 0;\nconst display = document.getElementById('countDisplay');\nconst incBtn = document.getElementById('incrementBtn');\nconst decBtn = document.getElementById('decrementBtn');\nconst resetBtn = document.getElementById('resetBtn');\n\nfunction updateUI() {\n  display.textContent = count;\n  display.style.color = count > 0 ? '#16a34a' : count < 0 ? '#dc2626' : '#1e293b';\n}\n\nincBtn.addEventListener('click', () => {\n  count++;\n  updateUI();\n});\n\ndecBtn.addEventListener('click', () => {\n  count--;\n  updateUI();\n});\n\nresetBtn.addEventListener('click', () => {\n  count = 0;\n  updateUI();\n});`,
          breakdown: [
            {
              lineRange: 'JS L1',
              title: 'Application State',
              explanation: 'The `count` variable holds the single source of truth for the counter value.'
            },
            {
              lineRange: 'JS L8-11',
              title: 'Declarative UI Updater',
              explanation: 'A central function syncs the DOM text and color whenever the count variable changes.'
            }
          ]
        },
        video: {
          title: 'JavaScript DOM Mastery',
          duration: '8:00',
          description: 'Step-by-step DOM tree traversal, event bubbling, and reactive UI patterns in vanilla JS.',
          keyPoints: ['DOM nodes vs elements', 'addEventListener syntax', 'Event propagation (bubbling)'],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'What is the DOM?', description: 'Browser JavaScript object representation' },
            { time: '3:00', seconds: 180, title: 'Event Handling', description: 'Listening to clicks and keystrokes' },
            { time: '5:30', seconds: 330, title: 'ClassList Manipulation', description: 'Toggling visual states with CSS classes' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:15', seconds: 15, text: 'JavaScript is the engine that brings static HTML and CSS to life.' }
          ],
          demoAnimationType: 'js-event'
        },
        practice: {
          id: 'prac-06-01',
          title: 'Build an Interactive Dark Mode Toggle',
          difficulty: 'Beginner',
          estimatedTime: '8 mins',
          prompt: 'Write JavaScript to toggle the .dark class on the #themeBox container when the #toggleBtn is clicked!',
          instructions: [
            '1. Select the button with id "toggleBtn"',
            '2. Select the container with id "themeBox"',
            '3. Add a click event listener that toggles the "dark" class on the container'
          ],
          starterHtml: `<div id="themeBox" class="box">\n  <h3>Theme Switcher</h3>\n  <p>Click below to toggle dark mode styling.</p>\n  <button id="toggleBtn">Switch Theme</button>\n</div>`,
          starterCss: `.box {\n  background: #ffffff;\n  color: #1e293b;\n  padding: 24px;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  font-family: sans-serif;\n  transition: all 0.3s ease;\n}\n\n.box.dark {\n  background: #0f172a;\n  color: #f8fafc;\n  border-color: #334155;\n}\n\nbutton {\n  background: #6366f1;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n}`,
          starterJs: `// Select elements and add event listener here:\n`,
          solutionHtml: `<div id="themeBox" class="box">\n  <h3>Theme Switcher</h3>\n  <p>Click below to toggle dark mode styling.</p>\n  <button id="toggleBtn">Switch Theme</button>\n</div>`,
          solutionCss: `.box {\n  background: #ffffff;\n  color: #1e293b;\n  padding: 24px;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  font-family: sans-serif;\n  transition: all 0.3s ease;\n}\n\n.box.dark {\n  background: #0f172a;\n  color: #f8fafc;\n  border-color: #334155;\n}\n\nbutton {\n  background: #6366f1;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n}`,
          solutionJs: `const btn = document.getElementById('toggleBtn');\nconst box = document.getElementById('themeBox');\n\nbtn.addEventListener('click', () => {\n  box.classList.toggle('dark');\n});`,
          hints: ['Use document.getElementById("toggleBtn").addEventListener("click", () => { ... })'],
          testCases: [
            {
              id: 't-1',
              description: 'Theme box and toggle button exist',
              hint: 'Keep IDs themeBox and toggleBtn.',
              checkType: 'selector-exists',
              target: '#themeBox'
            }
          ]
        },
        quiz: [
          {
            id: 'q-06-1',
            question: 'Which method is the modern standard for listening to user interactions on DOM elements?',
            options: ['addEventListener()', 'attachEvent()', 'onClickMethod()', 'triggerListen()'],
            correctIndex: 0,
            explanation: '`addEventListener(eventType, callback)` is the standard method for handling events cleanly without overwriting other handlers.'
          }
        ],
        summary: [
          'JavaScript manipulates the DOM tree to reflect runtime changes.',
          'Event listeners capture user actions (click, input, submit).',
          'Separating state logic from DOM rendering creates maintainable code.'
        ],
        relatedTopics: [
          {
            title: 'Responsive Design & Mobile-First',
            chapterNumber: '07',
            context: 'In Chapter 07 we adapt our interactive components to all screen sizes.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-07',
    number: '07',
    badge: '07',
    slug: 'responsive-design',
    title: 'Responsive Design & Mobile-First',
    subtitle: 'Viewport meta, media queries, clamp(), fluid typography, and mobile UX',
    description: 'Ensure your websites look stunning on smartphones, tablets, laptops, and ultra-wide screens. Learn media queries, responsive images, touch targets, and mobile-first architecture.',
    estimatedHours: '3 hrs',
    accentColor: 'rose',
    iconName: 'Smartphone',
    totalLessons: 1,
    lessons: [
      {
        id: 'ch-07-l-01',
        chapterId: 'ch-07',
        number: '7.1',
        slug: 'media-queries-and-fluid-ui',
        title: 'Mobile-First Media Queries & Fluid Layouts',
        tagline: 'Build fluid layouts that adapt seamlessly from mobile screens to 4K displays',
        durationMinutes: 25,
        learningObjectives: [
          'Configure the essential viewport meta tag',
          'Write mobile-first CSS using min-width media queries (640px, 768px, 1024px)',
          'Implement fluid typography using CSS clamp(min, preferred, max)',
          'Optimize touch targets (minimum 44px) for mobile users'
        ],
        theorySections: [
          {
            heading: 'The Mobile-First Philosophy',
            content: 'Mobile-first design means writing base CSS styles for small mobile screens first, then using `@media (min-width: ...)` queries to progressively enhance the layout as more screen real estate becomes available.',
            bulletPoints: [
              'Base CSS: Single column, generous padding, large touch buttons',
              '@media (min-width: 768px): Tablet 2-column layout',
              '@media (min-width: 1024px): Desktop 3-column layout with sidebar'
            ]
          }
        ],
        realWorldAnalogy: {
          title: 'The Collapsible Luggage Bag',
          concept: 'Fluid Responsive Layouts',
          story: 'When traveling light, a collapsible bag fits snugly under an airplane seat. When expanding for a long holiday, you unzip the side pockets to reveal extra compartments. Your website layout expands gracefully to fill larger screens.',
          moral: 'Never build rigid, fixed-pixel boxes; let layouts breathe and adapt.'
        },
        visualType: 'responsive-view',
        codeExample: {
          title: 'Mobile-First Responsive Card Grid',
          description: 'Try resizing the preview or testing mobile breakpoints.',
          html: `<div class="responsive-grid">\n  <div class="col">Feature A</div>\n  <div class="col">Feature B</div>\n  <div class="col">Feature C</div>\n</div>`,
          css: `/* Mobile Base: 1 Column */\n.responsive-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 12px;\n  font-family: sans-serif;\n}\n\n.col {\n  background: #f8fafc;\n  padding: 20px;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  text-align: center;\n}\n\n/* Tablet Breakpoint (768px+) */\n@media (min-width: 600px) {\n  .responsive-grid {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 18px;\n  }\n}`,
          js: ``,
          breakdown: [
            {
              lineRange: 'CSS L2-6',
              title: 'Mobile base rule',
              explanation: 'Starts as a single stacked column for narrow screens.'
            },
            {
              lineRange: 'CSS L15-20',
              title: 'Progressive enhancement',
              explanation: 'Expands into 3 columns when viewport width reaches 600px or higher.'
            }
          ]
        },
        video: {
          title: 'Responsive Design Blueprint',
          duration: '6:40',
          description: 'Breakpoint strategy, fluid typography with clamp(), and touch-friendly navigation.',
          keyPoints: ['Viewport meta tag importance', 'Standard breakpoints', 'Mobile navigation patterns'],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'The Viewport Meta', description: 'Preventing automatic mobile zoom-out' },
            { time: '2:15', seconds: 135, title: 'Mobile-First Thinking', description: 'Min-width vs max-width queries' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:08', seconds: 8, text: 'Over 60% of all global web traffic originates from mobile devices.' }
          ],
          demoAnimationType: 'css-cascade'
        },
        practice: {
          id: 'prac-07-01',
          title: 'Add a Responsive Breakpoint',
          difficulty: 'Intermediate',
          estimatedTime: '6 mins',
          prompt: 'Write a media query for min-width: 600px that turns the vertical layout into a 2-column flexbox row.',
          instructions: [
            '1. Add @media (min-width: 600px) { ... }',
            '2. Inside the media query, set .card-container { flex-direction: row; }'
          ],
          starterHtml: `<div class="card-container">\n  <div class="box">Card 1</div>\n  <div class="box">Card 2</div>\n</div>`,
          starterCss: `.card-container {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  font-family: sans-serif;\n}\n\n.box {\n  background: #fdf2f8;\n  border: 1px solid #fbcfe8;\n  padding: 20px;\n  border-radius: 8px;\n  flex: 1;\n  text-align: center;\n}\n\n/* Add your media query below */\n`,
          starterJs: ``,
          solutionHtml: `<div class="card-container">\n  <div class="box">Card 1</div>\n  <div class="box">Card 2</div>\n</div>`,
          solutionCss: `.card-container {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  font-family: sans-serif;\n}\n\n.box {\n  background: #fdf2f8;\n  border: 1px solid #fbcfe8;\n  padding: 20px;\n  border-radius: 8px;\n  flex: 1;\n  text-align: center;\n}\n\n@media (min-width: 600px) {\n  .card-container {\n    flex-direction: row;\n  }\n}`,
          solutionJs: ``,
          hints: ['Use @media (min-width: 600px) { .card-container { flex-direction: row; } }'],
          testCases: [
            {
              id: 't-1',
              description: 'Card container exists',
              hint: 'Keep .card-container element.',
              checkType: 'selector-exists',
              target: '.card-container'
            }
          ]
        },
        quiz: [
          {
            id: 'q-07-1',
            question: 'Why is `min-width` preferred over `max-width` for modern CSS media queries?',
            options: [
              'It follows the mobile-first philosophy, writing simple base styles and adding complexity as screens grow',
              'It makes JavaScript run faster',
              'It shrinks image file sizes',
              'It disables CSS caching'
            ],
            correctIndex: 0,
            explanation: 'Mobile-first design uses `min-width` to keep base code lightweight for mobile devices while scaling up for desktops.'
          }
        ],
        summary: [
          'Mobile-first architecture starts with simple, performant small-screen layouts.',
          'Media queries with `min-width` progressively enhance designs for larger screens.',
          'Fluid sizing units (clamp, %, fr) reduce the need for excessive fixed breakpoints.'
        ],
        relatedTopics: [
          {
            title: 'Bootstrap & UI Frameworks',
            chapterNumber: '08',
            context: 'In Chapter 08 we explore pre-built responsive grid systems and components.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-08',
    number: '08',
    badge: '08',
    slug: 'bootstrap-and-frameworks',
    title: 'Bootstrap & Component Systems',
    subtitle: 'Rapid prototyping, 12-column grid systems, utility classes, and components',
    description: 'Accelerate your development speed with UI frameworks. Master Bootstrap 5 & Tailwind concepts: 12-column grids, badges, modals, alert banners, and custom theme overrides.',
    estimatedHours: '2.5 hrs',
    accentColor: 'purple',
    iconName: 'Layers',
    totalLessons: 1,
    lessons: [
      {
        id: 'ch-08-l-01',
        chapterId: 'ch-08',
        number: '8.1',
        slug: 'frameworks-and-components',
        title: 'Component Thinking & Grid Systems',
        tagline: 'Build polished web interfaces at 5x speed using tested component patterns',
        durationMinutes: 20,
        learningObjectives: [
          'Understand component-driven development and UI libraries',
          'Master the classic 12-column grid system (col-12, col-md-6, col-lg-4)',
          'Leverage utility-first classes (margin, padding, flexbox, colors)',
          'Compare Bootstrap, Tailwind CSS, and custom design systems'
        ],
        theorySections: [
          {
            heading: 'The 12-Column Grid Mental Model',
            content: 'Frameworks divide the screen width into 12 divisible columns. This makes creating 2-column (6+6), 3-column (4+4+4), 4-column (3+3+3+3), or asymmetric (8+4) layouts effortless.',
            bulletPoints: [
              'Container: Centers content and provides responsive max-width bounds',
              'Row: Horizontal wrapper with negative margin gutter compensations',
              'Col: Specific fraction of the 12-column width (e.g. col-md-4 is 4/12 = 33.3% on desktop)'
            ]
          }
        ],
        realWorldAnalogy: {
          title: 'Pre-fabricated Building Blocks (LEGO)',
          concept: 'Component Frameworks',
          story: 'Instead of hand-carving every single brick from clay, a builder uses standard prefabricated modules (doors, windows, roof trusses) that snap together securely. Frameworks provide battle-tested, accessible building blocks.',
          moral: 'Use frameworks to avoid reinventing solved problems like basic buttons and modals.'
        },
        visualType: 'bootstrap-grid',
        codeExample: {
          title: 'Component Library Card System',
          description: 'A modular card component using standardized utility classes.',
          html: `<div class="card shadow-sm border-0">\n  <div class="card-body">\n    <span class="badge bg-primary mb-2">Pro Component</span>\n    <h4 class="card-title">Pre-built UI Kit</h4>\n    <p class="card-text text-muted">Leverage ready-made components to ship web apps faster.</p>\n    <button class="btn btn-primary">Get Started</button>\n  </div>\n</div>`,
          css: `.card {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.06);\n  max-width: 380px;\n  font-family: system-ui, sans-serif;\n}\n\n.badge {\n  display: inline-block;\n  background: #6366f1;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n  font-weight: 700;\n  margin-bottom: 8px;\n}\n\n.btn-primary {\n  background: #6366f1;\n  color: white;\n  border: none;\n  padding: 10px 18px;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n}`,
          js: ``,
          breakdown: [
            {
              lineRange: 'HTML L1-8',
              title: 'Component Composition',
              explanation: 'Composes card container, badge, title, muted body copy, and button.'
            }
          ]
        },
        video: {
          title: 'Speed Up Development with Component Kits',
          duration: '5:30',
          description: 'How to combine utility classes with custom components for rapid prototyping.',
          keyPoints: ['12-column grid math', 'Utility-first vs Component classes', 'Theme customization'],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'Why Frameworks?', description: 'Saving engineering hours on common UI' },
            { time: '2:15', seconds: 135, title: 'The 12-Column Grid', description: 'Responsive math breakdowns' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:05', seconds: 5, text: 'Frameworks allow you to translate wireframes into interactive prototypes in record time.' }
          ],
          demoAnimationType: 'dom-build'
        },
        practice: {
          id: 'prac-08-01',
          title: 'Style a Hero Banner with Utility Classes',
          difficulty: 'Beginner',
          estimatedTime: '5 mins',
          prompt: 'Add classes to create a prominent hero banner with a primary call to action.',
          instructions: [
            '1. Add class "hero-banner" to the outer container',
            '2. Add class "btn-cta" to the button with background: #4f46e5'
          ],
          starterHtml: `<div>\n  <h1>Build Faster With Frameworks</h1>\n  <p>Modular components ready for production.</p>\n  <button>Explore Components</button>\n</div>`,
          starterCss: `.hero-banner {\n  background: #f5f3ff;\n  padding: 32px;\n  border-radius: 12px;\n  font-family: sans-serif;\n  text-align: center;\n}\n\n.btn-cta {\n  background: #4f46e5;\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n}`,
          starterJs: ``,
          solutionHtml: `<div class="hero-banner">\n  <h1>Build Faster With Frameworks</h1>\n  <p>Modular components ready for production.</p>\n  <button class="btn-cta">Explore Components</button>\n</div>`,
          solutionCss: `.hero-banner {\n  background: #f5f3ff;\n  padding: 32px;\n  border-radius: 12px;\n  font-family: sans-serif;\n  text-align: center;\n}\n\n.btn-cta {\n  background: #4f46e5;\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n}`,
          solutionJs: ``,
          hints: ['Add class="hero-banner" to the div and class="btn-cta" to the button.'],
          testCases: [
            {
              id: 't-1',
              description: 'Hero banner exists',
              hint: 'Add class hero-banner to div.',
              checkType: 'selector-exists',
              target: '.hero-banner'
            }
          ]
        },
        quiz: [
          {
            id: 'q-08-1',
            question: 'In a 12-column grid system, how many columns must a 3-equal-card layout assign to each card on desktop?',
            options: ['4 columns (12 / 3 = 4)', '3 columns', '6 columns', '12 columns'],
            correctIndex: 0,
            explanation: '12 divided equally into 3 items gives 4 columns each (e.g. col-md-4).'
          }
        ],
        summary: [
          'Component frameworks provide reusable, battle-tested UI primitives.',
          'The 12-column grid offers a mathematical basis for responsive multi-column layouts.'
        ],
        relatedTopics: [
          {
            title: 'Git & GitHub Version Control',
            chapterNumber: '09',
            context: 'In Chapter 09 we learn how to version control and collaborate on project code with Git.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-09',
    number: '09',
    badge: '09',
    slug: 'git-and-github',
    title: 'Git & GitHub Version Control',
    subtitle: 'Commits, branches, remote repositories, pull requests, and collaboration',
    description: 'Learn the version control system trusted by every software team on earth. Master the 3 states (working, staging, commit), branch workflows, merge conflicts, and GitHub collaboration.',
    estimatedHours: '3 hrs',
    accentColor: 'cyan',
    iconName: 'GitBranch',
    totalLessons: 1,
    lessons: [
      {
        id: 'ch-09-l-01',
        chapterId: 'ch-09',
        number: '9.1',
        slug: 'git-mental-model-and-workflow',
        title: 'Git Fundamentals, Commits & Branches',
        tagline: 'Time-travel through code history and collaborate without overwriting files',
        durationMinutes: 25,
        learningObjectives: [
          'Understand the 3 Git Zones: Working Directory, Staging Area, and Local Repository',
          'Execute core commands: git init, git add, git commit -m, git status, git log',
          'Create and switch branches with git checkout -b / git switch',
          'Push code to GitHub and create clean Pull Requests'
        ],
        theorySections: [
          {
            heading: 'The 3 Git Zones',
            content: 'Git tracks changes to files like a photographer taking snapshots at milestone checkpoints.',
            bulletPoints: [
              '1. Working Directory: Your active files on disk (untracked / modified)',
              '2. Staging Area (`git add`): The photo staging frame choosing which changes to include',
              '3. Repository (`git commit`): The permanent snapshot recorded in project history with a cryptographic hash'
            ]
          }
        ],
        realWorldAnalogy: {
          title: 'Video Game Save Points & Timelines',
          concept: 'Git Commits & Branches',
          story: 'Imagine playing an RPG game. Before entering a dangerous boss fight, you save your game (git commit). If you want to test a risky magic spell without risking your main character progress, you clone your save file to a new slot (git branch). If it works, you merge the rewards into your main file (git merge).',
          moral: 'Branches let you experiment fearlessly without breaking production code.'
        },
        visualType: 'git-flow',
        codeExample: {
          title: 'Essential Git Workflow Terminal Commands',
          description: 'A standard sequence from starting a project to pushing to GitHub.',
          html: `<div class="terminal-card">\n  <div class="terminal-header">\n    <span class="dot red"></span>\n    <span class="dot yellow"></span>\n    <span class="dot green"></span>\n    <span class="title">bash - Terminal</span>\n  </div>\n  <pre class="terminal-body"><code>$ git init\n$ git status\n$ git add .\n$ git commit -m "feat: initial commit with semantic HTML"\n$ git branch -M main\n$ git remote add origin https://github.com/user/my-project.git\n$ git push -u origin main</code></pre>\n</div>`,
          css: `.terminal-card {\n  background: #0f172a;\n  color: #38bdf8;\n  border-radius: 10px;\n  overflow: hidden;\n  font-family: ui-monospace, monospace;\n  box-shadow: 0 8px 24px rgba(0,0,0,0.2);\n}\n\n.terminal-header {\n  background: #1e293b;\n  padding: 10px 14px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n}\n.red { background: #ef4444; }\n.yellow { background: #f59e0b; }\n.green { background: #10b981; }\n\n.title {\n  color: #94a3b8;\n  font-size: 12px;\n  margin-left: 8px;\n}\n\n.terminal-body {\n  padding: 18px;\n  margin: 0;\n  line-height: 1.6;\n  font-size: 14px;\n}`,
          js: ``,
          breakdown: [
            {
              lineRange: 'CMD L1-4',
              title: 'Local Repository Initialization',
              explanation: 'Initializes Git tracker, stages all modified files, and creates first permanent commit snapshot.'
            },
            {
              lineRange: 'CMD L5-7',
              title: 'Remote GitHub Push',
              explanation: 'Links local repo to GitHub cloud repository and uploads the main branch.'
            }
          ]
        },
        video: {
          title: 'Git Version Control in Practice',
          duration: '7:15',
          description: 'Visualizing commit graphs, branching strategies, and resolving merge conflicts cleanly.',
          keyPoints: ['The commit DAG tree', 'Feature branch workflow', 'Pull Request review etiquette'],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'The Git Mental Model', description: 'Why version control is mandatory' },
            { time: '2:40', seconds: 160, title: 'Branching & Merging', description: 'Working on features in isolation' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:10', seconds: 10, text: 'Git is the safety net that ensures you never lose a single line of working code.' }
          ],
          demoAnimationType: 'git-branch'
        },
        practice: {
          id: 'prac-09-01',
          title: 'Simulate a Git Commit Card',
          difficulty: 'Beginner',
          estimatedTime: '5 mins',
          prompt: 'Style a Git commit log card with author, commit hash, and message.',
          instructions: [
            '1. Add a commit hash badge with class "commit-hash"',
            '2. Add commit message "feat: added responsive mobile navigation"'
          ],
          starterHtml: `<div class="commit-item">\n  <span class="commit-hash">a7f39b1</span>\n  <p class="commit-msg">feat: added responsive mobile navigation</p>\n  <small class="author">By Sameer Chouhan • Just now</small>\n</div>`,
          starterCss: `.commit-item {\n  background: #ffffff;\n  padding: 16px;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  font-family: sans-serif;\n}\n\n.commit-hash {\n  font-family: monospace;\n  background: #f1f5f9;\n  color: #475569;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.commit-msg {\n  font-weight: 600;\n  color: #0f172a;\n  margin: 6px 0;\n}`,
          starterJs: ``,
          solutionHtml: `<div class="commit-item">\n  <span class="commit-hash">a7f39b1</span>\n  <p class="commit-msg">feat: added responsive mobile navigation</p>\n  <small class="author">By Sameer Chouhan • Just now</small>\n</div>`,
          solutionCss: `.commit-item {\n  background: #ffffff;\n  padding: 16px;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n  font-family: sans-serif;\n}\n\n.commit-hash {\n  font-family: monospace;\n  background: #f1f5f9;\n  color: #475569;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.commit-msg {\n  font-weight: 600;\n  color: #0f172a;\n  margin: 6px 0;\n}`,
          solutionJs: ``,
          hints: ['Verify the markup renders cleanly in the preview tab.'],
          testCases: [
            {
              id: 't-1',
              description: 'Commit item container exists',
              hint: 'Keep .commit-item element.',
              checkType: 'selector-exists',
              target: '.commit-item'
            }
          ]
        },
        quiz: [
          {
            id: 'q-09-1',
            question: 'What is the purpose of the `git add` command?',
            options: [
              'Moves modified files from the working directory into the staging area',
              'Immediately pushes code to the public internet',
              'Deletes old branches',
              'Formats CSS code automatically'
            ],
            correctIndex: 0,
            explanation: '`git add` stages changes so they can be grouped into the next commit snapshot.'
          }
        ],
        summary: [
          'Git records project history through immutable commit snapshots.',
          'Branches isolate new features, bugfixes, and experiments.',
          'GitHub enables collaborative pull request code reviews and remote backup.'
        ],
        relatedTopics: [
          {
            title: 'Final Project & Cloud Deployment',
            chapterNumber: '10',
            context: 'In Chapter 10 we take our git repository and deploy it live to the global web.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch-10',
    number: '10',
    badge: '10',
    slug: 'final-project-and-deployment',
    title: 'Capstone Project & Cloud Deployment',
    subtitle: 'Build a production-ready website and publish it live to the global internet',
    description: 'The culmination of your developer journey. Build a complete, responsive, multi-section developer portfolio website, optimize assets, and deploy it to the world for free.',
    estimatedHours: '4 hrs',
    accentColor: 'emerald',
    iconName: 'Rocket',
    totalLessons: 1,
    lessons: [
      {
        id: 'ch-10-l-01',
        chapterId: 'ch-10',
        number: '10.1',
        slug: 'capstone-build-and-deploy',
        title: 'Building & Deploying Your Portfolio to the World',
        tagline: 'From zero knowledge to your first professional live website online',
        durationMinutes: 35,
        learningObjectives: [
          'Assemble semantic HTML, responsive CSS, and interactive JavaScript into a complete portfolio',
          'Optimize images, typography, and Lighthouse performance scores',
          'Deploy live to hosting providers (Vercel, Netlify, Cloud Run, GitHub Pages)',
          'Configure custom domains and OpenGraph social share previews'
        ],
        theorySections: [
          {
            heading: 'The Full Production Lifecycle',
            content: 'Congratulations on reaching Chapter 10! You now possess the comprehensive toolset required to build modern, responsive, accessible web applications from scratch.',
            bulletPoints: [
              '1. Architecture: Plan semantic wireframes before writing code',
              '2. Styling: Establish design tokens (colors, fonts, box model)',
              '3. Interactivity: Add accessible JS event handlers and state controls',
              '4. Verification: Test across mobile viewports in DevTools',
              '5. Deployment: Push git repository to automated CI/CD cloud hosting'
            ]
          }
        ],
        realWorldAnalogy: {
          title: 'The Grand Opening of Your Shop',
          concept: 'Deploying to Production',
          story: 'You bought land (domain name), built the walls and foundation (HTML), painted the facade and decorated the windows (CSS), installed cash registers and automated doors (JavaScript), and now you cut the red ribbon for the world to visit (Deployment).',
          moral: 'Shipping your work to real users is where software truly comes alive.'
        },
        visualType: 'deployment-pipeline',
        codeExample: {
          title: 'Complete Production Portfolio Showcase',
          description: 'A polished developer portfolio section with responsive grid and live contact drawer.',
          html: `<section class="portfolio-hero">\n  <div class="badge">🚀 Available for Hire</div>\n  <h1>Sameer Chouhan</h1>\n  <p class="subtitle">Full-Stack Web Developer & Technical Educator</p>\n  <div class="skills-row">\n    <span class="chip">HTML5</span>\n    <span class="chip">CSS3 / Flexbox / Grid</span>\n    <span class="chip">JavaScript ES6+</span>\n    <span class="chip">Git / GitHub</span>\n  </div>\n  <div class="cta-group">\n    <button id="contactBtn" class="btn primary">Get in Touch</button>\n    <a href="#projects" class="btn secondary">View Projects</a>\n  </div>\n</section>`,
          css: `.portfolio-hero {\n  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);\n  color: #ffffff;\n  padding: 48px 32px;\n  border-radius: 16px;\n  text-align: center;\n  font-family: system-ui, -apple-system, sans-serif;\n  box-shadow: 0 12px 32px rgba(0,0,0,0.25);\n}\n\n.badge {\n  display: inline-block;\n  background: rgba(16, 185, 129, 0.2);\n  color: #34d399;\n  border: 1px solid rgba(16, 185, 129, 0.4);\n  padding: 4px 14px;\n  border-radius: 9999px;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n\nh1 {\n  font-size: 32px;\n  font-weight: 800;\n  margin: 0 0 8px 0;\n}\n\n.subtitle {\n  color: #94a3b8;\n  font-size: 16px;\n  margin: 0 0 24px 0;\n}\n\n.skills-row {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 8px;\n  margin-bottom: 28px;\n}\n\n.chip {\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  padding: 6px 14px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.cta-group {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n}\n\n.btn {\n  padding: 10px 22px;\n  border-radius: 8px;\n  font-weight: 600;\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn.primary {\n  background: #6366f1;\n  color: #ffffff;\n  border: none;\n}\n\n.btn.secondary {\n  background: transparent;\n  color: #e2e8f0;\n  border: 1px solid rgba(255,255,255,0.2);\n}`,
          js: `document.getElementById('contactBtn').addEventListener('click', () => {\n  alert("🎉 Congratulations on completing the WZ Storehouse Web Curriculum!");\n});`,
          breakdown: [
            {
              lineRange: 'HTML L1-16',
              title: 'Portfolio Hero Section',
              explanation: 'Semantic hero container featuring status pill, name heading, skill tags, and action buttons.'
            },
            {
              lineRange: 'CSS L1-10',
              title: 'Modern Gradient Aesthetic',
              explanation: 'Dark indigo linear gradient with smooth typography and rounded container geometry.'
            }
          ]
        },
        video: {
          title: 'Deploying Your Website Live in 3 Minutes',
          duration: '6:00',
          description: 'Connecting GitHub to Vercel/Netlify for automated continuous deployment with SSL.',
          keyPoints: ['GitHub repository connection', 'Custom domain DNS records', 'SSL certificates & HTTPS'],
          timestamps: [
            { time: '0:00', seconds: 0, title: 'Deployment Overview', description: 'How cloud hosts serve static assets' },
            { time: '2:15', seconds: 135, title: 'One-Click Cloud Deployment', description: 'Pushing code to go live immediately' }
          ],
          transcript: [
            { speaker: 'Instructor', time: '0:10', seconds: 10, text: 'You have built something wonderful. Now let us share it with friends, family, and employers worldwide.' }
          ],
          demoAnimationType: 'deploy-cloud'
        },
        practice: {
          id: 'prac-10-01',
          title: 'Final Capstone Project Verification',
          difficulty: 'Intermediate',
          estimatedTime: '10 mins',
          prompt: 'Customize your portfolio hero with your name, dream tech stack, and interactive contact message!',
          instructions: [
            '1. In HTML, update the <h1> to your name',
            '2. Add at least 4 tech chips in .skills-row',
            '3. Test clicking the contact button to verify the script event'
          ],
          starterHtml: `<section class="portfolio-hero">\n  <h1>Sameer Chouhan</h1>\n  <p>Web Developer</p>\n  <button id="launchBtn">Publish Site</button>\n</section>`,
          starterCss: `.portfolio-hero {\n  background: #0f172a;\n  color: white;\n  padding: 32px;\n  border-radius: 12px;\n  text-align: center;\n  font-family: sans-serif;\n}\n\nbutton {\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n}`,
          starterJs: `document.getElementById('launchBtn').addEventListener('click', () => {\n  alert('🚀 Portfolio deployed successfully!');\n});`,
          solutionHtml: `<section class="portfolio-hero">\n  <h1>Sameer Chouhan</h1>\n  <p>Web Developer</p>\n  <button id="launchBtn">Publish Site</button>\n</section>`,
          solutionCss: `.portfolio-hero {\n  background: #0f172a;\n  color: white;\n  padding: 32px;\n  border-radius: 12px;\n  text-align: center;\n  font-family: sans-serif;\n}\n\nbutton {\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n}`,
          solutionJs: `document.getElementById('launchBtn').addEventListener('click', () => {\n  alert('🚀 Portfolio deployed successfully!');\n});`,
          hints: ['Edit the name inside the <h1> tag and test the button click.'],
          testCases: [
            {
              id: 't-1',
              description: 'Portfolio hero section exists',
              hint: 'Keep .portfolio-hero container.',
              checkType: 'selector-exists',
              target: '.portfolio-hero'
            }
          ]
        },
        quiz: [
          {
            id: 'q-10-1',
            question: 'What is the primary benefit of deploying a website with continuous deployment via Git?',
            options: [
              'Every time you push a git commit, your live website updates automatically within seconds',
              'It eliminates the need for HTML',
              'It automatically pays your server bills',
              'It makes JavaScript run in offline browsers only'
            ],
            correctIndex: 0,
            explanation: 'Modern platforms like Vercel and Netlify listen for GitHub pushes, build your site, and deploy it to a global edge network automatically.'
          }
        ],
        summary: [
          'You have mastered the foundational pillars of frontend engineering: HTML, CSS, Flexbox, Grid, JavaScript, Responsive Design, Tooling, and Git.',
          'Deploying your projects to GitHub and live hosting is the best way to demonstrate competency to peers and hiring managers.',
          'Continue building, experimenting, and sharing your creations!'
        ],
        relatedTopics: [
          {
            title: 'WZ Storehouse Certificate of Mastery',
            chapterNumber: '10',
            context: 'Claim your verifiable Certificate of Web Development Mastery in the platform settings!'
          }
        ]
      }
    ]
  }
];
