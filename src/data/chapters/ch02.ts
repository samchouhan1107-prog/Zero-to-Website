import { Chapter } from '../../utils/types';

export const chapter02: Chapter = {
  id: 'ch-02',
  number: '02',
  badge: '02',
  slug: 'html-fundamentals',
  title: 'HTML Fundamentals & Semantics',
  subtitle: 'Structural Elements, Forms, Accessibility & Advanced Tags',
  description: 'Master the foundation of the web. Learn semantic tags (<header>, <main>, <article>), build accessible forms with client-side validation, construct multi-page websites, and leverage advanced HTML5 features like dialogs, canvas, and SEO metadata.',
  estimatedHours: '3 hrs',
  accentColor: 'emerald',
  iconName: 'FileCode',
  totalLessons: 5,
  lessons: [
    {
      id: 'ch-02-l-01',
      chapterId: 'ch-02',
      number: '2.1',
      slug: 'what-is-html',
      title: 'What is HTML? Anatomy & Document Tree',
      tagline: 'Understand the language of the web, tag syntax, nestings, and how elements become the DOM',
      durationMinutes: 20,
      learningObjectives: [
        'Understand what HyperText Markup Language is and how browsers interpret it',
        'Master the difference between tags, elements, and attributes',
        'Learn proper nesting rules (closing inner tags before outer tags)',
        'Understand self-closing (void) elements like <img>, <input>, and <meta>'
      ],
      theorySections: [
        {
          heading: '1. What is HTML?',
          content: 'HTML (HyperText Markup Language) is the standard markup language used to structure content on the World Wide Web. It tells the browser what each part of a page represents: a title, a paragraph, an image, or a button.',
          bulletPoints: [
            'HyperText: Text that contains links allowing users to jump between documents across the web',
            'Markup: An annotation system that wraps raw text in tags to give it meaning and structure',
            'Language: A standardized syntax governed by the W3C and WHATWG consortiums'
          ]
        },
        {
          heading: '2. Tag Syntax and Nesting Rules',
          content: 'Most HTML elements consist of an opening tag, content, and a closing tag. In HTML, tags must be strictly nested like Russian nesting dolls.',
          bulletPoints: [
            'Opening Tag: <p> announces the start of a paragraph',
            'Content: The text or child elements sitting between tags',
            'Closing Tag: </p> with a forward slash marks the end of the element',
            'Void Elements: Elements that do not hold text or child elements (like <img>, <br>, <hr>) do not have closing tags'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden Nesting Rule: The last tag opened must be the first tag closed! Correct: <p>Hello <strong>World</strong></p>. Incorrect: <p>Hello <strong>World</p></strong>.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Steel Skeleton of a Skyscraper',
        concept: 'HTML as Structural Architecture',
        story: 'When constructing a 50-story skyscraper, workers do not start with paint, glass curtains, or electrical elevators. They erect high-strength steel beams and concrete foundations. That steel skeleton is HTML. CSS will be the glass curtain and interior decor, and JavaScript will be the electrical lighting and smart elevators.',
        moral: 'Without solid structural HTML, no amount of CSS or JavaScript can rescue an unstable website.',
        icon: 'FileCode'
      },
      visualType: 'semantic-html',
      codeExample: {
        title: 'Well-Structured Semantic Article',
        description: 'Clean HTML demonstrating proper nesting and attribute usage.',
        html: `<article class="news-item">
  <h2>Breakthrough in Clean Energy</h2>
  <p>Engineers have developed a <strong>high-efficiency</strong> solar cell.</p>
  <a href="#learn-more" class="read-link">Read Full Report &rarr;</a>
</article>`,
        css: `.news-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.news-item h2 {
  color: #0f172a;
  margin-top: 0;
}
.read-link {
  color: #059669;
  text-decoration: none;
  font-weight: 600;
}`,
        breakdown: [
          {
            lineRange: 'Line 1',
            title: '<article class="news-item">',
            explanation: 'Declares an independent, self-contained piece of content.',
            highlightTokens: ['<article']
          },
          {
            lineRange: 'Line 3',
            title: 'Proper Nesting with <strong>',
            explanation: 'The <strong> tag emphasizes key words and closes before the parent <p> closes.',
            highlightTokens: ['<strong>', '</strong>']
          }
        ]
      },
      video: {
        title: 'Understanding HTML Elements and Document Flow',
        duration: '12:30',
        description: 'Visual breakdown of elements, attributes, block vs inline flow, and the DOM tree.',
        keyPoints: [
          'Opening vs closing tags',
          'Void / self-closing elements',
          'The document object model hierarchy'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'What is HTML', description: 'Origins and syntax' },
          { time: '04:10', seconds: 250, title: 'Attributes', description: 'Adding ids, classes, and hrefs' },
          { time: '08:40', seconds: 520, title: 'Nesting Rules', description: 'Avoiding broken trees' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'HTML is the structural backbone of every page on the internet.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-02-01',
        title: 'Nest a Feature Highlight Card',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create a feature container (<div class="feature-card">) containing an <h2> title, a paragraph (<p>) with some <em>emphasized</em> text, and an <a> link with href="#details".',
        instructions: [
          'Create a <div class="feature-card">',
          'Add an <h2> heading with a feature title',
          'Add a <p> containing an <em> tag for emphasis',
          'Add an <a> tag linking to "#details"'
        ],
        starterHtml: `<!-- Build feature card here -->
<div class="feature-card">
  
</div>`,
        starterCss: `.feature-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.feature-card a {
  color: #059669;
  font-weight: 600;
}`,
        starterJs: `console.log("Feature card initialized.");`,
        solutionHtml: `<div class="feature-card">
  <h2>Lightning Fast Performance</h2>
  <p>Our platform is built with <em>zero bloat</em> for maximum speed.</p>
  <a href="#details">Explore Features &rarr;</a>
</div>`,
        solutionCss: `.feature-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.feature-card a {
  color: #059669;
  font-weight: 600;
}`,
        solutionJs: `console.log("Feature card initialized.");`,
        hints: [
          'Use <em>inside</em> the <p> tag to emphasize text.',
          'Remember to close </em> before closing </p>.'
        ],
        testCases: [
          {
            id: 'tc-02-1a',
            description: 'Contains <h2> inside feature card',
            hint: 'Add an <h2> heading tag',
            checkType: 'selector-exists',
            target: '.feature-card h2'
          },
          {
            id: 'tc-02-1b',
            description: 'Contains <em> tag inside paragraph',
            hint: 'Add an <em> tag inside <p>',
            checkType: 'selector-exists',
            target: '.feature-card p em'
          }
        ],
        conceptQuestion: {
          question: 'Which of the following is a void (self-closing) element in HTML?',
          options: ['<img>', '<p>', '<div>', '<button>'],
          correctIndex: 0,
          explanation: 'The <img> element is a void element that does not have content or a closing tag.'
        }
      },
      quiz: [
        {
          id: 'q-02-1',
          question: 'What does the acronym HTML stand for?',
          options: [
            'HyperText Markup Language',
            'High-Level Text Machine Logic',
            'Hyperlink and Text Modular Layout',
            'Home Tool Markup Language'
          ],
          correctIndex: 0,
          explanation: 'HTML stands for HyperText Markup Language.'
        }
      ],
      summary: [
        'HTML provides the structure and meaning of web content.',
        'Elements are made of opening tags, content, and closing tags.',
        'Tags must be cleanly nested without overlapping closure.',
        'Void elements like <img> and <input> do not require closing tags.'
      ],
      relatedTopics: [
        {
          title: 'HTML Elements & Semantics',
          chapterNumber: '02',
          lessonId: 'ch-02-l-02',
          context: 'Explore semantic HTML5 tags: header, main, nav, section, article, footer.'
        }
      ]
    },
    {
      id: 'ch-02-l-02',
      chapterId: 'ch-02',
      number: '2.2',
      slug: 'html-elements',
      title: 'HTML Elements & Semantic Layouts',
      tagline: 'Replace generic <div> soups with meaningful semantic tags for accessibility and SEO',
      durationMinutes: 25,
      learningObjectives: [
        'Differentiate between semantic elements (<header>, <main>, <nav>, <article>, <aside>, <footer>) and generic containers (<div>, <span>)',
        'Understand why screen readers and search engines reward semantic HTML',
        'Learn text formatting tags: <h1>-<h6>, <p>, <ul>, <ol>, <blockquote>, <code>',
        'Master media embedding with <img>, <figure>, <figcaption>, and accessible alt attributes'
      ],
      theorySections: [
        {
          heading: '1. The Problem with "Div Soup"',
          content: 'Before HTML5, developers wrapped everything in generic <div id="header"> and <div id="content"> tags. This created unreadable code that gave screen readers zero context about document structure.',
          bulletPoints: [
            '<header>: Introductory content or navigational aid for a page or section',
            '<nav>: Section containing major site navigation links',
            '<main>: The dominant, unique content of the document (only one per page)',
            '<article>: Self-contained, reusable content (blog post, news story, review)',
            '<section>: A thematic grouping of content with a heading',
            '<aside>: Complementary sidebar content (related links, author bio)',
            '<footer>: Document footer containing copyright, contact, and legal links'
          ],
          callout: {
            type: 'key-rule',
            text: 'Accessibility Rule: An accessible website uses only one <main> element per page, and exactly one <h1> representing the primary topic of that page.'
          }
        },
        {
          heading: '2. Images and Accessible Descriptions',
          content: 'Images on the web use the <img> element. The alt attribute is not optional: it provides screen readers with a description and appears if the image fails to load.',
          bulletPoints: [
            'Informative Images: Write clear alt text describing what the image shows',
            'Decorative Images: Use empty alt="" so screen readers gracefully skip it',
            '<figure> and <figcaption>: Semantically bind an image to its caption'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'Clear Highway Road Signs vs Blank Gray Boards',
        concept: 'Semantic Meaning for Navigators',
        story: 'Imagine driving down an interstate where every sign was an identical blank gray board labeled "Board #1", "Board #2", and "Board #3". You would have no idea where the exit, rest stop, or hospital was. Semantic HTML provides clear illuminated highway signs for search engine crawlers and blind users using screen readers.',
        moral: 'Semantic HTML gives your website a clear voice and high accessibility ranking.',
        icon: 'Layers'
      },
      visualType: 'semantic-html',
      codeExample: {
        title: 'Full Semantic Page Layout Structure',
        description: 'Notice how every major section uses a purpose-built semantic container.',
        html: `<div class="site-wrapper">
  <header class="site-header">
    <h1>WebZone Academy</h1>
    <nav>
      <a href="#courses">Courses</a>
      <a href="#about">About</a>
    </nav>
  </header>
  <main class="site-main">
    <article>
      <h2>Modern Web Semantics</h2>
      <p>Semantic tags make your code readable, accessible, and search-friendly.</p>
    </article>
  </main>
  <footer class="site-footer">
    <p>&copy; 2026 WebZone Storehouse</p>
  </footer>
</div>`,
        css: `.site-wrapper {
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  padding: 1.5rem;
}
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1rem;
}
.site-main {
  margin: 1.5rem 0;
}
.site-footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  color: #64748b;
  font-size: 0.875rem;
}`,
        breakdown: [
          {
            lineRange: 'Lines 2-7',
            title: '<header> and <nav>',
            explanation: 'Groups the primary site branding and top navigation links.',
            highlightTokens: ['<header', '<nav']
          },
          {
            lineRange: 'Lines 8-13',
            title: '<main> and <article>',
            explanation: 'Encloses the core content of the document in a dedicated landmark.',
            highlightTokens: ['<main', '<article']
          }
        ]
      },
      video: {
        title: 'Semantic HTML5 Architecture and Screen Readers',
        duration: '14:00',
        description: 'Experience how a screen reader navigates a semantic webpage vs a non-semantic div-soup layout.',
        keyPoints: [
          'Landmark navigation shortcuts',
          'Heading hierarchy (h1 through h6)',
          'Figure and figcaption usage',
          'Screen reader live demo'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Why Semantics', description: 'SEO and A11y benefits' },
          { time: '05:00', seconds: 300, title: 'The 7 Landmark Tags', description: 'header, main, nav, etc.' },
          { time: '10:00', seconds: 600, title: 'Screen Reader Demo', description: 'Hearing the page' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Writing semantic HTML is the foundation of professional accessibility.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-02-02',
        title: 'Build a Semantic Blog Card with Figure',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Build a blog post preview using an <article class="blog-card"> containing a <header> with an <h2> title, a <p> snippet, and a <footer class="card-footer"> containing an author <span class="author">.',
        instructions: [
          'Create an <article class="blog-card"> container',
          'Inside, add a <header> with an <h2> post title',
          'Add a <p> summary paragraph',
          'Add a <footer class="card-footer"> containing <span class="author">'
        ],
        starterHtml: `<!-- Build semantic blog card here -->
<article class="blog-card">
  
</article>`,
        starterCss: `.blog-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.card-footer {
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f1f5f9;
  font-size: 0.85rem;
  color: #64748b;
}`,
        starterJs: `console.log("Semantic blog card active.");`,
        solutionHtml: `<article class="blog-card">
  <header>
    <h2>Understanding Semantic HTML5</h2>
  </header>
  <p>Learn how to structure modern web applications with accessibility and clean code in mind.</p>
  <footer class="card-footer">
    <span class="author">By Sarah Chen &bull; 5 min read</span>
  </footer>
</article>`,
        solutionCss: `.blog-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.blog-card h2 {
  margin: 0 0 0.5rem 0;
  color: #0f172a;
}
.card-footer {
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f1f5f9;
  font-size: 0.85rem;
  color: #64748b;
}`,
        solutionJs: `console.log("Semantic blog card active.");`,
        hints: [
          'Use <article class="blog-card"><header><h2>...</h2></header><p>...</p><footer class="card-footer">...</footer></article>',
          'Notice how header, p, and footer create logical semantic sections.'
        ],
        testCases: [
          {
            id: 'tc-02-2a',
            description: 'Contains header inside article',
            hint: 'Add a <header> tag inside the article',
            checkType: 'selector-exists',
            target: 'article.blog-card header h2'
          },
          {
            id: 'tc-02-2b',
            description: 'Contains card-footer with author',
            hint: 'Add a footer with class card-footer',
            checkType: 'selector-exists',
            target: 'article.blog-card footer.card-footer'
          }
        ],
        conceptQuestion: {
          question: 'How many <main> landmark elements should appear on a single HTML document?',
          options: ['Exactly one', 'As many as needed', 'Zero', 'At least five'],
          correctIndex: 0,
          explanation: 'HTML specifications dictate that there should be only one visible <main> element per document to mark the primary content.'
        }
      },
      quiz: [
        {
          id: 'q-02-2',
          question: 'Which tag should be used for secondary sidebar content like related links or author bios?',
          options: ['<aside>', '<section>', '<header>', '<nav>'],
          correctIndex: 0,
          explanation: '<aside> represents a portion of a document whose content is only indirectly related to the main content.'
        }
      ],
      summary: [
        'Semantic tags give structure and context to web content.',
        '<header>, <nav>, <main>, <article>, <aside>, and <footer> are primary landmark elements.',
        'Proper heading hierarchy (h1 through h6) ensures accessible navigation.',
        'Always provide descriptive alt attributes for meaningful images.'
      ],
      relatedTopics: [
        {
          title: 'HTML Forms & Inputs',
          chapterNumber: '02',
          lessonId: 'ch-02-l-03',
          context: 'Build interactive, accessible forms for capturing user data.'
        }
      ]
    },
    {
      id: 'ch-02-l-03',
      chapterId: 'ch-02',
      number: '2.3',
      slug: 'forms-and-input',
      title: 'Forms, Inputs & Validation',
      tagline: 'Design accessible, user-friendly forms with inputs, textareas, selects, and validation attributes',
      durationMinutes: 25,
      learningObjectives: [
        'Understand <form> action and method (GET vs POST) attributes',
        'Master the essential connection between <label for="x"> and <input id="x">',
        'Learn essential input types: text, email, password, number, date, checkbox, radio',
        'Use native HTML5 validation attributes: required, minlength, maxlength, pattern, and type="email"'
      ],
      theorySections: [
        {
          heading: '1. The Form Architecture',
          content: 'Forms are the interactive bridge between users and your application backend. When a user submits a form, the browser packages input names and values into an HTTP request.',
          bulletPoints: [
            '<form>: Wraps all input fields and specifies submission destination (action) and method (GET or POST)',
            '<label>: Text that describes what to enter. Clicking a label focuses the corresponding input',
            '<input>: The versatile control whose appearance changes based on the type attribute',
            '<button type="submit">: Triggers the form submission process'
          ],
          callout: {
            type: 'key-rule',
            text: 'Accessibility Rule: NEVER omit labels! Placeholder text is NOT a replacement for a visible, programmatic <label for="...">.'
          }
        },
        {
          heading: '2. Native HTML5 Form Validation',
          content: 'Modern browsers provide built-in validation before a form can be submitted, preventing invalid submissions without requiring JavaScript.',
          bulletPoints: [
            'required: Prevents form submission if the field is empty',
            'type="email": Validates that the input contains a valid email structure (name@domain.com)',
            'minlength / maxlength: Enforces character count constraints',
            'min / max: Sets numerical or date limits'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Official Paperwork and the Inspector',
        concept: 'Form Validation and Labels',
        story: 'When you renew your passport, each box has an explicit printed label: "First Name", "Date of Birth", and "Passport Number". If you leave your signature box blank, the passport inspector hands it back to you immediately and points to the missing field before sending it to the national registry.',
        moral: 'Clear labels guide the user, and instant client-side validation prevents frustrating round-trips.',
        icon: 'CheckSquare'
      },
      visualType: 'semantic-html',
      codeExample: {
        title: 'Accessible User Registration Form',
        description: 'Complete form with linked labels, proper input types, and validation rules.',
        html: `<form class="signup-form" action="/api/register" method="POST">
  <div class="form-group">
    <label for="userName">Full Name *</label>
    <input type="text" id="userName" name="name" required minlength="2" placeholder="e.g. Jane Doe" />
  </div>

  <div class="form-group">
    <label for="userEmail">Email Address *</label>
    <input type="email" id="userEmail" name="email" required placeholder="jane@example.com" />
  </div>

  <button type="submit" class="submit-btn">Create Account</button>
</form>`,
        css: `.signup-form {
  max-width: 380px;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.form-group {
  margin-bottom: 1.25rem;
}
.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: #1e293b;
}
.form-group input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
}
.submit-btn {
  width: 100%;
  padding: 0.65rem;
  background: #059669;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`,
        breakdown: [
          {
            lineRange: 'Line 3-4',
            title: 'Label and Input Association',
            explanation: 'The label for="userName" matches the input id="userName", connecting them for assistive technologies.',
            highlightTokens: ['for="userName"', 'id="userName"']
          },
          {
            lineRange: 'Line 8-9',
            title: 'Native Validation Attributes',
            explanation: 'type="email" and required trigger browser validation before submission.',
            highlightTokens: ['type="email"', 'required']
          }
        ]
      },
      video: {
        title: 'Building Accessible and Validated HTML5 Forms',
        duration: '16:15',
        description: 'Step-by-step tutorial covering labels, inputs, selects, radio button groups, and validation states.',
        keyPoints: [
          'Radio buttons vs checkboxes',
          'Connecting labels and inputs with id/for',
          'Styling :focus and :invalid states',
          'Preventing form submission errors'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Form Basics', description: 'Structure and method' },
          { time: '05:30', seconds: 330, title: 'Input Types', description: 'Text, email, number' },
          { time: '11:00', seconds: 660, title: 'Validation Rules', description: 'Required and pattern' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Forms are where users take action on your website.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-02-03',
        title: 'Build a Contact Inquiry Form',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Build a contact form (<form class="contact-form">) with two fields: a text input for Name (with <label for="contactName">) and a <textarea id="contactMessage"> for Message with <label for="contactMessage">, plus a submit button.',
        instructions: [
          'Create a <form class="contact-form">',
          'Add a <label for="contactName"> and <input type="text" id="contactName" required>',
          'Add a <label for="contactMessage"> and <textarea id="contactMessage" required></textarea>',
          'Add a <button type="submit">Send Message</button>'
        ],
        starterHtml: `<!-- Build your contact form here -->
<form class="contact-form">
  
</form>`,
        starterCss: `.contact-form {
  max-width: 400px;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.contact-form label {
  display: block;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
  font-size: 0.875rem;
}
.contact-form input, .contact-form textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  box-sizing: border-box;
}
.contact-form button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`,
        starterJs: `console.log("Contact form ready.");`,
        solutionHtml: `<form class="contact-form">
  <label for="contactName">Your Name</label>
  <input type="text" id="contactName" required placeholder="Enter your name" />

  <label for="contactMessage">Your Message</label>
  <textarea id="contactMessage" required placeholder="How can we help?"></textarea>

  <button type="submit">Send Message</button>
</form>`,
        solutionCss: `.contact-form {
  max-width: 400px;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.contact-form label {
  display: block;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
  font-size: 0.875rem;
}
.contact-form input, .contact-form textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  box-sizing: border-box;
}
.contact-form button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`,
        solutionJs: `console.log("Contact form ready.");`,
        hints: [
          'Match the label for attribute with the input id attribute: <label for="contactName"> and <input id="contactName">.',
          'Include the required attribute on both inputs.'
        ],
        testCases: [
          {
            id: 'tc-02-3a',
            description: 'Label linked to input by id',
            hint: 'Ensure label for="contactName" matches input id="contactName"',
            checkType: 'selector-exists',
            target: 'form.contact-form input#contactName'
          },
          {
            id: 'tc-02-3b',
            description: 'Textarea exists with id contactMessage',
            hint: 'Add textarea#contactMessage with label',
            checkType: 'selector-exists',
            target: 'form.contact-form textarea#contactMessage'
          }
        ],
        conceptQuestion: {
          question: 'How do you programmatically connect a <label> to an <input>?',
          options: [
            'Set label "for" attribute equal to input "id" attribute',
            'Put them on the same line of code',
            'Give them the same class name',
            'Use the name attribute on the label'
          ],
          correctIndex: 0,
          explanation: 'The for attribute on a <label> must exactly match the id attribute on the target input element.'
        }
      },
      quiz: [
        {
          id: 'q-02-3',
          question: 'Which HTTP method is most appropriate for a login or credit card checkout form?',
          options: ['POST', 'GET', 'TRACE', 'CONNECT'],
          correctIndex: 0,
          explanation: 'POST sends data inside the HTTP request body rather than appending sensitive parameters into the visible URL query string.'
        }
      ],
      summary: [
        'Forms capture user data and send it via HTTP GET or POST methods.',
        'Always connect <label for="id"> with <input id="id"> for accessibility.',
        'Use HTML5 validation attributes (required, minlength, type="email") for instant feedback.',
        'Different input types provide optimized keyboards on mobile devices.'
      ],
      relatedTopics: [
        {
          title: 'Multi-Page Website Structure',
          chapterNumber: '02',
          lessonId: 'ch-02-l-04',
          context: 'Link multiple HTML files into a cohesive multi-page website.'
        }
      ]
    },
    {
      id: 'ch-02-l-04',
      chapterId: 'ch-02',
      number: '2.4',
      slug: 'multi-page-structure',
      title: 'Multi-Page Website Structure',
      tagline: 'Connect pages with hyperlinks, target attributes, anchor jumps, and consistent headers and footers',
      durationMinutes: 20,
      learningObjectives: [
        'Organize multiple interconnected HTML documents in a clean folder tree',
        'Master the anchor tag <a> and its attributes: href, target="_blank", and rel="noopener noreferrer"',
        'Create in-page bookmark jump links using hash anchors (#section-id)',
        'Maintain consistent layout structures (headers, navbars, footers) across multiple pages'
      ],
      theorySections: [
        {
          heading: '1. The Hyperlink Engine',
          content: 'Hyperlinks are the defining innovation of the World Wide Web. The anchor element <a> transforms any text, button, or image into a portal to another document.',
          bulletPoints: [
            'Internal Links: href="about.html" or href="../contact.html" to navigate your own site',
            'External Links: href="https://google.com" to open outside websites',
            'In-Page Anchors: href="#pricing" jumps immediately to the element with id="pricing"',
            'Telephone and Email: href="tel:+1234567890" and href="mailto:info@example.com"'
          ]
        },
        {
          heading: '2. Security Best Practices for External Links',
          content: 'When opening links in a new tab with target="_blank", modern security standards require rel="noopener noreferrer".',
          bulletPoints: [
            'target="_blank": Tells the browser to open the destination URL in a fresh browser tab',
            'rel="noopener": Prevents the newly opened page from accessing window.opener, mitigating phishing exploits (tabnabbing)',
            'rel="noreferrer": Prevents passing your referrer address to external analytics'
          ],
          callout: {
            type: 'key-rule',
            text: 'Security Rule: Always pair target="_blank" with rel="noopener noreferrer" whenever linking to external domains.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Multi-Room Museum and the Map Directory',
        concept: 'Multi-Page Web Navigation',
        story: 'A museum is not just one infinite hallway. It has the Grand Foyer (index.html), the Ancient Egypt Wing (egypt.html), and the Modern Art Hall (modern-art.html). At every doorway, there is an illuminated directional sign (the navigation menu) allowing visitors to navigate between wings without getting lost.',
        moral: 'Every page on your website should give users clear pathways to navigate to any other room in the house.',
        icon: 'Compass'
      },
      visualType: 'semantic-html',
      codeExample: {
        title: 'Multi-Page Shared Navigation Structure',
        description: 'Demonstrating internal links, external links, and in-page anchor jumps.',
        html: `<header class="site-header">
  <div class="logo"><strong>WebZone</strong></div>
  <nav class="main-nav">
    <a href="./index.html" class="active">Home</a>
    <a href="./about.html">About</a>
    <a href="#testimonials">Reviews</a>
    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub &nearr;</a>
  </nav>
</header>`,
        css: `.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.main-nav {
  display: flex;
  gap: 1.25rem;
}
.main-nav a {
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  font-size: 0.9rem;
}
.main-nav a.active {
  color: #2563eb;
  font-weight: 700;
}`,
        breakdown: [
          {
            lineRange: 'Line 4-7',
            title: 'Diverse Link Types',
            explanation: 'Combines local relative links, in-page hash anchors, and secure external tab targets.',
            highlightTokens: ['href="./index.html"', 'href="#testimonials"', 'target="_blank"']
          }
        ]
      },
      video: {
        title: 'Architecting Multi-Page Websites with Clean Navigation',
        duration: '11:50',
        description: 'How to structure multiple HTML pages, maintain navigation states, and implement smooth-scrolling in-page jumps.',
        keyPoints: [
          'Setting up index.html, about.html, contact.html',
          'Highlighting the active menu link',
          'In-page scroll jumps with CSS smooth-scroll'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Multi-Page Setup', description: 'Folder layout' },
          { time: '04:10', seconds: 250, title: 'Relative Link Paths', description: 'Connecting pages' },
          { time: '08:20', seconds: 500, title: 'Anchor Jumps', description: 'Using hash targets' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Hyperlinks are what make the web a web rather than isolated documents.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-02-04',
        title: 'Build an In-Page Table of Contents',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Create an in-page table of contents (<nav class="toc">) with two links jumping to sections: href="#section-1" (label: "Section 1") and href="#section-2" (label: "Section 2"), and create the corresponding <section id="section-1"> and <section id="section-2"> elements.',
        instructions: [
          'Create a <nav class="toc"> with two <a> tags pointing to #section-1 and #section-2',
          'Create <section id="section-1"> containing an <h2> for Section 1',
          'Create <section id="section-2"> containing an <h2> for Section 2'
        ],
        starterHtml: `<!-- Build TOC and sections here -->
<nav class="toc">
  
</nav>`,
        starterCss: `.toc {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}
.toc a {
  margin-right: 1rem;
  color: #2563eb;
  font-weight: 600;
}
section {
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}`,
        starterJs: `console.log("TOC active.");`,
        solutionHtml: `<nav class="toc">
  <a href="#section-1">Section 1</a>
  <a href="#section-2">Section 2</a>
</nav>

<section id="section-1">
  <h2>Section 1: Getting Started</h2>
  <p>Overview of foundational concepts and tools.</p>
</section>

<section id="section-2">
  <h2>Section 2: Deep Dive</h2>
  <p>Advanced implementation details and best practices.</p>
</section>`,
        solutionCss: `.toc {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}
.toc a {
  margin-right: 1rem;
  color: #2563eb;
  font-weight: 600;
}
section {
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}`,
        solutionJs: `console.log("TOC active.");`,
        hints: [
          'The href="#section-1" must match the section id="section-1".',
          'Create two sections with ids section-1 and section-2.'
        ],
        testCases: [
          {
            id: 'tc-02-4a',
            description: 'TOC contains anchor to #section-1',
            hint: 'Add an <a> tag with href="#section-1"',
            checkType: 'selector-exists',
            target: 'nav.toc a[href="#section-1"]'
          },
          {
            id: 'tc-02-4b',
            description: 'Section with id section-1 exists',
            hint: 'Add <section id="section-1">',
            checkType: 'selector-exists',
            target: 'section#section-1'
          }
        ],
        conceptQuestion: {
          question: 'What security risk is addressed by adding rel="noopener noreferrer" to external links?',
          options: [
            'Tabnabbing and reverse-tab hijacking where external pages manipulate the opening tab',
            'SQL injection in database queries',
            'CSS stylesheet corruption',
            'Computer virus downloads'
          ],
          correctIndex: 0,
          explanation: 'rel="noopener" prevents the newly opened window from accessing window.opener on your page, protecting users from reverse-tab hijacking.'
        }
      },
      quiz: [
        {
          id: 'q-02-4',
          question: 'How do you create a link that immediately triggers an email client?',
          options: [
            'href="mailto:help@example.com"',
            'href="email:help@example.com"',
            'href="send:help@example.com"',
            'href="message:help@example.com"'
          ],
          correctIndex: 0,
          explanation: 'The mailto: protocol scheme instructs the operating system to open the default email client with the specified address.'
        }
      ],
      summary: [
        'The <a> tag creates internal, external, and in-page anchor links.',
        'Use target="_blank" with rel="noopener noreferrer" for secure external links.',
        'In-page anchors (href="#id") jump smoothly to matching element IDs.',
        'Consistent navigation menus tie multiple HTML pages into an intuitive website.'
      ],
      relatedTopics: [
        {
          title: 'Advanced HTML Features',
          chapterNumber: '02',
          lessonId: 'ch-02-l-05',
          context: 'Explore modern HTML5 dialogs, audio/video embeds, canvas, and SEO metadata.'
        }
      ]
    },
    {
      id: 'ch-02-l-05',
      chapterId: 'ch-02',
      number: '2.5',
      slug: 'advanced-html-features',
      title: 'Advanced HTML Features & Accessibility',
      tagline: 'Master <dialog> modals, native <details>/<summary> accordions, SEO OpenGraph meta, and ARIA',
      durationMinutes: 25,
      learningObjectives: [
        'Use the modern native HTML5 <dialog> modal element and its showModal() API',
        'Build zero-JavaScript interactive accordions with <details> and <summary>',
        'Embed audio and video with <audio> and <video> with subtitles via <track>',
        'Implement OpenGraph and Twitter card meta tags for rich social sharing cards',
        'Apply essential WAI-ARIA roles, aria-labels, and live regions for accessibility'
      ],
      theorySections: [
        {
          heading: '1. Modern Native HTML5 Components',
          content: 'Modern HTML5 eliminates the need for heavyweight JavaScript libraries for common UI patterns like modals and accordions.',
          bulletPoints: [
            '<dialog>: Native modal dialog with built-in backdrop styling, Esc key closure, and focus trapping',
            '<details> & <summary>: Native collapsible accordion that works without a single line of JavaScript',
            '<picture> & <source>: Responsive image switching based on viewport width or media formats (AVIF/WebP)',
            '<template>: Client-side template container whose contents are not rendered until cloned by JavaScript'
          ]
        },
        {
          heading: '2. SEO Meta Tags and OpenGraph',
          content: 'When users share your links on social platforms (WhatsApp, Slack, X/Twitter, LinkedIn), scrapers parse specific <meta> tags in your <head> to render rich card previews.',
          bulletPoints: [
            'meta name="description": The search snippet displayed under your title in Google search results',
            'meta property="og:title" and "og:description": OpenGraph title and summary cards',
            'meta property="og:image": The preview graphic displayed when shared',
            'meta property="og:url": The canonical URL of the resource'
          ],
          callout: {
            type: 'tip',
            text: 'Adding complete OpenGraph meta tags increases social click-through rates by over 40% compared to plain links.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Swiss Army Knife of Modern Standards',
        concept: 'Built-in Native Features vs Third-Party Clutter',
        story: 'Decades ago, carrying a screwdriver, knife, corkscrew, and scissors required a heavy leather bag full of separate tools. A Swiss Army knife packs precision tools into one elegant handle. Modern HTML5 features (<dialog>, <details>, <video>) give you sleek native tools that load instantaneously without 500KB of external npm libraries.',
        moral: 'Always check if HTML has a native element before downloading a heavy JavaScript library.',
        icon: 'Sparkles'
      },
      visualType: 'semantic-html',
      codeExample: {
        title: 'Native Accordion and Dialog Components',
        description: 'Zero-JS accordion using <details> alongside a native <dialog> element.',
        html: `<div class="component-demo">
  <!-- Native Zero-JS Accordion -->
  <details class="faq-item">
    <summary>What is included in the WebZone curriculum?</summary>
    <p>Complete step-by-step guidance from web basics to full-stack capstone deployment.</p>
  </details>

  <!-- Native HTML5 Dialog -->
  <button id="openDialogBtn" class="action-btn">Open Dialog</button>
  <dialog id="promoDialog" class="modal-box">
    <h3>Welcome to Chapter 02!</h3>
    <p>You are mastering modern semantic HTML5 and accessibility.</p>
    <button id="closeDialogBtn" class="close-btn">Close</button>
  </dialog>
</div>`,
        css: `.component-demo {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.faq-item {
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem;
}
.faq-item summary {
  font-weight: 600;
  cursor: pointer;
  color: #0f172a;
}
.faq-item p {
  margin: 0.5rem 0 0 0;
  color: #475569;
}
.action-btn {
  background: #059669;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.modal-box {
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  padding: 1.5rem;
}
.modal-box::backdrop {
  background: rgba(0, 0, 0, 0.5);
}`,
        js: `const dialog = document.getElementById('promoDialog');
document.getElementById('openDialogBtn')?.addEventListener('click', () => {
  dialog?.showModal();
});
document.getElementById('closeDialogBtn')?.addEventListener('click', () => {
  dialog?.close();
});`,
        breakdown: [
          {
            lineRange: 'Line 3-6',
            title: '<details> and <summary>',
            explanation: 'Creates a fully interactive collapsible accordion natively supported by all browsers with zero JS.',
            highlightTokens: ['<details', '<summary']
          },
          {
            lineRange: 'Line 9-14',
            title: '<dialog> Element',
            explanation: 'Modern semantic dialog with native backdrop styling and keyboard accessibility.',
            highlightTokens: ['<dialog', 'showModal']
          }
        ]
      },
      video: {
        title: 'Modern HTML5 Features: Dialogs, Accordions, and SEO Meta',
        duration: '15:45',
        description: 'Deep dive into native dialogs, OpenGraph cards, media elements, and ARIA accessibility roles.',
        keyPoints: [
          'Using dialog.showModal() vs show()',
          'Details and summary styling',
          'OpenGraph and Twitter meta cards',
          'ARIA roles and aria-label attributes'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Native Components', description: 'dialog and details' },
          { time: '05:40', seconds: 340, title: 'SEO & Social Cards', description: 'OpenGraph meta tags' },
          { time: '11:00', seconds: 660, title: 'ARIA & Accessibility', description: 'Screen reader cues' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Modern HTML does things that used to require entire JavaScript frameworks.' }
        ],
        demoAnimationType: 'dom-build'
      },
      practice: {
        id: 'prac-02-05',
        title: 'Build an Interactive FAQ Accordion List',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Build an FAQ list (<div class="faq-list">) containing two <details class="faq-item"> accordions. Inside each, include a <summary> question and a <p> answer.',
        instructions: [
          'Create a <div class="faq-list"> container',
          'Add a <details class="faq-item"> with a <summary> question and a <p> answer',
          'Add a second <details class="faq-item"> with another question and answer'
        ],
        starterHtml: `<!-- Build your FAQ list below -->
<div class="faq-list">
  
</div>`,
        starterCss: `.faq-list {
  max-width: 450px;
}
.faq-item {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
}
.faq-item summary {
  font-weight: 600;
  cursor: pointer;
  color: #1e293b;
}
.faq-item p {
  margin-top: 0.5rem;
  color: #475569;
  font-size: 0.9rem;
}`,
        starterJs: `console.log("FAQ component ready.");`,
        solutionHtml: `<div class="faq-list">
  <details class="faq-item">
    <summary>Do I need prior coding experience?</summary>
    <p>No, this curriculum is designed from absolute fundamentals up to advanced architecture.</p>
  </details>
  <details class="faq-item">
    <summary>Are the projects portfolio-ready?</summary>
    <p>Yes, each chapter culminates in real projects you can deploy and showcase on your GitHub.</p>
  </details>
</div>`,
        solutionCss: `.faq-list {
  max-width: 450px;
}
.faq-item {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
}
.faq-item summary {
  font-weight: 600;
  cursor: pointer;
  color: #1e293b;
}
.faq-item p {
  margin-top: 0.5rem;
  color: #475569;
  font-size: 0.9rem;
}`,
        solutionJs: `console.log("FAQ component ready.");`,
        hints: [
          'Use <details><summary>Your question</summary><p>Your answer</p></details>.',
          'Create at least two <details> elements.'
        ],
        testCases: [
          {
            id: 'tc-02-5a',
            description: 'Contains at least two details elements',
            hint: 'Add two <details class="faq-item"> elements',
            checkType: 'selector-exists',
            target: '.faq-list details'
          },
          {
            id: 'tc-02-5b',
            description: 'Details contains summary tag',
            hint: 'Include a <summary> inside each details tag',
            checkType: 'selector-exists',
            target: '.faq-list details summary'
          }
        ],
        conceptQuestion: {
          question: 'Which method should be called on a <dialog> element to open it as a true modal with an accessible backdrop?',
          options: ['dialog.showModal()', 'dialog.open()', 'dialog.show()', 'dialog.display()'],
          correctIndex: 0,
          explanation: 'showModal() opens the dialog as an accessible top-layer modal and renders the ::backdrop pseudo-element.'
        }
      },
      quiz: [
        {
          id: 'q-02-5',
          question: 'Which meta tag specifies the preview image used by Twitter and LinkedIn when your website URL is shared?',
          options: [
            '<meta property="og:image" content="...">',
            '<meta name="photo" content="...">',
            '<meta type="preview" content="...">',
            '<link rel="thumbnail" href="...">'
          ],
          correctIndex: 0,
          explanation: 'og:image is the OpenGraph protocol standard for defining social share preview card graphics.'
        }
      ],
      summary: [
        '<dialog> provides a native, accessible modal dialog with backdrop support.',
        '<details> and <summary> create native collapsible accordions with zero JavaScript.',
        'OpenGraph meta tags (og:title, og:image) drive rich social media share previews.',
        'WAI-ARIA roles and attributes supplement native HTML semantics for screen readers.'
      ],
      relatedTopics: [
        {
          title: 'CSS Box Model & Styling',
          chapterNumber: '03',
          lessonId: 'ch-03-l-01',
          context: 'Transition to styling your HTML structures with CSS.'
        }
      ]
    }
  ]
};
