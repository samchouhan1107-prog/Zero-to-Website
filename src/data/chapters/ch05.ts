import { Chapter } from '../../utils/types';

export const chapter05: Chapter = {
  id: 'ch-05',
  number: '05',
  badge: '05',
  slug: 'css-grid',
  title: 'CSS Grid Layout Architecture',
  subtitle: 'Two-dimensional layout power: tracks, areas, minmax, and responsive bento grids',
  description: 'Master the premier 2D layout engine of the web. Learn rows and columns simultaneously, fractional units (fr), repeat(), minmax(), auto-fit vs auto-fill, grid-template-areas, and build a full responsive bento dashboard.',
  estimatedHours: '4 hrs',
  accentColor: 'indigo',
  iconName: 'Grid',
  totalLessons: 6,
  lessons: [
    {
      id: 'ch-05-l-01',
      chapterId: 'ch-05',
      number: '5.1',
      slug: 'grid-basics-and-terminology',
      title: 'Grid Basics & Terminology',
      tagline: 'Understand 2-dimensional layouts, grid containers, grid tracks, cells, and grid lines',
      durationMinutes: 25,
      learningObjectives: [
        'Understand the fundamental difference between 1D (Flexbox) and 2D (CSS Grid) layout engines',
        'Learn the core terminology: Grid Container, Grid Items, Grid Lines, Grid Tracks, Grid Cells, and Grid Areas',
        'Activate a grid with display: grid and define basic columns and rows',
        'Inspect grid overlays using Chrome and Firefox DevTools'
      ],
      theorySections: [
        {
          heading: '1. Why 2-Dimensional Layout Changes Everything',
          content: 'While Flexbox operates along a single axis (either row or column), CSS Grid works along BOTH axes simultaneously: horizontal rows and vertical columns at the same time.',
          bulletPoints: [
            'Flexbox: Content-driven (elements determine where lines break)',
            'CSS Grid: Container-driven (the parent defines a rigid or fluid blueprint grid, and child items snap into coordinates)',
            'Hybrid Power: In modern development, CSS Grid handles outer page architecture while Flexbox manages inner component details'
          ]
        },
        {
          heading: '2. The 6 Pillars of Grid Anatomy',
          content: 'To master CSS Grid, you must understand its anatomical terms.',
          bulletPoints: [
            'Grid Container: The parent element with display: grid',
            'Grid Lines: The numbered horizontal and vertical dividing lines (starting at 1)',
            'Grid Track: The space between two adjacent grid lines (a row or a column)',
            'Grid Cell: The single intersection unit of a row and column (like a spreadsheet cell)',
            'Grid Area: Any rectangular space bounded by 4 grid lines (composed of 1 or more cells)'
          ],
          callout: {
            type: 'key-rule',
            text: 'Key Difference: Flexbox items flow like words in a sentence; Grid items snap into numbered Cartesian coordinate boxes.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Blueprint and the Scaffolding Grid',
        concept: '2D Layout vs 1D Flow',
        story: 'Flexbox is like a row of books on a shelf; you can push them left or right. CSS Grid is a massive architectural steel scaffolding erected on a city construction site with numbered floors (rows) and numbered columns. Workers can place a glass panel into Cell (Floor 3, Column 2) or span a giant billboard across 3 floors and 2 columns simultaneously.',
        moral: 'Grid gives you blueprint coordinate control over the entire two-dimensional surface.',
        icon: 'Grid'
      },
      visualType: 'css-grid',
      codeExample: {
        title: 'Activating a 3-Column Grid',
        description: 'Notice how display: grid with grid-template-columns instantly organizes items into equal columns.',
        html: `<div class="grid-container">
  <div class="grid-box">1</div>
  <div class="grid-box">2</div>
  <div class="grid-box">3</div>
  <div class="grid-box">4</div>
  <div class="grid-box">5</div>
  <div class="grid-box">6</div>
</div>`,
        css: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.grid-box {
  background: #4f46e5;
  color: white;
  padding: 1.5rem;
  border-radius: 6px;
  text-align: center;
  font-weight: 700;
  font-size: 1.25rem;
}`,
        breakdown: [
          {
            lineRange: 'Line 2-3',
            title: 'display: grid & grid-template-columns',
            explanation: 'Initializes the 2D grid context and defines 3 equal fractional (1fr) columns.',
            highlightTokens: ['display: grid', 'grid-template-columns: 1fr 1fr 1fr']
          }
        ]
      },
      video: {
        title: 'CSS Grid Fundamentals and Anatomy',
        duration: '15:10',
        description: 'Visualizing grid lines, tracks, cells, areas, and turning on the DevTools Grid Inspector.',
        keyPoints: [
          'Flexbox vs CSS Grid comparison',
          'Grid line numbering (1, 2, 3...)',
          'Using the Chrome / Firefox Grid Inspector'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Why 2D Grid', description: 'Beyond 1D Flexbox' },
          { time: '05:00', seconds: 300, title: 'Grid Anatomy', description: 'Tracks, cells, and lines' },
          { time: '10:30', seconds: 630, title: 'DevTools Inspector', description: 'Visualizing line numbers' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'CSS Grid is the most powerful layout system ever built into web browsers.' }
        ],
        demoAnimationType: 'grid-tracks'
      },
      practice: {
        id: 'prac-05-01',
        title: 'Build a 3-Column Photo Gallery Grid',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Configure a photo gallery (<div class="gallery">) with display: grid, grid-template-columns: 1fr 1fr 1fr, and gap: 1rem so six cards align into a 3x2 grid.',
        instructions: [
          'Set display: grid on .gallery',
          'Set grid-template-columns: 1fr 1fr 1fr on .gallery',
          'Set gap: 1rem'
        ],
        starterHtml: `<div class="gallery">
  <div class="photo">Alpha</div>
  <div class="photo">Beta</div>
  <div class="photo">Gamma</div>
  <div class="photo">Delta</div>
  <div class="photo">Epsilon</div>
  <div class="photo">Zeta</div>
</div>`,
        starterCss: `.gallery {
  /* Add grid properties here */
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}
.photo {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  text-align: center;
  font-weight: 600;
  color: #1e293b;
}`,
        starterJs: `console.log("Gallery grid initialized.");`,
        solutionHtml: `<div class="gallery">
  <div class="photo">Alpha</div>
  <div class="photo">Beta</div>
  <div class="photo">Gamma</div>
  <div class="photo">Delta</div>
  <div class="photo">Epsilon</div>
  <div class="photo">Zeta</div>
</div>`,
        solutionCss: `.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}
.photo {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  text-align: center;
  font-weight: 600;
  color: #1e293b;
}`,
        solutionJs: `console.log("Gallery grid initialized.");`,
        hints: [
          'Set display: grid; on .gallery.',
          'Set grid-template-columns: 1fr 1fr 1fr; on .gallery.'
        ],
        testCases: [
          {
            id: 'tc-05-1a',
            description: 'gallery has display: grid',
            hint: 'Set display: grid on .gallery',
            checkType: 'style-computed',
            target: '.gallery',
            expectedValue: 'grid'
          }
        ],
        conceptQuestion: {
          question: 'What is the primary architectural difference between CSS Grid and CSS Flexbox?',
          options: [
            'CSS Grid works in 2 dimensions (rows and columns simultaneously), while Flexbox works in 1 dimension',
            'Flexbox works with images; Grid works only with text',
            'CSS Grid was created in 1995',
            'CSS Grid requires JavaScript to compute positions'
          ],
          correctIndex: 0,
          explanation: 'CSS Grid provides true two-dimensional layout orchestration across both horizontal rows and vertical columns at the same time.'
        }
      },
      quiz: [
        {
          id: 'q-05-1',
          question: 'What is a single intersection space of a row track and column track called?',
          options: ['Grid Cell', 'Grid Line', 'Grid Border', 'Grid Gutter'],
          correctIndex: 0,
          explanation: 'A Grid Cell is the atomic intersection of a single row track and single column track.'
        }
      ],
      summary: [
        'CSS Grid is a two-dimensional layout engine for simultaneous row and column design.',
        'display: grid establishes the grid formatting context.',
        'Grid lines are numbered starting from 1 at the container edges.',
        'Grid cells sit at the intersection of row and column tracks.'
      ],
      relatedTopics: [
        {
          title: 'Grid Tracks & Sizing',
          chapterNumber: '05',
          lessonId: 'ch-05-l-02',
          context: 'Master the fr unit, repeat(), minmax(), and auto-fit vs auto-fill.'
        }
      ]
    },
    {
      id: 'ch-05-l-02',
      chapterId: 'ch-05',
      number: '5.2',
      slug: 'grid-tracks-and-sizing',
      title: 'Grid Tracks & Sizing: fr, minmax & repeat',
      tagline: 'Master the fractional unit (fr), repeat(), minmax(), and auto-fit vs auto-fill for responsive grids',
      durationMinutes: 30,
      learningObjectives: [
        'Understand the fractional unit (fr) and how it distributes positive remaining space',
        'Use repeat() to avoid repetitive column declarations (e.g. repeat(4, 1fr))',
        'Learn the legendary responsive pattern: repeat(auto-fit, minmax(250px, 1fr))',
        'Distinguish between auto-fit (expands items to fill empty track space) and auto-fill (leaves empty ghost tracks)'
      ],
      theorySections: [
        {
          heading: '1. The Fractional Unit (fr)',
          content: 'The fr unit represents a fraction of the available free space inside the grid container.',
          bulletPoints: [
            'grid-template-columns: 1fr 2fr creates two columns where the second column is twice as wide as the first',
            'grid-template-columns: 200px 1fr creates a fixed 200px sidebar while the remaining space goes entirely to the main content',
            'repeat(3, 1fr) is identical to writing 1fr 1fr 1fr'
          ]
        },
        {
          heading: '2. The Holy Grail of Responsive Grids (Zero Media Queries)',
          content: 'One of the most famous lines of CSS in modern web design creates fully responsive card grids that automatically calculate column counts without a single media query!',
          bulletPoints: [
            'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));',
            'minmax(280px, 1fr): Cards will NEVER be smaller than 280px, but will stretch up to 1fr to fill available width',
            'auto-fit: Automatically packs as many 280px columns as fit on screen, and stretches them if empty space remains'
          ],
          callout: {
            type: 'key-rule',
            text: 'Golden Responsive Pattern: repeat(auto-fit, minmax(min-width, 1fr)) is the ultimate zero-media-query responsive grid formula.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The Accordion Card Rack in a Post Office',
        concept: 'minmax() and auto-fit',
        story: 'Imagine a greeting card display rack in a gift shop. Each card pocket has a minimum physical width of 5 inches so cards don’t get crumpled. If the store expands the counter width, the rack automatically fits 4 card slots instead of 3, stretching each slot slightly so there are no awkward empty gaps.',
        moral: 'auto-fit with minmax() calculates the perfect number of columns for any screen size automatically.',
        icon: 'Grid'
      },
      visualType: 'css-grid',
      codeExample: {
        title: 'Zero Media Query Responsive Card Grid',
        description: 'Resize your browser window or preview to watch cards wrap and stretch automatically.',
        html: `<div class="responsive-card-grid">
  <div class="card">UX Design</div>
  <div class="card">CSS Grid</div>
  <div class="card">TypeScript</div>
  <div class="card">Cloud DevOps</div>
</div>`,
        css: `.responsive-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
}
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
}`,
        breakdown: [
          {
            lineRange: 'Line 3',
            title: 'repeat(auto-fit, minmax(180px, 1fr))',
            explanation: 'Guarantees cards are at least 180px wide while stretching to fill empty horizontal space.',
            highlightTokens: ['repeat(auto-fit, minmax(180px, 1fr))']
          }
        ]
      },
      video: {
        title: 'Mastering Grid Tracks: fr, minmax, and auto-fit vs auto-fill',
        duration: '14:40',
        description: 'Live interactive demonstration of the fr unit, minmax math, and why auto-fit is usually preferred over auto-fill.',
        keyPoints: [
          'How fr calculates free space after fixed px and gap subtractions',
          'minmax(min, max) behavior',
          'auto-fit vs auto-fill side-by-side comparison'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'The fr Unit', description: 'Fractional math' },
          { time: '04:30', seconds: 270, title: 'repeat() Syntax', description: 'Clean shorthand' },
          { time: '09:15', seconds: 555, title: 'The auto-fit Magic Formula', description: 'Zero media query responsive' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'This single line of CSS will save you hundreds of lines of media query boilerplate.' }
        ],
        demoAnimationType: 'grid-tracks'
      },
      practice: {
        id: 'prac-05-02',
        title: 'Build a Self-Adapting Auto-Fit Product Catalog',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Style a product container (<div class="products">) with display: grid and the responsive pattern: repeat(auto-fit, minmax(200px, 1fr)) with gap: 16px.',
        instructions: [
          'Set display: grid on .products',
          'Set grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) on .products',
          'Set gap: 16px'
        ],
        starterHtml: `<div class="products">
  <div class="item">Laptop Pro</div>
  <div class="item">Mechanical Keyboard</div>
  <div class="item">Wireless Mouse</div>
</div>`,
        starterCss: `.products {
  /* Add responsive grid-template-columns here */
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}
.item {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
  text-align: center;
}`,
        starterJs: `console.log("Products grid ready.");`,
        solutionHtml: `<div class="products">
  <div class="item">Laptop Pro</div>
  <div class="item">Mechanical Keyboard</div>
  <div class="item">Wireless Mouse</div>
</div>`,
        solutionCss: `.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}
.item {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
  text-align: center;
}`,
        solutionJs: `console.log("Products grid ready.");`,
        hints: [
          'Set display: grid; on .products.',
          'Set grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); on .products.'
        ],
        testCases: [
          {
            id: 'tc-05-2a',
            description: 'products has display: grid',
            hint: 'Set display: grid on .products',
            checkType: 'style-computed',
            target: '.products',
            expectedValue: 'grid'
          }
        ],
        conceptQuestion: {
          question: 'What is the main difference between auto-fit and auto-fill when there are fewer items than available column tracks?',
          options: [
            'auto-fit collapses empty tracks to 0px and stretches existing items to fill the row; auto-fill maintains empty ghost tracks',
            'auto-fit only works on mobile phones',
            'auto-fill is faster to render',
            'auto-fit requires JavaScript'
          ],
          correctIndex: 0,
          explanation: 'auto-fit collapses any empty tracks down to 0px, allowing the remaining items to expand and fill the entire container width.'
        }
      },
      quiz: [
        {
          id: 'q-05-2',
          question: 'If a grid has grid-template-columns: 1fr 3fr and total free width is 400px, what is the width of the second column?',
          options: ['300px', '100px', '200px', '350px'],
          correctIndex: 0,
          explanation: 'Total fr = 1 + 3 = 4 shares. Each share is 100px. The 3fr column receives 3 * 100px = 300px.'
        }
      ],
      summary: [
        'The fr unit divides remaining positive container space proportionally.',
        'repeat(count, track-size) eliminates redundant repetitive declarations.',
        'minmax(min, max) clamps track dimensions between lower and upper bounds.',
        'repeat(auto-fit, minmax(width, 1fr)) creates fluid, zero-media-query responsive grids.'
      ],
      relatedTopics: [
        {
          title: 'Grid Lines & Positioning',
          chapterNumber: '05',
          lessonId: 'ch-05-l-03',
          context: 'Span items across multiple rows and columns using grid-column and grid-row line numbers.'
        }
      ]
    },
    {
      id: 'ch-05-l-03',
      chapterId: 'ch-05',
      number: '5.3',
      slug: 'grid-lines-and-positioning',
      title: 'Grid Lines & Item Positioning',
      tagline: 'Span items across rows and columns using grid-column, grid-row, and line numbers',
      durationMinutes: 25,
      learningObjectives: [
        'Understand grid line numbering (positive 1, 2, 3... and negative -1, -2, -3...)',
        'Position items using grid-column-start, grid-column-end, and the grid-column shorthand',
        'Use the span keyword (e.g. grid-column: span 2) for intuitive multi-column cards',
        'Span an element across the entire grid width using grid-column: 1 / -1'
      ],
      theorySections: [
        {
          heading: '1. Numbered Grid Lines',
          content: 'Grid tracks are bounded by grid lines numbered sequentially starting at 1. An N-column grid has N + 1 vertical grid lines.',
          bulletPoints: [
            'A 3-column grid has 4 vertical lines: Line 1 (left edge), Line 2, Line 3, and Line 4 (right edge)',
            'Negative Line Numbers: Line -1 always refers to the far end edge of the grid!',
            'grid-column: 1 / -1 spans an item from the very first line to the very last line across the entire container'
          ]
        },
        {
          heading: '2. The span Keyword',
          content: 'Instead of memorizing exact line numbers, the span keyword tells an item to occupy a specific number of tracks from its natural placement.',
          bulletPoints: [
            'grid-column: span 2 makes a feature card twice as wide as standard cards',
            'grid-row: span 2 makes a tall portrait card span across two vertical rows'
          ],
          callout: {
            type: 'key-rule',
            text: 'Pro Shorthand: grid-column: 1 / span 2 starts at line 1 and spans across 2 column tracks.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'Newspaper Front Page Layout',
        concept: 'Spanning Grid Lines',
        story: 'A traditional printed broadsheet newspaper is laid out on a 6-column grid. Most standard articles occupy 1 column. But the breaking headline banner spans all 6 columns across the top (grid-column: 1 / -1), while the prominent editorial photograph spans 2 columns and 2 rows in the center.',
        moral: 'Line-spanning transforms equal-size grids into visually captivating editorial bento layouts.',
        icon: 'Layout'
      },
      visualType: 'css-grid',
      codeExample: {
        title: 'Featured Bento Card Spanning Across 2 Columns',
        description: 'Notice how the first card spans 2 columns using grid-column: span 2.',
        html: `<div class="bento-grid">
  <div class="card featured">Featured Article (Spans 2 Columns)</div>
  <div class="card">Sidebar Stat</div>
  <div class="card">Regular Card 1</div>
  <div class="card">Regular Card 2</div>
  <div class="card">Regular Card 3</div>
</div>`,
        css: `.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
}
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-weight: 600;
}
.featured {
  grid-column: span 2;
  background: #4338ca;
  color: white;
}`,
        breakdown: [
          {
            lineRange: 'Line 17',
            title: 'grid-column: span 2',
            explanation: 'Directs the featured card to stretch across two column tracks instead of one.',
            highlightTokens: ['grid-column: span 2']
          }
        ]
      },
      video: {
        title: 'Mastering Grid Lines: Numbered Lines, -1, and span',
        duration: '13:50',
        description: 'Visual walkthrough of line numbering, spanning headers, negative indexing, and building bento layouts.',
        keyPoints: [
          'Positive vs negative line indexing',
          'The span keyword syntax',
          'Designing bento grid layouts'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Line Numbering', description: 'Counting lines' },
          { time: '04:30', seconds: 270, title: 'Negative Indexing (-1)', description: 'Spanning full width' },
          { time: '08:45', seconds: 525, title: 'The span Keyword', description: 'Dynamic spanning' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Spanning items across grid lines is where modern UI layout gets exciting.' }
        ],
        demoAnimationType: 'grid-tracks'
      },
      practice: {
        id: 'prac-05-03',
        title: 'Create a Featured Hero Banner with grid-column: 1 / -1',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'In a 3-column grid (<div class="bento-container">), style the first child (<div class="banner">) so it spans all 3 columns across the entire width using grid-column: 1 / -1.',
        instructions: [
          'Set display: grid and grid-template-columns: repeat(3, 1fr) on .bento-container',
          'Set grid-column: 1 / -1 on .banner',
          'Add gap: 12px for spacing'
        ],
        starterHtml: `<div class="bento-container">
  <div class="banner">Full-Width Hero Announcement</div>
  <div class="box">Card 1</div>
  <div class="box">Card 2</div>
  <div class="box">Card 3</div>
</div>`,
        starterCss: `.bento-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}
.banner {
  /* Add grid-column: 1 / -1 */
  background: #2563eb;
  color: white;
  padding: 1.5rem;
  border-radius: 6px;
  font-weight: 700;
  text-align: center;
}
.box {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  text-align: center;
}`,
        starterJs: `console.log("Bento grid ready.");`,
        solutionHtml: `<div class="bento-container">
  <div class="banner">Full-Width Hero Announcement</div>
  <div class="box">Card 1</div>
  <div class="box">Card 2</div>
  <div class="box">Card 3</div>
</div>`,
        solutionCss: `.bento-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}
.banner {
  grid-column: 1 / -1;
  background: #2563eb;
  color: white;
  padding: 1.5rem;
  border-radius: 6px;
  font-weight: 700;
  text-align: center;
}
.box {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  text-align: center;
}`,
        solutionJs: `console.log("Bento grid ready.");`,
        hints: [
          'Set grid-column: 1 / -1; on .banner to span from line 1 to the end.',
          'Notice how .banner now sits alone on the top row, spanning across all 3 columns.'
        ],
        testCases: [
          {
            id: 'tc-05-3a',
            description: 'banner spans all columns',
            hint: 'Set grid-column: 1 / -1 on .banner',
            checkType: 'style-computed',
            target: '.banner',
            expectedValue: '1 / -1'
          }
        ],
        conceptQuestion: {
          question: 'What does grid-column: 1 / -1 mean in CSS Grid?',
          options: [
            'Span from the first vertical grid line (left edge) to the last grid line (right edge)',
            'Span -1 pixels',
            'Delete the column',
            'Hide the element on mobile'
          ],
          correctIndex: 0,
          explanation: 'Line 1 is the starting line and line -1 is the ending line of the explicit grid, making the item span the full width.'
        }
      },
      quiz: [
        {
          id: 'q-05-3',
          question: 'How do you tell a grid item to occupy 3 columns without calculating specific line numbers?',
          options: ['grid-column: span 3', 'grid-width: 3', 'grid-columns: 3', 'span-column: 3'],
          correctIndex: 0,
          explanation: 'grid-column: span 3 instructs the item to stretch across 3 adjacent column tracks.'
        }
      ],
      summary: [
        'Grid lines are numbered starting from 1 (and -1 from the opposite end).',
        'grid-column: [start] / [end] positions items across specific column tracks.',
        'The span keyword allows items to expand across a relative number of tracks.',
        'grid-column: 1 / -1 spans an item across the full container width.'
      ],
      relatedTopics: [
        {
          title: 'Grid Template Areas',
          chapterNumber: '05',
          lessonId: 'ch-05-l-04',
          context: 'Map page layouts visually with named text-based grid areas.'
        }
      ]
    },
    {
      id: 'ch-05-l-04',
      chapterId: 'ch-05',
      number: '5.4',
      slug: 'grid-template-areas',
      title: 'Grid Template Areas & Visual Layouts',
      tagline: 'Design layouts with human-readable ASCII art using grid-template-areas and grid-area',
      durationMinutes: 25,
      learningObjectives: [
        'Map out full-page wireframes visually using grid-template-areas',
        'Assign child elements to named regions using grid-area: [name]',
        'Use the dot (.) symbol to denote empty, unoccupied grid cells',
        'Reorganize entire website wireframes inside a single responsive media query'
      ],
      theorySections: [
        {
          heading: '1. Human-Readable ASCII Layouts',
          content: 'CSS Grid Template Areas is arguably the most readable layout syntax ever invented. Instead of cryptic line numbers, you paint your layout using named strings that match your wireframe.',
          bulletPoints: [
            'grid-template-areas: Defines the spatial blueprint using named zones in quotes',
            'grid-area: Binds a specific child HTML element to a named zone',
            'The period (.): Represents an empty, intentional spacer cell'
          ]
        },
        {
          heading: '2. Effortless Responsive Restructuring',
          content: 'On mobile, you can redefine your entire site layout simply by changing the grid-template-areas string inside a media query without touching child CSS or HTML markup!',
          bulletPoints: [
            'Desktop: "header header" "sidebar main" "footer footer"',
            'Mobile: "header" "main" "sidebar" "footer"'
          ],
          callout: {
            type: 'tip',
            text: 'Every row string in grid-template-areas must contain the exact same number of cell tokens! Incomplete rows will cause the browser to invalidate the property.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'The City Zoning Blueprint Map',
        concept: 'Named Spatial Zones',
        story: 'Urban city planners do not point to GPS coordinates when discussing layout. They label zones on a large color-coded map: "Park", "Commercial", "Residential", and "Transit Hub". When city contractors construct buildings, they simply build the library in the "Commercial" zone and the playground in the "Park" zone.',
        moral: 'grid-template-areas gives you a clear visual blueprint map for your entire application.',
        icon: 'Map'
      },
      visualType: 'css-grid',
      codeExample: {
        title: 'Named Grid Template Areas Layout',
        description: 'Notice how the layout directly mirrors the ASCII text string.',
        html: `<div class="site-layout">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Main Content Area</main>
  <footer class="footer">Footer</footer>
</div>`,
        css: `.site-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  gap: 1rem;
  min-height: 280px;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
}
.header { grid-area: header; background: #e0e7ff; color: #3730a3; padding: 1rem; border-radius: 6px; font-weight: bold; }
.sidebar { grid-area: sidebar; background: #f1f5f9; color: #334155; padding: 1rem; border-radius: 6px; font-weight: bold; }
.content { grid-area: content; background: #2563eb; color: white; padding: 1.5rem; border-radius: 6px; font-weight: bold; }
.footer { grid-area: footer; background: #e2e8f0; color: #475569; padding: 1rem; border-radius: 6px; font-weight: bold; }`,
        breakdown: [
          {
            lineRange: 'Line 5-8',
            title: 'grid-template-areas Blueprint',
            explanation: 'Visually maps header across 2 columns, sidebar and content side-by-side, and footer across the bottom.',
            highlightTokens: ['grid-template-areas']
          },
          {
            lineRange: 'Line 16-19',
            title: 'Connecting with grid-area',
            explanation: 'Binds each class (.header, .sidebar, .content, .footer) to its corresponding named grid area.',
            highlightTokens: ['grid-area: header', 'grid-area: sidebar']
          }
        ]
      },
      video: {
        title: 'Mastering grid-template-areas and Responsive Restructuring',
        duration: '14:20',
        description: 'Live coding full-page application wireframes with named areas and switching layouts seamlessly on mobile.',
        keyPoints: [
          'Visual ASCII grid mapping',
          'Connecting children with grid-area',
          'Using dots for empty spaces',
          'Responsive rearrangement'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Concept', description: 'Visual mapping syntax' },
          { time: '05:00', seconds: 300, title: 'The Blueprint String', description: 'Row by row rules' },
          { time: '09:40', seconds: 580, title: 'Responsive Restructure', description: 'One-line mobile flip' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Grid template areas make your CSS look like an actual architectural drawing.' }
        ],
        demoAnimationType: 'grid-tracks'
      },
      practice: {
        id: 'prac-05-04',
        title: 'Wireframe a Dashboard Shell with grid-template-areas',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Build a layout (<div class="admin-shell">) with grid-template-areas defining "top top" and "nav data", and assign .top-bar to grid-area: top, .side-nav to grid-area: nav, and .main-data to grid-area: data.',
        instructions: [
          'Set display: grid and grid-template-columns: 160px 1fr on .admin-shell',
          'Set grid-template-areas: "top top" "nav data" on .admin-shell',
          'Assign grid-area: top, grid-area: nav, and grid-area: data to their respective elements'
        ],
        starterHtml: `<div class="admin-shell">
  <div class="top-bar">Admin Topbar</div>
  <div class="side-nav">Navigation</div>
  <div class="main-data">Data Dashboard</div>
</div>`,
        starterCss: `.admin-shell {
  display: grid;
  grid-template-columns: 160px 1fr;
  /* Add grid-template-areas and gap */
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}
.top-bar {
  /* Add grid-area: top */
  background: #1e293b;
  color: white;
  padding: 1rem;
  border-radius: 4px;
}
.side-nav {
  /* Add grid-area: nav */
  background: white;
  padding: 1rem;
  border-radius: 4px;
}
.main-data {
  /* Add grid-area: data */
  background: #2563eb;
  color: white;
  padding: 1rem;
  border-radius: 4px;
}`,
        starterJs: `console.log("Admin shell ready.");`,
        solutionHtml: `<div class="admin-shell">
  <div class="top-bar">Admin Topbar</div>
  <div class="side-nav">Navigation</div>
  <div class="main-data">Data Dashboard</div>
</div>`,
        solutionCss: `.admin-shell {
  display: grid;
  grid-template-columns: 160px 1fr;
  grid-template-areas:
    "top top"
    "nav data";
  gap: 12px;
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
}
.top-bar {
  grid-area: top;
  background: #1e293b;
  color: white;
  padding: 1rem;
  border-radius: 4px;
}
.side-nav {
  grid-area: nav;
  background: white;
  padding: 1rem;
  border-radius: 4px;
}
.main-data {
  grid-area: data;
  background: #2563eb;
  color: white;
  padding: 1rem;
  border-radius: 4px;
}`,
        solutionJs: `console.log("Admin shell ready.");`,
        hints: [
          'In .admin-shell, declare grid-template-areas: "top top" "nav data";.',
          'Assign grid-area: top to .top-bar, grid-area: nav to .side-nav, and grid-area: data to .main-data.'
        ],
        testCases: [
          {
            id: 'tc-05-4a',
            description: 'top-bar has grid-area: top',
            hint: 'Set grid-area: top on .top-bar',
            checkType: 'style-computed',
            target: '.top-bar',
            expectedValue: 'top'
          },
          {
            id: 'tc-05-4b',
            description: 'main-data has grid-area: data',
            hint: 'Set grid-area: data on .main-data',
            checkType: 'style-computed',
            target: '.main-data',
            expectedValue: 'data'
          }
        ],
        conceptQuestion: {
          question: 'What happens in grid-template-areas if one row has 3 words and the next row has only 2 words?',
          options: [
            'The entire grid-template-areas declaration is invalid and ignored by the browser',
            'The browser guesses the missing cell',
            'The third column automatically vanishes',
            'The page crashes'
          ],
          correctIndex: 0,
          explanation: 'Grid specifications require every row string in grid-template-areas to have the exact same number of cell tokens to form a valid rectangular matrix.'
        }
      },
      quiz: [
        {
          id: 'q-05-4',
          question: 'What symbol is used in grid-template-areas to denote an empty, unassigned cell?',
          options: ['A period (.)', 'An asterisk (*)', 'A question mark (?)', 'The word "null"'],
          correctIndex: 0,
          explanation: 'A dot / period (.) in grid-template-areas tells the browser that this cell should be left completely empty.'
        }
      ],
      summary: [
        'grid-template-areas provides human-readable visual ASCII layout mapping.',
        'Child items bind to named regions using grid-area: [name].',
        'Empty spacer cells are marked using a period (.).',
        'Redefining grid-template-areas in media queries allows effortless layout overhauls.'
      ],
      relatedTopics: [
        {
          title: 'Grid Alignment & Spacing',
          chapterNumber: '05',
          lessonId: 'ch-05-l-05',
          context: 'Master justify-items, align-items, justify-content, and align-content in Grid.'
        }
      ]
    },
    {
      id: 'ch-05-l-05',
      chapterId: 'ch-05',
      number: '5.5',
      slug: 'grid-alignment-and-spacing',
      title: 'Grid Alignment & Box Alignment Module',
      tagline: 'Master justify-items, align-items, justify-content, align-content, and place-items: center',
      durationMinutes: 20,
      learningObjectives: [
        'Understand the CSS Box Alignment Module as applied to 2D CSS Grid',
        'Learn the difference between aligning items within their cells vs aligning the entire track grid inside the container',
        'Master the legendary 1-line centering shorthand: place-items: center',
        'Use justify-self and align-self to position individual items within their grid cells'
      ],
      theorySections: [
        {
          heading: '1. The 4 Alignment Properties in Grid',
          content: 'CSS Grid implements the complete CSS Box Alignment Module, giving you separate controls for items inside cells versus the grid itself.',
          bulletPoints: [
            'justify-items: Aligns all child items along the inline (horizontal) axis within their respective cells',
            'align-items: Aligns all child items along the block (vertical) axis within their respective cells',
            'justify-content: Aligns the entire grid of columns within the parent container if total column width is less than container width',
            'align-content: Aligns the entire grid of rows within the parent container if total row height is less than container height'
          ]
        },
        {
          heading: '2. The 1-Line Ultimate Centering Shorthand',
          content: 'In CSS Grid, centering an element both horizontally and vertically inside a parent container requires only ONE single property!',
          bulletPoints: [
            'display: grid;',
            'place-items: center;',
            'place-items combines align-items and justify-items into a single concise declaration'
          ],
          callout: {
            type: 'key-rule',
            text: 'One-Line Centering: display: grid; place-items: center; is the cleanest, most modern way to center anything in web design.'
          }
        }
      ],
      realWorldAnalogy: {
        title: 'Centering a Postage Stamp on an Envelope',
        concept: 'place-items: center',
        story: 'If an envelope is a grid cell, place-items: center places the postage stamp at the exact geometric midpoint between top, bottom, left, and right edges. No rulers, no offsets, and no margin calculations required.',
        moral: 'place-items: center is the fastest, cleanest centering tool in modern CSS.',
        icon: 'Box'
      },
      visualType: 'css-grid',
      codeExample: {
        title: 'The 1-Line place-items: center Pattern',
        description: 'Watch how display: grid with place-items: center locks the modal right into the middle.',
        html: `<div class="hero-stage">
  <div class="centered-modal">
    <h3>Instant 2D Center</h3>
    <p>Centered with display: grid and place-items: center.</p>
  </div>
</div>`,
        css: `.hero-stage {
  display: grid;
  place-items: center;
  height: 200px;
  background: #f1f5f9;
  border-radius: 8px;
  border: 1px dashed #cbd5e1;
}
.centered-modal {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.centered-modal h3 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}`,
        breakdown: [
          {
            lineRange: 'Line 2-3',
            title: 'display: grid; place-items: center;',
            explanation: 'Instantly centers the modal horizontally and vertically with zero boilerplate.',
            highlightTokens: ['display: grid', 'place-items: center']
          }
        ]
      },
      video: {
        title: 'Grid Alignment Module: justify vs align and place-items',
        duration: '11:50',
        description: 'Visual breakdown of cell-level alignment vs grid-level alignment, and place-self overrides.',
        keyPoints: [
          'justify-items vs justify-content',
          'The place-items: center shorthand',
          'Overriding individual cells with place-self'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Cell Alignment', description: 'justify-items & align-items' },
          { time: '04:15', seconds: 255, title: 'Container Alignment', description: 'justify-content & align-content' },
          { time: '08:00', seconds: 480, title: 'place-items: center', description: '1-line centering' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'place-items: center is the ultimate CSS trick that every developer should know.' }
        ],
        demoAnimationType: 'grid-tracks'
      },
      practice: {
        id: 'prac-05-05',
        title: 'Center a Notification Dialog with place-items: center',
        difficulty: 'Beginner',
        estimatedTime: '10 min',
        prompt: 'Style a modal backdrop container (<div class="backdrop">) with display: grid, place-items: center, and min-height: 180px so its child card is centered in both dimensions.',
        instructions: [
          'Set display: grid on .backdrop',
          'Set place-items: center on .backdrop',
          'Set min-height: 180px'
        ],
        starterHtml: `<div class="backdrop">
  <div class="dialog-card">
    <h4>Changes Saved</h4>
    <p>Your profile preferences have been updated.</p>
  </div>
</div>`,
        starterCss: `.backdrop {
  /* Add display: grid, place-items: center, and min-height */
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.dialog-card {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  text-align: center;
}`,
        starterJs: `console.log("Backdrop ready.");`,
        solutionHtml: `<div class="backdrop">
  <div class="dialog-card">
    <h4>Changes Saved</h4>
    <p>Your profile preferences have been updated.</p>
  </div>
</div>`,
        solutionCss: `.backdrop {
  display: grid;
  place-items: center;
  min-height: 180px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.dialog-card {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  text-align: center;
}`,
        solutionJs: `console.log("Backdrop ready.");`,
        hints: [
          'Set display: grid; on .backdrop.',
          'Set place-items: center; on .backdrop.',
          'Set min-height: 180px;.'
        ],
        testCases: [
          {
            id: 'tc-05-5a',
            description: 'backdrop has place-items: center',
            hint: 'Set place-items: center on .backdrop',
            checkType: 'style-computed',
            target: '.backdrop',
            expectedValue: 'center'
          }
        ],
        conceptQuestion: {
          question: 'What two properties are combined by the place-items shorthand in CSS Grid?',
          options: [
            'align-items and justify-items',
            'margin and padding',
            'grid-template-columns and grid-template-rows',
            'top and left'
          ],
          correctIndex: 0,
          explanation: 'place-items: [align-items] [justify-items] (or a single value to apply to both axes simultaneously).'
        }
      },
      quiz: [
        {
          id: 'q-05-5',
          question: 'How do you center an individual item inside its own grid cell without affecting any sibling cells?',
          options: [
            'place-self: center on that specific child item',
            'text-align: center on the parent',
            'margin: 0 auto on the body',
            'position: center'
          ],
          correctIndex: 0,
          explanation: 'place-self: center is declared directly on a child grid item to override cell-level alignment.'
        }
      ],
      summary: [
        'justify-items and align-items position items inside their respective grid cells.',
        'justify-content and align-content position the entire grid inside its container.',
        'display: grid; place-items: center; centers anything in a single line of CSS.',
        'place-self provides surgical alignment overrides for individual items.'
      ],
      relatedTopics: [
        {
          title: 'Responsive Grid Layout Project',
          chapterNumber: '05',
          lessonId: 'ch-05-l-06',
          context: 'Build a production-ready bento dashboard layout combining all Grid techniques.'
        }
      ]
    },
    {
      id: 'ch-05-l-06',
      chapterId: 'ch-05',
      number: '5.6',
      slug: 'responsive-grid-project',
      title: 'Responsive Grid Layout Project: Bento Dashboard',
      tagline: 'Build a modern Apple-style bento box analytics dashboard with spanned cards and responsive columns',
      durationMinutes: 30,
      learningObjectives: [
        'Synthesize 2D grid tracks, auto-fit, minmax, and line spanning into a real-world bento UI',
        'Build a multi-tile analytics dashboard featuring a hero KPI tile, tall metric chart, and standard data cards',
        'Ensure the bento layout reflows gracefully onto a single-column layout on mobile viewports',
        'Audit grid tracks, cell padding, and typography contrast'
      ],
      theorySections: [
        {
          heading: '1. The Bento Box UI Pattern',
          content: 'Popularized by Apple product presentation slides and modern SaaS dashboards, Bento Box design arranges varied-size rectangular tiles in an asymmetrical, visually intriguing, but strictly aligned grid.',
          bulletPoints: [
            'Hero Tile: Spans 2 columns and 1 row for the dominant visual or KPI',
            'Tall Tile: Spans 1 column and 2 rows for vertical lists or activity feeds',
            'Standard Tiles: 1x1 cells for quick metric readouts'
          ]
        },
        {
          heading: '2. Bento Grid Responsive Strategy',
          content: 'On wide desktop monitors, the bento grid runs with 4 columns. On tablets, it drops to 2 columns. On mobile phones, all items collapse into a clean 1-column vertical feed.',
          bulletPoints: [
            'Desktop (4-col): grid-template-columns: repeat(4, 1fr)',
            'Mobile (1-col): grid-template-columns: 1fr; (all spans reset to span 1)'
          ]
        }
      ],
      realWorldAnalogy: {
        title: 'The Japanese Bento Lunchbox',
        concept: 'Modular Varied Compartments',
        story: 'A traditional Japanese bento lunchbox has clean lacquered compartments of different shapes: a wide compartment for rice and grilled salmon, a tall narrow slot for chopsticks and pickled ginger, and small square slots for fruit and dumplings. Every item has its own distinct frame, yet the entire box closes into one harmonious rectangle.',
        moral: 'Bento design organizes diverse content into harmonious, visually delightful compartments.',
        icon: 'Grid'
      },
      visualType: 'css-grid',
      codeExample: {
        title: 'Modern Bento Box Analytics Dashboard',
        description: 'Complete bento dashboard layout with hero metric, tall activity feed, and metric cards.',
        html: `<div class="bento-dashboard">
  <div class="bento-card hero-kpi">
    <span class="label">Monthly Recurring Revenue</span>
    <div class="value">$48,250</div>
    <span class="badge-up">+14.2% from last month</span>
  </div>
  <div class="bento-card tall-feed">
    <h4>Recent Activity</h4>
    <p>User #402 completed Ch 04</p>
    <p>User #891 earned Certification</p>
  </div>
  <div class="bento-card">
    <span class="label">Active Students</span>
    <div class="value">2,840</div>
  </div>
  <div class="bento-card">
    <span class="label">Completion Rate</span>
    <div class="value">88.4%</div>
  </div>
</div>`,
        css: `.bento-dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
}
.bento-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.hero-kpi {
  grid-column: span 2;
  background: #1e1b4b;
  color: white;
}
.hero-kpi .value {
  font-size: 2rem;
  font-weight: 800;
  color: #38bdf8;
  margin: 0.5rem 0;
}
.tall-feed {
  grid-row: span 2;
}
.label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
}
.value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}`,
        breakdown: [
          {
            lineRange: 'Line 14-18',
            title: 'Hero KPI (grid-column: span 2)',
            explanation: 'Gives the primary revenue metric dominant visual hierarchy across 2 columns.',
            highlightTokens: ['grid-column: span 2']
          },
          {
            lineRange: 'Line 26-28',
            title: 'Tall Feed (grid-row: span 2)',
            explanation: 'Extends the activity feed down through 2 full rows along the right edge.',
            highlightTokens: ['grid-row: span 2']
          }
        ]
      },
      video: {
        title: 'Building an Apple-Style Bento Dashboard with CSS Grid',
        duration: '18:10',
        description: 'Step-by-step creation of an asymmetrical bento dashboard, subtle shadows, and responsive collapse.',
        keyPoints: [
          'Setting up the 3-column base canvas',
          'Spanning hero and vertical cards',
          'Responsive collapse on smaller screens'
        ],
        timestamps: [
          { time: '00:00', seconds: 0, title: 'Bento Design Theory', description: 'Why bento grids work' },
          { time: '05:30', seconds: 330, title: 'The Grid Framework', description: 'Building the tiles' },
          { time: '11:15', seconds: 675, title: 'Responsive Testing', description: 'Testing viewport resizing' }
        ],
        transcript: [
          { speaker: 'Instructor', time: '00:00', seconds: 0, text: 'Bento box layouts are the pinnacle of modern front-end CSS Grid craftsmanship.' }
        ],
        demoAnimationType: 'grid-tracks'
      },
      practice: {
        id: 'prac-05-06',
        title: 'Build a Bento Analytics Dashboard',
        difficulty: 'Intermediate',
        estimatedTime: '15 min',
        prompt: 'Create a bento layout (<div class="bento-box">) with 3 columns (repeat(3, 1fr)) and gap: 16px. Give .featured-tile grid-column: span 2, and .tall-tile grid-row: span 2.',
        instructions: [
          'Set display: grid, grid-template-columns: repeat(3, 1fr), and gap: 16px on .bento-box',
          'Set grid-column: span 2 on .featured-tile',
          'Set grid-row: span 2 on .tall-tile'
        ],
        starterHtml: `<div class="bento-box">
  <div class="tile featured-tile">Featured Metric (Span 2 Cols)</div>
  <div class="tile tall-tile">Activity Feed (Span 2 Rows)</div>
  <div class="tile">Metric A</div>
  <div class="tile">Metric B</div>
</div>`,
        starterCss: `.bento-box {
  /* Add grid properties */
  background: #f1f5f9;
  padding: 1.5rem;
  border-radius: 8px;
}
.tile {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.featured-tile {
  /* Add grid-column: span 2 */
  background: #312e81;
  color: white;
}
.tall-tile {
  /* Add grid-row: span 2 */
}`,
        starterJs: `console.log("Bento project active.");`,
        solutionHtml: `<div class="bento-box">
  <div class="tile featured-tile">Featured Metric (Span 2 Cols)</div>
  <div class="tile tall-tile">Activity Feed (Span 2 Rows)</div>
  <div class="tile">Metric A</div>
  <div class="tile">Metric B</div>
</div>`,
        solutionCss: `.bento-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: #f1f5f9;
  padding: 1.5rem;
  border-radius: 8px;
}
.tile {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.featured-tile {
  grid-column: span 2;
  background: #312e81;
  color: white;
}
.tall-tile {
  grid-row: span 2;
}`,
        solutionJs: `console.log("Bento project active.");`,
        hints: [
          'Set display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; on .bento-box.',
          'Set grid-column: span 2 on .featured-tile and grid-row: span 2 on .tall-tile.'
        ],
        testCases: [
          {
            id: 'tc-05-6a',
            description: 'featured-tile spans 2 columns',
            hint: 'Set grid-column: span 2 on .featured-tile',
            checkType: 'style-computed',
            target: '.featured-tile',
            expectedValue: 'span 2'
          },
          {
            id: 'tc-05-6b',
            description: 'tall-tile spans 2 rows',
            hint: 'Set grid-row: span 2 on .tall-tile',
            checkType: 'style-computed',
            target: '.tall-tile',
            expectedValue: 'span 2'
          }
        ],
        conceptQuestion: {
          question: 'Why is CSS Grid ideal for bento-style dashboard layouts compared to Flexbox?',
          options: [
            'CSS Grid allows items to span both horizontal columns and vertical rows simultaneously with strict alignment',
            'Flexbox cannot render colors',
            'CSS Grid takes up less memory',
            'Flexbox is obsolete'
          ],
          correctIndex: 0,
          explanation: 'CSS Grid was engineered for true two-dimensional coordinate layouts, making multi-column and multi-row bento spans effortless.'
        }
      },
      quiz: [
        {
          id: 'q-05-6',
          question: 'What is the most effective way to collapse a 3-column bento grid into a mobile-friendly single column?',
          options: [
            'In a media query, set grid-template-columns: 1fr and reset item spans to auto or 1',
            'Change font size to 10px',
            'Set display: none on the entire grid',
            'Rotate the screen'
          ],
          correctIndex: 0,
          explanation: 'Setting grid-template-columns: 1fr on mobile collapses all tiles into an ergonomic single-column vertical feed.'
        }
      ],
      summary: [
        'Bento box design combines varying tile sizes into a unified 2D grid.',
        'grid-column: span 2 and grid-row: span 2 establish focal hierarchy.',
        'CSS Grid + Flexbox combination: Grid arranges tiles, Flexbox aligns tile contents.',
        'Chapter 05 equips you with production-grade two-dimensional layout mastery.'
      ],
      relatedTopics: [
        {
          title: 'JavaScript Basics & Logic',
          chapterNumber: '06',
          lessonId: 'ch-06-l-01',
          context: 'Bring your layouts to life with JavaScript variables, functions, and logic.'
        }
      ]
    }
  ]
};
