import React from 'react';
import { useTheme, UniversityTheme } from '../../contexts/ThemeContext';
import { Sun, Check } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: { id: UniversityTheme; label: string; bg: string; dot: string }[] = [
    { id: 'light', label: 'Academic Light', bg: 'bg-white border-slate-200', dot: 'bg-[rgb(var(--university-primary))]' },
    { id: 'dark', label: 'Midnight Scholar', bg: 'bg-slate-900 border-slate-800', dot: 'bg-indigo-400' },
    { id: 'blue', label: 'Oceanic Blue', bg: 'bg-blue-900 border-blue-950', dot: 'bg-yellow-400' },
    { id: 'green', label: 'Forest Mint', bg: 'bg-emerald-950 border-emerald-950', dot: 'bg-emerald-400' },
  ];

  return (
    <div className="space-y-3" id="theme-switcher-element">
      <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
        <Sun className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-bold tracking-tight uppercase">Portal Theme Selection</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((t) => {
          const isSelected = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-3 rounded-lg border text-left transition-all relative flex flex-col justify-between cursor-pointer group ${
                isSelected
                  ? 'border-[rgb(var(--university-primary))] ring-2 ring-[rgb(var(--university-accent))]/40 dark:ring-amber-500/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
              } ${t.id === 'light' ? 'bg-slate-50 text-slate-800' : 'bg-slate-900 text-slate-100'}`}
            >
              <span className="text-[11px] font-bold tracking-tight block truncate pr-4">{t.label}</span>
              <div className="flex items-center justify-between mt-2">
                <span className={`w-3.5 h-3.5 rounded-full ${t.dot}`} />
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-500" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
