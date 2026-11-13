import { CHAPTERS_DATA } from '../src/data/chaptersData';
import { verifyUserAccess, getRightsRecordById } from './ownership-licensing';
import { defaultPaymentEngine } from './payments';

/**
 * ============================================================================
 * DOWNLOADS & RESOURCE EXPORT SERVICE
 * Provides formatted PDF snapshots, offline markdown study packs, and starter
 * code exercises protected by server-side payment & licensing verification.
 * Publisher Attribution: Sameer Chouhan / WebZoneBW
 * ============================================================================
 */

export function generatePrintablePdfHtml(
  lessonId: string,
  userId: string = '',
  studentName: string = 'Authorized Student'
): { success: boolean; html?: string; filename?: string; error?: string } {
  const chapter = CHAPTERS_DATA.find((c) => c.lessons.some((l) => l.id === lessonId));
  const lesson = chapter?.lessons.find((l) => l.id === lessonId);

  if (!chapter || !lesson) {
    return { success: false, error: `Lesson "${lessonId}" could not be located.` };
  }

  const isFreeSample = chapter.number === '0' || chapter.number === '00' || chapter.id === 'ch-00';
  const entitlement = userId ? defaultPaymentEngine.getStudentEntitlement(userId) : null;
  const accessCheck = userId
    ? verifyUserAccess(userId, 'curriculum-core-webzone', 'downloadable-learning')
    : { hasAccess: false };

  const isAuthorized = Boolean(isFreeSample || entitlement?.hasDownloadAccess || accessCheck.hasAccess);

  if (!isAuthorized) {
    return {
      success: false,
      error:
        'Download restricted: A merchant-verified Monthly Membership ($19/mo) or Downloadable Study Pack Licence is required to export offline PDF textbooks.',
    };
  }

  const rights = getRightsRecordById('curriculum-core-webzone');
  const now = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const objectivesList = lesson.learningObjectives
    .map((o) => `<li style="margin-bottom: 6px;">✓ ${escapeHtml(o)}</li>`)
    .join('');

  const theoryHtml = lesson.theorySections
    .map(
      (sec) => `
      <section style="margin: 24px 0;">
        <h3 style="font-size: 18px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px;">
          ${escapeHtml(sec.heading)}
        </h3>
        <p style="font-size: 15px; line-height: 1.7; color: #334155;">
          ${escapeHtml(sec.content)}
        </p>
        ${
          sec.bulletPoints?.length
            ? `<ul style="margin: 12px 0 12px 20px; line-height: 1.6; color: #334155;">
                ${sec.bulletPoints.map((bp) => `<li>${escapeHtml(bp)}</li>`).join('')}
              </ul>`
            : ''
        }
      </section>
    `
    )
    .join('');

  const codeBlocks = [
    lesson.codeExample.html ? `<!-- HTML -->\n${lesson.codeExample.html}` : '',
    lesson.codeExample.css ? `/* CSS */\n${lesson.codeExample.css}` : '',
    lesson.codeExample.js ? `// JavaScript\n${lesson.codeExample.js}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  const printableDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(lesson.title)} — Zero-to-Website Textbook Study Pack</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
      @bottom-right {
        content: counter(page);
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    .watermark-header {
      border-bottom: 2px solid #7c3aed;
      padding-bottom: 12px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .chapter-badge {
      display: inline-block;
      background-color: #f5f3ff;
      color: #7c3aed;
      border: 1px solid #ddd6fe;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 28px;
      font-weight: 800;
      line-height: 1.25;
      margin: 0 0 8px 0;
      color: #0f172a;
    }
    .tagline {
      font-size: 16px;
      color: #475569;
      font-style: italic;
      margin-bottom: 24px;
      border-left: 3px solid #0284c7;
      padding-left: 14px;
    }
    .objectives-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #0284c7;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 28px;
    }
    .code-card {
      background: #0f172a;
      color: #e2e8f0;
      border-radius: 8px;
      padding: 18px 22px;
      font-family: Consolas, Monaco, "Courier New", monospace;
      font-size: 13px;
      line-height: 1.55;
      overflow-x: auto;
      margin: 24px 0;
    }
    .practice-box {
      background: #faf5ff;
      border: 2px solid #7c3aed;
      border-radius: 8px;
      padding: 18px 22px;
      margin: 28px 0;
    }
    .license-footer {
      margin-top: 48px;
      padding-top: 16px;
      border-top: 1px solid #cbd5e1;
      font-size: 11px;
      color: #64748b;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="watermark-header">
    <div>Zero-to-Website Academy · Official Learning Resource Pack</div>
    <div>Licenced to: ${escapeHtml(studentName)} · ${now}</div>
  </div>

  <span class="chapter-badge">Chapter ${chapter.number}: ${escapeHtml(chapter.title)}</span>
  <h1>${escapeHtml(lesson.title)}</h1>
  <p class="tagline">${escapeHtml(lesson.tagline)}</p>

  <div class="objectives-box">
    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #0284c7; margin-bottom: 8px;">
      Learning Outcomes &amp; Core Takeaways
    </div>
    <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; color: #334155;">
      ${objectivesList}
    </ul>
  </div>

  ${theoryHtml}

  <section style="margin: 28px 0;">
    <h3 style="font-size: 18px; color: #0f172a; margin-bottom: 8px;">
      ${escapeHtml(lesson.codeExample.title)}
    </h3>
    <p style="font-size: 14px; color: #475569; margin-bottom: 12px;">
      ${escapeHtml(lesson.codeExample.description)}
    </p>
    <div class="code-card">
      <pre style="margin: 0;"><code>${escapeHtml(codeBlocks)}</code></pre>
    </div>
  </section>

  <section class="practice-box">
    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #7c3aed; margin-bottom: 6px;">
      Hands-on Practice Sandbox Assignment
    </div>
    <h4 style="font-size: 16px; margin: 0 0 8px 0; color: #0f172a;">${escapeHtml(lesson.practice.title)}</h4>
    <p style="font-size: 14px; color: #334155; margin: 0 0 12px 0;">${escapeHtml(lesson.practice.prompt)}</p>
    <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
      ${lesson.practice.instructions.map((ins) => `<li>${escapeHtml(ins)}</li>`).join('')}
    </ol>
  </section>

  <footer class="license-footer">
    <p style="margin: 0 0 4px 0; font-weight: 600;">
      ${escapeHtml(rights?.copyrightNotice || '© Sameer Chouhan / WebZoneBW. All rights reserved.')}
    </p>
    <p style="margin: 0;">
      Publisher: Sameer Chouhan / WebZoneBW. Licenced for personal self-study under the Zero-to-Website Learning Licence. Unauthorized commercial redistribution, scraping, public mirroring, or resale is strictly prohibited.
    </p>
  </footer>
</body>
</html>`;

  return {
    success: true,
    html: printableDoc,
    filename: `zero-to-website-ch${chapter.number}-${lesson.id}.html`,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
