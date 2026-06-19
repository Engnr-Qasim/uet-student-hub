import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Retrieving university data records...',
  fullScreen = false,
}) => {
  return (
    <div
      id="portal-loading-view"
      className={`flex flex-col items-center justify-center p-8 space-y-4 ${
        fullScreen ? 'fixed inset-0 bg-slate-50/90 dark:bg-slate-950/95 z-50' : 'w-full py-12'
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[rgb(var(--university-accent))]/30 border-t-[rgb(var(--university-primary))] rounded-full animate-spin" />
        <GraduationCap className="w-6 h-6 text-[rgb(var(--university-primary))] dark:text-[rgb(var(--university-accent))] absolute" />
      </div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">{message}</p>
    </div>
  );
};
