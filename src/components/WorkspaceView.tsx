import React, { useState } from "react";
import {
  Code2,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Laptop,
  CheckCircle2,
  Layers,
  Download,
  BookOpen,
  Eye,
  Terminal,
} from "lucide-react";
import { UserProgress } from "../utils/types";
import {
  WorkspaceEditor,
  WORKSPACE_TEMPLATES,
} from "./WorkspaceEditor";

interface WorkspaceViewProps {
  progress?: UserProgress;
  onOpenTutor?: () => void;
  onNavigateHome?: () => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  progress,
  onOpenTutor,
  onNavigateHome,
}) => {
  // Sub-view within Workspace: 'editor' (default), 'blueprints', 'scratchpad'
  const [workspaceSubView, setWorkspaceSubView] = useState<
    "editor" | "blueprints" | "scratchpad"
  >("editor");

  const [activeTemplateId, setActiveTemplateId] =
    useState<string>("starter-component");

  // Scratchpad state
  const [scratchpadNote, setScratchpadNote] = useState<string>(() => {
    try {
      return (
        localStorage.getItem("webzonebw_workspace_scratchpad") ||
        `### WebZoneBW Developer Scratchpad & Architecture Journal
- Split-screen real-time editor allows instant preview of HTML, CSS, and JS.
- Code execution is 100% client-side in browser memory with zero tracking.
- Test responsive layouts using Desktop, Tablet, and Mobile viewports.
- All notes persist automatically across browser sessions.`
      );
    } catch {
      return "";
    }
  });
  const [scratchpadSaved, setScratchpadSaved] = useState(false);

  const handleSaveScratchpad = (val: string) => {
    setScratchpadNote(val);
    try {
      localStorage.setItem("webzonebw_workspace_scratchpad", val);
      setScratchpadSaved(true);
      setTimeout(() => setScratchpadSaved(false), 2000);
    } catch {}
  };

  const handleDownloadScratchpad = () => {
    const blob = new Blob([scratchpadNote], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `webzonebw-workspace-notes-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenTemplateInEditor = (tmplId: string) => {
    setActiveTemplateId(tmplId);
    setWorkspaceSubView("editor");
  };

  return (
    <div className="mx-auto w-full max-w-[1560px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 space-y-6 transition-all">
      {/* 1. Header & Platform Independence Trust Banner */}
      <section className="rounded-2xl border border-app-border bg-app-surface/90 p-5 sm:p-6 shadow-sm backdrop-blur-md relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs font-semibold text-blue-500 dark:text-blue-400">
                <Laptop className="h-3.5 w-3.5" />
                <span>Developer Workspace &amp; IDE</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-3 w-3" />
                <span>100% Client-Side Private · Zero Tracking Lock-In</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-app-ink tracking-tight leading-tight">
              Interactive Web Workspace
            </h1>
            <p className="text-sm sm:text-base text-app-muted leading-relaxed max-w-2xl">
              Write, inspect, and test modern HTML, CSS, and JavaScript in an
              isolated browser sandbox. Code renders in real-time across a
              split-screen layout with instantaneous preview updates.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenTutor && (
              <button
                type="button"
                onClick={onOpenTutor}
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-500 shadow-sm cursor-pointer"
              >
                <Sparkles className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
                <span>Ask AI Tutor</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

        {/* Workspace Mode Sub-Navigation Tabs */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-app-border pt-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-app-inset border border-app-border">
            <button
              type="button"
              onClick={() => setWorkspaceSubView("editor")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                workspaceSubView === "editor"
                  ? "bg-app-surface text-app-ink shadow-xs border border-app-border font-extrabold"
                  : "text-app-muted hover:text-app-ink hover:bg-app-surface/50"
              }`}
            >
              <Code2 className="h-4 w-4 text-blue-500" />
              <span>Editor</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 font-normal">
                Live Real-Time
              </span>
            </button>

            <button
              type="button"
              onClick={() => setWorkspaceSubView("blueprints")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                workspaceSubView === "blueprints"
                  ? "bg-app-surface text-app-ink shadow-xs border border-app-border font-extrabold"
                  : "text-app-muted hover:text-app-ink hover:bg-app-surface/50"
              }`}
            >
              <Layers className="h-4 w-4 text-purple-500" />
              <span>Blueprints &amp; Presets</span>
              <span className="text-[10px] font-mono text-app-subtle">
                ({WORKSPACE_TEMPLATES.length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setWorkspaceSubView("scratchpad")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                workspaceSubView === "scratchpad"
                  ? "bg-app-surface text-app-ink shadow-xs border border-app-border font-extrabold"
                  : "text-app-muted hover:text-app-ink hover:bg-app-surface/50"
              }`}
            >
              <FileText className="h-4 w-4 text-amber-500" />
              <span>Scratchpad</span>
              {scratchpadSaved && (
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-app-subtle">
            <span className="hidden md:inline">Split-Screen Layout</span>
            <span className="hidden md:inline">·</span>
            <span>Client Memory Isolation</span>
          </div>
        </div>
      </section>

      {/* 2. Primary Sub-View: Real-Time Split-Screen Editor */}
      {workspaceSubView === "editor" && (
        <section aria-label="Real-Time Workspace Code Editor">
          <WorkspaceEditor
            key={activeTemplateId}
            initialTemplateId={activeTemplateId}
            onOpenTutor={onOpenTutor}
          />
        </section>
      )}

      {/* 3. Secondary Sub-View: Blueprints & Architecture Presets */}
      {workspaceSubView === "blueprints" && (
        <section
          aria-label="Starter Blueprints Gallery"
          className="space-y-4 animate-in fade-in duration-200"
        >
          <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-lg font-bold text-app-ink">
                  Curated Architecture Blueprints
                </h2>
                <p className="text-xs text-app-muted">
                  Choose a blueprint to load directly into the real-time
                  split-screen editor.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WORKSPACE_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="rounded-xl border border-app-border bg-app-inset p-4 flex flex-col justify-between hover:border-blue-500/40 transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                        {tmpl.category || "Blueprint"}
                      </span>
                      <span className="text-[11px] font-mono text-app-subtle">
                        HTML·CSS·JS
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-app-ink group-hover:text-blue-400 transition-colors">
                      {tmpl.title}
                    </h3>
                    <p className="text-xs text-app-muted leading-relaxed">
                      {tmpl.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-app-border/60 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenTemplateInEditor(tmpl.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      <span>Open in Split-Screen Editor</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Tertiary Sub-View: Persistent Scratchpad & Notes */}
      {workspaceSubView === "scratchpad" && (
        <section
          aria-label="Developer Scratchpad & Local Notes"
          className="rounded-2xl border border-app-border bg-app-surface p-5 sm:p-6 shadow-sm space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-app-ink">
                  Developer Scratchpad &amp; Local Notes
                </h2>
                <p className="text-xs text-app-muted">
                  Autosaves to private browser storage with zero external
                  telemetry.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {scratchpadSaved && (
                <span className="inline-flex items-center gap-1 text-emerald-500 text-xs font-bold font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Saved</span>
                </span>
              )}

              <button
                type="button"
                onClick={handleDownloadScratchpad}
                className="inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-inset px-3 py-2 text-xs font-bold text-app-ink hover:bg-app-active transition-colors cursor-pointer"
                title="Download notes as Markdown file"
              >
                <Download className="h-3.5 w-3.5 text-blue-500" />
                <span>Export Markdown</span>
              </button>

              <button
                type="button"
                onClick={() => setWorkspaceSubView("editor")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-colors cursor-pointer"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Back to Editor</span>
              </button>
            </div>
          </div>

          <textarea
            value={scratchpadNote}
            onChange={(e) => handleSaveScratchpad(e.target.value)}
            rows={14}
            placeholder="Jot down architectural questions, code snippets to remember, or next steps..."
            className="w-full rounded-xl border border-app-border bg-app-inset p-4 font-mono text-xs sm:text-sm text-app-ink placeholder:text-app-subtle focus:border-blue-500 focus:outline-none leading-relaxed resize-y"
          />

          <div className="flex items-center justify-between text-xs font-mono text-app-subtle pt-2 border-t border-app-border">
            <span>
              {scratchpadNote.length} characters ·{" "}
              {scratchpadNote.split("\n").length} lines
            </span>
            <span>100% Offline &amp; Private</span>
          </div>
        </section>
      )}
    </div>
  );
};
