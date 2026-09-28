import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BellRing, CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'update';
}

interface ToastNotificationProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto p-4 rounded-2xl bg-slate-900/95 dark:bg-[#0b0d13]/95 backdrop-blur-xl border border-slate-700/80 dark:border-[#1f2536] shadow-2xl text-white flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : toast.type === 'update' ? (
                <Sparkles className="w-4 h-4 text-amber-300" />
              ) : (
                <BellRing className="w-4 h-4 text-cyan-400" />
              )}
            </div>

            <div className="flex-1 space-y-0.5">
              <h4 className="text-xs font-black text-white tracking-tight">{toast.title}</h4>
              <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">{toast.message}</p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
