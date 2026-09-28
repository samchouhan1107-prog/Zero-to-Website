import os
from templates import create_lesson_html, create_practice_html

# ==========================================
# Chapter 08: Bootstrap Framework (7 Lessons)
# ==========================================
ch08_lessons = [
    {
        "num": "01",
        "dir": "Lesson-01-Bootstrap-Introduction",
        "title": "Bootstrap 5 Fundamentals & Modern CDN Setup",
        "tagline": "Kickstart frontend development with Bootstrap 5: CSS reset (Reboot), bundle JS, and responsive container roots.",
        "duration": "25 mins",
        "summary": [
            {"title": "Ecosystem", "desc": "No jQuery dependency in v5"},
            {"title": "Reboot", "desc": "Normalize.css + opinionated resets"},
            {"title": "CDN", "desc": "Single CSS link + JS bundle script"},
            {"title": "Containers", "desc": ".container vs .container-fluid"}
        ],
        "objectives": [
            "Link Bootstrap 5 via CDN without legacy jQuery baggage",
            "Understand how Bootstrap Reboot normalizes margins, fonts, and box-sizing",
            "Choose between fixed responsive containers (.container) and full-bleed (.container-fluid)",
            "Combine pre-built component classes with custom brand CSS seamlessly"
        ],
        "sections": [
            {
                "heading": "1. Why Bootstrap 5 Matters in Modern Development",
                "content": "Bootstrap 5 is completely rewritten in modern vanilla JavaScript (dropping jQuery). It provides a robust, battle-tested library of accessible UI components that allow rapid prototyping and production-grade responsive structures in minutes.",
                "bullets": [
                    "<link href='...bootstrap.min.css' rel='stylesheet'> in head",
                    "<script src='...bootstrap.bundle.min.js' defer> before body end"
                ]
            }
        ],
        "code": """<!-- Bootstrap 5 CDN Simulation -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="container py-4">
  <div class="p-4 mb-3 bg-light rounded-3 border">
    <h1 class="display-6 fw-bold text-primary">Bootstrap 5 is Active!</h1>
    <p class="col-md-8 fs-6 text-secondary">
      Rapidly build modern, mobile-friendly interfaces using Bootstrap's standardized utilities and component library.
    </p>
    <button class="btn btn-primary btn-md">Get Started</button>
  </div>
</div>""",
        "practice": {
            "title": "Container & Hero Callout Construction",
            "desc": "Create a Bootstrap 5 hero section with container-fluid wrapper, rounded border, display heading, and call-to-action button.",
            "tasks": [
                "Include Bootstrap CSS link in the playground head",
                "Wrap your layout in a .container with vertical padding .py-5",
                "Use .display-5 font utility for prominent headline hierarchy",
                "Add primary and outline secondary action buttons"
            ],
            "starter": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="container py-4">
  <div class="p-4 bg-white border rounded-4 shadow-sm text-center">
    <span class="badge bg-primary-subtle text-primary mb-2">Bootstrap 5.3 Ready</span>
    <h1 class="display-6 fw-bold text-dark">Build Faster with Industry Standards</h1>
    <p class="text-muted mx-auto" style="max-width: 500px;">
      Empowering developers aged 15+ to assemble responsive enterprise UIs without rewriting repetitive boilerplate.
    </p>
    <div class="d-flex justify-content-center gap-2 mt-3">
      <button class="btn btn-primary">Start Track</button>
      <button class="btn btn-outline-secondary">View Showcase</button>
    </div>
  </div>
</div>"""
        }
    },
    {
        "num": "02",
        "dir": "Lesson-02-Bootstrap-Grid-System",
        "title": "The 12-Column Grid & Responsive Breakpoints",
        "tagline": "Master Bootstrap's flexbox grid: .row, .col-*, auto-layout, column wrapping, and responsive gutters (.g-*).",
        "duration": "30 mins",
        "summary": [
            {"title": "12 Columns", "desc": "Sum of col spans in a row = 12"},
            {"title": "Tiers", "desc": "col-, col-sm-, col-md-, col-lg-, col-xl-"},
            {"title": "Gutters", "desc": "g-0 through g-5 spacing"},
            {"title": "Alignment", "desc": "align-items-center & justify-content"}
        ],
        "objectives": [
            "Calculate 12-column subdivisions accurately across multiple screen sizes",
            "Use responsive column classes like .col-12 .col-md-6 .col-lg-4 for multi-device adaptation",
            "Control inter-column spacing cleanly using gutter utilities (.g-3, .gx-4, .gy-2)",
            "Implement auto-layout columns (.col) that divide remaining space equally"
        ],
        "sections": [
            {
                "heading": "1. The 12-Column Formula",
                "content": "Every Bootstrap grid is constructed of a .container, holding one or more .rows, containing .col elements. Because 12 is divisible by 1, 2, 3, 4, and 6, you can create halves (.col-6), thirds (.col-4), quarters (.col-3), or asymmetrical sidebars (.col-md-8 + .col-md-4).",
                "bullets": [
                    "Full width on mobile, 2 columns on tablet, 3 columns on desktop: class='col-12 col-md-6 col-lg-4'",
                    "Automatic wrap: Any columns exceeding 12 within a row wrap to a new line cleanly"
                ]
            }
        ],
        "code": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="container py-3">
  <div class="row g-2">
    <div class="col-12 col-md-8">
      <div class="p-3 bg-primary text-white text-center rounded">Main Content (.col-md-8)</div>
    </div>
    <div class="col-12 col-md-4">
      <div class="p-3 bg-secondary text-white text-center rounded">Sidebar (.col-md-4)</div>
    </div>
  </div>
</div>""",
        "practice": {
            "title": "Responsive 3-Tier Dashboard Grid",
            "desc": "Build a responsive grid featuring a full-width header, 3 metric cards (col-md-4), and an asymmetrical 8/4 content split.",
            "tasks": [
                "Create a .row with 3 metric cards using col-12 col-md-4",
                "Add an inter-card gutter using class 'g-3'",
                "Add a secondary row with main chart (col-md-8) and side activity feed (col-md-4)",
                "Ensure borders and padding are consistent across all tiles"
            ],
            "starter": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="container py-4">
  <h4 class="mb-3 text-dark fw-bold">Performance Dashboard</h4>
  <!-- Metric Cards Row -->
  <div class="row g-3 mb-3">
    <div class="col-12 col-md-4">
      <div class="p-3 bg-light border rounded-3">
        <div class="text-muted small">Completed Lessons</div>
        <div class="h3 fw-bold text-primary mb-0">52 / 52</div>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="p-3 bg-light border rounded-3">
        <div class="text-muted small">Practice Score</div>
        <div class="h3 fw-bold text-success mb-0">100%</div>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="p-3 bg-light border rounded-3">
        <div class="text-muted small">Developer Level</div>
        <div class="h3 fw-bold text-info mb-0">Senior Ready</div>
      </div>
    </div>
  </div>
</div>"""
        }
    },
    {
        "num": "03",
        "dir": "Lesson-03-Typography-Colors-Spacing",
        "title": "Typography, Color Palettes & Spacing Utilities",
        "tagline": "Style interfaces rapidly: margins (.m-*), paddings (.p-*), contextual colors (primary, success, dark), and text utilities.",
        "duration": "25 mins",
        "summary": [
            {"title": "Spacing", "desc": "m-*, mt-*, mb-*, p-*, px-*, py-* (0 to 5)"},
            {"title": "Contextual Colors", "desc": "primary, secondary, success, danger, dark"},
            {"title": "Text Utilities", "desc": "text-center, fw-bold, text-truncate"},
            {"title": "Borders", "desc": "border, rounded-pill, shadow-sm"}
        ],
        "objectives": [
            "Apply the 5-step Bootstrap spacing scale (0.25rem to 3rem) systematically",
            "Combine contextual color classes (.bg-success-subtle, .text-success-emphasis)",
            "Format headlines and lead paragraphs using .lead and .text-muted",
            "Apply subtle elevations using .shadow-sm and .shadow-lg"
        ],
        "sections": [
            {
                "heading": "1. Spacing Scale and Semantic Naming",
                "content": "Bootstrap provides directional spacing: t (top), b (bottom), s (start/left), e (end/right), x (horizontal), and y (vertical). Scale 1=4px, 2=8px, 3=16px, 4=24px, 5=48px.",
                "bullets": [
                    "my-4: Vertical margin top & bottom of 24px",
                    "p-3: Inner padding on all sides of 16px",
                    "text-body-secondary: Accessible muted neutral text"
                ]
            }
        ],
        "code": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="container py-3">
  <div class="p-3 mb-2 bg-primary-subtle text-primary-emphasis rounded border border-primary-subtle">
    <strong>Info Alert:</strong> Modern subtle contextual styles in Bootstrap 5.3!
  </div>
  <div class="p-3 bg-success-subtle text-success-emphasis rounded border border-success-subtle">
    <strong>Success:</strong> Practice challenge verified with zero warnings.
  </div>
</div>""",
        "practice": {
            "title": "Contextual Notification Card Palette",
            "desc": "Build a multi-card status board using Bootstrap color, spacing, and typography utilities.",
            "tasks": [
                "Create a warning card using .bg-warning-subtle and .text-warning-emphasis",
                "Create a danger error card using .bg-danger-subtle and .text-danger-emphasis",
                "Apply .rounded-3 and .border utilities",
                "Use .fw-semibold and .text-uppercase for headers"
            ],
            "starter": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="container py-4">
  <div class="vstack gap-2" style="max-width: 480px; margin: auto;">
    <div class="p-3 bg-info-subtle text-info-emphasis border border-info-subtle rounded-3 d-flex align-items-center justify-content-between">
      <div>
        <div class="fw-bold">Level Assessment Pending</div>
        <small>Submit practice challenge to calculate skill badge.</small>
      </div>
      <span class="badge bg-info text-dark">Action Required</span>
    </div>
  </div>
</div>"""
        }
    },
    {
        "num": "04",
        "dir": "Lesson-04-Buttons-Cards-Badges",
        "title": "Buttons, Cards, Badges & Elevational Shadows",
        "tagline": "Compose high-retention UI building blocks: .btn, .card, .badge, and soft elevation classes.",
        "duration": "30 mins",
        "summary": [
            {"title": "Buttons", "desc": "btn-primary, btn-outline-*, btn-sm, btn-lg"},
            {"title": "Cards", "desc": "card-header, card-body, card-footer"},
            {"title": "Badges", "desc": "badge bg-primary rounded-pill"},
            {"title": "Elevation", "desc": "shadow-none, shadow-sm, shadow"}
        ],
        "objectives": [
            "Construct structured cards with media headers, bodies, and interactive footers",
            "Utilize outline and ghost button states for clear hierarchy",
            "Embed status badges into cards and lists",
            "Apply elevation shadows with mathematical subtlety"
        ],
        "sections": [
            {
                "heading": "1. The Anatomy of a Bootstrap Card",
                "content": "A .card is a flexible container with light border and clean border-radius. It encapsulates related information with distinct subcomponents.",
                "bullets": [
                    ".card-body: Main padded container",
                    ".card-title & .card-text: Typographic presets",
                    ".card-footer: Subtle bottom bar for actions and metadata"
                ]
            }
        ],
        "code": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="container py-3">
  <div class="card shadow-sm" style="max-width: 320px; margin: auto;">
    <div class="card-body">
      <span class="badge bg-success mb-2">Verified Skill</span>
      <h5 class="card-title">Bootstrap 5 Specialist</h5>
      <p class="card-text text-muted small">Demonstrates proficiency in responsive grid architecture and utility classes.</p>
      <a href="#" class="btn btn-primary btn-sm">View Certificate</a>
    </div>
  </div>
</div>""",
        "practice": {
            "title": "Interactive Product & Course Pricing Card",
            "desc": "Build a pricing tier card featuring a badge, large price tag, feature list, and prominent action button.",
            "tasks": [
                "Build a .card with .shadow-sm and .border-primary accent",
                "Add a rounded pill badge 'Most Popular' at top",
                "Include a feature list with checkmark icons or emojis",
                "Add a full-width .btn.btn-primary action button in the card footer"
            ],
            "starter": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="container py-4">
  <div class="card border-primary shadow-sm mx-auto" style="max-width: 340px;">
    <div class="card-header bg-primary text-white text-center py-3">
      <span class="badge bg-warning text-dark rounded-pill mb-1">PRO DEVELOPER</span>
      <h4 class="my-0 fw-bold">Full-Stack Track</h4>
    </div>
    <div class="card-body p-4 text-center">
      <h1 class="card-title pricing-card-title fw-bold">$0 <small class="text-muted fw-light">/ free</small></h1>
      <ul class="list-unstyled mt-3 mb-4 text-start small">
        <li class="py-1">✔ Complete 52 Structured Lessons</li>
        <li class="py-1">✔ Interactive Practice Sandboxes</li>
        <li class="py-1">✔ Age 15+ Assessment Matrix</li>
        <li class="py-1">✔ Cloud Production Capstone</li>
      </ul>
      <button class="w-100 btn btn-lg btn-primary">Enroll Now</button>
    </div>
  </div>
</div>"""
        }
    },
    {
        "num": "05",
        "dir": "Lesson-05-Navbars-Headers",
        "title": "Responsive Navbars, Brand Headers & Toggles",
        "tagline": "Build mobile-collapsible navigation: .navbar, .navbar-expand-lg, hamburger toggle, and brand logos.",
        "duration": "30 mins",
        "summary": [
            {"title": "Expansion", "desc": "navbar-expand-md / lg"},
            {"title": "Toggler", "desc": "navbar-toggler with icon"},
            {"title": "Collapse", "desc": "collapse navbar-collapse wrapper"},
            {"title": "Dark Mode", "desc": "data-bs-theme='dark'"}
        ],
        "objectives": [
            "Configure accessible navigation headers with .navbar and .navbar-brand",
            "Set breakpoint expansion (.navbar-expand-lg) for desktop inline links",
            "Wire Bootstrap's JavaScript bundle for hamburger toggling without custom scripts",
            "Implement active link states (.nav-link.active) and alignment utilities"
        ],
        "sections": [
            {
                "heading": "1. The Navbar Collapse Mechanism",
                "content": "Bootstrap navbars use data-bs-toggle='collapse' and data-bs-target='#navTarget' to expand and collapse on mobile screens without requiring any manual JavaScript code.",
                "bullets": [
                    "<button class='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#navContent'>",
                    "<div class='collapse navbar-collapse' id='navContent'>"
                ]
            }
        ],
        "code": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
  <div class="container">
    <a class="navbar-brand fw-bold text-primary" href="#">WZ Storehouse</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#demoNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="demoNav">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Curriculum</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Practice</a></li>
      </ul>
    </div>
  </div>
</nav>""",
        "practice": {
            "title": "Dark Theme Accessible Navbar",
            "desc": "Build a dark-themed responsive navbar with search input, dropdown menu, and user avatar.",
            "tasks": [
                "Apply data-bs-theme='dark' to the navbar element",
                "Add an inline search input with outline button",
                "Ensure smooth toggling on mobile viewports",
                "Verify brand logo links correctly to home root"
            ],
            "starter": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<nav class="navbar navbar-expand-md bg-dark border-bottom border-secondary" data-bs-theme="dark">
  <div class="container">
    <a class="navbar-brand fw-bold text-warning" href="#">⚡ DevForge</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navDark">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navDark">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item"><a class="nav-link active" href="#">Tracks</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Sandbox</a></li>
      </ul>
      <button class="btn btn-outline-warning btn-sm">Sign In</button>
    </div>
  </div>
</nav>"""
        }
    },
    {
        "num": "06",
        "dir": "Lesson-06-Modals-Forms-Alerts",
        "title": "Modals, Forms, Accordions & Interactive Feedback",
        "tagline": "Master rich user input: floating labels, modal dialogs, collapsible accordions, and dismissible alerts.",
        "duration": "35 mins",
        "summary": [
            {"title": "Modals", "desc": "modal, modal-dialog, modal-content"},
            {"title": "Forms", "desc": "form-control, form-floating, form-select"},
            {"title": "Accordions", "desc": "accordion-item & accordion-collapse"},
            {"title": "Dismissible", "desc": "alert-dismissible with data-bs-dismiss"}
        ],
        "objectives": [
            "Build accessible modal dialogs with backdrop blur and keyboard escape exit",
            "Use modern floating label inputs (.form-floating) for compact forms",
            "Create collapsible FAQ accordions that keep only one item open at a time",
            "Provide dismissible feedback alerts using data-bs-dismiss='alert'"
        ],
        "sections": [
            {
                "heading": "1. Modern Floating Labels and Dialogs",
                "content": "Bootstrap 5 floating labels provide clean Google Material-style inputs where the placeholder smoothly animates into a top label when focused.",
                "bullets": [
                    "<div class='form-floating mb-3'><input class='form-control' placeholder='name@domain.com'><label>Email address</label></div>",
                    "Accessible modals prevent background scroll and trap focus automatically"
                ]
            }
        ],
        "code": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<div class="container py-3 text-center">
  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#infoModal">
    Open Registration Modal ⚡
  </button>

  <div class="modal fade" id="infoModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-start">
        <div class="modal-header">
          <h5 class="modal-title fw-bold">Student Registration</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="fName" placeholder="Alex">
            <label for="fName">Developer Handle</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Profile</button>
        </div>
      </div>
    </div>
  </div>
</div>""",
        "practice": {
            "title": "Interactive Feedback & Modal Dialog Form",
            "desc": "Build a modal checkout/confirmation window with floating label inputs and validation feedback.",
            "tasks": [
                "Create a modal dialog with .modal-dialog-centered",
                "Add two .form-floating inputs (Name and Email)",
                "Add a dismissible success alert inside the page",
                "Test modal opening and closing cleanly"
            ],
            "starter": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<div class="container py-4">
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Success!</strong> All curriculum files are compiled and ready.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  </div>
  <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#practiceModal">Launch Dialog</button>

  <div class="modal fade" id="practiceModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Verification Gate</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p class="text-muted">Enter verification credentials to register completion.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</div>"""
        }
    },
    {
        "num": "07",
        "dir": "Lesson-07-Bootstrap-Landing-Page",
        "title": "Chapter 08 Capstone: Full Bootstrap Landing Page",
        "tagline": "Synthesize all Chapter 08 components: Navbar, 12-column grid, feature cards, pricing table, and footer.",
        "duration": "45 mins",
        "summary": [
            {"title": "Architecture", "desc": "Multi-section commercial landing page"},
            {"title": "Grid", "desc": "12-column responsive layout"},
            {"title": "Componentry", "desc": "Navbar, Hero, Features, Pricing & Footer"},
            {"title": "Speed", "desc": "Assembled in under 15 minutes"}
        ],
        "objectives": [
            "Assemble a complete, production-ready landing page using Bootstrap 5 classes",
            "Maintain clean vertical rhythm and typographic hierarchy",
            "Ensure mobile hamburger navigation and modals operate without glitches",
            "Achieve instant responsive perfection across mobile, tablet, and desktop"
        ],
        "sections": [
            {
                "heading": "1. The Rapid Prototyping Workflow",
                "content": "Professional agencies use Bootstrap to prototype validated interfaces at lightning speed. By combining standardized grid rows with pre-styled cards and navbars, you produce enterprise-ready apps with minimal custom CSS.",
                "bullets": [
                    "Section 1: Responsive sticky navbar",
                    "Section 2: Hero section with dual call-to-actions",
                    "Section 3: 3-column feature grid with hover cards",
                    "Section 4: Minimalist responsive footer"
                ]
            }
        ],
        "code": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="container py-4">
  <div class="p-5 text-center bg-body-tertiary rounded-3 border mb-4">
    <h1 class="text-body-emphasis fw-bold">Enterprise Software Made Simple</h1>
    <p class="col-lg-8 mx-auto fs-5 text-muted">
      Zero-to-Website: Full curriculum from age 15+ up to cloud deployment.
    </p>
    <div class="d-inline-flex gap-2">
      <button class="btn btn-primary btn-lg px-4">Start Learning</button>
      <button class="btn btn-outline-secondary btn-lg px-4">Browse Chapters</button>
    </div>
  </div>
</div>""",
        "practice": {
            "title": "Complete Bootstrap Showcase Page",
            "desc": "Build a responsive landing page featuring a hero banner, 3 feature columns, and an email newsletter form.",
            "tasks": [
                "Assemble the hero with .bg-light and .rounded-3",
                "Create a 3-column feature section using .row and .col-md-4",
                "Add an email subscribe input group with .input-group and .btn-primary",
                "Add a responsive copyright footer"
            ],
            "starter": """<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<div class="container py-4">
  <!-- Hero -->
  <div class="p-4 p-md-5 mb-4 rounded-4 bg-primary text-white text-center">
    <h1 class="display-5 fw-bold">Master Modern Web Development</h1>
    <p class="lead mb-4">52 Structured Lessons • Interactive Sandboxes • Zero Plagiarism</p>
    <button class="btn btn-light btn-lg fw-bold text-primary">Get Started Free</button>
  </div>

  <!-- Features Row -->
  <div class="row g-4 text-center">
    <div class="col-md-4">
      <div class="p-4 border rounded-3 bg-white shadow-sm h-100">
        <h4 class="fw-bold text-primary">📱 Mobile First</h4>
        <p class="text-muted small">Every layout scales smoothly across smartphones, tablets, and desktops.</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="p-4 border rounded-3 bg-white shadow-sm h-100">
        <h4 class="fw-bold text-success">⚡ CSS Grid &amp; Flex</h4>
        <p class="text-muted small">2D matrix layout engine without messy floats or rigid pixel hacks.</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="p-4 border rounded-3 bg-white shadow-sm h-100">
        <h4 class="fw-bold text-info">🚀 Production CI/CD</h4>
        <p class="text-muted small">Git workflows, Cloud Run, Vercel, and GitHub Actions deployments.</p>
      </div>
    </div>
  </div>
</div>"""
        }
    }
]

# Write Chapter 08
ch08_base = "Chapters/Chapter-08-Bootstrap"
for item in ch08_lessons:
    ldir = os.path.join(ch08_base, item["dir"])
    os.makedirs(ldir, exist_ok=True)
    lhtml = create_lesson_html("08", "Chapter 08: Bootstrap", item["num"], item["title"], item["tagline"], item["duration"], item["summary"], item["objectives"], item["sections"], item["code"])
    with open(os.path.join(ldir, "lesson.html"), "w", encoding="utf-8") as f:
        f.write(lhtml)
    phtml = create_practice_html("08", "Chapter 08: Bootstrap", item["num"], item["practice"]["title"], item["practice"]["desc"], item["practice"]["tasks"], item["practice"]["starter"])
    with open(os.path.join(ldir, "practice.html"), "w", encoding="utf-8") as f:
        f.write(phtml)

print("Chapter 08 files written.")

# ==========================================
# Chapter 09: Git & GitHub (6 Lessons)
# ==========================================
ch09_lessons = [
    {
        "num": "01",
        "dir": "Lesson-01-Version-Control-Basics",
        "title": "Version Control Systems & Git Core Philosophy",
        "tagline": "Understand distributed version control, immutable commit history, snapshots, and team collaboration.",
        "duration": "25 mins",
        "summary": [
            {"title": "DVCS", "desc": "Distributed Version Control (every clone is a full repo)"},
            {"title": "Snapshots", "desc": "Git records snapshots, not file diffs"},
            {"title": "Three States", "desc": "Working Directory, Staging (Index), Repository"},
            {"title": "Integrity", "desc": "Cryptographic SHA-1/SHA-256 commit hashes"}
        ],
        "objectives": [
            "Understand why Git replaced centralized systems like SVN",
            "Differentiate between the three trees: Working Directory, Staging Area, and Git Directory (.git)",
            "Configure user identity with git config --global user.name and user.email",
            "Understand how commit hashes ensure complete cryptographic history tamper-resistance"
        ],
        "sections": [
            {
                "heading": "1. What is Git and Why is it Universal?",
                "content": "Created by Linus Torvalds in 2005, Git is a distributed version control system (DVCS). Unlike older systems that require constant server connection, Git stores the entire repository history locally on your computer.",
                "bullets": [
                    "Offline-capable: Commit, branch, and inspect history without internet",
                    "Safety net: Every change is recorded; you can roll back to any point in time"
                ]
            }
        ],
        "code": """<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 20px; border-radius: 8px; line-height: 1.6;">
  <span style="color: #94a3b8;"># Initializing Developer Identity</span><br>
  $ git config --global user.name "Sameer Chouhan"<br>
  $ git config --global user.email "sameer@wzstorehouse.dev"<br>
  $ git config --global init.defaultBranch main<br>
  <br>
  <span style="color: #4ade80;">✔ Global git configuration confirmed!</span>
</div>""",
        "practice": {
            "title": "Git Config & Shell Environment Verification",
            "desc": "Simulate configuring your developer git identity and verifying global settings.",
            "tasks": [
                "Inspect the shell simulation terminal below",
                "Identify the command to set default branch name to 'main'",
                "Review git status and git log representations",
                "Learn how .gitignore protects secrets and node_modules"
            ],
            "starter": """<div style="font-family: monospace; background: #1e293b; color: #f8fafc; padding: 20px; border-radius: 10px; max-width: 500px; margin: auto;">
  <div style="color: #94a3b8; border-bottom: 1px solid #334155; padding-bottom: 8px; margin-bottom: 12px;">Terminal — bash</div>
  <p style="margin: 0; color: #a5f3fc;">$ git --version</p>
  <p style="margin: 4px 0 12px; color: #cbd5e1;">git version 2.43.0</p>
  <p style="margin: 0; color: #a5f3fc;">$ git config --get user.name</p>
  <p style="margin: 4px 0 0; color: #4ade80;">Sameer Chouhan</p>
</div>"""
        }
    },
    {
        "num": "02",
        "dir": "Lesson-02-Git-Init-Add-Commit",
        "title": "Git Init, Staging Area & Clean Commit Workflows",
        "tagline": "Master daily operations: git init, git status, git add, crafting atomic commit messages, and .gitignore.",
        "duration": "30 mins",
        "summary": [
            {"title": "git init", "desc": "Creates hidden .git directory"},
            {"title": "git add", "desc": "Stages files for snapshot"},
            {"title": "git commit", "desc": "Records atomic snapshot with message"},
            {"title": ".gitignore", "desc": "Excludes node_modules and .env files"}
        ],
        "objectives": [
            "Initialize a new repository and track project status with git status -s",
            "Stage specific files selectively rather than blindly doing git add .",
            "Write conventional atomic commit messages (feat:, fix:, chore:, docs:)",
            "Protect credentials and build artifacts using a strict .gitignore file"
        ],
        "sections": [
            {
                "heading": "1. The Three Git Areas",
                "content": "Understanding the transition of code across the three areas is the foundation of Git proficiency.",
                "bullets": [
                    "Working Directory: Your raw files on disk",
                    "Staging Area (Index): Files marked to be included in the next commit",
                    "Commit History: Permanent cryptographic record in the repository"
                ]
            }
        ],
        "code": """<div style="font-family: monospace; background: #0f172a; color: #e2e8f0; padding: 18px; border-radius: 8px; line-height: 1.6;">
  $ git status<br>
  On branch main<br>
  Changes to be committed:<br>
  &nbsp;&nbsp;<span style="color: #4ade80;">new file: index.html</span><br>
  &nbsp;&nbsp;<span style="color: #4ade80;">new file: src/app.ts</span><br>
  <br>
  $ git commit -m "feat(core): establish semantic HTML layout and TypeScript entry point"<br>
  [main (root-commit) 8f3a12d] feat(core): establish semantic layout...<br>
  &nbsp;2 files changed, 142 insertions(+)
</div>""",
        "practice": {
            "title": "Atomic Commit Crafting Challenge",
            "desc": "Construct an atomic Git commit plan following conventional commit specifications.",
            "tasks": [
                "Categorize changes into appropriate scopes (feat, fix, docs)",
                "Write a concise imperative commit message (under 72 chars)",
                "Verify that .env and node_modules are excluded via .gitignore",
                "Simulate running git status to verify clean tree"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h4 style="margin-top: 0; color: #0f172a;">Conventional Commit Builder</h4>
  <p style="font-size: 13px; color: #64748b;">Template: &lt;type&gt;(&lt;scope&gt;): &lt;description&gt;</p>
  <div style="background: #f8fafc; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; color: #334155;">
    feat(auth): implement client-side token validation and secure storage
  </div>
  <p style="font-size: 12px; color: #059669; margin-top: 8px;">✔ Imperative mood • No trailing period • Clear scope</p>
</div>"""
        }
    },
    {
        "num": "03",
        "dir": "Lesson-03-Branching-Strategies",
        "title": "Branching, Merging & Fast-Forward Workflows",
        "tagline": "Work in parallel safely: git branch, git checkout -b, git switch, 3-way merges, and fast-forward rebasing.",
        "duration": "35 mins",
        "summary": [
            {"title": "Branching", "desc": "Lightweight pointer to a commit"},
            {"title": "git switch", "desc": "Modern replacement for git checkout"},
            {"title": "Fast-Forward", "desc": "Linear history pointer advancement"},
            {"title": "Three-Way Merge", "desc": "Combines two divergent branches with merge commit"}
        ],
        "objectives": [
            "Create and switch branches with modern git switch -c feature-name",
            "Understand why branches in Git are merely 41-byte pointer files",
            "Differentiate Fast-Forward merges from 3-way recursive merge commits",
            "Safely delete completed feature branches with git branch -d"
        ],
        "sections": [
            {
                "heading": "1. Why Git Branches Are Free",
                "content": "In traditional systems, branching meant copying the entire directory tree. In Git, a branch is just a pointer pointing to a SHA commit hash. Creating a branch takes 2 milliseconds and consumes 41 bytes of disk space.",
                "bullets": [
                    "git switch -c feature/dark-mode: Creates and switches to branch",
                    "git merge feature/dark-mode: Integrates branch back into main"
                ]
            }
        ],
        "code": """<div style="font-family: monospace; background: #0f172a; color: #e2e8f0; padding: 18px; border-radius: 8px; line-height: 1.6;">
  $ git switch -c feature/responsive-nav<br>
  Switched to a new branch 'feature/responsive-nav'<br>
  <br>
  <span style="color: #94a3b8;"># After implementing changes:</span><br>
  $ git switch main<br>
  $ git merge --no-ff feature/responsive-nav<br>
  Merge made by the 'ort' strategy.
</div>""",
        "practice": {
            "title": "Interactive Branching Flow Visualizer",
            "desc": "Trace the lifecycle of a feature branch from creation through commit and merge back into main.",
            "tasks": [
                "Examine the branch visualization graphic below",
                "Understand why main branch remains deployable at all times",
                "Simulate merging a feature branch cleanly",
                "Identify when to delete the merged feature branch"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; text-align: center;">
  <h4 style="margin-top: 0; color: #0f172a;">Branching Topology</h4>
  <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin: 20px 0; font-family: monospace; font-size: 13px;">
    <span style="background: #e2e8f0; padding: 6px 10px; border-radius: 6px;">[C1]</span> ➔
    <span style="background: #e2e8f0; padding: 6px 10px; border-radius: 6px;">[C2]</span> ➔
    <span style="background: #dbeafe; color: #1e40af; padding: 6px 10px; border-radius: 6px; font-weight: bold;">[feature: C3]</span> ➔
    <span style="background: #dcfce7; color: #15803d; padding: 6px 10px; border-radius: 6px; font-weight: bold;">[Merge: C4]</span>
  </div>
  <p style="font-size: 13px; color: #64748b; margin: 0;">Main branch stays 100% green and production ready.</p>
</div>"""
        }
    },
    {
        "num": "04",
        "dir": "Lesson-04-Remote-Repositories-GitHub",
        "title": "Remote Repositories & GitHub Ecosystem",
        "tagline": "Connect local code to the world: git remote add origin, git push -u, SSH keys, and GitHub repositories.",
        "duration": "30 mins",
        "summary": [
            {"title": "Remotes", "desc": "git remote add origin git@github.com:..."},
            {"title": "SSH Keys", "desc": "ed25519 cryptographic authentication"},
            {"title": "Push & Pull", "desc": "git push -u origin main & git pull"},
            {"title": "Tracking", "desc": "Upstream tracking branches"}
        ],
        "objectives": [
            "Generate modern ed25519 SSH keys and connect securely to GitHub",
            "Link a local project to a remote repository on GitHub via git remote add origin",
            "Push code reliably using git push -u origin main",
            "Synchronize team updates using git fetch and git pull --rebase"
        ],
        "sections": [
            {
                "heading": "1. Connecting to GitHub Securely",
                "content": "GitHub deprecated password authentication in favor of SSH keys and Personal Access Tokens. An ed25519 SSH keypair allows frictionless, secure pushing and pulling directly from your command line.",
                "bullets": [
                    "ssh-keygen -t ed25519 -C 'your_email@domain.com'",
                    "git remote add origin git@github.com:username/repository.git",
                    "git push -u origin main: Sets upstream tracking branch"
                ]
            }
        ],
        "code": """<div style="font-family: monospace; background: #0f172a; color: #e2e8f0; padding: 18px; border-radius: 8px; line-height: 1.6;">
  $ git remote -v<br>
  origin  git@github.com:samchouhan1107-prog/Zero-to-Website.git (fetch)<br>
  origin  git@github.com:samchouhan1107-prog/Zero-to-Website.git (push)<br>
  <br>
  $ git push -u origin main<br>
  Everything up-to-date<br>
  Branch 'main' set up to track remote branch 'main' from 'origin'.
</div>""",
        "practice": {
            "title": "GitHub Remote Synchronizer",
            "desc": "Simulate pushing local commits to a remote origin on GitHub and verifying remote tracking status.",
            "tasks": [
                "Review remote URL format (HTTPS vs SSH)",
                "Identify command to verify existing remotes",
                "Understand the meaning of origin/main vs local main",
                "Learn how git pull keeps local branches up-to-date"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h4 style="margin-top: 0; color: #0f172a;">GitHub Remote Status</h4>
  <div style="background: #f8fafc; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; color: #334155;">
    Remote: origin (GitHub)<br>
    Branch: main -> origin/main<br>
    Status: Synced (0 commits ahead, 0 commits behind)
  </div>
  <p style="font-size: 12px; color: #059669; margin-top: 8px;">✔ Repository verified and cloud-backed</p>
</div>"""
        }
    },
    {
        "num": "05",
        "dir": "Lesson-05-Pull-Requests-Collaboration",
        "title": "Pull Requests, Code Reviews & Team Collaboration",
        "tagline": "Collaborate like industry engineering teams: feature branches, PR templates, code review comments, and approval.",
        "duration": "35 mins",
        "summary": [
            {"title": "Pull Request", "desc": "Proposal to merge changes into main"},
            {"title": "Code Review", "desc": "Peer inspection for architecture & security"},
            {"title": "CI Checks", "desc": "Automated linting and test passes"},
            {"title": "Squash & Merge", "desc": "Clean linear history consolidation"}
        ],
        "objectives": [
            "Open informative Pull Requests with summaries, screenshots, and test plans",
            "Conduct constructive peer code reviews in GitHub's diff viewer",
            "Integrate automated GitHub Actions CI status checks into PR gates",
            "Choose between Merge Commit, Squash and Merge, and Rebase and Merge"
        ],
        "sections": [
            {
                "heading": "1. The Anatomy of a High-Quality Pull Request",
                "content": "A Pull Request (PR) is not merely a request to merge code; it is an engineering document that explains WHY a change was made, how it was tested, and what reviewers should verify.",
                "bullets": [
                    "Problem Statement: Why is this change necessary?",
                    "Proposed Solution: What architectural decisions were made?",
                    "Verification Plan: How can the reviewer test and verify in their own environment?"
                ]
            }
        ],
        "code": """<!-- PR Template Preview -->
<div style="font-family: sans-serif; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; background: white; max-width: 500px; margin: auto;">
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
    <span style="background: #22c55e; color: white; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: bold;">Open</span>
    <strong>feat(grid): complete Chapter 05 CSS Grid curriculum</strong>
  </div>
  <p style="font-size: 13px; color: #475569; margin: 0;">
    Implemented 6 lessons and interactive practice challenges. All tests passing.
  </p>
</div>""",
        "practice": {
            "title": "Code Review Audit & Approval Simulation",
            "desc": "Review an engineering diff proposal and leave constructive comments before issuing approval.",
            "tasks": [
                "Inspect the simulated diff snippet",
                "Identify potential bugs or anti-patterns in the proposal",
                "Write a professional, constructive code review comment",
                "Simulate issuing green 'Approve' review status"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h4 style="margin-top: 0; color: #0f172a;">PR Review Simulation</h4>
  <div style="font-family: monospace; font-size: 12px; background: #0f172a; color: #cbd5e1; padding: 12px; border-radius: 6px;">
    <span style="color: #ef4444;">- const userAge = "16";</span><br>
    <span style="color: #22c55e;">+ const userAge = Number(input.value);</span>
  </div>
  <p style="font-size: 13px; color: #64748b; margin-top: 10px;">
    Reviewer Note: Clean type conversion ensures strict equality (===) checks function without implicit coercion bugs.
  </p>
  <button style="background: #16a34a; color: white; border: none; padding: 6px 14px; border-radius: 6px; font-weight: bold; cursor: pointer;">Approve Changes ✔</button>
</div>"""
        }
    },
    {
        "num": "06",
        "dir": "Lesson-06-Conflict-Resolution-Best-Practices",
        "title": "Git Conflict Resolution, Rebasing & Best Practices",
        "tagline": "Conquer merge conflicts fearlessly: conflict markers (<<<<<<<), git merge --abort, git rebase, and recovery.",
        "duration": "35 mins",
        "summary": [
            {"title": "Conflict Markers", "desc": "<<<<<<< HEAD, =======, >>>>>>> branch"},
            {"title": "Resolution", "desc": "Edit, delete markers, git add, and commit"},
            {"title": "git rebase", "desc": "Replays commits linearly on top of main"},
            {"title": "Safety Net", "desc": "git reflog rescues any lost commit"}
        ],
        "objectives": [
            "Decode Git merge conflict markers effortlessly without panic",
            "Resolve conflicting lines cleanly and finalize the merge commit",
            "Use git merge --abort to cancel a messy merge safely",
            "Use git reflog to recover supposedly deleted commits and branches"
        ],
        "sections": [
            {
                "heading": "1. Anatomy of a Merge Conflict",
                "content": "A merge conflict occurs when two different branches change the exact same line of a file in different ways. Git refuses to guess which version is correct, placing conflict markers into the file for human resolution.",
                "bullets": [
                    "<<<<<<< HEAD: Your current branch version",
                    "=======: The dividing line",
                    ">>>>>>> incoming_branch: The other branch's version"
                ]
            }
        ],
        "code": """<div style="font-family: monospace; background: #1e1b4b; color: #c7d2fe; padding: 18px; border-radius: 8px; line-height: 1.6;">
  &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD<br>
  <span style="color: #38bdf8;">const port = process.env.PORT || 3000;</span><br>
  =======<br>
  <span style="color: #f43f5e;">const port = 3000; // Hardcoded container port</span><br>
  &gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/docker-setup<br>
  <br>
  <span style="color: #4ade80;">Resolution: Choose the top or bottom, delete markers, then git add!</span>
</div>""",
        "practice": {
            "title": "Interactive Conflict Resolution Sandbox",
            "desc": "Practice identifying conflict markers and editing the file into a unified, correct version.",
            "tasks": [
                "Inspect conflicting lines inside the simulated editor",
                "Decide which change to keep or combine both logically",
                "Delete the <<<<<<<, =======, and >>>>>>> marker lines",
                "Simulate git add and git commit to finish the merge"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h4 style="margin-top: 0; color: #0f172a;">Merge Conflict Simulator</h4>
  <p style="font-size: 13px; color: #64748b;">Resolve the conflict below:</p>
  <textarea style="width: 100%; height: 120px; font-family: monospace; font-size: 12px; padding: 8px; border: 1px solid #94a3b8; border-radius: 6px;"><<<<<<< HEAD
const siteTheme = "volcanic-porcelain";
=======
const siteTheme = "system-auto";
>>>>>>> feature/theme-selector</textarea>
  <button style="margin-top: 10px; padding: 8px 14px; background: #4f46e5; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Save &amp; Resolve Conflict</button>
</div>"""
        }
    }
]

# Write Chapter 09
ch09_base = "Chapters/Chapter-09-Git & GitHub"
for item in ch09_lessons:
    ldir = os.path.join(ch09_base, item["dir"])
    os.makedirs(ldir, exist_ok=True)
    lhtml = create_lesson_html("09", "Chapter 09: Git & GitHub", item["num"], item["title"], item["tagline"], item["duration"], item["summary"], item["objectives"], item["sections"], item["code"])
    with open(os.path.join(ldir, "lesson.html"), "w", encoding="utf-8") as f:
        f.write(lhtml)
    phtml = create_practice_html("09", "Chapter 09: Git & GitHub", item["num"], item["practice"]["title"], item["practice"]["desc"], item["practice"]["tasks"], item["practice"]["starter"])
    with open(os.path.join(ldir, "practice.html"), "w", encoding="utf-8") as f:
        f.write(phtml)

print("Chapter 09 files written.")

# ==========================================
# Chapter 10: Final Project & Deployment (6 Lessons)
# ==========================================
ch10_lessons = [
    {
        "num": "01",
        "dir": "Lesson-01-Capstone-Architecture",
        "title": "Capstone Project Planning, Architecture & Wireframing",
        "tagline": "Architect an enterprise web app: user stories, wireframing, module decomposition, and data contracts.",
        "duration": "30 mins",
        "summary": [
            {"title": "Planning", "desc": "User stories and acceptance criteria"},
            {"title": "Wireframing", "desc": "Low-fidelity structural schematics"},
            {"title": "Architecture", "desc": "Modular separation of concerns"},
            {"title": "Scope", "desc": "Strict MVP boundaries without slop"}
        ],
        "objectives": [
            "Translate business and user requirements into clean technical specifications",
            "Establish layout wireframes prioritizing visual hierarchy and negative space",
            "Define modular file and component boundaries to prevent monolithic code",
            "Establish acceptance criteria for responsive performance across all viewports"
        ],
        "sections": [
            {
                "heading": "1. The Professional Project Planning Phase",
                "content": "Before writing a single line of code, world-class engineers map out data contracts, component hierarchies, and responsive user flows. This prevents costly architectural refactoring later in development.",
                "bullets": [
                    "User Flow: Discovery -> Engagement -> Action -> Confirmation",
                    "Component Hierarchy: Page -> Layout -> Container -> UI Atom"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white;">
  <h4 style="margin-top: 0; color: #0f172a;">Capstone Architecture Blueprint</h4>
  <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 1.8;">
    <li>📁 <strong>/src/components</strong>: Reusable UI blocks</li>
    <li>📁 <strong>/src/data</strong>: Typed curriculum & state stores</li>
    <li>📁 <strong>/public</strong>: Static assets, icons & robots.txt</li>
    <li>📄 <strong>metadata.json</strong>: Platform permissions & metadata</li>
  </ul>
</div>""",
        "practice": {
            "title": "Capstone Wireframe Specification Plan",
            "desc": "Design a wireframe schema detailing the 3 core views of your capstone application.",
            "tasks": [
                "Document view 1: Public discovery & hero landing",
                "Document view 2: Interactive coding sandbox & evaluation matrix",
                "Document view 3: User profile & certificate generation",
                "List all required CSS variables for color and typography"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h4 style="margin-top: 0; color: #0f172a;">Capstone Spec Document</h4>
  <div style="font-size: 13px; color: #334155; line-height: 1.6;">
    <strong>Target Audience:</strong> Learners aged 15+ to junior engineering hires<br>
    <strong>Core Engine:</strong> TypeScript + Tailwind CSS + Modern DOM<br>
    <strong>Performance Goal:</strong> 100/100 Lighthouse Performance & Zero CLS
  </div>
</div>"""
        }
    },
    {
        "num": "02",
        "dir": "Lesson-02-Frontend-Integration",
        "title": "Multi-Page Frontend Assembly & Component Structure",
        "tagline": "Synthesize HTML5, CSS Grid, Flexbox, and JavaScript into a cohesive, modular client application.",
        "duration": "35 mins",
        "summary": [
            {"title": "Modularity", "desc": "Independent reusable components"},
            {"title": "State Flow", "desc": "Unidirectional data flow"},
            {"title": "Navigation", "desc": "Clean routing and active states"},
            {"title": "Resilience", "desc": "Graceful degradation without errors"}
        ],
        "objectives": [
            "Connect state management to DOM views with zero synchronization bugs",
            "Implement responsive navigation bars that preserve scroll positions",
            "Handle user actions with robust event delegation",
            "Maintain clean separation between data logic, presentation, and persistence"
        ],
        "sections": [
            {
                "heading": "1. Connecting Data to Views Cleanly",
                "content": "A high-performance frontend avoids scattered DOM queries. Maintain state in typed objects and re-render only the affected subtrees upon user mutation.",
                "bullets": [
                    "Single Source of Truth: State holds all dynamic attributes",
                    "Pure Render Functions: Take state and return clean DOM nodes"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h4 style="margin-top: 0; color: #0f172a;">State-to-View Integration</h4>
  <div id="statusBadge" style="padding: 8px 12px; background: #ecfdf5; color: #065f46; border-radius: 6px; font-weight: bold; font-size: 13px;">
    All 52 Curriculum Modules Synced
  </div>
</div>""",
        "practice": {
            "title": "Interactive Capstone Component Assembler",
            "desc": "Build a modular view switcher that transitions between Learning, Practice, and Assessment states.",
            "tasks": [
                "Implement a 3-tab navigation switcher",
                "Render corresponding view container dynamically",
                "Persist active tab state to localStorage",
                "Verify smooth transition without full-page reload"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <div style="display: flex; gap: 8px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px;">
    <button class="tab-btn" style="padding: 6px 12px; border: none; background: #3b82f6; color: white; border-radius: 6px; font-weight: bold; cursor: pointer;">Learn</button>
    <button class="tab-btn" style="padding: 6px 12px; border: none; background: #f1f5f9; color: #475569; border-radius: 6px; font-weight: bold; cursor: pointer;">Practice</button>
    <button class="tab-btn" style="padding: 6px 12px; border: none; background: #f1f5f9; color: #475569; border-radius: 6px; font-weight: bold; cursor: pointer;">Certify</button>
  </div>
  <div style="padding: 16px; background: #f8fafc; border-radius: 8px; font-size: 14px; color: #334155;">
    Active Module: Interactive Practice Sandbox (Age 15+ Assessment)
  </div>
</div>"""
        }
    },
    {
        "num": "03",
        "dir": "Lesson-03-Production-Optimization",
        "title": "Production Optimization, Bundling & Asset Compression",
        "tagline": "Build blazing-fast apps: Vite bundling, tree-shaking, CSS minification, WebP compression, and font subsets.",
        "duration": "30 mins",
        "summary": [
            {"title": "Bundling", "desc": "Rollup/esbuild tree shaking"},
            {"title": "Compression", "desc": "Brotli and Gzip compression"},
            {"title": "Fonts", "desc": "font-display: swap and WOFF2"},
            {"title": "Assets", "desc": "Lossless WebP/SVG vector optimization"}
        ],
        "objectives": [
            "Configure Vite production build to strip dead code via AST tree shaking",
            "Eliminate Cumulative Layout Shift (CLS) using explicit width and height on images",
            "Subset web fonts and preload critical above-the-fold assets",
            "Verify that JavaScript bundle size remains under tight performance budgets"
        ],
        "sections": [
            {
                "heading": "1. The 100ms Performance Standard",
                "content": "Amazon calculated that every 100ms of latency costs 1% in revenue. Google prioritizes Core Web Vitals (LCP, INP, CLS) in search ranking. Optimizing assets during the build phase ensures sub-second page loads globally.",
                "bullets": [
                    "LCP (Largest Contentful Paint): Under 2.5 seconds",
                    "INP (Interaction to Next Paint): Under 200 milliseconds",
                    "CLS (Cumulative Layout Shift): Less than 0.1"
                ]
            }
        ],
        "code": """<div style="font-family: monospace; background: #0f172a; color: #e2e8f0; padding: 18px; border-radius: 8px; line-height: 1.6;">
  $ npm run build<br>
  vite v6.2.0 building for production...<br>
  ✓ 42 modules transformed.<br>
  <span style="color: #4ade80;">dist/index.html</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0.82 kB │ gzip: 0.44 kB<br>
  <span style="color: #38bdf8;">dist/assets/index.css</span> &nbsp;&nbsp;&nbsp;&nbsp;14.20 kB │ gzip: 3.80 kB<br>
  <span style="color: #a855f7;">dist/assets/index.js</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;88.40 kB │ gzip: 26.50 kB<br>
  ✓ built in 210ms
</div>""",
        "practice": {
            "title": "Asset Audit & Performance Budget Check",
            "desc": "Audit an asset manifest and calculate total payload against a 200KB performance budget.",
            "tasks": [
                "Review CSS and JS asset sizes",
                "Calculate total gzipped payload",
                "Verify font-display: swap configuration",
                "Ensure image dimensions prevent CLS shift"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h4 style="margin-top: 0; color: #0f172a;">Performance Budget Scorecard</h4>
  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px;">
    <span>HTML Payload</span>
    <strong style="color: #059669;">0.8 KB (Goal: &lt;5 KB)</strong>
  </div>
  <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px;">
    <span>CSS Stylesheet</span>
    <strong style="color: #059669;">14.2 KB (Goal: &lt;50 KB)</strong>
  </div>
  <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px;">
    <span>JavaScript Applet</span>
    <strong style="color: #059669;">88.4 KB (Goal: &lt;200 KB)</strong>
  </div>
</div>"""
        }
    },
    {
        "num": "04",
        "dir": "Lesson-04-Cloud-Deployment",
        "title": "Cloud Hosting & CI/CD Deployment Workflows",
        "tagline": "Deploy to the global web: GitHub Pages, Cloud Run containers, Vercel, Netlify, and custom domains.",
        "duration": "35 mins",
        "summary": [
            {"title": "Hosting", "desc": "Static edge networks vs Container services"},
            {"title": "CI/CD", "desc": "GitHub Actions automated build & test"},
            {"title": "DNS & SSL", "desc": "Custom domains with automatic HTTPS"},
            {"title": "Environment", "desc": "Environment variables (.env.production)"}
        ],
        "objectives": [
            "Deploy a static site to GitHub Pages using automated GitHub Actions",
            "Deploy full-stack applications to container runtimes like Google Cloud Run",
            "Configure environment secrets securely without exposing keys in Git",
            "Set up custom domains with automatic Let's Encrypt SSL/TLS certificates"
        ],
        "sections": [
            {
                "heading": "1. Continuous Integration & Continuous Delivery (CI/CD)",
                "content": "Modern teams don't drag-and-drop FTP files. When code is pushed to the main branch on GitHub, an automated runner builds, lints, tests, and deploys the application directly to global edge networks in under 60 seconds.",
                "bullets": [
                    "GitHub Action: .github/workflows/deploy.yml",
                    "Edge CDN: Fast response times under 50ms anywhere on the globe"
                ]
            }
        ],
        "code": """<div style="font-family: monospace; background: #0f172a; color: #38bdf8; padding: 18px; border-radius: 8px; line-height: 1.6;">
  # .github/workflows/deploy.yml snippet<br>
  name: Deploy to Production<br>
  on:<br>
  &nbsp;&nbsp;push:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;branches: [ main ]<br>
  jobs:<br>
  &nbsp;&nbsp;build-and-deploy:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;runs-on: ubuntu-latest<br>
  &nbsp;&nbsp;&nbsp;&nbsp;steps:<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- uses: actions/checkout@v4<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- run: npm ci &amp;&amp; npm run build
</div>""",
        "practice": {
            "title": "GitHub Actions Workflow Configuration",
            "desc": "Inspect and complete a GitHub Actions CI/CD deployment configuration YAML file.",
            "tasks": [
                "Review the deploy.yml trigger events",
                "Ensure build artifacts in dist/ are staged for release",
                "Verify node version matrix (Node 20+)",
                "Understand status badges for live deployment monitoring"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h4 style="margin-top: 0; color: #0f172a;">Live Deployment Pipeline</h4>
  <div style="display: flex; align-items: center; gap: 8px; padding: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 13px; color: #166534;">
    <span>⚡ GitHub Actions:</span>
    <strong>Build &amp; Deploy Succeeded (took 42s)</strong>
  </div>
  <p style="font-size: 12px; color: #64748b; margin-top: 8px;">Live production URL: https://wzstorehouse.dev</p>
</div>"""
        }
    },
    {
        "num": "05",
        "dir": "Lesson-05-Performance-Auditing",
        "title": "Performance Auditing, Lighthouse 100 & SEO",
        "tagline": "Audit like a senior engineer: Chrome DevTools Lighthouse, SEO meta tags, OpenGraph, and accessibility WCAG AA.",
        "duration": "30 mins",
        "summary": [
            {"title": "Lighthouse", "desc": "Performance, Accessibility, Best Practices, SEO"},
            {"title": "SEO", "desc": "Canonical links, meta description, robots.txt"},
            {"title": "Social Share", "desc": "OpenGraph og:title & Twitter cards"},
            {"title": "Accessibility", "desc": "Contrast ratio >= 4.5:1, aria-labels"}
        ],
        "objectives": [
            "Run automated Lighthouse audits in Chrome DevTools and score 100 in all 4 categories",
            "Configure RFC 9309 compliant robots.txt and sitemap.xml for search indexers",
            "Provide complete OpenGraph metadata tags so links generate rich social cards",
            "Pass WCAG AA contrast, alt-text, and keyboard navigation requirements"
        ],
        "sections": [
            {
                "heading": "1. Achieving Lighthouse 100 Across All Four Pillars",
                "content": "A senior developer doesn't consider a site complete until it passes Lighthouse with flying colors. A 100 score proves high engineering discipline: instant loading, keyboard navigability, security best practices, and search discoverability.",
                "bullets": [
                    "Performance: Sub-second LCP, zero render blocking",
                    "Accessibility: Semantic elements, proper aria attributes, 4.5:1 contrast",
                    "Best Practices: HTTPS, no deprecated APIs, secure headers",
                    "SEO: Valid meta tags, robots.txt crawler access, structured data"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 16px; border: 1px solid #cbd5e1; border-radius: 12px; background: white; text-align: center;">
  <h4 style="margin: 0 0 16px; color: #0f172a;">Lighthouse 100 Scorecard</h4>
  <div style="display: flex; justify-content: space-around;">
    <div><div style="width: 50px; height: 50px; border-radius: 50%; border: 4px solid #10b981; color: #10b981; font-weight: bold; line-height: 42px; margin: auto;">100</div><small>Performance</small></div>
    <div><div style="width: 50px; height: 50px; border-radius: 50%; border: 4px solid #10b981; color: #10b981; font-weight: bold; line-height: 42px; margin: auto;">100</div><small>Accessibility</small></div>
    <div><div style="width: 50px; height: 50px; border-radius: 50%; border: 4px solid #10b981; color: #10b981; font-weight: bold; line-height: 42px; margin: auto;">100</div><small>Practices</small></div>
    <div><div style="width: 50px; height: 50px; border-radius: 50%; border: 4px solid #10b981; color: #10b981; font-weight: bold; line-height: 42px; margin: auto;">100</div><small>SEO</small></div>
  </div>
</div>""",
        "practice": {
            "title": "SEO & OpenGraph Meta Tag Auditor",
            "desc": "Build and verify complete social metadata for search engine crawlers and preview card generators.",
            "tasks": [
                "Include canonical URL tag <link rel='canonical'>",
                "Define og:title, og:description, and og:image tags",
                "Verify robots.txt compliance with Googlebot permissions",
                "Ensure color contrast meets WCAG AA standards"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px;">
  <h4 style="margin-top: 0; color: #0f172a;">Social Card Preview</h4>
  <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="height: 120px; background: linear-gradient(135deg, #1e3a8a, #3b82f6); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
      WZ Storehouse: 52 Complete Lessons
    </div>
    <div style="padding: 12px; background: white;">
      <div style="font-weight: bold; color: #0f172a;">Zero-to-Website Full Curriculum</div>
      <p style="font-size: 13px; color: #64748b; margin: 4px 0 0;">Interactive web development from scratch up to cloud deployment.</p>
    </div>
  </div>
</div>"""
        }
    },
    {
        "num": "06",
        "dir": "Lesson-06-Post-Launch-Maintenance",
        "title": "Post-Launch Maintenance, Analytics & Developer Portfolio",
        "tagline": "Deliver your work to the world: error monitoring, privacy-safe telemetry, portfolio presentation, and career readiness.",
        "duration": "30 mins",
        "summary": [
            {"title": "Telemetry", "desc": "Privacy-safe telemetry and analytics"},
            {"title": "Error Logs", "desc": "Sentry / console error capture"},
            {"title": "Portfolio", "desc": "Presenting projects to engineering hiring managers"},
            {"title": "Career", "desc": "Graduation from apprentice to full developer"}
        ],
        "objectives": [
            "Set up client-side error boundaries and exception telemetry",
            "Structure your developer portfolio to showcase engineering thinking rather than trivial tutorials",
            "Articulate trade-offs made across CSS Grid, responsive media, and JavaScript engines",
            "Celebrate 100% curriculum completion across all 52 lessons and practice challenges"
        ],
        "sections": [
            {
                "heading": "1. Presenting Your Work to Engineering Teams",
                "content": "When interviewing for software engineering roles or pitching freelance clients, don't just show screenshots. Explain your architectural decisions: why you chose mobile-first design, how you safeguarded AdSense against zero-width errors, and how you achieved a clean 12-column responsive layout.",
                "bullets": [
                    "Highlight real challenges solved (e.g. ResizeObserver ad guards)",
                    "Demonstrate code discipline, modularity, and strict typing",
                    "Showcase your mastery of Git branching and pull request workflows"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 2px solid #22c55e; border-radius: 12px; text-align: center; background: #f0fdf4;">
  <span style="font-size: 32px;">🎓</span>
  <h3 style="color: #15803d; margin: 8px 0;">Curriculum 100% Complete!</h3>
  <p style="color: #166534; font-size: 14px; margin: 0 0 16px;">
    Congratulations! You have mastered all 10 chapters and 52 comprehensive lessons in the WZ Storehouse curriculum.
  </p>
  <button style="padding: 10px 20px; background: #16a34a; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Download Certificate 🏆</button>
</div>""",
        "practice": {
            "title": "Final Portfolio Showcase & Capstone Delivery",
            "desc": "Assemble your final developer portfolio profile summarizing all 10 completed tracks.",
            "tasks": [
                "Review the 10 milestone badges (HTML, CSS, Flexbox, Grid, JS, Responsive, Bootstrap, Git, Capstone)",
                "Add your developer moniker and portfolio bio",
                "Generate your interactive completion certificate",
                "Commit and push final code to GitHub repository"
            ],
            "starter": """<div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 24px; border: 1px solid #cbd5e1; border-radius: 16px; background: white; text-align: center;">
  <div style="font-size: 13px; font-weight: bold; color: #4f46e5; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">WZ Storehouse Certified</div>
  <h2 style="margin: 0 0 8px; color: #0f172a;">Professional Web Developer</h2>
  <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">
    Age 15+ Advanced Engineering Certification Matrix
  </p>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; text-align: left; font-size: 13px; margin-bottom: 20px;">
    <div style="padding: 8px; background: #f8fafc; border-radius: 6px;">✔ HTML5 &amp; Accessibility</div>
    <div style="padding: 8px; background: #f8fafc; border-radius: 6px;">✔ CSS3 Modern Styling</div>
    <div style="padding: 8px; background: #f8fafc; border-radius: 6px;">✔ Flexbox Layout Engine</div>
    <div style="padding: 8px; background: #f8fafc; border-radius: 6px;">✔ CSS Grid 2D Architecture</div>
    <div style="padding: 8px; background: #f8fafc; border-radius: 6px;">✔ JavaScript ES6+ &amp; DOM</div>
    <div style="padding: 8px; background: #f8fafc; border-radius: 6px;">✔ Responsive Design &amp; Clamp</div>
    <div style="padding: 8px; background: #f8fafc; border-radius: 6px;">✔ Bootstrap 5 Framework</div>
    <div style="padding: 8px; background: #f8fafc; border-radius: 6px;">✔ Git &amp; GitHub Workflows</div>
    <div style="padding: 8px; background: #f8fafc; border-radius: 6px;">✔ Cloud Deployment &amp; CI/CD</div>
    <div style="padding: 8px; background: #f8fafc; border-radius: 6px;">✔ 100/100 Lighthouse Audit</div>
  </div>
  <button style="width: 100%; padding: 12px; background: #0f172a; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer;">Share Verified Credential 🚀</button>
</div>"""
        }
    }
]

# Write Chapter 10
ch10_base = "Chapters/Chapter-10-Final Project & Deployment"
for item in ch10_lessons:
    ldir = os.path.join(ch10_base, item["dir"])
    os.makedirs(ldir, exist_ok=True)
    lhtml = create_lesson_html("10", "Chapter 10: Capstone & Deployment", item["num"], item["title"], item["tagline"], item["duration"], item["summary"], item["objectives"], item["sections"], item["code"])
    with open(os.path.join(ldir, "lesson.html"), "w", encoding="utf-8") as f:
        f.write(lhtml)
    phtml = create_practice_html("10", "Chapter 10: Capstone & Deployment", item["num"], item["practice"]["title"], item["practice"]["desc"], item["practice"]["tasks"], item["practice"]["starter"])
    with open(os.path.join(ldir, "practice.html"), "w", encoding="utf-8") as f:
        f.write(phtml)

print("Chapter 10 files written.")
