import React from 'react';
import {
  ArrowUp,
  Award,
  Box,
  Code2,
  Compass,
  Cpu,
  FileText,
  GitBranch,
  Grid,
  Layers,
  Lock,
  Mail,
  Network,
  Scale,
  Search,
  Shield,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { WebZoneBrandLogo } from './WebZoneBrandLogo';
import { PolicyTab } from './LegalComplianceModal';
import { Chapter } from '../types';
import { VisualizerId } from './VisualLab';

interface FooterProps {
  onOpenLegal: (tab: PolicyTab) => void;
  onOpenTutor: () => void;
  onSelectLesson?: (lessonId: string) => void;
  onNavigateHome?: () => void;
  onNavigatePractice?: () => void;
  onNavigateVisualLab?: (toolId: VisualizerId) => void;
  onNavigateActivities?: () => void;
  onNavigateBlog?: () => void;
  onOpenMilestones?: () => void;
  onOpenCertificate?: () => void;
  onOpenSearch?: () => void;
  chapters?: Chapter[];
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onOpenTutor,
  onSelectLesson,
  onNavigateHome,
  onNavigatePractice,
  onNavigateVisualLab,
  onNavigateActivities,
  onNavigateBlog,
  onOpenMilestones,
  onOpenCertificate,
  onOpenSearch,
  chapters,
}) => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToolClick = (toolId: VisualizerId) => {
    if (onNavigateVisualLab) {
      onNavigateVisualLab(toolId);
    }
  };

  const defaultChapters = chapters && chapters.length > 0 ? chapters : [
    { id: 'ch-00', number: '00', title: 'Web Foundations & Architecture', lessons: [{ id: 'ch-00-l-01' }] },
    { id: 'ch-01', number: '01', title: 'DevTools & Environment', lessons: [{ id: 'ch-01-l-01' }] },
    { id: 'ch-02', number: '02', title: 'Semantic HTML5 & a11y', lessons: [{ id: 'ch-02-l-01' }] },
    { id: 'ch-03', number: '03', title: 'Box Model & Modern Styling', lessons: [{ id: 'ch-03-l-01' }] },
    { id: 'ch-04', number: '04', title: 'Flexbox Layout Engine', lessons: [{ id: 'ch-04-l-01' }] },
    { id: 'ch-05', number: '05', title: 'CSS Grid Matrix Layouts', lessons: [{ id: 'ch-05-l-01' }] },
    { id: 'ch-06', number: '06', title: 'DOM Manipulation & State', lessons: [{ id: 'ch-06-l-01' }] },
    { id: 'ch-07', number: '07', title: 'Responsive & Mobile-First', lessons: [{ id: 'ch-07-l-01' }] },
    { id: 'ch-08', number: '08', title: 'Bootstrap & Component Systems', lessons: [{ id: 'ch-08-l-01' }] },
    { id: 'ch-09', number: '09', title: 'Git & GitHub Version Control', lessons: [{ id: 'ch-09-l-01' }] },
    { id: 'ch-10', number: '10', title: 'Capstone Project & Cloud Deploy', lessons: [{ id: 'ch-10-l-01' }] },
  ];

  return (
    <footer id="main-platform-footer" className="mt-20 border-t border-app-border bg-app-surface/95 text-app-ink">
      {/* Top Banner: Brand Mission, Realtime Status & Quick Actions */}
      <div className="border-b border-app-border/70 bg-app-inset/40 py-8 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Brand & Mission */}
          <div className="space-y-2.5 max-w-xl">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onNavigateHome}
                className="inline-flex items-center transition-opacity hover:opacity-90 text-left"
                aria-label="WebZoneBW SC Home"
              >
                <WebZoneBrandLogo size="md" />
              </button>
              <span className="rounded border border-app-amber/30 bg-app-amber/10 px-2 py-0.5 font-mono text-[10px] font-bold text-app-amber tracking-wide uppercase">
                SC DEVELOPER SUITE
              </span>
            </div>
            <p className="text-xs leading-relaxed text-app-muted">
              WebZoneBW SC is a developer-centric suite of practical web tools, real-time visualizers, and an open engineering curriculum built for modern web standards, performance, and responsive architecture.
            </p>
          </div>

          {/* Operational Status & Quick CTA Pill Group */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>All Systems Operational · v2.4.0</span>
            </div>

            {onNavigatePractice && (
              <button
                type="button"
                onClick={onNavigatePractice}
                className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-xs font-medium text-app-ink hover:border-app-amber/50 hover:text-app-amber transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-app-amber" />
                <span>Launch REPL</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenTutor}
              className="inline-flex items-center gap-1.5 rounded-lg border border-app-amber/40 bg-app-amber/15 px-3 py-1.5 text-xs font-semibold text-app-amber hover:bg-app-amber/25 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Directory */}
      <div className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Practical Web & Developer Tools */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-app-amber" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-app-ink">
                Web &amp; Dev Tools
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-app-muted">
              <li>
                <button
                  type="button"
                  onClick={onNavigatePractice}
                  className="group flex w-full items-center justify-between hover:text-app-amber transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-app-subtle group-hover:text-app-amber" />
                    <span>Interactive Web REPL</span>
                  </span>
                  <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 font-mono text-[9px] font-bold text-emerald-400">
                    LIVE
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleToolClick('box')}
                  className="group flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Box className="h-3.5 w-3.5 text-app-subtle group-hover:text-app-amber" />
                  <span>CSS Box Model Studio</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleToolClick('flex')}
                  className="group flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Layers className="h-3.5 w-3.5 text-app-subtle group-hover:text-app-amber" />
                  <span>Flexbox Layout Studio</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleToolClick('grid')}
                  className="group flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Grid className="h-3.5 w-3.5 text-app-subtle group-hover:text-app-amber" />
                  <span>CSS Grid Matrix</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleToolClick('dom')}
                  className="group flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Cpu className="h-3.5 w-3.5 text-app-subtle group-hover:text-app-amber" />
                  <span>DOM Tree Inspector</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleToolClick('net')}
                  className="group flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Network className="h-3.5 w-3.5 text-app-subtle group-hover:text-app-amber" />
                  <span>HTTP &amp; DNS Flow Trace</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleToolClick('git')}
                  className="group flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <GitBranch className="h-3.5 w-3.5 text-app-subtle group-hover:text-app-amber" />
                  <span>Git Commit DAG Explorer</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Web Engineering Curriculum */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-app-amber" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-app-ink">
                Curriculum Tracks
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-app-muted">
              {defaultChapters.slice(0, 7).map((ch) => {
                const firstLessonId = ch.lessons?.[0]?.id || `${ch.id}-l-01`;
                return (
                  <li key={ch.id}>
                    <button
                      type="button"
                      onClick={() => onSelectLesson && onSelectLesson(firstLessonId)}
                      className="group flex items-center gap-1.5 hover:text-app-amber transition-colors text-left"
                    >
                      <span className="font-mono text-[10px] font-bold text-app-subtle group-hover:text-app-amber">
                        Ch {ch.number}:
                      </span>
                      <span className="truncate max-w-[200px]">{ch.title}</span>
                    </button>
                  </li>
                );
              })}
              {defaultChapters.length > 7 && (
                <li>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="font-mono text-[11px] font-semibold text-app-amber hover:underline pt-1 inline-flex items-center gap-1"
                  >
                    <span>View all {defaultChapters.length} chapters →</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Developer Resources & Interactive Hub */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-app-amber" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-app-ink">
                Developer Resources
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-app-muted">
              <li>
                <button
                  type="button"
                  onClick={onOpenTutor}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Sparkles className="h-3.5 w-3.5 text-app-amber" />
                  <span>24/7 AI Code Tutor</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateActivities}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Cpu className="h-3.5 w-3.5 text-app-subtle" />
                  <span>Recall Drills &amp; Bug Hunt</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenMilestones}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Award className="h-3.5 w-3.5 text-app-subtle" />
                  <span>Developer Milestones &amp; XP</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCertificate}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <FileText className="h-3.5 w-3.5 text-app-subtle" />
                  <span>Certificate of Completion</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Search className="h-3.5 w-3.5 text-app-subtle" />
                  <span>Global Search &amp; Index (⌘K)</span>
                </button>
              </li>
              {onNavigateBlog && (
                <li>
                  <button
                    type="button"
                    onClick={onNavigateBlog}
                    className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                  >
                    <FileText className="h-3.5 w-3.5 text-app-subtle" />
                    <span>Blog &amp; Tutorials</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={onNavigatePractice}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Code2 className="h-3.5 w-3.5 text-app-subtle" />
                  <span>Interactive Sandboxes &amp; REPL</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust, Standards & Compliance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-app-amber" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-app-ink">
                Trust &amp; Compliance
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-app-muted">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Lock className="h-3.5 w-3.5 text-app-subtle" />
                  <span>Privacy Policy (GDPR / CCPA)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Scale className="h-3.5 w-3.5 text-app-subtle" />
                  <span>Terms of Service &amp; Fair Use</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('cookies')}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <FileText className="h-3.5 w-3.5 text-app-subtle" />
                  <span>Cookie &amp; Ad Policies (TCF v2.2)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('about')}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Shield className="h-3.5 w-3.5 text-app-subtle" />
                  <span>Editorial Standards (E-E-A-T)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('contact')}
                  className="flex items-center gap-2 hover:text-app-amber transition-colors text-left"
                >
                  <Mail className="h-3.5 w-3.5 text-app-subtle" />
                  <span>Contact Editorial Desk</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Standards Badges Row */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-app-border/70 py-4 font-mono text-[11px] text-app-subtle">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded bg-app-inset px-2.5 py-1 text-app-muted border border-app-border/60">
              W3C HTML5 Valid
            </span>
            <span className="rounded bg-app-inset px-2.5 py-1 text-app-muted border border-app-border/60">
              WCAG 2.1 AA Accessible
            </span>
            <span className="rounded bg-app-inset px-2.5 py-1 text-app-muted border border-app-border/60">
              TLS 1.3 Strict HTTPS
            </span>
            <span className="rounded bg-app-inset px-2.5 py-1 text-app-muted border border-app-border/60">
              TCF v2.2 Compliant
            </span>
          </div>
          <div className="flex items-center gap-2 text-app-subtle font-mono text-[11px]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Modern Web Standards Architecture</span>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-[11px] text-app-subtle">
          <p className="text-center sm:text-left">
            &copy; {currentYear} WebZoneBW SC. Built for web engineering craftsmanship and open standards.
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-app-ink transition-colors"
            >
              Privacy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-app-ink transition-colors"
            >
              Terms
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-app-ink transition-colors"
            >
              Cookies
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onOpenLegal('about')}
              className="hover:text-app-ink transition-colors"
            >
              About
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-1 rounded border border-app-border bg-app-inset px-2 py-1 text-app-ink hover:border-app-amber/60 hover:text-app-amber transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="h-3 w-3" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
