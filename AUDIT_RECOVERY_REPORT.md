# Architecture Audit and Recovery Report — Zero-to-Website

> **Historical snapshot — 7 November 2026.** This report records an earlier recovery checkpoint, not the current project state. Its `.recovery_backup/` reference is historical; that directory is not present in the current working tree. Use [README.md](README.md), [DEPLOYMENT.md](DEPLOYMENT.md), and the current source for today's architecture and deployment details.

## 1. Executive Summary & Recovery Point
- **Platform Name**: Zero-to-Website (WebZoneBW SC / Storehouse)
- **Recovery Point Created**: `.recovery_backup/` containing exact copy of all source, server, and config files prior to rebuild.
- **Audit Date**: 2026-11-07
- **Primary Goal**: Complete human-centred architectural and frontend rebuild using standard CSS3, eliminating Tailwind CSS and utility-first styling frameworks, while establishing a structured lesson content engine, persistent Storehouse, intelligent educational AI assistant, and modular feature architecture.

## 2. Dependency & Technology Audit
- **Frontend Framework**: React 19 + TypeScript + Vite 6
- **Backend Framework**: Express 4 running via `server.ts`
- **Current Styling (To Be Completely Replaced)**: Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss";`), with scattered utility classes and inconsistent presentation of custom/AI content.
- **AI Integration**: `@google/genai` (GoogleGenAI TypeScript SDK) in `server.ts` with multi-model fallback (`gemini-3.7-flash`, `gemini-flash-latest`, `gemini-3.1-flash-lite`) and offline pedagogical fallback rules.
- **Icons & Visuals**: `lucide-react`, `canvas-confetti`.

## 3. Storage & API Audit
- **Curriculum Source**: 11 chapters (`ch00` - `ch10`) containing 50+ detailed web development lessons in `src/data/chapters/`.
- **Existing Server Routes**:
  - `GET /api/health`
  - `GET /api/curriculum`
  - `POST /api/ai/explain`
  - `POST /api/ai/review`
  - `GET /sitemap.xml`, `/robots.txt`
  - `server/auth.ts`: `/api/auth/*`
  - `server/api.ts`: `/api/user/*` (stubs previously returning null progress)
- **Identified Gap in Storehouse**:
  - Lessons generated via AI or created by users had no dedicated backend CRUD endpoints (`/api/storehouse/lessons`).
  - Saved content was rendered inconsistently because `LessonView.tsx` only expected rigid, hardcoded theory section objects.
  - No unified structured renderer existed for AI-generated lessons, edited lessons, or imported learning materials.

## 4. Rebuild Strategy & Safety Guarantees
1. **Design System**: Modular CSS3 architecture using custom properties (`variables.css`, `themes.css` supporting Clean Editorial Light and Volcanic/Lava Dark), `reset.css`, `typography.css`, `layout.css`, `components.css`, `forms.css`, `lesson-content.css`, `chat.css`, `dashboard.css`, and `responsive.css`.
2. **Lesson Content Engine**: `StructuredLesson` architecture with support for titles, objectives, sections, definitions, callouts, code blocks, diagrams, tables, practice challenges, quizzes, and summaries.
3. **Storehouse Persistence**: Server-backed JSON store in `server/storehouse-db.ts` with local offline mirror, supporting saving, updating, retrieving, filtering, and tagging of curriculum, custom, and AI-generated lessons.
4. **AI Assistant**: Natural human-centred streaming-ready chatbox with markdown rendering, syntax-highlighted code, formatted tables, follow-up recommendations, and one-click "Save to Storehouse".
5. **Zero Data Loss**: All 11 existing chapters and lessons are preserved and rendered via the structured engine.
