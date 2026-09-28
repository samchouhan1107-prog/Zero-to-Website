import { Chapter } from '../../utils/types';

export const chapter00: Chapter = {
  id: 'ch-00',
  number: '00',
  badge: '00',
  slug: 'introduction',
  title: 'How the Web Works',
  subtitle: 'Packets, DNS, Servers, Browsers & DOM Engine',
  description: 'Understand the foundational architecture of the modern web before writing a single line of code. Learn what happens when you type a URL, how DNS resolves servers, and how the browser parses HTML, CSS, and JS into pixels.',
  estimatedHours: '2 hrs',
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
      tagline: 'From URL keystroke to rendered pixel: understand the request-response lifecycle',
      durationMinutes: 20,
      learningObjectives: [
        'Deconstruct what happens when you type https://webzonebw.shop and press Enter',
        'Understand DNS (Domain Name System) as the internet telephone directory',
        'Explain TCP/IP handshakes, TLS/SSL encryption, and HTTP request/response payloads',
        'Trace the browser Critical Rendering Path (CRP): DOM + CSSOM = Render Tree -> Layout -> Paint'
      ],
      theorySections: [
        {
          heading: '1. The Journey of a Web Request',
          content: 'The internet is a global network of interconnected computers communicating via standardized protocols. When you visit a website, your browser acts as a client requesting resources from a remote computer called a server.',
          bulletPoints: [
            'Client (Your Browser): Prepares an HTTP GET request asking for index.html',
            'DNS Resolution: Translates human-readable domain (webzonebw.shop) into an IP address (e.g. 192.0.2.1)',
            'TCP/IP Handshake: Establishes a reliable connection between client and host',
            'TLS/SSL Negotiation: Secures the channel with cryptographic certificates (HTTPS)',
            'HTTP Response: The server returns status codes (200 OK) and payload (HTML/CSS/JS assets)'
          ],
          callout: {
            type: 'key-rule',
            text: 'Rule #1 of Web Development: Browsers only understand three languages natively — HTML for structure, CSS for styling, and JavaScript for behavior.'
          }
        },
        {
          heading: '2. The Critical Rendering Path (CRP)',
          content: 'Once the raw HTML bytes reach your browser, the rendering engine transforms text into living pixels on your screen through 5 deterministic stages.',
          bulletPoints: [
            'DOM Tree: HTML bytes are parsed into tokens, nodes, and hierarchical document objects',
            'CSSOM Tree: CSS rules are parsed into an object model determining visual properties',
            'Render Tree: DOM and CSSOM combine, filtering out non-visible elements (like <head> or display:none)',
            'Layout (Reflow): The browser calculates exact coordinates and dimensions for each element',
            'Paint (Rasterize): Pixels are drawn onto the GPU layer and composited to screen'
          ],
          callout: {
            type: 'tip',
            text: 'Understanding the Critical Rendering Path is what separates amateur coders from senior web performance engineers.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Restaurant Analogy',
        concept: 'Client-Server Architecture',
        story: 'Imagine walking into a restaurant. You are the Client. You look at the menu (DNS lookup) and place an order with the Waiter (the HTTP Request). The Waiter runs back to the Kitchen (the Server / Backend), where the Chef prepares the meal (database query & asset compilation). The Waiter brings the hot plate back to your table (the HTTP Response). You assemble the fork, knife, and napkin to eat it (the Browser Rendering Engine).',
        moral: 'Web development is the craft of designing the menu, training the waiter, outfitting the kitchen, and presenting a feast.',
        icon: 'Globe'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Minimal Valid HTML5 Document Skeleton',
        description: 'Every web document requires this baseline boilerplate to trigger standards mode in modern browsers.',
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello WebZone</title>
  </head>
  <body>
    <h1>Welcome to Web Development!</h1>
    <p>This page was parsed from raw text into a living DOM tree.</p>
  </body>
</html>`,
        css: `body {
  font-family: system-ui, sans-serif;
  margin: 2rem;
  background: #f8fafc;
  color: #0f172a;
}

h1 {
  color: #3b82f6;
}`,
        breakdown: [
          {
            lineRange: 'Line 1',
            title: '<!DOCTYPE html>',
            explanation: 'Tells the browser engine to render the document in modern HTML5 standards mode rather than quirks mode.',
            highlightTokens: ['<!DOCTYPE html>']
          },
          {
            lineRange: 'Line 2',
            title: '<html lang="en">',
            explanation: 'The root container for all elements on the page. The lang attribute declares English as the primary language for accessibility and search engines.',
            highlightTokens: ['lang="en"']
          },
          {
            lineRange: 'Line 4-5',
            title: 'Meta Charset & Viewport',
            explanation: 'UTF-8 enables international character encoding (emojis, multilingual text). Viewport enables fluid responsive scaling on mobile devices.',
            highlightTokens: ['charset="UTF-8"', 'viewport']
          },
          {
            lineRange: 'Line 7-10',
            title: '<body> Content',
            explanation: 'Everything inside the <body> tag is rendered visible to the human user in the browser window.',
            highlightTokens: ['<body>', '<h1>', '<p>']
          }
        ],
        outputPreviewTitle: 'Live Browser Rendering'
      },
      video: {
        title: 'Demystifying the Internet & Critical Rendering Path',
        duration: '14:20',
        description: 'Visual walkthrough of packet hops, DNS servers, fiber optic undersea cables, and DOM tree construction.',
        keyPoints: [
          'Packet switching vs circuit switching',
          'IP addresses (IPv4 vs IPv6)',
          'Client vs Server roles',
          'DOM construction visual demo'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Introduction', description: 'Overview of the web stack' },
          { time: '03:15', seconds: 195, title: 'DNS Resolution', description: 'How domains map to IP addresses' },
          { time: '07:45', seconds: 465, title: 'HTTP Request Lifecycle', description: 'Headers, payloads, and status codes' },
          { time: '11:10', seconds: 670, title: 'DOM & CSSOM Painting', description: 'How browsers paint pixels' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Welcome to Chapter 0. Before we write HTML, we must understand the platform we are targeting.' },
          { speaker: 'Instructor', time: '03:15', seconds: 195, text: 'When you type a URL, your operating system asks recursive resolvers to find the destination IP.' },
          { speaker: 'Instructor', time: '07:45', seconds: 465, text: 'The server responds with an HTTP status code like 200 OK or 404 Not Found along with content.' }
        ],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-00-01',
        title: 'Build Your First Living Document Header',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create a clean HTML5 header with an <h1> title and an informative <p> paragraph tag introducing your development journey.',
        instructions: [
          'Add an <h1> heading with the text "My Web Journey Begins"',
          'Add a <p> paragraph explaining what you are excited to build',
          'Style the <h1> with a vibrant color (such as royal blue #2563eb)'
        ],
        starterHtml: `<!-- Add your <h1> and <p> below -->
<div class="card">
  
</div>`,
        starterCss: `.card {
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
/* Add your heading styles here */`,
        starterJs: `console.log("Welcome to WebZone Interactive Sandbox!");`,
        solutionHtml: `<div class="card">
  <h1>My Web Journey Begins</h1>
  <p>I am excited to build responsive, accessible, and fast web applications.</p>
</div>`,
        solutionCss: `.card {
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
h1 {
  color: #2563eb;
  margin-bottom: 0.5rem;
}
p {
  color: #475569;
  line-height: 1.6;
}`,
        solutionJs: `console.log("Welcome to WebZone Interactive Sandbox!");`,
        hints: [
          'Headings use <h1>, <h2> up to <h6> tags in HTML.',
          'Paragraphs use the <p> tag.',
          'In CSS, target h1 using: h1 { color: #2563eb; }'
        ],
        testCases: [
          {
            id: 'tc-00-1',
            description: 'Contains an <h1> tag with text',
            hint: 'Make sure you added an <h1> tag with text inside',
            checkType: 'selector-exists',
            target: 'h1'
          },
          {
            id: 'tc-00-2',
            description: 'Contains a <p> paragraph tag',
            hint: 'Add a <p> tag describing your web journey',
            checkType: 'selector-exists',
            target: 'p'
          }
        ],
        conceptQuestion: {
          question: 'What is the primary role of DNS on the internet?',
          options: [
            'To translate human domain names like webzonebw.shop into numerical IP addresses',
            'To compile JavaScript code into machine bytecode',
            'To encrypt user passwords in the browser storage',
            'To create visual animations on web pages'
          ],
          correctIndex: 0,
          explanation: 'DNS (Domain Name System) acts like the phonebook of the internet, mapping human-friendly names to machine IP addresses.'
        }
      },
      quiz: [
        {
          id: 'q-00-1',
          question: 'What does CRP stand for in browser performance engineering?',
          options: [
            'Critical Rendering Path',
            'Cascading Render Protocol',
            'Central Routing Process',
            'Client Redirection Path'
          ],
          correctIndex: 0,
          explanation: 'The Critical Rendering Path is the sequence of steps browsers take to convert HTML, CSS, and JS into pixels on screen.'
        },
        {
          id: 'q-00-2',
          question: 'Which tree structure is constructed first by the browser parsing engine?',
          options: [
            'The DOM (Document Object Model)',
            'The Render Tree',
            'The CSSOM (CSS Object Model)',
            'The Layout Coordinate Map'
          ],
          correctIndex: 0,
          explanation: 'The browser parses HTML tokens into DOM nodes first, while simultaneously fetching linked stylesheets to build the CSSOM.'
        }
      ],
      summary: [
        'The web relies on client-server architecture powered by HTTP/HTTPS protocols.',
        'DNS translates human-readable domain names into IP addresses.',
        'The Critical Rendering Path converts code into DOM, CSSOM, Render Tree, Layout, and Paint.',
        'HTML provides structural meaning, CSS provides visual styling, and JS provides interactivity.'
      ],
      relatedTopics: [
        {
          title: 'Code Editor & Environment Setup',
          chapterNumber: '01',
          lessonId: 'ch-01-l-01',
          context: 'Next, configure your local development tools to write HTML efficiently.'
        }
      ]
    },
    {
      id: 'ch-00-l-02',
      chapterId: 'ch-00',
      number: '0.2',
      slug: 'web-architecture-client-server',
      title: 'Web Architecture & Client-Server Protocols',
      tagline: 'Understand HTTP methods, status codes, REST APIs, and how frontends talk to backends',
      durationMinutes: 20,
      learningObjectives: [
        'Differentiate between Frontend (Client) and Backend (Server) responsibilities',
        'Learn standard HTTP methods: GET, POST, PUT, PATCH, DELETE',
        'Master common HTTP status codes (200, 201, 301, 400, 401, 404, 500)',
        'Understand JSON as the universal lingua franca of modern web data exchange'
      ],
      theorySections: [
        {
          heading: '1. Frontend vs. Backend Responsibilities',
          content: 'Modern web applications are distributed systems. The code that executes on the end user’s phone or laptop is the Frontend (client-side), whereas the code running in secure cloud data centers is the Backend (server-side).',
          bulletPoints: [
            'Frontend (Client): UI layout, user input capture, animations, local state, accessibility',
            'Backend (Server): Authentication, databases, payment processing, business logic, authorization',
            'API (Application Programming Interface): The structured contract that lets client and server exchange data'
          ]
        },
        {
          heading: '2. HTTP Status Code Cheat Sheet',
          content: 'Servers communicate outcomes using 3-digit numerical codes categorized into 5 families.',
          bulletPoints: [
            '1xx Informational: Request received, continuing process',
            '2xx Success: 200 OK (Standard success), 201 Created (Resource successfully created)',
            '3xx Redirection: 301 Moved Permanently, 304 Not Modified (cached)',
            '4xx Client Error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found',
            '5xx Server Error: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Post Office & Sealed Letters',
        concept: 'HTTP Requests and Responses',
        story: 'When you mail a letter, you write an address on the envelope (URL endpoint), attach a stamp (headers/auth), write your message inside (request body), and specify delivery speed (protocol). The recipient reads your letter and sends back a signed delivery receipt with status: Delivered (200 OK) or Address Unknown (404).',
        moral: 'Protocol standards guarantee that different machines across the globe can always understand each other.',
        icon: 'Server'
      },
      visualType: 'network-flow',
      codeExample: {
        title: 'Modern Fetch API Client Request',
        description: 'How a frontend JavaScript client communicates asynchronously with a backend server API.',
        html: `<div class="api-demo">
  <button id="fetchBtn">Fetch User Profile</button>
  <div id="statusBox" class="status">Waiting for click...</div>
</div>`,
        css: `.api-demo {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
button {
  background: #0284c7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.status {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 4px;
}`,
        js: `const btn = document.getElementById('fetchBtn');
const box = document.getElementById('statusBox');

btn?.addEventListener('click', async () => {
  box.textContent = 'Contacting server: GET /api/user...';
  setTimeout(() => {
    box.textContent = 'Status: 200 OK — Data: { name: "Learner", level: "Beginner" }';
  }, 600);
});`,
        breakdown: [
          {
            lineRange: 'Line 1-3',
            title: 'DOM Querying',
            explanation: 'Grabbing interactive button and output containers from the page.',
            highlightTokens: ['getElementById']
          },
          {
            lineRange: 'Line 5-10',
            title: 'Asynchronous Request Simulation',
            explanation: 'Simulating an HTTP GET request to fetch remote JSON data without reloading the page.',
            highlightTokens: ['addEventListener', 'fetch']
          }
        ]
      },
      video: {
        title: 'Understanding HTTP Methods and Status Codes',
        duration: '11:45',
        description: 'A deep dive into HTTP headers, GET vs POST payloads, and interpreting network devtools tabs.',
        keyPoints: [
          'Idempotent vs non-idempotent methods',
          'REST architecture overview',
          'Interpreting 4xx vs 5xx errors'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Introduction', description: 'The role of HTTP' },
          { time: '03:20', seconds: 200, title: 'HTTP Methods', description: 'GET, POST, PUT, DELETE' },
          { time: '07:10', seconds: 430, title: 'Status Codes', description: '200 through 500' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'HTTP is the protocol that powers virtually all human interaction on the modern web.' }
        ],
        demoAnimationType: 'packet-route'
      },
      practice: {
        id: 'prac-00-02',
        title: 'Simulate an API Status Badge',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create a status badge component that indicates a "200 OK" server status with green text and a subtle background.',
        instructions: [
          'Create a <span> or <div> element with class "status-badge"',
          'Include the text "200 OK — Server Healthy"',
          'Style it with a green accent color (such as #16a34a)'
        ],
        starterHtml: `<div class="server-monitor">
  <h3>API Health Monitor</h3>
  <!-- Insert badge here -->
</div>`,
        starterCss: `.server-monitor {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
/* Style your .status-badge below */`,
        starterJs: `console.log("Server monitor ready.");`,
        solutionHtml: `<div class="server-monitor">
  <h3>API Health Monitor</h3>
  <span class="status-badge">200 OK — Server Healthy</span>
</div>`,
        solutionCss: `.server-monitor {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #dcfce7;
  color: #16a34a;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
}`,
        solutionJs: `console.log("Server monitor ready.");`,
        hints: [
          'Use class="status-badge" on your span.',
          'Green colors like #16a34a or #15803d look professional on a light green #dcfce7 background.'
        ],
        testCases: [
          {
            id: 'tc-00-2a',
            description: 'Element with status-badge class exists',
            hint: 'Add a span or div with class="status-badge"',
            checkType: 'selector-exists',
            target: '.status-badge'
          }
        ],
        conceptQuestion: {
          question: 'Which HTTP status code signifies that a resource was not found on the server?',
          options: ['200', '301', '404', '500'],
          correctIndex: 2,
          explanation: '404 Not Found is the standard client error code when the requested URL cannot be located.'
        }
      },
      quiz: [
        {
          id: 'q-00-2a',
          question: 'Which HTTP method should be used to submit new data (like a signup form) to a server?',
          options: ['GET', 'POST', 'HEAD', 'OPTIONS'],
          correctIndex: 1,
          explanation: 'POST is designed to send data in the request body to create or process resources on the server.'
        }
      ],
      summary: [
        'The frontend handles client UI; the backend handles secure data and authentication.',
        'HTTP defines methods (GET, POST, PUT, DELETE) and status codes (200, 404, 500).',
        'JSON is the universal lightweight data interchange format across the web.'
      ],
      relatedTopics: [
        {
          title: 'Development Environment & Tools',
          chapterNumber: '01',
          lessonId: 'ch-01-l-01',
          context: 'Set up your code editor and browser devtools.'
        }
      ]
    }
  ]
};
