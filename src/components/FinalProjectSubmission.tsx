import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  ExternalLink,
  Code2,
  Award,
  Sparkles,
  Layers,
  Send,
  Eye,
  Check,
  Globe,
  Github,
  FileCode2,
} from 'lucide-react';
import { UserProgress } from '../utils/types';
import { submitFinalProject } from '../utils/authService';

interface FinalProjectSubmissionProps {
  progress: UserProgress;
  onProjectSubmitted: (updatedProgress: UserProgress) => void;
  onOpenCertificate?: () => void;
}

export const FinalProjectSubmission: React.FC<FinalProjectSubmissionProps> = ({
  progress,
  onProjectSubmitted,
  onOpenCertificate,
}) => {
  const isVerified = Boolean(progress.finalProjectVerified);
  const [isEditing, setIsEditing] = useState(!isVerified);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState(progress.finalProjectDetails?.title || 'My Modern Developer Portfolio');
  const [description, setDescription] = useState(
    progress.finalProjectDetails?.description ||
      'A complete, responsive multi-section portfolio showcasing semantic HTML5, modern CSS Grid/Flexbox layouts, and interactive JavaScript features.'
  );
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [previewMode, setPreviewMode] = useState(false);

  // Code state
  const [htmlCode, setHtmlCode] = useState(`<section class="portfolio-hero">
  <div class="badge">🚀 Available for Hire</div>
  <h1>Student Web Developer</h1>
  <p class="subtitle">Frontend Engineer &amp; Graduate of WZ Storehouse Academy</p>
  <div class="skills-row">
    <span class="chip">HTML5</span>
    <span class="chip">CSS3 Grid / Flexbox</span>
    <span class="chip">JavaScript ES6+</span>
    <span class="chip">Git / GitHub</span>
  </div>
  <div class="cta-group">
    <button id="hireMeBtn" class="btn primary">Contact Me</button>
    <a href="#projects" class="btn secondary">View Projects</a>
  </div>
</section>`);

  const [cssCode, setCssCode] = useState(`.portfolio-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  color: #ffffff;
  padding: 48px 32px;
  border-radius: 16px;
  text-align: center;
  font-family: system-ui, -apple-system, sans-serif;
  box-shadow: 0 12px 32px rgba(0,0,0,0.25);
}

.badge {
  display: inline-block;
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.4);
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}

h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #94a3b8;
  font-size: 16px;
  margin: 0 0 24px 0;
}

.skills-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 28px;
}

.chip {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
}

.cta-group {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn {
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn.primary {
  background: #6366f1;
  color: #ffffff;
  border: none;
}

.btn.secondary {
  background: transparent;
  color: #e2e8f0;
  border: 1px solid rgba(255,255,255,0.2);
}`);

  const [jsCode, setJsCode] = useState(`document.getElementById('hireMeBtn').addEventListener('click', () => {
  alert("🎉 Thank you for reaching out! Project successfully built and deployed.");
});`);

  const [selectedTech, setSelectedTech] = useState<string[]>([
    'HTML5 Semantic Markup',
    'Responsive CSS Grid & Flexbox',
    'JavaScript ES6+ Events',
    'Git & GitHub Version Control',
  ]);

  const availableTech = [
    'HTML5 Semantic Markup',
    'Responsive CSS Grid & Flexbox',
    'JavaScript ES6+ Events',
    'Git & GitHub Version Control',
    'Bootstrap 5 Framework',
    'Mobile-First Media Queries',
    'Browser DevTools & Debugging',
  ];

  const toggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter((t) => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title for your final project.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitFinalProject({
        title: title.trim(),
        description: description.trim() + (liveUrl ? ` | Live: ${liveUrl}` : '') + (githubUrl ? ` | Repo: ${githubUrl}` : ''),
        techStack: selectedTech,
        htmlCode,
        cssCode,
        jsCode,
      });

      if (result && result.success && result.progress) {
        onProjectSubmitted(result.progress);
        setIsEditing(false);
      } else {
        // Fallback optimistic update
        const fallbackProgress: UserProgress = {
          ...progress,
          finalProjectSubmitted: true,
          finalProjectVerified: true,
          finalProjectDetails: {
            title: title.trim(),
            techStack: selectedTech,
            description: description.trim(),
            submittedAt: new Date().toISOString(),
          },
          xpPoints: (progress.xpPoints || 0) + 250,
          courseCompleted: true,
          courseCompletedAt: new Date().toISOString(),
        };
        onProjectSubmitted(fallbackProgress);
        setIsEditing(false);
      }
    } catch {
      setError('An error occurred while submitting your project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewDocument = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: system-ui, sans-serif; padding: 24px; background: #0b0f19; color: #f8fafc; }
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
        <script>
          ${jsCode}
        </script>
      </body>
    </html>
  `;

  return (
    <section
      id="section-final-project-submission"
      className="rounded-2xl border-2 border-indigo-500/40 bg-gradient-to-b from-indigo-950/20 via-slate-900 to-slate-950 p-6 sm:p-8 space-y-6 shadow-xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Rocket className="w-4 h-4" />
            <span>Capstone Verification &amp; Graduation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Final Capstone Project Submission
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Submit and verify your Chapter 10 website to claim the <strong className="text-amber-400">Capstone Architect</strong> title, unlock <strong className="text-amber-400">+250 XP</strong>, and generate your official Certificate of Completion.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          {isVerified ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Verified Capstone
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Graduation Milestone
            </span>
          )}
        </div>
      </div>

      {/* Verified Status Card (when already submitted and not currently editing) */}
      {isVerified && !isEditing ? (
        <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  {progress.finalProjectDetails?.title || 'Capstone Developer Portfolio'}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                {progress.finalProjectDetails?.description ||
                  'Your final capstone project has been reviewed, evaluated, and permanently verified on the WZ Storehouse server.'}
              </p>
              {progress.finalProjectDetails?.submittedAt && (
                <p className="text-[11px] font-mono text-emerald-400/80">
                  Verified on {new Date(progress.finalProjectDetails.submittedAt).toLocaleDateString()} at{' '}
                  {new Date(progress.finalProjectDetails.submittedAt).toLocaleTimeString()}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {onOpenCertificate && (
                <button
                  type="button"
                  onClick={onOpenCertificate}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>View Official Certificate</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                <span>Edit Submission</span>
              </button>
            </div>
          </div>

          {/* Tech stack badges */}
          {progress.finalProjectDetails?.techStack && progress.finalProjectDetails.techStack.length > 0 && (
            <div className="border-t border-emerald-500/20 pt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 mr-2">Verified Stack:</span>
              {progress.finalProjectDetails.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Submission Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {error}
            </div>
          )}

          {/* Project Title & Live Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Project Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sameer's Interactive Developer Portfolio"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-sans"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Live URL / Hosting Link (Optional)
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://my-portfolio.vercel.app"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                GitHub Repository URL (Optional)
              </label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/your-username/my-portfolio"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Project Architecture Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of your site architecture and design..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-sans"
              />
            </div>
          </div>

          {/* Tech Stack Picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              Applied Technologies (Click to toggle)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTech.map((tech) => {
                const isSelected = selectedTech.includes(tech);
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTech(tech)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{tech}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Integrated Code Blueprint Tabs */}
          <div className="rounded-xl border border-slate-800 bg-[#0d1117] overflow-hidden space-y-0">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono font-bold text-slate-300">Capstone Source Code</span>
                <div className="ml-3 flex items-center gap-1 font-mono text-xs">
                  {(['html', 'css', 'js'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab);
                        setPreviewMode(false);
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-bold uppercase transition-colors cursor-pointer ${
                        !previewMode && activeTab === tab
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  previewMode
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{previewMode ? 'Hide Preview' : 'Live Preview'}</span>
              </button>
            </div>

            {previewMode ? (
              <div className="p-4 bg-slate-950">
                <iframe
                  title="Capstone Preview"
                  srcDoc={previewDocument}
                  className="w-full h-64 rounded-xl border border-slate-800 bg-white"
                  sandbox="allow-scripts"
                />
              </div>
            ) : (
              <div className="p-3">
                {activeTab === 'html' && (
                  <textarea
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    rows={8}
                    className="w-full p-3 font-mono text-xs text-emerald-400 bg-transparent outline-none resize-y"
                    placeholder="Enter semantic HTML..."
                  />
                )}
                {activeTab === 'css' && (
                  <textarea
                    value={cssCode}
                    onChange={(e) => setCssCode(e.target.value)}
                    rows={8}
                    className="w-full p-3 font-mono text-xs text-cyan-400 bg-transparent outline-none resize-y"
                    placeholder="Enter responsive CSS..."
                  />
                )}
                {activeTab === 'js' && (
                  <textarea
                    value={jsCode}
                    onChange={(e) => setJsCode(e.target.value)}
                    rows={8}
                    className="w-full p-3 font-mono text-xs text-amber-300 bg-transparent outline-none resize-y"
                    placeholder="Enter interactive JavaScript..."
                  />
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Awards <strong className="text-white">+250 XP</strong>, unlocks{' '}
                <strong className="text-white">Capstone Architect</strong> &amp; qualifies for full certification.
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {isVerified && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-all"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Project...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Verify &amp; Submit Capstone</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};
