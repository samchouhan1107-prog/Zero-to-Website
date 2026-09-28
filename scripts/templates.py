import os
import html

def create_lesson_html(chapter_num, chapter_name, lesson_num, lesson_title, tagline, duration, summary_items, objectives, sections, code_example):
    summary_html = "".join([f"""
                <div class="summary-card">
                    <h3>{item['title']}</h3>
                    <p>{item['desc']}</p>
                </div>""" for item in summary_items])

    objectives_html = "".join([f"<li>✔ {obj}</li>\n" for obj in objectives])

    sections_html = ""
    for s in sections:
        bullets = "".join([f"<li>{b}</li>\n" for b in s.get('bullets', [])])
        sections_html += f"""
        <section class="chapter-section">
            <h2>{s['heading']}</h2>
            <p>{s['content']}</p>
            {"<ul class='chapter-list'>" + bullets + "</ul>" if bullets else ""}
        </section>"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lesson {lesson_num} | {lesson_title} - WZ Storehouse</title>
    <link rel="stylesheet" href="../../../Assets/css/main.css">
    <link rel="stylesheet" href="../../../Assets/css/lesson.css">
    <script src="../../../Assets/js/main.js" defer></script>
    <script src="../../../Assets/js/lesson.js" defer></script>
</head>
<body class="lesson-page">
    <header>
        <div class="logo">
            <a href="../../../index.html" class="logo-link">
                <h1>WZ STOREHOUSE</h1>
                <p>Learn • Practice • Build • Share</p>
            </a>
        </div>
        <nav>
            <a href="../../../index.html">🏠 Home</a>
            <a href="../index.html">⬅ {chapter_name}</a>
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
            <span class="chapter-badge">Chapter {chapter_num} • Lesson {lesson_num}</span>
            <h1>{lesson_title}</h1>
            <p>{tagline}</p>

            <div class="info-grid">
                {summary_html}
            </div>
        </section>

        <section class="chapter-section">
            <h2>🎯 Learning Objectives</h2>
            <ul class="chapter-list">
                {objectives_html}
            </ul>
        </section>

        {sections_html}

        <section class="chapter-section">
            <h2>💻 Interactive Code Demo</h2>
            <p>Review the snippet below, then try the hands-on practice challenge.</p>
            <div class="code-playground">
                <div class="editor-panel">
                    <h3>Source Snippet</h3>
                    <textarea id="htmlEditor">{html.escape(code_example)}</textarea>
                    <button id="runCodeBtn" class="btn primary" style="margin-top: 12px; align-self: flex-start;">Run Code ⚡</button>
                </div>
                <div class="preview-panel">
                    <h3>Live Output</h3>
                    <iframe id="previewWindow" title="Live Preview" style="width: 100%; height: 260px; border: none; border-radius: 8px; background: white;"></iframe>
                </div>
            </div>
        </section>

        <section class="chapter-section chapter-nav-links" style="display: flex; gap: 12px; margin-top: 24px;">
            <a href="practice.html" class="btn primary">Start Practice Challenge ⚡</a>
            <a href="../index.html" class="btn secondary">Back to Chapter Overview</a>
        </section>
    </main>
    <footer>
        <p>WZ Storehouse | Version 2.0 | Developed by Sameer Chouhan | &copy; 2026 All Rights Reserved.</p>
    </footer>
</body>
</html>
"""

def create_practice_html(chapter_num, chapter_name, lesson_num, practice_title, challenge_desc, tasks, starter_code):
    tasks_html = "".join([f"<li>{i+1}. {task}</li>\n" for i, task in enumerate(tasks)])

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice Challenge {lesson_num} | {practice_title} - WZ Storehouse</title>
    <link rel="stylesheet" href="../../../Assets/css/main.css">
    <link rel="stylesheet" href="../../../Assets/css/lesson.css">
    <script src="../../../Assets/js/main.js" defer></script>
    <script src="../../../Assets/js/lesson.js" defer></script>
</head>
<body class="lesson-page">
    <header>
        <div class="logo">
            <a href="../../../index.html" class="logo-link">
                <h1>WZ STOREHOUSE</h1>
                <p>Learn • Practice • Build • Share</p>
            </a>
        </div>
        <nav>
            <a href="../../../index.html">🏠 Home</a>
            <a href="lesson.html">⬅ Back to Lesson</a>
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
            <span class="chapter-badge">Practice Challenge {chapter_num}.{lesson_num}</span>
            <h1>{practice_title}</h1>
            <p>{challenge_desc}</p>
        </section>

        <section class="chapter-section">
            <h2>🎯 Challenge Tasks (Level: Age 15+ to Professional)</h2>
            <ul class="chapter-list">
                {tasks_html}
            </ul>
        </section>

        <section class="chapter-section">
            <h2>💻 Interactive Coding Sandbox</h2>
            <div class="code-playground">
                <div class="editor-panel">
                    <h3>Code Editor (HTML, CSS &amp; JavaScript)</h3>
                    <textarea id="htmlEditor">{html.escape(starter_code)}</textarea>
                    <button id="runCodeBtn" class="btn primary" style="margin-top: 12px; align-self: flex-start;">Run Code ⚡</button>
                </div>
                <div class="preview-panel">
                    <h3>Live Output Preview</h3>
                    <iframe id="previewWindow" title="Live Preview" style="width: 100%; height: 320px; border: none; border-radius: 8px; background: white;"></iframe>
                </div>
            </div>
        </section>

        <section class="chapter-section chapter-nav-links" style="display: flex; gap: 12px; margin-top: 24px;">
            <a href="lesson.html" class="btn secondary">⬅ Review Lesson Theory</a>
            <a href="../index.html" class="btn primary">Chapter Index ➜</a>
        </section>
    </main>
    <footer>
        <p>WZ Storehouse | Practice Class Matrix | &copy; 2026 All Rights Reserved.</p>
    </footer>
</body>
</html>
"""
