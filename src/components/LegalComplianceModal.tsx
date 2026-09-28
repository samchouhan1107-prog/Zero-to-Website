import React, { useEffect, useState } from 'react';
import { FileText, Info, Lock, Mail, Scale, Shield, X } from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'cookies' | 'about' | 'contact';
interface LegalComplianceModalProps { isOpen: boolean; onClose: () => void; initialTab?: PolicyTab; }
const tabs: { id: PolicyTab; label: string; icon: typeof Lock }[] = [
  { id: 'privacy', label: 'Privacy', icon: Lock }, { id: 'terms', label: 'Terms', icon: Scale }, { id: 'cookies', label: 'Storage', icon: FileText }, { id: 'about', label: 'About', icon: Info }, { id: 'contact', label: 'Contact', icon: Mail },
];
const links: Record<PolicyTab, string> = { privacy: '/privacy-policy.html', terms: '/terms-of-service.html', cookies: '/cookie-policy.html', about: '/about.html', contact: '/contact.html' };

export const LegalComplianceModal: React.FC<LegalComplianceModalProps> = ({ isOpen, onClose, initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  useEffect(() => setActiveTab(initialTab), [initialTab]);
  useEffect(() => { if (!isOpen) return; const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', closeOnEscape); return () => window.removeEventListener('keydown', closeOnEscape); }, [isOpen, onClose]);
  if (!isOpen) return null;
  const text: Record<PolicyTab, { title: string; summary: string }> = {
    privacy: { title: 'Privacy and data use', summary: 'Learning progress and preferences are used to provide the features you choose. The optional AI tutor processes the prompt you submit. The site does not currently serve advertising.' },
    terms: { title: 'Terms of use', summary: 'Lessons, examples, and tools are educational starting points. Test code in your own project and do not treat the material as professional, legal, or security advice.' },
    cookies: { title: 'Cookies and browser storage', summary: 'Browser storage can remember theme, notes, bookmarks, and learning progress. Clearing browser storage may reset these features.' },
    about: { title: 'Ownership and editorial approach', summary: 'WebZoneBW SC is operated by its editorial team. Material is published to help a learner understand or apply a specific concept, and reported errors or broken exercises are reviewed.' },
    contact: { title: 'Report a problem or send feedback', summary: 'For a broken lesson, exercise, link, or accessibility issue, include the page name, what happened, and your browser or device.' },
  };
  const active = text[activeTab];
  return <div role="dialog" aria-modal="true" aria-labelledby="legal-modal-title" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md sm:p-6"><div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-app-border bg-app-surface text-app-ink shadow-2xl"><header className="flex items-center justify-between border-b border-app-border px-5 py-4"><div className="flex items-center gap-2"><Shield className="h-5 w-5 text-app-amber" /><div><h2 id="legal-modal-title" className="text-base font-black">WebZoneBW SC information</h2><p className="text-xs text-app-muted">Public policies, ownership, and support</p></div></div><button type="button" onClick={onClose} aria-label="Close information dialog" className="rounded-lg border border-app-border p-2 hover:bg-app-active"><X className="h-4 w-4" /></button></header><div className="flex gap-1 overflow-x-auto border-b border-app-border bg-app-inset px-3 py-2">{tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveTab(id)} aria-pressed={activeTab === id} className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold ${activeTab === id ? 'bg-app-surface text-app-amber' : 'text-app-muted hover:text-app-ink'}`}><Icon className="h-3.5 w-3.5" />{label}</button>)}</div><div className="space-y-4 overflow-y-auto p-6"><h3 className="text-lg font-black">{active.title}</h3><p className="text-sm leading-relaxed text-app-muted">{active.summary}</p>{activeTab === 'contact' && <p className="text-sm"><a className="font-semibold text-app-amber underline" href="mailto:contact@webzonebw.in">contact@webzonebw.in</a></p>}<a href={links[activeTab]} className="inline-flex rounded-lg border border-app-amber/50 px-4 py-2 text-xs font-bold text-app-amber hover:bg-app-active">Read the full {tabs.find((tab) => tab.id === activeTab)?.label.toLowerCase()} page</a></div></div></div>;
};
