import React from 'react';
import { mockNotices } from '../../data/mockData';
import { Bell, Calendar, Tag, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const AnnouncementsSection: React.FC = () => {
  // Take latest 3 notices
  const announcements = [...mockNotices].slice(0, 3);

  const getNoticeTheme = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-450 border border-rose-100 dark:border-rose-900/50';
      case 'academic':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-450 border border-blue-100 dark:border-blue-900/50';
      case 'event':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-450 border border-amber-100 dark:border-amber-900/50';
      default:
        return 'bg-slate-50 text-slate-600 dark:bg-slate-850 dark:text-slate-400 border border-slate-100 dark:border-slate-800';
    }
  };

  return (
    <section id="notices" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Latest Board Notices
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Stay in the loop with immediate news, exam timetables, event schedule rollouts, and registrar instructions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((notice, idx) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 flex flex-col justify-between shadow-xs hover:shadow-md transition-all h-full"
              id={`notice-card-${notice.id}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${getNoticeTheme(notice.type)}`}>
                    {notice.type} notice
                  </span>
                  <div className="flex items-center space-x-1 text-slate-400 text-[10px] font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(notice.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-slate-850 dark:text-white line-clamp-2">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed line-clamp-4">
                    {notice.content}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-850 mt-6 flex items-center space-x-2.5 text-slate-400">
                <div className="p-1.5 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-400 border border-slate-100 dark:border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider font-extrabold leading-none">Verified Author</span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block truncate max-w-[180px]">
                    {notice.created_by_name || 'DCSE Registries'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
