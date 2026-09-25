import React, { useState, useEffect } from 'react';
import { Award, X, Download, Printer, CheckCircle, Sparkles, User, Edit } from 'lucide-react';
import { UserProgress } from '../utils/types';
import { useAuth } from '../utils/AuthContext';

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
  const { user } = useAuth();
  const [userName, setUserName] = useState(user?.name || 'Your Name');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;
  const isEligible = completedCount >= 1; // Eligible after learning progress
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check current theme
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Update user name when user changes
    setUserName(user?.name || 'Your Name');
    setTempName(user?.name || 'Your Name');
  }, [user]);

  const handleNameEdit = () => {
    if (isEditingName) {
      // Save the name
      setUserName(tempName);
      // You could also save this to localStorage or user profile
      localStorage.setItem('certificateUserName', tempName);
    }
    setIsEditingName(!isEditingName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };

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
              WebZoneBW Certificate of Web Development Mastery
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
          <div className="p-8 rounded-2xl border-8 border-double border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/40 via-white to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-center space-y-6 shadow-inner relative certificate-content">
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
                WebZone Storehouse Digital Academy
              </h2>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                WebZone Storehouse Global Accreditation Authority
              </p>
            </div>

            <p className="text-xs text-slate-500 uppercase tracking-wider">
              This is to officially certify that
            </p>

            {/* Editable Name Field */}
            <div className="max-w-md mx-auto">
              {isEditingName ? (
                <div className="flex items-center gap-2 justify-center">
                  <input
                    type="text"
                    value={tempName}
                    onChange={handleNameChange}
                    className="w-full text-center text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white border-2 border-indigo-500 bg-transparent py-1 outline-none focus:border-indigo-600 rounded"
                    autoFocus
                  />
                  <button
                    onClick={handleNameEdit}
                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={userName}
                    readOnly
                    onClick={() => setIsEditingName(true)}
                    className="w-full text-center text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white border-b-2 border-dashed border-indigo-400 bg-transparent py-1 outline-none focus:border-indigo-600 cursor-pointer hover:border-indigo-600 transition-colors"
                  />
                  <Edit className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-400 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              )}
              <span className="text-[10px] text-slate-400 block mt-1">
                {isEditingName ? 'Press Enter or click ✓ to save' : 'Click to edit your name'}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              has demonstrated technical proficiency across <strong>11 Comprehensive Chapters (00â€“10)</strong> in Modern Web Development, encompassing HTML5 Semantic Architecture, Modern CSS3, Flexbox &amp; Grid Systems, JavaScript (DOM &amp; Async), Responsive Engineering, React Components, and Cloud Deployment.
            </p>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono gap-4">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Verification ID</span>
                <strong className="text-indigo-600 dark:text-indigo-400">webzonebw-STOREHOUSE-{Math.random().toString(36).substring(2, 9).toUpperCase()}</strong>
              </div>

              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Mastery Score</span>
                <strong className="text-emerald-600 dark:text-emerald-400">{progress.xpPoints} XP Points â€¢ {completedCount}/{totalLessons} Lessons</strong>
              </div>

              <div>
                <span className="block text-[10px] text-slate-400 uppercase">Date of Issue</span>
                <strong>{new Date().toLocaleDateString()}</strong>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Verifiable digital credential
              </span>
              {isEligible && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  ✓ Eligible for Certificate
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
              <button
                onClick={() => {
                  // Download as HTML
                  const certificateContent = document.querySelector('.certificate-content');
                  if (certificateContent) {
                    const htmlContent = `
                      <!DOCTYPE html>
                      <html lang="en">
                      <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Certificate of Completion</title>
                        <style>
                          body { font-family: serif; text-align: center; padding: 40px; background: linear-gradient(to bottom, #f0f4ff, #ffffff); }
                          .certificate { padding: 40px; border: 8px double #6366f1; background: linear-gradient(to bottom, #f0f4ff, #ffffff, #f0f4ff); }
                          .title { font-size: 24px; font-weight: 900; margin-bottom: 20px; }
                          .name { font-size: 32px; font-weight: 900; margin: 20px 0; }
                          .description { max-width: 600px; margin: 0 auto 30px; }
                          .footer { display: flex; justify-content: space-between; font-size: 12px; margin-top: 40px; }
                        </style>
                      </head>
                      <body>
                        <div class="certificate">
                          <div class="title">Certificate of Completion</div>
                          <div class="name">${userName}</div>
                          <div class="description">
                            has demonstrated technical proficiency across 11 Comprehensive Chapters (00–10) in Modern Web Development, encompassing HTML5 Semantic Architecture, Modern CSS3, Flexbox & Grid Systems, JavaScript (DOM & Async), Responsive Engineering, React Components, and Cloud Deployment.
                          </div>
                          <div class="footer">
                            <div>Verification ID: webzonebw-STOREHOUSE-${Math.random().toString(36).substring(2, 9).toUpperCase()}</div>
                            <div>Mastery Score: ${progress.xpPoints} XP Points • ${completedCount}/${totalLessons} Lessons</div>
                            <div>Date of Issue: ${new Date().toLocaleDateString()}</div>
                          </div>
                        </div>
                      </body>
                      </html>
                    `;
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `webzonebw-certificate-${userName.replace(/\s+/g, '-').toLowerCase()}.html`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" /> Download HTML
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
