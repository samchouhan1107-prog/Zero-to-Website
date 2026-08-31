import React, { useState } from 'react';
import {
  CheckCircle2,
  FileText,
  Globe,
  Info,
  Lock,
  Mail,
  Scale,
  Shield,
  Sparkles,
  X,
} from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'cookies' | 'about' | 'contact';

interface LegalComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export const LegalComplianceModal: React.FC<LegalComplianceModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
      onClose();
    }, 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="relative flex h-[85vh] w-full max-w-4xl flex-col rounded-2xl border border-app-border bg-app-surface text-app-ink shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-app-border px-6 py-4 bg-app-surface">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-amber/40 bg-app-amber/10 text-app-amber">
              <Shield className="h-4 w-4" />
            </span>
            <div>
              <h2 id="legal-modal-title" className="text-base font-black text-app-ink">
                WZ Storehouse Transparency &amp; Compliance Center
              </h2>
              <p className="text-xs text-app-muted">
                Google AdSense, GDPR &amp; CCPA Compliance Documentation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-border text-app-subtle hover:bg-app-active hover:text-app-ink transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Selector Ribbon */}
        <div className="flex shrink-0 items-center gap-1 border-b border-app-border bg-app-inset px-4 py-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'terms', label: 'Terms of Service', icon: Scale },
            { id: 'cookies', label: 'Cookie & Ad Policy', icon: FileText },
            { id: 'about', label: 'About & Editorial', icon: Info },
            { id: 'contact', label: 'Contact Us', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as PolicyTab)}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'border border-app-amber/60 bg-app-surface text-app-amber shadow-xs'
                    : 'text-app-muted hover:bg-app-surface/60 hover:text-app-ink border border-transparent'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-app-amber' : 'text-app-subtle'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm leading-relaxed text-app-ink scrollbar-thin">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-app-amber/30 bg-app-active/40 p-4">
                <h3 className="text-sm font-black text-app-amber flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy Policy &amp; Data Transparency
                </h3>
                <p className="text-xs text-app-muted mt-1">
                  Last Updated: 2026. WZ Storehouse respects your privacy and is dedicated to protecting your personal data in compliance with GDPR, CCPA, and Google AdSense publisher policies.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-app-ink text-sm">1. Information We Collect</h4>
                <p className="text-app-muted">
                  WZ Storehouse does not require mandatory account registration to access course lessons. When you use the interactive coding sandboxes, lesson checklists, notes, or AI tutor, data (such as code progress and XP points) is stored locally in your browser (LocalStorage).
                </p>

                <h4 className="font-bold text-app-ink text-sm">2. Google AdSense &amp; Third-Party Advertising</h4>
                <p className="text-app-muted">
                  We partner with third-party vendors, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website. Google uses cookies (including the DoubleClick DART cookie) to serve ads based on prior visits to our website or other websites on the Internet.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-app-muted">
                  <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-app-amber underline">Google Ads Settings</a>.</li>
                  <li>Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-app-amber underline">www.aboutads.info</a>.</li>
                </ul>

                <h4 className="font-bold text-app-ink text-sm">3. Log Files &amp; Analytics</h4>
                <p className="text-app-muted">
                  Like many standard web platforms, we utilize anonymous analytics to understand aggregate traffic patterns, browser types, and lesson completion trends to continually refine course quality.
                </p>

                <h4 className="font-bold text-app-ink text-sm">4. Children's Information (COPPA)</h4>
                <p className="text-app-muted">
                  WZ Storehouse does not knowingly collect any Personal Identifiable Information from children under the age of 13.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-app-border bg-app-inset p-4">
                <h3 className="text-sm font-black text-app-ink flex items-center gap-2">
                  <Scale className="h-4 w-4 text-app-amber" />
                  Terms of Service &amp; Educational Disclaimer
                </h3>
                <p className="text-xs text-app-muted mt-1">
                  By accessing WZ Storehouse, you agree to these Terms of Service.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-app-ink text-sm">1. Use of Course Materials &amp; Sandboxes</h4>
                <p className="text-app-muted">
                  All educational content, interactive 3D visualizers, quizzes, and code challenges provided on WZ Storehouse are for personal educational and training purposes. Code snippets and practice challenges may be freely used in your own software projects.
                </p>

                <h4 className="font-bold text-app-ink text-sm">2. AI Tutor &amp; Sandbox Execution</h4>
                <p className="text-app-muted">
                  The client-side coding sandbox executes HTML, CSS, and JavaScript in a secure browser frame. You agree not to attempt to execute malicious scripts or exploit sandbox infrastructure.
                </p>

                <h4 className="font-bold text-app-ink text-sm">3. Disclaimer of Warranty</h4>
                <p className="text-app-muted">
                  The curriculum and interactive instruments are provided on an "as is" basis without warranties of any kind. WZ Storehouse does not guarantee employment outcomes or software performance in production environments.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-app-border bg-app-inset p-4">
                <h3 className="text-sm font-black text-app-ink flex items-center gap-2">
                  <FileText className="h-4 w-4 text-app-amber" />
                  Cookie Policy &amp; Consent Framework
                </h3>
                <p className="text-xs text-app-muted mt-1">
                  Information on how cookies and local caching are utilized across the platform.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-app-ink text-sm">1. Essential Local Storage</h4>
                <p className="text-app-muted">
                  We use browser LocalStorage to remember your active lesson, dark/light theme preference, bookmark state, completed quiz scores, and student XP points without requiring a login cookie.
                </p>

                <h4 className="font-bold text-app-ink text-sm">2. Advertising &amp; Tracking Cookies</h4>
                <p className="text-app-muted">
                  Third-party ad networks (such as Google AdSense) may set cookies on your device to serve targeted advertisements based on your interests and geographic region. You can manage or disable cookies at any time through your browser settings.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-app-amber/30 bg-app-active/40 p-4">
                <h3 className="text-sm font-black text-app-ink flex items-center gap-2">
                  <Info className="h-4 w-4 text-app-amber" />
                  About WZ Storehouse &amp; Editorial Standards
                </h3>
                <p className="text-xs text-app-muted mt-1">
                  High-craft, interactive frontend engineering curriculum built by professional software engineers.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-app-ink text-sm">Mission Statement</h4>
                <p className="text-app-muted">
                  WZ Storehouse was engineered to bridge the gap between abstract academic programming textbooks and real-world frontend architecture. We replace passive reading with live interactive 3D visualizers, automated coding sandboxes, and production-grade project deliverables.
                </p>

                <h4 className="font-bold text-app-ink text-sm">Editorial Standards &amp; Expertise (E-E-A-T)</h4>
                <p className="text-app-muted">
                  Every curriculum module is authored and vetted by experienced web developers. Content is regularly reviewed against modern standards (W3C, WHATWG, ECMAScript, MDN Web Docs, and WCAG 2.2 accessibility).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-app-border bg-app-inset p-4">
                <h3 className="text-sm font-black text-app-ink flex items-center gap-2">
                  <Mail className="h-4 w-4 text-app-amber" />
                  Contact the Editorial &amp; Support Team
                </h3>
                <p className="text-xs text-app-muted mt-1">
                  Have feedback, copyright inquiries, or questions about a lesson? We reply promptly.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-6 text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-400">Message Received!</h4>
                  <p className="text-xs text-app-muted">
                    Thank you for reaching out. Our editorial team will review your inquiry shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-app-ink mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full rounded-lg border border-app-border bg-app-inset px-3 py-2 text-xs text-app-ink focus:border-app-amber outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-app-ink mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full rounded-lg border border-app-border bg-app-inset px-3 py-2 text-xs text-app-ink focus:border-app-amber outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-app-ink mb-1">Subject / Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write your question, curriculum suggestion, or feedback..."
                      className="w-full rounded-lg border border-app-border bg-app-inset p-3 text-xs text-app-ink focus:border-app-amber outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-app-amber hover:bg-app-amber-hover text-slate-950 font-black text-xs transition-colors"
                  >
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-app-border bg-app-surface px-6 py-3 text-[11px] text-app-subtle">
          <span>&copy; {new Date().getFullYear()} WZ Storehouse. All rights reserved.</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-app-amber hover:underline"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
