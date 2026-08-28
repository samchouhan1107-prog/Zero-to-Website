import React from 'react';
import { Settings, X, Moon, Sun, Type, RotateCcw, Download, Upload, Check, Zap, Flame, Sparkles, BookOpen } from 'lucide-react';
import { UserProgress, AppTheme } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  fontSize: 'sm' | 'md' | 'lg';
  onSelectFontSize: (size: 'sm' | 'md' | 'lg') => void;
  fontFamily: 'sans' | 'serif' | 'mono';
  onSelectFontFamily: (font: 'sans' | 'serif' | 'mono') => void;
  onResetProgress: () => void;
  progress: UserProgress;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onSelectTheme,
  fontSize,
  onSelectFontSize,
  fontFamily,
  onSelectFontFamily,
  onResetProgress,
  progress,
}) => {
  if (!isOpen) return null;

  const exportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `wz-storehouse-progress-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const themeOptions: { id: AppTheme; label: string; desc: string; icon: any; colorDot: string; isSpecial?: boolean; isEnergetic?: boolean }[] = [
    { id: 'batman', label: '🌙 Obsidian Dark Knight', desc: 'Deep Obsidian & Amber Gold Glow', icon: Moon, colorDot: 'bg-yellow-400 ring-2 ring-yellow-500/80', isSpecial: true },
    { id: 'light', label: '☀️ Light Clean', desc: 'Crisp Daytime Study Canvas', icon: Sun, colorDot: 'bg-amber-400 ring-2 ring-amber-300' },
    { id: 'cyber-energy', label: '⚡ Cyber Energy', desc: 'Electric Neon & Violet Pulse', icon: Zap, colorDot: 'bg-cyan-400 ring-2 ring-purple-500', isEnergetic: true },
    { id: 'sunset-pulse', label: '🌅 Sunset Pulse', desc: 'Solar Radiant & Fiery Amber', icon: Flame, colorDot: 'bg-orange-500 ring-2 ring-amber-400', isEnergetic: true },
    { id: 'emerald-flow', label: '🔋 Emerald Flow', desc: 'Matrix Mint & Neon Lime', icon: Sparkles, colorDot: 'bg-emerald-400 ring-2 ring-teal-500', isEnergetic: true },
    { id: 'sepia', label: '📖 Warm Sepia', desc: 'Eye-Strain Relaxed Tone', icon: BookOpen, colorDot: 'bg-amber-700 ring-2 ring-amber-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Settings className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Studio Themes & Reading Preferences
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 text-xs overflow-y-auto">
          {/* Theme Mode Grid */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-slate-900 dark:text-white block uppercase tracking-wider text-[11px]">
                Active Color Theme & Atmosphere
              </label>
              <span className="text-[10px] text-indigo-600 dark:text-cyan-400 font-bold font-mono">
                {themeOptions.find((t) => t.id === theme)?.label}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {themeOptions.map((t) => {
                const Icon = t.icon;
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTheme(t.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50/90 dark:bg-indigo-950/70 shadow-md ring-2 ring-indigo-500/80 scale-[1.02]'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:border-slate-300 dark:hover:border-slate-700 hover:scale-[1.01]'
                    }`}
                  >
                    {t.isSpecial && (
                      <span className="absolute top-2 right-2 text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-500 dark:text-yellow-400 border border-yellow-400/30">
                        Knight
                      </span>
                    )}
                    {t.isEnergetic && (
                      <span className="absolute top-2 right-2 text-[8px] font-mono font-black uppercase px-1 rounded bg-indigo-500/20 text-indigo-600 dark:text-cyan-300 border border-indigo-500/30">
                        Vibrant
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`w-3 h-3 rounded-full ${t.colorDot}`} />
                      <span className="font-bold text-slate-900 dark:text-white text-xs">{t.label}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{t.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography Scale */}
          <div className="space-y-2">
            <label className="font-extrabold text-slate-900 dark:text-white block uppercase tracking-wider text-[11px]">
              Reading Text Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sm', label: 'Compact (14px)' },
                { id: 'md', label: 'Standard (16px)' },
                { id: 'lg', label: 'Large (18px)' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelectFontSize(s.id as any)}
                  className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                    fontSize === s.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <label className="font-extrabold text-slate-900 dark:text-white block uppercase tracking-wider text-[11px]">
              Typography Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sans', label: 'Modern Sans', style: 'font-sans' },
                { id: 'serif', label: 'Editorial Serif', style: 'font-serif' },
                { id: 'mono', label: 'Technical Mono', style: 'font-mono' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => onSelectFontFamily(f.id as any)}
                  className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${f.style} ${
                    fontFamily === f.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Push Notifications & Cookies */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="font-extrabold text-slate-900 dark:text-white block uppercase tracking-wider text-[11px]">
              Push Notifications & Privacy Cookies
            </label>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Push Notifications for Updates</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive alerts when new curriculum and coding challenges release.</p>
                </div>
                <button
                  onClick={async () => {
                    if ('Notification' in window) {
                      const res = await Notification.requestPermission();
                      if (res === 'granted') {
                        localStorage.setItem('webzone_push_enabled', 'true');
                        new Notification('WebZone Knowledge Base', {
                          body: 'Push notifications are active!',
                          icon: '/icon.png',
                        });
                      }
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Configure Push
                </button>
              </div>
            </div>
          </div>

          {/* Progress Backup & Reset */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <label className="font-extrabold text-slate-900 dark:text-white block uppercase tracking-wider text-[11px]">
              Data Management & Backup
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportData}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 font-bold cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Export Progress (JSON)
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all completed lessons and practice records?')) {
                    onResetProgress();
                    onClose();
                  }
                }}
                className="px-3.5 py-2 rounded-xl border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-1.5 font-bold ml-auto cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
