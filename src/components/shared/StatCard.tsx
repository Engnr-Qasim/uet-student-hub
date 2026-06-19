import React from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: 'primary' | 'gold' | 'green' | 'blue' | 'rose' | 'slate';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  color = 'primary',
}) => {
  const colorStyles = {
    primary: 'border-l-4 border-l-[rgb(var(--university-primary))] bg-white dark:bg-slate-900',
    gold: 'border-l-4 border-l-[rgb(var(--university-accent))] bg-white dark:bg-slate-900',
    green: 'border-l-4 border-l-emerald-500 bg-white dark:bg-slate-900',
    blue: 'border-l-4 border-l-blue-500 bg-white dark:bg-slate-900',
    rose: 'border-l-4 border-l-rose-500 bg-white dark:bg-slate-900',
    slate: 'border-l-4 border-l-slate-400 bg-white dark:bg-slate-900',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      id={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className={`p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between ${colorStyles[color]}`}
    >
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 tracking-tight">{title}</p>
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</h3>
        {description && (
          <p className="text-xs text-slate-400 dark:text-slate-500">{description}</p>
        )}
        {trend && (
          <div className="flex items-center space-x-1 mt-1">
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                trend.positive
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30'
                  : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30'
              }`}
            >
              {trend.value}
            </span>
            <span className="text-xs text-slate-400">vs last term</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300">
        {icon}
      </div>
    </motion.div>
  );
};
