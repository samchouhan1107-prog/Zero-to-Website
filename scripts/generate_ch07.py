import os
from templates import create_lesson_html, create_practice_html

# ==========================================
# Chapter 07: Responsive Design (7 Lessons)
# ==========================================
ch07_lessons = [
    {
        "num": "01",
        "dir": "Lesson-01-Mobile-First-Approach",
        "title": "Mobile-First Philosophy & Core Architecture",
        "tagline": "Design for constrained viewports first, progressively enhancing as screen real estate expands.",
        "duration": "25 mins",
        "summary": [
            {"title": "Strategy", "desc": "Mobile-First vs Desktop-Down"},
            {"title": "Constraint", "desc": "Touch Targets (min 44px)"},
            {"title": "Progressive", "desc": "Enhancement with min-width"},
            {"title": "Performance", "desc": "Lean default mobile payloads"}
        ],
        "objectives": [
            "Understand why mobile-first CSS results in cleaner, more maintainable codebases",
            "Replace complex desktop overriding with additive min-width media queries",
            "Establish ergonomic touch target standards (minimum 44x44px for thumbs)",
            "Optimize asset loading and rendering order for high mobile network efficiency"
        ],
        "sections": [
            {
                "heading": "1. Why Mobile-First Wins",
                "content": "Over 60% of global web traffic originates from mobile devices. Designing mobile-first ensures the default stylesheet contains lightweight, linear, touch-friendly styling. Larger screens simply layer on multi-column layouts via min-width breakpoints.",
                "bullets": [
                    "Default CSS = Mobile rules (no media query needed)",
                    "@media (min-width: 768px) = Tablet enhancements",
                    "@media (min-width: 1024px) = Desktop grid & wide layout expansions"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; padding: 20px; max-width: 500px; margin: auto;">
  <div style="background: #e0e7ff; color: #3730a3; padding: 12px; border-radius: 8px; text-align: center; font-weight: bold; margin-bottom: 12px;">
    Mobile-First Card (Scales Up Cleanly)
  </div>
  <p style="color: #475569; font-size: 14px; line-height: 1.5;">
    Notice how all base styles work perfectly inside small containers without horizontal overflow.
  </p>
</div>""",
        "practice": {
            "title": "Mobile-First Stacked Profile Card",
            "desc": "Create a user profile card that is vertically stacked by default, transitioning to a side-by-side layout at 600px+ width.",
            "tasks": [
                "Write default mobile styles: flex-direction: column and 100% width",
                "Add an additive @media (min-width: 600px) query",
                "Switch flex-direction to row with 24px column gap on desktop",
                "Ensure buttons meet the 44px touch height minimum"
            ],
            "starter": """<style>
  .profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    text-align: center;
    gap: 16px;
    max-width: 480px;
    margin: 20px auto;
    font-family: system-ui, sans-serif;
  }
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #3b82f6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bold;
  }
  .action-btn {
    min-height: 44px;
    padding: 0 20px;
    background: #1e40af;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  /* Progressive Enhancement for larger screens */
  @media (min-width: 600px) {
    .profile-card {
      flex-direction: row;
      text-align: left;
    }
  }
</style>

<div class="profile-card">
  <div class="avatar">SC</div>
  <div style="flex: 1;">
    <h3 style="margin: 0 0 4px; color: #0f172a;">Sameer Chouhan</h3>
    <p style="margin: 0 0 12px; color: #64748b; font-size: 14px;">Senior Frontend Architect</p>
    <button class="action-btn">Connect Profile</button>
  </div>
</div>"""
        }
    },
    {
        "num": "02",
        "dir": "Lesson-02-Viewport-Media-Queries",
        "title": "Viewport Meta Tag & Media Query Breakpoints",
        "tagline": "Configure device pixel scaling, standard screen breakpoints, and modern range query syntax.",
        "duration": "30 mins",
        "summary": [
            {"title": "Viewport Tag", "desc": "width=device-width, initial-scale=1.0"},
            {"title": "Breakpoints", "desc": "640px, 768px, 1024px, 1280px"},
            {"title": "Syntax", "desc": "@media (min-width: ...) & Range queries"},
            {"title": "Orientation", "desc": "(orientation: landscape)"}
        ],
        "objectives": [
            "Recognize the catastrophic consequence of omitting the viewport meta tag",
            "Establish standard responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)",
            "Use modern CSS Media Queries Level 4 syntax like @media (width >= 768px)",
            "Test device simulations using browser developer tools"
        ],
        "sections": [
            {
                "heading": "1. The Viewport Meta Tag",
                "content": "Without <meta name='viewport' content='width=device-width, initial-scale=1.0'>, mobile browsers assume a desktop 980px canvas and zoom out until text is unreadably microscopic. The viewport tag binds the layout viewport directly to the actual device screen width.",
                "bullets": [
                    "width=device-width: Sets page width to follow screen-width in device-independent pixels",
                    "initial-scale=1.0: Sets initial zoom level when first loaded by the browser"
                ]
            }
        ],
        "code": """<style>
  .breakpoint-box {
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    font-family: sans-serif;
    font-weight: bold;
    background: #fef08a;
    color: #854d0e;
  }
  @media (min-width: 500px) {
    .breakpoint-box {
      background: #bbf7d0;
      color: #166534;
    }
  }
</style>
<div class="breakpoint-box">
  Resize browser or preview window to see color transition!
</div>""",
        "practice": {
            "title": "Adaptive 3-Tier Breakpoint Banner",
            "desc": "Create a banner that transitions its layout and color palette across Phone (<640px), Tablet (640-1024px), and Desktop (>1024px).",
            "tasks": [
                "Define base styles for mobile: single column and orange accent",
                "Add @media (min-width: 640px) tablet breakpoint with blue styling",
                "Add @media (min-width: 1024px) desktop breakpoint with emerald styling",
                "Include a live indicator label displaying the active simulated screen class"
            ],
            "starter": """<style>
  .tier-banner {
    padding: 24px;
    border-radius: 12px;
    font-family: system-ui, sans-serif;
    text-align: center;
    background: #ffedd5;
    border: 2px solid #ea580c;
    color: #9a3412;
  }
  .screen-mode::after {
    content: "📱 Mobile Viewport (<640px)";
    font-weight: bold;
  }

  @media (min-width: 640px) {
    .tier-banner {
      background: #dbeafe;
      border-color: #2563eb;
      color: #1e40af;
    }
    .screen-mode::after {
      content: "📟 Tablet Viewport (640px - 1023px)";
    }
  }

  @media (min-width: 1024px) {
    .tier-banner {
      background: #dcfce7;
      border-color: #16a34a;
      color: #15803d;
    }
    .screen-mode::after {
      content: "🖥 Desktop Viewport (1024px+)";
    }
  }
</style>

<div class="tier-banner">
  <h3 style="margin-top: 0;">Responsive Viewport Tester</h3>
  <p class="screen-mode" style="font-size: 16px; margin: 0;"></p>
</div>"""
        }
    },
    {
        "num": "03",
        "dir": "Lesson-03-Fluid-Units-Clamp",
        "title": "Fluid Layouts with clamp(), min() & max()",
        "tagline": "Ditch rigid pixel media queries in favor of modern fluid CSS mathematical functions.",
        "duration": "30 mins",
        "summary": [
            {"title": "clamp()", "desc": "clamp(min, preferred, max)"},
            {"title": "Viewport Units", "desc": "vw, vh, vi, dvh"},
            {"title": "min() & max()", "desc": "Dynamic boundaries"},
            {"title": "Fluid Spaces", "desc": "Fluid padding and gaps"}
        ],
        "objectives": [
            "Use clamp(min, preferred, max) to interpolate font sizes and paddings smoothly",
            "Understand new dynamic viewport units: dvh, lvh, and svh for mobile address bar resilience",
            "Combine percentages with calc() and min() to eliminate layout breaking",
            "Build zero-breakpoint fluid components that look effortless on any viewport"
        ],
        "sections": [
            {
                "heading": "1. The Magic of CSS clamp()",
                "content": "clamp(MIN, VAL, MAX) takes three values: a minimum limit, a preferred scaling value (usually containing a viewport unit like vw), and an upper limit. The browser automatically calculates the exact proportional value without jumping between discrete media queries.",
                "bullets": [
                    "font-size: clamp(1.2rem, 3vw + 0.5rem, 2.5rem);",
                    "padding: clamp(12px, 4vw, 36px);",
                    "width: min(100% - 32px, 1200px); (Safe centered container pattern)"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; padding: clamp(16px, 4vw, 36px); background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; text-align: center;">
  <h2 style="font-size: clamp(1.4rem, 4vw, 2.8rem); margin: 0 0 10px; color: #0f172a; line-height: 1.2;">
    Truly Fluid Typography
  </h2>
  <p style="font-size: clamp(0.9rem, 2vw, 1.15rem); color: #475569; margin: 0;">
    This heading scales smoothly pixel-by-pixel with the viewport width, staying strictly between 1.4rem and 2.8rem.
  </p>
</div>""",
        "practice": {
            "title": "Zero-Media-Query Fluid Hero Section",
            "desc": "Build a responsive hero banner that adapts font size, padding, and button width using only clamp() and min().",
            "tasks": [
                "Apply clamp() to the main heading font size (min: 24px, max: 48px)",
                "Apply clamp() to section outer padding (min: 16px, max: 48px)",
                "Set button width to min(100%, 280px) so it's full-width on mobile and comfortably fixed on desktop",
                "Verify fluid behavior without any @media rules"
            ],
            "starter": """<style>
  .fluid-hero {
    /* Fluid Container */
    padding: clamp(16px, 5vw, 56px);
    background: linear-gradient(135deg, #1e1b4b, #312e81);
    color: white;
    border-radius: 16px;
    text-align: center;
    font-family: system-ui, sans-serif;
  }
  .fluid-title {
    font-size: clamp(1.5rem, 4.5vw, 3rem);
    font-weight: 800;
    margin: 0 0 12px;
    line-height: 1.15;
  }
  .fluid-desc {
    font-size: clamp(0.95rem, 2vw, 1.2rem);
    color: #c7d2fe;
    max-width: 60ch;
    margin: 0 auto 24px;
    line-height: 1.6;
  }
  .fluid-btn {
    width: min(100%, 260px);
    min-height: 48px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
  }
</style>

<div class="fluid-hero">
  <h1 class="fluid-title">Master Next-Gen Fluid Web Design</h1>
  <p class="fluid-desc">
    Experience mathematical precision with CSS clamp. No jarring breakpoint jumps, just silky smooth scaling across every monitor on Earth.
  </p>
  <button class="fluid-btn">Explore Fluid Modules</button>
</div>"""
        }
    },
    {
        "num": "04",
        "dir": "Lesson-04-Responsive-Images-Media",
        "title": "Responsive Images: srcset, sizes & picture",
        "tagline": "Serve optimal image resolutions: max-width: 100%, srcset descriptor tags, and art direction with picture.",
        "duration": "30 mins",
        "summary": [
            {"title": "Core CSS", "desc": "max-width: 100%; height: auto;"},
            {"title": "srcset", "desc": "Density (2x) & Width (w) descriptors"},
            {"title": "sizes", "desc": "Informs browser layout slot width"},
            {"title": "<picture>", "desc": "Art direction & WebP/AVIF fallback"}
        ],
        "objectives": [
            "Prevent image blowout bugs with max-width: 100% and height: auto",
            "Deliver Retina/HiDPI images using srcset 2x descriptors",
            "Serve modern WebP and AVIF formats with automatic PNG/JPEG fallback using <picture>",
            "Implement art direction by cropping landscape photos into portrait on mobile screens"
        ],
        "sections": [
            {
                "heading": "1. Fluid Image Basics & The picture Element",
                "content": "Standard <img> tags download the full image regardless of whether the user is on a 4K monitor or a budget smartphone. By using srcset and the HTML5 <picture> element, you serve lightweight images to mobile users and sharp visuals to desktop screens.",
                "bullets": [
                    "img { max-width: 100%; height: auto; display: block; }",
                    "<picture><source media='(max-width: 768px)' srcset='mobile.jpg'><img src='desktop.jpg'></picture>"
                ]
            }
        ],
        "code": """<div style="max-width: 440px; margin: auto; font-family: sans-serif; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px;">
  <div style="width: 100%; height: 160px; background: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
    Fluid Aspect Ratio Container (100% Fluid)
  </div>
  <h4 style="margin: 12px 0 4px; color: #1e293b;">Responsive Media Container</h4>
  <p style="font-size: 13px; color: #64748b; margin: 0;">Preserves aspect ratio and eliminates layout shift (CLS).</p>
</div>""",
        "practice": {
            "title": "Art-Directed Responsive Card Component",
            "desc": "Build an image card using CSS aspect-ratio and responsive object-fit to ensure photos never distort on mobile or desktop.",
            "tasks": [
                "Set card media wrapper to aspect-ratio: 16 / 9",
                "Use object-fit: cover to prevent image distortion",
                "Add responsive caption that floats over the lower third with gradient backdrop",
                "Test scaling down to 320px screen width"
            ],
            "starter": """<style>
  .media-card {
    max-width: 460px;
    margin: 20px auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    font-family: system-ui, sans-serif;
    position: relative;
  }
  .media-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: linear-gradient(45deg, #4f46e5, #06b6d4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
  }
  .media-caption {
    padding: 16px;
    background: white;
  }
</style>

<div class="media-card">
  <div class="media-wrapper">
    🖼 Responsive Media Aspect Container
  </div>
  <div class="media-caption">
    <h3 style="margin: 0 0 6px; color: #0f172a;">Optimized Media Card</h3>
    <p style="margin: 0; color: #64748b; font-size: 14px;">Maintains 16:9 ratio across all viewports without layout shift.</p>
  </div>
</div>"""
        }
    },
    {
        "num": "05",
        "dir": "Lesson-05-Responsive-Typography",
        "title": "Responsive Typography, Line Length & Measure",
        "tagline": "Optimize reading comfort: typographic scales, ch units for optimal measure (65-75 chars), and line heights.",
        "duration": "25 mins",
        "summary": [
            {"title": "Optimal Measure", "desc": "max-width: 65ch to 75ch"},
            {"title": "Line Height", "desc": "1.5 for body, 1.1-1.2 for titles"},
            {"title": "Scale", "desc": "Modular scale (Major Third / Perfect Fourth)"},
            {"title": "Relative Units", "desc": "rem for scalability & accessibility"}
        ],
        "objectives": [
            "Master typographical readability guidelines: constrain body paragraphs to 65-75 characters (ch)",
            "Use rem units so user browser font-size preferences are respected",
            "Adjust line-height inversely proportional to font size (tight titles, relaxed body)",
            "Prevent orphan words on mobile titles using CSS text-wrap: balance"
        ],
        "sections": [
            {
                "heading": "1. The 65-75 Character Rule (ch units)",
                "content": "When lines of text stretch too wide across a large desktop monitor, the reader's eye tires jumping to the next line. Setting max-width: 70ch ensures text remains in the optimal reading sweet spot.",
                "bullets": [
                    "max-width: 70ch: Centers content and maintains golden reading measure",
                    "text-wrap: balance: Prevents lonely single-word wrap lines on headlines",
                    "line-height: 1.6: Comfortable breathing room for continuous reading"
                ]
            }
        ],
        "code": """<div style="font-family: Georgia, serif; max-width: 65ch; margin: auto; padding: 20px; color: #1e293b; line-height: 1.65;">
  <h2 style="font-family: system-ui, sans-serif; font-size: 28px; line-height: 1.2; text-wrap: balance; color: #0f172a; margin-top: 0;">
    The Typography of High-Retention Web Applications
  </h2>
  <p style="font-size: 17px; margin-bottom: 16px;">
    By constraining the width of this article block to 65 characters using CSS ch units, the user never experiences cognitive fatigue tracking from line end to line start.
  </p>
</div>""",
        "practice": {
            "title": "Editorial Article Layout with Strict Typographic Scale",
            "desc": "Create an article view applying rem units, 70ch max measure, balanced headlines, and responsive margins.",
            "tasks": [
                "Set body text to 1.05rem with 1.6 line-height",
                "Constrain reading container to max-width: 68ch and margin: 0 auto",
                "Add text-wrap: balance to the main title",
                "Style inline blockquote with elegant left border accent"
            ],
            "starter": """<style>
  .editorial-wrapper {
    max-width: 68ch;
    margin: 20px auto;
    padding: 24px;
    font-family: system-ui, sans-serif;
    color: #1e293b;
    line-height: 1.65;
  }
  .editorial-title {
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    font-weight: 800;
    line-height: 1.2;
    text-wrap: balance;
    color: #0f172a;
    margin: 0 0 16px;
  }
  .editorial-quote {
    margin: 20px 0;
    padding: 12px 20px;
    background: #f8fafc;
    border-left: 4px solid #3b82f6;
    font-style: italic;
    color: #334155;
  }
</style>

<article class="editorial-wrapper">
  <h1 class="editorial-title">Why Professional Typography Is the Secret to User Retention</h1>
  <p>Good typography isn't just decoration; it is the fundamental bridge between content and human comprehension.</p>
  <blockquote class="editorial-quote">
    "Content precedes design. Design in the absence of content is not design, it's decoration." — Jeffrey Zeldman
  </blockquote>
  <p>Notice how easy this text is to read. The line length never stretches beyond 68 characters, preserving reading rhythm.</p>
</article>"""
        }
    },
    {
        "num": "06",
        "dir": "Lesson-06-Responsive-Navigation",
        "title": "Responsive Navigation: Hamburger Menus & Drawers",
        "tagline": "Build mobile-first navigation: desktop horizontal bars, mobile slide-out drawers, and accessibility.",
        "duration": "35 mins",
        "summary": [
            {"title": "Mobile Drawer", "desc": "Fixed off-canvas drawer with CSS transform"},
            {"title": "Toggle", "desc": "Hamburger icon with aria-expanded"},
            {"title": "Desktop Bar", "desc": "Horizontal flex layout at 768px+"},
            {"title": "Accessibility", "desc": "Keyboard Esc key & focus trapping"}
        ],
        "objectives": [
            "Implement a slide-out mobile drawer using CSS transform: translateX(-100%)",
            "Switch seamlessly from mobile drawer to horizontal navbar at 768px breakpoint",
            "Ensure keyboard accessibility (Esc closes drawer, focus trap)",
            "Animate the hamburger icon into an 'X' close state smoothly"
        ],
        "sections": [
            {
                "heading": "1. Mobile-First Navigation Patterns",
                "content": "Navigation menus are among the most common responsive challenges. Mobile screens lack horizontal space for 6 navigation links, requiring a collapsible drawer or accordion pattern.",
                "bullets": [
                    "Mobile (<768px): Hamburger button toggles an off-canvas drawer with backdrop overlay",
                    "Desktop (>=768px): Drawer properties reset; links display inline in a clean horizontal row"
                ]
            }
        ],
        "code": """<div style="font-family: sans-serif; max-width: 500px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
  <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #0f172a; color: white;">
    <strong>MyBrand</strong>
    <button id="toggleMenuBtn" style="background: none; border: 1px solid #475569; color: white; border-radius: 4px; padding: 6px 10px; cursor: pointer;">☰ Menu</button>
  </div>
  <div id="drawerMenu" style="display: none; padding: 12px; background: #1e293b; color: #cbd5e1;">
    <a href="#" style="display: block; padding: 8px 0; color: white; text-decoration: none; border-bottom: 1px solid #334155;">Dashboard</a>
    <a href="#" style="display: block; padding: 8px 0; color: white; text-decoration: none; border-bottom: 1px solid #334155;">Curriculum</a>
    <a href="#" style="display: block; padding: 8px 0; color: white; text-decoration: none;">Settings</a>
  </div>
</div>

<script>
  const btn = document.getElementById('toggleMenuBtn');
  const menu = document.getElementById('drawerMenu');
  btn.onclick = () => {
    const isHidden = menu.style.display === 'none';
    menu.style.display = isHidden ? 'block' : 'none';
    btn.textContent = isHidden ? '✕ Close' : '☰ Menu';
  };
</script>""",
        "practice": {
            "title": "Full Responsive Header with Animated Drawer",
            "desc": "Build a responsive header that displays a top navigation bar on desktop, collapsing to an accessible slide-in drawer on mobile.",
            "tasks": [
                "Style the desktop header with logo on left, navigation links on right",
                "Hide desktop links and display hamburger button on mobile screens (<768px)",
                "Write JavaScript toggle to slide drawer into view",
                "Ensure drawer closes when any menu item is clicked"
            ],
            "starter": """<style>
  .app-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    font-family: system-ui, sans-serif;
  }
  .nav-links {
    display: none;
    gap: 20px;
  }
  .nav-links a {
    text-decoration: none;
    color: #334155;
    font-weight: 600;
  }
  .hamburger-btn {
    display: block;
    background: none;
    border: 1px solid #cbd5e1;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
  }

  @media (min-width: 768px) {
    .nav-links {
      display: flex;
    }
    .hamburger-btn {
      display: none;
    }
  }
</style>

<header class="app-nav">
  <div style="font-weight: 800; font-size: 18px; color: #1e40af;">WZ Storehouse</div>
  <nav class="nav-links">
    <a href="#">Chapters</a>
    <a href="#">Practice</a>
    <a href="#">Showcase</a>
    <a href="#">Profile</a>
  </nav>
  <button class="hamburger-btn" id="mobileMenuBtn">☰</button>
</header>
<div id="mobileDrawer" style="display: none; padding: 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-family: system-ui, sans-serif;">
  <a href="#" style="display: block; padding: 8px 0; color: #1e293b; text-decoration: none;">Chapters</a>
  <a href="#" style="display: block; padding: 8px 0; color: #1e293b; text-decoration: none;">Practice Sandbox</a>
  <a href="#" style="display: block; padding: 8px 0; color: #1e293b; text-decoration: none;">Community Showcase</a>
</div>

<script>
  document.getElementById('mobileMenuBtn').onclick = function() {
    const d = document.getElementById('mobileDrawer');
    d.style.display = d.style.display === 'block' ? 'none' : 'block';
  };
</script>"""
        }
    },
    {
        "num": "07",
        "dir": "Lesson-07-Responsive-Portfolio-Build",
        "title": "Chapter 07 Capstone: Fully Responsive Portfolio",
        "tagline": "Synthesize mobile-first design, fluid units, CSS Grid reflow, and adaptive media into a complete personal site.",
        "duration": "45 mins",
        "summary": [
            {"title": "Architecture", "desc": "Mobile-first, fluid grid & clamp()"},
            {"title": "Breakpoints", "desc": "Single fluid transition from 320px to 4K"},
            {"title": "Componentry", "desc": "Hero, Skills Matrix & Project Cards"},
            {"title": "Outcome", "desc": "100% Lighthouse Mobile Responsive Score"}
        ],
        "objectives": [
            "Assemble a multi-section landing page that looks impeccable on iPhone, iPad, and Ultra-wide monitors",
            "Combine CSS Grid auto-fit with minmax for media-query-free card reflow",
            "Eliminate all horizontal scrolling bugs using box-sizing: border-box and max-width: 100%",
            "Verify compliance against WCAG touch target and text legibility criteria"
        ],
        "sections": [
            {
                "heading": "1. The Full Responsive Portfolio Checklist",
                "content": "A high-retention responsive portfolio combines clean layout hierarchy, fluid typography, ergonomic touch targets, and resilient card grids.",
                "bullets": [
                    "Hero banner with clamp() fluid scaling",
                    "Skills matrix with auto-fit minmax(180px, 1fr)",
                    "Sticky header with clean mobile collapse",
                    "Zero horizontal overflow across all device viewports"
                ]
            }
        ],
        "code": """<div style="font-family: system-ui, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white;">
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #0f172a; font-size: clamp(1.4rem, 3vw, 2rem);">Developer Portfolio</h2>
    <p style="color: #64748b; margin: 4px 0 0; font-size: 14px;">Full-Stack Engineer &amp; UI Architect</p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;">
    <div style="padding: 12px; background: #eff6ff; border-radius: 8px; text-align: center; font-weight: 600; color: #1d4ed8;">⚡ Responsive UI</div>
    <div style="padding: 12px; background: #f0fdf4; border-radius: 8px; text-align: center; font-weight: 600; color: #15803d;">🚀 Cloud Deploy</div>
    <div style="padding: 12px; background: #faf5ff; border-radius: 8px; text-align: center; font-weight: 600; color: #7e22ce;">🛠 JavaScript V8</div>
  </div>
</div>""",
        "practice": {
            "title": "Complete Responsive Landing Page Showcase",
            "desc": "Assemble a responsive 3-section page featuring a fluid header, responsive feature cards, and an interactive contact card.",
            "tasks": [
                "Implement a fluid container with min(100% - 32px, 800px)",
                "Create a 3-column project grid that wraps to 1 column automatically on mobile",
                "Add interactive hover micro-transitions on cards",
                "Verify responsive view in the sandbox window"
            ],
            "starter": """<style>
  .site-container {
    width: min(100% - 32px, 720px);
    margin: 20px auto;
    font-family: system-ui, sans-serif;
  }
  .hero-card {
    padding: clamp(20px, 5vw, 40px);
    background: #0f172a;
    color: white;
    border-radius: 16px;
    text-align: center;
    margin-bottom: 24px;
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
  .feature-card {
    padding: 16px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  }
</style>

<div class="site-container">
  <div class="hero-card">
    <h2 style="font-size: clamp(1.4rem, 3.5vw, 2.2rem); margin: 0 0 8px;">Responsive Engineer Portfolio</h2>
    <p style="color: #94a3b8; margin: 0; font-size: clamp(0.9rem, 2vw, 1rem);">Built for Age 15+ up to Senior Cloud Architects</p>
  </div>
  <div class="card-grid">
    <div class="feature-card">
      <h4 style="margin: 0 0 6px; color: #1e40af;">📱 Mobile-First</h4>
      <p style="margin: 0; font-size: 13px; color: #64748b;">Optimized for one-handed mobile ergonomic thumb navigation.</p>
    </div>
    <div class="feature-card">
      <h4 style="margin: 0 0 6px; color: #059669;">⚡ CSS Grid 2D</h4>
      <p style="margin: 0; font-size: 13px; color: #64748b;">Media-query-free card reflow using auto-fit and minmax.</p>
    </div>
    <div class="feature-card">
      <h4 style="margin: 0 0 6px; color: #7c3aed;">🎨 Fluid Design</h4>
      <p style="margin: 0; font-size: 13px; color: #64748b;">Mathematical precision with CSS clamp and custom properties.</p>
    </div>
  </div>
</div>"""
        }
    }
]

# Write Chapter 07 lessons and practices
ch07_base = "Chapters/Chapter-07-Responsive Design"
for item in ch07_lessons:
    ldir = os.path.join(ch07_base, item["dir"])
    os.makedirs(ldir, exist_ok=True)
    
    lhtml = create_lesson_html(
        "07", "Chapter 07: Responsive Design", item["num"], item["title"],
        item["tagline"], item["duration"], item["summary"], item["objectives"],
        item["sections"], item["code"]
    )
    with open(os.path.join(ldir, "lesson.html"), "w", encoding="utf-8") as f:
        f.write(lhtml)

    phtml = create_practice_html(
        "07", "Chapter 07: Responsive Design", item["num"], item["practice"]["title"],
        item["practice"]["desc"], item["practice"]["tasks"], item["practice"]["starter"]
    )
    with open(os.path.join(ldir, "practice.html"), "w", encoding="utf-8") as f:
        f.write(phtml)

print(f"Generated {len(ch07_lessons)} lessons and practice files for Chapter 07!")
