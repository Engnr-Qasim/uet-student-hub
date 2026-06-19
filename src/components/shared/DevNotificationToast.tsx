import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle, Bell, X } from 'lucide-react';
import { DevNotification } from '../../lib/notifications';

export const DevNotificationToast: React.FC = () => {
  const [toast, setToast] = useState<DevNotification | null>(null);

  useEffect(() => {
    const handleAlert = (e: Event) => {
      const customEvent = e as CustomEvent<DevNotification>;
      if (customEvent.detail) {
        setToast(customEvent.detail);
        
        // Auto dismiss after 6 seconds
        const timer = setTimeout(() => {
          setToast(null);
        }, 6000);

        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('uet_dev_alert', handleAlert);
    return () => window.removeEventListener('uet_dev_alert', handleAlert);
  }, []);

  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full bg-slate-900 dark:bg-black border border-slate-800 text-white rounded-2xl p-4 shadow-2xl flex items-start space-x-3.5 select-none font-sans"
        id="dev-notification-toast"
      >
        {/* Glow accent */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-amber-500 to-indigo-500 rounded-t-2xl animate-pulse" />

        {/* Icon container */}
        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl relative">
          <Mail className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
        </div>

        {/* Core details */}
        <div className="flex-grow space-y-1 font-sans text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Simulated SMTP Dispatch</span>
            <button 
              onClick={() => setToast(null)}
              className="text-slate-500 hover:text-white transition-colors p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <h4 className="text-xs font-black text-white leading-snug">Developer Notified</h4>
          <p className="text-[11px] text-slate-350 leading-relaxed font-medium">
            An automated alert notification was successfully forwarded to <strong className="text-amber-400 font-bold">{toast.emailSentTo}</strong> regarding your <strong className="text-emerald-400 font-bold">{toast.eventType}</strong>.
          </p>
          
          <div className="pt-2 border-t border-slate-800/60 mt-2 flex items-center space-x-1.5 text-[9px] font-bold text-emerald-400 uppercase">
            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
            <span>SMTP Server Status: OK (250)</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
