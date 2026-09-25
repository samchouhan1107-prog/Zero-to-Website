import { Chapter } from '../../utils/types';

export const chapter04: Chapter = {
  id: 'ch-04',
  number: '04',
  badge: '04',
  slug: 'flexbox',
  title: 'CSS Flexbox Layout Engine',
  subtitle: '1-Dimensional layout power: align, distribute, and center effortlessly',
  description: 'Master CSS Flexible Box Layout. Learn main axis vs cross axis, flex-direction, justify-content, align-items, flex-wrap, flex-grow/shrink/basis, and build real-world responsive navigation bars and card layouts.',
  estimatedHours: '3 hrs',
  accentColor: 'violet',
  iconName: 'Layout',
  totalLessons: 7,
  lessons: [
    {
      id: 'ch-04-l-01',
      chapterId: 'ch-04',
      number: '4.1',
      slug: 'introduction-to-flexbox',
      title: 'Introduction to Flexbox',
      tagline: 'Understand the one-dimensional layout model, axes, and why Flexbox replaced floats',
      durationMinutes: 20,
      learningObjectives: [
        'Understand why Flexbox was created to solve float and table layout limitations',
        'Distinguish between the Flex Container (parent) and Flex Items (direct children)',
        'Master the Main Axis vs Cross Axis concept',
        'Learn how display: flex triggers flex formatting context'
      ],
      theorySections: [
        {
          heading: '1. Why Flexbox Changed CSS Forever',
          content: 'Before Flexbox, centering an element vertically or creating a simple equal-height column layout required brittle hacks using float, clearfix, display: table, or negative margins. CSS Flexible Box Layout (Flexbox) introduced a predictable, one-dimensional layout engine.',
          bulletPoints: [
            'One-Dimensional Layout: Flexbox arranges elements along a single dimension at a time â€” either as a row or as a column',
            'Dynamic Distribution: Children automatically grow to fill empty space or shrink to prevent overflow',
            'Effortless Centering: Vertical and horizontal centering becomes a simple 2-property combination'
          ]
        },
        {
          heading: '2. The Two Axes: Main Axis and Cross Axis',
          content: 'Everything in Flexbox is calculated along two intersecting axes.',
          bulletPoints: [
            'Main Axis: Defined by flex-direction (defaults to row: left-to-right)',
            'Cross Axis: Always perpendicular (90 degrees) to the main axis (defaults to top-to-bottom)',
            'justify-content: Distributes items along the MAIN axis',
            'align-items: Aligns items along the CROSS axis'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden Axis Rule: If flex-direction is row, the main axis is horizontal and cross axis is vertical. If flex-direction is column, the main axis becomes vertical and cross axis becomes horizontal!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Conveyor Belt and the Sorter',
        concept: 'Flex Direction and Axis Flow',
        story: 'Imagine a factory conveyor belt. The direction the belt rolls is your Main Axis. Items placed on the belt move forward along this main direction. The rails on the left and right preventing items from sliding off represent your Cross Axis. You can speed up spacing between items along the belt (justify-content) or slide items left or right between the guardrails (align-items).',
        moral: 'Direction dictates the axis, and the axis dictates which alignment property you call.',
        icon: 'Layout'
      },
      visualType: 'flexbox',
      codeExample: {
        title: 'Activating a Flex Container',
        description: 'Notice how setting display: flex immediately arranges block children into an aligned horizontal row.',
        html: `<div class="flex-container">
  <div class="box">Item 1</div>
  <div class="box">Item 2</div>
  <div class="box">Item 3</div>
</div>`,
        css: `.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f1f5f9;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.box {
  background: #3b82f6;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  font-weight: 700;
}`,
        breakdown: [
          {
            lineRange: 'Line 2',
            title: 'display: flex',
            explanation: 'Converts the container into a flex parent, placing all direct children on the main horizontal row axis.',
            highlightTokens: ['display: flex']
          },
          {
            lineRange: 'Line 3-4',
            title: 'justify-content & align-items',
            explanation: 'space-between spreads items across the width; align-items: center keeps them vertically aligned.',
            highlightTokens: ['justify-content: space-between', 'align-items: center']
          }
        ]
      },
      video: {
        title: 'Introduction to Flexbox and the 2 Axes',
        duration: '14:15',
        description: 'Visual walkthrough of activating flex containers, row vs column orientation, and main vs cross axes.',
        keyPoints: [
          'History: Floats vs Flexbox',
          'The 2-tier parent/child relationship',
          'Main axis vs cross axis visual animation'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Why Flexbox', description: 'Evolution of CSS layout' },
          { time: '04:30', seconds: 270, title: 'Container vs Items', description: 'Parent-child rules' },
          { time: '09:00', seconds: 540, title: 'The Two Axes', description: 'Row vs column flow' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Flexbox is the most widely used layout tool in modern front-end web development.' }
        ],
        demoAnimationType: 'flex-align'
      },
      practice: {
        id: 'prac-04-01',
        title: 'Activate Your First Flex Container',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Convert the .nav-bar container into a flex container using display: flex, and give it gap: 1rem so its children sit side by side with clean spacing.',
        instructions: [
          'Add display: flex to .nav-bar',
          'Add gap: 1rem to separate the navigation items',
          'Observe how the items shift from a vertical block stack into a horizontal row'
        ],
        starterHtml: `<div class="nav-bar">
  <div class="nav-item">Dashboard</div>
  <div class="nav-item">Lessons</div>
  <div class="nav-item">Sandbox</div>
</div>`,
        starterCss: `.nav-bar {
  /* Add display: flex and gap here */
  background: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}
.nav-item {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
  color: #334155;
}`,
        starterJs: `console.log("Flex container loaded.");`,
        solutionHtml: `<div class="nav-bar">
  <div class="nav-item">Dashboard</div>
  <div class="nav-item">Lessons</div>
  <div class="nav-item">Sandbox</div>
</div>`,
        solutionCss: `.nav-bar {
  display: flex;
  gap: 1rem;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}
.nav-item {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
  color: #334155;
}`,
        solutionJs: `console.log("Flex container loaded.");`,
        hints: [
          'Set display: flex; on .nav-bar.',
          'Set gap: 1rem; on .nav-bar.'
        ],
        testCases: [
          {
            id: 'tc-04-1a',
            description: 'nav-bar has display: flex',
            hint: 'Set display: flex on .nav-bar',
            checkType: 'style-computed',
            target: '.nav-bar',
            expectedValue: 'flex'
          }
        ],
        conceptQuestion: {
          question: 'What happens to direct child block elements the instant you set display: flex on their parent container?',
          options: [
            'They switch from stacking vertically to lining up horizontally in a row',
            'They are deleted from the DOM',
            'They convert to table cells',
            'They become fixed to the top of the browser'
          ],
          correctIndex: 0,
          explanation: 'By default, flex-direction is row, meaning all direct children immediately arrange themselves side-by-side along the horizontal main axis.'
        }
      },
      quiz: [
        {
          id: 'q-04-1',
          question: 'What is the default flex-direction of a flex container?',
          options: ['row', 'column', 'row-reverse', 'wrap'],
          correctIndex: 0,
          explanation: 'row is the default flex-direction, aligning children from left to right along the horizontal axis.'
        }
      ],
      summary: [
        'Flexbox is a one-dimensional layout system that arranges items along an axis.',
        'display: flex creates a flex container for its direct children.',
        'The main axis is determined by flex-direction (row vs column).',
        'gap provides clean, modern spacing between items without negative margin hacks.'
      ],
      relatedTopics: [
        {
          title: 'The Flex Container',
          chapterNumber: '04',
          lessonId: 'ch-04-l-02',
          context: 'Deep-dive into flex-direction, flex-wrap, and container-level alignment properties.'
        }
      ]
    },
    {
      id: 'ch-04-l-02',
      chapterId: 'ch-04',
      number: '4.2',
      slug: 'flex-container',
      title: 'The Flex Container',
      tagline: 'Control flow direction, row vs column flips, and container-level properties',
      durationMinutes: 25,
      learningObjectives: [
        'Master flex-direction: row, row-reverse, column, column-reverse',
        'Understand how flipping flex-direction inverts the roles of justify-content and align-items',
        'Use the gap property (row-gap and column-gap) for clean gutter control',
        'Learn how to build responsive column-to-row layout transformations'
      ],
      theorySections: [
        {
          heading: '1. The 4 Flex Directions',
          content: 'The flex-direction property establishes the orientation of the main axis.',
          bulletPoints: [
            'row (default): Items flow left-to-right horizontally',
            'row-reverse: Items flow right-to-left horizontally in reverse visual order',
            'column: Items flow top-to-bottom vertically (stacked like blocks)',
            'column-reverse: Items flow bottom-to-top vertically'
          ]
        },
        {
          heading: '2. The Axis Inversion Effect',
          content: 'This is the most common pitfall for beginner developers: when you change flex-direction from row to column, justify-content and align-items swap their spatial responsibilities!',
          bulletPoints: [
            'In row mode: justify-content controls HORIZONTAL distribution, align-items controls VERTICAL alignment',
            'In column mode: justify-content controls VERTICAL distribution, align-items controls HORIZONTAL alignment'
          ],
          callout: {
            type: 'key-rule',
            text: 'Mnemonic: justify-content ALWAYS controls the Main Axis. align-items ALWAYS controls the Cross Axis.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'Rotating a Picture Frame 90 Degrees',
        concept: 'Axis Inversion',
        story: 'If you hold a landscape picture frame horizontally, its long side is horizontal. If you rotate the frame 90 degrees into portrait orientation, the exact same long side is now vertical. When you switch flex-direction from row to column, you are rotating the entire coordinate system 90 degrees.',
        moral: 'Remember that justify-content follows the orientation of the frame.',
        icon: 'Layout'
      },
      visualType: 'flexbox',
      codeExample: {
        title: 'Flipping Row to Column',
        description: 'Demonstrating how changing flex-direction: column stacks elements vertically with consistent gaps.',
        html: `<div class="sidebar-menu">
  <a href="#overview" class="menu-link active">Overview</a>
  <a href="#reports" class="menu-link">Reports</a>
  <a href="#settings" class="menu-link">Settings</a>
</div>`,
        css: `.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 200px;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.menu-link {
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  color: #475569;
  font-weight: 500;
}
.menu-link.active {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 700;
}`,
        breakdown: [
          {
            lineRange: 'Line 3',
            title: 'flex-direction: column',
            explanation: 'Rotates the main axis vertically, causing menu links to stack neatly with 0.5rem vertical gaps.',
            highlightTokens: ['flex-direction: column']
          }
        ]
      },
      video: {
        title: 'Mastering Flex Container Properties: Direction and Gaps',
        duration: '12:45',
        description: 'Deep dive into flex-direction, reverse flows, and building responsive sidebar navigation.',
        keyPoints: [
          'Row vs column rotation',
          'Reverse directions and accessibility',
          'Using gap instead of margins'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'flex-direction Values', description: 'All 4 options' },
          { time: '04:30', seconds: 270, title: 'The Axis Inversion', description: 'Swapping controls' },
          { time: '08:15', seconds: 495, title: 'Responsive Stacking', description: 'Media query flips' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Changing flex-direction is the secret to responsive mobile-to-desktop transitions.' }
        ],
        demoAnimationType: 'flex-align'
      },
      practice: {
        id: 'prac-04-02',
        title: 'Build a Vertical Flex Column Card Stack',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Configure a container (<div class="stack-list">) as a vertical column flex container using display: flex, flex-direction: column, and gap: 12px.',
        instructions: [
          'Set display: flex on .stack-list',
          'Set flex-direction: column on .stack-list',
          'Set gap: 12px between the stacked items'
        ],
        starterHtml: `<div class="stack-list">
  <div class="card">Card One</div>
  <div class="card">Card Two</div>
  <div class="card">Card Three</div>
</div>`,
        starterCss: `.stack-list {
  /* Add flex properties here */
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}
.card {
  padding: 1rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        starterJs: `console.log("Stack list loaded.");`,
        solutionHtml: `<div class="stack-list">
  <div class="card">Card One</div>
  <div class="card">Card Two</div>
  <div class="card">Card Three</div>
</div>`,
        solutionCss: `.stack-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}
.card {
  padding: 1rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}`,
        solutionJs: `console.log("Stack list loaded.");`,
        hints: [
          'Use display: flex; and flex-direction: column; on .stack-list.',
          'Add gap: 12px; for spacing.'
        ],
        testCases: [
          {
            id: 'tc-04-2a',
            description: 'stack-list has flex-direction: column',
            hint: 'Set flex-direction: column on .stack-list',
            checkType: 'style-computed',
            target: '.stack-list',
            expectedValue: 'column'
          }
        ],
        conceptQuestion: {
          question: 'When flex-direction is set to "column", which axis becomes the vertical axis?',
          options: ['The Main Axis', 'The Cross Axis', 'Both axes vanish', 'Neither axis'],
          correctIndex: 0,
          explanation: 'flex-direction specifies which direction becomes the Main Axis. Therefore, flex-direction: column turns the vertical direction into the Main Axis.'
        }
      },
      quiz: [
        {
          id: 'q-04-2',
          question: 'Which property sets the spacing between flex items without adding extra outer margins?',
          options: ['gap', 'margin-between', 'space-items', 'gutter'],
          correctIndex: 0,
          explanation: 'The gap property creates consistent gutters strictly between adjacent flex items.'
        }
      ],
      summary: [
        'flex-direction defines whether items flow as a row or column.',
        'When flex-direction is column, the main axis becomes vertical.',
        'gap replaces clumsy margin calculations for spacing child items.',
        'Flipping flex-direction on mobile media queries creates instant responsive layouts.'
      ],
      relatedTopics: [
        {
          title: 'Flex Items & Sizing',
          chapterNumber: '04',
          lessonId: 'ch-04-l-03',
          context: 'Control how individual child items grow, shrink, and prioritize space.'
        }
      ]
    },
    {
      id: 'ch-04-l-03',
      chapterId: 'ch-04',
      number: '4.3',
      slug: 'flex-items',
      title: 'Flex Items: Grow, Shrink & Basis',
      tagline: 'Master the holy trinity of item sizing: flex-grow, flex-shrink, flex-basis, and align-self',
      durationMinutes: 25,
      learningObjectives: [
        'Understand how flex-grow distributes remaining available positive space',
        'Learn how flex-shrink absorbs negative space when items overflow',
        'Master flex-basis as the initial starting size before growing or shrinking',
        'Use align-self to override the parent container align-items rule for a single item'
      ],
      theorySections: [
        {
          heading: '1. The flex Shorthand Property',
          content: 'Individual flex items can control their own growth and shrinkage within the parent container using the three-part flex shorthand: flex: [grow] [shrink] [basis].',
          bulletPoints: [
            'flex-grow: A unitless proportional weight. If one item has flex-grow: 2 and another has flex-grow: 1, the first gets double the remaining free space',
            'flex-shrink: Controls how aggressively an item shrinks when the container is too narrow to fit all items (default 1)',
            'flex-basis: The default ideal size of an element along the main axis before free space is distributed',
            'flex: 1 1 0% (or flex: 1): Common shorthand to make items expand and shrink equally'
          ]
        },
        {
          heading: '2. Overriding Alignment with align-self',
          content: 'While align-items applies cross-axis alignment to all children uniformly, any individual child can override this behavior using align-self.',
          bulletPoints: [
            'align-self: flex-start, flex-end, center, stretch, baseline',
            'Allows one specific button or avatar to sit at the bottom or center of an otherwise top-aligned row'
          ],
          callout: {
            type: 'tip',
            text: 'Pro Tip: Setting margin-left: auto on a flex child pushes that item (and all subsequent items) all the way to the far right edge of the container!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'Sponges in a Bucket of Water',
        concept: 'flex-grow and flex-shrink',
        story: 'If you place three dry sponges in a bucket, they start at their original dry size (flex-basis). When you pour in water (extra screen space), the sponges expand to soak up the water proportionally to their absorption capacity (flex-grow). If you step on the bucket, the sponges compress to fit into the tight space (flex-shrink).',
        moral: 'Flex items are intelligent, elastic materials that expand or compress based on available room.',
        icon: 'Box'
      },
      visualType: 'flexbox',
      codeExample: {
        title: 'Proportional Growth with flex: 1 and flex: 2',
        description: 'Notice how the main content area expands twice as much as the sidebar.',
        html: `<div class="dashboard-layout">
  <aside class="sidebar">Sidebar (flex: 1)</aside>
  <main class="main-content">Main Content (flex: 3)</main>
</div>`,
        css: `.dashboard-layout {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
}
.sidebar {
  flex: 1;
  background: #e2e8f0;
  padding: 1.5rem;
  border-radius: 6px;
  color: #334155;
  font-weight: 600;
}
.main-content {
  flex: 3;
  background: #2563eb;
  color: white;
  padding: 1.5rem;
  border-radius: 6px;
  font-weight: 600;
}`,
        breakdown: [
          {
            lineRange: 'Line 8',
            title: 'flex: 1 on Sidebar',
            explanation: 'Allocates 1 share of remaining space to the sidebar.',
            highlightTokens: ['flex: 1']
          },
          {
            lineRange: 'Line 16',
            title: 'flex: 3 on Main Content',
            explanation: 'Allocates 3 shares (75% of total width) to the main content area.',
            highlightTokens: ['flex: 3']
          }
        ]
      },
      video: {
        title: 'Deep Dive: flex-grow, flex-shrink, flex-basis, and align-self',
        duration: '15:20',
        description: 'Mathematical breakdown of positive and negative space distribution and align-self overrides.',
        keyPoints: [
          'Calculating flex-basis vs width',
          'How flex-grow proportions are calculated',
          'Using margin: auto in Flexbox'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'flex-basis', description: 'Initial size' },
          { time: '05:00', seconds: 300, title: 'flex-grow Math', description: 'Proportional sharing' },
          { time: '10:30', seconds: 630, title: 'align-self Overrides', description: 'Custom alignment' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'The flex shorthand is the secret to responsive column balance.' }
        ],
        demoAnimationType: 'flex-align'
      },
      practice: {
        id: 'prac-04-03',
        title: 'Create an Elastic Search Bar with Fixed Button',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Build a search bar container (<div class="search-box">) containing an <input type="text"> and a <button>. Give the input flex: 1 so it expands elastically to fill all available space, while the button retains its natural size.',
        instructions: [
          'Set display: flex and gap: 8px on .search-box',
          'Set flex: 1 on .search-box input',
          'Style the button with background: #2563eb and color: white'
        ],
        starterHtml: `<div class="search-box">
  <input type="text" placeholder="Search lessons, docs, tools..." />
  <button>Search</button>
</div>`,
        starterCss: `.search-box {
  /* Add display: flex and gap */
  max-width: 450px;
  background: white;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}
.search-box input {
  /* Make input elastic */
  border: none;
  padding: 0.5rem;
  outline: none;
}
.search-box button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`,
        starterJs: `console.log("Search box active.");`,
        solutionHtml: `<div class="search-box">
  <input type="text" placeholder="Search lessons, docs, tools..." />
  <button>Search</button>
</div>`,
        solutionCss: `.search-box {
  display: flex;
  gap: 8px;
  max-width: 450px;
  background: white;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}
.search-box input {
  flex: 1;
  border: none;
  padding: 0.5rem;
  outline: none;
}
.search-box button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`,
        solutionJs: `console.log("Search box active.");`,
        hints: [
          'Set display: flex; on .search-box.',
          'Set flex: 1; on .search-box input.'
        ],
        testCases: [
          {
            id: 'tc-04-3a',
            description: 'input has flex: 1 (flex-grow: 1)',
            hint: 'Set flex: 1 on .search-box input',
            checkType: 'style-computed',
            target: '.search-box input',
            expectedValue: '1'
          }
        ],
        conceptQuestion: {
          question: 'If you have two items inside a flex container and both have flex: 1, how will remaining horizontal space be divided?',
          options: [
            'Equally (50% to each item)',
            'The first item gets 100% and the second gets 0%',
            'The second item gets 75%',
            'Neither item will expand'
          ],
          correctIndex: 0,
          explanation: 'When flex-grow values are identical (1 and 1), extra space is distributed equally in a 1:1 ratio.'
        }
      },
      quiz: [
        {
          id: 'q-04-3',
          question: 'Which property allows an individual flex item to override the container align-items rule?',
          options: ['align-self', 'align-item', 'justify-self', 'flex-override'],
          correctIndex: 0,
          explanation: 'align-self is applied directly to a flex item to override the cross-axis alignment set by the parent container.'
        }
      ],
      summary: [
        'flex-grow distributes positive remaining space proportionally among items.',
        'flex-shrink determines how items compress when space is restricted.',
        'flex-basis sets the baseline size before expansion or contraction.',
        'align-self allows individual children to override cross-axis container alignment.'
      ],
      relatedTopics: [
        {
          title: 'Justify Content',
          chapterNumber: '04',
          lessonId: 'ch-04-l-04',
          context: 'Explore all 6 values of justify-content for main axis distribution.'
        }
      ]
    },
    {
      id: 'ch-04-l-04',
      chapterId: 'ch-04',
      number: '4.4',
      slug: 'justify-content',
      title: 'Justify Content & Main Axis Distribution',
      tagline: 'Master flex-start, flex-end, center, space-between, space-around, and space-evenly',
      durationMinutes: 20,
      learningObjectives: [
        'Master the 6 key justify-content values',
        'Learn when to use space-between vs space-around vs space-evenly',
        'Center elements effortlessly along the main axis with justify-content: center',
        'Understand how flex-direction: column affects justify-content behavior'
      ],
      theorySections: [
        {
          heading: '1. The 6 Main Axis Alignment Values',
          content: 'The justify-content property tells the browser what to do with any extra space remaining along the main axis.',
          bulletPoints: [
            'flex-start: Packs items toward the start of the axis (left in row)',
            'flex-end: Packs items toward the end of the axis (right in row)',
            'center: Clusters items together at the center of the axis',
            'space-between: First item touches start edge, last item touches end edge, with equal spacing between all items',
            'space-around: Equal space on both sides of each item (meaning interior gaps are twice as wide as outer edges)',
            'space-evenly: Equal space everywhere, including before the first item and after the last item'
          ]
        },
        {
          heading: '2. The Classic space-between Navbar',
          content: 'The most ubiquitous UI component on the web is the navigation bar with a logo on the far left and navigation links on the far right.',
          bulletPoints: [
            'display: flex with justify-content: space-between',
            'Pushes the brand logo to the left border and action buttons to the right border with zero pixel calculations'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'Parking Cars in a Designated Parking Lot',
        concept: 'justify-content Spacing',
        story: 'Imagine 3 cars parked in a 100-foot driveway. flex-start means all 3 cars park tight against the garage door. center means all 3 park in the dead middle of the driveway. space-between means one car parks against the garage, one car parks at the sidewalk curb, and the middle car parks exactly halfway between them.',
        moral: 'justify-content determines how you park your items across the available pavement.',
        icon: 'Layout'
      },
      visualType: 'flexbox',
      codeExample: {
        title: 'The space-between Navbar Pattern',
        description: 'Effortlessly separating logo and links across the full container width.',
        html: `<header class="navbar">
  <div class="logo"><strong>WebZone</strong></div>
  <nav class="nav-links">
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
</header>`,
        css: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.nav-links {
  display: flex;
  gap: 1.25rem;
}
.nav-links a {
  text-decoration: none;
  color: #2563eb;
  font-weight: 600;
}`,
        breakdown: [
          {
            lineRange: 'Line 3',
            title: 'justify-content: space-between',
            explanation: 'Forces the logo to the left edge and the nav-links container to the right edge.',
            highlightTokens: ['justify-content: space-between']
          }
        ]
      },
      video: {
        title: 'Mastering justify-content: space-between vs space-around vs space-evenly',
        duration: '11:40',
        description: 'Interactive comparison of all 6 justify-content values and practical navbar patterns.',
        keyPoints: [
          'Visualizing the 6 alignment values',
          'Space distribution math comparison',
          'Responsive navbar patterns'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Introduction', description: 'Main axis distribution' },
          { time: '04:00', seconds: 240, title: 'The Space Values', description: 'between vs around vs evenly' },
          { time: '08:15', seconds: 495, title: 'Navbar Demo', description: 'Real-world layout' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'justify-content: space-between is used in almost every professional web header.' }
        ],
        demoAnimationType: 'flex-align'
      },
      practice: {
        id: 'prac-04-04',
        title: 'Build a space-between Header Bar',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Style a header (<header class="app-header">) with display: flex and justify-content: space-between so that the logo stays on the left and the user profile stays on the right.',
        instructions: [
          'Set display: flex on .app-header',
          'Set justify-content: space-between on .app-header',
          'Set align-items: center for clean vertical alignment'
        ],
        starterHtml: `<header class="app-header">
  <span class="brand">AppStudio</span>
  <div class="user-pill">JD</div>
</header>`,
        starterCss: `.app-header {
  /* Add flex and justify-content here */
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.brand {
  font-weight: 800;
  font-size: 1.25rem;
  color: #0f172a;
}
.user-pill {
  width: 36px;
  height: 36px;
  background: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: bold;
}`,
        starterJs: `console.log("App header ready.");`,
        solutionHtml: `<header class="app-header">
  <span class="brand">AppStudio</span>
  <div class="user-pill">JD</div>
</header>`,
        solutionCss: `.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.brand {
  font-weight: 800;
  font-size: 1.25rem;
  color: #0f172a;
}
.user-pill {
  width: 36px;
  height: 36px;
  background: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: bold;
}`,
        solutionJs: `console.log("App header ready.");`,
        hints: [
          'Set display: flex; on .app-header.',
          'Set justify-content: space-between; on .app-header.'
        ],
        testCases: [
          {
            id: 'tc-04-4a',
            description: 'app-header has justify-content: space-between',
            hint: 'Set justify-content: space-between on .app-header',
            checkType: 'style-computed',
            target: '.app-header',
            expectedValue: 'space-between'
          }
        ],
        conceptQuestion: {
          question: 'What is the visual difference between space-between and space-evenly?',
          options: [
            'space-between puts zero space on the outer edges; space-evenly puts equal space on all edges and between all items',
            'space-between is vertical; space-evenly is horizontal',
            'space-between only works with two items',
            'There is no difference'
          ],
          correctIndex: 0,
          explanation: 'space-between pushes the first and last items flush against the container edges, while space-evenly creates equal gaps before, between, and after all items.'
        }
      },
      quiz: [
        {
          id: 'q-04-4',
          question: 'Which justify-content value centers all flex items tightly together along the main axis?',
          options: ['center', 'middle', 'align-center', 'space-center'],
          correctIndex: 0,
          explanation: 'justify-content: center clusters all children at the midpoint of the main axis.'
        }
      ],
      summary: [
        'justify-content distributes space along the main axis.',
        'space-between is the standard for navigation bars and headers.',
        'center, flex-start, and flex-end provide clustered positioning.',
        'space-around and space-evenly distribute balanced margins across items.'
      ],
      relatedTopics: [
        {
          title: 'Align Items',
          chapterNumber: '04',
          lessonId: 'ch-04-l-05',
          context: 'Control vertical and cross-axis alignment with align-items.'
        }
      ]
    },
    {
      id: 'ch-04-l-05',
      chapterId: 'ch-04',
      number: '4.5',
      slug: 'align-items',
      title: 'Align Items & Cross Axis Alignment',
      tagline: 'Master stretch, flex-start, flex-end, center, and baseline on the cross axis',
      durationMinutes: 20,
      learningObjectives: [
        'Master the 5 align-items values: stretch, flex-start, flex-end, center, baseline',
        'Learn the legendary 2-line formula to perfectly center any element both horizontally and vertically',
        'Understand how align-items: baseline aligns typography based on font x-heights',
        'Understand the default stretch behavior and why elements expand to equal heights'
      ],
      theorySections: [
        {
          heading: '1. The 5 Cross-Axis Values',
          content: 'The align-items property controls how items are positioned across the perpendicular cross axis (vertically in row mode).',
          bulletPoints: [
            'stretch (default): Items stretch to fill the full height of the container (unless an explicit height is set)',
            'flex-start: Aligns items flush against the cross-start edge',
            'flex-end: Aligns items flush against the cross-end edge',
            'center: Centers items along the cross axis',
            'baseline: Aligns text baselines across items even if font sizes differ'
          ]
        },
        {
          heading: '2. The Holy Grail of Centering',
          content: 'In early web design, vertically centering a box inside another box was considered one of the hardest challenges in CSS. With Flexbox, it is two lines of code.',
          bulletPoints: [
            'display: flex;',
            'justify-content: center; /* Centers horizontally */',
            'align-items: center; /* Centers vertically */'
          ],
          callout: {
            type: 'key-rule',
            text: 'The Universal Centering Formula: Combining justify-content: center and align-items: center perfectly centers any element inside its parent in both dimensions simultaneously!'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Picture Hanging Level and Plumb Line',
        concept: 'Cross-Axis Alignment',
        story: 'If you hang three picture frames of different heights along a hallway wall, you have choices. You can align their top edges with the ceiling (flex-start), align their bottom edges with the baseboard (flex-end), align their horizontal centerlines with laser precision (center), or stretch them all from floor to ceiling (stretch).',
        moral: 'align-items sets the horizontal plumb line for every item on the wall.',
        icon: 'Layout'
      },
      visualType: 'flexbox',
      codeExample: {
        title: 'Perfect Horizontal and Vertical Centering',
        description: 'Effortlessly centering a card both horizontally and vertically inside a 200px tall container.',
        html: `<div class="center-stage">
  <div class="badge-card">Perfect Center</div>
</div>`,
        css: `.center-stage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  background: #f1f5f9;
  border-radius: 8px;
  border: 1px dashed #94a3b8;
}
.badge-card {
  padding: 1rem 2rem;
  background: #2563eb;
  color: white;
  font-weight: 700;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`,
        breakdown: [
          {
            lineRange: 'Line 2-4',
            title: 'The 3 Magic Lines',
            explanation: 'display: flex, justify-content: center, and align-items: center lock the child directly into the dead center.',
            highlightTokens: ['display: flex', 'justify-content: center', 'align-items: center']
          }
        ]
      },
      video: {
        title: 'Align Items & The Ultimate CSS Centering Guide',
        duration: '12:15',
        description: 'Demonstrating stretch, baseline alignment with varied font sizes, and universal centering.',
        keyPoints: [
          'stretch default behavior and equal-height columns',
          'baseline typography alignment',
          'Universal centering code snippet'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Cross Axis Overview', description: 'How align-items operates' },
          { time: '04:15', seconds: 255, title: 'The 5 Values', description: 'stretch, center, baseline' },
          { time: '08:30', seconds: 510, title: 'Universal Centering', description: 'Solving vertical center' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'No more negative margin tricks â€” centering in Flexbox is effortless.' }
        ],
        demoAnimationType: 'flex-align'
      },
      practice: {
        id: 'prac-04-05',
        title: 'Center an Avatar and Name Vertically',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Build a user card container (<div class="user-row">) with display: flex and align-items: center so the circular avatar and text label are vertically centered with each other.',
        instructions: [
          'Set display: flex on .user-row',
          'Set align-items: center on .user-row',
          'Add gap: 12px for clean spacing between avatar and name'
        ],
        starterHtml: `<div class="user-row">
  <div class="avatar">SC</div>
  <span class="user-name">Sameer Chouhan</span>
</div>`,
        starterCss: `.user-row {
  /* Add flex, align-items, and gap here */
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.avatar {
  width: 44px;
  height: 44px;
  background: #0284c7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: bold;
}
.user-name {
  font-weight: 600;
  color: #1e293b;
}`,
        starterJs: `console.log("User row active.");`,
        solutionHtml: `<div class="user-row">
  <div class="avatar">SC</div>
  <span class="user-name">Sameer Chouhan</span>
</div>`,
        solutionCss: `.user-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.avatar {
  width: 44px;
  height: 44px;
  background: #0284c7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: bold;
}
.user-name {
  font-weight: 600;
  color: #1e293b;
}`,
        solutionJs: `console.log("User row active.");`,
        hints: [
          'Set display: flex; and align-items: center; on .user-row.',
          'Add gap: 12px;.'
        ],
        testCases: [
          {
            id: 'tc-04-5a',
            description: 'user-row has align-items: center',
            hint: 'Set align-items: center on .user-row',
            checkType: 'style-computed',
            target: '.user-row',
            expectedValue: 'center'
          }
        ],
        conceptQuestion: {
          question: 'What is the default value of align-items on a flex container?',
          options: ['stretch', 'center', 'flex-start', 'baseline'],
          correctIndex: 0,
          explanation: 'stretch is the default, causing items to expand to equal height along the cross axis.'
        }
      },
      quiz: [
        {
          id: 'q-04-5',
          question: 'Which two properties combined will center an item both horizontally and vertically inside a flex container?',
          options: [
            'justify-content: center; and align-items: center;',
            'text-align: center; and vertical-align: middle;',
            'margin: auto; and float: center;',
            'position: center; and display: inline;'
          ],
          correctIndex: 0,
          explanation: 'justify-content: center centers along the main axis; align-items: center centers along the cross axis.'
        }
      ],
      summary: [
        'align-items controls positioning across the cross axis.',
        'stretch is the default, producing equal-height sibling cards.',
        'center vertically aligns avatars, badges, and text effortlessly.',
        'Combining justify-content: center and align-items: center achieves universal centering.'
      ],
      relatedTopics: [
        {
          title: 'Flex Wrap & Multi-Line Layouts',
          chapterNumber: '04',
          lessonId: 'ch-04-l-06',
          context: 'Allow items to wrap onto new lines when screen space narrows.'
        }
      ]
    },
    {
      id: 'ch-04-l-06',
      chapterId: 'ch-04',
      number: '4.6',
      slug: 'flex-wrap',
      title: 'Flex Wrap & Multi-Line Layouts',
      tagline: 'Prevent horizontal overflow: wrap items onto new lines with flex-wrap and align-content',
      durationMinutes: 20,
      learningObjectives: [
        'Understand why nowrap is the default and how it causes overflow on small screens',
        'Use flex-wrap: wrap to create multi-line card grids and tag clouds',
        'Learn the flex-flow shorthand (flex-direction + flex-wrap)',
        'Master align-content to distribute extra space between wrapped lines'
      ],
      theorySections: [
        {
          heading: '1. The Overflow Trap: nowrap vs wrap',
          content: 'By default, a flex container sets flex-wrap: nowrap. It tries to force every child item onto a single line, shrinking items until they either break or overflow the browser viewport horizontally.',
          bulletPoints: [
            'flex-wrap: nowrap (default): All items forced onto one line. Can cause horizontal scrollbars',
            'flex-wrap: wrap: Items that exceed container width break gracefully onto the next line',
            'flex-wrap: wrap-reverse: Wrapped lines stack in reverse order'
          ]
        },
        {
          heading: '2. Multi-Line Alignment: align-content',
          content: 'When items wrap onto multiple lines, an entirely new property emerges: align-content.',
          bulletPoints: [
            'align-items aligns items WITHIN their individual line',
            'align-content aligns the ENTIRE COLLECTION of lines relative to the container height',
            'align-content values: flex-start, flex-end, center, space-between, space-around, stretch'
          ],
          callout: {
            type: 'warning',
            text: 'Important Distinction: align-content has NO effect if all items fit on a single line! It only takes effect when flex-wrap: wrap creates two or more lines.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'Typing Words in a Word Processor',
        concept: 'Wrapping Text vs Wrapping Cards',
        story: 'When you type a paragraph in a text editor, you do not press Enter at the end of every sentence. When words reach the right margin, the editor automatically wraps the next word onto a fresh line below. flex-wrap: wrap does the exact same thing for UI cards, badges, and image thumbnails.',
        moral: 'Enable wrap whenever you want responsive card collections that adapt to narrow phones.',
        icon: 'Layout'
      },
      visualType: 'flexbox',
      codeExample: {
        title: 'Responsive Tag Cloud with flex-wrap',
        description: 'Tags wrap onto new lines as the container shrinks.',
        html: `<div class="tag-cloud">
  <span class="tag">HTML5</span>
  <span class="tag">CSS3</span>
  <span class="tag">Flexbox</span>
  <span class="tag">Responsive Design</span>
  <span class="tag">JavaScript</span>
  <span class="tag">CSS Grid</span>
  <span class="tag">Git & GitHub</span>
</div>`,
        css: `.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  max-width: 320px;
}
.tag {
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid #bfdbfe;
}`,
        breakdown: [
          {
            lineRange: 'Line 3',
            title: 'flex-wrap: wrap',
            explanation: 'Enables multi-line wrapping so tags flow naturally across 3 or 4 lines within the 320px container.',
            highlightTokens: ['flex-wrap: wrap']
          }
        ]
      },
      video: {
        title: 'Mastering flex-wrap, flex-flow, and align-content',
        duration: '13:30',
        description: 'Visual demonstration of multi-line layouts, tag clouds, card galleries, and align-content spacing.',
        keyPoints: [
          'nowrap vs wrap comparison',
          'align-items vs align-content',
          'Building responsive pill filters'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'flex-wrap Overview', description: 'Preventing overflow' },
          { time: '04:20', seconds: 260, title: 'Tag Clouds & Grids', description: 'Wrapping cards' },
          { time: '09:00', seconds: 540, title: 'align-content', description: 'Multi-line spacing' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Without flex-wrap, your items will crush each other on mobile screens.' }
        ],
        demoAnimationType: 'flex-align'
      },
      practice: {
        id: 'prac-04-06',
        title: 'Build a Responsive Badge Container with flex-wrap',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Configure a badge list (<div class="badge-list">) with display: flex, flex-wrap: wrap, and gap: 8px so badges wrap automatically when screen width narrows.',
        instructions: [
          'Set display: flex on .badge-list',
          'Set flex-wrap: wrap on .badge-list',
          'Set gap: 8px to ensure spacing between wrapped rows and columns'
        ],
        starterHtml: `<div class="badge-list">
  <span class="badge">React</span>
  <span class="badge">TypeScript</span>
  <span class="badge">Tailwind CSS</span>
  <span class="badge">Node.js</span>
  <span class="badge">Express</span>
  <span class="badge">Vite</span>
</div>`,
        starterCss: `.badge-list {
  /* Add flex, flex-wrap, and gap here */
  max-width: 250px;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}`,
        starterJs: `console.log("Badge list ready.");`,
        solutionHtml: `<div class="badge-list">
  <span class="badge">React</span>
  <span class="badge">TypeScript</span>
  <span class="badge">Tailwind CSS</span>
  <span class="badge">Node.js</span>
  <span class="badge">Express</span>
  <span class="badge">Vite</span>
</div>`,
        solutionCss: `.badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 250px;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}`,
        solutionJs: `console.log("Badge list ready.");`,
        hints: [
          'Set display: flex; on .badge-list.',
          'Set flex-wrap: wrap; on .badge-list.',
          'Set gap: 8px;.'
        ],
        testCases: [
          {
            id: 'tc-04-6a',
            description: 'badge-list has flex-wrap: wrap',
            hint: 'Set flex-wrap: wrap on .badge-list',
            checkType: 'style-computed',
            target: '.badge-list',
            expectedValue: 'wrap'
          }
        ],
        conceptQuestion: {
          question: 'What is the default value of flex-wrap on any flex container?',
          options: ['nowrap', 'wrap', 'wrap-reverse', 'auto'],
          correctIndex: 0,
          explanation: 'nowrap is the default, which forces all items onto a single line unless explicitly overridden with flex-wrap: wrap.'
        }
      },
      quiz: [
        {
          id: 'q-04-6',
          question: 'Which property aligns multiple wrapped lines of flex items along the cross axis?',
          options: ['align-content', 'align-items', 'justify-lines', 'line-gap'],
          correctIndex: 0,
          explanation: 'align-content controls the distribution of extra space between multiple wrapped lines of items.'
        }
      ],
      summary: [
        'flex-wrap: wrap prevents horizontal overflow on mobile viewports.',
        'flex-flow combines flex-direction and flex-wrap into one shorthand.',
        'gap applies consistent spacing both horizontally and vertically between wrapped rows.',
        'align-content distributes space across multiple wrapped lines.'
      ],
      relatedTopics: [
        {
          title: 'Flexbox Mini-Project',
          chapterNumber: '04',
          lessonId: 'ch-04-l-07',
          context: 'Build a full production-ready responsive navbar and card layout.'
        }
      ]
    },
    {
      id: 'ch-04-l-07',
      chapterId: 'ch-04',
      number: '4.7',
      slug: 'mini-project',
      title: 'Flexbox Mini-Project: Responsive App Shell',
      tagline: 'Build a production-grade responsive navbar, content area, and card layout using pure Flexbox',
      durationMinutes: 30,
      learningObjectives: [
        'Synthesize container, item, axis, and wrapping rules into a cohesive web application shell',
        'Build a professional responsive navigation bar with logo, links, and avatar action',
        'Create a responsive 3-card product grid that automatically wraps on narrow viewports',
        'Verify zero horizontal overflow and flawless alignment across screen sizes'
      ],
      theorySections: [
        {
          heading: '1. The Anatomy of a Flexbox App Shell',
          content: 'Professional web applications utilize Flexbox at both the macro layout level (page header, body, sidebar) and micro layout level (inside buttons, badges, and card rows).',
          bulletPoints: [
            'Macro Layout: Outer app wrapper with display: flex; flex-direction: column; min-height: 100vh',
            'Header Bar: display: flex; justify-content: space-between; align-items: center',
            'Card Gallery: display: flex; flex-wrap: wrap; gap: 1rem',
            'Card Internals: display: flex; flex-direction: column; justify-content: space-between'
          ]
        },
        {
          heading: '2. Card Equal-Height Alignment',
          content: 'In older CSS, getting three cards to be the exact same height regardless of content length was notoriously difficult. In Flexbox, align-items: stretch does this automatically.',
          bulletPoints: [
            'Stretch Default: All sibling cards in a row match the height of the tallest card',
            'Sticky Footers Inside Cards: Setting margin-top: auto on a card footer pushes buttons flush to the bottom!'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Swiss Watchmaker Workshop',
        concept: 'Macro and Micro Alignment',
        story: 'A master watchmaker arranges the overall brass chassis (macro layout) and then meticulously places the balance wheels, rubies, and gears (micro layout) inside. When all gears mesh with micron precision, the watch ticks with rhythm and elegance.',
        moral: 'Flexbox gives you watchmaker-level precision over every element on your screen.',
        icon: 'Layout'
      },
      visualType: 'flexbox',
      codeExample: {
        title: 'Complete Flexbox App Shell Layout',
        description: 'Complete navigation header, responsive card grid, and equal-height cards.',
        html: `<div class="app-shell">
  <header class="navbar">
    <div class="brand">WebZoneBW Studio</div>
    <nav class="nav-links">
      <a href="#">Dashboard</a>
      <a href="#">Projects</a>
    </nav>
    <div class="user-pill">JD</div>
  </header>
  <main class="card-grid">
    <div class="card">
      <h3>Design System</h3>
      <p>Clean tokens, color scales, and typography.</p>
      <button class="btn">Explore</button>
    </div>
    <div class="card">
      <h3>Flexbox Engine</h3>
      <p>Complete one-dimensional layout control.</p>
      <button class="btn">Explore</button>
    </div>
  </main>
</div>`,
        css: `.app-shell {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
}
.nav-links a {
  text-decoration: none;
  color: #475569;
  font-weight: 600;
}
.user-pill {
  width: 36px;
  height: 36px;
  background: #2563eb;
  color: white;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card {
  flex: 1 1 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`,
        breakdown: [
          {
            lineRange: 'Line 2-9',
            title: 'Header Alignment',
            explanation: 'space-between with align-items: center creates a clean three-part navbar.',
            highlightTokens: ['justify-content: space-between', 'align-items: center']
          },
          {
            lineRange: 'Line 10-21',
            title: 'Card Grid with flex: 1 1 240px',
            explanation: 'Cards expand to fill available space and wrap gracefully onto new lines on small viewports.',
            highlightTokens: ['flex: 1 1 240px', 'flex-wrap: wrap']
          }
        ]
      },
      video: {
        title: 'Building a Complete Flexbox App Shell from Scratch',
        duration: '18:45',
        description: 'Live coding a production-ready application shell with navigation, responsive card gallery, and sticky footer.',
        keyPoints: [
          'Full-height page wrappers',
          'Responsive navbar with auto margin trick',
          'Equal height cards with internal flex alignment'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Project Overview', description: 'Wireframe and goals' },
          { time: '05:30', seconds: 330, title: 'The Navbar', description: 'Building the header' },
          { time: '11:00', seconds: 660, title: 'Card Grid', description: 'Responsive card wrap' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'You have mastered the entire Flexbox layout engine. Now let us build something real.' }
        ],
        demoAnimationType: 'flex-align'
      },
      practice: {
        id: 'prac-04-07',
        title: 'Build a Full Responsive Header and Card Grid',
        difficulty: 'Intermediate',
        estimatedTime: '15 min',
        prompt: 'Build a complete Flexbox app layout: a header (<header class="app-nav">) using justify-content: space-between and align-items: center, and a card grid (<div class="grid-wrap">) using display: flex, flex-wrap: wrap, and gap: 16px.',
        instructions: [
          'Style .app-nav with display: flex, justify-content: space-between, and align-items: center',
          'Style .grid-wrap with display: flex, flex-wrap: wrap, and gap: 16px',
          'Style .grid-wrap .item with flex: 1 1 200px'
        ],
        starterHtml: `<div class="project-wrap">
  <header class="app-nav">
    <h2>WebZone</h2>
    <div class="actions">Profile</div>
  </header>
  <div class="grid-wrap">
    <div class="item">Project Alpha</div>
    <div class="item">Project Beta</div>
  </div>
</div>`,
        starterCss: `.project-wrap {
  background: #f8fafc;
  padding: 1.5rem;
}
.app-nav {
  /* Add flex, justify-content, align-items */
  background: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}
.grid-wrap {
  /* Add flex, flex-wrap, and gap */
}
.item {
  /* Add flex: 1 1 200px */
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
}`,
        starterJs: `console.log("Flexbox capstone ready.");`,
        solutionHtml: `<div class="project-wrap">
  <header class="app-nav">
    <h2>WebZone</h2>
    <div class="actions">Profile</div>
  </header>
  <div class="grid-wrap">
    <div class="item">Project Alpha</div>
    <div class="item">Project Beta</div>
  </div>
</div>`,
        solutionCss: `.project-wrap {
  background: #f8fafc;
  padding: 1.5rem;
}
.app-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}
.grid-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.item {
  flex: 1 1 200px;
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
}`,
        solutionJs: `console.log("Flexbox capstone ready.");`,
        hints: [
          'Set display: flex; justify-content: space-between; align-items: center; on .app-nav.',
          'Set display: flex; flex-wrap: wrap; gap: 16px; on .grid-wrap.'
        ],
        testCases: [
          {
            id: 'tc-04-7a',
            description: 'app-nav has justify-content: space-between',
            hint: 'Set justify-content: space-between on .app-nav',
            checkType: 'style-computed',
            target: '.app-nav',
            expectedValue: 'space-between'
          },
          {
            id: 'tc-04-7b',
            description: 'grid-wrap has flex-wrap: wrap',
            hint: 'Set flex-wrap: wrap on .grid-wrap',
            checkType: 'style-computed',
            target: '.grid-wrap',
            expectedValue: 'wrap'
          }
        ],
        conceptQuestion: {
          question: 'In the shorthand "flex: 1 1 200px", what does the 200px represent?',
          options: [
            'flex-basis (the initial starting width before growing or shrinking)',
            'flex-grow limit',
            'maximum container margin',
            'border-radius'
          ],
          correctIndex: 0,
          explanation: 'The three arguments in the flex shorthand are flex-grow (1), flex-shrink (1), and flex-basis (200px).'
        }
      },
      quiz: [
        {
          id: 'q-04-7',
          question: 'How do you push a button flush to the bottom of a flex card whose flex-direction is column?',
          options: [
            'margin-top: auto on the button',
            'float: bottom on the button',
            'position: bottom on the card',
            'vertical-align: bottom'
          ],
          correctIndex: 0,
          explanation: 'margin-top: auto inside a column flex container absorbs all remaining vertical space, pushing the element flush to the bottom.'
        }
      ],
      summary: [
        'Flexbox powers both macro app layouts (navbars, sidebars) and micro component details.',
        'flex: 1 1 [basis] enables fluid, self-wrapping responsive card grids.',
        'margin: auto inside flex containers creates effortless alignment pushes.',
        'Chapter 04 is the definitive benchmark for CSS layout mastery.'
      ],
      relatedTopics: [
        {
          title: 'CSS Grid Layout Architecture',
          chapterNumber: '05',
          lessonId: 'ch-05-l-01',
          context: 'Transition from one-dimensional Flexbox to two-dimensional CSS Grid.'
        }
      ]
    }
  ]
};
