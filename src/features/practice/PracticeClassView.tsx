import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Terminal,
} from 'lucide-react';

interface PracticeClassViewProps {
  onAwardXp?: (amount: number) => void;
}

const STARTER_CODE = {
  html: `<div class="hero-card">
  <span class="tag">Zero-to-Website Practice</span>
  <h2>Pure CSS3 Architecture</h2>
  <p>Edit HTML and CSS live. Changes compile instantly inside an isolated sandbox.</p>
  <button id="counter-btn" class="interactive-btn">
    Clicks: <span id="count-num">0</span>
  </button>
</div>`,
  css: `body {
  margin: 0;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.hero-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 2rem;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
}

.tag {
  display: inline-block;
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
}

p {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.interactive-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.interactive-btn:hover {
  background: #dc2626;
}`,
  js: `let count = 0;
const btn = document.getElementById('counter-btn');
const num = document.getElementById('count-num');

if (btn && num) {
  btn.addEventListener('click', () => {
    count++;
    num.textContent = String(count);
  });
}`,
};

export const PracticeClassView: React.FC<PracticeClassViewProps> = () => {
  // Live Code editor state
  const [html, setHtml] = useState(STARTER_CODE.html);
  const [css, setCss] = useState(STARTER_CODE.css);
  const [js, setJs] = useState(STARTER_CODE.js);
  const [activeEditorTab, setActiveEditorTab] = useState<'html' | 'css' | 'js'>('html');
  const [runNonce, setRunNonce] = useState(0);

  const fullSource = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>
      try {
        ${js}
      } catch (e) {
        console.error(e);
      }
    </script>
  </body>
</html>`;

  const runCode = () => {
    setRunNonce((n) => n + 1);
  };

  return (
    <div className="app-main app-main--full" style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div className="section-heading-bar">
        <div>
          <h2>Live Code</h2>
          <p className="lead-paragraph" style={{ margin: '0.25rem 0 0 0', fontSize: 'var(--text-sm)' }}>
            Real-time HTML, standard CSS3, and JavaScript execution environment. Test layouts live, inspect browser rendering mechanics, and verify interactive scripting.
          </p>
        </div>
      </div>

      <div className="grid-two-column" style={{ minHeight: '580px' }}>
        {/* Editor Column */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {(['html', 'css', 'js'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveEditorTab(lang)}
                  className={`btn btn-sm ${activeEditorTab === lang ? 'btn-accent' : 'btn-secondary'}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => {
                  setHtml(STARTER_CODE.html);
                  setCss(STARTER_CODE.css);
                  setJs(STARTER_CODE.js);
                  setRunNonce((n) => n + 1);
                }}
                className="btn btn-secondary btn-sm"
                title="Reset to starter"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={runCode}
                className="btn btn-primary btn-sm"
              >
                <Play size={14} />
                <span>Run</span>
              </button>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex' }}>
            {activeEditorTab === 'html' && (
              <textarea
                aria-label="HTML code editor"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="form-textarea"
                style={{ flex: 1, height: '100%', minHeight: '480px', fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}
              />
            )}
            {activeEditorTab === 'css' && (
              <textarea
                aria-label="CSS code editor"
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="form-textarea"
                style={{ flex: 1, height: '100%', minHeight: '480px', fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}
              />
            )}
            {activeEditorTab === 'js' && (
              <textarea
                aria-label="JavaScript code editor"
                value={js}
                onChange={(e) => setJs(e.target.value)}
                className="form-textarea"
                style={{ flex: 1, height: '100%', minHeight: '480px', fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}
              />
            )}
          </div>
        </div>

        {/* Preview Column */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              <Terminal size={14} />
              <span>Live Browser Sandbox Output</span>
            </div>
            <span className="badge badge-success">Active Render</span>
          </div>
          <iframe
            key={runNonce}
            srcDoc={fullSource}
            title="Practice Sandbox Preview"
            style={{
              flex: 1,
              width: '100%',
              minHeight: '480px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#0f172a',
            }}
            sandbox="allow-scripts allow-modals"
          />
        </div>
      </div>
    </div>
  );
};
