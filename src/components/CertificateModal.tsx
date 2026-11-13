import React, { useState, useEffect, useCallback } from 'react';
import {
  Award,
  X,
  Printer,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';
import { UserProgress } from '../utils/types';
import { useAuth } from '../utils/AuthContext';
import {
  fetchCertificate,
  requestCertificate,
  CertificateData,
  CertificateApiResponse
} from '../utils/authService';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  totalLessons: number;
  onOpenAccount?: () => void;
  onNavigateLesson?: (lessonId: string) => void;
}

type ModalViewState =
  | 'LOADING'
  | 'UNAUTHENTICATED'
  | 'NOT_ELIGIBLE'
  | 'ELIGIBLE'
  | 'ISSUED'
  | 'ERROR';

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  progress,
  totalLessons,
  onOpenAccount,
  onNavigateLesson,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [viewState, setViewState] = useState<ModalViewState>('LOADING');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [studentName, setStudentName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [serverProgress, setServerProgress] = useState<{
    completedCount: number;
    totalCount: number;
    percent: number;
  } | null>(null);

  // Load certificate data from authoritative server endpoint
  const loadCertificateData = useCallback(async () => {
    if (!isOpen) return;

    // Check frontend auth state first
    if (!isAuthenticated || user?.method === 'guest') {
      setViewState('UNAUTHENTICATED');
      return;
    }

    setViewState('LOADING');
    setErrorMessage('');

    try {
      const response: CertificateApiResponse = await fetchCertificate();

      if (response.status === 'ISSUED' && response.certificate) {
        setCertificate(response.certificate);
        setStudentName(response.certificate.name);
        setViewState('ISSUED');
      } else if (response.status === 'ELIGIBLE') {
        setCertificate(null);
        setStudentName(response.defaultName || user?.name || 'WebZone Scholar');
        if (response.progress) {
          setServerProgress(response.progress);
        }
        setViewState('ELIGIBLE');
      } else {
        // NOT_ELIGIBLE
        setCertificate(null);
        if (response.progress) {
          setServerProgress(response.progress);
        } else {
          // Client fallback metrics
          const completedCount = Object.values(progress.completedLessons || {}).filter(Boolean).length;
          setServerProgress({
            completedCount,
            totalCount: totalLessons,
            percent: Math.round((completedCount / (totalLessons || 1)) * 100),
          });
        }
        setViewState('NOT_ELIGIBLE');
      }
    } catch (err: any) {
      if (err.message === 'UNAUTHENTICATED') {
        setViewState('UNAUTHENTICATED');
      } else {
        console.error('[Certificate] Failed to load certificate:', err);
        setErrorMessage(
          err.message || 'Unable to communicate with the verification server. Please try again.'
        );
        setViewState('ERROR');
      }
    }
  }, [isOpen, isAuthenticated, user, progress, totalLessons]);

  useEffect(() => {
    if (isOpen) {
      loadCertificateData();
    }
  }, [isOpen, loadCertificateData]);

  // Handle claiming/generating the certificate
  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await requestCertificate(studentName.trim());
      if (res.certificate) {
        setCertificate(res.certificate);
        setViewState('ISSUED');
      } else {
        throw new Error('Server did not return certificate record.');
      }
    } catch (err: any) {
      console.error('[Certificate] Claim error:', err);
      setErrorMessage(err.message || 'Failed to generate certificate.');
      setViewState('ERROR');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  if (!isOpen) return null;

  // Compute metrics for fallback display
  const localCompleted = Object.values(progress.completedLessons || {}).filter(Boolean).length;
  const currentCompleted = serverProgress?.completedCount ?? localCompleted;
  const currentTotal = serverProgress?.totalCount ?? totalLessons;
  const currentPercent = serverProgress?.percent ?? Math.round((currentCompleted / (currentTotal || 1)) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 id="certificate-modal-title" className="font-bold text-sm text-slate-900 dark:text-white">
                WebZoneBW Certificate of Web Development Mastery
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Official Credential Verification &amp; Issue Authority
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Certificate modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container with Guarantee Never to Be Blank */}
        <div className="p-6 overflow-y-auto flex-1">

          {/* STATE 1: LOADING */}
          {viewState === 'LOADING' && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
                <Sparkles className="w-4 h-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Verifying Graduation Records...
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                  Connecting to the WebZoneBW server to evaluate verified course progress and issue records.
                </p>
              </div>
            </div>
          )}

          {/* STATE 2: NOT AUTHENTICATED */}
          {viewState === 'UNAUTHENTICATED' && (
            <div className="py-12 px-4 max-w-md mx-auto text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Account Sign In Required
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  WebZoneBW certificates are verifiable digital credentials linked to authenticated student profiles. Please sign in or create an account to record your completed chapters and claim your graduation certificate.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenAccount) onOpenAccount();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Sign In / Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Return to Learning
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: NOT ELIGIBLE */}
          {viewState === 'NOT_ELIGIBLE' && (
            <div className="py-8 px-4 max-w-lg mx-auto text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-sm">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Certificate Requirements in Progress
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  To receive the official <strong>WebZoneBW Web Development Mastery Certificate</strong>, you must complete the comprehensive curriculum across all 11 Chapters (HTML5, Modern CSS3, JavaScript DOM, React, and the Capstone Project).
                </p>
              </div>

              {/* Progress Meter */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3 text-left">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Course Completion</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                    {currentCompleted} / {currentTotal} Lessons ({currentPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(5, currentPercent))}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Current Mastery XP: {progress.xpPoints} XP</span>
                  <span>{Math.max(0, currentTotal - currentCompleted)} lessons remaining</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onNavigateLesson) {
                      onNavigateLesson('ch-00-l-01');
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continue Curriculum</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={loadCertificateData}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-check Eligibility</span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 4: ELIGIBLE (Ready to Issue) */}
          {viewState === 'ELIGIBLE' && (
            <div className="py-6 px-4 max-w-lg mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Congratulations! You Are Eligible!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  You have verified technical proficiency across the curriculum. Confirm the recipient name you wish to appear on your official credential.
                </p>
              </div>

              <form onSubmit={handleIssueCertificate} className="space-y-4 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-950/20">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your full name for certification"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white font-serif outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    This name will be cryptographically locked into your permanent certificate record.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !studentName.trim()}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Issuing Credential...</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4" />
                        <span>Generate &amp; Issue Certificate</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STATE 5: ISSUED (Official Verifiable Certificate) */}
          {viewState === 'ISSUED' && certificate && (
            <div className="space-y-6">
              {/* Certificate Canvas / Frame */}
              <div className="p-8 rounded-2xl border-8 border-double border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/40 via-white to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-center space-y-6 shadow-inner relative">
                
                {/* Official Medallion */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 ring-4 ring-amber-300/40">
                    <Award className="w-9 h-9" />
                  </div>
                </div>

                {/* Authority Header */}
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

                {/* Certified Recipient Name */}
                <div className="max-w-md mx-auto">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white border-b-2 border-indigo-400/80 pb-1">
                    {certificate.name}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                  has demonstrated verified technical proficiency across <strong>11 Comprehensive Chapters (00–10)</strong> in Modern Web Development, encompassing HTML5 Semantic Architecture, Modern CSS3, Flexbox &amp; Grid Systems, JavaScript (DOM &amp; Async), Responsive Engineering, React Components, and Cloud Deployment.
                </p>

                {/* Certificate Verification Footer */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono gap-4">
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Verification ID</span>
                    <strong className="text-indigo-600 dark:text-indigo-400 tracking-wider">
                      {certificate.certificateId || certificate.id}
                    </strong>
                  </div>

                  <div className="text-center">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Mastery Score</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      {certificate.xpEarned} XP • {certificate.completedLessonsCount}/{certificate.totalLessonsCount} Chapters
                    </strong>
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Date of Issue</span>
                    <strong className="text-slate-700 dark:text-slate-300">
                      {new Date(certificate.issueDate).toLocaleDateString()}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Verifiable digital credential stored in WebZone registry</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyId(certificate.certificateId || certificate.id)}
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copied ID' : 'Copy ID'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATE 6: ERROR */}
          {viewState === 'ERROR' && (
            <div className="py-12 px-4 max-w-md mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-500 flex items-center justify-center mx-auto shadow-sm">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Verification Error
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {errorMessage || 'An unexpected issue occurred while communicating with the credential authority.'}
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={loadCertificateData}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Verification</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
