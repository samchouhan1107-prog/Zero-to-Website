import React from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  Globe,
  Heart,
  Laptop,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import { PolicyTab } from "./LegalComplianceModal";

interface AboutViewProps {
  onNavigateHome: () => void;
  onNavigateLearn: () => void;
  onNavigateWorkspace: () => void;
  onNavigateWebTools: () => void;
  onNavigateImageTools: () => void;
  onNavigateDevTools: () => void;
  onOpenLegal: (tab?: PolicyTab) => void;
  onOpenTutor?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateHome,
  onNavigateLearn,
  onNavigateWorkspace,
  onNavigateWebTools,
  onNavigateImageTools,
  onNavigateDevTools,
  onOpenLegal,
  onOpenTutor,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-app-border bg-gradient-to-br from-app-surface via-app-inset to-app-surface p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Web Engineering Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-app-ink">
            Democratizing Modern <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Frontend &amp; Full-Stack Education
            </span>
          </h1>

          <p className="text-sm sm:text-base text-app-muted leading-relaxed">
            WebZoneBW SC is a free, modern web developer learning and productivity storehouse. Built from the ground up to combine rigorous structured curriculum with real-time split-screen coding sandboxes, visual CSS layout instruments, and AI-assisted tutoring.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onNavigateLearn}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Explore Curriculum (10 Chapters)</span>
            </button>

            <button
              type="button"
              onClick={onNavigateWorkspace}
              className="inline-flex items-center gap-2 rounded-xl border border-app-border bg-app-surface hover:bg-app-active px-5 py-2.5 text-xs font-bold text-app-ink transition-all cursor-pointer"
            >
              <Code2 className="h-4 w-4 text-emerald-400" />
              <span>Launch Live Workspace</span>
            </button>
          </div>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-20 -bottom-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </section>

      {/* 2. Platform Pillars Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-app-ink">
            Core Architecture &amp; Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-app-muted">
            Engineered with industry-standard web specifications, local-first client durability, and transparent verified learning metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-app-ink">Real-Time Live Workspace</h3>
            <p className="text-xs text-app-muted leading-relaxed">
              Reactive split-screen sandbox rendering HTML, CSS, and JavaScript with 60ms debounce, console log interceptor, and layout presets.
            </p>
          </div>

          <div className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
              📚
            </div>
            <h3 className="text-lg font-bold text-app-ink">10-Chapter Masterclass</h3>
            <p className="text-xs text-app-muted leading-relaxed">
              From web foundations, semantic HTML5, Flexbox, and CSS Grid to DOM manipulation, responsive typography, and capstone deployment.
            </p>
          </div>

          <div className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              🛠️
            </div>
            <h3 className="text-lg font-bold text-app-ink">Integrated DevTools Suite</h3>
            <p className="text-xs text-app-muted leading-relaxed">
              In-browser simulated developer console, network request waterfall inspector, memory profiler, security auditor, and storage explorer.
            </p>
          </div>

          <div className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold">
              🎨
            </div>
            <h3 className="text-lg font-bold text-app-ink">Visual CSS Lab</h3>
            <p className="text-xs text-app-muted leading-relaxed">
              Interactive layout playgrounds for Flexbox, CSS Grid matrices, Box Model dimensional dissection, and glassmorphism styling.
            </p>
          </div>

          <div className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              🤖
            </div>
            <h3 className="text-lg font-bold text-app-ink">24/7 AI Code Mentor</h3>
            <p className="text-xs text-app-muted leading-relaxed">
              Context-aware debugging tutor that breaks down cryptic errors, explains syntax analogies, and provides targeted code hints.
            </p>
          </div>

          <div className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm space-y-3">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
              🏆
            </div>
            <h3 className="text-lg font-bold text-app-ink">Verified Certification</h3>
            <p className="text-xs text-app-muted leading-relaxed">
              Earn XP for completed code challenges and activities, tracking streak days and generating verifiable completion certificates.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Official Transparency & Portal Connection */}
      <section className="rounded-3xl border border-app-border bg-app-surface p-8 sm:p-10 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-app-border">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Institutional Connection &amp; Trust</span>
            </div>
            <h3 className="text-2xl font-bold text-app-ink">
              Official Portal &amp; Academic Partnership Reference
            </h3>
            <p className="text-xs sm:text-sm text-app-muted max-w-2xl">
              WebZoneBW SC operates in transparent coordination with our primary institutional reference domain <a href="https://webzonebw.in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline font-semibold">webzonebw.in</a> for academic curricula, student inquiries, and compliance governance.
            </p>
          </div>

          <a
            href="https://webzonebw.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-blue-500 px-5 py-3 text-xs font-bold text-white shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Visit webzonebw.in</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-app-border bg-app-inset p-4 space-y-1">
            <span className="text-xs text-app-subtle flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-blue-400" />
              Official Portal
            </span>
            <a
              href="https://webzonebw.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-app-ink hover:text-blue-400 transition-colors block"
            >
              webzonebw.in
            </a>
          </div>

          <div className="rounded-xl border border-app-border bg-app-inset p-4 space-y-1">
            <span className="text-xs text-app-subtle flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-emerald-400" />
              Official Inquiries
            </span>
            <a
              href="mailto:enquiry@webzonebw.in"
              className="text-sm font-bold text-app-ink hover:text-emerald-400 transition-colors block"
            >
              enquiry@webzonebw.in
            </a>
          </div>

          <div className="rounded-xl border border-app-border bg-app-inset p-4 space-y-1">
            <span className="text-xs text-app-subtle flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
              Compliance
            </span>
            <span className="text-sm font-bold text-app-ink block">
              CCPA &amp; GDPR Compliant
            </span>
          </div>
        </div>

        {/* Legal links */}
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-app-muted">
          <span>Legal Disclosures:</span>
          <button
            type="button"
            onClick={() => onOpenLegal("privacy")}
            className="hover:text-blue-400 underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => onOpenLegal("terms")}
            className="hover:text-blue-400 underline cursor-pointer"
          >
            Terms of Service
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => onOpenLegal("cookies")}
            className="hover:text-blue-400 underline cursor-pointer"
          >
            Cookie Policy
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => onOpenLegal("contact")}
            className="hover:text-blue-400 underline cursor-pointer"
          >
            Contact &amp; Support
          </button>
        </div>
      </section>

      {/* 4. Quick Page Navigation Footer */}
      <section className="rounded-2xl border border-app-border bg-app-surface p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-app-ink">
          Standardized Platform Destination Directory
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset hover:bg-app-active p-3 text-xs font-bold text-app-ink transition-all cursor-pointer"
          >
            <span>🏠 Home</span>
          </button>
          <button
            type="button"
            onClick={onNavigateWorkspace}
            className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset hover:bg-app-active p-3 text-xs font-bold text-app-ink transition-all cursor-pointer"
          >
            <span>💻 Workspace</span>
          </button>
          <button
            type="button"
            onClick={onNavigateWebTools}
            className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset hover:bg-app-active p-3 text-xs font-bold text-app-ink transition-all cursor-pointer"
          >
            <span>🛠️ Web Tools</span>
          </button>
          <button
            type="button"
            onClick={onNavigateImageTools}
            className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset hover:bg-app-active p-3 text-xs font-bold text-app-ink transition-all cursor-pointer"
          >
            <span>🎨 Image Tools</span>
          </button>
          <button
            type="button"
            onClick={onNavigateDevTools}
            className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset hover:bg-app-active p-3 text-xs font-bold text-app-ink transition-all cursor-pointer"
          >
            <span>🔧 Developer Tools</span>
          </button>
          <button
            type="button"
            onClick={onNavigateLearn}
            className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset hover:bg-app-active p-3 text-xs font-bold text-app-ink transition-all cursor-pointer"
          >
            <span>📚 Learn</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenLegal("contact")}
            className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset hover:bg-app-active p-3 text-xs font-bold text-app-ink transition-all cursor-pointer"
          >
            <span>📞 Contact Us</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenLegal("privacy")}
            className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset hover:bg-app-active p-3 text-xs font-bold text-app-ink transition-all cursor-pointer"
          >
            <span>🛡️ Transparency</span>
          </button>
        </div>
      </section>
    </div>
  );
};
