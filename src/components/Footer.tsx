import React from 'react';
import { FileText, Lock, Mail, Scale, Shield, Sparkles } from 'lucide-react';
import { WebZoneBrandLogo } from './WebZoneBrandLogo';
import { PolicyTab } from './LegalComplianceModal';

interface FooterProps {
  onOpenLegal: (tab: PolicyTab) => void;
  onOpenTutor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenTutor }) => {
  return (
    <footer className="mt-16 border-t border-app-border bg-app-surface/90 text-app-ink">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 lg:px-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <WebZoneBrandLogo size="md" />
              <span className="rounded border border-app-amber/40 bg-app-amber/10 px-2 py-0.5 font-mono text-[10px] font-bold text-app-amber">
                STUDIO
              </span>
            </div>
            <p className="text-xs leading-relaxed text-app-muted max-w-md">
              WZ Storehouse is an interactive web engineering learning platform equipped with live coding sandboxes, 3D visual instruments, active recall drills, and 24/7 AI-assisted tutoring.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-app-subtle">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full curriculum online &amp; ad-supported</span>
            </div>
          </div>

          {/* Educational Roadmap Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
              Curriculum Tracks
            </h4>
            <ul className="space-y-2 text-xs text-app-muted">
              <li><span className="text-app-ink font-medium">Ch 00:</span> How the Web Works</li>
              <li><span className="text-app-ink font-medium">Ch 01:</span> Semantic HTML5 &amp; a11y</li>
              <li><span className="text-app-ink font-medium">Ch 02:</span> Modern CSS Styling &amp; Units</li>
              <li><span className="text-app-ink font-medium">Ch 03:</span> Responsive Layouts &amp; Grid</li>
              <li><span className="text-app-ink font-medium">Ch 04:</span> JavaScript DOM &amp; Async</li>
            </ul>
          </div>

          {/* Mandatory AdSense & Legal Compliance Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
              Trust &amp; Legal Compliance
            </h4>
            <ul className="space-y-2 text-xs text-app-muted">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="flex items-center gap-1.5 hover:text-app-amber transition-colors"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Privacy Policy (GDPR / CCPA)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="flex items-center gap-1.5 hover:text-app-amber transition-colors"
                >
                  <Scale className="h-3.5 w-3.5" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('cookies')}
                  className="flex items-center gap-1.5 hover:text-app-amber transition-colors"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Cookie &amp; Ad Policies</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('about')}
                  className="flex items-center gap-1.5 hover:text-app-amber transition-colors"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span>Editorial Standards (E-E-A-T)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('contact')}
                  className="flex items-center gap-1.5 hover:text-app-amber transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Contact Editorial Team</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-app-border/80 pt-6 text-[11px] text-app-subtle">
          <p>&copy; {new Date().getFullYear()} WZ Storehouse. Built for web engineering craftsmanship.</p>
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
              onClick={() => onOpenLegal('contact')}
              className="hover:text-app-ink transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
