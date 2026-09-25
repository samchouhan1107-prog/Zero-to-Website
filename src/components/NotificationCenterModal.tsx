import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  X,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Layers,
  Code2,
  BookOpen,
  Volume2,
  ShieldCheck,
  Send,
  Zap,
  ArrowRight,
  Info,
} from 'lucide-react';
import { NEWS_UPDATES, NewsItem } from '../data/newsData';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: 'home' | 'lesson' | 'practice-hub' | 'visual-lab', lessonId?: string) => void;
  onTriggerToast: (title: string, message: string, type?: 'info' | 'success' | 'update') => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  onTriggerToast,
}) => {
  const [news, setNews] = useState<NewsItem[]>(NEWS_UPDATES);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'curriculum' | 'feature' | 'update'>('all');
  const [pushStatus, setPushStatus] = useState<NotificationPermission>('default');
  const [isPushSubscribed, setIsPushSubscribed] = useState<boolean>(true);

  useEffect(() => {
    if ('Notification' in window) {
      setPushStatus(Notification.permission);
    }
    const pushStored = localStorage.getItem('webzone_push_enabled');
    if (pushStored !== null) {
      setIsPushSubscribed(pushStored === 'true');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRequestPush = async () => {
    if (!('Notification' in window)) {
      onTriggerToast('Push Not Supported', 'Browser does not support native push notifications, using in-app toasts.', 'info');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPushStatus(result);
      if (result === 'granted') {
        setIsPushSubscribed(true);
        localStorage.setItem('webzone_push_enabled', 'true');
        onTriggerToast('Push Notifications Active', 'You will receive notifications for new lessons and system releases.', 'success');
        new Notification('WebZone Knowledge Base', {
          body: '🎉 Push alerts enabled! You are all set to receive curriculum releases and announcements.',
          icon: '/icon.png',
        });
      } else if (result === 'denied') {
        onTriggerToast('Notifications Blocked', 'Please enable notifications in your browser address bar permissions.', 'info');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTestPush = () => {
    const randomNews = news[Math.floor(Math.random() * news.length)];
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`WebZone Update: ${randomNews.title}`, {
        body: randomNews.summary,
        icon: '/icon.png',
      });
    }
    onTriggerToast(randomNews.title, randomNews.summary, 'update');
  };

  const handleMarkAllAsRead = () => {
    setNews((prev) => prev.map((item) => ({ ...item, isUnread: false })));
  };

  const filteredNews = selectedFilter === 'all' ? news : news.filter((n) => n.category === selectedFilter);
  const unreadCount = news.filter((n) => n.isUnread).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
        {/* Modal Top Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-[#0b0d13]/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-400/20 text-amber-500 dark:text-amber-400 flex items-center justify-center border border-amber-400/30 shadow-xs">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-slate-900 dark:text-white">
                  Notifications & Release News
                </h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/30">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Curriculum updates, new sandbox exercises, and release notes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs font-semibold text-indigo-600 dark:text-cyan-400 hover:underline px-2 py-1 cursor-pointer"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Browser Push & Cookie Status Banner */}
        <div className="p-4 bg-slate-100/80 dark:bg-[#07090e] border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${pushStatus === 'granted' ? 'bg-emerald-500 animate-pulse' : pushStatus === 'denied' ? 'bg-rose-500' : 'bg-amber-400'}`} />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Browser Push Status:{' '}
                <span className="font-mono capitalize text-indigo-600 dark:text-cyan-400">
                  {pushStatus === 'granted' ? 'Active & Subscribed' : pushStatus === 'denied' ? 'Blocked by Browser' : 'Not Enabled'}
                </span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Cookie consent: <strong className="text-slate-700 dark:text-slate-300">Preferences Saved</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {pushStatus !== 'granted' ? (
              <button
                onClick={handleRequestPush}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5" /> Enable Push Alerts
              </button>
            ) : null}

            <button
              onClick={handleTestPush}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Trigger a sample release push notification"
            >
              <Send className="w-3.5 h-3.5 text-amber-500" /> Send Test Push Alert
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All News' },
            { id: 'curriculum', label: 'Curriculum' },
            { id: 'feature', label: 'Features' },
            { id: 'update', label: 'System Updates' },
          ].map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* News Feed List */}
        <div className="p-5 space-y-3.5 overflow-y-auto flex-1 max-h-[500px]">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400 space-y-2">
              <Info className="w-8 h-8 mx-auto text-slate-400" />
              <p className="text-xs font-medium">No announcements in this category right now.</p>
            </div>
          ) : (
            filteredNews.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.isUnread
                    ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/60 shadow-xs'
                    : 'bg-slate-50/60 dark:bg-[#141722]/50 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${item.accentColor}`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{item.date}</span>
                    {item.isUnread && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {item.summary}
                </p>

                {item.actionLabel && item.targetView && (
                  <div className="pt-3 mt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onNavigateView(item.targetView!, item.targetLessonId);
                        onClose();
                      }}
                      className="text-xs font-bold text-indigo-600 dark:text-cyan-400 hover:text-indigo-700 dark:hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer group"
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#07090e] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Cookies & push settings can be customized anytime in Settings.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
