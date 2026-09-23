import os

# 1. Update Chapter 08 index.html
ch08_lessons_meta = [
    ("Lesson 01", "Lesson-01-Bootstrap-Introduction", "Bootstrap 5 Fundamentals", "Reboot resets, container roots, and bundle JS integration without jQuery."),
    ("Lesson 02", "Lesson-02-Bootstrap-Grid-System", "The 12-Column Grid", "Subdivisions, responsive tiers (col-md-6), auto-layout, and gutters (g-3)."),
    ("Lesson 03", "Lesson-03-Typography-Colors-Spacing", "Typography & Spacing Utilities", "Directional spacing (m-*, p-*), contextual color themes, and subtle borders."),
    ("Lesson 04", "Lesson-04-Buttons-Cards-Badges", "Buttons, Cards & Badges", "Structured cards, soft elevations (shadow-sm), pills, and button states."),
    ("Lesson 05", "Lesson-05-Navbars-Headers", "Responsive Navbars", "Desktop horizontal navbars, mobile hamburger collapse, and dark mode themes."),
    ("Lesson 06", "Lesson-06-Modals-Forms-Alerts", "Modals, Forms & Alerts", "Floating labels, accessible modal dialogs, accordions, and dismissible alerts."),
    ("Lesson 07", "Lesson-07-Bootstrap-Landing-Page", "Bootstrap Capstone Page", "Assembling a responsive enterprise landing page in under 15 minutes.")
]

def make_cards(meta_list):
    cards = ""
    for num, folder, title, desc in meta_list:
        cards += f"""
            <div class="lesson-card">
                <h3>{num}</h3>
                <p><strong>{title}</strong>: {desc}</p>
                <div style="display: flex; gap: 8px; margin-top: 10px;">
                    <a class="btn primary" href="{folder}/lesson.html">Read Lesson ➜</a>
                    <a class="btn secondary" href="{folder}/practice.html">Practice ⚡</a>
                </div>
            </div>"""
    return cards

def update_chapter_index(path, title, badge, hero_h1, hero_p, obj_list, cards_html, prev_link, prev_text, next_link, next_text):
    objectives_html = "".join([f"<li>✔ {o}</li>\n" for o in obj_list])
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - WZ Storehouse</title>
    <link rel="stylesheet" href="../../Assets/css/main.css">
    <script src="../../Assets/js/main.js" defer></script>
    
    <!-- AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2904917114665090"
         crossorigin="anonymous"></script>
</head>
<body class="chapter-page">
<header>
    <div class="logo">
        <a href="../../index.html" class="logo-link">
            <h1>WZ STOREHOUSE</h1>
            <p>Learn • Practice • Build • Share</p>
        </a>
    </div>
    <nav>
        <a href="../../index.html">🏠 Home</a>
        <a href="{prev_link}">⬅ Previous</a>
        {"<a href='" + next_link + "'>Next ➜</a>" if next_link else ""}
        <button id="settingsBtn">⚙ Settings</button>
    </nav>
</header>
<div id="settingsPanel" class="settings-panel">
    <h3>⚙ Settings</h3>
    <button id="darkModeBtn">🌙 Dark Mode</button>
    <button id="fontSizeBtn">🔤 Font Size</button>
    <button id="closeSettingsBtn" class="close-btn">✖ Close</button>
</div>
<main class="container chapter-page">
    <section class="chapter-hero">
        <span class="chapter-badge">{badge}</span>
        <h1>{hero_h1}</h1>
        <p>{hero_p}</p>

        <div class="info-grid">
            <div class="summary-card">
                <h3>Track Level</h3>
                <p>Age 15+ to Professional</p>
            </div>
            <div class="summary-card">
                <h3>Total Lessons</h3>
                <p>{len(meta_list)} Interactive Lessons</p>
            </div>
            <div class="summary-card">
                <h3>Practice</h3>
                <p>Sandboxes Included</p>
            </div>
            <div class="summary-card">
                <h3>Status</h3>
                <p>100% Complete</p>
            </div>
        </div>
    </section>

    <section class="chapter-section">
        <h2>🎯 Learning Objectives</h2>
        <ul class="chapter-list">
            {objectives_html}
        </ul>
    </section>

    <section class="chapter-section">
        <h2>📚 Chapter Lessons &amp; Interactive Practices</h2>
        <div class="lesson-grid">
            {cards_html}
        </div>
    </section>

    <section class="chapter-section chapter-nav-links">
        <a href="../../index.html">🏠 Home</a>
        <a href="{prev_link}">⬅ {prev_text}</a>
        {"<a href='" + next_link + "'>" + next_text + " ➜</a>" if next_link else ""}
    </section>
</main>
<footer>
    <p>WZ Storehouse | Version 2.0 | Developed by Sameer Chouhan | &copy; 2026 All Rights Reserved.</p>
</footer>
</body>
</html>
"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)

# Chapter 08
meta_list = ch08_lessons_meta
update_chapter_index(
    "Chapters/Chapter-08-Bootstrap/index.html",
    "Chapter 08 | Bootstrap 5 Framework",
    "Chapter 08",
    "Bootstrap 5 UI Framework",
    "Accelerate frontend delivery: the 12-column grid system, responsive utilities, cards, navbars, and interactive modals.",
    [
        "Link Bootstrap 5 via CDN without legacy jQuery dependencies.",
        "Master the 12-column flexbox grid system (.container, .row, .col-md-6).",
        "Utilize contextual badges, elevated cards, and floating label inputs.",
        "Assemble production landing pages with mobile collapsible navigation."
    ],
    make_cards(ch08_lessons_meta),
    "../Chapter-07-Responsive Design/index.html",
    "Chapter 07: Responsive Design",
    "../Chapter-09-Git & GitHub/index.html",
    "Chapter 09: Git & GitHub"
)

# Chapter 09
ch09_lessons_meta = [
    ("Lesson 01", "Lesson-01-Version-Control-Basics", "Version Control Systems", "DVCS architecture, cryptographic snapshots, and developer identity config."),
    ("Lesson 02", "Lesson-02-Git-Init-Add-Commit", "Git Init, Add & Commit", "The three Git trees, staging area, conventional atomic commits, and .gitignore."),
    ("Lesson 03", "Lesson-03-Branching-Strategies", "Branching & Merging", "Lightweight pointer branches, git switch, 3-way merges, and fast-forward rebasing."),
    ("Lesson 04", "Lesson-04-Remote-Repositories-GitHub", "Remote Repositories & GitHub", "Connecting to GitHub with SSH keys, git remote add, and upstream tracking."),
    ("Lesson 05", "Lesson-05-Pull-Requests-Collaboration", "Pull Requests & Code Reviews", "PR templates, peer code review audits, approval flows, and CI status checks."),
    ("Lesson 06", "Lesson-06-Conflict-Resolution-Best-Practices", "Conflict Resolution & Best Practices", "Decoding conflict markers, safe aborts, rebasing, and reflog disaster recovery.")
]
meta_list = ch09_lessons_meta
update_chapter_index(
    "Chapters/Chapter-09-Git & GitHub/index.html",
    "Chapter 09 | Git & GitHub Version Control",
    "Chapter 09",
    "Git & GitHub Engineering Workflows",
    "Master the industry standard for collaborative version control: commits, branching strategies, remote synchronizations, PRs, and conflict resolution.",
    [
        "Understand Git's distributed architecture and cryptographic snapshot trees.",
        "Craft atomic commits with conventional commit messages and strict .gitignore rules.",
        "Branch seamlessly and manage feature merges without breaking main.",
        "Collaborate on GitHub with pull requests, constructive code reviews, and remote forks."
    ],
    make_cards(ch09_lessons_meta),
    "../Chapter-08-Bootstrap/index.html",
    "Chapter 08: Bootstrap",
    "../Chapter-10-Final Project & Deployment/index.html",
    "Chapter 10: Capstone & Deployment"
)

# Chapter 10
ch10_lessons_meta = [
    ("Lesson 01", "Lesson-01-Capstone-Architecture", "Capstone Planning & Architecture", "User stories, wireframing, module boundaries, and strict MVP scoping."),
    ("Lesson 02", "Lesson-02-Frontend-Integration", "Frontend Integration", "Connecting HTML5, CSS Grid, Flexbox, and JavaScript state into a cohesive app."),
    ("Lesson 03", "Lesson-03-Production-Optimization", "Production Bundling & Optimization", "Tree-shaking, CSS minification, WebP compression, and zero CLS layout shifts."),
    ("Lesson 04", "Lesson-04-Cloud-Deployment", "Cloud Hosting & CI/CD", "Automated GitHub Actions, Cloud Run container hosting, Vercel, and SSL domains."),
    ("Lesson 05", "Lesson-05-Performance-Auditing", "Lighthouse 100 & SEO Auditing", "Achieving 100/100 in Performance, Accessibility, Best Practices, and SEO."),
    ("Lesson 06", "Lesson-06-Post-Launch-Maintenance", "Maintenance & Developer Portfolio", "Error boundary telemetry, presenting work to hiring teams, and graduation.")
]
meta_list = ch10_lessons_meta
update_chapter_index(
    "Chapters/Chapter-10-Final Project & Deployment/index.html",
    "Chapter 10 | Final Capstone Project & Cloud Deployment",
    "Chapter 10",
    "Final Capstone Project & Production Deployment",
    "Synthesize all skills into an enterprise-grade production web application, audit for Lighthouse 100, and deploy live to the global cloud.",
    [
        "Plan and architect a complete multi-component web application from wireframe to code.",
        "Optimize bundle payloads, eliminate layout shifts, and compress assets for sub-second speeds.",
        "Configure automated CI/CD deployment pipelines using GitHub Actions.",
        "Pass Chrome DevTools Lighthouse audit with 100 scores across all 4 pillars."
    ],
    make_cards(ch10_lessons_meta),
    "../Chapter-09-Git & GitHub/index.html",
    "Chapter 09: Git & GitHub",
    "",
    ""
)

print("Chapters 08, 09, and 10 index.html updated successfully!")
