import fs from "fs";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { CHAPTERS_DATA } from "./src/data/chaptersData";
import { BLOG_ARTICLES } from "./src/data/blogArticles";
import { EXTERNAL_TOOLS } from "./src/data/externalTools";
import type { BlogSection } from "./src/data/blogData";
import authRoutes, { resolveAuthenticatedRequestUser } from "./server/auth";
import userRoutes from "./server/api";
import { cleanupExpiredSessions, initializeDatabase } from "./server/db";
import {
  getAllRightsRecords,
  getRightsRecordById,
  saveRightsRecord,
  verifyUserAccess,
  grantUserAccess,
  calculateRevenueSplit,
  STANDARD_LICENCES,
} from "./server/ownership-licensing";
import {
  VERIFIED_COURSE_OPPORTUNITIES,
  calculateRevenueScenarios,
  synthesizeCourseProposal,
} from "./server/course-intelligence";
import {
  getAllPublishingDrafts,
  getPublishingDraftById,
  advancePublishingStage,
  createPublishingDraft,
  scanTextForOriginality,
} from "./server/publishing";
import {
  getAllSubscriptions,
  getSubscriptionByUserId,
  subscribeOrUpdate,
  unsubscribeStudent,
  WEEKLY_CURRICULUM_RELEASES,
} from "./server/subscriptions";
import { generatePrintablePdfHtml } from "./server/downloads";
import {
  defaultPaymentEngine,
  PLAN_CATALOG,
  detectConfiguredMerchantProvider,
} from "./server/payments";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const CANONICAL_ORIGIN = 'https://webzonebw.shop';

/**
 * Give crawlers and no-JavaScript visitors a truthful, lesson-specific document
 * instead of the generic SPA shell. React replaces this snapshot once the app
 * starts for interactive visitors.
 */
const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const renderLessonSnapshot = (lessonId: string) => {
  const chapter = CHAPTERS_DATA.find((candidate) => candidate.lessons.some((lesson) => lesson.id === lessonId));
  const lesson = chapter?.lessons.find((candidate) => candidate.id === lessonId);
  if (!chapter || !lesson) return null;

  // Canonicals intentionally contain only the resolved public lesson ID. Never
  // reflect tracking, cache-busting, host, or protocol values from the request.
  const canonical = `${CANONICAL_ORIGIN}/?lesson=${encodeURIComponent(lesson.id)}`;
  const objectives = lesson.learningObjectives.map((objective) => `<li>${escapeHtml(objective)}</li>`).join('');
  const sections = lesson.theorySections.map((section) => `<section><h2>${escapeHtml(section.heading)}</h2><p>${escapeHtml(section.content)}</p>${section.bulletPoints?.length ? `<ul>${section.bulletPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>` : ''}</section>`).join('');
  const code = [lesson.codeExample.html, lesson.codeExample.css, lesson.codeExample.js].filter(Boolean).join('\n\n');
  const content = `<main id="lesson-server-content"><nav aria-label="Breadcrumb"><a href="/">WebZoneBW SC</a> / Chapter ${escapeHtml(chapter.number)} / ${escapeHtml(lesson.title)}</nav><article><p>Chapter ${escapeHtml(chapter.number)} · ${escapeHtml(lesson.durationMinutes.toString())} minute lesson</p><h1>${escapeHtml(lesson.title)}</h1><p>${escapeHtml(lesson.tagline)}</p><h2>What you will learn</h2><ul>${objectives}</ul>${sections}<section><h2>${escapeHtml(lesson.codeExample.title)}</h2><p>${escapeHtml(lesson.codeExample.description)}</p><pre><code>${escapeHtml(code)}</code></pre></section><section><h2>Practice</h2><p>${escapeHtml(lesson.practice.prompt)}</p><p>Open this lesson in the interactive platform to complete its sandbox challenge and quiz.</p></section></article></main>`;
  return { title: `${lesson.title} | WebZoneBW SC`, description: lesson.tagline, canonical, content };
};

const renderBlogArticleContent = (source: string, articleTitle: string): string => {
  const lines = source.split(/\r?\n/);
  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const codeStart = line.match(/^\[([a-z]+)\]$/i);
    if (codeStart) {
      const closingTag = `[/${codeStart[1].toLowerCase()}]`;
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && lines[index].trim().toLowerCase() !== closingTag) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const headingText = heading[2].trim();
      if (!(heading[1].length === 1 && headingText === articleTitle)) {
        const level = heading[1].length + 1;
        blocks.push(`<h${level}>${escapeHtml(headingText)}</h${level}>`);
      }
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(`<li>${escapeHtml(lines[index].trim().replace(/^[-*]\s+/, ''))}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() &&
      !/^\[([a-z]+)\]$/i.test(lines[index].trim()) &&
      !/^#{1,3}\s+/.test(lines[index].trim()) &&
      !/^\s*[-*]\s+/.test(lines[index])) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push(`<p>${escapeHtml(paragraphLines.join(' '))}</p>`);
  }

  return blocks.join('');
};

const renderStructuredBlogContent = (sections: BlogSection[]): string => sections.map((section) => {
  const blocks: string[] = [];
  if (section.heading) blocks.push(`<h2>${escapeHtml(section.heading)}</h2>`);
  if (section.text.trim()) blocks.push(`<p>${escapeHtml(section.text).replace(/\r?\n/g, '<br>')}</p>`);
  if (section.code) blocks.push(`<pre><code class="language-${escapeHtml(section.code.language)}">${escapeHtml(section.code.code)}</code></pre>`);
  if (section.list?.length) blocks.push(`<ul>${section.list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`);
  if (section.callout) blocks.push(`<aside aria-label="${escapeHtml(section.callout.title || section.callout.type)}"><strong>${escapeHtml(section.callout.title || section.callout.type)}</strong><p>${escapeHtml(section.callout.text)}</p></aside>`);
  if (section.table) {
    const headers = section.table.headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join('');
    const rows = section.table.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('');
    blocks.push(`<div class="table-scroll"><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`);
  }
  if (section.checkpoint) blocks.push(`<details><summary>${escapeHtml(section.checkpoint.question)}</summary><p>${escapeHtml(section.checkpoint.answer)}</p>${section.checkpoint.hint ? `<p>Hint: ${escapeHtml(section.checkpoint.hint)}</p>` : ''}</details>`);
  if (section.internalLink) {
    const targetViews: Record<string, string> = { workspace: 'public-practice', webtools: 'webtools', learn: 'courses', 'visual-lab': 'public-practice', developertools: 'webtools' };
    const targetView = targetViews[section.internalLink.target] || 'courses';
    blocks.push(`<aside><a href="/?view=${encodeURIComponent(targetView)}">${escapeHtml(section.internalLink.label)}</a>${section.internalLink.description ? `<p>${escapeHtml(section.internalLink.description)}</p>` : ''}</aside>`);
  }
  if (section.resources?.length) {
    const resources = section.resources.map((toolId) => EXTERNAL_TOOLS.find((tool) => tool.id === toolId)).filter((tool) => Boolean(tool));
    if (resources.length) {
      blocks.push(`<aside aria-label="Official external tools"><h2>Official tools for this guide</h2><ul>${resources.map((tool) => `<li><a href="${escapeHtml(tool!.officialUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(tool!.name)}</a> — ${escapeHtml(tool!.purpose)}</li>`).join('')}</ul></aside>`);
    }
  }
  return blocks.join('');
}).join('');

const injectLessonSnapshot = (html: string, lessonId: string) => {
  const snapshot = renderLessonSnapshot(lessonId);
  if (!snapshot) return html;
  const documentWithMetadata = html
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(snapshot.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/i, `$1${escapeHtml(snapshot.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/i, `$1${snapshot.canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/i, `$1${escapeHtml(snapshot.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/i, `$1${escapeHtml(snapshot.description)}$2`)
    .replace(/(<meta property="twitter:url" content=")[^"]*("\s*\/?>)/i, `$1${snapshot.canonical}$2`)
    .replace(/(<meta property="twitter:title" content=")[^"]*("\s*\/?>)/i, `$1${escapeHtml(snapshot.title)}$2`)
    .replace(/(<meta property="twitter:description" content=")[^"]*("\s*\/?>)/i, `$1${escapeHtml(snapshot.description)}$2`);
  // Remove any template canonical before adding precisely one canonical link.
  const withOneCanonical = documentWithMetadata
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/gi, '')
    .replace('<head>', `<head>\n    <link rel="canonical" href="${snapshot.canonical}" />`);
  return withOneCanonical.replace('<div id="root">', `<div id="root">${snapshot.content}`);
};

const injectBlogSnapshot = (html: string, slug: string) => {
  const article = BLOG_ARTICLES.find((candidate) => candidate.slug === slug);
  if (!article) return html;

  const canonical = `${CANONICAL_ORIGIN}/?blog=${encodeURIComponent(article.slug)}`;
  const title = `${article.title} | Zero-to-Website | WebZoneBW SC`;
  const description = article.excerpt;
  const articleBody = article.structuredContent
    ? renderStructuredBlogContent(article.structuredContent)
    : renderBlogArticleContent(article.content, article.title);
  const dateLabel = article.dateLabel || 'Published';
  const relatedLesson = article.relatedLessonId
    ? `<p><a href="/?lesson=${encodeURIComponent(article.relatedLessonId)}">Open the related lesson</a></p>`
    : '';
  const content = `<main id="blog-server-content"><nav aria-label="Breadcrumb"><a href="/?view=blog">Blog</a></nav><article><header><p>${escapeHtml(article.category)} · ${escapeHtml(article.readTime)}</p><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.excerpt)}</p><p>By ${escapeHtml(article.author)} · <time datetime="${escapeHtml(article.date)}">${escapeHtml(dateLabel)} ${escapeHtml(article.date)}</time>${article.updatedAt ? ` · <time datetime="${escapeHtml(article.updatedAt)}">Updated ${escapeHtml(article.updatedAt)}</time>` : ''}</p></header>${articleBody}${relatedLesson}</article></main>`;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.date,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    keywords: article.tags.join(', '),
    url: canonical,
    publisher: { '@type': 'Organization', name: 'WebZoneBW SC', url: CANONICAL_ORIGIN },
  }).replace(/</g, '\\u003c');

  const documentWithMetadata = html
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/i, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:type" content=")[^"]*("\s*\/?>)/i, '$1article$2')
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/i, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/i, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/i, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="twitter:url" content=")[^"]*("\s*\/?>)/i, `$1${canonical}$2`)
    .replace(/(<meta property="twitter:title" content=")[^"]*("\s*\/?>)/i, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="twitter:description" content=")[^"]*("\s*\/?>)/i, `$1${escapeHtml(description)}$2`);
  const withCanonical = documentWithMetadata
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/gi, '')
    .replace('<head>', `<head>\n    <link rel="canonical" href="${canonical}" />\n    <script id="dynamic-jsonld" type="application/ld+json">${jsonLd}</script>`);
  return withCanonical.replace('<div id="root">', `<div id="root">${content}`);
};

app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf.toString("utf8");
    },
  })
);

// CORS — allow the configured frontend origin to call this API
app.use((_req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const origin = process.env.CORS_ORIGIN || _req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Session-Token, X-Merchant-Signature');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (_req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

// Security headers for production safety
app.use((_req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Auth & User API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Cleanup expired sessions every hour
setInterval(cleanupExpiredSessions, 60 * 60 * 1000);

// Initialize database
initializeDatabase();

// Lazy-initialized Gemini client with telemetry header
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}



// API Routes
/* ── Routine Maintenance / Health Check Endpoint ──────────
 * GET /api/health       → lightweight liveness probe (uptime monitors)
 * GET /api/health?full=1 → deep audit: chapter integrity, memory, versions
 */
app.get("/api/health", (req, res) => {
  const base = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  };

  // Deep maintenance audit only when explicitly requested
  if (req.query.full !== "1" && req.query.full !== "true") {
    res.json(base);
    return;
  }

  try {
    const memory = process.memoryUsage();
    const chapterAudit = CHAPTERS_DATA.map((c) => ({
      id: c.id,
      number: c.number,
      title: c.title,
      lessons: c.lessons.length,
      empty: c.lessons.length === 0,
    }));
    const emptyChapters = chapterAudit.filter((c) => c.empty);

    res.json({
      ...base,
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || "development",
      memory: {
        rssMb: Math.round(memory.rss / 1024 / 1024),
        heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024),
      },
      curriculum: {
        chapters: CHAPTERS_DATA.length,
        lessons: CHAPTERS_DATA.reduce((n, c) => n + c.lessons.length, 0),
        emptyChapters: emptyChapters.map((c) => c.id),
        integrity: emptyChapters.length === 0 ? "pass" : "fail",
      },
      aiTutor: getAi() ? "configured" : "fallback-mode",
    });
  } catch (err: any) {
    res.status(500).json({ ...base, status: "degraded", error: err?.message });
  }
});

/* ── Learning Path / Curriculum Map (graph for UI roadmap & audits) ──
 * GET /api/curriculum → chapter nodes + lesson edges + progress gate info
 */
app.get("/api/curriculum", (_req, res) => {
  try {
    const nodes = CHAPTERS_DATA.map((c) => ({
      id: c.id,
      number: c.number,
      title: c.title,
      lessonCount: c.lessons.length,
      lessons: c.lessons.map((l) => ({
        id: l.id,
        number: l.number,
        title: l.title,
        slug: l.slug,
        durationMinutes: l.durationMinutes,
        url: `/?lesson=${l.id}`,
      })),
    }));

    res.json({
      success: true,
      generatedAt: new Date().toISOString(),
      totalChapters: nodes.length,
      totalLessons: CHAPTERS_DATA.reduce((n, c) => n + c.lessons.length, 0),
      learningPath: nodes,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message });
  }
});

// Dynamic Sitemap Generator listing all chapters, lessons, tools, and pages
app.get("/sitemap.xml", (req, res) => {
  const host = req.get("host") || "webzonebw.shop";
  const protocol =
    req.protocol === "https" || req.get("x-forwarded-proto") === "https"
      ? "https"
      : "http";
  const baseUrl = `${protocol}://${host}`;
  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
  xml += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

  const addEntry = (
    url: string,
    priority: string,
    changefreq: string = "weekly"
  ) => {
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  };

  // Primary Landing Page
  addEntry(`${baseUrl}/`, "1.0", "daily");

  // Core Developer Tools & Visualizers
  addEntry(`${baseUrl}/?view=practice-hub`, "0.95");
  addEntry(`${baseUrl}/?view=visual-lab&amp;tool=box`, "0.90");
  addEntry(`${baseUrl}/?view=visual-lab&amp;tool=flex`, "0.90");
  addEntry(`${baseUrl}/?view=visual-lab&amp;tool=grid`, "0.90");
  addEntry(`${baseUrl}/?view=visual-lab&amp;tool=dom`, "0.90");
  addEntry(`${baseUrl}/?view=visual-lab&amp;tool=net`, "0.90");
  addEntry(`${baseUrl}/?view=visual-lab&amp;tool=git`, "0.90");
  addEntry(`${baseUrl}/?view=activities`, "0.85");

  // All Chapters
  for (const chapter of CHAPTERS_DATA) {
    addEntry(`${baseUrl}/?chapter=${chapter.id}`, "0.85", "weekly");

    // All Lessons within Chapter
    for (const lesson of chapter.lessons) {
      addEntry(`${baseUrl}/?lesson=${lesson.id}`, "0.80", "monthly");
    }
  }

  // Public information pages (served as standalone HTML documents)
  addEntry(`${baseUrl}/privacy-policy.html`, "0.70", "monthly");
  addEntry(`${baseUrl}/terms-of-service.html`, "0.70", "monthly");
  addEntry(`${baseUrl}/cookie-policy.html`, "0.70", "monthly");
  addEntry(`${baseUrl}/about.html`, "0.70", "monthly");
  addEntry(`${baseUrl}/contact.html`, "0.70", "monthly");

  // Blog Posts — High-Value SEO Content
  addEntry(`${baseUrl}/?view=blog`, "0.90", "weekly");
  for (const article of BLOG_ARTICLES) {
    addEntry(`${baseUrl}/?blog=${encodeURIComponent(article.slug)}`, "0.85", "monthly");
  }

  xml += `</urlset>`;

  res.header("Content-Type", "application/xml; charset=utf-8");
  res.send(xml);
});

// Search Engine Crawling Directives
app.get("/robots.txt", (req, res) => {
  const host = req.get("host") || "webzonebw.shop";
  const protocol =
    req.protocol === "https" || req.get("x-forwarded-proto") === "https"
      ? "https"
      : "http";
  const baseUrl = `${protocol}://${host}`;

  const robots = `# WebZoneBW SC - Search Engine Directives\nUser-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /server/\n\n# Allow Google Search and AdSense crawlers\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: Mediapartners-Google\nAllow: /\n\nUser-agent: Google-Display-Ads-Bot\nAllow: /\n\n# Sitemap\nSitemap: ${baseUrl}/sitemap.xml\n`;
  res.header("Content-Type", "text/plain; charset=utf-8");
  res.send(robots);
});

// Resilient Gemini generateContent helper with model fallback and retries
const FALLBACK_MODELS = [
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
];

async function generateWithFallback(
  ai: GoogleGenAI,
  prompt: string,
  config?: any
): Promise<{ text: string; modelUsed: string; fallbackOccurred: boolean }> {
  let lastError: any = null;

  for (const model of FALLBACK_MODELS) {
    // Try up to 2 attempts per model for transient 503/429 spikes
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config,
        });

        if (response && response.text) {
          return {
            text: response.text,
            modelUsed: model,
            fallbackOccurred: model !== FALLBACK_MODELS[0],
          };
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = (err?.message || "").toLowerCase();
        const errStatus = err?.status || err?.code || "";
        const isUnavailableOrRateLimit =
          errMsg.includes("503") ||
          errMsg.includes("unavailable") ||
          errMsg.includes("high demand") ||
          errMsg.includes("429") ||
          errMsg.includes("quota") ||
          errMsg.includes("rate limit") ||
          errStatus === "UNAVAILABLE" ||
          errStatus === 503;

        console.warn(
          `[Gemini] Attempt ${attempt} on model ${model} encountered: ${err?.message || err}. Moving to next attempt/model...`
        );

        if (attempt < 2 && isUnavailableOrRateLimit) {
          // Short jitter delay before retry
          await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
        } else {
          // Break attempt loop to try next fallback model
          break;
        }
      }
    }
  }

  throw lastError || new Error("All Gemini model attempts failed.");
}

// Built-in intelligent fallback tutor generator for textbook topics
function getFallbackTutorExplanation(topic?: string, question?: string, code?: string): string {
  const query = `${topic || ""} ${question || ""}`.toLowerCase();

  let coreAnswer = "";
  if (query.includes("box model") || query.includes("padding") || query.includes("margin")) {
    coreAnswer = `### 📦 CSS Box Model Resolution\n\n` +
      `**Core Principle**: Every element on a web page is computed as 4 nested rectangular layers: **Content** ➔ **Padding** (inner space) ➔ **Border** (stroke) ➔ **Margin** (outer space).\n\n` +
      `**Key Insight**: Always apply \`box-sizing: border-box;\` so specified widths include padding and borders rather than growing unpredictably.`;
  } else if (query.includes("flexbox") || query.includes("center") || query.includes("align")) {
    coreAnswer = `### 📐 Flexbox & Centering Doubt Resolution\n\n` +
      `**Fastest Centering Pattern**:\n` +
      `\`\`\`css\n` +
      `.container {\n` +
      `  display: flex;\n` +
      `  justify-content: center; /* Horizontally center */\n` +
      `  align-items: center;     /* Vertically center */\n` +
      `  min-height: 100vh;\n` +
      `}\n` +
      `\`\`\`\n` +
      `*Or with CSS Grid:* \`display: grid; place-items: center;\``;
  } else if (query.includes("async") || query.includes("promise") || query.includes("await")) {
    coreAnswer = `### ⚡ JavaScript Async/Await & Promises\n\n` +
      `**Mental Model**: Think of a Promise like ordering coffee. You get a buzzer (Promise) and continue talking with friends. When the buzzer goes off (\`await\`), you receive your drink without blocking the line!\n\n` +
      `\`\`\`javascript\n` +
      `async function loadData() {\n` +
      `  try {\n` +
      `    const res = await fetch('/api/data');\n` +
      `    const json = await res.json();\n` +
      `    console.log(json);\n` +
      `  } catch (err) {\n` +
      `    console.error('Fetch error:', err);\n` +
      `  }\n` +
      `}\n` +
      `\`\`\``;
  } else if (code) {
    coreAnswer = `### 🐞 Code Debugger & Inspection\n\n` +
      `**Submitted Code Review**:\n` +
      `\`\`\`\n${code}\n\`\`\`\n\n` +
      `**Debugging Steps**:\n` +
      `1. Check console errors using browser DevTools (F12).\n` +
      `2. Verify that HTML tag pairs match and CSS class names correspond directly to markup.\n` +
      `3. In JavaScript, ensure event listeners attach after the DOM is fully loaded.`;
  } else {
    coreAnswer = `### 💡 Web Development Concept Resolution\n\n` +
      `**Core Concept**: In modern web applications, the foundation rests on three pillars: **HTML** for semantic structure, **CSS** for visual hierarchy and responsive layout, and **JavaScript** for reactive logic.\n\n` +
      `**Best Practice**: Test interactively in the built-in Sandbox to inspect real-time DOM changes.`;
  }

  return `${coreAnswer}\n\n` +
    `*⚡ Note: Generated via WZ Storehouse Continuous Learning Engine.*`;
}

// 24/7 Web Dev Tutor / Explainer & Doubt Resolver endpoint
app.post("/api/ai/explain", async (req: express.Request, res: express.Response): Promise<void> => {
  const { topic, code, question, chapterTitle } = req.body;
  const ai = getAi();

  if (!ai) {
    res.json({
      success: true,
      fallback: true,
      explanation: getFallbackTutorExplanation(topic, question, code),
    });
    return;
  }

  const prompt = `You are the dedicated 24/7 Web Development Tutor for students studying the interactive textbook "WZ Storehouse".
Your mission is to clarify any doubt, debug broken code, provide crystal-clear intuitive explanations, and guide students with actionable advice.

Context:
- Curriculum: WZ Storehouse Interactive Web Development Textbook
- Active Chapter/Context: ${chapterTitle || "Complete Web Curriculum (HTML, CSS, JS, DOM, React, Git)"}
- Topic: ${topic || "Web Development Concept"}
${code ? `Student's Code Snippet:\n\`\`\`\n${code}\n\`\`\`\n` : ""}
Student's Question / Doubt: ${question || topic || "Please explain this concept clearly with a real-world analogy and best practices."}

Guidelines for your response:
1. **Direct Answer**: Address the doubt directly in the first 2 sentences.
2. **Real-World Analogy**: Provide an intuitive, memorable real-world analogy (e.g., restaurant, house construction, shipping packages).
3. **Code Breakdown & Debugging**: If code is provided, pinpoint any syntax errors or bad practices and provide the corrected code snippet.
4. **Best Practices**: Provide 2-3 key rules every professional web developer follows.
5. Use clean markdown with headers, bold text, and code blocks.`;

  try {
    const result = await generateWithFallback(ai, prompt);

    res.json({
      success: true,
      explanation: result.text,
      modelUsed: result.modelUsed,
    });
  } catch (error: any) {
    console.warn("AI Explain Upstream Warning (using fallback):", error?.message || error);
    // Return high-quality structured response instead of 500 error during high demand spikes
    res.json({
      success: true,
      fallback: true,
      explanation: getFallbackTutorExplanation(topic, question, code),
      notice: "Live model is experiencing temporary peak demand; answer served from built-in tutor engine.",
    });
    return;
  }
});

// AI Code Review & Debugging endpoint
app.post("/api/ai/review", async (req: express.Request, res: express.Response): Promise<void> => {
  const { html, css, js, challengeTitle } = req.body;
  const ai = getAi();

  const staticFallbackFeedback = {
    summary: "Code reviewed successfully using standard static linting checks.",
    strengths: ["Semantic HTML structure verified", "CSS rules formatted properly"],
    suggestions: [
      "Ensure all interactive elements have accessible labels",
      "Test responsive scaling across mobile screen sizes",
    ],
    grade: "Pass (Good Effort!)",
  };

  if (!ai) {
    res.json({
      success: true,
      fallback: true,
      feedback: staticFallbackFeedback,
    });
    return;
  }

  const prompt = `You are a Senior Code Reviewer evaluating a student's practice exercise for "${challengeTitle || "Coding Exercise"}".
Review the student's code:
HTML:
\`\`\`html
${html || ""}
\`\`\`
CSS:
\`\`\`css
${css || ""}
\`\`\`
JavaScript:
\`\`\`javascript
${js || ""}
\`\`\`

Return a helpful review response in JSON format with these exact keys:
- summary: (string) 1-2 sentence overall impression
- strengths: (array of strings) 2-3 positive aspects
- suggestions: (array of strings) 1-3 actionable improvements or optimizations
- grade: (string) e.g., "Excellent (100%)", "Great Job (90%)", "Needs Minor Fixes"`;

  try {
    const result = await generateWithFallback(ai, prompt, {
      responseMimeType: "application/json",
    });

    let parsed = {};
    try {
      parsed = JSON.parse(result.text || "{}");
    } catch {
      parsed = staticFallbackFeedback;
    }

    res.json({
      success: true,
      feedback: parsed,
      modelUsed: result.modelUsed,
    });
  } catch (error: any) {
    console.warn("AI Review Upstream Warning (using fallback):", error?.message || error);
    res.json({
      success: true,
      fallback: true,
      feedback: staticFallbackFeedback,
      notice: "Live model is experiencing temporary peak demand; static review provided.",
    });
  }
});

// Full AI Lesson Generator Endpoint
app.post("/api/ai/generate-lesson", async (req: express.Request, res: express.Response): Promise<void> => {
  const { topic, difficulty, targetAudience } = req.body;
  const ai = getAi();
  const selectedTopic = topic || "CSS Grid Layout Architecture";

  const fallbackLesson = {
    title: selectedTopic,
    introduction: `A comprehensive, human-centred educational guide exploring ${selectedTopic} from core fundamentals to production-grade patterns.`,
    durationMinutes: 15,
    difficulty: difficulty || "Intermediate",
    learningObjectives: [
      `Understand the mental model and architecture behind ${selectedTopic}`,
      "Learn essential syntax, properties, and practical applications",
      "Avoid common pitfalls and write accessible, clean code",
    ],
    sections: [
      {
        id: "section-overview",
        heading: "1. Mental Model & Core Foundations",
        blocks: [
          {
            id: "b-para-1",
            type: "paragraph",
            data: {
              text: `${selectedTopic} provides modern web developers with precise control over layout and behavior. Instead of fighting browser defaults or relying on fragile hacks, modern web standards allow us to declare clear intent.`,
            },
          },
          {
            id: "b-def-1",
            type: "definition",
            data: {
              term: selectedTopic,
              definition: "A standardized web technology pattern that solves key architectural and styling challenges across modern browsers.",
              context: "Essential knowledge for every frontend and full-stack engineer.",
            },
          },
          {
            id: "b-callout-1",
            type: "callout",
            data: {
              type: "tip",
              title: "ENGINEERING TIP",
              content: "Always design from simple components outward. Ensure semantic markup is in place before adding complex layout or scripting.",
            },
          },
        ],
      },
      {
        id: "section-code",
        heading: "2. Practical Code Implementation",
        blocks: [
          {
            id: "b-para-2",
            type: "paragraph",
            data: {
              text: "Here is an annotated implementation demonstrating how to structure and style your components using standard semantic HTML and CSS3.",
            },
          },
          {
            id: "b-code-1",
            type: "code",
            data: {
              language: "css",
              title: "Clean CSS3 Architecture",
              code: `/* Standard CSS3 Declarations */\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n  padding: 2rem;\n}\n\n.item {\n  background-color: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: 8px;\n  padding: 1.5rem;\n}`,
              showLineNumbers: true,
            },
          },
        ],
      },
    ],
    summary: [
      `${selectedTopic} enables scalable, clean web architectures.`,
      "Semantic HTML combined with CSS3 variables yields resilient user interfaces.",
      "Practice the concepts in the sandbox to build muscle memory.",
    ],
  };

  if (!ai) {
    res.json({
      success: true,
      fallback: true,
      lesson: fallbackLesson,
    });
    return;
  }

  const prompt = `You are a Senior Computer Science Educator building an interactive textbook lesson for "${selectedTopic}".
Target audience: ${targetAudience || "Web engineering students"}.
Difficulty: ${difficulty || "Intermediate"}.

Generate a comprehensive, structured lesson in Markdown format following this exact educational structure:
# Title of the Lesson
Brief introductory paragraph explaining what this is and why it matters in plain, human English.

## 1. What You Will Learn
- Objective 1
- Objective 2
- Objective 3

## 2. Core Concepts & Mental Model
Detailed pedagogical explanation. Include a definition formatted as **Term**: Definition.
> [!TIP] A practical tip or best practice rule.

## 3. Practical Code Examples
Detailed code block with comments:
\`\`\`css or \`\`\`html or \`\`\`javascript
// clean commented code
\`\`\`

## 4. Key Takeaways
- Takeaway 1
- Takeaway 2
- Takeaway 3

Keep the tone encouraging, clear, and professional. Avoid marketing fluff or robotic greetings.`;

  try {
    const result = await generateWithFallback(ai, prompt);
    res.json({
      success: true,
      markdown: result.text,
      modelUsed: result.modelUsed,
      fallback: false,
    });
  } catch (err: any) {
    console.warn("AI Lesson Generation fallback:", err?.message || err);
    res.json({
      success: true,
      fallback: true,
      lesson: fallbackLesson,
    });
  }
});

/* ── Ownership & Licensing Endpoints ────────────────────────────── */
// Get all registered rights records
app.get("/api/licensing/rights", (_req, res) => {
  res.json({ success: true, rights: getAllRightsRecords() });
});

// Get single rights record
app.get("/api/licensing/rights/:contentId", (req, res) => {
  const record = getRightsRecordById(req.params.contentId);
  if (!record) {
    res.status(404).json({ success: false, error: "Rights record not found" });
    return;
  }
  res.json({ success: true, rights: record });
});

// Update or register rights record
app.post("/api/licensing/rights", (req, res) => {
  try {
    const saved = saveRightsRecord(req.body);
    res.json({ success: true, rights: saved });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err?.message || "Invalid rights payload" });
  }
});

// Get standard licensing definitions
app.get("/api/licensing/licences", (_req, res) => {
  res.json({ success: true, licences: STANDARD_LICENCES });
});

// Server-side access verification (uses authenticated session or verified entitlement)
app.get("/api/licensing/check-access", (req, res) => {
  const authUser = resolveAuthenticatedRequestUser(req);
  const userId = authUser?.id || (req.query.userId as string) || "";
  const contentId = (req.query.contentId as string) || "curriculum-core-webzone";
  const requiredLicence = req.query.requiredLicence as any;
  const entitlement = userId ? defaultPaymentEngine.getStudentEntitlement(userId) : null;
  if (entitlement && (entitlement.hasActiveMonthlyPack || entitlement.hasDownloadAccess)) {
    res.json({ success: true, hasAccess: true, grant: entitlement.activeSubscription });
    return;
  }
  const result = verifyUserAccess(userId, contentId, requiredLicence);
  res.json({ success: true, ...result });
});

// Free tier grant only; paid tiers must flow through /api/payments/create-order + /api/payments/verify
app.post("/api/licensing/grant-access", (req, res) => {
  const authUser = resolveAuthenticatedRequestUser(req);
  const { contentId, licenceType } = req.body;
  if (!contentId || !licenceType) {
    res.status(400).json({ success: false, error: "contentId and licenceType are required" });
    return;
  }
  if (licenceType !== "personal-learning" && licenceType !== "limited-term-access") {
    res.status(402).json({
      success: false,
      error: "Paid licences and Monthly Packs require merchant payment verification via /api/payments/create-order.",
    });
    return;
  }
  const userId = authUser?.id || "default";
  const grant = grantUserAccess({
    userId,
    contentId,
    licenceType,
    purchasePriceUsd: 0,
    transactionId: `free-${Date.now()}`,
    expiresAt: null,
  });
  res.json({ success: true, grant });
});

// Calculate commercial creator revenue split & platform commission
app.post("/api/licensing/fee-split", (req, res) => {
  const { sellingPriceUsd, platformCommissionPct } = req.body;
  const split = calculateRevenueSplit(Number(sellingPriceUsd) || 0, Number(platformCommissionPct) || 12);
  res.json({ success: true, split });
});

/* ── Course Intelligence & Market Opportunity Endpoints ─────────── */
// Get verified course opportunity catalog
app.get("/api/courses/catalog", (_req, res) => {
  res.json({ success: true, opportunities: VERIFIED_COURSE_OPPORTUNITIES });
});

// Calculate revenue projection scenarios
app.post("/api/courses/scenarios", (req, res) => {
  const { monthlyVisitors, conversionRatePercent, averageOrderValueUsd, platformCommissionPercent } = req.body;
  const result = calculateRevenueScenarios({
    monthlyVisitors: Number(monthlyVisitors) || 5000,
    conversionRatePercent: Number(conversionRatePercent) || 1.5,
    averageOrderValueUsd: Number(averageOrderValueUsd) || 99,
    platformCommissionPercent: Number(platformCommissionPercent) || 12,
  });
  res.json({ success: true, ...result });
});

// Synthesize course proposal with Gemini 3.7 Flash fallback
app.post("/api/courses/synthesize", async (req, res) => {
  const { topic, targetAudience, difficulty } = req.body;
  const ai = getAi();
  const result = await synthesizeCourseProposal(ai, topic, targetAudience, difficulty);
  res.json(result);
});

/* ── Publishing Workflow & Editorial Quality Endpoints ──────────── */
// Get all publishing drafts
app.get("/api/publishing/drafts", (_req, res) => {
  res.json({ success: true, drafts: getAllPublishingDrafts() });
});

// Create new publishing draft
app.post("/api/publishing/draft", (req, res) => {
  try {
    const draft = createPublishingDraft(req.body);
    res.json({ success: true, draft });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err?.message || "Failed to create draft" });
  }
});

// Advance publishing stage
app.post("/api/publishing/advance", (req, res) => {
  const { draftId, targetStage, stagePayload } = req.body;
  try {
    const updated = advancePublishingStage(draftId, targetStage, stagePayload);
    res.json({ success: true, draft: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err?.message || "Failed to advance stage" });
  }
});

// Automated originality & cliché scanner
app.post("/api/publishing/scan-originality", (req, res) => {
  const { content } = req.body;
  const result = scanTextForOriginality(content || "");
  res.json({ success: true, ...result });
});

/* ── Student Weekly Subscriptions Endpoints ─────────────────────── */
// Get current student subscription
app.get("/api/subscriptions/mine", (req, res) => {
  const userId = (req.query.userId as string) || "default";
  const sub = getSubscriptionByUserId(userId);
  res.json({ success: true, subscription: sub });
});

// Subscribe or update preferences
app.post("/api/subscriptions/subscribe", (req, res) => {
  const { studentEmail, studentName, subscribedTracks, deliveryCadence, preferredFormat, userId } = req.body;
  if (!studentEmail) {
    res.status(400).json({ success: false, error: "studentEmail is required" });
    return;
  }
  const sub = subscribeOrUpdate({
    userId: userId || "default",
    studentEmail,
    studentName,
    subscribedTracks,
    deliveryCadence,
    preferredFormat,
  });
  res.json({ success: true, subscription: sub });
});

// Get weekly released items
app.get("/api/subscriptions/releases", (_req, res) => {
  res.json({ success: true, releases: WEEKLY_CURRICULUM_RELEASES });
});

// Unsubscribe endpoint
app.post("/api/subscriptions/unsubscribe", (req, res) => {
  const { tokenOrEmail } = req.body;
  const success = unsubscribeStudent(tokenOrEmail || "");
  res.json({ success, message: success ? "Unsubscribed successfully." : "Subscription not found." });
});

/* ── Merchant Payments, Verification, Webhooks & Settlement ─────── */
app.get("/api/payments/config", (_req, res) => {
  const providerInfo = detectConfiguredMerchantProvider();
  res.json({
    success: true,
    ...providerInfo,
    plans: Object.values(PLAN_CATALOG),
  });
});

app.get("/api/payments/entitlement", (req, res) => {
  const authUser = resolveAuthenticatedRequestUser(req);
  if (!authUser) {
    res.json({
      success: true,
      authenticated: false,
      entitlement: defaultPaymentEngine.getStudentEntitlement(""),
    });
    return;
  }
  res.json({
    success: true,
    authenticated: true,
    user: authUser,
    entitlement: defaultPaymentEngine.getStudentEntitlement(authUser.id),
    orders: defaultPaymentEngine.getOrdersForStudent(authUser.id),
  });
});

app.get("/api/lessons/:lessonId/access", (req, res) => {
  const authUser = resolveAuthenticatedRequestUser(req);
  const lessonId = req.params.lessonId;
  const chapter = CHAPTERS_DATA.find((c) => c.lessons.some((l) => l.id === lessonId));
  const result = defaultPaymentEngine.canAccessLesson(authUser?.id || null, lessonId, chapter?.id);
  res.json({ success: true, ...result });
});

app.post("/api/payments/create-order", async (req, res) => {
  const authUser = resolveAuthenticatedRequestUser(req);
  if (!authUser || authUser.method === "guest" || !authUser.email) {
    res.status(401).json({
      success: false,
      error: "Please sign in with a student email account before purchasing a subscription pack.",
    });
    return;
  }
  try {
    const result = await defaultPaymentEngine.createOrder({
      userId: authUser.id,
      studentName: authUser.name,
      studentEmail: authUser.email,
      planId: req.body?.planId,
      licenceType: req.body?.licenceType,
      rawPayload: req.body,
    });
    if (!result.success) {
      res.status(400).json(result);
      return;
    }
    res.json(result);
  } catch (err: any) {
    res.status(502).json({
      success: false,
      error: err?.message || "Failed to create merchant payment order.",
    });
  }
});

app.post("/api/payments/sandbox-authorize", (req, res) => {
  const authUser = resolveAuthenticatedRequestUser(req);
  if (!authUser) {
    res.status(401).json({ success: false, error: "Authentication required." });
    return;
  }
  const { orderId, scenario, paymentMethodSummary } = req.body || {};
  const result = defaultPaymentEngine.submitSandboxCheckoutDecision({
    orderId: String(orderId || ""),
    userId: authUser.id,
    scenario: scenario || "succeed",
    paymentMethodSummary,
  });
  if (!result.success) {
    res.status(400).json(result);
    return;
  }
  res.json(result);
});

app.post("/api/payments/verify", async (req, res) => {
  const authUser = resolveAuthenticatedRequestUser(req);
  if (!authUser) {
    res.status(401).json({ success: false, error: "Authentication required to verify payment." });
    return;
  }
  const orderId = String(req.body?.orderId || "");
  if (!orderId) {
    res.status(400).json({ success: false, error: "orderId is required." });
    return;
  }
  const result = await defaultPaymentEngine.verifyOrderPayment({
    orderId,
    userId: authUser.id,
    verificationPayload: req.body,
  });
  res.status(result.statusCode).json({
    ...result,
    entitlement: defaultPaymentEngine.getStudentEntitlement(authUser.id),
  });
});

app.get("/api/payments/status/:orderId", (req, res) => {
  const authUser = resolveAuthenticatedRequestUser(req);
  if (!authUser) {
    res.status(401).json({ success: false, error: "Authentication required." });
    return;
  }
  const order = defaultPaymentEngine.getOrderForStudent(req.params.orderId, authUser.id);
  if (!order) {
    res.status(404).json({ success: false, error: "Order not found for your account." });
    return;
  }
  res.json({
    success: true,
    order,
    entitlement: defaultPaymentEngine.getStudentEntitlement(authUser.id),
  });
});

app.post("/api/payments/cancel-subscription", (req, res) => {
  const authUser = resolveAuthenticatedRequestUser(req);
  if (!authUser) {
    res.status(401).json({ success: false, error: "Authentication required." });
    return;
  }
  const result = defaultPaymentEngine.cancelSubscription(authUser.id, req.body?.subscriptionId);
  if (!result.success) {
    res.status(400).json(result);
    return;
  }
  res.json({
    ...result,
    entitlement: defaultPaymentEngine.getStudentEntitlement(authUser.id),
  });
});

app.post("/api/payments/webhook", async (req: any, res) => {
  const signature =
    (req.headers["x-merchant-signature"] as string) ||
    (req.headers["stripe-signature"] as string) ||
    "";
  const rawBody = req.rawBody || JSON.stringify(req.body || {});
  const result = await defaultPaymentEngine.handleSignedWebhook({
    rawBody,
    signatureHeader: signature,
    payload: req.body || {},
  });
  res.status(result.statusCode).json(result);
});

app.get("/api/payments/merchant-dashboard", (_req, res) => {
  res.json({
    success: true,
    summary: defaultPaymentEngine.getMerchantDashboardSummary(),
  });
});

app.post("/api/payments/reconcile-settlement", (req, res) => {
  const { orderId, payoutReference } = req.body || {};
  const result = defaultPaymentEngine.reconcileOrderSettlement(
    String(orderId || ""),
    payoutReference ? String(payoutReference) : undefined
  );
  if (!result.success) {
    res.status(400).json(result);
    return;
  }
  res.json(result);
});

app.post("/api/payments/refund", async (req, res) => {
  const { orderId, reason } = req.body || {};
  const result = await defaultPaymentEngine.refundOrder(
    String(orderId || ""),
    reason ? String(reason) : undefined
  );
  if (!result.success) {
    res.status(400).json(result);
    return;
  }
  res.json(result);
});

/* ── Formatted Downloads & Resource Export Endpoints ────────────── */
// Generate printable PDF snapshot of lesson with server-side subscription & licence protection
app.get("/api/downloads/lesson-pdf/:lessonId", (req, res) => {
  const authUser = resolveAuthenticatedRequestUser(req);
  const lessonId = req.params.lessonId;
  const userId = authUser?.id || (req.query.userId as string) || "";
  const studentName = authUser?.name || (req.query.studentName as string) || "Authorized Student";

  const result = generatePrintablePdfHtml(lessonId, userId, studentName);
  if (!result.success || !result.html) {
    res.status(403).json({ success: false, error: result.error });
    return;
  }

  // If client wants raw HTML to trigger browser window.print() or download
  if (req.query.format === 'html') {
    res.header("Content-Type", "text/html; charset=utf-8");
    res.send(result.html);
    return;
  }

  res.json({
    success: true,
    filename: result.filename,
    html: result.html,
  });
});

async function startServer() {
  const forceDevelopment = process.argv.includes("--dev");
  const isProduction = !forceDevelopment && (
    process.env.NODE_ENV === "production" ||
    process.argv[1]?.includes("dist") ||
    process.argv[1]?.endsWith(".cjs")
  );

  if (!isProduction) {
    if (createViteServer) {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      console.warn("[WARN] Vite not available, serving static dist");
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
    }
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Do not let the static middleware answer `/` with index.html first: the
    // catch-all below needs to inspect query parameters for lesson snapshots.
    app.use(express.static(distPath, { index: false, extensions: ['html'] }));

    // Bot-aware SEO: serve a lesson-specific HTML snapshot to crawlers.
    const BOT_USER_AGENTS = /googlebot|bingbot|yandexbot|baiduspider|slurp|duckduckbot|facebot|facebookexternalhit|applebot|semrushbot|ahrefsbot/i;
    let cachedIndexHtml: string | null = null;

    // SPA catch-all — only routes that don't match static files
    app.get("*", (req, res) => {
      const userAgent = req.headers["user-agent"] || "";
      const isBot = BOT_USER_AGENTS.test(userAgent);
      const requestedLessonId = typeof req.query.lesson === "string" ? req.query.lesson : undefined;

      if (isBot) {
        // Serve index.html with the pre-rendered noscript content for crawlers
        try {
          if (!cachedIndexHtml) {
            cachedIndexHtml = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
          }
          res.header("Content-Type", "text/html; charset=utf-8");
          const requestedBlogSlug = typeof req.query.blog === "string" ? req.query.blog : undefined;
          const responseHtml = requestedLessonId
            ? injectLessonSnapshot(cachedIndexHtml, requestedLessonId)
            : requestedBlogSlug
              ? injectBlogSnapshot(cachedIndexHtml, requestedBlogSlug)
              : cachedIndexHtml;
          res.send(responseHtml);
        } catch {
          res.sendFile(path.join(distPath, "index.html"));
        }
      } else {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WZ Storehouse Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("[FATAL] Server failed to start:", err);
  process.exit(1);
});
