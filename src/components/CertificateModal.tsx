import React, { useState } from 'react';
import { Award, X, Download, Printer, CheckCircle, Sparkles } from 'lucide-react';
import { UserProgress } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  totalLessons: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  progress,
  totalLessons,
}) => {
  const [userName, setUserName] = useState('Sameer Chouhan');
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;
  const isEligible = completedCount >= 1; // Eligible after learning progress

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              WZ Storehouse Certificate of Web Development Mastery
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Canvas / Frame */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          <div className="p-8 rounded-2xl border-8 border-double border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/40 via-white to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-center space-y-6 shadow-inner relative">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Award className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Official Certification of Achievement
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 dark:text-white">
                WZ Storehouse Digital Academy
              </h2>
            </div>

            <p className="text-xs text-slate-500 uppercase tracking-wider">
              This is to officially certify that
            </p>

            {/* Editable Name Field */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full text-center text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white border-b-2 border-dashed border-indigo-400 bg-transparent py-1 outline-none focus:border-indigo-600"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                (Click to customize your certificate name)
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              has demonstrated technical proficiency across <strong>10 Comprehensive Chapters</strong> in Modern Web Development, encompassing HTML5 Semantic Architecture, Modern CSS3, Flexbox & Grid Systems, JavaScript (DOM & Async), Responsive Engineering, React Components, and Git Version Control.
            </p>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono gap-4">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Verification ID</span>
                <strong>WZ-{Math.random().toString(36).substring(2, 9).toUpperCase()}</strong>
              </div>

              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Mastery Score</span>
                <strong className="text-emerald-600 dark:text-emerald-400">{progress.xpPoints} XP Points • {completedCount}/{totalLessons} Lessons</strong>
              </div>

              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Date of Issue</span>
                <strong>{new Date().toLocaleDateString()}</strong>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Verifiable digital credential
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
