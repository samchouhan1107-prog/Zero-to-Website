import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cookie,
  Bell,
  BellRing,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Sparkles,
  X,
  Volume2,
} from 'lucide-react';

export interface CookiePreferences {
  essential: boolean;
  pushNotifications: boolean;
  analytics: boolean;
  timestamp: string;
}

interface CookieNotificationBannerProps {
  onAcceptAll?: () => void;
  onPreferencesSaved?: (prefs: CookiePreferences) => void;
  onRequestPushPermission?: () => void;
  onOpenNews?: () => void;
  onOpenPrivacy?: () => void;
}

export const CookieNotificationBanner: React.FC<CookieNotificationBannerProps> = ({
  onAcceptAll,
  onPreferencesSaved,
  onRequestPushPermission,
  onOpenNews,
  onOpenPrivacy,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if user already made a cookie / notification decision
    const savedConsent = localStorage.getItem('webzone_cookie_consent');
    if (!savedConsent) {
      // Delay display slightly for smooth page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }

    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const handleAcceptAll = async () => {
    const prefs: CookiePreferences = {
      essential: true,
      pushNotifications: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('webzone_cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('webzone_push_enabled', 'true');

    // Request browser notification permission if supported
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        const result = await Notification.requestPermission();
        setPermissionStatus(result);
        if (result === 'granted') {
          new Notification('WebZone Knowledge Base', {
            body: '🎉 Push notifications enabled! You will be notified whenever new chapters, challenges, or system updates release.',
            icon: '/icon.png',
          });
        }
      } catch (err) {
        console.log('Notification permission request error:', err);
      }
    }

    setIsVisible(false);
    onAcceptAll?.();
    onPreferencesSaved?.(prefs);
  };

  const handleSaveCustom = async () => {
    const prefs: CookiePreferences = {
      essential: true,
      pushNotifications: pushEnabled,
      analytics: analyticsEnabled,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('webzone_cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('webzone_push_enabled', pushEnabled ? 'true' : 'false');

    if (pushEnabled && 'Notification' in window && Notification.permission === 'default') {
      try {
        const result = await Notification.requestPermission();
        setPermissionStatus(result);
      } catch (err) {
        console.log('Notification permission request error:', err);
      }
    }

    setIsVisible(false);
    onPreferencesSaved?.(prefs);
  };

  const handleEssentialOnly = () => {
    const prefs: CookiePreferences = {
      essential: true,
      pushNotifications: false,
      analytics: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('webzone_cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('webzone_push_enabled', 'false');
    setIsVisible(false);
    onPreferencesSaved?.(prefs);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.aside
        id="cookie-push-notification-banner"
        aria-label="Cookie and Push Notification Consent"
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xl z-50 rounded-3xl bg-slate-900/95 dark:bg-[#0b0d13]/95 backdrop-blur-xl border border-slate-700/80 dark:border-[#1f2536] shadow-2xl text-white overflow-hidden p-5 sm:p-6"
      >
        {/* Glow ambient background highlight */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0 shadow-inner">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-white tracking-tight">
                    Cookies & Update Notifications
                  </h3>
                  <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                    Privacy First
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Stay synced with new curriculum releases, practice updates & news.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close for now"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            We use essential local cookies to store your learning milestones and themes. We partner with third-party networks such as Google AdSense to serve personalized ads under GDPR/CCPA standards.{' '}
            {onOpenPrivacy && (
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-amber-300 underline hover:text-amber-200 cursor-pointer font-bold inline"
              >
                Read our Privacy Policy &amp; Ad Disclosure
              </button>
            )}
          </p>

          {/* Expandable Preferences Section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-2 border-t border-slate-800/80 overflow-hidden"
              >
                {/* 1. Essential Cookies */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 dark:bg-[#141722]/70 border border-slate-700/40">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Essential Storage & State</h4>
                      <p className="text-[11px] text-slate-400">Stores progress, bookmarks, notes & theme preferences.</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Required
                  </span>
                </div>

                {/* 2. Push & Update Alerts */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 dark:bg-[#141722]/70 border border-slate-700/40">
                  <div className="flex items-center gap-2.5">
                    <BellRing className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Push & Release Alerts</h4>
                      <p className="text-[11px] text-slate-400">Receive real-time push notices for new curriculum & news.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pushEnabled}
                      onChange={(e) => setPushEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {/* 3. Analytics & Diagnostics */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 dark:bg-[#141722]/70 border border-slate-700/40">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Sandbox Performance Diagnostics</h4>
                      <p className="text-[11px] text-slate-400">Anonymous sandbox test telemetry to improve compiler tools.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" /> Less Options
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" /> Customize Preferences
                </>
              )}
            </button>

            <div className="flex items-center gap-2 ml-auto">
              {isExpanded ? (
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Save Choices
                </button>
              ) : (
                <button
                  onClick={handleEssentialOnly}
                  className="px-3.5 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  Essential Only
                </button>
              )}

              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Accept All & Enable Push
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
