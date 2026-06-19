import React from 'react';
import { Users, UserSquare, Landmark, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Enrolled Undergraduates', value: '5,000+', desc: 'Active scholars across divisions', icon: <Users className="w-6 h-6 text-[rgb(var(--university-primary))]" /> },
    { label: 'HEC Appraised Faculty', value: '250+', desc: 'PhD supervisors and professors', icon: <UserSquare className="w-6 h-6 text-[rgb(var(--university-primary))]" /> },
    { label: 'Engineering Departments', value: '6', desc: 'Fully accredited by PEC councils', icon: <Landmark className="w-6 h-6 text-[rgb(var(--university-primary))]" /> },
    { label: 'Excellence Legacy', value: '50+ Years', desc: 'Nurturing innovations since 1970', icon: <Award className="w-6 h-6 text-[rgb(var(--university-primary))]" /> },
  ];

  return (
    <section id="stats" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 bg-slate-50 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800/80 rounded-xl space-y-4"
              id={`stat-counter-${idx}`}
            >
              <div className="p-3 bg-white dark:bg-slate-850 w-fit rounded-xl shadow-xs">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {item.value}
                </h3>
                <p className="text-xs font-bold text-slate-850 dark:text-slate-200 tracking-tight">
                  {item.label}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
