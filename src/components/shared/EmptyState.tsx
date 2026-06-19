import React from 'react';
import { HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <HelpCircle className="w-10 h-10 text-slate-400" />,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-850 my-4" id="empty-state-view">
      <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm mb-4">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm mt-1 mb-4">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-[rgb(var(--university-primary))] hover:bg-opacity-90 text-white rounded-lg text-sm font-semibold cursor-pointer shadow-sm transition-all text-ellipsis"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
