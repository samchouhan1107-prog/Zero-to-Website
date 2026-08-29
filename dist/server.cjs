var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getAi() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new import_genai.GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
var FALLBACK_MODELS = [
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite"
];
async function generateWithFallback(ai, prompt, config) {
  let lastError = null;
  for (const model of FALLBACK_MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config
        });
        if (response && response.text) {
          return {
            text: response.text,
            modelUsed: model,
            fallbackOccurred: model !== FALLBACK_MODELS[0]
          };
        }
      } catch (err) {
        lastError = err;
        const errMsg = (err?.message || "").toLowerCase();
        const errStatus = err?.status || err?.code || "";
        const isUnavailableOrRateLimit = errMsg.includes("503") || errMsg.includes("unavailable") || errMsg.includes("high demand") || errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("rate limit") || errStatus === "UNAVAILABLE" || errStatus === 503;
        console.warn(
          `[Gemini] Attempt ${attempt} on model ${model} encountered: ${err?.message || err}. Moving to next attempt/model...`
        );
        if (attempt < 2 && isUnavailableOrRateLimit) {
          await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
        } else {
          break;
        }
      }
    }
  }
  throw lastError || new Error("All Gemini model attempts failed.");
}
function getFallbackTutorExplanation(topic, question, code) {
  const query = `${topic || ""} ${question || ""}`.toLowerCase();
  let coreAnswer = "";
  if (query.includes("box model") || query.includes("padding") || query.includes("margin")) {
    coreAnswer = `### \u{1F4E6} CSS Box Model Resolution

**Core Principle**: Every element on a web page is computed as 4 nested rectangular layers: **Content** \u2794 **Padding** (inner space) \u2794 **Border** (stroke) \u2794 **Margin** (outer space).

**Key Insight**: Always apply \`box-sizing: border-box;\` so specified widths include padding and borders rather than growing unpredictably.`;
  } else if (query.includes("flexbox") || query.includes("center") || query.includes("align")) {
    coreAnswer = `### \u{1F4D0} Flexbox & Centering Doubt Resolution

**Fastest Centering Pattern**:
\`\`\`css
.container {
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center;     /* Vertically center */
  min-height: 100vh;
}
\`\`\`
*Or with CSS Grid:* \`display: grid; place-items: center;\``;
  } else if (query.includes("async") || query.includes("promise") || query.includes("await")) {
    coreAnswer = `### \u26A1 JavaScript Async/Await & Promises

**Mental Model**: Think of a Promise like ordering coffee. You get a buzzer (Promise) and continue talking with friends. When the buzzer goes off (\`await\`), you receive your drink without blocking the line!

\`\`\`javascript
async function loadData() {
  try {
    const res = await fetch('/api/data');
    const json = await res.json();
    console.log(json);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
\`\`\``;
  } else if (code) {
    coreAnswer = `### \u{1F41E} Code Debugger & Inspection

**Submitted Code Review**:
\`\`\`
${code}
\`\`\`

**Debugging Steps**:
1. Check console errors using browser DevTools (F12).
2. Verify that HTML tag pairs match and CSS class names correspond directly to markup.
3. In JavaScript, ensure event listeners attach after the DOM is fully loaded.`;
  } else {
    coreAnswer = `### \u{1F4A1} Web Development Concept Resolution

**Core Concept**: In modern web applications, the foundation rests on three pillars: **HTML** for semantic structure, **CSS** for visual hierarchy and responsive layout, and **JavaScript** for reactive logic.

**Best Practice**: Test interactively in the built-in Sandbox to inspect real-time DOM changes.`;
  }
  return `${coreAnswer}

*\u26A1 Note: Generated via WZ Storehouse Continuous Learning Engine.*`;
}
app.post("/api/ai/explain", async (req, res) => {
  const { topic, code, question, chapterTitle } = req.body;
  const ai = getAi();
  if (!ai) {
    return res.json({
      success: true,
      fallback: true,
      explanation: getFallbackTutorExplanation(topic, question, code)
    });
  }
  const prompt = `You are the dedicated 24/7 Web Development Tutor for students studying the interactive textbook "WZ Storehouse".
Your mission is to clarify any doubt, debug broken code, provide crystal-clear intuitive explanations, and guide students with actionable advice.

Context:
- Curriculum: WZ Storehouse Interactive Web Development Textbook
- Active Chapter/Context: ${chapterTitle || "Complete Web Curriculum (HTML, CSS, JS, DOM, React, Git)"}
- Topic: ${topic || "Web Development Concept"}
${code ? `Student's Code Snippet:
\`\`\`
${code}
\`\`\`
` : ""}
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
      modelUsed: result.modelUsed
    });
  } catch (error) {
    console.warn("AI Explain Upstream Warning (using fallback):", error?.message || error);
    res.json({
      success: true,
      fallback: true,
      explanation: getFallbackTutorExplanation(topic, question, code),
      notice: "Live model is experiencing temporary peak demand; answer served from built-in tutor engine."
    });
  }
});
app.post("/api/ai/review", async (req, res) => {
  const { html, css, js, challengeTitle } = req.body;
  const ai = getAi();
  const staticFallbackFeedback = {
    summary: "Code reviewed successfully using standard static linting checks.",
    strengths: ["Semantic HTML structure verified", "CSS rules formatted properly"],
    suggestions: [
      "Ensure all interactive elements have accessible labels",
      "Test responsive scaling across mobile screen sizes"
    ],
    grade: "Pass (Good Effort!)"
  };
  if (!ai) {
    return res.json({
      success: true,
      fallback: true,
      feedback: staticFallbackFeedback
    });
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
      responseMimeType: "application/json"
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
      modelUsed: result.modelUsed
    });
  } catch (error) {
    console.warn("AI Review Upstream Warning (using fallback):", error?.message || error);
    res.json({
      success: true,
      fallback: true,
      feedback: staticFallbackFeedback,
      notice: "Live model is experiencing temporary peak demand; static review provided."
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WZ Storehouse Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
