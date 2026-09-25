import React from 'react';
import { X, ShieldCheck, Database, Lock, Download, CheckCircle2, Globe, Cpu } from 'lucide-react';

interface PlatformTrustModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlatformTrustModal: React.FC<PlatformTrustModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-2xl border border-app-border bg-app-surface p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="trust-modal-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-app-border pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 id="trust-modal-title" className="text-lg font-black text-app-ink">
                Platform Independence &amp; Trust
              </h3>
              <p className="text-xs text-app-muted">
                Built for learners and developers with zero lock-in
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-app-subtle hover:text-app-ink hover:bg-app-inset transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Core Guarantees */}
        <div className="space-y-3.5 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-app-border bg-app-inset space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-app-ink">
              <Database className="h-4 w-4 text-blue-500" />
              <span>100% Local Data Sovereignty</span>
            </div>
            <p className="text-app-muted leading-relaxed">
              Your lessons, interactive code exercises, notes, and progress live on your local device. We never sell your study habits or telemetry to third parties.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-app-border bg-app-inset space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-app-ink">
              <Cpu className="h-4 w-4 text-emerald-500" />
              <span>Isolated Client-Side Execution</span>
            </div>
            <p className="text-app-muted leading-relaxed">
              The Web REPL Sandbox and Visual Labs run in secure, sandboxed browser iframes. Everything compiles directly in memory without unvetted server intermediaries.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-app-border bg-app-inset space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-app-ink">
              <Globe className="h-4 w-4 text-purple-500" />
              <span>Open Web Standards (W3C &amp; WHATWG)</span>
            </div>
            <p className="text-app-muted leading-relaxed">
              All 11 chapters and interactive curriculum adhere to official web specifications. You learn universal skills compatible with any modern browser.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-app-border bg-app-inset space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-app-ink">
              <Download className="h-4 w-4 text-amber-500" />
              <span>Full Export Freedom</span>
            </div>
            <p className="text-app-muted leading-relaxed">
              Export your code sandboxes, project portfolios, and scratchpad notes as standalone HTML or JSON files anytime with a single click.
            </p>
          </div>
        </div>

        <div className="border-t border-app-border pt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            I Understand &amp; Trust
          </button>
        </div>
      </div>
    </div>
  );
};
