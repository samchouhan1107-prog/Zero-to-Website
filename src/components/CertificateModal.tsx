import React, { useState, useEffect } from 'react';
import { Award, X, Download, Printer, CheckCircle, Sparkles, User, Edit, AlertCircle } from 'lucide-react';
import { UserProgress } from '../utils/types';
import { useAuth } from '../utils/AuthContext';
import * as authService from '../utils/authService';

// Type matching the real API contract of GET /api/user/certificate-eligibility (server/api.ts)
interface CertificateEligibilityResponse {
  success: boolean;
  eligible: boolean;
  certificateId: string | null;
  preferredName: string | null;
  requirements: {
    lessons: { current: number; required: number };
    xp: { current: number; required: number };
    chapters: { current: number; required: number };
  };
}

// Runtime guard: server responses are untrusted at the boundary.
function isCertificateEligibilityResponse(data: unknown): data is CertificateEligibilityResponse {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.success === 'boolean' &&
    typeof d.eligible === 'boolean' &&
    (typeof d.certificateId === 'string' || d.certificateId === null) &&
    (typeof d.preferredName === 'string' || d.preferredName === null) &&
    typeof d.requirements === 'object'
  );
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  totalLessons: number;
}

// Define minimum completion requirements
const COMPLETION_REQUIREMENTS = {
  MIN_LESSONS: 10, // Must complete at least 10 lessons
  MIN_XP: 500, // Must earn at least 500 XP
  MIN_CHAPTERS: 3, // Must complete lessons from at least 3 chapters
};

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  progress,
  totalLessons,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [userName, setUserName] = useState(user?.name || 'Your Name');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'eligible' | 'ineligible'>('idle');
  const [serverCertificateId, setServerCertificateId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate actual completion status
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;
  
  // Calculate completed chapters by extracting chapter numbers from completed lesson IDs
  const completedChapters = new Set(
    Object.entries(progress.completedLessons)
      .filter(([_, completed]) => completed)
      .map(([lessonId]) => {
        // Extract chapter number from lesson ID (e.g., "ch-01-l-05" -> "01")
        const match = lessonId.match(/ch-(\d+)/);
        return match ? match[1] : null;
      })
      .filter(Boolean)
  ).size;
  
  // Verify completion requirements
  const meetsRequirements = completedCount >= COMPLETION_REQUIREMENTS.MIN_LESSONS &&
                           progress.xpPoints >= COMPLETION_REQUIREMENTS.MIN_XP &&
                           completedChapters >= COMPLETION_REQUIREMENTS.MIN_CHAPTERS;
  
  const isEligible = meetsRequirements && isAuthenticated;
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check current theme
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Update user name when user changes
    setUserName(user?.name || 'Your Name');
    setTempName(user?.name || 'Your Name');
    
    // Verify completion status when modal opens
    if (isOpen) {
      verifyCompletionStatus();
    }
  }, [user, isOpen]);

  const verifyCompletionStatus = async () => {
    if (!isAuthenticated) {
      setVerificationStatus('ineligible');
      setError(null);
      return;
    }
    
    setIsVerifying(true);
    setVerificationStatus('verifying');
    setError(null);
    
    try {
      // Verify with server
      const token = localStorage.getItem('webzonebw_session');
      if (token) {
        const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/user/certificate-eligibility`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data: unknown = await response.json();
          if (!isCertificateEligibilityResponse(data)) {
            throw new Error('Unexpected server response for certificate eligibility');
          }
          if (data.eligible) {
            setVerificationStatus('eligible');
            setServerCertificateId(data.certificateId);
            // Load server-stored name if available
            if (data.preferredName) {
              setUserName(data.preferredName);
              setTempName(data.preferredName);
            }
          } else {
            setVerificationStatus('ineligible');
          }
        } else if (response.status === 401) {
          // Unauthorized - session expired
          setVerificationStatus('ineligible');
          setError('Session expired. Please sign in again.');
        } else {
          // Fallback to client-side verification if server unavailable
          console.warn('Server certificate endpoint unavailable, using client-side verification');
          if (meetsRequirements) {
            setVerificationStatus('eligible');
          } else {
            setVerificationStatus('ineligible');
          }
        }
      } else {
        // No session token, not authenticated
        setVerificationStatus('ineligible');
        setError('No active session found. Please sign in.');
      }
    } catch (error) {
      console.warn('Server verification failed, using client-side verification:', error);
      setError('Unable to verify server status. Using local data.');
      // Fallback to client-side verification
      if (meetsRequirements) {
        setVerificationStatus('eligible');
      } else {
        setVerificationStatus('ineligible');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNameEdit = () => {
    if (isEditingName) {
      // Save the name to server if authenticated
      if (isAuthenticated) {
        saveCertificateName(tempName);
      } else {
        // Fallback to localStorage for guest users
        localStorage.setItem('certificateUserName', tempName);
      }
      setUserName(tempName);
    }
    setIsEditingName(!isEditingName);
  };

  const saveCertificateName = async (name: string) => {
    if (!isAuthenticated || !user) return;
    
    try {
      const token = localStorage.getItem('webzonebw_session');
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL || '/api'}/user/certificate-name`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ preferredName: name })
        });
      }
    } catch (error) {
      console.warn('Failed to save certificate name to server:', error);
      // Fallback to localStorage
      localStorage.setItem('certificateUserName', name);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit name length and trim whitespace
    const value = e.target.value.trim();
    if (value.length <= 50) {
      setTempName(value);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getCertificateId = () => {
    if (serverCertificateId) {
      return serverCertificateId;
    }
    // Generate a deterministic ID based on user and completion date
    const timestamp = progress.courseCompletedAt || new Date().toISOString();
    const userId = user?.id || 'guest';
    const hash = simpleHash(`${userId}-${timestamp}`);
    return `WZ-CERT-${hash.substring(0, 8).toUpperCase()}`;
  };

  // Simple hash function for generating consistent IDs
  const simpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              WebZoneBW Certificate of Completion
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
          {/* Loading State */}
          {isVerifying && (
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Verifying your completion status...</p>
              </div>
            </div>
          )}

          {/* Authentication Required State */}
          {!isVerifying && !isAuthenticated && (
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4">
                <User className="w-12 h-12 text-slate-400" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Sign In Required</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                  Please create a free account or sign in to access your Certificate of Completion and track your learning progress.
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {!isVerifying && error && (
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4">
                <AlertCircle className="w-12 h-12 text-amber-500" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Unable to Verify Certificate</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-4">
                  {error}
                </p>
                <button
                  onClick={verifyCompletionStatus}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Not Eligible State */}
          {!isVerifying && isAuthenticated && verificationStatus === 'ineligible' && (
            <div className="mb-6 p-6 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-920/20 text-center">
              <div className="flex flex-col items-center gap-4">
                <AlertCircle className="w-12 h-12 text-amber-600 dark:text-amber-400" />
                <h3 className="font-bold text-lg text-amber-800 dark:text-amber-200">
                  Certificate Not Available
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 max-w-md">
                  Complete the learning requirements to unlock your Certificate of Completion:
                </p>
                <ul className="text-sm text-amber-600 dark:text-amber-400 mt-4 space-y-2 w-full max-w-xs">
                  <li className="flex items-center justify-between">
                    <span>Lessons Completed:</span>
                    <span className="font-semibold">
                      {completedCount}/{COMPLETION_REQUIREMENTS.MIN_LESSONS}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>XP Points Earned:</span>
                    <span className="font-semibold">
                      {progress.xpPoints}/{COMPLETION_REQUIREMENTS.MIN_XP}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Chapters Completed:</span>
                    <span className="font-semibold">
                      {completedChapters}/{COMPLETION_REQUIREMENTS.MIN_CHAPTERS}
                    </span>
                  </li>
                </ul>
                <div className="mt-4 text-xs text-amber-600 dark:text-amber-400">
                  Keep learning to unlock your certificate!
                </div>
              </div>
            </div>
          )}

          {/* Eligible State */}
          {!isVerifying && isAuthenticated && verificationStatus === 'eligible' && (
            <>
              <div className="p-8 rounded-2xl border-8 border-double border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/40 via-white to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-center space-y-6 shadow-inner relative certificate-content">
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Award className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    Certificate of Completion
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 dark:text-white">
                    WebZone Storehouse Digital Academy
                  </h2>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Learning Achievement Recognition
                  </p>
                </div>

                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  This certifies that
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
                        maxLength={50}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleNameEdit();
                          }
                        }}
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
                        maxLength={50}
                      />
                      <Edit className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-400 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  )}
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {isEditingName ? 'Press Enter or click ✓ to save (max 50 characters)' : 'Click to edit your name'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                  has successfully completed the WebZoneBW Web Development curriculum, demonstrating proficiency in HTML5, CSS3, JavaScript, Responsive Design, and Modern Web Development practices.
                </p>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono gap-4">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Certificate ID</span>
                    <strong className="text-indigo-600 dark:text-indigo-400 font-mono">
                      {getCertificateId()}
                    </strong>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Completion Status</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      {completedCount} lessons • {progress.xpPoints} XP • {completedChapters} chapters
                    </strong>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Date of Completion</span>
                    <strong>{progress.courseCompletedAt ? new Date(progress.courseCompletedAt).toLocaleDateString() : new Date().toLocaleDateString()}</strong>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Verifiable digital credential
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Course Completed
                  </span>
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
                                has successfully completed the WebZoneBW Web Development curriculum, demonstrating proficiency in HTML5, CSS3, JavaScript, Responsive Design, and Modern Web Development practices.
                              </div>
                              <div class="footer">
                                <div>Certificate ID: ${getCertificateId()}</div>
                                <div>Completion Status: ${completedCount} lessons • ${progress.xpPoints} XP • ${completedChapters} chapters</div>
                                <div>Date of Completion: ${progress.courseCompletedAt ? new Date(progress.courseCompletedAt).toLocaleDateString() : new Date().toLocaleDateString()}</div>
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
            </>
          )}

          {/* Unknown/Fallback State */}
          {!isVerifying && verificationStatus === 'idle' && (
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-400 rounded-full animate-spin"></div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Preparing certificate...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};